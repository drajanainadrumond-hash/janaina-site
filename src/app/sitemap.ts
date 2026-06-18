import type { MetadataRoute } from "next";
import { CONDICOES } from "@/lib/condicoes";
import { ESPECIALIDADES } from "@/lib/especialidades";
import { getPosts } from "@/lib/blog";

const BASE_URL = "https://janainadrumond.com.br";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Páginas estáticas principais
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/sobre`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/sobre/formacao`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE_URL}/sobre/publicacoes`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE_URL}/especialidades`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/condicoes`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/depoimentos`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contato`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    { url: `${BASE_URL}/politica-de-privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/termos-de-uso`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Páginas de especialidades
  const especialidadePages: MetadataRoute.Sitemap = ESPECIALIDADES.map((esp) => ({
    url: `${BASE_URL}/especialidades/${esp.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Páginas de condições
  const condicaoPages: MetadataRoute.Sitemap = CONDICOES.map((cond) => ({
    url: `${BASE_URL}/condicoes/${cond.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Páginas de blog
  const posts = await getPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...especialidadePages, ...condicaoPages, ...blogPages];
}
