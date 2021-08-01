#version 300 es
precision mediump float;

in vec3 position;
in vec2 uv;

out vec2 v_texCoord;

uniform float uTime;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

void main() {
	vec3 p = position;

	p.z = (sin(p.x * 1.5 + uTime) * 0.15 + cos(p.y * 1.5 + uTime) * 0.25);

	v_texCoord = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1);
}