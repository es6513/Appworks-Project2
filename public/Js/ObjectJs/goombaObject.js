import {PositionAndSpeed} from "../positionAndSpeed.js";
// import {marioArray} from "../marioArrayTest.js";


class Goomba{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.frameIndex = 0;
		this.isDie  = false;
		this.hitByFire = false;
		this.show = true;
		this.falling = false;
		this.speed = {
			x:1,
			y:2
		};
		this.width = 16;
		this.height = 16;
		this.clearTimeout;
		this.direction = -1;
		this.faceDirection = -1;
		this.framesRun = [
			"goombaRun-1","goombaRun-1","goombaRun-1","goombaRun-1",
			"goombaRun-1","goombaRun-1","goombaRun-1","goombaRun-1",
			"goombaRun-1","goombaRun-1",
			"goombaRun-2","goombaRun-2","goombaRun-2","goombaRun-2",
			"goombaRun-2","goombaRun-2","goombaRun-2","goombaRun-2",
			"goombaRun-2","goombaRun-2"
		];
	}
	
	update(tubeJson,highTubeJson,highestTubeJson,turtleArray,marioArray,backgroundJson,oddBrickJson){
		this.faceDirection = this.direction;
		// 	碰撞公式:shape.pos.x + shape.width > this.pos.x 
		//	&& shape.pos.x < this.pos.x + this.width
		//	&& shape.pos.y + shape.height > this.pos.y
		//	&& shape.pos.y < this.pos.y + this.height
		// console.log(this.speed.x);

		// ------bug----- 已經消失的怪物需要清除掉(preffered) 或是讓她不能再移動，否則會有bug
		if(!this.isDie && !this.falling){
			this.move();	
		}	
		
		
		// -------馬力歐碰到壞香菇死掉----------
	
		// X軸的判定 用 width/2 比較好一點,

		//------1.小馬力歐的死亡-------

		if(!marioArray.isInvincible 
			&& !marioArray.isBigMario 
			&& !marioArray.isFireMario 
			&& !marioArray.willDie 
			&& !marioArray.falling 
			&& !marioArray.underGround
			&& !this.isDie
			&& !this.hitByFire
			&& marioArray.pos.x + marioArray.width  > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height > this.pos.y
			&& marioArray.pos.y < this.pos.y + this.height
			&& !marioArray.isJump
			&& marioArray.isOnGround	)
		{
			let dieSound = new Audio("/music/mario-die-sound.wav");
			dieSound.play();
			marioArray.willDie = true;
			// marioArray.speed.y = -10;
			// marioArray.pos.y += marioArray.speed.y;
		}

		//------2.大馬力歐死亡變小馬力歐-------
		
		if(!marioArray.isInvincible 
			&& marioArray.isBigMario 
			&& !this.isDie
			&& !this.hitByFire
			&& !marioArray.falling 
			&& !marioArray.underGround
			&& marioArray.pos.x + marioArray.width  > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height > this.pos.y
			&& marioArray.pos.y < this.pos.y + this.height
			&& !marioArray.isJump
			&& marioArray.isOnGround	)
		{
			marioArray.isInvincible = true;
			marioArray.backToSmall = true; 
			this.marioPipeSound();
		}


		//------3.火馬力歐死亡變大馬力歐-------

		if(!marioArray.isInvincible 
			&& marioArray.isFireMario 
			&& !this.isDie
			&& !this.hitByFire
			&& !marioArray.falling 
			&& !marioArray.underGround
			&& marioArray.pos.x + marioArray.width  > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height > this.pos.y
			&& marioArray.pos.y < this.pos.y + this.height
			&& !marioArray.isJump
			&& marioArray.isOnGround	)
		{
			marioArray.isInvincible = true;
			marioArray.backToBig = true; 
			this.marioPipeSound();
		}

	
		//------end 大馬力歐的狀況-------

		// -------End 馬力歐碰到壞香菇死掉-------

		
		// -------壞香菇與障礙物之間的碰撞-------


		// ----------------Case 1: tube ---------------------
		tubeJson.Pos[0].ranges.forEach(([x,y])=>{
			if(this.pos.x +  this.width > x  
				&& this.pos.x  < x + tubeJson.width )
			{	
				this.speed.x *= -1;
				this.direction *= -1;
			}
		});

		highTubeJson.Pos[0].ranges.forEach(([x,y])=>{
			if(this.pos.x +  this.width > x  
				&& this.pos.x  < x + highTubeJson.width )
			{	
				this.speed.x *= -1;
				this.direction *= -1;
			}
		});

		highestTubeJson.Pos[0].ranges.forEach(([x,y])=>{
			if(this.pos.x +  this.width > x  
				&& this.pos.x  < x + highestTubeJson.width )
			{	
				this.speed.x *= -1;
				this.direction *= -1;
			}
		});


		// ----------------Case 2: oddBrick ---------------------

		oddBrickJson.Pos[0].ranges.forEach(([x,y])=>{

			if(this.pos.x +  this.width > x 
				&& this.pos.x  < x + oddBrickJson.width )
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
		if( !marioArray.isBigMario 
			&& !marioArray.isFireMario
			&& !marioArray.isDie 
			&& !this.isDie 
			&& !marioArray.falling
			&& marioArray.canmoveFromUnder
			&& !marioArray.willDie 
			&& !marioArray.underGround
			&& marioArray.speed.y > 0 
			&& marioArray.pos.x + marioArray.width > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width
			&& marioArray.pos.y > this.pos.y - marioArray.height){
			{
				this.goombaDieSound();
				this.isDie = true;
				marioArray.speed.y = -4;
			}		
		}


		// ------------------2.大馬力歐的狀況-------------
		if(marioArray.isBigMario 
			&& !marioArray.isDie 
			&& !this.isDie 
			&& !marioArray.falling
			&& marioArray.canmoveFromUnder
			&& !marioArray.underGround
			&& marioArray.speed.y > 0 
			&& marioArray.pos.x + marioArray.width > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width
			&& marioArray.pos.y > this.pos.y - marioArray.height){
			{
				this.goombaDieSound();
				this.isDie = true;
				marioArray.speed.y = -4;
			}		
		}
		

		// ------------------2.火馬力歐的狀況-------------
		if(marioArray.isFireMario 
			&& !marioArray.isDie 
			&& !this.isDie 
			&& !marioArray.falling
			&& marioArray.canmoveFromUnder
			&& !marioArray.underGround
			&& marioArray.speed.y > 0 
			&& marioArray.pos.x + marioArray.width > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width
			&& marioArray.pos.y > this.pos.y - marioArray.height){
			{
				this.goombaDieSound();
				this.isDie = true;
				marioArray.speed.y = -4;
			}		
		}
		
		// -------End 馬力歐跳躍攻擊 壞香菇-----------


		// -----------被火力歐的火球打到-----------------
		if(this.hitByFire){
			this.pos.y += this.speed.y;
			this.speed.x = 0;
		}  //  hitByFire 的狀態轉換在 fireballObject 檔案裡



		backgroundJson.backgrounds[1].ranges.forEach(([x1,x2,y1,y2]) =>{
			if(this.pos.x < x2 * 16 + backgroundJson.width
				&& this.pos.x + this.width > x1 * 16){
				this.falling = false;
			}else if(this.pos.x > x2 * 16 + backgroundJson.width){
				this.falling = true;
			}
			if(!this.hitByFire
				&& this.pos.y >= y1 * backgroundJson.height - this.height
				&& this.pos.x + this.width > x1 * 16
				&& this.pos.x < x2 * 16 + 16){
				this.pos.y = y1 * backgroundJson.height - this.height;
			}
			if(this.falling){
				this.pos.y += this.speed.y; 
			}
			
			if(!this.hitByFire && this.pos.y >= y1 * backgroundJson.height - this.height
				&& this.pos.x + this.width > x1 * 16
				&& this.pos.x < x2 * 16 + 16){
				this.pos.y = y1 * backgroundJson.height - this.height;
			}

			// if(this.faceDirection == 1 
			// 	&&	this.falling == true 
			// 	&& this.pos.x + this.width == x1 * 16 ){
			// 	this.speed.x *= -1;
			// } //讓 goomba 掉下懸崖時會左右彈

			// if(this.faceDirection == -1 
			// 	&&	this.falling == true
			// 	 && this.pos.x + this.width == x1 * 16 - 32 ){
			// 	this.speed.x *= -1;
			// } 

			// if( this.faceDirection == 1 
			// 	&& this.pos.x > x2 * 16 + 16){
			// 	this.falling = true;
			// 	this.pos.y += this.speed.y;
			// }

			// if(this.faceDirection == -1 
			// 	&&	this.falling == true 
			// 	&& this.pos.x + this.width == x1 * 16  ){
			// 	this.speed.x *= -1;
			// } 

			// // if( this.pos.x > x2 * 16 + 16){
			// // 	this.falling = true;
			// // 	this.pos.y += this.speed.y;
			// // }			
		
			
			// if( this.faceDirection == -1 
			// 	&& this.pos.x < x1 * 16 - 16 ){
			// 	this.falling = true;
			// 	this.pos.y += this.speed.y;
			// }  // 這一段 bug 怪物會有點向下跑

			//超越畫面上一定距離就死掉並清除陣列
			if(this.pos.y >= y2 * backgroundJson.height + 1200 
				|| this.pos.x >= 6000){
				this.isDie = true;
			}
			
		});


		// -----------end被火力歐的火球打到--------------

		//--------旋轉中的烏龜打死壞香菇--------------

		for(let i = 0 ;i < turtleArray.length;i += 1){
			if(!this.isDie && turtleArray[i].isRotating 
				&& turtleArray[i].pos.x + 16 > this.pos.x 
				&& turtleArray[i].pos.x < this.pos.x + 16){
				this.goombaDieSound();
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
				this.show = false;	
				this.clearTimeout = null;
			}, 1500);
			this.clearTimeout = timeoutId;
		}	
		
		// ------------End of 香菇消失在畫面上-----------------
		
	}

	move(){
		this.pos.x -= this.speed.x;
	}
  
	goombaDieSound(){
		let dieSound = new Audio("/music/mario-kick-sound.wav");
		dieSound.play();
	}

	marioPipeSound(){
		let marioPipeSound = new 	Audio("/music/mario-pipe-sound.wav");
		marioPipeSound.play();
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
		if(marioArray.pos.x < 450 && !this.hitByFire && !this.isDie && this.show){
			goombaSprite.drawSprite(this.running(),context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && !this.hitByFire && marioArray.pos.x < 5000 && !this.isDie && this.show){
			goombaSprite.drawSprite(this.running(),context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 && !this.hitByFire && !this.isDie && this.show){
			goombaSprite.drawSprite(this.running(),context,this.pos.x  - 4550 ,this.pos.y);
		}

		if(marioArray.pos.x < 450 && !this.hitByFire && this.isDie && this.show){
			goombaSprite.drawSprite("goombaDie",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && !this.hitByFire && marioArray.pos.x < 5000 && this.isDie && this.show){
			goombaSprite.drawSprite("goombaDie",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 && !this.hitByFire && this.isDie && this.show){
			goombaSprite.drawSprite("goombaDie",context,this.pos.x  - 4550 ,this.pos.y);
		}	

		if(marioArray.pos.x < 450 && !this.isDie && this.hitByFire && this.show){
			goombaSprite.drawSprite("goombaFireDie",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && !this.isDie && this.hitByFire && marioArray.pos.x < 5000  && this.show){
			goombaSprite.drawSprite("goombaFireDie",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 && !this.isDie && this.hitByFire && this.show){
			goombaSprite.drawSprite("goombaFireDie",context,this.pos.x  - 4550 ,this.pos.y);
		}
	}
}

export {Goomba};