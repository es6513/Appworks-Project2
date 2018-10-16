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
	
	update(marioArray,flycoinArray,questionBrickArray){

		// X 軸判定要再調整一下
		//---------------小馬力歐-----------------
		// -------------下方----------------

		if(flycoinArray.length != 0){
			for(let j = 0;j < questionBrickArray.length;j += 1){
				if(questionBrickArray[j].isUseLess == true){
					flycoinArray[j].show = true;
				}
			}
		}		

		if(!marioArray.isBigMario && !marioArray.isFireMario){
			if(marioArray.speed.y < 0 
			&& marioArray.pos.y >= this.pos.y
			&& marioArray.pos.y <= this.pos.y + 16
			&& marioArray.pos.x + marioArray.width   >= this.pos.x 
			&& marioArray.pos.x <= this.pos.x + this.width / 2
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
		// -------------下方----------------
		if(marioArray.isBigMario || marioArray.isFireMario){
			if(marioArray.speed.y < 0 
				&& marioArray.pos.y >= this.pos.y
				&& marioArray.pos.y <= this.pos.y + 16
				&& marioArray.pos.x + marioArray.width >= this.pos.x 
				//判定的bug 用 width/2可以較精確判定(還是會有穿越的情形)
				&& marioArray.pos.x <= this.pos.x + this.width / 2
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
			if(!marioArray.isBottomBrick && marioArray.speed.y > 0 
				&& marioArray.pos.x + marioArray.width  > this.pos.x  
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