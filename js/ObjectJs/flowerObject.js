import {PositionAndSpeed} from "../positionAndSpeed.js";


class Flower{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.speed = new PositionAndSpeed(0,1);
		this.frameIndex = 0;
		this.width = 16;
		this.height = 16;
		this.show = true;
		this.appear = false;
		this.framesRun = [
			"flower-1","flower-1","flower-1","flower-1","flower-1","flower-1","flower-1","flower-1","flower-1","flower-1","flower-1","flower-1",
			"flower-2","flower-2","flower-2","flower-2","flower-2","flower-2","flower-2","flower-2","flower-2","flower-2","flower-2","flower-2",
			"flower-3","flower-3","flower-3","flower-3","flower-3","flower-3","flower-3","flower-3","flower-3","flower-3","flower-3","flower-3"
		];

	}
	
	update(marioArray){
		// X 軸判定要再調整一下
	// 	碰撞公式:shape.pos.x + shape.width > this.pos.x  左
		//	&& shape.pos.x < this.pos.x + this.width 右
		//	&& shape.pos.y + shape.height > this.pos.y 上
		//	&& shape.pos.y < this.pos.y + this.height 下

		if(!this.appear){
			this.previousY = this.pos.y;
			this.previousX = this.pos.x;
		}		

		// 花被撞到後先往上移
		if(this.appear && this.pos.y > this.previousY - this.height
			&& this.pos.x < this.previousX + this.width){
			this.pos.y -= this.speed.y;
		}

		if(this.appear 
			&& this.pos.x < marioArray.pos.x + marioArray.width
			&& this.pos.x + this.width >  marioArray.pos.x   
			&& this.pos.y < marioArray.pos.y + marioArray.height
			&& this.pos.y >  marioArray.pos.y  
		){		
			this.show = false;
			marioArray.isInvincible = true;
			this.flowerPowerSound();
			if(marioArray.isBigMario && !marioArray.isFireMario){
				marioArray.changeToFire = true;
			}else if(!marioArray.isBigMario && !marioArray.isFireMario){
				marioArray.changeToBig = true;
			}
		}
	}

	flashing(){
		this.frameIndex = ++this.frameIndex % 36 ;
		return this.framesRun[this.frameIndex];
	}

	flowerPowerSound(){
		let flowerSound = new Audio("/music/maro-powerup-sound.wav");
		flowerSound.play();
	}

	draw(context,flowerSprite,marioArray){
	
		if(marioArray.pos.x < 450 && this.show){
			flowerSprite.drawSprite(this.flashing(),context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000 && this.show){
			flowerSprite.drawSprite(this.flashing(),context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 && this.show){
			flowerSprite.drawSprite(this.flashing(),context,this.pos.x  - 4550 ,this.pos.y);
		}
	
	}
}

export {Flower};