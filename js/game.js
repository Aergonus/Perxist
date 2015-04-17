// Global Object Variables
var renderer, scene, 
	camera,	pointLight, spotLight, highLight;

var stats;
var clock = new THREE.Clock(), delta = clock.getDelta();
var cubes = [], objects = [];

// Field variables to set Scene Dimensions
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var aspectRatio = canvasWidth / canvasHeight;

// Camera Attributes
var VIEW_ANGLE = 50,
  ASPECT_RATIO = aspectRatio,
  NEAR = 0.1,
  FAR = 1000; // To redo: dynamically change based on zoom

 // Defs
var PI_2 = Math.PI / 2;
var ANIMATE_INCREMENT = 0.01;

window.onload = function setup()
{
	console.log("Reach Setup");
	//Scene initialisation code:
	init();
	console.log("Passed Init");
	// Add elements to DOM
	addToDOM();
	console.log("Passed DOM");
	// Set up all 3D Objects in scene
	createScene();
	console.log("Passed Scene");
	// Render/Drawing/Animate function
	tick();
	console.log("Passed Tick");
}

function init()
{
	//var canvas = document.getElementById("cC"); // Cube Canvas
	//initGL(canvas);
	//Renderer:
	renderer = Detector.webgl? new THREE.WebGLRenderer({ antialias: true }): errorMessage();
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setClearColor(0xFFFFFF); // Set clear to White
	renderer.setSize(canvasWidth, canvasHeight);
	
	//Camera:
	camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT_RATIO, NEAR, FAR);
	// Args(FOV, Aspect Ratio, Near clipping plane, Far clipping plane)
	camera.position.set(100, 100, 100); // Initial position gives a orthographic perspective
										// Not setting inital camera position screws up shadow rendering
	//CameraControls:
	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	
	addEventListeners();
}

function addToDOM()
{
	// var canvas = document.getElementById("cC"); // Cube Canvas
	var container = document.getElementById("gameCanvas");
	// Attach the render-supplied DOM element (the gameCanvas)
	container.appendChild(renderer.domElement);
	console.log("Got Canvas");
	// Debugger Stats
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	stats.domElement.style.left = '0px'; 
	container.appendChild(stats.domElement);
	console.log("Got Stats");
}

function detachAndReset()
{
	for (var i = 0, len = active.length; i < len; ++i)
		THREE.SceneUtils.detach(active[i], pivot, scene);
	active.length = 0;
	activeCount -= 1;

	for(var i in actions)
		actions[i] = false;
		
	pivot.rotation.x = 0;
	pivot.rotation.y = 0;
	pivot.rotation.z = 0;
}

	var ticks = 0;
function tick()
{	ticks++;
	if (ticks < 10)
	{
		console.log("Ticking!" + ticks);
	}
	delta = clock.getDelta()
	cameraControls.update(delta);
	stats.update();
	lights.position.copy(camera.position);
	endAnimation = false;
	prepRot();
	rotate();
	// Draw THREE.JS scene
	renderer.render(scene, camera);
	// Loop draw function call
	window.requestAnimationFrame(tick); // requestAnimationFrame, window optional 
    //animate();
}

function createScene()
{
	// Create the scene
	scene = new THREE.Scene();
	console.log("Scene!");
	// Add Lights to scene
	createLights();
	console.log("Lights!");
	// Add Camera to scene
	scene.add(camera);
	console.log("Camera!");
	
	// Create cubes
	cubes = new createCubes();
	console.log("Cubes!");
	// Start the renderer
	renderer.setSize(canvasWidth, canvasHeight);
	console.log("Render!");
	// Create Camera Pivot 
	pivot = new THREE.Object3D();
	scene.add(pivot); // Default adds to Origin
	console.log("Pivot!");
	// Add Child Cubes to scene 
	for (var i = 0, len = cubes.length; i < len; ++i)
	{
		scene.add(cubes[i]);
	}
	console.log("Populated Cubes!");
}

var lights;
function createLights()
{
	var ambientLight = new THREE.AmbientLight(0x404040);
	scene.add(ambientLight);
	
	lights = new THREE.Object3D();
	var pointlight = new THREE.PointLight(0xFFFFFF, 0.99225);
	pointlight.position.set(10,10,10);
	//spotlight.angle = 60 * Math.PI / 180;
	pointlight.exponent = 10;
	//spotlight.target.position.set(0,0,0);

	var spotlight = new THREE.SpotLight(0xFFFFFF, 0.99225);
	spotlight.position.set(-10,-10,-10);
	spotlight.angle = 60 * Math.PI / 180;
	spotlight.exponent = 100;
	spotlight.target.position.set(0,0,0);
	
	var highlight = new THREE.SpotLight(0xFFFFFF, 0.99225);
	highlight.position.set(10,10,25);
	highlight.angle = 60 * Math.PI / 180;
	highlight.exponent = 100;
	highlight.target.position.set(0,0,0);
	lights.add(pointlight);
	lights.add(spotlight);
	lights.add(highlight);
	scene.add(lights);
}

function errorMessage()
{
	alert("Oh no! It seems WebGL is either not supported or your GPU is blacklisted! Switching to Canvas Renderer... Will get slow!");
	return new THREE.CanvasRenderer();
}

function checkSolved()
{
	var lowx = [], highx = [],
	lowy = [], highy = [],
	lowz = [], highz = [];
	var solved = true;
	
	for (var i = 0, len = cubes.length; i < len; ++i)
    {
		var position = getObjWorldPos(cubes[i]);
		console.log(position);
		console.log("X:" + (Math.abs(position.x) + cEdge) + "Y:" + (Math.abs(position.y) + cEdge) +"Z:" + (Math.abs(position.y) + cEdge));
		if ((Math.abs(position.x) + cEdge) >= coff)
			(position.x > 0) ? highx.push(cubes[i].material.materials) : lowx.push(cubes[i].material.materials);
		if ((Math.abs(position.y) + cEdge) >= coff)
			(position.y > 0) ? highy.push(cubes[i].material.materials) : lowy.push(cubes[i].material.materials);
		if ((Math.abs(position.z) + cEdge) >= coff)
			(position.z > 0) ? highz.push(cubes[i].material.materials) : lowz.push(cubes[i].material.materials);
	}
	var sides = [highx, lowx, highy, lowy, highz, lowz];
	for (var i = 0, len = sides.length; i < len; ++i)//(cMA in CAtoCheck) 
	{
		solved = solved && checkCubes(sides[i], i);
		if (!solved)
			return solved;
	}
	
	return solved;
}

function checkCubes(cubeArray, access)
{
	var sideSolved = true;
	var refMat = cubeArray[access][access];
	for (var i = 0, len = cubeArray.length; i < len; ++i)//(matArray in cubeArray) 
	{
		if (cubeArray[i][access] == redMaterial)
			console.log("Red");
		if (cubeArray[i][access] == greenMaterial)
			console.log("Green");
		if (cubeArray[i][access] == blueMaterial)
			console.log("Blue");
		if (cubeArray[i][access] == yellowMaterial)
			console.log("Yellow");
		if (cubeArray[i][access] == orangeMaterial)
			console.log("Orange");
		if (cubeArray[i][access] == whiteMaterial)
			console.log("White");
			
		sideSolved = sideSolved && (cubeArray[i][access] == refMat);
		if (!sideSolved)
			return sideSolved;
	}
	return sideSolved;
}

function reportSolved()
{
	document.getElementById("debug").textContent = checkSolved() ? "Solved!" : "Unsolved";
}
