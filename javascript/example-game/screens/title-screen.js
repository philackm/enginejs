// Title Screen.
// The main screen of the game.
function TitleScreen(){
	
	var titleScreen = ENGINE.Screen();
	var textLayer = ENGINE.Layer();

	var fontSize = 20;
	fontSize = fontSize * ENGINE.graphics.screen.getPixelRatio();
	
	var startFont = ENGINE.UI.Font({font: "Press Start 2P", fontSize: fontSize, color: ENGINE.graphics.Color.white, padding: 10});
	
	var menuLabel = ENGINE.UI.UITextObject({font: startFont, absolute: true, text: "Menu (Push the corresponding number)"});
	var gameplayLabel = ENGINE.UI.UITextObject({font: startFont, absolute: true, text: "1: Gameplay"});
	var animationLabel = ENGINE.UI.UITextObject({font: startFont, absolute: true, text: "2: Animation"});
	
	menuLabel.setPosition(30, 110);
	gameplayLabel.setPosition(30, 150);
	animationLabel.setPosition(30, 190);
	
	textLayer.addChild(menuLabel);
	textLayer.addChild(gameplayLabel, "gameplayLabel");
	textLayer.addChild(animationLabel, "animationLabel");
	titleScreen.add(textLayer, "title");
	
	var gameplay = GameplayScreen();
	var animation = AnimationScreen();
	
	// Add the gameplay screen when we push "1"
	titleScreen.registerKeyEvent(ENGINE.input.keyCodes.ONE, function(s){
		s.controller.push(gameplay);
	});
	
	// Add the animation screen when we push "2"
	titleScreen.registerKeyEvent(ENGINE.input.keyCodes.TWO, function(s){
		s.controller.push(animation);
	});
	
	return titleScreen;
}