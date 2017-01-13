var ENGINE = ENGINE || {};

ENGINE.namespace("ENGINE.maths.Time");

ENGINE.maths.Time = (function(){
	var that = {};
	
	// Init;
	var _start = performance.now(),
	
		_previous = 0,
		_current = performance.now(),
		_elapsed = 0,
		
		_updatesPerSecond = 30,
		_deltaTime = 0,
		
		_currentFPS = 0;
	
	// Returns the elapsed time since the game started.
	function getElapsedTime(){
		return performance.now() - _start;
	}
	
	// Get and set the delta time.
	function setDeltaTime(dt){
		_deltaTime = dt;
	}
	
	function getDeltaTime(){
		return _deltaTime;
	}
	
	function setUpdatesPerSecond(updatesPerSecond){
		_updatesPerSecond = updatesPerSecond;
	}
	
	function getUpdatesPerSecond(){
		return _updatesPerSecond;
	}
	
	// Get and set the current FPS.
	function setCurrentFPS(fps){
		_currentFPS = fps;
	}
	
	function getCurrentFPS(){
		return _currentFPS;
	}
	
	that.getElapsedTime = getElapsedTime;
	
	that.getDeltaTime = getDeltaTime;
	that.setDeltaTime = setDeltaTime;
	
	that.getUpdatesPerSecond = getUpdatesPerSecond;
	that.setUpdatesPerSecond = setUpdatesPerSecond;
	
	that.setCurrentFPS = setCurrentFPS;
	that.getCurrentFPS = getCurrentFPS;
	
	return that;
})();