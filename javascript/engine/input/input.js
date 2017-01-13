var ENGINE = ENGINE || {};

ENGINE.namespace("ENGINE.input.keyboard");
ENGINE.namespace("ENGINE.input.mouse");
ENGINE.namespace("ENGINE.input.keyCodes");

ENGINE.input.keyboard = (function(){
	var that = {};
	
	// Private
	var _pressedKeys = [];
	
	function isKeyDown(key){
		return (_pressedKeys.indexOf(key) > -1);
	}
	
	function pressedKeys(){
		return Array(_pressedKeys);
	}
	
	// Init
	(function init(){
		window.addEventListener("keydown", function(event){
			if(_pressedKeys.indexOf(event.keyCode) === -1){
				_pressedKeys.push(event.keyCode);
				console.log(event.keyCode);
			}
		});
		
		window.addEventListener("keyup", function(event){
			var index = _pressedKeys.indexOf(event.keyCode);
			
			if(index > -1){
				_pressedKeys.splice(index, 1);
			}
		});
	})();
	
	// Public API
	that.isKeyDown = isKeyDown;
	that.pressedKeys = pressedKeys;
	
	return that;
})();

ENGINE.input.mouse = (function(){
	var that = {},
	
	// Dependencies
	Vector = ENGINE.maths.Vector2,
	screen = ENGINE.graphics.screen,
	canvas = ENGINE.graphics.canvas.getCanvasDOM(),
	
	// Mouse state
	_position = Vector(),
	_isDown = false,
	_dragging = false,
	
	// Mouse event listeners
	_clickListeners = [],
	
	_moveListeners = [],
	
	_dragStartListeners = [],
	_dragListeners = [],
	_dragEndListeners = [];
	
	function getScreenPosition(){
		// objects are passed by reference, and we don't want access to the private variable
		// so create a new object and pass that back. 
		return Vector(_position.getX(), _position.getY());
	}
	
	function getCanvasPosition(){
		// objects are passed by reference, and we don't want access to the private variable
		// so create a new object and pass that back. 
		return Vector(_position.getX() * screen.getPixelRatio(), _position.getY() * screen.getPixelRatio());
	}
	
	function getScreenX(){
		return _position.getX();
	}
	
	function getScreenY(){
		return _position.getY();
	}
	
	function getCanvasX(){
		return _position.getX() * screen.getPixelRatio();
	}
	
	function getCanvasY(){
		return _position.getY() * screen.getPixelRatio();
	}
	
	function isMouseDown(){
		return _isDown;
	}
	
	// Mouse events
	
	function onClick(callback){
		_clickListeners.push(callback);
	}
	
	function onMove(callback){
		_moveListeners.push(callback);
	}
	
	function onDragStart(callback){
		_dragStartListeners.push(callback);
	}

	function onDrag(callback){
		_dragListeners.push(callback);
	}
	
	function onDragEnd(callback){
		_dragEndListeners.push(callback);
	}
	
	function clearListeners(){
		_clickListeners = [];
	}
	
	// Init
	(function init(){
		// Track the mouse.
		document.body.addEventListener("mousemove", function(event){
			_position.setX(event.clientX);
			_position.setY(event.clientY);
		});
		
		canvas.addEventListener("click", function(mouseEvent){
			for(var i = 0; i < _clickListeners.length; i++){
				_clickListeners[i](mouseEvent);
			}
		});
		
		canvas.addEventListener("mousedown", function(mouseEvent){			
			_isDown = true;
		});
		
		canvas.addEventListener("mouseup", function(mouseEvent){
			
			// Dragging ended
			if(_dragging){
				_dragging = false;
				for(var i = 0; i < _dragEndListeners.length; i++){
					_dragEndListeners[i](mouseEvent);
				}
			}
			
			_isDown = false;
		});
		
		canvas.addEventListener("mousemove", function(mouseEvent){
			
			// Mouse moved
			for(var i = 0; i < _moveListeners.length; i++){
				_moveListeners[i](mouseEvent);
			}
			
			// dragging started
			if(!_dragging && _isDown){
				_dragging = true;
				for(var i = 0; i < _dragStartListeners.length; i++){
					_dragStartListeners[i](mouseEvent);
				}
			}
			else if(_dragging && _isDown){ // dragging continued
				for(var i = 0; i < _dragListeners.length; i++){
					_dragListeners[i](mouseEvent);
				}
			}
		});
	})();
	
	function toString(){
		return "x: " + _position.getX() + ", y: " + _position.getY();
	}
	
	that.getScreenPosition = getScreenPosition;
	that.getCanvasPosition = getCanvasPosition;
	that.getScreenX = getScreenX;
	that.getScreenY = getScreenY;
	that.getCanvasX = getCanvasX;
	that.getCanvasY = getCanvasY;
	
	that.onClick = onClick;
	that.onMove = onMove;
	
	that.onDragStart = onDragStart;
	that.onDrag = onDrag;
	that.onDragEnd = onDragEnd;
	
	that.isMouseDown = isMouseDown;
	that.clearListeners = clearListeners;
	
	that.toString = toString;
	
	return that;
})();

// Common keycodes. 
// Taken from: https://github.com/google/closure-library/blob/8294cd7b14902717d2f1cab53d80025721d75a83/closure/goog/events/keycodes.js
ENGINE.input.keyCodes = {
	WIN_KEY_FF_LINUX: 0,
	MAC_ENTER: 3,
	BACKSPACE: 8,
	TAB: 9,
	NUM_CENTER: 12,  // NUMLOCK on FF/Safari Mac
	ENTER: 13,
	SHIFT: 16,
	CTRL: 17,
	ALT: 18,
	PAUSE: 19,
	CAPS_LOCK: 20,
	ESC: 27,
	SPACE: 32,
	PAGE_UP: 33,     // also NUM_NORTH_EAST
	PAGE_DOWN: 34,   // also NUM_SOUTH_EAST
	END: 35,         // also NUM_SOUTH_WEST
	HOME: 36,        // also NUM_NORTH_WEST
	LEFT: 37,        // also NUM_WEST
	UP: 38,          // also NUM_NORTH
	RIGHT: 39,       // also NUM_EAST
	DOWN: 40,        // also NUM_SOUTH
	PRINT_SCREEN: 44,
	INSERT: 45,      // also NUM_INSERT
	DELETE: 46,      // also NUM_DELETE
	ZERO: 48,
	ONE: 49,
	TWO: 50,
	THREE: 51,
	FOUR: 52,
	FIVE: 53,
	SIX: 54,
	SEVEN: 55,
	EIGHT: 56,
	NINE: 57,
	A: 65,
	B: 66,
	C: 67,
	D: 68,
	E: 69,
	F: 70,
	G: 71,
	H: 72,
	I: 73,
	J: 74,
	K: 75,
	L: 76,
	M: 77,
	N: 78,
	O: 79,
	P: 80,
	Q: 81,
	R: 82,
	S: 83,
	T: 84,
	U: 85,
	V: 86,
	W: 87,
	X: 88,
	Y: 89,
	Z: 90
};