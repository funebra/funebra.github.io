import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';

export function createRenderer(canvas){
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  resize(renderer);
  return renderer;
}

export function createScene(){
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0d14);
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.set(2.6, 1.8, 2.6);

  const light = new THREE.DirectionalLight(0xffffff, 1.0);
  light.position.set(3, 5, 4);
  const fill = new THREE.AmbientLight(0x5577aa, 0.25);
  scene.add(light, fill);

  return {scene, camera};
}

export function addControls(camera, renderer){
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  return controls;
}

export function makeGeometry(kind='torusKnot'){
  switch(kind){
    case 'icosahedron': return new THREE.IcosahedronGeometry(1, 1);
    case 'mobius':
      const mobius = (u,v,target)=>{
        u = u*Math.PI*2; v = (v-0.5)*0.5;
        const a = 1;
        const x = (a + v*Math.cos(u/2))*Math.cos(u);
        const y = (a + v*Math.cos(u/2))*Math.sin(u);
        const z = v*Math.sin(u/2);
        target.set(x,y,z);
      };
      return new ParametricGeometry(mobius, 200, 16);
    default:
      return new THREE.TorusKnotGeometry(0.9, 0.28, 240, 32);
  }
}

export function resize(renderer){
  const canvas = renderer.domElement;
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(640, rect.width|0);
  const h = Math.max(360, rect.height|0);
  renderer.setSize(w, h, false);
}
