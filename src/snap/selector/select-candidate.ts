import type { SnapCandidiate } from "@/types/snap";
import compareSnapCandidate from "@/snap/selector/compare-snap-candidate";

const selectCandidate = (candidates: SnapCandidiate[]): SnapCandidiate | null => {
  if (!candidates || candidates.length === 0) return null;

  const sorted = [...candidates].sort(compareSnapCandidate);

  return sorted[0] ?? null;
};

export default selectCandidate;
