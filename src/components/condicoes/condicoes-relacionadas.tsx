import Link from "next/link";
import { getCondicoesRelacionadas } from "@/lib/condicoes";

/**
 * Linkagem interna das páginas de condição (item 1.3.1 · C23).
 *
 * O texto do link é o NOME da condição — é o que o Google lê para entender o
 * destino. Sem `data-orbee-cta`: são links internos de navegação, não conversão;
 * marcá-los sujaria a contagem de CTA.
 */
export function CondicoesRelacionadas({ slug }: { slug: string }) {
  const relacionadas = getCondicoesRelacionadas(slug);
  if (relacionadas.length === 0) return null;

  return (
    <nav aria-labelledby="condicoes-relacionadas" className="mt-12">
      <h2
        id="condicoes-relacionadas"
        className="font-heading text-[1.5rem] md:text-[1.75rem] font-light tracking-[0.5px] mb-5"
      >
        Condições relacionadas
      </h2>

      <ul className="grid gap-3 sm:grid-cols-3">
        {relacionadas.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/condicoes/${c.slug}`}
              className="flex h-full flex-col gap-1.5 rounded-xl border border-cream-dark bg-cream-light/40 px-5 py-4 hover:border-teal hover:bg-cream-light transition-colors duration-300"
            >
              <span className="text-[0.95rem] uppercase tracking-[1.5px] text-teal">
                {c.areaLabel}
              </span>
              <span className="font-heading text-[1.25rem] font-normal leading-snug">
                {c.title}
              </span>
              <span className="text-[1rem] text-[#4A5E6B] leading-relaxed">{c.desc}</span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-[1.0625rem]">
        <Link href="/condicoes" className="text-teal underline underline-offset-4 hover:no-underline">
          Ver todas as condições tratadas
        </Link>
      </p>
    </nav>
  );
}
