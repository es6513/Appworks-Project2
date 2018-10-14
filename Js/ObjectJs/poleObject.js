import {PositionAndSpeed} from "../positionAndSpeed.js";
// import {mario} from "../marioTest.js";


class Pole{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.width = 16;
		this.height = 176;
	}
	
	update(){

	}

	draw(context,poleSprite,marioArray){
				
		if(marioArray.pos.x < 450 ){
			poleSprite.drawSprite("pole",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000){
			poleSprite.drawSprite("pole",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 ){
			poleSprite.drawSprite("pole",context,this.pos.x  - 4550 ,this.pos.y);
		}
	
	}
}

export {Pole};