import {PositionAndSpeed} from "../positionAndSpeed.js";
// import {marioArray} from "../marioArrayTest.js";


class Fireball{
	constructor(){
		this.pos = new PositionAndSpeed();
		this.previousPos = new PositionAndSpeed();
		this.speed = new PositionAndSpeed(8,2);
		this.frameIndex = 0;
		this.faceDirection = 1;
		this.goRight = false;
		this.goLeft = false;
		this.direction = 0;
		this.width = 16;
		this.height = 16;
		this.show = false;
		this.recordSwitch = true;
		this.falling = false;
		this.canBounce = false;
		this.isExplosion  = false;
		this.clearTimeout;
		this.clearTimeout2;
		this.framesRun = [
			"bullet-1","bullet-1","bullet-1","bullet-1",
			"bullet-2","bullet-2","bullet-2","bullet-2",
			"bullet-3","bullet-3","bullet-3","bullet-3",
			"bullet-4","bullet-4","bullet-4","bullet-4",
		];

		this.explosionRun = [
			"explosion1","explosion1","explosion1","explosion1","explosion1",
			"explosion2","explosion2","explosion2","explosion2","explosion2",
			"explosion3","explosion3","explosion3","explosion3","explosion3",
		];
	}
	
	update(marioArray,backgroundJson,goombaArray,turtleArray,badPlantArray,tubeJson,highTubeJson,highestTubeJson,oddBrickJson){
		this.faceDirection = marioArray.faceDirection;
		// 	碰撞公式:shape.pos.x + shape.width > this.pos.x  左
		//	&& shape.pos.x < this.pos.x + this.width 右
		//	&& shape.pos.y + shape.height > this.pos.y 上
		//	&& shape.pos.y < this.pos.y + this.height 下
		if(this.recordSwitch){
			this.previousPos.x = this.pos.x;
		}

		let timeoutId2;
		if(this.recordSwitch && !this.clearTimeout2){
			timeoutId2 = setTimeout(() => {
				this.recordSwitch = false;
				this.clearTimeout2 = null;
			}, 20);
			this.clearTimeout2 = timeoutId2;
		}	//用來切換紀錄先前位置

		// -------------火球碰到障礙物-------------------


		//--------- Case 1 : tube-----------------------

		tubeJson.Pos[0].ranges.forEach(([x,y])=>{
			if(this.pos.x +  this.width  > x  
				&& this.pos.x  < x + tubeJson.width 
				&& this.pos.y +  this.height  > y
				&& this.pos.y  < y + tubeJson.height  )
			{	
				this.isExplosion = true;
			}
		});

		highTubeJson.Pos[0].ranges.forEach(([x,y])=>{
			if(this.pos.x +  this.width  > x  
				&& this.pos.x  < x + highTubeJson.width 
				&& this.pos.y +  this.height  > y
				&& this.pos.y  < y + highTubeJson.height  )
			{	
				this.isExplosion = true;
			}
		});

		highestTubeJson.Pos[0].ranges.forEach(([x,y])=>{
			if(this.pos.x +  this.width  > x  
				&& this.pos.x  < x + highestTubeJson.width 
				&& this.pos.y +  this.height  > y
				&& this.pos.y  < y + highestTubeJson.height  )
			{	
				this.isExplosion = true;
			}
		});

		oddBrickJson.Pos[0].ranges.forEach(([x,y])=>{
			if(this.pos.x +  this.width  > x 
				&& this.pos.x  < x + oddBrickJson.width
				&& this.pos.y +  this.height  > y
				&& this.pos.y  < y + oddBrickJson.height )
			{	
				this.isExplosion = true;
			}
		});

		let timeoutId;
	
		if(this.isExplosion && !this.clearTimeout){
			timeoutId = setTimeout(() => {
				this.isExplosion = false;
				this.show = false;	
				this.clearTimeout = null;
			}, 250);
			this.clearTimeout = timeoutId;
		}	


		// -------------end 火球碰到障礙物-----------------


		// 這裡用來控制當馬力歐發射火球的狀況。

		//-----------------火球打死怪物-----------

		// 這邊有個 BUG 當有怪物的時候正常，沒怪物的時候因為怪物的陣列為空陣列，會導致這兩段程式碼無法判斷
		for(let j = 0;j < goombaArray.length;j += 1){
			if(!this.isExplosion && this.pos.x + this.width > goombaArray[j].pos.x
				&& this.pos.x < goombaArray[j].pos.x + goombaArray[j].width
				&& this.pos.y + this.height > goombaArray[j].pos.y
				&& this.pos.y < goombaArray[j].pos.y + goombaArray[j].height
			){
				goombaArray[j].hitByFire = true;
				this.dieSound();
				this.isExplosion = true;
				return;
			}
		}

		for(let j = 0;j < turtleArray.length;j += 1){
			if(!this.isExplosion && this.pos.x + this.width > turtleArray[j].pos.x
				&& this.pos.x < turtleArray[j].pos.x + turtleArray[j].width
				&& this.pos.y + this.height > turtleArray[j].pos.y
				&& this.pos.y < turtleArray[j].pos.y + turtleArray[j].height
			){
				turtleArray[j].hitByFire = true;
				this.dieSound();
				this.isExplosion = true;
				return;
			}
		}

		for(let j = 0;j < badPlantArray.length;j += 1){
			if(!this.isExplosion && this.pos.x + this.width > badPlantArray[j].pos.x
				&& this.pos.x < badPlantArray[j].pos.x + badPlantArray[j].width
				&& this.pos.y + this.height > badPlantArray[j].pos.y
				&& this.pos.y < badPlantArray[j].pos.y + badPlantArray[j].height
			){
				badPlantArray[j].hitByFire = true;
				this.dieSound();
				this.isExplosion = true;
				return;
			}
		}

		//-------------end of 火球打死goomba-----------
		backgroundJson.backgrounds[1].ranges.forEach(([x1,x2,y1,y2]) =>{
			if(this.pos.x < x2 * 16 + backgroundJson.width
				&& this.pos.x + this.width > x1 * 16){
				this.falling = false;
			}else if(this.pos.x > x2 * 16 + backgroundJson.width
				&& this.pos.y > y1 * backgroundJson.height - 16){
				this.falling = true;
			}


			// this.height / 4 為了配合圖片大小而調整
			if(!this.isExplosion 
				&& this.pos.y >= y1 * backgroundJson.height - this.height + this.height / 4
				&& this.pos.x + this.width > x1 * backgroundJson.width 
				&& this.pos.x < x2 * backgroundJson.width){
				this.speed.y *= -1;
				this.canBounce = true;
			}

			if(this.canBounce 
				&& this.pos.x + this.width > x1 * backgroundJson.width 
				&& this.pos.x < x2 * backgroundJson.width 
				&& this.pos.y <= 224 ){
				this.speed.y *= -1;
			}

		});


		if(!this.isExplosion && !this.show  && this.faceDirection == 1 && !this.goRight){
			this.pos.x = marioArray.pos.x ;
			this.pos.y = marioArray.pos.y + 8;
			this.goRight = true;
			this.show = true;
		}
		
		// 左邊--------bug--------


		if(!this.isExplosion && !this.show  && this.faceDirection == -1 && !this.goLeft){
			this.pos.x = marioArray.pos.x ;
			this.pos.y = marioArray.pos.y + 8;
			this.goLeft = true;
			this.show = true;
		}


		if(this.goRight && !this.isExplosion){
			this.pos.x += this.speed.x;
		}

		if(this.goLeft && !this.isExplosion){
			this.pos.x -= this.speed.x;
		}

		if(!this.isExplosion){
			this.pos.y += this.speed.y;
		}
					
		
		if(this.goRight && this.pos.x > 6000 ){
			this.goRight = false;
			this.show = false;
		}

		if(this.goLeft && this.pos.x < 0){
			this.goLeft = false;
			this.show = false;
		}
	
	}

	firing(){
		this.frameIndex = ++this.frameIndex % 16 ;
		return this.framesRun[this.frameIndex];
	}

	explosion(){
		this.frameIndex = ++this.frameIndex % 15 ;
		return this.explosionRun[this.frameIndex];
	}

	dieSound(){
		let dieSound = new Audio("/music/mario-kick-sound.wav");
		dieSound.play();
	}

	kicksound(){
		let kicksound = new Audio("/music/mario-kick-sound.wav");
		kicksound.play();
	}


	draw(context,fireballSprite,marioArray){	
		// 這邊要調數字 BUG  往左邊發射的話，會重複在畫面上畫
		if(this.show && this.goRight && !this.goLeft && !this.isExplosion ){
			if(this.previousPos.x < 450){
				fireballSprite.drawFireBallSprite(this.firing(),context,this.pos.x,this.pos.y,this.faceDirection < 0);
			}else if(this.previousPos.x >= 450 && this.previousPos.x < 5000 ){
				fireballSprite.drawFireBallSprite(this.firing(),context,this.pos.x - marioArray.pos.x  + 450 ,this.pos.y,this.faceDirection < 0);
			}else if(this.previousPos.x >= 5000 ){
				fireballSprite.drawFireBallSprite(this.firing(),context,this.pos.x  - 4550 ,this.pos.y,this.faceDirection < 0);
			}
		}

		if(this.isExplosion){
			if(this.previousPos.x < 450){
				fireballSprite.drawFireBallSprite(this.explosion(),context,this.pos.x,this.pos.y,this.faceDirection < 0);
			}else if(this.previousPos.x >= 450 && this.previousPos.x < 5000 ){
				fireballSprite.drawFireBallSprite(this.explosion(),context,this.pos.x - marioArray.pos.x  + 450   ,this.pos.y,this.faceDirection < 0);
			}else if(this.previousPos.x >= 5000 ){
				fireballSprite.drawFireBallSprite(this.explosion(),context,this.pos.x  - 4550 ,this.pos.y,this.faceDirection < 0);
			}
		}

		if(this.show && this.goLeft && !this.goRight && !this.isExplosion ){
			if(this.previousPos.x < 450){
				fireballSprite.drawFireBallSprite(this.firing(),context,this.pos.x,this.pos.y,this.faceDirection < 0);
			}else if(this.previousPos.x >= 450 && this.previousPos.x < 5000 ){
				fireballSprite.drawFireBallSprite(this.firing(),context,this.pos.x - marioArray.pos.x  + 450 ,this.pos.y,this.faceDirection < 0);
			}else if(this.previousPos.x >= 5000 ){
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