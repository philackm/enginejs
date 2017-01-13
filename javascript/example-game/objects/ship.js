function PlayerShip(){
	var ship = ENGINE.DynamicObject();
	var keyCodes = ENGINE.input.keyCodes;
	
	ship.setModel(ENGINE.Model.Poly.Pointer({height: 30, lineWidth: 6, color: ENGINE.graphics.Color.white}));
	
	var mX = ENGINE.graphics.canvas.getWidth() * ENGINE.graphics.screen.getPixelRatio() / 2,
		mY = ENGINE.graphics.canvas.getHeight() * ENGINE.graphics.screen.getPixelRatio() / 2;
		
	var baseVelocity = 500,
		boost = 4;
		
	ship.setPosition(mX, mY);
	ship.setVelocity(ENGINE.maths.Vector4(0, 500, 0, 0));
	
	var bulletsPerSecond = 6;
	var timeBetweenBullets = 1000/bulletsPerSecond;
	var timeUntilNextBullet = timeBetweenBullets;

	ship.setUpdate(function(step){
		
		// Rotate the ship to face the mouse.

		var shipPosition = ENGINE.maths.Vector2(mX, mY);
		var mousePosition = ENGINE.maths.Vector2(ENGINE.input.mouse.getCanvasX(), ENGINE.input.mouse.getCanvasY())

		var shipToMouse = mousePosition.subtract(shipPosition);

		var rotation = Math.atan2(shipToMouse.getY(), shipToMouse.getX());
		ship.rotationZ = rotation + (3.141592 / 2)

		// Move with WASD
		var vel = baseVelocity;
		
		if(ENGINE.input.keyboard.isKeyDown(keyCodes.SHIFT)){
			vel *= boost;
		}
		
		if(ENGINE.input.keyboard.isKeyDown(keyCodes.W)){ //W
			ship.setVelocity(ENGINE.maths.Vector4(0, -vel, 0, 0));			
		}
		else if(ENGINE.input.keyboard.isKeyDown(keyCodes.A)){ //A
			ship.setVelocity(ENGINE.maths.Vector4(-vel, 0, 0, 0));			
		}
		else if(ENGINE.input.keyboard.isKeyDown(keyCodes.S)){ //S
			ship.setVelocity(ENGINE.maths.Vector4(0, vel, 0, 0));			
		}
		else if(ENGINE.input.keyboard.isKeyDown(keyCodes.D)){ //D
			ship.setVelocity(ENGINE.maths.Vector4(vel, 0, 0, 0));			
		}
		else{
			ship.setVelocity(ENGINE.maths.Vector4(0, 0, 0, 0));
		}
		
		var currPosition = ship.getPosition();
		currPosition = currPosition.add(ship.getVelocity().multiply(step/250));
		ship.setPosition(currPosition.getX(), currPosition.getY());


		// Spawn bullets when we press SPACE.
		var direction = shipToMouse.normalised();
		timeUntilNextBullet -= step;

		if(timeUntilNextBullet <= 0) {
			if(ENGINE.input.keyboard.isKeyDown(keyCodes.SPACE) || ENGINE.input.mouse.isMouseDown()) {
				var bullet = Bullet(currPosition, direction, rotation);
				ship.getLayer().addChild(bullet);

				ENGINE.anim.Animation.animate({
					length: timeBetweenBullets / 4,
					object: ship,
					
					animation: {
						scaleX: {from: 1, to: 1.5, curve: ENGINE.anim.AnimationCurve.easeout },
						scaleY: {from: 1, to: 1.5, curve: ENGINE.anim.AnimationCurve.easeout }
					},

					started: function() {},
					finished: function() {
						animateDown(); // Return the ship to normal size.
					},
					stepped: function() {}
				});
				
			}

			timeUntilNextBullet = timeBetweenBullets;
		}
	});
	
	// Return the ship to normal size.
	function animateDown() {
		ENGINE.anim.Animation.animate({
			length: timeBetweenBullets / 4,
			object: ship,
			
			animation: {
				scaleX: {from: 1.5, to: 1, curve: ENGINE.anim.AnimationCurve.easeout },
				scaleY: {from: 1.5, to: 1, curve: ENGINE.anim.AnimationCurve.easeout }
			}
		});
	}

	// Game objects support children objects.
	// This shows how we can add children to a game object, and even the children can have children.
	
	/*
	// Add children to the ship.
	var shield = ENGINE.DynamicObject();
	var elapsed = 0,
		elapsed2 = 0,
		elapsed3 = 0;
	shield.setModel(ENGINE.Model.Primitive.Circle({radius: 10, fill: true, color: ENGINE.graphics.Color.fromHEX("#eee")}));
	shield.setPosition(100, 0);
	
	shield.setUpdate(function(step){
		elapsed += step;
		shield.setPosition(Math.cos(elapsed / 500) * 100, Math.sin(elapsed / 500) * 100);
	});
	
	var shield2 = ENGINE.DynamicObject();
	shield2.setModel(ENGINE.Model.Primitive.Circle({radius: 5, fill: true, color: ENGINE.graphics.Color.fromHEX("#ddd")}));
	shield2.setPosition(0, 40);
	
	shield2.setUpdate(function(step){
		elapsed2 += step;
		shield2.setPosition(Math.cos(elapsed / 100) * 20, Math.sin(elapsed / 100) * 20);
	});
	shield.addChild(shield2);
	
	var outerShield = ENGINE.DynamicObject();
	
	outerShield.setModel(ENGINE.Model.Primitive.Circle({radius: 10, fill: true, color: ENGINE.graphics.Color.fromHEX("#eee")}));
	outerShield.setPosition(0, 40);
	
	outerShield.setUpdate(function(step){
		elapsed3 += step;
		outerShield.setPosition(Math.cos(elapsed / 1000) * 400, Math.sin(elapsed / 1000) * 400);
	});
	
	ship.addChild(shield, "shield");
	ship.addChild(outerShield, "outerShield");
	console.log(outerShield);
	*/
	
	return ship;
}