import {PositionAndSpeed} from "../positionAndSpeed.js";

class Castle{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.width = 160;
		this.height = 176;
	}
	
	draw(context,castleSprite,marioArray){
				
		if(marioArray.pos.x < 450 ){
			castleSprite.drawSprite("castle",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000){
			castleSprite.drawSprite("castle",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 ){
			castleSprite.drawSprite("castle",context,this.pos.x  - 4550 ,this.pos.y);
		}
	
	}
}

export {Castle};