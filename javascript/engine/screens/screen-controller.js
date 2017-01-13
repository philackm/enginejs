var ENGINE = ENGINE || {};

ENGINE.namespace("ENGINE.ScreenController");

ENGINE.ScreenController = function(){
	var that = {};
	
	// private
	var _screens = [];
	
	// Pushes a new screen onto the top of the stack.
	function push(screen){
		if(screen){
			screen.controller = this;
			_screens.push(screen);
			screen.pushed(); // Call the event for the screen and let it know it has been pushed.			
		}
		else{
			console.log("Screen is undefined. Make sure it has been added.")
		}
	}
	
	// Removes and returns the element currently on top of the stack.
	function pop(){
		if(_screens.length > 1){
			var popped = _screens.pop();
			popped.popped();
			
			return popped;
		}
		
		return false;
	}
	
	// Returns the screen that is on the top of the stack without removing it.
	function top(){
		return _screens[_screens.length - 1];
	}
	
	// Public API
	that.push = push;
	that.pop = pop;
	that.top = top;
	return that;
};