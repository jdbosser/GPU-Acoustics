/* 'use strict'

// Helper function to get a Orthographic camera. 
const getOrthographicCamera = canvas => {

    const width = canvas.clientWidth/10; 
    const height = canvas.clientHeight/10;
    const near = 0.01;
    const far = 100;
    
    const camera = new THREE.OrthographicCamera(
        width / - 2, width / 2, 
        height / 2, height / - 2);
     
    camera.position.y = 2;
    camera.up.set(0,0,1);
    return camera;

};

const getCamera = canvas => getOrthographicCamera(canvas);  

const setRendererSize = (renderer, canvas) => renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

const scene  = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // Set the shader background to black.

const renderer = new THREE.WebGLRenderer({canvas});

setRendererSize(renderer, canvas); // We want the renderer to have the same size as our canvas

const camera = getCamera(canvas);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

renderer.render(scene,camera)
*/

'use strict';

/* global THREE */

const canvas = document.getElementById("c");
  const renderer = new THREE.WebGLRenderer({canvas});

const setRendererSize = (renderer, canvas) => renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
setRendererSize(renderer, canvas); // We want the renderer to have the same size as our canvas
const getOrthographicCamera = canvas => {
    
    const aspectRatio = canvas.clientWidth / canvas.clientHeight;

     
    const width = (aspectRatio < 1) ? 1 : aspectRatio; 
    const height = (aspectRatio < 1) ? 1/aspectRatio : 1;
    const near = 0.01;
    const far = 100;
    
    const camera = new THREE.OrthographicCamera(
        width / - 2, width / 2, 
        height / 2, height / - 2);
    camera.up.set(0,0,1);     
    camera.position.set(0,3,0);
    camera.lookAt(0,0,0);
    camera.near = 0;
    camera.updateProjectionMatrix();
    return camera;

};
const getCamera = canvas => getOrthographicCamera(canvas);  
const camera = getCamera(canvas);
const scene = new THREE.Scene();
const light = new THREE.DirectionalLight(0xffffff, 1);

const alight = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( alight );

light.position.set(0,0,1)
scene.add(light);

const boxWidth = 0.5;
const boxHeight = 0.5;
const boxDepth = 0.5;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

const material = new THREE.MeshLambertMaterial({color: 0xff0000});  // greenish blue

const cube = new THREE.Mesh(geometry, material);
cube.rotation.x = Math.PI/3;
cube.rotation.z = Math.PI/4;
cube.position.set(0.5,0,0);
scene.add(cube);




// Update the camera to fit model
const fitCameraToModel = (camera, model, canvas) => {
    let boundingBox = new THREE.Box3().setFromObject(model); 
       
    // Center object to origo
    model.position.set(0,0,0);
    
    // Keep the aspect ratio
    
    let width = boundingBox.max.x - boundingBox.min.x; 
    let height = boundingBox.max.z - boundingBox.min.z; 
     
    const aspectRatio = canvas.clientWidth/canvas.clientHeight;
    if (aspectRatio > 1) {
        // Keep the height
        width = aspectRatio * height;
    }
    else height = width / aspectRatio;
    camera.left = width / -2;
    camera.right = width / 2; 
    camera.top = height / 2;
    camera.bottom = height / -2;
    
    camera.zoom = 1;
         
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
};
const animate = (time) => {
    cube.rotation.z = time/1000;
    fitCameraToModel(camera, cube, canvas);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

