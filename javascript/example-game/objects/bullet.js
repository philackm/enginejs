function Bullet(spawnPosition, direction, rotation){

    direction = direction || ENGINE.maths.Vector2(1, 0);
	var bullet = ENGINE.DynamicObject();
	
	bullet.setModel(ENGINE.Model.Poly.Triangle({height: 20, lineWidth: 5, color: ENGINE.graphics.Color.white}));
	var baseVelocity = 750;
		
    bullet.setPosition(spawnPosition.getX(), spawnPosition.getY());
    bullet.rotationZ = rotation + (3.141592 / 2)
	
	bullet.setUpdate(function(step){
        var velocity = direction.multiply(baseVelocity); 
        bullet.setVelocity(ENGINE.maths.Vector4(velocity.getX(), velocity.getY(), 0, 0));

        var currPosition = bullet.getPosition();
		currPosition = currPosition.add(bullet.getVelocity().multiply(step/250));
		bullet.setPosition(currPosition.getX(), currPosition.getY());

	});
	
	return bullet;
}