function addEventListeners()
{
    //onWindowResize
    window.addEventListener("resize", onWindowResize, false);
	
	//Keyboard Event Listener
	//window.document.addEventListener("keydown", onDocumentKeyDown, false);
	
	//scramble
	//window.document.getElementById("setScramble").addEventListener("onclick", scrambleCube, false);
	document.getElementById("btn-refresh").addEventListener("click", displayScramble);
}

function onWindowResize(event)
{
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}
