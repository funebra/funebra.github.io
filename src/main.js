import * as THREE from 'three';
import { createRenderer, createScene, addControls, makeGeometry, resize } from './scene.js';

const canvas = document.getElementById('funebra-canvas');
const renderer = createRenderer(canvas);
const {scene, camera} = createScene();
const controls = addControls(camera, renderer);

let material = new THREE.MeshStandardMaterial({metalness:0.5, roughness:0.2});
let mesh = new THREE.Mesh(makeGeometry('torusKnot'), material);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({wireframe:true, color:0xffffff, opacity:0.25, transparent:true});
let wire = new THREE.Mesh(mesh.geometry.clone(), wireMat);
scene.add(wire);

const shapeSel = document.getElementById('shapeSel');
const wireChk  = document.getElementById('wireChk');
const spinChk  = document.getElementById('spinChk');
const snapBtn  = document.getElementById('snapBtn');
const thumbs   = document.getElementById('thumbs');

shapeSel.addEventListener('change', ()=>{
  const g = makeGeometry(shapeSel.value);
  mesh.geometry.dispose(); mesh.geometry = g;
  wire.geometry.dispose(); wire.geometry = g.clone();
});

wireChk.addEventListener('change', ()=> wire.visible = wireChk.checked);
wire.visible = false;

snapBtn.addEventListener('click', ()=>{
  const dataURL = renderer.domElement.toDataURL('image/png');
  const img = new Image(); img.src = dataURL; img.width = 140; img.height = 100;
  thumbs.prepend(img);
  // Optional: trigger download
  const a = document.createElement('a');
  a.href = dataURL; a.download = 'funebra-snapshot.png'; a.click();
});

function onWindowResize(){
  resize(renderer);
  camera.aspect = renderer.domElement.width / renderer.domElement.height;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', onWindowResize);
onWindowResize();

let t = 0;
function animate(){
  requestAnimationFrame(animate);
  if (spinChk.checked){ t += 0.01; mesh.rotation.y = t; wire.rotation.y = t; }
  controls.update();
  renderer.render(scene, camera);
}
animate();
