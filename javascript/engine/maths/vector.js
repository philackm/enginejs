var ENGINE = ENGINE || {};

ENGINE.namespace("ENGINE.maths.Vector2");

// Vector2 using function constructor and its prototype.
ENGINE.maths.Vector2 = (function(){

	// Dependencies
	// None
	
	// Private Properties
	var Vector2Constructor = function(xValue, yValue){
		// Force new
		if(!(this instanceof Vector2Constructor)){
			return new Vector2Constructor(xValue, yValue);
		}
		
		// Private
		var x = 1;
		var y = 0;
		
		if(typeof xValue !== "undefined" && typeof yValue !== "undefined"){
			x = xValue;
			y = yValue;
		}
		
		// Privileged functions to access the private variables.
		this.setX = function setX(value){
			x = value;
		};
		
		this.setY = function setY(value){
			y = value;
		};
		
		this.getX = function getX(){
			return x;
		};
		
		this.getY = function getY(){
			return y;
		};
	};
	
	// opposite = hypotenuse * sin(theta)
	// adjacent = hypotenuse * cos(theta)
	Vector2Constructor.prototype.setLength = function setLength(length){
		var angle = this.getAngle();
		
		var x = Math.cos(angle) * length;
		var y = Math.sin(angle) * length;
		
		this.setX(x);
		this.setY(y);
	};
	
	// C^2 = A^2 + B^2, so, C = sqrt(A^2 + B^2)
	Vector2Constructor.prototype.getLength = function getLength(){
		var x = this.getX(),
			y = this.getY();
			
		return Math.sqrt(x*x + y*y);
	};
	
	// opposite = hypotenuse * sin(theta)
	// adjacent = hypotenuse * cos(theta)
	Vector2Constructor.prototype.setAngle = function setAngle(angle){
		var length = this.getLength(),
			x = Math.cos(angle) * length,
			y = Math.sin(angle) * length;
		
		this.setX(x);
		this.setY(y);
	};
	
	// tan = o/a
	// tan^-1(o/a) = theta
	Vector2Constructor.prototype.getAngle = function getAngle(){
		return Math.atan2(this.getY(), this.getX());
	};
	
	
	// A + B = (Ax+Bx, Ay+By)
	Vector2Constructor.prototype.add = function add(v2){
		var obj = new Vector2Constructor();
		
		obj.setX(this.getX() + v2.getX());
		obj.setY(this.getY() + v2.getY());
		
		return obj;
	};
	
	// A - B = (Ax-Bx, Ay-By)
	Vector2Constructor.prototype.subtract = function subtract(v2){
		var obj = new Vector2Constructor();
		
		obj.setX(this.getX() - v2.getX());
		obj.setY(this.getY() - v2.getY());
		
		return obj;
	};
	
	// Avec * S = (Ax * S, Ay * S)
	Vector2Constructor.prototype.multiply = function multiply(scalar){
		var obj = new Vector2Constructor();
		
		obj.setX(this.getX() * scalar);
		obj.setY(this.getY() * scalar);
		
		return obj;	
	};
	
	// Affects the Vector2 that called it.
	Vector2Constructor.prototype.addTo = function addTo(v2){
		var x = this.getX() + v2.getX(),
			y = this.getY() + v2.getY();
			
		this.setX(x);
		this.setY(y);
	};
	
	Vector2Constructor.prototype.subtractFrom = function subtractFrom(v2){
		var x = this.getX() - v2.getX(),
			y = this.getY() - v2.getY();
			
		this.setX(x);
		this.setY(y);
	};
	
	Vector2Constructor.prototype.multiplyBy = function multiplyBy(scalar){
		this.setX(this.getX() * scalar);
		this.setY(this.getY() * scalar);
	};
	
	
	// A dot B = |A||B|cos(theta)
	// |A||B|cos(theta) === AxBx + AyBy
	Vector2Constructor.prototype.dot = function dot(v2){
		return this.getX() * v2.getX() + this.getY() * v2.getY();
	};
	
	// Â = A / |A| === (Ax / |A|, Ay / |A|)
	Vector2Constructor.prototype.normalised = function normalised(){
		var obj = new Vector2Constructor(),
			length = this.getLength(),
			x = this.getX() / length,
			y = this.getY() / length;
		
		obj.setX(x);
		obj.setY(y);
		
		return obj;
	};
	
	// Affects the Vector2 that called it.
	Vector2Constructor.prototype.normalise = function normalise(){
		var length = this.getLength(),
			x = this.getX() / length,
			y = this.getY() / length;
			
		this.setX(x);
		this.setY(y);
	};
	
	Vector2Constructor.prototype.toString = function(){
		return "X:" + this.getX() + ", Y:" + this.getY();
	}
	
	return Vector2Constructor;
		
})();

var ENGINE = ENGINE || {};

ENGINE.namespace("ENGINE.maths.Vector4");

// Vector4 using function constructor and its prototype.
ENGINE.maths.Vector4 = (function(){

	// Dependencies
	// None
	
	// Private Properties
	var Vector4Constructor = function(xValue, yValue, zValue, wValue){
		// Force new
		if(!(this instanceof Vector4Constructor)){
			return new Vector4Constructor(xValue, yValue, zValue, wValue);
		}
		
		// Private
		var x = 1,
			y = 0,
			z = 0,
			w = 0;
		
		if(typeof zValue === "undefined"){
			//alert("z is undefined");
		}
		
		if(typeof xValue !== "undefined" && typeof yValue !== "undefined" && typeof zValue !== "undefined" && typeof wValue !== "undefined"){
			x = xValue | 0;
			y = yValue | 0;
			z = zValue | 0;
			w = wValue | 0;
		}
		
		// Privileged functions to access the private variables.
		this.set = function set(xValue, yValue, zValue, wValue){
			x = xValue;
			y = yValue;
			z = zValue;
			w = wValue;
		}
		
		this.setX = function setX(value){
			x = value;
		};
		
		this.setY = function setY(value){
			y = value;
		};
		
		this.setZ = function setZ(value){
			z = value
		};
		
		this.setW = function setW(value){
			w = value;
		}
		
		this.getX = function getX(){
			return x;
		};
		
		this.getY = function getY(){
			return y;
		};
		
		this.getZ = function getZ(){
			return z;	
		};
		
		this.getW = function getW(){
			return w;
		};
	};
	
	Vector4Constructor.prototype.setLength = function setLength(length){
		this.normalise();
		this.multiply(length);
	};
	
	Vector4Constructor.prototype.getLength = function getLength(){
		var x = this.getX(),
			y = this.getY(),
			z = this.getZ();
			
		return Math.sqrt(x*x + y*y + z*z);
	};
	
	/*
	Vector2Constructor.prototype.setAngle = function setAngle(angle){
		var length = this.getLength(),
			x = Math.cos(angle) * length,
			y = Math.sin(angle) * length;
		
		this.setX(x);
		this.setY(y);
	};
	
	Vector2Constructor.prototype.getAngle = function getAngle(){
		return Math.atan2(this.getY(), this.getX());
	};
	*/
	
	Vector4Constructor.prototype.add = function add(v2){
		var obj = new Vector4Constructor();
		
		obj.setX(this.getX() + v2.getX());
		obj.setY(this.getY() + v2.getY());
		obj.setZ(this.getZ() + v2.getZ());
		
		return obj;
	};
	
	Vector4Constructor.prototype.subtract = function subtract(v2){
		var obj = new Vector4Constructor();
		
		obj.setX(this.getX() - v2.getX());
		obj.setY(this.getY() - v2.getY());
		obj.setZ(this.getZ() - v2.getZ());
		
		return obj;
	};
	
	Vector4Constructor.prototype.multiply = function multiply(scalar){
		var obj = new Vector4Constructor();
		
		obj.setX(this.getX() * scalar);
		obj.setY(this.getY() * scalar);
		obj.setZ(this.getZ() * scalar);
		
		return obj;	
	};
	
	Vector4Constructor.prototype.addTo = function addTo(v2){
		var x = this.getX() + v2.getX(),
			y = this.getY() + v2.getY(),
			z = this.getZ() + v2.getZ();
			
		this.setX(x);
		this.setY(y);
		this.setZ(z);
	};
	
	Vector4Constructor.prototype.subtractFrom = function subtractFrom(v2){
		var x = this.getX() - v2.getX(),
			y = this.getY() - v2.getY(),
			z = this.getZ() - v2.getZ();
			
		this.setX(x);
		this.setY(y);
		this.setZ(z);
	};
	
	Vector4Constructor.prototype.multiplyBy = function multiplyBy(scalar){
		this.setX(this.getX() * scalar);
		this.setY(this.getY() * scalar);
		this.setZ(this.getZ() * scalar);
	};
	
	Vector4Constructor.prototype.applyMatrixInPlace = function applyMatrixInPlace(matrix){

		var x = this.dot(matrix.getRow(0)),
			y = this.dot(matrix.getRow(1)),
			z = this.dot(matrix.getRow(2)),
			w = this.dot(matrix.getRow(3));	
			
		this.set(x, y, z, w);
	};
	
	Vector4Constructor.prototype.applyMatrix = function applyMatrix(matrix){
	
		/*
		var x = this.dot(matrix.getRow(0)),
			y = this.dot(matrix.getRow(1)),
			z = this.dot(matrix.getRow(2)),
			w = this.dot(matrix.getRow(3));	
		*/
			
		var x = this.getX() * matrix.matrix[0][0] + this.getY() * matrix.matrix[0][1] + this.getZ() * matrix.matrix[0][2] + this.getW() * matrix.matrix[0][3],
			y = this.getX() * matrix.matrix[1][0] + this.getY() * matrix.matrix[1][1] + this.getZ() * matrix.matrix[1][2] + this.getW() * matrix.matrix[1][3],
			z = this.getX() * matrix.matrix[2][0] + this.getY() * matrix.matrix[2][1] + this.getZ() * matrix.matrix[2][2] + this.getW() * matrix.matrix[2][3],
			w = this.getX() * matrix.matrix[3][0] + this.getY() * matrix.matrix[3][1] + this.getZ() * matrix.matrix[3][2] + this.getW() * matrix.matrix[3][3];
		
		var obj = new Vector4Constructor();
		obj.set(x, y, z, w);
		
		return obj;
	};

	Vector4Constructor.prototype.dot = function dot(v2){
		return this.getX() * v2.getX() + this.getY() * v2.getY() + this.getZ() * v2.getZ() + this.getW() * v2.getW();
	};
	
	Vector4Constructor.prototype.normalised = function normalised(){
		var obj = new Vector4Constructor(),
			length = this.getLength(),
			x = this.getX() / length,
			y = this.getY() / length,
			z = this.getZ() / length;
		
		obj.setX(x);
		obj.setY(y);
		obj.setZ(z);
		
		return obj;
	};
	
	Vector4Constructor.prototype.normalise = function normalise(){
		var length = this.getLength(),
			x = this.getX() / length,
			y = this.getY() / length,
			z = this.getZ() / length;
			
		this.setX(x);
		this.setY(y);
		this.setZ(z);
	};
	
	Vector4Constructor.prototype.toString = function(){
		return "X:" + this.getX() + ", Y:" + this.getY() + ", Z:" + this.getZ() + ", W:" + this.getW();
	}
	
	return Vector4Constructor;
		
})();


// Testing
(function(){
	
	console.log(ENGINE);
	
	// Creation
	var v = new ENGINE.maths.Vector2(1, 0);
	var v2 = new ENGINE.maths.Vector2(10, 10);
	
	// Assert default creation
	console.assert(v.getX() === 1 && v.getY() === 0, "Default Creation Failed");
	
	// Setting and getting values.
	v.setX(2);
	v.setY(2);
	
	console.assert(v.getX() === 2, "Setting or Getting Failed");
	console.assert(v.getY() === 2, "Getting or Getting Failed");
	
	// Length
	console.assert(v.getLength() === Math.sqrt(8), "Length Failed");
	
	// Adding & subtracting
	var v3 = v.add(v2);
	var v4 = v2.subtract(v);
	
	console.assert(v3.getX() === 12 && v3.getY() === 12, "Adding Failed");
	console.assert(v4.getX() === 8 && v4.getY() === 8, "Subtraction Failed");
	
	// Angles
	
	// pi/4 == 45 degrees
	console.assert(v.getAngle() === Math.PI / 4, "Getting Angle Failed"); 
	
	v = new ENGINE.maths.Vector2(1, 0);
	v.setAngle(Math.PI / 2);
	
	console.assert(v.getAngle() === Math.PI / 2, "Setting Angle Failed");
	console.assert(v.getY() === 1, "Setting Angle Failed");
	
	// Dot & normalising
	v.setAngle(0);
	var v2 = new ENGINE.maths.Vector2(0, 1);
	
	console.assert(v.dot(v) === 1, "Dot Failed");
	console.assert(v.dot(v2) === 0, "Dot Failed");
	
	console.assert(v.normalised().getLength() === 1, "Normalisation failed.");
	console.assert(v2.normalised().getLength() === 1, "Normalisation failed.");
	console.assert(v3.normalised().getLength() === 1, "Normalisation failed.");
	console.assert(Math.round(v4.normalised().getLength()) === 1, "Normalisation failed.");
	
	// Multiplication
	
	var v5 = new ENGINE.maths.Vector2(5, 5);
	var v6 = v5.multiply(2);
	
	console.assert(v6.getX() === 10 && v6.getY() === 10, "Multiplication failed.");
	
	// Setting Length
	var v7 = new ENGINE.maths.Vector2(10, 10);
	v7.setLength(1);
	console.assert(v7.getLength() === 1, "Setting Length Failed");
})();














