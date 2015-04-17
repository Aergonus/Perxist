var cubesPos = {
	'position' : []
	'rotation' : []
};

function saveCubes() 
{
	cubesPos = {
	'position' : []
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
	try {
	var saveJSON = document.getElementById("SaveJSON");
	var saveData = JSON.parse(saveJSON.value);
	for(var i = 0; i < 27; ++i)
	{
		cubes[i].position.set(saveData.position[i].x, saveData.position[i].y, saveData.position[i].z);
		cubes[i].rotation.set(saveData.rotation[i]._x, saveData.rotation[i]._y, saveData.rotation[i]._z);
	}
	} catch (e) {
		alert("Load Failed");
	}
	reportSolved();
}