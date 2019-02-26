import {PositionAndSpeed} from "../positionAndSpeed.js";


class Flycoin{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.speed = new PositionAndSpeed(0,4);
		this.frameIndex = 0;
		this.width = 16;
		this.height = 16;
		this.show = false;
		this.isVanished = false;
		this.goUp = false;
		this.framesRun = [
			"flycoin-1","flycoin-1","flycoin-1","flycoin-1","flycoin-1","flycoin-1","flycoin-1","flycoin-1","flycoin-1",
			"flycoin-2","flycoin-2","flycoin-2","flycoin-2","flycoin-2","flycoin-2","flycoin-2","flycoin-2","flycoin-2",
			"flycoin-3","flycoin-3","flycoin-3","flycoin-3","flycoin-3","flycoin-3","flycoin-3","flycoin-3","flycoin-3",
			"flycoin-4","flycoin-4","flycoin-4","flycoin-4","flycoin-4","flycoin-4","flycoin-4","flycoin-4","flycoin-4"
		];

	}
	
	update(){
		// 	碰撞公式:shape.pos.x + shape.width > this.pos.x  左
		//	&& shape.pos.x < this.pos.x + this.width 右
		//	&& shape.pos.y + shape.height > this.pos.y 上
		//	&& shape.pos.y < this.pos.y + this.height 下


		// bug  金幣的速度與設定的不一致， EX: 設定1會變3 、設定2會變4，暫時先用大於小於的方式來做判定消失

		if(!this.show){
			this.previousY = this.pos.y;
			this.previousX = this.pos.x;
		}		
		if(this.pos.y == this.previousY - this.height * 6){
			this.speed.y *= -1;
		}
    
		if(this.speed.y < 0 && this.pos.y >= this.previousY){
			this.show = false;
			this.isVanished = true;
		}
    
		if(this.show){
			this.pos.y -= this.speed.y;
		}


	}

	flashing(){
		this.frameIndex = ++this.frameIndex % 36 ;
		return this.framesRun[this.frameIndex];
	}

	coinSound(){
		let coinSound = new Audio("/music/mario-coin-sound.wav");
		coinSound.play();
	}

	draw(context,flycoinSprite,marioArray){
		if(marioArray.pos.x < 450 && this.show){
			flycoinSprite.drawSprite(this.flashing(),context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000 && this.show){
			flycoinSprite.drawSprite(this.flashing(),context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 && this.show){
			flycoinSprite.drawSprite(this.flashing(),context,this.pos.x  - 4550 ,this.pos.y);
		}
	
	}
}

export {Flycoin};