class Sprites {

	// 三個參數代表，讀進的圖片，要讀多寬跟多高
	constructor(image,width,height){   
		this.image = image;
		this.width = width;
		this.height = height;
		this.tiles = new Map();
	}
  
	getImage(name,x,y,width,height){ 
		//x,y 代表要從載入的圖片中的哪個位置當起始點
		let sprites = [false,true].map(reverse=>{
			let sprite = document.createElement("canvas");
			sprite.width = this.width;
			sprite.height = this.height;
			let context = sprite.getContext("2d");
			if(reverse){
				context.scale(-1,1);
				context.translate(-width,0);
			}
			context
				.drawImage(		
					this.image,		
					x,y,			
					width,height,		
					0,0,			
					this.width,this.height
				);  

			return sprite;
		});
		this.tiles.set(name,sprites);
	}

	getTileImage(name, x, y,width,height) {
		this.getImage(name, x * this.width, y * this.height, width, height);
	}

	drawMarioSprite(name,context,x,y,reverse = false){
		let sprite = this.tiles.get(name)[reverse ? 1 : 0];
		context.drawImage(sprite,x,y);
	}
	
	draw(name,context,x,y){
		let sprite = this.tiles.get(name)[0];
		context.drawImage(sprite,x,y);
		// context.drawImage(sprite,x,y);  //只有傳三個參數，則 x ,y 表示要畫在畫布上的哪個位置。
	}

	drawTile(name,context,x,y){
		let sprite = this.tiles.get(name)[0];
		context.drawImage(sprite,x * this.width,y * this.height);
	}
	
	drawSprite(name,context,x,y){
		let sprite = this.tiles.get(name)[0];
		context.drawImage(sprite,x,y);
	}

	drawTurtleSprite(name,context,x,y,reverse = false){
		let sprite = this.tiles.get(name)[reverse ? 1 : 0];
		context.drawImage(sprite,x,y);
	}

	drawFireBallSprite(name,context,x,y,reverse = false){
		let sprite = this.tiles.get(name)[reverse ? 1 : 0];
		context.drawImage(sprite,x,y);
	}


  
}

export {Sprites};