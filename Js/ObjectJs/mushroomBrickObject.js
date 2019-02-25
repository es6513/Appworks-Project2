import {PositionAndSpeed} from "../positionAndSpeed.js";
import {LibObj} from "../lib.js";

class MushroomBrick{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.frameIndex = 0;
		this.width = 16;
		this.height = 16;
		this.isUseLess = false;
		this.lowerzone;
		this.framesRun = [
			"mushroomBrick-1","mushroomBrick-1","mushroomBrick-1","mushroomBrick-1","mushroomBrick-1","mushroomBrick-1",
			"mushroomBrick-1","mushroomBrick-1","mushroomBrick-1","mushroomBrick-1","mushroomBrick-1","mushroomBrick-1",
			"mushroomBrick-2","mushroomBrick-2","mushroomBrick-2","mushroomBrick-2","mushroomBrick-2","mushroomBrick-2",
			"mushroomBrick-2","mushroomBrick-2","mushroomBrick-2","mushroomBrick-2","mushroomBrick-2","mushroomBrick-2",
			"mushroomBrick-3","mushroomBrick-3","mushroomBrick-3","mushroomBrick-3","mushroomBrick-3","mushroomBrick-3",
			"mushroomBrick-3","mushroomBrick-3","mushroomBrick-3","mushroomBrick-3","mushroomBrick-3","mushroomBrick-3"
		];
	}
	
	update(marioArray,mushroomArray,mushroomBrickArray){
		//------------------從磚塊的下方及上方碰到--------------------
		if(mushroomArray.length != 0){
			for(let j = 0;j < mushroomBrickArray.length;j += 1){
				if(mushroomBrickArray[j].isUseLess == true){
					mushroomArray[j].appear = true;
				}
			}
		}
		
		// -------------小馬力歐--------------------
		// -------------下方----------------
		if(!marioArray.isBigMario
			 && !marioArray.isFireMario	
			 && !marioArray.isDie 
			 && !marioArray.underGround
			 && !marioArray.willDie ){

			// -------------下方----------------
			LibObj.smallMarioUnderBrick(marioArray,this);
			// smallMarioUnderBrick(marioArray,this);

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

		//-------------end 從磚塊的下方及上方碰到------------------

		// ----------------小馬力歐--------------------
	
		//在空中跳起時若在磚塊邊緣不能穿越，以及站在磚塊上解除不能移動
		LibObj.handleSmallJumpFromBorder(marioArray,this);

		// ----------------大馬力歐--------------------
		LibObj.handleBigJumpFromBorder(marioArray,this);
		
		if(marioArray.touchBrickBorderByJumping && 
			(marioArray.isOnGround || marioArray.isOnBrick)){
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

	draw(context,mushroomBrickSprite,marioArray){
		if(marioArray.pos.x < 450){
			mushroomBrickSprite.drawSprite(!this.isUseLess ? this.flashing() : "uselessMushroomBrick",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000 ){
			mushroomBrickSprite.drawSprite(!this.isUseLess ? this.flashing() : "uselessMushroomBrick",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 ){
			mushroomBrickSprite.drawSprite(!this.isUseLess ? this.flashing() : "uselessMushroomBrick",context,this.pos.x  - 4550 ,this.pos.y);
		}
	}
}

export {MushroomBrick};