import {PositionAndSpeed} from "../positionAndSpeed.js";
// import {mario} from "../marioTest.js";


class Castle{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.width = 160;
		this.height = 176;
	}
	
	update(marioArray){

	}

	draw(context,castleSprite,marioArray){
				
		if(marioArray.pos.x < 450 ){
			castleSprite.drawSprite("castle",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 2500){
			castleSprite.drawSprite("castle",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 2500 ){
			castleSprite.drawSprite("castle",context,this.pos.x  - 2050 ,this.pos.y);
		}
	
	}
}

export {Castle};