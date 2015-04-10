// Global Object Variables
var renderer, scene, 
	camera, cameraControls,
	pointLight, spotLight, highLight;

var stats;
var clock = new THREE.Clock();
var cubes = [], var objects = [];

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

function setup()
{
	//Scene initialisation code:
	init();
	// Add elements to DOM
	addToDOM();
	// Set up all 3D Objects in scene
	createScene();
	// Render 
	render();
	//Drawing/Animate function
	tick();
}

function init()
{
	var canvas = document.getElementById("cC"); // Cube Canvas
	initGL(canvas);
	//Renderer:
	renderer = Detector.webgl? new THREE.WebGLRenderer({ antialias: true }): errorMessage();
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setClearColor(0xFFFFFF); // Set clear to White
	renderer.setPixelRatio( window.devicePixelRatio );
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

function initGL(canvas) {
	var gl;
	try {
		gl = canvas.getContext("experimental-webgl");
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
	} catch (e) {
	}
	if (!gl) {
		alert("Could not initialise WebGL, sorry :-(");
	}
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
	stats.domElement.style.zIndex = 100;
	container.appendChild(stats.domElement);
}

function createScene()
{
	// Create the scene
	scene = new THREE.Scene();
	// Add Lights to scene
	createLights();
	// Add Camera to scene
	scene.add(camera);
	
	// Create cubes
	cubes = new createCubes();
	
	// Start the renderer
	renderer.setSize(canvasWidth, canvasHeight);
	
	// Create Camera Pivot 
	pivot = new THREE.Object3D();
	scene.add(pivot); // Default adds to Origin
	
	// Add Child Cubes to scene 
	for (var i = 0, len = cubes.length; i < len; ++i)
	{
		scene.add(cubes[i]);
	}
}

var lights;
function createLights()
{
	var ambientLight = new THREE.AmbientLight(0x333333);
	scene.add(ambientLight);
	
	lights = new THREE.Object3D();
	var spotlight = new THREE.SpotLight(0xFFFFFF, 0.99225);
	spotlight.position.set(50,50,50);
	spotlight.angle = 60 * Math.PI / 180;
	spotlight.exponent = 100;
	spotlight.target.position.set(0,0,0);

	var highlight = new THREE.SpotLight(0xFFFFFF, 0.99225);
	highlight.position.set(100,100,250);
	highlight.angle = 60 * Math.PI / 180;
	highlight.exponent = 100;
	highlight.target.position.set(0,0,0);
	lights.add(spotlight);
	lights.add(highlight);
	scene.add(lights);
}

/** Popping matrix support from LWGL L3
  var lastTime = 0;
  function animate() {
    var timeNow = new Date().getTime();
    if (lastTime != 0) {
      var elapsed = timeNow - lastTime;

      rTri += (90 * elapsed) / 1000.0;
      rSquare += (75 * elapsed) / 1000.0;
    }
    lastTime = timeNow;
  }
//            window.requestAnimationFrame(animate);
//            render();

  
    function degToRad(degrees) {
        return degrees * Math.PI / 180;
    }

  var mvMatrix = mat4.create();
  var mvMatrixStack = [];
  var pMatrix = mat4.create();

  function mvPushMatrix() {
    var copy = mat4.create();
    mat4.set(mvMatrix, copy);
    mvMatrixStack.push(copy);
  }

  function mvPopMatrix() {
    if (mvMatrixStack.length == 0) {
      throw "Invalid popMatrix!";
    }
    mvMatrix = mvMatrixStack.pop();
  }
*/

function detachAndReset()
{
	for (var i = 0, len = active.length; i < len; ++i)
		THREE.SceneUtils.detach(active[i], pivot, scene);
	active.length = 0;
	activeCount = 0;
	
	for(var i in attached)
		attached[i] = false;
		
	pivot.rotation.x = 0;
	pivot.rotation.y = 0;
	pivot.rotation.z = 0;
}

// Handles camera and lighting logic
function cameraPhysics()
{
	// we can easily notice shadows if we dynamically move lights during the game
	spotLight.position.x = ball.position.x * 2;
	spotLight.position.y = ball.position.y * 2;
	
	// move to behind the player's paddle
	camera.position.x = paddle1.position.x - 100;
	camera.position.y += (paddle1.position.y - camera.position.y) * 0.05;
	camera.position.z = paddle1.position.z + 100 + 0.04 * (-ball.position.x + paddle1.position.x);
	
	// rotate to face towards the opponent
	camera.rotation.x = -0.01 * (ball.position.y) * Math.PI/180;
	camera.rotation.y = -60 * Math.PI/180;
	camera.rotation.z = -90 * Math.PI/180;
}

function errorMessage()
{
	alert("Snap! It seems WebGL is either not supported or your GPU is blacklisted! Switching to Canvas Renderer... Will get slow!");
	return new THREE.CanvasRenderer();
}

function tick()
{	
	// Draw THREE.JS scene
	renderer.render(scene, camera);
	// Loop draw function call
	window.rAF(tick); // requestAnimationFrame, window optional 
	
	drawScene();
    animate();
	
	// Game Logic: Physics and Movement functions/handlers
	ballPhysics();
	paddlePhysics();
	cameraPhysics();
	playerPaddleMovement();
	opponentPaddleMovement();
}


				controls = new THREE.OrbitControls( camera );
				controls.damping = 0.2;
				controls.addEventListener( 'change', render );
			function animate() {

				requestAnimationFrame(animate);
				controls.update();

			}
						function render() {

				renderer.render( scene, camera );
				stats.update();

			}

        function animate()
        {
            window.requestAnimationFrame(animate);
            render();
        }


        function render()
        {
            var delta = clock.getDelta();
            cameraControls.update(delta);
            stats.update();
			
			lights.position.copy(camera.position);
            var endAnimation = false;
			
			if(document.getElementById("dispOrientationLabels").checked)
				for(var i = 0; i < text.length; i++)	
					text[i].lookAt(camera.position);
			
					
				
            //Math.PI / 2 == 1.580000000000001
            //Rotate Right face of cube
            if (attached["right"] === true)
            {
                pivot.rotation.x -= 0.091;
				 
                if (pivot.rotation.x <= -Math.PI / 2.0)
                {
                    pivot.rotation.x = -Math.PI / 2.0;
                    endAnimation = true;
                }
            }
            //Math.PI / 2 == 1.580000000000001
            //Rotate Upper face of cube
            if (attached["up"] === true)
            {
                pivot.rotation.y -= 0.091;
				
                if (pivot.rotation.y <= -Math.PI / 2.0)
                {
                    pivot.rotation.y = -Math.PI / 2.0;
					endAnimation = true;
                }
            }
            //Rotate Front Face of cube
            if (attached["front"] === true)
            {
                pivot.rotation.z -= 0.091;
				
                if (pivot.rotation.z <= -Math.PI / 2.0)
                {
                    pivot.rotation.z = -Math.PI / 2.0;
					endAnimation = true;
                }
            }
            //Rotate Right_Prime face of cube primen
            if (attached["rightP"] === true)
            {
                pivot.rotation.x += 0.091;
				
                if (pivot.rotation.x >= Math.PI / 2.0)
                {
                    pivot.rotation.x = Math.PI / 2.0;
                    endAnimation = true;
                }
            }
            //Math.PI / 2 == 1.580000000000001
            //Rotate Upper_Prime face of cube
            if (attached["upP"] === true)
            {
                pivot.rotation.y += 0.091;
				
                if (pivot.rotation.y >= Math.PI / 2.0)
                {
                    pivot.rotation.y = Math.PI / 2.0;
                    endAnimation = true;
                }
            }
            //Rotate Front_Prime Face of cube
            if (attached["frontP"] === true)
            {
                pivot.rotation.z += 0.091;
				
                if (pivot.rotation.z >= Math.PI / 2.0)
                {
                    pivot.rotation.z = Math.PI / 2.0;
                    endAnimation = true;
                }
            }
            //Rotate Left Face of cube
            if (attached["left"] === true)
            {
                pivot.rotation.x += 0.091;
				
                if (pivot.rotation.x >= Math.PI / 2.0)
                {
                    pivot.rotation.x = Math.PI / 2.0;
                    endAnimation = true;
                }
            }
            //Rotate Down Face of cube
            if (attached["down"] === true)
            {
                pivot.rotation.y += 0.091;
				
                if (pivot.rotation.y >= Math.PI / 2.0)
                {
                    pivot.rotation.y = Math.PI / 2.0;
                    endAnimation = true;
                }
            }
            //Rotate Back face of cube
            if (attached["back"] === true)
            {
                pivot.rotation.z += 0.091;
                if (pivot.rotation.z >= Math.PI / 2.0)
                {
                    pivot.rotation.z = Math.PI / 2.0;
                    endAnimation = true;
                }
            }
            //LDB_Prime
            if (attached["leftP"] === true)
            {
                pivot.rotation.x -= 0.091;
				 
                if (pivot.rotation.x <= -Math.PI / 2.0)
                {
                    pivot.rotation.x = -Math.PI / 2.0;
                    endAnimation = true;
                }
            }
            //Rotate Down Face of cube
            if (attached["downP"] === true)
            {
                pivot.rotation.y -= 0.091;
			
                if (pivot.rotation.y <= -Math.PI / 2.0)
                {
                    pivot.rotation.y = -Math.PI / 2.0;
                    endAnimation = true;
                }
            }
            //Rotate Back face of cube
            if (attached["backP"] === true)
            {
                pivot.rotation.z -= 0.091;
				
                if (pivot.rotation.z <= -Math.PI / 2.0)
                {
                    pivot.rotation.z = -Math.PI / 2.0;
                    endAnimation = true;
                }
            }
            //Rotate Middle Face of cube
            if (attached["middle"] === true)
            {
                pivot.rotation.x -= 0.091;
				
                if (pivot.rotation.x <= -Math.PI / 2.0)
                {
                    pivot.rotation.x = -Math.PI / 2.0;
                    endAnimation = true;
                }
            }
            //Rotate Middle face prime of cube
            if (attached["middleP"] === true)
            {
                pivot.rotation.x += 0.091;
				
                if (pivot.rotation.x >= Math.PI / 2.0)
                {
                    pivot.rotation.x = Math.PI / 2.0;
                    endAnimation = true;
                }
            }
			if (attached["X"] === true)
            {
                pivot.rotation.x -= 0.091;
                if (pivot.rotation.x <= -Math.PI / 2.0)
                {
                    pivot.rotation.x = -Math.PI / 2.0;
                    endAnimation = true;
                }
            }
			
			if (attached["Y"] === true)
            {
                pivot.rotation.y -= 0.091;
                if (pivot.rotation.y <= -Math.PI / 2.0)
                {
                    pivot.rotation.y = -Math.PI / 2.0;
                    endAnimation = true;
                }
            }
			
			if (attached["Z"] === true)
            {
                pivot.rotation.z -= 0.091;
                if (pivot.rotation.z <= -Math.PI / 2.0)
                {
                    pivot.rotation.z = -Math.PI / 2.0;
                    endAnimation = true;
                }
            }
			
            renderer.render(scene, camera);
            if (endAnimation)
                detachAndReset();
        }
		
<script id="fragment-shader" type="x-shader/x-fragment">
	// getShaderPrecisionFormat()
	#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
	#else
		precision mediump float;
	#endif
</script>
/*	Always have vertex attrib 0 array enabled. 
	If you draw with vertex attrib 0 array disabled, 
	you will force the browser to do complicated emulation 
	when running on desktop OpenGL (e.g. on Mac OSX). 
	This is because in desktop OpenGL, 
	nothing gets drawn if vertex attrib 0 is not array-enabled. 
	You can use bindAttribLocation() 
	to force a vertex attribute to use location 0, 
	and use enableVertexAttribArray() to make it array-enabled.
	From WebGL best practices by Mozilla	*/