import {PositionAndSpeed} from "../positionAndSpeed.js";
import {LibObj} from "../lib.js";

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

		//---------------小馬力歐-----------------
		// -------------下方----------------
		if(!marioArray.isBigMario 
			&& !marioArray.isFireMario
			&& !marioArray.underGround
			&& !marioArray.isDie 
			&& !marioArray.willDie ){

			// -------------下方----------------
			LibObj.smallMarioUnderBrick(marioArray,this);

			// -------------上方----------------
			LibObj.smallLowerZoneDetect(marioArray,this);
			LibObj.upperZoneStop(marioArray,this);

			// ----------------控制從邊界掉下去的時候不能往回走-----------------
			LibObj.controlBrickBorder(marioArray,this);
			// ----------------End 控制從邊界掉下去的時候不能往回走-----------------
		}
		

		//---------------大馬力歐-----------------
		
		if((marioArray.isBigMario || marioArray.isFireMario)
			&& !marioArray.underGround
			&& !marioArray.isDie 
			&& !marioArray.willDie ){

			// -------------下方----------------
			LibObj.bigMarioUnderBrick(marioArray,this);
	
			// -------------上方----------------
			LibObj.bigLowerZoneDetect(marioArray,this);

			LibObj.upperZoneStop(marioArray,this);

			// ----------------控制從邊界掉下去的時候不能往回走-----------------
			LibObj.controlBrickBorder(marioArray,this);
	
			// ----------------End 控制從邊界掉下去的時候不能往回走-----------------	
		}

		//------------------end  從磚塊的下方及上方碰到--------------------

		// ----------------小馬力歐--------------------

		//在空中跳起時若在磚塊邊緣不能穿越，以及站在磚塊上解除不能移動
		LibObj.handleSmallJumpFromBorder(marioArray,this);

		// ----------------大馬力歐--------------------
		LibObj.handleBigJumpFromBorder(marioArray,this);

		if(marioArray.touchBrickBorderByJumping && marioArray.isOnGround){
			marioArray.stopX = false;
			marioArray.touchBrickBorderByJumping = false;
		}	

	}

	flashing(){
		this.frameIndex = ++this.frameIndex % 36 ;
		return this.framesRun[this.frameIndex];
	}

	powerUpSound(){
		let mushroomAppearSound = new Audio("/music/mario-powerup-appears.wav");
		mushroomAppearSound.play();
	}

	draw(context,flowerBrickSprite,marioArray){
		if(marioArray.pos.x < 450){
			flowerBrickSprite.drawSprite(!this.isUseLess ? this.flashing() : "uselessFlowerBrick",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000 ){
			flowerBrickSprite.drawSprite(!this.isUseLess ? this.flashing() : "uselessFlowerBrick",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 ){
			flowerBrickSprite.drawSprite(!this.isUseLess ? this.flashing() : "uselessFlowerBrick",context,this.pos.x  - 4550 ,this.pos.y);
		}
	}
}

export {FlowerBrick};