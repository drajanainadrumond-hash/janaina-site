import Link from "next/link";
import { AUTHOR_BYLINE } from "@/lib/author";
import { SITE } from "@/lib/constants";

type Props = {
  directAnswer: string;
  /** Título da página para contexto em leitores de tela (opcional). */
  pageTitle?: string;
};

/**
 * Bloco AEO: resposta direta (40–60 palavras) + autoria explícita no topo do conteúdo.
 */
export function AeoContentIntro({ directAnswer, pageTitle }: Props) {
  return (
    <header className="mb-10 space-y-5">
      <div
        className="rounded-2xl border border-teal/10 bg-cream-light/80 px-5 py-5 md:px-6 md:py-6"
        role="doc-abstract"
        aria-label={pageTitle ? `Resumo: ${pageTitle}` : "Resumo da página"}
      >
        <p className="text-[0.75rem] uppercase tracking-[1.5px] text-teal-mid font-medium mb-2">
          Resposta direta
        </p>
        <p
          className="text-[1.125rem] md:text-[1.2rem] text-[#2C3E50] leading-[1.75] font-normal"
          data-aeo="direct-answer"
        >
          {directAnswer}
        </p>
      </div>

      <p className="text-[0.95rem] text-[#5A6E7B] leading-relaxed border-l-2 border-teal/30 pl-4">
        {AUTHOR_BYLINE}{" "}
        <Link href="/sobre" className="text-teal-mid hover:text-teal underline-offset-2 hover:underline">
          Ver formação
        </Link>
        {" · "}
        <span className="text-[#5A6B78]">{SITE.city}</span>
      </p>
    </header>
  );
}
