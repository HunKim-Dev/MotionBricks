"use client";

import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { setAlsoDispatchMouse } from "@/utils/gesture-pointer-event";
import {
  PALETTE_BASIC_COLOR,
  PALETTE_SIZE_WIDTH,
  PALETTE_SIZE_HEIGHT,
  PALETTE_OFFSET_FROM_TOOLBAR,
} from "config/ui-config";

const ColorPaletteOverlay = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hexColor, setHexColor] = useColor(PALETTE_BASIC_COLOR);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [anchor, setAnchor] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onOpen = () => setOpen(true);

    window.addEventListener("open-color-picker", onOpen as EventListener);
    return () => window.removeEventListener("open-color-picker", onOpen as EventListener);
  }, []);

  useEffect(() => {
    const onAnchor = (event: Event) => {
      const { x, y } = (event as CustomEvent<{ x: number; y: number }>).detail;
      setAnchor({ x, y });
    };
    window.addEventListener("toolbar-anchor", onAnchor as EventListener);
    return () => window.removeEventListener("toolbar-anchor", onAnchor as EventListener);
  }, []);

  useEffect(() => {
    if (!open) return;

    setAlsoDispatchMouse(true);

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
      setAlsoDispatchMouse(false);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("brick-color-change", { detail: hexColor.hex }));
  }, [hexColor.hex]);

  if (!mounted || !open || !anchor) return null;

  const styleByPosition = {
    position: "fixed" as const,
    left: 0,
    top: 0,
    transform: `translate(${anchor.x + PALETTE_OFFSET_FROM_TOOLBAR.x}px, ${
      anchor.y + PALETTE_OFFSET_FROM_TOOLBAR.y
    }px)`,
  };

  return createPortal(
    <div
      ref={containerRef}
      className="fixed z-[999998] rounded-md border bg-white p-3 shadow-lg"
      style={{
        ...styleByPosition,
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
