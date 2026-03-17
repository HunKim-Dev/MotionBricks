import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useUndoRedoStore } from "@/store/undo-redo";

type Params = {
  selectedObject: THREE.Object3D | null;
  enabled: boolean;
  snapStep?: number;
  onEnd?: () => void;
};

export default function useVictoryDragPlane({ selectedObject, enabled, snapStep, onEnd }: Params) {
  const { camera, gl } = useThree();
  const dragPlane = useRef<THREE.Plane | null>(null);
  const startOffset = useRef<THREE.Vector3 | null>(null);
  const raycaster = useRef(new THREE.Raycaster());
  const cursorNDC = useRef(new THREE.Vector2());
  const tempRay = useRef(new THREE.Ray());
  const tempVector = useRef(new THREE.Vector3());
  const hitPointWorld = useRef(new THREE.Vector3());
  const selectedStartWorld = useRef(new THREE.Vector3());
  const desiredWorld = useRef(new THREE.Vector3());
  const localTarget = useRef(new THREE.Vector3());
  const dragStartPos = useRef<[number, number, number] | null>(null);

  useEffect(() => {
    if (!enabled || !selectedObject || !camera || !gl) return;

    selectedObject.getWorldPosition(selectedStartWorld.current);
    dragPlane.current = new THREE.Plane(new THREE.Vector3(0, 1, 0), -selectedStartWorld.current.y);
    startOffset.current = null;
    dragStartPos.current = [
      selectedObject.position.x,
      selectedObject.position.y,
      selectedObject.position.z,
    ];

    const onCursorMove = (event: Event) => {
      if (!dragPlane.current || !selectedObject) return;

      const { x, y } = (event as CustomEvent<{ x: number; y: number }>).detail;
      const canvasBounds = gl.domElement.getBoundingClientRect();

      cursorNDC.current.set(
        ((x - canvasBounds.left) / canvasBounds.width) * 2 - 1,
        -(((y - canvasBounds.top) / canvasBounds.height) * 2 - 1)
      );

      raycaster.current.setFromCamera(cursorNDC.current, camera);
      tempRay.current.copy(raycaster.current.ray);

      const p0 = tempRay.current.origin;
      const p1 = tempRay.current.at(1000, tempVector.current);
      const line = new THREE.Line3(p0, p1);

      if (dragPlane.current.intersectLine(line, hitPointWorld.current)) {
        if (!startOffset.current) {
          selectedObject.getWorldPosition(selectedStartWorld.current);
          startOffset.current = new THREE.Vector3().subVectors(
            hitPointWorld.current,
            selectedStartWorld.current
          );
        }

        desiredWorld.current.copy(hitPointWorld.current).sub(startOffset.current!);

        if (snapStep && snapStep > 0) {
          desiredWorld.current.x = Math.round(desiredWorld.current.x / snapStep) * snapStep;
          desiredWorld.current.z = Math.round(desiredWorld.current.z / snapStep) * snapStep;
          desiredWorld.current.y = selectedStartWorld.current.y;
        }

        const parent = selectedObject.parent;
        if (parent) {
          localTarget.current.copy(desiredWorld.current);
          parent.worldToLocal(localTarget.current);
          selectedObject.position.x = localTarget.current.x;
          selectedObject.position.z = localTarget.current.z;
        } else {
          selectedObject.position.x = desiredWorld.current.x;
          selectedObject.position.z = desiredWorld.current.z;
        }
      }
    };

    const handleVictoryDragEnd = () => {
      if (selectedObject && dragStartPos.current) {
        const prev = dragStartPos.current;
        const next: [number, number, number] = [
          selectedObject.position.x,
          selectedObject.position.y,
          selectedObject.position.z,
        ];
        if (prev[0] !== next[0] || prev[1] !== next[1] || prev[2] !== next[2]) {
          useUndoRedoStore.getState().push({
            type: "move",
            uuid: selectedObject.uuid,
            prevPosition: prev,
            nextPosition: next,
          });
        }
      }
      dragStartPos.current = null;
      startOffset.current = null;
      onEnd?.();
    };

    window.addEventListener("cursor-move", onCursorMove);
    window.addEventListener("victory-drag-end", handleVictoryDragEnd);

    return () => {
      window.removeEventListener("cursor-move", onCursorMove);
      window.removeEventListener("victory-drag-end", handleVictoryDragEnd);
    };
  }, [enabled, selectedObject, camera, gl, snapStep, onEnd]);
}
