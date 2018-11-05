import {drawBackground,loadMarioImage,drawObjects} from "../Js/drawImage.js";
import {loadJson} from "../Js/loadJson.js";
import {Mario} from "../Js/ObjectJs/marioObject.js";
import {Coin} from "../Js/ObjectJs/coinObject.js";
import {Flycoin} from "../Js/ObjectJs/flycoinObject.js";
import {Tube} from "../Js/ObjectJs/tubeObject.js";
import {HighTube} from "../Js/ObjectJs/highTubeObject.js";
import {HighestTube} from "../Js/ObjectJs/highestTubeObject.js";
import {UndergroundTube} from "../Js/ObjectJs/undergroundTubeObject.js";
import {UndergroundBrick} from "../Js/ObjectJs/undergroundBrickObject.js";
import {OddBrick} from "../Js/ObjectJs/oddBrickObject.js";
import {Turtle} from "../Js/ObjectJs/turtleObject.js";
import {Goomba} from "../Js/ObjectJs/goombaObject.js";
import {BadPlant} from "../Js/ObjectJs/badPlantObject.js";
import {Pole} from "../Js/ObjectJs/poleObject.js";
import {Flag} from "../Js/ObjectJs/flagObject.js";
import {Castle} from "../Js/ObjectJs/castleObject.js";
import {Brick} from "../Js/ObjectJs/brickObject.js";
import {Fragment} from "../Js/ObjectJs/fragmentObject.js";
import {QuestionBrick} from "../Js/ObjectJs/questionBrickObject.js";
import {MushroomBrick} from "../Js/ObjectJs/mushroomBrickObject.js";
import {FlowerBrick} from "../Js/ObjectJs/flowerBrickObject.js";
import {Flower} from "../Js/ObjectJs/flowerObject.js";
import {Mushroom} from "../Js/ObjectJs/mushroomObject.js";
import {keys} from "../Js/keyEvent.js";
import { Fireball } from "./ObjectJs/fireballObject.js";
let snippet = new Array();
let firesnippet = new Array();


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
var is_chrome = !!window.chrome && !is_opera;
var is_explorer = typeof document !== "undefined" && !!document.documentMode && !isEdge;
var is_firefox = typeof window.InstallTrigger !== "undefined";
var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var is_opera = !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0;

if (is_safari) {
	marioDeath.style.display = "block";
	safariNotWorking.style.display = "flex";
}

// ------------Sfari 偵測---------------------


// -------------------音效--------------------


let backgroundMusic = new Audio("../music/TitleBGM.mp3");

let undergroundMuscic = new Audio("../music/underworld.mp3");
let powerupSound = new Audio("/music/maro-powerup-sound.wav");

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

//-------測試區---------

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
	createObjectArray("fragment",Fragment),
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
			createObjectArray("fragment",Fragment),
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
			this.context.scale(1,1);
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


	// document.querySelector("#start").addEventListener("click", function() {
	// 	restart();
	// });
  
	//--------------------遊戲控制流程-----------------------
	
	function animate() {
		// setTimeout(function() {
		// requestAnimationFrame(animate);

		// 	// your draw() stuff goes here

		// }, 1000 / fps)

		// requestAnimationFrame(animate);
		// if(keys.zbutton){
		// }


		// ------------密技區----------
		if(keys.zbutton){
			let temp = "z";
			snippet.push(temp);
		}

		if(snippet.length === 18){
			snippet = [];
			if(!marioArray[0].isBigMario && !marioArray[0].isFireMario){
				marioArray[0].changeToBig = true;
				powerupSound.play();
			}	
			return;
		}

		if(keys.abutton){
			let temp = "a";
			firesnippet.push(temp);
		}

		if(firesnippet.length === 18){
			firesnippet = [];
			if(marioArray[0].isBigMario ){
				marioArray[0].changeToFire = true;
				powerupSound.play();
			}	
			return;
		}

		
		// ------------end 密技區----------

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

		if(marioArray[0].underGround){
			document.querySelector("canvas").style.position  = "absolute";
			document.querySelector("canvas").style.left  = "-250px";
			document.querySelector("canvas").style.top  = "-700px";
		}else if(!marioArray[0].underGround){
			document.querySelector("canvas").style.left = "0";
			document.querySelector("canvas").style.top  = "0";
		}

		// --------end of 音樂播放----------------

		let context = myGameArea.context;

		context.clearRect(0, 0, context.canvas.width, context.canvas.height);


		if(marioArray[0].pos.x < 450){
			context.drawImage(backgroundSprite,0,0,context.canvas.width,2160,0,0,context.canvas.width,2160);
		}else if(marioArray[0].pos.x >= 450 && 	marioArray[0].pos.x < 5000) {
			context.drawImage(backgroundSprite,	marioArray[0].pos.x  - 450 ,0,context.canvas.width,2160,0,0,context.canvas.width,2160);
		}else if(marioArray[0].pos.x >= 5000){
			context.drawImage(backgroundSprite, 4550,0,context.canvas.width,2160,0,0,context.canvas.width,2160);
		} // 最後一行用差值來做處理，讓馬力歐在最後一段距離的時候，只有人移動，畫面不捲


		if(marioArray[0].isDie && 	marioArray[0].pos.y > 3600){
			restart();
		}		


		for(let j = 0;j < coinArray.length;j += 1){
			coinArray[j].draw(context,coinSpriteSet,marioArray[0]);
			coinArray[j].update(marioArray[0]);
			let coin = coinArray[j];
			if(coin.show == false){
				coinArray.splice(j,1);
				j--;
			}	
			if(coinArray.length == 0){
				break;
			}
		}

		for(let j = 0;j < flycoinArray.length;j += 1){
			flycoinArray[j].draw(context,flycoinSprite,marioArray[0]);
			flycoinArray[j].update(marioArray[0],questionBrickJson);
			let flycoin = flycoinArray[j];
			// if(flycoin.isVanished == true){
			// 	flycoinArray.splice(j,1);
			// 	j--;
			// }	
			// if(flycoinArray.length == 0){
			// 	break;
			// }
		}

		// --------------------怪物區---------------------
		for(let j = 0;j < turtleArray.length;j += 1){
			turtleArray[j].draw(context,turtleSpriteSet,marioArray[0]);
			turtleArray[j].update(backgroundJson,tubeJson,highTubeJson,highestTubeJson,marioArray[0],oddBrickJson);
			let turtle = turtleArray[j];
			if(turtle.isDie){
				turtleArray.splice(j,1);
				j--;
			}
			if(turtleArray.length == 0){
				break;
			}
		}			
				
		for(let j = 0;j < goombaArray.length;j += 1){
			goombaArray[j].draw(context,goombaSpriteSet,marioArray[0]);
			goombaArray[j].update(tubeJson,highTubeJson,highestTubeJson,turtleArray,marioArray[0],backgroundJson,oddBrickJson);
			let goomba = goombaArray[j];
			if(!goomba.show){
				goombaArray.splice(j,1);
				j--;
			}
			if(goombaArray.length == 0){
				break;
			}
		}

		// for(let j = 0;j < badPlantArray.length;j += 1){
		// 	badPlantArray[j].draw(context,badPlantSprite,marioArray[0]);
		// 	badPlantArray[j].update(marioArray[0]);
		// 	let badPlant = badPlantArray[j];
		// 	if(badPlant.hitByFire){
		// 		badPlantArray.splice(j,1);
		// 		j--;
		// 	}
		// 	if(badPlantArray.length == 0){
		// 		break;
		// 	}
		// }	
	
		// --------------end 怪物區---------------------


		//--------------終點物件-------------------

		for(let j = 0;j < poleArray.length;j += 1){
			poleArray[j].draw(context,poleSprite,marioArray[0]);
			poleArray[j].update(marioArray[0]);
		}

		for(let j = 0;j < flagArray.length;j += 1){
			flagArray[j].draw(context,flagSprite,marioArray[0]);
			flagArray[j].update(poleJson,marioArray[0]);
		}	
			
		for(let j = 0;j < castleArray.length;j += 1){
			castleArray[j].draw(context,castleSprite,marioArray[0]);
		}	

		//--------------end   終點物件-------------------

		for(let j = 0;j < flowerArray.length;j += 1){
			flowerArray[j].draw(context,flowerSprite,marioArray[0]);
			flowerArray[j].update(marioArray[0]);
			let flower = flowerArray[j];
			if(flower.show == false){
				flowerArray.splice(j,1);
				j--;
			}
			if(flowerArray.length == 0){
				break;
			}  
		}	

		for(let j = 0;j < mushroomArray.length;j += 1){
			mushroomArray[j].draw(context,mushroomSprite,marioArray[0]);
			mushroomArray[j].update(marioArray[0],backgroundJson,oddBrickJson
				,tubeJson,highTubeJson,highestTubeJson);
			let mushroom = mushroomArray[j];
			if(mushroom.show == false){
				mushroomArray.splice(j,1);
				j--;
			}
			if(mushroomArray.length == 0){
				break;
			} 
		}	

		//-----------------各種磚塊------------------

		for(let j = 0;j < brickArray.length;j += 1){
			brickArray[j].draw(context,brickSprite,marioArray[0]);
			brickArray[j].update(marioArray[0]);
			// let brick = brickArray[j];
			// if(brick.show == false){
			// 	brickArray.splice(j,1);
			// 	j--;
			// }
			// if(brickArray.length == 0){
			// 	break;
			// } 
		}	

		for(let j = 0;j < fragmentArray.length;j += 1){
			fragmentArray[j].draw(context,fragmentSprite,marioArray[0]);
			fragmentArray[j].update(backgroundJson,brickArray,fragmentArray);
			// let fragment = fragmentArray[j];
			// if(fragment.underground ){
			// 	fragmentArray.splice(j,1);
			// 	j--;
			// }
			// if(fragmentArray.length == 0){
			// 	break;
			// } 
		}		

		for(let j = 0;j < mushroomBrickArray.length;j += 1){
			mushroomBrickArray[j].draw(context,mushroomBrickSprite,marioArray[0]);
			mushroomBrickArray[j].update(marioArray[0],mushroomArray,mushroomBrickArray);
		}	

		for(let j = 0;j < flowerBrickArray.length;j += 1){
			flowerBrickArray[j].draw(context,flowerBrickSprite,marioArray[0]);
			flowerBrickArray[j].update(marioArray[0],flowerArray,flowerBrickArray);
		}	

		for(let j = 0;j < questionBrickArray.length;j += 1){
			questionBrickArray[j].draw(context,questionBrickSprite,marioArray[0]);
			questionBrickArray[j].update(marioArray[0],flycoinArray,questionBrickArray);
		}	

		//-----------------end of 各種磚塊------------------


		// ---------------障礙區-----------------

		
	
		for(let j = 0;j < undergroundBrickArray.length;j += 1){
			undergroundBrickArray[j].draw(context,undergroundBrickSprite,marioArray[0]);
		}

		for(let j = 0;j < highTubeArray.length;j += 1){
			highTubeArray[j].draw(context,highTubeSprite,marioArray[0]);
			highTubeArray[j].update(marioArray[0]);
		}			
		
		for(let j = 0;j < oddBrickArray.length;j += 1){
			oddBrickArray[j].draw(context,oddBrickSprite,marioArray[0]);
			oddBrickArray[j].update(marioArray[0]);
		}	
			

		marioArray[0].draw(context, marioSpriteSet,backgroundJson,fireballSprite,
			goombaArray,turtleArray,badPlantArray,tubeJson,highTubeJson,highestTubeJson,oddBrickJson);
		marioArray[0].update(backgroundJson,tubeJson,highestTubeJson,oddBrickJson,
			poleJson,	castleJson,flagArray,undergroundTubeJson,undergroundBrickJson);
			
		
		for(let j = 0;j < undergroundTubeArray.length;j += 1){
			undergroundTubeArray[j].draw(context,undergroundTubeSprite,marioArray[0]);
		}	

		for(let j = 0;j < highestTubeArray.length;j += 1){
			highestTubeArray[j].draw(context,highestTubeSprite,marioArray[0]);
			highestTubeArray[j].update(marioArray[0]);
		}	
	
		for(let j = 0;j < tubeArray.length;j += 1){
			tubeArray[j].draw(context,tubeSprite,marioArray[0]);
			tubeArray[j].update(marioArray[0]);
		}	
	
		// ---------------end of 障礙區-----------------

	
		// -----------------計分區--------------------------

		let brickcoinPoint = questionBrickArray.filter(function (item) {
			return item.isUseLess == true;
		});
		
		let coinPoint = (31 - coinArray.length) * 100;

		// context.font = "30px Courier New";
		// context.fillText("Score:" + (brickcoinPoint.length*200 + coinPoint),10,50);

		// -----------------end of 文字區-----------------
		
	};
	// startGame();
	document.querySelector("#startBtn").addEventListener("click",function (e){
		startGame();
		openBackground.style.display = "none";
	});

	document.querySelector(".container").addEventListener("keypress", function (e) {
		var key = e.which || e.keyCode;
		if (key === 13) { 
			startGame();
		}
	});
	
});


