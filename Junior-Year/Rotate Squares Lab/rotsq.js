"use strict";

// Rotsq.js:  Adapted from Angel Computer Graphics book.  
// CS 365, Lab1

var gl;

var theta = 0.0;
var thetaLoc;

var deltaX = 0.0;
var deltaXLoc;

var delay = 100;
var direction = true;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Two sort of random triangles: 3 vertices each triangle.
    var vertices = [
		
		vec2(  0.5, 0 ),
        vec2(  0.25,  0.25 ),
        vec2( 0.25, -0.25 ),

		vec2(  0.25, 0 ),
        vec2(  0.125,  0.125 ),
        vec2( 0.125, -0.125 ),

		vec2( -0.25, -0.25 ),
		vec2( 0, -0.5 ),
		vec2( 0.25, -0.25 ),

		vec2( -0.125, -0.125 ),
		vec2( 0, -0.25 ),
		vec2( 0.125, -0.125 ),

		vec2( -0.25, 0.25 ),
		vec2( -0.5, 0 ),
		vec2( -0.25, -0.25 ),

		vec2( -0.125, 0.125 ),
		vec2( -0.25, 0 ),
		vec2( -0.125, -0.125 ),

		vec2( 0.25, 0.25 ),
		vec2( 0, 0.5 ),
		vec2( -0.25, 0.25 ),

		vec2( 0.125, 0.125 ),
		vec2( 0, 0.25 ),
		vec2( -0.125, 0.125 )
 
    ];


    // Load the data into the GPU

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate shader variables with our data buffer

    var vPositionLoc = gl.getAttribLocation( program, "vPosition");
    gl.vertexAttribPointer(vPositionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPositionLoc);

    thetaLoc = gl.getUniformLocation( program, "theta" );

	deltaXLoc = gl.getUniformLocation( program, "deltaX" );

    // Initialize event handlers
    // (This is all vanilla javascript, not WebGL specific)

    // The direction button event.
    // Click on the button is all you need to know.
    document.getElementById("Direction").onclick = function () {
        direction = !direction;
    };

    // The controls menu event.  
    // You need to know which menu item was clicked
    document.getElementById("Controls" ).onclick = function(event) {
        switch( event.target.index ) {
         case 0:
            delay /= 2.0;
            break;
         case 1:
            delay *= 2.0;
            break;
       }
    };

    // Oh look! Keyboard keys work also!
    window.onkeydown = function(event) {
        var key = String.fromCharCode(event.keyCode);
        switch(key) {
          case '1':
            direction = !direction;
            break;

          case '2':
            delay /= 2.0;
            break;

          case '3':
            delay *= 2.0;
            break;
        }
    };
    render();
};

// Called to render the picture.
// This is called once at initialization.
// Inside this function, we set a timer to call us again after the time delay.
// Of course, when it is called after the delay, the timer is set to call us again later...
//
function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );

    theta += (direction ? 0.25 : -0.25);
	deltaX += (direction ? 0.1 : -0.1);
    gl.uniform1f(thetaLoc, theta);
	
	if (deltaX >= 1.0) {

//		deltaX = -1.0;
		direction = !direction;
	
	} else if (deltaX <= -1.0) {

//		deltaX = 1.0;
		direction = !direction;
	
	}
	
	gl.uniform1f(deltaXLoc, deltaX);

    gl.drawArrays(gl.TRIANGLES, 0, 24);

    setTimeout(
        function (){requestAnimFrame(render);}, delay
    );
}
