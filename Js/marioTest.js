import {drawScreen,drawBackground,loadMarioImage,drawObjects} from "../Js/drawImage.js";
import {loadMario,loadSky,loadGround,loadTube} from "../Js/loadSprite.js";
import {loadJson} from "../Js/loadJson.js";
import {Mario} from "../Js/ObjectJs/marioObject.js";
import {Coin} from "../Js/ObjectJs/coinObject.js";
import {Turtle} from "./ObjectJs/turtleObject.js";
import {Tube} from "./ObjectJs/tubeObject.js";
import {Goomba} from "./ObjectJs/goombaObject.js";
import {Pole} from "./ObjectJs/poleObject.js";
import {Flag} from "./ObjectJs/flagObject.js";
import {Castle} from "./ObjectJs/castleObject.js";

let windowWidth = $(window).width();
let windowHeight = $(window).height();
const canvas = document.getElementById("cvs");
const context = canvas.getContext("2d");
let fps = 100;
let backgroundDOM = document.getElementById("background");


// -------------------音效--------------------
let backgroundMusic = new Audio("../music/TitleBGM.mp3");



// -------------------end 音效--------------------

//-----測試區---------


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



//-------測試區---------

let mario = new Mario();
mario.pos.set(1740,160);   //馬力歐起始位置
mario.speed.set(4,2);   //馬力歐起始移動速度
let coinSound = new Audio("/music/mario-coin-sound.wav");



function promise() {
	Promise.all([
		loadGround(), //產出 groundSprite, 用來傳進 mario object 處理馬力歐落地
		loadJson("background"),
		loadMarioImage("marioRedder"),
		drawBackground("background"),
		drawObjects("coin"),
		createCoinArray("coin"),
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
	]).then(([
		groundSprite,
		screen,
		marioSpriteSet,
		backgroundSprite,
		coinSpriteSet,coinArray,
		turtleSpriteSet,turtleArray,
		tubeSpriteSet,tubeArray,tubeJson,
		goombaSpriteSet,goombaArray,
		poleSprite,poleArray,poleJson,
		flagSprite,flagArray,
		castleSprite,castleArray,castleJson])=>{
	
		function animate() {
			setTimeout(function() {
				requestAnimationFrame(animate);

				// your draw() stuff goes here

			}, 1000 / fps);
			// requestAnimationFrame(animate);
			context.clearRect(0,0, context.canvas.width, context.canvas.height);

			// if(mario.isDie){
			// 	setTimeout(function() {
			// 		window.location.reload();
			// 	},3000);
			// } //重刷整個瀏覽器，看有沒有更好的方式解決

			// ------------------根據不同螢幕解析度做控制----------------------
			// if(mario.pos.x < windowWidth / 2 - 8){
			// 	context.drawImage(backgroundSprite,0,0,context.canvas.width,640,0,0,context.canvas.width,640);
			// }else if(mario.pos.x >= windowWidth / 2 - 8  && mario.pos.x < 956 + windowWidth / 2) {
			// 	context.drawImage(backgroundSprite,mario.pos.x - windowWidth / 2 + 8 ,0,context.canvas.width,640,0,0,context.canvas.width,640);
			// }else if(mario.pos.x >= (1920 - 8 + windowWidth) / 2){
			// 	context.drawImage(backgroundSprite, 964 - 8,0,context.canvas.width,640,0,0,context.canvas.width,640);
			// } // 最後一行用差值來做處理，讓馬力歐在最後一段距離的時候，只有人移動，畫面不捲
			// ------------------end 根據不同螢幕解析度做控制----------------------
			
			
			if(mario.pos.x < 450){
				context.drawImage(backgroundSprite,0,0,context.canvas.width,640,0,0,context.canvas.width,640);
			}else if(mario.pos.x >= 450 && mario.pos.x < 1600) {
				context.drawImage(backgroundSprite,mario.pos.x - 450,0,context.canvas.width,640,0,0,context.canvas.width,640);
			}else if(mario.pos.x >= 1600){
				context.drawImage(backgroundSprite, 1150,0,context.canvas.width,640,0,0,context.canvas.width,640);
			} // 最後一行用差值來做處理，讓馬力歐在最後一段距離的時候，只有人移動，畫面不捲
				
			for(let j = 0;j < coinArray.length;j += 1){
				coinArray[j].draw(context,coinSpriteSet);
				coinArray[j].update();
			}

			for(let j = 0;j < tubeArray.length;j += 1){
				tubeArray[j].draw(context,tubeSpriteSet);
				tubeArray[j].update();
			}	
				
			for(let j = 0;j < turtleArray.length;j += 1){
				turtleArray[j].draw(context,turtleSpriteSet);
				turtleArray[j].update(screen,tubeSpriteSet,turtleSpriteSet,tubeJson);
			}	
			
			for(let j = 0;j < goombaArray.length;j += 1){
				goombaArray[j].draw(context,goombaSpriteSet);
				goombaArray[j].update(tubeJson,turtleArray);
			}

			for(let j = 0;j < poleArray.length;j += 1){
				poleArray[j].draw(context,poleSprite);
				poleArray[j].update();
			}

			for(let j = 0;j < flagArray.length;j += 1){
				flagArray[j].draw(context,flagSprite);
				flagArray[j].update(poleJson);
			}	
			
			for(let j = 0;j < castleArray.length;j += 1){
				castleArray[j].draw(context,castleSprite);
				castleArray[j].update();
			}		

			// marioSprite.draw("marioStand",context,mario.pos.x,mario.pos.y);
			mario.update(screen,tubeJson,poleJson,castleJson,flagArray);
			mario.draw(context,marioSpriteSet,screen,tubeSpriteSet); //傳進去 marioObject

			// if(mario.pos.x > 40){
			// 	backgroundMusic.play();
			// }   
			//當馬力歐跑一定的距離之後，開始撥音樂
		};
		animate();
	});
}


promise();


export {mario};

