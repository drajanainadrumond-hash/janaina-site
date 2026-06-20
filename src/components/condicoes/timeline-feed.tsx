"use client";

import { useMemo, useState, useEffect, useRef } from "react";

type FeedCard = {
  title: string;
  html: string;
};

function parseContentIntoCards(html: string): FeedCard[] {
  const parts = html.split(/<h2>/i);
  const cards: FeedCard[] = [];

  const intro = parts[0]?.trim();
  if (intro) {
    cards.push({ title: "Sobre esta condição", html: intro });
  }

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    const h2End = part.indexOf("</h2>");
    if (h2End === -1) continue;

    const title = part.substring(0, h2End).replace(/<[^>]*>/g, "").trim();
    const content = part.substring(h2End + 5).trim();
    if (title && content) {
      cards.push({ title, html: content });
    }
  }

  return cards;
}

/* Gradient sphere for timeline dots — brand palette variations */
const SPHERE_GRADIENTS = [
  "from-teal to-teal-mid",
  "from-teal-mid to-teal-light",
  "from-teal to-teal-light",
  "from-teal-light to-teal-mid",
  "from-teal-mid to-teal",
  "from-teal to-[#0A6E75]",
  "from-[#0A6E75] to-teal-mid",
  "from-teal-mid to-teal",
];

function AnimatedCard({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      {children}
    </div>
  );
}

function UsefulButton() {
  const [clicked, setClicked] = useState(false);

  return (
    <button
      onClick={() => setClicked(!clicked)}
      className={`flex items-center gap-1.5 text-[1.125rem] px-3 py-1.5 rounded-full border transition-all duration-300 ${
        clicked
          ? "bg-teal text-white border-teal"
          : "bg-transparent text-[#5A6B78] border-cream-dark hover:border-teal/30 hover:text-teal"
      }`}
    >
      <span>{clicked ? "✓" : "👍"}</span>
      {clicked ? "Útil!" : "Útil?"}
    </button>
  );
}

export function TimelineFeed({ content, areaLabel }: { content: string; areaLabel: string }) {
  const cards = useMemo(() => parseContentIntoCards(content), [content]);

  return (
    <div className="relative">
      {/* Linha vertical */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-teal/20 via-teal/10 to-transparent" />

      <div className="flex flex-col gap-5">
        {cards.map((card, i) => {
          const gradient = SPHERE_GRADIENTS[i % SPHERE_GRADIENTS.length];
          const isIntro = i === 0;

          return (
            <AnimatedCard key={i} index={i}>
              <div className="relative pl-10 sm:pl-14">
                {/* Esfera gradiente na linha */}
                <div className={`absolute left-[3px] sm:left-[7px] top-3 w-[30px] sm:w-[38px] h-[30px] sm:h-[38px] rounded-full bg-gradient-to-br ${gradient} shadow-[0_3px_12px_rgba(0,62,81,0.2),inset_0_-2px_4px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.2)] ${isIntro ? "sm:w-[42px] sm:h-[42px] sm:left-[5px]" : ""}`} />

                {/* Card */}
                <div className="rounded-2xl border border-black/[0.04] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.03)] overflow-hidden hover:shadow-[0_6px_24px_rgba(0,62,81,0.07)] transition-all duration-300">
                  {/* Barra de cor no topo */}
                  <div className={`h-[3px] bg-gradient-to-r ${gradient}`} />

                  {/* Header */}
                  <div className="px-3 sm:px-5 pt-3 sm:pt-4 pb-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-teal flex items-center justify-center shrink-0">
                        <span className="text-white text-[0.8rem] sm:text-[1.125rem] font-medium">JD</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[0.85rem] sm:text-[1.125rem] font-medium text-teal leading-none truncate">Dra. Janaína Drumond</p>
                        <p className="text-[0.8rem] sm:text-[1.125rem] text-[#5A6B78] mt-0.5 truncate">{areaLabel}</p>
                      </div>
                    </div>
                    <span className="text-[0.75rem] sm:text-[1.125rem] uppercase text-[#5A6B78]/60 bg-white/80 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-black/[0.04] shrink-0">
                      {i + 1} de {cards.length}
                    </span>
                  </div>

                  {/* Title com número decorativo */}
                  <div className="px-3 sm:px-5 pt-2 pb-1 relative">
                    <span className="absolute right-3 sm:right-5 top-0 font-heading text-[2rem] sm:text-[3rem] font-extralight text-teal/[0.04] leading-none select-none pointer-events-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-heading text-[1.05rem] sm:text-[1.2rem] font-normal tracking-[0.3px] text-teal leading-snug">
                      {card.title}
                    </h2>
                  </div>

                  {/* Content */}
                  <div
                    className="px-3 sm:px-5 pt-2 pb-4 prose-custom text-[0.95rem] sm:text-[1.125rem] text-[#4A5E6B] leading-[1.7] sm:leading-[1.85]"
                    dangerouslySetInnerHTML={{ __html: card.html }}
                  />

                  {/* Footer */}
                  <div className="px-3 sm:px-5 py-2 sm:py-3 border-t border-black/[0.03] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-[0.8rem] sm:text-[1.125rem] text-[#5A6B78] flex items-center gap-1.5 truncate">
                        <span className="w-[6px] h-[6px] rounded-full bg-teal-mid/40 shrink-0" />
                        Baseado em evidências
                      </span>
                    </div>
                    <UsefulButton />
                  </div>
                </div>
              </div>
            </AnimatedCard>
          );
        })}
      </div>
    </div>
  );
}
