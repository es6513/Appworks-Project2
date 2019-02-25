import {PositionAndSpeed} from "../positionAndSpeed.js";
import {LibObj} from "../lib.js";

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
		//------------------從磚塊的下方及上方碰到--------------------
		
		if(flycoinArray.length != 0){
			for(let j = 0;j < questionBrickArray.length;j += 1){
				if(questionBrickArray[j].isUseLess == true){
					flycoinArray[j].show = true;
				}
			}
		}	
		
		// -------------小馬力歐--------------------
		// -------------下方----------------
		if(!marioArray.isBigMario 
			&& !marioArray.isFireMario
			&& !marioArray.isDie 
			&& !marioArray.underGround
			&& !marioArray.willDie){
				
			// -------------下方-----------------------
			
			if(marioArray.speed.y < 0 
			&& marioArray.pos.y + marioArray.height / 2 >= this.pos.y  //Mario 頭頂大於磚塊上緣
			&& marioArray.pos.y + marioArray.height / 2 <= this.pos.y + this.height  //Mario 頭頂小於磚塊下緣
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
			}

			// -------------上方----------------
	
			// lowzerzone 第一段為 馬力歐的頭頂大於磚塊的下緣
			// lowzerzone 第二段為 馬力歐腳底小於磚塊上緣

			LibObj.smallLowerZoneDetect(marioArray,this);

			LibObj.upperZoneStop(marioArray,this);

			// ----------------控制從邊界掉下去的時候不能往回走-----------------
			LibObj.controlBrickBorder(marioArray,this);
			// ----------------End 控制從邊界掉下去的時候不能往回走-----------------
		}		
		//---------------大馬力歐-----------------

		if((marioArray.isBigMario || marioArray.isFireMario )
			&& !marioArray.underGround	
			&& !marioArray.isDie 
			&& !marioArray.willDie ){
		
			// -------------下方----------------
			if(marioArray.speed.y < 0 
				&& marioArray.pos.y >= this.pos.y
				&& marioArray.pos.y <= this.pos.y + this.height
				&& marioArray.pos.x + marioArray.width > this.pos.x 
				&& marioArray.pos.x < this.pos.x + this.width 
			){
				if(!this.isUseLess){
					this.coinBrickSound();
				}
				this.isUseLess = true;
				marioArray.pos.y = this.pos.y + this.height ;
				marioArray.speed.y = 0;
				marioArray.isBottomBrick = true;
			}
	
			// -------------上方----------------
			LibObj.bigLowerZoneDetect(marioArray,this);
			LibObj.upperZoneStop(marioArray,this);

			// ----------------控制從邊界掉下去的時候不能往回走-----------------

			LibObj.controlBrickBorder(marioArray,this);

			// ----------------END 控制從邊界掉下去的時候不能往回走-----------------
		}

		//-------------end 從磚塊的下方及上方碰到------------------

		// ----------------小馬力歐--------------------
		LibObj.handleSmallJumpFromBorder(marioArray,this);

		
		// ----------------大馬力歐--------------------
		LibObj.handleBigJumpFromBorder(marioArray,this);
		
		if(marioArray.touchBrickBorderByJumping 
			&& (marioArray.isOnGround || marioArray.isOnBrick || marioArray.onTube)){
			marioArray.stopX = false;
			marioArray.touchBrickBorderByJumping = false;
		} // BUG 若鄰近水管太近的時候，落地後剛好在水管旁邊，有機會穿越過去
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
		if(marioArray.pos.x < 450){
			questionBrickSprite.drawSprite(!this.isUseLess ? this.flashing() : "uselessBrick",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000 ){
			questionBrickSprite.drawSprite(!this.isUseLess ? this.flashing() : "uselessBrick",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 ){
			questionBrickSprite.drawSprite(!this.isUseLess ? this.flashing() : "uselessBrick",context,this.pos.x  - 4550 ,this.pos.y);
		}	
	}
}

export {QuestionBrick};