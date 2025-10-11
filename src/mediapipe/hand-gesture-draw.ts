import { DrawingUtils, GestureRecognizer } from "@mediapipe/tasks-vision";
import type { Landmarks } from "@/types/gesture";
import { HAND_GESTURE_CONNECTOR_STYLE, HAND_GESTURE_LANDMARK_STYLE } from "config/gesture-config";

const handGestureDraw = (
  canvasCtx: CanvasRenderingContext2D,
  landmarksList: Landmarks[] | undefined
) => {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);

  if (landmarksList?.length) {
    const drawingUtils = new DrawingUtils(canvasCtx);
    for (const landmarks of landmarksList) {
      drawingUtils.drawConnectors(
        landmarks,
        GestureRecognizer.HAND_CONNECTIONS,
        HAND_GESTURE_CONNECTOR_STYLE
      );
      drawingUtils.drawLandmarks(landmarks, HAND_GESTURE_LANDMARK_STYLE);
    }
  }

  canvasCtx.restore();
};

export default handGestureDraw;
