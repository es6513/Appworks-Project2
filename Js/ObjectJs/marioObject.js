import {PositionAndSpeed} from "../positionAndSpeed.js";
import {pressed,keys,keyup,keydown} from "../keyEvent.js";
import {loadMario,loadSky,loadGround} from "../loadSprite.js";
import { mario } from "../marioTest.js";

let windowWidth = $(window).width();
class Mario{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.speed = new PositionAndSpeed(0,0);
		this.width = 16;
		this.height = 16;
		this.direction = 0;
		this.isRunning = false;
		this.faceDirection = 1;
		this.isJump = false;
		this.onTube = false;
		this.stopX = false;
		this.isDie = false;
		this.isOnGround = false;
		this.clearTimeout;
		this.controlSpeedFactor; 
		// 用來控制馬力歐根據不同螢幕解析度，跑到右邊終點都能再往回跑
		this.frameIndex = 0;
		this.framesRunArray = ["runRight-1","runRight-1","runRight-1",
			"runRight-2","runRight-2","runRight-2",
			"runRight-3","runRight-3","runRight-3",
			"mario"
		];
	}

	update(screen,tubeSprite,marioSpriteSet,groundSprite,tubeJson){
		this.controlSpeedFactor  = this.speed.x * (this.speed.x / 2 - 1) / (this.speed.x / 2);
		// 用來控制馬力歐根據不同螢幕解析度，跑到右邊終點都能再往回跑
		// console.log(this.direction);
		// console.log(this.speed.x);
		// console.log(this.pos.x);
		// console.log(this.isDie);
		let timeoutId;
		if(this.isDie && !this.clearTimeout){
			timeoutId = setTimeout(() => {
				this.isDie = false;
				this.clearTimeout = null;
			},3000);
			this.clearTimeout = timeoutId;
		}


		// -------控制馬力歐移動-----
		if(!this.isDie && this.pos.x + this.speed.x <= window.screen.width && this.pos.x > 0){
			 
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
		if(!this.isDie && keys.top && this.isJump == false){
			this.isJump = true;
			this.isOnGround = false;
			this.speed.y -= 8;
			this.speed.x = 4;	
			this.jumpSound();
		}		

		if(!this.isDie && this.isJump && this.stopX){
			this.stopX = false;
		} //這一段暫時可以解決如果離障礙物已經是0的狀態不能跳起來移動
		

		this.speed.y += 0.5;  //gravity
		this.pos.y += this.speed.y;


		// --------end 跳躍的設定 ---------------

		//	把兩段馬力歐物件裡面的兩段程式碼:
		//	1. 控制馬力歐落地
		//	2. 控制水管障礙
		//	移到較後面跳躍及控制移動後面，可以修正加速度過大，在連續跳躍時會產生短暫穿越的問題。

		// -------控制馬力歐落地時參數回復原狀---------
		screen.backgrounds[1].ranges.forEach(([x1,x2,y1,y2]) =>{
			// if(!this.isDie && this.pos.y >= y1 * screen.height - this.height){
			// 	this.isJump = false;
			// 	this.isOnGround = true;
			// 	this.pos.y =  y1 * screen.height - this.height;
			// 	this.speed.y = 0;
			// }	

			if(!this.isDie && this.speed.y > 0 && this.pos.x + this.width > x1 * 16
				&& this.pos.x < x2 * 16 + 16)
			{
				if(this.pos.y >= y1 * screen.height - this.height)
				{
					this.isJump = false;
					this.isOnGround = true;
					this.pos.y = y1 * screen.height - this.height;
					this.speed.y = 0;
				}
				this.speed.y += 0.5;
			}else if(!this.isDie && this.pos.y > y2 * screen.height ){
				this.isDie = true;
				mario.speed.y = -16;
				let dieSound = new Audio("/music/mario-die-sound.wav");
				dieSound.play();			
			}

		});

		// -------End   控制馬力歐落地時參數回復原狀---------

	
		// if(this.speed.y > 0 
		// 	&& this.pos.x + this.width > x
		// 	&& this.pos.x < x + tubeJson.width ){
			
		// 	if(this.pos.y > y - this.height){
		// 		this.isJump = false;
		// 		this.isOnGround = false;
		// 		this.pos.y = y - this.height;
		// 		this.speed.y = 0;
		// 	}	
		// 	// if(keys.top && 	this.onTube && !this.isJump){
		// 	// 	this.isJump = true;
		// 	// 	this.onTube = false;
		// 	// 	this.speed.y -= 8;
		// 	// } // 忘記這幹嘛用的，先 comment 
		// 	this.speed.y += 0.5;
		// }					
		// ---------------控制水管障礙---------------

		// 10/4 稍作修正，碰到障礙物時，馬力歐速度不變，只是 X 位置停在原地。
		if(!this.isDie && this.isRunning){
			tubeJson.Pos[0].ranges.forEach(([x,y])=>{
				if( this.pos.x + this.width == x
					&& this.pos.y > y )
				{ //從左側碰到水管
					this.pos.x = x - this.width ;
					this.stopX = true;
					// this.speed.x = 0;
					if(keys.left && !keys.right){
						// this.speed.x = 4;
						this.stopX = false;
					}
				}
				else if(this.pos.x == x + tubeJson.width
					&& this.pos.y > y )
				{	// 從右側碰到水管
					this.pos.x = x + tubeJson.width  ;
					this.stopX = true;
					// this.speed.x = 0;
					if(keys.right && !keys.left){
						// this.speed.x = 4;
						this.stopX = false;
					}
				}

				// ------------控制站在水管上-----------------
				if(this.speed.y > 0 
					&& this.pos.x + this.width > x
					&& this.pos.x < x + tubeJson.width ){
					
					if(this.pos.y > y - this.height){
						this.isJump = false;
						this.isOnGround = false;
						this.pos.y = y - this.height;
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

		// --------死亡撥放音樂---------------

		//---------End of 死亡撥放音樂----------------
	
		// 沒有按住按鍵的時候，將方向設回預設值
		setTimeout(() => {
			if(pressed == false){
				this.direction = 0;
			}
		});
	}

	jumpSound(){
		let jumpSound = new Audio("/music/maro-jump-sound.wav");
		jumpSound.play();
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
		// console.log( windowWidth - mario.pos.x - 8);
		// // console.log(1920 - mario.pos.x - 8);
		// if(1920 - mario.pos.x - 8 ==  windowWidth - mario.pos.x - 8){
		// 	console.log("不要捲");
		// }
		if(!this.isDie){
			if(mario.pos.x < 450 ){
				marioSprite.drawMarioSprite(!this.isJump ? this.running() : "jump",context,this.pos.x,this.pos.y,this.faceDirection < 0);
			}else if(mario.pos.x >= 450 && mario.pos.x < 1600){
				marioSprite.drawMarioSprite(!this.isJump ? this.running() : "jump",context,450,this.pos.y,this.faceDirection < 0);
			}else if(mario.pos.x >= 1600){
				marioSprite.drawMarioSprite(!this.isJump ? this.running() : "jump",context,this.pos.x - 1150,this.pos.y,this.faceDirection < 0);
			}		
		}
		
		if(this.isDie){
			if(mario.pos.x < 450 ){
				marioSprite.drawMarioSprite("die",context,this.pos.x,this.pos.y,this.faceDirection < 0);
			}else if(mario.pos.x >= 450 && mario.pos.x < 1600){
				marioSprite.drawMarioSprite( "die",context,450,this.pos.y,this.faceDirection < 0);
			}else if(mario.pos.x >= 1600){
				marioSprite.drawMarioSprite("die",context,this.pos.x - 1150,this.pos.y,this.faceDirection < 0);
			}
		}

		// ------------------根據不同螢幕解析度做控制----------------------
		// console.log(1920 - mario.pos.x - 8);
		// console.log(windowWidth);
		// console.log(windowWidth - mario.pos.x );
		// if(mario.pos.x < windowWidth / 2 - 8 ){
		// 	marioSprite.drawMarioSprite(!this.isJump ? this.running() : "jump",context,this.pos.x,this.pos.y,this.faceDirection < 0);
		// }else if(mario.pos.x >= windowWidth / 2 - 8  && mario.pos.x < 956 + windowWidth / 2){
		// 	marioSprite.drawMarioSprite(!this.isJump ? this.running() : "jump",context,windowWidth / 2 - 8,this.pos.y,this.faceDirection < 0);
		// }
		// else if(mario.pos.x >= (1920 - 8 + windowWidth) / 2){
		// 	marioSprite.drawMarioSprite(!this.isJump ? this.running() : "jump",context,this.pos.x - 964 - 8 ,this.pos.y,this.faceDirection < 0);
		// }

		// --------------end 根據不同螢幕解析度做控制--------------

		// marioSprite.drawMarioSprite(this.running(),context,50,this.pos.y,this.faceDirection < 0);
		// 用來控制馬力歐的絕對位置


		// marioSprite.draw("marioStand",context,this.pos.x,this.pos.y); // 一開始只畫一個馬力歐的時候用的
		
	}
}

export {Mario};