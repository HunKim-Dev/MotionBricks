import * as THREE from "three";

const aabbIntersects3D = (sourceBox: THREE.Box3, compareBox: THREE.Box3): boolean => {
  return sourceBox.intersectsBox(compareBox);
};

export default aabbIntersects3D;
