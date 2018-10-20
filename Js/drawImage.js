import {Sprites} from "../Js/SpriteSet.js";
import {loadSky, loadGround,loadClouds,loadDecorations,loadunderGround,loadunderSky } from "../Js/loadSprite.js";

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

function  drawClouds(background,context,sprites) {
	background.ranges.forEach(([x1,x2,y1,y2]) => {
		for(let x = x1  ; x <= x2 ; x += 1){
			for(let y = y1 ; y <= y2 ; y += 1){
				sprites.drawTile(background.tile,context,x,y);
			}
		}
	});
}

function  drawDecorations(background,context,sprites) {
	background.ranges.forEach(([x1,x2,y1,y2]) => {
		for(let x = x1  ; x <= x2 ; x += 1){
			for(let y = y1 ; y <= y2 ; y += 1){
				sprites.drawTile(background.tile,context,x,y);
			}
		}
	});
}

function drawBackgroundObjects(name) {
	return fetch(`/marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(Sprite=> Promise.all([
			Sprite,
			loadImage(`../imgs/images/${name}.png`),
		]))
		.then(([Sprite,SpriteImage])=>{
			let SpriteSet = new Sprites(SpriteImage,Sprite.width,Sprite.height);
			Sprite.frames.forEach(spriteFrames=>{
				SpriteSet.getImage(spriteFrames.name,...spriteFrames.ranges);
			});
			return SpriteSet;
		});
}

function drawObjects(name) {
	return fetch(`/marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(Sprite=> Promise.all([
			Sprite,
			loadImage(`../imgs/images/${name}.png`),
		]))
		.then(([Sprite,SpriteImage])=>{
			let SpriteSet = new Sprites(SpriteImage,Sprite.width,Sprite.height);
			Sprite.frames.forEach(spriteFrames=>{
				SpriteSet.getImage(spriteFrames.name,...spriteFrames.ranges);
			});
			return SpriteSet;
		});
}

function loadMarioImage(name) {
	return fetch(`/marioJSON/${name}.json`)
		.then(r=>r.json())
		.then(marioSprite=> Promise.all([
			marioSprite,
			loadImage("../imgs/images/MariotSetRedderTest5.png"),
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

function loadBigMarioImage(name) {
	return fetch(`/marioJSON/${name}.json`)
		.then(r=>r.json())
		.then(marioSprite=> Promise.all([
			marioSprite,
			loadImage("../imgs/images/MariotSetRedderTest4.png"),
		]))
		.then(([marioSprite,image])=>{
			let marioSpriteSet = new Sprites(image,marioSprite.width,marioSprite.Bigheight);
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
			loadClouds(),
			loadunderSky(),
			loadunderGround(),
			loadDecorations(32,16,"smallGrass","smallGrass3216"),
			loadDecorations(48,16,"mediumGrass","mediumGrass4816"),
			loadDecorations(64,16,"bigGrass","bigGrass6416"),
			loadDecorations(48,32,"smallMountain","smallMountain4832"),
			loadDecorations(80,48,"bigMountain","bigMountain8048"),
		]))
		.then(([screen,skySprite,groundSprite,cloudSprite,
			undergroundSprite,underskySprite,
			smallGrassSprite,mediumGrassSprite,bigGrassSprite,
			smallMountainSprite,bigMountainSprite,
		])=>{	
			let backgroundSprite = document.createElement("canvas");
			backgroundSprite.width = 8000;
			backgroundSprite.height = 1080;
			drawScreen(screen.backgrounds[0],backgroundSprite.getContext("2d"),skySprite);
			drawScreen(screen.backgrounds[1],backgroundSprite.getContext("2d"),groundSprite);
			drawClouds(screen.clouds[0],backgroundSprite.getContext("2d"),cloudSprite);
			drawScreen(screen.underbackgrounds[0],backgroundSprite.getContext("2d"),undergroundSprite);
			drawScreen(screen.underbackgrounds[1],backgroundSprite.getContext("2d"),underskySprite);
		
			drawDecorations(screen.smallGrass[0],backgroundSprite.getContext("2d"),smallGrassSprite);
			drawDecorations(screen.mediumGrass[0],backgroundSprite.getContext("2d"),mediumGrassSprite);
			drawDecorations(screen.bigGrass[0],backgroundSprite.getContext("2d"),bigGrassSprite);
			drawDecorations(screen.smallMountain[0],backgroundSprite.getContext("2d"),smallMountainSprite);
			drawDecorations(screen.bigMountain[0],backgroundSprite.getContext("2d"),bigMountainSprite);
			return backgroundSprite;
		});
	;
}


export {drawScreen,loadImage,drawBackground,
	loadMarioImage,loadBigMarioImage,drawObjects,drawBackgroundObjects};