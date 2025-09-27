"use client";

import { useRef, useEffect } from "react";
import { CAMERA_START_ERROR } from "config/app-config";

const HandPreview = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    if (streamRef.current) return;
    try {
      const streamCarmera = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      streamRef.current = streamCarmera;
      if (videoRef.current) {
        videoRef.current.srcObject = streamCarmera;
        await videoRef.current.play();
      }
    } catch (error) {
      console.error(CAMERA_START_ERROR, error);
    }
  };

  const stopCamera = async () => {
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
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/30 to-transparent p-2 text-xs text-white">
        Hand Landmarker (preview)
      </div>
    </div>
  );
};

export default HandPreview;
