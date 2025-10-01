export type SnapPoint = {
  id: string;
  type: "stud-top" | "stud-bottom";
  position: [number, number, number];
  normal: [number, number, number];
};

export type PartSnapData = {
  partId: string;
  version: string;
  unit: "LDU";
  coordinateFrame: "part-local";
  snapPoints: SnapPoint[];
};
