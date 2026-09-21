import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

/** Imagem usada nos dados estruturados (schema.org). A prévia de compartilhamento vem de `opengraph-image.tsx`. */
export const DEFAULT_OG_IMAGE = "/facebook-cover.png";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const base = SITE.url.replace(/\/$/, "");
  if (path === "/" || path === "") return `${base}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

type BuildPageMetadataInput = {
  title: string;
  description: string;
  /** Caminho da rota, ex.: `/contato` ou `/` para a home. */
  path: string;
  ogImage?: string;
  noIndex?: boolean;
};

/** Metadata on-page com canonical, Open Graph e Twitter (Guia SEO — seção 6 e 14). */
export function buildPageMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex = false,
}: BuildPageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  // 1.3.5 — a imagem declarada aqui VENCE o `opengraph-image.tsx` da mesma rota (medido
  // no build, 21/09). Por isso quem tem imagem própria passa o caminho dela em `ogImage`,
  // e as outras caem na da home, gerada em 1200×630. Antes caíam todas na capa do
  // Facebook, 820×312 anunciada como 1200×630.
  const images = [
    { url: absoluteUrl(ogImage ?? "/opengraph-image"), width: OG_WIDTH, height: OG_HEIGHT, alt: SITE.fullName },
  ];

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE.name,
      locale: "pt_BR",
      type: "website",
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}
