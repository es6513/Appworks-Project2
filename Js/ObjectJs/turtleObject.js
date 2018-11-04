import {PositionAndSpeed} from "../positionAndSpeed.js";


class Turtle{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.frameIndex = 0;
		this.quickToDie = false;
		this.backToLive = false;
		this.hitByFire = false;
		this.speed = {
			x:1,
			y:2
		};
		this.width = 16;
		this.height = 24;
		this.isRotating = false;
		this.canRotateAttack = false;
		this.clearTimeout;
		this.clearTimeout2;
		this.clearTimeout3;
		this.show = true;
		this.falling = false;
		this.isDie = false;
		this.direction = -1;
		this.faceDirection = -1;
		this.framesRun = [
			"turtleRun-1","turtleRun-1","turtleRun-1","turtleRun-1",
			"turtleRun-1","turtleRun-1","turtleRun-1","turtleRun-1",
			"turtleRun-1","turtleRun-1",
			"turtleRun-2","turtleRun-2","turtleRun-2","turtleRun-2",
			"turtleRun-2","turtleRun-2","turtleRun-2","turtleRun-2",
			"turtleRun-2","turtleRun-2"
		];


		this.framesRunBackToLiving = [
			"turtleFireDie","turtleFireDie","turtleFireDie","turtleFireDie","turtleFireDie",
			"turtleFireDie","turtleFireDie","turtleFireDie","turtleFireDie","turtleFireDie",
			"turtleDie-1","turtleDie-1","turtleDie-1","turtleDie-1","turtleDie-1",
			"turtleDie-1","turtleDie-1","turtleDie-1","turtleDie-1","turtleDie-1"
		];
	}
	
	update(backgroundJson,tubeJson,highTubeJson,highestTubeJson,marioArray,oddBrickJson){
		// 	碰撞公式:shape.pos.x + shape.width > this.pos.x 
		//	&& shape.pos.x < this.pos.x + this.width
		//	&& shape.pos.y + shape.height > this.pos.y
		//	&& shape.pos.y < this.pos.y + this.height
		this.faceDirection = this.direction;
		if(!this.backToLive && !this.quickToDie && !this.isDie && !this.falling){
			this.move();	
		}	
		
		
		// 在烏龜活著及旋轉的狀態下，若馬力歐不是處於跳躍狀態被碰到，則馬力歐死掉
		

		//--------存在一個馬力歐碰到龜殼會死掉的bug-------
		// X軸的判定 用 width/2 比較好一點,

		//------1.小馬力歐的死亡-------
		let timeoutId2;
	
		if(this.isRotating && !this.clearTimeout2){
			timeoutId2 = setTimeout(() => {
				this.canRotateAttack = true;
				this.clearTimeout2 = null;
			}, 50);
			this.clearTimeout2 = timeoutId2;
		}	
		
		// Case 1 : 旋轉中的烏龜打死馬力歐

		if(!marioArray.isInvincible 
			&& !marioArray.isBigMario 
			&& !marioArray.isFireMario 
			&& !marioArray.willDie 
			&& !marioArray.falling 
			&& !marioArray.underGround
			&& marioArray.pos.x + marioArray.width  > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height > this.pos.y
			&& marioArray.pos.y < this.pos.y + this.height
			&& !marioArray.isJump
			&& marioArray.isOnGround
			&& !this.hitByFire
			&& this.canRotateAttack 
			&& this.quickToDie
			&& !this.backToLive
		){
			
			let dieSound = new Audio("/music/mario-die-sound.wav");
			dieSound.play();
			marioArray.willDie = true;
		}

		// Case 2 : 走路中的烏龜打死馬力歐
		if(!marioArray.isInvincible 
			&& !marioArray.isBigMario 
			&& !marioArray.isFireMario 
			&& !marioArray.willDie
			&& !marioArray.falling  
			&& !marioArray.underGround
			&& marioArray.pos.x + marioArray.width   > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height > this.pos.y
			&& marioArray.pos.y < this.pos.y + this.height
			&& !marioArray.isJump
			&& marioArray.isOnGround
			&& !this.hitByFire
			&& !this.quickToDie
			&& !this.backToLive
		){
			let dieSound = new Audio("/music/mario-die-sound.wav");
			dieSound.play();
			marioArray.willDie = true;
		}		

		//------2.大馬力歐死亡變小馬力歐-------

		if(!marioArray.isInvincible 
			&& marioArray.isBigMario 
			&& !marioArray.isDie 
			&& !marioArray.falling 
			&& !marioArray.underGround
			&& marioArray.pos.x + marioArray.width  > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height > this.pos.y
			&& marioArray.pos.y < this.pos.y + this.height
			&& !marioArray.isJump
			&& marioArray.isOnGround
			&& !this.hitByFire
			&& this.canRotateAttack 
			&& this.quickToDie
			&& !this.backToLive
		){
			
			marioArray.isInvincible = true;
			marioArray.backToSmall = true;  
			this.marioPipeSound();
		}

		if(!marioArray.isInvincible 
			&& marioArray.isBigMario 
			&& !marioArray.isDie 
			&& !marioArray.falling 
			&& !marioArray.underGround
			&& marioArray.pos.x + marioArray.width   > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height > this.pos.y
			&& marioArray.pos.y < this.pos.y + this.height
			&& !marioArray.isJump
			&& marioArray.isOnGround
			&& !this.hitByFire
			&& !this.quickToDie
			&& !this.backToLive
		){
			this.marioPipeSound();
			marioArray.isInvincible = true;
			marioArray.backToSmall = true;  
		}	

		//------3.火馬力歐死亡變大馬力歐-------

		if(!marioArray.isInvincible 
			&& marioArray.isFireMario 
			&& !marioArray.isDie 
			&& !marioArray.falling 
			&& !marioArray.underGround
			&& marioArray.pos.x + marioArray.width  > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height > this.pos.y
			&& marioArray.pos.y < this.pos.y + this.height
			&& !marioArray.isJump
			&& marioArray.isOnGround
			&& !this.hitByFire
			&& this.canRotateAttack 
			&& this.quickToDie
		){
			this.marioPipeSound();
			marioArray.isInvincible = true;
			marioArray.backToBig = true; 
		}

		if(!marioArray.isInvincible 
			&& marioArray.isFireMario
			&& !marioArray.isDie 
			&& !marioArray.falling 
			&& !marioArray.underGround
			&& marioArray.pos.x + marioArray.width   > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height > this.pos.y
			&& marioArray.pos.y < this.pos.y + this.height
			&& !marioArray.isJump
			&& marioArray.isOnGround
			&& !this.hitByFire
			&& !this.quickToDie 
			&& !this.backToLive){
			this.marioPipeSound();
			marioArray.isInvincible = true;
			marioArray.backToBig = true; 
		}	
	
		

		// End如果在馬力歐不是跳躍的情況下、並且烏龜不是旋轉狀態下，馬力歐掛掉

		// ---------烏龜會飛出去----------
		if(this.isRotating && !this.falling){
			this.rotate();	
		}	
		// ---------1.小馬力歐的狀況----------------
		if(!marioArray.isBigMario 
			&& !marioArray.isFireMario
			&& !marioArray.isDie 
			&& !marioArray.willDie 
			&& !marioArray.falling 
			&& !this.isRotating
			&& !marioArray.underGround
			&& (this.quickToDie   || this.backToLive)
			&& marioArray.pos.x + marioArray.width > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.y > this.pos.y - marioArray.height){
			{
				
				this.speed.x = 8;
				this.isRotating = true;
				if(!marioArray.isOnGround){
					marioArray.speed.y = -6;
				}
				this.turtleDieSound();
			}		
		}

		// ---------2.大馬力歐的狀況----------------
	

		if(!marioArray.isDie 
			&& (this.quickToDie   || this.backToLive)
			&& !marioArray.falling 
			&& !marioArray.underGround
			&& (marioArray.isBigMario || marioArray.isFireMario)
			&& !this.isRotating
			&& marioArray.pos.x + marioArray.width > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.y > this.pos.y -  marioArray.height){
			{
				this.speed.x = 8;
				this.isRotating = true;
				if(!marioArray.isOnGround){
					marioArray.speed.y = -6;
				}		
				this.turtleDieSound();
			}		
		}


		// ---------End烏龜會飛出去----------
		
		// -------烏龜與障礙物之間的碰撞-------

		// ----------------Case 1: tube ---------------------
		tubeJson.Pos[0].ranges.forEach(([x,y])=>{
			if(this.pos.x +  this.width > x  
				&& this.pos.x  < x + tubeJson.width )
			{	
				this.speed.x *= -1;
				this.direction *= -1;
				if(this.isRotating){
					let bumpSound = new Audio("/music/mario-bump-sound.wav");
					bumpSound.play();
				}
			}
		});

		highTubeJson.Pos[0].ranges.forEach(([x,y])=>{
			if(this.pos.x +  this.width > x  
				&& this.pos.x  < x + highTubeJson.width )
			{	
				this.speed.x *= -1;
				this.direction *= -1;
				if(this.isRotating){
					let bumpSound = new Audio("/music/mario-bump-sound.wav");
					bumpSound.play();
				}
			}
		});

		highestTubeJson.Pos[0].ranges.forEach(([x,y])=>{
			if(this.pos.x +  this.width > x  
				&& this.pos.x  < x + highestTubeJson.width )
			{	
				this.speed.x *= -1;
				this.direction *= -1;
				if(this.isRotating){
					let bumpSound = new Audio("/music/mario-bump-sound.wav");
					bumpSound.play();
				}
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
				
		// -------End 烏龜與障礙物之間的碰撞-------

	
		// -------馬力歐跳躍攻擊烏龜-----------

		// ------------------1.小馬力歐的狀況-------------
		if( !marioArray.isBigMario 
			&& !marioArray.isFireMario 
			&& !marioArray.underGround
			&& marioArray.canmoveFromUnder
			&& !marioArray.isDie	
			&& !marioArray.falling	
			&& !marioArray.willDie  
			&& !this.quickToDie && marioArray.speed.y > 0 
			&& marioArray.pos.x + marioArray.width > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width
			&& marioArray.pos.y > this.pos.y - marioArray.height){
			{
				this.quickToDie = true;
				marioArray.speed.y = -10;
				this.turtleDieSound();
			}		
		}


		// ---------------2.大馬力歐的狀況-------------
		if(marioArray.isBigMario 
			&& !marioArray.underGround
			&& marioArray.canmoveFromUnder
			&& !marioArray.isDie 
			&& !marioArray.falling	
			&& !this.isDie 
			&& marioArray.speed.y > 0 
			&& marioArray.pos.x + marioArray.width > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width
			&& marioArray.pos.y > this.pos.y - marioArray.height){
			{
				this.quickToDie = true;
				marioArray.speed.y = -10;
				this.turtleDieSound();
			}		
		}

		//-------------3.火力歐的狀況------------

		if(marioArray.isFireMario 
			&& !marioArray.underGround
			&& marioArray.canmoveFromUnder
			&& !marioArray.isDie 
			&& !marioArray.falling	
			&& !this.isDie 
			&& marioArray.speed.y > 0 
			&& marioArray.pos.x + marioArray.width > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width
			&& marioArray.pos.y > this.pos.y - marioArray.height){
			{
				this.quickToDie = true;
				marioArray.speed.y = -10;
				this.turtleDieSound();
			}		
		}

		// -------End 馬力歐跳躍攻擊烏龜-----------

		// -----------被火力歐的火球打到-----------------
		if(this.hitByFire){
			this.pos.y += this.speed.y;
			this.speed.x = 0;
		}//  hitByFire 的狀態轉換在 fireballObject 檔案裡
	
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
			
			if(this.pos.y >= y2 * backgroundJson.height + 1200 
				|| this.pos.x >= 6000){
				this.isDie = true;
			}
		});
	
		// -----------end被火力歐的火球打到--------------
	

		// ------------烏龜復活----------------

		//每次都要去判斷 setTimeout 產生的排程是否已經存在，才不會重複執行排程

		let timeoutId;
	
		if(this.quickToDie && !this.clearTimeout){

			timeoutId = setTimeout(() => {

				if(!this.isRotating){
					this.backToLive = true;
					this.quickToDie = false;
				}				
				this.clearTimeout = null;
			}, 3500);
			this.clearTimeout = timeoutId;
		}	
		
		let timeoutId3;
	
		if(this.backToLive && !this.clearTimeout3){

			timeoutId3 = setTimeout(() => {

				if(!this.isRotating){
					this.backToLive = false;
				}				
				this.clearTimeout3 = null;
			}, 3500);
			this.clearTimeout3 = timeoutId3;
		}	
		// ------------End of 烏龜復活----------------
	}

	turtleDieSound(){
		let dieSound = new Audio("/music/mario-kick-sound.wav");
		dieSound.play();
	}

	
	marioPipeSound(){
		let marioPipeSound = new 	Audio("/music/mario-pipe-sound.wav");
		marioPipeSound.play();
	}

	move(){
		this.pos.x -= this.speed.x;
	}

	rotate(){
		this.pos.x += this.speed.x;
	}

	running(){
		if(this.direction == 1){
			this.frameIndex = ++this.frameIndex % 20;
			return this.framesRun[this.frameIndex];
		}else if(this.direction == -1){
			this.frameIndex = ++this.frameIndex % 20;
			return this.framesRun[this.frameIndex];
		}
		return"turtleRun-1";

	}

	backToLiving(){
		this.frameIndex = ++this.frameIndex % 20;
		return this.framesRunBackToLiving[this.frameIndex];
	}

	draw(context,turtleSprite,marioArray){
		if(marioArray.pos.x < 450 && !this.quickToDie && this.show && !this.hitByFire && !this.backToLive){
			turtleSprite.drawTurtleSprite(this.running(),context,this.pos.x,this.pos.y,this.faceDirection < 0);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000 && !this.quickToDie && this.show && !this.hitByFire && !this.backToLive){
			turtleSprite.drawTurtleSprite(this.running(),context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y,this.faceDirection < 0);
		}else if(marioArray.pos.x >= 5000 && !this.quickToDie && this.show && !this.hitByFire && !this.backToLive){
			turtleSprite.drawTurtleSprite(this.running(),context,this.pos.x  - 4550 ,this.pos.y,this.faceDirection < 0);
		}

		if(marioArray.pos.x < 450 && this.quickToDie && this.show && !this.hitByFire){
			turtleSprite.drawTurtleSprite("turtleFireDie",context,this.pos.x,this.pos.y,this.faceDirection < 0);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000 && this.quickToDie && this.show && !this.hitByFire){
			turtleSprite.drawTurtleSprite("turtleFireDie",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y,this.faceDirection < 0);
		}else if(marioArray.pos.x >= 5000 && this.quickToDie && this.show && !this.hitByFire){
			turtleSprite.drawTurtleSprite("turtleFireDie",context,this.pos.x  - 4550 ,this.pos.y,this.faceDirection < 0);
		}	

		if(marioArray.pos.x < 450 && !this.isDie && this.backToLive && this.show && !this.hitByFire){
			turtleSprite.drawTurtleSprite(this.backToLiving(),context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && !this.isDie && this.backToLive && marioArray.pos.x < 5000  && this.show && !this.hitByFire){
			turtleSprite.drawTurtleSprite(this.backToLiving(),context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 && !this.isDie && this.backToLive && this.show && !this.hitByFire){
			turtleSprite.drawTurtleSprite(this.backToLiving(),context,this.pos.x  - 4550 ,this.pos.y);
		}

		if(marioArray.pos.x < 450 && !this.isDie && this.hitByFire && this.show){
			turtleSprite.drawTurtleSprite("turtleFireDie",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && !this.isDie && this.hitByFire && marioArray.pos.x < 5000  && this.show){
			turtleSprite.drawTurtleSprite("turtleFireDie",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 && !this.isDie && this.hitByFire && this.show){
			turtleSprite.drawTurtleSprite("turtleFireDie",context,this.pos.x  - 4550 ,this.pos.y);
		}
		
	}
}

export {Turtle};