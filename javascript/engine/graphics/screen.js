var ENGINE = ENGINE || {};

ENGINE.namespace("ENGINE.graphics.screen");

ENGINE.graphics.screen = (function(){
	var that = {},
	
	// Private
		_pixelRatio = window.devicePixelRatio,
	
		_width = window.innerWidth,
		_height = window.innerHeight;
	
	function getPixelRatio(){
		return _pixelRatio;
	}
	
	function getWidth(){
		return _width;
	}
	
	function getHeight(){
		return _height;
	}
	
	that.getWidth = getWidth;
	that.getHeight = getHeight;
	that.getPixelRatio = getPixelRatio;
	
	return that;
})();