var ENGINE = ENGINE || {};

ENGINE.namespace("ENGINE.Game");

ENGINE.Game = function(){
	var that = {};
	
	// Dependencies
	var time = ENGINE.maths.Time;
	
	that.update = function(step){};
	that.render = function(interpolation){};
	
	// Screens
	var _screenController = ENGINE.ScreenController();
	
	// Rendering
	var _backgroundColor = ENGINE.graphics.Color.white;
	
	// Main Loop Settings
	var _updatesPerSecond = 30,
    	_step = 1000/_updatesPerSecond, // How many milliseconds do we advance the game per update.

		_droppedFrames = 0,
		_maxDroppedFrames = 5,

		_nextUpdateTime = time.getElapsedTime() + _step, // The time for the next update.
		_remaining = 0,
		_interpolation = 0,
		
		_previousFrameStart = 0,
		_currentFrameStart = 0,
		_elapsed = 0,
		_dt = 0,
		_frames = 0;
    
    // Main game loop.
    function calculateDeltaTime(){
    	_previousFrameStart = _currentFrameStart;
    	_currentFrameStart = time.getElapsedTime();
    	_dt = _currentFrameStart - _previousFrameStart;
    	_elapsed += _dt;
    	_frames++;
    	
    	ENGINE.maths.Time.setDeltaTime(_dt);
    	
    	if(_elapsed >= 1000){
			
			time.setCurrentFPS(_frames);
	    	_frames = 0;
	    	_elapsed = 0;
    	}
    }
    
	function run(){
	
        _droppedFrames = 0;
        
		calculateDeltaTime();
		
        while(time.getElapsedTime() >= _nextUpdateTime && _droppedFrames < _maxDroppedFrames){ // If it's time for the next update AND we haven't dropped too many frames.
		
            ENGINE.anim.AnimationScheduler.processAnimations(_step);
			_screenController.top().update(_step);
            
            _nextUpdateTime += _step; // Set what time the next update is scheduled for.
            _droppedFrames++;
        }

        // We need interpolation because we may be inbetween frames, so when we render we must "guess" where the objects would be.
        // This requires a more indepth render method which takes into account the game object's positions and velocities.
        _interpolation = ((time.getElapsedTime() + _step) - _nextUpdateTime) / _step;
        
        // Clear and render whatever screen is on top.
        ENGINE.graphics.canvas.clear(_backgroundColor);
		_screenController.top().render(_interpolation);
		requestAnimationFrame(run);
	}
	
	function setUpdatesPerSecond(updatesPerSecond){
		time.setUpdatesPerSecond(updatesPerSecond);
		_updatesPerSecond = updatesPerSecond;
		_step = 1000 / _updatesPerSecond;
	}
	
	function setBackgroundColor(color){
		_backgroundColor = color;
	}
	
	(function init(){
		_screenController.game = that;
	});
	
	// Public API
	that.screenController = _screenController;
	that.setUpdatesPerSecond = setUpdatesPerSecond;
	that.setBackgroundColor = setBackgroundColor;
	that.run = run;
	
	return that;
};