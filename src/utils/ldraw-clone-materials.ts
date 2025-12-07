import * as THREE from "three";

export const markBrickRoot = (group: THREE.Group) => {
  group.userData.isBrickRoot = true;
};

export const cloneBrickMaterials = (group: THREE.Group) => {
  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const targetMesh = child;
      const originalMaterial = targetMesh.material;

      if (Array.isArray(originalMaterial)) {
        targetMesh.material = originalMaterial.map((material) => material.clone());
      } else {
        targetMesh.material = originalMaterial.clone();
      }
    }
  });
};
