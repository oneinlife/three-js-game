import * as THREE from 'three'

import firstScene from './scenes/firstScene';

import fox from './persons/fox';



const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
)
camera.position.set( 1, 3, 5 );
camera.lookAt(-1, 0, 0)

let scene, renderer, clock, foxModel;

const init = () => {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  clock = new THREE.Clock();

  scene = new THREE.Scene();
  firstScene(scene);
  fox(scene, clock).then(fox => {
    scene.add( fox.model );
    foxModel = fox;
  });
}



const animate = () => {
  requestAnimationFrame( animate );
  foxModel && foxModel.animate(clock.getDelta());
  renderer.render( scene, camera );
}

init();
animate();