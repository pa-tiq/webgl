"use strict";

let canvas = document.getElementById("canvas-id");
let gl = canvas.getContext("webgl");

if(gl){
    cab.innerHTML = "Suporta WebGL2";
} else {
    gl = canvas.getContext("webgl");
    if(gl){
        cab.innerHTML = "Suporta WebGL";
    }
}

gl.clearColor(0.3, 0.3 ,0.3 ,1);
gl.clear(gl.COLOR_BUFFER_BIT);

let vertex_shader = [
    "attribute vec3 pos;",
    "void main()",
    "{",
    "	gl_Position = vec4(pos, 1.);",
    "	gl_PointSize = 10.;",
    "}"	
].join('\n');

let vertex = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertex, vertex_shader);
gl.compileShader(vertex);

let fragment_shader = [
    "void main()",
    "{",
    "	gl_FragColor = vec4(1.,1.,1.,1.);",
    "}"	
].join('\n');

let fragment = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragment, fragment_shader);
gl.compileShader(fragment);

let program = gl.createProgram();
gl.attachShader(program, vertex);
gl.attachShader(program, fragment);

gl.linkProgram(program);
gl.useProgram(program);

let point = [0.5,0.5,0.5, 0,0,0, 0.7,0.3,0.3,
    -0.3,-0.3,-0.2, 0.9,0.8,0.8, -0.6,0,0];
let vbo = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(point) ,gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0,3,gl.FLOAT, false, 0,0);
gl.drawArrays(gl.POINTS, 0, 6);

(function() 
{
    var mousePos;

    document.onmousemove = handleMouseMove;
    setInterval(getMousePosition, 100);

    function handleMouseMove(event) 
    {
        event = event || window.event;

        mousePos = {
            x: event.pageX,
            y: event.pageY
        };
    }

    function getMousePosition() 
    {
        var pos = mousePos;

        if (pos) 
        {
            console.log(pos);           
        }
    }
})();