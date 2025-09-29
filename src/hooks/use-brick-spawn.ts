import { useEffect } from "react";
import { LDrawLoader } from "three/examples/jsm/loaders/LDrawLoader.js";
import { LDrawConditionalLineMaterial } from "three/examples/jsm/materials/LDrawConditionalLineMaterial.js";
import * as THREE from "three";
import { LDRAW_PATH, BRICK_RENDER_SCALE, BRICK_RENDER_POSITION } from "config/brick-config";

type BrickSpawnParams = {
  setLoadedGroups: React.Dispatch<React.SetStateAction<THREE.Group[]>>;
  addPart: (p: { id: string; name: string; uuid: string }) => void;
};

type SpawnBrickEvent = { id: string; name: string; path: string };

const useBrickSpawn = ({ setLoadedGroups, addPart }: BrickSpawnParams) => {
  useEffect(() => {
    const loader = new LDrawLoader();

    loader.setConditionalLineMaterial(LDrawConditionalLineMaterial);
    loader.setPartsLibraryPath(LDRAW_PATH);

    const onSpawn = (event: Event) => {
      const { path, name, id } = (event as CustomEvent<SpawnBrickEvent>).detail;

      loader.load(path, (group) => {
        group.scale.set(...BRICK_RENDER_SCALE);
        group.position.set(...BRICK_RENDER_POSITION);
        group.rotateX(Math.PI);

        const box = new THREE.Box3().setFromObject(group);
        if (isFinite(box.min.y) && box.min.y !== 0) {
          group.position.y -= box.min.y;
        }
        setLoadedGroups((prev) => [...prev, group]);

        addPart({ id, name, uuid: group.uuid });

        window.dispatchEvent(
          new CustomEvent("layer-added", {
            detail: { uuid: group.uuid, name },
          })
        );
      });
    };

    window.addEventListener("spawn-brick", onSpawn);
    return () => window.removeEventListener("spawn-brick", onSpawn);
  }, [setLoadedGroups, addPart]);
};

export default useBrickSpawn;
