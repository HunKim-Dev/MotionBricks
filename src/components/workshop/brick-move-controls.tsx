"use client";

import { useEffect, useRef } from "react";
import { TransformControls } from "@react-three/drei";
import * as THREE from "three";
import type { TransformControls as TransformControlsImpl } from "three-stdlib";
import { HANDLE_SIZE } from "config/brick-config";

type Props = {
  object: THREE.Object3D | null;
  studStep: number;
};

const BrickMoveControls = ({ object, studStep }: Props) => {
  const transformControlsRef = useRef<TransformControlsImpl | null>(null);

  useEffect(() => {
    const transformControls = transformControlsRef.current;

    if (!transformControls) return;

    const onDrag = (event: { value: boolean }) => {
      window.dispatchEvent(new CustomEvent("orbit-lock", { detail: event.value }));
    };

    transformControls.addEventListener("dragging-changed", onDrag);

    return () => transformControls.removeEventListener("dragging-changed", onDrag);
  }, [object]);

  if (!object) return null;

  return (
    <TransformControls
      ref={transformControlsRef}
      mode="translate"
      space="world"
      object={object}
      showX
      showY={false}
      showZ
      size={HANDLE_SIZE}
      translationSnap={studStep}
    />
  );
};

export default BrickMoveControls;
