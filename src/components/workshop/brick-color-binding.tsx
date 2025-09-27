"use client";

import type { RefObject } from "react";
import * as THREE from "three";
import { useEffect } from "react";

type Props = { selectedRef: RefObject<THREE.Object3D | null> };

const BrickColorBinding = ({ selectedRef }: Props) => {
  const setObjectColor = (object: THREE.Object3D, hexColor: string) => {
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const assignedMaterial = child.material;

        if (Array.isArray(assignedMaterial)) {
          assignedMaterial.forEach((material) => {
            const colorMaterial = material as THREE.Material & { color?: THREE.Color };

            if (colorMaterial.color) {
              colorMaterial.color.set(hexColor);
              colorMaterial.needsUpdate = true;
            }
          });
        } else {
          const colorMaterial = assignedMaterial as THREE.Material & { color?: THREE.Color };

          if (colorMaterial.color) {
            colorMaterial.color.set(hexColor);
            colorMaterial.needsUpdate = true;
          }
        }
      }
    });
  };

  useEffect(() => {
    const colorChange = (event: Event) => {
      const hexColor = (event as CustomEvent<string>).detail;

      if (selectedRef.current) {
        setObjectColor(selectedRef.current, hexColor);
      }
    };
    window.addEventListener("brick-color-change", colorChange);
    return () => window.removeEventListener("brick-color-change", colorChange);
  }, [selectedRef]);

  return null;
};

export default BrickColorBinding;
