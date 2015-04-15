var active = [];
var activeCount = 0;
var pivot = new THREE.Object3D(), pivotSpeed = 0.091;
var direction; 

function getObjWorldPos(object)
{
	scene.updateMatrixWorld(true);
	var position = new THREE.Vector3();
	position.setFromMatrixPosition(object.matrixWorld);
	return position;
}

function setRotate(axis, mode, dim, dir)
{
	activeCount += 1;
	if(activeCount >= 2)
		return;
		
	for (var i = 0, len = cubes.length; i < len; ++i)
    {
		var position = getObjWorldPos(cubes[i]);
		switch(axisOfRot)
		{
			case "x":
				if (position.x == (dim*coff))
					active.push(cubes[i]);
				break;
			
			case "y":
				if (position.y == (dim*coff))
					active.push(cubes[i]);
				break;
			
			case "z":
				if (position.z == (dim*coff))
					active.push(cubes[i]);
				break;
		}
	}
	
	for(var i = 0, len = active.length; i < len; ++i)
		THREE.SceneUtils.attach(active[i], scene, pivot);
	
	direction = event.shiftKey ? 1 : -1;
}

function rotate() 
{
//Math.PI / 2 == 1.580000000000001
	//Rotate Right Face || Left Face || Middle X Face of cube
	if (attached["R"] === true || attached["L"] === true || attached["X"] === true)
	{	
		pivot.rotation.x = pivot.rotation.x + direction * pivotSpeed;

		if (Math.abs(pivot.rotation.x) <= Math.PI / 2.0)
		{
			pivot.rotation.x = direction * Math.PI / 2.0;
			endAnimation = true;
		}
	}

	//Rotate Upper Face || Down Face || Middle Y Face of cube
	if (attached["U"] === true || attached["D"] === true || attached["Y"] === true)
	{
		pivot.rotation.y = pivot.rotation.y + direction * pivotSpeed;

		if (Math.abs(pivot.rotation.y) <= Math.PI / 2.0)
		{
			pivot.rotation.y = direction * Math.PI / 2.0;
			endAnimation = true;
		}
	}
	//Rotate Front Face || Back Face || Middle Z Face of cube
	if (attached["F"] === true || attached["B"] === true || attached["Z"] === true)
	{
		pivot.rotation.z = pivot.rotation.z + direction * pivotSpeed;

		if (Math.abs(pivot.rotation.z) <= Math.PI / 2.0)
		{
			pivot.rotation.z = direction * Math.PI / 2.0;
			endAnimation = true;
		}
	}
	
	renderer.render(scene, camera);
	if (endAnimation)
		detachAndReset();
}