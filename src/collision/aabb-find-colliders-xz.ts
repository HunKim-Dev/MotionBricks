import * as THREE from "three";
import aabbCompute from "./aabb-compute";
import aabbIntersectsXz from "./aabb-intersects-xz";

const aabbFindCollidersXZ = (
  movingBrick: THREE.Object3D,
  allBricks: THREE.Object3D[],
  epsilon: number = 0
): THREE.Object3D[] => {
  const movingBrickBox = aabbCompute(movingBrick);
  const collidedBricks: THREE.Object3D[] = [];

  if (epsilon > 0) {
    movingBrickBox.min.x -= epsilon;
    movingBrickBox.max.x += epsilon;
    movingBrickBox.min.z -= epsilon;
    movingBrickBox.max.z += epsilon;
  }

  for (const othersBrick of allBricks) {
    if (!othersBrick || othersBrick === movingBrick) continue;

    const otherBrickBox = aabbCompute(othersBrick);

    if (epsilon > 0) {
      otherBrickBox.min.x -= epsilon;
      otherBrickBox.max.x += epsilon;
      otherBrickBox.min.z -= epsilon;
      otherBrickBox.max.z += epsilon;
    }

    const intersects = aabbIntersectsXz(movingBrickBox, otherBrickBox);

    if (intersects) {
      collidedBricks.push(othersBrick);
    }

    const intersectsXZ = aabbIntersectsXz(movingBrickBox, otherBrickBox);

    if (intersectsXZ) {
      collidedBricks.push(othersBrick);
    }
  }

  return collidedBricks;
};

export default aabbFindCollidersXZ;
