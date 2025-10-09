import * as THREE from "three";

const aabbCompute = (group: THREE.Object3D): THREE.Box3 => {
  group.updateWorldMatrix(true, true);

  const aabbBox = new THREE.Box3().setFromObject(group);
  return aabbBox;
};

export default aabbCompute;
