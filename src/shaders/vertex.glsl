attribute vec3 position;

uniform float uTime;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

void main() {
	vec3 p = position;

	p.z = (sin(p.x * 1.5 + uTime) * 0.15 + cos(p.y * 1.5 + uTime) * 0.25);
	gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1);
}