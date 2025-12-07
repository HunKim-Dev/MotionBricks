"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { STUD_UNIT } from "config/brick-config";
import { worldFromClientXY, attachScreenXYListeners } from "@/utils/pointer-coordinate";

type Params = {
  ghostRef: { current: THREE.Group | null };
};

const useGhostCursorFollow = ({ ghostRef }: Params) => {
  const { camera, gl } = useThree();
  const cursorNDC = useRef(new THREE.Vector2());
  const raycaster = useRef(new THREE.Raycaster());
  const quantize = (v: number, q = STUD_UNIT) => Math.round(v / q) * q;

  useEffect(() => {
    if (!camera || !gl) return;

    const updateFromXY = (x: number, y: number) => {
      if (!ghostRef.current) return;

      const hit = worldFromClientXY(x, y, gl, camera, raycaster.current, cursorNDC.current);

      if (!hit) return;

      ghostRef.current.position.x = quantize(hit.x);
      ghostRef.current.position.z = quantize(hit.z);
    };

    const cleanupListeners = attachScreenXYListeners(gl, updateFromXY);
    return cleanupListeners;
  }, [camera, gl, ghostRef]);
};

export default useGhostCursorFollow;
