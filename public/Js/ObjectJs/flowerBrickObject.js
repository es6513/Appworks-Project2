import {PositionAndSpeed} from "../positionAndSpeed.js";


class FlowerBrick{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.frameIndex = 0;
		this.width = 16;
		this.height = 16;
		this.isUseLess = false;
		this.framesRun = [
			"flowerBrick-1","flowerBrick-1","flowerBrick-1","flowerBrick-1","flowerBrick-1","flowerBrick-1",
			"flowerBrick-1","flowerBrick-1","flowerBrick-1","flowerBrick-1","flowerBrick-1","flowerBrick-1",
			"flowerBrick-2","flowerBrick-2","flowerBrick-2","flowerBrick-2","flowerBrick-2","flowerBrick-2",
			"flowerBrick-2","flowerBrick-2","flowerBrick-2","flowerBrick-2","flowerBrick-2","flowerBrick-2",
			"flowerBrick-3","flowerBrick-3","flowerBrick-3","flowerBrick-3","flowerBrick-3","flowerBrick-3",
			"flowerBrick-3","flowerBrick-3","flowerBrick-3","flowerBrick-3","flowerBrick-3","flowerBrick-3"
		];
	}
	
	update(marioArray,flowerArray,flowerBrickArray){
		// X 軸判定要再調整一下
		//---------------小馬力歐-----------------
		// -------------下方----------------
		if(flowerArray.length != 0){
			for(let j = 0;j < flowerBrickArray.length;j += 1){
				if(flowerBrickArray[j].isUseLess == true){
					flowerArray[j].appear = true;
				}
			}
		}
	
		if(!marioArray.isBigMario && !marioArray.isFireMario){
			if(marioArray.speed.y < 0 
			&& marioArray.pos.y >= this.pos.y
			&& marioArray.pos.y <= this.pos.y + 16
			&& marioArray.pos.x + marioArray.width / 2 >= this.pos.x   
			&& marioArray.pos.x <= this.pos.x + this.width / 2
			){
				if(!this.isUseLess){
					this.flowerAppearSound();
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
				&& marioArray.pos.x + marioArray.width / 2 >= this.pos.x 
				//判定的bug 用 width/2可以較精確判定(還是會有穿越的情形)
				&& marioArray.pos.x <= this.pos.x + this.width / 2
			){
				if(!this.isUseLess){
					this.flowerAppearSound();
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

	flowerAppearSound(){
		let mushroomAppearSound = new Audio("/music/mario-powerup-appears.wav");
		mushroomAppearSound.play();
	}

	draw(context,flowerBrickSprite,marioArray){
		if(!this.isUseLess){
			if(marioArray.pos.x < 450){
				flowerBrickSprite.drawSprite(this.flashing(),context,this.pos.x,this.pos.y);
			}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000 ){
				flowerBrickSprite.drawSprite(this.flashing(),context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
			}else if(marioArray.pos.x >= 5000 ){
				flowerBrickSprite.drawSprite(this.flashing(),context,this.pos.x  - 4550 ,this.pos.y);
			}
		}

		if(this.isUseLess){
			if(marioArray.pos.x < 450){
				flowerBrickSprite.drawSprite("uselessFlowerBrick",context,this.pos.x,this.pos.y);
			}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000 ){
				flowerBrickSprite.drawSprite("uselessFlowerBrick",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
			}else if(marioArray.pos.x >= 5000 ){
				flowerBrickSprite.drawSprite("uselessFlowerBrick",context,this.pos.x  - 4550 ,this.pos.y);
			}
		}
		
	
	}
}

export {FlowerBrick};