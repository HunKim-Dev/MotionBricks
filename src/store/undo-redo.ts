import { create } from "zustand";
import type { BrickEntity } from "@/store/brick-parts";

export type UndoableAction =
  | {
      type: "spawn";
      uuid: string;
      brickEntity: BrickEntity;
      partPath: string;
      position: [number, number, number];
      rotation: [number, number, number];
      color: string | null;
    }
  | {
      type: "delete";
      uuid: string;
      brickEntity: BrickEntity;
      partPath: string;
      position: [number, number, number];
      rotation: [number, number, number];
      color: string | null;
    }
  | {
      type: "move";
      uuid: string;
      prevPosition: [number, number, number];
      nextPosition: [number, number, number];
    }
  | {
      type: "rotate";
      uuid: string;
      prevRotationY: number;
      nextRotationY: number;
    }
  | {
      type: "color";
      uuid: string;
      prevColor: string;
      nextColor: string;
    };

const MAX_HISTORY = 50;

type UndoRedoState = {
  history: UndoableAction[];
  pointer: number;
  isExecuting: boolean;
  push: (action: UndoableAction) => void;
  undo: () => UndoableAction | null;
  redo: () => UndoableAction | null;
  clear: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  setExecuting: (v: boolean) => void;
};

export const useUndoRedoStore = create<UndoRedoState>((set, get) => ({
  history: [],
  pointer: -1,
  isExecuting: false,

  push: (action) =>
    set((state) => {
      if (state.isExecuting) return state;
      const trimmed = state.history.slice(0, state.pointer + 1);
      trimmed.push(action);
      if (trimmed.length > MAX_HISTORY) trimmed.shift();
      return { history: trimmed, pointer: trimmed.length - 1 };
    }),

  undo: () => {
    const { history, pointer } = get();
    if (pointer < 0) return null;
    set({ pointer: pointer - 1 });
    return history[pointer];
  },

  redo: () => {
    const { history, pointer } = get();
    if (pointer >= history.length - 1) return null;
    set({ pointer: pointer + 1 });
    return history[pointer + 1];
  },

  clear: () => set({ history: [], pointer: -1 }),

  canUndo: () => get().pointer >= 0,
  canRedo: () => {
    const { pointer, history } = get();
    return pointer < history.length - 1;
  },

  setExecuting: (v) => set({ isExecuting: v }),
}));
