function createPlanes()
{
	var planeArray = [];
	geometry = new THREE.PlaneGeometry( 20, 2000, 1, 100 );
	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) ); // Makes plane "horizontal" instead of "vertical"
	var texture = THREE.ImageUtils.loadTexture('media/ground.png');
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 4, 64 );
	material = new THREE.MeshLambertMaterial({map: texture, fog: true});
	//material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors, transparent: true});

	plane = new THREE.Mesh( geometry, material );
	planeArray.push(plane);
	
	geometry = new THREE.PlaneGeometry( 200, 2000, 10, 100 );
	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( 0 ) ); // Makes plane "horizontal" instead of "vertical"
	var texture = THREE.ImageUtils.loadTexture('media/ground.png');
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 8, 64 );
	material = new THREE.MeshLambertMaterial({map: texture, fog: true});

	plane = new THREE.Mesh( geometry, material );
	plane.position.set(200, 0, 0);
	planeArray.push(plane);
	
	return planeArray;
}
