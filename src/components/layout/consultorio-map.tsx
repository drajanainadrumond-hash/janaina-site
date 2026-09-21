"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/constants";

type ConsultorioMapProps = {
  className?: string;
};

/**
 * Mapa embed — SEO local (Guia SEO / Livro-Guia cap. 8).
 *
 * O iframe só nasce quando o bloco chega perto da tela. O `loading="lazy"` sozinho não
 * bastava: no desktop o Chrome antecipa iframes várias telas abaixo, e o Google Maps
 * baixava ~500 KB de JS e travava a página ~900 ms já na abertura da home (PageSpeed
 * desktop 71, TBT 910 ms — 21/09/2026). Até lá fica um fundo do mesmo tamanho.
 */
export function ConsultorioMap({ className = "" }: ConsultorioMapProps) {
  const query = encodeURIComponent(SITE.address.full);
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${query}`;
  const ref = useRef<HTMLDivElement>(null);
  const [perto, setPerto] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPerto(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={className}>
      <div ref={ref} className="w-full min-h-[280px] lg:min-h-[320px] rounded-2xl bg-white/5">
        {perto && (
          <iframe
            title={`Localização do consultório — ${SITE.name}`}
            src={`https://maps.google.com/maps?q=${query}&z=15&output=embed`}
            className="w-full min-h-[280px] lg:min-h-[320px] border-0 rounded-2xl"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        )}
      </div>
      <a
        href={mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-[1rem] text-teal-mid hover:text-teal transition-colors"
      >
        Abrir no Google Maps →
      </a>
    </div>
  );
}
