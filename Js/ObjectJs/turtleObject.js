import {PositionAndSpeed} from "../positionAndSpeed.js";
// import {marioArray} from "../marioArrayTest.js";


class Turtle{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.frameIndex = 0;
		this.quickToDie = false;
		this.hitByFire = false;
		this.speed = {
			x:1,
			y:2
		};
		this.width = 16;
		this.height = 24;
		this.isRotating = false;
		this.clearTimeout;
		this.show = true;
		this.isDie = false;
		this.direction = 1;
		this.faceDirection = 1;
		this.framesRun = [
			"turtleRun-1","turtleRun-1","turtleRun-1","turtleRun-1",
			"turtleRun-1","turtleRun-1","turtleRun-1","turtleRun-1",
			"turtleRun-1","turtleRun-1",
			"turtleRun-2","turtleRun-2","turtleRun-2","turtleRun-2",
			"turtleRun-2","turtleRun-2","turtleRun-2","turtleRun-2",
			"turtleRun-2","turtleRun-2"

		];
	}
	
	update(screen,tubeJson,marioArray){
		console.log(this.isDie);
		// 	碰撞公式:shape.pos.x + shape.width > this.pos.x 
		//	&& shape.pos.x < this.pos.x + this.width
		//	&& shape.pos.y + shape.height > this.pos.y
		//	&& shape.pos.y < this.pos.y + this.height
		// console.log(this.speed.x);
		// console.log(this.quickToDie);
		this.faceDirection = this.direction;
		if(!this.quickToDie && !this.isDie){
			this.move();	
		}	
		
		
		// 在烏龜活著及旋轉的狀態下，若馬力歐不是處於跳躍狀態被碰到，則馬力歐死掉
		

		//--------存在一個馬力歐碰到龜殼會死掉的bug-------
		// X軸的判定 用 width/2 比較好一點,

		//------1.小馬力歐的死亡-------
		if(!marioArray.isInvincible 
			&& !marioArray.isBigMario 
			&& !marioArray.isFireMario 
			&& !marioArray.isDie 
			&& marioArray.pos.x + marioArray.width  > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height > this.pos.y
			&& marioArray.pos.y < this.pos.y + this.height
			&& !marioArray.isJump
			&& marioArray.isOnGround
			&& this.isRotating 
			&& this.quickToDie
		){
			let dieSound = new Audio("/music/mario-die-sound.wav");
			dieSound.play();
			marioArray.isDie = true;
			marioArray.speed.y = -10;
			marioArray.pos.y += marioArray.speed.y;
		}
		if(!marioArray.isInvincible 
			&& !marioArray.isBigMario 
			&& !marioArray.isFireMario 
			&& !marioArray.isDie 
			&& marioArray.pos.x + marioArray.width   > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height > this.pos.y
			&& marioArray.pos.y < this.pos.y + this.height
			&& !marioArray.isJump
			&& marioArray.isOnGround
			&& !this.quickToDie ){
			let dieSound = new Audio("/music/mario-die-sound.wav");
			dieSound.play();
			marioArray.isDie = true;
			marioArray.speed.y = -10;  
			marioArray.pos.y += marioArray.speed.y;
		}		

		//------2.大馬力歐死亡變小馬力歐-------

		if(!marioArray.isInvincible 
			&& marioArray.isBigMario 
			&& !marioArray.isDie 
			&& marioArray.pos.x + marioArray.width  > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height > this.pos.y
			&& marioArray.pos.y < this.pos.y + this.height
			&& !marioArray.isJump
			&& marioArray.isOnGround
			&& this.isRotating 
			&& this.quickToDie
		){
			marioArray.speed.y = -10; // BUG 暫時讓馬力歐彈跳起來代替無敵的閃爍動畫
			marioArray.isInvincible = true;
			marioArray.isBigMario = false; 
		}

		if(!marioArray.isInvincible 
			&& marioArray.isBigMario 
			&& !marioArray.isDie 
			&& marioArray.pos.x + marioArray.width   > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height > this.pos.y
			&& marioArray.pos.y < this.pos.y + this.height
			&& !marioArray.isJump
			&& marioArray.isOnGround
			&& !this.quickToDie ){
			marioArray.speed.y = -10;
			marioArray.isInvincible = true;
			marioArray.isBigMario = false; 
		}	

		//------3.火馬力歐死亡變大馬力歐-------

		if(!marioArray.isInvincible 
			&& marioArray.isFireMario 
			&& !marioArray.isDie 
			&& marioArray.pos.x + marioArray.width  > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height > this.pos.y
			&& marioArray.pos.y < this.pos.y + this.height
			&& !marioArray.isJump
			&& marioArray.isOnGround
			&& this.isRotating 
			&& this.quickToDie
		){
			marioArray.speed.y = -10;
			marioArray.isInvincible = true;
			marioArray.isFireMario = false;
			marioArray.isBigMario = true; 
		}

		if(!marioArray.isInvincible 
			&& marioArray.isFireMario
			&& !marioArray.isDie 
			&& marioArray.pos.x + marioArray.width   > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height > this.pos.y
			&& marioArray.pos.y < this.pos.y + this.height
			&& !marioArray.isJump
			&& marioArray.isOnGround
			&& !this.quickToDie ){
			marioArray.speed.y = -10;
			marioArray.isInvincible = true;
			marioArray.isFireMario = false;
			marioArray.isBigMario = true; 
		}	
	
		

		// End如果在馬力歐不是跳躍的情況下、並且烏龜不是旋轉狀態下，馬力歐掛掉

		// ---------烏龜會飛出去----------
		if(this.isRotating){
			this.rotate();	
		}	

		// ---------1.小馬力歐的狀況----------------
		if(!marioArray.isBigMario  && !marioArray.isDie && this.quickToDie  
			&& marioArray.pos.x + marioArray.width > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.y > this.pos.y - marioArray.height){
			{
				this.speed.x = 4;
				this.isRotating = true;
				marioArray.speed.y = -6;
				this.turtleDieSound();
			}		
		}

		// ---------2.大馬力歐的狀況----------------
		if(marioArray.isBigMario && 
			!marioArray.isDie && this.quickToDie  
			&& marioArray.pos.x + marioArray.width > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.y > this.pos.y -  marioArray.height){
			{
				this.speed.x = 4;
				this.isRotating = true;
				marioArray.speed.y = -6;
				this.turtleDieSound();
			}		
		}


		// ---------End烏龜會飛出去----------
		
		// -------烏龜與障礙物之間的碰撞-------
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

		// -------End 烏龜與障礙物之間的碰撞-------

	
		// -------馬力歐跳躍攻擊烏龜-----------

		// ------------------1.小馬力歐的狀況-------------

		if( !marioArray.isBigMario && !marioArray.isDie && !this.quickToDie && marioArray.speed.y > 0 
			&& marioArray.pos.x + marioArray.height > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width
			&& marioArray.pos.y > this.pos.y - marioArray.height){
			{
				this.quickToDie = true;
				marioArray.speed.y = -10;
				this.turtleDieSound();
				// marioArray.pos.y = this.pos.y - 16 + 8;
				// this.speed.x = 0;
			}		
		}


		// ---------------2.大馬力歐的狀況-------------
		if(marioArray.isBigMario && !marioArray.isDie && !this.isDie && marioArray.speed.y > 0 
			&& marioArray.pos.x + marioArray.height > this.pos.x 
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
		}
	
		screen.backgrounds[1].ranges.forEach(([x1,x2,y1,y2]) =>{
			if(!this.hitByFire && this.pos.y >= y1 * screen.height - this.height
				&& this.pos.x + this.width > x1 * 16
				&& this.pos.x < x2 * 16 + 16){
				this.pos.y = y1 * screen.height - this.height;
			}

			if(	this.falling == true && this.pos.x + this.width == x1 * 16 ){
				this.speed.x *= -1;
			} //讓 turtle 掉下懸崖時會左右彈

			if( this.pos.x > x2 * 16 + 16){
				this.falling = true;
				this.pos.y += this.speed.y;
			}

			if(this.pos.y >= y2 * screen.height + 176){
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

					this.quickToDie = false;
				}				
				// this.speed.x = 1;
				// this.direction = 1;
				this.clearTimeout = null;
			}, 3000);
			this.clearTimeout = timeoutId;
		}	
		
		// ------------End of 烏龜復活----------------
		

	}

	turtleDieSound(){
		let dieSound = new Audio("/music/mario-kick-sound.wav");
		dieSound.play();
	}


	move(){
		this.pos.x += this.speed.x;
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

		// this.frameIndex = ++this.frameIndex % 20 ;
		// return this.framesRun[this.frameIndex];
	}

	draw(context,turtleSprite,marioArray){
		if(marioArray.pos.x < 450 && !this.quickToDie && this.show && !this.hitByFire){
			turtleSprite.drawTurtleSprite(this.running(),context,this.pos.x,this.pos.y,this.faceDirection < 0);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 2500 && !this.quickToDie && this.show && !this.hitByFire){
			turtleSprite.drawTurtleSprite(this.running(),context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y,this.faceDirection < 0);
		}else if(marioArray.pos.x >= 2500 && !this.quickToDie && this.show && !this.hitByFire){
			turtleSprite.drawTurtleSprite(this.running(),context,this.pos.x  - 2050 ,this.pos.y,this.faceDirection < 0);
		}

		if(marioArray.pos.x < 450 && this.quickToDie && this.show && !this.hitByFire){
			turtleSprite.drawTurtleSprite("turtleDie-1",context,this.pos.x,this.pos.y,this.faceDirection < 0);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 2500 && this.quickToDie && this.show && !this.hitByFire){
			turtleSprite.drawTurtleSprite("turtleDie-1",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y,this.faceDirection < 0);
		}else if(marioArray.pos.x >= 2500 && this.quickToDie && this.show && !this.hitByFire){
			turtleSprite.drawTurtleSprite("turtleDie-1",context,this.pos.x  - 2050 ,this.pos.y,this.faceDirection < 0);
		}	

		if(marioArray.pos.x < 450 && !this.isDie && this.hitByFire && this.show){
			turtleSprite.drawTurtleSprite("turtleFireDie",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && !this.isDie && this.hitByFire && marioArray.pos.x < 2500  && this.show){
			turtleSprite.drawTurtleSprite("turtleFireDie",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 2500 && !this.isDie && this.hitByFire && this.show){
			turtleSprite.drawTurtleSprite("turtleFireDie",context,this.pos.x  - 2050 ,this.pos.y);
		}
		
	}
}

export {Turtle};