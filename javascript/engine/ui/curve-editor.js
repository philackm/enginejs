var ENGINE = ENGINE || {};
ENGINE.namespace("ENGINE.UI.CurveEditorPoint");
ENGINE.namespace("ENGINE.UI.CurveEditor");
ENGINE.namespace("ENGINE.UI.Rect");

ENGINE.UI.CurveEditorPoint = function(x, y){
	
	var that = {};
	
	var _position = ENGINE.maths.Vector4(x, y, 0, 1),
		_controlIn = {},
		_controlOut = {},
		_radius = 15;
	
	function render(){
		var context = ENGINE.graphics.canvas.getContext();
		
		var px = _position.getX(),
			py = _position.getY();
		
		context.beginPath();
		context.arc(px, py, _radius, 0, 2*Math.PI);
		context.closePath();
		
		context.fillStyle = "#ffffff";
		context.fill();
	}
	
	function controlIn(value){
		if(typeof value !== "undefined"){
			_controlIn = value;
		}
		return _controlIn;
	}
	
	function controlOut(value){
		if(typeof value !== "undefined"){
			_controlOut = value;
		}
		return _controlOut;
	}
	
	function controlPoints(){
		return [_controlIn, _controlOut];
	}
	
	function xValue(value){
		if(typeof value === "number"){
			_position.setX(value);	
		}
		
		return _position.getX();
	}
	
	function yValue(value){
		if(typeof value === "number"){
			_position.setY(value);	
		}
		
		return _position.getY();
	}
	
	that.radius = function(){ return _radius; }; 
	
	that.x = xValue;
	that.y = yValue;
	
	that.controlIn = controlIn;
	that.controlOut = controlOut;
	that.controlPoints = controlPoints;
	
	that.render = render;
	
	return that;
};

ENGINE.UI.CurveEditor = function(frame, spec){
	var that = {};
	spec = spec || {};
	
	// State
	var _frame = frame,					// Enclosure for the editor
		_points = [],			 		// The points in the UI
		_bezierCurve = ENGINE.anim.BezierCurve(),					// A curve created using the ui points.
		
		_selectedPoint = null, 	 		// The point that is currently selected
		_currentlyDragging = null, 		// The point we are currently dragging.
		_newPoint = null;
		
	// Settings
	var _defaultWidth = 800,
		_defaultHeight = 400,
	
		_backgroundColor = spec.backgroundColor || ENGINE.graphics.Color.black,
		_outlineColor = spec.outlineColor || ENGINE.graphics.Color.grey,
		_lineColor = spec.lineColor || ENGINE.graphics.Color.white, 
		_labelColor = spec.labelColor || ENGINE.graphics.Color.grey,
		_dotColor = spec.dotColor || ENGINE.graphics.Color.red,
		_dotSelectedColor = spec.dotSelectedColor || ENGINE.graphics.Color.green,
		_dotOutlineColor = spec.dotOutlineColor || ENGINE.graphics.Color.white,
		_controlLineColor = spec.controlLineColor || ENGINE.graphics.Color.magenta,
		_controlPointColor = spec.controlpointColor || ENGINE.graphics.Color.magenta,
		
		_dotSize = spec.dotSize || 10,
		_dotBorderSize = spec.dotSize || 5,
		_controlPointSize = spec.controlPointSize || 20,
		_controlLineWidth = spec.controlLineWidth || 2,
		_curveLineWidth = spec.curveLineWidth || 4;
		
	that.delegate = {};
	
	// Private helper methods.
	function position(){
		return { x: _frame.getX(), y: _frame.getY() };
	}
	
	function width(){
		return _frame.width();
	}
	
	function height(){
		return _frame.height();
	}
	
	// Checks to see if there is a point below this co-ordinate,
	// if there is it returns it, otherwise it returns null.
	function pointBelow(x, y){
		
		var returnValue = null;
		
		for(var p in _points){
			
			var point = _points[p];
			
			if(inRange(x, y, point)){
				returnValue = point;
			}
		}
		
		// Also check if we are above a control point.
		if(_selectedPoint){
			var controlPoints = _selectedPoint.controlPoints();
			
			for(var p in controlPoints){
				var control = controlPoints[p];
				if(inRange(x, y, control, 15)){
					returnValue = control;
				}	
			}
		}
		
		return returnValue;
	}
	
	function inRange(x, y, point, radius){

		var distance = distanceFromPointCentre(x, y, point),
			pointRadius = typeof radius !== "undefined" ? radius : point.radius();
			
		return distance < pointRadius;
	}
		
	
	// Returns the distance from the centre of a point in pixels.
	function distanceFromPointCentre(x, y, point){
			
		var dx = x - point.x(),
			dy = y - point.y();
		
		return Math.sqrt(dx*dx + dy*dy);
	}
	
	// Check if a point is the currently selected point or not.
	function isSelected(point){
		return point === _selectedPoint;
	}
	
	// extracts all the points we want to use for the curve from 
	// the editor points
	function bezierPoints(){
		
		var bez = [];
		var numPoints = 0, i;
		
		// The first point
		bez[numPoints++] = _points[0];
		bez[numPoints++] = _points[0].controlOut();
		
		// Any points in between.
		for(i = 1; i < _points.length - 1; i++){
			bez[numPoints++] = _points[i].controlIn();
			bez[numPoints++] = _points[i];
			bez[numPoints++] = _points[i].controlOut();
		}
		
		// The last point
		bez[numPoints++] = _points[i].controlIn();
		bez[numPoints++] = _points[i];
		
		return bez;
	}
	
	// Events
	var pointAdded = function(point){},
		pointMoved = function(point){},
		pointRemoved = function(point){},
		pointSelected = function(point){ _selectedPoint = point; console.log(_selectedPoint); };
	

	// Drawing
	function drawBackground(context){
		
		context.beginPath();
			context.rect(_frame.getX(), _frame.getY(), _frame.width(), _frame.height());
		context.closePath();
		
		context.fillStyle = _backgroundColor.hex();
		
		context.strokeColor = _outlineColor.hex();
		context.lineWidth = 2;
		context.stroke();
	}
	
	function drawCircle(x, y, radius, spec){
		var context = ENGINE.graphics.canvas.getContext();
		spec = spec || {};
		
		context.beginPath();
			context.arc(x, y, radius, 0, 2*Math.PI);
		context.closePath();
		
		if(spec.fillColor){
			context.fillStyle = spec.fillColor.hex();
		}
		
		context.fill();
	}
	
	function drawSquare(x, y, size, spec){
		var context = ENGINE.graphics.canvas.getContext();
		spec = spec || {};
		
		context.rect(x, y, size, size);
		
		if(spec.fillColor){
			context.fillStyle = spec.fillColor.hex();
		}
		
		context.fill();
	}
	
	function drawLine(from, to, spec){
		var context = ENGINE.graphics.canvas.getContext();
		spec = spec || {};
		
		context.save();
		
		context.beginPath();
		context.moveTo(from.x, from.y);
		context.lineTo(to.x, to.y);
		
		if(spec.lineColor){
			context.strokeStyle = spec.lineColor.hex();
		}
		if(spec.lineWidth){
			context.lineWidth = spec.lineWidth;
		}
		
		context.stroke();
		context.restore();
	}
	
	function drawPoints(){
		// Draw the control points for the selected point first
		if(_selectedPoint){
			drawControlPoints(_selectedPoint);
		}
		
		for(var p in _points){
			var point = _points[p];
			
			var px = point.x(),
				py = point.y();
			
			// Draw the "outline"					
			drawCircle(px, py, _dotSize + _dotBorderSize, {fillColor: _dotOutlineColor});
			
			// Draw the inside
			drawCircle(px, py, _dotSize, {fillColor: isSelected(point) ? _dotSelectedColor : _dotColor});
		}
		
		if(_newPoint){
			var nx = _newPoint.x(),
				ny = _newPoint.y();
			
			drawCircle(nx, ny, _dotSize + _dotBorderSize, {fillColor: _dotOutlineColor});
			drawCircle(nx, ny, _dotSize, {fillColor: _dotColor});
		}
	}
	
	// Draws the control points for a point.
	function drawControlPoints(point){
		
		// line from point to control in
		var from = {x: point.x(), y: point.y()},
			to = {x: point.controlIn().x(), y: point.controlIn().y()};			
		drawLine(from, to, {lineColor: _controlLineColor, lineWidth: _controlLineWidth});

		// line from the point to control out
		to = {x: point.controlOut().x(), y: point.controlOut().y()};			
		drawLine(from, to, {lineColor: _controlLineColor, lineWidth: _controlLineWidth});
				
		// square at control in
		var x = point.controlIn().x() - _controlPointSize / 2,
			y = point.controlIn().y() - _controlPointSize / 2;
		drawSquare(x, y, _controlPointSize, {fillColor: _controlPointColor});
		
		// square at control out
		x = point.controlOut().x() - _controlPointSize / 2,
		y = point.controlOut().y() - _controlPointSize / 2;
		drawSquare(x, y, _controlPointSize, {fillColor: _controlPointColor});
	}
	
	function drawCurve(context){
		
		var width = _frame.width(),
			height = _frame.height();
		
		context.beginPath();
		for(var t = 0; parseFloat(t.toPrecision(4)) <= 1; t += 0.01){
			var p = pointAt(t);
			
			// When the points are normalised we have to do this:
			context.lineTo(_frame.getX() + p.x() * width, _frame.getY() + height - p.y() * height);
		}
			
		context.lineCap = "round";
		context.lineWidth = "5";
		context.strokeStyle = "#eeeeee";
		context.stroke();
	}

	function pointAt(t){
		return that.delegate.pointAt(t);
	}
	
	(function init(){
			
		var leftBounds = _frame.getX(),
			rightBounds = leftBounds + _frame.width(),
			topBounds = _frame.getY(),
			bottomBounds = topBounds + _frame.height();
				
		function checkBounds(mouseX, mouseY){
			
			var widthOK = mouseX > leftBounds && mouseX < leftBounds + _frame.width(),
				heightOK = mouseY > topBounds && mouseY < topBounds + _frame.height();
				
			return widthOK && heightOK;
		}
		
		// Set up the mouse events for the editor.
		
		// Hovering
		
		ENGINE.input.mouse.onMove(function(mouseEvent){
			var x = mouseEvent.clientX * 2,
				y = mouseEvent.clientY * 2;
			
			
			var points = [];
			// create a bunch of points
			
			for(var time = 0; time <= 1; time += 0.01){
				points.push(pointAt(time));
			}
			
			// check if you are near one of them
			for(var pointIndex in points){
				
				//console.log(points[pointIndex].x());
				
				if(inRange(x, y, points[pointIndex], 20)){
					_newPoint = points[pointIndex];
					console.log("drawing");
					break;
				}
				else{
					_newPoint = null;
				}
			}
		});
		
		// Clicking
		
		ENGINE.input.mouse.onClick(function(mouseEvent){	
			var x = mouseEvent.clientX * 2,
				y = mouseEvent.clientY * 2;
			
			var point = pointBelow(x, y);
			if(point){
				var isControl = (typeof point.controlIn === "undefined");	
			}
			
			if(point && !isControl){
				_selectedPoint = point;
			} else if(checkBounds(x, y)){
				_selectedPoint = null;
			}
			
			// Add a new point on click
			if(!point){
				if(_newPoint){
					insertPoint(_newPoint, 1);
				}	
			}
		});
		
		// Dragging
		
		// Dragging begins
		ENGINE.input.mouse.onDragStart(function(mouseEvent){
			
			var x = mouseEvent.clientX * 2,
				y = mouseEvent.clientY * 2;
			
			var point = pointBelow(x, y);
			if(point){
				var isControl = (typeof point.controlIn === "undefined");	
			}
			 
			if(point && !isControl){
				_selectedPoint = _currentlyDragging = point;
			} else if(point){
				_currentlyDragging = point;	
			} else if(checkBounds(x, y)){ // we're above the editor
				 
			}
		});
		
		// Each time the mouse moves when dragging
		ENGINE.input.mouse.onDrag(function(mouseEvent){
			var x = mouseEvent.clientX * 2,
				y = mouseEvent.clientY * 2;
			
			if(_currentlyDragging){
				_currentlyDragging.x(ENGINE.maths.clamp(leftBounds, rightBounds, x));
				_currentlyDragging.y(ENGINE.maths.clamp(topBounds, bottomBounds, y));
			}
			
			console.log("dragging");
		});
		
		// When the dragging stops, i.e., the user lifts up the mouse button.
		ENGINE.input.mouse.onDragEnd(function(mouseEvent){
			_currentlyDragging = null;
		});
		
	})();
	
	/* Called in the layers */
	function update(dt){
		
	}
	
	function render(){
		var context = ENGINE.graphics.canvas.getContext();
		
		drawBackground(context);
		
		drawCurve(context);
		drawPoints();
	}
	
	function insertPoint(point, index){
		
		var newPoint = ENGINE.UI.CurveEditorPoint(point.x(), point.y());
		
		var cix = point.x() - 100, 
			ciy = point.y();
			
		var cox = point.x() + 100, 
			coy = point.y();
			
		var uiIN = ENGINE.anim.Point(cix, ciy),
			uiOUT = ENGINE.anim.Point(cox, coy);
			
		newPoint.controlIn(uiIN);
		newPoint.controlOut(uiOUT);
		
		_points.splice(index, 0, newPoint);
	}
	
	function setPoints(points){
		
		var left = _frame.getX(),
			top = _frame.getY(),
			width = _frame.width(),
			height = _frame.height();
		
		for(var p in points){
			var point = points[p];
				
			var x = left + point.x() * width,
				y = top + height - point.y() * height;
				
			var newPoint = ENGINE.UI.CurveEditorPoint(x, y);
			
			newPoint.onClick = pointSelected;
			
			var cix = left + point.controlIn().x() * width, 
				ciy = top + height - point.controlIn().y() * height;
			
			var cox = left + point.controlOut().x() * width, 
				coy = top + height - point.controlOut().y() * height;
	
			var uiIN = ENGINE.anim.Point(cix, ciy),
				uiOUT = ENGINE.anim.Point(cox, coy);
			
			newPoint.controlIn(uiIN);
			newPoint.controlOut(uiOUT);
			
			_points.push(newPoint);
		}
		
		console.log(bezierPoints());
	}
	
	// Public
	that.setPoints = setPoints;
	that.update = update;
	that.render = render;
	return that;
};

ENGINE.UI.Rect = function(spec){
	var that = {};
	spec = spec || {};
	
	var _x = spec.x || 0, 
		_y = spec.y || 0, 
		_width = spec.width || 160,
		_height = spec.height || 100;
		
	function width(value){
		if(typeof value == "number"){
			_width = value;
		}
		return _width;
	}
	
	function height(value){
		if(typeof value == "number"){
			_height = value;
		}
		return _height;
	}
	
	function getX(){
		return _x;
	}
	
	function getY(){
		return _y;
	}
	
	function setX(value){
		_x = value;
	}
	
	function setY(value){
		_y = value;
	}
	
	function setPosition(x, y){
		if(typeof x === "number" && typeof y === "number"){
			_x = x;
			_y = y;	
		}
	}		

	function x(value){
		if(typeof value == "number"){
			_x = value;
		}
		return _x;
	}
	
	function y(value){
		if(typeof value == "number"){
			_y = value;
		}
		return _y;
	}
	
	that.getX = getX;
	that.getY = getY;
	that.setX = setX;
	that.setY = setY;
	that.x = x;
	that.y = y;
	
	that.width = width;
	that.height = height;
	that.setPosition = setPosition;
	return that;	
};