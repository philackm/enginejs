var ENGINE = ENGINE || {};

ENGINE.namespace("ENGINE.Layer");

ENGINE.Layer = function(){
	var that = {};
	
	// private
	var _zIndex = 1,
		_children = {},
		_screen = {},
		_transform = ENGINE.maths.Matrix();
	
	function addChild(child, name){
		
		if(!name){
			name = "unnamed";
		}
		
		var counter = 2,
			original = name;
		
		while(typeof _children[name] !== "undefined"){
			name = original + counter++;
		}
		
		console.log(name)
		child.setLayer(that);
		_children[name] = child;
	}
	
	function removeChild(name){
		if(_children[name]){
			delete _children[name];
		}
	}
	
	// Sets the screen that this layer belongs to.
	function setScreen(screen){
		_screen = screen;
	}
	
	function getScreen(){
		return _screen;
	}
	
	function setZIndex(z){
		_zIndex = z < 1 ? 1 : z; // z-index starts at 1 and counts up. The higher the z index, the further away.
	}
	
	function getZIndex(){
		return _zIndex;
	}

	function update(step){
		
		for(name in _children){
			_children[name].update(step);
		}
	}
	
	function render(interpolation, view){
		
		// Each layer will move differently based on its z-index.
		var offset = ENGINE.maths.Matrix.clone(view);
		offset.matrix[0][3] *= 1 / _zIndex;
		offset.matrix[1][3] *= 1 / _zIndex;
				
		for(var name in _children){
			_children[name].render(interpolation, offset);
		}
	}
	
	// Public API
	that.addChild = addChild;
	that.removeChild = removeChild;
	
	that.update = update;
	that.render = render;
	
	that.setZIndex = setZIndex;
	that.getZIndex = getZIndex;
	
	that.getScreen = getScreen;
	that.setScreen = setScreen;
	
	that.children = _children;
	
	return that;
};