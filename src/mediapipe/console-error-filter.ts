"use client";

import { useEffect } from "react";
import { MEDIAPIPE_NOISY_PATTERNS } from "config/gesture-config";

const ConsoleErrorFilter = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const original = console.error;

    console.error = (...args: unknown[]) => {
      const isNoisy = args.some(
        (arg) =>
          typeof arg === "string" &&
          MEDIAPIPE_NOISY_PATTERNS.some((pattern) => arg.includes(pattern))
      );
      if (isNoisy) return;

      original(...args);
    };

    return () => {
      console.error = original;
    };
  }, []);

  return null;
};

export default ConsoleErrorFilter;
