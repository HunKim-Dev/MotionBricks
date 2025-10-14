"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import type { GhostDetail } from "@/types/ghost";

type Params = {
  ghostRef: { current: THREE.Group | null };
  ghostMeta: { current: GhostDetail | null };
};

const useGhostConfirm = ({ ghostRef, ghostMeta }: Params) => {
  const { gl, scene } = useThree();

  useEffect(() => {
    if (!gl) return;

    const onConfirm = () => {
      if (!ghostRef.current || !ghostMeta.current) return;
      const ghostGroup = ghostRef.current;
      const { id, name, path } = ghostMeta.current;

      const spawnPosition: [number, number, number] = [
        ghostGroup.position.x,
        ghostGroup.position.y,
        ghostGroup.position.z,
      ];
      window.dispatchEvent(
        new CustomEvent("spawn-brick", { detail: { id, name, path, position: spawnPosition } })
      );

      scene.remove(ghostGroup);
      ghostRef.current = null;
      ghostMeta.current = null;
    };

    const onCanvasClick = (event: MouseEvent) => {
      if (!ghostRef.current) return;
      if (event.target !== gl?.domElement) return;

      event.stopPropagation();
      event.preventDefault();
      onConfirm();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!ghostRef.current) return;
      if (event.key === "Enter") {
        event.preventDefault();
        onConfirm();
      }

      if (event.key === "Escape") {
        scene.remove(ghostRef.current);
        ghostRef.current = null;
        ghostMeta.current = null;
      }
    };

    gl.domElement.addEventListener("click", onCanvasClick as EventListener, true);
    window.addEventListener("keydown", onKeyDown as EventListener);

    return () => {
      gl.domElement.removeEventListener("click", onCanvasClick as EventListener, true);
      window.removeEventListener("keydown", onKeyDown as EventListener);
    };
  }, [gl, scene, ghostRef, ghostMeta]);
};

export default useGhostConfirm;
