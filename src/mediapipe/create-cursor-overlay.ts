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
} from "config/gesture-config";

const createCursorOverlay = () => {
  const element = document.createElement("div");
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
  });

  document.body.appendChild(element);

  const show = () => {
    element.style.opacity = `${CURSOR_OPACITY_VISIBLE}`;
  };
  const hide = () => {
    element.style.opacity = `${CURSOR_OPACITY_HIDDEN}`;
  };
  const move = (cursorX: number, cursorY: number) => {
    element.style.left = `${cursorX}px`;
    element.style.top = `${cursorY}px`;
  };

  const destroy = () => element.remove();

  return { show, hide, move, destroy };
};

export default createCursorOverlay;
