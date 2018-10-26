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
import {BadPlant} from "../Js/ObjectJs/BadPlantObject.js"
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
let snippet = new Array();
let firesnippet = new Array();

let fps = 100;

// window.onload = startGame;

// -------------------音效--------------------
let backgroundMusic = new Audio("../music/TitleBGM.mp3");

let undergroundMuscic = new Audio("../music/underworld.mp3")
let powerupSound = new Audio("/music/maro-powerup-sound.wav");

// -------------------end 音效--------------------


//-----測試區---------

function createMarioArray(name) {
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

function createCoinArray(name) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(coinsSprite=>{
			let coinArray = [];
			coinsSprite.Pos[0].ranges.forEach(([x,y])=>{
				let coin = new Coin();
				coin.pos.set(x,y);
				coinArray.push(coin);
			});
			return coinArray;
		});
}


function createFlycoinArray(name) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(flycoinSprite=>{
			let flycoinArray = [];
			flycoinSprite.Pos[0].ranges.forEach(([x,y])=>{
				let flycoin = new Flycoin();
				flycoin.pos.set(x,y);
				flycoinArray.push(flycoin);
			});
			return flycoinArray;
		});
}

function createTubeArray(name) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(tubeSprite=>{
			let tubeArray = [];
			tubeSprite.Pos[0].ranges.forEach(([x,y])=>{
				let tube = new Tube();
				tube.pos.set(x,y);
				tubeArray.push(tube);
			});
			return tubeArray;
		});
}

function createhighTubeArray(name) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(highTubeSprite=>{
			let highTubeArray = [];
			highTubeSprite.Pos[0].ranges.forEach(([x,y])=>{
				let highTube = new HighTube();
				highTube.pos.set(x,y);
				highTubeArray.push(highTube);
			});
			return highTubeArray;
		});
}


function createhighestTubeArray(name) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(highestTubeSprite=>{
			let highestTubeArray = [];
			highestTubeSprite.Pos[0].ranges.forEach(([x,y])=>{
				let higheseTube = new HighestTube();
				higheseTube.pos.set(x,y);
				highestTubeArray.push(higheseTube);
			});
			return highestTubeArray;
		});
}

function createundergroundTubeArray(name) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(undergroundTubeSprite=>{
			let undergroundTubeArray = [];
			undergroundTubeSprite.Pos[0].ranges.forEach(([x,y])=>{
				let undergroundTube = new UndergroundTube();
				undergroundTube.pos.set(x,y);
				undergroundTubeArray.push(undergroundTube);
			});
			return undergroundTubeArray;
		});
}

function createundergroundBrickArray(name) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(undergroundBrickSprite=>{
			let undergroundBrickArray = [];
			undergroundBrickSprite.Pos[0].ranges.forEach(([x,y])=>{
				let undergroundBrick = new UndergroundBrick();
				undergroundBrick.pos.set(x,y);
				undergroundBrickArray.push(undergroundBrick);
			});
			return undergroundBrickArray;
		});
}

function createOddBrickArray(name) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(oddBrickSprite=>{
			let oddBrickArray = [];
			oddBrickSprite.Pos[0].ranges.forEach(([x,y])=>{
				let oddBrick = new OddBrick();
				oddBrick.pos.set(x,y);
				oddBrickArray.push(oddBrick);
			});
			return oddBrickArray;
		});
}

function createTurtleArray(name) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(turtleSprite=>{
			let turtleArray = [];
			turtleSprite.Pos[0].ranges.forEach(([x,y])=>{
				let turtle = new Turtle();
				turtle.pos.set(x,y);
				turtleArray.push(turtle);
			});
			return turtleArray;
		});
}

function createGoombaArray(name) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(goombaSprite=>{
			let goombaArray = [];
			goombaSprite.Pos[0].ranges.forEach(([x,y])=>{
				let goomba = new Goomba();
				goomba.pos.set(x,y);
				goombaArray.push(goomba);
			});
			return goombaArray;
		});
}


function createBadPlantArray(name) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(badplantSprite=>{
			let badPlantArray = [];
			badplantSprite.Pos[0].ranges.forEach(([x,y])=>{
				let badPlant = new BadPlant();
				badPlant.pos.set(x,y);
				badPlantArray.push(badPlant);
			});
			return badPlantArray;
		});
}

function createPoleArray(name) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(poleSprite=>{
			let poleArray = [];
			poleSprite.Pos[0].ranges.forEach(([x,y])=>{
				let pole = new Pole();
				pole.pos.set(x,y);
				poleArray.push(pole);
			});
			return poleArray;
		});
}

function createFlagArray(name) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(flagSprite=>{
			let flagArray = [];
			flagSprite.Pos[0].ranges.forEach(([x,y])=>{
				let flag = new Flag();
				flag.pos.set(x,y);
				flagArray.push(flag);
			});
			return flagArray;
		});
}

function createCastleArray(name) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(castleSprite=>{
			let castleArray = [];
			castleSprite.Pos[0].ranges.forEach(([x,y])=>{
				let castle = new Castle();
				castle.pos.set(x,y);
				castleArray.push(castle);
			});
			return castleArray;
		});
}

function createBrickArray(name) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(brickSprite=>{
			let brickArray = [];
			brickSprite.Pos[0].ranges.forEach(([x,y])=>{
				let brick = new Brick();
				brick.pos.set(x,y);
				brickArray.push(brick);
			});
			return brickArray;
		});
}

function createFragmentArray(name) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(fragmentSprite=>{
			let fragmentArray = [];
			fragmentSprite.Pos[0].ranges.forEach(([x,y])=>{
				let fragment = new Fragment();
				fragment.pos.set(x,y);
				fragmentArray.push(fragment);
			});
			return fragmentArray;
		});
}

function createQuestionBrickArray(name) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(questionBrickSprite=>{
			let questionBrickArray = [];
			questionBrickSprite.Pos[0].ranges.forEach(([x,y])=>{
				let questionBrick = new QuestionBrick();
				questionBrick.pos.set(x,y);
				questionBrickArray.push(questionBrick);
			});
			return questionBrickArray;
		});
}



function createMushroomBrickArray(name) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(mushroomBrickSprite=>{
			let mushroomBrickArray = [];
			mushroomBrickSprite.Pos[0].ranges.forEach(([x,y])=>{
				let mushroomBrick = new MushroomBrick();
				mushroomBrick.pos.set(x,y);
				mushroomBrickArray.push(mushroomBrick);
			});
			return mushroomBrickArray;
		});
}

function createFlowerBrickArray(name) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(flowerBrickSprite=>{
			let flowerBrickArray = [];
			flowerBrickSprite.Pos[0].ranges.forEach(([x,y])=>{
				let flowerBrick = new FlowerBrick();
				flowerBrick.pos.set(x,y);
				flowerBrickArray.push(flowerBrick);
			});
			return flowerBrickArray;
		});
}


function createFireballArray(name) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(fireballSprite=>{
			let fireballArray = [];
			return fireballArray;
		});
}

function createMushroomArray(name) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(mushroomSprite=>{
			let mushroomArray = [];
			mushroomSprite.Pos[0].ranges.forEach(([x,y])=>{
				let mushroom = new Mushroom();
				mushroom.pos.set(x,y);
				mushroomArray.push(mushroom);
			});
			return mushroomArray;
		});
}


function createFlowerArray(name) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(flowerSprite=>{
			let flowerArray = [];
			flowerSprite.Pos[0].ranges.forEach(([x,y])=>{
				let flower = new Flower();
				flower.pos.set(x,y);
				flowerArray.push(flower);
			});
			return flowerArray;
		});
}



//-------測試區---------


Promise.all([                //產出 groundSprite, 用來傳進 mario object 處理馬力歐落地
	loadJson("background"),
	drawBackground("background"),



	drawObjects("coin"),
	createCoinArray("coin"),
	drawObjects("flycoin"),
	createFlycoinArray("flycoin"),


	drawObjects("badTurtle"),
	createTurtleArray("badTurtle"),
	drawObjects("badPlant"),
	createTurtleArray("badPlant"),


		// ------------tube object--------------

	drawObjects("tube"),
	createTubeArray("tube"),
	loadJson("tube"),
	drawObjects("highTube"),
	createTubeArray("highTube"),
	loadJson("highTube"),
	drawObjects("highestTube"),
	createhighestTubeArray("highestTube"),
	loadJson("highestTube"),

	// ------------tube object--------------


	drawObjects("undergroundTube"),
	createhighestTubeArray("undergroundTube"),
	loadJson("undergroundTube"),
	drawObjects("undergroundBrick"),
	createundergroundBrickArray("undergroundBrick"),
	loadJson("undergroundBrick"),
	drawObjects("oddBrick"),
	createOddBrickArray("oddBrick"),
	loadJson("oddBrick"),
	drawObjects("goomba"),
	createGoombaArray("goomba"),

		// ------------final object--------------
	drawObjects("pole"),
	createPoleArray("pole"),
	loadJson("pole"),
	drawObjects("flag"),
	createFlagArray("flag"),
	drawObjects("highCastle"),
	createCastleArray("highCastle"),
	loadJson("highCastle"),

		// ------------final object--------------


		// ------------brick object--------------

	drawObjects("brick"),
	createBrickArray("brick"),
	loadJson("brick"),
	drawObjects("fragment"),
	createFragmentArray("fragment"),
	loadJson("fragment"),
	drawObjects("questionBrick"),
	createQuestionBrickArray("questionBrick"),
	loadJson("questionBrick"),
	drawObjects("mushroomBrick"),
	createQuestionBrickArray("mushroomBrick"),
	loadJson("mushroomBrick"),
	drawObjects("flowerBrick"),
	createFlowerBrickArray("flowerBrick"),  //這邊複製貼上的話，常常會忘記改函示名稱
	loadJson("flowerBrick"),

		// ------------brick object--------------


	loadMarioImage("marioRedder"),
	createMarioArray("marioRedder"),
	drawObjects("fireballset"),
	createFireballArray("fireballset"),
	loadJson("fireballset"),

	// ------------powerup object--------------

	drawObjects("mushroom"),
	createMushroomArray("mushroom"),
	loadJson("mushroom"),
	drawObjects("flower"),
	createFlowerArray("flower"),
	loadJson("flower"),

		// ------------powerup object--------------
]).then(([
	screen,
	backgroundSprite,
	coinSpriteSet,coinArray,
	flycoinSprite,flycoinArray,
	turtleSpriteSet,turtleArray,
	badPlantSprite,badPlantArray,

	// ------------tube object--------------

	tubeSprite,tubeArray,tubeJson,
	highTubeSprite,highTubeArray,highTubeJson,
	highestTubeSprite,highestTubeArray,highestTubeJson,

	// ------------tube object--------------

	undergroundTubeSprite,undergroundTubeArray,undergroundTubeJson,
	undergroundBrickSprite,undergroundBrickArray,undergroundBrickJson,
	oddBrickSprite,oddBrickArray,oddBrickJson,
	goombaSpriteSet,goombaArray,

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

	marioSpriteSet,marioArray,
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
			createCoinArray("coin"),
			createFlycoinArray("flycoin"),
			createTurtleArray("badTurtle"),
			createGoombaArray("goomba"),
			createBadPlantArray("badPlant"),
			createTubeArray("tube"),
			createhighTubeArray("highTube"),
			createhighestTubeArray("highestTube"),
			createundergroundTubeArray("undergroundTube"),
			createundergroundBrickArray("undergroundBrick"),
			createOddBrickArray("oddBrick"),
		
			createPoleArray("pole"),
			createFlagArray("flag"),
			createCastleArray("highCastle"),
			createBrickArray("brick"),
			createFragmentArray("fragment"),
			createQuestionBrickArray("questionBrick"),
			createMushroomBrickArray("mushroomBrick"),		
			createFlowerBrickArray("flowerBrick"),	
			createFireballArray("fireballset"),
			createMushroomArray("mushroom"),
			createFlowerArray("flower"),
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

	// document.querySelector("#stop").addEventListener("click", function() {
	// 	start();
	// });

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
			document.querySelector("canvas").style.position  = "absolute"
			document.querySelector("canvas").style.left  = "-250px"
			document.querySelector("canvas").style.top  = "-600px"
		}else if(!marioArray[0].underGround){
			document.querySelector("canvas").style.left = "0";
			document.querySelector("canvas").style.top  = "0"
		}


		// --------end of 音樂播放----------------


		let context = myGameArea.context;

		context.clearRect(0, 0, context.canvas.width, context.canvas.height);

		for(let i = 0;i < marioArray.length;i += 1){
			if(	marioArray[i].pos.x < 450){
				context.drawImage(backgroundSprite,0,0,context.canvas.width,2160,0,0,context.canvas.width,2160);
			}else if(	marioArray[i].pos.x >= 450 && marioArray[i].pos.x < 5000) {
				context.drawImage(backgroundSprite,	marioArray[i].pos.x - 450,0,context.canvas.width,2160,0,0,context.canvas.width,2160);
			}else if(	marioArray[i].pos.x >= 5000){
				context.drawImage(backgroundSprite, 4550,0,context.canvas.width,2160,0,0,context.canvas.width,2160);
			} // 最後一行用差值來做處理，讓馬力歐在最後一段距離的時候，只有人移動，畫面不捲
			if(marioArray[i].isDie && marioArray[i].pos.y > 3600){
				restart();
			}
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
			turtleArray[j].update(screen,tubeJson,highTubeJson,highestTubeJson,marioArray[0],oddBrickJson);
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
			goombaArray[j].update(tubeJson,highTubeJson,highestTubeJson,turtleArray,marioArray[0],screen,oddBrickJson);
			let goomba = goombaArray[j];
			if(!goomba.show){
				goombaArray.splice(j,1);
				j--;
			}
			if(goombaArray.length == 0){
				break;
			}
		}

		for(let j = 0;j < badPlantArray.length;j += 1){
			badPlantArray[j].draw(context,badPlantSprite,marioArray[0]);
			badPlantArray[j].update(tubeJson,highTubeJson,highestTubeJson,marioArray[0],screen);
			let badPlant = badPlantArray[j];
			if(badPlant.hitByFire){
				badPlantArray.splice(j,1);
				j--;
			}
			if(badPlantArray.length == 0){
				break;
			}
		}	
	
		// --------------end 怪物區---------------------



		// ---------------障礙區-----------------
		
	

		for(let j = 0;j < highTubeArray.length;j += 1){
			highTubeArray[j].draw(context,highTubeSprite,marioArray[0]);
		}		


		for(let j = 0;j < oddBrickArray.length;j += 1){
			oddBrickArray[j].draw(context,oddBrickSprite,marioArray[0]);
		}	

		// ---------------end of 障礙區-----------------


	


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
			mushroomArray[j].update(marioArray[0],screen,questionBrickArray,brickJson,oddBrickJson
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
			fragmentArray[j].update(screen,brickArray,fragmentArray);
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

		
	
		for(let j = 0;j < marioArray.length;j += 1){
			marioArray[j].draw(context, marioSpriteSet,
				screen,fireballSprite,
				goombaArray,turtleArray,badPlantArray,tubeJson,highTubeJson,highestTubeJson,oddBrickJson);

			marioArray[j].update(screen,tubeJson,highTubeJson,highestTubeJson,
				poleJson,	castleJson,flagArray,brickJson,oddBrickJson,
				questionBrickJson,flowerBrickJson,mushroomBrickJson,undergroundTubeJson,undergroundBrickJson);
		}	

		for(let j = 0;j < highestTubeArray.length;j += 1){
			highestTubeArray[j].draw(context,highestTubeSprite,marioArray[0]);
		}	

		for(let j = 0;j < tubeArray.length;j += 1){
			tubeArray[j].draw(context,tubeSprite,marioArray[0]);
		}	

		for(let j = 0;j < undergroundTubeArray.length;j += 1){
			undergroundTubeArray[j].draw(context,undergroundTubeSprite,marioArray[0]);
		}	

		for(let j = 0;j < undergroundBrickArray.length;j += 1){
			undergroundBrickArray[j].draw(context,undergroundBrickSprite,marioArray[0]);
		}	;



		// -----------------文字區--------------------------

				let brickcoinPoint = questionBrickArray.filter(function (item) {
					return item.isUseLess == true;
				})
		
				let coinPoint = (31 - coinArray.length) *100

		// context.font = "30px Courier New";
		// context.fillText("Score:" + (brickcoinPoint.length*200 + coinPoint),10,50);
		

		// -----------------end of 文字區-----------------
		
	};
	startGame();
});



