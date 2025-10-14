"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { clientToNDC } from "@/utils/world-from-client-xy";
import { STUD_UNIT } from "config/brick-config";

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

    const worldFromClientXY = (x: number, y: number): THREE.Vector3 | null => {
      const rect = gl.domElement.getBoundingClientRect();
      const { ndcX, ndcY } = clientToNDC(x, y, rect);

      cursorNDC.current.set(ndcX, ndcY);
      raycaster.current.setFromCamera(cursorNDC.current, camera);

      const directionY = raycaster.current.ray.direction.y;
      const tAtGround = -raycaster.current.ray.origin.y / directionY;

      if (directionY === 0) return null;

      if (!isFinite(tAtGround) || tAtGround < 0) return null;

      return raycaster.current.ray.at(tAtGround, new THREE.Vector3());
    };

    const onCursorMove = (e: Event) => {
      if (!ghostRef.current) return;

      const { x, y } = (e as CustomEvent<{ x: number; y: number }>).detail;
      const hit = worldFromClientXY(x, y);

      if (!hit) return;
      ghostRef.current.position.x = quantize(hit.x);
      ghostRef.current.position.z = quantize(hit.z);
    };

    const onPointerMove = (ev: PointerEvent) => {
      if (!ghostRef.current) return;

      const hitPoint = worldFromClientXY(ev.clientX, ev.clientY);

      if (!hitPoint) return;
      ghostRef.current.position.x = quantize(hitPoint.x);
      ghostRef.current.position.z = quantize(hitPoint.z);
    };

    window.addEventListener("cursor-move", onCursorMove as EventListener);
    gl.domElement.addEventListener("pointermove", onPointerMove as EventListener);

    return () => {
      window.removeEventListener("cursor-move", onCursorMove as EventListener);
      gl.domElement.removeEventListener("pointermove", onPointerMove as EventListener);
    };
  }, [camera, gl, ghostRef]);
};

export default useGhostCursorFollow;
