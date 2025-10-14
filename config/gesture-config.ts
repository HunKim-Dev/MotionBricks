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

export const CURSOR_POSITION = "fixed";

export const CURSOR_INITIAL_LEFT = "0px";

export const CURSOR_INITIAL_TOP = "0px";

export const CURSOR_SIZE_PX = 24;

export const CURSOR_BORDER_RADIUS = "9999px";

export const CURSOR_FILL_COLOR = "rgba(255,255,255,0.6)";

export const CURSOR_OUTLINE_STYLE = "0 0 0 2px rgba(0,0,0,0.25)";

export const CURSOR_TRANSFORM = "translate(-50%, -50%)";

export const CURSOR_POINTER_EVENTS = "none";

export const CURSOR_OPACITY_HIDDEN = 0;

export const CURSOR_TRANSITION_MS = 150;

export const CURSOR_Z_INDEX = 999999;

export const CURSOR_OPACITY_VISIBLE = 1;

export const GESTURE_SCORE_THRESHOLD = 0.75;

export const MIRROR_VIDEO = true;

export const HAND_MIN_POINTS = 18;

export const PALM_INDICES = [5, 9, 13, 17];

export const CLAMP_MIN = 0;

export const CLAMP_MAX = 1;

export const CENTER_NORMALIZED = 0.5;

export const CURSOR_GAIN_X = 2;

export const CURSOR_GAIN_Y = 2;

export const SCREEN_MARGIN = 1;

export const SMOOTH_ALPHA = 0.18;

export const MAX_STEP_PX = 40;

export const HAND_OVERLAY_MAX_FPS = 20;

export const CURSOR_WILL_CHANGE = "transform, opacity";

export const CURSOR_BACKFACE_VISIBILITY = "hidden";

export const CURSOR_CONTAIN = "layout style paint";

export const CURSOR_MOVE_EPSILON_SQ = 0.25;

export const THUMB_UP_ALIASES = ["thumb_up", "thumbs_up", "thumb-up", "thumbsup"];

export const THUMB_DOWN_ALIASES = ["thumb_down", "thumbs_down", "thumb-down", "thumbsdown"];

export const BASE_SPEED_PER_S = 900;

export const SCORE_GAIN_MIN = 0.5;

export const SCORE_GAIN_MAX = 1.0;

export const SMOOTH = 0.6;

export const MAX_ABS_DELTA_PER_FRAME = 120;

export const ZOOM_IN_DIRECTION = -1;

export const ZOOM_OUT_DIRECTION = +1;

export const CURSOR_MOVE_EPSILON = 0.01;

export const INFER_FPS = 24;

export const INFER_INTERVAL = 1000 / INFER_FPS;

export const DRAW_INTERVAL = 1000 / Math.max(1, HAND_OVERLAY_MAX_FPS);

export const POINTER_ID = 1;

export const INITIAL_ACTIVE_STATE = false;

export const MAX_SPEED_PX_PER_S = 2200;
