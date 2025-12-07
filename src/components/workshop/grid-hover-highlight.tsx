"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { STUD_UNIT, GRID_SIZE, GROUND_Y_LEVEL } from "config/brick-config";
import {
  GRID_HOVER_Y_OFFSET,
  GRID_HOVER_BAND_THICKNESS_STUDS,
  GRID_HOVER_OPACITY,
  GRID_HOVER_COLOR_X,
  GRID_HOVER_COLOR_Z,
} from "config/ui-config";
import { worldFromClientXY, attachScreenXYListeners } from "@/utils/pointer-coordinate";

const quantize = (v: number, q = STUD_UNIT) => Math.round(v / q) * q;

const GridHoverHighlight = () => {
  const { camera, gl } = useThree();
  const cursorNDC = useRef(new THREE.Vector2());
  const raycaster = useRef(new THREE.Raycaster());
  const [xPosition, setXPosition] = useState<number | null>(null);
  const [zPosition, setZPosition] = useState<number | null>(null);

  useEffect(() => {
    if (!camera || !gl) return;

    const updateFromXY = (x: number, y: number) => {
      const hit = worldFromClientXY(x, y, gl, camera, raycaster.current, cursorNDC.current);
      if (!hit) {
        setXPosition(null);
        setZPosition(null);
        return;
      }
      setXPosition(quantize(hit.x));
      setZPosition(quantize(hit.z));
    };

    const detach = attachScreenXYListeners(gl, updateFromXY);
    return detach;
  }, [camera, gl]);

  const show = xPosition !== null && zPosition !== null;
  const sizeX = GRID_SIZE[0];
  const sizeZ = GRID_SIZE[0];

  if (!show) return null;

  return (
    <>
      <mesh
        position={[xPosition as number, GROUND_Y_LEVEL + GRID_HOVER_Y_OFFSET, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[STUD_UNIT * GRID_HOVER_BAND_THICKNESS_STUDS, sizeZ]} />
        <meshBasicMaterial transparent opacity={GRID_HOVER_OPACITY} color={GRID_HOVER_COLOR_X} />
      </mesh>
      <mesh
        position={[0, GROUND_Y_LEVEL + GRID_HOVER_Y_OFFSET, zPosition as number]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[sizeX, STUD_UNIT * GRID_HOVER_BAND_THICKNESS_STUDS]} />
        <meshBasicMaterial transparent opacity={GRID_HOVER_OPACITY} color={GRID_HOVER_COLOR_Z} />
      </mesh>
    </>
  );
};

export default GridHoverHighlight;
