"use client";

import { Canvas } from "@react-three/fiber";

const WorkShopPage = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas camera={{ position: [140, 120, 220], fov: 45 }}>
        <gridHelper args={[600, 60]} />
      </Canvas>
    </div>
  );
};

export default WorkShopPage;
