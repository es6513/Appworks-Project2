import {PositionAndSpeed} from "../positionAndSpeed.js";
import {keys} from "../keyEvent.js";

class QuestionBrick{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.frameIndex = 0;
		this.width = 16;
		this.height = 16;
		this.isUseLess = false;
		this.lowerzone;
		this.framesRun = [
			"questionBrick-1","questionBrick-1","questionBrick-1","questionBrick-1","questionBrick-1","questionBrick-1",
			"questionBrick-1","questionBrick-1","questionBrick-1","questionBrick-1","questionBrick-1","questionBrick-1",
			"questionBrick-2","questionBrick-2","questionBrick-2","questionBrick-2","questionBrick-2","questionBrick-2",
			"questionBrick-2","questionBrick-2","questionBrick-2","questionBrick-2","questionBrick-2","questionBrick-2",
			"questionBrick-3","questionBrick-3","questionBrick-3","questionBrick-3","questionBrick-3","questionBrick-3",
			"questionBrick-3","questionBrick-3","questionBrick-3","questionBrick-3","questionBrick-3","questionBrick-3"
		];
	}
	
	update(marioArray,flycoinArray,questionBrickArray){

		//------------------從磚塊的下方及上方碰到--------------------
		
		// -------------下方----------------

		if(flycoinArray.length != 0){
			for(let j = 0;j < questionBrickArray.length;j += 1){
				if(questionBrickArray[j].isUseLess == true){
					flycoinArray[j].show = true;
				}
			}
		}		
		// -------------小馬力歐--------------------
		
		if(!marioArray.isBigMario 
			&& !marioArray.isFireMario
			&& !marioArray.isDie 
			&& !marioArray.underGround
			&& !marioArray.willDie){
				
			// -------------下方-----------------------
			
			if(marioArray.speed.y < 0 
			&& marioArray.pos.y + marioArray.height / 2 >= this.pos.y  //Mario 頭頂大於磚塊上緣
			&& marioArray.pos.y + marioArray.height / 2 <= this.pos.y + this.height  //Mario 頭頂小於磚塊下緣
			&& marioArray.pos.x + marioArray.width > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			){
				if(!this.isUseLess){
					this.coinBrickSound();
				}
				this.isUseLess = true;
				marioArray.pos.y = this.pos.y ;
				marioArray.speed.y = 0;
				marioArray.isBottomBrick = true;
			}

			// -------------上方----------------
	
			//目前用 lowzerzone 控制還有點問題
			// lowzerzone 第一段為 馬力歐的頭頂大於磚塊的下緣
			// lowzerzone 第二段為 馬力歐腳底小於磚塊上緣

			if(marioArray.pos.x + marioArray.width >= this.pos.x  
				&& marioArray.pos.x <= this.pos.x + this.width 
				&& marioArray.pos.y + marioArray.height / 2  >= this.pos.y + this.height) {
				this.lowerzone = true;
			}else if(marioArray.pos.x + marioArray.width >= this.pos.x  
				&& marioArray.pos.x <= this.pos.x + this.width 
				&& marioArray.pos.y + marioArray.height / 2  <= this.pos.y ||
				marioArray.pos.y + marioArray.height - marioArray.speed.y <= this.pos.y){
				this.lowerzone = false;
			}

			if(!this.lowerzone  
			&& !marioArray.underGround  
			&& marioArray.speed.y > 0 
			&& marioArray.pos.x + marioArray.width > this.pos.x  
			&& marioArray.pos.x < this.pos.x + this.width 
			){
				if(marioArray.pos.y > this.pos.y - marioArray.height){
					marioArray.fallingFromLeftBorder = false;
					marioArray.fallingFromRightBorder = false;
					marioArray.pos.y = this.pos.y - marioArray.height;
					marioArray.speed.y = 0;
					marioArray.isOnBrick = true;
					marioArray.isJump = false;
				}
			}

			// ----------------控制從邊界掉下去的時候不能往回走-----------------
			if(marioArray.isOnBrick 
				&& marioArray.pos.x == this.pos.x + this.width &&  marioArray.speed.y > 0.5)
			{
				marioArray.fallingFromRightBorder = true;
			}else if(marioArray.isOnBrick 
					&& marioArray.pos.x + marioArray.width == this.pos.x 
				 	&&  marioArray.speed.y > 0.5)
			{
				marioArray.fallingFromLeftBorder = true;
			}

			// ----------------End 控制從邊界掉下去的時候不能往回走-----------------


			// if(marioArray.isOnBrick 
			// 	&& marioArray.speed.y > 0.5)
			// 	// && marioArray.pos.x >= this.pos.x+this.width 
			// 	// && marioArray.pos.y + marioArray.height >= this.pos.y
			// 	// && marioArray.pos.y + marioArray.height/2 <= this.pos.y + this.height)
			// 	{					
			// 		marioArray.stopX = true;
			// 		marioArray.fallingFromBrick = true;
			// 	}

			// if(marioArray.speed.y > 0 
			// 	&& marioArray.pos.y > ){
			// 	marioArray.stopX = false;
			// }
		}

		//---------------大馬力歐-----------------

		if((marioArray.isBigMario || marioArray.isFireMario )
			&& !marioArray.underGround	
			&& !marioArray.isDie 
			&& !marioArray.willDie ){
		
			// -------------下方----------------

			if(marioArray.speed.y < 0 
				&& marioArray.pos.y >= this.pos.y
				&& marioArray.pos.y <= this.pos.y + this.height
				&& marioArray.pos.x + marioArray.width > this.pos.x 
				&& marioArray.pos.x < this.pos.x + this.width 
			){
				if(!this.isUseLess){
					this.coinBrickSound();
				}
				this.isUseLess = true;
				marioArray.pos.y = this.pos.y + this.height ;
				marioArray.speed.y = 0;
				marioArray.isBottomBrick = true;
			}
	
			// -------------上方----------------
			if(marioArray.pos.x + marioArray.width >= this.pos.x  
				&& marioArray.pos.x <= this.pos.x + this.width 
				&& marioArray.pos.y >= this.pos.y + this.height) {
				this.lowerzone = true;
			}else if(marioArray.pos.x + marioArray.width >= this.pos.x  
				&& marioArray.pos.x <= this.pos.x + this.width 
				&& (marioArray.pos.y + marioArray.height <= this.pos.y ||
					marioArray.pos.y + marioArray.height - marioArray.speed.y <= this.pos.y)){
				this.lowerzone = false;
			}

			if(!this.lowerzone
				&& !marioArray.underGround  
				&& marioArray.speed.y > 0 
				&& marioArray.pos.x + marioArray.width  > this.pos.x  
				&& marioArray.pos.x < this.pos.x + this.width 
			){	
				if(marioArray.pos.y > this.pos.y - marioArray.height){
					marioArray.pos.y = this.pos.y - marioArray.height;
					marioArray.speed.y = 0;
					marioArray.isOnBrick = true;
					marioArray.isJump = false;
				}
			}

			// ----------------控制從邊界掉下去的時候不能往回走-----------------

			if(marioArray.isOnBrick 
				&& marioArray.pos.x == this.pos.x + this.width &&  marioArray.speed.y > 0.5)
			{
				marioArray.fallingFromRightBorder = true;
			}else if(marioArray.isOnBrick 
					&& marioArray.pos.x + marioArray.width == this.pos.x 
				 	&&  marioArray.speed.y > 0.5)
			{
				marioArray.fallingFromLeftBorder = true;
			}

			// ----------------END 控制從邊界掉下去的時候不能往回走-----------------
		}

		//-------------end 從磚塊的下方及上方碰到------------------

		// ----------------小馬力歐--------------------

		if(!marioArray.underGround 
			&& marioArray.isJump 
			&& !marioArray.isBigMario 
			&& !marioArray.isFireMario
			&& marioArray.pos.x == this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height  >= this.pos.y  
			&& marioArray.pos.y + marioArray.height / 2 <= this.pos.y + this.height)
		{
			marioArray.pos.x = this.pos.x + this.width ;
			marioArray.stopX = true;
			marioArray.touchBrickBorderByJumping = true;
		}else if(!marioArray.underGround 
			&& marioArray.isJump
			&& !marioArray.isBigMario 
			&& !marioArray.isFireMario
			&& marioArray.pos.x + marioArray.width == this.pos.x 
			&& marioArray.pos.y + marioArray.height  >= this.pos.y
			&& marioArray.pos.y + marioArray.height / 2 <= this.pos.y + this.height)
		{
			marioArray.pos.x = this.pos.x - marioArray.width ;
			marioArray.stopX = true;
			marioArray.touchBrickBorderByJumping = true;
		}else if(!marioArray.underGround 
			&& marioArray.isJump 
			&& !marioArray.isBigMario 
			&& !marioArray.isFireMario
			&& marioArray.pos.x == this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height < this.pos.y ){
			marioArray.stopX = false;
		}	else if(!marioArray.underGround 
			&& marioArray.isJump 
			&& !marioArray.isBigMario 
			&& !marioArray.isFireMario
			&& marioArray.pos.x + marioArray.width == this.pos.x 
			&& marioArray.pos.y + marioArray.height < this.pos.y ){
			marioArray.stopX = false;
		}
		
		// ----------------大馬力歐--------------------


		if(!marioArray.underGround 
			&& marioArray.isJump 
			&& (marioArray.isBigMario || marioArray.isFireMario)
			&& marioArray.pos.x == this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height  >= this.pos.y
			&& marioArray.pos.y  <= this.pos.y + this.height)
		{
			marioArray.pos.x = this.pos.x + this.width ;
			marioArray.stopX = true;
			marioArray.touchBrickBorderByJumping = true;
		}else	if(!marioArray.underGround 
			&& marioArray.isJump 
			&& (marioArray.isBigMario || marioArray.isFireMario)
			&& marioArray.pos.x + marioArray.width == this.pos.x 
			&& marioArray.pos.y + marioArray.height  >= this.pos.y
			&& marioArray.pos.y  <= this.pos.y + this.height)
		{
			marioArray.pos.x = this.pos.x - marioArray.width ;
			marioArray.stopX = true;
			marioArray.touchBrickBorderByJumping = true;
		}else if(!marioArray.underGround 
			&& marioArray.isJump 
			&& (marioArray.isBigMario || marioArray.isFireMario)
			&& marioArray.pos.x == this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height < this.pos.y ){
			marioArray.stopX = false;
		}
		else if(!marioArray.underGround 
			&& marioArray.isJump 
			&& (marioArray.isBigMario || marioArray.isFireMario)
			&& marioArray.pos.x + marioArray.width == this.pos.x  
			&& marioArray.pos.y + marioArray.height < this.pos.y ){
			marioArray.stopX = false;
		}

		// if(marioArray.pos.x == this.pos.x + this.width 
		// 	&& marioArray.pos.y + marioArray.height  < this.pos.y 
		// 	&& (keys.left || keys.right)){
		// 	marioArray.stopX = false;
		// }else if(marioArray.pos.x + marioArray.width == this.pos.x 
		// 	&& marioArray.pos.y + marioArray.height < this.pos.y  
		// 	&& (keys.left || keys.right)){
		// 	marioArray.stopX = false;
		// }
		
		if(marioArray.touchBrickBorderByJumping 
			&& (marioArray.isOnGround || marioArray.isOnBrick)){
			marioArray.stopX = false;
			marioArray.touchBrickBorderByJumping = false;
		} // BUG 若鄰近水管太近的時候，落地後剛好在水管旁邊，有機會穿越過去

		// if( this.pos.x + this.width == x
		// 	&& this.pos.y + this.height > y 
		// 	&& this.pos.y + this.height / 2  < y + questionBrickJson.height)
		// { 
		// 	this.pos.x = x + questionBrickJson.width ;
		// 	// this.stopX = true;  //控制跑回來會上去的問題
		// }	

		// if( this.pos.x  == x + questionBrickJson.width
		// 	&& this.pos.y + this.height > y 
		// 	&& this.pos.y + this.height / 2  < y + questionBrickJson.height)
		// { 
		// 	this.pos.x = x + questionBrickJson.width ;
		// 	// this.stopX = true;  //控制跑回來會上去的問題
		// }	

		// if(!this.isOnBrick && this.stopX && this.pos.x + this.width == x && 
		// 	(keys.left || keys.right)){
		// 	this.stopX = false;
		// }

		// if(!this.isOnBrick && this.stopX && 	this.pos.x == x + questionBrickJson.width && 
		// 	(keys.left || keys.right)){
		// 	this.stopX = false;   //這行會造成水管可以穿越 BUG 
		// }
	}
	
	flashing(){
		this.frameIndex = ++this.frameIndex % 36 ;
		return this.framesRun[this.frameIndex];
	}

	coinBrickSound(){
		let brickSound = new Audio("/music/mario-coin-sound.wav");
		brickSound.play();
	}

	draw(context,questionBrickSprite,marioArray){
		if(marioArray.pos.x < 450){
			questionBrickSprite.drawSprite(!this.isUseLess ? this.flashing() : "uselessBrick",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000 ){
			questionBrickSprite.drawSprite(!this.isUseLess ? this.flashing() : "uselessBrick",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 ){
			questionBrickSprite.drawSprite(!this.isUseLess ? this.flashing() : "uselessBrick",context,this.pos.x  - 4550 ,this.pos.y);
		}	
	}
}

export {QuestionBrick};