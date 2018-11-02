import {PositionAndSpeed} from "../positionAndSpeed.js";
import {keys} from "../keyEvent.js";

class Brick{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.frameIndex = 0;
		this.width = 16;
		this.height = 16;
		this.break = false;
		this.show = true;
		this.lowerzone;
		this.previousY;
		this.clearTimeout;
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

		// 	碰撞公式:shape.pos.x + shape.width > this.pos.x 
		//	&& shape.pos.x < this.pos.x + this.width
		//	&& shape.pos.y + shape.height > this.pos.y
		//	&& shape.pos.y < this.pos.y + this.height

		//------------------從磚塊的下方及上方碰到--------------------
		// -------------小馬力歐--------------------

		if(!marioArray.isBigMario 
			&& !marioArray.isFireMario 
			&& !marioArray.isDie 
			&& !marioArray.willDie 
			&& !marioArray.underGround
			&& !this.break ){

			// -------------下方----------------
			if(!this.goup 
				&& marioArray.speed.y < 0 
				&& marioArray.pos.y + marioArray.height / 2 >= this.pos.y  //Mario 頭頂大於磚塊上緣
				&& marioArray.pos.y + marioArray.height / 2 <= this.pos.y + this.height  //Mario 頭頂小於磚塊下緣
				&& marioArray.pos.x + marioArray.width > this.pos.x   
				&& marioArray.pos.x < this.pos.x + this.width 
			){
				marioArray.pos.y = this.pos.y ;
				this.pos.y -= 4;
				this.bumpkSound();
				this.goUp = true;
				marioArray.speed.y = 0;
				marioArray.isBottomBrick = true;
				marioArray.isOnBrick = false;
			}			

			// -------------上方----------------

			if(marioArray.pos.x + marioArray.width >= this.pos.x  
				&& marioArray.pos.x <= this.pos.x + this.width 
				&& marioArray.pos.y + marioArray.height / 2  >= this.pos.y + this.height) {
				this.lowerzone = true;
			}else if(marioArray.pos.x + marioArray.width >= this.pos.x  
				&& marioArray.pos.x <= this.pos.x + this.width 
				&& marioArray.pos.y + marioArray.height / 2  <= this.pos.y ){
				this.lowerzone = false;
			}

			if(!this.lowerzone 
				&& !marioArray.underGround  
				&&  marioArray.speed.y > 0 
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
		}    

		//---------------- 大馬力歐-----
		
		if((marioArray.isBigMario || marioArray.isFireMario)
		&& !marioArray.underGround
		&& !this.break 
		&& !marioArray.isDie 
		&& !marioArray.willDie ){

			// -------------下方----------------
			if(marioArray.speed.y < 0 
				&& marioArray.pos.y >= this.pos.y
				&& marioArray.pos.y <= this.pos.y + this.height
				&& marioArray.pos.x + marioArray.width > this.pos.x
				&& marioArray.pos.x < this.pos.x + this.width 
			){
				marioArray.pos.y = this.pos.y + this.height ;
				marioArray.speed.y = 0;
				marioArray.isBottomBrick = true;
				this.break = true;
				this.bricksmashsound();
			}
	
			// -------------上方----------------

			if(marioArray.pos.x + marioArray.width > this.pos.x  
				&& marioArray.pos.x <= this.pos.x + this.width 
				&& marioArray.pos.y  >= this.pos.y + this.height) {
				this.lowerzone = true;
			}else if(marioArray.pos.x + marioArray.width >= this.pos.x  
				&& marioArray.pos.x <= this.pos.x + this.width 
				&& (marioArray.pos.y + marioArray.height <= this.pos.y ||
					marioArray.pos.y + marioArray.height - marioArray.speed.y <= this.pos.y) ){
				this.lowerzone = false;
			}

			if(!this.lowerzone
				&& !this.break  
				&& marioArray.speed.y > 0 
				&& marioArray.pos.x + marioArray.width  > this.pos.x 
				&& marioArray.pos.x < this.pos.x + this.width 
			){
				if(marioArray.pos.y > this.pos.y - marioArray.height){
					marioArray.pos.y = this.pos.y - marioArray.height ;
					marioArray.speed.y = 0;
					marioArray.isOnBrick = true;
					marioArray.isJump = false;
				}
			}
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
		}else 	if(!marioArray.underGround 
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
		} 

		if(marioArray.touchBrickBorderByJumping && marioArray.isOnGround){
			marioArray.stopX = false;
			marioArray.touchBrickBorderByJumping = false;
		}

		if(marioArray.pos.x == this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height  < this.pos.y 
			&& (keys.left || keys.right)){
			marioArray.stopX = false;
		}else if(marioArray.pos.x + marioArray.width == this.pos.x 
			&& marioArray.pos.y + marioArray.height < this.pos.y  
			&& (keys.left || keys.right)){
			marioArray.stopX = false;
		}
		// if(!this.isOnBrick && this.stopX && this.pos.x + this.width == x && 
		// 	(keys.left || keys.right)){
		// 	// this.speed.x = 4;
		// 	this.stopX = false;
		// }

		// if(!this.isOnBrick && this.stopX && 	this.pos.x == x + brickJson.width 
		// 	&& !this.isOnGround 
		// 	&& (keys.left || keys.right)){
		// 	// this.speed.x = 4;
		// 	this.stopX = false; //這行會造成水管可以穿越 BUG 
		// }

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