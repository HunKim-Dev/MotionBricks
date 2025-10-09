import type { SnapCandidiate } from "@/types/snap";

const compareSnapCandidate = (current: SnapCandidiate, next: SnapCandidiate) => {
  if (next.matchCount !== current.matchCount) return next.matchCount - current.matchCount;
  if (current.isFullStud !== next.isFullStud) return current.isFullStud ? -1 : 1;

  return current.averageError - next.averageError;
};

export default compareSnapCandidate;
