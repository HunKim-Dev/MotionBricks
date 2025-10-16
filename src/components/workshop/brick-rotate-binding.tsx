"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { useBrickPartsStore } from "@/store/brick-parts";

type Props = { selectedRef: React.RefObject<THREE.Object3D | null> };

const toRadians = (deg: number) => (deg * Math.PI) / 180;

const snap90Degrees = (rad: number) => {
  const rotationStep = Math.PI / 2;
  const snappedRadians = Math.round(rad / rotationStep) * rotationStep;
  return snappedRadians;
};

const BrickRotateBinding = ({ selectedRef }: Props) => {
  const selectedUuid = useBrickPartsStore((state) => state.selectedBrickUuid);

  useEffect(() => {
    const onRotate = (event: Event) => {
      const { uuid, axis, deg } = (event as CustomEvent<{ uuid: string; axis: "y"; deg: 90 }>)
        .detail;

      if (!uuid || uuid !== selectedUuid) return;

      const selectedObject = selectedRef.current;

      if (!selectedObject) return;

      if (axis === "y") {
        selectedObject.rotation.y = snap90Degrees(selectedObject.rotation.y + toRadians(deg));
        selectedObject.updateMatrixWorld();
      }
    };

    window.addEventListener("brick-rotate", onRotate as EventListener);
    return () => window.removeEventListener("brick-rotate", onRotate as EventListener);
  }, [selectedUuid, selectedRef]);

  return null;
};

export default BrickRotateBinding;
