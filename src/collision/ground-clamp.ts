import * as THREE from "three";

const groundClamp = (
  object: THREE.Object3D,
  groundY: number = 0,
  liftMargin: number = 0
): number => {
  object.updateWorldMatrix(true, true);

  const worldGroundBox = new THREE.Box3().setFromObject(object);
  const depthBelowGround = groundY + liftMargin - worldGroundBox.min.y;

  if (depthBelowGround > 0) {
    object.position.y += depthBelowGround;
    return depthBelowGround;
  }

  return 0;
};

export default groundClamp;
