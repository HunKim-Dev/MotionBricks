"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { worldToScreenXY } from "@/utils/pointer-coordinate";

type Props = { selectedRef: React.RefObject<THREE.Object3D | null> };

const ToolbarAnchorEmitter = ({ selectedRef }: Props) => {
  const { gl, camera } = useThree();

  useEffect(() => {
    if (!gl || !camera) return;

    let animationFrameId = 0;
    const updateToolbarAnchor = () => {
      const selectedObject = selectedRef.current;

      if (selectedObject) {
        const screenPosition = worldToScreenXY(selectedObject, camera, gl);
        if (screenPosition) {
          window.dispatchEvent(new CustomEvent("toolbar-anchor", { detail: screenPosition }));
        }
      }
      animationFrameId = requestAnimationFrame(updateToolbarAnchor);
    };

    updateToolbarAnchor();

    return () => cancelAnimationFrame(animationFrameId);
  }, [gl, camera, selectedRef]);

  return null;
};

export default ToolbarAnchorEmitter;
