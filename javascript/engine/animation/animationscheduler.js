var ENGINE = ENGINE || {};
ENGINE.namespace("ENGINE.anim.AnimationScheduler");

// Static class
ENGINE.anim.AnimationScheduler = (function(){
	
	var that = {};
	
	// private
	var _animations = {}; // animationName: animation
	
	// Finds an unused name in the object.
	function findNextUnused(obj, name){
		var count = 2,
			original = name;
		
		if(obj){
			while(typeof obj[name] !== "undefined"){
				name = original + " #" + count++;	
			}
		}
		
		return name;
	}
	
	function scheduleAnimation(animation, name){
		
		if(!(typeof(name) === "string")){
			name = "unnamed";
		}
		
		name = findNextUnused(_animations, name);
		
		// If there is already an animation for the object,
		// cancel and remove it.
		for(var anim in _animations){
			if(_animations[anim].object() === animation.object() && _animations[anim].animating()){
				_animations[anim].cancel();
				removeScheduledAnimation(anim);
			}
		}
		
		_animations[name] = animation;
		animation.begin();
		
		// Returns the name used to schedule the animation.
		return name;
	}
	
	function removeScheduledAnimation(animationName){
		_animations[animationName].end();
		delete _animations[animationName];
	}
	
	function processAnimations(step){
		
		if(Object.keys(_animations).length > 0){ // We have animations to do.
			for(var anim in _animations){
				
				var finished = _animations[anim].process(step);
				
				if(finished){
					removeScheduledAnimation(anim);
				}
			}
		}
	}

	(function init(){
		// Init here.
	})();
	
	// Public API.
	that.scheduleAnimation = scheduleAnimation;
	that.removeScheduledAnimation = removeScheduledAnimation;
	that.processAnimations = processAnimations;
	return that;
	
})();
