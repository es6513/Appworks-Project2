import {Sprites} from "../SpriteSet.js";
import {loadSky, loadGround,loadCoin,loadTube } from "../loadSprite.js";

function  drawScreen(background,context,sprites) {
	background.ranges.forEach(([x1,x2,y1,y2]) => {
		for(let x = x1  ; x < x2 ; x += 1){
			for(let y = y1 ; y < y2 ; y += 1){
				sprites.drawTile(background.tile,context,x,y);
			}
		}
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

function loadImage(src){
	return new Promise(resolve=>{
		let image = new Image();	
		image.addEventListener("load",()=>{
			resolve (image);
		});
		image.src = src;
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
		]))
		.then(([screen,skySprite,groundSprite,tubeSprite,coinSprite])=>{	
			let backgroundSprite = document.createElement("canvas");
			backgroundSprite.width = 2000;
			backgroundSprite.height = 640;
			drawScreen(screen.backgrounds[0],backgroundSprite.getContext("2d"),skySprite);
			drawScreen(screen.backgrounds[1],backgroundSprite.getContext("2d"),groundSprite);
			drawTubes(screen.tubes[1],backgroundSprite.getContext("2d"),tubeSprite);
			return backgroundSprite;
		});
	;
}

function loadMarioImage(name) {
	return fetch(`/marioJSON/${name}.json`)
		.then(r=>r.json())
		.then(marioSprite=> Promise.all([
			marioSprite,
			loadImage("../imgs/images/MarioRunRightSet.png"),
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

export {loadImage,drawBackground,loadMarioImage,drawTubes};