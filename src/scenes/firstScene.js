import * as THREE from 'three';
  
export default (scene) => {
  scene.background = new THREE.Color(0xf0f0f0)

  const gridHelper = new THREE.GridHelper(1000, 20)
  scene.add(gridHelper)

  var geometry = new THREE.PlaneBufferGeometry(100, 100)
  //geometry.rotateX(-Math.PI / 2)

  const plane = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ visible: false })
  )
  scene.add(plane)

  const ambientLight = new THREE.AmbientLight(0x606060)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff)
  directionalLight.position.set(1, 0.75, 0.5).normalize()
  scene.add(directionalLight)
}

