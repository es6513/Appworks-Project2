import {PositionAndSpeed} from "../positionAndSpeed.js";
// import {marioArray} from "../marioArrayTest.js";


class Brick{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.frameIndex = 0;
		this.width = 16;
		this.height = 16;
	}
	
	update(marioArray){

		if(this.pos.x <= marioArray.pos.x + 8 
			&& this.pos.x + 8 >=  marioArray.pos.x   
			&& this.pos.y <= marioArray.pos.y + 16
			&& this.pos.y >=  marioArray.pos.y  
		)
		{		

		}
    
	}

	brickSound(){
		let brickSound = new Audio("/music/mario-coin-sound.wav");
		brickSound.play();
	}

	draw(context,brickSprite,marioArray){
	
		if(marioArray.pos.x < 450 ){
			brickSprite.drawSprite("brick",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 1800 ){
			brickSprite.drawSprite("brick",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 1800 ){
			
			brickSprite.drawSprite("brick",context,this.pos.x  - 1350 ,this.pos.y);
		}
	
	}
}

export {Brick};