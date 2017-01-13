var ENGINE = ENGINE || {};

ENGINE.namespace("ENGINE.GameObject");

ENGINE.GameObject = function(){

	var that = {};
	
	// private
	var _position = ENGINE.maths.Vector4(0, 0, 0, 1),
		_model = {},
		_transform = { 	rotation: ENGINE.maths.Matrix(), 
						scale: ENGINE.maths.Matrix(), 
						translation: ENGINE.maths.Matrix() },
		_children = {},
		_layer = {}
		
	// public
	// Testing animations
	
	that.rotationX = 0,
	that.rotationY = 0,
	that.rotationZ = 0,
	
	that.scaleX = 1,
	that.scaleY = 1,
	that.scaleZ = 1,
	
	that.translationX = 0,
	that.translationY = 0,
	that.translationZ = 0,
	
	that.alpha = 0;
	
		
	function getPosition(){
		return _position;
	}
	
	function setPosition(x, y){
		_position.setX(x);
		_position.setY(y);
		
		_transform.translation = ENGINE.maths.Matrix.TranslationMatrix(x, y, 0, 0);
	}
	
	function rotate(radians){
		_transform.rotation = ENGINE.maths.Matrix.RotationZMatrix(radians);
	}
	
	function translate(x, y){
		_transform.translation.setTranslation(x, y, 0);
	}
	
	function scale(sx, sy){
		_transform.scale = ENGINE.maths.Matrix.ScaleMatrix(sx, sy, 1);
	}
	
	function getTransform(){
		
		// testing animations
		// this'll need a major change.
		rotate(this.rotationZ);
		//translate(this.translationX, this.translationY);
		scale(this.scaleX, this.scaleY);
				
		var world = _transform.rotation.multiplyBy(_transform.scale).multiplyBy(_transform.translation);
		
		return world;
	}
	
	function setModel(model){
		_model = model;
	}
	
	function getModel(){
		return _model;
	}
	
	function getChildren(){
		return _children;
	}
	
	function addChild(child, name){
		
		child.parent = this;
		
		if(!name){
			name = "unnamed";
		}
		
		var counter = 1;
		var original = name;
		while(typeof _children[name] !== "undefined"){
			name = original + counter++;
		}
		
		_children[name] = child;
		
		console.log(_children);
	}
	
	function removeChild(name){
		_children[name].parent = null;
		delete _children[name];
	}

	function getLayer() {
		return _layer
	}

	function setLayer(layer) {
		_layer = layer
	}
	
	that.getModel = getModel;
	that.setModel = setModel;
	
	that.setPosition = setPosition;
	
	that.getPosition = getPosition;
	that.getTransform = getTransform;
	
	that.translate = translate;
	that.rotate = rotate;
	that.scale = scale;
	
	that.addChild = addChild;
	that.removeChild = removeChild;
	that.getChildren = getChildren;

	that.getLayer = getLayer
	that.setLayer = setLayer
	
	return that;
};

var go = ENGINE.GameObject();
go.translate(20, 50);
console.log(go.getTransform());