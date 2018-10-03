import {PositionAndSpeed} from "../Js/positionAndSpeed.js";
import {mario} from "../Js/marioTest.js";


class Turtle{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.frameIndex = 0;
		this.die = false;
		this.speed = {
			x:1
		};
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
	
	update(screen,tubeSprite,turtleSpriteSet){
		this.faceDirection = this.direction;
		this.move();
		screen.tubes[0].ranges.forEach(([x1,x2,y1,y2]) =>{
			if(this.pos.x <= x1 * tubeSprite.width  
				&& this.faceDirection == 1)
			{
				if(this.pos.x + turtleSpriteSet.width == x1 * tubeSprite.width ){
					this.speed.x *= -1;
					this.direction = -1;
				}
			}else if(this.faceDirection == -1){
				if(this.pos.x == x2 * tubeSprite.width){
					this.speed.x *= -1;
					this.direction = 1;
				}
			}
			// else if(this.pos.x >= x1 * tubeSprite.width 
			// 	&& this.faceDirection == -1){
			// 	this.speed.x *= -1;
			// 	this.direction = 1;
			// }
		});
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
		if(mario.pos.x < 450 && !this.die){
			turtleSprite.drawTurtleSprite(this.running(),context,this.pos.x,this.pos.y,this.faceDirection < 0);
		}else if(mario.pos.x >= 450 && mario.pos.x < 1600 && !this.die){
			turtleSprite.drawTurtleSprite(this.running(),context,this.pos.x - mario.pos.x + 450 ,this.pos.y,this.faceDirection < 0);
		}else if(mario.pos.x >= 1600 && !this.die){
			turtleSprite.drawTurtleSprite(this.running(),context,this.pos.x  - 1150 ,this.pos.y,this.faceDirection < 0);
		}
		
	
	}
}

export {Turtle};