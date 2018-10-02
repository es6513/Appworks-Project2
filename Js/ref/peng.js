
//---------------------------------------------
let ctx;
let circle;
let keys;
let drawables;
window.onload = function(){
	ctx = document.getElementById("cvs").getContext("2d");
	circle = new Circle();
	keys = {
		left:false,
		top:false,
		right:false,
		bottom:false
	};
	drawables = [circle];
	document.addEventListener("keydown", keydown);
	document.addEventListener("keyup", keyup);
	window.setInterval(refresh, 10);
};
function keyup(e){
	let code = e.keyCode;
	if(code === 37){
		keys.left = false;
	}else if(code === 38){
		keys.top = false;
	}else if(code === 39){
		keys.right = false;
	}else if(code === 40){
		keys.bottom = false;
	}
}
function keydown(e){
	let code = e.keyCode;
	if(code === 37){
		keys.left = true;
	}else if(code === 38){
		keys.top = true;
	}else if(code === 39){
		keys.right = true;
	}else if(code === 40){
		keys.bottom = true;
	}
}
function refresh(){
	// 更新資料
//   drawables.push(new Rect());
	for(let i = 0;i < drawables.length;i++){
		let die = drawables[i].update();
		if(die){
			drawables.splice(i, 1);
			i--;
		}
	}
	// 清空畫面
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	// 重畫
	for(let i = 0;i < drawables.length;i++){
		drawables[i].draw();
	}
}
function Circle(){
	this.x = ctx.canvas.width / 2;
	this.y = ctx.canvas.height / 2;
	this.speed = 2;
	this.update = function(){
		if(keys.left){
			this.x -= this.speed;
		}
		if(keys.top){
			this.y -= this.speed;
		}
		if(keys.right){
			this.x += this.speed;
		}
		if(keys.bottom){
			this.y += this.speed;
		}
		return false;
	};
	this.draw = function(){
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = "blue";
		ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
		ctx.fill();
		ctx.restore();
	};
}
// function Rect(){
//   this.x=50;
//   this.y=50;
//   this.vx=Math.random()*10;
//   this.vy=2;
//   this.update=function(){
//     this.x+=this.vx;
//     this.y+=this.vy;
//     return this.x>ctx.canvas.width||this.y>ctx.canvas.height;
//   }
//   this.draw=function(){
//     ctx.save();
//     ctx.fillRect(this.x, this.y, 10, 10);
//     ctx.restore();
//   }
// }