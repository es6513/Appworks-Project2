import {PositionAndSpeed} from "../positionAndSpeed.js";
// import {marioArray} from "../marioArrayTest.js";


class QuestionBrick{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.frameIndex = 0;
		this.width = 16;
		this.height = 16;
		this.framesRun = [
			"questionBrick-1","questionBrick-1","questionBrick-1","questionBrick-1","questionBrick-1","questionBrick-1",
			"questionBrick-1","questionBrick-1","questionBrick-1","questionBrick-1","questionBrick-1","questionBrick-1",
			"questionBrick-2","questionBrick-2","questionBrick-2","questionBrick-2","questionBrick-2","questionBrick-2",
			"questionBrick-2","questionBrick-2","questionBrick-2","questionBrick-2","questionBrick-2","questionBrick-2",
			"questionBrick-3","questionBrick-3","questionBrick-3","questionBrick-3","questionBrick-3","questionBrick-3",
			"questionBrick-3","questionBrick-3","questionBrick-3","questionBrick-3","questionBrick-3","questionBrick-3"
		];

	}
	
	update(marioArray){
		// X 軸判定要再調整一下
		if(!marioArray.isBigMario && !marioArray.isFireMario){
			if(marioArray.speed.y < 0 
			&& marioArray.pos.y >= this.pos.y
			&& marioArray.pos.y <= this.pos.y + 16
			&& marioArray.pos.x + marioArray.width >= this.pos.x
			&& marioArray.pos.x < this.pos.x + this.width
			){
				marioArray.pos.y = this.pos.y ;
				this.goUp = true;
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

		if(marioArray.isBigMario || marioArray.isFireMario){
			
		}
		//16是金幣的寬度， EX : 160 < marioArray.pos < 176
		// 前兩行的 +8 +10 => 讓判定範圍更精準，並非真正碰撞
	}

	flashing(){
		this.frameIndex = ++this.frameIndex % 36 ;
		return this.framesRun[this.frameIndex];
	}

	brickSound(){
		let brickSound = new Audio("/music/mario-coin-sound.wav");
		brickSound.play();
	}

	draw(context,questionBrickSprite,marioArray){
		if(marioArray.pos.x < 450){
			questionBrickSprite.drawSprite(this.flashing(),context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 1800 ){
			questionBrickSprite.drawSprite(this.flashing(),context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 1800 ){
			questionBrickSprite.drawSprite(this.flashing(),context,this.pos.x  - 1350 ,this.pos.y);
		}
	
	}
}

export {QuestionBrick};