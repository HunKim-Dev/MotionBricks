import * as THREE from "three";

export const clientToNDC = (
  x: number,
  y: number,
  rect: DOMRect
): { ndcX: number; ndcY: number } => {
  const ndcX = ((x - rect.left) / rect.width) * 2 - 1;
  const ndcY = -(((y - rect.top) / rect.height) * 2 - 1);
  return { ndcX, ndcY };
};

export const worldFromClientXY = (
  x: number,
  y: number,
  gl: THREE.WebGLRenderer,
  camera: THREE.Camera,
  raycaster: THREE.Raycaster,
  cursorNDC: THREE.Vector2
): THREE.Vector3 | null => {
  const rect = gl.domElement.getBoundingClientRect();
  const { ndcX, ndcY } = clientToNDC(x, y, rect);

  cursorNDC.set(ndcX, ndcY);
  raycaster.setFromCamera(cursorNDC, camera);

  const directionY = raycaster.ray.direction.y;
  const tAtGround = -raycaster.ray.origin.y / directionY;

  if (directionY === 0) return null;

  if (!isFinite(tAtGround) || tAtGround < 0) return null;

  return raycaster.ray.at(tAtGround, new THREE.Vector3());
};

export const attachScreenXYListeners = (
  gl: THREE.WebGLRenderer,
  worldFromClientXY: (x: number, y: number) => void
) => {
  const onCursorMove = (e: Event) => {
    const { x, y } = (e as CustomEvent<{ x: number; y: number }>).detail;
    worldFromClientXY(x, y);
  };

  const onPointerMove = (ev: PointerEvent) => {
    worldFromClientXY(ev.clientX, ev.clientY);
  };

  window.addEventListener("cursor-move", onCursorMove as EventListener);
  gl.domElement.addEventListener("pointermove", onPointerMove as EventListener);

  return () => {
    window.removeEventListener("cursor-move", onCursorMove as EventListener);
    gl.domElement.removeEventListener("pointermove", onPointerMove as EventListener);
  };
};

export const worldToScreenXY = (
  object3D: THREE.Object3D,
  camera: THREE.Camera,
  gl: THREE.WebGLRenderer
): { x: number; y: number } | null => {
  if (!object3D || !camera || !gl) return null;

  const screenPosition = new THREE.Vector3();
  object3D.getWorldPosition(screenPosition).project(camera);

  const canvasRect = gl.domElement.getBoundingClientRect();
  const screenX = canvasRect.left + (screenPosition.x * 0.5 + 0.5) * canvasRect.width;
  const screenY = canvasRect.top + (-screenPosition.y * 0.5 + 0.5) * canvasRect.height;

  return { x: screenX, y: screenY };
};
