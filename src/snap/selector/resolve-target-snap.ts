import type { PartSnapData } from "@/types/snap";

const resolveTargetSnap = (
  targets: Array<{ targetBrickId: number; part: PartSnapData }>,
  targerBrickId: number
): PartSnapData | null => {
  const foundTargetBrick = targets.find((target) => target.targetBrickId === targerBrickId);

  return foundTargetBrick ? foundTargetBrick.part : null;
};

export default resolveTargetSnap;
