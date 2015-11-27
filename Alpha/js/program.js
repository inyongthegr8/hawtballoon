// alex hotballoon

var balloonMeshPath = 'assets/mesh/hotair/hot-air.json';

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

// enemies meshes

var jetplane = null;
var barbwire = null;
var electricwire = null;

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

  loader.load(jetplaneMeshPath, function(geometry, materials) 
  {
    jetplane = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    jetplane.scale.set(0.2, 0.2, 0.2);
    scene.add(jetplane);
  });

  /*loader.load(barbwireMeshPath, function(geometry, materials) 
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
  });*/

  camera.position.z = 13;
}

function lightsController()
{
  var light = new THREE.AmbientLight(0xffffff);
  //var hemiLight = new THREE.HemisphereLight( 0x0000ff, 0x00ff00, 0.6 ); 
  scene.add(light);
  //scene.add(hemiLight);

  var pointLight =
  new THREE.PointLight(0xFFFFFF);

// set its position
  pointLight.position.x = 10;
  pointLight.position.y = 50;
  pointLight.position.z = 130;

// add to the scene
  scene.add(pointLight);
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
        //var controls = new THREE.TrackballControls( camera );
        //controls.target.set( 0, 0, 0 )
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
    }
  
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

function startProgram()
{
  initialize();
  initializeMesh();
  lightsController();
  render();
  moveMesh();

}

startProgram();

