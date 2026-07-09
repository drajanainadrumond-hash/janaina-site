import type { MetadataRoute } from "next";

const SITE_URL = "https://janainadrumond.com.br";

/** Rotas privadas que nunca devem ser rastreadas. (/busca usa `noindex` no metadata
 * — não entra aqui, senão o crawler não consegue ler a tag noindex.) */
const DISALLOW_PATHS = ["/api/", "/admin"];

/**
 * Crawlers de IA generativa — Livro-Guia § 8.5 (GEO).
 * Regras explícitas: permitir conteúdo público; manter áreas privadas bloqueadas.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
] as const;

export default function robots(): MetadataRoute.Robots {
  const aiRules: MetadataRoute.Robots["rules"] = AI_CRAWLERS.map((userAgent) => ({
    userAgent,
    allow: "/",
    disallow: DISALLOW_PATHS,
  }));

  return {
    rules: [
      ...aiRules,
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW_PATHS,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
