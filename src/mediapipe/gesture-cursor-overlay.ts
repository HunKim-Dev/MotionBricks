import { RecognizeResult, CursorOverlay } from "@/types/gesture";
import {
  GESTURE_SCORE_THRESHOLD,
  MIRROR_VIDEO,
  HAND_MIN_POINTS,
  PALM_INDICES,
  CLAMP_MIN,
  CLAMP_MAX,
  CENTER_NORMALIZED,
  CURSOR_GAIN_X,
  CURSOR_GAIN_Y,
  SCREEN_MARGIN,
  SMOOTH_ALPHA,
  MAX_STEP_PX,
} from "config/gesture-config";
import findGestureIndex from "@/utils/find-gesture-index";

const gestureCursorOverlay = (overlay: CursorOverlay) => {
  let smoothX: number | null = null;
  let smoothY: number | null = null;

  const handle = (results: RecognizeResult) => {
    const hands = results.landmarks;
    const gestures = results.gestures;

    if (!hands || hands.length === 0 || !gestures || gestures.length === 0) {
      overlay.hide();
      return;
    }

    const targetIndex = findGestureIndex(results, "open_palm", GESTURE_SCORE_THRESHOLD);

    if (targetIndex === -1) {
      overlay.hide();
      return;
    }

    const hand = hands[targetIndex];

    if (!hand || hand.length < HAND_MIN_POINTS) {
      overlay.hide();
      return;
    }

    const palmPoints = PALM_INDICES.map((index) => hand[index]).filter(Boolean);

    if (palmPoints.length === 0) {
      overlay.hide();
      return;
    }

    const palmCenterX = palmPoints.reduce((sum, point) => sum + point.x, 0) / palmPoints.length;
    const palmCenterY = palmPoints.reduce((sum, point) => sum + point.y, 0) / palmPoints.length;

    const clamp = (v: number, min = CLAMP_MIN, max = CLAMP_MAX) => Math.min(max, Math.max(min, v));
    const normalizedX = clamp(MIRROR_VIDEO ? 1 - palmCenterX : palmCenterX);
    const normalizedY = clamp(palmCenterY);

    const deviationX = normalizedX - CENTER_NORMALIZED;
    const deviationY = normalizedY - CENTER_NORMALIZED;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const targetX = viewportWidth / 2 + deviationX * viewportWidth * CURSOR_GAIN_X;
    const targetY = viewportHeight / 2 + deviationY * viewportHeight * CURSOR_GAIN_Y;

    if (smoothX === null || smoothY === null) {
      smoothX = targetX;
      smoothY = targetY;
    } else {
      const smoothedTargetX = smoothX * (1 - SMOOTH_ALPHA) + targetX * SMOOTH_ALPHA;
      const smoothedTargetY = smoothY * (1 - SMOOTH_ALPHA) + targetY * SMOOTH_ALPHA;

      const deltaX = smoothedTargetX - smoothX;
      const deltaY = smoothedTargetY - smoothY;

      const clampStep = (delta: number, max: number) =>
        Math.abs(delta) > max ? Math.sign(delta) * max : delta;

      smoothX += clampStep(deltaX, MAX_STEP_PX);
      smoothY += clampStep(deltaY, MAX_STEP_PX);
    }

    const cursorX = Math.min(viewportWidth - SCREEN_MARGIN, Math.max(0, smoothX));
    const cursorY = Math.min(viewportHeight - SCREEN_MARGIN, Math.max(0, smoothY));

    overlay.move(cursorX, cursorY);
    overlay.show();
  };

  const destroy = () => overlay.destroy();

  return { handle, destroy };
};

export default gestureCursorOverlay;
