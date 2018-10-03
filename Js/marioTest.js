import {drawScreen,drawBackground,loadMarioImage,drawCoin,drawTurtle} from "../Js/drawImage.js";
import {loadMario,loadSky,loadGround,loadTube} from "../Js/loadSprite.js";
import {loadJson} from "../Js/loadJson.js";
import {Mario} from "../Js/marioObject.js";
import {Coin} from "../Js/coinObject.js";
import {Turtle} from "../Js/turtleObject.js";
import {Viewport} from "../Js/viewport.js";



const canvas = document.getElementById("cvs");
const context = canvas.getContext("2d");

// let tubeImage = loadImage("../imgs/images/tube.png");

// tubeImage.addEventListener("load",function () {
// 	let groundSprite = new Sprites(tubeImage,16,32);
// 	groundSprite.getImage("tube");
// 	groundSprite.draw("tube",context,16,16);
// });

// class Layers{
// 	constructor(){
// 		this.layers = [];
// 	}

// 	draw(context){
// 		this.layers.forEach(layer=>{
// 			layer(context);
// 		});
// 	};
// }
// function createBackgroundLayer(backgrounds,sprites) {
// 	let backgroundSprite = document.createElement("canvas");
// 	backgroundSprite.width = 640;
// 	backgroundSprite.height = 640;
// 	drawScreen(backgrounds[0],backgroundSprite.getContext("2d"),skySprite);
// 	drawScreen(backgrounds[1],backgroundSprite.getContext("2d"),groundSprite);
// 	return function drawBackgroundLayer(context) {
// 		context.drawImage(backgroundSprite,0,0);
// 	};

//-----測試區---------

let backgroundMusic = new Audio("../music/TitleBGM.mp3");

function createCoinArray(name) {
	return fetch(`/marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(coinsSprite=>{
			let coinArray = [];
			coinsSprite.coinPos[0].ranges.forEach(([x,y])=>{
				let coin = new Coin();
				coin.pos.set(x,y);
				coinArray.push(coin);
			});
			return coinArray;
		});
}

function createTurtleArray(name) {
	return fetch(`/marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(turtleSprite=>{
			let turtleArray = [];
			turtleSprite.turtlePos[0].ranges.forEach(([x,y])=>{
				let turtle = new Turtle();
				turtle.pos.set(x,y);
				turtleArray.push(turtle);
			});
			return turtleArray;
		});
}

//-------測試區---------

let mario = new Mario();
mario.pos.set(0,16 * 13);   //馬力歐起始位置
mario.speed.set(4,2);   //馬力歐起始移動速度
		
function promise() {
	Promise.all([
		loadSky(),  //產出 skySprite, 目前沒用，已整合至 loadBackground
		loadGround(), //產出 groundSprite, 目前沒用，已整合至 loadBackground
		loadJson("background"),
		// loadMario(),  // 一開始只畫一個馬力歐的時候用的
		loadMarioImage("mario"),
		loadTube("background"),
		drawBackground("background"),
		drawCoin("coin"),
		createCoinArray("coin"),
		drawTurtle("turtle"),
		createTurtleArray("turtle")
	]).then(([
		skySprite,groundSprite,
		screen,
		marioSpriteSet,
		tubeSprite,
		backgroundSprite,
		coinSpriteSet,coinArray,
		turtleSpriteSet,turtleArray])=>{
		function animate() {
			requestAnimationFrame(animate);
			context.clearRect(0,0, context.canvas.width, context.canvas.height);

			if(mario.pos.x < 450){
				context.drawImage(backgroundSprite,0,0,context.canvas.width,640,0,0,context.canvas.width,640);
			}else if(mario.pos.x >= 450 && mario.pos.x < 1600) {
				context.drawImage(backgroundSprite,mario.pos.x - 450,0,context.canvas.width,640,0,0,context.canvas.width,640);
			}else if(mario.pos.x >= 1600){
				context.drawImage(backgroundSprite, 1150,0,context.canvas.width,640,0,0,context.canvas.width,640);
			} // 最後一行用差值來做處理，讓馬力歐在最後一段距離的時候，只有人移動，畫面不捲
			//原本是用這一個控制捲動，目前是超過200才開始捲
			// context.drawImage(backgroundSprite,mario.pos.x - 200,0,context.canvas.width,640,0,0,context.canvas.width,640);
			for(let j = 0;j < coinArray.length;j += 1){
				coinArray[j].draw(context,coinSpriteSet);
				coinArray[j].update();
			}

			for(let j = 0;j < turtleArray.length;j += 1){
				turtleArray[j].draw(context,turtleSpriteSet);
				turtleArray[j].update(screen,tubeSprite,turtleSpriteSet);
			}		
			// marioSprite.draw("marioStand",context,mario.pos.x,mario.pos.y);
			mario.update(screen,tubeSprite,marioSpriteSet,groundSprite);
			mario.draw(context,marioSpriteSet,screen,tubeSprite); //傳進去 marioObject
			
			// if(mario.pos.x > 40){
			// 	backgroundMusic.play();
			// }   
			//當馬力歐跑一定的距離之後，開始撥音樂
		};
	
		animate();
		
	});
}

promise();

export {promise,mario};
// Promise.all([
// 	loadSky(),  //產出 skySprite, 目前沒用，已整合至 loadBackground
// 	loadGround(), //產出 groundSprite, 目前沒用，已整合至 loadBackground
// 	// loadMario(),  // 一開始只畫一個馬力歐的時候用的
// 	loadMarioImage("mario"),
// 	loadBackground("background",0)
// ]).then(([skySprite,groundSprite,marioSpriteSet,backgroundSprite])=>{
// 	// let backgroundSprite = document.createElement("canvas");
// 	// backgroundSprite.width = 640;
// 	// backgroundSprite.height = 640;
// 	// drawScreen(screen.backgrounds[0],backgroundSprite.getContext("2d"),skySprite);
// 	// drawScreen(screen.backgrounds[1],backgroundSprite.getContext("2d"),groundSprite);
	
// 	let mario = new Mario();
// 	mario.pos.set(16 * 12,16 * 13);   //馬力歐起始位置
// 	mario.speed.set(2,1.5);   //馬力歐起始移動速度
	
// 	function update() {
// 		context.drawImage(backgroundSprite,0,0);
		
// 		// marioSprite.draw("marioStand",context,mario.pos.x,mario.pos.y);
// 		requestAnimationFrame(update);
// 		mario.update();

// 		mario.draw(context,marioSpriteSet); //傳進去 marioObject

// 	}

// 	update();
	
// });


// Promise.all([
// 	loadSky(),
// 	loadGround(),
// 	loadBackground("background")
// ]).then(([skySprite,groundSprite,screen])=>{
// 	console.log(screen);
// 	drawScreen(screen.backgrounds[0],context,skySprite);
// });

// let skyImage = loadImage("../imgs/images/sky.png");
// skyImage.addEventListener("load",function () {
// 	let skySprite = new Sprites(skyImage,16,16);
// 	skySprite.getImage("sky"); 
// 	drawAbles[0].push(skySprite);
// 	// loadBackground("background")
// 	// 	.then(sky =>{
// 	// 		console.log(sky);
// 	// 		drawScreen(sky.backgrounds[0],context,skySprite);
// 	// 	});
// });

// let groundImage = loadImage("../imgs/images/underground.png");
// groundImage.addEventListener("load",function () {
// 	let groundSprite = new Sprites(groundImage,16,16);
// 	groundSprite.getImage("ground");
// 	drawAbles[0].push(groundSprite);

// 	// loadBackground("background")
// 	// 	.then(ground =>{
// 	// 		drawScreen(ground.backgrounds[1],context,groundSprite);
// 	// 	});
// });

// let marioImage = loadImage("../imgs/images/R_mario_stand.png");
// marioImage.addEventListener("load",function () {
// 	let marioSprite = new Sprites(marioImage,16,16);
// 	marioSprite.getImage("mario");
// 	// marioSprite.draw("mario",context,0,0);	
// 	drawAbles.push(marioSprite);
// 	// drawAbles[0].draw("sky",context,0,0);
// 	for(let i = 0 ;i < drawAbles.length ;i += 1){
// 		for(let j = 0;j < drawAbles[0].length;j += 1){
// 			loadBackground("background")
// 				.then(level =>{
// 					drawScreen(level.backgrounds[i],context, drawAbles[0][i]);
// 				});
// 		}
// 	}	

// 	// marioSprite.draw("mario",context,0,0);	
	

// 	// .then(drawAbles[drawAbles.length - 1].draw("mario",context,0,0));
		
// 	// console.log(drawAbles[i]);
// 	// let tiles = drawAbles[i].tiles; 
// 	// console.log(tiles);
// 	// let mapIter = tiles.keys();
// 	// console.log(mapIter.next().value);

// 	// console.log(drawAbles);
// 	// drawAbles[i].draw("sky",context,0,0);
		
	
// });	

