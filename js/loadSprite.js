import {loadImage} from "../js/drawImage.js";
import {Sprites} from "../js/SpriteSet.js";


function loadMario() {
	return loadImage("../imgs/images/MarioRunRightSet.png")
		.then(marioStandImage=>{
			let marioStandSprite = new Sprites(marioStandImage,80,16);
			marioStandSprite.getImage("marioStand",0,0);
			return marioStandSprite;
		});
}// 一開始只畫一個馬力歐的時候用的


function loadFont() {
	return loadImage("../imgs/images/font.png")
		.then(fontImage=>{
			let fontSprite = new Sprites(fontImage,128,48);
			
			fontSprite.getTileImage("font",16,16,16,16);
			return fontSprite;
		});
}

function loadSky() {
	return loadImage("../imgs/images/sky.png")
		.then(skyImage=>{
			let skySprite = new Sprites(skyImage,16,16);
			skySprite.getTileImage("sky",0,0,16,16);
			return skySprite;
		});
}

function loadGround() {
	return loadImage("../imgs/images/underground.png")
		.then(groundImage=>{
			let groundSprite = new Sprites(groundImage,16,16);
			groundSprite.getTileImage("ground",0,0,16,16);
			return groundSprite;
		});	
}


function loadunderGround() {
	return loadImage("../imgs/images/underground/sewwerUnderground.png")
		.then(undergroundImage=>{
			let undergroundSprite = new Sprites(undergroundImage,16,16);
			undergroundSprite.getTileImage("underground",0,0,16,16);
			return undergroundSprite;
		});	
}


function loadunderSky() {
	return loadImage("../imgs/images/underground/blackBackground.png")
		.then(underskyImage=>{
			let underskySprite = new Sprites(underskyImage,16,16);
			underskySprite.getTileImage("undersky",0,0,16,16);
			return underskySprite;
		});
}

function loadunderBricks() {
	return loadImage("../imgs/images/underground/sewerBrick.png")
		.then(underbrickImage=>{
			let underbrickSprite = new Sprites(underbrickImage,16,16);
			underbrickSprite.getTileImage("undergroundBrick",0,0,16,16);  
			return underbrickSprite;
		});
}


function loadClouds() {
	return loadImage("../imgs/images/smileCloud3224.png")
		.then(cloudImage=>{
			let cloudSprite = new Sprites(cloudImage,32,24);
			cloudSprite.getTileImage("cloud",0,0,32,24);  
			return cloudSprite;
		});
}

function loadBricks() {
	return loadImage("../imgs/images/brick.png")
		.then(brickImage=>{
			let brickSprite = new Sprites(brickImage,16,16);
			brickSprite.getTileImage("brick",0,0,16,16);  
			return brickSprite;
		});
}


function loadDecorations(width,height,name,imageUrl) {
	return loadImage(`../imgs/images/background/${imageUrl}.png`)
		.then(Image=>{
			let Sprite = new Sprites(Image,width,height);
			Sprite.getTileImage(name,0,0,width,height);  
			return Sprite;
		});
}

export {loadMario,loadSky,loadGround,loadClouds,loadDecorations,loadFont,loadunderGround,loadunderSky,loadunderBricks};