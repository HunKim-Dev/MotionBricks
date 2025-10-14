"use client";

import useGhostBrickSpawn from "./use-ghost-brick-spawn";
import useGhostCursorFollow from "./use-ghost-cursor-follower";
import useGhostConfirm from "./use-ghost-confirm";

const useGhostBrickFollower = () => {
  const { ghostRef, ghostMeta } = useGhostBrickSpawn();

  useGhostCursorFollow({ ghostRef });
  useGhostConfirm({ ghostRef, ghostMeta });
};

export default useGhostBrickFollower;
