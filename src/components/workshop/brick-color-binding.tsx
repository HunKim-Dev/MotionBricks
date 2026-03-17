"use client";

import type { RefObject } from "react";
import * as THREE from "three";
import { useEffect } from "react";
import { useUndoRedoStore } from "@/store/undo-redo";

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
        let prevColor: string | null = null;
        selectedRef.current.traverse((child) => {
          if (!prevColor && child instanceof THREE.Mesh) {
            const mat = child.material as THREE.MeshStandardMaterial | null;
            if (mat?.color) prevColor = "#" + mat.color.getHexString();
          }
        });

        setObjectColor(selectedRef.current, hexColor);

        if (prevColor) {
          useUndoRedoStore.getState().push({
            type: "color",
            uuid: selectedRef.current.uuid,
            prevColor,
            nextColor: hexColor,
          });
        }
      }
    };
    window.addEventListener("brick-color-change", colorChange);
    return () => window.removeEventListener("brick-color-change", colorChange);
  }, [selectedRef]);

  return null;
};

export default BrickColorBinding;
