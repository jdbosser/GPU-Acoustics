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


const replaceMaterial = (model, material) => {
    model.material = material;
    renderer.render(scene, camera);    
};

const setPhaseMaterial = (model, lambda, phase = 0) => {
    // Playground for the different shaders
    // Mostly taken from 
    // https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi
    // https://aerotwist.com/tutorials/an-introduction-to-shaders-part-2/

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
    `;
    const fragmentShader =  `
    varying vec3 vNormal;
    uniform mat4 inverseRotationMatrix;
    void main() {

      // calc the dot product and clamp
      // 0 -> 1 rather than -1 -> 1
      vec4 light4 = vec4(0.0, 1.0, 0.0, 1.0);
      
      // Rotate 
      light4 = inverseRotationMatrix * light4; 

      vec3 light = vec3(light4);
       
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
`;   
    let inverseRotationMatrix = new THREE.Matrix4();
    inverseRotationMatrix.makeRotationFromEuler(model.rotation);
    //inverseRotationMatrix.makeRotationZ(-model.rotation.z);
    //inverseRotationMatrix.makeRotationY(-model.rotation.y);
    //inverseRotationMatrix.makeRotationX(-model.rotation.x);
    const customMaterial = new THREE.ShaderMaterial({
    uniforms: {
        colorB: {type: 'vec3', value: new THREE.Color(0xACB6E5)},
        colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)},
        inverseRotationMatrix: {type: 'mat4', value: inverseRotationMatrix}
    },
    fragmentShader: fragmentShader,
    vertexShader: vertexShader  
    });

    
    replaceMaterial(model, customMaterial);
};

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
    setPhaseMaterial(model, 1, 1); 
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
    // Rotate inside shader
    let rotation = model.rotation.clone();
    rotation.x = -rotation.x;
    rotation.y = -rotation.y;
    rotation.z = -rotation.z;
    model.material.uniforms.inverseRotationMatrix.value.makeRotationFromEuler(rotation);

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
