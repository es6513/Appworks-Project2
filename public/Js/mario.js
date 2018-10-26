import {keys,keydown} from "../Js/keyEvent.js";

let c = document.querySelector("#cvs").getContext("2d");

// -------------------Mario Image--------------------
let marioStandRightImage = new Image();
let marioRunRightImage1 = new Image();
let marioRunRightImage2 = new Image();
let marioRunRightImage3 = new Image();
let marioJumpRight = new Image();
let marioStopRight = new Image();

let marioStandLeftImage = new Image();
let marioRunLeftImage1 = new Image();
let marioRunLeftImage2 = new Image();
let marioRunLeftImage3 = new Image();
let marioJumpLeft = new Image();
let marioStopLeft = new Image();


marioStandRightImage.src = "../imgs/images/marioStandRight.png";


// ----------------Screen--------------------
let undergroundImage = new Image();
let skyImage = new Image();

let tubeImage = new Image();
undergroundImage.src = "../imgs/images/underground.png";
skyImage.src = "../imgs/images/sky.png";

tubeImage.src = "../imgs/images/lowTube.png";

let backgroundMusic = new Audio("../music/TitleBGM.mp3");

// ----------------End of Screen--------------------


const position = {
	x:16 * 10,
	y:16 * 14
};

function Mario(x,y,width,height) {
	this.x = x; 
	this.y = y;
	this.dx = 2;
	this.dy = 1.5;
	this.width = width;
	this.height = height;
	this.jumping = false;
	this.onTube = false;
	this.update = function	() {

		if(keys.left){
			this.x -= this.dx;
		}	
		
		if(keys.top && this.jumping == false){
			this.jumping = true;
			this.dy -= 7;
			this.dx = 2.5;
		}

		this.dy += 0.3;  //gravity
		this.y += this.dy;

		if(this.y > 272 - 16 - 32){
			this.jumping = false;
			this.ontube = false;
			this.y = 224;
			this.dy = 0;
		}	
		
		if(keys.right){
			this.x += this.dx;
		}

		if(!this.jumping && !this.ontube){
			if(tube2.x < this.x && this.x - (tube2.x + tube2.width) < 0 ){
				this.dx = 0;
				if(keys.right){
					this.dx = 2;
				}
			}else if( tube1.x > this.x && tube1.x - (this.x + this.width)  < 0 ){
				this.dx = 0;
				if(keys.left){
					this.dx = 2;
				}
			}
		}

		if(this.dy > 0 && this.x + this.width > tube1.x && this.x < tube1.x + tube1.width){
			if(this.y > 272 - 16 - 32 - tube1.height){
				this.jumping = false;
				this.ontube = true;
				this.y = 272 - 16 - 32 - tube1.height;
				this.dy = 0;
			}	
		}			
		
		if( this.x < 0 ){
			this.dx = 0;
			if(keys.right){
				this.dx = 2;
			}
		}else if(this.x > 16 * 29 ){
			this.dx = 0;
			if(keys.left){
				this.dx = 2;
			}
		}		
	
		this.draw();
	};

	this.draw = function () {
		c.drawImage(marioStandRightImage,0,0,16,16,this.x,this.y,this.width ,this.height );
	};
}

function Tube(x,y,width,height) {
	this.x = x ;
	this.y = y ;
	this.width = width;
	this.height = height;

	this.update = function () {
		this.draw();
	};

	this.draw = function () {
		c.drawImage(tubeImage,0,0,this.width,this.height,this.x,this.y,this.width,this.height);
	};
}


// skyImage.addEventListener("load", function() {	
// 	c.drawImage(skyImage,0,0,16,16,32,32,16 * 20,16 * 10);
// 	for(let x = 2;x <= 21;x += 1){
// 		for(let y = 10;y <= 11;y += 1){
// 			c.drawImage(undergroundImage,0,0,16,16,16 * x,16 * y,16,16);
// 		}
// 	}

// 	// mario.update();
// 	// c.drawImage(marioStandImage,0,0,16,16,16 * 4,16 * 9,16,16);
// 	// c.drawImage(undergroundImage,0,0,16,16,32,32,16,16);
// 	// c.drawImage(undergroundImage,0,0,16,16,48,32,16,16);
// 	// c.drawImage(undergroundImage,0,0,16,16,32,48,16,16);
	
// }, false);





let mario = new Mario(position.x,position.y,16,16);
let tube1 = new Tube(16 * 20,16 * 13,32,32);
let tube2 = new Tube(16 * 2,16 * 13,32,32);

function animate() {
	requestAnimationFrame(animate);
	// backgroundMusic.play();
	c.clearRect(0, 0, c.canvas.width, c.canvas.height);
	c.drawImage(skyImage,0,0,16,16,0,0,16 * 30,16 * 16);
	for(let x = 0;x <= 29;x += 1){
		for(let y = 15;y <= 16;y += 1){
			c.drawImage(undergroundImage,0,0,16,16,16 * x,16 * y,16,16);
		}
	}
	tube1.update();
	tube2.update();
	mario.update();
}
animate();



// c.fillRect(0,0,50,50);