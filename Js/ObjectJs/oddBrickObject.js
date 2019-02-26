import {PositionAndSpeed} from "../positionAndSpeed.js";

class OddBrick{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.width = 16;
		this.height = 16;
	}

	
	draw(context,oddBrickSprite,marioArray){
        
		if(marioArray.pos.x < 450 ){
			oddBrickSprite.drawSprite("oddBrick",context,this.pos.x + marioArray.speed.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000){
			oddBrickSprite.drawSprite("oddBrick",context,this.pos.x - marioArray.pos.x + 450  ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 ){
			oddBrickSprite.drawSprite("oddBrick",context,this.pos.x  - 4550 ,this.pos.y);
		}
	
	}
}

export {OddBrick};