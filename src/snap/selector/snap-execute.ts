import * as THREE from "three";
import type { PartSnapData, SnapCandidiate, WorldOffset } from "@/types/snap";
import selectCandidate from "@/snap/selector/select-candidate";
import resolveTargetSnap from "@/snap/selector/resolve-target-snap";
import computeSnapTransform from "@/snap/offset/compute-snap-transform";
import applyWorldDelta from "@/snap/offset/apply-world-delta";
import groundClamp from "@/collision/ground-clamp";
import { GROUND_Y_LEVEL, GROUND_CLEARANCE } from "config/brick-config";

const snapExecute = (
  movingBrickObject: THREE.Object3D,
  movingBrickSnapWorld: PartSnapData,
  targetSnapWorldList: Array<{ targetBrickId: number; part: PartSnapData }>,
  candidates: SnapCandidiate[]
): WorldOffset | null => {
  const selectedCandidate = selectCandidate(candidates);

  if (!selectedCandidate) return null;

  const targetSnapWorld = resolveTargetSnap(targetSnapWorldList, selectedCandidate.targetBrickId);

  if (!targetSnapWorld) return null;

  const snapOffset = computeSnapTransform(movingBrickSnapWorld, targetSnapWorld, selectedCandidate);

  applyWorldDelta(movingBrickObject, snapOffset);
  groundClamp(movingBrickObject, GROUND_Y_LEVEL, GROUND_CLEARANCE);

  return snapOffset;
};

export default snapExecute;
