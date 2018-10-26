import {PositionAndSpeed} from "../positionAndSpeed.js";

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

		// X 軸判定要再調整一下
		//---------------小馬力歐-----------------
		// -------------下方----------------

		// if(marioArray.speed.y > 0 && marioArray.isOnBrick){
		// 	marioArray.isOnBrick = false;
		// }
		if(flycoinArray.length != 0){
			for(let j = 0;j < questionBrickArray.length;j += 1){
				if(questionBrickArray[j].isUseLess == true){
					flycoinArray[j].show = true;
				}
			}
		}		

		// if(marioArray.pos.x + marioArray.width   > this.pos.x 
		// && marioArray.pos.x < this.pos.x + this.width ){
		
		// }
		// -------------小馬力歐--------------------
	

		if(!marioArray.isBigMario 
			&& !marioArray.isFireMario
			&& !marioArray.isDie 
			&& !marioArray.underGround
			&& !marioArray.willDie){
				

			// -------------下方-----------------------
			
			if(marioArray.speed.y < 0 
			&& marioArray.pos.y + marioArray.height/2 >= this.pos.y  //Mario 頭頂大於磚塊上緣
			&& marioArray.pos.y + marioArray.height/2 <= this.pos.y + this.height  //Mario 頭頂小於磚塊下緣
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
				marioArray.isOnBrick = false;
			}

			// -------------上方----------------
	
				//目前用 lowzerzone 控制還有點問題

			if(marioArray.pos.x + marioArray.width > this.pos.x  
				&& marioArray.pos.x < this.pos.x + this.width 
				&& marioArray.pos.y + marioArray.height/2  >= this.pos.y + this.height) {
					this.lowerzone = true;
			}else if(marioArray.pos.x + marioArray.width > this.pos.x  
				&& marioArray.pos.x < this.pos.x + this.width 
				&& marioArray.pos.y + marioArray.height/2  < this.pos.y ){
					this.lowerzone = false;
			}
			
			
			// if(marioArray.speed.y == 0 && marioArray.isJump){
			// 	marioArray.prvioxusY = marioArray.pos.y
			// }else if(marioArray.isOnBrick || marioArray.onTube || marioArray.isOnGround){
			// 	marioArray.prvioxusY = marioArray.pos.y
			// }

			if(!this.lowerzone  && marioArray.speed.y > 0 
			&& marioArray.pos.x + marioArray.width > this.pos.x  
			&& marioArray.pos.x < this.pos.x + this.width 
			){
				if(marioArray.pos.y > this.pos.y - marioArray.height){
					marioArray.pos.y = this.pos.y - marioArray.height;
					marioArray.speed.y = 0;
					marioArray.isOnBrick = true;
					marioArray.isBottomBrick = false;
					marioArray.isJump = false;
				}
			}

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
				&& marioArray.pos.y  <= this.pos.y + this.height
				&& marioArray.pos.x + marioArray.width > this.pos.x 
				//判定的bug 用 width/2可以較精確判定(還是會有穿越的情形)
				&& marioArray.pos.x < this.pos.x + this.width 
			){
				if(!this.isUseLess){
					this.coinBrickSound();
				}
				this.isUseLess = true;
				marioArray.pos.y = this.pos.y + 16 ;
				marioArray.speed.y = 0;
				marioArray.isBottomBrick = true;
			}
	
			// -------------上方----------------

			if(marioArray.pos.x + marioArray.width > this.pos.x  
				&& marioArray.pos.x < this.pos.x + this.width 
				&& marioArray.pos.y  >= this.pos.y + this.height) {
					this.lowerzone = true;
			}else if(marioArray.pos.x + marioArray.width > this.pos.x  
				&& marioArray.pos.x < this.pos.x + this.width 
				&& marioArray.pos.y + marioArray.height/2  < this.pos.y ){
					this.lowerzone = false;
			}

			if(!this.lowerzone && marioArray.speed.y > 0 
				&& marioArray.pos.x + marioArray.width  > this.pos.x  
				&& marioArray.pos.x < this.pos.x + this.width 
			){				
				if(marioArray.pos.y >= this.pos.y - marioArray.height){
					marioArray.pos.y = this.pos.y - marioArray.height;
					marioArray.speed.y = 0;
					marioArray.isOnBrick = true;
					marioArray.isJump = false;
				}
			}
		}

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
		if(!this.isUseLess){
			if(marioArray.pos.x < 450){
				questionBrickSprite.drawSprite(this.flashing(),context,this.pos.x,this.pos.y);
			}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000 ){
				questionBrickSprite.drawSprite(this.flashing(),context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
			}else if(marioArray.pos.x >= 5000 ){
				questionBrickSprite.drawSprite(this.flashing(),context,this.pos.x  - 4550 ,this.pos.y);
			}
		}

		if(this.isUseLess){
			if(marioArray.pos.x < 450){
				questionBrickSprite.drawSprite("uselessBrick",context,this.pos.x,this.pos.y);
			}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000 ){
				questionBrickSprite.drawSprite("uselessBrick",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
			}else if(marioArray.pos.x >= 5000 ){
				questionBrickSprite.drawSprite("uselessBrick",context,this.pos.x  - 4550 ,this.pos.y);
			}
		}
		
	
	}
}

export {QuestionBrick};