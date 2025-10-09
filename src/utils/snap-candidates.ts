import type { SnapPoint } from "@/types/snap";

export const distanceXZ = (
  movingPoint: SnapPoint["position"],
  targetPoint: SnapPoint["position"]
) => {
  const deltaX = movingPoint[0] - targetPoint[0];
  const deltaZ = movingPoint[2] - targetPoint[2];

  return Math.hypot(deltaX, deltaZ);
};

export const filterStudTop = (snapPoints: SnapPoint[]) => {
  return snapPoints.filter((snapPoint) => snapPoint.type === "stud-top");
};

export const filterStudBottom = (snapPoints: SnapPoint[]) => {
  return snapPoints.filter((snapPoint) => snapPoint.type === "stud-bottom");
};
