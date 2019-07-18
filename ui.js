import * as dat from './dat.gui/build/dat.gui.module.js';
import * as dman from './engine.js';

const copyKeysAndVals = (obj1, obj2) => {
    for ( const [key, val] of Object.entries(obj1) ) obj2[key] = val; 
}

let ui_controller = function(){
    this.wavelength = 1;
    this.outputBufferCamera = dman.renderOutputBufferCameraInTinyWindow;
    this.autoRenderToTinyWindow = false;
    this.rotationTS = dman.rotationTS;
    this.phase = 0;
    this.targetResolution = 2000*2000;
    this.animatePhase = false;
    this.autoRotateCamera = false;
    this.material = 'phase';
    this.r2mSphereTest = dman.testForA2mRadiusSphere
    this.camera = {
        autoFitToModel: false,
        showOutputBufferCameraHelper: true,
        position:   { x: 0, y: 0, z: 25 },    
        lookAt:     { x: 0, y: 0, z: 0 }
    };    
    this.model = {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }    
    };
}

const gui = new dat.GUI();
const controller = new ui_controller();

gui.add(controller, 'rotationTS');
gui.add(controller, "targetResolution").onChange((value) => dman.setTargetResolution(value));
gui.add(controller, 'outputBufferCamera');
gui.add(controller, 'wavelength').step(0.00001).onChange((value) => dman.setWaveLength(value));
gui.add(controller, 'phase').step(0.01).onChange((value) => {dman.setPhaseShift(value);});
gui.add(controller, 'animatePhase').onChange((value) => dman.setPhaseAnimation(value));
gui.add(controller, 'autoRotateCamera').onChange((value) => dman.setAutoRotation(value));
gui.add(controller, 'autoRenderToTinyWindow').onChange((value) => dman.setAutoRenderToTinyWindow(value));

// These loops can be done a lot prettier using a for ... of ... loop
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of#Iterating_over_a_Map


// Controls for the model

const updateModelPosition = () => {
    // Apply function takes a list of arguments, i.e the array returned by Object.values
    // containing [x,y,z] and gives that array as the arguments to setModelPosition. 
    dman.setModelPosition.apply(null, Object.values(controller.model.position));    
} 
const modelFolder = gui.addFolder('Model');
const modelPositionFolder = modelFolder.addFolder('Position');
modelPositionFolder.add(controller.model.position, 'x').step(0.1).onChange(updateModelPosition);
modelPositionFolder.add(controller.model.position, 'y').step(0.1).onChange(updateModelPosition);
modelPositionFolder.add(controller.model.position, 'z').step(0.1).onChange(updateModelPosition);

gui.add(controller, 'material', ['phase', 'intensity', 'mix', 'complex']).onChange((value) => dman.setMaterialUI(value));

const updateModelRotation = () => {
     // Apply function takes a list of arguments, i.e the array returned by Object.values
    // containing [x,y,z] and gives that array as the arguments to setModelPosition. 
    dman.setModelRotation.apply(null, Object.values(controller.model.rotation));    
};
const modelRotationFolder = modelFolder.addFolder('Rotation');
modelRotationFolder.add(controller.model.rotation, 'x').step(0.01).onChange(updateModelRotation);
modelRotationFolder.add(controller.model.rotation, 'y').step(0.01).onChange(updateModelRotation);
modelRotationFolder.add(controller.model.rotation, 'z').step(0.01).onChange(updateModelRotation);

// Controls for the camera
const updateCameraPosition = () => {
    dman.setCameraPosition.apply(null, Object.values(controller.camera.position));        
}

const updateCameraLookAt = () => {
    dman.setCameraLookAt.apply(null, Object.values(controller.camera.lookAt));
}

const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(controller.camera, 'autoFitToModel').onChange((value) => dman.autoFitCameraToModelUI(value));
cameraFolder.add(controller.camera, 'showOutputBufferCameraHelper').onChange((value) => dman.displayOutputBufferCamera(value));
const cameraPositionFolder = cameraFolder.addFolder('Position');
cameraPositionFolder.add(controller.camera.position, 'x').step(0.01).onChange(updateCameraPosition);
cameraPositionFolder.add(controller.camera.position, 'y').step(0.01).onChange(updateCameraPosition);
cameraPositionFolder.add(controller.camera.position, 'z').step(0.01).onChange(updateCameraPosition);
const cameraLookAtFolder = cameraFolder.addFolder('Look at');
cameraLookAtFolder.add(controller.camera.lookAt, 'x').step(0.01).onChange(updateCameraLookAt);
cameraLookAtFolder.add(controller.camera.lookAt, 'y').step(0.01).onChange(updateCameraLookAt);
cameraLookAtFolder.add(controller.camera.lookAt, 'z').step(0.01).onChange(updateCameraLookAt);

// What to do when the camera changes position
const updateGuiCameraChange = (o) => {
    // Get the new camera position

    for (const [key, val] of Object.entries(o.target.object.position)) {
        controller.camera.position[key] = val;
    }
    
    for (var i in cameraPositionFolder.__controllers) {
        cameraPositionFolder.__controllers[i].updateDisplay();
    }
    
    for (const [key, val] of Object.entries(o.target.target)) {
        controller.camera.lookAt[key] = val;
    }

    for (var i in cameraLookAtFolder.__controllers) {
        cameraLookAtFolder.__controllers[i].updateDisplay();
    } 
} 
dman.addCameraChangeListener(updateGuiCameraChange);
dman.setAutoRotation(false);

dman.addWaveLengthChangeListener((wavelength) => {

    controller.wavelength = wavelength;
    
    gui.__controllers[3].updateDisplay();

});


dman.addModelRotationChangeListener((x,y,z) => {
    for (var i in cameraPositionFolder.__controllers) {
        controller.model.rotation.x = x;
        controller.model.rotation.y = y;
        controller.model.rotation.z = z;
        
        modelRotationFolder.__controllers[i].updateDisplay();
    }   
});


// Upload a model
const model_input = document.getElementById('model_upload');
model_input.addEventListener('change', () => {
    
    // Get the file
    const file = model_input.files[0];
    const extension = file.name.match(/\.[0-9a-z]+$/i)[0]; 
    console.log(extension);
    // Generate a pseudourl to the file. 
    const src = window.URL.createObjectURL(file);
    // Try to replace the model
    switch(extension) {
        case ".stl": {
            dman.replaceModelSTL(src);
            break;
        }
        case ".obj": {
            dman.replaceModelOBJ(src);
            break;
        }
        default: alert("Ivalid file format");
    }
});

const routineFolder = gui.addFolder("Routines");
routineFolder.add(controller, 'r2mSphereTest');

