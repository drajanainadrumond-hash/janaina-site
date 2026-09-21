import { getEspecialidadeBySlug } from "@/lib/especialidades";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const runtime = "nodejs";
export const alt = "Dra. Janaína Drumond, médica ortopedista em Belo Horizonte";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const esp = getEspecialidadeBySlug(slug);
  return renderOgImage({ assunto: esp?.title ?? "Ortopedia e mão e punho" });
}
