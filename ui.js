import * as dat from './dat.gui/build/dat.gui.module.js';
import * as dman from './engine.js';

const copyKeysAndVals = (obj1, obj2) => {
    for ( const [key, val] of Object.entries(obj1) ) obj2[key] = val; 
}

let ui_controller = function(){
    this.wavelength = 1;
    this.outputBufferCamera = () => {
        dman.renderOutputBufferCameraInTinyWindow();
        
        // open the canvas in a new window
        
        // Get the canvas
        const c = document.getElementById("invisibleCanvas");
        window.open(c.toDataURL("image/png"));
    };
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
        position:   { x: 0, y: 50, z: 0 },    
        lookAt:     { x: 0, y: 0, z: 0 }
    };    
    this.model = {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }    
    };
}


const gui = new dat.GUI({width: 300});
const controller = new ui_controller();

// The controls in the top right corner. 
gui.add(controller, "targetResolution").name("Target number of pixels").onChange((value) => dman.setTargetResolution(value));
gui.add(controller, 'outputBufferCamera').name("Dump GPU to image");
gui.add(controller, 'wavelength').name("Wavelength λ").step(0.001).onChange((value) => dman.setWaveLength(value));
gui.add(controller, 'phase').name("Phase shift β").step(0.01).onChange((value) => {dman.setPhaseShift(value);});
gui.add(controller, 'animatePhase').name("Animate phase shift").onChange((value) => dman.setPhaseAnimation(value));
gui.add(controller, 'autoRotateCamera').name("Auto rotate camera").onChange((value) => dman.setAutoRotation(value));
gui.add(controller, 'autoRenderToTinyWindow').name("Auto output GPU to window").onChange((value) => dman.setAutoRenderToTinyWindow(value));

// Whenever the program changes the wavelength (in for example the routines) 
// we want to update the wavelength ui to reflect the change. 
dman.addWaveLengthChangeListener((wavelength) => {

    controller.wavelength = wavelength;
    
    gui.__controllers[2].updateDisplay();

});

// We also want to be notified about changes to the phase
dman.addPhaseChangeListener((phase) => {
    
    controller.phase = phase;

    gui.__controllers[3].updateDisplay();

});

// Controls for the model
const updateModelPosition = () => {
    // Apply function takes a list of arguments, i.e the array returned by Object.values
    // containing [x,y,z] and gives that array as the arguments to setModelPosition. 
    dman.setModelPosition.apply(null, Object.values(controller.model.position));    
} 
const updateModelRotation = () => {
    // Apply function takes a list of arguments, i.e the array returned by Object.values
    // containing [x,y,z] and gives that array as the arguments to setModelPosition. 
    dman.setModelRotation.apply(null, Object.values(controller.model.rotation));    
};

// All controls for the model folder
const modelFolder = gui.addFolder('Model');
modelFolder.add(controller.model.rotation, 'x').name("Rotation x").step(0.01).onChange(updateModelRotation);
modelFolder.add(controller.model.rotation, 'y').name("Rotation y").step(0.01).onChange(updateModelRotation);
modelFolder.add(controller.model.rotation, 'z').name("Rotation z").step(0.01).onChange(updateModelRotation);
modelFolder.add(controller, 'material', ['phase', 'intensity', 'mix', 'complex']).onChange((value) => dman.setMaterialUI(value));

// If anything in engine.js changes the model rotation we want to update the controls
// to reflect that change.
dman.addModelRotationChangeListener((x,y,z) => {
    for (var i in cameraPositionFolder.__controllers) {
        controller.model.rotation.x = x;
        controller.model.rotation.y = y;
        controller.model.rotation.z = z;
        
        modelFolder.__controllers[i].updateDisplay();
    }   
});



// Controls for the camera
// The apply function takes an array [x,y,z] and uses them as input for the function
// f(x,y,z). The Object.values creates an array [x,y,z] from the object properties. 
// This is some ninja code that makes it this program harder to read. 
const updateCameraPosition = () => {
    dman.setCameraPosition.apply(null, Object.values(controller.camera.position));        
}

const updateCameraLookAt = () => {
    dman.setCameraLookAt.apply(null, Object.values(controller.camera.lookAt));
}

// All controls in the camera folder
const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(controller.camera, 'showOutputBufferCameraHelper').name("Show GPU Camera").onChange((value) => dman.displayOutputBufferCamera(value));
const cameraPositionFolder = cameraFolder.addFolder('Position');
cameraPositionFolder.add(controller.camera.position, 'x').step(0.01).onChange(updateCameraPosition);
cameraPositionFolder.add(controller.camera.position, 'y').step(0.01).onChange(updateCameraPosition);
cameraPositionFolder.add(controller.camera.position, 'z').step(0.01).onChange(updateCameraPosition);
const cameraLookAtFolder = cameraFolder.addFolder('Look at');
cameraLookAtFolder.add(controller.camera.lookAt, 'x').step(0.01).onChange(updateCameraLookAt);
cameraLookAtFolder.add(controller.camera.lookAt, 'y').step(0.01).onChange(updateCameraLookAt);
cameraLookAtFolder.add(controller.camera.lookAt, 'z').step(0.01).onChange(updateCameraLookAt);

// Whenever the user changes the camera position by arrows or mouse, we want to 
// update the controls to reflect the camera changes.

// Function that updates the controls. 
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

// Add the listener. Whenever the camera changes, we update the controls 
// with above function. 
dman.addCameraChangeListener(updateGuiCameraChange);

// Routine folder
const routineFolder = gui.addFolder("Routines");
routineFolder.add(controller, 'r2mSphereTest').name("r = 2m sphere test");
routineFolder.add(controller, 'rotationTS').name("TS for every degree of rotation");
// Upload a model
// This code selects a file and creates a temporary url for the file on the 
// computer, and then gives that url as the source for an STL or OBJ. 

// Find the "upload button". 
const model_input = document.getElementById('model_upload');

// What to do when the button is clicked: 
model_input.addEventListener('change', () => {
     
    // Get the file
    const file = model_input.files[0];
    const extension = file.name.match(/\.[0-9a-z]+$/i)[0]; 

    // Generate an URL to the file. 
    const src = window.URL.createObjectURL(file);

    // Try to replace the model
    switch(extension) {
        case ".stl": {
            dman.replaceModelSTL(src);
            break;
        }
        case ".obj": {
            alert(".obj file support removed.");
            //dman.replaceModelOBJ(src);
            break;
        }
        default: alert("Ivalid file format");
    }
});
