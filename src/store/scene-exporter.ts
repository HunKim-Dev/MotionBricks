"use client";

import { create } from "zustand";

export type SavedBrick = {
  uuid: string;
  partId: string | null;
  name: string | null;
  position: [number, number, number];
  rotation: [number, number, number];
  color: string | null;
};

export type SavedScene = {
  bricks: SavedBrick[];
};

type SceneState = {
  scene: SavedScene | null;
  setScene: (scene: SavedScene) => void;
};

export const useSceneExporterStore = create<SceneState>((set) => ({
  scene: null,
  setScene: (scene) => set({ scene }),
}));
