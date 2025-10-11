"use client";

import { useRef, useEffect } from "react";
import { CAMERA_START_ERROR } from "config/app-config";
import initGestureRecognizer from "@/mediapipe/init-gesture-recognizer";
import gestureVideoLoop from "@/mediapipe/gesture-video-loop";
import ConsoleErrorFilter from "@/mediapipe/console-error-filter";

const HandPreview = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const stopLoopRef = useRef<null | (() => void)>(null);

  const startCamera = async () => {
    if (streamRef.current) return;

    try {
      const streamCamera = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      streamRef.current = streamCamera;

      if (videoRef.current) {
        videoRef.current.srcObject = streamCamera;
        await videoRef.current.play();
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video && canvas) {
        const recognizer = await initGestureRecognizer();

        stopLoopRef.current = gestureVideoLoop(canvas, video, recognizer);
      }
    } catch (error) {
      console.error(CAMERA_START_ERROR, error);
    }
  };

  const stopCamera = () => {
    if (stopLoopRef.current) {
      stopLoopRef.current();
      stopLoopRef.current = null;
    }

    if (!streamRef.current) return;
    streamRef.current.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  useEffect(() => {
    startCamera();
    const onStart = () => startCamera();
    const onStop = () => stopCamera();

    window.addEventListener("camera:start", onStart);
    window.addEventListener("camera:stop", onStop);

    return () => {
      window.removeEventListener("camera:start", onStart);
      window.removeEventListener("camera:stop", onStop);
      stopCamera();
    };
  }, []);

  return (
    <>
      <ConsoleErrorFilter />
      <div className="relative w-full overflow-hidden rounded-md border bg-muted/40">
        <div className="relative aspect-video w-full">
          <video
            ref={videoRef}
            className="h-full w-full object-cover [transform:scaleX(-1)]"
            muted
            playsInline
            autoPlay
            preload="metadata"
          />
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 h-full w-full [transform:scaleX(-1)]"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/30 to-transparent p-2 text-xs text-white">
          Hand Landmarker (preview)
        </div>
      </div>
    </>
  );
};

export default HandPreview;
