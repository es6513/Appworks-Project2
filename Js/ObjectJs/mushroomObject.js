import {PositionAndSpeed} from "../positionAndSpeed.js";
// import {marioArray} from "../marioArrayTest.js";


class Mushroom{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.speed = new PositionAndSpeed(1,1);
		this.frameIndex = 0;
		this.width = 16;
		this.height = 16;
		this.show = true;
		this.previousY;
		this.previousX;
		this.appear = false;
	}
	
	update(marioArray,screen,questionBrickJson){
		// X 軸判定要再調整一下
	// 	碰撞公式:shape.pos.x + shape.width > this.pos.x  左
		//	&& shape.pos.x < this.pos.x + this.width 右
		//	&& shape.pos.y + shape.height > this.pos.y 上
		//	&& shape.pos.y < this.pos.y + this.height 下
		if(!this.appear){
			this.previousY = this.pos.y;
			this.previousX = this.pos.x;
		}		

		// if(this.appear && this.pos.y > this.previousY - 16 
		// 	&& this.pos.x <= this.previousX + 16){
		// 	this.speed.y = 2;
		// 	this.pos.y -= this.speed.y;
		// }

		questionBrickJson.Pos[0].ranges.forEach(([x,y])=>{
			
			//蘑菇被撞到後先往上移
			if(this.appear && this.pos.y > y - questionBrickJson.height 
				&& this.pos.x < this.previousX + questionBrickJson.width){
				console.log("123");
				this.pos.y -= this.speed.y;
			}
			//完全出現後往右邊移動
			if(this.pos.y == y - questionBrickJson.height 
				&& this.pos.x < x + questionBrickJson.width){
				this.pos.x += this.speed.x;
			}
			//落地
			if( this.pos.x == 	this.previousX + questionBrickJson.width){
				this.pos.y += this.speed.y;
			}
		});

		if( marioArray.pos.y >= this.pos.y 
			&& marioArray.pos.y <= this.pos.y + 16
			&& marioArray.pos.x + marioArray.width / 2 >= this.pos.x   //判定的bug
			&& marioArray.pos.x <= this.pos.x + this.width / 2 ){
			this.appear = true;
		}

		//-----------------香菇在地面上的移動-----------
		screen.backgrounds[1].ranges.forEach(([x1,x2,y1,y2]) =>{
			if(this.pos.y >= y1 * screen.height - this.height
				&& this.pos.x + this.width > x1 * 16
				&& this.pos.x < x2 * 16 + 16){
				this.pos.y = y1 * screen.height - this.height;
				this.pos.x += this.speed.x;
			}
	
			if(this.appear && this.pos.x > x2 * 16 + 16){
				this.speed.y = 2;
				this.pos.y += this.speed.y;
			}
			//-------------懸崖bug  掉下的速度要再調整------

			if(this.pos.y >= y2 * screen.height + 176){
				this.show = false;
			}

		});

		//--------------end of 香菇在地面上的移動-----------
		
		if(this.appear && this.show && this.pos.x <= marioArray.pos.x + 12 
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

	mushroomAppearSound(){
		let mushroomAppearSound = new Audio("/music/mario-powerup-appears.wav");
		mushroomAppearSound.play();
	}

	draw(context,mushroomSprite,marioArray){
	
		if(marioArray.pos.x < 450 && this.show){
			mushroomSprite.drawSprite("mushroom",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000 && this.show){
			mushroomSprite.drawSprite("mushroom",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 && this.show){
			mushroomSprite.drawSprite("mushroom",context,this.pos.x  - 4550 ,this.pos.y);
		}
	
	}
}

export {Mushroom};