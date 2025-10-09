import * as THREE from "three";
import { useEffect, useRef } from "react";
import aabbFindCollidersXZ from "@/collision/aabb-find-colliders-xz";
import transformSnapPoints from "@/snap/transform-snap-points";
import collectSeed from "@/snap/candidates/collect-seed";
import snapExecute from "@/snap/selector/snap-execute";
import type { PartSnapData } from "@/types/snap";
import { getBrickRoot } from "@/utils/get-brick-root";
import {
  SNAP_MIN_DOT_Y,
  AABB_HELPER_COLOR,
  AABB_HELPER_LIFETIME_MS,
  PART_ID_DIGITS_REGEX,
} from "config/brick-config";

type UseSnapOnDropParams = {
  movingBrick: THREE.Object3D | null;
  allBricks: THREE.Object3D[];
  studStepLateral: number;
  minDotY?: number;
};

const useSnapOnDrop = ({
  movingBrick,
  allBricks,
  studStepLateral,
  minDotY = SNAP_MIN_DOT_Y,
}: UseSnapOnDropParams) => {
  const movingBrickRef = useRef<THREE.Object3D | null>(null);
  const allBricksRef = useRef<THREE.Object3D[]>([]);
  const snapOptionsRef = useRef({ studStepLateral, minDotY });

  useEffect(() => {
    movingBrickRef.current = movingBrick;
  }, [movingBrick]);

  useEffect(() => {
    allBricksRef.current = allBricks;
  }, [allBricks]);

  useEffect(() => {
    snapOptionsRef.current = { studStepLateral, minDotY };
  }, [studStepLateral, minDotY]);

  useEffect(() => {
    const onOrbitLock = (event: Event) => {
      const dragging = (event as CustomEvent<boolean>).detail;

      if (dragging !== false) return;

      const movingRaw = movingBrickRef.current;

      if (!movingRaw) {
        return;
      }

      const movingRootBrick = getBrickRoot(movingRaw);
      const rootBrickList = allBricksRef.current.map(getBrickRoot);

      const { studStepLateral: maxXZ, minDotY: minY } = snapOptionsRef.current;

      if (!movingRootBrick) return;

      const otherBricks = rootBrickList.filter((g) => g && g !== movingRootBrick);
      const collidingBricks = aabbFindCollidersXZ(movingRootBrick, otherBricks);

      if (collidingBricks.length === 0) return;

      const movingSnapWorld: PartSnapData | null = transformSnapPoints(movingRootBrick);

      if (!movingSnapWorld) return;

      const targetSnapWorldList: Array<{ targetBrickId: number; part: PartSnapData }> =
        collidingBricks

          .map((target) => {
            const tRoot = getBrickRoot(target);
            const targetSnapBrick = transformSnapPoints(tRoot);

            const brickRoot = tRoot as THREE.Object3D & { userData: { partId?: string } };
            const brickId = brickRoot.userData.partId;

            if (!targetSnapBrick || !brickId) return null;

            return {
              targetBrickId: Number(brickId.replace(PART_ID_DIGITS_REGEX, "")) || 0,
              part: targetSnapBrick,
            };
          })
          .filter((item): item is { targetBrickId: number; part: PartSnapData } => item !== null);

      if (targetSnapWorldList.length === 0) return;

      const candidates = collectSeed(movingSnapWorld, targetSnapWorldList, {
        maxXZ: maxXZ,
        minDotY: minY,
      });

      if (!candidates || candidates.length === 0) return;

      collidingBricks.forEach((brick) => {
        const aabbBox = new THREE.Box3().setFromObject(brick);
        const boxHelper = new THREE.Box3Helper(aabbBox, AABB_HELPER_COLOR);

        movingRootBrick.parent?.add(boxHelper);
        setTimeout(() => boxHelper.removeFromParent(), AABB_HELPER_LIFETIME_MS);
      });

      snapExecute(movingRootBrick, movingSnapWorld, targetSnapWorldList, candidates);
    };

    window.addEventListener("orbit-lock", onOrbitLock);
    return () => window.removeEventListener("orbit-lock", onOrbitLock);
  }, []);
};

export default useSnapOnDrop;
