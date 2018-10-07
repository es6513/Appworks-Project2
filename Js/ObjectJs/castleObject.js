import {PositionAndSpeed} from "../positionAndSpeed.js";
import {mario} from "../marioTest.js";


class Castle{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.width = 160;
		this.height = 176;
	}
	
	update(){

	}

	draw(context,castleSprite){
				
		if(mario.pos.x < 450 ){
			castleSprite.drawSprite("castle",context,this.pos.x,this.pos.y);
		}else if(mario.pos.x >= 450 && mario.pos.x < 1600){
			castleSprite.drawSprite("castle",context,this.pos.x - mario.pos.x + 450 ,this.pos.y);
		}else if(mario.pos.x >= 1600 ){
			castleSprite.drawSprite("castle",context,this.pos.x  - 1150 ,this.pos.y);
		}
	
	}
}

export {Castle};