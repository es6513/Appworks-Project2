import {PositionAndSpeed} from "../positionAndSpeed.js";



class Tube{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.width = 8;
		this.height = 8;
	}
	
	draw(context,tubeSprite,marioArray){
				
		if(marioArray.pos.x < 450 ){
			tubeSprite.drawSprite("font",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000){
			tubeSprite.drawSprite("font",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 ){
			tubeSprite.drawSprite("font",context,this.pos.x  - 4550 ,this.pos.y);
		}
	
	}
}

export {Tube};