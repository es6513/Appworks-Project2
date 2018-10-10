import {PositionAndSpeed} from "../positionAndSpeed.js";
// import {marioArray} from "../marioArrayTest.js";


class Goomba{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.frameIndex = 0;
		this.isDie  = false;
		this.isHide = false;
		this.speed = {
			x:1
		};
		this.width = 16;
		this.height = 16;
		this.clearTimeout;
		this.direction = 1;
		this.faceDirection = 1;
		this.framesRun = [
			"goombaRun-1","goombaRun-1","goombaRun-1","goombaRun-1",
			"goombaRun-1","goombaRun-1","goombaRun-1","goombaRun-1",
			"goombaRun-1","goombaRun-1",
			"goombaRun-2","goombaRun-2","goombaRun-2","goombaRun-2",
			"goombaRun-2","goombaRun-2","goombaRun-2","goombaRun-2",
			"goombaRun-2","goombaRun-2"
		];
	}
	
	update(tubeJson,turtleArray,marioArray){
		// 	碰撞公式:shape.pos.x + shape.width > this.pos.x 
		//	&& shape.pos.x < this.pos.x + this.width
		//	&& shape.pos.y + shape.height > this.pos.y
		//	&& shape.pos.y < this.pos.y + this.height
		// console.log(this.speed.x);
		if(!this.isDie){
			this.move();	
		}	
		
		
		// -------馬力歐碰到壞香菇死掉----------
	
		// X軸的判定 用 width/2 比較好一點,

		//------1.小馬力歐的死亡-------
		if(!marioArray.isInvincible 
			&& !marioArray.isBigMario 
			&& !marioArray.isFireMario 
			&& !marioArray.isDie 
		  && !this.isDie
			&& marioArray.pos.x + marioArray.width  > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height > this.pos.y
			&& marioArray.pos.y < this.pos.y + this.height
			&& !marioArray.isJump
			&& marioArray.isOnGround	)
		{
			let dieSound = new Audio("/music/mario-die-sound.wav");
			dieSound.play();
			marioArray.isDie = true;
			marioArray.speed.y = -10;
			marioArray.pos.y += marioArray.speed.y;
		}


		//------2.大馬力歐死亡變小馬力歐-------
		if(!marioArray.isInvincible 
			&& marioArray.isBigMario 
		  && !this.isDie
			&& marioArray.pos.x + marioArray.width  > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height > this.pos.y
			&& marioArray.pos.y < this.pos.y + this.height
			&& !marioArray.isJump
			&& marioArray.isOnGround	)
		{
			marioArray.speed.y = -10;
			marioArray.isInvincible = true;
			marioArray.isBigMario = false; 
		}


		//------3.火馬力歐死亡變大馬力歐-------

		if(marioArray.isFireMario 
		  && !this.isDie
			&& marioArray.pos.x + marioArray.width  > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height > this.pos.y
			&& marioArray.pos.y < this.pos.y + this.height
			&& !marioArray.isJump
			&& marioArray.isOnGround	)
		{
			marioArray.speed.y = -10;
			marioArray.isInvincible = true;
			marioArray.isFireMario = false;
			marioArray.isBigMario = true; 
		}



	
		//------end 大馬力歐的狀況-------

		// -------End 馬力歐碰到壞香菇死掉-------

		
		// -------壞香菇與障礙物之間的碰撞-------
		tubeJson.Pos[0].ranges.forEach(([x,y])=>{
			if(this.pos.x +  this.width > x  
				&& this.pos.x  < x + tubeJson.width )
			{	
				this.speed.x *= -1;
				this.direction *= -1;
			}
		});

		// -------End 壞香菇與障礙物之間的碰撞-------

	
		// -------馬力歐跳躍攻擊 壞香菇-----------


		// 	碰撞公式:shape.pos.x + shape.width > this.pos.x 
		//	&& shape.pos.x < this.pos.x + this.width
		//	&& shape.pos.y + shape.height > this.pos.y
		//	&& shape.pos.y < this.pos.y + this.height
		// console.log(this.speed.x);


		// ------------------1.小馬力歐的狀況-------------
		if(marioArray.isJump && !marioArray.isBigMario && !marioArray.isDie && !this.isDie && marioArray.speed.y > 0 
			&& marioArray.pos.x + marioArray.height > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width
			&& marioArray.pos.y > this.pos.y - marioArray.height){
			{
				this.turtleDieSound();
				this.isDie = true;
				marioArray.speed.y = -4;
			}		
		}


		// ------------------2.大馬力歐的狀況-------------
		if(marioArray.isBigMario && !marioArray.isDie && !this.isDie && marioArray.speed.y > 0 
			&& marioArray.pos.x + marioArray.height > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width
			&& marioArray.pos.y > this.pos.y - marioArray.height){
			{
				this.turtleDieSound();
				this.isDie = true;
				marioArray.speed.y = -4;
			}		
		}
	

		// -------End 馬力歐跳躍攻擊 壞香菇-----------

		//--------旋轉中的烏龜打死壞香菇--------------

		for(let i = 0 ;i < turtleArray.length;i += 1){
			if(!this.isDie && turtleArray[i].isRotating 
				&& turtleArray[i].pos.x + 16 > this.pos.x 
				&& turtleArray[i].pos.x < this.pos.x + 16){
				this.turtleDieSound();
				this.isDie = true;
			}
		}

		//--------End 旋轉中的烏龜打死壞香菇--------------


		//--------End 旋轉中的烏龜打死壞香菇--------------

		// ------------香菇消失在畫面上----------------

		//每次都要去判斷 setTimeout 產生的排程是否已經存在，才不會重複執行排程

		let timeoutId;
	
		if(this.isDie && !this.clearTimeout){
			timeoutId = setTimeout(() => {
				this.isHide = true;	
				this.clearTimeout = null;
			}, 1500);
			this.clearTimeout = timeoutId;
		}	
		
		// ------------End of 香菇消失在畫面上-----------------
		
	}

	move(){
		this.pos.x += this.speed.x;
	}
  
	turtleDieSound(){
		let dieSound = new Audio("/music/mario-kick-sound.wav");
		dieSound.play();
	}

	running(){
		if(this.direction == 1){
			this.frameIndex = ++this.frameIndex % 20;
			return this.framesRun[this.frameIndex];
		}else if(this.direction == -1){
			this.frameIndex = ++this.frameIndex % 20;
			return this.framesRun[this.frameIndex];
		}
		return"goombaRun-1";

		// this.frameIndex = ++this.frameIndex % 20 ;
		// return this.framesRun[this.frameIndex];
	}

	draw(context,goombaSprite,marioArray){
		if(marioArray.pos.x < 450 && !this.isDie && !this.isHide){
			goombaSprite.drawSprite(this.running(),context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 1600 && !this.isDie && !this.isHide){
			goombaSprite.drawSprite(this.running(),context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 1600 && !	this.isDie && !this.isHide){
			goombaSprite.drawSprite(this.running(),context,this.pos.x  - 1150 ,this.pos.y);
		}

		if(marioArray.pos.x < 450 && this.isDie && !this.isHide){
			goombaSprite.drawSprite("goombaDie",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 1600 && 	this.isDie && !this.isHide){
			goombaSprite.drawSprite("goombaDie",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 1600 && 	this.isDie && !this.isHide){
			goombaSprite.drawSprite("goombaDie",context,this.pos.x  - 1150 ,this.pos.y);
		}	
	}
}

export {Goomba};