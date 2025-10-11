"use client";

import { FilesetResolver, GestureRecognizer } from "@mediapipe/tasks-vision";
import {
  GESTURE_MODEL_PATH,
  MEDIAPIPE_WASM_ROOT,
  GESTURE_DELEGATE_MODE,
  GESTURE_RUNNING_MODE,
  GESTURE_TRACK_HAND_COUNT,
} from "config/gesture-config";

const initGestureRecognizer = async () => {
  const vision = await FilesetResolver.forVisionTasks(MEDIAPIPE_WASM_ROOT);
  const recognizer = await GestureRecognizer.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: GESTURE_MODEL_PATH,
      delegate: GESTURE_DELEGATE_MODE,
    },
    runningMode: GESTURE_RUNNING_MODE,
    numHands: GESTURE_TRACK_HAND_COUNT,
  });
  return recognizer;
};

export default initGestureRecognizer;
