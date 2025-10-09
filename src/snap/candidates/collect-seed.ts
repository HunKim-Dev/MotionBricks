import { SnapPoint, PartSnapData, SnapCandidiate, SnapOptions } from "@/types/snap";
import { filterStudTop, filterStudBottom } from "@/utils/snap-candidates";
import buildCandidateSeed from "@/snap/candidates/build-seed";

const collectSeed = (
  movingBrickSnap: PartSnapData,
  targetBrickList: Array<{ targetBrickId: number; part: PartSnapData }>,
  snapOptions: SnapOptions
): SnapCandidiate[] => {
  const movingStudTops: SnapPoint[] = filterStudTop(movingBrickSnap.snapPoints);

  const snapCandidates: SnapCandidiate[] = [];

  if (movingStudTops.length === 0) return snapCandidates;

  for (const targetBrick of targetBrickList) {
    const targetStudBottoms: SnapPoint[] = filterStudBottom(targetBrick.part.snapPoints);

    if (targetStudBottoms.length === 0) continue;

    for (const movingStud of movingStudTops) {
      for (const targetStud of targetStudBottoms) {
        const candidate = buildCandidateSeed(
          movingStudTops,
          targetStudBottoms,
          movingStud,
          targetStud,
          snapOptions,
          targetBrick.targetBrickId
        );

        if (candidate) {
          snapCandidates.push(candidate);
        }
      }
    }
  }

  snapCandidates.sort((current, next) => {
    if (next.matchCount !== current.matchCount) return next.matchCount - current.matchCount;
    if (current.isFullStud !== next.isFullStud) return current.isFullStud ? -1 : 1;

    return current.averageError - next.averageError;
  });

  return snapCandidates;
};

export default collectSeed;
