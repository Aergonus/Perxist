var iv = null;
var actions = {};
var keyMappings = 
{
	'66' : 'B'
	'68' : 'D'
	'70' : 'F'
	'76' : 'L'
	'82' : 'R'
	'85' : 'U'
	'88' : 'X'
	'89' : 'Y'
	'90' : 'Z'
};	// Add up down left right?

for (var k in keyMappings) {
	actions[keyMappings[k]] = false;
}

function addEventListeners()
{
    //onWindowResize
    window.addEventListener("resize", onWindowResize, false);
	
	//Keyboard Event Listener
	window.document.addEventListener("keydown", onDocumentKeyDown, false);

	//Scrambler
	document.getElementById("scramble").addEventListener("click", ScrambleCube);
	// <input type="number" id="myNumber" value="2">
	// <button onclick="myFunction()">Try it</button>
	//	var turns = window.document.getElementById("ScrambleNumber").value;
}

function onWindowResize(event)
{
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
/*	if(min < canvas.width || min < canvas.height)
		gl.viewport(0,canvas.height-min, min, min); 
		//resize viewport where min is minimum of innerheight/width*/
	render();
}
		
function onDocumentKeyDown(event)
{
	var axis, bound, shiftR = event.shiftKey;
	/*
	var kc = e.keyCode.toString();
	if (keyMappings.hasOwnProperty(kc)) {
				actions[keyMappings[kc]] = false;
			}
	*/
	switch(event.keyCode)
	{
		case 82: 
			rotate("x", "R", 1, shiftR);
			break;
		case 85:
			rotate("y", "U", 1, shiftR);
			break;
		case 70:
			rotate("z", "F", 1, shiftR);
			break;
		case 88:
			rotate("x", "X", 0, shiftR);
			break;
		case 89:
			rotate("y", "Y", 0, shiftR);
			break;
		case 90:
			rotate("z", "Z", 0, shiftR);
			break;
		case 76:
			rotate("x", "L", -1, shiftR);
			break;
		case 68:
			rotate("y", "D", -1, shiftR);
			break;
		case 66:
			rotate("z", "B", -1, shiftR);
			break;
	}
}