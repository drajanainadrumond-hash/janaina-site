const rateMap = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60 * 1000; // 1 minuto
const MAX_REQUESTS = 5; // max 5 por minuto por IP

export function rateLimit(ip: string): { ok: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateMap.get(ip);

  // Cleanup old entries periodically
  if (rateMap.size > 10000) {
    for (const [key, val] of rateMap) {
      if (val.resetAt < now) rateMap.delete(key);
    }
  }

  if (!entry || entry.resetAt < now) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX_REQUESTS - 1 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { ok: false, remaining: 0 };
  }

  entry.count++;
  return { ok: true, remaining: MAX_REQUESTS - entry.count };
}
