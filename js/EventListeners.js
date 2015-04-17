function addEventListeners()
{
    //onWindowResize
    window.addEventListener("resize", onWindowResize, false);
	
	//Keyboard Event Listener
	window.document.addEventListener("keydown", onDocumentKeyDown, false);

	//Scrambler
	document.getElementById("scramble").addEventListener("click", ScrambleCube);
	
	//Save File Exporter
	document.getElementById("export").addEventListener("click", saveCubes);
	
	//Save File Importer
	document.getElementById("import").addEventListener("click", loadCubes);
}

function onWindowResize(event)
{
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
/*	if(min < canvas.width || min < canvas.height)
		gl.viewport(0,canvas.height-min, min, min); 
		//resize viewport where min is minimum of innerheight/width*/
	tick();
}

var rotations = [];

function onDocumentKeyDown(event)
{
	console.log("Keydown Listener");
	var kc = event.keyCode.toString();
	if (keyMappings.hasOwnProperty(kc)) 
	{
		direction = event.shiftKey ? 1 : -1;
		var rot = new Object();
		rot = { "kc" : event.keyCode, "dir" : direction, "current" : false };
		rotations.push(rot);
	}
	//toRot(event.keyCode, event.shiftKey);
}

function ScrambleCube()
{
	var nRot = document.getElementById("ScrambleNumber");
	var rotKeys = Object.keys(keyMappings);
	var rKC = rotKeys[Math.floor(Math.random()*rotKeys.length)];
	for (var i = 0, len = nRot.value; i < len; ++i) 
	{
		console.log( "Loop #" + i );
		rKC = parseInt(rotKeys[Math.floor(Math.random()*rotKeys.length)]);
		console.log( "Current rKC:" + rKC );
		// TODO: Random directions
		// toRot(rKC, direction);
		direction = (Math.random() < 0.5) ? 1 : -1;
		var rot = new Object();
		rot = { "kc" : rKC, "dir" : direction, "current" : false };
		rotations.push(rot);
	}
}

var cubesPos = {
	'position' : [],
	'rotation' : []
};

function saveCubes() 
{
	cubesPos = {
	'position' : [],
	'rotation' : []
	};
	
	for(var i = 0; i < 27; ++i)
	{
		cubesPos.position.push(JSON.parse(JSON.stringify(cubes[i].position)));
		cubesPos.rotation.push(JSON.parse(JSON.stringify(cubes[i].rotation)));
	}
	var cPosJSON = JSON.stringify(cubesPos);
	
	try {
    var isFileSaverSupported = !!new Blob;
	} catch (e) {
		alert("Unsupported! Save text (Copy & paste):" + cPosJSON);
	}
	try {
	var blob = new Blob( [cPosJSON], {type: "text/plain;charset=utf-8"});
	var fileName = document.getElementById("file");
	saveAs(blob, fileName.value);
	} catch (e) {
		alert("Save Failed");
	}
}

function loadCubes() 
{
	if (rotations.length == 0)
	{
		try {
		var saveJSON = document.getElementById("SaveJSON");
		var saveData = JSON.parse(saveJSON.value);
		for(var i = 0; i < 27; ++i)
		{
			cubes[i].position.set(saveData.position[i].x,  saveData.position[i].y,  saveData.position[i].z);
			cubes[i].rotation.set(saveData.rotation[i]._x, saveData.rotation[i]._y, saveData.rotation[i]._z);
		}
		} catch (e) {
			alert("Load Failed");
		}
	}
	reportSolved();
}