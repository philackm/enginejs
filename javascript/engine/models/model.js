var ENGINE = ENGINE || {};

ENGINE.namespace("ENGINE.Model");

ENGINE.Model = function(spec){
	
	var spec = spec || {};
	var that = {};
	
	// dependencies
	var	Color = ENGINE.graphics.Color,
	
	// private
		_color = spec.color || Color(),
		_lineWidth = spec.lineWidth || 1,
		_fill = spec.fill || false;
	
	function setColor(color){
		_color = color;
	}
	
	function getColor(){
		return _color;
	}
	
	function setLineWidth(lineWidth){
		_lineWidth = lineWidth;
	}
	
	function getLineWidth(){
		return _lineWidth;
	}
	
	function setFilled(fill){
		_fill = fill;
	}
	
	function getFilled(){
		return _fill;
	}
	
	function prepareContext(context){
		context.fillStyle = this.getColor().hex();
		context.strokeStyle = this.getColor().hex();
		context.lineWidth = this.getLineWidth();
	}
	
	// Public API
	that.setColor = setColor;
	that.getColor = getColor;
	
	that.setLineWidth = setLineWidth;
	that.getLineWidth = getLineWidth;
	
	that.setFilled = setFilled;
	that.getFilled = getFilled;
	
	that.prepareContext = prepareContext;
	
	return that;
}