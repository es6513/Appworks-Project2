import {PositionAndSpeed} from "../positionAndSpeed.js";
import {mario} from "../marioTest.js";


class Flag{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.speed = {
			y:0.5
		};
		this.width = 16;
		this.height = 16;
		this.isOnBottom = false;
	}
	
	update(poleJson){
		if(!this.isOnBottom && mario.passStage){
			this.moveDown();
		}
		poleJson.Pos[0].ranges.forEach(([x,y])=>{
			if( this.pos.y  == y + poleJson.height - 16 - this.height)
			{ //從左側碰到水管
				this.pos.y =  y + poleJson.height - 16 - this.height;
				this.isOnBottom = true;
			}
		});
	}

	moveDown(){
		this.pos.y += this.speed.y;
	}

	draw(context,flagSprite){
				
		if(mario.pos.x < 450 ){
			flagSprite.drawSprite("flag",context,this.pos.x,this.pos.y);
		}else if(mario.pos.x >= 450 && mario.pos.x < 1600){
			flagSprite.drawSprite("flag",context,this.pos.x - mario.pos.x + 450 ,this.pos.y);
		}else if(mario.pos.x >= 1600 ){
			flagSprite.drawSprite("flag",context,this.pos.x  - 1150 ,this.pos.y);
		}
	
	}
}

export {Flag};