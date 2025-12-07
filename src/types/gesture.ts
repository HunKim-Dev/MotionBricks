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

export type CursorOverlay = {
  show(): void;
  hide(): void;
  move(x: number, y: number): void;
  destroy(): void;
};

export type ClosedFistToggleOptions = {
  onEnter: () => void;
  onExit: () => void;
};

export type VictoryToggleOptions = {
  onEnter: () => void;
  onExit: () => void;
};
