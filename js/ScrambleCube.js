function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function ScrambleCube()
{
	var nRot = document.getElementById("ScrambleNumber");
	var rotKeys = Object.keys(keyMappings);
	var rKC = rotKeys[Math.floor(Math.random()*rotKeys.length)];
	for (var i = 0; i < nRot; ++i) 
	{
		rKC = rotKeys[Math.floor(Math.random()*rotKeys.length)];
		// TODO: Random directions
		direction = event.shiftKey ? 1 : -1;
		toRot(rKC, direction);
	}
}

