import {PositionAndSpeed} from "../positionAndSpeed.js";
// import {marioArray} from "../marioArrayTest.js";


class Brick{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.frameIndex = 0;
		this.width = 16;
		this.height = 16;
		this.break = false;
		this.show = true;
		this.previousY;
		this.clearTimeout;
		this.clearTimeout2;
		this.goUp = false;
	}
	
	update(marioArray){

		if(!this.goUp){
			this.previousY = this.pos.y;
		}

		let timeoutId;
	
		if(this.goUp && this.pos.y == this.previousY - 4){
			if(!this.clearTimeout){
				timeoutId = setTimeout(() => {
					this.pos.y += 4;
					this.goUp = false;
					this.clearTimeout = null;
				},100);
				this.clearTimeout = timeoutId;
			}	
		}	


		// ------------ 解決各個磚塊橫向穿越的問題---------------


		if(!marioArray.isDie 
			&& !marioArray.willDie 
			&& !marioArray.underGround
			&& marioArray.isJump && !this.break
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.x + marioArray.width > this.pos.x
			&& marioArray.pos.y + marioArray.height > this.pos.y
			&& marioArray.pos.y + marioArray.height / 2 < this.pos.y + this.height)
		{
			marioArray.stuckBrick = true;
			marioArray.stopX = true;
			marioArray.stopY = true;
		}
		
		//修正磚塊前跳躍會斜向穿越的 bug ,但動作還有點不自然
		

		// 	碰撞公式:shape.pos.x + shape.width > this.pos.x 
		//	&& shape.pos.x < this.pos.x + this.width
		//	&& shape.pos.y + shape.height > this.pos.y
		//	&& shape.pos.y < this.pos.y + this.height
		if(!marioArray.isBigMario 
			&& !marioArray.isFireMario 
			&& !marioArray.isDie 
			&& !marioArray.willDie 
			&& !marioArray.underGround
			&& !this.break ){

			// -------------下方----------------
			if(!this.goup 
				&& marioArray.speed.y < 0 
				&& marioArray.pos.y >= this.pos.y
				&& marioArray.pos.y <= this.pos.y + 16
				&& marioArray.pos.x + marioArray.width   > this.pos.x   //判定的bug
				&& marioArray.pos.x < this.pos.x + this.width 
			){
				marioArray.pos.y = this.pos.y ;
				this.pos.y -= 4;
				this.bumpkSound();
				this.goUp = true;
				marioArray.speed.y = 0;
				marioArray.isBottomBrick = true;
			}
			

			// -------------上方----------------
			if(!marioArray.isBottomBrick
				&& !marioArray.underGround  
				&&  marioArray.speed.y > 0 
				&& marioArray.pos.x + marioArray.width  > this.pos.x 
				&& marioArray.pos.x < this.pos.x + this.width 
			){
				console.log("456");
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
		if((marioArray.isBigMario || marioArray.isFireMario)
		&& !marioArray.underGround
		&& !this.break 
		&& !marioArray.isDie 
		&& !marioArray.willDie ){
			if(marioArray.speed.y < 0 
				&& marioArray.pos.y >= this.pos.y
				&& marioArray.pos.y <= this.pos.y + 16
				&& marioArray.pos.x + marioArray.width > this.pos.x
				&& marioArray.pos.x < this.pos.x + this.width 
			){
				marioArray.pos.y = this.pos.y + 16 ;
				// this.pos.y -= 4;
				// this.goUp = true;
				marioArray.speed.y = 0;
				marioArray.isBottomBrick = true;
				this.break = true;
				this.bricksmashsound();
			}
	
			// -------------上方----------------

			if(!marioArray.isBottomBrick 
				&& !this.break  
				&& marioArray.speed.y > 0 
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

	bumpkSound(){
		let bumpkSound = new Audio("/music/mario-bump-sound.wav");
		bumpkSound.play();
	}

	bricksmashsound(){
		let bricksmashsound = new Audio("/music/brick-smash.wav");
		bricksmashsound.play();
	}

	draw(context,brickSprite,marioArray){
	
		if(marioArray.pos.x < 450 && !this.break ){
			brickSprite.drawSprite("brick",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000 && !this.break){
			brickSprite.drawSprite("brick",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 && !this.break){
			brickSprite.drawSprite("brick",context,this.pos.x  - 4550 ,this.pos.y);
		}
	
	}
}

export {Brick};