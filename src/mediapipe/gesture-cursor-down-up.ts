import { createCursorPositionSubscriber } from "@/utils/cursor-position-subscriber";
import createClosedFistToggle from "./closed-fist-toggle";
import { dispatchPointerEvent, forceUpIfNeeded } from "@/utils/gesture-pointer-event";
import type { RecognizeResult } from "@/types/gesture";

const createGestureCursorDownUp = () => {
  const cursor = createCursorPositionSubscriber();

  const toggle = createClosedFistToggle({
    onEnter: () => {
      const { x, y } = cursor.get();
      dispatchPointerEvent("down", x, y);
    },
    onExit: () => {
      const { x, y } = cursor.get();
      dispatchPointerEvent("up", x, y);
      window.dispatchEvent(new CustomEvent("virtual-select", { detail: { x, y } }));
    },
  });

  const handle = (results: RecognizeResult) => {
    toggle.handle(results);
  };

  const destroy = () => {
    forceUpIfNeeded();
    toggle.reset();
    cursor.destroy();
  };

  return { handle, destroy };
};

export default createGestureCursorDownUp;
