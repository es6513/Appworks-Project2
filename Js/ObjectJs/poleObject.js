import {PositionAndSpeed} from "../positionAndSpeed.js";
import {mario} from "../marioTest.js";


class Pole{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.width = 16;
		this.height = 176;
	}
	
	update(){

	}

	draw(context,poleSprite){
				
		if(mario.pos.x < 450 ){
			poleSprite.drawSprite("pole",context,this.pos.x,this.pos.y);
		}else if(mario.pos.x >= 450 && mario.pos.x < 1600){
			poleSprite.drawSprite("pole",context,this.pos.x - mario.pos.x + 450 ,this.pos.y);
		}else if(mario.pos.x >= 1600 ){
			poleSprite.drawSprite("pole",context,this.pos.x  - 1150 ,this.pos.y);
		}
	
	}
}

export {Pole};