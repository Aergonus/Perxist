var active = [];
var activeCount = 0;
var pivot = new THREE.Object3D();

function getObjWorldPos(object)
{
	scene.updateMatrixWorld(true);
	var position = new THREE.Vector3();
	position.setFromMatrixPosition(object.matrixWorld);
	return position;
}

function rotate(axis, mode, dim, dir)
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
}