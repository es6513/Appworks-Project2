

let canvas = document.getElementById("canvas");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";

let ctx = canvas.getContext("2d");


let rect = new Rectangle(15,15,50,50);
let rect3 = new Rectangle(150,15,50,50);
let rect2 = new Rectangle(80,15,50,50);
let movement = -1;

console.log(rect);
setInterval(function () {
	ctx.clearRect(0,0,canvas.width,canvas.height);
  
	rect.Draw(ctx,"red");
	rect2.Draw(ctx,"blue");
	rect3.Draw(ctx,"red");

	rect2.x += movement;
	if(rect2.Intersects(rect) || rect2.Intersects(rect3)){
		movement *= -1;
	}
	
	console.log(rect.Intersects(rect2));
});