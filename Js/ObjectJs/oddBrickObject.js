import {PositionAndSpeed} from "../positionAndSpeed.js";
import {keys} from "../keyEvent.js";

class OddBrick{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.width = 16;
		this.height = 16;
	}

	update(marioArray){

		if(!marioArray.isDie && marioArray.isRunning && !marioArray.underGround){

			//-----------bug -marioArray.speed.y 為了在磚塊頂端不能移動

			//從左側碰到
			if( marioArray.pos.x + marioArray.width == this.pos.x
				&& marioArray.pos.y + marioArray.height - marioArray.speed.y > this.pos.y  
				&& marioArray.pos.y + marioArray.height / 2  - marioArray.speed.y < this.pos.y + this.height)
			{ 
				marioArray.pos.x = this.pos.x - marioArray.width ;
				marioArray.stopX = true;
				if(!marioArray.stopBesideTube
					&& keys.left 
					&& !keys.right){
					marioArray.stopX = false;
				}
			}

			// 從右側碰到
			else if(marioArray.pos.x == this.pos.x + this.width
				&& marioArray.pos.y + marioArray.height - marioArray.speed.y > this.pos.y
				&& marioArray.pos.y + marioArray.height / 2 - marioArray.speed.y  < this.pos.y + this.height)
			{					
				marioArray.pos.x = this.pos.x + this.width ;
				marioArray.stopX = true;
				if( keys.right && !keys.left){
					marioArray.stopX = false;
				}
			}

			else if(
				(marioArray.pos.x == this.pos.x + this.width 
				&& marioArray.pos.y + marioArray.height  < this.pos.y 
				&& keys.left)
				|| 
				(marioArray.pos.x + marioArray.width == this.pos.x 
				&& marioArray.pos.y + marioArray.height < this.pos.y  
				&& keys.right))
			{
				marioArray.stopX = false;
			} 

			// ------end of 小馬力歐---------

			// ------------控制站上--------------
			if(marioArray.speed.y > 0 
				&& marioArray.pos.x + marioArray.width > this.pos.x
				&& marioArray.pos.x < this.pos.x + this.width ){
				if(marioArray.pos.y >= this.pos.y - marioArray.height){
					marioArray.onOddbrick = true;
					marioArray.isJump = false;
					marioArray.pos.y = this.pos.y - marioArray.height;
					marioArray.speed.y = 0;
				}
			}	
		}

	}
	
	draw(context,oddBrickSprite,marioArray){
        
		if(marioArray.pos.x < 450 ){
			oddBrickSprite.drawSprite("oddBrick",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000){
			oddBrickSprite.drawSprite("oddBrick",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 ){
			oddBrickSprite.drawSprite("oddBrick",context,this.pos.x  - 4550 ,this.pos.y);
		}
	
	}
}

export {OddBrick};