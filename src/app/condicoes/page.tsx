"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CONDICOES } from "@/lib/condicoes";

type Area = "todas" | "mao" | "ombro" | "joelho" | "coluna";

/* Hotspots — positioned on the body outline */
const HOTSPOTS: { id: Area; cx: number; cy: number; labelX: number; labelY: number; labelAnchor: "start" | "end" }[] = [
  { id: "ombro", cx: 68, cy: 88, labelX: 6, labelY: 82, labelAnchor: "start" },
  { id: "coluna", cx: 120, cy: 170, labelX: 185, labelY: 165, labelAnchor: "start" },
  { id: "mao", cx: 46, cy: 240, labelX: 6, labelY: 250, labelAnchor: "start" },
  { id: "joelho", cx: 96, cy: 370, labelX: 185, labelY: 365, labelAnchor: "start" },
];

const AREA_INFO: Record<string, { label: string; color: string }> = {
  mao: { label: "Mão e Punho", color: "from-teal to-teal-mid" },
  ombro: { label: "Ombro", color: "from-teal-mid to-teal-light" },
  joelho: { label: "Joelho", color: "from-teal-light to-teal-mid" },
  coluna: { label: "Coluna", color: "from-teal to-teal-light" },
};

/* Body map — Storyset illustration with CSS hotspots */
function BodySilhouette({ active, onSelect }: { active: Area; onSelect: (a: Area) => void }) {
  const areas: { id: Area; label: string; top: string; left: string; labelSide: "left" | "right" }[] = [
    { id: "ombro", label: "Ombro", top: "16.5%", left: "35%", labelSide: "left" },
    { id: "coluna", label: "Coluna", top: "33%", left: "50%", labelSide: "right" },
    { id: "mao", label: "Mão e Punho", top: "51%", left: "90%", labelSide: "left" },
    { id: "joelho", label: "Joelho", top: "71%", left: "44%", labelSide: "left" },
  ];

  return (
    <div className="relative w-full max-w-[280px] mx-auto select-none">
      {/* Illustration */}
      <Image
        src="/body-illustration.jpg"
        alt="Corpo humano"
        width={740}
        height={1836}
        sizes="280px"
        className="w-full h-auto opacity-70"
        draggable={false}
      />

      {/* Hotspot buttons with labels */}
      {areas.map((area) => {
        const isActive = active === area.id;

        return (
          <button
            key={area.id}
            type="button"
            aria-label={`Ver condições de ${area.label}`}
            onMouseEnter={() => onSelect(area.id)}
            onClick={() => onSelect(area.id)}
            className="absolute group z-10"
            style={{ top: area.top, left: area.left, transform: "translate(-50%, -50%)" }}
          >
            {/* Dot — centered exactly on the coordinate */}
            <span className="relative flex items-center justify-center w-3.5 h-3.5">
              {isActive && (
                <span className="absolute w-7 h-7 rounded-full border border-teal/20 animate-ping" />
              )}
              <span className={`relative w-3.5 h-3.5 rounded-full border-2 transition-all duration-400 ${
                isActive
                  ? "bg-teal border-teal shadow-[0_0_10px_rgba(0,62,81,0.35)]"
                  : "bg-white border-teal/25 group-hover:border-teal/50 group-hover:bg-teal/10"
              }`}>
                {isActive && <span className="absolute inset-[3px] rounded-full bg-white" />}
              </span>
            </span>

            {/* Label — positioned absolutely from the dot */}
            <span className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[1.125rem] tracking-[0.5px] transition-all duration-400 hidden sm:inline ${
              area.labelSide === "left" ? "right-full mr-2.5" : "left-full ml-2.5"
            } ${
              isActive ? "text-teal font-semibold" : "text-[#4A5E6B]/60 group-hover:text-[#4A5E6B]/80"
            }`}>
              {area.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function CondicoesContent() {
  const searchParams = useSearchParams();
  const [activeArea, setActiveArea] = useState<Area>("todas");
  const [search, setSearch] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setSearch(q);
  }, [searchParams]);

  const filtered = CONDICOES.filter((c) => {
    const matchesArea = activeArea === "todas" || c.area === activeArea;
    const matchesSearch = search === "" || c.title.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase());
    return matchesArea && matchesSearch;
  });

  const handleAreaSelect = (area: Area) => {
    setActiveArea(area === activeArea ? "todas" : area);
    // Scroll cards into view
    setTimeout(() => scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" }), 100);
  };

  const areaInfo = activeArea !== "todas" ? AREA_INFO[activeArea] : null;

  return (
    <div className="min-h-screen">

      {/* ===== HERO ===== */}
      <section className="relative bg-teal pt-[110px] lg:pt-[150px] pb-10 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(0,86,91,0.35)_0%,transparent_60%)]" />
        <div className="relative max-w-[800px] mx-auto text-center">
          <h1 className="font-heading text-[1.6rem] sm:text-[2rem] md:text-[2.8rem] font-light text-white tracking-[0.5px] sm:tracking-[1px] md:tracking-[2px] uppercase mb-3">
            Condições tratadas
          </h1>
          <p className="text-[0.95rem] sm:text-[1.125rem] text-white/65 max-w-[400px] mx-auto leading-[1.7] sm:leading-[1.8]">
            Explore por região do corpo ou busque diretamente.
          </p>
        </div>
      </section>

      {/* ===== BODY MAP + CARDS ===== */}
      <section className="max-w-[1200px] mx-auto px-6 py-12 lg:py-16">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-12 items-start">

          {/* Left — Body Map + Search */}
          <div className="lg:sticky lg:top-[90px]">
            <div className="text-center mb-6">
              <p className="text-[1.125rem] uppercase tracking-[2px] text-[#5A6B78] mb-1">Selecione a região</p>
              {areaInfo ? (
                <span className={`inline-block text-[1.125rem] font-medium text-teal bg-teal-ghost px-3 py-1 rounded-full`}>
                  {areaInfo.label} · {filtered.length} condições
                </span>
              ) : (
                <span className="text-[1.125rem] text-[#5A6B78]">Todas as regiões · {filtered.length}</span>
              )}
            </div>

            <BodySilhouette active={activeArea} onSelect={handleAreaSelect} />

            {/* Quick filter pills */}
            <div className="flex flex-wrap justify-center gap-1.5 mt-6">
              <button
                onClick={() => setActiveArea("todas")}
                className={`px-3 py-1.5 rounded-full text-[1.125rem] tracking-[0.5px] border transition-all duration-300 ${
                  activeArea === "todas"
                    ? "bg-teal text-white border-teal"
                    : "bg-transparent text-[#5A6B78] border-cream-dark hover:border-teal/30 hover:text-teal"
                }`}
              >
                Todas
              </button>
              {Object.entries(AREA_INFO).map(([key, info]) => (
                <button
                  key={key}
                  onClick={() => handleAreaSelect(key as Area)}
                  className={`px-3 py-1.5 rounded-full text-[1.125rem] tracking-[0.5px] border transition-all duration-300 ${
                    activeArea === key
                      ? "bg-teal text-white border-teal"
                      : "bg-transparent text-[#5A6B78] border-cream-dark hover:border-teal/30 hover:text-teal"
                  }`}
                >
                  {info.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative mt-6">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#5A6B78]">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar condição..."
                className="w-full pl-10 pr-4 py-2.5 bg-cream-light rounded-xl border border-cream-dark text-[1.125rem] text-[#4A5E6B] placeholder:text-[#5A6B78]/40 focus:outline-none focus:border-teal/20 transition-all"
              />
            </div>
          </div>

          {/* Right — Condition Cards */}
          <div>
            {/* Vertical stack on mobile, grid on desktop */}
            <div
              ref={scrollRef}
              className="flex flex-col md:flex-row md:flex-wrap gap-4"
            >
              {filtered.map((cond) => {
                const gradient = AREA_INFO[cond.area]?.color || "from-teal to-teal-mid";

                return (
                  <Link
                    key={cond.slug}
                    href={`/condicoes/${cond.slug}`}
                    className="group w-full md:w-[calc(50%-0.5rem)] rounded-2xl bg-white border border-teal/[0.04] overflow-hidden hover:border-transparent hover:shadow-[0_16px_48px_rgba(0,62,81,0.08)] transition-all duration-400"
                  >
                    {/* Gradient bar */}
                    <div className={`h-1.5 bg-gradient-to-r ${gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

                    <div className="p-5">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[1.125rem] uppercase tracking-[2px] text-teal-mid">
                          {cond.areaLabel}
                        </span>
                        <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${gradient} opacity-15 group-hover:opacity-30 group-hover:scale-125 transition-all duration-500 shadow-[inset_0_-1px_2px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.2)]`} />
                      </div>

                      {/* Title */}
                      <h2 className="font-heading text-[1.125rem] font-normal text-teal group-hover:text-teal-mid transition-colors duration-300 mb-2 leading-snug">
                        {cond.title}
                      </h2>

                      {/* Description */}
                      <p className="text-[1.125rem] text-[#4A5E6B] leading-relaxed mb-4 line-clamp-2">
                        {cond.desc}
                      </p>

                      {/* CTA */}
                      <div className="flex items-center justify-between pt-3 border-t border-cream-light/80">
                        <span className="text-[1.125rem] text-teal-mid group-hover:text-teal transition-colors duration-300">
                          Ver tratamento
                        </span>
                        <span className="w-7 h-7 rounded-full border border-teal/[0.08] flex items-center justify-center text-[1.125rem] text-teal/30 group-hover:bg-teal group-hover:text-white group-hover:border-teal group-hover:shadow-[0_4px_12px_rgba(0,62,81,0.15)] transition-all duration-300">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-[1.125rem] text-[#5A6B78] mb-1">Nenhuma condição encontrada.</p>
                <button onClick={() => { setSearch(""); setActiveArea("todas"); }} className="text-[1.125rem] text-teal hover:text-teal-mid transition-colors mt-2">
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="max-w-[900px] mx-auto px-6 pb-24">
        <div className="relative rounded-2xl bg-teal overflow-hidden p-8 lg:p-12 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_100%,rgba(0,86,91,0.5)_0%,transparent_60%)]" />
          <div className="relative">
            <p className="text-white/70 text-[1.125rem] mb-2">Não encontrou sua condição?</p>
            <p className="text-white text-[1.1rem] font-medium mb-6">A Dra. Janaína pode ajudar</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contato" className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-[1.125rem] uppercase tracking-[0.5px] bg-white text-teal font-medium hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 transition-all duration-300">
                Agendar Consulta
                <span className="w-5 h-5 rounded-full bg-teal/10 flex items-center justify-center text-[1.125rem]">→</span>
              </Link>
              <a href="https://wa.me/5531992880728" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[1.125rem] uppercase tracking-[0.5px] bg-transparent text-white/60 border border-white/[0.1] hover:border-white/25 hover:text-white transition-all duration-300">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CondicoesPage() {
  return (
    <Suspense>
      <CondicoesContent />
    </Suspense>
  );
}
