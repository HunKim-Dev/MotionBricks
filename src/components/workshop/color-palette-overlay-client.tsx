"use client";

import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { enableCanvasPointerTarget, setAlsoDispatchMouse } from "@/utils/gesture-pointer-event";
import {
  PALETTE_RIGHT_PX,
  PALETTE_TOP_PX,
  PALETTE_BASIC_COLOR,
  PALETTE_SIZE_WIDTH,
  PALETTE_SIZE_HEIGHT,
} from "config/ui-config";

const ColorPaletteOverlay = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hexColor, setHexColor] = useColor(PALETTE_BASIC_COLOR);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onOpen = () => setOpen(true);

    window.addEventListener("open-color-picker", onOpen as EventListener);
    return () => window.removeEventListener("open-color-picker", onOpen as EventListener);
  }, []);

  useEffect(() => {
    if (!open) return;

    enableCanvasPointerTarget(false);
    setAlsoDispatchMouse(true);
    return () => {
      setAlsoDispatchMouse(false);
      enableCanvasPointerTarget(true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      const paletteElement = containerRef.current;

      if (paletteElement && !paletteElement.contains(event.target as Node)) setOpen(false);
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("brick-color-change", { detail: hexColor.hex }));
  }, [hexColor.hex]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      ref={containerRef}
      className="fixed z-[999998] rounded-md border bg-white p-3 shadow-lg"
      style={{
        top: PALETTE_TOP_PX,
        right: PALETTE_RIGHT_PX,
        width: PALETTE_SIZE_WIDTH,
        height: PALETTE_SIZE_HEIGHT,
      }}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="mb-2 text-sm font-medium">Color</div>
      <ColorPicker color={hexColor} onChange={setHexColor} hideAlpha hideInput />
    </div>,
    document.body
  );
};

export default ColorPaletteOverlay;
