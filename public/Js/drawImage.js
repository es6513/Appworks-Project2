import {Sprites} from "../Js/SpriteSet.js";
import {loadSky, loadGround,loadClouds,loadDecorations,loadunderGround,loadunderSky,loadunderBricks } from "../Js/loadSprite.js";

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
		.then(backgroundJson=> Promise.all([
			backgroundJson,
			loadSky(),
			loadGround(),
			loadClouds(),
			loadunderSky(),
			loadunderGround(),
			loadunderBricks(),
			loadDecorations(32,16,"smallGrass","smallGrass3216"),
			loadDecorations(48,16,"mediumGrass","mediumGrass4816"),
			loadDecorations(64,16,"bigGrass","bigGrass6416"),
			loadDecorations(48,32,"smallMountain","smallMountain4832"),
			loadDecorations(80,48,"bigMountain","bigMountain8048"),
		]))
		.then(([backgroundJson,skySprite,groundSprite,cloudSprite,
			undergroundSprite,underskySprite,undergroundBrickSprite,
			smallGrassSprite,mediumGrassSprite,bigGrassSprite,
			smallMountainSprite,bigMountainSprite,
		])=>{	
			let backgroundSprite = document.createElement("canvas");
			backgroundSprite.width = 8000;
			backgroundSprite.height = 2160;
			drawScreen(backgroundJson.backgrounds[0],backgroundSprite.getContext("2d"),skySprite);
			drawScreen(backgroundJson.backgrounds[1],backgroundSprite.getContext("2d"),groundSprite);
			drawClouds(backgroundJson.clouds[0],backgroundSprite.getContext("2d"),cloudSprite);
			drawScreen(backgroundJson.underbackgrounds[0],backgroundSprite.getContext("2d"),undergroundSprite);
			drawScreen(backgroundJson.underbackgrounds[1],backgroundSprite.getContext("2d"),underskySprite);
			drawScreen(backgroundJson.underbackgrounds[2],backgroundSprite.getContext("2d"),undergroundBrickSprite);

			drawDecorations(backgroundJson.smallGrass[0],backgroundSprite.getContext("2d"),smallGrassSprite);
			drawDecorations(backgroundJson.mediumGrass[0],backgroundSprite.getContext("2d"),mediumGrassSprite);
			drawDecorations(backgroundJson.bigGrass[0],backgroundSprite.getContext("2d"),bigGrassSprite);
			drawDecorations(backgroundJson.smallMountain[0],backgroundSprite.getContext("2d"),smallMountainSprite);
			drawDecorations(backgroundJson.bigMountain[0],backgroundSprite.getContext("2d"),bigMountainSprite);
			return backgroundSprite;
		});
	;
}


export {drawScreen,loadImage,drawBackground,
	loadMarioImage,loadBigMarioImage,drawObjects,drawBackgroundObjects};