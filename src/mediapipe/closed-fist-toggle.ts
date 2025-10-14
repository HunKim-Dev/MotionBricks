import type { RecognizeResult, ClosedFistToggleOptions } from "@/types/gesture";
import findGestureIndex from "@/utils/find-gesture-index";
import { GESTURE_SCORE_THRESHOLD, INITIAL_ACTIVE_STATE } from "config/gesture-config";

const createClosedFistToggle = ({ onEnter, onExit }: ClosedFistToggleOptions) => {
  let fistActive = INITIAL_ACTIVE_STATE;

  const handleGestureChange = (results: RecognizeResult) => {
    const gestureIndex = findGestureIndex(results, "closed_fist", GESTURE_SCORE_THRESHOLD);
    const fistDetected = gestureIndex !== -1;

    if (!fistActive && fistDetected) {
      fistActive = true;
      onEnter();
    } else if (fistActive && !fistDetected) {
      fistActive = false;
      onExit();
    }
  };

  const resetGesture = () => {
    if (fistActive) {
      fistActive = false;
      onExit();
    }
  };
  return { handle: handleGestureChange, reset: resetGesture };
};

export default createClosedFistToggle;
