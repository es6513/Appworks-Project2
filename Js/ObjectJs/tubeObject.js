import {PositionAndSpeed} from "../positionAndSpeed.js";
import {mario} from "../marioTest.js";


class Tube{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
	}
	
	update(){

	}

	draw(context,tubeSprite){
				
		if(mario.pos.x < 450 ){
			tubeSprite.drawTubeSprite("tube",context,this.pos.x,this.pos.y);
		}else if(mario.pos.x >= 450 && mario.pos.x < 1600){
			tubeSprite.drawTubeSprite("tube",context,this.pos.x - mario.pos.x + 450 ,this.pos.y);
		}else if(mario.pos.x >= 1600 ){
			tubeSprite.drawTubeSprite("tube",context,this.pos.x  - 1150 ,this.pos.y);
		}
	
	}
}

export {Tube};