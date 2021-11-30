// SKELETON PROGRAM FOR CS365 AXIS-DRAWING LAB 
// See places marked //**
// 
"use strict";

var canvas;
var gl;

// vertices[] and vertexColors[] contain each vertex (vec4)
// and color (vec4) exactly once.
//
var vertices = [];
var vertexColors = [];
//
// vindices[] contains indices into the vertices/colors arrays.
// 
// Every time you want to draw a triangle, put 3 indices into the
// vindices array. Each index refers to a vertex in the vertices
// array.
// For example to draw a square:
//    put four vertices A, B, C, D (clockwise around square)
//    put two sets of three indices:
//        0, 1, 2  (for A-B-C triangle)
//        0, 2, 3  (for A-C-D triangle)
// 
//   ntrianglesi = number of triangle indices (counts up 3 for each triangle)
//
// Similarly every line puts two indicies
//
var vindices = [];
var nlinesi = 0;
var ntrianglesi = 0;
var npointsi = 0;

// Global variable v0 is the first vertex number of the
// current object, used for getting the index numbers
// relative to the current object.
var v0 = 0;   



// These are used for manipulating the rotating display. 
//
// The theta variable contains an array of three rotation
// angles, for x, y, z. The display is tilted with respect
// to these three angles.
//
// The axis variable says which axis the display is
// spinning around.  
//
// Thetaloc contains the pointer to the shader variable
// where we copy our theta variable. 
//
// Paused becomes false starts the spinning
// 
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var axis = 0;  // Current rotation axis

//** put in first octant
var initial_theta = [ 0, 0, 0 ];
var theta = initial_theta.slice();  // slicing will copy

var thetaLoc; 

var paused = true;

// Function runs on initialization.
window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }



    //** WRITE THE AXISLINE FUNCTION
    //** UNCOMMENT THESE LINES, change the colors to your liking
    axisline(xAxis, vec4(1,0,0,1));  // X green
    axisline(yAxis, vec4(1,0,0,1));  // Y red
    axisline(zAxis, vec4(1,0,0,1));  // Z cyan

    // THEN KEEP THIS CALL TO colorCube()
	colorCube(0.2, [+0.5, -0.8, -0.5]);
	tetra();

	axisdots(xAxis, vec4(1,0,0,1));
    axisdots(yAxis, vec4(1,0,0,1));
    axisdots(zAxis, vec4(1,0,0,1));
    //
    //***********************************************

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var zindices = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, zindices);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vindices), gl.STATIC_DRAW);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW );
 
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    thetaLoc = gl.getUniformLocation(program, "theta");

    //event listeners for buttons

    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis;
	paused = false;
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
	paused = false;
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;
	paused = false;
    };
    document.getElementById( "pauseButton" ).onclick = function () {
	paused = !paused;
    };
    //** put the resetButton onclick hander here
    //** You will also put the button in the .html file.
    // document.getElementById(...

    render();
}

/***********************************************************************
 * AXIS DOTS
 */

function axisdots(axno, colr) {
	v0 = vertices.length;

	var pos;

	for (var t = -5; t <= 5; t++) {	
		pos = vec4(0, 0, 0, 1);
		pos[axno] = t / 5.0;
		vertices.push(pos);
		console.log("T: " + t);
		
		if (t <= 0) {
			vertexColors.push(vec4(0.0,0.0,0.0,1.0));
		} else {
			vertexColors.push(colr);
		}

	}
	
	for (var i = 0; i < 11; i++) {
		vindices.push(v0+i);	
	}

	npointsi += 11;
	
}
  
      
/***********************************************************************
 * AXIS LINE
 *
 * Draw line for one axis, specified by axno = 0, 1, 2. 
 * The color is a 4-element array.
 *
 * It goes from -1 to +1.
 * Each line gets:
 *   two vertices pushed into vertices[]
 *   the color pushed twice into vertexColors[]
 *   two indices pushed into vindices[], and npointsi+=2
 */
function axisline(axno, colr) {
	v0 = vertices.length;
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
		vertexColors.push(colr);	
	}	
	vindices.push(v0);
	vindices.push(v0+1);
	nlinesi += 2;

}

function tetra() {
	v0 = vertices.length;
	var tetraVertices = [
		vec4(-0.3,0,0,1.0),
		vec4(0,0,-0.3,1.0),
		vec4(0.3,0,0,1.0),
		vec4(0,0.3,0,1.0)
	];

	
	var tetraColors = [
		vec4(0.5,0,0,1.0),
		vec4(0,0,0.5,1.0),
		vec4(0.5,0,0.5,1.0),
		vec4(0,0.5,0,1.0)
	];

	var v;
    for (var idx = 0; idx < tetraVertices.length; idx++) { 
        v = []
        for (var i = 0; i<3; i++) {
            v.push(tetraVertices[idx][i]);
        }
        v.push(1.0);
        vertices.push(v);
        vertexColors.push(tetraColors[idx]);
    }

	vindices.push(v0);
	vindices.push(v0+1);
	vindices.push(v0+2);

	vindices.push(v0);	
	vindices.push(v0+1);
	vindices.push(v0+3);
	
	vindices.push(v0);
	vindices.push(v0+2);
	vindices.push(v0+3);

	vindices.push(v0+1);
	vindices.push(v0+2);
	vindices.push(v0+3);

	ntrianglesi += 12;

}

/***********************************************************************/
// This draws the cube from the example.
//  r is the scaling for the cube (0.0 to 1.0),
//  loc is a 3-element array for translating
//  the cube in space.
function colorCube(r, loc) {

    // First capture the index number of the first
    // vertex of our object
    v0 = vertices.length;

    // Example debugging write
    // console.log("Cube starting at vertex", v0);

    // These are the vertices and colors of the cube.
    var cubevertices = [
        vec4( -0.5, -0.5,  0.5, 1.0 ),
        vec4( -0.5,  0.5,  0.5, 1.0 ),
        vec4(  0.5,  0.5,  0.5, 1.0 ),
        vec4(  0.5, -0.5,  0.5, 1.0 ),
        vec4( -0.5, -0.5, -0.5, 1.0 ),
        vec4( -0.5,  0.5, -0.5, 1.0 ),
        vec4(  0.5,  0.5, -0.5, 1.0 ),
        vec4(  0.5, -0.5, -0.5, 1.0 )
    ];

    var cubecolors = [
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 0.5, 0.5, 0.5, 1.0 ),  // gray
        vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
    ];


    // Next push all the vertices and colors 
    // into the global arrays.  Scale and translate
    // 
    var v;
    for (var idx = 0; idx < cubevertices.length; idx++) { 
        v = []
        for (var i = 0; i<3; i++) {
            v.push(r*cubevertices[idx][i] + loc[i]);
        }
        v.push(1.0);
        vertices.push(v);
        vertexColors.push(cubecolors[idx]);
    }

    // Now draw quads (2 triangles) for all 6 surfaces
    // These index numbers will be relative to v0,
    //   the first virtex number for this object.
    //
    quad( 1, 0, 3, 2 ); // front
    quad( 2, 3, 7, 6 ); // right
    quad( 3, 0, 4, 7 ); // bottom
    quad( 6, 5, 1, 2 ); // top
    quad( 4, 5, 6, 7 ); // back
    quad( 5, 4, 0, 1 ); // left 
}


/***********************************************************************/
// Draw a quad based on 4 indices into the vertices array.
// Global variable v0 contains the first vertex index for the
// current object being drawn.
//
// We need to parition the quad into two triangles in order for
// WebGL to be able to render it.  In this case, we create two
// triangles from the quad indices
//
function quad(a, b, c, d)   
{
    var indices = [ a, b, c, a, c, d ];
    for ( var i = 0; i < indices.length; ++i ) {

        // For interpolated colors
        vindices.push(indices[i]+v0);
    }
    ntrianglesi += 6;
}

/***********************************************************************/
/*
 * nlinesi is the nubmer of indices dedicated to drawing lines (2 indices per line)
 * ntrianglesi is the number of indices for drawing triangles (3 per triangle)
 */
function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Rotation of whole picture is computed in the vertex handler, based on
    // theta = [theta_x, theta_y, theta_z]
    if (! paused) theta[axis] += 2.0;
    gl.uniform3fv(thetaLoc, theta);

    gl.lineWidth(2.0);
    gl.drawElements( gl.LINES, nlinesi, gl.UNSIGNED_SHORT, 0);
    gl.drawElements( gl.TRIANGLES, ntrianglesi, gl.UNSIGNED_SHORT, (nlinesi)*2);	
	gl.drawElements( gl.POINTS, npointsi, gl.UNSIGNED_SHORT, (nlinesi + ntrianglesi)*2);

    requestAnimFrame( render );
}

