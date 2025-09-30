"use client";

import { useState } from "react";
import * as THREE from "three";
import BrickColorBinding from "@/components/workshop/brick-color-binding";
import { useThree } from "@react-three/fiber";
import { useBrickPartsStore } from "@/store/brick-parts";
import useBrickSelection from "@/hooks/use-brick-selection";
import useBrickDeletion from "@/hooks/use-brick-deletion";
import useBrickSpawn from "@/hooks/use-brick-spawn";
import BrickMoveControls from "./brick-move-controls";
import { STUD_UNIT } from "config/brick-config";

const LDrawModel = () => {
  const [loadedGroups, setLoadedGroups] = useState<THREE.Group[]>([]);
  const { scene } = useThree();

  const addPart = useBrickPartsStore((state) => state.addPart);
  const deletePart = useBrickPartsStore((state) => state.deletePart);
  const selectPart = useBrickPartsStore((state) => state.selectPart);

  const { selectedObject, selectedObjectRef, handlePick, handleMiss } =
    useBrickSelection(selectPart);

  useBrickSpawn({ setLoadedGroups, addPart });

  useBrickDeletion({
    scene,
    setLoadedGroups,
    setSelectedBrick: (uuid) =>
      window.dispatchEvent(new CustomEvent("ui/brick/highlight", { detail: uuid })),
    selectPart,
    deletePart,
    selectedObjectRef,
  });

  return (
    <>
      {loadedGroups.map((group) => (
        <primitive
          key={group.uuid}
          object={group}
          onClick={handlePick}
          onPointerMissed={handleMiss}
        />
      ))}
      <BrickMoveControls object={selectedObject} studStep={STUD_UNIT} lockY />
      <BrickColorBinding selectedRef={selectedObjectRef} />
    </>
  );
};

export default LDrawModel;
