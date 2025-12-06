"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { BrickEntity } from "@/store/brick-parts";
import { useSceneExporterStore } from "@/store/scene-exporter";

type Params = {
  loadedGroups: THREE.Group[];
  brickParts: BrickEntity[];
};

const useSceneExporter = ({ loadedGroups, brickParts }: Params) => {
  const setScene = useSceneExporterStore((state) => state.setScene);

  useEffect(() => {
    const scene = {
      bricks: loadedGroups.map((group) => {
        const { x, y, z } = group.position;
        const { x: rotationX, y: rotationY, z: rotationZ } = group.rotation;

        const partId = (group.userData.partId as string | undefined) ?? null;
        const matchingPart = brickParts.find((part) => part.uuid === group.uuid);

        let colorHex: string | null = null;

        group.traverse((object) => {
          if (colorHex) return;

          if (object instanceof THREE.Mesh) {
            const brickMaterial = object.material;

            if (brickMaterial && brickMaterial.color) {
              colorHex = `#${brickMaterial.color.getHexString()}`;
            }
          }
        });

        return {
          uuid: group.uuid,
          partId,
          name: matchingPart?.name ?? null,
          position: [x, y, z] as [number, number, number],
          rotation: [rotationX, rotationY, rotationZ] as [number, number, number],
          color: colorHex,
        };
      }),
    };

    setScene(scene);
  }, [loadedGroups, brickParts, setScene]);
};

export default useSceneExporter;
