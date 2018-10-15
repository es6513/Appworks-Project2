import {PositionAndSpeed} from "../positionAndSpeed.js";
// import {marioArray} from "../marioArrayTest.js";


class Fireball{
	constructor(){
		this.pos = new PositionAndSpeed();
		this.previousPos = new PositionAndSpeed();
		this.previousLeftPos = new PositionAndSpeed();
		this.speed = new PositionAndSpeed(8,2);
		this.frameIndex = 0;
		this.faceDirection = 1;
		this.goRight = false;
		this.goLeft = false;
		this.direction = 0;
		this.width = 8;
		this.height = 8;
		this.show = false;
		this.framesRun = [
			"bullet-1","bullet-1","bullet-1","bullet-1",
			"bullet-2","bullet-2","bullet-2","bullet-2",
			"bullet-3","bullet-3","bullet-3","bullet-3",
			"bullet-4","bullet-4","bullet-4","bullet-4",
		];

	}
	
	update(marioArray,screen,goombaArray,turtleArray){
		this.faceDirection = marioArray.faceDirection;
		// 	碰撞公式:shape.pos.x + shape.width > this.pos.x  左
		//	&& shape.pos.x < this.pos.x + this.width 右
		//	&& shape.pos.y + shape.height > this.pos.y 上
		//	&& shape.pos.y < this.pos.y + this.height 下

		// 這裡用來控制當馬力歐發射火球的狀況。

		// ------加速度的 bug----- 要讓火球的速度比馬力歐快才不會看起來很怪


		//-----------------火球打死怪物-----------

		// 這邊有個 BUG 當有怪物的時候正常，沒怪物的時候因為怪物的陣列為空陣列，會導致這兩段程式碼無法判斷
		for(let j = 0;j < goombaArray.length;j += 1){
			if(this.pos.x + this.width > goombaArray[j].pos.x
				&& this.pos.x < goombaArray[j].pos.x + goombaArray[j].width
				&& this.pos.y + this.height > goombaArray[j].pos.y
				&& this.pos.y < goombaArray[j].pos.y + goombaArray[j].height
			){
				goombaArray[j].hitByFire = true;
				this.show = false;
				return;
			}
		}

		for(let j = 0;j < turtleArray.length;j += 1){
			if(this.pos.x + this.width > turtleArray[j].pos.x
				&& this.pos.x < turtleArray[j].pos.x + turtleArray[j].width
				&& this.pos.y + this.height > turtleArray[j].pos.y
				&& this.pos.y < turtleArray[j].pos.y + turtleArray[j].height
			){
				turtleArray[j].hitByFire = true;
				this.show = false;
				return;
			}
		}


		//-------------end of 火球打死goomba-----------

		screen.backgrounds[1].ranges.forEach(([x1,x2,y1,y2]) =>{
			if(this.pos.y >= y1 * screen.height - this.height){
				this.speed.y *= -1;
			}
			if(this.pos.y <= 232 ){
				this.speed.y *= -1;
			}

		});




		if(!this.show  && this.faceDirection == 1 && !this.goRight){
			this.pos.x = marioArray.pos.x ;
			this.previousPos.x = this.pos.x;
			this.pos.y = marioArray.pos.y + 8;
			this.goRight = true;
			this.show = true;
		}
		
		// 左邊--------bug--------


		if(!this.show  && this.faceDirection == -1 && !this.goLeft){
			this.pos.x = marioArray.pos.x ;
			this.previousLeftPos.x = this.pos.x;
			this.pos.y = marioArray.pos.y + 8;
			this.goLeft = true;
			this.show = true;
		}


		if(this.goRight){
			this.pos.x += this.speed.x;
		}

		if(this.goLeft){
			this.pos.x -= this.speed.x;
		}

		this.pos.y += this.speed.y;
		
		
		if(this.goRight && this.pos.x > this.previousPos.x + 480 ){
			this.goRight = false;
			this.show = false;
		}

		if(this.goLeft && this.pos.x < this.previousLeftPos.x - 480){
			this.goLeft = false;
			this.show = false;
		}
	
	}

	firing(){
		this.frameIndex = ++this.frameIndex % 16 ;
		return this.framesRun[this.frameIndex];
	}


	draw(context,fireballSprite,marioArray){	
		// 這邊要調數字 BUG  往左邊發射的話，會重複在畫面上畫
		if(this.show && this.goRight && !this.goLeft ){
			if(this.pos.x < 450){
				fireballSprite.drawFireBallSprite(this.firing(),context,this.pos.x,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 450 && this.pos.x < 5000 ){
				fireballSprite.drawFireBallSprite(this.firing(),context,this.pos.x - marioArray.pos.x  + 450 ,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 5000 ){
				fireballSprite.drawFireBallSprite(this.firing(),context,this.pos.x  - 4550 ,this.pos.y,this.faceDirection < 0);
			}
		}

		// if(this.show && this.goRight && !this.goLeft && marioArray.isRunning && this.faceDirection == 1){
		// 	if(this.pos.x < 450){
		// 		fireballSprite.drawFireBallSprite(this.firing(),context,this.pos.x,this.pos.y,this.faceDirection < 0);
		// 	}else if(this.pos.x >= 450 && this.pos.x < 5000 ){

		// 		fireballSprite.drawFireBallSprite(this.firing(),context,this.pos.x - marioArray.pos.x  + 450   ,this.pos.y,this.faceDirection < 0);
		// 	}else if(this.pos.x >= 5000 ){
		// 		fireballSprite.drawFireBallSprite(this.firing(),context,this.pos.x  - 4550 ,this.pos.y,this.faceDirection < 0);
		// 	}
		// }

		if(this.show && this.goLeft && !this.goRight  ){
			if(this.pos.x < 450){
				fireballSprite.drawFireBallSprite(this.firing(),context,this.pos.x,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 450 && this.pos.x < 5000 ){
				fireballSprite.drawFireBallSprite(this.firing(),context,this.pos.x - marioArray.pos.x  + 450 ,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 5000 ){
				fireballSprite.drawFireBallSprite(this.firing(),context,this.pos.x  - 4550 ,this.pos.y,this.faceDirection < 0);
			}
		}

		// if(this.show && this.goLeft && !this.goRight  && marioArray.isRunning && this.faceDirection == -1){
		// 	if(this.pos.x < 450){
		// 		fireballSprite.drawFireBallSprite(this.firing(),context,this.pos.x,this.pos.y,this.faceDirection < 0);
		// 	}else if(this.pos.x >= 450 && this.pos.x < 5000 ){

		// 		fireballSprite.drawFireBallSprite(this.firing(),context,this.pos.x - marioArray.pos.x  + 450 ,this.pos.y,this.faceDirection < 0);
		// 	}else if(this.pos.x >= 5000 ){
		// 		fireballSprite.drawFireBallSprite(this.firing(),context,this.pos.x  - 4550 ,this.pos.y,this.faceDirection < 0);
		// 	}
		// }
	}
}

export {Fireball};