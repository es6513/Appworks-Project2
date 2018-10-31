import {drawBackground,loadMarioImage,drawObjects} from "../Js/drawImage.js";
import {loadJson} from "../Js/loadJson.js";
import {Mario} from "../Js/ObjectJs/marioObject.js";
import {Coin} from "../Js/ObjectJs/coinObject.js";
import {Flycoin} from "../Js/ObjectJs/flycoinObject.js";
import {Tube} from "../Js/ObjectJs/tubeObject.js";
import {HighTube} from "../Js/ObjectJs/highTubeObject.js";
import {HighestTube} from "../Js/ObjectJs/highestTubeObject.js";
import {UndergroundTube} from "../Js/ObjectJs/undergroundTubeObject.js";
import {UndergroundBrick} from "../Js/ObjectJs/undergroundBrickObject.js";
import {OddBrick} from "../Js/ObjectJs/oddBrickObject.js";
import {Turtle} from "../Js/ObjectJs/turtleObject.js";
import {Goomba} from "../Js/ObjectJs/goombaObject.js";
import {BadPlant} from "../Js/ObjectJs/badPlantObject.js";
import {Pole} from "../Js/ObjectJs/poleObject.js";
import {Flag} from "../Js/ObjectJs/flagObject.js";
import {Castle} from "../Js/ObjectJs/castleObject.js";
import {Brick} from "../Js/ObjectJs/brickObject.js";
import {Fragment} from "../Js/ObjectJs/fragmentObject.js";
import {QuestionBrick} from "../Js/ObjectJs/questionBrickObject.js";
import {MushroomBrick} from "../Js/ObjectJs/mushroomBrickObject.js";
import {FlowerBrick} from "../Js/ObjectJs/flowerBrickObject.js";
import {Flower} from "../Js/ObjectJs/flowerObject.js";
import {Mushroom} from "../Js/ObjectJs/mushroomObject.js";
import {keys} from "../Js/keyEvent.js";
import { Fireball } from "./ObjectJs/fireballObject.js";
let snippet = new Array();
let firesnippet = new Array();

// let canvas = document.querySelector("#cvs");
// let context = canvas.getContext("2d");


let fps = 100;

// ----------------裝置偵測------------------------

let device = document.querySelector("#deviceDetect");
let isMobile = false;

function deviceDetect() {
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
		isMobile = true;
	}
}
deviceDetect();

// ---------------開頭畫面---------------
// if(!isMobile){
// 	device.style.width = "100%";
// 	device.style.height = "100%";
// 	device.style.backgroundColor = "black";
// }

// ---------------開頭畫面---------------

// ------------end 裝置測試-----------------------

// -------------------音效--------------------
let backgroundMusic = new Audio("../music/TitleBGM.mp3");

let undergroundMuscic = new Audio("../music/underworld.mp3");
let powerupSound = new Audio("/music/maro-powerup-sound.wav");

// -------------------end 音效--------------------

export function createObjectArray(name,objectName) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then(Sprite=>{
			let objectArray = [];
			Sprite.Pos[0].ranges.forEach(([x,y])=>{
				let object = new objectName();
				object.pos.set(x,y);
				objectArray.push(object);
			});
			return objectArray;
		});
}

export function sum(a, b) {
	return a + b;
}

export function createMarioArray(name) {
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


//-------測試區---------

Promise.all([ 
	loadMarioImage("marioRedder"),
	createMarioArray("marioRedder"),
	loadJson("background"),
	drawBackground("background"),

	drawObjects("coin"),
	createObjectArray("coin",Coin),
	drawObjects("flycoin"),
	createObjectArray("flycoin",Flycoin),

	//------------Monster Object------------
	drawObjects("badTurtle"),
	createObjectArray("badTurtle",Turtle),
	drawObjects("goomba"),
	createObjectArray("goomba",Goomba),
	drawObjects("badPlant"),
	createObjectArray("badPlant",BadPlant),

	// ------------tube object--------------

	drawObjects("tube"),
	createObjectArray("tube",Tube),
	loadJson("tube"),
	drawObjects("highTube"),
	createObjectArray("highTube",HighTube),
	loadJson("highTube"),
	drawObjects("highestTube"),
	createObjectArray("highestTube",HighestTube),
	loadJson("highestTube"),

	// ------------tube object--------------


	drawObjects("undergroundTube"),
	createObjectArray("undergroundTube",UndergroundTube),
	loadJson("undergroundTube"),
	drawObjects("undergroundBrick"),
	createObjectArray("undergroundBrick",UndergroundBrick),
	loadJson("undergroundBrick"),
	drawObjects("oddBrick"),
	createObjectArray("oddBrick",OddBrick),
	loadJson("oddBrick"),

	// ------------final object--------------
	drawObjects("pole"),
	createObjectArray("pole",Pole),
	loadJson("pole"),
	drawObjects("flag"),
	createObjectArray("flag",Flag),
	drawObjects("highCastle"),
	createObjectArray("highCastle",Castle),
	loadJson("highCastle"),

	// ------------final object--------------


	// ------------brick object--------------

	drawObjects("brick"),
	createObjectArray("brick",Brick),
	loadJson("brick"),
	drawObjects("fragment"),
	createObjectArray("fragment",Fragment),
	loadJson("fragment"),
	drawObjects("questionBrick"),
	createObjectArray("questionBrick",QuestionBrick),
	loadJson("questionBrick"),
	drawObjects("mushroomBrick"),
	createObjectArray("mushroomBrick",MushroomBrick),
	loadJson("mushroomBrick"),
	drawObjects("flowerBrick"),
	createObjectArray("flowerBrick",FlowerBrick),  //這邊複製貼上的話，常常會忘記改函示名稱
	loadJson("flowerBrick"),

	// ------------brick object--------------

	drawObjects("fireballset"),
	createObjectArray("fireballset",Fireball),
	loadJson("fireballset"),

	// ------------powerup object--------------

	drawObjects("mushroom"),
	createObjectArray("mushroom",Mushroom),
	loadJson("mushroom"),
	drawObjects("flower"),
	createObjectArray("flower",Flower),
	loadJson("flower"),

	// ------------powerup object--------------
]).then(([
	marioSpriteSet,marioArray,
	backgroundJson,
	backgroundSprite,
	coinSpriteSet,coinArray,
	flycoinSprite,flycoinArray,
	turtleSpriteSet,turtleArray,
	goombaSpriteSet,goombaArray,
	badPlantSprite,badPlantArray,

	// ------------tube object--------------

	tubeSprite,tubeArray,tubeJson,
	highTubeSprite,highTubeArray,highTubeJson,
	highestTubeSprite,highestTubeArray,highestTubeJson,

	// ------------tube object--------------

	undergroundTubeSprite,undergroundTubeArray,undergroundTubeJson,
	undergroundBrickSprite,undergroundBrickArray,undergroundBrickJson,
	oddBrickSprite,oddBrickArray,oddBrickJson,

	//------Final object-------

	poleSprite,poleArray,poleJson,
	flagSprite,flagArray,
	castleSprite,castleArray,castleJson,

	//------Final object-------

	// ------brick object-------

	brickSprite,brickArray,brickJson,
	fragmentSprite,fragmentArray,fragmentJson,
	questionBrickSprite,questionBrickArray,questionBrickJson,
	mushroomBrickSprite,mushroomBrickArray,mushroomBrickJson,
	flowerBrickSprite,flowerBrickArray,flowerBrickJson,

	// ------brick object-------

	fireballSprite,fireballArray,fireballJson,
	mushroomSprite,mushroomArray,mushroomJson,
	flowerSprite,flowerArray,flowerJson])=>{
	
	//--------------------遊戲控制流程-----------------------

	function startGame() {
		marioArray = [];
		coinArray = [];
		flycoinArray = [];  //  這邊常常忘記清空。
		turtleArray = [];
		badPlantArray = [];
		flagArray = [];
		tubeArray = [];
		highTubeArray = [];
		highestTubeArray = [];
		undergroundTubeArray = [];
		undergroundBrickArray = [];
		oddBrickArray = [];
		goombaArray = [];
		poleArray = [];
		flagArray = [];
		castleArray = [];
		brickArray = [];
		fragmentArray = [];
		questionBrickArray = [];
		mushroomBrickArray = [];
		flowerBrickArray = [];
		flowerArray = [];
		fireballArray = [];
		mushroomArray = [];
		flowerArray = [];
		Promise.all([
			createMarioArray("marioRedder"),
			createObjectArray("coin",Coin),
			createObjectArray("flycoin",Flycoin),
			createObjectArray("badTurtle",Turtle),
			createObjectArray("goomba",Goomba),
			createObjectArray("badPlant",BadPlant),
			createObjectArray("tube",Tube),
			createObjectArray("highTube",HighTube),
			createObjectArray("highestTube",HighestTube),
			createObjectArray("undergroundTube",UndergroundTube),
			createObjectArray("undergroundBrick",UndergroundBrick),
			createObjectArray("oddBrick",OddBrick),
		
			createObjectArray("pole",Pole),
			createObjectArray("flag",Flag),
			createObjectArray("highCastle",Castle),
			createObjectArray("brick",Brick),
			createObjectArray("fragment",Fragment),
			createObjectArray("questionBrick",QuestionBrick),
			createObjectArray("mushroomBrick",MushroomBrick),	
			createObjectArray("flowerBrick",FlowerBrick),
			createObjectArray("fireballset",Fireball),
			createObjectArray("mushroom",Mushroom),
			createObjectArray("flower",Flower),
		]).then(([
			mario,
			coin,flycoin,
			turtle,goomba,badPlant,
			tube,	highTube,	highestTube,
			undergroundTube,	undergroundBrick,
			oddBrick,
			pole,flag,castle,
			brick,fragment,	questionBrick,mushroomBrick,flowerBrick,
			fireball,
			mushroom,	flower
		])=>{
			marioArray = mario;
			flycoinArray = flycoin;
			coinArray = coin;
			turtleArray = turtle;
			badPlantArray = badPlant;
			tubeArray = tube;
			highTubeArray = highTube;
			highestTubeArray = highestTube;
			undergroundTubeArray = undergroundTube;
			undergroundBrickArray = undergroundBrick,
			oddBrickArray = oddBrick;
			goombaArray = goomba;
			poleArray = pole;
			flagArray = flag;
			castleArray = castle;
			brickArray = brick;
			fragmentArray = fragment;
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
			this.canvas.height = 2160;
			this.context = this.canvas.getContext("2d");
			this.context.scale(1,1);
			document.body.insertBefore(this.canvas, document.body.childNodes[0]);
			this.frameNo = 0;
			this.interval = setInterval(function(){
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
		// if(keys.zbutton){
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
				powerupSound.play();
			}	
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
				powerupSound.play();
			}	
			return;
		}


		// ------------end 密技區----------

		//-----------音樂播放---------------

		backgroundMusic.play();

		if(marioArray[0].willDie 
			|| marioArray[0].stopBackgroundMusic 
			|| marioArray[0].isDie ){
			backgroundMusic.pause();
			backgroundMusic.currentTime = 0;
		}else if(marioArray[0].underGround){
			backgroundMusic.pause();
			undergroundMuscic.play();
		}else if(!marioArray[0].underGround){
			undergroundMuscic.pause();
		}

		if(marioArray[0].underGround){
			document.querySelector("canvas").style.position  = "absolute";
			document.querySelector("canvas").style.left  = "-250px";
			document.querySelector("canvas").style.top  = "-700px";
		}else if(!marioArray[0].underGround){
			document.querySelector("canvas").style.left = "0";
			document.querySelector("canvas").style.top  = "0";
		}

		// --------end of 音樂播放----------------

		let context = myGameArea.context;

		context.clearRect(0, 0, context.canvas.width, context.canvas.height);

		if(	marioArray[0].pos.x < 450){
			context.drawImage(backgroundSprite,0,0,context.canvas.width,2160,0,0,context.canvas.width,2160);
		}else if(		marioArray[0].pos.x  >= 450 && 	marioArray[0].pos.x  < 5000) {
			context.drawImage(backgroundSprite,	marioArray[0].pos.x  - 450 ,0,context.canvas.width,2160,0,0,context.canvas.width,2160);
		}else if(		marioArray[0].pos.x  >= 5000){
			context.drawImage(backgroundSprite, 4550,0,context.canvas.width,2160,0,0,context.canvas.width,2160);
		} // 最後一行用差值來做處理，讓馬力歐在最後一段距離的時候，只有人移動，畫面不捲
		if(	marioArray[0].isDie && 	marioArray[0].pos.y > 3600){
			restart();
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

		// --------------------怪物區---------------------
		// for(let j = 0;j < turtleArray.length;j += 1){
		// 	turtleArray[j].draw(context,turtleSpriteSet,marioArray[0]);
		// 	turtleArray[j].update(backgroundJson,tubeJson,highTubeJson,highestTubeJson,marioArray[0],oddBrickJson);
		// 	let turtle = turtleArray[j];
		// 	if(turtle.isDie){
		// 		turtleArray.splice(j,1);
		// 		j--;
		// 	}
		// 	if(turtleArray.length == 0){
		// 		break;
		// 	}
		// }			
				
		for(let j = 0;j < goombaArray.length;j += 1){
			goombaArray[j].draw(context,goombaSpriteSet,marioArray[0]);
			goombaArray[j].update(tubeJson,highTubeJson,highestTubeJson,turtleArray,marioArray[0],backgroundJson,oddBrickJson);
			let goomba = goombaArray[j];
			if(!goomba.show){
				goombaArray.splice(j,1);
				j--;
			}
			if(goombaArray.length == 0){
				break;
			}
		}

		// for(let j = 0;j < badPlantArray.length;j += 1){
		// 	badPlantArray[j].draw(context,badPlantSprite,marioArray[0]);
		// 	badPlantArray[j].update(marioArray[0]);
		// 	let badPlant = badPlantArray[j];
		// 	if(badPlant.hitByFire){
		// 		badPlantArray.splice(j,1);
		// 		j--;
		// 	}
		// 	if(badPlantArray.length == 0){
		// 		break;
		// 	}
		// }	
	
		// --------------end 怪物區---------------------


		//--------------終點物件-------------------

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
		}	

		//--------------end   終點物件-------------------

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
			mushroomArray[j].update(marioArray[0],backgroundJson,oddBrickJson
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

		//-----------------各種磚塊------------------

		for(let j = 0;j < brickArray.length;j += 1){
			brickArray[j].draw(context,brickSprite,marioArray[0]);
			brickArray[j].update(marioArray[0]);
			// let brick = brickArray[j];
			// if(brick.show == false){
			// 	brickArray.splice(j,1);
			// 	j--;
			// }
			// if(brickArray.length == 0){
			// 	break;
			// } 
		}	

		for(let j = 0;j < fragmentArray.length;j += 1){
			fragmentArray[j].draw(context,fragmentSprite,marioArray[0]);
			fragmentArray[j].update(backgroundJson,brickArray,fragmentArray);
			// let fragment = fragmentArray[j];
			// if(fragment.underground ){
			// 	fragmentArray.splice(j,1);
			// 	j--;
			// }
			// if(fragmentArray.length == 0){
			// 	break;
			// } 
		}		

		for(let j = 0;j < mushroomBrickArray.length;j += 1){
			mushroomBrickArray[j].draw(context,mushroomBrickSprite,marioArray[0]);
			mushroomBrickArray[j].update(marioArray[0],mushroomArray,mushroomBrickArray);
		}	

		for(let j = 0;j < flowerBrickArray.length;j += 1){
			flowerBrickArray[j].draw(context,flowerBrickSprite,marioArray[0]);
			flowerBrickArray[j].update(marioArray[0],flowerArray,flowerBrickArray);
		}	

		for(let j = 0;j < questionBrickArray.length;j += 1){
			questionBrickArray[j].draw(context,questionBrickSprite,marioArray[0]);
			questionBrickArray[j].update(marioArray[0],flycoinArray,questionBrickArray);
		}	

		//-----------------end of 各種磚塊------------------


		// ---------------障礙區-----------------

		for(let j = 0;j < oddBrickArray.length;j += 1){
			oddBrickArray[j].draw(context,oddBrickSprite,marioArray[0]);
			oddBrickArray[j].update(marioArray[0]);
		}		
	
		for(let j = 0;j < undergroundBrickArray.length;j += 1){
			undergroundBrickArray[j].draw(context,undergroundBrickSprite,marioArray[0]);
		}

		for(let j = 0;j < highTubeArray.length;j += 1){
			highTubeArray[j].draw(context,highTubeSprite,marioArray[0]);
			highTubeArray[j].update(marioArray[0]);
		}	
		

		marioArray[0].draw(context, marioSpriteSet,backgroundJson,fireballSprite,
			goombaArray,turtleArray,badPlantArray,tubeJson,highTubeJson,highestTubeJson,oddBrickJson);
		marioArray[0].update(backgroundJson,tubeJson,highestTubeJson,
			poleJson,	castleJson,flagArray,undergroundTubeJson,undergroundBrickJson);
		
		for(let j = 0;j < undergroundTubeArray.length;j += 1){
			undergroundTubeArray[j].draw(context,undergroundTubeSprite,marioArray[0]);
		}	


		for(let j = 0;j < highestTubeArray.length;j += 1){
			highestTubeArray[j].draw(context,highestTubeSprite,marioArray[0]);
			highestTubeArray[j].update(marioArray[0]);
		}	
	
		for(let j = 0;j < tubeArray.length;j += 1){
			tubeArray[j].draw(context,tubeSprite,marioArray[0]);
			tubeArray[j].update(marioArray[0]);
		}	
	
		// ---------------end of 障礙區-----------------

	
		// -----------------計分區--------------------------

		let brickcoinPoint = questionBrickArray.filter(function (item) {
			return item.isUseLess == true;
		});
		
		let coinPoint = (31 - coinArray.length) * 100;

		// context.font = "30px Courier New";
		// context.fillText("Score:" + (brickcoinPoint.length*200 + coinPoint),10,50);

		// -----------------end of 文字區-----------------
		
	};
	if(!isMobile){
		startGame();
	}
	
});




