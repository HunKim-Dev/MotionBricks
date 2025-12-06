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
import { STUD_UNIT, SNAP_MIN_DOT_Y, SNAP_TOLERANCE } from "config/brick-config";
import useSnapOnDrop from "@/hooks/use-snap-on-drop";
import useVictoryDragPlane from "@/hooks/use-victory-drag-plane";
import useVirtualSelect from "@/hooks/use-virtual-select";
import useVictoryDragState from "@/hooks/use-victory-drag-state";
import useGhostBrickFollower from "@/hooks/use-ghost-brick-follower";
import ToolbarAnchorEmitter from "@/components/workshop/tool-bar-anchor-emitter";
import BrickRotateBinding from "./brick-rotate-binding";
import useSceneExporter from "@/hooks/use-scene-exporter";

const LDrawModel = () => {
  const [loadedGroups, setLoadedGroups] = useState<THREE.Group[]>([]);
  const { scene, camera, gl } = useThree();

  const addPart = useBrickPartsStore((state) => state.addPart);
  const deletePart = useBrickPartsStore((state) => state.deletePart);
  const selectPart = useBrickPartsStore((state) => state.selectPart);
  const brickParts = useBrickPartsStore((state) => state.brickParts);

  useGhostBrickFollower();

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

  useSnapOnDrop({
    movingBrick: selectedObject ?? null,
    allBricks: loadedGroups,
    studStepLateral: STUD_UNIT * SNAP_TOLERANCE,
    minDotY: SNAP_MIN_DOT_Y,
  });

  useVirtualSelect({ camera, gl, loadedGroups, handlePick });

  const victoryActive = useVictoryDragState();

  useVictoryDragPlane({
    selectedObject,
    enabled: victoryActive,
    snapStep: STUD_UNIT,
  });

  useSceneExporter({ loadedGroups, brickParts });

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
      <BrickMoveControls object={selectedObject} studStep={STUD_UNIT} />
      <BrickColorBinding selectedRef={selectedObjectRef} />
      <BrickRotateBinding selectedRef={selectedObjectRef} />
      <ToolbarAnchorEmitter selectedRef={selectedObjectRef} />
    </>
  );
};

export default LDrawModel;
