import {PositionAndSpeed} from "../positionAndSpeed.js";
import {LibObj} from "../lib.js";

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
			}			

			// -------------上方----------------
			LibObj.smallLowerZoneDetect(marioArray,this);

			LibObj.upperZoneStop(marioArray,this);
			// ----------------控制從邊界掉下去的時候不能往回走-----------------
			LibObj.controlBrickBorder(marioArray,this);
	
			// ----------------End 控制從邊界掉下去的時候不能往回走-----------------
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
			LibObj.bigLowerZoneDetect(marioArray,this);
			
			if(!this.break){
				LibObj.upperZoneStop(marioArray,this);
			}
			// ----------------控制從邊界掉下去的時候不能往回走-----------------
			LibObj.controlBrickBorder(marioArray,this);
			// ----------------End 控制從邊界掉下去的時候不能往回走-----------------
		}
		//-------------end 從磚塊的下方及上方碰到------------------

		// ----------------小馬力歐--------------------
		if(!this.break){
			LibObj.handleSmallJumpFromBorder(marioArray,this);
			LibObj.handleBigJumpFromBorder(marioArray,this);
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