import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const runtime = "nodejs";
export const alt = "Ortopedista em Belo Horizonte — Dra. Janaína Drumond";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({ assunto: "Ortopedista em Belo Horizonte" });
}
