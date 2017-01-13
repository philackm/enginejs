var ENGINE = ENGINE || {};

ENGINE.namespace("ENGINE.maths.lerp");
ENGINE.namespace("ENGINE.maths.clamp");
ENGINE.namespace("ENGINE.maths.calculateBezierPoint");

ENGINE.maths.lerp = function(a, b, t){
	return ((1 - t) * a) + (b * t);
};

ENGINE.maths.clamp = function(a, b, value){
	if(value < a){
		return a;
	}
	else if(value > b){
		return b;
	}
	else{
		return value;
	}
};

ENGINE.maths.calculateBezierPoint = function calculateBezierPoint(points, t){
	if(points.length <= 1){
		// Unable to calculate with one or less points.
		return ENGINE.anim.Point.zero();
	}
	
	if(points.length === 2){ // Down to the last 2, it's the actual point.
		var xFinal = ENGINE.maths.lerp(points[0].x(), points[1].x(), t);
		var yFinal = ENGINE.maths.lerp(points[0].y(), points[1].y(), t);
		
		return ENGINE.anim.Point(xFinal, yFinal);
	}
	else{			
		var i = 0, newPoints = [], p = {};
		while(i < points.length - 1){
			p = calculateBezierPoint([points[i], points[i+1]], t);
			newPoints.push(p);
			i++;
		}
		
		return calculateBezierPoint(newPoints, t);
	}
};