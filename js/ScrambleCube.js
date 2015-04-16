function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
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

