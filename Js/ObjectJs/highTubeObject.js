import {PositionAndSpeed} from "../positionAndSpeed.js";
import {keys} from "../keyEvent.js";

class HighTube{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.width = 32;
		this.height = 48;
	}
	
	update(marioArray){
		if(!marioArray.isDie && marioArray.isRunning && !marioArray.underGround){
			
			if( marioArray.pos.x + marioArray.width == this.pos.x
				&& marioArray.pos.y + marioArray.height > this.pos.y
				&& marioArray.pos.y + marioArray.height / 2 < this.pos.y + this.height )
			{ //從左側碰到水管
				marioArray.pos.x = this.pos.x - marioArray.width ;
				marioArray.stopX = true;
				if(keys.left && !keys.right){
					marioArray.stopX = false;
				}
			}
			else if(marioArray.pos.x == this.pos.x + this.width
				&& marioArray.pos.y + marioArray.height > this.pos.y
				&& marioArray.pos.y + marioArray.height / 2 < this.pos.y + this.height )
			{	// 從右側碰到水管
				marioArray.pos.x = this.pos.x + this.width ;
				marioArray.stopX = true;				
				if(keys.right && !keys.left){
					marioArray.stopX = false;
				}
			}
			else if(marioArray.pos.y + marioArray.height  < this.pos.y && keys.left 
				|| marioArray.pos.y + marioArray.height < this.pos.y  && keys.right){;
				marioArray.stopX = false;
			} //修正會斜向穿越水管的問題，讓馬力歐身高高過它才可以移動。

			// ------end of 小馬力歐過水管---------

			// ------------控制站在水管上--------------
			if(marioArray.speed.y > 0 
				&& marioArray.pos.x + marioArray.width > this.pos.x
				&& marioArray.pos.x < this.pos.x + this.width ){
				if(marioArray.pos.y >= this.pos.y - marioArray.height){
					marioArray.isJump = false;
					marioArray.onTube = true;
					marioArray.isOnGround = false; //為了控制從水管上下來採怪物不會死掉
					marioArray.pos.y = this.pos.y - marioArray.height;
					marioArray.speed.y = 0;
				}	
				marioArray.speed.y += 0.5;
			}		
		}			
	}

	draw(context,tubeSprite,marioArray){
				
		if(marioArray.pos.x < 450 ){
			tubeSprite.drawSprite("highTube",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000){
			tubeSprite.drawSprite("highTube",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 ){
			tubeSprite.drawSprite("highTube",context,this.pos.x  - 4550 ,this.pos.y);
		}
	
	}
}

export {HighTube};