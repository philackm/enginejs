var ENGINE = ENGINE || {};

ENGINE.namespace("ENGINE.DynamicObject");

ENGINE.DynamicObject = function(){

	var that = ENGINE.GameObject();
	
	//private
	var _velocity = ENGINE.maths.Vector4(0, 0, 0, 0),
		_onUpdate = function(step){},
		_onLateUpdate = function(step){};
	
	function getVelocity(){
		return _velocity;
	}
	
	function setVelocity(v){
		_velocity = v;
	}
	
	function update(step){
		var children = this.getChildren();
		
		for(var name in children){
			children[name].update(step);
		}
		
		_onUpdate(step);
	}
	
	function render(interpolation, combined){
		
		var transform = this.getTransform(),
			model = this.getModel(),
			children = this.getChildren();
			
		var combined = transform.multiplyBy(combined);
		
		// Render any children, pass in the combined
		for(name in children){
			children[name].render(interpolation, combined);
		}
		
		// Render this object's model.
		model.render(combined);
	}
	
	that.getVelocity = getVelocity;
	that.setVelocity = setVelocity;
	that.render = render;
	that.update = update;
	
	that.setUpdate = function(callback){
		_onUpdate = callback;	
	};
	
	that.setLateUpdate = function(callback){
		_onLateUpdate = callback;
	}
	
	return that;
}