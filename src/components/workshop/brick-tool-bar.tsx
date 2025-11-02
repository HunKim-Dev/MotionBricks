"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useBrickPartsStore } from "@/store/brick-parts";
import DeleteBrickButton from "@/components/ui/delete-button";
import ColorBrickButton from "@/components/ui/color-button";
import RotateBrickButton from "@/components/ui/rotation-button";
import {
  TOOLBAR_OFFSET_PX,
  TOOLBAR_POSITION,
  TOOLBAR_STYLE_LEFT,
  TOOLBAR_STYLE_RIGHT,
  TOOLBAR_Z_INDEX,
  TOOLBAR_POINTER_EVENTS,
} from "config/ui-config";

const BrickToolbar = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const selectedBrickUuid = useBrickPartsStore((s) => s.selectedBrickUuid);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onAnchor = (event: Event) => {
      const { x, y } = (event as CustomEvent<{ x: number; y: number }>).detail;
      setPosition({ x, y });
    };

    window.addEventListener("toolbar-anchor", onAnchor as EventListener);
    return () => window.removeEventListener("toolbar-anchor", onAnchor as EventListener);
  }, []);

  useEffect(() => {
    const onOrbitLock = (event: Event) =>
      setIsDragging((event as CustomEvent<boolean>).detail === true);

    window.addEventListener("orbit-lock", onOrbitLock as EventListener);
    return () => window.removeEventListener("orbit-lock", onOrbitLock as EventListener);
  }, []);

  if (!mounted || typeof document === "undefined") return null;

  const isVisible = !!selectedBrickUuid && !!position && !isDragging;

  if (!isVisible) return null;

  const x = Math.round(position!.x + TOOLBAR_OFFSET_PX.x);
  const y = Math.round(position!.y + TOOLBAR_OFFSET_PX.y);

  const openPaletteAtToolbar = () => {
    if (!selectedBrickUuid) return;
    window.dispatchEvent(
      new CustomEvent("open-color-picker", {
        detail: {
          uuid: selectedBrickUuid,
          anchor: { x, y },
        },
      })
    );
  };

  const node = (
    <div
      ref={containerRef}
      style={{
        position: TOOLBAR_POSITION,
        left: TOOLBAR_STYLE_LEFT,
        top: TOOLBAR_STYLE_RIGHT,
        transform: `translate(${x}px, ${y}px)`,
        zIndex: TOOLBAR_Z_INDEX,
        pointerEvents: TOOLBAR_POINTER_EVENTS,
      }}
    >
      <div className="flex items-center gap-0.5 rounded-md border bg-white/90 p-1 shadow">
        <RotateBrickButton />
        <ColorBrickButton onOpen={openPaletteAtToolbar} />
        <DeleteBrickButton />
      </div>
    </div>
  );

  return createPortal(node, document.body);
};

export default BrickToolbar;
