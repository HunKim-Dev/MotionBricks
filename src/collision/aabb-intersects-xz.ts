import * as THREE from "three";

const aabbIntersectsXZ = (sourceBox: THREE.Box3, compareBox: THREE.Box3): boolean => {
  const xOverlap = sourceBox.max.x >= compareBox.min.x && sourceBox.min.x <= compareBox.max.x;
  const zOverlap = sourceBox.max.z >= compareBox.min.z && sourceBox.min.z <= compareBox.max.z;

  return xOverlap && zOverlap;
};

export default aabbIntersectsXZ;
