"use client";

import { useEffect, useRef } from "react";
import { GESTURE_LABEL_MAP } from "config/gesture-config";

const GestureFeedbackLabel = () => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const prevNameRef = useRef("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onGesture = (e: Event) => {
      const detail = (e as CustomEvent<{ name: string } | null>).detail;
      const name = detail?.name ?? "";

      if (name === prevNameRef.current) return;
      prevNameRef.current = name;

      const el = spanRef.current;
      if (!el) return;

      if (timerRef.current) clearTimeout(timerRef.current);

      if (name) {
        el.textContent = GESTURE_LABEL_MAP[name] ?? name;
        el.style.opacity = "1";
        timerRef.current = setTimeout(() => {
          prevNameRef.current = "";
          el.style.opacity = "0";
        }, 800);
      } else {
        el.style.opacity = "0";
      }
    };

    window.addEventListener("gesture-feedback", onGesture);
    return () => {
      window.removeEventListener("gesture-feedback", onGesture);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <span
      ref={spanRef}
      className="text-xs font-normal text-muted-foreground transition-opacity duration-200"
      style={{ opacity: 0 }}
    />
  );
};

export default GestureFeedbackLabel;
