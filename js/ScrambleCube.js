function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function ScrambleCube()
{
	nRot = document.getElementById("ScrambleNumber");
	console.log(nRot);
	var rKC = keyMappings[Math.floor(Math.random()*keyMappings.length)];
	console.log(rKC);
}
