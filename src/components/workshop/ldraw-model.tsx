"use client";

import { useEffect } from "react";
import { LDrawLoader } from "three/examples/jsm/loaders/LDrawLoader.js";
import { useThree } from "@react-three/fiber";
import { LDrawConditionalLineMaterial } from "three/examples/jsm/materials/LDrawConditionalLineMaterial.js";
import * as THREE from "three";

const LDrawModel = () => {
  const { scene } = useThree();

  useEffect(() => {
    const loader = new LDrawLoader();

    loader.setConditionalLineMaterial(LDrawConditionalLineMaterial);
    loader.setPartsLibraryPath("/ldraw/");
    loader.load("/ldraw/parts/3001.dat", (group) => {
      group.scale.set(0.5, 0.5, 0.5);
      group.position.set(0, 0, 0);
      group.rotateX(Math.PI);

      const box = new THREE.Box3().setFromObject(group);
      if (isFinite(box.min.y) && box.min.y !== 0) {
        group.position.y -= box.min.y;
      }
      scene.add(group);
    });
  }, [scene]);

  return null;
};

export default LDrawModel;
