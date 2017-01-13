var ENGINE = ENGINE || {};
ENGINE.namespace("ENGINE.anim.Animation");

ENGINE.anim.Animation = function(spec){

	var that = {};
	spec = spec || {};
	
	// Animation settings
	var _length = spec.length || 1000,
		_object = spec.object || {},
		
		_animations = spec.animation || null,
		
		_originalValues = {},
		
		_started = spec.started || function(){ console.log("started animation"); },
		_stepped = spec.stepped || function() {console.log("completed animation frame"); },
		_finished = spec.finished || function(){ console.log("finished animation"); },
		_cancelled = spec.cancelled || function(){ console.log("cancelled animation"); },
		
	// Private state:
		_animating = false,
		_elapsed = 0;
	
	function process(step){
		
		var finished = false,
			t;
		
		_elapsed += step;
		t = _elapsed / _length;
		
		if(_elapsed < _length){ // Still have time to go on the animation, keep updating.
			
			// Go through each 'animation', that is, each property to update.
			for(var anim in _animations){
				if(typeof _object[anim] !== "undefined"){ // Only update if that property exists
					
					var curve = _animations[anim].curve,
						start = _animations[anim].from,
						end = _animations[anim].to;
					
					_object[anim] = curve.calculateValue(start, end, t);
				}
			}
			_stepped(_object);
		}
		else{
			finished = true;
		}
		
		return finished;
	}
	
	function begin(){
		_animating = true;
		
		for(var anim in _animations){
			// Set object value to startValue, (leaves it at its current value if "from" is undefined).
			if(_object[anim]){
				if(typeof _animations[anim].from !== "undefined"){
					_object[anim] = _animations[anim].from;
					console.log("setting start value on object for property: " + anim + " with value: " + _animations[anim].from);		
				}
			} 
		}
		
		// Call the animation started handler.
		_started();
	}
	
	function end(){
		_animating = false;
		
		// Set the final value on the object.
		for(var anim in _animations){
			if(_object[anim]){
				if(typeof _animations[anim].to !== "undefined"){
					_object[anim] = _animations[anim].to;
					console.log("setting final value on object for property: " + anim + "with value: " + _animations[anim].to);	
				}
			} 
		}
		
		// Call the animation finished handler.
		_finished();
	}
	
	// Stop the animation and reset the value back to what it was before the animation started.
	function cancel(){
		_animating = false;
		
		for(var anim in _animations){
			
			if(_object[anim]){
				if(typeof _originalValues[anim] !== "undefined"){
					_object[anim] = _originalValues[anim];
					console.log("resetting value on object for property: " + anim + "with value: " + _originalValues[anim]);	
				}
			} 
		}
	
		// Call the animation cancelled handler.
		_cancelled();
	}
	
	function animating(){
		return _animating;
	}
	
	function object(){
		return _object;
	}
	
	// Initialisation
	(function init(){
		// Grab all of the original values before we start doing any animations.
		for(var anim in _animations){
			if(typeof _object[anim] !== "undefined"){
				_originalValues[anim] = _object[anim];
			}
		}
	})();
	
	// Public API
	that.process = process;
	that.begin = begin;
	that.end = end;
	that.cancel = cancel;
	
	that.animating = animating;
	that.object = object;
	
	return that;
};


// Starting and stopping aniamtions go through the AnimationScheduler.

ENGINE.anim.Animation.animate = function(spec){
		
	spec = spec || {};
	
	// Create animation curve based on spec
	var animation = ENGINE.anim.Animation(spec);
	
	// Schedule new animation & return the name it used to schedule it.
	// The name can be used to cancel animations manually.
	return ENGINE.anim.AnimationScheduler.scheduleAnimation(animation);
};

ENGINE.anim.Animation.cancelAnimation = function(animationName){
	// Cancel animation with scheduler.
	if(typeof animationName === "string"){
		ENGINE.AnimationScheduler.removeScheduledAnimation(animationName);	
	}
};








// Usage Examples

/*

// Some object we want to animate:

var obj = {
			scaleX: 0, 
		  	scaleY: 0,
			scaleZ: 0
		  };
var AnimationCurve = ENGINE.anim.AnimationCurve;

// Single value

ENGINE.anim.Animation.animate({
	length: 1000,
	object: obj,
	
	animation: {
		scaleX: { from: 1, to: 2, curve: AnimationCurve.linear }
	},
	
	started: function(){ console.log("started animating!"); },
	finished: function(){ console.log("finished animating!"); },
	stepped: function(obj){ console.log("scaleX" + obj.scaleX); console.log("scaleY" + obj.scaleY); }
});


// Multiple values in one animation.

ENGINE.anim.Animation.animate({
	length: 1000,
	object: obj,
	
	animation: {
		scaleX: { from: 1, to: 2, curve: AnimationCurve.linear },
		scaleY: { from: 2, to: 4, curve: AnimationCurve.linear }
	},
	
	started: function(){ console.log("started animating!"); },
	finished: function(){ console.log("finished animating!"); },
	stepped: function(obj){ console.log("scaleX" + obj.scaleX); console.log("scaleY" + obj.scaleY); }
});

// Looping

function enlarge(){
	
	ENGINE.anim.Animation.animate({
		length: 1000,
		object: obj,
		
		animation: {
			scaleX: { from: 1, to: 2, curve: AnimationCurve.linear },
			scaleY: { from: 2, to: 4, curve: AnimationCurve.linear }
		},
		
		started: function(){ },
		finished: function(){ enlarge(); },
		stepped: function(obj){ }
	});
}

enlarge();


// Chaining

function spinBackAndForward(){
		
	function right(){
		ENGINE.anim.Animation.animate({
			length: 1000,
			object: ship,
			
			animation: {
				rotationZ: { from: 0, to: Math.PI*2, curve: ENGINE.anim.AnimationCurve.linear },
			},
			
			started: function(){ },
			finished: function(){ left(); },
			stepped: function(obj){ }
		});
	}
	
	function left(){
		ENGINE.anim.Animation.animate({
			length: 1000,
			object: ship,
			
			animation: {
				rotationZ: { from: Math.PI*2, to: 0, curve: ENGINE.anim.AnimationCurve.linear },
			},
			
			started: function(){ },
			finished: function(){ },
			stepped: function(obj){ }
		});
	}
	
	right();
}

spinBackAndForward();


*/