"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { useUndoRedoStore, type UndoableAction } from "@/store/undo-redo";

type Params = {
  scene: THREE.Scene;
};

const useUndoRedo = ({ scene }: Params) => {
  useEffect(() => {
    const setColor = (uuid: string, hex: string) => {
      const obj = scene.getObjectByProperty("uuid", uuid);
      if (!obj) return;
      obj.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        const mat = child.material;
        if (Array.isArray(mat)) {
          mat.forEach((m) => {
            if ((m as THREE.MeshStandardMaterial).color) {
              (m as THREE.MeshStandardMaterial).color.set(hex);
              m.needsUpdate = true;
            }
          });
        } else if ((mat as THREE.MeshStandardMaterial).color) {
          (mat as THREE.MeshStandardMaterial).color.set(hex);
          mat.needsUpdate = true;
        }
      });
    };

    const spawnBrick = (action: UndoableAction & { type: "spawn" | "delete" }) => {
      window.dispatchEvent(
        new CustomEvent("spawn-brick", {
          detail: {
            id: action.brickEntity.id,
            name: action.brickEntity.name,
            path: action.partPath,
            position: action.position,
            rotation: action.rotation,
            color: action.color,
            _skipUndo: true,
          },
        })
      );
    };

    const deleteBrick = (uuid: string) => {
      window.dispatchEvent(
        new CustomEvent("delete-brick", {
          detail: { uuid, _skipUndo: true },
        })
      );
    };

    const executeUndo = (action: UndoableAction) => {
      const store = useUndoRedoStore.getState();
      store.setExecuting(true);

      switch (action.type) {
        case "spawn":
          deleteBrick(action.uuid);
          break;
        case "delete":
          spawnBrick(action);
          break;
        case "move": {
          const obj = scene.getObjectByProperty("uuid", action.uuid);
          if (obj) obj.position.set(...action.prevPosition);
          break;
        }
        case "rotate": {
          const obj = scene.getObjectByProperty("uuid", action.uuid);
          if (obj) {
            obj.rotation.y = action.prevRotationY;
            obj.updateMatrixWorld();
          }
          break;
        }
        case "color":
          setColor(action.uuid, action.prevColor);
          break;
      }

      store.setExecuting(false);
    };

    const executeRedo = (action: UndoableAction) => {
      const store = useUndoRedoStore.getState();
      store.setExecuting(true);

      switch (action.type) {
        case "spawn":
          spawnBrick(action);
          break;
        case "delete":
          deleteBrick(action.uuid);
          break;
        case "move": {
          const obj = scene.getObjectByProperty("uuid", action.uuid);
          if (obj) obj.position.set(...action.nextPosition);
          break;
        }
        case "rotate": {
          const obj = scene.getObjectByProperty("uuid", action.uuid);
          if (obj) {
            obj.rotation.y = action.nextRotationY;
            obj.updateMatrixWorld();
          }
          break;
        }
        case "color":
          setColor(action.uuid, action.nextColor);
          break;
      }

      store.setExecuting(false);
    };

    const onUndo = () => {
      const store = useUndoRedoStore.getState();
      if (store.isExecuting || !store.canUndo()) return;
      const action = store.undo();
      if (action) executeUndo(action);
    };

    const onRedo = () => {
      const store = useUndoRedoStore.getState();
      if (store.isExecuting || !store.canRedo()) return;
      const action = store.redo();
      if (action) executeRedo(action);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod || e.key !== "z") return;
      e.preventDefault();
      if (e.shiftKey) onRedo();
      else onUndo();
    };

    window.addEventListener("undo", onUndo);
    window.addEventListener("redo", onRedo);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("undo", onUndo);
      window.removeEventListener("redo", onRedo);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [scene]);
};

export default useUndoRedo;
