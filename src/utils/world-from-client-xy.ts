export const clientToNDC = (
  x: number,
  y: number,
  rect: DOMRect
): { ndcX: number; ndcY: number } => {
  const ndcX = ((x - rect.left) / rect.width) * 2 - 1;
  const ndcY = -(((y - rect.top) / rect.height) * 2 - 1);
  return { ndcX, ndcY };
};
