import { create } from "zustand";

export type BrickEntity = { id: string; name: string; uuid: string };

type BrickPartsState = {
  brickParts: BrickEntity[];
  selectedBrickUuid: string | null;
  setBrickParts: (list: BrickEntity[]) => void;
  setSelectedBrickUuid: (uuid: string | null) => void;
  addPart: (brick: BrickEntity) => void;
  deletePart: (uuid: string) => void;
  selectPart: (uuid: string | null) => void;
};

export const useBrickPartsStore = create<BrickPartsState>((set) => ({
  brickParts: [],
  selectedBrickUuid: null,
  setBrickParts: (brickParts) => set({ brickParts }),
  setSelectedBrickUuid: (uuid) => set({ selectedBrickUuid: uuid }),
  addPart: (brick) => set((state) => ({ brickParts: [...state.brickParts, brick] })),
  deletePart: (uuid) =>
    set((state) => ({ brickParts: state.brickParts.filter((brick) => brick.uuid !== uuid) })),
  selectPart: (uuid) => set({ selectedBrickUuid: uuid }),
}));
