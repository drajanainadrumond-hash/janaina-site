import type { Metadata } from "next";
import Link from "next/link";
import { DisclaimerBanner } from "@/components/layout/disclaimer-banner";
import { FloatingOrbs } from "@/components/ui/floating-orbs";
import { PROVA_SOCIAL, SOCIAL } from "@/lib/constants";
import { getDepoimentos } from "@/lib/depoimentos";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Depoimentos de Pacientes — Dra. Janaína Drumond",
  description:
    "Relatos de pacientes sobre consulta e tratamento ortopédico com a Dra. Janaína Drumond em Belo Horizonte. Experiências individuais — resultados podem variar.",
  path: "/depoimentos",
});

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${count} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? "text-teal-mid" : "text-[#C5D0D6]"} aria-hidden>
          ★
        </span>
      ))}
    </div>
  );
}

export default async function DepoimentosPage() {
  const depoimentos = await getDepoimentos();
  const temDepoimentos = depoimentos.length > 0;

  return (
    <div className="relative overflow-hidden bg-cream-light/40">
      <FloatingOrbs />

      <section className="pt-[100px] lg:pt-[140px] pb-12 px-6 text-center">
        <h1 className="font-heading text-[2rem] md:text-[3rem] font-light tracking-[2px] md:tracking-[3px] uppercase mb-2">
          Depoimentos
          <em className="font-serif italic font-normal text-teal normal-case tracking-[-0.5px] block text-[2rem] md:text-[2.8rem]">
            de pacientes
          </em>
        </h1>
        <p className="text-[1.125rem] text-[#4A5E6B] max-w-[520px] mx-auto mt-4 leading-[1.8]">
          {temDepoimentos
            ? "Relatos de quem passou pela consulta. Cada trajetória é única — os resultados podem variar de pessoa para pessoa."
            : "As avaliações da Dra. Janaína ficam nas plataformas onde cada paciente escreve com o próprio perfil, e onde qualquer pessoa pode conferir."}
        </p>
      </section>

      <section className="max-w-[800px] mx-auto px-6 pb-16 space-y-6">
        {!temDepoimentos && (
          <article className="rounded-2xl bg-white border border-teal/[0.08] p-6 lg:p-8 shadow-[0_8px_32px_rgba(0,62,81,0.05)] text-center">
            <div className="flex justify-center">
              <Stars count={PROVA_SOCIAL.estrelas} />
            </div>
            <p className="mt-3 text-[1.25rem] text-teal">
              <strong className="font-heading tracking-[0.5px]">
                {PROVA_SOCIAL.avaliacoes} avaliações
              </strong>{" "}
              de pacientes no {PROVA_SOCIAL.fonte}
            </p>
            <ul className="mt-6 flex flex-wrap justify-center gap-3">
              {PROVA_SOCIAL.maisMencionado.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-cream-light border border-teal/[0.08] px-5 py-2 text-[1rem] text-[#4A5E6B]"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[1.125rem] text-[#4A5E6B] leading-[1.85]">
              O que os pacientes mais mencionam, agregado pelo {PROVA_SOCIAL.fonte} a partir de
              consultas verificadas. Os relatos ficam lá, escritos pelos próprios pacientes.
            </p>
            <a
              href={SOCIAL.doctoralia}
              target="_blank"
              rel="noopener noreferrer"
              data-orbee-cta="prova-social:doctoralia-pagina"
              className="mt-6 inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-teal text-white text-[1.125rem] hover:bg-teal-mid transition-colors"
            >
              Ver avaliações no Doctoralia →
            </a>
          </article>
        )}

        {depoimentos.map((d) => (
          <article
            key={d.id}
            className="rounded-2xl bg-white border border-teal/[0.08] p-6 lg:p-8 shadow-[0_8px_32px_rgba(0,62,81,0.05)]"
          >
            <Stars count={d.stars} />
            <p className="mt-4 text-[1.125rem] text-[#4A5E6B] leading-[1.85]">
              &ldquo;{d.text}&rdquo;
            </p>
            <footer className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-heading text-[1.05rem] tracking-[0.5px] text-teal">
                  {d.name}
                </p>
                <p className="text-[1rem] text-[#5A6B78]">{d.condition}</p>
              </div>
            </footer>
          </article>
        ))}

        <DisclaimerBanner />

        {temDepoimentos && (
        <p className="text-center text-[1.125rem] text-[#4A5E6B] pt-4">
          Também atendemos pelo{" "}
          <a
            href={SOCIAL.doctoralia}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-mid hover:text-teal underline underline-offset-2"
          >
            Doctoralia
          </a>
          , onde você pode ver mais avaliações verificadas.
        </p>
        )}
      </section>

      <section className="pb-24 px-6 text-center">
        <Link
          href="/contato"
          data-orbee-cta="agendar-formulario:depoimentos"
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-teal text-white text-[1.125rem] hover:bg-teal-mid transition-colors"
        >
          Agendar consulta
        </Link>
      </section>
    </div>
  );
}
