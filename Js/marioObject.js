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
		this.stopX = false;
		this.controlSpeedFactor; 
		// 用來控制馬力歐根據不同螢幕解析度，跑到右邊終點都能再往回跑
		this.frameIndex = 0;
		this.framesRunArray = ["runRight-1","runRight-1","runRight-1",
			"runRight-2","runRight-2","runRight-2",
			"runRight-3","runRight-3","runRight-3",
			"mario"
		];
	}

	update(screen,tubeSprite,marioSpriteSet,groundSprite){
		this.controlSpeedFactor  = this.speed.x * (this.speed.x / 2 - 1) / (this.speed.x / 2);
		// 用來控制馬力歐根據不同螢幕解析度，跑到右邊終點都能再往回跑
		// console.log(this.direction);
		// console.log(this.speed.x);
		console.log(this.pos.x);

		// -------控制馬力歐移動-----
		if(this.pos.x + this.speed.x <= 2900 && this.pos.x > 0){
			 
			if(keys.right && !keys.left && !this.stopX){
				// 這邊判斷式必須要寫兩個，一個是按右鍵，一個是沒按左鍵，這樣才能避免兩個按鍵產生衝突，並且完全獨立開
				if(this.stopX){
					this.stopX = false;
				}		
				this.moveRight();
				this.faceDirection = this.direction;
			}
			if(keys.left && !keys.right && !this.stopX){
				// 這邊判斷式必須要寫兩個，一個是按右鍵，一個是沒按左鍵，這樣才能避免兩個按鍵產生衝突，並且完全獨立開
				if(this.stopX){
					this.stopX = false;
				}			
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

		//	把兩段馬力歐物件裡面的兩段程式碼:
		//	1. 控制馬力歐落地
		//	2. 控制水管障礙
		//	移到較後面跳躍及控制移動後面，可以修正加速度過大，在連續跳躍時會產生短暫穿越的問題。

		// -------控制馬力歐落地時參數回復原狀---------
		screen.backgrounds[1].ranges.forEach(([x1,x2,y1,y2]) =>{
			if(this.pos.y > y1 * groundSprite.height - marioSpriteSet.height){
				this.isJump = false;
				this.onTube = false;
				this.pos.y =  y1 * groundSprite.height - marioSpriteSet.height;
				this.speed.y = 0;
			}	
		});

		// -------End   控制馬力歐落地時參數回復原狀---------


		// ---------------控制水管障礙---------------

		// 10/4 稍作修正，碰到障礙物時，馬力歐速度不變，只是 X 位置停在原地。
		if(this.isRunning){
			screen.tubes[0].ranges.forEach(([x1,x2,y1,y2]) =>{
				if( this.pos.x + marioSpriteSet.width == x1 * tubeSprite.width
					&& this.pos.y > y1 * tubeSprite.height  
				)
				{
					this.pos.x = x1 * tubeSprite.width - marioSpriteSet.width ;
					this.stopX = true;
					// this.speed.x = 0;
					if(keys.left && !keys.right){
						// this.speed.x = 4;
						this.stopX = false;
					}
				}
				else if(this.pos.x == x2 * tubeSprite.width
					&& this.pos.y > y1 * tubeSprite.height )
				{	
					this.pos.x = x1 * tubeSprite.width + tubeSprite.width;
					this.stopX = true;
					// this.speed.x = 0;
					if(keys.right && !keys.left){
						// this.speed.x = 4;
						this.stopX = false;
					}
				}

				// ------------控制站在水管上-----------------
				if(this.speed.y > 0 
					&& this.pos.x + marioSpriteSet.width > x1 * tubeSprite.width 
					&& this.pos.x < x1 * tubeSprite.width  + tubeSprite.width ){
					
					if(this.pos.y > y1 * tubeSprite.height - marioSpriteSet.height){
						this.isJump = false;
						this.onTube = true;
						this.pos.y = y1 * tubeSprite.height - marioSpriteSet.height;
						this.speed.y = 0;
					}	
					// if(keys.top && 	this.onTube && !this.isJump){
					// 	this.isJump = true;
					// 	this.onTube = false;
					// 	this.speed.y -= 8;
					// } // 忘記這幹嘛用的，先 comment 
					this.speed.y += 0.5;
				}	
				
				// ------------end of 控制站在水管上-----------------
			});
		}

		// ------------------End of 控制水管障礙----------

		// ------------------以上兩段----------------------
		// ------------------打烏龜-----------------------

		

		// ------------------End 打烏龜-----------------------
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
			return this.framesRunArray[this.frameIndex];
		}else if(this.direction == -1){
			this.frameIndex = ++this.frameIndex % 10;
			return this.framesRunArray[this.frameIndex];
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

		// 讓馬力歐的位置可以始終在螢幕的中心點。

		

		// marioSprite.drawMarioSprite(this.running(),context,50,this.pos.y,this.faceDirection < 0);
		// 用來控制馬力歐的絕對位置


		// marioSprite.draw("marioStand",context,this.pos.x,this.pos.y); // 一開始只畫一個馬力歐的時候用的
		
	}
}

export {Mario};