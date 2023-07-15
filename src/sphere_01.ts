import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Description: Fly into a 3D wireframe sphere.

// Canvas
const canvas = document.querySelector('#three-canvas');

// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('lemonchiffon');

// Camera
const near = 0.1;
const far = 5000;
const width = 1024;
const height = 1024;
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight,  near, far);

// Camera position
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 1000;

// Look at the center
camera.lookAt(new THREE.Vector3(0, 0, 0));

// OrbitControl
const controls = new OrbitControls(camera, renderer.domElement);

// sphere
const planeSize = 512;
const planeSegments = 400;
const geometry = new THREE.SphereGeometry(500, 50, 50);
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere)

let t = 0

// Render loop
const render = () => {
    t++
    // Control update
    controls.update();

    camera.position.z -= 1

    if (t > 400) {
        camera.lookAt(new THREE.Vector3(t-400, t-400, 0));
    }

    // Render
    renderer.render(scene, camera);
    window.requestAnimationFrame(render);
}

render();
