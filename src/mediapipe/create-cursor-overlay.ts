"use client";

import {
  CURSOR_POSITION,
  CURSOR_INITIAL_LEFT,
  CURSOR_INITIAL_TOP,
  CURSOR_SIZE_PX,
  CURSOR_BORDER_RADIUS,
  CURSOR_FILL_COLOR,
  CURSOR_OUTLINE_STYLE,
  CURSOR_TRANSFORM,
  CURSOR_POINTER_EVENTS,
  CURSOR_OPACITY_HIDDEN,
  CURSOR_Z_INDEX,
  CURSOR_TRANSITION_MS,
  CURSOR_OPACITY_VISIBLE,
  CURSOR_WILL_CHANGE,
  CURSOR_BACKFACE_VISIBILITY,
  CURSOR_CONTAIN,
  CURSOR_MOVE_EPSILON_SQ,
  CURSOR_LERP_FACTOR,
} from "config/gesture-config";

const createCursorOverlay = () => {
  const element = document.createElement("div");

  let visible = false;
  let lastX = Number.NEGATIVE_INFINITY;
  let lastY = Number.NEGATIVE_INFINITY;

  // 60fps 보간을 위한 상태
  let targetX = 0;
  let targetY = 0;
  let renderX = 0;
  let renderY = 0;
  let rafId: number | null = null;

  Object.assign(element.style, {
    position: CURSOR_POSITION,
    left: CURSOR_INITIAL_LEFT,
    top: CURSOR_INITIAL_TOP,
    width: `${CURSOR_SIZE_PX}px`,
    height: `${CURSOR_SIZE_PX}px`,
    borderRadius: CURSOR_BORDER_RADIUS,
    background: CURSOR_FILL_COLOR,
    boxShadow: CURSOR_OUTLINE_STYLE,
    transform: CURSOR_TRANSFORM,
    pointerEvents: CURSOR_POINTER_EVENTS,
    opacity: `${CURSOR_OPACITY_HIDDEN}`,
    transition: `opacity ${CURSOR_TRANSITION_MS}ms ease`,
    zIndex: CURSOR_Z_INDEX,
    willChange: CURSOR_WILL_CHANGE,
    backfaceVisibility: CURSOR_BACKFACE_VISIBILITY,
    contain: CURSOR_CONTAIN,
  });

  document.body.appendChild(element);

  // 60fps 렌더 루프
  const renderLoop = () => {
    renderX += (targetX - renderX) * CURSOR_LERP_FACTOR;
    renderY += (targetY - renderY) * CURSOR_LERP_FACTOR;

    element.style.transform = `translate3d(${renderX}px, ${renderY}px, 0) translate(-50%, -50%)`;

    rafId = requestAnimationFrame(renderLoop);
  };

  const startRenderLoop = () => {
    if (rafId === null) {
      rafId = requestAnimationFrame(renderLoop);
    }
  };

  const stopRenderLoop = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  const show = () => {
    if (!visible) {
      element.style.opacity = `${CURSOR_OPACITY_VISIBLE}`;
      visible = true;
      startRenderLoop();
    }
  };
  const hide = () => {
    if (visible) {
      element.style.opacity = `${CURSOR_OPACITY_HIDDEN}`;
      visible = false;
      stopRenderLoop();
    }
  };
  const move = (cursorX: number, cursorY: number) => {
    const deltaX = cursorX - lastX;
    const deltaY = cursorY - lastY;

    if (deltaX * deltaX + deltaY * deltaY < CURSOR_MOVE_EPSILON_SQ) return;

    lastX = cursorX;
    lastY = cursorY;

    // 첫 이동 시 즉시 위치 설정
    if (targetX === 0 && targetY === 0) {
      renderX = cursorX;
      renderY = cursorY;
    }

    targetX = cursorX;
    targetY = cursorY;

    window.dispatchEvent(
      new CustomEvent("cursor-move", {
        detail: { x: cursorX, y: cursorY },
      })
    );
  };

  const destroy = () => {
    stopRenderLoop();
    element.remove();
  };

  return { show, hide, move, destroy };
};

export default createCursorOverlay;
