import {PositionAndSpeed} from "../positionAndSpeed.js";
// import {marioArray} from "../marioArrayTest.js";


class Mushroom{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.speed = new PositionAndSpeed(2,1);
		this.frameIndex = 0;
		this.width = 16;
		this.height = 16;
		this.show = true;
		this.onGround = false;
		this.previousY;
		this.previousX;
		this.rightBoundX;
		this.appear = false;
	}
	
	update(marioArray,backgroundJson,oddBrickJson,tubeJson,highTubeJson,highestTubeJson){
		// X 軸判定要再調整一下
		// 	碰撞公式:shape.pos.x + shape.width > this.pos.x  左
		//	&& shape.pos.x < this.pos.x + this.width 右
		//	&& shape.pos.y + shape.height > this.pos.y 上
		//	&& shape.pos.y < this.pos.y + this.height 下


		if(!this.appear){
			this.previousY = this.pos.y;
			this.previousX = this.pos.x;
		}		

		// //蘑菇被撞到後先往上移
		if(!this.onGround && this.appear && this.pos.y > this.previousY - this.height
			&& this.pos.x < this.previousX + this.width){
			this.pos.y -= this.speed.y;
		}

		// 完全出現後往右邊移動

		if(this.pos.y <= this.previousY - this.height 
			&& this.pos.x < 2064){
			this.pos.x += this.speed.x;
		}

		// brickJson.Pos[0].ranges.forEach(([x,y])=>{
		// 	if(!this.onGround && this.pos.y <= this.previousY - this.height 
		// 		&& this.pos.x < x + brickJson.width + 16 ){
		// 		this.pos.x += this.speed.x;
		// 	}
		// 	// //落地
		// 	// if( this.pos.x >= x + brickJson.width){
		// 	// 	this.pos.y += this.speed.y;
		// 	// }
		// });

		if( this.pos.x >=  this.previousX + this.width * 5){
			this.pos.y += this.speed.y;
		}

		// for(let i = 0; i < questionBrickArray.length;i += 1){
		// 	if(this.pos.x < questionBrickArray[i].pos.x){
		// 		this.rightBoundX = 
		// 	}
		// }



		//----------------end 往右邊移動-----------------

		//------------------障礙物-------------------

		// ----------------Case 1: oddBrick ---------------------

		oddBrickJson.Pos[0].ranges.forEach(([x,y])=>{
			if(this.pos.x +  this.width > x 
							&& this.pos.x  < x + oddBrickJson.width )
			{	
				this.speed.x *= -1;
			}
		});


		// ----------------Case 2 : tube-----------------
		tubeJson.Pos[0].ranges.forEach(([x,y])=>{
			if(this.pos.x +  this.width > x 
							&& this.pos.x  < x + tubeJson.width )
			{	
				this.speed.x *= -1;
			}
		});


		highTubeJson.Pos[0].ranges.forEach(([x,y])=>{
			if(this.pos.x +  this.width > x 
				&& this.pos.x  < x + highTubeJson.width )
			{	
				this.speed.x *= -1;
			}
		});

		highestTubeJson.Pos[0].ranges.forEach(([x,y])=>{
			if(this.pos.x +  this.width > x 
				&& this.pos.x  < x + highestTubeJson.width )
			{	
				this.speed.x *= -1;
			}
		});	



		//-----------------香菇在地面上的移動-----------
		backgroundJson.backgrounds[1].ranges.forEach(([x1,x2,y1,y2]) =>{
			if(this.pos.x < x2 * 16 + backgroundJson.width
				&& this.pos.x + this.width > x1 * 16){
				this.falling = false;
			}else if(this.pos.x > x2 * 16 + backgroundJson.width
				&& this.pos.y > y1 * backgroundJson.height - 32){
				this.falling = true;
			}

			if(this.pos.y >= y1 * backgroundJson.height - this.height
				&& this.pos.x + this.width > x1 * 16
				&& this.pos.x < x2 * 16 + 16){
				this.onGround = true;
				this.pos.y = y1 * backgroundJson.height - this.height;
				this.pos.x += this.speed.x;
			}
	
			if(this.falling && this.pos.x > x2 * 16 + 16){
				this.speed.y = 2;
				this.pos.y += this.speed.y;
			}
			//-------------懸崖 bug  掉下的速度要再調整 ，
			//蘑菇在撞擊後會直接穿越地板(應該可以像怪物一樣，用 facedirection 解決)------

			if(this.pos.y >= y2 * backgroundJson.height + 1600){
				this.show = false;
			}

		});

		//--------------end of 香菇在地面上的移動-----------
		
		if( this.appear 
			&& this.pos.x < marioArray.pos.x + marioArray.width
			&& this.pos.x + this.width >  marioArray.pos.x    
			&& this.pos.y < marioArray.pos.y + marioArray.height
			&& this.pos.y >  marioArray.pos.y  
		){	
			this.show = false;
			marioArray.isInvincible = true;
			this.mushroomPowerSound();
			if(!marioArray.isBigMario && !marioArray.isFireMario){
				marioArray.changeToBig = true;
			}
		}
		//16是金幣的寬度， EX : 160 < marioArray.pos < 176
		// 前兩行的 +8 +10 => 讓判定範圍更精準，並非真正碰撞
	}

	mushroomPowerSound(){
		let mushroomSound = new Audio("/music/maro-powerup-sound.wav");
		mushroomSound.play();
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