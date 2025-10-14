"use client";

import { useEffect, useState } from "react";

const useVictoryDragState = () => {
  const [victoryActive, setVictoryActive] = useState(false);

  useEffect(() => {
    const onStart = () => setVictoryActive(true);
    const onEnd = () => setVictoryActive(false);
    window.addEventListener("victory-drag-start", onStart);
    window.addEventListener("victory-drag-end", onEnd);
    return () => {
      window.removeEventListener("victory-drag-start", onStart);
      window.removeEventListener("victory-drag-end", onEnd);
    };
  }, []);

  return victoryActive;
};

export default useVictoryDragState;
