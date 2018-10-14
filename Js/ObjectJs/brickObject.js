import {PositionAndSpeed} from "../positionAndSpeed.js";
// import {marioArray} from "../marioArrayTest.js";


class Brick{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.frameIndex = 0;
		this.width = 16;
		this.height = 16;
		this.break = false;
		this.previousY;
		this.clearTimeout;
		this.goUp = false;
	}
	
	update(marioArray,brickJson){

		if(!this.goUp){
			this.previousY = this.pos.y;
		}

		let timeoutId;
	
		if(this.goUp && this.pos.y == this.previousY - 4){
			if(!this.clearTimeout){
				timeoutId = setTimeout(() => {
					this.pos.y += 4;
					this.clearTimeout = null;
				},100);
				this.clearTimeout = timeoutId;
			}	
		}

		// 	碰撞公式:shape.pos.x + shape.width > this.pos.x 
		//	&& shape.pos.x < this.pos.x + this.width
		//	&& shape.pos.y + shape.height > this.pos.y
		//	&& shape.pos.y < this.pos.y + this.height
		if( !marioArray.isBigMario && !marioArray.isFireMario){

			// -------------下方----------------
			if(marioArray.speed.y < 0 
				&& marioArray.pos.y >= this.pos.y
				&& marioArray.pos.y <= this.pos.y + 16
				&& marioArray.pos.x + marioArray.width / 2  >= this.pos.x   //判定的bug
				&& marioArray.pos.x <= this.pos.x + this.width / 2
			){
				marioArray.pos.y = this.pos.y ;
				this.pos.y -= 4;
				// this.pos.y += 2;
				this.goUp = true;
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

		//---------------- 大馬力歐-----
		// -------------下方----------------
		if(marioArray.isBigMario || marioArray.isFireMario){
			if(marioArray.speed.y < 0 
				&& marioArray.pos.y >= this.pos.y
				&& marioArray.pos.y <= this.pos.y + 16
				&& marioArray.pos.x + marioArray.width > this.pos.x
				&& marioArray.pos.x < this.pos.x + this.width 
			){
				marioArray.pos.y = this.pos.y + 16 ;
				this.pos.y -= 4;
				// this.pos.y += 2;
				this.goUp = true;
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

	brickSound(){
		let brickSound = new Audio("/music/mario-coin-sound.wav");
		brickSound.play();
	}

	draw(context,brickSprite,marioArray){
	
		if(marioArray.pos.x < 450 ){
			brickSprite.drawSprite("brick",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000 ){
			brickSprite.drawSprite("brick",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 ){
			brickSprite.drawSprite("brick",context,this.pos.x  - 4550 ,this.pos.y);
		}
	
	}
}

export {Brick};