import { useEffect } from "react";
import * as THREE from "three";
import type { Dispatch, SetStateAction } from "react";

type BrickDeletionParams = {
  scene: THREE.Scene;
  setLoadedGroups: Dispatch<SetStateAction<THREE.Group[]>>;
  setSelectedBrick: (uuid: string | null) => void;
  selectPart: (uuid: string | null) => void;
  deletePart: (uuid: string) => void;
  selectedObjectRef: { current: THREE.Object3D | null };
};

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
      const { uuid: deletedBrickUuid } = (event as CustomEvent<{ uuid: string }>).detail;
      if (!deletedBrickUuid) return;

      const sceneObject = scene.getObjectByProperty(
        "uuid",
        deletedBrickUuid
      ) as THREE.Object3D | null;
      if (!sceneObject) return;

      scene.remove(sceneObject);

      setLoadedGroups((prev) => prev.filter((group) => group.uuid !== deletedBrickUuid));

      if (selectedObjectRef.current?.uuid === deletedBrickUuid) {
        selectedObjectRef.current = null;
      }

      setSelectedBrick(null);
      selectPart(null);
      deletePart(deletedBrickUuid);

      window.dispatchEvent(
        new CustomEvent("layer-deleted", { detail: { uuid: deletedBrickUuid } })
      );
    };
    window.addEventListener("delete-brick", deletedBrick);
    return () => window.removeEventListener("delete-brick", deletedBrick);
  }, [scene, setLoadedGroups, setSelectedBrick, selectPart, deletePart, selectedObjectRef]);
};

export default useBrickDeletion;
