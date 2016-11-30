// triangle.js
// 
// This file defines our triangle model. 
// A global APP variable with the WebGlRenderingContext
// property gl must be present for this to work.
// (i.e. APP.gl must exist)

function Triangle() {
  this.vertexPositionAttrib = null;
  this.vertexPositionBuffer = null;
  this.vertexColorAttrib    = null;
  this.vertexColorBuffer    = null;
  
  this.vertices = [
     0.0, 1.0, 0.0,
    -1.0, 0.0, 0.0,
     1.0, 0.0, 0.0
  ];
  
  this.colors = [
    1.0, 0.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 1.0
  ];
}

Triangle.prototype.init = function() {
  // create the vertex position buffer
  this.vertexPositionBuffer = APP.gl.createBuffer();
  APP.gl.bindBuffer(APP.gl.ARRAY_BUFFER, this.vertexPositionBuffer);
  APP.gl.bufferData(APP.gl.ARRAY_BUFFER, new Float32Array(this.vertices), APP.gl.STATIC_DRAW);
  this.vertexPositionBuffer.numItems = this.vertices.length;
  this.vertexPositionBuffer.itemSize = 3;

  // create the vertex color buffer
  this.vertexColorBuffer = APP.gl.createBuffer();
  APP.gl.bindBuffer(APP.gl.ARRAY_BUFFER, this.vertexColorBuffer);
  APP.gl.bufferData(APP.gl.ARRAY_BUFFER, new Float32Array(this.colors), APP.gl.STATIC_DRAW);
  this.vertexColorBuffer.numItems = this.colors.length;
  this.vertexColorBuffer.itemSize = 4;

  // enable the vertex attributes
  this.vertexPositionAttrib = APP.gl.getAttribLocation(APP.shaderProgram, 'vertexPosition');
  APP.gl.enableVertexAttribArray(this.vertexPositionAttrib);
  this.vertexColorAttrib = APP.gl.getAttribLocation(APP.shaderProgram, 'vertexColor');
  APP.gl.enableVertexAttribArray(this.vertexColorAttrib);
}

Triangle.prototype.draw = function() {
  APP.gl.viewport(0, 0, APP.gl.viewportWidth, APP.gl.viewportHeight);
  APP.gl.clear(APP.gl.COLOR_BUFFER_BIT | APP.gl.DEPTH_BUFFER_BIT);

  APP.gl.bindBuffer(APP.gl.ARRAY_BUFFER, triangle.vertexColorBuffer);
  APP.gl.vertexAttribPointer(triangle.vertexColorAttrib, triangle.vertexColorBuffer.itemSize, 
    APP.gl.FLOAT, false, 0, 0);
  
  APP.gl.bindBuffer(APP.gl.ARRAY_BUFFER, triangle.vertexPositionBuffer);
  APP.gl.vertexAttribPointer(triangle.vertexPositionAttrib, triangle.vertexPositionBuffer.itemSize, 
    APP.gl.FLOAT, false, 0, 0);

  APP.gl.drawArrays(APP.gl.TRIANGLES, 0, 3);
}