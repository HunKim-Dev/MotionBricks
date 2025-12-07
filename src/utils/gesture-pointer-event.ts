let isDown = false;
let downTarget: Element | null = null;
let lastDownXY: { x: number; y: number } | null = null;
let canvasTarget: Element | null = null;
let useCanvasOnly = false;
let alsoDispatchMouse = false;

export const setAlsoDispatchMouse = (on: boolean) => {
  alsoDispatchMouse = on;
};

export const setCanvasPointerTarget = (element: Element | null) => {
  canvasTarget = element;
};
export const enableCanvasPointerTarget = (enable: boolean) => {
  useCanvasOnly = enable;
};

const ensureCanvasTarget = (element: Element | null): Element => {
  if (useCanvasOnly && canvasTarget) return canvasTarget;
  if (!element) return document.body;

  const canvas = element.closest("canvas");
  return canvas ?? element;
};

const dispatchMouse = (
  target: Element,
  type: "mousedown" | "mousemove" | "mouseup" | "click",
  x: number,
  y: number
) => {
  if (!alsoDispatchMouse) return;
  target.dispatchEvent(
    new MouseEvent(type, {
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y,
      buttons: type === "mousedown" ? 1 : 0,
      button: 0,
    })
  );
};

const makePointerInit = (
  x: number,
  y: number,
  extra?: Partial<PointerEventInit>
): PointerEventInit => ({
  bubbles: true,
  cancelable: true,
  clientX: x,
  clientY: y,
  pointerId: 1,
  isPrimary: true,
  pointerType: "mouse",
  pressure: 0.5,
  ...extra,
});

export const dispatchPointerEvent = (type: "down" | "up", x: number, y: number) => {
  if (type === "down") {
    downTarget = ensureCanvasTarget(document.elementFromPoint(x, y));
    isDown = true;
    lastDownXY = { x, y };

    downTarget.dispatchEvent(
      new PointerEvent(
        "pointerdown",
        makePointerInit(x, y, { buttons: 1, button: 0, pressure: 0.5 })
      )
    );
    dispatchMouse(downTarget, "mousedown", x, y);
    return;
  }

  const target = ensureCanvasTarget(downTarget ?? document.elementFromPoint(x, y));

  target.dispatchEvent(
    new PointerEvent("pointermove", makePointerInit(x, y, { buttons: 0, button: 0, pressure: 0 }))
  );
  dispatchMouse(target, "mousemove", x, y);

  target.dispatchEvent(
    new PointerEvent("pointerup", makePointerInit(x, y, { buttons: 0, button: 0, pressure: 0 }))
  );
  dispatchMouse(target, "mouseup", x, y);

  if (lastDownXY) {
    const dx = x - lastDownXY.x;
    const dy = y - lastDownXY.y;
    const movedSq = dx * dx + dy * dy;

    if (movedSq <= 36) {
      target.dispatchEvent(
        new PointerEvent("click", makePointerInit(x, y, { buttons: 0, button: 0, pressure: 0 }))
      );
      dispatchMouse(target, "click", x, y);
    }
  }

  isDown = false;
  downTarget = null;
  lastDownXY = null;
};

export const dispatchPointerMove = (x: number, y: number) => {
  const target = ensureCanvasTarget(downTarget ?? document.elementFromPoint(x, y));

  target.dispatchEvent(
    new PointerEvent(
      "pointermove",
      makePointerInit(x, y, { buttons: isDown ? 1 : 0, button: 0, pressure: isDown ? 0.5 : 0 })
    )
  );
  dispatchMouse(target, "mousemove", x, y);
};

export const dispatchWheel = (x: number, y: number, deltaY: number, extra?: WheelEventInit) => {
  const target = ensureCanvasTarget(downTarget ?? document.elementFromPoint(x, y));

  target.dispatchEvent(
    new WheelEvent("wheel", {
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y,
      deltaY,
      deltaMode: 0,
      ...extra,
    })
  );
};

export const forceUpIfNeeded = () => {
  if (!isDown) return;

  const x = lastDownXY?.x ?? 0;
  const y = lastDownXY?.y ?? 0;

  dispatchPointerEvent("up", x, y);
};
