function GameplayScreen(){
	var screen = ENGINE.Screen();
	
	// Create a bunch of layers that will be a part of this screen.
	// All layers are rendered on top of each other.
	var shipLayer = ENGINE.Layer();
	var starLayer = StarLayer(80, 2, ENGINE.graphics.Color.fromHEX("#ffffff"));
	var starLayer2 = StarLayer(80, 3, ENGINE.graphics.Color.fromHEX("#ffffff"));
	var starLayer3 = StarLayer(80, 4, ENGINE.graphics.Color.fromHEX("#ffffff"));
	var starLayer4 = StarLayer(80, 5, ENGINE.graphics.Color.fromHEX("#ffffff"));
	var starLayer5 = StarLayer(80, 6, ENGINE.graphics.Color.fromHEX("#ffffff"));
	var textLayer = ENGINE.Layer();

	var fontSize = 20;
	fontSize = fontSize * ENGINE.graphics.screen.getPixelRatio();
	
	// Add an FPS counter to the screen.
	var font = ENGINE.UI.Font({font: "Press Start 2P", fontSize: fontSize, color: ENGINE.graphics.Color.red, padding: 10}),
		text = ENGINE.UI.UITextObject({font: font, absolute: true, text: "FPS"});
		
	text.setPosition(30, 110);
	text.setUpdate(function(step){
		text.setText(ENGINE.maths.Time.getCurrentFPS());
	});
	textLayer.addChild(text, "fps");

	// Add instructions to the screen.
	var instructionFont = ENGINE.UI.Font({font: "Press Start 2P", fontSize: fontSize, color: ENGINE.graphics.Color.white, padding: 10}),
	instructionText = ENGINE.UI.UITextObject({font: instructionFont, absolute: true, text: "WASD to move. MLB/SPACE to fire. MOUSE to aim."});
		
	instructionText.setPosition(30, 150);
	textLayer.addChild(instructionText, "instruction");
	
	// Set the z-index for each layer. Layers "further away" will move slower than closer layers.
	shipLayer.setZIndex(1);
	starLayer.setZIndex(2);
	starLayer2.setZIndex(3);
	starLayer3.setZIndex(4);
	starLayer4.setZIndex(5);
	starLayer5.setZIndex(6);
	textLayer.setZIndex(1);	
	
	var ship = PlayerShip();
	shipLayer.addChild(ship);
	
	var camera = ENGINE.Camera(ship);
	screen.setCamera(camera);
	
	screen.add(shipLayer, "ship");
	screen.add(starLayer, "stars");
	screen.add(starLayer2, "stars 2");
	screen.add(starLayer3, "stars 3");
	screen.add(starLayer4, "stars 4");
	screen.add(starLayer5, "stars 5");
	screen.add(textLayer, "ui");
	
	// Make it so we can quit.
	screen.registerKeyEvent(ENGINE.input.keyCodes.Q, function(s){
		s.controller.pop();
	});
	
	return screen;
}

function StarLayer(numStars, zIndex, color){
	
	var layer = ENGINE.Layer();
	var starWidth = 10 / zIndex;
	
	layer.setZIndex(zIndex);
	
	if(!color){
		color = ENGINE.graphics.Color.white;
	}
	
	for(var i = 0; i < numStars; i++){
		var font = ENGINE.UI.Font({font: "Press Start 2P", fontSize: 200 * 1/zIndex, color: color, padding: 10});
		var star = ENGINE.DynamicObject();
		star.setModel(ENGINE.Model.Primitive.Rectangle({width: starWidth, height: starWidth, fill: true, color: color}));
		
		var width = ENGINE.graphics.canvas.getWidth() * 2;
		var height = ENGINE.graphics.canvas.getHeight() * 2;
		var halfWidth = ENGINE.graphics.canvas.getWidth();
		var halfHeight = ENGINE.graphics.canvas.getHeight();
		
		var posX = (Math.random() * width) - halfWidth / 2,
			posY = (Math.random() * height) - halfHeight / 2;
		
		star.setPosition(posX, posY);
		
		layer.addChild(star, "star");
	}
	
	return layer;
}

