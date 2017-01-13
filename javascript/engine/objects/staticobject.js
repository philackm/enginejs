var ENGINE = ENGINE || {};

ENGINE.namespace("ENGINE.StaticObject");

ENGINE.StaticObject = function(){

	var that = ENGINE.GameObject();
	
	function render(){
		// apply matrix
		// render the model
	}
	
	that.render = render;
	return that;
};