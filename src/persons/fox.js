import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import foxGLB from '../../static/models/fox.glb';

const loader = new GLTFLoader();
let fox = null;

class Fox {
  constructor(model, animations) {
    model.traverse( object => {
      object.isMesh && (object.castShadow = true);
    });
    this.model = model;
    this.mixer = new THREE.AnimationMixer( model );
    const runAction = this.mixer.clipAction( animations[ 1 ] );
    const waitingAction = this.mixer.clipAction( animations[ 2 ] );
    this.actions = { waitingAction, runAction };
    Object.values(this.actions).forEach( action => {
			action.play();
      action.paused = true;
		});
    this.currentAction = waitingAction;
    this.currentAction.paused = false;
    window.addEventListener('keydown', this.run.bind(this));
    window.addEventListener('keyup', this.wait.bind(this));
  }

  animate(clockDelta) {
    this.mixer.update( clockDelta );
  }

  run({ key }) {
    if (key === 'w') {
      this.currentAction.paused = true;
      this.currentAction = this.actions.runAction;
      this.currentAction.paused = false;
    }
  }

  wait({ key }) {
    if (key === 'w') {
      this.currentAction.paused = true;
      this.currentAction = this.actions.waitingAction;
      this.currentAction.paused = false;
    }
  }
}

const load = () => new Promise((resolve, reject) => {
  loader.load(
    foxGLB,
    gltf => { 
      resolve({ model: gltf.scene, animations: gltf.animations })
    },
    undefined,
    error => { reject(error) }
  );
});

export default (scene, mixer) => 
  load()
    .then(({ model, animations }) => {
      return new Fox(model, animations);
    })
    .catch(err => console.error(err))
