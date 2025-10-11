export type Keypoint = { x: number; y: number; z: number; visibility: number };

export type Landmarks = Keypoint[];

export type GestureCategory = {
  categoryName: string;
  score: number;
  displayName?: string;
};

export type RecognizeResult = {
  landmarks?: Landmarks[];
  gestures: GestureCategory[][];
  handednesses?: { displayName: string; score: number }[][];
};
