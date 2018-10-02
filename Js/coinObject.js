import {PositionAndSpeed} from "../Js/positionAndSpeed.js";
import {mario} from "../Js/marioTest.js";


class Coin{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.frameIndex = 0;
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
		if(this.pos.x <= mario.pos.x 
			&& this.pos.x + 16 >=  mario.pos.x   
			&& mario.pos.y >= this.pos.y 
			//16是金幣的寬度， EX : 160<mario.pos
		){
			this.show = false;
		}

		//+8 是馬力歐的寬度一半
	}

	flashing(){
		this.frameIndex = ++this.frameIndex % 36 ;
		return this.framesRun[this.frameIndex];
	}

	interval(){
		setInterval(this.flashing(),1000);
	}

	draw(context,coinSprite){
		// console.log(mario.pos.x);
		// if(this.show){
		// 	coinSprite.drawCoinSprite(this.flashing(),context,this.pos.x,this.pos.y);
		// }
		
		if(mario.pos.x < 450 && this.show){
			coinSprite.drawCoinSprite(this.flashing(),context,this.pos.x,this.pos.y);
		}else if(mario.pos.x >= 450 && mario.pos.x < 1600 && this.show){
			coinSprite.drawCoinSprite(this.flashing(),context,this.pos.x - mario.pos.x + 450 ,this.pos.y);
		}
		
		// let point = 0;
		// if(mario.pos.x <= this.pos.x - 16){
		// 	coinSprite.drawCoinSprite(this.flashing(),context,this.pos.x,this.pos.y);
		// }   用這種判斷是可以視覺上看起來吃掉金幣，但是回頭後金幣還是會重新出現
	}
}

export {Coin};