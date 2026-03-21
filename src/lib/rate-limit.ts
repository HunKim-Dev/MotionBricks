const requestMap = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const timestamps = requestMap.get(key) ?? [];

  const valid = timestamps.filter((t) => now - t < windowMs);
  valid.push(now);
  requestMap.set(key, valid);

  return valid.length > limit;
}
