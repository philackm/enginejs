var ENGINE = ENGINE || {};

ENGINE.namespace("ENGINE.graphics.Color");

ENGINE.graphics.Color = function(){
	var that = {},
	
	// Private
	r = 0,
	g = 0,
	b = 0, 
	a = 1;
	
	function rgb(){
		return "rgb(" + r + "," + g + "," + b + ")";
	}
	
	function rgba(){
		return "rgba(" + r + "," + g + "," + b + "," + a + ")";
	}
	
	function hex(){
		var hexString = "#";
		hexString += toHex(r);
		hexString += toHex(g);
		hexString += toHex(b);
		
		return hexString;
	}
	
	function setColor(red, green, blue, alpha){
		r = clamp(red, 0, 255);
		g = clamp(green, 0, 255);
		b = clamp(blue, 0, 255);
		a = clamp(alpha, 0, 1);
	}
	
	function setAlpha(alpha){
		a = alpha;
	}
	
	function toHex(value){
		
		var hex = ""; 
		
		// We want to return two numbers so we create a well formed hex string.
		if(value < 15){
			hex += "0";
		} 
		
		return hex + value.toString(16);
	}
	
	function clamp(value, min, max){
		if(value < min){
			return min;
		}
		else if(value > max){
			return max;
		}
		else{
			return value;
		}
	}
	
	function toString(){
		var ret = "";
		
		ret += hex();
		ret += ", ";
		ret += rgb();
		
		return ret;
	}
	
	// Public API
	that.rgb = rgb;
	that.rgba = rgba;
	that.hex = hex;
	
	that.setColor = setColor;
	that.setAlpha = setAlpha;
	that.toString = toString;
	
	return that;
};

// Convenience
var Color = ENGINE.graphics.Color;

ENGINE.graphics.Color.fromRGB = function(r, g, b){
	var that = Color();
	
	that.setColor(r, g, b, 1);
	
	return that;
};

ENGINE.graphics.Color.fromRGBA = function(r, g, b, a){
	var that = Color();
	
	that.setColor(r, g, b, a);
	
	return that;
};

// Usage examples:
// Color.fromHex("FFF");
// Color.fromHex("#FFF");
// Color.fromHex("#FFFFFF");

ENGINE.graphics.Color.fromHEX = function(hexString){
	var that = Color(),
		r = 0,
		g = 0,
		b = 0;
	
	// Remove the hash if it is there.
	if(hexString.charAt(0) === "#"){
		hexString = hexString.slice(1, hexString.length);
	}
		
	// If it's longer than six characters, strip it down.
	if(hexString.length > 6){
		hexString = hexString.slice(0, 6);
	}
	
	switch(hexString.length){
		case 6:
			r = parseInt(hexString.slice(0, 2), 16);
			g = parseInt(hexString.slice(2, 4), 16);
			b = parseInt(hexString.slice(4, 6), 16);
			break;
		case 3:
			var rt = parseInt(hexString.slice(0, 1), 16),
				gt = parseInt(hexString.slice(1, 2), 16),
				bt = parseInt(hexString.slice(2, 3), 16),
			
			r = rt + (rt * 16);
			g = gt + (gt * 16);
			b = bt + (bt * 16);
			break;
		default: // Not a well formed hex string, return black.
			break;
	}
	
	that.setColor(r, g, b, 1);
	
	return that;
};

// Bad random function
ENGINE.graphics.Color.random = function(){
	var color = Math.floor(Math.random() * 6);
	
	switch(color){
		case 0:
			color = ENGINE.graphics.Color.white;
			break;
		case 1:
			color = ENGINE.graphics.Color.black;
			break;
		case 2:
			color = ENGINE.graphics.Color.red;
			break;
		case 3:
			color = ENGINE.graphics.Color.green;
			break;
		case 4:
			color = ENGINE.graphics.Color.yellow;
			break;
		case 5:
			color = ENGINE.graphics.Color.blue;
			break;
	}
	
	return color;
};

// Colors
ENGINE.graphics.Color.white = Color.fromHEX("#FFFFFF");
ENGINE.graphics.Color.black = Color.fromHEX("#000000");
ENGINE.graphics.Color.red = Color.fromHEX("#FF0000");
ENGINE.graphics.Color.green = Color.fromHEX("#00FF00");
ENGINE.graphics.Color.blue = Color.fromHEX("#0000FF");
ENGINE.graphics.Color.yellow = Color.fromHEX("#FFFF00");
ENGINE.graphics.Color.orange = Color.fromHEX("#FF8000");
ENGINE.graphics.Color.magenta = Color.fromHEX("#FF00FF");
ENGINE.graphics.Color.grey = Color.fromHEX("#888888");

ENGINE.graphics.Color.cornflowerBlue = Color.fromHEX("#93CCEA");

console.log(Color.white.hex());
console.log(Color.white.rgb());
console.log(Color.red.rgba());
console.log(Color.red.hex());

console.log(Color.cornflowerBlue.toString());

var a = 15, b = 16, c = 17;

console.log(a.toString(16));
console.log(b.toString(16));
console.log(c.toString(16));




