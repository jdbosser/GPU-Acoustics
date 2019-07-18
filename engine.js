import * as THREE from './three.js/build/three.module.js';
import { STLLoader } from './three.js/examples/jsm/loaders/STLLoader.js';
import { OBJLoader2 } from "./three.js/examples/jsm/loaders/OBJLoader2.js";
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js';
import Stats from './stats.js/build/stats.module.js';


// Helper function to get a linspaced array between two numbers. 
const linspace = (min, max, num) => {
        const output = new Array(num);
        const delta = (max - min) / (num-1);
        for (let i = 0; i < num; i++) {
            output[i] = min + delta*i;
        }   
        return output; 
};

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


const cameraViewChangeListeners = new Array();
const [getPixelArea, setPixelArea] = (function(){

    let pixelArea = 1;
    
    const getter = function(){
        return pixelArea;    
    };    

    const setter = function(val){
        for (let func of cameraViewChangeListeners) func(val);
        pixelArea = val;    
    };
    return [getter, setter];

})();

const modelRotationListeners = new Array();
const modelPositionListeners = new Array();

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

    // Calculate new pixel area
    const num_pixels = canvas.clientWidth*canvas.clientHeight;
    const pixelarea = (width*height)/num_pixels;
    // Notifies all pixel area change listeners
    // setPixelArea(pixelarea);

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
// This "constant" tells us how many pixels we want the output buffer to consist of. Higher number => higher resolution. 
// When rendering we get slightly less than the target number of pixels. 
// This value might be changed by the user. 
let OUTPUT_TARGET_RESOLUTION = 2000*2000;
const outputBuffer = new THREE.WebGLRenderTarget(canvas.clientWidth, canvas.clientHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat, type: THREE.FloatType }); 

setRendererSize(renderer, canvas); // We want the renderer to have the same size as our canvas
                                   // to get maximal resolution.  
setRendererSize(outputBuffer, canvas);

// Get the camera.
const camera = getCamera(canvas);

// Get outputBuffer camera
const outputBufferCamera = new THREE.OrthographicCamera(-1, 1, 1, -1);
outputBufferCamera.up.set(0,0,1);
outputBufferCamera.position.y = 50;
outputBufferCamera.lookAt(0,0,0);
outputBufferCamera.updateMatrixWorld();
outputBufferCamera.updateProjectionMatrix();
const outputBufferCameraHelper  = new THREE.CameraHelper(outputBufferCamera);
scene.add(outputBufferCameraHelper);
outputBufferCameraHelper.update();

// Add orbit controls to the camera
const controls = new OrbitControls( camera, renderer.domElement );
controls.autoRotate = false;
controls.update();

// If we change the controls by mouse or arrows, make sure to rerender. 
controls.addEventListener("change", () => renderer.render(scene, camera));

// Add stats. Shows framerate. 
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);
stats.dom.style.cssText = 'position:fixed;bottom:0;left:0;cursor:pointer;opacity:0.9;z-index:10000'

// Boolean that is able to be set by user. Toggles animation of the phase. 
let animatePhase = false;
// Animation loop for the orbit controls, and pretty much everything
const animate = (time) => {
    stats.begin();
    
    if (controls.autoRotate || animatePhase) {

        if (model && animatePhase) setPhase(time/1000); 
        if ( controls.autoRotate ) controls.update();
        renderer.render(scene, camera);

    }
        
    stats.end();

    requestAnimationFrame(animate);    

};
animate();

// If a model changes material we need to repaint the scene.  
const replaceMaterial = (model, material) => {

    model.material = material;
    renderer.render(scene, camera);    

};

// Function to give the model a phase material. This material is 
// "sensitive" to changes in the aucustic phase. 
const phaseMaterial = (function(){

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

      // Dot between vUv and the "light" gives the z-distance into the model
      // Multiply by 2 to get the phase after reflection
       
      float prod = mod(2.0 * (dot(vUv, light) / lambda) + phase, 1.0);
      gl_FragColor = vec4(prod, // R
                          prod, // G
                          prod, // B
                          1.0);  // A


    } 
`;   
    let inverseRotationMatrix = new THREE.Matrix4();
    const customMaterial = new THREE.ShaderMaterial({

        uniforms: {

            lambda: {type: 'float', value: 1.0},
            phase: {type: 'float', value: 0.0},
            inverseRotationMatrix: {type: 'mat4', value: inverseRotationMatrix}

        },
        fragmentShader: fragmentShader,
        vertexShader: vertexShader  

    });
    
    // This material is intrested in knowing about changes to
    // + model rotation
    // + Wavelength
    // + Changes to the phase
    waveLengthListeners.push((newWaveLength) => {
        customMaterial.uniforms.lambda.value = newWaveLength;
    });
    phaseChangeListeners.push((newPhase) => {
        customMaterial.uniforms.phase.value = newPhase;    
    }); 
    modelRotationListeners.push((x,y,z) => {
        const rotation = new THREE.Euler(-x,-y,-z, 'ZYX');
        inverseRotationMatrix.makeRotationFromEuler(rotation);
    });

    return customMaterial;
})(); 



const intensityMaterial = (function(){
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
      // Since they are both normalized, this will equal
      // cos(theta), where theta is the angle between the 
      // light and the vertex normal
         
        float prod = dot(normalize(vNormal), light);

        gl_FragColor = vec4(prod, // R
                          prod, // G
                          prod, // B
                          1.0);  // A
    } 
    `; 

    let inverseRotationMatrix = new THREE.Matrix4();
    const customMaterial = new THREE.ShaderMaterial({
    
        uniforms: {
            inverseRotationMatrix: {type: 'mat4', value: inverseRotationMatrix}
        },

        fragmentShader: fragmentShader,
        vertexShader: vertexShader    
    
    });

    // This material needs to know about changes in model rotation.
    modelRotationListeners.push((x,y,z) => {
        const rotation = new THREE.Euler(-x,-y,-z, 'ZYX');
        inverseRotationMatrix.makeRotationFromEuler(rotation);
    });

    return customMaterial;    
    
})();

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

        // Intensity is the cos(theta) between the "light" and the normal
        // The phase is the z distance traveled by the "light" times 2 modulo 1.  
        float intensity = dot(normalize(vNormal), light);
        float phase = mod(2.0 * (dot(vUv, light) / lambda) + phase, 1.0);

        gl_FragColor = vec4(intensity, // R
                          phase, // G
                          0.0, // dot(vUv, light), // B
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
    // The material needs to know about changes in wavelength, 
    // phase and model rotation.
    waveLengthListeners.push((newWaveLength) => {
        customMaterial.uniforms.lambda.value = newWaveLength;
    });
    phaseChangeListeners.push((newPhase) => {
        customMaterial.uniforms.phase.value = newPhase;    
    }); 
    modelRotationListeners.push((x,y,z) => {
        const rotation = new THREE.Euler(-x,-y,-z, 'ZYX');
        inverseRotationMatrix.makeRotationFromEuler(rotation);     
    });
    
    return customMaterial;    
}
)();

const complexMaterial = (function() {

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
    #define M_PI 3.1415926535897932384626433832795
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

        // Intensity is the cos(theta) between the "light" and the normal 
        float intensity = max(0.0, dot(normalize(vNormal), light));

        // The angle is the distance the sound travels, times 2 pi divided by wavelength
        float angle = 4. * M_PI * dot(vUv, light) / lambda + phase;

        gl_FragColor = vec4(intensity * cos(angle), // R
                          intensity * sin(angle), // G
                          0.0, // dot(vUv, light), // B
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
    // The material needs to know about changes in wavelength, 
    // phase and model rotation.
    waveLengthListeners.push((newWaveLength) => {
        customMaterial.uniforms.lambda.value = newWaveLength;
    });
    phaseChangeListeners.push((newPhase) => {
        customMaterial.uniforms.phase.value = newPhase;    
    }); 
    modelRotationListeners.push((x,y,z) => {
        const rotation = new THREE.Euler(-x,-y,-z, 'ZYX');
        inverseRotationMatrix.makeRotationFromEuler(rotation);     
    });
    
    return customMaterial;    
}
)();
// If we switch model, set the material to the current material
// current material changes based on UI input. 
// set default to phase material.
let currentMaterial = phaseMaterial;

// Set camera view based on width and height.  
const setCameraView = (camera, width, height) => {

    camera.left = width / -2;
    camera.right = width / 2; 
    camera.top = height / 2;
    camera.bottom = height / -2;
    camera.zoom = 1;
    
    camera.updateProjectionMatrix();

};

// Update the camera to fit model
const fitCameraToModelFunction = (camera, canvas) => {
    
    // Reset model position 
    setModelPosition(0,0,0);    
    // Make sure camera looks at the model
    setCameraLookAt(camera, 0,0,0);
    
    // Find the boundingbox
    let bbh = new THREE.BoxHelper(model, 0xffff00); 

    // Get the dimensions of the bounding box
    bbh.geometry.computeBoundingBox();
    let boundingBox = bbh.geometry.boundingBox;
    let width = boundingBox.max.x - boundingBox.min.x; 
    let height = boundingBox.max.z - boundingBox.min.z; 
    
    // Compare aspect ratios. 
    // If the model aspect ratio (w/h) is greater than the camera aspect ratio
    // set the camera height to be equal to the bounding box height. 
    
    
    if (canvas !== undefined) {

        const aspectRatio = canvas.clientWidth/canvas.clientHeight;
        
        const objAspectRatio = width/height;
        if (objAspectRatio < aspectRatio) {
            // Keep the height
            width = aspectRatio * height;
        }
        else height = width / aspectRatio;

    }

    // Since I couldnt get the bounding box to not translate while 
    // rotating the object, the object moves out of camera view by a little bit.
    // This scaling ensures that the whole model is in view. 
    // Sorry for the ugly hack. Please change if (this whole function) if 
    // you ever figure out how to do this correctly.
    const scale = 1.1;
    width = width * scale;
    height = height * scale;
    
    setCameraView(camera, width, height);
     
    camera.position.set(0,boundingBox.max.y*scale, 0);

};


const renderToBuffer = (camera) => {
   
    // Documentiation on how to read pixels. 
    // https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/readPixels
     
    // Ultimately, this is done the same way as have been done in following threejs example
    // https://threejs.org/examples/?q=read#webgl_read_float_buffer
   
    // There are two places from the example that I have copied shamelessly that
    // was key to make this work
    // Line 104: https://github.com/mrdoob/three.js/blob/master/examples/webgl_read_float_buffer.html#L104
    // Line(s) 202-216: https://github.com/mrdoob/three.js/blob/master/examples/webgl_read_float_buffer.html#L202
    
    resizeOutputBuffer(camera);
    
    // Make sure outputBufferCameraHelper is not visible
    const b = outputBufferCameraHelper.visible;
    outputBufferCameraHelper.visible = false;
     
    // Render to the rendertarget. 
    renderer.setRenderTarget(outputBuffer);
    renderer.clear(); // Do not know what this line does. 
    renderer.render(scene, outputBufferCamera);
    renderer.setRenderTarget(null);
  
    // Create array for the storing the output of the GPU
    let read = new Float32Array(4 * outputBuffer.width * outputBuffer.height);
    // Read to the array
    renderer.readRenderTargetPixels(outputBuffer, 0, 0, outputBuffer.width, outputBuffer.height, read);
  
    // Reset outputBufferCameraHelper visibility
    outputBufferCameraHelper.visible = b;
   
    return read;

}; 


// The following functions are exposing different 
// properties to the ui. 

// Make it possible for the ui to respond to event when someone 
// moves the camera. This is useful to update the coordinates for 
// a camera controller when someone changes the camera position with mouse. 
const addCameraChangeListener = handler => {

    controls.addEventListener('change', handler);    

}

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
const setCameraLookAt = (camera, x,y,z) => {

    camera.lookAt(x,y,z);
    //controls.target = new THREE.Vector3(x,y,z);
    controls.update();

};

// Move the model in the world.
const setModelPosition = (x,y,z) => {
    // Update position if the position is changed
    if (model.position.x !== x || model.position.y !== y || model.position.z !== z) {
        model.position.set(x,y,z);
        renderer.render(scene, camera);
    }
}; 

// Rotate the model in the world.
const setModelRotation = (x,y,z) => {

    model.rotation.set(x,y,z);
    // Let everyone intrested in this change know about it
    for (let func of modelRotationListeners) func(x,y,z);
     
    renderer.render(scene, camera);
};

// Set to true if you want to autofit camera to model when rotation is applied. 
let autoFitCameraToModel = false; 
// Subscribe to changes in rotation of the model if we want to autofit. 
modelRotationListeners.push(() => {
    
    if ( autoFitCameraToModel ) fitCameraToModelFunction(camera, canvas);

});

// Sets the target resolution for the outputBuffer.
const setTargetResolution = (val) => {

    OUTPUT_TARGET_RESOLUTION = val;

}

// Toggle autofit to model for the UI
// Could probably be named better so that the above function can 
// have a better name
const autoFitCameraToModelUI = (bool) => {

    autoFitCameraToModel = bool;
    if (autoFitCameraToModel) {
        fitCameraToModelFunction(camera, canvas);
        renderer.render(scene, camera);
    }

}

// These couple of lines defines a function to execute when the browser
// window is resized.  
// If the browser window is resized, our canvas will have a height and width in
// px where we are able to draw. This means that both resolution and aspect
// ratio can change. 
window.addEventListener('resize', () => {

    // Update camera aspect ratio
    const aspectRatio = getAspectRatio(canvas);
    // Keep the height
    const height = camera.top - camera.bottom;
    const width = height * aspectRatio;
    
    // If we have enabled autoFitCameraToModel then we let the fitCameraToModelFunction take 
    // take over. 
    // Else we only update the camera

    if ( autoFitCameraToModel ) fitCameraToModelFunction(camera, canvas);
    else setCameraView(camera, width, height);
    
    // Get the new resolution of the view and give that to the renderer 
    setRendererSize(renderer, canvas);
    // Update the buffer
    outputBuffer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Repaint
    renderer.render(scene, camera);

});

const replaceModel = imported_model => {
        
    scene.remove( model );
    scene.add(imported_model);         
    
    // Repaint
    renderer.render(scene, camera);

    // Make sure that the model points to our new model.
    model = imported_model;
    model.geometry.center();
    model.position.set(0,0,0);     
    replaceMaterial(model, currentMaterial);
    
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

// Quite uneccessary function. Might delete later
const setWaveLength = wavelength => {

    setWaveLength2(wavelength);
    renderer.render(scene, camera);

};

// Quite uneccessary function. Might delete later
const setPhaseShift = phase => {

    setPhase(phase);
    renderer.render(scene, camera);

};

const setPhaseAnimation = bool => animatePhase = bool;

const setMaterialUI = (materialString) => {

    switch (materialString) {
        case 'phase':
            currentMaterial = phaseMaterial;
            break;
        case 'intensity':
            currentMaterial = intensityMaterial;
            break;
        case 'mix':
            currentMaterial = mixMaterial;
            break;
        case 'complex':
            currentMaterial = complexMaterial;
            break;
        default: 
            alert('Invalid material');
    }

    replaceMaterial(model, currentMaterial);
    renderOutputBufferCameraInTinyWindow();
    renderer.render(scene, camera);
    
};



/*
    This function assumes that the model has the complexMaterial selected. 
*/ 
const getTS = () => {
    
    const helperVisibilityState = outputBufferCameraHelper.visible
    outputBufferCameraHelper.visible = false;
     
    const extractFourChannels = (arr) => {
        
        const num_elements = arr.length;
        const ch_elements  = num_elements/4;
        let ch1 = new Float32Array(ch_elements);
        let ch2 = new Float32Array(ch_elements);
        let ch3 = new Float32Array(ch_elements);
        let ch4 = new Float32Array(ch_elements);
        
        for (let i = 0; i < ch_elements; i++) {

            const j = i * 4;
            ch1[i] = arr[j];
            ch2[i] = arr[j+1];
            ch3[i] = arr[j+2];
            ch4[i] = arr[j+3];

        }
        return [ch1, ch2, ch3, ch4];    
    }; 

    // Steps to perform
    // Make sure that model is in view
    // Make sure that the model has the right material
    // Get the output
    let read = renderToBuffer(outputBufferCamera);

    const [r,g,b,a] = extractFourChannels(read);
    
    // Assume that complexMaterial is selected
    let real_part = r;
    let imag_part = g;

    let sum = (x,y) => x + y;
    let real_sum = real_part.reduce(sum, 0);
    let imag_sum = imag_part.reduce(sum, 0);

    // Multiply with scaling
    real_sum *= getPixelArea()/getWaveLength();
    imag_sum *= getPixelArea()/getWaveLength();

    // Finally, get the absolute value
    let TS = 10 * Math.log10(real_sum**2 + imag_sum**2);
    
    outputBufferCameraHelper.visible = helperVisibilityState;

    return TS

};

// Finally, add a default model to our scene. 
replaceModelSTL('./ShaderFood/P677_shell(fine).stl', () => {
    
    console.log("Default model added to scene");
    renderOutputBufferCameraInTinyWindow();    
    displayOutputBufferCamera(true);

});


// https://stackoverflow.com/a/30800715/1939970
/* 
    Input: Any javascript object
    Creates a JSON file and prompts the user to download the 
    file. 
*/
const downloadObjectAsJson = (exportObj, exportName) => {
    
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();

};


// Test for a sphere
const testForA2mRadiusSphere = () => {
    
    const DEMO_MODE = true; 

    // Stuff common to the two modes
    
    // Create the sphere
    const geometry = new THREE.SphereGeometry(2, 128, 128);
    const material = new THREE.MeshLambertMaterial({color: 0xff5533});   
    const sphere = new THREE.Mesh(geometry, material);
    // Place the model and material to our super cool material
    replaceModel(sphere);
    // Set the material to our cool material
    setMaterialUI('complex');
    // Make sure that the model fits optimally in the camera
    fitCameraToModelFunction(outputBufferCamera);

    // Reize outputbuffer
    resizeOutputBuffer(outputBufferCamera);
    
    // Set pixel area
    const cameraWidth = outputBufferCamera.right - outputBufferCamera.left;
    const cameraHeight = outputBufferCamera.top - outputBufferCamera.bottom;
    const num_pixels = outputBuffer.height * outputBuffer.width;
    setPixelArea(cameraWidth * cameraHeight / num_pixels);

    // Show the outputBufferCamera
    displayOutputBufferCamera(true);
    renderer.render(scene, camera);
    
    const num_calc = 100;
    alert(`
Programmet kommer nu att göra ett svep av olika frekvenser infallandes mot en sfär med en 2 meters radie. Svepet består av ${num_calc} olika beräkningar, och kan därför ta lite tid. Webläsarfönstret kan temporärt frysa under tiden beräkningarna görs. Efter att beräkningarna är klara kommer en json fil med frekvenser och beräknad TS att laddas ner. 
    `);
    
    const freqs = linspace(1,Math.log10(50000),num_calc).map((v) => 10**v);
    const wavelengths = freqs.map((f) => 1500/f);

    if ( !DEMO_MODE ) {

          
        const TSs = wavelengths.map((w) => {
            setWaveLength2(w);
            return getTS();    
        });
        const exportObj = {x:freqs, y:TSs};
        downloadObjectAsJson(exportObj, "2msphereDiffFreqsTS");

    } 

    else {

        let i = 0; 
        const results = new Array();
        const animate = () => {

            setWaveLength2(wavelengths[i]);
            renderer.render(scene, camera);
            renderOutputBufferCameraInTinyWindow();
            results.push(getTS()); 
            

            i++;
            if (i < wavelengths.length) requestAnimationFrame(animate);
            if (i == wavelengths.length) {

                alert("We are done!");    
                const exportObj = {x:freqs, y:results};
                downloadObjectAsJson(exportObj, "2msphereDiffFreqsTS");

            }  
        };
        requestAnimationFrame(animate);

    }
};


// Splitting up this function into several smaller functions 

// Functions : 

// Take picture of submarine -> read. Change the renderToBuffer.  

// Display in tiny window -> displayArrayInTinyWindow DONE

// Resize output buffer based on the outputBufferCamera and OUTPUT_TARGET_RESOLUTION. DONE

// Show the outputBufferCameraHelper DONE

/*
    This function resizes the output buffer so that the aspect ratio 
    of the buffer matches the aspect ratio of a camera, that can be given
    as input, for example the outputBufferCamera. 

    The size is determined by OUTPUT_TARGET_RESOLUTION, so that the 
    width and the height of the outputBuffer is approximately
    equal to OUTPUT_TARGET_RESOLUTION. Since there are flooring 
    opertations involved when calculating the width and height of the
    outoutBuffer, width * height <= OUTPUT_TARGET_RESOLUTION. 
*/
const resizeOutputBuffer = (camera) => {

    // Get the aspect ratio of the camera    
    const width = camera.right - camera.left;
    const height = camera.top - camera.bottom;
    const cameraAspectRatio = width/height;
    
    const totalTargetSize = OUTPUT_TARGET_RESOLUTION;
    
    // Set the size of the outputBuffer based on totalTargetSize and aspect ratio
    // This needs some math. Let me explain to myself
    // We know that totalTargetSize = w*h, and aspect ratio a = w/h
    // The solution to this equation is given by
    // h = sqrt(totalTargetSize/a), w = a * h
    let bufferHeight = Math.sqrt(totalTargetSize/cameraAspectRatio);
    // Since we are dealing with pixels, we need to make sure that the 
    // height is an integer
    bufferHeight = Math.floor(bufferHeight);
    let bufferWidth = cameraAspectRatio * bufferHeight;
    bufferWidth = Math.floor(bufferWidth);
    
    // Set the buffer size
    outputBuffer.setSize(bufferWidth, bufferHeight);

}

/*
    Shows the outputBufferCameraHelper and rerenders the image
*/
const displayOutputBufferCamera = (bool) => {

    if ( bool == true ) {
        
        outputBufferCamera.updateMatrixWorld();
        outputBufferCamera.updateProjectionMatrix();
        // Set the outputBufferCameraHelper to visible and rerender
        outputBufferCameraHelper.update();
        outputBufferCameraHelper.visible = true;

    } 

    else {

        outputBufferCameraHelper.visible = false;

    } 

    renderer.render(scene, camera);   
     
}

/* 
    This functions purpuse is to display the array given by renderToBuffer 
    in the tiny img tag on the interface. 

    Can be used to view any array really. Just make sure that the input 
    follow the criteria: 
        
        + Elements in array are integers
        + They are bound between 0 and 255.
*/
const displayArrayInTinyWindow = (arr, width, height) => {
    
    const tinyWindow = document.getElementById("outputBufferCanvas");
    
    const invisibleCanvas = document.createElement('canvas');
    const ctx = invisibleCanvas.getContext('2d');
    
    invisibleCanvas.height = height;
    invisibleCanvas.width = width;
    
    // Create the image data array that represents all the pixels in the canvas
    const imageData = new ImageData(new Uint8ClampedArray(arr), width, height);
     
    // Put the data back into the canvas
    ctx.putImageData(imageData, 0, 0); // 0,0 is where in the image to put the data
                                       // This is top left corner

    // Get the url of the created image and display in
    tinyWindow.src = invisibleCanvas.toDataURL("image/png");
     
};

const displayFloat32ArrayInTinyWindow = (arr, width, height) => {
   
    // Make sure data is 0, 255 ints
    arr = arr.map((val) => val*255);
    displayArrayInTinyWindow(arr);
};

/* 
    Uses an immidietly invoked function expression to prevent recreation of the 
    tinyWindowRenderer. See more IIFE here: 
*/
const renderOutputBufferCameraInTinyWindow = ( () => {
        
    // create a new renderer, and write directly to that renderer. 
    const invisibleCanvas = document.getElementById("invisibleCanvas");
    const tinyWindowRenderer = new THREE.WebGLRenderer({canvas: invisibleCanvas}); 
         
    const f = () => {
           
        // Fit the camera to the model     
        fitCameraToModelFunction(outputBufferCamera);
        outputBufferCameraHelper.update();

        // Make the buffer the same size as the model
        resizeOutputBuffer(outputBufferCamera);
        
        // Set up the canvas dimensions. 
        invisibleCanvas.width = outputBuffer.width;
        invisibleCanvas.height = outputBuffer.height;
        tinyWindowRenderer.setSize(outputBuffer.width, outputBuffer.height, false);

        renderer.render(scene, camera);
        
        const visibility_state = outputBufferCameraHelper.visible;
        outputBufferCameraHelper.visible = false; 
        tinyWindowRenderer.render(scene, outputBufferCamera);
        outputBufferCameraHelper.visible = visibility_state;

    };

    return f;

} )();

let autoRenderToTinyWindow = false;
// Create temporary function f and and add listeners
(function() {
    const f = () => {
        if ( autoRenderToTinyWindow ) renderOutputBufferCameraInTinyWindow();    
    }
    modelRotationListeners.push(f);
    phaseChangeListeners.push(f);
    waveLengthListeners.push(f);
})();

const setAutoRenderToTinyWindow = (bool) => autoRenderToTinyWindow = bool;

const rotationTS = () => {
    // What to do:

    // Set material

    // For every degree: 
        // Rotate the model
        // Fit the outputBufferCamera
        // Resize outputBuffer
        // get pixel area
        // getTS()

    const demoMode = true;
    
    replaceMaterial(model, complexMaterial);
     
    const rotationDegs = linspace(0, Math.PI, 180);
    
    if (!demoMode) {
    
        const TSs = rotationDegs.map((rotationDeg) => {
            const percentage_complete = rotationDeg / Math.PI
            console.log(rotationDeg, `${100*percentage_complete}%`);    
            // Rotate the model
            setModelRotation(0,0,rotationDeg);
            
            // Fit the outputBufferCamera 
            fitCameraToModelFunction(outputBufferCamera);

            // Resize the output buffer
            resizeOutputBuffer(outputBufferCamera);

            // Get the pixel area
            const cameraWidth = outputBufferCamera.right - outputBufferCamera.left;
            const cameraHeight = outputBufferCamera.top - outputBufferCamera.bottom;
            const num_pixels = outputBuffer.height * outputBuffer.width;
            setPixelArea(cameraWidth * cameraHeight / num_pixels);
            
            // remove camera helper
            const visibility_state = outputBufferCameraHelper.visible
            outputBufferCameraHelper.visible = false;
            const result = getTS();
            outputBufferCameraHelper.visible = visibility_state;
            
            return result;
        
        });
        
        const exportObj = {x:rotationDegs, y:TSs};
        downloadObjectAsJson(exportObj, "result");

    }
    
    else {
    
        // In demo mode, we do the same things, but we render stuff. We thus need to request animation frames
        let i = 0;

        const result = new Array(); 
        const animate = () => {
            const rotationDeg = rotationDegs[i];

            const percentage_complete = rotationDeg / Math.PI
            console.log(rotationDeg, `${100*percentage_complete}%`);    
            // Rotate the model
            setModelRotation(0,0,rotationDeg);
            
            // Fit the outputBufferCamera 
            fitCameraToModelFunction(outputBufferCamera);

            // For debbuging
            displayOutputBufferCamera(true);
            
            // Resize the output buffer
            resizeOutputBuffer(outputBufferCamera);

            // Get the pixel area
            const cameraWidth = outputBufferCamera.right - outputBufferCamera.left;
            const cameraHeight = outputBufferCamera.top - outputBufferCamera.bottom;
            const num_pixels = outputBuffer.height * outputBuffer.width;
            setPixelArea(cameraWidth * cameraHeight / num_pixels);

            // Show in tiny window
            renderOutputBufferCameraInTinyWindow(); 
            
            outputBufferCameraHelper.visible = false; 
            // Get the result
            result.push(getTS());
            outputBufferCameraHelper.visible = true;
    
            i++;
            if (i < rotationDegs.length) requestAnimationFrame(animate);
            if (i == rotationDegs.length) {

                // We are done!
                
                const exportObj = {x:rotationDegs, y:result};
                downloadObjectAsJson(exportObj, "result");
              
            }
        }
        requestAnimationFrame(animate); 
        
    }
    
}

const addWaveLengthChangeListener = (handler) => waveLengthListeners.push(handler);
const addModelRotationChangeListener = (handler) => modelRotationListeners.push(handler);

// Export all the setters, getters and setListneres to the ui controller.
export {addCameraChangeListener, setAutoRotation, setCameraPosition, setCameraLookAt, setModelPosition, setModelRotation, replaceModelSTL, replaceModelOBJ, setWaveLength, setPhaseShift, setPhaseAnimation, autoFitCameraToModelUI, setMaterialUI, testForA2mRadiusSphere, renderOutputBufferCameraInTinyWindow, setTargetResolution, rotationTS, addWaveLengthChangeListener, addModelRotationChangeListener, displayOutputBufferCamera, setAutoRenderToTinyWindow};

// [x] Ladda upp en modell. Typ klar, OBJ fungerar inte. 
// [x] Styra position av modellen
// [x] Styra kameran
// [x] Hur stor är varje pixel i meter? 
// [x] Origo i mitten av modellen. 
// [x] Rotation i Z-axeln på modellen. 
// [x] Input av våglängd och fas. 
// [x] Radio buttons visa intensitet, fas, eller intensitet och fas. 
// [x] fps-mätare
