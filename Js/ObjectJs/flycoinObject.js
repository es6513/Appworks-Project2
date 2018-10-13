import {PositionAndSpeed} from "../positionAndSpeed.js";
// import {marioArray} from "../marioArrayTest.js";


class Flycoin{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.speed = new PositionAndSpeed(0,2);
		this.frameIndex = 0;
		this.width = 16;
		this.height = 16;
		this.show = false;
		this.framesRun = [
			"flycoin-1","flycoin-1","flycoin-1","flycoin-1","flycoin-1","flycoin-1","flycoin-1","flycoin-1","flycoin-1",
			"flycoin-2","flycoin-2","flycoin-2","flycoin-2","flycoin-2","flycoin-2","flycoin-2","flycoin-2","flycoin-2",
			"flycoin-3","flycoin-3","flycoin-3","flycoin-3","flycoin-3","flycoin-3","flycoin-3","flycoin-3","flycoin-3",
			"flycoin-4","flycoin-4","flycoin-4","flycoin-4","flycoin-4","flycoin-4","flycoin-4","flycoin-4","flycoin-4"
		];

	}
	
	update(marioArray,questionBrickJson){
		// 	碰撞公式:shape.pos.x + shape.width > this.pos.x  左
		//	&& shape.pos.x < this.pos.x + this.width 右
		//	&& shape.pos.y + shape.height > this.pos.y 上
		//	&& shape.pos.y < this.pos.y + this.height 下
		if(!this.show){
			this.previousY = this.pos.y;
			this.previousX = this.pos.x;
		}		
    
		if(this.pos.y == this.previousY - 64){
			this.speed.y *= -1;
		}
    
		if(this.speed.y < 0 && this.pos.y == this.previousY){
			this.show = false;
		}
    
		questionBrickJson.Pos[0].ranges.forEach(([x,y])=>{
			
			if(this.show){
				this.pos.y -= this.speed.y;
			}

		});

		if( marioArray.pos.y >= this.pos.y 
			&& marioArray.pos.y <= this.pos.y + 16
			&& marioArray.pos.x + marioArray.width / 2 > this.pos.x   //判定的bug
			&& marioArray.pos.x < this.pos.x + this.width ){
			this.show = true;
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
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 2500 && this.show){
			flycoinSprite.drawSprite(this.flashing(),context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 2500 && this.show){
			flycoinSprite.drawSprite(this.flashing(),context,this.pos.x  - 2050 ,this.pos.y);
		}
	
	}
}

export {Flycoin};