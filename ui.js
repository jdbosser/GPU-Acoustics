import * as dat from './dat.gui/build/dat.gui.module.js';
import * as dman from './script2.js';

const copyKeysAndVals = (obj1, obj2) => {
    for ( const [key, val] of Object.entries(obj1) ) obj2[key] = val; 
}

let ui_controller = function(){
    this.wavelength = 1;
    this.autoRotateCamera = false;
    this.camera = {
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

gui.add(controller, 'wavelength');
gui.add(controller, 'autoRotateCamera').onChange((value) => dman.setAutoRotation(value));

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

const updateModelRotation = () => {
     // Apply function takes a list of arguments, i.e the array returned by Object.values
    // containing [x,y,z] and gives that array as the arguments to setModelPosition. 
    dman.setModelRotation.apply(null, Object.values(controller.model.rotation));    
};
const modelRotationFolder = modelFolder.addFolder('Rotation');
modelRotationFolder.add(controller.model.rotation, 'x').step(0.1).onChange(updateModelRotation);
modelRotationFolder.add(controller.model.rotation, 'y').step(0.1).onChange(updateModelRotation);
modelRotationFolder.add(controller.model.rotation, 'z').step(0.1).onChange(updateModelRotation);

// Controls for the camera
const updateCameraPosition = () => {
    dman.setCameraPosition.apply(null, Object.values(controller.camera.position));        
}

const updateCameraLookAt = () => {
    dman.setCameraLookAt.apply(null, Object.values(controller.camera.lookAt));
}

const cameraFolder = gui.addFolder('Camera');
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
dman.setCameraChangeListener(updateGuiCameraChange);
dman.setAutoRotation(false);


