import { Renderer, Camera, Transform, Plane, Program, Mesh, Post, Vec2, Texture} from 'ogl';
import * as dat from 'dat.gui';
import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl';
import fxaa_fragment from './shaders/fxaa-fragment.glsl';

const renderer = new Renderer();
const gl = renderer.gl;
document.body.appendChild(gl.canvas);

const camera = new Camera(gl);
camera.position.z = 5;

const post = new Post(gl);
const resolution = {value: new Vec2()};

function resize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	post.resize();
	camera.perspective({
		aspect: gl.canvas.width / gl.canvas.height,
	});
	resolution.value.set(gl.canvas.width, gl.canvas.height);
}
window.addEventListener('resize', resize, false);
resize();

const scene = new Transform();

const geometry =  new Plane(gl, {
	heightSegments: 30,
	widthSegments: 40
})

const texture = new Texture(gl, {
	generateMipmaps: false
})



const program = new Program(gl, {
	vertex: vertex,
	fragment: fragment,
	uniforms: {
		tMap: {value: texture },
		uTime: { value: 0 },
	}
});

const mesh = new Mesh(gl, { geometry, program });
// mesh.rotation.x = 1;
// mesh.rotation.y = 1;
mesh.setParent(scene);

const image = new Image();
image.src = '/images/cerelia-1.jpg';
image.onload = () => {
	texture.image = image;
}

post.addPass({
	fragment: fxaa_fragment,
	uniforms: {
		uResolution: resolution,
	},
})

let time = {value: 0.1};

requestAnimationFrame(update);
function update(t) {
	requestAnimationFrame(update);

	// mesh.rotation.y -= 0.004;
	// mesh.rotation.x += 0.003;
	program.uniforms.uTime.value += time.value;
	post.render({ scene, camera });
}

let gui = new dat.GUI();
gui.add(time,'value', 0,0.1);