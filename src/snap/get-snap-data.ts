import type { PartSnapData } from "@/types/snap";
import * as THREE from "three";
import { SNAP_REGISTRY } from "@/snap/registry";

const getSnapDataForGroup = (group: THREE.Object3D): PartSnapData | null => {
  const brickPartId = group.userData?.partId as string | undefined;

  if (!brickPartId) {
    return null;
  }

  const snapData = SNAP_REGISTRY[brickPartId];
  if (!snapData) {
    return null;
  }

  return snapData;
};

export default getSnapDataForGroup;
