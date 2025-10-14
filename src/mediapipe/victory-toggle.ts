import type { RecognizeResult, VictoryToggleOptions } from "@/types/gesture";
import findGestureIndex from "@/utils/find-gesture-index";
import { GESTURE_SCORE_THRESHOLD, INITIAL_ACTIVE_STATE } from "config/gesture-config";

const createVictoryToggle = ({ onEnter, onExit }: VictoryToggleOptions) => {
  let dragActive = INITIAL_ACTIVE_STATE;

  const handleDragChange = (results: RecognizeResult) => {
    const gestureIndex = findGestureIndex(results, "victory", GESTURE_SCORE_THRESHOLD);
    const dragDetected = gestureIndex !== -1;

    if (!dragActive && dragDetected) {
      dragActive = true;
      onEnter();
    } else if (dragActive && !dragDetected) {
      dragActive = false;
      onExit();
    }
  };

  const resetGesture = () => {
    if (dragActive) {
      dragActive = false;
      onExit();
    }
  };
  return { handle: handleDragChange, reset: resetGesture };
};

export default createVictoryToggle;
