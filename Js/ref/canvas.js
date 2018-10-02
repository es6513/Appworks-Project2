let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

// c.fillStyle = "firebrick"
// c.fillRect(100,100,100,100);
// c.fillStyle = "yellow"
// c.fillRect(300,300,150,100);


// Line

// c.beginPath();
// c.moveTo(50,300);
// c.lineTo(300,100);
// c.lineTo(400,300);
// c.strokeStyle = "#fa34a3"
// c.stroke();

// Circle


// for(let i= 0;i<30;i+=1){
//   var x = Math.random()*window.innerWidth;
//   var y = Math.random()*window.innerHeight;
//   var r = Math.floor(Math.random()*255)+1;
//   var g = Math.floor(Math.random()*255)+1;
//   var b = Math.floor(Math.random()*255)+1
//   c.beginPath();
//   c.arc(x,y,30,0,Math.PI*2,false);
//   c.strokeStyle=`rgb(${r},${g},${b})`
//   c.stroke();
// }

let mouse = {
	x:undefined,
	y:undefined
};

let maxRadius = 40;
// let minRadius = 2;
let colorArray = [
	"#153641",
	"#22556E",
	"#4799B7",
	"#6DB3BF",
	"#94CFC9",
];

window.addEventListener("mousemove",function (event) {
	mouse.x = event.x;
	mouse.y = event.y;
});

window.addEventListener("resize",function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
});

function Circle(x,y,r,g,b,dx,dy,radius) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.g = g;
	this.b = b;
	this.dx = dx;
	this.dy = dy;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
	this.radius = radius;
	this.minRadius = radius;

	this.draw = function () {
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
		// c.strokeStyle = `rgb(${this.r},${this.g},${this.b})`;
		c.strokeStyle = this.color;
		c.stroke();
		c.fillStyle = this.color;
		// c.fillStyle = `rgb(${this.r},${this.g},${this.b})`;
		c.fill();
	};
	this.update = function () {
		if ( this.x + this.radius > innerWidth ||  this.x - this.radius < 0) {
			this.dx = - this.dx;
		}
  
		if( this.y + this.radius > innerHeight ||  this.y - this.radius < 0){
			this.dy = - this.dy;
		}
    
		this.x += this.dx;
		this.y += this.dy;
    
		// interactivity
    
		if(Math.abs(mouse.x - this.x ) < 50 && Math.abs(mouse.y - this.y ) < 50 ){
			if(this.radius < maxRadius){
				this.radius += 1;
			}
		}else if(this.radius > this.minRadius){
			this.radius -= 1;
		}
	

		this.draw();
	};
}


let circleArray = [];

function init() {
	circleArray = [];
	for (let i = 0; i < 800; i++) {
		let radius = Math.random() * 3 + 1;
		let x = Math.random() * (innerWidth - radius * 2) + radius;
		let y = Math.random() * (innerHeight - radius * 2) + radius;
		let r = Math.random() * 255 + 1;
		let g = Math.random() * 255 + 1;
		let b = Math.random() * 255 + 1;
		let dy = (Math.random() - 0.5);
		let dx = (Math.random() - 0.5);
		circleArray.push(new Circle(x,y,r,g,b,dx,dy,radius));
	}
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight); 
	for (let i = 0; i < circleArray.length; i++) {
		circleArray[i].update();      
	}
}
animate();
init();