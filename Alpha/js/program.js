// alex hotballoon

var balloonMeshPath = 'assets/mesh/hotair/hot-air.json';
var holderMeshPath = 'assets/mesh/hotair/holder.json';
var	string1MeshPath = 'assets/mesh/hotair/string1.json';
var string2MeshPath = 'assets/mesh/hotair/string2.json';
var string3MeshPath = 'assets/mesh/hotair/string3.json';
var string4MeshPath = 'assets/mesh/hotair/string4.json';

// yong jetplane

var jetplaneMeshPath = 'assets/mesh/enemies/jetplane/jetplane.json';

// yong barbwire

var barbwireMeshPath = 'assets/mesh/enemies/barbwire/barbwire.json';

// yong electricwire

var electricwireMeshPath = 'assets/mesh/enemies/electricwire/electricwire.json';

var scene = null;
var camera = null;
var renderer = null;

var speed = 0.08;

//hot air balloon mesh

var balloon = null;
var holder = null
var string1 = null;
var string2 = null;
var string3 = null;
var string4 = null;

// enemies meshes

var jetplane = null;
var barbwire = null;
var electricwire = null;

function initialize()
{
  scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );

	renderer = new THREE.WebGLRenderer({alpha: true});
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

  loader.load(holderMeshPath, function(geometry, materials)
  {
    holder = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    scene.add(holder);
  });

  loader.load(string1MeshPath, function(geometry, materials) 
  {
    string1 = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    scene.add(string1);
  });

  loader.load(string2MeshPath, function(geometry, materials) 
  {
    string2 = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    scene.add(string2);
  });

  loader.load(string3MeshPath, function(geometry, materials) 
  {
    string3 = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    scene.add(string3);
  });

  loader.load(string4MeshPath, function(geometry, materials) 
  {
    string4 = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    scene.add(string4);
  });

  loader.load(jetplaneMeshPath, function(geometry, materials) 
  {
    jetplane = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    scene.add(jetplane);
  });


  loader.load(barbwireMeshPath, function(geometry, materials) 
  {
    barbwire = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    scene.add(barbwire);
    barbwire.rotation.y = -0.5 * Math.PI;
    barbwire.position.z = -15;
  });

  loader.load(electricwireMeshPath, function(geometry, materials) 
  {
    electricwire = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    scene.add(electricwire);
    electricwire.rotation.y = -0.5 * Math.PI;
  });

  camera.position.z = 10;

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

function moveMesh()
{
	document.addEventListener('keydown', function(event) 
  {
    if(event.keyCode == 37) 
    {
      balloon.position.x -= speed;
	    holder.position.x -= speed;
	    string1.position.x -= speed;
	    string2.position.x -= speed;
		  string3.position.x -= speed;
	  	string4.position.x -= speed;
    }
  
    else if(event.keyCode == 39) 
    {
      balloon.position.x += speed;
	    holder.position.x += speed;
	    string1.position.x += speed;
	    string2.position.x += speed;
		  string3.position.x += speed;
		  string4.position.x += speed;
    }
  });
}

initialize();
initializeMesh();
render();
moveMesh();

