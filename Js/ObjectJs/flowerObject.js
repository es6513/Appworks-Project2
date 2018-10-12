import {PositionAndSpeed} from "../positionAndSpeed.js";
// import {marioArray} from "../marioArrayTest.js";


class Flower{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.frameIndex = 0;
		this.width = 16;
		this.height = 16;
		this.show = true;


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

		
		if(this.show && this.pos.x <= marioArray.pos.x + 12
			&& this.pos.x + 12 >=  marioArray.pos.x   
			&& this.pos.y <= marioArray.pos.y + marioArray.height
			&& this.pos.y >=  marioArray.pos.y  
		){		
			this.show = false;
			if(marioArray.isBigMario && !marioArray.isFireMario){
				marioArray.changeToFire = true;
			}else if(!marioArray.isBigMario && !marioArray.isFireMario){
				marioArray.changeToBig = true;
			}
		
		}
		//16是寬度， EX : 160 < marioArray.pos < 176
		// 前兩行的 +8 +12 => 讓判定範圍更精準，並非真正碰撞
	}

	flashing(){
		this.frameIndex = ++this.frameIndex % 36 ;
		return this.framesRun[this.frameIndex];
	}

	flowerSound(){
		let flowerSound = new Audio();
		flowerSound.play();
	}

	draw(context,flowerSprite,marioArray){
	
		if(marioArray.pos.x < 450 && this.show){
			flowerSprite.drawSprite(this.flashing(),context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 1800 && this.show){
			flowerSprite.drawSprite(this.flashing(),context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 1800 && this.show){
			flowerSprite.drawSprite(this.flashing(),context,this.pos.x  - 1350 ,this.pos.y);
		}
	
	}
}

export {Flower};