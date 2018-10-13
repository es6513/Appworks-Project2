import {drawScreen,drawBackground,loadMarioImage,loadBigMarioImage,drawObjects} from "../Js/drawImage.js";
import {loadMario,loadSky,loadGround,loadTube} from "../Js/loadSprite.js";
import {loadJson} from "../Js/loadJson.js";
import {Mario} from "../Js/ObjectJs/marioObject.js";
import {Coin} from "../Js/ObjectJs/coinObject.js";
import {Flycoin} from "../Js/ObjectJs/flycoinObject.js";
import {Turtle} from "./ObjectJs/turtleObject.js";
import {Tube} from "./ObjectJs/tubeObject.js";
import {Goomba} from "./ObjectJs/goombaObject.js";
import {Pole} from "./ObjectJs/poleObject.js";
import {Flag} from "./ObjectJs/flagObject.js";
import {Castle} from "./ObjectJs/castleObject.js";
import {Brick} from "./ObjectJs/brickObject.js";
import {QuestionBrick} from "./ObjectJs/questionBrickObject.js";
import {Fireball} from "./ObjectJs/fireballObject.js";
import {Flower} from "./ObjectJs/flowerObject.js";
import {Mushroom} from "./ObjectJs/mushroomObject.js";

let windowWidth = $(window).width();
let windowHeight = $(window).height();
// const canvas = document.getElementById("cvs");
// const context = canvas.getContext("2d");
let fps = 100;

// window.onload = startGame;

// -------------------音效--------------------
let backgroundMusic = new Audio("../music/TitleBGM.mp3");

// -------------------end 音效--------------------


//-----測試區---------

function createMarioArray(name) {
	return fetch(`/marioJSON/${name}.json`)
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
	return fetch(`/marioJSON/${name}.json`)
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
	return fetch(`/marioJSON/${name}.json`)
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
	return fetch(`/marioJSON/${name}.json`)
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

function createTurtleArray(name) {
	return fetch(`/marioJSON/${name}.json`)
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
	return fetch(`/marioJSON/${name}.json`)
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
	return fetch(`/marioJSON/${name}.json`)
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
	return fetch(`/marioJSON/${name}.json`)
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
	return fetch(`/marioJSON/${name}.json`)
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
	return fetch(`/marioJSON/${name}.json`)
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
	return fetch(`/marioJSON/${name}.json`)
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

function createFireballArray(name) {
	return fetch(`/marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(fireballSprite=>{
			let fireballArray = [];
			// let fireball = new Fireball();
			// fireballArray.push(fireball);
			return fireballArray;
		});
}

function createMushroomArray(name) {
	return fetch(`/marioJSON/${name}.json`)
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
	return fetch(`/marioJSON/${name}.json`)
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


Promise.all([
	loadGround(), //產出 groundSprite, 用來傳進 mario object 處理馬力歐落地
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
	loadBigMarioImage("marioRedder"),
	loadMarioImage("marioRedder"),
	createMarioArray("marioRedder"),
	drawObjects("fireball"),
	createFireballArray("fireball"),
	loadJson("fireball"),
	drawObjects("mushroom"),
	createMushroomArray("mushroom"),
	loadJson("mushroom"),
	drawObjects("flower"),
	createFlowerArray("flower"),
	loadJson("flower"),
]).then(([
	groundSprite,
	screen,
	backgroundSprite,
	coinSpriteSet,coinArray,
	flycoinSprite,flycoinArray,
	turtleSpriteSet,turtleArray,
	tubeSpriteSet,tubeArray,tubeJson,
	goombaSpriteSet,goombaArray,
	poleSprite,poleArray,poleJson,
	flagSprite,flagArray,
	castleSprite,castleArray,castleJson,
	brickSprite,brickArray,brickJson,
	questionBrickSprite,questionBrickArray,questionBrickJson,
	BigMarioSpriteSet,marioSpriteSet,marioArray,
	fireballSprite,fireballArray,fireballJson,
	mushroomSprite,mushroomArray,mushroomJson,
	flowerSprite,flowerArray,flowerJson,])=>{
	
	//--------------------遊戲控制流程-----------------------

	function startGame() {
		marioArray = [];
		coinArray = [];
		flycoinArray = [];  //  這邊常常忘記清空。
		flagArray = [];
		turtleArray = [];
		tubeArray = [];
		goombaArray = [];
		poleArray = [];
		flagArray = [];
		castleArray = [];
		brickArray = [];
		questionBrickArray = [];
		fireballArray = [];
		mushroomArray = [];
		flowerArray = [];
		Promise.all([
			createCoinArray("coin"),
			createFlycoinArray("flycoin"),
			createTurtleArray("badTurtle"),
			createTubeArray("tube"),
			createGoombaArray("goomba"),
			createPoleArray("pole"),
			createFlagArray("flag"),
			createCastleArray("highCastle"),
			createBrickArray("brick"),
			createQuestionBrickArray("questionBrick"),
			createMarioArray("marioRedder"),
			createFireballArray("fireball"),
			createMushroomArray("mushroom"),
			createFlowerArray("flower"),
		]).then(([
			coin,
			flycoin,
			turtle,
			tube,
			goomba,
			pole,
			flag,
			castle,
			brick,
			questionBrick,
			mario,
			fireball,
			mushroom,
			flower
		])=>{
			marioArray = mario;
			flycoinArray = flycoin;
			coinArray = coin;
			turtleArray = turtle;
			tubeArray = tube;
			goombaArray = goomba;
			poleArray = pole;
			flagArray = flag;
			castleArray = castle;
			brickArray = brick;
			questionBrickArray = questionBrick;
			fireballArray = fireball;
			mushroomArray = mushroom;
			flowerArray = flower;
		});
		myGameArea.start();
	}

	let counter = 0;

	let myGameArea = {
		canvas : document.createElement("canvas"),
		start : function() {
			this.canvas.width = 4000;
			this.canvas.height = 640;
			this.context = this.canvas.getContext("2d");
			document.body.insertBefore(this.canvas, document.body.childNodes[0]);
			this.frameNo = 0;
			this.interval = setInterval(function(){
				counter++;
				let circle = counter / 100;
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

		// ------------------根據不同螢幕解析度做控制----------------------
		// if(mario.pos.x < windowWidth / 2 - 8){
		// 	context.drawImage(backgroundSprite,0,0,context.canvas.width,640,0,0,context.canvas.width,640);
		// }else if(mario.pos.x >= windowWidth / 2 - 8  && mario.pos.x < 956 + windowWidth / 2) {
		// 	context.drawImage(backgroundSprite,mario.pos.x - windowWidth / 2 + 8 ,0,context.canvas.width,640,0,0,context.canvas.width,640);
		// }else if(mario.pos.x >= (1920 - 8 + windowWidth) / 2){
		// 	context.drawImage(backgroundSprite, 964 - 8,0,context.canvas.width,640,0,0,context.canvas.width,640);
		// } // 最後一行用差值來做處理，讓馬力歐在最後一段距離的時候，只有人移動，畫面不捲
		// ------------------end 根據不同螢幕解析度做控制----------------------


		let context = myGameArea.context;
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		for(let i = 0;i < marioArray.length;i += 1){
			if(	marioArray[i].pos.x < 450){
				context.drawImage(backgroundSprite,0,0,context.canvas.width,640,0,0,context.canvas.width,640);
			}else if(	marioArray[i].pos.x >= 450 && 	marioArray[i].pos.x < 2500) {
				context.drawImage(backgroundSprite,	marioArray[i].pos.x - 450,0,context.canvas.width,640,0,0,context.canvas.width,640);
			}else if(	marioArray[i].pos.x >= 2500){
				context.drawImage(backgroundSprite, 2050,0,context.canvas.width,640,0,0,context.canvas.width,640);
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
			// if(flycoin.show == false){
			// 	flycoinArray.splice(j,1);
			// 	j--;
			// }	
			// if(flycoinArray.length == 0){
			// 	break;
			// }
		}

		for(let j = 0;j < tubeArray.length;j += 1){
			tubeArray[j].draw(context,tubeSpriteSet,marioArray[0]);
			tubeArray[j].update(marioArray[0]);
		}	
				
		for(let j = 0;j < turtleArray.length;j += 1){
			turtleArray[j].draw(context,turtleSpriteSet,marioArray[0]);
			turtleArray[j].update(screen,tubeJson,marioArray[0]);
			let turtle = turtleArray[j];
			if(turtle.isDie == true){
				turtleArray.splice(j,1);
				j--;
			}
			if(turtleArray.length == 0){
				break;
			}
		}	
			
		for(let j = 0;j < goombaArray.length;j += 1){
			goombaArray[j].draw(context,goombaSpriteSet,marioArray[0]);
			goombaArray[j].update(tubeJson,turtleArray,marioArray[0],screen);
			let goomba = goombaArray[j];
			if(goomba.isDie == true){
				goombaArray.splice(j,1);
				j--;
			}
			if(goombaArray.length == 0){
				break;
			}
		}

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
			brickArray[j].update(marioArray[0]);
		}	
	
		for(let j = 0;j < flowerArray.length;j += 1){
			flowerArray[j].draw(context,flowerSprite,marioArray[0]);
			flowerArray[j].update(marioArray[0]);
		}	

		for(let j = 0;j < mushroomArray.length;j += 1){
			mushroomArray[j].draw(context,mushroomSprite,marioArray[0]);
			mushroomArray[j].update(marioArray[0],screen,questionBrickJson);
			let mushroom = mushroomArray[j];
			if(mushroom.show == false){
				mushroomArray.splice(j,1);
				j--;
			}
			if(mushroomArray.length == 0){
				break;
			}
		}	

		for(let j = 0;j < questionBrickArray.length;j += 1){
			questionBrickArray[j].draw(context,questionBrickSprite,marioArray[0]);
			questionBrickArray[j].update(marioArray[0],mushroomArray);
		}	

		for(let j = 0;j < marioArray.length;j += 1){
			marioArray[j].draw(context, marioSpriteSet,screen,fireballSprite,goombaArray,turtleArray);
			marioArray[j].update(screen,tubeJson,poleJson,castleJson,flagArray,brickJson,questionBrickJson,brickArray);
		}	
		
		
		// marioSprite.draw("marioStand",context,mario.pos.x,mario.pos.y);
		// mario.update(screen,tubeJson,poleJson,castleJson,flagArray);
		// mario.draw(context,marioSpriteSet,screen,tubeSpriteSet,flagArray); //傳進去 marioObject

		// if(mario.pos.x > 40){
		// 	backgroundMusic.play();
		// }   
		//當馬力歐跑一定的距離之後，開始撥音樂
	};
	// animate();
	startGame();
});


// export {mario};

