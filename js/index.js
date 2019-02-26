import {LibObj} from "../js/lib.js";
import {drawBackground,loadMarioImage,drawObjects} from "../js/drawImage.js";
import {loadJson} from "../js/loadJson.js";
import {Mario} from "../js/ObjectJs/marioObject.js";
import {Coin} from "../js/ObjectJs/coinObject.js";
import {Flycoin} from "../js/ObjectJs/flycoinObject.js";
import {Tube} from "../js/ObjectJs/tubeObject.js";
import {HighTube} from "../js/ObjectJs/highTubeObject.js";
import {HighestTube} from "../js/ObjectJs/highestTubeObject.js";
import {UndergroundTube} from "../js/ObjectJs/undergroundTubeObject.js";
import {UndergroundBrick} from "../js/ObjectJs/undergroundBrickObject.js";
import {OddBrick} from "../js/ObjectJs/oddBrickObject.js";
import {Turtle} from "../js/ObjectJs/turtleObject.js";
import {Goomba} from "../js/ObjectJs/goombaObject.js";
import {BadPlant} from "./ObjectJs/badPlantObject.js";
import {Pole} from "../js/ObjectJs/poleObject.js";
import {Flag} from "../js/ObjectJs/flagObject.js";
import {Castle} from "../js/ObjectJs/castleObject.js";
import {Brick} from "../js/ObjectJs/brickObject.js";
import {Fragment} from "../js/ObjectJs/fragmentObject.js";
import {QuestionBrick} from "../js/ObjectJs/questionBrickObject.js";
import {MushroomBrick} from "../js/ObjectJs/mushroomBrickObject.js";
import {FlowerBrick} from "../js/ObjectJs/flowerBrickObject.js";
import {Flower} from "../js/ObjectJs/flowerObject.js";
import {Mushroom} from "../Js/ObjectJs/mushroomObject.js";
import {keys} from "../js/keyEvent.js";
import { Fireball } from "./ObjectJs/fireballObject.js";


// ----------------解析度偵測------------------------

let openBackground = document.querySelector("#openBackground");
let smallresolution = document.querySelector("#smaller1366");
let bigresolution = document.querySelector("#bigger1366");
let marioDeath = document.querySelector("#marioDeath");
let safariNotWorking = document.querySelector("#safariNotWorkingInfo");
let screenWidth = screen.width;

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
// ---------------end 開頭畫面---------------

// ------------end -解析度偵測-----------------------

// ------------Sfari 偵測---------------------

var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if (is_safari) {
	marioDeath.style.display = "block";
	safariNotWorking.style.display = "flex";
}

// -------------------音效--------------------
let backgroundMusic = new Audio("../music/TitleBGM.mp3");

let undergroundMuscic = new Audio("../music/underworld.mp3");
let powerupSound = new Audio("/music/maro-powerup-sound.wav");
let powerdownSound = new Audio("/music/maro-powerdown-sound.wav");

// -------------------end 音效--------------------

export function createObjectArray(name,objectName) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(Sprite=>{
			let objectArray = [];
			Sprite.Pos[0].ranges.forEach(([x,y])=>{
				let object = new objectName();
				object.pos.set(x,y);
				objectArray.push(object);
			});
			return objectArray;
		});
}

function createFragmentArray(){
	return fetch(`../marioJSON/brick.json`)
		.then(r =>r.json())
		.then(Sprite=>{
			let brickArray = Sprite.Pos[0].ranges;
			let fragmentArray = [];
			for(let i = 0;i < brickArray.length;i += 1){
				let fragment1 = new Fragment();
				fragment1.pos.set(brickArray[i][0],brickArray[i][1]);
				let fragment2 = new Fragment();
				fragment2.pos.set(brickArray[i][0] + 8,brickArray[i][1]);
				let fragment3 = new Fragment();
				fragment3.pos.set(brickArray[i][0],brickArray[i][1] + 8);
				let fragment4 = new Fragment();
				fragment4.pos.set(brickArray[i][0] + 8,brickArray[i][1] + 8);
				fragmentArray.push(fragment1);
				fragmentArray.push(fragment2);
				fragmentArray.push(fragment3);
				fragmentArray.push(fragment4);
			}
			return fragmentArray;
		});
}

export function createMarioArray(name) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(marioSprite=>{
			let marioArray = [];
			marioSprite.Pos[0].ranges.forEach(([x,y])=>{
				let mario = new Mario();
				mario.pos.set(x,y);
				mario.speed.set(4,2);
				marioArray.push(mario);
			});
			return marioArray;
		});
}

Promise.all([ 
	loadMarioImage("marioRedder"),
	createMarioArray("marioRedder"),
	loadJson("background"),
	drawBackground("background"),

	drawObjects("coin"),
	createObjectArray("coin",Coin),
	drawObjects("flycoin"),
	createObjectArray("flycoin",Flycoin),

	//------------Monster Object------------
	drawObjects("badTurtle"),
	createObjectArray("badTurtle",Turtle),
	drawObjects("goomba"),
	createObjectArray("goomba",Goomba),
	drawObjects("badPlant"),
	createObjectArray("badPlant",BadPlant),

	// ------------tube object--------------

	drawObjects("tube"),
	createObjectArray("tube",Tube),
	loadJson("tube"),
	drawObjects("highTube"),
	createObjectArray("highTube",HighTube),
	loadJson("highTube"),
	drawObjects("highestTube"),
	createObjectArray("highestTube",HighestTube),
	loadJson("highestTube"),

	// ------------tube object--------------


	drawObjects("undergroundTube"),
	createObjectArray("undergroundTube",UndergroundTube),
	loadJson("undergroundTube"),
	drawObjects("undergroundBrick"),
	createObjectArray("undergroundBrick",UndergroundBrick),
	loadJson("undergroundBrick"),
	drawObjects("oddBrick"),
	createObjectArray("oddBrick",OddBrick),
	loadJson("oddBrick"),

	// ------------final object--------------
	drawObjects("pole"),
	createObjectArray("pole",Pole),
	loadJson("pole"),
	drawObjects("flag"),
	createObjectArray("flag",Flag),
	drawObjects("highCastle"),
	createObjectArray("highCastle",Castle),
	loadJson("highCastle"),

	// ------------final object--------------


	// ------------brick object--------------

	drawObjects("brick"),
	createObjectArray("brick",Brick),
	loadJson("brick"),
	drawObjects("fragment"),
	createFragmentArray(),
	loadJson("fragment"),
	drawObjects("questionBrick"),
	createObjectArray("questionBrick",QuestionBrick),
	loadJson("questionBrick"),
	drawObjects("mushroomBrick"),
	createObjectArray("mushroomBrick",MushroomBrick),
	loadJson("mushroomBrick"),
	drawObjects("flowerBrick"),
	createObjectArray("flowerBrick",FlowerBrick),  //這邊複製貼上的話，常常會忘記改函示名稱
	loadJson("flowerBrick"),

	// ------------brick object--------------

	drawObjects("fireballset"),
	createObjectArray("fireballset",Fireball),
	loadJson("fireballset"),

	// ------------powerup object--------------

	drawObjects("mushroom"),
	createObjectArray("mushroom",Mushroom),
	loadJson("mushroom"),
	drawObjects("flower"),
	createObjectArray("flower",Flower),
	loadJson("flower"),

	// ------------powerup object--------------
]).then(([
	marioSpriteSet,marioArray,
	backgroundJson,
	backgroundSprite,
	coinSpriteSet,coinArray,
	flycoinSprite,flycoinArray,
	turtleSpriteSet,turtleArray,
	goombaSpriteSet,goombaArray,
	badPlantSprite,badPlantArray,

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
		badPlantArray = [];
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
			createMarioArray("marioRedder"),
			createObjectArray("coin",Coin),
			createObjectArray("flycoin",Flycoin),
			createObjectArray("badTurtle",Turtle),
			createObjectArray("goomba",Goomba),
			createObjectArray("badPlant",BadPlant),
			createObjectArray("tube",Tube),
			createObjectArray("highTube",HighTube),
			createObjectArray("highestTube",HighestTube),
			createObjectArray("undergroundTube",UndergroundTube),
			createObjectArray("undergroundBrick",UndergroundBrick),
			createObjectArray("oddBrick",OddBrick),
		
			createObjectArray("pole",Pole),
			createObjectArray("flag",Flag),
			createObjectArray("highCastle",Castle),
			createObjectArray("brick",Brick),
			createFragmentArray(),
			createObjectArray("questionBrick",QuestionBrick),
			createObjectArray("mushroomBrick",MushroomBrick),	
			createObjectArray("flowerBrick",FlowerBrick),
			createObjectArray("fireballset",Fireball),
			createObjectArray("mushroom",Mushroom),
			createObjectArray("flower",Flower),
		]).then(([
			mario,
			coin,flycoin,
			turtle,goomba,badPlant,
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
			badPlantArray = badPlant;
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

	let myGameArea = {
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
		// ------------密技區----------
		LibObj.snippet(keys,marioArray,powerupSound,powerdownSound);

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

		let canvas = document.querySelector("canvas");

		if(marioArray[0].underGround){
			canvas.style.position  = "absolute";
			canvas.style.left  = "-375px";
			canvas.style.top  = "-1050px";
		}else if( !marioArray[0].underGround){
			canvas.style.left = "0";
			canvas.style.top  = "0";
		}
		//---------- end of 進入下水道 canvas 畫布調整位置-----------

		let context = myGameArea.context;

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

		LibObj.drawAndUpdateObject(coinArray,context,coinSpriteSet,marioArray);
		LibObj.spliceObjectArray(coinArray);
		LibObj.drawAndUpdateObject(flycoinArray,context,flycoinSprite,marioArray,questionBrickJson);

		// --------------------怪物區---------------------
		LibObj.drawAndUpdateObject(turtleArray,context,turtleSpriteSet,marioArray,backgroundJson,
			tubeJson,highTubeJson,highestTubeJson,oddBrickJson);
		LibObj.spliceObjectArray(turtleArray);

		LibObj.drawAndUpdateObject(goombaArray,context,goombaSpriteSet,marioArray,tubeJson,
			highTubeJson,highestTubeJson,turtleArray,backgroundJson,oddBrickJson);	
		LibObj.spliceObjectArray(goombaArray);
 	
		// --------------end 怪物區---------------------
		//--------------終點物件-------------------
		LibObj.drawAndUpdateObject(poleArray,context,poleSprite,marioArray);
		LibObj.drawAndUpdateObject(flagArray,context,flagSprite,marioArray,poleJson);
		LibObj.drawAndUpdateObject(castleArray,context,castleSprite,marioArray);


		//--------------end   終點物件-------------------
		LibObj.drawAndUpdateObject(flowerArray,context,flowerSprite,marioArray);
		LibObj.spliceObjectArray(flowerArray);

		LibObj.drawAndUpdateObject(mushroomArray,context,mushroomSprite,marioArray,
			backgroundJson,oddBrickJson,tubeJson,highTubeJson,highestTubeJson);
		LibObj.spliceObjectArray(mushroomArray);
		//-----------------各種磚塊------------------
		LibObj.drawAndUpdateObject(brickArray,context,brickSprite,marioArray);
		LibObj.drawAndUpdateObject(fragmentArray,context,fragmentSprite,marioArray,backgroundJson,brickArray,fragmentArray);
		LibObj.drawAndUpdateObject(mushroomBrickArray,context,mushroomBrickSprite,marioArray,mushroomArray,mushroomBrickArray);
	
		LibObj.drawAndUpdateObject(flowerBrickArray,context,flowerBrickSprite,marioArray,flowerArray,flowerBrickArray);
		LibObj.drawAndUpdateObject(questionBrickArray,context,questionBrickSprite,
			marioArray,flycoinArray,questionBrickArray);
		//-----------------end of 各種磚塊------------------

		// ---------------障礙區-----------------
		LibObj.drawAndUpdateObject(highTubeArray,context,highTubeSprite,marioArray);
		LibObj.drawAndUpdateObject(oddBrickArray,context,oddBrickSprite,marioArray);
		LibObj.drawAndUpdateObject(undergroundTubeArray,context,undergroundTubeSprite,marioArray);
		LibObj.drawAndUpdateObject(undergroundBrickArray,context,undergroundBrickSprite,marioArray);
		
		marioArray[0].draw(context, marioSpriteSet,backgroundJson,fireballSprite,
			goombaArray,turtleArray,badPlantArray,tubeJson,highTubeJson,highestTubeJson,oddBrickJson);
		marioArray[0].update(backgroundJson,tubeJson,highestTubeJson,oddBrickJson,
			poleJson,	castleJson,flagArray,undergroundTubeJson,undergroundBrickJson);
		
		LibObj.drawAndUpdateObject(undergroundTubeArray,context,undergroundTubeSprite,marioArray);
		LibObj.drawAndUpdateObject(tubeArray,context,tubeSprite,marioArray);
		LibObj.drawAndUpdateObject(highestTubeArray,context,highestTubeSprite,marioArray);
		// ---------------end of 障礙區-----------------
	};
	// startGame();
	document.querySelector("#startBtn").addEventListener("click",function (e){
		startGame();
		openBackground.style.display = "none";
	});	
});