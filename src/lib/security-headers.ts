type Header = { key: string; value: string };

function supabaseOrigins(): string[] {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return [];
  try {
    const { origin, hostname } = new URL(url);
    return [origin, `https://*.${hostname.split(".").slice(-2).join(".")}`];
  } catch {
    return [];
  }
}

function buildContentSecurityPolicy(isProd: boolean): string {
  const supabase = supabaseOrigins();

  // Meta Pixel — libera os domínios da Meta apenas quando há Pixel configurado.
  const hasMetaPixel = Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID);
  const metaScript = hasMetaPixel ? ["https://connect.facebook.net"] : [];
  const metaConnect = hasMetaPixel
    ? ["https://connect.facebook.net", "https://www.facebook.com"]
    : [];

  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    ...(isProd ? [] : ["'unsafe-eval'"]),
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    ...metaScript,
  ];

  const connectSrc = [
    "'self'",
    ...supabase,
    "https://*.supabase.co",
    "wss://*.supabase.co",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://region1.google-analytics.com",
    "https://stats.g.doubleclick.net",
    ...metaConnect,
  ];

  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": scriptSrc,
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:", "blob:", "https:"],
    "font-src": ["'self'", "data:"],
    "connect-src": connectSrc,
    "frame-src": [
      "'self'",
      "https://www.googletagmanager.com",
      "https://maps.google.com",
      "https://www.google.com",
    ],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'self'"],
    "manifest-src": ["'self'"],
    "worker-src": ["'self'", "blob:"],
  };

  if (isProd) {
    directives["upgrade-insecure-requests"] = [];
  }

  return Object.entries(directives)
    .map(([name, values]) =>
      values.length === 0 ? name : `${name} ${values.join(" ")}`
    )
    .join("; ");
}

/** Headers de segurança — checklist SEO / hardening (Vercel + Next.js). */
export function getSecurityHeaders(): Header[] {
  const isProd = process.env.NODE_ENV === "production";

  const headers: Header[] = [
    { key: "X-DNS-Prefetch-Control", value: "on" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value:
        "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()",
    },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
    {
      key: "Content-Security-Policy",
      value: buildContentSecurityPolicy(isProd),
    },
  ];

  if (isProd) {
    headers.push({
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    });
  }

  return headers;
}
