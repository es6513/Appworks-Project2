let keys;
keys = {
	left:false,
	top:false,
	right:false,
	bottom:false
};

let pressed;

document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

function keyup(e){
	let code = e.keyCode;
	pressed = false;
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
	pressed = true;
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

export {pressed,keys,keyup,keydown};