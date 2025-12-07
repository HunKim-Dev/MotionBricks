"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { LDrawLoader } from "three/examples/jsm/loaders/LDrawLoader.js";
import { LDrawConditionalLineMaterial } from "three/examples/jsm/materials/LDrawConditionalLineMaterial.js";
import { LDRAW_PATH, BRICK_RENDER_SCALE, BRICK_CATALOG } from "config/brick-config";
import { useBrickPartsStore } from "@/store/brick-parts";
import type { SavedScene } from "@/store/scene-exporter";
import { markBrickRoot, cloneBrickMaterials } from "@/utils/ldraw-clone-materials";

const CATALOG_BY_NAME = new Map(BRICK_CATALOG.map((item) => [item.name, item]));

type Params = {
  scene: THREE.Scene;
  loadedGroups: THREE.Group[];
  setLoadedGroups: React.Dispatch<React.SetStateAction<THREE.Group[]>>;
};

const useSceneImporter = ({ scene, loadedGroups, setLoadedGroups }: Params) => {
  const setBrickParts = useBrickPartsStore((state) => state.setBrickParts);
  const addPart = useBrickPartsStore((state) => state.addPart);

  useEffect(() => {
    const loader = new LDrawLoader();
    loader.setConditionalLineMaterial(LDrawConditionalLineMaterial);
    loader.setPartsLibraryPath(LDRAW_PATH);

    const handleSceneLoad = (event: Event) => {
      const imported = (event as CustomEvent<SavedScene>).detail;
      if (!imported) return;

      const { bricks } = imported;
      if (!bricks || bricks.length === 0) {
        loadedGroups.forEach((group) => {
          scene.remove(group);
        });
        setLoadedGroups([]);
        setBrickParts([]);
        return;
      }

      loadedGroups.forEach((group) => {
        scene.remove(group);
      });
      setLoadedGroups([]);
      setBrickParts([]);

      bricks.forEach((brick) => {
        const catalogItem = brick.name ? CATALOG_BY_NAME.get(brick.name) : undefined;

        if (!catalogItem) return;

        loader.load(catalogItem.path, (group) => {
          markBrickRoot(group);
          cloneBrickMaterials(group);

          group.scale.set(...BRICK_RENDER_SCALE);

          const [x, y, z] = brick.position;
          const [rotationX, rotationY, rotationZ] = brick.rotation;

          group.position.set(x, y, z);
          group.rotation.set(rotationX, rotationY, rotationZ);

          const colorHex = brick.color;

          if (colorHex) {
            group.traverse((object) => {
              if (!(object instanceof THREE.Mesh)) return;

              const brickMaterial = object.material as
                | THREE.MeshStandardMaterial
                | THREE.MeshPhongMaterial
                | THREE.MeshBasicMaterial
                | null
                | undefined;

              if (!brickMaterial || !brickMaterial.color) return;

              brickMaterial.color.set(colorHex);
            });
          }

          scene.add(group);

          setLoadedGroups((prev) => [...prev, group]);

          addPart({
            id: brick.partId ?? brick.uuid,
            name: brick.name ?? "Brick",
            uuid: group.uuid,
          });
        });
      });
    };

    window.addEventListener("scene-load", handleSceneLoad as EventListener);
    return () => window.removeEventListener("scene-load", handleSceneLoad as EventListener);
  }, [scene, loadedGroups, setLoadedGroups, setBrickParts, addPart]);
};

export default useSceneImporter;
