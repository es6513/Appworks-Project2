import {Sprites} from "../Js/SpriteSet.js";
import {loadSky, loadGround,loadTube,loadClouds } from "../Js/loadSprite.js";
import {Coin} from "../Js/coinObject.js";



// 用來畫不會動背景的部分
function  drawScreen(background,context,sprites) {
	background.ranges.forEach(([x1,x2,y1,y2]) => {
		for(let x = x1  ; x <= x2 ; x += 1){
			for(let y = y1 ; y <= y2 ; y += 1){
				sprites.drawTile(background.tile,context,x,y);
			}
		}
	});
}

function loadImage(src){
	return new Promise(resolve=>{
		let image = new Image();	
		image.addEventListener("load",()=>{
			resolve (image);
		});
		image.src = src;
	});
}

function  drawTubes(background,context,sprites) {
	background.ranges.forEach(([x1,x2,y1,y2]) => {
		for(let x = x1  ; x < x2 ; x += 1){
			for(let y = y1 ; y < y2 ; y += 1){
				sprites.drawTile(background.tile,context,x,y);
			}
		}
	});
}

function  drawClouds(background,context,sprites) {
	background.ranges.forEach(([x1,x2,y1,y2]) => {
		for(let x = x1  ; x <= x2 ; x += 1){
			for(let y = y1 ; y <= y2 ; y += 1){
				sprites.drawTile(background.tile,context,x,y);
			}
		}
	});
}

function drawCoin(name) {
	return fetch(`/marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(coinsSprite=> Promise.all([
			coinsSprite,
			loadImage("../imgs/images/coinset.png"),
		]))
		.then(([coinsSprite,coinSpriteImage])=>{
			let coinSpriteSet = new Sprites(coinSpriteImage,coinsSprite.width,coinsSprite.height);
			coinsSprite.frames.forEach(spriteFrames=>{
				coinSpriteSet.getImage(spriteFrames.name,...spriteFrames.ranges);
			});
			return coinSpriteSet;
		});
}

function drawTurtle(name) {
	return fetch(`/marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(turtlesSprite=> Promise.all([
			turtlesSprite,
			loadImage("../imgs/images/badTurtle.png"),
		]))
		.then(([turtlesSprite,turtleSpriteImage])=>{
			let turtleSpriteSet = new Sprites(turtleSpriteImage,turtlesSprite.width,turtlesSprite.height);
			turtlesSprite.frames.forEach(spriteFrames=>{
				turtleSpriteSet.getImage(spriteFrames.name,...spriteFrames.ranges);
			});
			return turtleSpriteSet;
		});
}

function loadMarioImage(name) {
	return fetch(`/marioJSON/${name}.json`)
		.then(r=>r.json())
		.then(marioSprite=> Promise.all([
			marioSprite,
			loadImage("../imgs/images/MarioRunRightSetTest.png"),
		]))
		.then(([marioSprite,image])=>{
			let marioSpriteSet = new Sprites(image,marioSprite.width,marioSprite.height);
			marioSprite.frames.forEach(spriteFrames=>{
				marioSpriteSet.getImage(spriteFrames.name,...spriteFrames.ranges);
			});

			// 傳遞順序: loadImage.js 呼叫 SpriteSet.js 的 getImage
			// => marioTest.js 呼叫 marioObject.js 的 mario.draw()方法

			return marioSpriteSet;
		});
}

function drawBackground(name) {
	return fetch(`/marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(screen=> Promise.all([
			screen,
			loadSky(),
			loadGround(),
			loadTube(),
			loadClouds()
		]))
		.then(([screen,skySprite,groundSprite,tubeSprite,cloudSprite])=>{	
			let backgroundSprite = document.createElement("canvas");
			backgroundSprite.width = 2500;
			backgroundSprite.height = 640;
			drawScreen(screen.backgrounds[0],backgroundSprite.getContext("2d"),skySprite);
			drawScreen(screen.backgrounds[1],backgroundSprite.getContext("2d"),groundSprite);
			drawTubes(screen.tubes[0],backgroundSprite.getContext("2d"),tubeSprite);
			drawClouds(screen.clouds[0],backgroundSprite.getContext("2d"),cloudSprite);
			return backgroundSprite;
		});
	;
}



export {drawScreen,loadImage,drawBackground,loadMarioImage,drawTubes,drawCoin,drawTurtle};