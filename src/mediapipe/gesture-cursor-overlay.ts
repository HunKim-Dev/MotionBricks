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
  MAX_SPEED_PX_PER_S,
} from "config/gesture-config";
import findGestureIndex from "@/utils/find-gesture-index";

const gestureCursorOverlay = (overlay: CursorOverlay) => {
  let smoothX: number | null = null;
  let smoothY: number | null = null;
  let lastOpenPalmTs = 0;
  let missingFrames = 0;
  let seenFrames = 0;
  let prevTs = 0;

  const withinGrace = (now: number, ms = 350) => now - lastOpenPalmTs < ms;

  const handle = (results: RecognizeResult) => {
    const now = performance.now();
    const dt = prevTs ? (now - prevTs) / 1000 : 0;
    prevTs = now;
    const hands = results.landmarks;
    const gestures = results.gestures;

    if (!hands || hands.length === 0 || !gestures || gestures.length === 0) {
      missingFrames += 1;
      seenFrames = 0;

      if (withinGrace(now) || missingFrames < 12) {
        overlay.show();
      } else {
        overlay.hide();
      }
      return;
    }

    const idxOpen = findGestureIndex(results, "open_palm", GESTURE_SCORE_THRESHOLD);
    const idxVictory = findGestureIndex(results, "victory", GESTURE_SCORE_THRESHOLD);
    const targetIndex = idxOpen !== -1 ? idxOpen : idxVictory;

    if (targetIndex === -1) {
      missingFrames += 1;
      seenFrames = 0;
      if (withinGrace(now) || missingFrames < 12) {
        overlay.show();
      } else {
        overlay.hide();
      }
      return;
    }

    lastOpenPalmTs = now;
    missingFrames = 0;
    seenFrames += 1;

    if (seenFrames < 2) {
      overlay.show();
      return;
    }

    const hand = hands[targetIndex];

    if (!hand || hand.length < HAND_MIN_POINTS) {
      missingFrames += 1;
      seenFrames = 0;

      if (withinGrace(now) || missingFrames < 12) {
        overlay.show();
      } else {
        overlay.hide();
      }
      return;
    }

    const palmPoints = PALM_INDICES.map((index) => hand[index]).filter(Boolean);

    if (palmPoints.length === 0) {
      missingFrames += 1;
      seenFrames = 0;

      if (withinGrace(now) || missingFrames < 12) {
        overlay.show();
      } else {
        overlay.hide();
      }
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

      const maxStep = dt > 0 ? MAX_SPEED_PX_PER_S * dt : MAX_STEP_PX;

      const deltaX = smoothedTargetX - smoothX;
      const deltaY = smoothedTargetY - smoothY;

      const clampStep = (delta: number, max: number) =>
        Math.abs(delta) > max ? Math.sign(delta) * max : delta;

      smoothX += clampStep(deltaX, maxStep);
      smoothY += clampStep(deltaY, maxStep);
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
