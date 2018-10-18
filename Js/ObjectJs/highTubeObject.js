import {PositionAndSpeed} from "../positionAndSpeed.js";


class HighTube{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.width = 32;
		this.height = 48;
	}
	
	update(){

	}

	draw(context,tubeSprite,marioArray){
				
		if(marioArray.pos.x < 450 ){
			tubeSprite.drawSprite("highTube",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000){
			tubeSprite.drawSprite("highTube",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 ){
			tubeSprite.drawSprite("highTube",context,this.pos.x  - 4550 ,this.pos.y);
		}
	
	}
}

export {HighTube};