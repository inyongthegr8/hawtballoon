// detail_forest
var forestbgPath = 'assets/mesh/detail/forestbg.json';
var forestbg = null;

// detail_desert
var desertbgPath = 'assets/mesh/detail/desertbg.json';
var desertbg = null;

// menu selection
var bgSelect = 0; // 0 for forest, 1 for desert.
var selectedbg = null

var scene = null;
var camera = null;
var renderer = null;

var speed = 0.05;

function initialize()
{
  scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
}

// all mesh should be initialized here
function initializeMesh()
{
	var loader = new THREE.JSONLoader();

	loader.load(forestbgPath, function(geometry, materials) 
	{
		forestbg = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
		selectedbg = forestbg;
		scene.add(selectedbg);
	});

	loader.load(desertbgPath, function(geometry, materials) 
	{
		desertbg = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
		//scene.add(desertbg);
	});
  camera.rotation.x = -0.5;
  camera.position.y = 5;
  camera.position.z = 13;
}

function lightsController()
{
  // var light = new THREE.AmbientLight(0xffffff);
  // var hemiLight = new THREE.HemisphereLight( 0x0000ff, 0x00ff00, 0.6 ); 
  // scene.add(light);
  // scene.add(hemiLight);

  var pointLight = new THREE.PointLight(0xFFFFFF);

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
        // var controls = new THREE.TrackballControls( camera );
        // controls.target.set( 0, 0, 0 )
				selectedbg.rotateY(speed);
				renderer.render(scene, camera);
			}
		}
	}
}

function selectBackground()
{
	document.addEventListener('keydown', function(event)
	{
		if(event.keyCode == 37) 
		{
			bgSelect++;
			bgSelect = Math.abs(bgSelect % 2);
			switch(bgSelect){
				case 0: scene.remove(desertbg);
						selectedbg = forestbg;
						scene.add(selectedbg);
						break;
				case 1: scene.remove(forestbg);
						selectedbg = desertbg;
						scene.add(selectedbg);
						break;
			}
			selectedbg.rotation.y = 0;
		}
		else if(event.keyCode == 39) 
		{
			bgSelect--;
			bgSelect = Math.abs(bgSelect % 2);
			switch(bgSelect){
				case 0: scene.remove(desertbg);
						selectedbg = forestbg;
						scene.add(selectedbg);
						break;
				case 1: scene.remove(forestbg);
						selectedbg = desertbg;
						scene.add(selectedbg);
						break;
			}
			selectedbg.rotation.y = 0;
		}
	});
}

function startProgram()
{
  initialize();
  initializeMesh();
  lightsController();
  selectBackground();
  render();
}

startProgram();

