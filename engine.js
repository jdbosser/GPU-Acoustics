import * as THREE from './three.js/build/three.module.js';
import { STLLoader } from './three.js/examples/jsm/loaders/STLLoader.js';
import { OBJLoader2 } from "./three.js/examples/jsm/loaders/OBJLoader2.js";
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js';
import Stats from './stats.js/build/stats.module.js';


const waveLengthListeners = new Array();
const [getWaveLength, setWaveLength2] = (function(){
    
    let wavelength = 1;

    const getter = function(){
        return wavelength;
    };

    const setter = function(val){
        for ( let func of waveLengthListeners ) func(val);
        wavelength = val;    
    };
    
    return [getter, setter]; 
})();

const phaseChangeListeners = new Array();
const [getPhase, setPhase] = (function(){
    let phase = 0;
    
    const getter = function(){
        return phase;    
    };    

    const setter = function(val){
        for (let func of phaseChangeListeners) func(val);
        phase = val;    
    };
    return [getter, setter];
})();

const modelRotationListeners = new Array();

// Get the aspect ratio of the canvas. 
const getAspectRatio = (canvas) => canvas.clientWidth / canvas.clientHeight

// Helper function to get the camera. 
// Can redifine some of the camera properies here.
const getPerspectiveCamera = canvas => {

    const fov = 75;
    const aspect = getAspectRatio(canvas);
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);    
    camera.position.y = 50;
    camera.up.set(0,0,1);
    return camera;

};

// Helper function to get a Orthographic camera. 
const getOrthographicCamera = canvas => {

    const width = canvas.clientWidth/10; 
    const height = canvas.clientHeight/10;
    const near = 0.01;
    const far = 100;
    
    const camera = new THREE.OrthographicCamera(
        width / - 2, width / 2, 
        height / 2, height / - 2);
     
    camera.position.y = 50;
    camera.up.set(0,0,1);
    return camera;

};

const getCamera = canvas => getOrthographicCamera(canvas);  


// This function makes sure that the renderer have the same size as the camera. 
// The "false" here makes sure that three.js does not override the size of the canvas itself. 
// if the boolean is set to true, it will override the css-style for the canvas. 
// This function is also used when we rescale our browser window, as will be seen furter down in the code.
const setRendererSize = (renderer, canvas) => renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

// Set up all the master elements, such as the scene, renderer and more

// This is the html element in which we draw in. This element can be 
// resized and shift aspect ratio. 
const canvas = document.getElementById("c");

// The scene is where we have all of our object and lights. 
// Since we are working with our own shaders in this demo, no lights will be added
// since the "lights" (the audio source) is defined inside of the shaders. 
const scene  = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Set the shader background to black.

// Add a model. There is nothing in it yet, 
// it needs to be loaded. This is done asynchronously.  
let model;

// The renderer is the element that draws our 3D objects to our canvas. 
const renderer = new THREE.WebGLRenderer({canvas});
const outputBuffer = new THREE.WebGLRenderTarget(canvas.clientWidth, canvas.clientHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat, type: THREE.FloatType }); 

setRendererSize(renderer, canvas); // We want the renderer to have the same size as our canvas
                                   // to get maximal resolution.  
setRendererSize(outputBuffer, canvas);

// Get the camera.
const camera = getCamera(canvas);

// Add orbit controls to the camera
const controls = new OrbitControls( camera, renderer.domElement );
//controls.enableDamping = true;
//controls.dampingFactor = 0.25;
controls.autoRotate = false;
controls.update();

let animatePhase = false;

// Add stats
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);
stats.dom.style.cssText = 'position:fixed;bottom:0;left:0;cursor:pointer;opacity:0.9;z-index:10000'


// Animation loop for the orbit controls, and pretty much everything
const animate = (time) => {
    stats.begin();
    
    if (controls.autoRotate || animatePhase) {
        if(model && animatePhase && model.material.uniforms.phase) model.material.uniforms.phase.value = time/1000;
        renderer.render(scene, camera);
        controls.update();
    
        console.log("animating");    
    }
        
        stats.end();

    requestAnimationFrame(animate);    

};
animate();

// These couple of lines defines a function to execute when the browser
// window is resized.  
// If the browser window is resized, our canvas will have a height and width in
// px where we are able to draw. This means that both resolution and aspect
// ratio can change. 
window.addEventListener('resize', () => {

    // Update camera aspect ratio
    camera.aspect = getAspectRatio(canvas);
    camera.updateProjectionMatrix();
    
    // Get the new resolution of the view and give that to the renderer 
    setRendererSize(renderer, canvas);

    // Repaint
    renderer.render(scene, camera);

});

// If a model changes material we need to repaint the scene.  
const replaceMaterial = (model, material) => {

    model.material = material;
    renderer.render(scene, camera);    

};

// Function to give the model a phase material. This material is 
// "sensitive" to changes in the aucustic phase. 
// NOTE: this function is not done yet. 
// TODO: incorporate the wavelength and phaseshift (the phase) 
// calculating the phase/angle. 
const setPhaseMaterial = (model, lambda, phase = 0) => {

    // Playground for the different shaders
    // Mostly taken from 
    // https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi
    // https://aerotwist.com/tutorials/an-introduction-to-shaders-part-2/

    const vertexShader = `
   	varying vec3 vNormal;
    varying vec3 vUv;
    void main() {

    // set the vNormal value with
    // the attribute value passed
    // in by Three.js
    vNormal = normal;
    vUv = position;
    gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position, 1.0);
    } 
    `;
    const fragmentShader =  `
    varying vec3 vNormal;
    varying vec3 vUv;
    uniform mat4 inverseRotationMatrix;
    uniform float lambda;
    uniform float phase; 

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
      /*
      float dProd = max(0.0,
                        dot(vNormal, light));

      // feed into our frag colour
      gl_FragColor = vec4(dProd, // R
                          dProd, // G
                          dProd, // B
                          1.0);  // A
      */

      float prod = mod(2 * (dot(vUv, light) / lambda) + phase, 1.0);
      gl_FragColor = vec4(prod, // R
                          prod, // G
                          prod, // B
                          1.0);  // A


    } 
`;   
    let inverseRotationMatrix = new THREE.Matrix4();
    inverseRotationMatrix.makeRotationFromEuler(model.rotation);
    const customMaterial = new THREE.ShaderMaterial({

        uniforms: {

            colorB: {type: 'vec3', value: new THREE.Color(0xACB6E5)},
            colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)},
            lambda: {type: 'float', value: 1.0},
            phase: {type: 'float', value: 0.0},
            inverseRotationMatrix: {type: 'mat4', value: inverseRotationMatrix}

        },
        fragmentShader: fragmentShader,
        vertexShader: vertexShader  

    });

    replaceMaterial(model, customMaterial);

};

const setIntensityMaterial = (model, lambda, pixelArea) => {

    const vertexShader = `
   	varying vec3 vNormal;
    varying vec3 vUv;
    void main() {

    // set the vNormal value with
    // the attribute value passed
    // in by Three.js
    vNormal = normal;
    vUv = position;
    gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position, 1.0);
    } 
    `;

    const fragmentShader =  `
    varying vec3 vNormal;
    varying vec3 vUv;
    uniform mat4 inverseRotationMatrix;
    uniform float lambda;
    uniform float pixelArea;
    uniform float scalingFactor; 

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
      /*
      float dProd = max(0.0,
                        dot(vNormal, light));

      // feed into our frag colour
      gl_FragColor = vec4(dProd, // R
                          dProd, // G
                          dProd, // B
                          1.0);  // A
      */
        
        //float prod = dot(normalize(vNormal), light);

        // Include the pixelArea when writing to texture.
        float prod = dot(normalize(vNormal), light);

        gl_FragColor = vec4(prod, // R
                          prod, // G
                          prod, // B
                          1.0);  // A


    } 
    `; 

    let inverseRotationMatrix = new THREE.Matrix4();
    inverseRotationMatrix.makeRotationFromEuler(model.rotation);
    const customMaterial = new THREE.ShaderMaterial({
    
        uniforms: {
            scalingFactor: {type: 'float', value: 1},
            lambda: {type: 'float', value: lambda},
            pixelArea: {type: 'float', value: pixelArea},
            inverseRotationMatrix: {type: 'mat4', value: inverseRotationMatrix}

        },

        fragmentShader: fragmentShader,
        vertexShader: vertexShader    
    
    });

    replaceMaterial(model, customMaterial);  
};

const mixMaterial = (function() {

    const vertexShader = `
   	varying vec3 vNormal;
    varying vec3 vUv;
    void main() {

    // set the vNormal value with
    // the attribute value passed
    // in by Three.js
    vNormal = normal;
    vUv = position;
    gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position, 1.0);
    } 
    `;

    const fragmentShader =  `
    varying vec3 vNormal;
    varying vec3 vUv;
    uniform mat4 inverseRotationMatrix;
    uniform float lambda;
    uniform float phase;

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
       
        float intensity = dot(normalize(vNormal), light);
        float phase = mod(2.0 * (dot(vUv, light) / lambda) + phase, 1.0);

        float prod = dot(normalize(vNormal), light);

        gl_FragColor = vec4(intensity, // R
                          phase, // G
                          dot(vUv, light), // B
                          1.0);  // A


    }`; 
    
      
    const inverseRotationMatrix = new THREE.Matrix4();
    const customMaterial = new THREE.ShaderMaterial({
         uniforms: {
            lambda: {type: 'float', value: getWaveLength()},
            inverseRotationMatrix: {type: 'mat4', value: inverseRotationMatrix},
            phase: {type: 'float', value: getPhase()}

        },

        fragmentShader: fragmentShader,
        vertexShader: vertexShader    
    
    
    });

    // Bind some functions that change the material when the model changes
    waveLengthListeners.push((newWaveLength) => {
        customMaterial.uniforms.lambda.value = newWaveLength;
    });
    phaseChangeListeners.push((newPhase) => {
        customMaterial.uniforms.phase.value = newPhase;    
    }); 
    modelRotationListeners.push((x,y,z) => {
        const rotation = new THREE.Euler(-x,-y,-z, 'XYZ');
        inverseRotationMatrix.makeRotationFromEuler(rotation);     
    });
    
    return customMaterial;    
}
)();

// Set to true if you want to autofit camera to model when rotation is applied. 
let fitCameraToModel = false; 
// Update the camera to fit model
const fitCameraToModelFunction = (camera, model, canvas) => {
    
    camera.lookAt(0,0,0);

    let bb = new THREE.Box3().setFromObject(model);
    let center = new THREE.Vector3();
    bb.getCenter(center);
    
    let bbh = new THREE.BoxHelper(model, 0xffff00); 

    // Get the center of the boundingbox
    bbh.geometry.computeBoundingBox();
    let offset = new THREE.Vector3();
    bbh.geometry.boundingBox.getCenter(offset).negate();
    bbh.geometry.center();
    bbh.position.set(0,0,0);
    
    model.geometry.center();
    let boundingBox = bbh.geometry.boundingBox;
    let width = boundingBox.max.x - boundingBox.min.x; 
    let height = boundingBox.max.z - boundingBox.min.z; 
    
     
    const aspectRatio = canvas.clientWidth/canvas.clientHeight;
    const objAspectRatio = width/height;
    if (objAspectRatio < aspectRatio) {
        // Keep the height
        width = aspectRatio * height;
    }
    else height = width / aspectRatio;
   
    const scale = 1.1;
    width = width * scale;
    height = height * scale;
    
    camera.position.set(0,boundingBox.max.y*scale, 0);
    camera.left = width / -2;
    camera.right = width / 2; 
    camera.top = height / 2;
    camera.bottom = height / -2;
    camera.lookAt(0,0,0); 
    camera.zoom = 1;
    
    camera.updateProjectionMatrix();

};


const renderToBuffer = () => {
   // https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/readPixels
   renderer.setRenderTarget(outputBuffer);
   renderer.clear(); // Do not know what this line does. 
   renderer.render(scene, camera);
   renderer.setRenderTarget(null);

   let read = new Float32Array(4 * canvas.clientWidth * canvas.clientHeight);
   renderer.readRenderTargetPixels(outputBuffer, 0, 0, canvas.clientWidth,canvas.clientHeight, read);
   return read;
}; 


// The following functions are exposing different 
// properties to the ui. 

// Make it possible for the ui to respond to event when someone 
// moves the camera. This is useful to update the coordinates for 
// a camera controller when someone changes the camera position with mouse. 
const setCameraChangeListener = handler => {

    controls.addEventListener('change', handler);    

}

controls.addEventListener("change", () => renderer.render(scene, camera));


// Start (or stop) OrbitControls auto rotation around the
// target.
const setAutoRotation = bool => controls.autoRotate = bool;

// Move camera in space. It will still though focus on the same target after
// the move.
const setCameraPosition = (x,y,z) => {

    camera.position.set(x,y,z);    
    controls.update();

}

// Change camera focus and what to orbit around when autorotate. 
const setCameraLookAt = (x,y,z) => {

    controls.target = new THREE.Vector3(x,y,z);
    controls.update();

};

// Move the model in the world.
const setModelPosition = (x,y,z) => {

    model.position.set(x,y,z);
    renderer.render(scene, camera);
}; 

// Rotate the model in the world.
const setModelRotation = (x,y,z) => {

    model.rotation.set(x,y,z);
    for (let func of modelRotationListeners) func(x,y,z);
    console.log(mixMaterial);
     
    // Rotate inside shader
    // this is needed, since the incoming aucustic wave 
    // have the model coordinates. We need to "rotate back"
    // the incoming wave to make sure it stays in place in the world.

    // we do a clone, since object oriented programming is actually quite scary 
    // sometimes. 
    let rotation = model.rotation.clone();
    rotation.x = -rotation.x;
    rotation.y = -rotation.y;
    rotation.z = -rotation.z;
    model.material.uniforms.inverseRotationMatrix.value.makeRotationFromEuler(rotation);
    // Lots of dots ... ^ 
    // Calculate pixel area
    const num_pixels = canvas.clientHeight*canvas.clientWidth;
    const area = (camera.right - camera.left)*(camera.top - camera.bottom)
    const pixelArea = area / num_pixels;
    model.material.uniforms.pixelArea = pixelArea;

    console.log("pixelArea", pixelArea);

    if ( fitCameraToModel ) fitCameraToModelFunction(camera, model, canvas);
    
    renderer.render(scene, camera);
};

// Toggle autofit to model
const autoFitCameraToModel = (bool) => fitCameraToModel = bool;

const replaceModel = imported_model => {
        
    scene.remove( model );
    scene.add(imported_model);         

    // Repaint
    renderer.render(scene, camera);

    // Make sure that the model points to our new model.
    model = imported_model;
    model.geometry.center();
    model.position.set(0,0,0);     
    //setIntensityMaterial(model, 1, 1); 
    replaceMaterial(model, mixMaterial);
    
};

// Upload obj.
const replaceModelOBJ = (uri) => {

    const loader = new OBJLoader2();
    loader.load(uri, replaceModel);

};

// Upload STL.
const replaceModelSTL = (uri, callback) => {

    const loader = new STLLoader();
    loader.load(uri, geometry => {
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        
        const material = new THREE.MeshLambertMaterial({color: 0xff5533});
        const imported_model = new THREE.Mesh(geometry, material);
        replaceModel(imported_model);
        callback();
    });

};

const setWaveLength = wavelength => {
    setWaveLength2(wavelength);
    console.log(mixMaterial);
    model.material.uniforms.lambda.value = wavelength;
    renderer.render(scene, camera);
};

const setPhaseShift = phase => {
    setPhase(phase);
    if (model.material.uniforms.phase) model.material.uniforms.phase.value = phase;    
    renderer.render(scene, camera);
};

const setPhaseAnimation = bool => animatePhase = bool;

// Export all the setters, getters and setListneres to the ui controller.
export {setCameraChangeListener, setAutoRotation, setCameraPosition, setCameraLookAt, setModelPosition, setModelRotation, replaceModelSTL, replaceModelOBJ, setWaveLength, setPhaseShift, setPhaseAnimation, autoFitCameraToModel};

// Finally, add a default model to our scene. 
replaceModelSTL('./ShaderFood/P677_shell(fine).stl', () => {
    renderToBuffer();
});

// [x] Ladda upp en modell. Typ klar, OBJ fungerar inte. 
// [x] Styra position av modellen
// [x] Styra kameran
// [x] Hur stor är varje pixel i meter? 
// [x] Origo i mitten av modellen. 
// [x] Rotation i Z-axeln på modellen. 
// [x] Input av våglängd och fas. 
// [ ] Radio buttons visa intensitet, fas, eller intensitet och fas. 
// [x] fps-mätare
