import type { RecognizeResult } from "@/types/gesture";
import { createCursorPositionSubscriber } from "@/utils/cursor-position-subscriber";
import { dispatchWheel, enableCanvasPointerTarget } from "@/utils/gesture-pointer-event";
import {
  GESTURE_SCORE_THRESHOLD,
  THUMB_UP_ALIASES,
  THUMB_DOWN_ALIASES,
  BASE_SPEED_PER_S,
  SCORE_GAIN_MIN,
  SCORE_GAIN_MAX,
  SMOOTH,
  MAX_ABS_DELTA_PER_FRAME,
  ZOOM_IN_DIRECTION,
  ZOOM_OUT_DIRECTION,
} from "config/gesture-config";

const isOneOf = (name: string, aliases: string[]) => aliases.includes(name.toLowerCase());

export default function createGestureThumbZoom() {
  const cursor = createCursorPositionSubscriber();

  let active = false;
  let lastTs = 0;
  let smoothedDir = 0;

  const handle = (results: RecognizeResult) => {
    const { gestures } = results;
    if (!gestures || gestures.length === 0) {
      if (active) {
        active = false;
        enableCanvasPointerTarget(false);
      }
      return;
    }

    const upScores: number[] = [];
    const downScores: number[] = [];

    for (const handGests of gestures) {
      if (!handGests || handGests.length === 0) continue;

      let bestUp = 0;
      let bestDown = 0;

      for (const gesture of handGests) {
        const gestureName = gesture.categoryName;
        const gestureConfidence = gesture.score || 0;

        if (gestureConfidence < GESTURE_SCORE_THRESHOLD) continue;

        if (isOneOf(gestureName, THUMB_UP_ALIASES)) {
          bestUp = Math.max(bestUp, gestureConfidence);
        }

        if (isOneOf(gestureName, THUMB_DOWN_ALIASES))
          bestDown = Math.max(bestDown, gestureConfidence);
      }

      if (bestUp > 0) {
        upScores.push(bestUp);
      }

      if (bestDown > 0) {
        downScores.push(bestDown);
      }
    }

    const upPower = upScores.reduce((sum, value) => sum + value, 0);
    const downPower = downScores.reduce((sum, value) => sum + value, 0);

    if (upPower === 0 && downPower === 0) {
      if (active) {
        active = false;
        enableCanvasPointerTarget(false);
      }
      return;
    }

    if (!active) {
      active = true;
      enableCanvasPointerTarget(true);
      smoothedDir = 0;
      lastTs = performance.now();
    }

    const currentTime = performance.now();
    const deltaTimeSec = lastTs ? (currentTime - lastTs) / 1000 : 0;
    lastTs = currentTime;

    const zoomDirectionRaw = upPower >= downPower ? ZOOM_IN_DIRECTION : ZOOM_OUT_DIRECTION;

    const gestureScore = zoomDirectionRaw < 0 ? upScores : downScores;
    const averageScore = gestureScore.length
      ? gestureScore.reduce((sum, value) => sum + value, 0) / gestureScore.length
      : 0;
    const zoomSpeedGain =
      SCORE_GAIN_MIN +
      (SCORE_GAIN_MAX - SCORE_GAIN_MIN) *
        Math.min(
          1,
          Math.max(0, (averageScore - GESTURE_SCORE_THRESHOLD) / (1 - GESTURE_SCORE_THRESHOLD))
        );

    smoothedDir = smoothedDir * (1 - SMOOTH) + zoomDirectionRaw * SMOOTH;

    let deltaY = smoothedDir * BASE_SPEED_PER_S * zoomSpeedGain * (deltaTimeSec || 1 / 60);

    if (deltaY > MAX_ABS_DELTA_PER_FRAME) {
      deltaY = MAX_ABS_DELTA_PER_FRAME;
    } else if (deltaY < -MAX_ABS_DELTA_PER_FRAME) {
      deltaY = -MAX_ABS_DELTA_PER_FRAME;
    }

    const { x, y } = cursor.get();
    dispatchWheel(x, y, deltaY);
  };

  const destroy = () => {
    enableCanvasPointerTarget(false);
    cursor.destroy();
    active = false;
    smoothedDir = 0;
    lastTs = 0;
  };

  return { handle, destroy };
}
