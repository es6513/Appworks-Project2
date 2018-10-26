import {PositionAndSpeed} from "../positionAndSpeed.js";


class HighestTube{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.width = 32;
		this.height = 64;
	}


	draw(context,tubeSprite,marioArray){
				
		if(marioArray.pos.x < 450 ){
			tubeSprite.drawSprite("highestTube",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000){
			tubeSprite.drawSprite("highestTube",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 ){
			tubeSprite.drawSprite("highestTube",context,this.pos.x  - 4550 ,this.pos.y);
		}
	
	}
}

export {HighestTube};