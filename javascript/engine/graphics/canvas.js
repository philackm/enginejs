ENGINE.namespace("ENGINE.graphics.canvas");

ENGINE.graphics.canvas = (function(){
	var that = {},
	
	// Dependencies
		screen = ENGINE.graphics.screen,
	
	// Private	
		_dom,
		_context,
		
		// height and width of the canvas can be different to the resolution of the screen, this is because of pixel density and high resolution displays.
		_height,
		_width;
	
	function getContext(){
		return _context;
	}
	
	function getCanvasDOM(){
		return _dom;
	}
	
	function getWidth(){
		return _width / screen.getPixelRatio();
	}
	
	function getHeight(){
		return _height / screen.getPixelRatio();
	}
	
	function clear(color){
		var width = this.getWidth() * screen.getPixelRatio();
		var height = this.getHeight() * screen.getPixelRatio();
		
		_context.clearRect(0, 0, width, height);
		if(color){
			_context.save();
			_context.fillStyle = color.hex();
			_context.fillRect(0, 0, width, height);
			_context.restore();
		}
	}
	
	(function init(){
		_dom = document.getElementById("canvas");
		_context = _dom.getContext("2d");
		
		var width = window.getComputedStyle(window.canvas).getPropertyValue("width").replace("px", ""),
			height = window.getComputedStyle(window.canvas).getPropertyValue("height").replace("px", "");
			
			console.log(width); console.log(height);
		
		console.log(screen);
		var pixelRatio = screen.getPixelRatio();
		
		_width = parseInt(width) * pixelRatio;
		_height = parseInt(height) * pixelRatio;
		
		console.log(_width); console.log(_height);
		
		console.log(screen.getPixelRatio());
		
		window.canvas.width = _width;
		window.canvas.height = _height;
	})();

	// Public API	
	that.getContext = getContext;
	that.getCanvasDOM = getCanvasDOM;
	that.getWidth = getWidth;
	that.getHeight = getHeight;
	
	that.clear = clear;
	
	return that;
})();