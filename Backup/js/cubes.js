// Cube Matrix 
var cubeM = new Array(3);
// Cube Array
var cubes = new Array(27); // General array [] Hard coded here because small #
// Size of cubes
var cDim = 10, cEdge = 1.1*cDim;
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
	for (var i = 0, j = 1; i < 27; ++i) // For in loops, len = whatever.length, i < len
	{
		j++; //j = i + 1;
		cubes[i].position.set(((j%3)-1)*coff, (((j%9)/3)-1)*coff, ((j%9)-1)*coff);
		//cubes[i].position.set(-coff +  (++i)%, y, z); use for matrix
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
	
	redMaterial.specular.setHex(0x010101);
	greenMaterial.specular.setHex(0x010101);
	blueMaterial.specular.setHex(0x010101);
	blackMaterial.specular.setHex(0x010101);
	yellowMaterial.specular.setHex(0x010101);
	orangeMaterial.specular.setHex(0x010101);
	whiteMaterial.specular.setHex(0x010101);
	/*
	for (var i = 0; i < 27; ++i)
	{
		materialsCube[i] = new Array(6);
		for (var j = 0; j < 6; ++j)
		{
			//... so much easier with matrix
		}
		cubeMaterial.push(new THREE.MeshFaceMaterial(materialsCube[i]));
	}
	*/
	for (var i = 0, index = 0; i < 3; ++i, index++)
	{
		materialsCube[i] = new Array(3);
		for (var j = 0; j < 3; ++j)
		{
			materialsCube[i][j] = new Array(3);
			for (var k = 0; k < 3; ++k)
			{
				materialsCube[i][j][k] = new Array(6);
				for (var m = 0; m < 6; ++m)
				{
					// First Face z direction is red
					switch(k) {
						case 0: 
							materialsCube[i][j][k].push(redMaterial);
							break;
						case 1:
						case 2:
							materialsCube[i][j][k].push(blackMaterial);
					}
					// Back Face z direction is orange
					switch(k) {
						case 0: 
						case 1:
							materialsCube[i][j][k].push(blackMaterial);
							break;
						case 2:
							materialsCube[i][j][k].push(orangeMaterial);
					}
					// Top face y direction is yellow
					switch(j) {
						case 0:
						case 1:
							materialsCube[i][j][k].push(blackMaterial);
							break;
						case 2:
							materialsCube[i][j][k].push(yellowMaterial);
					}
					// Bottom face y direction is white
					switch(j) {
						case 0: 
							materialsCube[i][j][k].push(whiteMaterial);
							break;
						case 1:
						case 2:
							materialsCube[i][j][k].push(blackMaterial);
					}
					// Left face x direction is blue
					switch(i) {
						case 0: 
							materialsCube[i][j][k].push(blueMaterial);
							break;
						case 1:
						case 2:
							materialsCube[i][j][k].push(blackMaterial);
					}
					// Right face x direction is green
					switch(i) {
						case 0:
						case 1:
							materialsCube[i][j][k].push(blackMaterial);
							break;
						case 2:
							materialsCube[i][j][k].push(greenMaterial);
					}
				}
				cubeMaterial.push(new THREE.MeshFaceMaterial(materialsCube[i][j][k]));
			}
		}
	}

	return cubeMaterial;
}