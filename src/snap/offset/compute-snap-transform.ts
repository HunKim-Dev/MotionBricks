import { PartSnapData, SnapCandidiate, SnapPoint, WorldOffset } from "@/types/snap";

const computeSnapTransform = (
  movingBrickSnap: PartSnapData,
  targetBrickSnap: PartSnapData,
  candidate: SnapCandidiate
): WorldOffset => {
  const fisrtPair = candidate.matchedPairs[0];

  const findById = (points: SnapPoint[], id: string): SnapPoint | undefined =>
    points.find((point) => point.id === id);

  const movingPoint = findById(movingBrickSnap.snapPoints, fisrtPair.movingBrickId);
  const targetPonit = findById(targetBrickSnap.snapPoints, fisrtPair.targetBrickId);

  const deltaX = fisrtPair.worldOffset[0];
  const deltaZ = fisrtPair.worldOffset[2];

  const deltaY = movingPoint && targetPonit ? targetPonit.position[1] - movingPoint.position[1] : 0;

  return [deltaX, deltaY, deltaZ];
};

export default computeSnapTransform;
