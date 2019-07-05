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
debugger;
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

scene.add(light);

// Playground for the different shaders
// Mostly taken from 
// https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi
const vertexShader = `
   	varying vec3 vNormal;

    void main() {

    // set the vNormal value with
    // the attribute value passed
    // in by Three.js
    vNormal = normal;

    gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position, 1.0);
    } 
`
const fragmentShader =  `
    varying vec3 vNormal;

    void main() {

      // calc the dot product and clamp
      // 0 -> 1 rather than -1 -> 1
      vec3 light = vec3(0.5, 0.2, 1.0);

      // ensure it's normalized
      light = normalize(light);

      // calculate the dot product of
      // the light to the vertex normal
      float dProd = max(0.0,
                        dot(vNormal, light));

      // feed into our frag colour
      gl_FragColor = vec4(dProd, // R
                          dProd, // G
                          dProd, // B
                          1.0);  // A

    } 
`

// Create the custom shader material
const customMaterial = new THREE.ShaderMaterial({
    uniforms: {
        colorB: {type: 'vec3', value: new THREE.Color(0xACB6E5)},
        colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)}
    },
    fragmentShader: fragmentShader,
    vertexShader: vertexShader 
});
loader.load('./cute_submarine.stl', geometry => {
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    const submarine = new THREE.Mesh(geometry, customMaterial);

     
    submarine.rotation.x = Math.PI/4; 
    submarine.rotation.y = -Math.PI/6;
    scene.add(submarine);

    // Repaint

    renderer.render(scene, camera);
});




// [ ] Ladda upp en modell
// [ ] Styra position av modellen
// [ ] Styra kameran
// [ ] Hur stor är varje pixel i meter? 
// [ ] Origo i mitten av modellen. 
// [ ] Rotation i Z-axeln på modellen. 
// [ ] Input av våglängd och fas. 
// Radio buttons visa intensitet, fas, eller intensitet och fas. 
