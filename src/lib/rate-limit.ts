const rateMap = new Map<string, { count: number; resetAt: number }>();

/**
 * IP confiável do cliente. Na Vercel, o valor mais à ESQUERDA de `x-forwarded-for`
 * é controlável pelo cliente (spoofável) — usá-lo permite furar o rate-limit
 * rotacionando IPs falsos. O `x-real-ip` é preenchido pela plataforma com o IP
 * real; na falta dele, usamos o ÚLTIMO item do XFF (o que a Vercel anexa), nunca
 * o primeiro.
 */
export function getClientIp(request: { headers: { get(name: string): string | null } }): string {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const parts = xff.split(",").map((s) => s.trim()).filter(Boolean);
    if (parts.length) return parts[parts.length - 1];
  }
  return "unknown";
}

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
