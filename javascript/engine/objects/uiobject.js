var ENGINE = ENGINE || {};

ENGINE.namespace("ENGINE.UI.Font");
ENGINE.namespace("ENGINE.UI.Text");

ENGINE.namespace("ENGINE.UI.UIObject");
ENGINE.namespace("ENGINE.UI.UITextObject");

ENGINE.UI.UIObject = function(){

	var that = ENGINE.GameObject();
	
	// Render at absolute screen positions.
	function render(interpolation){
		
	}
	
	that.render = render;
	return that;
};

ENGINE.UI.Font = function(spec){
	var that = {},
	
	// Dependencies
		Color = ENGINE.graphics.Color,
	
	// Private	
		_spec = spec || {},
	
		_fontName = _spec.font || "Times New Roman",
		_fontSize = _spec.fontSize || 10,
		_fontColor = _spec.color || Color(),
		_padding = _spec.padding || 0;
		
	function getFontSize(){
		return _fontSize;
	}
	
	function getFontColor(){
		return _fontColor;
	}
	
	function getFontName(){
		return _fontName;
	}

	function getPadding(){
		return _padding;
	}

	// Public API
	that.getFontSize = getFontSize;
	that.getFontColor = getFontColor;
	that.getFontName = getFontName;
	that.getPadding = getPadding;
	
	return that;
};

ENGINE.UI.Text = function(spec){
	
};

ENGINE.UI.UITextObject = function(spec){
	var that = ENGINE.GameObject();
	
	// Private
	var _spec = spec || {},
	 	_absolute = _spec.absolute, // render at absolute screen positions?
		_font = _spec.font || ENGINE.UI.Font(), // the font for the text
		_text = _spec.text || "UITextObject", // the default text to display
		
		_update = function(step){}; // The settable update callback.
	
	function setText(text){
		_text = text;
	}
	
	function getText(){
		return _text;
	}
	
	function setFont(font){
		_font = font;
	}
	
	function setUpdate(callback){
		_update = callback;
	}
	
	function update(step){
		_update(step);
	}
	
	function render(interpolation, combined){
		
		var context = ENGINE.graphics.canvas.getContext();
		
		var transform = this.getTransform();
		
		var x = this.getPosition().getX(),
			y = this.getPosition().getY();
		
		var positionTransformed = ENGINE.maths.Vector4(x, y, 0, 1);
		
		if(!_absolute){
			var comb = transform.multiplyBy(combined); // ??
			positionTransformed = positionTransformed.applyMatrix(comb);
		}
		else{
			
			var xNew = positionTransformed.getX(),
				yNew = positionTransformed.getY();
				
			xNew *= ENGINE.graphics.screen.getPixelRatio();
			yNew *= ENGINE.graphics.screen.getPixelRatio();
				
			positionTransformed.setX(xNew);
			positionTransformed.setY(yNew);
		}
		
		context.save();
			context.font = _font.getFontSize() + "px \"" + _font.getFontName() + "\"";
			context.fillStyle = _font.getFontColor().hex();		
			context.fillText(_text, positionTransformed.getX() + _font.getPadding(), positionTransformed.getY() + _font.getPadding() + _font.getFontSize());
		context.restore();
	}
	
	that.setText = setText;
	that.getText = getText;
	that.setFont = setFont;
	
	that.update = update;
	that.render = render;
	
	that.setUpdate = setUpdate;
	
	return that;
};