(function(){
		
	var game = ENGINE.Game();
	game.setUpdatesPerSecond(60);
	game.setBackgroundColor(ENGINE.graphics.Color.fromHEX("#2a2a2a"));
	
	var titleScreen = TitleScreen();
	game.screenController.push(titleScreen);
	
	// Run the game.
	game.run();
	
})();
