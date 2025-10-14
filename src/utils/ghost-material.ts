import type { Material } from "three";
import * as THREE from "three";

export type TransparentWritable = Material & {
  transparent: boolean;
  opacity: number;
  depthWrite: boolean;
  needsUpdate: boolean;
};

const isTransparentWritable = (material: Material): material is TransparentWritable => {
  const maybe = material as Partial<TransparentWritable>;
  return (
    typeof maybe.opacity === "number" &&
    typeof maybe.transparent === "boolean" &&
    typeof maybe.depthWrite === "boolean"
  );
};

export const applyGhostProps = (material: Material) => {
  if (isTransparentWritable(material)) {
    material.transparent = true;
    material.opacity = 0.35;
    material.depthWrite = false;
    material.needsUpdate = true;
  }
};

export const setGhostMaterial = (group: THREE.Object3D) => {
  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const meshMaterial = child.material;
      if (Array.isArray(meshMaterial)) {
        meshMaterial.forEach((materialItem) => applyGhostProps(materialItem));
      } else if (meshMaterial) {
        applyGhostProps(meshMaterial);
      }
    }
  });
};
