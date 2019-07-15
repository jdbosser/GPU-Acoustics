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
    setPixelArea(pixelarea);

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
controls.autoRotate = false;
controls.update();

// If we change the controls by mouse or arrows, make sure to rerender. 
controls.addEventListener("change", () => renderer.render(scene, camera));

// Add stats
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);
stats.dom.style.cssText = 'position:fixed;bottom:0;left:0;cursor:pointer;opacity:0.9;z-index:10000'

let animatePhase = false;
// Animation loop for the orbit controls, and pretty much everything
const animate = (time) => {
    stats.begin();
    
    if (controls.autoRotate || animatePhase) {
        if(model && animatePhase && model.material.uniforms.phase) {
           setPhase(time/1000);
        }
        renderer.render(scene, camera);
        controls.update();
    
        console.log("animating");    
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
        const rotation = new THREE.Euler(-x,-y,-z, 'XYZ');
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
        const rotation = new THREE.Euler(-x,-y,-z, 'XYZ');
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
    // The material needs to know about changes in wavelength, 
    // phase and model rotation.
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

// If we switch model, set the material to the current material
// current material changes based on UI input. 
// set default to phase material.
let currentMaterial = phaseMaterial;

// Whenever the view is updated, we need to recalculate the pixel area. 
const setCameraView = (width, height) => {
    camera.left = width / -2;
    camera.right = width / 2; 
    camera.top = height / 2;
    camera.bottom = height / -2;
    camera.zoom = 1;
    
    camera.updateProjectionMatrix();

    // Calculate new pixel area
    const num_pixels = canvas.clientWidth*canvas.clientHeight;
    const pixelarea = (width*height)/num_pixels;
    // Notifies all pixel area change listeners
    setPixelArea(pixelarea);
};

// Update the camera to fit model
const fitCameraToModelFunction = (camera, model, canvas) => {
    
    // Reset model position 
    setModelPosition(0,0,0);    
    // Make sure camera looks at the model
    setCameraLookAt(0,0,0);
    
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
    const aspectRatio = canvas.clientWidth/canvas.clientHeight;
    const objAspectRatio = width/height;
    if (objAspectRatio < aspectRatio) {
        // Keep the height
        width = aspectRatio * height;
    }
    else height = width / aspectRatio;
    
    // Since I couldnt get the bounding box to not translate while 
    // rotating the object, the object moves out of camera view by a little bit.
    // This scaling ensures that the whole model is in view. 
    // Sorry for the ugly hack. Please change if (this whole function) if 
    // you ever figure out how to do this correctly.
    const scale = 1.1;
    width = width * scale;
    height = height * scale;
    
    setCameraView(width, height);
     
    camera.position.set(0,boundingBox.max.y*scale, 0);
};


const renderToBuffer = () => {
   
    // Documentiation on how to read pixels. 
    // https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/readPixels
     
    // Ultimately, this is done the same way as have been done in following threejs example
    // https://threejs.org/examples/?q=read#webgl_read_float_buffer
   
    // There are two places from the example that I have copied shamelessly that
    // was key to make this work
    // Line 104: https://github.com/mrdoob/three.js/blob/master/examples/webgl_read_float_buffer.html#L104
    // Line(s) 202-216: https://github.com/mrdoob/three.js/blob/master/examples/webgl_read_float_buffer.html#L202
     
    // Render to the rendertarget. 
    renderer.setRenderTarget(outputBuffer);
    renderer.clear(); // Do not know what this line does. 
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);
  
    // Create array for the storing the output of the GPU
    let read = new Float32Array(4 * canvas.clientWidth * canvas.clientHeight);
    // Read to the array
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
    if ( autoFitCameraToModel ) fitCameraToModelFunction(camera, model, canvas)
});

// Toggle autofit to model for the UI
// Could probably be named better so that the above function can 
// have a better name
const autoFitCameraToModelUI = (bool) => {

    autoFitCameraToModel = bool;
    if (autoFitCameraToModel) {
        fitCameraToModelFunction(camera, model, canvas);
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

    if ( autoFitCameraToModel ) fitCameraToModelFunction(camera, model, canvas);
    else setCameraView(width, height);
    
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
        default: 
            alert('Invalid material');
    }
    replaceMaterial(model, currentMaterial);
    renderer.render(scene, camera);
};


const getTS = () => {
    
    
    // Caused crash of tab 
    /*function zipWith(λ,xs,ys) {
        if(xs.length == 0) return []
        else return [λ(xs[0],ys[0])].concat(zipWith(λ,xs.slice(1),ys.slice(1)));
    };*/

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
    //setMaterialUI('mix');
    //fitCameraToModelFunction(camera, model, canvas);
    // Get the output
    let read = renderToBuffer();

    const [r,g,b,a] = extractFourChannels(read);
    
    const multiplyBy2pi = (val) => val*2*Math.PI; // Maybe add negative sign here
    let intensity = r;
    let phase = g.map(multiplyBy2pi);
   
    let cos_part = phase.map((angle) => Math.cos(angle));
    let sin_part = phase.map((angle) => Math.sin(angle));
    
    const multiplyArrs = (arr1, arr2) => {
        const output = new Float32Array(arr1.length);
        for(let i = 0; i < arr1.length; i++) {
            output[i] = arr1[i]*arr2[i];
        };
        return output;
    };
    
    let real_part = multiplyArrs(intensity, cos_part);
    let imag_part = multiplyArrs(intensity, sin_part);

    let sum = (x,y) => x + y;
    let real_sum = real_part.reduce(sum, 0);
    let imag_sum = imag_part.reduce(sum, 0);

    console.log('Wavelen', getWaveLength());

    // Multiply with scaling
    real_sum *= getPixelArea()/getWaveLength();
    imag_sum *= getPixelArea()/getWaveLength();

    // Finally, get the absolute value
    let TS = 10 * Math.log10(real_sum**2 + imag_sum**2);

    console.log(TS);

    return TS
};

// Finally, add a default model to our scene. 
replaceModelSTL('./ShaderFood/P677_shell(fine).stl', () => {
    console.log("Default model added to scene");
});


// https://stackoverflow.com/a/30800715/1939970
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
    // Create the sphere
    const geometry = new THREE.SphereGeometry(2, 128, 128);
    const material = new THREE.MeshLambertMaterial({color: 0xff5533});   
    const sphere = new THREE.Mesh(geometry, material);
    // Place the model and material to our super cool material
    replaceModel(sphere);
    // Set the material to our cool material
    setMaterialUI('mix');
    // Make sure that the model fits optimally in the camera
    fitCameraToModelFunction(camera, model, canvas);
    renderer.render(scene, camera);
    
    const num_calc = 100;
    alert(`
Programmet kommer nu att göra ett svep av olika frekvenser infallandes mot en sfär med en 2 meters radie. Svepet består av ${num_calc} olika beräkningar, och kan därför ta lite tid. Webläsarfönstret kan temporärt frysa under tiden beräkningarna görs. Efter att beräkningarna är klara kommer en json fil med frekvenser och beräknad TS att laddas ner. 
    `);

    const linspace = (min, max, num) => {
        const output = new Array(num);
        const delta = (max - min) / (num-1);
        for (let i = 0; i < num; i++) {
            output[i] = min + delta*i;
        }   
        return output; 
    };
    
    const freqs = linspace(1,Math.log10(50000),num_calc).map((v) => 10**v);
    const wavelengths = freqs.map((f) => 1500/f);
    
    const TSs = wavelengths.map((w) => {
        setWaveLength2(w);
        return getTS();    
    });
    const exportObj = {x:freqs, y:TSs};
    downloadObjectAsJson(exportObj, "2msphereDiffFreqsTS");
};

// Export all the setters, getters and setListneres to the ui controller.
export {setCameraChangeListener, setAutoRotation, setCameraPosition, setCameraLookAt, setModelPosition, setModelRotation, replaceModelSTL, replaceModelOBJ, setWaveLength, setPhaseShift, setPhaseAnimation, autoFitCameraToModelUI, setMaterialUI, testForA2mRadiusSphere};

// [x] Ladda upp en modell. Typ klar, OBJ fungerar inte. 
// [x] Styra position av modellen
// [x] Styra kameran
// [x] Hur stor är varje pixel i meter? 
// [x] Origo i mitten av modellen. 
// [x] Rotation i Z-axeln på modellen. 
// [x] Input av våglängd och fas. 
// [x] Radio buttons visa intensitet, fas, eller intensitet och fas. 
// [x] fps-mätare
