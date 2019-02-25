import {PositionAndSpeed} from "../positionAndSpeed.js";

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
		this.appear = false;
	}
	
	update(marioArray,backgroundJson,oddBrickJson,tubeJson,highTubeJson,highestTubeJson){

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

		if( this.pos.x >=  this.previousX + this.width * 5){
			this.pos.y += this.speed.y;
		}

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