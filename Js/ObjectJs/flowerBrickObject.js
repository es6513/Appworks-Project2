import {PositionAndSpeed} from "../positionAndSpeed.js";
import {keys} from "../keyEvent.js";

class FlowerBrick{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.frameIndex = 0;
		this.width = 16;
		this.height = 16;
		this.isUseLess = false;
		this.lowerzone;
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

		//------------------從磚塊的下方及上方碰到--------------------
	
		if(flowerArray.length != 0){
			for(let j = 0;j < flowerBrickArray.length;j += 1){
				if(flowerBrickArray[j].isUseLess == true){
					flowerArray[j].appear = true;
				}
			}
		}

		//------------------從磚塊的下方及上方碰到--------------------

		//---------------小馬力歐-----------------
		
		if(!marioArray.isBigMario 
			&& !marioArray.isFireMario
			&& !marioArray.underGround
			&& !marioArray.isDie 
			&& !marioArray.willDie ){

			// -------------下方----------------

			if(marioArray.speed.y < 0 
			&& marioArray.pos.y + marioArray.height / 2 >= this.pos.y  //Mario 頭頂大於磚塊上緣
			&& marioArray.pos.y + marioArray.height / 2 <= this.pos.y + this.height  //Mario 頭頂小於磚塊下緣
			&& marioArray.pos.x + marioArray.width   > this.pos.x   
			&& marioArray.pos.x < this.pos.x + this.width  
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

			if(marioArray.pos.x + marioArray.width > this.pos.x  
				&& marioArray.pos.x < this.pos.x + this.width 
				&& marioArray.pos.y + marioArray.height / 2  >= this.pos.y + this.height) {
					this.lowerzone = true;
			}else if(marioArray.pos.x + marioArray.width > this.pos.x  
				&& marioArray.pos.x < this.pos.x + this.width 
				&& marioArray.pos.y + marioArray.height / 2  < this.pos.y ){
					this.lowerzone = false;
			}

			if(!this.lowerzone  
			&& !marioArray.underGround
			&& marioArray.speed.y > 0 
			&& marioArray.pos.x + marioArray.width > this.pos.x  
			&& marioArray.pos.x < this.pos.x + this.width 
			){
				if(marioArray.pos.y >= this.pos.y - marioArray.height){
					marioArray.pos.y = this.pos.y - marioArray.height;
					marioArray.speed.y = 0;
					marioArray.isOnBrick = true;
					marioArray.isBottomBrick = false;
					marioArray.isJump = false;
				}
			}
		}

		//---------------大馬力歐-----------------
		
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
					this.flowerAppearSound();
				}
				this.isUseLess = true;
				marioArray.pos.y = this.pos.y + this.height;
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
				&& marioArray.pos.y + marioArray.height < this.pos.y ){
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
		}

		//------------------end  從磚塊的下方及上方碰到--------------------

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
		}
		
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
		} 

		if(!marioArray.underGround 
			&& marioArray.isJump
			&& !marioArray.isBigMario 
			&& !marioArray.isFireMario
			&& marioArray.pos.x + marioArray.width == this.pos.x 
				&& marioArray.pos.y + marioArray.height  >= this.pos.y
				&& marioArray.pos.y + marioArray.height / 2 <= this.pos.y + this.height)
		{
			marioArray.pos.x = this.pos.x -marioArray.width ;
			marioArray.stopX = true;
			marioArray.touchBrickBorderByJumping = true;
		}

		if(!marioArray.underGround 
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
			if(marioArray.pos.x < 450){
				flowerBrickSprite.drawSprite(!this.isUseLess?this.flashing():"uselessFlowerBrick",context,this.pos.x,this.pos.y);
			}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000 ){
				flowerBrickSprite.drawSprite(!this.isUseLess?this.flashing():"uselessFlowerBrick",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
			}else if(marioArray.pos.x >= 5000 ){
				flowerBrickSprite.drawSprite(!this.isUseLess?this.flashing():"uselessFlowerBrick",context,this.pos.x  - 4550 ,this.pos.y);
			}
	}
}

export {FlowerBrick};