import * as THREE from "three";
import aabbCompute from "./aabb-compute";
import aabbIntersects3d from "./aabb-intersects-3d";

const aabbFindColliders3D = (
  movingBrick: THREE.Object3D,
  allBricks: THREE.Object3D[]
): THREE.Object3D[] => {
  const movingBrickBox = aabbCompute(movingBrick);
  const collidedBricks: THREE.Object3D[] = [];

  for (const othersBrick of allBricks) {
    if (!othersBrick || othersBrick === movingBrick) continue;

    const otherBrickBox = aabbCompute(othersBrick);

    if (aabbIntersects3d(movingBrickBox, otherBrickBox)) {
      collidedBricks.push(othersBrick);
    }
  }

  return collidedBricks;
};

export default aabbFindColliders3D;
