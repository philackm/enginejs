var ENGINE = ENGINE || {};

ENGINE.namespace("ENGINE.Screen");

ENGINE.Screen = function(){
	var that = {};
	
	// private
	var _layers = {},
		_camera = {},
		_pushed = function(){},
		_popped = function(){},
		_events = {},
		_controller = {};
	
	// Adds a layer to the screen with a name.
	function add(layer, name){
		layer.setScreen(this);
		_layers[name] = layer;
	}
	
	// Remove the layer with 'name' from the screen.
	function remove(name){
		if(_layers[name]){
			delete _layers[name];
		}
	}
	
	function onPop(callback){
		_popped = callback;
	}
	
	function onPush(callback){
		_pushed = callback;
	}
	
	function pushed(){
		_pushed();
	}
	
	function popped(){
		_popped();
	}
	
	function handleKeyEvents(screen){
		var pressedKeys = ENGINE.input.keyboard.pressedKeys(),
			eventKeys = Object.keys(_events);
			
		for(var index in pressedKeys){
			var keyName = pressedKeys[index].toString();
			if(eventKeys.indexOf(keyName)  > -1){
				_events[keyName](screen);
			}
		}
	}
	
	function update(step){		
		
		handleKeyEvents(this);
		
		for(name in _layers){
			_layers[name].update(step);
		}
		
		if(typeof _camera.update === "function"){
			_camera.update();
		}
	}
	
	function render(interpolation){
		
		// If this screen has a camera, include it.
		if(typeof _camera.getViewTransform === "function"){
			var view = _camera.getViewTransform();	
		}
		else{ // Else pass identity
			view = ENGINE.maths.Matrix();
		}
		
		for(name in _layers){
			_layers[name].render(interpolation, view);
		}
	}
	
	function setCamera(camera){
		_camera = camera;
	}
	
	function getCamera(){
		return _camera;
	}
	
	function registerKeyEvent(key, callback){
		if(Object.keys(_events).indexOf(key) === -1){
			_events[key] = callback;
		}
	}
	
	// Public API
	that.add = add;
	that.remove = remove;

	that.onPop = onPop;
	that.onPush = onPush;
	
	that.pushed = pushed;
	that.popped = popped;
	
	that.setCamera = setCamera;
	that.getCamera = getCamera;
	
	that.update = update;
	that.render = render;
	
	that.registerKeyEvent = registerKeyEvent;
	
	return that;
};