
/* Skeleton Lab 5: Hemisphere with 3 axis lines and lighting.
   Hacked up from Angel's shaded sphere 1 example, with a single set of 
   material properties for everything.

   -- Includes a hemisphere
   -- Controls are latitude and longitude, sphere doesn't get out of range easily
   -- Also controls the sun angle
   -- Use perspective projection
 */

var canvas;
var gl;

 
var index = 0;

/* Buffer objects */
var vertices = [];
var normals = [];
var vindices = [];
var v0 = 0;

var tristart;   /* index in vindices where lines end and triangles start */

/* Scene viewing variables. */
var near = -10;
var far = 10;
var radius = 5.0;
var latitude  = 0.0;
var longitude = 0.0;
var sunangle = -45.0;
var dr = 5.0 * Math.PI/180.0;

var eye;  // for lookAt()
var at = vec3(0.0, 0.0, 0.0);
var up = vec3(0.0, 1.0, 0.0);

/* Lighting parameters */
// Light starts out direcly behind you
var lightPosition = vec4(0.0, 0.0, 1.0, 0.0 );

// Ambient light is dim-white
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );

// Diffuse light is full-white
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );

// The color reflectivity of the surface
var materialAmbient = vec4( 1.0, 0.0, 1.0, 1.0 );
var materialDiffuse = vec4( 1.0, 0.8, 0.0, 1.0 );

var ambientColor, diffuseColor;

/* Variables inside the shader */
var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var lightPositionLoc;

/* Normals here are vec3, and this matrix is redundantly
 * a copy of the modelView matrix.
 * (As we move the camera, surface normals must also move.)
 */
var normalMatrix, normalMatrixLoc;
 
   
/* Indices within the element and vertex buffers, for rendering */

/* First we put lines into the vertex and element buffers */
var numLineIndices = 0;

/* Then we put triangles into the buffers */
var numTriangleIndices = 0;

/* Drawing objects */

// Axis line: a simple line (no tick marks).  Please put your own axisline.
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var viewX = 0.0;
var viewY = 0.0;

function moveRight() {
	viewX+=50.0;
	if (viewX > 100.0) {
		viewX = 100.0;
		gl.viewport( viewX, viewY, canvas.width, canvas.height );
	} else {
		gl.viewport( viewX, viewY, canvas.width, canvas.height );
	}
}

function moveLeft() {
	viewX-=50.0;
	if (viewX < -100.0) {
		viewX = -100.0;
		gl.viewport( viewX, viewY, canvas.width, canvas.height );
	} else {
		gl.viewport( viewX, viewY, canvas.width, canvas.height );
	}
}

function moveUp() {
	viewY+=50.0;
	if (viewY > 100.0) {
		viewY = 100.0;
		gl.viewport( viewX, viewY, canvas.width, canvas.height );
	} else {
		gl.viewport( viewX, viewY, canvas.width, canvas.height );
	}
}

function moveDown() {
	viewY-=50.0;
	if (viewY < -100.0) {
		viewY = -100.0;
		gl.viewport( viewX, viewY, canvas.width, canvas.height );
	} else {
		gl.viewport( viewX, viewY, canvas.width, canvas.height );
	}
}

// Fix up axisline to draw the correct axis according to the argument.
function axisline(axno) {
    v0 = vertices.length;
	/*// This is a Y axis
    vertices.push(vec4(0.0, 1.0, 0.0, 1.0));
    vertices.push(vec4(0.0, -1.0, 0.0, 1.0));
    // Three fake normal vectors, ortho to the y axis 
    normals.push(vec4(1.0, 0.0, 0.0, 1.0));
    normals.push(vec4(1.0, 0.0, 0.0, 1.0));
    // Now indices
    vindices.push(v0+0);
    vindices.push(v0+1);
    numLineIndices += 2;*/

	var axisX = [
		vec4(-1,0,0,1),
		vec4(1,0,0,1)
	];
	var axisY = [
		vec4(0,-1,0,1),
		vec4(0,1,0,1)
	];
	var axisZ = [
		vec4(0,0,-1,1),
		vec4(0,0,1,1)
	];

	var v;
	for (var idx = 0; idx < axisX.length; idx++) {
		v = []
		for (var i = 0; i < 3; i++) {
			if (axno == xAxis) {
				v.push(axisX[idx][i]);
			} else if (axno == yAxis) {
				v.push(axisY[idx][i]);
			} else if (axno == zAxis) {
				v.push(axisZ[idx][i]);
			}
		}
		v.push(1.0);
		vertices.push(v);
		normals.push(vec4(1.0,0.0,0.0,1.0));
	}	
	vindices.push(v0);
	vindices.push(v0+1);
	numLineIndices += 2;

}


/* Ground plane */
/* This just draws a triangle as an example. */

function groundPlane() {
    var v0 = vertices.length;
    // Three vertices 

	vertices.push(vec4(-1.0, -1.0, 1.0, 1.0));
    vertices.push(vec4(1.0, -1.0, 1.0, 1.0));
    vertices.push(vec4(1.0, -1.0, -1.0, 1.0));

	vertices.push(vec4(-1,-1,-1,1));
	vertices.push(vec4(-1,-1,1,1));
	vertices.push(vec4(1,-1,-1,1));

	vertices.push(vec4(-1.0, -1.0, 1.0, 1.0));
    vertices.push(vec4(-1.0, 1.0, 1.0, 1.0));
    vertices.push(vec4(-1.0, -1.0, -1.0, 1.0));

	vertices.push(vec4(-1,1,1,1));
	vertices.push(vec4(-1,-1,-1,1));
	vertices.push(vec4(-1,1,-1,1));

	vertices.push(vec4(-1,1,-1,1));
	vertices.push(vec4(-1,-1,-1,1));
	vertices.push(vec4(1,1,-1,1));

	vertices.push(vec4(1,1,-1,1));
	vertices.push(vec4(1,-1,-1,1));
	vertices.push(vec4(-1,-1,-1,1));

	vertices.push(vec4(1.0, -1.0, 1.0, 1.0));
    vertices.push(vec4(1.0, 1.0, 1.0, 1.0));
    vertices.push(vec4(1.0, -1.0, -1.0, 1.0));

	vertices.push(vec4(1,1,1,1));
	vertices.push(vec4(1,-1,-1,1));
	vertices.push(vec4(1,1,-1,1));

    // Three normal vectors are straight up
    normals.push(vec4(0,1,0,0));
    normals.push(vec4(0,1,0,0));
    normals.push(vec4(0,1,0,0));

	normals.push(vec4(0,1,0,0));
    normals.push(vec4(0,1,0,0));
    normals.push(vec4(0,1,0,0));

	normals.push(vec4(0,1,0,0));
    normals.push(vec4(0,1,0,0));
    normals.push(vec4(0,1,0,0));

	normals.push(vec4(0,1,0,0));
    normals.push(vec4(0,1,0,0));
    normals.push(vec4(0,1,0,0));

	normals.push(vec4(0,1,0,0));
    normals.push(vec4(0,1,0,0));
    normals.push(vec4(0,1,0,0));

	normals.push(vec4(0,1,0,0));
    normals.push(vec4(0,1,0,0));
    normals.push(vec4(0,1,0,0));

	normals.push(vec4(0,1,0,0));
    normals.push(vec4(0,1,0,0));
    normals.push(vec4(0,1,0,0));

	normals.push(vec4(0,1,0,0));
    normals.push(vec4(0,1,0,0));
    normals.push(vec4(0,1,0,0));

	vertices.push(vec4(-1.0, 1.0, 1.0, 1.0));
    vertices.push(vec4(1.0, 1.0, 1.0, 1.0));
    vertices.push(vec4(1.0, 1.0, -1.0, 1.0));

	vertices.push(vec4(-1,1,-1,1));
	vertices.push(vec4(-1,1,1,1));
	vertices.push(vec4(1,1,-1,1));

    // Now just push one triangle
    vindices.push(0+v0, 1+v0, 2+v0);
	vindices.push(3+v0,4+v0,5+v0);
	vindices.push(6+v0,7+v0,8+v0);
	vindices.push(9+v0,10+v0,11+v0);
	vindices.push(12+v0,13+v0,14+v0);
	vindices.push(15+v0,16+v0,17+v0);
	vindices.push(18+v0,19+v0,20+v0);
	vindices.push(21+v0,22+v0,23+v0);
	vindices.push(24+v0,25+v0,26+v0);
	vindices.push(27+v0,28+v0,29+v0);
    numTriangleIndices+=30;
}


/* The hemisphere from former lab
 * Modified to push normals, but not colors.
 * Draw from latitude -60 to +60
 */

function hemisphere(r) {

	v0 = vertices.length;

    var phi_step = 10;
    var theta_step = 15;
	var bottom = -60;   
	var top = 60;
   
    var strip0;
	var strip1;
	
	var nstrips;
	var nsquares;

	for (var phi = bottom; phi <= top; phi += phi_step) {
	
		var phir = toradians(phi);

		for (var theta = 0; theta < 360; theta += theta_step) {

			var thetar = toradians(theta);

			var x = (r*(Math.cos(thetar))*(Math.cos(phir)));
			var y = (r*(Math.sin(phir)));
			var z = (r*(Math.sin(thetar))*(Math.cos(phir)));
			
			vertices.push(vec4(x,y,z,1.0));
			normals.push(vec4(x,y,z, 1.0));
	
		}
						
    }

    nstrips = 12;
    nsquares = 24;

    for (var stripnum = 0; stripnum < nstrips; stripnum++) {

        strip0 = stripnum * nsquares;
        strip1 = (stripnum+1) * nsquares;

        for (var squareno = 0; squareno < nsquares; squareno++) {

			var a = squareno;
			var b = (squareno+1) % nsquares;
            
            quad(strip0+a, strip0+b, strip1+b, strip1+a);

        }	
			
    }

}

function toradians(angle) {

	var x = (Math.PI/180.0) * angle;
	return x;

}


/* Adapted from Angel's quad. This can be replaced by a much
 * smaller version.
 */
function quad(a, b, c, d)
{
    // We need to parition the quad into two triangles in order for
    // WebGL to be able to render it.  In this case, we create two
    // triangles from the quad indices


    var indices = [ a, b, c, a, c, d ];
    var i;
    /* Put the INDEX NUMBERS into the element buffer (instead of vertices themselves) */

    for (i = 0; i < indices.length; ++i ) {
        vindices.push(indices[i] + v0);    
    }
    numTriangleIndices += indices.length;
}
/* Initialization */

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // This part of the color computation will be the same for every pixel
    // Do it here instead of the fragment shader. 
    ambientProduct = mult(lightAmbient, materialAmbient);
    diffuseProduct = mult(lightDiffuse, materialDiffuse);

    /* Draw objects */
    /* First a bunch of lines */
    axisline(xAxis);  
    axisline(yAxis);  
    axisline(zAxis); 

    /* This is where lines end and triangles begin. */
    tristart = vindices.length;
    groundPlane();
    hemisphere(0.5);
    
    /* Now load up the buffer objects */

    var zindices = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, zindices);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vindices), gl.STATIC_DRAW);


    var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normals), gl.STATIC_DRAW );
    
    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    
    var vPosition = gl.getAttribLocation( program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
    /* Locations of the Shader Variables that will be updated at render-time */
    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );
    normalMatrixLoc = gl.getUniformLocation( program, "normalMatrix" );
    lightPositionLoc = gl.getUniformLocation( program, "lightPosition" );

    /* Controls */
    document.getElementById("Farther").onclick = function(){radius *= 1.25;};
    document.getElementById("Nearer").onclick = function(){radius *= 0.5;};
    document.getElementById("LongRight").onclick = function(){longitude += dr;};
    document.getElementById("LongLeft").onclick = function(){longitude -= dr;};
    document.getElementById("LatUp").onclick = function(){latitude += dr;};
    document.getElementById("LatDown").onclick = function(){latitude -= dr;};
    document.getElementById("SunLeft").onclick = function(){sunangle -= dr;};
    document.getElementById("SunRight").onclick = function(){sunangle += dr;};
    document.getElementById("Reset").onclick = function(){
      longitude=0;
      latitude=0;
      radius=5.0;
      sunangle=-45.0;
    };
	document.getElementById("moveRight").onclick = function() {
		moveRight();
	};
	document.getElementById("moveLeft").onclick = function () {
		moveLeft();
	};
	document.getElementById("moveUp").onclick = function() {
		moveUp();
	};
	document.getElementById("moveDown").onclick = function () {
		moveDown();
	};

    /* These material parameters are not changing: same for every vertex */
    gl.uniform4fv( gl.getUniformLocation(program, 
       "ambientProduct"),flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, 
       "diffuseProduct"),flatten(diffuseProduct) );

    render();
}


function render() {
    
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    // The camera postion, computed from the web page controls. 
    // Notice the similarity to the sphere equations.
    // 
    eye = vec3(radius*Math.sin(longitude)*Math.cos(latitude), 
        radius*Math.sin(latitude), radius*Math.cos(latitude)*Math.cos(longitude));

    modelViewMatrix = lookAt(eye, at , up);
    projectionMatrix = perspective(45, 1, radius-2, radius+2);

    /* Note we compute the light direction as (x, y, 0, 0) */ 
    lightPosition = vec4(Math.sin(sunangle),Math.cos(sunangle),0.0,0.0);
    gl.uniform4fv( lightPositionLoc, flatten(lightPosition) );
    
    // normal matrix only really need if there is nonuniform scaling
    // it's here for generality but since there is
    // no scaling in this example we could just use modelView matrix in shaders
    
    normalMatrix = [
        vec3(modelViewMatrix[0][0], modelViewMatrix[0][1], modelViewMatrix[0][2]),
        vec3(modelViewMatrix[1][0], modelViewMatrix[1][1], modelViewMatrix[1][2]),
        vec3(modelViewMatrix[2][0], modelViewMatrix[2][1], modelViewMatrix[2][2])
    ];
            
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix) );
    gl.uniformMatrix3fv(normalMatrixLoc, false, flatten(normalMatrix) );
    
    // First lines
    gl.lineWidth(1.0);
    gl.drawElements( gl.LINES, numLineIndices, gl.UNSIGNED_SHORT,0);
	
    // Then triangles
    gl.drawElements( gl.TRIANGLES, numTriangleIndices, gl.UNSIGNED_SHORT, tristart*2);	
 
    window.requestAnimFrame(render);
}
