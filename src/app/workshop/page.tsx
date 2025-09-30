"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import LDrawModel from "@/components/workshop/ldraw-model";
import {
  CAMERA_LOCATION,
  GRID_SIZE,
  BRICK_AMBIENT_LIGHT,
  BRICK_DIRECTIONAL_LIGHT,
  BRICK_HEMISPHERE_LIGHT,
} from "config/brick-config";

const WorkShopPage = () => {
  const [orbitEnabled, setOrbitEnabled] = useState(true);

  useEffect(() => {
    const onLock = (event: Event) => {
      const locked = (event as CustomEvent<boolean>).detail === true;
      setOrbitEnabled(!locked);
    };
    window.addEventListener("orbit-lock", onLock as EventListener);
    return () => window.removeEventListener("orbit-lock", onLock as EventListener);
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas
        camera={CAMERA_LOCATION}
        onPointerMissed={() => window.dispatchEvent(new CustomEvent("handle-missed"))}
      >
        <gridHelper args={GRID_SIZE} />
        <ambientLight {...BRICK_AMBIENT_LIGHT} />
        <directionalLight {...BRICK_DIRECTIONAL_LIGHT} />
        <hemisphereLight {...BRICK_HEMISPHERE_LIGHT} />
        <OrbitControls makeDefault enabled={orbitEnabled} />
        <LDrawModel />
      </Canvas>
    </div>
  );
};

export default WorkShopPage;
