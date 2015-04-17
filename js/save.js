var cubesPos = {
	'position' : []
};

function saveCubes() 
{
	for(var i = 0; i < 27; ++i)
	{
		cubesPos.position.push(JSON.parse(JSON.stringify(cubes[i].position)));
	}
	var cPosJSON = JSON.stringify(cubesPos);
	
	try {
    var isFileSaverSupported = !!new Blob;
	} catch (e) {
		alert("Unsupported! Save text (Copy & paste):" + cPosJSON);
	}
	
	var blob = new Blob( cPosJSON, {type: "text/plain;charset=utf-8"});
	var fileName = document.getElementById("FileName");
	saveAs(blob, fileName);
	
}

function loadCubes() 
{
	var saveJSON = document.getElementById("SaveJSON");
	var saveData = JSON.parse(saveJSON);
	for(var i = 0; i < 27; ++i)
	{
		cubes[i].position.set(saveData.position[i].x, saveData.position[i].y, saveData.position[i].z);
	}
}