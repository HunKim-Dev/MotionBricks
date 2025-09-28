import { create } from "zustand";

export type BrickEntity = { id: string; name: string; uuid: string };

type BrickPartsState = {
  brickParts: BrickEntity[];
  selectedBrickUuid: string | null;
  setBrickParts: (list: BrickEntity[]) => void;
  setSelectedBrickUuid: (uuid: string | null) => void;
};

export const useBrickPartsStore = create<BrickPartsState>((set) => ({
  brickParts: [],
  selectedBrickUuid: null,
  setBrickParts: (brickParts) => set({ brickParts }),
  setSelectedBrickUuid: (uuid) => set({ selectedBrickUuid: uuid }),
}));
