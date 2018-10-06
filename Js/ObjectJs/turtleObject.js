import {PositionAndSpeed} from "../positionAndSpeed.js";
import {mario} from "../marioTest.js";


class Turtle{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.frameIndex = 0;
		this.quickToDie = false;
		this.speed = {
			x:1
		};
		this.width = 16;
		this.height = 24;
		this.isRotating = false;
		this.clearTimeout;
		this.previousX;
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
	
	update(screen,tubeSprite,turtleSpriteSet,tubeJson){
		// 	碰撞公式:shape.pos.x + shape.width > this.pos.x 
		//	&& shape.pos.x < this.pos.x + this.width
		//	&& shape.pos.y + shape.height > this.pos.y
		//	&& shape.pos.y < this.pos.y + this.height
		// console.log(this.speed.x);
		// console.log(this.quickToDie);
		this.faceDirection = this.direction;
		if(!this.quickToDie){
			this.move();	
		}	
		
		
		// 在烏龜活著及旋轉的狀態下，若馬力歐不是處於跳躍狀態被碰到，則馬力歐死掉
		
		// if(!mario.isDie 
		// 	&& mario.pos.x + 16 > this.pos.x 
		// 	&& mario.pos.x < this.pos.x + 16
		// 	&& mario.pos.y + 16 > this.pos.y
		// 	&& mario.pos.y < this.pos.y + 24
		// 	&& !mario.isJump
		// 	&& this.isRotating 
		// 	&& mario.isOnGround
		// 	|| 
		// 	!mario.isDie 
		// 	&& mario.pos.x + 16 > this.pos.x 
		// 	&& mario.pos.x < this.pos.x + 16
		// 	&& mario.pos.y + 16 > this.pos.y
		// 	&& mario.pos.y < this.pos.y + 24
		// 	&& !mario.isJump
		// 	&& mario.isOnGround
		// 	&& !this.quickToDie ){
		// 	mario.isDie = true;
		// 	mario.speed.y = -8;
		// 	mario.pos.y += mario.speed.y;
		// }


		// X軸的判定 用 width/2 比較好一點,

		if(!mario.isDie 
			&& mario.pos.x + mario.width  > this.pos.x 
			&& mario.pos.x < this.pos.x + this.width 
			&& mario.pos.y + mario.height > this.pos.y
			&& mario.pos.y < this.pos.y + this.height
			&& !mario.isJump
			&& mario.isOnGround
			&& this.isRotating 
		){
			mario.isDie = true;
			mario.speed.y = -8;
			mario.pos.y += mario.speed.y;
		}
		if(!mario.isDie 
			&& mario.pos.x + mario.width   > this.pos.x 
			&& mario.pos.x < this.pos.x + this.width 
			&& mario.pos.y + mario.height > this.pos.y
			&& mario.pos.y < this.pos.y + this.height
			&& !mario.isJump
			&& mario.isOnGround
			&& !this.quickToDie ){
			mario.isDie = true;
			mario.speed.y = -6;
			mario.pos.y += mario.speed.y;
		}		

		

		// End如果在馬力歐不是跳躍的情況下、並且烏龜不是旋轉狀態下，馬力歐掛掉

		// ---------烏龜會飛出去----------
		if(this.isRotating){
			this.rotate();	
		}	

		if(!mario.isDie && this.quickToDie  
			&& mario.pos.x + mario.width > this.pos.x 
			&& mario.pos.x < this.pos.x + this.width 
			&& mario.pos.y > this.pos.y - this.height / 2){
			{
				this.speed.x = 4;
				this.isRotating = true;
				mario.speed.y = -8;
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
			}
		});

		// -------End 烏龜與障礙物之間的碰撞-------

	
		// -------馬力歐跳躍攻擊烏龜-----------

		if(!mario.isDie && !this.quickToDie && mario.speed.y > 0 
			&& mario.pos.x + 16 > this.pos.x 
			&& mario.pos.x < this.pos.x + 16
			&& mario.pos.y > this.pos.y - 16 + 8){
			{
				this.quickToDie = true;
				mario.speed.y = -8;
				// mario.pos.y = this.pos.y - 16 + 8;
				// this.speed.x = 0;
			}		
		}

	

		// -------End 馬力歐跳躍攻擊烏龜-----------

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
		

		// if(!this.die
		// 	&& mario.pos.x + 16 > this.pos.x 
		// 	&& mario.pos.x < this.pos.x + 16){
		// 	this.quickToDie = false;
		// }
		// if(mario.isJump && mario.pos.y > this.pos.y - 16){
		// 	this.die = true;
		// 	mario.pos.y = this.pos.y - 16;
		// 	console.log("hi");
		// }
		// if(this.pos.x <= mario.pos.x 
		// 	&& this.pos.x + 16 >=  mario.pos.x   
		// 	&& this.pos.y <= mario.pos.y + 16
		// 	&& this.pos.y >=  mario.pos.y  
		// 	//16是金幣的寬度， EX : 160<mario.pos
		// )
		// 	this.die = true;
		// }

		//+8 是馬力歐的寬度一半
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

	draw(context,turtleSprite){
		if(mario.pos.x < 450 && !this.quickToDie){
			turtleSprite.drawTurtleSprite(this.running(),context,this.pos.x,this.pos.y,this.faceDirection < 0);
		}else if(mario.pos.x >= 450 && mario.pos.x < 1600 && !this.quickToDie){
			turtleSprite.drawTurtleSprite(this.running(),context,this.pos.x - mario.pos.x + 450 ,this.pos.y,this.faceDirection < 0);
		}else if(mario.pos.x >= 1600 && !this.quickToDie){
			turtleSprite.drawTurtleSprite(this.running(),context,this.pos.x  - 1150 ,this.pos.y,this.faceDirection < 0);
		}

		if(mario.pos.x < 450 && this.quickToDie){
			turtleSprite.drawTurtleSprite("turtleDie-1",context,this.pos.x,this.pos.y,this.faceDirection < 0);
		}else if(mario.pos.x >= 450 && mario.pos.x < 1600 && this.quickToDie){
			turtleSprite.drawTurtleSprite("turtleDie-1",context,this.pos.x - mario.pos.x + 450 ,this.pos.y,this.faceDirection < 0);
		}else if(mario.pos.x >= 1600 && this.quickToDie){
			turtleSprite.drawTurtleSprite("turtleDie-1",context,this.pos.x  - 1150 ,this.pos.y,this.faceDirection < 0);
		}	
	}
}

export {Turtle};