// cube.js
// 
// This file defines our cube model. 
// A global APP variable with the WebGlRenderingContext
// property gl must be present for this to work.
// (i.e. APP.gl must exist)

function Cube() {
  this.vertexPositionAttrib = null;
  this.vertexPositionBuffer = null;
  this.vertexColorAttrib    = null;
  this.vertexColorBuffer    = null;
  this.vertexIndexBuffer    = null;
  
  this.vertices = [
    // Front face
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,
    
    // Back face
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,
    
    // Top face
    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0,  1.0, -1.0,
    
    // Bottom face
    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,
    
    // Right face
     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0,  1.0,  1.0,
     1.0, -1.0,  1.0,
    
    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0
  ];
  
  this.colors = [
    [1.0,  1.0,  1.0,  1.0],    // Front face: white
    [1.0,  0.0,  0.0,  1.0],    // Back face: red
    [0.0,  1.0,  0.0,  1.0],    // Top face: green
    [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
    [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
    [1.0,  0.0,  1.0,  1.0]     // Left face: purple
  ];
}

/**
 * Sets up our cube model for rendering.
 */
Cube.prototype.init = function() {
  // create the vertex position buffer
  this.vertexPositionBuffer = APP.gl.createBuffer();
  APP.gl.bindBuffer(APP.gl.ARRAY_BUFFER, this.vertexPositionBuffer);
  APP.gl.bufferData(APP.gl.ARRAY_BUFFER, new Float32Array(this.vertices), APP.gl.STATIC_DRAW);
  this.vertexPositionBuffer.numItems = this.vertices.length;
  this.vertexPositionBuffer.itemSize = 3;

  // generate colors for each vertex based on color for each face
	var generatedColors = [];
	for (j=0; j<6; j++) {
	  var c = this.colors[j];
		// Repeat each color four times for the four vertices of the face
		for (var i=0; i<4; i++) {
			generatedColors = generatedColors.concat(c);
		}
	}

  // TODO #3: Insert code below


  // define the cube by using VBO indexing
  this.vertexIndexBuffer = APP.gl.createBuffer();
  APP.gl.bindBuffer(APP.gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
  var indices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23    // left
  ];
  APP.gl.bufferData(APP.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), APP.gl.STATIC_DRAW);
  this.vertexIndexBuffer.numItems = indices.length;
  this.vertexIndexBuffer.itemSize = 1;

  // enable the vertex attributes
  this.vertexPositionAttrib = APP.gl.getAttribLocation(APP.shaderProgram, 'vertexPosition');
  APP.gl.enableVertexAttribArray(this.vertexPositionAttrib);
  this.vertexColorAttrib = APP.gl.getAttribLocation(APP.shaderProgram, 'vertexColor');
  APP.gl.enableVertexAttribArray(this.vertexColorAttrib);
}

/**
 * Tells WebGL how to draw our Cube model.
 */
Cube.prototype.draw = function() {
  // first we set the viewport, and clean the color and depth bits
  APP.gl.viewport(0, 0, APP.gl.viewportWidth, APP.gl.viewportHeight);
  APP.gl.clear(APP.gl.COLOR_BUFFER_BIT | APP.gl.DEPTH_BUFFER_BIT);

  // now we do the shader plumbing for the vertices
  APP.gl.bindBuffer(APP.gl.ARRAY_BUFFER, this.vertexPositionBuffer);
  APP.gl.vertexAttribPointer(this.vertexPositionAttrib, this.vertexPositionBuffer.itemSize, 
    APP.gl.FLOAT, false, 0, 0);

  // now we do the shader plumbing for colors
  APP.gl.bindBuffer(APP.gl.ARRAY_BUFFER, this.vertexColorBuffer);
  APP.gl.vertexAttribPointer(this.vertexColorAttrib, this.vertexColorBuffer.itemSize, 
    APP.gl.FLOAT, false, 0, 0);
  
  // now we bind the indices buffer for drawing the cube
  APP.gl.bindBuffer(APP.gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);

  // use the indices to draw the cube
  APP.gl.drawElements(APP.gl.TRIANGLES, this.vertexIndexBuffer.numItems, APP.gl.UNSIGNED_SHORT, 0);

}