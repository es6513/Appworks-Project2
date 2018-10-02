import {loadImage} from "../Js/drawImage.js";
import {Sprites} from "../Js/SpriteSet.js";


function loadMario() {
	return loadImage("../imgs/images/MarioRunRightSet.png")
		.then(marioStandImage=>{
			let marioStandSprite = new Sprites(marioStandImage,80,16);
			marioStandSprite.getImage("marioStand",0,0);
			return marioStandSprite;
		});
}// 一開始只畫一個馬力歐的時候用的

function loadSky() {
	return loadImage("../imgs/images/sky.png")
		.then(skyImage=>{
			let skySprite = new Sprites(skyImage,16,16);
			skySprite.getTileImage("sky",0,0);
			return skySprite;
		});
}

function loadGround() {
	return loadImage("../imgs/images/underground.png")
		.then(groundImage=>{
			let groundSprite = new Sprites(groundImage,16,16);
			groundSprite.getTileImage("ground",0,0);
			return groundSprite;
		});	
}

function loadClouds() {
	return loadImage("../imgs/images/smileCloud3224.png")
		.then(cloudImage=>{
			let cloudSprite = new Sprites(cloudImage,32,24);
			cloudSprite.getTileImage("cloud",0,0);  
			return cloudSprite;
		});
}


function loadTube() {
	return loadImage("../imgs/images/tube.png")
		.then(tubeImage=>{
			let tubeSprite = new Sprites(tubeImage,32,32);
			tubeSprite.getImage("tube",0,0);
			return tubeSprite;
		});
}

export {loadMario,loadSky,loadGround,loadTube,loadClouds};