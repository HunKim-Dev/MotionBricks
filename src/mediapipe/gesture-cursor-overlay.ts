import { RecognizeResult, CursorOverlay } from "@/types/gesture";
import {
  GESTURE_SCORE_THRESHOLD,
  MIRROR_VIDEO,
  HAND_MIN_POINTS,
  FINGER_TIP_INDEX,
  CLAMP_MIN,
  CLAMP_MAX,
  CENTER_NORMALIZED,
  CURSOR_GAIN_X,
  CURSOR_GAIN_Y,
  SCREEN_MARGIN,
} from "config/gesture-config";
import findGestureIndex from "@/utils/find-gesture-index";

const gestureCursorOverlay = (overlay: CursorOverlay) => {
  const handle = (results: RecognizeResult) => {
    const hands = results.landmarks;
    const gestures = results.gestures;

    if (!hands || hands.length === 0 || !gestures || gestures.length === 0) {
      overlay.hide();
      return;
    }

    const targetIndex = findGestureIndex(results, "pointing_up", GESTURE_SCORE_THRESHOLD);

    if (targetIndex === -1) {
      overlay.hide();
      return;
    }

    const hand = hands[targetIndex];

    if (!hand || hand.length < HAND_MIN_POINTS) {
      overlay.hide();
      return;
    }

    const indexFingerTip = hand[FINGER_TIP_INDEX];

    const clamp = (v: number, min = CLAMP_MIN, max = CLAMP_MAX) => Math.min(max, Math.max(min, v));
    const normalizedX = clamp(MIRROR_VIDEO ? 1 - indexFingerTip.x : indexFingerTip.x);
    const normalizedY = clamp(indexFingerTip.y);

    const deviationX = normalizedX - CENTER_NORMALIZED;
    const deviationY = normalizedY - CENTER_NORMALIZED;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let cursorX = viewportWidth / 2 + deviationX * viewportWidth * CURSOR_GAIN_X;
    let cursorY = viewportHeight / 2 + deviationY * viewportHeight * CURSOR_GAIN_Y;

    cursorX = Math.min(viewportWidth - SCREEN_MARGIN, Math.max(0, cursorX));
    cursorY = Math.min(viewportHeight - SCREEN_MARGIN, Math.max(0, cursorY));

    overlay.move(cursorX, cursorY);
    overlay.show();
  };

  const destroy = () => overlay.destroy();

  return { handle, destroy };
};

export default gestureCursorOverlay;
