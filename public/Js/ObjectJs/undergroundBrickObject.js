import {PositionAndSpeed} from "../positionAndSpeed.js";
// import {mario} from "../marioTest.js";


class UndergroundBrick{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.width = 16;
		this.height = 16;
	}
	
	update(){

	}

	draw(context,undergroundBrickSprite,marioArray){
				
		if(marioArray.pos.x < 450 ){
			undergroundBrickSprite.drawSprite("undergroundBrick",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000){
			undergroundBrickSprite.drawSprite("undergroundBrick",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 ){
			undergroundBrickSprite.drawSprite("undergroundBrick",context,this.pos.x  - 4550 ,this.pos.y);
		}
	
	}
}

export {UndergroundBrick};