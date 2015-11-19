var balloonMeshPath = 'assets/mesh/hotair/hot-air.json';
var holderMeshPath = 'assets/mesh/hotair/holder.json';
var	string1MeshPath = 'assets/mesh/hotair/string1.json';
var string2MeshPath = 'assets/mesh/hotair/string2.json';
var string3MeshPath = 'assets/mesh/hotair/string3.json';
var string4MeshPath = 'assets/mesh/hotair/string4.json';

var scene = null;
var camera = null;
var renderer = null;

var speed = 0.08;

//hot air balloon mesh

var balloon = null;

function initialize()
{
  scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );

	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
}

// all mesh should be initialized here
function initializeMesh()
{
	var loader = new THREE.JSONLoader();

	loader.load(balloonMeshPath, function(geometry, materials) 
	{
    balloon = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    scene.add(balloon);
  });

  camera.position.z = 13;

  var light = new THREE.AmbientLight(0xffffff);
  scene.add(light);
}

function render()
{

	if (scene != null)
	{
		if (camera != null)
		{
			if (renderer != null)
			{
				requestAnimationFrame( render );
				renderer.render(scene, camera);
			}
		}
	}
}

function startThreeJS()
{
	initialize();
	initializeMesh();
	render();
	moveMesh();
}

function moveMesh()
{
	document.addEventListener('keydown', function(event) 
  {
  	//left key

    if(event.keyCode == 37) 
    {
      balloon.position.x -= speed;
    }
  	
  	//right key
    else if(event.keyCode == 39) 
    {
      balloon.position.x += speed;
    }

    //A key
    else if (event.keyCode == 65)
    {
    	balloon.position.x -= speed;
    }

    //D Key

    else if (event.keyCode == 68)
    {
    	if (balloon.position.x != screen.innerWidth)
    	{
    		balloon.position.x += speed;
    	}    	
    }
  });
}

startThreeJS();