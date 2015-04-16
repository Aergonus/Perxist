var active = [];
var activeCount = 0;
var pivot = new THREE.Object3D(), pivotSpeed = 0.091;
var direction; 
var iv = null;
var actions = {};
var keyMappings = 
{
	'66' : 'B',
	'68' : 'D',
	'70' : 'F',
	'76' : 'L',
	'82' : 'R',
	'85' : 'U',
	'88' : 'X',
	'89' : 'Y',
	'90' : 'Z'
};	// Add up down left right?

for (var k in keyMappings) {
	actions[keyMappings[k]] = false;
}

function randProp (obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
};

function getObjWorldPos(object)
{
	scene.updateMatrixWorld(true);
	var position = new THREE.Vector3();
	position.setFromMatrixPosition(object.matrixWorld);
	return position;
}

function toRot(keyCode, dir) 
{
	console.log("toRot kc:" + keyCode);
	var kc = keyCode.toString();
	if (keyMappings.hasOwnProperty(kc)) {
			actions[keyMappings[kc]] = true;
			console.log(actions);
		}

	switch(keyCode)
	{
		case 82: 
			setRotate("x", "R", 1, dir);
			break;
		case 85:
			setRotate("y", "U", 1, dir);
			break;
		case 70:
			setRotate("z", "F", 1, dir);
			break;
		case 88:
			setRotate("x", "X", 0, dir);
			break;
		case 89:
			setRotate("y", "Y", 0, dir);
			break;
		case 90:
			setRotate("z", "Z", 0, dir);
			break;
		case 76:
			setRotate("x", "L", -1, dir);
			break;
		case 68:
			setRotate("y", "D", -1, dir);
			break;
		case 66:
			setRotate("z", "B", -1, dir);
			break;
	}
	console.log( "End of toRot");
}

function setRotate(axis, mode, dim, dir)
{
	console.log("Set");
	for (var i = 0, len = cubes.length; i < len; ++i)
    {
		var position = getObjWorldPos(cubes[i]);
		switch(axis)
		{
			case "x":
				if (Math.abs(position.x - (dim*coff)) <= cEdge)
					active.push(cubes[i]);
				break;
			
			case "y":
				if (Math.abs(position.y - (dim*coff)) <= cEdge)
					active.push(cubes[i]);
				break;
			
			case "z":
				if (Math.abs(position.z - (dim*coff)) <= cEdge)
					active.push(cubes[i]);
				break;
		}
	}
	
	for(var i = 0, len = active.length; i < len; ++i)
		THREE.SceneUtils.attach(active[i], scene, pivot);
	console.log(active);
}

var rotations = [];

function prepRot()
{
	if (rotations.length > 0) 
	{
		if (rotations[0].current) 
		{
			var kcs = rotations[0].kc.toString();
			if (keyMappings.hasOwnProperty(kcs)) {
				actions[keyMappings[kcs]] = true;
				console.log(actions);
			}
		} else 
		{
			rotations[0].current = true;
			toRot(rotations[0].kc, rotations[0].dir);
		}
	}
}

var endAnimation = false;

function rotate() 
{
//Math.PI / 2 == 1.580000000000001
	//Rotate Right Face || Left Face || Middle X Face of cube
	if (actions["R"] === true || actions["L"] === true || actions["X"] === true)
	{	
		pivot.rotation.x = pivot.rotation.x + direction * pivotSpeed;

		if (Math.abs(pivot.rotation.x) >= Math.PI / 2.0)
		{
			pivot.rotation.x = direction * Math.PI / 2.0;
			endAnimation = true;
		}
	}

	//Rotate Upper Face || Down Face || Middle Y Face of cube
	if (actions["U"] === true || actions["D"] === true || actions["Y"] === true)
	{
		pivot.rotation.y = pivot.rotation.y + direction * pivotSpeed;

		if (Math.abs(pivot.rotation.y) >= Math.PI / 2.0)
		{
			pivot.rotation.y = direction * Math.PI / 2.0;
			endAnimation = true;
		}
	}
	//Rotate Front Face || Back Face || Middle Z Face of cube
	if (actions["F"] === true || actions["B"] === true || actions["Z"] === true)
	{
		pivot.rotation.z = pivot.rotation.z + direction * pivotSpeed;

		if (Math.abs(pivot.rotation.z) >= Math.PI / 2.0)
		{
			pivot.rotation.z = direction * Math.PI / 2.0;
			endAnimation = true;
		}
	}
	
	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);
	
	if (endAnimation)
	{
		console.log(rotations);
		rotations.pop();
		console.log(rotations);
		detachAndReset();
		console.log(pivot);
		console.log(actions);
	}
}