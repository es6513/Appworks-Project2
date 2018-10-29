import {PositionAndSpeed} from "../positionAndSpeed.js";


class BadPlant{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.previousY;
		this.frameIndex = 0;
		this.hitByFire = false;
		this.goUp = false;
		this.goDown = false;
		this.speed = {
			y:0.2
		};
		this.width = 16;
		this.height = 24;
		this.clearTimeout;
		this.framesRun = [
			"badPlantClose","badPlantClose","badPlantClose","badPlantClose","badPlantClose",
			"badPlantClose","badPlantClose","badPlantClose","badPlantClose","badPlantClose",
			"badPlantOpen","badPlantOpen","badPlantOpen","badPlantOpen","badPlantOpen",
			"badPlantOpen","badPlantOpen","badPlantOpen","badPlantOpen","badPlantOpen"
		];
	}
	
	update(marioArray){
		// 	碰撞公式:shape.pos.x + shape.width > this.pos.x 
		//	&& shape.pos.x < this.pos.x + this.width
		//	&& shape.pos.y + shape.height > this.pos.y
		//	&& shape.pos.y < this.pos.y + this.height

		// ------bug----- 已經消失的怪物需要清除掉(preffered) 或是讓她不能再移動，否則會有bug
		if(!this.goUp){
			this.previousY = this.pos.y
		}

		if(!this.isDie && !this.falling ){
			this.goUp = true;
			this.move();	
		}	

		if(this.pos.y < this.previousY - this.height ){
			this.speed.y = 0;
			this.goDown = true;
		}  //到達最高點停止


		let timeoutId;
		if(this.goDown && !this.clearTimeout){
			timeoutId = setTimeout(() => {
				this.speed.y = - 0.2
				this.goDown = false;
				this.clearTimeout = null;
			}, 2000);
			this.clearTimeout = timeoutId;
		}  //到達最高點後停止兩秒再回去


		if(this.pos.y > this.previousY + this.height/2){
			 this.speed.y *=-1;
		} //下去一段距離跑回
		
		
		// -------馬力歐碰到壞花死掉----------
	
		// X軸的判定 用 width/2 比較好一點,

		//------1.小馬力歐的死亡-------

		if(!marioArray.isInvincible 
			&& !marioArray.isBigMario 
			&& !marioArray.isFireMario 
			&& !marioArray.willDie 
			&& !marioArray.falling 
			&& !marioArray.underGround
			&& !this.hitByFire
			&& marioArray.pos.x + marioArray.width  > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height > this.pos.y
			&& marioArray.pos.y < this.pos.y + this.height	)
		{
			let dieSound = new Audio("/music/mario-die-sound.wav");
			dieSound.play();
			marioArray.willDie = true;
		}

		//------2.大馬力歐死亡變小馬力歐-------
		
		if(!marioArray.isInvincible 
			&& marioArray.isBigMario 
			&& !this.hitByFire
			&& !marioArray.falling 
			&& !marioArray.underGround
			&& marioArray.pos.x + marioArray.width  > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height > this.pos.y
			&& marioArray.pos.y < this.pos.y + this.height	)
		{
			marioArray.isInvincible = true;
			marioArray.backToSmall = true; 
			this.marioPipeSound();
		}


		//------3.火馬力歐死亡變大馬力歐-------

		if(!marioArray.isInvincible 
			&& marioArray.isFireMario 
			&& !this.hitByFire
			&& !marioArray.falling 
			&& !marioArray.underGround
			&& marioArray.pos.x + marioArray.width  > this.pos.x 
			&& marioArray.pos.x < this.pos.x + this.width 
			&& marioArray.pos.y + marioArray.height > this.pos.y
			&& marioArray.pos.y < this.pos.y + this.height)	
			{
			marioArray.isInvincible = true;
			marioArray.backToBig = true; 
			this.marioPipeSound();
		}

	
		//------end 大馬力歐的狀況-------

		// -------End 馬力歐碰到壞花死掉-------


			// 	碰撞公式:shape.pos.x + shape.width > this.pos.x 
		//	&& shape.pos.x < this.pos.x + this.width
		//	&& shape.pos.y + shape.height > this.pos.y
		//	&& shape.pos.y < this.pos.y + this.height


		// -----------被火力歐的火球打到-----------------

	


		// -----------end被火力歐的火球打到--------------

	}

	move(){
		this.pos.y -= this.speed.y;
	}
  
	badPlantDieSound(){
		let dieSound = new Audio("/music/mario-kick-sound.wav");
		dieSound.play();
	}

	marioPipeSound(){
		let marioPipeSound = new 	Audio("/music/mario-pipe-sound.wav");
		marioPipeSound.play();
	}

	running(){
			this.frameIndex = ++this.frameIndex % 20;
			return this.framesRun[this.frameIndex];
	}

	draw(context,BadPlantSprite,marioArray){
		if(marioArray.pos.x < 450 && !this.hitByFire ){
			BadPlantSprite.drawSprite(this.running(),context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && !this.hitByFire && marioArray.pos.x < 5000){
			BadPlantSprite.drawSprite(this.running(),context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 && !this.hitByFire){
			BadPlantSprite.drawSprite(this.running(),context,this.pos.x  - 4550 ,this.pos.y);
		}

	}
}

export {BadPlant};