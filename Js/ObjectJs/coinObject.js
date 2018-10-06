import {PositionAndSpeed} from "../positionAndSpeed.js";
import {mario} from "../marioTest.js";


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
	
	update(){
		// X 軸判定要再調整一下

		if(this.pos.x <= mario.pos.x + 8
			&& this.pos.x + 10 >=  mario.pos.x   
			&& this.pos.y <= mario.pos.y + 16
			&& this.pos.y >=  mario.pos.y  
		
		){		
			this.show = false;
		}
		//16是金幣的寬度， EX : 160 < mario.pos < 176
		// 前兩行的 +8 +10 => 讓判定範圍更精準，並非真正碰撞
	}

	flashing(){
		this.frameIndex = ++this.frameIndex % 36 ;
		return this.framesRun[this.frameIndex];
	}

	draw(context,coinSprite){
		
		
		if(mario.pos.x < 450 && this.show){
			coinSprite.drawCoinSprite(this.flashing(),context,this.pos.x,this.pos.y);
		}else if(mario.pos.x >= 450 && mario.pos.x < 1600 && this.show){
			coinSprite.drawCoinSprite(this.flashing(),context,this.pos.x - mario.pos.x + 450 ,this.pos.y);
		}else if(mario.pos.x >= 1600 && this.show){
			coinSprite.drawCoinSprite(this.flashing(),context,this.pos.x  - 1150 ,this.pos.y);
		}
	
	}
}

export {Coin};