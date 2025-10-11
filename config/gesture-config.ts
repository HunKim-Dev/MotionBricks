export const MEDIAPIPE_WASM_ROOT =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm";

export const GESTURE_MODEL_PATH = "/hand-models/gesture_recognizer.task";

export const GESTURE_DELEGATE_MODE = "GPU";

export const GESTURE_RUNNING_MODE = "VIDEO";

export const GESTURE_TRACK_HAND_COUNT = 2;

export const HAND_GESTURE_CONNECTOR_STYLE = { color: "#00FF00", lineWidth: 5 };

export const HAND_GESTURE_LANDMARK_STYLE = { color: "#FF0000", lineWidth: 2 };

export const CANVAS_CONTEXT_MODE = "2d";

export const VIDEO_READY_STATE_THRESHOLD = 2;

export const MEDIAPIPE_NOISY_PATTERNS = [
  "Created TensorFlow Lite XNNPACK delegate for CPU",
  "Graph successfully started running",
  "Hand Gesture Recognizer contains CPU only ops",
  "Custom gesture classifier is not defined",
  "OpenGL error checking is disabled",
];
