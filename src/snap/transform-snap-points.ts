import * as THREE from "three";
import { SnapPoint, PartSnapData } from "@/types/snap";
import getSnapDataForGroup from "@/snap/get-snap-data";

const transformSnapPoints = (group: THREE.Object3D): PartSnapData | null => {
  group.updateWorldMatrix(true, false);

  const snapBrickDefinition = getSnapDataForGroup(group);
  if (!snapBrickDefinition) return null;

  const worldMatrix = group.matrixWorld;
  const normalMatrix = new THREE.Matrix3().getNormalMatrix(worldMatrix);

  const currentSnapPosition = new THREE.Vector3();
  const currentSnapNormal = new THREE.Vector3();

  const worldPoints: SnapPoint[] = snapBrickDefinition.snapPoints.map((point) => {
    currentSnapPosition.set(...point.position).applyMatrix4(worldMatrix);
    currentSnapNormal
      .set(...point.normal)
      .applyMatrix3(normalMatrix)
      .normalize();

    return {
      ...point,
      position: [currentSnapPosition.x, currentSnapPosition.y, currentSnapPosition.z],
      normal: [currentSnapNormal.x, currentSnapNormal.y, currentSnapNormal.z],
    };
  });

  return {
    ...snapBrickDefinition,
    snapPoints: worldPoints,
  };
};

export default transformSnapPoints;
