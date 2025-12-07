import * as THREE from "three";

type BrickObject = THREE.Object3D & {
  userData: { partId?: string };
};

export const getBrickRoot = (object: THREE.Object3D): THREE.Object3D => {
  const hasPartId = (current: THREE.Object3D): current is BrickObject => {
    return typeof (current as BrickObject).userData?.partId === "string";
  };

  const findBrickRoot = (current: THREE.Object3D | null): THREE.Object3D => {
    if (current === null) return object;
    if (hasPartId(current)) return current;

    return findBrickRoot(current.parent);
  };

  return findBrickRoot(object);
};
