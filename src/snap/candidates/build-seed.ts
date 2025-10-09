import { SnapPoint, SnapCandidiate, SnapOptions } from "@/types/snap";
import { distanceXZ } from "@/utils/snap-candidates";

const buildCandidateSeed = (
  movingStudTopList: SnapPoint[],
  targetStudBottomList: SnapPoint[],
  seedTop: SnapPoint,
  seedBottom: SnapPoint,
  options: SnapOptions,
  targetBrickId: number
): SnapCandidiate | null => {
  const deltaX = seedBottom.position[0] - seedTop.position[0];
  const deltaZ = seedBottom.position[2] - seedTop.position[2];

  const matchedPairs: SnapCandidiate["matchedPairs"] = [];
  const usedBottomIds: string[] = [];

  const seedExpected: [number, number, number] = [
    seedTop.position[0] + deltaX,
    seedTop.position[1],
    seedTop.position[2] + deltaZ,
  ];

  const seedError = distanceXZ(seedExpected, seedBottom.position);

  if (seedError <= options.maxXZ) {
    matchedPairs.push({
      movingBrickId: seedTop.id,
      targetBrickId: seedBottom.id,
      worldOffset: [deltaX, 0, deltaZ],
      errorXZ: seedError,
    });
    usedBottomIds.push(seedBottom.id);
  }

  for (const top of movingStudTopList) {
    if (top.id === seedTop.id) continue;

    const expected: [number, number, number] = [
      top.position[0] + deltaX,
      top.position[1],
      top.position[2] + deltaZ,
    ];

    let bestMatch: { targetStud: SnapPoint; distanceErrorXZ: number } | null = null;

    for (const targetStud of targetStudBottomList) {
      const alreadyUsed = usedBottomIds.includes(targetStud.id);

      if (alreadyUsed) continue;

      const distanceErrorXZ = distanceXZ(expected, targetStud.position);

      if (distanceErrorXZ > options.maxXZ) continue;
      if (!bestMatch || distanceErrorXZ < bestMatch.distanceErrorXZ)
        bestMatch = { targetStud, distanceErrorXZ };
    }

    if (bestMatch) {
      matchedPairs.push({
        movingBrickId: top.id,
        targetBrickId: bestMatch.targetStud.id,
        worldOffset: [deltaX, 0, deltaZ],
        errorXZ: bestMatch.distanceErrorXZ,
      });

      usedBottomIds.push(bestMatch.targetStud.id);
    }
  }

  const totalStuds = movingStudTopList.length;
  const matchCount = matchedPairs.length;

  if (matchCount === 0) {
    return null;
  }

  let totalError = 0;

  for (const pair of matchedPairs) {
    totalError += pair.errorXZ;
  }

  const averageError = totalError / matchCount;
  const isFullStud = matchCount === totalStuds;

  return {
    targetBrickId,
    matchedPairs,
    matchCount,
    totalStuds,
    isFullStud,
    averageError,
  };
};

export default buildCandidateSeed;
