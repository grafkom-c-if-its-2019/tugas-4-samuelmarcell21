(function(global) {

  var points=[];
  // var canvas2, gl2, program2;

  glUtils.SL.init({ callback:function() { main(); } });

  // Register Callbacks
    // window.addEventListener('resize', resizer);
    function main() {
    // Get canvas element and check if WebGL enabled
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);

    // Initialize the shaders and program
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    // var program = glUtils.createProgram(gl, vertexShader, fragmentShader);

    var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var vertexShader3 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v3.vertex);
    var program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader);
    var program3 = glUtils.createProgram(gl, vertexShader3, fragmentShader);

    canvas.addEventListener('mousedown', function(event) { onmousedown(event, points); });

    // resizer();
    var vertices4 = [];
    var vertices5 = [];

    var kubus= ([
      // Bawah
      -0.3,  -0.8,  0.7,      255, 255, 255,          
      0.4,  -0.8,  0.7,       255, 255, 255,          
      0.4,  -0.8,  0.7,       255, 255, 255,          
      0.4,  -0.8,  -0.6,      255, 255, 255,          
      0.4,  -0.8,  -0.6,      255, 255, 255,          
      -0.3,  -0.8,  -0.6,     255, 255, 255,          
      -0.3,  -0.8,  -0.6,     255, 255, 255,          
      -0.3,  -0.8,  0.7,      255, 255, 255,          
      // Atas
      -0.3,  0.6,  0.7,       255,255, 255,          
      0.4,  0.6,  0.7,        255,255, 255,       
      0.4,  0.6,  0.7,        255,255, 255,         
      0.4,  0.6,  -0.6,      255,255, 255,          
      0.4,  0.6,  -0.6,       255,255, 255,          
      -0.3,  0.6,  -0.6,      255,255, 255,          
      -0.3,  0.6,  -0.6,      255,255, 255,          
      -0.3,  0.6,  0.7,       255,255, 255,          
      // Belakang
      -0.3,  -0.8,  0.7,      255,255, 255,            
      -0.3,  0.6,  0.7,       255,255, 255,           
      0.4,  -0.8,  0.7,      255,255, 255,            
      0.4,  0.6,  0.7,        255,255, 255,            
      // Depan
      0.4,  -0.8,  -0.6,      255,255, 255,            
      0.4,  0.6,  -0.6,       255,255, 255,           
      -0.3,  -0.8,  -0.6,     255,255, 255,            
      -0.3,  0.6,  -0.6,      255,255, 255      
    ]);

    for (var i=-180; i<=90; i+=1) {
      // degrees to radians
      var n = i * Math.PI / 180;
      // X Y Z
      var vert1 = [
      0 + Math.sin(n)*0.05,
      0.1 + Math.cos(n)*0.07,    1.0, 0.0, 0.0
        // 0,
      ];
  
      DONUT:
      var vert2 = [
      0 + Math.sin(n)*0.12,
      0.1 + Math.cos(n)*0.181,    0.0, 1.0, 0.0
      ];
      vertices4 = vertices4.concat(vert1);
      vertices4 = vertices4.concat(vert2);
    }
  
    for (var i=0; i<=270; i+=1) {
      // degrees to radians
      var o = i * Math.PI / 180;
      // X Y Z
      var vert1 = [
      0 + Math.sin(o)*0.05,
      -0.15 + Math.cos(o)*0.07,    0.0, 1.0, 0.0
        // 0,
      ];
  
      DONUT:
      var vert2 = [
      0 + Math.sin(o)*0.12,
      -0.15 + Math.cos(o)*0.181,    1.0, 0.0, 0.0
      ];
      vertices5 = vertices5.concat(vert1);
      vertices5 = vertices5.concat(vert2);
    }

    function drawShapes2(type,vertices,n){
      var triangleVertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
  
      var vPosition = gl.getAttribLocation(program2, 'vPosition');
      var vColor = gl.getAttribLocation(program2, 'vColor');
    
      gl.vertexAttribPointer(
        vPosition,  // variabel yang memegang posisi attribute di shader
        2,          // jumlah elemen per atribut
        gl.FLOAT,   // tipe data atribut
        gl.FALSE, 
        5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex 
        0                                   // offset dari posisi elemen di array
      );
      gl.vertexAttribPointer(
        vColor,
        3,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
      );
      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vColor);

      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
      gl.drawArrays(type, 0, n);
    }  

  var thetaLoc1 = gl.getUniformLocation(program2, 'theta1'); 
  var transLoc1 = gl.getUniformLocation(program2, 'trans1');
  var thetaA1 = [10, 20, 0];
  var trans1 = [0, 0, 0]; 
  var X = 0.0080;
  var Y = 0.0090;
  var Z = 0.0130;

  function render2(){
    // Bersihkan layar jadi hitam
    gl.useProgram(program2);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Bersihkan buffernya canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    if(trans1[0] >= 0.4*0.8 || trans1[0] <= -0.3*0.8 ){
      X *= -1;
    }
    trans1[0] += X;
  
    if(trans1[1] >= 0.6*0.8 || trans1[1] <= -0.8*0.8 ){
      Y *= -1;
    }
  
    trans1[1] += Y;
  
    if(trans1[2] >= 0.7*0.8 || trans1[2] <= -0.6*0.8){
      Z *= -1;
    }
    trans1[2] += Z;
  
    gl.uniform3fv(transLoc1, trans1);
    thetaA1[1] += 0.134;
    gl.uniform3fv(thetaLoc1, thetaA1);  
    // gl.uniform1f(scaleYLocation, scaleY);  

    drawShapes2(gl.TRIANGLE_STRIP, vertices4, 540);
    drawShapes2(gl.TRIANGLE_STRIP, vertices5, 540);
  
    requestAnimationFrame(render2);
}
  // render();
  render2();

  function drawShapesKubus(type,vertices,n) {
    var vertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
  
    var vPosition = gl.getAttribLocation(program3, 'vPosition');
    var vColor = gl.getAttribLocation(program3, 'vColor');
  
    gl.vertexAttribPointer(
      vPosition, //variabel pemegang posisi atribut di shader
      3,          // jumlah elemen per atribut
      gl.FLOAT,   // tipe data atribut
      gl.FALSE,   
      6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
      0
    );
  
    gl.vertexAttribPointer(
      vColor, 
      3, 
      gl.FLOAT, 
      gl.FALSE, 
      6 * Float32Array.BYTES_PER_ELEMENT, 
      3 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);
  
    var vPosition = gl.getAttribLocation(program3, 'vPosition');
    var vColor = gl.getAttribLocation(program3, 'vColor');
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.drawArrays(type, 0, n);
  }

  var thetaLocCube = gl.getUniformLocation(program3, 'theta');
  
  function renderKubus()
  {
    gl.useProgram(program3);
    var thetaCube = [10, 10, 0];
    gl.uniform3fv(thetaLocCube, thetaCube);
    drawShapesKubus(gl.LINES, kubus , 24);
    requestAnimationFrame(renderKubus);
  }

  renderKubus();

  function onmousedown(event, points) {

    var x = event.clientX, y = event.clientY;
    var midX = canvas.width/2, midY = canvas.height/2;
    var rect = event.target.getBoundingClientRect();
    x = ((x - rect.left) - midX) / midX;
    y = (midY - (y - rect.top)) / midY;

    console.log(x + "  " + y);
  }
}

})(window || this);