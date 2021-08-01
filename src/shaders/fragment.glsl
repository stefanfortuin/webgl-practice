#version 300 es

precision mediump float;

uniform float uTime;
uniform float uGrad;
uniform float uLinewidth;
uniform sampler2D tMap;

in vec2 v_texCoord;

out vec4 fragColor;

void main() {
	vec4 texture = texture(tMap, v_texCoord);

	float speed = 0.58;
    vec4 col1 = vec4(0.3,0.0,0.0,1.0);
    vec4 col2 = vec4(0.85,0.85,0.85,1.0);

	vec2 linepos = v_texCoord;
    linepos.x = linepos.x - mod(uTime * 0.5,1.57)+0.5;

	float y = linepos.x * uGrad;
	float s = smoothstep( y-uLinewidth, y, linepos.y) - smoothstep( y, y+uLinewidth, linepos.y); 

	fragColor = texture + ((s*col1)+(s*col2));
}