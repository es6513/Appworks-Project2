import {LibObj} from "../js/lib.js";
import {sceneObjects} from "./objectLib.js"

// ----------------解析度偵測------------------------

const openBackground = document.querySelector("#openBackground");
const smallresolution = document.querySelector("#smaller1366");
const bigresolution = document.querySelector("#bigger1366");
const marioDeath = document.querySelector("#marioDeath");
const safariNotWorking = document.querySelector("#safariNotWorkingInfo");
const screenWidth = screen.width;

// ---------------開頭畫面---------------
if(screenWidth < 1024 && !is_safari){
	openBackground.style.display = "none";
	notWorkingInfoDetail.style.display = "flex";
	marioDeath.style.display = "block";
}else if(screenWidth >= 1024 && screenWidth <= 1366){
	smallresolution.style.display = "block";
}else if(screenWidth > 1366){
	bigresolution.style.display = "block";
}

// ------------Sfari 偵測---------------------

const is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if (is_safari) {
	marioDeath.style.display = "block";
	safariNotWorking.style.display = "flex";
}

// -------------------音效--------------------
const backgroundMusic = new Audio("../music/TitleBGM.mp3");
const undergroundMuscic = new Audio("../music/underworld.mp3");
const powerupSound = new Audio("/music/maro-powerup-sound.wav");
const powerdownSound = new Audio("/music/maro-powerdown-sound.wav");

Promise.all([ 
	LibObj.loadMarioImage("marioRedder"),
	LibObj.createMarioArray("marioRedder"),
	LibObj.loadJson("background"),
	LibObj.drawBackground("background"),

	LibObj.drawObjects("coin"),
	LibObj.createObjectArray("coin",sceneObjects.Coin),
	LibObj.drawObjects("flycoin"),
	LibObj.createObjectArray("flycoin",sceneObjects.Flycoin),

	//------------Monster Object------------

	LibObj.drawObjects("badTurtle"),
	LibObj.createObjectArray("badTurtle",sceneObjects.Turtle),
	LibObj.drawObjects("goomba"),
	LibObj.createObjectArray("goomba",sceneObjects.Goomba),

	// ------------tube object--------------

	LibObj.drawObjects("tube"),
	LibObj.createObjectArray("tube",sceneObjects.Tube),
	LibObj.loadJson("tube"),
	LibObj.drawObjects("highTube"),
	LibObj.createObjectArray("highTube",sceneObjects.HighTube),
	LibObj.loadJson("highTube"),
	LibObj.drawObjects("highestTube"),
	LibObj.createObjectArray("highestTube",sceneObjects.HighestTube),
	LibObj.loadJson("highestTube"),

	// ------------tube object--------------

	LibObj.drawObjects("undergroundTube"),
	LibObj.createObjectArray("undergroundTube",sceneObjects.UndergroundTube),
	LibObj.loadJson("undergroundTube"),
	LibObj.drawObjects("undergroundBrick"),
	LibObj.createObjectArray("undergroundBrick",sceneObjects.UndergroundBrick),
	LibObj.loadJson("undergroundBrick"),
	LibObj.drawObjects("oddBrick"),
	LibObj.createObjectArray("oddBrick",sceneObjects.OddBrick),
	LibObj.loadJson("oddBrick"),

	// ------------final object--------------
	LibObj.drawObjects("pole"),
	LibObj.createObjectArray("pole",sceneObjects.Pole),
	LibObj.loadJson("pole"),
	LibObj.drawObjects("flag"),
	LibObj.createObjectArray("flag",sceneObjects.Flag),
	LibObj.drawObjects("highCastle"),
	LibObj.createObjectArray("highCastle",sceneObjects.Castle),
	LibObj.loadJson("highCastle"),

	// ------------brick object--------------

	LibObj.drawObjects("brick"),
	LibObj.createObjectArray("brick",sceneObjects.Brick),
	LibObj.loadJson("brick"),
	LibObj.drawObjects("fragment"),
	LibObj.createFragmentArray(),
	LibObj.loadJson("fragment"),
	LibObj.drawObjects("questionBrick"),
	LibObj.createObjectArray("questionBrick",sceneObjects.QuestionBrick),
	LibObj.loadJson("questionBrick"),
	LibObj.drawObjects("mushroomBrick"),
	LibObj.createObjectArray("mushroomBrick",sceneObjects.MushroomBrick),
	LibObj.loadJson("mushroomBrick"),
	LibObj.drawObjects("flowerBrick"),
	LibObj.createObjectArray("flowerBrick",sceneObjects.FlowerBrick), 
	LibObj.loadJson("flowerBrick"),

	// ------------brick object--------------

	LibObj.drawObjects("fireballset"),
	LibObj.createObjectArray("fireballset",sceneObjects.Fireball),
	LibObj.loadJson("fireballset"),

	// ------------powerup object--------------

	LibObj.drawObjects("mushroom"),
	LibObj.createObjectArray("mushroom",sceneObjects.Mushroom),
	LibObj.loadJson("mushroom"),
	LibObj.drawObjects("flower"),
	LibObj.createObjectArray("flower",sceneObjects.Flower),
	LibObj.loadJson("flower"),

]).then(([
	marioSpriteSet,marioArray,
	backgroundJson,
	backgroundSprite,
	coinSpriteSet,coinArray,
	flycoinSprite,flycoinArray,
	turtleSpriteSet,turtleArray,
	goombaSpriteSet,goombaArray,

	// ------------tube object--------------

	tubeSprite,tubeArray,tubeJson,
	highTubeSprite,highTubeArray,highTubeJson,
	highestTubeSprite,highestTubeArray,highestTubeJson,

	// ------------tube object--------------

	undergroundTubeSprite,undergroundTubeArray,undergroundTubeJson,
	undergroundBrickSprite,undergroundBrickArray,undergroundBrickJson,
	oddBrickSprite,oddBrickArray,oddBrickJson,

	//------Final object-------

	poleSprite,poleArray,poleJson,
	flagSprite,flagArray,
	castleSprite,castleArray,castleJson,

	//------Final object-------

	// ------brick object-------

	brickSprite,brickArray,brickJson,
	fragmentSprite,fragmentArray,fragmentJson,
	questionBrickSprite,questionBrickArray,questionBrickJson,
	mushroomBrickSprite,mushroomBrickArray,mushroomBrickJson,
	flowerBrickSprite,flowerBrickArray,flowerBrickJson,

	// ------brick object-------

	fireballSprite,fireballArray,fireballJson,
	mushroomSprite,mushroomArray,mushroomJson,
	flowerSprite,flowerArray,flowerJson])=>{

	//--------------------遊戲控制流程-----------------------
	function startGame() {
		marioArray = [];
		coinArray = [];
		flycoinArray = [];  //  這邊常常忘記清空。
		turtleArray = [];
		flagArray = [];
		tubeArray = [];
		highTubeArray = [];
		highestTubeArray = [];
		undergroundTubeArray = [];
		undergroundBrickArray = [];
		oddBrickArray = [];
		goombaArray = [];
		poleArray = [];
		flagArray = [];
		castleArray = [];
		brickArray = [];
		fragmentArray = [];
		questionBrickArray = [];
		mushroomBrickArray = [];
		flowerBrickArray = [];
		flowerArray = [];
		fireballArray = [];
		mushroomArray = [];
		flowerArray = [];
		Promise.all([
			LibObj.createMarioArray("marioRedder"),
			LibObj.createObjectArray("coin",sceneObjects.Coin),
			LibObj.createObjectArray("flycoin",sceneObjects.Flycoin),
			LibObj.createObjectArray("badTurtle",sceneObjects.Turtle),
			LibObj.createObjectArray("goomba",sceneObjects.Goomba),
			LibObj.createObjectArray("tube",sceneObjects.Tube),
			LibObj.createObjectArray("highTube",sceneObjects.HighTube),
			LibObj.createObjectArray("highestTube",sceneObjects.HighestTube),
			LibObj.createObjectArray("undergroundTube",sceneObjects.UndergroundTube),
			LibObj.createObjectArray("undergroundBrick",sceneObjects.UndergroundBrick),
			LibObj.createObjectArray("oddBrick",sceneObjects.OddBrick),
		
			LibObj.createObjectArray("pole",sceneObjects.Pole),
			LibObj.createObjectArray("flag",sceneObjects.Flag),
			LibObj.createObjectArray("highCastle",sceneObjects.Castle),
			LibObj.createObjectArray("brick",sceneObjects.Brick),
			LibObj.createFragmentArray(),
			LibObj.createObjectArray("questionBrick",sceneObjects.QuestionBrick),
			LibObj.createObjectArray("mushroomBrick",sceneObjects.MushroomBrick),	
			LibObj.createObjectArray("flowerBrick",sceneObjects.FlowerBrick),
			LibObj.createObjectArray("fireballset",sceneObjects.Fireball),
			LibObj.createObjectArray("mushroom",sceneObjects.Mushroom),
			LibObj.createObjectArray("flower",sceneObjects.Flower),
		]).then(([
			mario,
			coin,flycoin,
			turtle,goomba,
			tube,	highTube,	highestTube,
			undergroundTube,	undergroundBrick,
			oddBrick,
			pole,flag,castle,
			brick,fragment,	questionBrick,mushroomBrick,flowerBrick,
			fireball,
			mushroom,	flower
		])=>{
			marioArray = mario;
			flycoinArray = flycoin;
			coinArray = coin;
			turtleArray = turtle;
			tubeArray = tube;
			highTubeArray = highTube;
			highestTubeArray = highestTube;
			undergroundTubeArray = undergroundTube;
			undergroundBrickArray = undergroundBrick,
			oddBrickArray = oddBrick;
			goombaArray = goomba;
			poleArray = pole;
			flagArray = flag;
			castleArray = castle;
			brickArray = brick;
			fragmentArray = fragment;
			questionBrickArray = questionBrick;
			mushroomBrickArray = mushroomBrick;
			flowerBrickArray = flowerBrick;
			fireballArray = fireball;
			mushroomArray = mushroom;
			flowerArray = flower;
		});
		myGameArea.start();
	}

	const myGameArea = {
		canvas : document.createElement("canvas"),
		start : function() {
			this.canvas.width = 8000;
			this.canvas.height = 2160;
			this.context = this.canvas.getContext("2d");
			this.context.scale(1.5,1.5);
			document.body.insertBefore(this.canvas, document.body.childNodes[0]);
			this.frameNo = 0;
			this.interval = setInterval(function(){
				animate();
			}, 20);
		},
		clear : function() {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		},
		stop : function() {
			clearInterval(this.interval);
		}
	};
		
	function restart() {
		myGameArea.stop();
		myGameArea.clear();
		startGame();
	}  
	//--------------------遊戲控制流程-----------------------
	function animate() {
		//-----------音樂播放---------------

		backgroundMusic.play();

		if(marioArray[0].willDie 
			|| marioArray[0].stopBackgroundMusic 
			|| marioArray[0].isDie ){
			backgroundMusic.pause();
			backgroundMusic.currentTime = 0;
		}else if(marioArray[0].underGround){
			backgroundMusic.pause();
			undergroundMuscic.play();
		}else if(!marioArray[0].underGround){
			undergroundMuscic.pause();
		}

		// --------end of 音樂播放----------------

		//---------- 進入下水道 canvas 畫布調整位置-----------

		const canvas = document.querySelector("canvas");

		if(marioArray[0].underGround){
			canvas.style.position  = "absolute";
			canvas.style.left  = "-375px";
			canvas.style.top  = "-1050px";
		}else if( !marioArray[0].underGround){
			canvas.style.left = "0";
			canvas.style.top  = "0";
		}
		//---------- end of 進入下水道 canvas 畫布調整位置-----------

		const context = myGameArea.context;

		context.clearRect(0, 0, context.canvas.width, context.canvas.height);

		if(marioArray[0].pos.x < 450){
			context.drawImage(backgroundSprite,0,0,context.canvas.width,2160,0,0,context.canvas.width,2160);
		}else if(marioArray[0].pos.x >= 450 && 	marioArray[0].pos.x < 5000) {
			context.drawImage(backgroundSprite,	marioArray[0].pos.x  - 450 ,0,context.canvas.width,2160,0,0,context.canvas.width,2160);
		}else if(marioArray[0].pos.x >= 5000){
			context.drawImage(backgroundSprite, 4550,0,context.canvas.width,2160,0,0,context.canvas.width,2160);
		} // 最後一行用差值來做處理，讓馬力歐在最後一段距離的時候，只有人移動，畫面不捲

		if(marioArray[0].isDie && marioArray[0].pos.y > 3600){
			restart();
		}		

		LibObj.snippet(LibObj.keys,marioArray,powerupSound,powerdownSound);
		LibObj.drawAndUpdateObject(coinArray,context,coinSpriteSet,marioArray);
		LibObj.spliceObjectArray(coinArray);
		LibObj.drawAndUpdateObject(flycoinArray,context,flycoinSprite,marioArray,questionBrickJson);

		// --------------------monsters---------------------
		LibObj.drawAndUpdateObject(turtleArray,context,turtleSpriteSet,marioArray,backgroundJson,
			tubeJson,highTubeJson,highestTubeJson,oddBrickJson);
		LibObj.spliceObjectArray(turtleArray);

		LibObj.drawAndUpdateObject(goombaArray,context,goombaSpriteSet,marioArray,tubeJson,
			highTubeJson,highestTubeJson,turtleArray,backgroundJson,oddBrickJson);	
		LibObj.spliceObjectArray(goombaArray); 	

		//--------------final obj-------------------
		LibObj.drawAndUpdateObject(poleArray,context,poleSprite,marioArray);
		LibObj.drawAndUpdateObject(flagArray,context,flagSprite,marioArray,poleJson);
		LibObj.drawAndUpdateObject(castleArray,context,castleSprite,marioArray);


		LibObj.drawAndUpdateObject(flowerArray,context,flowerSprite,marioArray);
		LibObj.spliceObjectArray(flowerArray);

		LibObj.drawAndUpdateObject(mushroomArray,context,mushroomSprite,marioArray,
			backgroundJson,oddBrickJson,tubeJson,highTubeJson,highestTubeJson);
		LibObj.spliceObjectArray(mushroomArray);
		//-----------------bricks------------------
		LibObj.drawAndUpdateObject(brickArray,context,brickSprite,marioArray);
		LibObj.drawAndUpdateObject(fragmentArray,context,fragmentSprite,marioArray,backgroundJson,brickArray,fragmentArray);
		LibObj.drawAndUpdateObject(mushroomBrickArray,context,mushroomBrickSprite,marioArray,mushroomArray,mushroomBrickArray);
	
		LibObj.drawAndUpdateObject(flowerBrickArray,context,flowerBrickSprite,marioArray,flowerArray,flowerBrickArray);
		LibObj.drawAndUpdateObject(questionBrickArray,context,questionBrickSprite,
			marioArray,flycoinArray,questionBrickArray);


		// ---------------obstacles-----------------
		LibObj.drawAndUpdateObject(highTubeArray,context,highTubeSprite,marioArray);
		LibObj.drawAndUpdateObject(oddBrickArray,context,oddBrickSprite,marioArray);
		LibObj.drawAndUpdateObject(undergroundTubeArray,context,undergroundTubeSprite,marioArray);
		LibObj.drawAndUpdateObject(undergroundBrickArray,context,undergroundBrickSprite,marioArray);
		marioArray[0].draw(context, marioSpriteSet,backgroundJson,fireballSprite,
			goombaArray,turtleArray,tubeJson,highTubeJson,highestTubeJson,oddBrickJson);
		marioArray[0].update(backgroundJson,tubeJson,highestTubeJson,oddBrickJson,
			poleJson,	castleJson,flagArray,undergroundTubeJson,undergroundBrickJson);
		
		LibObj.drawAndUpdateObject(undergroundTubeArray,context,undergroundTubeSprite,marioArray);
		LibObj.drawAndUpdateObject(tubeArray,context,tubeSprite,marioArray);
		LibObj.drawAndUpdateObject(highestTubeArray,context,highestTubeSprite,marioArray);
	};
	document.querySelector("#startBtn").addEventListener("click",function (e){
		startGame();
		openBackground.style.display = "none";
	});	
});