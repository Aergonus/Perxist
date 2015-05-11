// Global Object Variables
var camera, scene, renderer,
	geometry, material, mesh,
	pointLight, spotLight, highLight;

var stats;
var clock = new THREE.Clock(), delta = clock.getDelta();
var objects = [];
var raycaster;
var controls, fpsControls, plControls,
	controlsEnabled 	= false, 
	fpsControlsEnabled 	= false, 
	plControlsEnabled 	= false;

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
var PI_2 = Math.PI / 2,
	rad45 = Math.PI / 4,
    rad90 = Math.PI / 2,
    rad180 = Math.PI,
    rad360 = Math.PI * 2,
    deg2rad = Math.PI / 180,
    rad2deg = 180 / Math.PI;
var ANIMATE_INCREMENT = 0.01;

// Get Attributes
var blocker = document.getElementById( 'blocker' );
var instructions = document.getElementById( 'instructions' );
var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

var moveForward 	= false, 
	moveBackward 	= false,
	moveLeft 		= false,
	moveRight 		= false,
	panUp 			= false,
	panDown			= false,
	panLeft			= false,
	panRight 		= false,
	canJump 		= false;

var prevTime = performance.now();
var velocity = new THREE.Vector3();


window.onload = function setup()
{
	// Scene initialisation code:
	init();
	// Add elements to DOM
	addToDOM();
	// Set up all 3D Objects in scene
	createScene();
	// PointerLock
	//pointerLock();
	// Render/Drawing/Animate function
	tick();
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
	//renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize(canvasWidth, canvasHeight);
	
	//Camera:
	camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT_RATIO, NEAR, FAR);
	// Args(FOV, Aspect Ratio, Near clipping plane, Far clipping plane)
	camera.position.set(20, 20, 20); // Initial position gives a orthographic perspective
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
	// Debugger Stats
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	stats.domElement.style.left = '0px'; 
	container.appendChild(stats.domElement);
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
	updateWorld(delta);
	//plControls.getObject().position.copy(cubie.position);
	//plControls.getObject().position.y += 10;
	lights.position.copy(camera.position); //plControls.getObject().position
	
	endAnimation = false;
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
	// Add Lights to scene
	createLights();
	// Add Fog
	scene.fog = new THREE.Fog( 0x000000, 0, 250 );
	//scene.fog = new THREE.FogExp2( 0x006633, 0.9025 );
	// Add Camera to scene
	scene.add(camera);
	
	// Create Objects
	player = new createPlayer();

	// Start the renderer
	renderer.setSize(canvasWidth, canvasHeight);

	// Create Camera Pivot 
	//pivot = new THREE.Object3D();
	//scene.add(pivot); // Default adds to Origin
	// Add Objects to scene 
	//scene.add(cubes[i]);
	
	geometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) ); // Makes plane "horizontal" instead of "vertical"
	var texture = THREE.ImageUtils.loadTexture('media/ground.png');
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 4, 4 );
	for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {

		var vertex = geometry.vertices[ i ];
		vertex.x += 0;
		vertex.y += 0;
		vertex.z += 0;

	}

	for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {

		var face = geometry.faces[ i ];
		face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
		face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
		face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );

	}
	
	//material = new THREE.MeshBasicMaterial({map: texture, transparent: true});
	material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors, transparent: true});

	plane = new THREE.Mesh( geometry, material );
	objects.push(plane);
	scene.add( plane );

}

function createPlayer() {
	cubiegeometry = new THREE.BoxGeometry( 3, 3, 3 );
	cubiematerial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: false, wireframeLinewidth: 20 } );
	cubie = new THREE.Mesh( cubiegeometry, cubiematerial );
	cubie.position.set(0,3,0);
	scene.add( cubie );
}

var lights;
function createLights()
{
	var ambientLight = new THREE.AmbientLight(0x404040);
	//scene.add(ambientLight);
	var hslight = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
	hslight.position.set( 0.5, 1, 0.75 );
	//scene.add(hslight);
	
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
	//scene.add(lights);

}

function updateWorld(delta)
{
		if ( controlsEnabled ) {
		raycaster.ray.origin.copy( cubie.position );

		var intersections = raycaster.intersectObjects( objects );

		var isOnObject = intersections.length > 0;

		velocity.x -= velocity.x * 10.0 * delta;
		velocity.z -= velocity.z * 10.0 * delta;

		velocity.y -= 9.8 * 10.0 * delta; // 100.0 = mass

		if ( moveForward ) velocity.z -= 400.0 * delta;
		if ( moveBackward ) velocity.z += 400.0 * delta;

		if ( moveLeft ) velocity.x -= 400.0 * delta;
		if ( moveRight ) velocity.x += 400.0 * delta;

		if ( isOnObject === true ) {
			velocity.y = Math.max( 0, velocity.y );

			canJump = true;
		}

		cubie.translateX( velocity.x * delta );
		cubie.translateY( velocity.y * delta );
		cubie.translateZ( velocity.z * delta );

		if ( cubie.position.y < 0 ) {

			velocity.y = 0;
			cubie.position.y = 0;

			canJump = true;

		}
	}

}

function errorMessage()
{
	alert("Oh no! It seems WebGL is either not supported or your GPU is blacklisted! Switching to Canvas Renderer... Will get slow!");
	return new THREE.CanvasRenderer();
}

function pointerLock() 
{
	if ( havePointerLock ) {
		
		var element = document.body;

		var pointerlockchange = function ( event ) {

			if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

				plControlsEnabled = true;
				plControls.enabled = true;

				blocker.style.display = 'none';

			} else {

				plControls.enabled = false;

				blocker.style.display = '-webkit-box';
				blocker.style.display = '-moz-box';
				blocker.style.display = 'box';

				instructions.style.display = '';

			}

		}

		var pointerlockerror = function ( event ) {

			instructions.style.display = '';

		}

		// Hook pointer lock state change events
		document.addEventListener( 'pointerlockchange', pointerlockchange, false );
		document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
		document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

		document.addEventListener( 'pointerlockerror', pointerlockerror, false );
		document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
		document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

		instructions.addEventListener( 'click', function ( event ) {

			instructions.style.display = 'none';

			// Ask the browser to lock the pointer
			element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

			if ( /Firefox/i.test( navigator.userAgent ) ) {

				var fullscreenchange = function ( event ) {

					if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {

						document.removeEventListener( 'fullscreenchange', fullscreenchange );
						document.removeEventListener( 'mozfullscreenchange', fullscreenchange );

						element.requestPointerLock();
					}

				}

				document.addEventListener( 'fullscreenchange', fullscreenchange, false );
				document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );

				element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

				element.requestFullscreen();

			} else {

				element.requestPointerLock();

			}

		}, false );

	} else {

		instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

	}
	
	plControls = new THREE.PointerLockControls( camera );
	scene.add( plControls.getObject() );
}