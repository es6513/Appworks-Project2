import {PositionAndSpeed} from "../positionAndSpeed.js";
import {pressed,keys,keyup,keydown,keypress} from "../keyEvent.js";
import {loadMario,loadSky,loadGround} from "../loadSprite.js";
import {Fireball} from "../ObjectJs/fireballObject.js";
// import { mario } from "../marioTest.js";

let windowWidth = $(window).width();
class Mario{
	constructor(){
		this.pos = new PositionAndSpeed(0,0);
		this.speed = new PositionAndSpeed(0,0);
		this.width = 16;
		this.height = 32;
		this.bigHeight = 32;
		this.direction = 0;
		this.isRunning = false;
		this.faceDirection = 1;

		// ----------控制撞到磚塊狀態----------

		this.isOnBrick = false;
		this.isBottomBrick = false;

		this.previousX;
		this.prvioxusY;


		// ----------控制撞到磚塊狀態----------

		//--------控制不同型態的馬力歐------------

		this.backToSmall = false;
		this.changeToBig = false;
		this.isBigMario = false;

		this.backToBig = false;
		this.changeToFire = false;
		this.isFireMario = false;


		this.shot = false;
		this.fireArray = new Array();

		//----------控制不同型態的馬力歐---------
		this.isInvincible = false;
		this.isJump = false;
		this.isSquat = false;
		this.onTube = false;
		this.stopX = false;
		this.willDie = false;
		this.isDie = false;
		this.isOnGround = false;
		this.isOnBrickZone = false;
		this.passStage = false;
		this.falling = false;
		this.canPlayPassMusic = false;
		this.onPoleBottom = false;
		this.walkToCastle = false;
		this.hide = false;
		this.clearTimeout;
		this.clearTimeout2;
		this.clearTimeout3;
		this.clearTimeout4;
		this.clearTimeout5;
		this.clearTimeout6;
		this.controlSpeedFactor; 
		// 用來控制馬力歐根據不同螢幕解析度，跑到右邊終點都能再往回跑
		this.frameIndex = 0;
		this.framesRunArray = ["runRight-1","runRight-1","runRight-1",
			"runRight-2","runRight-2","runRight-2",
			"runRight-3","runRight-3","runRight-3",
			"mario"
		];

		this.BacktoSmallFramesRunArray = [
			"BigOpacity","BigOpacity","BigOpacity",
			"BigOpacity","BigOpacity","BigOpacity",
			"BigOpacity","BigOpacity","BigOpacity",	
			"BigOpacity","BigOpacity","BigOpacity",	
			"SmallOpacity","SmallOpacity","SmallOpacity",
			"SmallOpacity","SmallOpacity","SmallOpacity",
			"SmallOpacity","SmallOpacity","SmallOpacity",
			"SmallOpacity","SmallOpacity","SmallOpacity"
		];

		this.ChangeBigFramesRunArray = [
			"mario","mario","mario",
			"mario","mario","mario",
			"mario","mario","mario",
			"BigHead","BigHead","BigHead",
			"BigHead","BigHead","BigHead",
			"BigHead","BigHead","BigHead",
			"Bmario","Bmario","Bmario",
			"Bmario","Bmario","Bmario",
			"Bmario","Bmario","Bmario"
		];

		this.BigFramesRunArray = ["BrunRight-1","BrunRight-1","BrunRight-1",
			"BrunRight-2","BrunRight-2","BrunRight-2",
			"BrunRight-3","BrunRight-3","BrunRight-3",
			"Bmario"
		];

		this.ChangeFireFramesRunArray = [
			"Bmario","Bmario","Bmario",
			"Bmario","Bmario","Bmario",
			"Bmario","Bmario","Bmario",
			"Fmario",	"Fmario",	"Fmario",
			"Fmario",	"Fmario",	"Fmario",
			"Fmario",	"Fmario",	"Fmario",
		];

		
		this.BacktoBigFramesRunArray = [
			"FireOpacity","FireOpacity","FireOpacity",
			"FireOpacity","FireOpacity","FireOpacity",
			"FireOpacity","FireOpacity","FireOpacity",
			"FireOpacity","FireOpacity","FireOpacity",
			"BigOpacity","BigOpacity","BigOpacity",
			"BigOpacity","BigOpacity","BigOpacity",
			"BigOpacity","BigOpacity","BigOpacity",	
			"BigOpacity","BigOpacity","BigOpacity",	
		];

		this.FireFramesRunArray = ["FrunRight-1","FrunRight-1","FrunRight-1",
			"FrunRight-2","FrunRight-2","FrunRight-2",
			"FrunRight-3","FrunRight-3","FrunRight-3",
			"Fmario"
		];
	}

	update(screen,tubeJson,poleJson,castleJson,flagArray,brickJson,oddBrickJson){
		this.controlSpeedFactor  = this.speed.x * (this.speed.x / 2 - 1) / (this.speed.x / 2);
		// 用來控制馬力歐根據不同螢幕解析度，跑到右邊終點都能再往回跑
		if(keys.zbutton){
			this.pos.x += 1;
		}

		// ---------無敵以及死亡的處理---------
		let timeoutId;


		// ------------1.無敵----------------
		if(this.isInvincible && !this.clearTimeout){
			timeoutId = setTimeout(() => {
				this.isInvincible = false;	
				this.clearTimeout = null;
			}, 1000);
			this.clearTimeout = timeoutId;
		}	


		// ------------2.死亡----------------

		let timeoutId6;
	
		if(this.willDie && !this.clearTimeout6){
			timeoutId = setTimeout(() => {
				this.willDie = false;
				this.isDie = true;	
				this.clearTimeout = null;
			}, 1000);
			this.clearTimeout6 = timeoutId6;
		}	

		// if(this.isDie ){
		// 	this.speed.y = -4;
		// }



		// End 用來控制大馬力歐變回小馬力歐的無敵狀態

		// -------控制馬力歐變大之後的高度------

		// if(this.isBigMario || this.isFireMario){
		// 	this.height = 32;
		// }else{
		// 	this.height = 16;
		// }

		// ------End 控制馬力歐變大之後的高度------

		

		// -------控制馬力歐移動-----

		// 過關後用passStage轉換成true，讓玩家不再能透過按鍵控制馬力歐
		if(!this.backToBig 
			&& !this.backToSmall 
			&& !this.changeToBig
			&& !this.changeToFire
			&& !this.willDie
			&& !keys.space 
			&& !this.canPlayPassMusic 
			&& !this.isDie 
			&& this.pos.x + this.speed.x <= 5000
			&& this.pos.x > 0
			&& !this.isSquat
		)
		{
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
		else if(!this.canPlayPassMusic && this.pos.x + this.controlSpeedFactor  == 5000){
			//這邊有點奇怪，筆電的螢幕如果有接大螢幕，跑到終點的時候 screen.width 會變大，可以再往左邊跑，但是沒接的時候不行
			if(keys.left){
				this.moveLeft();
				this.faceDirection = this.direction;
			}
		}
		else if(!this.canPlayPassMusic && this.pos.x  == 5000){
			//這邊有點奇怪，筆電的螢幕如果有接大螢幕，跑到終點的時候 screen.width 會變大，可以再往左邊跑，但是沒接的時候不行
			if(keys.left){
				this.moveLeft();
				this.faceDirection = this.direction;
			}
		}

		// ------End of 控制馬力歐移動-----

		 // --------跳躍的設定 ---------------
		 
		// if(!this.isDie && keys.top && this.isJump == false){
		// 	this.isJump = true;
		// 	this.isOnGround = false;
		// 	this.speed.y -= 8;
		// 	this.speed.x = 4;	
		// 	this.jumpSound();
		// }		

		//上面這段程式碼現在移到下方，在有地面的情況下才可跳躍。

				
		if(!this.canPlayPassMusic){
			this.speed.y += 0.5;  //gravity
			this.pos.y += this.speed.y; 
		}		
		
		

		// --------end 跳躍的設定 ---------------



		// -------控制馬力歐落地時參數回復原狀---------
		screen.backgrounds[1].ranges.forEach(([x1,x2,y1,y2]) =>{

			//--------------控制蹲下 --------------------

			if(keys.bottom && !this.isJump && !keys.space ){
				this.isSquat = true;
			}else{
				this.isSquat = false;
			}			

			//-----------END OF 控制蹲下---------------------


		 // --------跳躍的設定 ---------------

			if(!this.canPlayPassMusic 
				&& !this.backToBig 
				&& !this.backToSmall 
				&& !this.changeToBig
				&& !this.changeToFire
				&& !this.isDie 
				&& !this.willDie
				&& keys.top 
				&& !this.isJump
				&& !this.isSquat
				&& !this.shot
				&& this.pos.x + this.width > x1 * 16
				&& this.pos.x < x2 * 16 + 16){
				this.isJump = true;
				this.isOnGround = false;
				this.speed.y -= 10;  //起始跳躍速度，這個速度加上馬力歐的身高，剛好可以跳到最高的水管上面
				this.speed.x = 4;	
				if( !this.isBigMario && !this.isFireMario){
					this.jumpSound();
				}else{
					this.BjumpSound();
				}
			}		

			// -------------end of 跳躍的設定---------------

			//移到這裡(上方)，在有地面的情況下才可跳躍。

			if(!this.isDie 
				&& this.speed.y > 0 
				&& this.pos.x + this.width > x1 * 16
				&& this.pos.x < x2 * 16 + 16)
			{
				if(this.pos.y >= y1 * screen.height - this.height)
				{
					this.falling = false;
					this.isJump = false;
					this.onTube = false;
					this.isOnGround = true;
					this.pos.y = y1 * screen.height - this.height; //落地
					this.isBottomBrick = false;
					this.speed.y = 0;
				}
				// this.speed.y += 0.5;
			}else if(!this.isDie && this.pos.y >= y2 * screen.height + 96){
				//---------------------------懸崖---------
				// 用+96讓馬力歐掉下去一段距離才死掉，只是目前尚有按左右鍵會跑回來的 bug
				this.speed.x = 0;
				this.isDie = true;
				this.speed.y = -16;
				let dieSound = new Audio("/music/mario-die-sound.wav");
				dieSound.play();			
			}

		});

		// -------End   控制馬力歐落地時參數回復原狀---------

		
		
		// ---------------控制水管障礙---------------
		//10/12 調整了讀取圖片高度的大小為32，這邊會出現有時候可以穿過水管的 BUG

		// 10/4 稍作修正，碰到障礙物時，馬力歐速度不變，只是 X 位置停在原地。
		if(!this.isDie && this.isRunning){
			
			tubeJson.Pos[0].ranges.forEach(([x,y])=>{
				// if(!this.isDie 
				// 	&& this.isJump 
				// 	&& this.stopX 
				// 	&& this.pos.y < y - 16){
				// 	this.stopX = false;
				// } //這一段用 this.pos.y<192 暫時可以解決如果離障礙物已經是0的狀態不能跳起來移動 bug
				//會有出現落地前 stopX還是 false的狀況，會造成若在空中按下左右鍵，可以穿越水管
				
				
				//----------小馬力歐過水管-----------
				if( this.pos.x + this.width == x
					&& this.pos.y >= y - tubeJson.height )
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
					&& this.pos.y >= y - tubeJson.height )
				{	// 從右側碰到水管
					
					this.pos.x = x + tubeJson.width ;
					this.stopX = true;
					// this.speed.x = 0;
				
					if(keys.right && !keys.left){
						// this.speed.x = 4;
						this.stopX = false;
					}
				}
				else if(this.pos.y < y - tubeJson.height && keys.left 
					|| this.pos.y < y - tubeJson.height && keys.right){
					this.stopX = false;
				}

				// ------end of 小馬力歐過水管---------

				// ------------控制站在水管上--------------
				if(this.speed.y > 0 
					&& this.pos.x + this.width > x
					&& this.pos.x < x + tubeJson.width ){
					if(this.pos.y >= y - this.height){
						this.isJump = false;
						this.isOnGround = false;
						this.onTube = true;
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


		// ---------------控制 oddBrick 障礙---------------

		if(!this.isDie && this.isRunning){
			oddBrickJson.Pos[0].ranges.forEach(([x,y])=>{	
				//----------小馬力歐-----------
				if( this.pos.x + this.width == x
					&& this.pos.y + this.height / 2 >= y - oddBrickJson.height )
				{ //從左側碰到
					this.pos.x = x - this.width ;
					this.stopX = true;
					if(keys.left && !keys.right){
						this.stopX = false;
					}
				}
				else if(this.pos.x == x + oddBrickJson.width
					&& this.pos.y + this.height / 2  >= y - oddBrickJson.height )
				{	// 從右側碰到
					this.pos.x = x + oddBrickJson.width ;
					this.stopX = true;
					if(keys.right && !keys.left){
						this.stopX = false;
					}
				}
				// else if(this.pos.y < y  && keys.left 
				// 	|| this.pos.y < y && keys.right){
				// 	this.stopX = false;
				// }

				// ------end of 小馬力歐---------

				// ------------控制站上--------------
				if(this.speed.y > 0 
					&& this.pos.x + this.width > x
					&& this.pos.x < x + oddBrickJson.width ){
					if(this.pos.y >= y - this.height){
						this.isJump = false;
						this.isOnGround = false;
						this.pos.y = y - this.height;
						this.speed.y = 0;
					}	

				}					
				// ------------end of 控制站上-----------------
			});
		}



		// ---------------end of 控制 oddBrick 障礙-------
		// 	碰撞公式:shape.pos.x + shape.width > this.pos.x  左
		//	&& shape.pos.x < this.pos.x + this.width 右
		//	&& shape.pos.y + shape.height > this.pos.y 上
		//	&& shape.pos.y < this.pos.y + this.height 下

		// ---------------End of 控制磚塊障礙---------------

		// -----------------馬力歐過關---------------------


		// 1. -----碰到旗桿後馬力歐下降-----

		// -----bug 要測試一下拉旗子的動作-------
		

		poleJson.Pos[0].ranges.forEach(([x,y])=>{
			if(this.pos.x + this.width >= x + 8
				&& this.pos.y <= y + poleJson.height - 16
				&& !this.canPlayPassMusic)
			{ 
				this.direction = 0;
				this.pos.x = x - poleJson.width / 2;  //拉旗桿的時候馬力歐的X位置
				this.passStage = true;
			}

			if(!this.onPoleBottom && !this.isJump && this.pos.x + this.width >= x && this.pos.y >= 224){
				this.pos.x = x - this.width;
			}  //控制馬力歐在旗竿前停止前進

			if(this.canPlayPassMusic && !this.onPoleBottom){
				this.speed.y = 2;
				this.pos.y = this.pos.y + 2;

				if(!this.isBigMario && this.pos.y >= y + 128){
					this.pos.y = y + 128;
					this.onPoleBottom = true;
				}

				if(this.isBigMario && this.pos.y >= y + 128 || this.isFireMario && this.pos.y >= y + 128){
					this.pos.y = y + 128;
					this.onPoleBottom = true;
				}
			}
			if(this.pos.x >= x + 16){
				if(this.pos.y < 240){  //修正過關跑進城堡動作有點不自然的 bug
					this.speed.y = 2;
				}else if(this.pos.y == 240){
					this.speed.y = 0;
				}
				
				this.pos.y += this.speed.y;
			}

		});

		//下面這段利用 canPlayPassMusic 來控制撥放，並且將其反運算，避免音樂持續撥放好幾段，
		//另外也用這個開關控制上面的移動，使玩家不能在控制馬力歐，以及這個開關也用在 flagObject裡面控制旗子下降。
	
		if(!this.isDie && this.passStage){
			this.passStage = false;
			this.passSound();
			this.canPlayPassMusic = true;
		}

		if(flagArray[0].isOnBottom && !this.hide){
			this.walkToCastle = true;
			this.speed.x = 2;
			this.pos.x += this.speed.x;
		}

		// END -----碰到旗桿後馬力歐下降-----
		
		// 2. -----走到城堡中間消失-----

		castleJson.Pos[0].ranges.forEach(([x,y])=>{

			//用一個範圍(+72/+74)來讓馬力歐消失的判斷加大
			if( this.pos.x + this.width / 2 >= x + 72  && this.pos.x + this.width / 2 <= x + 74)
			{ 
				this.hide = true;
				this.pos.x = x + 72 - this.width / 2;
			}
		});


		// End -----走到城堡中間消失-----

		// -----------------End 馬力歐過關---------------------
		

		// ---------------狀態改變-------------------


		let timeoutId2;
	
		if(this.changeToBig && !this.clearTimeout2){
			timeoutId2 = setTimeout(() => {
				this.changeToBig = false;	
				this.clearTimeout2 = null;
				this.isBigMario = true;
			}, 1000);
			this.clearTimeout2 = timeoutId2;
		}	

		let timeoutId3;
	
		if(this.changeToFire && !this.clearTimeout3){
			timeoutId3 = setTimeout(() => {
				this.changeToFire = false;	
				this.isBigMario = false;
				this.clearTimeout3 = null;
				this.isFireMario = true;
			}, 1000);
			this.clearTimeout3 = timeoutId3;
		}	

		let timeoutId4;
	
		if(this.backToSmall && !this.clearTimeout4){
			timeoutId4 = setTimeout(() => {
				this.backToSmall = false;	
				this.isBigMario = false;
				this.clearTimeout4 = null;
			}, 1000);
			this.clearTimeout4 = timeoutId4;
		}	
		

		let timeoutId5;
	
		if(this.backToBig && !this.clearTimeout5){
			timeoutId5 = setTimeout(() => {
				this.backToBig = false;	
				this.isFireMario = false;
				this.clearTimeout5 = null;
				this.isBigMario = true;
			}, 1000);
			this.clearTimeout5 = timeoutId5;
		}	
		
		
		// ---------------end of狀態改變--------------


		
		//-------------發射火球-----------------
	

		if(this.isFireMario && keys.space && !keys.bottom){
			this.shoot();
		}else if(!keys.space){
			if(this.shot){
				this.shot = false;
			}
		}
		
			

		//-------------End of 發射火球-----------------
	
		// 沒有按住左右鍵的時候，將方向設回預設值

		if(!keys.left && !keys.right){
			this.direction = 0;
			// this.isRunning = false;
		}
	}
	
	passSound(){
		let passSound = new Audio("/music/mario-stage-clear.wav");
		passSound.play();		
	}

	jumpSound(){
		let jumpSound = new Audio("/music/maro-jump-sound.wav");
		jumpSound.play();
	}

	BjumpSound(){
		let BjumpSound = new Audio("/music/bmario-jump-sound.wav");
		BjumpSound.play();
	}

	PowerUpSound(){
		let PowerUpSound = new Audio("/music/maro-powerup-sound.wav");
		PowerUpSound.play();
	}

	PowerDownSound(){
		let PowerDownSound = new Audio("/music/maro-powerdown-sound.wav");
		PowerDownSound.play();
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

	shoot(){
		if(!this.shot){
			let fire = new Fireball();
			
			this.fireArray.push(fire);
			this.shot = true; 
		}
	}

	running(){
		if(this.direction == 1){
			this.frameIndex = ++this.frameIndex % 10;
			return this.framesRunArray[this.frameIndex];
		}else if(this.direction == -1){
			this.frameIndex = ++this.frameIndex % 10;
			return this.framesRunArray[this.frameIndex];
		}else if(this.direction == 0 && this.walkToCastle){
			this.frameIndex = ++this.frameIndex % 10;
			return this.framesRunArray[this.frameIndex];
		}
		return"mario";
	}

	ChangeBig(){
		this.frameIndex = ++this.frameIndex % 27;
		return this.ChangeBigFramesRunArray[this.frameIndex];
	}

	BackToSmall(){
		this.frameIndex = ++this.frameIndex % 24;
		return this.BacktoSmallFramesRunArray[this.frameIndex];
	}



	BigRunning(){
		if(this.direction == 1){
			this.frameIndex = ++this.frameIndex % 10;
			return this.BigFramesRunArray[this.frameIndex];
		}else if(this.direction == -1){
			this.frameIndex = ++this.frameIndex % 10;
			return this.BigFramesRunArray[this.frameIndex];
		}else if(this.direction == 0 && this.walkToCastle){
			this.frameIndex = ++this.frameIndex % 10;
			return this.BigFramesRunArray[this.frameIndex];
		}
		return"Bmario";
	}

	ChangeFire(){
		this.frameIndex = ++this.frameIndex % 18;
		return this.ChangeFireFramesRunArray[this.frameIndex];
	}

	
	BackToBig(){
		this.frameIndex = ++this.frameIndex % 24;
		return this.BacktoBigFramesRunArray[this.frameIndex];
	}



	FireRunning(){
		if(this.direction == 1){
			this.frameIndex = ++this.frameIndex % 10;
			return this.FireFramesRunArray[this.frameIndex];
		}else if(this.direction == -1){
			this.frameIndex = ++this.frameIndex % 10;
			return this.FireFramesRunArray[this.frameIndex];
		}else if(this.direction == 0 && this.walkToCastle){
			this.frameIndex = ++this.frameIndex % 10;
			return this.FireFramesRunArray[this.frameIndex];
		}
		return"Fmario";
	}

	//每張圖片的切割大小存在 mario.json,其中 runRight-2 跟 runRight-3 並沒有從16的倍數切(因為圖片會有點卡住所以選了一些特殊的切割點) 

	draw(context,marioSprite,screen,fireballSprite,goombaArray,turtleArray){
		// console.log(marioSprite.image);
		//呼叫 SpriteSet 的 draw 方法
		// console.log( windowWidth - mario.pos.x - 8);
		// // console.log(1920 - mario.pos.x - 8);
		// if(1920 - mario.pos.x - 8 ==  windowWidth - mario.pos.x - 8){
		// 	console.log("不要捲");
		// }

		// ----------將陣列中的火焰球清除---------
		for(let j = 0;j < this.fireArray.length;j += 1){
			this.fireArray[j].draw(context,fireballSprite,this);
			this.fireArray[j].update(this,screen,goombaArray,turtleArray);
			let fire = this.fireArray[j];
			if(fire.show == false){
				this.fireArray.splice(j,1);
				j--;
			}
		}	

		// ----------end of 將陣列中的火焰球清除---------
		
		//--------------馬力歐狀態切換-------------------


		if(this.changeToBig)
		{
			if(this.pos.x < 450 ){
				marioSprite.drawMarioSprite(this.ChangeBig() ,context,this.pos.x,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 450 && this.pos.x < 5000){
				marioSprite.drawMarioSprite(this.ChangeBig() ,context,450,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 5000){
				marioSprite.drawMarioSprite( this.ChangeBig() ,context,this.pos.x - 4550,this.pos.y,this.faceDirection < 0);
			}		
		}

				
		if(this.backToSmall)
		{
			if(this.pos.x < 450 ){
				marioSprite.drawMarioSprite(this.BackToSmall() ,context,this.pos.x,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 450 && this.pos.x < 5000){
				marioSprite.drawMarioSprite(this.BackToSmall() ,context,450,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 5000){
				marioSprite.drawMarioSprite( this.BackToSmall() ,context,this.pos.x - 4550,this.pos.y,this.faceDirection < 0);
			}		
		}
		

		if(this.changeToFire)
		{
			if(this.pos.x < 450 ){
				marioSprite.drawMarioSprite(this.ChangeFire() ,context,this.pos.x,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 450 && this.pos.x < 5000){

				marioSprite.drawMarioSprite(this.ChangeFire() ,context,450,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 5000){
				marioSprite.drawMarioSprite( this.ChangeFire() ,context,this.pos.x - 4550,this.pos.y,this.faceDirection < 0);
			}		
		}

						
		if(this.backToBig)
		{
			if(this.pos.x < 450 ){
				marioSprite.drawMarioSprite(this.BackToBig() ,context,this.pos.x,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 450 && this.pos.x < 5000){
				marioSprite.drawMarioSprite(this.BackToBig() ,context,450,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 5000){
				marioSprite.drawMarioSprite( this.BackToBig() ,context,this.pos.x - 4550,this.pos.y,this.faceDirection < 0);
			}		
		}
		
		

		//--------------end of 馬力歐狀態切換-------------------


		// -------------------小馬力歐---------------------
		// -----bug如果畫圖的範圍擴大-----過關物件要跟著更改----

		if(!this.hide 
		&& !this.isDie
		&& !this.willDie
		&& !this.canPlayPassMusic 
		&& !this.walkToCastle
		&& !this.isBigMario
		&& !this.isFireMario
		&& !this.changeToBig
		&& !this.backToSmall
		&& !this.backToBig
		&& !this.changeToFire
		)
		{
			if(this.pos.x < 450 ){
				marioSprite.drawMarioSprite(!this.isJump ? this.running() : "jump",context,this.pos.x,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 450 && this.pos.x < 5000){

				marioSprite.drawMarioSprite(!this.isJump ? this.running() : "jump",context,450,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 5000){
				marioSprite.drawMarioSprite(!this.isJump ? this.running() : "jump",context,this.pos.x - 4550,this.pos.y,this.faceDirection < 0);
			}		
		}
		
		if(!this.hide 
			&& (this.willDie || this.isDie)
			&& !this.canPlayPassMusic 
			&& !this.walkToCastle
			&& !this.isBigMario
			&& !this.isFireMario
			&& !this.changeToBig
			&& !this.backToSmall
			&& !this.backToBig
			&& !this.changeToFire){
			if(this.pos.x < 450 ){
				marioSprite.drawMarioSprite("die",context,this.pos.x,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 450 && this.pos.x < 5000){
				marioSprite.drawMarioSprite( "die",context,450,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 5000){
				marioSprite.drawMarioSprite("die",context,this.pos.x - 4550,this.pos.y,this.faceDirection < 0);
			}
		}

		if(!this.hide 
			&& this.canPlayPassMusic 
			&& !this.walkToCastle	
			&& !this.isBigMario
			&& !this.isFireMario
			&& !this.changeToBig
			&& !this.backToSmall
			&& !this.backToBig
			&& !this.changeToFire){
			marioSprite.drawMarioSprite("passed",context,this.pos.x - 4550,this.pos.y,this.faceDirection < 0);	
		}

		if(!this.hide 
			&& this.walkToCastle	
			&& !this.isBigMario
			&& !this.isFireMario
			&& !this.changeToBig
			&& !this.backToSmall
			&& !this.backToBig
			&& !this.changeToFire){
			marioSprite.drawMarioSprite(this.running(),context,this.pos.x - 4550,this.pos.y,this.faceDirection < 0);
		}


		// ---------------大馬力歐--------------------

		if(!this.hide 
			&& !this.isDie
			&& !this.canPlayPassMusic 
			&& !this.walkToCastle
			&& this.isBigMario
			&& !this.isFireMario
			&& !this.isSquat
			&& !this.changeToBig
			&& !this.backToSmall
			&& !this.backToBig
			&& !this.changeToFire
		)
		{
			if(this.pos.x < 450 ){
				marioSprite.drawMarioSprite(!this.isJump ? this.BigRunning() : "Bjump",context,this.pos.x,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 450 && this.pos.x < 5000){
				marioSprite.drawMarioSprite(!this.isJump ? this.BigRunning() : "Bjump",context,450,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 5000){
				marioSprite.drawMarioSprite(!this.isJump ? this.BigRunning() : "Bjump",context,this.pos.x - 4550,this.pos.y,this.faceDirection < 0);
			}		
		}

		//-------------大馬力歐蹲下--------------
		if(!this.hide 
			&& !this.isDie
			&& !this.canPlayPassMusic 
			&& !this.walkToCastle
			&& this.isBigMario
			&& !this.isFireMario
			&& this.isSquat
			&& !this.changeToBig
			&& !this.backToSmall
			&& !this.backToBig
			&& !this.changeToFire
		)
		{
			if(this.pos.x < 450 ){
				marioSprite.drawMarioSprite( "Bsquat",context,this.pos.x,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 450 && this.pos.x < 5000){
				marioSprite.drawMarioSprite( "Bsquat",context,450,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 5000){
				marioSprite.drawMarioSprite("Bsquat",context,this.pos.x - 4550,this.pos.y,this.faceDirection < 0);
			}		
		}
		
		//---------大馬力歐死亡圖片的 bug-----------


		if(!this.hide 
			&& this.isDie
			&& !this.canPlayPassMusic 
			&& !this.walkToCastle
			&& this.isBigMario
			&& !this.isFireMario
			&& !this.changeToBig
			&& !this.backToSmall
			&& !this.backToBig
			&& !this.changeToFire){
			if(this.pos.x < 450 ){
				marioSprite.drawMarioSprite("Bsquat",context,this.pos.x,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 450 && this.pos.x < 5000){
				marioSprite.drawMarioSprite( "Bsquat",context,450,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 5000){
				marioSprite.drawMarioSprite("Bsquat",context,this.pos.x - 4550,this.pos.y,this.faceDirection < 0);
			}
		}

		if(!this.hide 
			&& this.canPlayPassMusic 
			&& !this.walkToCastle	
			&& this.isBigMario
			&& !this.isFireMario
			&& !this.changeToBig
			&& !this.backToSmall
			&& !this.backToBig
			&& !this.changeToFire){
			marioSprite.drawMarioSprite("Bpassed",context,this.pos.x - 4550,this.pos.y,this.faceDirection < 0);	
		}

		if(!this.hide 
			&& this.walkToCastle	
			&& this.isBigMario
			&& !this.isFireMario
			&& !this.changeToBig
			&& !this.backToSmall
			&& !this.backToBig
			&& !this.changeToFire){
			marioSprite.drawMarioSprite(this.BigRunning(),context,this.pos.x - 4550,this.pos.y,this.faceDirection < 0);
		}


		// -----------------end of 大馬力歐----------------------


		//----------------------火馬力歐------------------------
		if(!this.hide 
			&& !this.isDie
			&& !this.canPlayPassMusic 
			&& !this.walkToCastle
			&& !this.isBigMario
			&& this.isFireMario
			&& !this.isSquat
			&& !this.shot
			&& !this.changeToBig
			&& !this.backToSmall
			&& !this.backToBig
			&& !this.changeToFire
		)
		{
			if(this.pos.x < 450 ){
				marioSprite.drawMarioSprite(!this.isJump ? this.FireRunning() : "Fjump",context,this.pos.x,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 450 && this.pos.x < 5000){
				marioSprite.drawMarioSprite(!this.isJump ? this.FireRunning() : "Fjump",context,450,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 5000){
				marioSprite.drawMarioSprite(!this.isJump ? this.FireRunning() : "Fjump",context,this.pos.x - 4550,this.pos.y,this.faceDirection < 0);
			}		
		}

		//-------------火馬力歐蹲下--------------
		if(!this.hide 
			&& !this.isDie
			&& !this.canPlayPassMusic 
			&& !this.walkToCastle
			&& !this.isBigMario
			&& this.isFireMario
			&& this.isSquat
			&& !this.changeToBig
			&& !this.backToSmall
			&& !this.backToBig
			&& !this.changeToFire
		)
		{
			if(this.pos.x < 450 ){
				marioSprite.drawMarioSprite( "Fsquat",context,this.pos.x,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 450 && this.pos.x < 5000){
				marioSprite.drawMarioSprite( "Fsquat",context,450,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 5000){
				marioSprite.drawMarioSprite("Fsquat",context,this.pos.x - 4550,this.pos.y,this.faceDirection < 0);
			}		
		}
		
		//--------火馬力歐死亡圖片的 bug-----------


		if(!this.hide 
			&& this.isDie
			&& !this.canPlayPassMusic 
			&& !this.walkToCastle
			&& !this.isBigMario
			&& this.isFireMario
			&& !this.changeToBig
			&& !this.backToSmall
			&& !this.backToBig
			&& !this.changeToFire){
			if(this.pos.x < 450 ){
				marioSprite.drawMarioSprite("Fsquat",context,this.pos.x,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 450 && this.pos.x < 5000){
				marioSprite.drawMarioSprite( "Fsquat",context,450,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 5000){
				marioSprite.drawMarioSprite("Fsquat",context,this.pos.x - 4550,this.pos.y,this.faceDirection < 0);
			}
		}

		if(!this.hide 
			&& this.canPlayPassMusic 
			&& !this.walkToCastle	
			&& !this.isBigMario
			&& this.isFireMario
			&& !this.changeToBig
			&& !this.backToSmall
			&& !this.backToBig
			&& !this.changeToFire){
			marioSprite.drawMarioSprite("Fpassed",context,this.pos.x - 4550,this.pos.y,this.faceDirection < 0);	
		}

		if(!this.hide 
			&& this.walkToCastle	
			&& !this.isBigMario
			&& this.isFireMario
			&& !this.changeToBig
			&& !this.backToSmall
			&& !this.backToBig
			&& !this.changeToFire){
			marioSprite.drawMarioSprite(this.FireRunning(),context,this.pos.x - 4550,this.pos.y,this.faceDirection < 0);
		}

		if(!this.hide 
			&& !this.isDie
			&& !this.canPlayPassMusic 
			&& !this.walkToCastle
			&& !this.isBigMario
			&& this.isFireMario
			&& this.shot
			&& !this.changeToBig
			&& !this.backToSmall
			&& !this.backToBig
			&& !this.changeToFire
		)
		{
			if(this.pos.x < 450 ){
				marioSprite.drawMarioSprite("Fshot",context,this.pos.x,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 450 && this.pos.x < 5000){
				marioSprite.drawMarioSprite("Fshot",context,450,this.pos.y,this.faceDirection < 0);
			}else if(this.pos.x >= 5000){
				marioSprite.drawMarioSprite("Fshot",context,this.pos.x - 4550,this.pos.y,this.faceDirection < 0);
			}		
		}
		
		//----------------------end 火馬力歐------------------------

		
	}
}

export {Mario};