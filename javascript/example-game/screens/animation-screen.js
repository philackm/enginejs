function AnimationScreen(){
	
	var screen = ENGINE.Screen(),
		drawing = ENGINE.Layer();

	var textLayer = ENGINE.Layer();

	var fontSize = 20;
	fontSize = fontSize * ENGINE.graphics.screen.getPixelRatio();
	
	// Add instructions to the screen.
	var instructionFont = ENGINE.UI.Font({font: "Press Start 2P", fontSize: fontSize, color: ENGINE.graphics.Color.white, padding: 10}),
	instructionText = ENGINE.UI.UITextObject({font: instructionFont, absolute: true, text: "Click anywhere on the screen to spawn a new animation."});
		
	instructionText.setPosition(30, 110);
	textLayer.addChild(instructionText, "instruction");

	// Adds a new item to the layer at an x and y location and kicks off an animation.
	function addSquare(x, y){
		var square = ENGINE.DynamicObject();
		square.setModel(ENGINE.Model.Poly.Hexagon({radius: 30, lineWidth: 6, color: ENGINE.graphics.Color.white, fill: true}));
		square.translate(x, y);
		drawing.addChild(square, "square");
		
		ENGINE.anim.Animation.animate({
			length: 1200,
			object: square,
			
			animation: {
				rotationZ: {from: 0, to: Math.PI * 2, curve: ENGINE.anim.AnimationCurve.easeout },
				scaleX: {from: 0, to: 4, curve: ENGINE.anim.AnimationCurve.bounce },
				scaleY: {from: 0, to: 4, curve: ENGINE.anim.AnimationCurve.bounce }
			}
		});
	}
	
	// Start listening for mouse clicks.
	screen.onPush(function(){
		ENGINE.input.mouse.onClick(function(event){
			var x = ENGINE.input.mouse.getCanvasX(),
				y = ENGINE.input.mouse.getCanvasY();
				
			addSquare(x, y);
		});
	});
	
	// Stop listening for mouse clicks.
	screen.onPop(function(){
		ENGINE.input.mouse.clearListeners();
	});
	
	// Make it so we can quit.
	screen.registerKeyEvent(ENGINE.input.keyCodes.Q, function(s){
		s.controller.pop();
	});
	
	screen.add(textLayer, "ui");
	screen.add(drawing, "drawing");
	
	return screen;
}