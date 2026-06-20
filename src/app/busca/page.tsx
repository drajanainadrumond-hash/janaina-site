"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CONDICOES } from "@/lib/condicoes";
import { ESPECIALIDADES } from "@/lib/especialidades";

type Result = {
  title: string;
  desc: string;
  href: string;
  category: string;
  categoryColor: string;
};

/* Fuzzy match — tolerates typos by checking if all chars of query appear in text in order */
function fuzzyMatch(text: string, query: string): boolean {
  const t = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Exact substring match first
  if (t.includes(q)) return true;

  // Fuzzy: allow 1 char difference per 4 chars
  const words = q.split(/\s+/);
  return words.every((word) => {
    if (t.includes(word)) return true;
    // Check each word in text for close match
    const textWords = t.split(/\s+/);
    return textWords.some((tw) => levenshtein(tw, word) <= Math.max(1, Math.floor(word.length / 3)));
  });
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function buildIndex(): Result[] {
  const results: Result[] = [];

  // Condições
  CONDICOES.forEach((c) => {
    results.push({
      title: c.title,
      desc: c.desc,
      href: `/condicoes/${c.slug}`,
      category: c.areaLabel,
      categoryColor: "bg-teal-mid",
    });
  });

  // Especialidades
  ESPECIALIDADES.forEach((e) => {
    results.push({
      title: e.title,
      desc: e.desc,
      href: `/especialidades/${e.slug}`,
      category: "Especialidade",
      categoryColor: "bg-teal",
    });
  });

  // Páginas estáticas
  const pages = [
    { title: "Sobre a Dra. Janaína", desc: "Ortopedista e traumatologista em BH. UFOP, Socor e pós-graduação em Mão e Punho pela FCMMG.", href: "/sobre", category: "Página" },
    { title: "Contato e Agendamento", desc: "WhatsApp, telefone, formulário. Consultório em Belo Horizonte.", href: "/contato", category: "Página" },
    { title: "Perguntas Frequentes", desc: "FAQ sobre consultas, condições da mão e punho e recuperação.", href: "/faq", category: "Página" },
    { title: "Formação Acadêmica", desc: "UFOP, Hospital Socor, FCMMG. Residência e pós-graduação em Mão e Punho.", href: "/sobre/formacao", category: "Página" },
    { title: "Publicações Científicas", desc: "Archives of Health Investigation. ORCID: 0000-0003-2579-0312.", href: "/sobre/publicacoes", category: "Página" },
  ];
  pages.forEach((p) => {
    results.push({ ...p, categoryColor: "bg-gray-brand" });
  });

  return results;
}

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [query, setQuery] = useState(q);

  useEffect(() => {
    if (q) setQuery(q);
  }, [q]);

  const allResults = useMemo(() => buildIndex(), []);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    return allResults.filter(
      (r) => fuzzyMatch(r.title, query) || fuzzyMatch(r.desc, query)
    );
  }, [query, allResults]);

  return (
    <div className="pt-[100px] lg:pt-[140px] pb-24 px-6">
      <div className="max-w-[700px] mx-auto">
        {/* Search input */}
        <div className="relative mb-8">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5A6B78]">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite o que procura... ex: dor no ombro, túnel do carpo"
            className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white border border-teal/[0.08] text-[1.125rem] text-[#4A5E6B] placeholder:text-[#5A6B78]/50 shadow-[0_2px_12px_rgba(0,62,81,0.04)] focus:outline-none focus:border-teal/20 focus:shadow-[0_4px_20px_rgba(0,62,81,0.08)] transition-all duration-300"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-cream-light flex items-center justify-center text-[#5A6B78] hover:bg-teal hover:text-white transition-all duration-200 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Results count */}
        {query.trim() && (
          <p className="text-[1.125rem] text-[#5A6B78] mb-6">
            {filtered.length === 0
              ? "Nenhum resultado encontrado. Tente outra palavra."
              : `${filtered.length} resultado${filtered.length !== 1 ? "s" : ""} para "${query}"`}
          </p>
        )}

        {/* Results */}
        <div className="flex flex-col gap-3">
          {filtered.map((r, i) => (
            <Link
              key={i}
              href={r.href}
              className="group block bg-white rounded-xl border border-teal/[0.06] px-5 py-4 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,62,81,0.06)] hover:border-teal/[0.12] transition-all duration-300 uppercase"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-[6px] h-[6px] rounded-full ${r.categoryColor}`} />
                <span className="text-[1.125rem] uppercase tracking-[1.5px] text-[#5A6B78]">{r.category}</span>
              </div>
              <h3 className="font-heading text-[1rem] font-normal text-teal group-hover:text-teal-mid transition-colors duration-200 mb-1">
                {r.title}
              </h3>
              <p className="text-[1.125rem] text-[#4A5E6B] leading-relaxed line-clamp-2">
                {r.desc}
              </p>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {!query.trim() && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-teal-ghost mx-auto mb-4 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-teal/40">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <p className="text-[1.125rem] text-[#5A6B78]">Digite acima para buscar condições, especialidades, artigos e mais.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BuscaPage() {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  );
}
