var ENGINE = ENGINE || {};

ENGINE.namespace("ENGINE.Camera");

ENGINE.Camera = function(target){
	
	var that = {};
	
	var _location = ENGINE.maths.Vector4(),
		_transform = ENGINE.maths.Matrix(),
		_target = target || {},
		_pixelRatio = 1;
		
	function setTarget(target){
		_target = target;
	}
	
	function update(){		
		if(typeof _target.getPosition === "function"){
			var x = _target.getPosition().getX() - ENGINE.graphics.screen.getWidth() / 2,
				y = _target.getPosition().getY() - ENGINE.graphics.screen.getHeight() / 2;

			_location.setX(-x);
			_location.setY(-y);
			
			_transform.setTranslation(-x * _pixelRatio, -y * _pixelRatio, 0);
		}
	}
	
	function getViewTransform(){
		return _transform;
	}
	
	function getPosition(){
		return _location;
	}
	
	(function init(){
		_pixelRatio = ENGINE.graphics.screen.getPixelRatio();
		_transform = ENGINE.maths.Matrix.ScaleMatrix(_pixelRatio, _pixelRatio, 1);
	})();
	
	that.update = update;
	
	that.getViewTransform = getViewTransform;
	that.getPosition = getPosition;
	that.setTarget = setTarget;
	
	return that;
};