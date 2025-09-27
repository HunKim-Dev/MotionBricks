"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import LDrawModel from "@/components/workshop/ldraw-model";
import { CAMERA_LOCATION, GRID_SIZE, BRICK_LIGHT } from "config/brick-config";

const WorkShopPage = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas camera={CAMERA_LOCATION}>
        <gridHelper args={GRID_SIZE} />
        <ambientLight intensity={BRICK_LIGHT} />
        <LDrawModel />
        <OrbitControls enableDamping />
      </Canvas>
    </div>
  );
};

export default WorkShopPage;
