"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { LDrawLoader } from "three/examples/jsm/loaders/LDrawLoader.js";
import { LDrawConditionalLineMaterial } from "three/examples/jsm/materials/LDrawConditionalLineMaterial.js";
import * as THREE from "three";
import { LDRAW_PATH, BRICK_RENDER_SCALE, BRICK_RENDER_POSITION } from "config/brick-config";
import BrickColorBinding from "@/components/workshop/brick-color-binding";
import { useThree } from "@react-three/fiber";
import { useBrickPartsStore } from "@/store/brick-parts";

type SpawnBrickEvent = { id: string; name: string; path: string };

const setSelectedBrick = (uuid: string | null) => {
  window.dispatchEvent(new CustomEvent("ui/brick/highlight", { detail: uuid }));
};

const LDrawModel = () => {
  const [loadedGroups, setLoadedGroups] = useState<THREE.Group[]>([]);
  const selectedObjectRef = useRef<THREE.Object3D | null>(null);
  const { scene } = useThree();

  const addPart = useBrickPartsStore((state) => state.addPart);
  const deletePart = useBrickPartsStore((state) => state.deletePart);
  const selectPart = useBrickPartsStore((state) => state.selectPart);

  const setObjectOpacity = useCallback((object: THREE.Object3D, alpha: number) => {
    object.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const singleMaterial = mesh.material as THREE.Material;

        singleMaterial.transparent = alpha < 1;
        singleMaterial.opacity = alpha;
        singleMaterial.needsUpdate = true;
      }
    });
  }, []);

  useEffect(() => {
    const loader = new LDrawLoader();

    loader.setConditionalLineMaterial(LDrawConditionalLineMaterial);
    loader.setPartsLibraryPath(LDRAW_PATH);

    const onSpawn = (event: Event) => {
      const { path, name, id } = (event as CustomEvent<SpawnBrickEvent>).detail;

      loader.load(path, (group) => {
        group.scale.set(...BRICK_RENDER_SCALE);
        group.position.set(...BRICK_RENDER_POSITION);
        group.rotateX(Math.PI);

        const box = new THREE.Box3().setFromObject(group);
        if (isFinite(box.min.y) && box.min.y !== 0) {
          group.position.y -= box.min.y;
        }
        setLoadedGroups((prev) => [...prev, group]);

        addPart({ id, name, uuid: group.uuid });

        window.dispatchEvent(
          new CustomEvent("layer-added", {
            detail: { uuid: group.uuid, name },
          })
        );
      });
    };

    window.addEventListener("spawn-brick", onSpawn);
    return () => window.removeEventListener("spawn-brick", onSpawn);
  }, [addPart]);

  const handlePick = (event: {
    delta: number;
    object: THREE.Object3D;
    eventObject?: THREE.Object3D;
  }) => {
    if (event.delta > 8) return;

    if (selectedObjectRef.current) {
      setObjectOpacity(selectedObjectRef.current, 1);
      selectedObjectRef.current = null;
    }

    const clickedThreeObject = event.object;
    const isPickable =
      clickedThreeObject instanceof THREE.Mesh ||
      clickedThreeObject instanceof THREE.LineSegments ||
      clickedThreeObject instanceof THREE.Line;

    if (!isPickable) return;

    if (selectedObjectRef.current) {
      setObjectOpacity(selectedObjectRef.current, 1);
      selectedObjectRef.current = null;
    }

    const objectOpacityChange: THREE.Object3D = event.eventObject ?? event.object;

    setObjectOpacity(objectOpacityChange, 0.5);
    selectedObjectRef.current = objectOpacityChange;

    setSelectedBrick(objectOpacityChange.uuid);
    selectPart(objectOpacityChange.uuid);
  };

  const handleMiss = useCallback(() => {
    if (selectedObjectRef.current) {
      setObjectOpacity(selectedObjectRef.current, 1);
      selectedObjectRef.current = null;
    }
    setSelectedBrick(null);
    selectPart(null);
  }, [setObjectOpacity, selectPart]);

  useEffect(() => {
    window.addEventListener("handle-missed", handleMiss);
    return () => window.removeEventListener("handle-missed", handleMiss);
  }, [handleMiss]);

  useEffect(() => {
    const deletedBrick = (event: Event) => {
      const { uuid: deletedBrickUuid } = (event as CustomEvent<{ uuid: string }>).detail;
      if (!deletedBrickUuid) return;

      const sceneObject = scene.getObjectByProperty(
        "uuid",
        deletedBrickUuid
      ) as THREE.Object3D | null;
      if (!sceneObject) return;

      scene.remove(sceneObject);

      setLoadedGroups((prev) => prev.filter((g) => g.uuid !== deletedBrickUuid));

      if (selectedObjectRef.current?.uuid === deletedBrickUuid) {
        selectedObjectRef.current = null;
      }

      setSelectedBrick(null);
      selectPart(null);
      deletePart(deletedBrickUuid);

      window.dispatchEvent(
        new CustomEvent("layer-deleted", { detail: { uuid: deletedBrickUuid } })
      );
    };

    window.addEventListener("delete-brick", deletedBrick);
    return () => window.removeEventListener("delete-brick", deletedBrick);
  }, [loadedGroups, deletePart, selectPart, scene]);

  return (
    <>
      {loadedGroups.map((group) => (
        <primitive
          key={group.uuid}
          object={group}
          onPointerDown={handlePick}
          onPointerMissed={handleMiss}
        />
      ))}

      <BrickColorBinding selectedRef={selectedObjectRef} />
    </>
  );
};

export default LDrawModel;
