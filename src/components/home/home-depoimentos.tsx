import { PROVA_SOCIAL, SOCIAL } from "@/lib/constants";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${count} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-[1.5rem] ${i < count ? "text-teal-mid" : "text-[#C5D0D6]"}`}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}

/**
 * Prova social sem citar paciente.
 *
 * Até 09/09/2026 esta seção exibia 6 depoimentos **fabricados** (nome, condição e nota
 * inventados). Foram removidos. No lugar entra o agregado do Doctoralia: verificável em um
 * clique, atribuído a um terceiro e sem reproduzir a palavra de ninguém — o que respeita a
 * regra do projeto (C36, item 6) sem deixar a home sem prova social. Ver roadmap 1.1.1 e 1.1.2.
 */
export function HomeDepoimentos() {
  return (
    <section className="py-20 lg:py-28 px-6 bg-cream-light">
      <div className="max-w-[1100px] mx-auto text-center">
        <p className="text-[1.125rem] uppercase tracking-[3px] text-teal-mid mb-3">
          Experiências
        </p>
        <h2 className="font-heading text-[1.8rem] md:text-[2.4rem] font-light tracking-[1px] uppercase text-teal leading-[1.15]">
          O que dizem
          <em className="font-serif italic font-normal normal-case text-teal-mid block tracking-[-0.5px]">
            sobre a Dra.
          </em>
        </h2>

        <div className="mt-10 flex flex-col items-center gap-3">
          <Stars count={PROVA_SOCIAL.estrelas} />
          <p className="text-[1.25rem] text-teal">
            <strong className="font-heading tracking-[0.5px]">
              {PROVA_SOCIAL.avaliacoes} avaliações
            </strong>{" "}
            de pacientes no {PROVA_SOCIAL.fonte}
          </p>
        </div>

        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {PROVA_SOCIAL.maisMencionado.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-white border border-teal/[0.08] px-5 py-2 text-[1rem] text-[#4A5E6B] shadow-[0_4px_16px_rgba(0,62,81,0.05)]"
            >
              {tag}
            </li>
          ))}
        </ul>

        <p className="mt-5 text-[0.95rem] text-[#5A6B78] leading-[1.7] max-w-[560px] mx-auto">
          O que os pacientes mais mencionam, agregado pelo {PROVA_SOCIAL.fonte} a partir de
          consultas verificadas.
        </p>

        <a
          href={SOCIAL.doctoralia}
          target="_blank"
          rel="noopener noreferrer"
          data-orbee-cta="prova-social:doctoralia-home"
          className="mt-8 inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-teal text-white text-[1.125rem] hover:bg-teal-mid transition-colors"
        >
          Confira as avaliações no {PROVA_SOCIAL.fonte} →
        </a>
      </div>
    </section>
  );
}
