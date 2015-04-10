var iv = null;
var actions = {};
var keyMappings = { '37' : 'panleft', '38' : 'panup', '39' : 'panright', '40' : 'pandown',
					'90' : 'zoomin', '88' : 'zoomout' };
for (var k in keyMappings) {
	actions[keyMappings[k]] = false;
}

function addEventListeners()
{
	// Hard-coded resize option
	// window.onresize = function() {};

    //onWindowResize
    window.addEventListener("resize", onWindowResize, false);
	
	//Keyboard Event Listener
	window.document.addEventListener("keydown", onDocumentKeyDown, false);
	/*
	//scramble
	//window.document.getElementById("setScramble").addEventListener("onclick", scrambleCube, false);
	document.getElementById("btn-refresh").addEventListener("click", displayScramble);
	*/
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
/*
		window.onkeydown = function(e) {
			var kc = e.keyCode.toString();
			if (keyMappings.hasOwnProperty(kc)) {
				actions[keyMappings[kc]] = true;
				if (!iv) {
					iv = setInterval('draw();', 16);
				}
			}
		};
		window.onkeyup = function(e) {
			var kc = e.keyCode.toString();
			if (keyMappings.hasOwnProperty(kc)) {
				actions[keyMappings[kc]] = false;
			}
			for (var j in keyMappings) {
				if (actions[keyMappings[j]]) {
					return;
				}
			}
			clearInterval(iv);
			iv = null;
		};
*/
		
function onDocumentKeyDown(event)
{
	if(event.shiftKey)
	{
		console.log("shift = true"); // DEBUG
		
		switch( event.keyCode )
		{
			//R
			case 82:
				rotateFace("x", "rightP", 109, 111);
				break;
		
			//U
			case 85:
				rotateFace("y", "upP", 109, 111);
				break;
			
			//F
			case 70:
				rotateFace("z", "frontP", 109, 111);
				break;
			
			//B
			case 66:
				rotateFace("z", "backP", -111, -109)
				break;
		
			//L
			case 76:
				rotateFace("x", "leftP", -111, -109);
				break;
				
			case 77:
			rotateFace("x", "middleP", -1, 1);
			break;
		
			//D
			case 68:
				rotateFace("y", "downP", -111, -109);
				break;
		}
		return;
	}
	
	switch(event.keyCode)
	{
		//R
		case 82:
			rotateFace("x", "right", 109, 111);
			break;
		
		//U
		case 85:
			rotateFace("y", "up", 109, 111);
			break;
			
		//F
		case 70:
			rotateFace("z", "front", 109, 111);
			break;
			
		//B
		case 66:
			rotateFace("z", "back", -111, -109)
			break;
		
		//L
		case 76:
			rotateFace("x", "left", -111, -109);
			break;
		
		//D
		case 68:
			rotateFace("y", "down", -111, -109);
			break;
		
		case 77:
			rotateFace("x", "middle", -1, 1);
			break;
		
		case 88:
			rotateFace("x", "X", null, null);
			break;
			
		case 89:
			rotateFace("y", "Y", null, null);
			break;
			
		case 90:
			rotateFace("z", "Z", null, null);
			break;
	}
	
}