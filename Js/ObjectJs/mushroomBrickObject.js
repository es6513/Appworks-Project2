import {PositionAndSpeed} from "../positionAndSpeed.js";
import {keys} from "../keyEvent.js";

class MushroomBrick{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.frameIndex = 0;
		this.width = 16;
		this.height = 16;
		this.isUseLess = false;
		this.lowerzone;
		this.framesRun = [
			"mushroomBrick-1","mushroomBrick-1","mushroomBrick-1","mushroomBrick-1","mushroomBrick-1","mushroomBrick-1",
			"mushroomBrick-1","mushroomBrick-1","mushroomBrick-1","mushroomBrick-1","mushroomBrick-1","mushroomBrick-1",
			"mushroomBrick-2","mushroomBrick-2","mushroomBrick-2","mushroomBrick-2","mushroomBrick-2","mushroomBrick-2",
			"mushroomBrick-2","mushroomBrick-2","mushroomBrick-2","mushroomBrick-2","mushroomBrick-2","mushroomBrick-2",
			"mushroomBrick-3","mushroomBrick-3","mushroomBrick-3","mushroomBrick-3","mushroomBrick-3","mushroomBrick-3",
			"mushroomBrick-3","mushroomBrick-3","mushroomBrick-3","mushroomBrick-3","mushroomBrick-3","mushroomBrick-3"
		];
	}
	
	update(marioArray,mushroomArray,mushroomBrickArray){

		if(mushroomArray.length != 0){
			for(let j = 0;j < mushroomBrickArray.length;j += 1){
				if(mushroomBrickArray[j].isUseLess == true){
					mushroomArray[j].appear = true;
				}
			}
		}

		//------------------從磚塊的下方及上方碰到--------------------
		// -------------小馬力歐--------------------

		if(!marioArray.isBigMario
			 && !marioArray.isFireMario	
			 && !marioArray.isDie 
			 && !marioArray.underGround
			 && !marioArray.willDie ){

			// -------------下方----------------

			if(marioArray.speed.y < 0 
			&& marioArray.pos.y + marioArray.height / 2 >= this.pos.y  //Mario 頭頂大於磚塊上緣
			&& marioArray.pos.y + marioArray.height / 2 <= this.pos.y + this.height  //Mario 頭頂小於磚塊下緣
			&& marioArray.pos.x + marioArray.width  > this.pos.x   
			&& marioArray.pos.x < this.pos.x + this.width 
			){
				if(!this.isUseLess){
					this.mushroomAppearSound();
				}
				this.isUseLess = true;
				marioArray.pos.y = this.pos.y ;
				marioArray.speed.y = 0;
				marioArray.isBottomBrick = true;
			}

			// -------------上方----------------

			if(marioArray.pos.x + marioArray.width >= this.pos.x  
				&& marioArray.pos.x <= this.pos.x + this.width 
				&& marioArray.pos.y + marioArray.height / 2  >= this.pos.y + this.height) {
				this.lowerzone = true;
			}else if(marioArray.pos.x + marioArray.width >= this.pos.x  
				&& marioArray.pos.x <= this.pos.x + this.width 
				&& marioArray.pos.y + marioArray.height / 2  <= this.pos.y ||
				marioArray.pos.y + marioArray.height - marioArray.speed.y <= this.pos.y ){
				this.lowerzone = false;
			}

			if(!this.lowerzone  
			&& !marioArray.underGround  
			&& marioArray.speed.y > 0 
			&& marioArray.pos.x + marioArray.width > this.pos.x  
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

			// ----------------End 控制從邊界掉下去的時候不能往回走-----------------
			
		}

		//---------------大馬力歐-----------------

		// -------------下方----------------
		if((marioArray.isBigMario || marioArray.isFireMario)
			&& !marioArray.underGround
			&& !marioArray.isDie 
			&& !marioArray.willDie ){
			
			// -------------下方----------------
			if(marioArray.speed.y < 0 
				&& marioArray.pos.y >= this.pos.y
				&& marioArray.pos.y <= this.pos.y + this.height
				&& marioArray.pos.x + marioArray.width  > this.pos.x 
				&& marioArray.pos.x < this.pos.x + this.width 
			){
				if(!this.isUseLess){
					this.mushroomAppearSound();
				}
				this.isUseLess = true;
				marioArray.pos.y = this.pos.y + this.height ;
				marioArray.speed.y = 0;
				marioArray.isBottomBrick = true;
			}
	
			// -------------上方----------------

			if(marioArray.pos.x + marioArray.width >= this.pos.x  
				&& marioArray.pos.x <= this.pos.x + this.width 
				&& marioArray.pos.y  >= this.pos.y + this.height) {
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
	
			// ----------------End 控制從邊界掉下去的時候不能往回走-----------------

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
		}
		else if(!marioArray.underGround 
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
		} else	if(!marioArray.underGround 
			&& marioArray.isJump 
			&& (marioArray.isBigMario || marioArray.isFireMario)
			&& marioArray.pos.x + marioArray.width == this.pos.x 
			&& marioArray.pos.y + marioArray.height  >= this.pos.y
			&& marioArray.pos.y  <= this.pos.y + this.height)
		{
			marioArray.pos.x = this.pos.x - marioArray.width ;
			marioArray.stopX = true;
			marioArray.touchBrickBorderByJumping = true;
		} else if(!marioArray.underGround 
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

		if(marioArray.touchBrickBorderByJumping && 
			(marioArray.isOnGround || marioArray.isOnBrick)){
			marioArray.stopX = false;
			marioArray.touchBrickBorderByJumping = false;
		}
		

	}

	flashing(){
		this.frameIndex = ++this.frameIndex % 36 ;
		return this.framesRun[this.frameIndex];
	}

	mushroomAppearSound(){
		let mushroomAppearSound = new Audio("/music/mario-powerup-appears.wav");
		mushroomAppearSound.play();
	}

	draw(context,mushroomBrickSprite,marioArray){
		if(!this.isUseLess){
			if(marioArray.pos.x < 450){
				mushroomBrickSprite.drawSprite(this.flashing(),context,this.pos.x,this.pos.y);
			}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000 ){
				mushroomBrickSprite.drawSprite(this.flashing(),context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
			}else if(marioArray.pos.x >= 5000 ){
				mushroomBrickSprite.drawSprite(this.flashing(),context,this.pos.x  - 4550 ,this.pos.y);
			}
		}

		if(this.isUseLess){
			if(marioArray.pos.x < 450){
				mushroomBrickSprite.drawSprite("uselessMushroomBrick",context,this.pos.x,this.pos.y);
			}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000 ){
				mushroomBrickSprite.drawSprite("uselessMushroomBrick",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
			}else if(marioArray.pos.x >= 5000 ){
				mushroomBrickSprite.drawSprite("uselessMushroomBrick",context,this.pos.x  - 4550 ,this.pos.y);
			}
		}
		
	
	}
}

export {MushroomBrick};