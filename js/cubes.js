var cubies = [];
// Cube Matrix 
var cubeM = new Array(3);

function createCubes()
{
	var cubieGeometry = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
	var cubieMaterial = [];
	cubieMaterial = setCubieMaterial();
	
	for(var i = 0; i < 27; i++)
	{
		var cubieMesh = new THREE.Mesh(cubieGeometry, cubieMaterial[i]);
		cubies.push(cubieMesh);
	}
	
	positionCubies();
	return cubies;
}

function positionCubies()
{
	coff = 11;
	for (var i = 0; i < 27; ++i) // For in loops, len = whatever.length, i < len
	{
		console.log("i:" + i);
		console.log("x: " + Math.floor(((i%3)-1))*coff + ", y: " + Math.floor((((i%9)/3)-1))*coff + ", z: " +Math.floor(((i/9)-1))*coff);
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

function setCubieMaterial()
{
	var cubieMaterial = [];
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
	
	var materialsCubie00 = [];
	materialsCubie00.push(blackMaterial);
	materialsCubie00.push(blackMaterial);
	materialsCubie00.push(yellowMaterial);
	materialsCubie00.push(blackMaterial);
	materialsCubie00.push(blueMaterial);
	materialsCubie00.push(blackMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie00));
	
	var materialsCubie01 = [];
	materialsCubie01.push(blackMaterial);
	materialsCubie01.push(orangeMaterial);
	materialsCubie01.push(yellowMaterial);
	materialsCubie01.push(blackMaterial);
	materialsCubie01.push(blueMaterial);
	materialsCubie01.push(blackMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie01));
	
	var materialsCubie02 = [];
	materialsCubie02.push(blackMaterial);
	materialsCubie02.push(orangeMaterial);
	materialsCubie02.push(blackMaterial);
	materialsCubie02.push(blackMaterial);
	materialsCubie02.push(blueMaterial);
	materialsCubie02.push(blackMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie02));
	
	var materialsCubie03 = [];
	materialsCubie03.push(blackMaterial);
	materialsCubie03.push(orangeMaterial);
	materialsCubie03.push(blackMaterial);
	materialsCubie03.push(whiteMaterial);
	materialsCubie03.push(blueMaterial);
	materialsCubie03.push(blackMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie03));
	
	var materialsCubie04 = [];
	materialsCubie04.push(blackMaterial);
	materialsCubie04.push(blackMaterial);
	materialsCubie04.push(blackMaterial);
	materialsCubie04.push(whiteMaterial);
	materialsCubie04.push(blueMaterial);
	materialsCubie04.push(blackMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie04));
	
	var materialsCubie05 = [];
	materialsCubie05.push(redMaterial);
	materialsCubie05.push(blackMaterial);
	materialsCubie05.push(blackMaterial);
	materialsCubie05.push(whiteMaterial);
	materialsCubie05.push(blueMaterial);
	materialsCubie05.push(blackMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie05));
	
	var materialsCubie06 = [];
	materialsCubie06.push(redMaterial);
	materialsCubie06.push(blackMaterial);
	materialsCubie06.push(blackMaterial);
	materialsCubie06.push(blackMaterial);
	materialsCubie06.push(blueMaterial);
	materialsCubie06.push(blackMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie06));
	
	var materialsCubie07 = [];
	materialsCubie07.push(redMaterial);
	materialsCubie07.push(blackMaterial);
	materialsCubie07.push(yellowMaterial);
	materialsCubie07.push(blackMaterial);
	materialsCubie07.push(blueMaterial);
	materialsCubie07.push(blackMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie07));
	
	var materialsCubie08 = [];
	materialsCubie08.push(blackMaterial);
	materialsCubie08.push(blackMaterial);
	materialsCubie08.push(blackMaterial);
	materialsCubie08.push(blackMaterial);
	materialsCubie08.push(blueMaterial);
	materialsCubie08.push(blackMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie08));
	
	var materialsCubie09 = [];
	materialsCubie09.push(blackMaterial);
	materialsCubie09.push(blackMaterial);
	materialsCubie09.push(yellowMaterial);
	materialsCubie09.push(blackMaterial);
	materialsCubie09.push(blackMaterial);
	materialsCubie09.push(blackMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie09));
	
	var materialsCubie10 = [];
	materialsCubie10.push(blackMaterial);
	materialsCubie10.push(orangeMaterial);
	materialsCubie10.push(yellowMaterial);
	materialsCubie10.push(blackMaterial);
	materialsCubie10.push(blackMaterial);
	materialsCubie10.push(blackMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie10));
	
	var materialsCubie11 = [];
	materialsCubie11.push(blackMaterial);
	materialsCubie11.push(orangeMaterial);
	materialsCubie11.push(blackMaterial);
	materialsCubie11.push(blackMaterial);
	materialsCubie11.push(blackMaterial);
	materialsCubie11.push(blackMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie11));
	
	var materialsCubie12 = [];
	materialsCubie12.push(blackMaterial);
	materialsCubie12.push(orangeMaterial);
	materialsCubie12.push(blackMaterial);
	materialsCubie12.push(whiteMaterial);
	materialsCubie12.push(blackMaterial);
	materialsCubie12.push(blackMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie12));
	
	var materialsCubie13 = [];
	materialsCubie13.push(blackMaterial);
	materialsCubie13.push(blackMaterial);
	materialsCubie13.push(blackMaterial);
	materialsCubie13.push(whiteMaterial);
	materialsCubie13.push(blackMaterial);
	materialsCubie13.push(blackMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie13));
	
	var materialsCubie14 = [];
	materialsCubie14.push(redMaterial);
	materialsCubie14.push(blackMaterial);
	materialsCubie14.push(blackMaterial);
	materialsCubie14.push(whiteMaterial);
	materialsCubie14.push(blackMaterial);
	materialsCubie14.push(blackMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie14));
	
	var materialsCubie15 = [];
	materialsCubie15.push(redMaterial);
	materialsCubie15.push(blackMaterial);
	materialsCubie15.push(blackMaterial);
	materialsCubie15.push(blackMaterial);
	materialsCubie15.push(blackMaterial);
	materialsCubie15.push(blackMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie15));
	
	var materialsCubie16 = [];
	materialsCubie16.push(redMaterial);
	materialsCubie16.push(blackMaterial);
	materialsCubie16.push(yellowMaterial);
	materialsCubie16.push(blackMaterial);
	materialsCubie16.push(blackMaterial);
	materialsCubie16.push(blackMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie16));
	
	var materialsCubie17 = [];
	materialsCubie17.push(blackMaterial);
	materialsCubie17.push(blackMaterial);
	materialsCubie17.push(blackMaterial);
	materialsCubie17.push(blackMaterial);
	materialsCubie17.push(blackMaterial);
	materialsCubie17.push(blackMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie17));
	
	var materialsCubie18 = [];
	materialsCubie18.push(blackMaterial);
	materialsCubie18.push(blackMaterial);
	materialsCubie18.push(yellowMaterial);
	materialsCubie18.push(blackMaterial);
	materialsCubie18.push(blackMaterial);
	materialsCubie18.push(greenMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie18));
	
	var materialsCubie19 = [];
	materialsCubie19.push(blackMaterial);
	materialsCubie19.push(orangeMaterial);
	materialsCubie19.push(yellowMaterial);
	materialsCubie19.push(blackMaterial);
	materialsCubie19.push(blackMaterial);
	materialsCubie19.push(greenMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie19));
	
	var materialsCubie20 = [];
	materialsCubie20.push(blackMaterial);
	materialsCubie20.push(orangeMaterial);
	materialsCubie20.push(blackMaterial);
	materialsCubie20.push(blackMaterial);
	materialsCubie20.push(blackMaterial);
	materialsCubie20.push(greenMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie20));
	
	var materialsCubie21 = [];
	materialsCubie21.push(blackMaterial);
	materialsCubie21.push(orangeMaterial);
	materialsCubie21.push(blackMaterial);
	materialsCubie21.push(whiteMaterial);
	materialsCubie21.push(blackMaterial);
	materialsCubie21.push(greenMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie21));
	
	var materialsCubie22 = [];
	materialsCubie22.push(blackMaterial);
	materialsCubie22.push(blackMaterial);
	materialsCubie22.push(blackMaterial);
	materialsCubie22.push(whiteMaterial);
	materialsCubie22.push(blackMaterial);
	materialsCubie22.push(greenMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie22));
	
	var materialsCubie23 = [];
	materialsCubie23.push(redMaterial);
	materialsCubie23.push(blackMaterial);
	materialsCubie23.push(blackMaterial);
	materialsCubie23.push(whiteMaterial);
	materialsCubie23.push(blackMaterial);
	materialsCubie23.push(greenMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie23));
	
	var materialsCubie24 = [];
	materialsCubie24.push(redMaterial);
	materialsCubie24.push(blackMaterial);
	materialsCubie24.push(blackMaterial);
	materialsCubie24.push(blackMaterial);
	materialsCubie24.push(blackMaterial);
	materialsCubie24.push(greenMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie24));
	
	var materialsCubie25 = [];
	materialsCubie25.push(redMaterial);
	materialsCubie25.push(blackMaterial);
	materialsCubie25.push(yellowMaterial);
	materialsCubie25.push(blackMaterial);
	materialsCubie25.push(blackMaterial);
	materialsCubie25.push(greenMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie25));
	
	var materialsCubie26 = [];
	materialsCubie26.push(blackMaterial);
	materialsCubie26.push(blackMaterial);
	materialsCubie26.push(blackMaterial);
	materialsCubie26.push(blackMaterial);
	materialsCubie26.push(blackMaterial);
	materialsCubie26.push(greenMaterial);
	
	cubieMaterial.push(new THREE.MeshFaceMaterial(materialsCubie26));
	
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

	return cubieMaterial;
}