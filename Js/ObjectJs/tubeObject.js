import {PositionAndSpeed} from "../positionAndSpeed.js";
import {keys} from "../keyEvent.js";

class Tube{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.width = 32;
		this.height = 32;
	}

	update(marioArray){

		if(!marioArray.isDie && marioArray.isRunning && !marioArray.underGround){
			
			//----------小馬力歐過水管-----------

			//從左側碰到水管

			if( marioArray.pos.x + marioArray.width == this.pos.x
				&& marioArray.pos.y + marioArray.height > this.pos.y
				&& marioArray.pos.y + marioArray.height / 2 < this.pos.y + this.height )
			{ 
				marioArray.pos.x = this.pos.x - marioArray.width ;
				marioArray.stopX = true;  //控制跑回來會回到水管上去的問題
				marioArray.stopBesideTube = true;
				if(keys.left && !keys.right){
					marioArray.stopX = false;
				}
			}
			// 從右側碰到水管
			else if(marioArray.pos.x == this.pos.x + this.width
				&& marioArray.pos.y + marioArray.height > this.pos.y
				&& marioArray.pos.y + marioArray.height / 2 < this.pos.y + this.height )
			{	// 從右側碰到水管
				marioArray.pos.x = this.pos.x + this.width ;
				marioArray.stopX = true;
				marioArray.stopBesideTube = true;
				// marioArray.speed.x = 0;
				if(keys.right && !keys.left){
					marioArray.stopX = false;
				}
			}
			else if(marioArray.pos.x == this.pos.x + this.width 
				&& marioArray.pos.y + marioArray.height  < this.pos.y 
				&& (keys.left || keys.right)){
				marioArray.stopX = false;
			}else if(marioArray.pos.x + marioArray.width == this.pos.x 
				&& marioArray.pos.y + marioArray.height < this.pos.y  
				&& (keys.left || keys.right)){
				marioArray.stopX = false;
			} //修正會斜向穿越水管的問題，讓馬力歐身高高過它才可以移動。
			else {
				marioArray.stopBesideTube = false;  // 為了讓水管跟 oddbrick 卡住時不能移動
			}
			// ------end of 小馬力歐過水管---------

			// ------------控制站在水管上--------------
			if(marioArray.speed.y > 0 
				&& marioArray.pos.x + marioArray.width > this.pos.x
				&& marioArray.pos.x < this.pos.x + this.width ){
				if(marioArray.pos.y >= this.pos.y - marioArray.height){
					marioArray.isJump = false;
					marioArray.isOnGround = false; //為了控制從水管上下來採怪物不會死掉
					marioArray.onTube = true;
					if(!marioArray.goWrongTube && !marioArray.getDestinationTube){
						marioArray.pos.y = this.pos.y - marioArray.height;	
						marioArray.fallingFromRightBorder = false;
						marioArray.fallingFromLeftBorder = false;
					}
					marioArray.speed.y = 0;
				}	
				marioArray.speed.y += 0.5;
			}
			// ------------end of 控制站在水管上-----------------
		}
	}
	

	draw(context,tubeSprite,marioArray){
		if(marioArray.pos.x < 450 ){
			tubeSprite.drawSprite("tube",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000){
			tubeSprite.drawSprite("tube",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 ){
			tubeSprite.drawSprite("tube",context,this.pos.x  - 4550 ,this.pos.y);
		}
	}
}

export {Tube};