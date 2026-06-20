import type { CondicaoHowTo } from "@/lib/condicoes-howto";
import { formatHowToDuration } from "@/lib/condicoes-howto";

type Props = {
  howTo: CondicaoHowTo;
};

/** Passo a passo visível — alinhado ao schema HowTo. */
export function CondicaoHowToSection({ howTo }: Props) {
  const duration = formatHowToDuration(howTo.totalTime);

  return (
    <section className="mt-12" aria-labelledby="condicao-howto-heading">
      <p className="text-[0.75rem] uppercase tracking-[1.5px] text-teal-mid font-medium mb-2">
        Passo a passo · {howTo.label}
      </p>
      <h2
        id="condicao-howto-heading"
        className="font-heading text-[1.5rem] md:text-[1.75rem] font-light tracking-[0.5px] text-teal mb-2"
      >
        {howTo.name}
      </h2>
      <p className="text-[1.125rem] text-[#4A5E6B] leading-relaxed mb-2">{howTo.description}</p>
      {duration ? (
        <p className="text-[0.95rem] text-[#5A6B78] mb-6">Duração estimada: {duration}.</p>
      ) : (
        <div className="mb-6" />
      )}

      <ol className="space-y-5 list-none counter-reset-none p-0 m-0">
        {howTo.steps.map((step, index) => (
          <li key={step.name} className="flex gap-4">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal text-white text-[1rem] font-medium"
              aria-hidden
            >
              {index + 1}
            </span>
            <div>
              <h3 className="font-heading text-[1.1rem] text-teal tracking-[0.3px] mb-1">{step.name}</h3>
              <p className="text-[1.125rem] text-[#4A5E6B] leading-[1.75]">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-6 text-[0.95rem] text-[#5A6B78] leading-relaxed">
        Conteúdo informativo. O fluxo real pode variar conforme seu exame e indicação médica individual.
      </p>
    </section>
  );
}
