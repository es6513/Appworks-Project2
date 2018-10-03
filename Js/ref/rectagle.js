Rectangle = function (x,y,w,h) 
{
	if(x == null || y == null || w == null || h == null){
		alert("You did not pass all variables");
		let errorMsg = "You did not provide: ";
		if(x == null) errorMsg += "'x'";
		if(y == null) errorMsg += "'y'";
		if(w == null) errorMsg += "'width'";
		if(h == null) errorMsg += "'height'";
    
		throw new Error(errorMsg);
	}
  
	this.Intersects = function (shape) {
		let offset = 0;
		if(shape.radius != null){
			offset = shape.radius;
		}
		// 方形的 offset 會等於0
		// 計算任一個矩形的 x 距離是否位於另外一個矩形的 x 及 x+width 之中， y也是一樣的算法
		if(this.Contains(shape.x - offset,shape.y - offset)
    || this.Contains(shape.x + shape.width - offset,shape.y - offset)
    || this.Contains(shape.x - offset,shape.y + shape.height - offset)
    || this.Contains(shape.x + shape.width - offset,shape.y + shape.height - offset))
		{
			return true;
		}
		else if(shape.Contains(this.x - offset,this.y - offset)
    || shape.Contains(this.x + this.width - offset,this.y - offset)
    || shape.Contains(this.x - offset,shape.y + this.height - offset)
    || shape.Contains(this.x + this.width - offset,this.y + this.height - offset))
		{
			return true;
		}
		return false;
	};
  
	this.Draw = function (ctx,color) {
		ctx.fillStyle = color;
		ctx.fillRect(this.x,this.y,this.width,this.height);
	};


	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
  
	this.Contains = function (x,y) {
		if(x >= this.x && x <= this.x + this.width
      && y >= this.y && y <= this.y + this.height){
			return true;
		}else{
			return false;
		}
	};
};
