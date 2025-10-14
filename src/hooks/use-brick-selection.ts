import { useCallback, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { getBrickRoot } from "@/utils/get-brick-root";

type PickEvent = {
  delta: number;
  object: THREE.Object3D;
  eventObject?: THREE.Object3D;
};

const useBrickSelection = (selectPart: (uuid: string | null) => void) => {
  const selectedObjectRef = useRef<THREE.Object3D | null>(null);
  const [selectedObject, setSelectedObject] = useState<THREE.Object3D | null>(null);

  const setSelectedBrick = useCallback((uuid: string | null) => {
    window.dispatchEvent(new CustomEvent("ui/brick/highlight", { detail: uuid }));
  }, []);

  const setObjectOpacity = useCallback((object: THREE.Object3D, alpha: number) => {
    object.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const singleMaterial = mesh.material as THREE.Material;

        singleMaterial.transparent = alpha < 1;
        singleMaterial.opacity = alpha;
        singleMaterial.needsUpdate = true;
      }
    });
  }, []);

  const handlePick = useCallback(
    (event: PickEvent) => {
      if (event.delta > 8) return;

      if (selectedObjectRef.current) {
        setObjectOpacity(selectedObjectRef.current, 1);
        selectedObjectRef.current = null;
      }

      const clickedThreeObject = event.object;
      const isPickable =
        clickedThreeObject instanceof THREE.Mesh ||
        clickedThreeObject instanceof THREE.LineSegments ||
        clickedThreeObject instanceof THREE.Line;

      if (!isPickable) return;

      const objectOpacityChange: THREE.Object3D = event.eventObject ?? event.object;

      const brickRoot = getBrickRoot(objectOpacityChange);

      setObjectOpacity(brickRoot, 0.5);
      selectedObjectRef.current = brickRoot;

      setSelectedObject(brickRoot);

      setSelectedBrick(brickRoot.uuid);
      selectPart(brickRoot.uuid);
    },
    [setObjectOpacity, setSelectedBrick, selectPart]
  );

  const handleMiss = useCallback(() => {
    if (selectedObjectRef.current) {
      setObjectOpacity(selectedObjectRef.current, 1);
      selectedObjectRef.current = null;
    }

    setSelectedObject(null);
    setSelectedBrick(null);
    selectPart(null);
  }, [setObjectOpacity, setSelectedBrick, selectPart]);

  useEffect(() => {
    window.addEventListener("handle-missed", handleMiss);
    return () => window.removeEventListener("handle-missed", handleMiss);
  }, [handleMiss]);

  return { selectedObject, selectedObjectRef, handlePick, handleMiss };
};

export default useBrickSelection;
