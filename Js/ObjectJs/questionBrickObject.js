import {PositionAndSpeed} from "../positionAndSpeed.js";
// import {marioArray} from "../marioArrayTest.js";


class QuestionBrick{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.frameIndex = 0;
		this.width = 16;
		this.height = 16;
		this.isUseLess = false;
		this.framesRun = [
			"questionBrick-1","questionBrick-1","questionBrick-1","questionBrick-1","questionBrick-1","questionBrick-1",
			"questionBrick-1","questionBrick-1","questionBrick-1","questionBrick-1","questionBrick-1","questionBrick-1",
			"questionBrick-2","questionBrick-2","questionBrick-2","questionBrick-2","questionBrick-2","questionBrick-2",
			"questionBrick-2","questionBrick-2","questionBrick-2","questionBrick-2","questionBrick-2","questionBrick-2",
			"questionBrick-3","questionBrick-3","questionBrick-3","questionBrick-3","questionBrick-3","questionBrick-3",
			"questionBrick-3","questionBrick-3","questionBrick-3","questionBrick-3","questionBrick-3","questionBrick-3"
		];
	}
	
	update(marioArray,mushroomArray){
		// X 軸判定要再調整一下
		//---------------小馬力歐-----------------
		if(!marioArray.isBigMario && !marioArray.isFireMario){
			if(marioArray.speed.y < 0 
			&& marioArray.pos.y >= this.pos.y
			&& marioArray.pos.y <= this.pos.y + 16
			&& marioArray.pos.x + marioArray.width >= this.pos.x + 4  //判定的bug
			&& marioArray.pos.x <= this.pos.x + this.width - 4
			){
				console.log("123");
				mushroomArray[1].appear = true;
				this.isUseLess = true;
				marioArray.pos.y = this.pos.y ;
				marioArray.speed.y = 0;
				marioArray.isBottomBrick = true;
			}

		
			if(!marioArray.isBottomBrick && marioArray.speed.y > 0 
			&& marioArray.pos.x + marioArray.width > this.pos.x  
			&& marioArray.pos.x < this.pos.x + this.width 
			){
				if(marioArray.pos.y >= this.pos.y - 32){
					marioArray.pos.y = this.pos.y - 32;
					marioArray.speed.y = 0;
					marioArray.isOnBrick = true;
					marioArray.isJump = false;
				}
			}
		}

		//---------------大馬力歐-----------------

		if(marioArray.isBigMario || marioArray.isFireMario){
			if(marioArray.speed.y < 0 
				&& marioArray.pos.y >= this.pos.y
				&& marioArray.pos.y <= this.pos.y + 16
				&& marioArray.pos.x + marioArray.width > this.pos.x + 4
				&& marioArray.pos.x < this.pos.x + this.width - 4
			){
				mushroomArray[1].appear = true;
				this.isUseLess = true;
				marioArray.pos.y = this.pos.y + 16 ;
				marioArray.speed.y = 0;
				marioArray.isBottomBrick = true;
			}
	
			
			if(!marioArray.isBottomBrick && marioArray.speed.y > 0 
				&& marioArray.pos.x + marioArray.width > this.pos.x  
				&& marioArray.pos.x < this.pos.x + this.width 
			){
				if(marioArray.pos.y >= this.pos.y - 32){
					marioArray.pos.y = this.pos.y - 32;
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

	brickSound(){
		let brickSound = new Audio("/music/mario-coin-sound.wav");
		brickSound.play();
	}

	mushroomAppearSound(){
		let mushroomAppearSound = new Audio("/music/mario-powerup-appears.wav");
		mushroomAppearSound.play();
	}

	draw(context,questionBrickSprite,marioArray){
		if(!this.isUseLess){
			if(marioArray.pos.x < 450){
				questionBrickSprite.drawSprite(this.flashing(),context,this.pos.x,this.pos.y);
			}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 1800 ){
				questionBrickSprite.drawSprite(this.flashing(),context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
			}else if(marioArray.pos.x >= 1800 ){
				questionBrickSprite.drawSprite(this.flashing(),context,this.pos.x  - 1350 ,this.pos.y);
			}
		}

		if(this.isUseLess){
			if(marioArray.pos.x < 450){
				questionBrickSprite.drawSprite("uselessBrick",context,this.pos.x,this.pos.y);
			}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 1800 ){
				questionBrickSprite.drawSprite("uselessBrick",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
			}else if(marioArray.pos.x >= 1800 ){
				questionBrickSprite.drawSprite("uselessBrick",context,this.pos.x  - 1350 ,this.pos.y);
			}
		}
		
	
	}
}

export {QuestionBrick};