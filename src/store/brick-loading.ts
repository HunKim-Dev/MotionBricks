import { create } from "zustand";

type BrickLoadingState = {
  loadingBrickName: string | null;
  startLoading: (brickName: string) => void;
  finishLoading: () => void;
};

export const useBrickLoadingStore = create<BrickLoadingState>((set) => ({
  loadingBrickName: null,
  startLoading: (brickName) => set({ loadingBrickName: brickName }),
  finishLoading: () => set({ loadingBrickName: null }),
}));
