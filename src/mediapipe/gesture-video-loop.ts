"use client";

import type { GestureRecognizer } from "@mediapipe/tasks-vision";
import type { RecognizeResult } from "@/types/gesture";
import handGestureDraw from "./hand-gesture-draw";
import { CANVAS_CONTEXT_MODE, VIDEO_READY_STATE_THRESHOLD } from "config/gesture-config";

const gestureVideoLoop = (
  canvasElement: HTMLCanvasElement,
  video: HTMLVideoElement,
  gestureRecognizer: GestureRecognizer
) => {
  let lastVideoTime = -1;
  let rafId: number | null = null;

  const canvasCtx = canvasElement.getContext(CANVAS_CONTEXT_MODE);

  const predictWebcam = () => {
    if (canvasElement.width !== video.videoWidth || canvasElement.height !== video.videoHeight) {
      canvasElement.width = video.videoWidth;
      canvasElement.height = video.videoHeight;
    }

    if (video.currentTime !== lastVideoTime) {
      lastVideoTime = video.currentTime;

      const nowIn = performance.now();
      const results = gestureRecognizer.recognizeForVideo(video, nowIn) as RecognizeResult;
      if (!canvasCtx) return;

      handGestureDraw(canvasCtx, results.landmarks);
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
  };

  return stopLoop;
};

export default gestureVideoLoop;
