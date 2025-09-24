"use client";

import { useEffect } from "react";
import { LDrawLoader } from "three/examples/jsm/loaders/LDrawLoader.js";
import { useThree } from "@react-three/fiber";
import { LDrawConditionalLineMaterial } from "three/examples/jsm/materials/LDrawConditionalLineMaterial.js";
import * as THREE from "three";
import { LDRAW_PATH } from "config/brick-config";

type SpawnBrickEvent = CustomEvent<{ path: string }>;

const LDrawModel = () => {
  const { scene } = useThree();

  useEffect(() => {
    const loader = new LDrawLoader();

    loader.setConditionalLineMaterial(LDrawConditionalLineMaterial);
    loader.setPartsLibraryPath(LDRAW_PATH);

    const onSpawn = (event: SpawnBrickEvent) => {
      const { path } = event.detail;

      loader.load(path, (group) => {
        group.scale.set(0.5, 0.5, 0.5);
        group.position.set(0, 0, 0);
        group.rotateX(Math.PI);

        const box = new THREE.Box3().setFromObject(group);
        if (isFinite(box.min.y) && box.min.y !== 0) {
          group.position.y -= box.min.y;
        }
        scene.add(group);
      });
    };
    window.addEventListener("spawn-brick", onSpawn as EventListener);
    return () => window.removeEventListener("spawn-brick", onSpawn as EventListener);
  }, [scene]);

  return null;
};

export default LDrawModel;
