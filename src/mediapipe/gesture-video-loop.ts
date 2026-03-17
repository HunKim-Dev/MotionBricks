"use client";

import type { GestureRecognizer } from "@mediapipe/tasks-vision";
import type { RecognizeResult } from "@/types/gesture";
import handGestureDraw from "./hand-gesture-draw";
import {
  CANVAS_CONTEXT_MODE,
  VIDEO_READY_STATE_THRESHOLD,
  INFER_INTERVAL,
  DRAW_INTERVAL,
} from "config/gesture-config";
import createCursorOverlay from "./create-cursor-overlay";
import gestureCursorOverlay from "./gesture-cursor-overlay";
import createGestureCursorDownUp from "./gesture-cursor-down-up";
import createGestureCursorDrag from "./gesture-cursor-drag";
import createGesturePinchZoom from "./create-gesture-zoom-in-out";

const gestureVideoLoop = (
  canvasElement: HTMLCanvasElement,
  video: HTMLVideoElement,
  gestureRecognizer: GestureRecognizer
) => {
  let lastVideoTime = -1;
  let rafId: number | null = null;

  let lastResults: RecognizeResult | null = null;
  let freshResults = false;
  let lastFeedbackName = "";

  let lastInferTime = 0;
  let lastDrawTime = 0;

  const cursorOverlay = createCursorOverlay();
  const cursorController = gestureCursorOverlay(cursorOverlay);
  const mouseDownUp = createGestureCursorDownUp();
  const mouseDrag = createGestureCursorDrag();
  const pinchZoom = createGesturePinchZoom();

  const canvasCtx = canvasElement.getContext(CANVAS_CONTEXT_MODE);

  const predictWebcam = () => {
    if (canvasElement.width !== video.videoWidth || canvasElement.height !== video.videoHeight) {
      canvasElement.width = video.videoWidth;
      canvasElement.height = video.videoHeight;
    }

    const nowLoop = performance.now();
    const canInfer = nowLoop - lastInferTime >= INFER_INTERVAL;

    if (video.currentTime !== lastVideoTime) {
      lastVideoTime = video.currentTime;

      if (canInfer) {
        lastInferTime = nowLoop;
        const nowIn = performance.now();
        lastResults = gestureRecognizer.recognizeForVideo(video, nowIn) as RecognizeResult;
        freshResults = true;

        const topGesture = lastResults.gestures?.[0]?.[0];
        const gestureName = topGesture?.categoryName?.toLowerCase() ?? "";
        const feedbackName = gestureName && gestureName !== "none" ? gestureName : "";

        if (feedbackName !== lastFeedbackName) {
          lastFeedbackName = feedbackName;
          window.dispatchEvent(
            new CustomEvent("gesture-feedback", {
              detail: feedbackName ? { name: feedbackName } : null,
            })
          );
        }
      }
    }

    if (lastResults) {
      if (canvasCtx) {
        if (nowLoop - lastDrawTime >= DRAW_INTERVAL) {
          lastDrawTime = nowLoop;
          handGestureDraw(canvasCtx, lastResults.landmarks);
        }
      }

      cursorController.handle(lastResults);

      if (freshResults) {
        freshResults = false;
        mouseDownUp.handle(lastResults);
        mouseDrag.handle(lastResults);
        pinchZoom.handle(lastResults);
      }
    }

    rafId = requestAnimationFrame(predictWebcam);
  };

  const onLoaded = () => {
    predictWebcam();
  };

  if (video.readyState >= VIDEO_READY_STATE_THRESHOLD) {
    onLoaded();
  } else {
    video.addEventListener("loadeddata", onLoaded, { once: true });
  }

  const stopLoop = () => {
    if (rafId) cancelAnimationFrame(rafId);
    video.removeEventListener("loadeddata", onLoaded);
    rafId = null;
    cursorController.destroy();
    mouseDownUp.destroy();
    mouseDrag.destroy();
    pinchZoom.destroy();
  };

  return stopLoop;
};

export default gestureVideoLoop;
