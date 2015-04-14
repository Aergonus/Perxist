// Cube Matrix 
var cubeM = new Array(3);
// Cube Array
var cubes = new Array(27); // General array [] Hard coded here because small #
// Size of cubes
var cDim = 10, cEdge = 0.1*cDim;
var coff = cDim + cEdge;

function createCubes()
{
	var cubeGeometry = new THREE.BoxGeometry(cDim, cDim, cDim, cEdge, cEdge, cEdge);
	var cubeMaterial = new Array(27); // General array [] Hard coded here because small #
	cubeMaterial = setCubeMaterial();
	
	for(var i = 0; i < 27; ++i)
	{
		var cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial[i]);
		cubes.push(cubeMesh);
	}
	
	positionCubes();
	return cubes;
}

function positionCubes()
{
	for (var i = 0; i < 27; ++i) // For in loops, len = whatever.length, i < len
	{
		cubes[i].position.set(Math.floor(((i%3)-1))*coff, Math.floor((((i%9)/3)-1))*coff, Math.floor(((i/9)-1))*coff);
	}
	
	for (var i = 0, index = 0; i < 3; ++i, index++)
	{
		cubeM[i] = new Array(3);
		for (var j = 0; j < 3; ++j)
		{
			cubeM[i][j] = new Array(3);
			for (var k = 0; k < 3; ++k)
			{
				cubeM[i][j][k] = cubes[index];
			}
		}
	}
}

function setCubeMaterial() 
{
	var cubeMaterial = [];
	var materialsCube = new Array(27);
	
	var redMaterial = new THREE.MeshPhongMaterial({ color: 0xFF2F2F, shininess: 0.25  });
	var greenMaterial = new THREE.MeshPhongMaterial({ color: 0x24FF24, shininess: 0.25  });
	var blueMaterial = new THREE.MeshPhongMaterial({ color: 0x3E3EFF , shininess: 0.25 });
	var blackMaterial = new THREE.MeshPhongMaterial({ color: 0x000000, shininess: 0.25 });
	var yellowMaterial = new THREE.MeshPhongMaterial({ color: 0xF7FC12, shininess: 0.25  });
	var orangeMaterial = new THREE.MeshPhongMaterial({ color: 0xFA6721, shininess: 0.25  });
	var whiteMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF, shininess: 0.205 });
	
	// Black Specular 
	var blackHex = 0x010101;
	redMaterial.specular.setHex(blackHex);
	greenMaterial.specular.setHex(blackHex);
	blueMaterial.specular.setHex(blackHex);
	blackMaterial.specular.setHex(blackHex);
	yellowMaterial.specular.setHex(blackHex);
	orangeMaterial.specular.setHex(blackHex);
	whiteMaterial.specular.setHex(blackHex);

	for (var i = 0, index = 0; i < 3; ++i)
	{
		for (var j = 0; j < 3; ++j)
		{
			for (var k = 0; k < 3; ++k)
			{	
				index = i + j * 3 + k * 9;
				materialsCube[index] = []; // If pushing, don't use new Array => pushes to 6
					// Left face x direction is blue
					switch(i) {
						case 0: 
						case 1:
							materialsCube[index].push(blackMaterial);
							break;
						case 2:
							materialsCube[index].push(blueMaterial);
					}
					// Right face x direction is green
					switch(i) {
						case 0:
							materialsCube[index].push(greenMaterial);
							break;
						case 1:
						case 2:
							materialsCube[index].push(blackMaterial);
					}
					// Top face y direction is yellow
					switch(j) {
						case 0:
						case 1:
							materialsCube[index].push(blackMaterial);
							break;
						case 2:
							materialsCube[index].push(yellowMaterial);
					}
					// Bottom face y direction is white
					switch(j) {
						case 0: 
							materialsCube[index].push(whiteMaterial);
							break;
						case 1:
						case 2:
							materialsCube[index].push(blackMaterial);
					}
					// First Face z direction is red
					switch(k) {
						case 0: 
						case 1:
							materialsCube[index].push(blackMaterial);
							break;
						case 2:
							materialsCube[index].push(redMaterial);
					}
					// Back Face z direction is orange
					switch(k) {
						case 0: 
							materialsCube[index].push(orangeMaterial);
							break;
						case 1:
						case 2:
							materialsCube[index].push(blackMaterial);
					}
				
			}
		}
	}
	for (var i = 0; i < 27; ++i) 
	{
		var cubeMaterials;
		cubeMaterial.push(new THREE.MeshFaceMaterial(materialsCube[i]));
	}
	return cubeMaterial;
}