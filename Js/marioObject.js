import {PositionAndSpeed} from "../Js/positionAndSpeed.js";
import {pressed,keys,keyup,keydown} from "../Js/keyEvent.js";
import {loadMario,loadSky,loadGround} from "../Js/loadSprite.js";
import { mario } from "./marioTest.js";


class Mario{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.speed = new PositionAndSpeed(0,0);
		this.direction = 0;
		this.isRunning = false;
		this.faceDirection = 1;
		this.isJump = false;
		this.onTube = false;
		this.isStop = false;
		this.controlSpeedFactor; 
		// 用來控制馬力歐根據不同螢幕解析度，跑到右邊終點都能再往回跑
		this.frameIndex = 0;
		this.framesRunRightArray = ["runRight-1","runRight-1","runRight-1",
			"runRight-2","runRight-2","runRight-2",
			"runRight-3","runRight-3","runRight-3",
			"mario"
		];
		this.framesRunTest = ["runRight-1",
			"runRight-2",
			"runRight-3",
			"mario"
		];

	}
	
	update(screen,tubeSprite,marioSpriteSet){
		// console.log(this.pos.x);
		this.controlSpeedFactor  = this.speed.x * (this.speed.x / 2 - 1) / (this.speed.x / 2);
		// 用來控制馬力歐根據不同螢幕解析度，跑到右邊終點都能再往回跑
		// 控制水管障礙
		// console.log(this.controlSpeedFactor);
		// console.log(this.pos.x);
		console.log(this.pos.x);
		if(this.isRunning){
			screen.tubes[0].ranges.forEach(([x1,x2,y1,y2]) =>{
				if(this.pos.x <= x1 * tubeSprite.width 
					&& this.pos.y > y1 * tubeSprite.height - marioSpriteSet.height 
					&& this.faceDirection == 1)
				{
					if(this.pos.x + marioSpriteSet.width == x1 * tubeSprite.width ){
						this.speed.x = 0;
					}
					if(keys.left){
						this.speed.x = 4;
					}
				}
				else if(this.pos.x >= x1 * tubeSprite.width 
					&& this.pos.y > y1 * tubeSprite.height -  marioSpriteSet.height
					&& this.faceDirection == -1)
				{	
					if(this.pos.x == x2 * tubeSprite.width){
						this.speed.x = 0;
					}
					if(keys.right){
						this.speed.x = 4;
					}
				}


				// ------------控制站在水管上-----------------
				if(this.speed.y > 0 
					&& this.pos.x + marioSpriteSet.width > x1 * tubeSprite.width 
					&& this.pos.x < x1 * tubeSprite.width  + tubeSprite.width ){
					
					if(this.pos.y > y1 * tubeSprite.height - marioSpriteSet.height - 1){
						this.isJump = false;
						this.onTube = true;
						this.pos.y = y1 * tubeSprite.height - marioSpriteSet.height - 1;
						this.speed.y = 0;
					}	
					if(keys.top && 	this.onTube && !this.isJump){
						this.isJump = true;
						this.onTube = false;
						this.speed.y -= 8;
					}
					this.speed.y += 0.5;
				}	
				
				// ------------end of 控制站在水管上-----------------
			});
		}

		// End of 控制水管障礙
	

		// -------控制馬力歐移動-----
		if(this.pos.x + this.speed.x <= window.screen.width && this.pos.x > 0){
			 
			if(keys.right && !keys.left){
				// 這邊判斷式必須要寫兩個，一個是按右鍵，一個是沒按左鍵，這樣才能避免兩個按鍵產生衝突，並且完全獨立開
				this.moveRight();
				this.faceDirection = this.direction;
			}
			if(keys.left && !keys.right){
				// 這邊判斷式必須要寫兩個，一個是按右鍵，一個是沒按左鍵，這樣才能避免兩個按鍵產生衝突，並且完全獨立開
				this.moveLeft();
				this.faceDirection = this.direction;
			}
		}
		else if(this.pos.x == 0){
			if(keys.right){
				this.moveRight();
				this.faceDirection = this.direction;
			}
		}
		else if(this.pos.x + this.controlSpeedFactor  == window.screen.width){

			//這邊有點奇怪，筆電的螢幕如果有接大螢幕，跑到終點的時候 screen.width 會變大，可以再往左邊跑，但是沒接的時候不行
			
			if(keys.left){
				this.moveLeft();
				this.faceDirection = this.direction;
			}
		}
		else if(this.pos.x  == window.screen.width){
			//這邊有點奇怪，筆電的螢幕如果有接大螢幕，跑到終點的時候 screen.width 會變大，可以再往左邊跑，但是沒接的時候不行
			if(keys.left){
				this.moveLeft();
				this.faceDirection = this.direction;
			}
		}

		// ------End of 控制馬力歐移動-----

	 	// --------跳躍的設定 ---------------
		if(keys.top && this.isJump == false){
			this.isJump = true;
			this.speed.y -= 8;
			this.speed.x = 4;
		}
		
		this.speed.y += 0.5;  //gravity
		this.pos.y += this.speed.y;
		
		if(this.pos.y >= 13 * 16){
			this.isJump = false;
			this.pos.y =  13 * 16;
			this.speed.y = 0;
			this.speed.x = 4;
		}	
		
		// 沒有按住按鍵的時候，將方向設回預設值
		setTimeout(() => {
			if(pressed == false){
				this.direction = 0;
			}
		});
	}

	moveRight(){
		this.pos.x += this.speed.x;
		this.direction = 1;
		this.isRunning = true;
	}

	moveLeft(){
		this.pos.x -= this.speed.x;
		this.direction = -1;
		this.isRunning = true;
	}

	jump(){
		this.pos.y -= this.speed.y;
	}

	running(){
		if(this.direction == 1){
			this.frameIndex = ++this.frameIndex % 10;
			return this.framesRunRightArray[this.frameIndex];
		}else if(this.direction == -1){
			this.frameIndex = ++this.frameIndex % 10;
			return this.framesRunRightArray[this.frameIndex];
		}
		return"mario";
	}

	//每張圖片的切割大小存在 mario.json,其中 runRight-2 跟 runRight-3 並沒有從16的倍數切(因為圖片會有點卡住所以選了一些特殊的切割點) 

	draw(context,marioSprite,screen,tubeSprite){
		// console.log(marioSprite.image);
		//呼叫 SpriteSet 的 draw 方法

		if(!this.isJump ){
			if(mario.pos.x < 450 ){
				marioSprite.drawMarioSprite(this.running(),context,this.pos.x,this.pos.y,this.faceDirection < 0);
			}else if(mario.pos.x >= 450 && mario.pos.x < 1600){
				marioSprite.drawMarioSprite(this.running(),context,450,this.pos.y,this.faceDirection < 0);
			}else if(mario.pos.x >= 1600){
				marioSprite.drawMarioSprite(this.running(),context,this.pos.x - 1150,this.pos.y,this.faceDirection < 0);
			}

		}
		else if(this.isJump){
			if(mario.pos.x < 450 ){
				marioSprite.drawMarioSprite("jump",context,this.pos.x,this.pos.y,this.faceDirection < 0);
			}else if(mario.pos.x >= 450 && mario.pos.x < 1600){
				marioSprite.drawMarioSprite("jump",context,450,this.pos.y,this.faceDirection < 0);
			}else if(mario.pos.x >= 1600){
				marioSprite.drawMarioSprite("jump",context,this.pos.x - 1150,this.pos.y,this.faceDirection < 0);
			}
		}

		

		// marioSprite.drawMarioSprite(this.running(),context,50,this.pos.y,this.faceDirection < 0);
		// 用來控制馬力歐的絕對位置


		// marioSprite.draw("marioStand",context,this.pos.x,this.pos.y); // 一開始只畫一個馬力歐的時候用的
		
	}
}

export {Mario};