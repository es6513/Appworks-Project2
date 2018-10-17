let keys;
keys = {
	left:false,
	top:false,
	right:false,
	bottom:false,
	space:false,
	zbutton: false,
	abutton:false
};

let pressed;


document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);
document.addEventListener("keypress", keypress);

function keyup(e){
	let code = window.event ? e.keyCode : e.which;
	pressed = false;
	if(code === 37){
		keys.left = false;
	}else if(code === 38){
		keys.top = false;
	}else if(code === 39){
		keys.right = false;
	}else if(code === 40){
		keys.bottom = false;
	}else if(code === 32){
		keys.space = false;
	}else if(code === 90){
		keys.zbutton = false;
	}else if(code === 65){
		keys.abutton = false;
	}
}
function keydown(e){
	pressed = true;
	let code = window.event ? e.keyCode : e.which; 
	 // firefox 沒有 window.event，改用 e.which
	if(code === 37){
		keys.left = true;
	}else if(code === 38){
		keys.top = true;
	}	else if(code === 39){
		keys.right = true;
	}else if(code === 40){
		keys.bottom = true;
	}
}


function keypress(e){
	let code = window.event ? e.keyCode : e.which;
	// let code = e.keyCode;
	pressed = true;
	if(code === 32){
		keys.space = true;
	}else if(code === 90){
		keys.zbutton = true;
	}else if(code === 65){
		keys.abutton = true;
	}
}

export {pressed,keys,keyup,keydown,keypress};