import { useCallback, useRef, useEffect } from "react";
import * as THREE from "three";

type PickEvent = {
  delta: number;
  object: THREE.Object3D;
  eventObject?: THREE.Object3D;
};

const useBrickSelection = (selectPart: (uuid: string | null) => void) => {
  const selectedObjectRef = useRef<THREE.Object3D | null>(null);

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

      setObjectOpacity(objectOpacityChange, 0.5);
      selectedObjectRef.current = objectOpacityChange;

      setSelectedBrick(objectOpacityChange.uuid);
      selectPart(objectOpacityChange.uuid);
    },
    [setObjectOpacity, setSelectedBrick, selectPart]
  );

  const handleMiss = useCallback(() => {
    if (selectedObjectRef.current) {
      setObjectOpacity(selectedObjectRef.current, 1);
      selectedObjectRef.current = null;
    }
    setSelectedBrick(null);
    selectPart(null);
  }, [setObjectOpacity, setSelectedBrick, selectPart]);

  useEffect(() => {
    window.addEventListener("handle-missed", handleMiss);
    return () => window.removeEventListener("handle-missed", handleMiss);
  }, [handleMiss]);

  return { selectedObjectRef, handlePick, handleMiss };
};

export default useBrickSelection;
