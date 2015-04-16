function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var rotations = [];

function ScrambleCube()
{
	console.log( "Scrambling!" );
	var nRot = document.getElementById("ScrambleNumber");
	console.log( nRot );
	var rotKeys = Object.keys(keyMappings);
	console.log( rotKeys );
	var rKC = rotKeys[Math.floor(Math.random()*rotKeys.length)];
	console.log( "Init rKC: " + rKC);
	for (var i = 0; i < nRot; ++i) 
	{
		console.log( "Loop #" + i );
		rKC = rotKeys[Math.floor(Math.random()*rotKeys.length)];
		console.log( "Current rKC:" + rKC );
		// TODO: Random directions
		toRot(rKC, direction);
		rotations.push(function() {toRot(rKC, direction)});
		console.log( "Rotated!");
	}
}

