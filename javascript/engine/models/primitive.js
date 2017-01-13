var ENGINE = ENGINE || {};

ENGINE.namespace("ENGINE.Model.Primitive");

ENGINE.Model.Primitive = function(spec){
	spec = spec || {};
	var that = ENGINE.Model(spec);
	
	var _origin = ENGINE.maths.Vector4(0, 0, 0, 1);
	
	function getOrigin(){
		return _origin;
	}
	
	function setOrigin(origin){
		_origin = origin;
	}
	
	that.getOrigin = getOrigin;
	that.setOrigin = setOrigin;
	return that;
}

var ENGINE = ENGINE || {};

ENGINE.namespace("ENGINE.Model.Primitive.Rectangle");

ENGINE.Model.Primitive.Rectangle = function(spec){
	
	spec = spec || {};
	var that = ENGINE.Model.Primitive(spec);
	
	// Private
	var	_width = (spec.width || 100) * ENGINE.graphics.screen.getPixelRatio(),
		_height = (spec.height || 100) * ENGINE.graphics.screen.getPixelRatio();
	
	function setWidth(width){
		_width = width;
	}
	
	function getWidth(){
		return _width;
	}
	
	function setHeight(height){
		_height = height;
	}
	
	function getHeight(){
		return _height;
	}
	
	function render(transform){
		var context = ENGINE.graphics.canvas.getContext();
		
		var origin = this.getOrigin().applyMatrix(transform);
		var ox = origin.getX(),
			oy = origin.getY();
	
		context.beginPath();
			context.rect(ox - _width / 2, oy - _height / 2, _width, _height);
		context.closePath();
	
		this.prepareContext(context);
		
		if(this.getFilled()){
			context.fill();
		}
		else{
			context.stroke();
		}
	}
	
	that.render = render;
	that.getWidth = getWidth;
	that.getHeight = getHeight;
	
	that.setWidth = setWidth;
	that.setHeight = setHeight;
	
	return that;
};

var ENGINE = ENGINE || {};

ENGINE.namespace("ENGINE.Model.Primitive.Circle");

ENGINE.Model.Primitive.Circle = function(spec){
	spec = spec || {};
	var that = ENGINE.Model.Primitive(spec);
	
	var _radius = (spec.radius || 100) * ENGINE.graphics.screen.getPixelRatio();
	
	function setRadius(radius){
		_radius = radius;
	}
	
	function getRadius(){
		return _radius;
	}
	
	function render(transform){
		var context = ENGINE.graphics.canvas.getContext();
		
		var origin = this.getOrigin().applyMatrix(transform);
		var ox = origin.getX(),
			oy = origin.getY();
	
		context.beginPath();
			context.arc(ox, oy, _radius, 0, 2*Math.PI);
		context.closePath();
		
		this.prepareContext(context);
		
		if(this.getFilled()){
			context.fill();
		}
		else{
			context.stroke();
		}
	}
	
	that.getRadius = getRadius;
	that.setRadius = setRadius;
	
	that.render = render;
	
	return that;
};