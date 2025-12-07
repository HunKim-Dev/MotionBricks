export const createCursorPositionSubscriber = () => {
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;

  const onMove = (event: Event) => {
    const { x: normalizedX, y: normalizedY } = (event as CustomEvent<{ x: number; y: number }>)
      .detail;
    x = normalizedX;
    y = normalizedY;
  };

  window.addEventListener("cursor-move", onMove);

  return {
    get: () => ({ x, y }),
    destroy: () => window.removeEventListener("cursor-move", onMove),
  };
};
