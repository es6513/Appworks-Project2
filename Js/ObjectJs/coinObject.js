import {PositionAndSpeed} from "../positionAndSpeed.js";
// import {marioArray} from "../marioArrayTest.js";


class Coin{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.frameIndex = 0;
		this.width = 16;
		this.height = 16;
		this.show = true;
		this.framesRunTest = [
			"coin-1",
			"coin-2",
			"coin-3",
		];

		this.framesRun = [
			"coin-1","coin-1","coin-1","coin-1","coin-1","coin-1","coin-1","coin-1","coin-1","coin-1","coin-1","coin-1",
			"coin-2","coin-2","coin-2","coin-2","coin-2","coin-2","coin-2","coin-2","coin-2","coin-2","coin-2","coin-2",
			"coin-3","coin-3","coin-3","coin-3","coin-3","coin-3","coin-3","coin-3","coin-3","coin-3","coin-3","coin-3"
		];

	}
	
	update(marioArray){
		// X 軸判定要再調整一下

		if(this.show && this.pos.x <= marioArray.pos.x + 8 
			&& this.pos.x + 8 >=  marioArray.pos.x   
			&& this.pos.y <= marioArray.pos.y + 16
			&& this.pos.y >=  marioArray.pos.y  
		
		){		
			this.show = false;
			this.coinSound();
		}
		//16是金幣的寬度， EX : 160 < marioArray.pos < 176
		// 前兩行的 +8 +10 => 讓判定範圍更精準，並非真正碰撞
	}

	flashing(){
		this.frameIndex = ++this.frameIndex % 36 ;
		return this.framesRun[this.frameIndex];
	}

	coinSound(){
		let coinSound = new Audio("/music/mario-coin-sound.wav");
		coinSound.play();
	}

	draw(context,coinSprite,marioArray){
	
		if(marioArray.pos.x < 450 && this.show){
			coinSprite.drawSprite(this.flashing(),context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 1800 && this.show){
			coinSprite.drawSprite(this.flashing(),context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 1800 && this.show){
			coinSprite.drawSprite(this.flashing(),context,this.pos.x  - 1350 ,this.pos.y);
		}
	
	}
}

export {Coin};