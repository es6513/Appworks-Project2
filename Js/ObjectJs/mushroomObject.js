import {PositionAndSpeed} from "../positionAndSpeed.js";
// import {marioArray} from "../marioArrayTest.js";


class Mushroom{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.frameIndex = 0;
		this.width = 16;
		this.height = 16;
		this.show = true;
	}
	
	update(marioArray){
		// X 軸判定要再調整一下
	// 	碰撞公式:shape.pos.x + shape.width > this.pos.x  左
		//	&& shape.pos.x < this.pos.x + this.width 右
		//	&& shape.pos.y + shape.height > this.pos.y 上
		//	&& shape.pos.y < this.pos.y + this.height 下
		
		
		if(this.show && this.pos.x <= marioArray.pos.x + 12 
			&& this.pos.x + 12 >=  marioArray.pos.x   
			&& this.pos.y <= marioArray.pos.y + marioArray.height
			&& this.pos.y >=  marioArray.pos.y  
		){		
			this.show = false;
			this.mushroomSound();
			if(!marioArray.isBigMario && !marioArray.isFireMario){
				marioArray.changeToBig = true;
			}
			
		}
		//16是金幣的寬度， EX : 160 < marioArray.pos < 176
		// 前兩行的 +8 +10 => 讓判定範圍更精準，並非真正碰撞
	}

	mushroomSound(){
		let mushroomSound = new Audio("/music/maro-powerup-sound.wav");
		mushroomSound.play();
	}

	draw(context,mushroomSprite,marioArray){
	
		if(marioArray.pos.x < 450 && this.show){
			mushroomSprite.drawSprite("mushroom",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 1800 && this.show){
			mushroomSprite.drawSprite("mushroom",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 1800 && this.show){
			mushroomSprite.drawSprite("mushroom",context,this.pos.x  - 1350 ,this.pos.y);
		}
	
	}
}

export {Mushroom};