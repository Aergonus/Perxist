function addEventListeners()
{
    //onWindowResize
    window.addEventListener("resize", onWindowResize, false);
	
	//Keyboard Event Listener
	window.document.addEventListener("keydown", onDocumentKeyDown, false);

	//Scrambler
	document.getElementById("scramble").addEventListener("click", ScrambleCube);
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
		
function onDocumentKeyDown(event)
{
	console.log("Keydown Listener");
	toRot(event.keyCode, event.shiftKey);
}

function ScrambleCube()
{
	console.log( "Scrambling!" ):
	var nRot = document.getElementById("ScrambleNumber");
	console.log( nRot ):
	var rotKeys = Object.keys(keyMappings);
	console.log( rotKeys ):
	var rKC = rotKeys[Math.floor(Math.random()*rotKeys.length)];
	console.log( "Init rKC: " + rKC):
	for (var i = 0; i < nRot; ++i) 
	{
		console.log( "Loop #" + i ):
		rKC = rotKeys[Math.floor(Math.random()*rotKeys.length)];
		console.log( "Current rKC:" + rKC ):
		// TODO: Random directions
		direction = event.shiftKey ? 1 : -1;
		toRot(rKC, direction);
		console.log( "Rotated!"):
	}
}