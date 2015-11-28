// test_entity
var testEntPath = 'assets/mesh/enemies/jetplane/jetplane.json';
var testEnt = null;

// detail_forest
var forestbgPath = 'assets/mesh/detail/forestbg.json';
var forestbg = null;

// detail_desert
var desertbgPath = 'assets/mesh/detail/desertbg.json';
var desertbg = null;

// JSON Loader
var loader = new THREE.JSONLoader();

// Enemy LIMIT
var eNum = 0;
var eList = [];
var eAppearanceRate = 500; // 1000 ms = 1 sec
var eSpeed = 0.85; // speed of the enemies after its initial respawn going towards the player
var eRespawn = function() {
	loader.load(testEntPath, function(geometry, materials) 
	{
		newEnt = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
		newEnt.position.x = Math.floor((Math.random() * 50) + 1) - Math.floor((Math.random() * 30) + 1)
		newEnt.position.z = -50
		eList.push(newEnt);
		scene.add(newEnt);
		console.log("NEW ENTITY " + eNum + ": " + newEnt.position.x + "");
		eNum++;
	});
};

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
	loader.load(forestbgPath, function(geometry, materials) 
	{
		forestbg = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
		// selectedbg = forestbg;
		forestbg.position.set(0, -33, 100);
		forestbg.scale.set(100, 100, 100);
		scene.add(forestbg);
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
				moveEnemies();
				scrollBG();
				renderer.render(scene, camera);
			}
		}
	}
}

function respawn()
{
	setInterval( eRespawn, eAppearanceRate );
}

function moveEnemies()
{
	for(var i = 0; i < eList.length; i++)
	{
		eList[i].position.z += eSpeed;
		// console.log("NEW ENTITY " + i + ": " + eList[i].position.z + "");
		if(eList[i].position.z > 50){
			scene.remove(eList[i]);
			eList.splice(i, 1)
		}
	}
}

function scrollBG(){
	forestbg.position.z -= 5
	if(forestbg.position.z <= -500){
		forestbg.position.z = 100;
	}
}

function startProgram()
{
  initialize();
  initializeMesh();
  lightsController();
  respawn();
  render();
}

startProgram();

