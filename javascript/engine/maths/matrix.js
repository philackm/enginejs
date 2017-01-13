var ENGINE = ENGINE || {};

ENGINE.namespace("ENGINE.maths.Matrix");

// Vector using function constructor and its prototype.
ENGINE.maths.Matrix = (function(){

	// Dependencies
	// None
	
	// Private Properties
	var MatrixConstructor = function(){
		// Force new
		if(!(this instanceof MatrixConstructor)){
			return new MatrixConstructor();
		}
		
		// Private
		var matrix = [[],[],[],[]];
		
		// Row 1
		matrix[0] = [1, 0, 0, 0];
		matrix[1] = [0, 1, 0, 0];
		matrix[2] = [0, 0, 1, 0];
		matrix[3] = [0, 0, 0, 1];
		
		this.get = function get(row, column){
			return matrix[row][column];
		};
		
		this.set = function set(row, column, value){
			matrix[row][column] = value;
		};
		
		this.getRow = function getRow(row){
			var x = matrix[row][0],
				y = matrix[row][1],
				z = matrix[row][2],
				w = matrix[row][3];
			 			 			 			 
			return new ENGINE.maths.Vector4(x, y, z, w);
		}
		
		this.getColumn = function getColumn(column){
			var x = matrix[0][column],
				y = matrix[1][column],
				z = matrix[2][column],
				w = matrix[3][column];
								
			return new ENGINE.maths.Vector4(x, y, z, w);
		}
		
		this.matrix = matrix;
	};
	
	// Convenience
	MatrixConstructor.TranslationMatrix = function(x, y, z){
		var m = new MatrixConstructor();
		
		m.set(0, 3, x);
		m.set(1, 3, y);
		m.set(2, 3, z);
		
		return m;
	}
	
	MatrixConstructor.ScaleMatrix = function(x, y, z){
		var m = new MatrixConstructor();
		
		m.set(0, 0, x);
		m.set(1, 1, y);
		m.set(2, 2, z);
		
		return m;
	}
	
	MatrixConstructor.RotationXMatrix = function(radians){
		var m = new MatrixConstructor();
		
		m.matrix[0] = [1, 0, 0, 0];
		m.matrix[1] = [0, Math.cos(radians), -Math.sin(radians), 0];
		m.matrix[2] = [0, Math.sin(radians), Math.cos(radians), 0];
		m.matrix[3] = [0, 0, 0, 1];
		
		return m;
	}
	
	MatrixConstructor.RotationYMatrix = function(radians){
		var m = new MatrixConstructor();
		
		m.matrix[0] = [Math.cos(radians), 0, Math.sin(radians), 0];
		m.matrix[1] = [0, 1, 0, 0];
		m.matrix[2] = [-Math.sin(radians), 0, Math.cox(radians), 0];
		m.matrix[3] = [0, 0, 0, 1];
		
		return m;
	}
	
	MatrixConstructor.RotationZMatrix = function(radians){
		var m = new MatrixConstructor();
		
		m.matrix[0] = [Math.cos(radians), -Math.sin(radians), 0, 0];
		m.matrix[1] = [Math.sin(radians), Math.cos(radians), 0, 0];
		m.matrix[2] = [0, 0, 1, 0];
		m.matrix[3] = [0, 0, 0, 1];
		
		return m;
	}
	
	// Prototype methods
	MatrixConstructor.prototype.multiplyBy = function(m2){
		
		var results = new MatrixConstructor();
		var m = this.matrix;
		var m2 = m2.matrix;
		
		results.matrix[0][0] = m[0][0] * m2[0][0] + m[1][0] * m2[0][1] + m[2][0] * m2[0][2] + m[3][0] * m2[0][3];
		results.matrix[0][1] = m[0][1] * m2[0][0] + m[1][1] * m2[0][1] + m[2][1] * m2[0][2] + m[3][1] * m2[0][3];
		results.matrix[0][2] = m[0][2] * m2[0][0] + m[1][2] * m2[0][1] + m[2][2] * m2[0][2] + m[3][2] * m2[0][3];
		results.matrix[0][3] = m[0][3] * m2[0][0] + m[1][3] * m2[0][1] + m[2][3] * m2[0][2] + m[3][3] * m2[0][3];
		
		results.matrix[1][0] = m[0][0] * m2[1][0] + m[1][0] * m2[1][1] + m[2][0] * m2[1][2] + m[3][0] * m2[1][3];
		results.matrix[1][1] = m[0][1] * m2[1][0] + m[1][1] * m2[1][1] + m[2][1] * m2[1][2] + m[3][1] * m2[1][3];
		results.matrix[1][2] = m[0][2] * m2[1][0] + m[1][2] * m2[1][1] + m[2][2] * m2[1][2] + m[3][2] * m2[1][3];
		results.matrix[1][3] = m[0][3] * m2[1][0] + m[1][3] * m2[1][1] + m[2][3] * m2[1][2] + m[3][3] * m2[1][3];
		
		results.matrix[2][0] = m[0][0] * m2[2][0] + m[1][0] * m2[2][1] + m[2][0] * m2[2][2] + m[3][0] * m2[2][3];
		results.matrix[2][1] = m[0][1] * m2[2][0] + m[1][1] * m2[2][1] + m[2][1] * m2[2][2] + m[3][1] * m2[2][3];
		results.matrix[2][2] = m[0][2] * m2[2][0] + m[1][2] * m2[2][1] + m[2][2] * m2[2][2] + m[3][2] * m2[2][3];
		results.matrix[2][3] = m[0][3] * m2[2][0] + m[1][3] * m2[2][1] + m[2][3] * m2[2][2] + m[3][3] * m2[2][3];
		
		results.matrix[3][0] = m[0][0] * m2[3][0] + m[1][0] * m2[3][1] + m[2][0] * m2[3][2] + m[3][0] * m2[3][3];
		results.matrix[3][1] = m[0][1] * m2[3][0] + m[1][1] * m2[3][1] + m[2][1] * m2[3][2] + m[3][1] * m2[3][3];
		results.matrix[3][2] = m[0][2] * m2[3][0] + m[1][2] * m2[3][1] + m[2][2] * m2[3][2] + m[3][2] * m2[3][3];
		results.matrix[3][3] = m[0][3] * m2[3][0] + m[1][3] * m2[3][1] + m[2][3] * m2[3][2] + m[3][3] * m2[3][3];
		
		/*		
		// Slow version
		results.matrix[0][0] = m.getColumn(0).dot(m2.getRow(0));
		results.matrix[0][1] = m.getColumn(1).dot(m2.getRow(0));
		results.matrix[0][2] = m.getColumn(2).dot(m2.getRow(0));
		results.matrix[0][3] = m.getColumn(3).dot(m2.getRow(0));
		
		results.matrix[1][0] = m.getColumn(0).dot(m2.getRow(1));
		results.matrix[1][1] = m.getColumn(1).dot(m2.getRow(1));
		results.matrix[1][2] = m.getColumn(2).dot(m2.getRow(1));
		results.matrix[1][3] = m.getColumn(3).dot(m2.getRow(1));
		
		results.matrix[2][0] = m.getColumn(0).dot(m2.getRow(2));
		results.matrix[2][1] = m.getColumn(1).dot(m2.getRow(2));
		results.matrix[2][2] = m.getColumn(2).dot(m2.getRow(2));
		results.matrix[2][3] = m.getColumn(3).dot(m2.getRow(2));
		
		results.matrix[3][0] = m.getColumn(0).dot(m2.getRow(3));
		results.matrix[3][1] = m.getColumn(1).dot(m2.getRow(3));
		results.matrix[3][2] = m.getColumn(2).dot(m2.getRow(3));
		results.matrix[3][3] = m.getColumn(3).dot(m2.getRow(3));
		*/
		
		return results;
	}
	
	MatrixConstructor.prototype.multiplyByScalar = function(scalar){
		
		var results = new MatrixConstructor();
		var m = this.matrix;
		
		results.matrix[0][0] = m[0][0] * scalar;
		results.matrix[0][1] = m[0][1] * scalar;
		results.matrix[0][2] = m[0][2] * scalar;
		results.matrix[0][3] = m[0][3] * scalar;
		
		results.matrix[1][0] = m[1][0] * scalar;
		results.matrix[1][1] = m[1][1] * scalar;
		results.matrix[1][2] = m[1][2] * scalar;
		results.matrix[1][3] = m[1][3] * scalar;
		
		results.matrix[2][0] = m[2][0] * scalar;
		results.matrix[2][1] = m[2][1] * scalar;
		results.matrix[2][2] = m[2][2] * scalar;
		results.matrix[2][3] = m[2][3] * scalar;
		
		results.matrix[3][0] = m[0][0] * scalar;
		results.matrix[3][1] = m[0][1] * scalar;
		results.matrix[3][2] = m[0][2] * scalar;
		results.matrix[3][3] = m[0][3] * scalar;
		
		return results;
	}
	
	MatrixConstructor.prototype.toConsole = function(){
		
		var a = this.get(0, 0), b = this.get(0, 1), c = this.get(0, 2), d = this.get(0, 3);
		var e = this.get(1, 0), f = this.get(1, 1), g = this.get(1, 2), h = this.get(1, 3);
		var i = this.get(2, 0), j = this.get(2, 1), k = this.get(2, 2), l = this.get(2, 3);
		var m = this.get(3, 0), n = this.get(3, 1), o = this.get(3, 2), p = this.get(3, 3);
		
		console.log(a + "," + b + "," + c + "," + d);
		console.log(e + "," + f + "," + g + "," + h);
		console.log(i + "," + j + "," + k + "," + l);
		console.log(m + "," + n + "," + o + "," + p);
	}
	
	MatrixConstructor.prototype.setTranslation = function(tx, ty, tz){
		this.matrix[0][3] = tx;
		this.matrix[1][3] = ty;
		this.matrix[2][3] = tz;
	}
	
	// Static method to clone another matrix.
	MatrixConstructor.clone = function clone(m){
		var clone = new MatrixConstructor();
		
		m = m.matrix;
		
		clone.matrix[0][0] = m[0][0];
		clone.matrix[0][1] = m[0][1];
		clone.matrix[0][2] = m[0][2];
		clone.matrix[0][3] = m[0][3];
		
		clone.matrix[1][0] = m[1][0];
		clone.matrix[1][1] = m[1][1];
		clone.matrix[1][2] = m[1][2];
		clone.matrix[1][3] = m[1][3];
		
		clone.matrix[2][0] = m[2][0];
		clone.matrix[2][1] = m[2][1];
		clone.matrix[2][2] = m[2][2];
		clone.matrix[2][3] = m[2][3];
		
		clone.matrix[3][0] = m[3][0];
		clone.matrix[3][1] = m[3][1];
		clone.matrix[3][2] = m[3][2];
		clone.matrix[3][3] = m[3][3];
		
		return clone;
	}
	
	return MatrixConstructor;
		
})();

// Testing
(function(){
	
	console.log(ENGINE);
	console.log("Matrix Tests");
	
	var m = ENGINE.maths.Matrix();
	console.assert(m.get(0, 0) === 1, "Default Creation Failed");
	
	var scale = ENGINE.maths.Matrix.ScaleMatrix(2, 2, 2);
	var translation = ENGINE.maths.Matrix.TranslationMatrix(10, 20, 30);
	
	scale.toConsole();
	translation.toConsole();
	
	var combination = scale.multiplyBy(translation);
	
	console.log("combination");
	combination.toConsole();

	var position = ENGINE.maths.Vector4(10, 10, 0, 1);
	
	position.applyMatrix(combination);
	console.log(position.toString());

})();














