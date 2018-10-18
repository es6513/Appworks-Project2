import {drawBackground,loadMarioImage,loadBigMarioImage,drawObjects,drawBackgroundObjects} from "../Js/drawImage.js";
import {loadMario,loadSky,loadGround} from "../Js/loadSprite.js";
import {loadJson} from "../Js/loadJson.js";
import {Mario} from "../Js/ObjectJs/marioObject.js";
import {Coin} from "../Js/ObjectJs/coinObject.js";
import {Flycoin} from "../Js/ObjectJs/flycoinObject.js";
import {Turtle} from "../Js/ObjectJs/turtleObject.js";
import {Tube} from "../Js/ObjectJs/tubeObject.js";
import {HighTube} from "../Js/ObjectJs/highTubeObject.js"
import {HighestTube} from "../Js/ObjectJs/highestTubeObject.js"
import {OddBrick} from "../Js/ObjectJs/oddBrickObject.js";
import {Goomba} from "../Js/ObjectJs/goombaObject.js";
import {Pole} from "../Js/ObjectJs/poleObject.js";
import {Flag} from "../Js/ObjectJs/flagObject.js";
import {Castle} from "../Js/ObjectJs/castleObject.js";
import {Brick} from "../Js/ObjectJs/brickObject.js";
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


function createSkyArray(name) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(skySprite=>{
			let skyArray = [];
			skySprite.Pos[0].ranges.forEach(([x,y])=>{
				let sky = new Sky();
				sky.pos.set(x,y);
				skyArray.push(sky);
			});
			return skyArray;
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
			// let fireball = new Fireball();
			// fireballArray.push(fireball);
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

// let mario = new Mario();
// mario.pos.set(1000,240);   //馬力歐起始位置
// mario.speed.set(4,10);   //馬力歐起始移動速度


Promise.all([                //產出 groundSprite, 用來傳進 mario object 處理馬力歐落地
	loadJson("background"),
	drawBackground("background"),



	drawObjects("coin"),
	createCoinArray("coin"),
	drawObjects("flycoin"),
	createFlycoinArray("flycoin"),


	drawObjects("badTurtle"),
	createTurtleArray("badTurtle"),
	drawObjects("tube"),
	createTubeArray("tube"),
	loadJson("tube"),
	drawObjects("highTube"),
	createTubeArray("highTube"),
	loadJson("highTube"),
	drawObjects("highestTube"),
	createhighestTubeArray("highestTube"),
	loadJson("highestTube"),
	drawObjects("oddBrick"),
	createOddBrickArray("oddBrick"),
	loadJson("oddBrick"),
	drawObjects("goomba"),
	createGoombaArray("goomba"),


	drawObjects("pole"),
	createPoleArray("pole"),
	loadJson("pole"),
	drawObjects("flag"),
	createFlagArray("flag"),
	drawObjects("highCastle"),
	createCastleArray("highCastle"),
	loadJson("highCastle"),


	drawObjects("brick"),
	createBrickArray("brick"),
	loadJson("brick"),
	drawObjects("questionBrick"),
	createQuestionBrickArray("questionBrick"),
	loadJson("questionBrick"),
	drawObjects("mushroomBrick"),
	createQuestionBrickArray("mushroomBrick"),
	loadJson("mushroomBrick"),
	drawObjects("flowerBrick"),
	createFlowerBrickArray("flowerBrick"),  //這邊複製貼上的話，常常會忘記改函示名稱
	loadJson("flowerBrick"),


	loadBigMarioImage("marioRedder"),
	loadMarioImage("marioRedder"),
	createMarioArray("marioRedder"),
	drawObjects("fireballset"),
	createFireballArray("fireballset"),
	loadJson("fireballset"),


	drawObjects("mushroom"),
	createMushroomArray("mushroom"),
	loadJson("mushroom"),
	drawObjects("flower"),
	createFlowerArray("flower"),
	loadJson("flower"),
]).then(([
	screen,
	backgroundSprite,
	coinSpriteSet,coinArray,
	flycoinSprite,flycoinArray,
	turtleSpriteSet,turtleArray,
	tubeSprite,tubeArray,tubeJson,
	highTubeSprite,highTubeArray,highTubeJson,
	highestTubeSprite,highestTubeArray,highestTubeJson,
	oddBrickSprite,oddBrickArray,oddBrickJson,
	goombaSpriteSet,goombaArray,
	poleSprite,poleArray,poleJson,
	flagSprite,flagArray,
	castleSprite,castleArray,castleJson,
	brickSprite,brickArray,brickJson,
	questionBrickSprite,questionBrickArray,questionBrickJson,
	mushroomBrickSprite,mushroomBrickArray,mushroomBrickJson,
	flowerBrickSprite,flowerBrickArray,flowerBrickJson,
	BigMarioSpriteSet,marioSpriteSet,marioArray,
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
		highTubeArray =[];
		highestTubeArray =[];
		oddBrickArray = [];
		goombaArray = [];
		poleArray = [];
		flagArray = [];
		castleArray = [];
		brickArray = [];
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
			createTubeArray("tube"),
			createhighTubeArray("highTube"),
			createhighestTubeArray("highestTube"),
			createOddBrickArray("oddBrick"),
			createGoombaArray("goomba"),
			createPoleArray("pole"),
			createFlagArray("flag"),
			createCastleArray("highCastle"),
			createBrickArray("brick"),
			createQuestionBrickArray("questionBrick"),
			createMushroomBrickArray("mushroomBrick"),		
			createFlowerBrickArray("flowerBrick"),	
			createFireballArray("fireballset"),
			createMushroomArray("mushroom"),
			createFlowerArray("flower"),
		]).then(([
			mario,
			coin,
			flycoin,
			turtle,
			tube,
			highTube,
			highestTube,
			oddBrick,
			goomba,
			pole,
			flag,
			castle,
			brick,
			questionBrick,
			mushroomBrick,
			flowerBrick,
			fireball,
			mushroom,
			flower
		])=>{
			marioArray = mario;
			flycoinArray = flycoin;
			coinArray = coin;
			turtleArray = turtle;
			tubeArray = tube;
			highTubeArray = highTube;
			highestTubeArray = highestTube;
			oddBrickArray = oddBrick;
			goombaArray = goomba;
			poleArray = pole;
			flagArray = flag;
			castleArray = castle;
			brickArray = brick;
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
			this.canvas.height = 1080;
			this.context = this.canvas.getContext("2d");
			this.context.scale(1,1);
			document.body.insertBefore(this.canvas, document.body.childNodes[0]);
			this.frameNo = 0;
			this.interval = setInterval(function(){
				animate();
			}, 15);
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
		// 	console.log("123");
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
			}	
			marioArray[0].passSound();	
		
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
			}	
			marioArray[0].passSound();	
			
			return;
		}


		// ------------end 密技區----------


		let context = myGameArea.context;
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);

		// -----------------文字區--------------------------


	


		// -----------------end of 文字區-----------------



		for(let i = 0;i < marioArray.length;i += 1){
			if(	marioArray[i].pos.x < 450){
				context.drawImage(backgroundSprite,0,0,context.canvas.width,1080,0,0,context.canvas.width,1080);
			}else if(	marioArray[i].pos.x >= 450 && marioArray[i].pos.x < 5000) {
				context.drawImage(backgroundSprite,	marioArray[i].pos.x - 450,0,context.canvas.width,1080,0,0,context.canvas.width,1080);
			}else if(	marioArray[i].pos.x >= 5000){
				context.drawImage(backgroundSprite, 4550,0,context.canvas.width,1080,0,0,context.canvas.width,1080);
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



		// ---------------障礙區-----------------
	
		for(let j = 0;j < tubeArray.length;j += 1){
			tubeArray[j].draw(context,tubeSprite,marioArray[0]);
			tubeArray[j].update(marioArray[0]);
		}	

		for(let j = 0;j < highTubeArray.length;j += 1){
			highTubeArray[j].draw(context,highTubeSprite,marioArray[0]);
			highTubeArray[j].update(marioArray[0]);
		}	

		for(let j = 0;j < highestTubeArray.length;j += 1){
			highestTubeArray[j].draw(context,highestTubeSprite,marioArray[0]);
			highestTubeArray[j].update(marioArray[0]);
		}	


		for(let j = 0;j < oddBrickArray.length;j += 1){
			oddBrickArray[j].draw(context,oddBrickSprite,marioArray[0]);
			oddBrickArray[j].update();
		}	

		// ---------------end of 障礙區-----------------


		// --------------------怪物區---------------------
		// for(let j = 0;j < turtleArray.length;j += 1){
		// 	turtleArray[j].draw(context,turtleSpriteSet,marioArray[0]);
		// 	turtleArray[j].update(screen,tubeJson,highTubeJson,highestTubeJson,marioArray[0],oddBrickJson);
		// 	let turtle = turtleArray[j];
		// 	if(turtle.isDie){
		// 		turtleArray.splice(j,1);
		// 		j--;
		// 	}
		// 	if(turtleArray.length == 0){
		// 		break;
		// 	}
		// }	
	
			
		// for(let j = 0;j < goombaArray.length;j += 1){
		// 	goombaArray[j].draw(context,goombaSpriteSet,marioArray[0]);
		// 	goombaArray[j].update(tubeJson,highTubeJson,highestTubeJson,turtleArray,marioArray[0],screen,oddBrickJson);
		// 	let goomba = goombaArray[j];
		// 	if(!goomba.show){
		// 		goombaArray.splice(j,1);
		// 		j--;
		// 	}
		// 	if(goombaArray.length == 0){
		// 		break;
		// 	}
		// }

		// --------------end 怪物區---------------------

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
			castleArray[j].update(marioArray[0]);
		}	

		for(let j = 0;j < brickArray.length;j += 1){
			brickArray[j].draw(context,brickSprite,marioArray[0]);
			brickArray[j].update(marioArray[0],brickJson);
		}	
	
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

		for(let j = 0;j < mushroomBrickArray.length;j += 1){
			mushroomBrickArray[j].draw(context,mushroomBrickSprite,marioArray[0]);
			mushroomBrickArray[j].update(marioArray[0],mushroomArray,mushroomBrickArray);
		}	

		for(let j = 0;j < flowerBrickArray.length;j += 1){
			flowerBrickArray[j].draw(context,flowerBrickSprite,marioArray[0]);
			flowerBrickArray[j].update(marioArray[0],flowerArray,flowerBrickArray);
		}	


		// for(let j = 0;j < questionBrickArray.length;j += 1){
		// 	questionBrickArray[j].draw(context,questionBrickSprite,marioArray[0]);
		// 	questionBrickArray[j].update(marioArray[0],flycoinArray,questionBrickArray);
		// }	

		for(let j = 0;j < marioArray.length;j += 1){
			marioArray[j].draw(context, marioSpriteSet,
				screen,fireballSprite,
				goombaArray,turtleArray,tubeJson,highTubeJson,highestTubeJson,oddBrickJson);

			marioArray[j].update(screen,tubeJson,highTubeJson,highestTubeJson,
				poleJson,	castleJson,flagArray,brickJson,oddBrickJson,
				questionBrickJson,flowerBrickJson,mushroomBrickJson);
		}	


		// if(mario.pos.x > 40){
		// 	backgroundMusic.play();
		// }   
		//當馬力歐跑一定的距離之後，開始撥音樂
	};
	// animate();
	startGame();
});


// export {mario};

