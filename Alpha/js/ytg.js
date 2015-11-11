// ytg key implements (c) Yong

document.onkeydown = holdMe;
document.onkeyup = releaseMe;
var speed = 1;

function holdMe(e) {
	if(e.keyCode == 83){
		// W
		cube.position.y -= speed;
	}
	if(e.keyCode == 87){
		// S
		cube.position.y += speed;
	}
	if(e.keyCode == 65){
		// A
		cube.position.x -= speed;
	}
	if(e.keyCode == 68){
		// D
		cube.position.x += speed;
	}
	if(e.keyCode == 38){
		// up btn
		cube.position.z -= speed;
	}
	if(e.keyCode == 40){
		// down btn
		cube.position.z += speed;
	}
}

function releaseMe(e) {
}