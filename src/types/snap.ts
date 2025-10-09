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

export type SnapPairMatch = {
  movingBrickId: string;
  targetBrickId: string;
  worldOffset: [number, number, number];
  errorXZ: number;
};

export type SnapCandidiate = {
  targetBrickId: number;
  matchedPairs: SnapPairMatch[];
  matchCount: number;
  totalStuds: number;
  isFullStud: boolean;
  averageError: number;
};

export type SnapOptions = {
  maxXZ: number;
  minDotY: number;
};

export type WorldOffset = [number, number, number];
