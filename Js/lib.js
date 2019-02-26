let LibObj = {
	drawAndUpdateObject:drawAndUpdateObject,
	spliceObjectArray:spliceObjectArray,
	smallMarioUnderBrick:smallMarioUnderBrick,
	bigMarioUnderBrick:bigMarioUnderBrick,
	smallLowerZoneDetect:smallLowerZoneDetect,
	bigLowerZoneDetect:bigLowerZoneDetect,
	upperZoneStop:upperZoneStop,
	controlBrickBorder:controlBrickBorder,
	handleSmallJumpFromBorder:handleSmallJumpFromBorder,
	handleBigJumpFromBorder:handleBigJumpFromBorder
};

function drawAndUpdateObject(objectArray,context,objectSprite,marioArray,...args) {
	for(let j = 0;j < objectArray.length;j += 1){
		objectArray[j].draw(context,objectSprite,marioArray[0]);
		if(objectArray[j].update && !args){
			objectArray[j].update(marioArray[0]);
		}else if(objectArray[j].update && args){
			objectArray[j].update(marioArray[0],...args);
		}
	}	
}

function spliceObjectArray(objectArray) {
	for(let j = 0;j < objectArray.length;j += 1){
		let flower = objectArray[j];
		if(flower.show == false){
			objectArray.splice(j,1);
			j--;
		}
		if(objectArray.length == 0){
			break;
		}  
	}	
	
}

// 	碰撞公式:shape.pos.x + shape.width > this.pos.x 
//	&& shape.pos.x < this.pos.x + this.width
//	&& shape.pos.y + shape.height > this.pos.y
//	&& shape.pos.y < this.pos.y + this.height

function smallMarioUnderBrick(marioArray,brick) {
	if(marioArray.speed.y < 0 
	  && marioArray.pos.y + marioArray.height / 2 >= brick.pos.y  //Mario 頭頂大於磚塊上緣
	  && marioArray.pos.y + marioArray.height / 2 <= brick.pos.y + brick.height  //Mario 頭頂小於磚塊下緣
	  && marioArray.pos.x + marioArray.width  > brick.pos.x   
	  && marioArray.pos.x < brick.pos.x + brick.width 
	){
		if(!brick.isUseLess){
			brick.powerUpSound();
		}
		brick.isUseLess = true;
		marioArray.pos.y = brick.pos.y ;
		marioArray.speed.y = 0;
		marioArray.isBottomBrick = true;
	}
}

function bigMarioUnderBrick(marioArray,brick) {
	if(marioArray.speed.y < 0 
		&& marioArray.pos.y >= brick.pos.y
		&& marioArray.pos.y <= brick.pos.y + brick.height
		&& marioArray.pos.x + marioArray.width  > brick.pos.x 
		&& marioArray.pos.x < brick.pos.x + brick.width 
	){
		if(!brick.isUseLess){
			brick.powerUpSound();
		}
		brick.isUseLess = true;
		marioArray.pos.y = brick.pos.y + brick.height ;
		marioArray.speed.y = 0;
		marioArray.isBottomBrick = true;
	}
}

function smallLowerZoneDetect(marioArray,brick) {
  	// lowzerzone 第一段為 馬力歐的頭頂大於磚塊的下緣
	// lowzerzone 第二段為 馬力歐腳底小於磚塊上緣
	if(marioArray.pos.x + marioArray.width >= brick.pos.x  
    && marioArray.pos.x <= brick.pos.x + brick.width 
    && marioArray.pos.y + marioArray.height / 2  >= brick.pos.y + brick.height) {
		brick.lowerzone = true;
	}else if(marioArray.pos.x + marioArray.width >= brick.pos.x  
    && marioArray.pos.x <= brick.pos.x + brick.width 
    && marioArray.pos.y + marioArray.height / 2  <= brick.pos.y ||
    marioArray.pos.y + marioArray.height - marioArray.speed.y <= brick.pos.y ){
		brick.lowerzone = false;
	}
}

function bigLowerZoneDetect(marioArray,brick) {
	// lowzerzone 第一段為 馬力歐的頭頂大於磚塊的下緣
// lowzerzone 第二段為 馬力歐腳底小於磚塊上緣
	if(marioArray.pos.x + marioArray.width >= brick.pos.x  
	&& marioArray.pos.x <= brick.pos.x + brick.width 
	&& marioArray.pos.y  >= brick.pos.y + brick.height) {
		brick.lowerzone = true;
	}else if(marioArray.pos.x + marioArray.width >= brick.pos.x  
	&& marioArray.pos.x <= brick.pos.x + brick.width 
	&& (marioArray.pos.y + marioArray.height <= brick.pos.y ||
		marioArray.pos.y + marioArray.height - marioArray.speed.y <= brick.pos.y)){
		brick.lowerzone = false;
	}
}

function upperZoneStop(marioArray,brick) {
	if(!brick.lowerzone  
    && !marioArray.underGround  
    && marioArray.speed.y > 0 
    && marioArray.pos.x + marioArray.width > brick.pos.x  
    && marioArray.pos.x < brick.pos.x + brick.width 
	){
		if(marioArray.pos.y > brick.pos.y - marioArray.height){
			marioArray.fallingFromLeftBorder = false;
			marioArray.fallingFromRightBorder = false;
			marioArray.pos.y = brick.pos.y - marioArray.height;
			marioArray.speed.y = 0;
			marioArray.isOnBrick = true;
			marioArray.isJump = false;
		}
	}
}

function controlBrickBorder(marioArray,brick) {
	if(marioArray.isOnBrick 
		&& marioArray.pos.x == brick.pos.x + brick.width 
		&&  marioArray.speed.y > 0.5)
	{
		marioArray.fallingFromRightBorder = true;
	}else if(marioArray.isOnBrick 
  	&& marioArray.pos.x + marioArray.width == brick.pos.x 
   	&&  marioArray.speed.y > 0.5)
	{
		marioArray.fallingFromLeftBorder = true;
	}
}

function handleSmallJumpFromBorder(marioArray,brick) {
	if(!marioArray.underGround 
		&& marioArray.isJump
		&& !marioArray.isBigMario 
		&& !marioArray.isFireMario
		&& marioArray.pos.x == brick.pos.x + brick.width 
		&& marioArray.pos.y + marioArray.height  >= brick.pos.y
		&& marioArray.pos.y + marioArray.height / 2 <= brick.pos.y + brick.height)
	{
		marioArray.pos.x = brick.pos.x + brick.width ;
		marioArray.stopX = true;
		marioArray.touchBrickBorderByJumping = true;
	}else if(!marioArray.underGround 
		&& marioArray.isJump
		&& !marioArray.isBigMario 
		&& !marioArray.isFireMario
		&& marioArray.pos.x + marioArray.width == brick.pos.x 
		&& marioArray.pos.y + marioArray.height  >= brick.pos.y
		&& marioArray.pos.y + marioArray.height / 2 <= brick.pos.y + brick.height)
	{
		marioArray.pos.x = brick.pos.x - marioArray.width ;
		marioArray.stopX = true;
		marioArray.touchBrickBorderByJumping = true;
	}else if(!marioArray.underGround 
		&& marioArray.isJump 
		&& !marioArray.isBigMario 
		&& !marioArray.isFireMario
		&& marioArray.pos.x == brick.pos.x + brick.width 
		&& marioArray.pos.y + marioArray.height < brick.pos.y ){
		marioArray.stopX = false;
	}	else if(!marioArray.underGround 
		&& marioArray.isJump 
		&& !marioArray.isBigMario 
		&& !marioArray.isFireMario
		&& marioArray.pos.x + marioArray.width == brick.pos.x 
		&& marioArray.pos.y + marioArray.height < brick.pos.y ){
		marioArray.stopX = false;
	}
}

function handleBigJumpFromBorder(marioArray,brick) {
	if(!marioArray.underGround 
		&& marioArray.isJump 
		&& (marioArray.isBigMario || marioArray.isFireMario)
		&& marioArray.pos.x == brick.pos.x + brick.width 
		&& marioArray.pos.y + marioArray.height  >= brick.pos.y
		&& marioArray.pos.y  <= brick.pos.y + brick.height)
	{
		marioArray.pos.x = brick.pos.x + brick.width ;
		marioArray.stopX = true;
		marioArray.touchBrickBorderByJumping = true;
	} else	if(!marioArray.underGround 
		&& marioArray.isJump 
		&& (marioArray.isBigMario || marioArray.isFireMario)
		&& marioArray.pos.x + marioArray.width == brick.pos.x 
		&& marioArray.pos.y + marioArray.height  >= brick.pos.y
		&& marioArray.pos.y  <= brick.pos.y + brick.height)
	{
		marioArray.pos.x = brick.pos.x - marioArray.width ;
		marioArray.stopX = true;
		marioArray.touchBrickBorderByJumping = true;
	} else if(!marioArray.underGround 
		&& marioArray.isJump 
		&& (marioArray.isBigMario || marioArray.isFireMario)
		&& marioArray.pos.x == brick.pos.x + brick.width 
		&& marioArray.pos.y + marioArray.height < brick.pos.y ){
		marioArray.stopX = false;
	}
	else if(!marioArray.underGround 
		&& marioArray.isJump 
		&& (marioArray.isBigMario || marioArray.isFireMario)
		&& marioArray.pos.x + marioArray.width == brick.pos.x  
		&& marioArray.pos.y + marioArray.height < brick.pos.y ){
		marioArray.stopX = false;
	}
}

export {LibObj};