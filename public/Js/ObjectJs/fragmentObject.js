import {PositionAndSpeed} from "../positionAndSpeed.js";


class Fragment{
	constructor(){
    this.pos = new PositionAndSpeed(0,0);
    this.previousPos = new PositionAndSpeed(0,0);
    this.speed = new PositionAndSpeed(0.25,0.5);
		this.width = 8;
    this.height = 8;
    this.show =false;
    this.underground = false;
    this.record = false;
	}
	
	update(screen,brickArray,fragmentArray){
    screen.backgrounds[1].ranges.forEach(([x1,x2,y1,y2]) =>{
      if(this.pos.y >= y1*screen.height){
        this.underground = true;
      }
    })

    

    if(!this.record){
      this.previousPos.x = this.pos.x;
      this.previousPos.y = this.pos.y;
    }

    for(let i =0;i < brickArray.length; i += 1){
      
      if(brickArray[i].break){
        let matchNum = i*4;
        fragmentArray[matchNum].record = true;
        fragmentArray[matchNum+2].record = true;
        fragmentArray[matchNum+1].record = true;
        fragmentArray[matchNum+3].record = true;
        fragmentArray[matchNum].show = true;
        fragmentArray[matchNum+2].show = true;
        fragmentArray[matchNum+1].show = true;
        fragmentArray[matchNum+3].show = true;

        fragmentArray[matchNum].pos.y -= fragmentArray[matchNum].speed.y;
        fragmentArray[matchNum].pos.x -= fragmentArray[matchNum].speed.x;
        fragmentArray[matchNum+2].pos.y -= fragmentArray[matchNum+2].speed.y;
        fragmentArray[matchNum+2].pos.x -= fragmentArray[matchNum+2].speed.x;

        fragmentArray[matchNum+1].pos.y -= fragmentArray[matchNum+1].speed.y;
        fragmentArray[matchNum+1].pos.x += fragmentArray[matchNum+1].speed.x;

        fragmentArray[matchNum+3].pos.y -= fragmentArray[matchNum+3].speed.y;
        fragmentArray[matchNum+3].pos.x += fragmentArray[matchNum+3].speed.x;
         
        if(fragmentArray[matchNum].pos.y < fragmentArray[matchNum].previousPos.y - fragmentArray[matchNum].height * 8){
          fragmentArray[matchNum].speed.y *= -1;
        }

        if(fragmentArray[matchNum+2].pos.y < fragmentArray[matchNum+2].previousPos.y - fragmentArray[matchNum+2].height * 4){
          fragmentArray[matchNum+2].speed.y *= -1;
        }

        if(fragmentArray[matchNum+1].pos.y < fragmentArray[matchNum+2].previousPos.y - fragmentArray[matchNum+2].height * 8){
          fragmentArray[matchNum+1].speed.y *= -1;
        }

        if(fragmentArray[matchNum+3].pos.y < fragmentArray[matchNum+3].previousPos.y - fragmentArray[matchNum+3].height * 4){
          fragmentArray[matchNum+3].speed.y *= -1;
        }
         
        }
    }
	}

	draw(context,fragmentSprite,marioArray){
				
		if(marioArray.pos.x < 450 && this.show &&!this.underground){
			fragmentSprite.drawSprite("fragment",context,this.pos.x,this.pos.y);
		}else if(marioArray.pos.x >= 450 && marioArray.pos.x < 5000  && this.show &&!this.underground){
			fragmentSprite.drawSprite("fragment",context,this.pos.x - marioArray.pos.x + 450 ,this.pos.y);
		}else if(marioArray.pos.x >= 5000 && this.show &&!this.underground){
			fragmentSprite.drawSprite("fragment",context,this.pos.x  - 4550 ,this.pos.y);
		}
	
	}
}

export {Fragment};