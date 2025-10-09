import * as THREE from "three";
import type { WorldOffset } from "@/types/snap";

const applyWorldDelta = (movingBrick: THREE.Object3D, worldOffset: WorldOffset): void => {
  const offsetVector = new THREE.Vector3(...worldOffset);

  movingBrick.position.add(offsetVector);
};

export default applyWorldDelta;
