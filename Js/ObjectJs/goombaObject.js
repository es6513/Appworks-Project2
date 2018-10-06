import {PositionAndSpeed} from "../positionAndSpeed.js";
import {mario} from "../marioTest.js";


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
	
	update(tubeJson){
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

		if(!mario.isDie 
      && !this.isDie
			&& mario.pos.x + mario.width  > this.pos.x 
			&& mario.pos.x < this.pos.x + this.width 
			&& mario.pos.y + mario.height > this.pos.y
			&& mario.pos.y < this.pos.y + this.height
			&& !mario.isJump
			&& mario.isOnGround	){
			mario.isDie = true;
			mario.speed.y = -8;
			mario.pos.y += mario.speed.y;
		}
		if(!mario.isDie 
      && !this.isDie
			&& mario.pos.x + mario.width   > this.pos.x 
			&& mario.pos.x < this.pos.x + this.width 
			&& mario.pos.y + mario.height > this.pos.y
			&& mario.pos.y < this.pos.y + this.height
			&& !mario.isJump
			&& mario.isOnGround
		){
			mario.isDie = true;
			mario.speed.y = -6;
			mario.pos.y += mario.speed.y;
		}		
	

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

		if(!mario.isDie && !this.isDie && mario.speed.y > 0 
			&& mario.pos.x + 16 > this.pos.x 
			&& mario.pos.x < this.pos.x + 16
			&& mario.pos.y > this.pos.y - 16 + 8){
			{
				this.isDie = true;
				mario.speed.y = -4;
			}		
		}

	

		// -------End 馬力歐跳躍攻擊 壞香菇-----------

		// ------------香菇消失在畫面上----------------

		//每次都要去判斷 setTimeout 產生的排程是否已經存在，才不會重複執行排程

		let timeoutId;
	
		if(this.isDie && !this.clearTimeout){
			timeoutId = setTimeout(() => {

				this.isHide = true;	
				this.clearTimeout = null;
			}, 2000);
			this.clearTimeout = timeoutId;
		}	
		
		// ------------End of 香菇消失在畫面上-----------------
		
	}

	move(){
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
		return"goombaRun-1";

		// this.frameIndex = ++this.frameIndex % 20 ;
		// return this.framesRun[this.frameIndex];
	}

	draw(context,goombaSprite){
		if(mario.pos.x < 450 && !this.isDie && !this.isHide){
			goombaSprite.drawGoombaSprite(this.running(),context,this.pos.x,this.pos.y);
		}else if(mario.pos.x >= 450 && mario.pos.x < 1600 && !this.isDie && !this.isHide){
			goombaSprite.drawGoombaSprite(this.running(),context,this.pos.x - mario.pos.x + 450 ,this.pos.y);
		}else if(mario.pos.x >= 1600 && !	this.isDie && !this.isHide){
			goombaSprite.drawGoombaSprite(this.running(),context,this.pos.x  - 1150 ,this.pos.y);
		}

		if(mario.pos.x < 450 && this.isDie && !this.isHide){
			goombaSprite.drawGoombaSprite("goombaDie",context,this.pos.x,this.pos.y);
		}else if(mario.pos.x >= 450 && mario.pos.x < 1600 && 	this.isDie && !this.isHide){
			goombaSprite.drawGoombaSprite("goombaDie",context,this.pos.x - mario.pos.x + 450 ,this.pos.y);
		}else if(mario.pos.x >= 1600 && 	this.isDie && !this.isHide){
			goombaSprite.drawGoombaSprite("goombaDie",context,this.pos.x  - 1150 ,this.pos.y);
		}	
	}
}

export {Goomba};