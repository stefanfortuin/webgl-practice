#version 300 es

precision mediump float;

uniform sampler2D tMap;

in vec2 v_texCoord;

out vec4 fragColor;

void main() {

	fragColor = texture(tMap, v_texCoord);
}