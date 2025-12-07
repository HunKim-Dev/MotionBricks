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
} from "config/gesture-config";

const createCursorOverlay = () => {
  const element = document.createElement("div");

  let visible = false;
  let lastX = Number.NEGATIVE_INFINITY;
  let lastY = Number.NEGATIVE_INFINITY;

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

  const show = () => {
    if (!visible) {
      element.style.opacity = `${CURSOR_OPACITY_VISIBLE}`;
      visible = true;
    }
  };
  const hide = () => {
    if (visible) {
      element.style.opacity = `${CURSOR_OPACITY_HIDDEN}`;
      visible = false;
    }
  };
  const move = (cursorX: number, cursorY: number) => {
    const deletaX = cursorX - lastX;
    const deletaY = cursorY - lastY;

    if (deletaX * deletaX + deletaY * deletaY < CURSOR_MOVE_EPSILON_SQ) return;

    lastX = cursorX;
    lastY = cursorY;

    element.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;

    window.dispatchEvent(
      new CustomEvent("cursor-move", {
        detail: { x: cursorX, y: cursorY },
      })
    );
  };

  const destroy = () => element.remove();

  return { show, hide, move, destroy };
};

export default createCursorOverlay;
