import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ESPECIALIDADES, getEspecialidadeBySlug } from "@/lib/especialidades";
import { buildPageMetadata } from "@/lib/seo";
import { InteractiveSections } from "@/components/especialidades/interactive-sections";

type Props = {
  params: Promise<{ slug: string }>;
};

const TAG_LINKS: Record<string, string> = {
  "Dor no Ombro": "/condicoes/dor-no-ombro-tendinite",
  "Dor no Joelho": "/condicoes/dor-no-joelho-menisco",
  "Coluna": "/condicoes/dor-lombar-cronica",
  "Quadril": "/condicoes/dor-no-quadril",
  "Fraturas": "/condicoes/fraturas",
  "Túnel do Carpo": "/condicoes/sindrome-do-tunel-do-carpo",
  "Dedo em Gatilho": "/condicoes/dedo-em-gatilho",
  "Rizartrose": "/condicoes/rizartrose",
  "Fratura Punho": "/condicoes/fratura-de-escafoide",
  "Cisto Sinovial": "/condicoes/cisto-sinovial",
  "De Quervain": "/condicoes/tendinite-de-quervain",
  "Menisco": "/condicoes/dor-no-joelho-menisco",
  "Manguito Rotador": "/condicoes/dor-no-ombro-tendinite",
  "Entorse": "/condicoes/entorse-de-tornozelo",
  "Epicondilite": "/condicoes/epicondilite-lateral",
  "Polidactilia": "/condicoes/polidactilia",
  "Sindactilia": "/condicoes/sindactilia",
  "Fraturas Infantis": "/condicoes/fraturas-infantis",
};

export function generateStaticParams() {
  return ESPECIALIDADES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const esp = getEspecialidadeBySlug(slug);
  if (!esp) return { title: "Especialidade não encontrada" };

  return buildPageMetadata({
    title: esp.title,
    description: esp.desc,
    path: `/especialidades/${slug}`,
  });
}

export default async function EspecialidadePage({ params }: Props) {
  const { slug } = await params;
  const esp = getEspecialidadeBySlug(slug);

  if (!esp) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: esp.title,
    description: esp.desc,
    url: `https://janainadrumond.com.br/especialidades/${slug}`,
    specialty: {
      "@type": "MedicalSpecialty",
      name: esp.title,
    },
    author: {
      "@type": "Physician",
      name: "Dra. Janaína Drumond Rocha Fraga",
      medicalSpecialty: "Ortopedia e Traumatologia",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: "https://janainadrumond.com.br" },
        { "@type": "ListItem", position: 2, name: "Especialidades", item: "https://janainadrumond.com.br/especialidades" },
        { "@type": "ListItem", position: 3, name: esp.title, item: `https://janainadrumond.com.br/especialidades/${slug}` },
      ],
    },
  };

  return (
    <div className="pt-[100px] lg:pt-[140px] pb-24 px-6 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <article className={`mx-auto ${esp.sections ? "max-w-[1100px]" : "max-w-[700px]"}`}>
        <div className="mb-8">
          <Link
            href="/especialidades"
            className="text-[1.125rem] text-teal-mid tracking-[0.5px] hover:text-teal transition-colors"
          >
            ← Voltar às Especialidades
          </Link>
        </div>

        <span className="inline-block bg-teal text-white text-[1.125rem] px-3 py-1 rounded-full uppercase tracking-[1.5px] mb-4">
          {esp.tag}
        </span>

        <h1 className="font-heading text-[2rem] md:text-[2.5rem] font-light tracking-[1px] leading-[1.2] mb-4">
          {esp.title}
        </h1>

        <p className="text-[1.125rem] text-[#4A5E6B] leading-[1.8] mb-6">
          {esp.desc}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {esp.tags.map((tag) => {
            const href = TAG_LINKS[tag];
            return href ? (
              <Link
                key={tag}
                href={href}
                className="px-3.5 py-1.5 bg-cream-light rounded-full text-[1.125rem] text-[#4A5E6B] border border-cream-dark hover:bg-teal hover:text-white hover:border-teal transition-all duration-300 uppercase"
              >
                {tag}
              </Link>
            ) : (
              <span
                key={tag}
                className="px-3.5 py-1.5 bg-cream-light rounded-full text-[1.125rem] uppercase text-[#4A5E6B] border border-cream-dark"
              >
                {tag}
              </span>
            );
          })}
        </div>

        <hr className="my-8 border-cream-dark" />

        {esp.sections ? (
          <div className="space-y-8">
            {esp.intro && (
              <p className="text-[1.125rem] text-[#4A5E6B] leading-[1.9]">{esp.intro}</p>
            )}

            <h2 className="font-heading text-[1.35rem] font-normal tracking-[0.5px] text-teal">
              O que trato em {esp.title}?
            </h2>

            <InteractiveSections sections={esp.sections} />

            {esp.outro && (
              <>
                <h2 className="font-heading text-[1.35rem] font-normal tracking-[0.5px] text-teal pt-4">
                  Minha abordagem
                </h2>
                <p className="text-[1.125rem] text-[#4A5E6B] leading-[1.9]">{esp.outro}</p>
              </>
            )}
          </div>
        ) : (
          <div
            className="prose-custom text-[1.125rem] text-[#4A5E6B] leading-[1.9] space-y-6"
            dangerouslySetInnerHTML={{ __html: esp.content }}
          />
        )}

        {/* CTA contextual */}
        <div className="mt-12 p-8 bg-teal rounded-2xl text-center">
          <p className="text-white/80 text-[1.125rem] mb-4">
            Quer saber mais ou agendar uma avaliação?
          </p>
          <Link
            href="/contato"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-[1.125rem] uppercase tracking-[0.5px] bg-white text-teal font-medium hover:bg-cream transition-colors"
          >
            Agendar Consulta
          </Link>
        </div>
      </article>
    </div>
  );
}
