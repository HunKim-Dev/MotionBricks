import { useEffect } from "react";
import * as THREE from "three";
import type { Dispatch, SetStateAction } from "react";
import { useBrickPartsStore } from "@/store/brick-parts";
import { useUndoRedoStore } from "@/store/undo-redo";
import { BRICK_CATALOG } from "config/brick-config";

type BrickDeletionParams = {
  scene: THREE.Scene;
  setLoadedGroups: Dispatch<SetStateAction<THREE.Group[]>>;
  setSelectedBrick: (uuid: string | null) => void;
  selectPart: (uuid: string | null) => void;
  deletePart: (uuid: string) => void;
  selectedObjectRef: { current: THREE.Object3D | null };
};

type DeleteBrickEvent = { uuid: string; _skipUndo?: boolean };

const useBrickDeletion = ({
  scene,
  setLoadedGroups,
  setSelectedBrick,
  selectPart,
  deletePart,
  selectedObjectRef,
}: BrickDeletionParams) => {
  useEffect(() => {
    const deletedBrick = (event: Event) => {
      const { uuid: deletedBrickUuid, _skipUndo } = (event as CustomEvent<DeleteBrickEvent>).detail;
      if (!deletedBrickUuid) return;

      const sceneObject = scene.getObjectByProperty(
        "uuid",
        deletedBrickUuid
      ) as THREE.Object3D | null;
      if (!sceneObject) return;

      if (!_skipUndo) {
        const brickEntity = useBrickPartsStore
          .getState()
          .brickParts.find((b) => b.uuid === deletedBrickUuid);

        if (brickEntity) {
          const catalogItem = BRICK_CATALOG.find((c) => c.id === brickEntity.id);
          let colorHex: string | null = null;
          sceneObject.traverse((child) => {
            if (!colorHex && child instanceof THREE.Mesh) {
              const mat = child.material as THREE.MeshStandardMaterial | null;
              if (mat?.color) colorHex = "#" + mat.color.getHexString();
            }
          });

          useUndoRedoStore.getState().push({
            type: "delete",
            uuid: deletedBrickUuid,
            brickEntity,
            partPath: catalogItem?.path ?? "",
            position: [sceneObject.position.x, sceneObject.position.y, sceneObject.position.z],
            rotation: [sceneObject.rotation.x, sceneObject.rotation.y, sceneObject.rotation.z],
            color: colorHex,
          });
        }
      }

      scene.remove(sceneObject);

      setLoadedGroups((prev) => prev.filter((group) => group.uuid !== deletedBrickUuid));

      if (selectedObjectRef.current?.uuid === deletedBrickUuid) {
        selectedObjectRef.current = null;
      }

      setSelectedBrick(null);
      selectPart(null);
      deletePart(deletedBrickUuid);

      window.dispatchEvent(new CustomEvent("handle-missed"));

      window.dispatchEvent(
        new CustomEvent("layer-deleted", { detail: { uuid: deletedBrickUuid } })
      );
    };
    window.addEventListener("delete-brick", deletedBrick);
    return () => window.removeEventListener("delete-brick", deletedBrick);
  }, [scene, setLoadedGroups, setSelectedBrick, selectPart, deletePart, selectedObjectRef]);
};

export default useBrickDeletion;
