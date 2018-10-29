import {PositionAndSpeed} from "../positionAndSpeed.js";
import {keys} from "../keyEvent.js";
import {Fireball} from "../ObjectJs/fireballObject.js";

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

		// --------------穿越下水道-------------------

		this.goThroughTube = false;
		this.getDestinationTube = false;
		this.gobacktoground = false;
		this.playDownTubeMusic = false;
		this.underGround = false;

		this.canmoveFromUnder = true;

		this.fallingToUnder = false;

		this.goWrongTube = false;

		// --------------end 穿越下水道-------------------

		// ----------控制撞到磚塊狀態----------

		this.isOnBrick = false;
		this.isBottomBrick = false;
		this.touchBrickBorderByJumping = false;

		this.stuckByBrick;

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
		this.stopBesideTube = false;
		this.stopX = false;
		this.stopY = false;
		this.willDie = false;
		this.isDie = false;
		this.isOnGround = false;
		this.passStage = false;
		this.falling = false;
		this.canPlayPassMusic = false;
		this.stopBackgroundMusic = false;
		this.onPoleBottom = false;
		this.walkToCastle = false;
		this.hide = false;
		this.clearTimeout;
		this.clearTimeout2;
		this.clearTimeout3;
		this.clearTimeout4;
		this.clearTimeout5;
		this.clearTimeout7;
		this.clearTimeout8;
		this.controlSpeedFactor; 
		// 用來控制馬力歐根據不同螢幕解析度，跑到右邊終點都能再往回跑
		this.frameIndex = 0;
		this.framesRunArray = [
			"runRight-1","runRight-1","runRight-1",
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
			"mario","mario","mario","mario","mario","mario","mario","mario","mario",
			"BigHead","BigHead","BigHead","BigHead","BigHead","BigHead","BigHead","BigHead","BigHead",
			"Bmario","Bmario","Bmario","Bmario","Bmario","Bmario","Bmario","Bmario","Bmario"
		];

		this.BigFramesRunArray = ["BrunRight-1","BrunRight-1","BrunRight-1",
			"BrunRight-2","BrunRight-2","BrunRight-2",
			"BrunRight-3","BrunRight-3","BrunRight-3",
			"Bmario"
		];

		this.ChangeFireFramesRunArray = [
			"Bmario","Bmario","Bmario",	"Bmario","Bmario","Bmario","Bmario","Bmario","Bmario",
			"Fmario",	"Fmario",	"Fmario","Fmario",	"Fmario",	"Fmario","Fmario",	"Fmario",	"Fmario"
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

	update(screen,tubeJson,highTubeJson,highestTubeJson,
		poleJson,castleJson,flagArray,
		brickJson,oddBrickJson,questionBrickJson,
		flowerBrickJson,mushroomBrickJson,undergroundTubeJson,undergroundBrickJson){
		this.controlSpeedFactor  = this.speed.x * (this.speed.x / 2 - 1) / (this.speed.x / 2);
		// // 用來控制馬力歐根據不同螢幕解析度，跑到右邊終點都能再往回跑
		// ------------ 解決各個磚塊橫向穿越的問題---------------
		questionBrickJson.Pos[0].ranges.forEach(([x,y])=>{
			if(!this.underGround 
				&& this.isJump 
				&& !this.isBigMario 
				&& !this.isFireMario
				&& this.pos.x == x + questionBrickJson.width 
				&& this.pos.y + this.height  >= y  
				&& this.pos.y + this.height / 2 <= y + questionBrickJson.height)
			{
				this.pos.x = x + questionBrickJson.width ;
				this.stopX = true;
				this.touchBrickBorderByJumping = true;
			}

			if(!this.underGround 
				&& this.isJump 
				&& (this.isBigMario || this.isFireMario)
				&& this.pos.x == x + questionBrickJson.width 
				&& this.pos.y + this.height  >= y
				&& this.pos.y  <= y + questionBrickJson.height)
			{
				this.pos.x = x + questionBrickJson.width ;
				this.stopX = true;
				this.touchBrickBorderByJumping = true;
			} 

			if(!this.underGround 
				&& this.isJump
				&& !this.isBigMario 
				&& !this.isFireMario
				&& this.pos.x + this.width == x 
				&& this.pos.y + this.height  >= y
				&& this.pos.y + this.height / 2 <= y + questionBrickJson.height)
			{
				this.pos.x = x -this.width ;
				this.stopX = true;
				this.touchBrickBorderByJumping = true;
			}

			if(!this.underGround 
				&& this.isJump 
				&& (this.isBigMario || this.isFireMario)
				&& this.pos.x + this.width == x 
				&& this.pos.y + this.height  >= y
				&& this.pos.y  <= y + questionBrickJson.height)
			{
				this.pos.x = x -this.width ;
				this.stopX = true;
				this.touchBrickBorderByJumping = true;
			} 

			if(this.touchBrickBorderByJumping && this.isOnGround){
				this.stopX = false;
				this.touchBrickBorderByJumping = false;
			} // BUG 若鄰近水管太近的時候，落地後剛好在水管旁邊，有機會穿越過去

			// if( this.pos.x + this.width == x
			// 	&& this.pos.y + this.height > y 
			// 	&& this.pos.y + this.height / 2  < y + questionBrickJson.height)
			// { 
			// 	this.pos.x = x + questionBrickJson.width ;
			// 	// this.stopX = true;  //控制跑回來會上去的問題
			// }	

			// if( this.pos.x  == x + questionBrickJson.width
			// 	&& this.pos.y + this.height > y 
			// 	&& this.pos.y + this.height / 2  < y + questionBrickJson.height)
			// { 
			// 	this.pos.x = x + questionBrickJson.width ;
			// 	// this.stopX = true;  //控制跑回來會上去的問題
			// }	

			// if(!this.isOnBrick && this.stopX && this.pos.x + this.width == x && 
			// 	(keys.left || keys.right)){
			// 	this.stopX = false;
			// }

			// if(!this.isOnBrick && this.stopX && 	this.pos.x == x + questionBrickJson.width && 
			// 	(keys.left || keys.right)){
			// 	this.stopX = false;   //這行會造成水管可以穿越 BUG 
			// }
		});

		brickJson.Pos[0].ranges.forEach(([x,y])=>{

			if(!this.underGround 
				&& this.isJump
				&& !this.isBigMario 
				&& !this.isFireMario
				&& this.pos.x == x + brickJson.width 
				&& this.pos.y + this.height  >= y
				&& this.pos.y + this.height / 2 <= y + brickJson.height)
			{
				this.pos.x = x + brickJson.width ;
				this.stopX = true;
				this.touchBrickBorderByJumping = true;
			}

			if(!this.underGround 
				&& this.isJump 
				&& (this.isBigMario || this.isFireMario)
				&& this.pos.x == x + brickJson.width 
				&& this.pos.y + this.height  >= y
				&& this.pos.y  <= y + brickJson.height)
			{
				this.pos.x = x + brickJson.width ;
				this.stopX = true;
				this.touchBrickBorderByJumping = true;
			} 

			if(!this.underGround 
				&& this.isJump
				&& !this.isBigMario 
				&& !this.isFireMario
				&& this.pos.x + this.width == x 
				&& this.pos.y + this.height  >= y
				&& this.pos.y + this.height / 2 <= y + brickJson.height)
			{
				this.pos.x = x -this.width ;
				this.stopX = true;
				this.touchBrickBorderByJumping = true;
			}

			
			if(!this.underGround 
				&& this.isJump 
				&& (this.isBigMario || this.isFireMario)
				&& this.pos.x + this.width == x 
				&& this.pos.y + this.height  >= y
				&& this.pos.y  <= y + brickJson.height)
			{
				this.pos.x = x -this.width ;
				this.stopX = true;
				this.touchBrickBorderByJumping = true;
			} 

			if(this.touchBrickBorderByJumping && this.isOnGround){
				// this.stopX = false;
				this.touchBrickBorderByJumping = false;
			}



			// if(!this.isOnBrick && this.stopX && this.pos.x + this.width == x && 
			// 	(keys.left || keys.right)){
			// 	// this.speed.x = 4;
			// 	this.stopX = false;
			// }

			// if(!this.isOnBrick && this.stopX && 	this.pos.x == x + brickJson.width 
			// 	&& !this.isOnGround 
			// 	&& (keys.left || keys.right)){
			// 	// this.speed.x = 4;
			// 	this.stopX = false; //這行會造成水管可以穿越 BUG 
			// }

			//-----------------end  測試中------------------	
		});

		flowerBrickJson.Pos[0].ranges.forEach(([x,y])=>{
			if(!this.underGround && this.isJump
				&& this.pos.x == x + brickJson.width 
					&& this.pos.y + this.height  >= y
					&& this.pos.y + this.height / 2 <= y + flowerBrickJson.height)
			{
				this.pos.x = x + flowerBrickJson.width ;
				this.stopX = true;
				this.touchBrickBorderByJumping = true;
			}

			if(!this.underGround && this.isJump
				&& this.pos.x + this.width == x 
					&& this.pos.y + this.height  >= y
					&& this.pos.y + this.height / 2 <= y + flowerBrickJson.height)
			{
				this.pos.x = x -this.width ;
				this.stopX = true;
				this.touchBrickBorderByJumping = true;
			}

			if(this.touchBrickBorderByJumping && this.isOnGround){
				this.stopX = false;
				this.touchBrickBorderByJumping = false;
			}
			
		});	

		mushroomBrickJson.Pos[0].ranges.forEach(([x,y])=>{
			if(!this.underGround && this.isJump
				&& this.pos.x == x + brickJson.width 
					&& this.pos.y + this.height  >= y
					&& this.pos.y + this.height / 2 <= y + mushroomBrickJson.height)
			{
				this.pos.x = x + mushroomBrickJson.width ;
				this.stopX = true;
				this.touchBrickBorderByJumping = true;
			}

			if(!this.underGround && this.isJump
				&& this.pos.x + this.width == x 
					&& this.pos.y + this.height  >= y
					&& this.pos.y + this.height / 2 <= y + mushroomBrickJson.height)
			{
				this.pos.x = x -this.width ;
				this.stopX = true;
				this.touchBrickBorderByJumping = true;
			}

			if(this.touchBrickBorderByJumping && this.isOnGround){
				this.stopX = false;
				this.touchBrickBorderByJumping = false;
			}

		});

		//------------ end of 解決各個磚塊橫向穿越的問題---------------

		// ---------無敵以及死亡的處理---------
	
		// ------------1.無敵----------------

		let timeoutId;
		if(this.isInvincible && !this.clearTimeout){
			timeoutId = setTimeout(() => {
				this.isInvincible = false;	
				this.clearTimeout = null;
			}, 1500);
			this.clearTimeout = timeoutId;
		}	

		// ------------2.死亡----------------

		let timeoutId6;
	
		if(this.willDie && !this.clearTimeout6){
			timeoutId = setTimeout(() => {
				this.isDie = true;	
				this.clearTimeout = null;
			}, 1500);
			this.clearTimeout6 = timeoutId6;
		}	

		// if(this.isDie ){
		// 	this.speed.y = -4;
		// }

		// End 用來控制大馬力歐變回小馬力歐的無敵狀態

		// ------End 控制馬力歐變大之後的高度------

		// -------控制馬力歐移動-----

		// 過關後用passStage轉換成true，讓玩家不再能透過按鍵控制馬力歐
		if(!this.backToBig
			&& !this.backToSmall 
			&& !this.changeToBig
			&& !this.changeToFire
			&& !this.willDie
			&& !this.falling
			&& !this.goThroughTube
			&& !this.gobacktoground
			&& this.canmoveFromUnder
			&& !this.fallingToUnder
			&& !this.goWrongTube
			&& !keys.space 
			&& !this.canPlayPassMusic 
			&& !this.isDie 
			&& this.pos.x + this.speed.x <= 6000
			&& this.pos.x > 0
			&& !this.isSquat
		)
		{
			if(keys.right && !keys.left && !this.stopX){
				if(this.stopX){
					this.stopX = false;
				}	
				this.moveRight();					
				this.faceDirection = this.direction;
			}
			if(keys.left && !keys.right && !this.stopX ){
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
		else if(!this.canPlayPassMusic && this.pos.x + this.controlSpeedFactor  == 6000){
			if(keys.left){
				this.moveLeft();
				this.faceDirection = this.direction;
			}
		}
		else if(!this.canPlayPassMusic && this.pos.x  == 6000){
			if(keys.left){
				this.moveLeft();
				this.faceDirection = this.direction;
			}
		}

		// ------End of 控制馬力歐移動-----

		 // --------跳躍的設定 ---------------
		 				
		if(!this.canPlayPassMusic ){
			this.speed.y += 0.5;  //gravity
			if(!this.getDestinationTube){
				this.pos.y += this.speed.y; 
			}else if(this.getDestinationTube && !this.underGround){
				this.pos.y -= this.speed.y; 
			}
		}			

		// --------end 跳躍的設定 ---------------

		// -------控制馬力歐落地時參數回復原狀---------

		screen.backgrounds[1].ranges.forEach(([x1,x2,y1,y2]) =>{
			if(this.pos.x < x2 * screen.width + screen.width
				&& this.pos.x + this.width > x1 * screen.width){
				this.falling = false;
			}else if(this.pos.x > x2 * 16 + screen.width
				&& this.pos.y > y1 * screen.height - 32){
				this.falling = true;
			}
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
				&& !this.goThroughTube
				&& !this.gobacktoground
				&& this.canmoveFromUnder
				&& !this.fallingToUnder
				&& !this.goWrongTube
				&& !this.isSquat
				&& !this.shot
				&& this.pos.x + this.width > x1 * 16
				&& this.pos.x < x2 * 16 + 16){
				this.isJump = true;
				this.speed.y -= 10;  //起始跳躍速度，這個速度加上馬力歐的身高，剛好可以跳到最高的水管上面
				this.speed.x = 4;	
				this.isOnGround = false;
				this.onTube = false;
				if( !this.isBigMario && !this.isFireMario){
					this.jumpSound();
				}else{
					this.BjumpSound();
				}
			}		

			// -------------end of 跳躍的設定---------------

			//移到這裡(上方)，在有地面的情況下才可跳躍。
			if(!this.isDie 
				&& !this.underGround
				&& this.speed.y > 0 
				&& this.pos.x + this.width > x1 * 16
				&& this.pos.x < x2 * 16 + 16
				&& this.pos.y >= y1 * screen.height - this.height)
			{
				this.isJump = false;
				this.onTube = false;
				this.isOnBrick = false;
				this.isOnGround = true;
				this.pos.y = y1 * screen.height - this.height; //落地
				this.isBottomBrick = false;
				this.isOnBrick = false;
				this.speed.y = 0;
			}else if(!this.getDestinationTube && !this.underGround && !this.isDie && this.pos.y >= y1 * screen.height + 256){
				//---------------------------懸崖---------
				// ---------掉下懸崖一段才死掉---------------
				this.speed.x = 0;
				this.isDie = true;
				this.speed.y = -20;
				let dieSound = new Audio("/music/mario-die-sound.wav");
				dieSound.play();			
			}
		});

		// -------End   控制馬力歐落地時參數回復原狀---------
		
		// ---------------控制水管障礙---------------
	
		if(!this.isDie && this.isRunning && !this.underGround){
			
			tubeJson.Pos[0].ranges.forEach(([x,y])=>{

				let backtoStartTubeX =  tubeJson.Pos[0].ranges[2][0];
				
				// -----------下錯水管---------------
				if(this.onTube
					&& this.pos.x  >= backtoStartTubeX + 4
					&& this.pos.x + this.width <= backtoStartTubeX + tubeJson.width - 4){
					if(keys.bottom && !this.playDownTubeMusic ){
						this.PowerDownSound();
						this.goThroughTube = true;
						this.goWrongTube = true;
						this.playDownTubeMusic  = true;
					}	
				}	
				
				if(this.goWrongTube &&	this.getDestinationTube && this.pos.y <= y - 32){
					this.getDestinationTube = false;
					this.playDownTubeMusic = false;
					this.goWrongTube = false;
				} //從水管出來之後將所有的 flag 重設為預設值

				
				if(this.goThroughTube && 	this.goWrongTube && this.isOnGround){
					this.PowerDownSound();
					this.pos.x = 552;
					this.goThroughTube = false;
					this.getDestinationTube = true;
				}
					
				// -----------end 下錯水管---------------

				//----------小馬力歐過水管-----------
				if( this.pos.x + this.width == x
					&& this.pos.y + this.height > y
					&& this.pos.y + this.height / 2 < y + tubeJson.height )
				{ //從左側碰到水管
					this.pos.x = x - this.width ;
					this.stopX = true;  //控制跑回來會回到水管上去的問題
					this.stopBesideTube = true;
					// this.speed.x = 0;
					if(keys.left && !keys.right){
						// this.speed.x = 4;
						this.stopX = false;
					}
				}
				else if(this.pos.x == x + tubeJson.width
					&& this.pos.y + this.height > y
					&& this.pos.y + this.height / 2 < y + tubeJson.height )
				{	// 從右側碰到水管
					this.pos.x = x + tubeJson.width ;
					this.stopX = true;
					this.stopBesideTube = true;
					// this.speed.x = 0;
					if(keys.right && !keys.left){
						this.stopX = false;
					}
				}
				else if(this.pos.y + this.height < y  && keys.left 
					|| this.pos.y + this.height < y  && keys.right){
					this.stopX = false;
				} //修正會斜向穿越水管的問題，讓馬力歐身高高過它才可以移動。
				else {
					this.stopBesideTube = false;  // 為了讓水管跟 oddbrick 卡住時不能移動
				}
				// ------end of 小馬力歐過水管---------

				// ------------控制站在水管上--------------
				if(this.speed.y > 0 
					&& this.pos.x + this.width > x
					&& this.pos.x < x + tubeJson.width ){
					if(this.pos.y >= y - this.height){
						this.isJump = false;
						this.isOnGround = false; //為了控制從水管上下來採怪物不會死掉
						this.onTube = true;
						if(!this.goWrongTube && !this.getDestinationTube){
							this.pos.y = y - this.height;	
						}
						this.speed.y = 0;
					}	
					this.speed.y += 0.5;
				}					
				// ------------end of 控制站在水管上-----------------
			});

			highTubeJson.Pos[0].ranges.forEach(([x,y])=>{
				
				//----------小馬力歐過水管-----------
				if( this.pos.x + this.width == x
					&& this.pos.y + this.height > y
					&& this.pos.y + this.height / 2 < y + highTubeJson.height )
				{ //從左側碰到水管
					this.pos.x = x - this.width ;
					this.stopX = true;
					if(keys.left && !keys.right){
						this.stopX = false;
					}
				}
				else if(this.pos.x == x + highTubeJson.width
					&& this.pos.y + this.height > y
					&& this.pos.y + this.height / 2 < y + highTubeJson.height )
				{	// 從右側碰到水管
					this.pos.x = x + highTubeJson.width ;
					this.stopX = true;				
					if(keys.right && !keys.left){
						this.stopX = false;
					}
				}
				else if(this.pos.y + this.height  < y && keys.left 
					|| this.pos.y + this.height < y  && keys.right){;
					this.stopX = false;
				} //修正會斜向穿越水管的問題，讓馬力歐身高高過它才可以移動。

				// ------end of 小馬力歐過水管---------

				// ------------控制站在水管上--------------
				if(this.speed.y > 0 
					&& this.pos.x + this.width > x
					&& this.pos.x < x + highTubeJson.width ){
					if(this.pos.y >= y - this.height){
						this.isJump = false;
						this.onTube = true;
						this.isOnGround = false; //為了控制從水管上下來採怪物不會死掉
						this.pos.y = y - this.height;
						this.speed.y = 0;
					}	
					this.speed.y += 0.5;
				}					
				// ------------end of 控制站在水管上-----------------
			});

			highestTubeJson.Pos[0].ranges.forEach(([x,y])=>{
				// ----------------下水管-----------------
				let canDownTubeX =  highestTubeJson.Pos[0].ranges[0][0];
				if(this.onTube
					&& this.pos.x  >= canDownTubeX + 4
					&& this.pos.x + this.width <= canDownTubeX + highestTubeJson.width - 4){
					if(keys.bottom && !this.playDownTubeMusic ){
						this.PowerDownSound();
						this.goThroughTube = true;
						this.fallingToUnder = true;
						this.playDownTubeMusic  = true;
					}	
				}		
		
				if(	this.getDestinationTube && this.pos.y <= y - 32){
					this.getDestinationTube = false;
					this.playDownTubeMusic = false;
					this.canmoveFromUnder = true;
				}		
			
				// --------------end  下水管-----------------

				//----------小馬力歐過水管-----------
				if( this.pos.x + this.width == x
					&& this.pos.y + this.height > y
					&& this.pos.y + this.height / 2 < y + highestTubeJson.height )
				{ //從左側碰到水管
					this.pos.x = x - this.width ;
					this.stopX = true;
					// this.speed.x = 0;
					if(keys.left && !keys.right){
						// this.speed.x = 4;
						this.stopX = false;
					}
				}
				else if(this.pos.x == x + highestTubeJson.width
					&& this.pos.y + this.height > y
					&& this.pos.y + this.height / 2 < y + highestTubeJson.height )
				{	// 從右側碰到水管
					
					this.pos.x = x + highestTubeJson.width ;
					this.stopX = true;
					// this.speed.x = 0;
			
					if(keys.right && !keys.left){
					// this.speed.x = 4;
						this.stopX = false;
					}
				}
				else if(this.pos.y + this.height < y && keys.left 
					|| this.pos.y + this.height < y  && keys.right){ 
					this.stopX = false;
				} //修正會斜向穿越水管的問題，讓馬力歐身高高過它才可以移動。

				// ------end of 小馬力歐過水管---------

				// ------------控制站在水管上--------------
				if(this.speed.y > 0 
					&& this.pos.x + this.width > x
					&& this.pos.x < x + highestTubeJson.width ){
					if(this.pos.y >= y - this.height){
						this.isJump = false;
						this.onTube = true;
						this.isOnGround = false; //為了控制從水管上下來採怪物不會死掉
						if(!this.goThroughTube && !this.getDestinationTube){
							this.pos.y = y - this.height;
						}			
							
						this.speed.y = 0;
					}	
					this.speed.y += 0.5;
				}					
				// ------------end of 控制站在水管上-----------------
			});
		}

		// ------------------End of 控制水管障礙----------
		
		//-------------------下水道---------------------

		//-----------------下水道控制馬力歐位置------------
		screen.underbackgrounds[1].ranges.forEach(([x1,x2,y1,y2]) =>{
			if(!this.isDie 
				&& this.underGround
				&& this.speed.y > 0 
				&& this.pos.x + this.width > x1 * 16
				&& this.pos.x < x2 * 16 + 16
				&& this.pos.y >= y1 * screen.height - this.height)
			{
				this.isJump = false;
				this.onTube = false;
				this.isOnBrick = false;
				this.isOnGround = true;
				this.pos.y = y1 * screen.height - this.height; //落地
				this.fallingToUnder = false;
				this.isBottomBrick = false;
				this.isOnBrick = false;
				this.speed.y = 0;
			}
			
			// -------下去水管-----------------	
			let timeoutId7;
			if(this.goThroughTube && !this.goWrongTube
				&& !this.clearTimeout7){
				timeoutId7 = setTimeout(() => {
					this.PowerDownSound();
					this.pos.x = 1600;
					this.pos.y = 800;
					this.goThroughTube = false;
					this.underGround = true;
					this.getDestinationTube = true;
					this.clearTimeout7 = null;
				}, 1200);
				this.clearTimeout7 = timeoutId7;
			}
	
			if(this.underGround ){
				this.pos.y += this.speed.y; 
			}
		});
	
		if(this.underGround){
			undergroundBrickJson.Pos[0].ranges.forEach(([x,y])=>{

				if( this.pos.x + this.width == x
					&& this.pos.y >= y - undergroundBrickJson.height )
				{ //從左側碰到
					this.pos.x = x - this.width ;
					this.stopX = true;
					if(keys.left && !keys.right){
						this.stopX = false;
					}
				}
				else if(this.pos.x == x + undergroundBrickJson.width
					&& this.pos.y >= y - undergroundBrickJson.height )
				{	
					this.pos.x = x + undergroundBrickJson.width ;
					this.stopX = true;
					if(keys.right && !keys.left){
						this.stopX = false;
					}
				}
				else if(this.pos.x + this.width == x &&
					(this.pos.y < y - undergroundBrickJson.height && keys.left 
					|| this.pos.y < y - undergroundBrickJson.height  && keys.right)){
					this.stopX = false;
				}

				// ------------控制站在地下道磚塊上--------------
				if(this.speed.y > 0 
					&& this.pos.x + this.width > x
					&& this.pos.x < x + undergroundBrickJson.width ){
					if(this.pos.y >= y - this.height){
						this.isJump = false;
						this.pos.y = y - this.height;
						this.speed.y = 0;
					}	
				}					
				// ------------end of 控制站在地下道磚塊-----------------
			});
		}

		if(this.underGround){
			undergroundTubeJson.Pos[0].ranges.forEach(([x,y])=>{
				if( this.pos.x + this.width >= x + 16
					&& this.pos.x + this.width <= x + 64
					&& this.pos.y >= y - undergroundTubeJson.height )
				{ //從左側碰到水管回到地面
					this.speed.x = 2;
					this.pos.x  += this.speed.x;
					this.gobacktoground = true;
					this.canmoveFromUnder = false;
				}
			});
		}

		// -------回到地面上-----------------
		let timeoutId8;
		if(this.gobacktoground
			&& !this.goWrongTube
			&& !this.clearTimeout8){
			timeoutId8 = setTimeout(() => {
				this.PowerDownSound();
				this.pos.x = 4312;
				this.underGround = false;
				this.gobacktoground = false;
				this.speed.x = 4;
				this.getDestinationTube = true;
				this.clearTimeout8 = null;
			}, 1000);
			this.clearTimeout8 = timeoutId8;
		}
	
		//-------------------end of下水道---------------------

		// ---------------控制 oddBrick 障礙---------------

		if(!this.isDie && this.isRunning && !this.underGround){
			oddBrickJson.Pos[0].ranges.forEach(([x,y])=>{	
				//----------小馬力歐-----------

				//-----------bug -this.speed.y 為了在磚塊頂端不能移動
				if( this.pos.x + this.width == x
					&& this.pos.y + this.height - this.speed.y > y  
					&& this.pos.y + this.height / 2  - this.speed.y < y + oddBrickJson.height)
				{ //從左側碰到
					this.pos.x = x - this.width ;
					this.stopX = true;
					if(!this.stopBesideTube
						&& keys.left 
						&& !keys.right){
						this.stopX = false;
					}
				}
				else if(this.pos.x == x + oddBrickJson.width
					&& this.pos.y + this.height - this.speed.y > y
					&& this.pos.y + this.height / 2 - this.speed.y  < y + oddBrickJson.height)
				{	// 從右側碰到
					
					this.pos.x = x + oddBrickJson.width ;
					this.stopX = true;
					if( keys.right && !keys.left){
						this.stopX = false;
					}
				}

				// ------end of 小馬力歐---------

				// ------------控制站上--------------
				if(this.speed.y > 0 
					&& this.pos.x + this.width > x
					&& this.pos.x < x + oddBrickJson.width ){
					if(this.pos.y >= y - this.height){
						this.onOddbrick = true;
						this.isJump = false;
						this.pos.y = y - this.height;
						this.speed.y = 0;
					}	

				}					
				// ------------end of 控制站上-----------------
			});
		}

		// ---------------end of 控制 oddBrick 障礙-------

		// ---------------End of 控制磚塊障礙---------------

		// -----------------馬力歐過關---------------------


		// 1. -----碰到旗桿後馬力歐下降-----

		poleJson.Pos[0].ranges.forEach(([x,y])=>{
			if(this.pos.x + this.width >= x + 8
				&& this.pos.y < y + poleJson.height - this.height
				&& !this.canPlayPassMusic)
			{ 
				this.direction = 0;
				this.pos.x = x - poleJson.width / 2;  //拉旗桿的時候馬力歐的X位置
				this.passStage = true;
				this.stopBackgroundMusic = true;
			}

			if(!this.onPoleBottom && !this.isJump && this.pos.x + this.width >= x && this.pos.y >= 224){
				this.stopX = true;

				if(keys.left && !keys.right){
					this.stopX = false;
				}
			}  //控制馬力歐在旗竿前停止前進

			if(this.canPlayPassMusic && !this.onPoleBottom){
				this.speed.y = 2;
				this.pos.y = this.pos.y + 2;

				if(!this.isBigMario && this.pos.y >= y + 128){
					this.pos.y = y + 128;
					this.onPoleBottom = true;
				}

				if(this.isBigMario 
					&& this.pos.y >= y + 128 || this.isFireMario 
					&& this.pos.y >= y + 128){
					this.pos.y = y + 128;
					this.onPoleBottom = true;
				}
			}
			
			if(this.pos.x >= x + 16){
				if(this.pos.y < 224){  
					this.speed.y = 2;
				}else if(this.pos.y >= 224){
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
	
		if(this.isFireMario && keys.space && !keys.bottom ){
			this.shoot();
		}else if(!keys.space){
			this.shot = false;
		}			

		//-------------End of 發射火球-----------------
	
		// 沒有按住左右鍵的時候，將方向設回預設值

		if(!keys.left && !keys.right){
			this.direction = 0;
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

	BackgroundMusic(){
		let backgroundMusic = new Audio("../music/TitleBGM.mp3");
		backgroundMusic.play();
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
			this.fireBallSound();  //解決火球音效問題
			this.shot = true; 
		}
	}

	fireBallSound(){
		let fireBallSound = new Audio("../../music/mario-fireball-sound.wav");
		fireBallSound.play();
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

	draw(context,marioSprite,screen,fireballSprite,goombaArray,turtleArray,badPlantArray,tubeJson,highTubeJson,highestTubeJson,oddBrickJson){
		//呼叫 SpriteSet 的 draw 方法

		// ----------將陣列中的火焰球清除---------
		for(let j = 0;j < this.fireArray.length;j += 1){
			this.fireArray[j].draw(context,fireballSprite,this);
			this.fireArray[j].update(this,screen,goombaArray,turtleArray,badPlantArray,tubeJson,highTubeJson,highestTubeJson,oddBrickJson);
			let fire = this.fireArray[j];
			if(fire.show == false || fire.pos.y > 1080){
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
		//----------------------end 火馬力歐-----------------------		
	}
}

export {Mario};