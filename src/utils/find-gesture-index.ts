import { GESTURE_SCORE_THRESHOLD } from "config/gesture-config";
import type { RecognizeResult } from "@/types/gesture";

const findGestureIndex = (
  results: RecognizeResult,
  targetGesture: string,
  threshold = GESTURE_SCORE_THRESHOLD
): number => {
  const hands = results.landmarks ?? [];
  const gestures = results.gestures ?? [];

  for (let i = 0; i < hands.length; i++) {
    const gestureList = gestures[i];

    if (!gestureList || gestureList.length === 0) continue;

    const topGesture = gestureList[0];

    if (!topGesture || !topGesture.categoryName) continue;

    const gestureName = String(topGesture.categoryName).toLowerCase();
    const gestureConfidence = typeof topGesture.score === "number" ? topGesture.score : 0;

    if (gestureName === targetGesture && gestureConfidence >= threshold) {
      return i;
    }
  }

  return -1;
};

export default findGestureIndex;
