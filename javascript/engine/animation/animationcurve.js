var ENGINE = ENGINE || {};

ENGINE.namespace("ENGINE.anim.Point");
ENGINE.namespace("ENGINE.anim.BezierPoint");

ENGINE.namespace("ENGINE.anim.BezierSection");
ENGINE.namespace("ENGINE.anim.BezierCurve");

ENGINE.namespace("ENGINE.anim.AnimationCurve");

ENGINE.anim.Point = function Point(xValue, yValue){
	
	// Creating empty objects doesn't let me use instanceof, the prototypes, inheritance, and all that good stuff gets wiped.
	// This way is simple, but has a lot of cons. Need to find a better way.
	var that = Object.create(ENGINE.anim.Point.prototype);
		
	var _x = typeof xValue === "number" ? xValue : 0,
		_y = typeof yValue === "number" ? yValue : 0;
		
	function x(value){
		if(typeof value === "number"){
			_x = value;
		}
		return _x;
	}
	
	function y(value){
		if(typeof value === "number"){
			_y = value;
		}
		return _y;
	}
	
	function toString(){
		return "x: " + _x + ", y: " + _y;
	}
	
	function equals(p2){
		var p = this;
		
		return p.x() === p2.x() && p.y() === p2.y(); 
	}
	
	that.x = x;
	that.y = y;
	
	that.equals = equals;
	
	that.toString = toString;
	
	return that;
};

ENGINE.anim.Point.zero = function(){
	return ENGINE.anim.Point(0, 0);
};

ENGINE.anim.Point.clone = function(p){
	var clone = ENGINE.anim.Point();
	
	clone.x(p.x());
	clone.y(p.y());
	
	return clone;
};


ENGINE.anim.BezierPoint = function(x, y){
	
	var that = ENGINE.anim.Point(x, y);
	
	var	_controlPoints = { 	
							controlIn: ENGINE.anim.Point(x, y), 
							controlOut: ENGINE.anim.Point(x, y)
						 };
	
	function controlIn(value){
		if(value instanceof ENGINE.anim.Point){
			_controlPoints.controlIn = value;
		}
		return _controlPoints.controlIn;
	}
	
	function controlOut(value){
		if(value instanceof ENGINE.anim.Point){
			_controlPoints.controlOut = value;
		}
		return _controlPoints.controlOut;
	}
	
	that.controlIn = controlIn;
	that.controlOut = controlOut;
	return that;
};

// A Bezier Section is just 4 points.
// @param points: array of 4 points.
ENGINE.anim.BezierSection = function(points){
	
	var that = {},
		lerp = ENGINE.maths.lerp;
	
	var _points = points || [];
	
	// Returns a point at time t for this section.
	function getBezierPoint(t){
		var result = ENGINE.maths.calculateBezierPoint(_points, t);
		return result;
	}
	
	/* Moved to ENGINE.maths
	function calculateBezierPoint(points, t){
		
		if(points.length <= 1){
			// Unable to calculate with one or less points.
			return ENGINE.anim.Point.zero();
		}
		
		if(points.length === 2){ // Down to the last 2, it's the actual point.
			var xFinal = lerp(points[0].x(), points[1].x(), t);
			var yFinal = lerp(points[0].y(), points[1].y(), t);
			
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
	}
	*/
	
	// Returns the start of this section on the x axis.
	function start(){
		return _points[0].x();
	}
	// Returns the end of this section on the x axis.
	function end(){
		return _points[_points.length - 1].x();
	}
	
	that.start = start;
	that.end = end;
	
	that.getBezierPoint = getBezierPoint;
	
	return that;
};

ENGINE.anim.BezierCurve = function(){
	
	var that = {};
	
	// Array of BezierPoints
	// The points which represent this curve. 
	var _points = [];
	
	// Split the curve into many sections.
	var _sections = [];
	
	// Returns a point on the bezier curve at time t
	// t's range is from 0 to 1
	function getBezierPoint(t){		
		
		if(_sections.length >= 1){ // Only if we have at least 1 section in our curve.
			t = t * _sections[_sections.length - 1].end();
			t = parseFloat(t.toPrecision(4));
			var section = sectionAt(t);
			
			var sectionT = (t - section.start()) / (section.end() - section.start());
			return section.getBezierPoint(sectionT);
		}
		else{
			return ENGINE.anim.Point.zero();
		}
	}
	
	function sectionAt(t){
		var section, i;
		
		if(t === 0){
			section = _sections[0];
		}
		else{
			for(i = 0; i < _sections.length; i++){
				if(t >= _sections[i].start() && t <= _sections[i].end()){
					section = _sections[i];
					break;
				}
			}
		}
		
		return section;
	}
	
	// (parameter) p: BezierPoint
	function addPoint(p){
				
		_points.push(p);
		
		// Set the sections
		generateSections();
	}
	
	// (parameter) index: Number
	function removePoint(index){
		// Removes the point from the curve.
		_points.splice(index, 1);
		
		// Create new sections using the remaining points.
		generateSections();
	}
	
	function getPoints(){
		return _points;
	}
	
	function generateSections(){
		// Clear the sections
		_sections = [];
		var sectionPoints = [];
		
		// Must have at least two BezierPoints to make a section.
		if(_points.length >= 2){
			// Create and add the new sections
			for(var i = 0; i < _points.length - 1; ++i){
				sectionPoints = [];
				// section = P P(out) P+1(in) P+1 
				var P = _points[i], 
					Pout = _points[i].controlOut(),
					Qin = _points[i+1].controlIn(), 
					Q = _points[i+1];
					
				sectionPoints.push(P);
				
				if(!Pout.equals(P)){
					sectionPoints.push(Pout);
				}
				
				if(!Qin.equals(Q)){
					sectionPoints.push(Qin);
				}
				
				sectionPoints.push(Q);
				
				console.log("SECTION");
				console.log("########");
				
				//var sectionPoints = [P, Pout, Qin, Q];
				console.log("p.x");
				console.log(P.x());
				console.log("q.x");
				console.log(Q.x());
				
				var section = ENGINE.anim.BezierSection(sectionPoints);
				console.log("start:");
				console.log(section.start());
				_sections.push(section);
			}	
		}
	}
	
	(function init(){		
		generateSections();
	})();
	
	// Public API
	that.addPoint = addPoint;
	that.removePoint = removePoint;
	that.getPoints = getPoints;
	that.getBezierPoint = getBezierPoint;
	
	return that;
};


ENGINE.anim.AnimationCurve = function(){
	
	var that = {},
		lerp = ENGINE.maths.lerp;
	
	var _curve = ENGINE.anim.BezierCurve();
	
	// Gives the lerped result between start and end using _curve at time t.
	function calculateValue(startValue, endValue, t){
		var t2 = _curve.getBezierPoint(t).y();	
		return lerp(startValue, endValue, t2);
	}
	
	function setCurve(curve){
		_curve = curve;
	}
	
	function getCurve(){
		return _curve;
	}
	
	that.getCurve = getCurve;
	that.setCurve = setCurve;
	that.calculateValue = calculateValue;
	return that;
};

ENGINE.anim.AnimationCurve.linear = (function(){
	var animCurve = ENGINE.anim.AnimationCurve();
	
	// Set bezier points for the BezierCurve
	var curve = ENGINE.anim.BezierCurve();
	
	var start = ENGINE.anim.BezierPoint(0, 0),
		end = ENGINE.anim.BezierPoint(1, 1);
	
	curve.addPoint(start);
	curve.addPoint(end);
	
	// Set the curve in the AnimationCurve
	animCurve.setCurve(curve);
	
	return animCurve;
})();

ENGINE.anim.AnimationCurve.easeinout = (function(){
	var animCurve = ENGINE.anim.AnimationCurve();
	
	// Set bezier points for the BezierCurve
	var curve = ENGINE.anim.BezierCurve();
	
	var start = ENGINE.anim.BezierPoint(0, 0),
		end = ENGINE.anim.BezierPoint(1, 1);
		
	start.controlOut(ENGINE.anim.Point(1, 0));
	end.controlIn(ENGINE.anim.Point(0, 1));
	
	curve.addPoint(start);
	curve.addPoint(end);
	
	// Set the curve in the AnimationCurve
	animCurve.setCurve(curve);
	
	return animCurve;
})();

ENGINE.anim.AnimationCurve.easein = (function(){
	var animCurve = ENGINE.anim.AnimationCurve();
	
	// Set bezier points for the BezierCurve
	var curve = ENGINE.anim.BezierCurve();
	
	var start = ENGINE.anim.BezierPoint(0, 0),
		end = ENGINE.anim.BezierPoint(1, 1);
		
	start.controlOut(ENGINE.anim.Point(1, 0));
	end.controlIn(ENGINE.anim.Point(1, 1));
	
	curve.addPoint(start);
	curve.addPoint(end);
	
	// Set the curve in the AnimationCurve
	animCurve.setCurve(curve);
	
	return animCurve;
})();

ENGINE.anim.AnimationCurve.easeout = (function(){
	var animCurve = ENGINE.anim.AnimationCurve();
	
	// Set bezier points for the BezierCurve
	var curve = ENGINE.anim.BezierCurve();
	
	var start = ENGINE.anim.BezierPoint(0, 0),
		end = ENGINE.anim.BezierPoint(1, 1);
		
	start.controlOut(ENGINE.anim.Point(0, 0.5));
	end.controlIn(ENGINE.anim.Point(0, 1));
	
	curve.addPoint(start);
	curve.addPoint(end);
	
	// Set the curve in the AnimationCurve
	animCurve.setCurve(curve);
	
	return animCurve;
})();

ENGINE.anim.AnimationCurve.bounce = (function(){
	var animCurve = ENGINE.anim.AnimationCurve();
	
	// Set bezier points for the BezierCurve
	var curve = ENGINE.anim.BezierCurve();
	
	var start = ENGINE.anim.BezierPoint(0, 0),
		two = ENGINE.anim.BezierPoint(0.4, 1),
		three = ENGINE.anim.BezierPoint(0.75, 1),
		four = ENGINE.anim.BezierPoint(0.94, 1),
		end = ENGINE.anim.BezierPoint(1, 1);
		
	start.controlOut(ENGINE.anim.Point(0.4, 0));
	
	//mid.controlin(ENGINE.anim.Point(0.4, 1));
	two.controlOut(ENGINE.anim.Point(0.4, 0.5));
	
	three.controlIn(ENGINE.anim.Point(0.75, 0.5));
	three.controlOut(ENGINE.anim.Point(0.75, 0.75));
	
	four.controlIn(ENGINE.anim.Point(0.94, 0.75));
	four.controlOut(ENGINE.anim.Point(0.94, 0.94));
	
	end.controlIn(ENGINE.anim.Point(1, 0.94));
	
	curve.addPoint(start);
	
	curve.addPoint(two);
	curve.addPoint(three);
	curve.addPoint(four);	
	
	curve.addPoint(end);
	
	// Set the curve in the AnimationCurve
	animCurve.setCurve(curve);
	
	return animCurve;
})();