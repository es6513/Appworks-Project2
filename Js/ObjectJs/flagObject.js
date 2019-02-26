import {PositionAndSpeed} from "../positionAndSpeed.js";

class Flag{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.speed = {
			y:2
		};
		this.width = 16;
		this.height = 16;
		this.isOnBottom = false;
	}
	
	update(marioArray,poleJson){
		if(!this.isOnBottom && marioArray.canPlayPassMusic){
			this.moveDown();
		}
		poleJson.Pos[0].ranges.forEach(([x,y])=>{
			if( this.pos.y  >= y + poleJson.height - 16 - this.height)
			{ 
				this.pos.y =  y + poleJson.height - 16 - this.height;
				this.isOnBottom = true;
			}
		});
	}

	moveDown(){
		this.pos.y += this.speed.y;
	}

	draw(context,flagSprite,marioArray){
		if(marioArray.pos.x < 450 ){
			flagSprite.drawSprite("flag",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000){
			flagSprite.drawSprite("flag",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 ){
			flagSprite.drawSprite("flag",context,this.pos.x  - 4550 ,this.pos.y);
		}
	
	}
}

export {Flag};