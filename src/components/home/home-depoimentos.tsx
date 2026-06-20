import Link from "next/link";
import { getDepoimentos } from "@/lib/depoimentos";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${count} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < count ? "text-teal-mid" : "text-[#C5D0D6]"}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}

export async function HomeDepoimentos() {
  const depoimentos = (await getDepoimentos()).slice(0, 3);

  if (depoimentos.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 px-6 bg-cream-light">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-[1.125rem] uppercase tracking-[3px] text-teal-mid mb-3">
              Experiências
            </p>
            <h2 className="font-heading text-[1.8rem] md:text-[2.4rem] font-light tracking-[1px] uppercase text-teal leading-[1.15]">
              O que dizem
              <em className="font-serif italic font-normal normal-case text-teal-mid block tracking-[-0.5px]">
                os pacientes
              </em>
            </h2>
          </div>
          <Link
            href="/depoimentos"
            className="text-[1.125rem] text-teal-mid hover:text-teal transition-colors shrink-0"
          >
            Ver todos os depoimentos →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {depoimentos.map((d) => (
            <article
              key={d.id}
              className="rounded-2xl bg-white border border-teal/[0.08] p-6 shadow-[0_8px_32px_rgba(0,62,81,0.06)] flex flex-col"
            >
              <Stars count={d.stars} />
              <p className="mt-4 text-[1.125rem] text-[#4A5E6B] leading-[1.8] flex-1">
                &ldquo;{d.text}&rdquo;
              </p>
              <footer className="mt-6 pt-4 border-t border-teal/[0.06]">
                <p className="font-heading text-[1rem] tracking-[0.5px] text-teal">
                  {d.name}
                </p>
                <p className="text-[1rem] text-[#5A6B78] mt-0.5">{d.condition}</p>
              </footer>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-[0.95rem] text-[#5A6B78] leading-[1.7] max-w-[640px] mx-auto">
          Depoimentos de experiências individuais. Resultados podem variar. Não constituem
          garantia de tratamento. CRM-MG 69719 | RQE 50592.
        </p>
      </div>
    </section>
  );
}
