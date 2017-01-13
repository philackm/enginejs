var ENGINE = ENGINE || {};

ENGINE.namespace("ENGINE.Model.Poly");

ENGINE.Model.Poly = function(spec){
	
	var that = ENGINE.Model(spec),
		_vertices = [];
	
	function getVertices(){
		return _vertices;
	}
	
	function addVertex(vertex){
		_vertices.push(vertex);
	}
	
	function render(transform){
		
		var context = ENGINE.graphics.canvas.getContext(),
			vertices = _vertices;		
			
			context.beginPath();
				
				var start = vertices[0].applyMatrix(transform);
					
			    context.moveTo(start.getX(), start.getY());
			    
			    for(var i = 0; i < vertices.length; i++){
				    var v = vertices[i].applyMatrix(transform);
					context.lineTo(v.getX(), v.getY());    
			    }
		    
		    context.closePath();
		    
		    // Set the drawing state for this object.
		    this.prepareContext(context);
		    
			if(this.getFilled()){
				context.fill();
			}
			else{
				context.stroke();
			}
	}
	
	that.render = render;
	that.getVertices = getVertices;
	that.addVertex = addVertex;
	
	return that;
}

ENGINE.namespace("ENGINE.Model.Poly.Hexagon");

ENGINE.Model.Poly.Hexagon = function(spec){
	
	spec = spec || {};
	
	var that = ENGINE.Model.Poly(spec),
		radius = spec.radius || 100;
	
	(function init(){
		
		// Add the vertices for the Hexagon
		var v1 = ENGINE.maths.Vector4(Math.cos(0) * radius, Math.sin(0) * radius, 0, 1);
		var v2 = ENGINE.maths.Vector4(Math.cos(Math.PI/3) * radius, Math.sin(Math.PI/3) * radius, 0, 1);
		var v3 = ENGINE.maths.Vector4(Math.cos(2*Math.PI/3) * radius, Math.sin(2*Math.PI/3) * radius, 0, 1);
		var v4 = ENGINE.maths.Vector4(Math.cos(Math.PI) * radius, Math.sin(Math.PI) * radius, 0, 1);
		var v5 = ENGINE.maths.Vector4(Math.cos(4*Math.PI/3) * radius, Math.sin(4*Math.PI/3) * radius, 0, 1);
		var v6 = ENGINE.maths.Vector4(Math.cos(5*Math.PI/3) * radius, Math.sin(5*Math.PI/3) * radius, 0, 1);
		
		that.addVertex(v1);
		that.addVertex(v2);
		that.addVertex(v3);
		that.addVertex(v4);
		that.addVertex(v5);
		that.addVertex(v6);
				
	})();
	
	return that;
};

ENGINE.namespace("ENGINE.Model.Poly.Triangle");

ENGINE.Model.Poly.Triangle = function(spec){
	
	spec = spec || {};
	
	var that = ENGINE.Model.Poly(spec),
		height = spec.height || 100;
	
	(function init(){
		
		var v1 = ENGINE.maths.Vector4(0, -height / 2, 0, 1);
		var v2 = ENGINE.maths.Vector4(height / 2, height / 2, 0, 1);
		var v3 = ENGINE.maths.Vector4(-height / 2, height / 2, 0, 1);
		
		that.addVertex(v1);
		that.addVertex(v2);
		that.addVertex(v3);
				
	})();
	
	return that;
};

ENGINE.namespace("ENGINE.Model.Poly.Pointer");

ENGINE.Model.Poly.Pointer = function(spec){
	
	spec = spec || {};
	
	var that = ENGINE.Model.Poly(spec),
		height = spec.height || 100;
	
	(function init(){
		
		var v1 = ENGINE.maths.Vector4(0, -height / 2, 0, 1);
		var v2 = ENGINE.maths.Vector4(height / 2, height / 2, 0, 1);
		var v3 = ENGINE.maths.Vector4(0, height / 4, 0, 1);
		var v4 = ENGINE.maths.Vector4(-height / 2, height / 2, 0, 1);
		
		that.addVertex(v1);
		that.addVertex(v2);
		that.addVertex(v3);
		that.addVertex(v4);
				
	})();
	
	return that;
};


