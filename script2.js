import * as THREE from './three.js/build/three.module.js';
import { STLLoader } from './three.js/examples/jsm/loaders/STLLoader.js';
import { OBJLoader2 } from "./three.js/examples/jsm/loaders/OBJLoader2.js";
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js'

// Get the aspect ratio of the canvas. 
const getAspectRatio = (canvas) => canvas.clientWidth / canvas.clientHeight

const shaders = {
    fragmentshader: "123",
    vertexshader:   "123"
}

// Helper function to get the camera. 
// Can redifine some of the camera properies here.
const getCamera = canvas => {
    const fov = 75;
    const aspect = getAspectRatio(canvas);
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);    
    camera.position.y = 50;
    camera.up.set(0,0,1);
    return camera;
}

const setRendererSize = (renderer, canvas) => renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

// Set up all the master elements, such as the scene, renderer and more
const canvas = document.getElementById("c");
const scene  = new THREE.Scene();
//scene.background = new THREE.Color(0x000000);
scene.background = new THREE.Color();
const renderer = new THREE.WebGLRenderer({canvas});
setRendererSize(renderer, canvas);
const camera = getCamera(canvas);
const light = new THREE.DirectionalLight(0xFFFFFF,1); // Color white, and intensity 1 are the defaults. 
light.position.y = 300;
scene.add(light);
renderer.render(scene, camera);

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

let model;
const loader = new STLLoader();
// Load the russian submarine
loader.load('./ShaderFood/P677_shell(fine).stl', geometry => {
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    //geometry.rotateX(-Math.PI/2); 
    const material = new THREE.MeshLambertMaterial({color: 0xff5533});
    const submarine = new THREE.Mesh(geometry, material);

     
    //submarine.rotation.x = Math.PI/4; 
    //submarine.rotation.y = -Math.PI/6;
    scene.add(submarine);

    // Repaint

    renderer.render(scene, camera);
    model = submarine;
});


// Add orbit controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.autoRotate = true;
controls.update();

controls.addEventListener('change', () => {});

// Animation loop for the orbit controls, and pretty much everything
const animate = () => {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);    
}
animate();


// Exporting functions to the ui
const setCameraChangeListener = handler => {
    controls.addEventListener('change', handler);    
}

const setAutoRotation = bool => controls.autoRotate = bool;

const setCameraPosition = (x,y,z) => {
    camera.position.set(x,y,z);    
    controls.update();
}

const setCameraLookAt = (x,y,z) => {
    controls.target = new THREE.Vector3(x,y,z);
    controls.update();
}

const setModelPosition = (x,y,z) => {
    model.position.set(x,y,z);
} 

const setModelRotation = (x,y,z) => {
    model.rotation.set(x,y,z);
    console.log(model);
}

const replaceModel = imported_model => {
        //geometry.computeFaceNormals();
        //geometry.computeVertexNormals();
        
        //const material = new THREE.MeshLambertMaterial({color: 0xff5533});
        //const imported_model = new THREE.Mesh(geometry, material);
        scene.remove( model );
        scene.add(imported_model);         

        // Repaint
        renderer.render(scene, camera);
        model = imported_model;
};

const replaceModelOBJ = (uri) => {
    const loader = new OBJLoader2();
    loader.load(uri, replaceModel);
};

const replaceModelSTL = (uri) => {
    const loader = new STLLoader();
    loader.load(uri, geometry => {
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        
        const material = new THREE.MeshLambertMaterial({color: 0xff5533});
        const imported_model = new THREE.Mesh(geometry, material);
        replaceModel(imported_model);
    });
};
export {setCameraChangeListener, setAutoRotation, setCameraPosition, setCameraLookAt, setModelPosition, setModelRotation, replaceModelSTL, replaceModelOBJ};
