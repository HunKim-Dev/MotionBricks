import { useEffect } from "react";
import { LDrawLoader } from "three/examples/jsm/loaders/LDrawLoader.js";
import { LDrawConditionalLineMaterial } from "three/examples/jsm/materials/LDrawConditionalLineMaterial.js";
import * as THREE from "three";
import { LDRAW_PATH, BRICK_RENDER_SCALE, BRICK_RENDER_POSITION } from "config/brick-config";
import { markBrickRoot, cloneBrickMaterials } from "@/utils/ldraw-clone-materials";
import { useBrickLoadingStore } from "@/store/brick-loading";
import { useUndoRedoStore } from "@/store/undo-redo";

type BrickSpawnParams = {
  setLoadedGroups: React.Dispatch<React.SetStateAction<THREE.Group[]>>;
  addPart: (p: { id: string; name: string; uuid: string }) => void;
};

export type SpawnBrickEvent = {
  id: string;
  name: string;
  path: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string | null;
  _skipUndo?: boolean;
};

const useBrickSpawn = ({ setLoadedGroups, addPart }: BrickSpawnParams) => {
  const finishLoading = useBrickLoadingStore((state) => state.finishLoading);

  useEffect(() => {
    const loader = new LDrawLoader();

    loader.setConditionalLineMaterial(LDrawConditionalLineMaterial);
    loader.setPartsLibraryPath(LDRAW_PATH);

    const onSpawn = (event: Event) => {
      const { path, name, id, position, rotation, color, _skipUndo } = (
        event as CustomEvent<SpawnBrickEvent>
      ).detail;

      loader.load(path, (group) => {
        group.scale.set(...BRICK_RENDER_SCALE);
        if (position) {
          group.position.set(...position);
        } else {
          group.position.set(...BRICK_RENDER_POSITION);
        }

        if (rotation) {
          group.rotation.set(...rotation);
        } else {
          group.rotateX(Math.PI);
        }

        markBrickRoot(group);
        cloneBrickMaterials(group);

        const fileName = path.split("/").pop() || "";
        const partId = fileName;
        group.userData.partId = partId;

        if (color) {
          group.traverse((child) => {
            if (!(child instanceof THREE.Mesh)) return;
            const mat = child.material as THREE.MeshStandardMaterial | null;
            if (mat?.color) {
              mat.color.set(color);
              mat.needsUpdate = true;
            }
          });
        }

        if (!rotation) {
          const box = new THREE.Box3().setFromObject(group);
          if (isFinite(box.min.y) && box.min.y !== 0) {
            group.position.y -= box.min.y;
          }
        }

        setLoadedGroups((prev) => [...prev, group]);

        addPart({ id, name, uuid: group.uuid });

        window.dispatchEvent(
          new CustomEvent("layer-added", {
            detail: { uuid: group.uuid, name },
          })
        );

        if (!_skipUndo) {
          useUndoRedoStore.getState().push({
            type: "spawn",
            uuid: group.uuid,
            brickEntity: { id, name, uuid: group.uuid },
            partPath: path,
            position: [group.position.x, group.position.y, group.position.z],
            rotation: [group.rotation.x, group.rotation.y, group.rotation.z],
            color: color ?? null,
          });
        }

        finishLoading();
      });
    };

    window.addEventListener("spawn-brick", onSpawn);
    return () => window.removeEventListener("spawn-brick", onSpawn);
  }, [setLoadedGroups, addPart, finishLoading]);
};

export default useBrickSpawn;
