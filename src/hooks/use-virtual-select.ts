"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { setCanvasPointerTarget } from "@/utils/gesture-pointer-event";

type Params = {
  camera: THREE.Camera | null;
  gl: THREE.WebGLRenderer | null;
  loadedGroups: THREE.Object3D[];
  handlePick: (event: {
    delta: number;
    object: THREE.Object3D;
    eventObject?: THREE.Object3D;
  }) => void;
};

const useVirtualSelect = ({ camera, gl, loadedGroups, handlePick }: Params) => {
  const raycasterRef = useRef(new THREE.Raycaster());

  useEffect(() => {
    if (!camera || !gl) return;

    setCanvasPointerTarget(gl.domElement);
    gl.domElement.style.touchAction = "none";

    const raycaster = raycasterRef.current;

    const onVirtualSelect = (event: Event) => {
      const { x, y } = (event as CustomEvent<{ x: number; y: number }>).detail;

      const canvasBounds = gl.domElement.getBoundingClientRect();
      const cursorNDC = new THREE.Vector2(
        ((x - canvasBounds.left) / canvasBounds.width) * 2 - 1,
        -(((y - canvasBounds.top) / canvasBounds.height) * 2 - 1)
      );

      raycaster.setFromCamera(cursorNDC, camera);
      const rayHits = raycaster.intersectObjects(loadedGroups, true);

      if (rayHits.length > 0) {
        const hit = rayHits[0];
        handlePick({ delta: 0, object: hit.object, eventObject: hit.object });
      } else {
        return;
      }
    };

    window.addEventListener("virtual-select", onVirtualSelect);
    return () => window.removeEventListener("virtual-select", onVirtualSelect);
  }, [camera, gl, loadedGroups, handlePick]);
};

export default useVirtualSelect;
