import * as THREE from './three.js/build/three.module.js';
import { STLLoader } from './three.js/examples/jsm/loaders/STLLoader.js';

// Get the aspect ratio of the canvas. 
const getAspectRatio = (canvas) => canvas.clientWidth / canvas.clientHeight

// Helper function to get the camera. 
// Can redifine some of the camera properies here.
const getCamera = canvas => {
    const fov = 75;
    const aspect = getAspectRatio(canvas);
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);    
    return camera;
}

const setRendererSize = (renderer, canvas) => renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

// Set up all the master elements, such as the scene, renderer and more
const canvas = document.getElementById("c");
const scene  = new THREE.Scene();
scene.background = new THREE.Color();
const renderer = new THREE.WebGLRenderer({canvas});
setRendererSize(renderer, canvas);
const camera = getCamera(canvas);
const light = new THREE.DirectionalLight(0xFFFFFF,1); // Color white, and intensity 1 are the defaults. 
scene.add(light);
renderer.render(scene, camera);


// For testing. 
const addBox = () => {
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const material = new THREE.MeshPhongMaterial({color: 0x44aa88});
    const cube = new THREE.Mesh(geometry, material);
    cube.rotation.x = Math.PI/4;
    scene.add(cube);
    renderer.render(scene, camera);
}
camera.position.z = 30;
light.position.set(0,1,30);
addBox();

// Bind some functions to resize event of browser, to rescale the view
window.addEventListener('resize', () => {
    // Update camera aspect ratio
    camera.aspect = getAspectRatio(canvas);
    camera.updateProjectionMatrix();
    
    // Get the new resolution of the view and give that to the renderer 
    setRendererSize(renderer, canvas);

    // Repaint
    renderer.render(scene, camera);
});

// Load a test stl from local
const material = new THREE.MeshLambertMaterial({color: 0xff5533});
const loader = new STLLoader();
/*
submarine https://www.thingiverse.com/thing:21583 by rustel https://www.thingiverse.com/rustel/about is licensed under the Creative Commons - Attribution - Non-Commercial - No Derivatives license. 
*/

loader.load('./russian.stl', geometry => {
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    const submarine = new THREE.Mesh(geometry, material);

     
    submarine.rotation.x = Math.PI/4; 
    submarine.rotation.y = -Math.PI/6;
    scene.add(submarine);

    // Repaint

    renderer.render(scene, camera);
});
scene.add(light);

// [ ] Ladda upp en modell
// [ ] Styra position av modellen
// [ ] Styra kameran
// [ ] Hur stor är varje pixel i meter? 
// [ ] Origo i mitten av modellen. 
// [ ] Rotation i Z-axeln på modellen. 
// [ ] Input av våglängd och fas. 
// Radio buttons visa intensitet, fas, eller intensitet och fas. 
