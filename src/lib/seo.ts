import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

/** Imagem padrão para Open Graph / Twitter (Livro-Guia — compartilhamento social). */
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
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
}: BuildPageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(ogImage);

  const images = [
    {
      url: imageUrl,
      width: OG_WIDTH,
      height: OG_HEIGHT,
      alt: SITE.fullName,
    },
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
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}
