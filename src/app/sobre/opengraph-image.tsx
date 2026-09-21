import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const runtime = "nodejs";
export const alt = "Dra. Janaína Drumond, médica ortopedista em Belo Horizonte";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({ assunto: "Conheça a Dra. Janaína" });
}
