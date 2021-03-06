import {LibObj} from "../js/lib.js"



describe("loadJson", function () {
	it("should return object json data", function () {
		return LibObj.loadJson("badPlant")
			.then(objectJson=>{
				chai.expect(objectJson.frames.length).to.equal(2);
				chai.expect(objectJson.Pos.length).to.equal(1);
			});
	});
});

describe("drawObjects", function () {
	it("should return object sprite", function () {
		return LibObj.drawObjects("badTurtle")
			.then(turtle=>{
				chai.expect(turtle.height).to.equal(24);
			});
	});
});

describe("createMarioObjectArray", function () {
	it("should return marioArray", function () {
		return LibObj.createMarioArray("marioRedder")
			.then(mario=>{
				chai.expect(mario.length).to.equal(1);
				chai.expect(mario[0].width).to.equal(16);
				chai.expect(mario[0].height).to.equal(32);
				chai.expect(mario[0].isBigMario).to.equal(false);
				chai.expect(mario[0].isFireMario).to.equal(false);
			});
	});
});
