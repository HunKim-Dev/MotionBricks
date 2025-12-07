import { createCursorPositionSubscriber } from "@/utils/cursor-position-subscriber";
import createVictoryToggle from "./victory-toggle";
import {
  enableCanvasPointerTarget,
  dispatchPointerEvent,
  dispatchPointerMove,
  forceUpIfNeeded,
} from "@/utils/gesture-pointer-event";
import type { RecognizeResult } from "@/types/gesture";
import { CURSOR_MOVE_EPSILON } from "config/gesture-config";

const createGestureCursorDrag = () => {
  const cursor = createCursorPositionSubscriber();

  const onCursorMove = (event: Event) => {
    const { x, y } = (event as CustomEvent<{ x: number; y: number }>).detail;
    dispatchPointerMove(x, y);
  };

  const toggle = createVictoryToggle({
    onEnter: () => {
      const { x, y } = cursor.get();

      enableCanvasPointerTarget(true);

      window.dispatchEvent(new Event("victory-drag-start"));

      dispatchPointerMove(x, y);
      dispatchPointerEvent("down", x, y);
      dispatchPointerMove(x + CURSOR_MOVE_EPSILON, y + CURSOR_MOVE_EPSILON);

      window.addEventListener("cursor-move", onCursorMove);
    },
    onExit: () => {
      const { x, y } = cursor.get();

      dispatchPointerMove(x, y);
      dispatchPointerEvent("up", x, y);

      window.removeEventListener("cursor-move", onCursorMove);
      enableCanvasPointerTarget(false);

      window.dispatchEvent(new Event("victory-drag-end"));
    },
  });

  const handle = (results: RecognizeResult) => {
    toggle.handle(results);
  };

  const destroy = () => {
    window.removeEventListener("cursor-move", onCursorMove);
    forceUpIfNeeded();
    toggle.reset();
    cursor.destroy();
  };

  return { handle, destroy };
};

export default createGestureCursorDrag;
