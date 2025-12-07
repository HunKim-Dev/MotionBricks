"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { LDrawLoader } from "three/examples/jsm/loaders/LDrawLoader.js";
import { LDrawConditionalLineMaterial } from "three/examples/jsm/materials/LDrawConditionalLineMaterial.js";
import { LDRAW_PATH, BRICK_RENDER_SCALE, BRICK_RENDER_POSITION } from "config/brick-config";
import { markBrickRoot, cloneBrickMaterials } from "@/utils/ldraw-clone-materials";
import { setGhostMaterial } from "@/utils/ghost-material";
import type { GhostDetail } from "@/types/ghost";
import { useThree } from "@react-three/fiber";

const useGhostBrickSpawn = () => {
  const { scene } = useThree();
  const ghostRef = useRef<THREE.Group | null>(null);
  const ghostMeta = useRef<GhostDetail | null>(null);

  useEffect(() => {
    const loader = new LDrawLoader();
    loader.setConditionalLineMaterial(LDrawConditionalLineMaterial);
    loader.setPartsLibraryPath(LDRAW_PATH);

    const onSpawn = (event: Event) => {
      const ghostInfo = (event as CustomEvent<GhostDetail>).detail;
      if (!ghostInfo) return;

      if (ghostRef.current) {
        scene.remove(ghostRef.current);
        ghostRef.current = null;
        ghostMeta.current = null;
      }

      loader.load(ghostInfo.path, (group) => {
        markBrickRoot(group);
        cloneBrickMaterials(group);
        setGhostMaterial(group);

        group.scale.set(...BRICK_RENDER_SCALE);
        group.position.set(...BRICK_RENDER_POSITION);
        group.rotateX(Math.PI);

        const box = new THREE.Box3().setFromObject(group);
        if (isFinite(box.min.y) && box.min.y !== 0) {
          group.position.y -= box.min.y;
        }

        scene.add(group);
        ghostRef.current = group;
        ghostMeta.current = ghostInfo;
      });
    };
    window.addEventListener("ghost-spawn", onSpawn as EventListener);
    return () => {
      window.removeEventListener("ghost-spawn", onSpawn as EventListener);
    };
  }, [scene]);

  return { ghostRef, ghostMeta };
};

export default useGhostBrickSpawn;
