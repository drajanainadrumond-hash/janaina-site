"use client";

import Link from "next/link";

import { useReveal } from "@/hooks/use-reveal";
import { ESPECIALIDADES } from "@/lib/especialidades";
import { FloatingOrbs } from "@/components/ui/floating-orbs";
import { LazyVideo } from "@/components/especialidades/lazy-video";


export default function EspecialidadesPage() {
  const ref = useReveal();

  return (
    <div ref={ref} className="relative overflow-hidden">
      <FloatingOrbs />
      <section className="pt-[100px] lg:pt-[140px] pb-12 px-6 text-center">
        <h1 className="reveal font-heading text-[1.6rem] sm:text-[2rem] md:text-[3rem] font-light tracking-[0.5px] sm:tracking-[1px] md:tracking-[2px] uppercase mb-2">
          Áreas de atuação
        </h1>
        <p className="reveal text-[0.95rem] sm:text-[1.125rem] text-[#4A5E6B] max-w-[500px] mx-auto mt-4 leading-[1.7] sm:leading-[1.8]">
          Ortopedia geral com subespecialidade em mão e punho.
        </p>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 pb-24">
        {ESPECIALIDADES.map((esp, i) => {
          const reversed = i % 2 !== 0;
          return (
            <div key={esp.num} className="reveal grid lg:grid-cols-2 gap-8 lg:gap-16 mb-14 lg:mb-20 items-center" style={reversed ? { direction: "rtl" } : undefined}>
              <div className="h-[220px] sm:h-[300px] lg:h-[380px] rounded-2xl lg:rounded-3xl relative overflow-hidden bg-cream-dark/20" style={reversed ? { direction: "ltr" } : undefined}>
                {(esp.slug === "ortopedia-geral" || esp.slug === "cirurgia-da-mao-e-punho") && (
                  <>
                    <LazyVideo
                      src={
                        esp.slug === "ortopedia-geral" ? "/ortopedia-geral.mp4" :
                        "/cirurgia-mao.mp4"
                      }
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-white/40 backdrop-blur-sm px-2 py-1 rounded-md border border-white/20 shadow-sm uppercase">
                      <span className="text-[0.65rem] text-teal/60 font-medium tracking-[0.5px] uppercase">Imagem ilustrativa</span>
                    </div>
                  </>
                )}
              </div>

              <div style={reversed ? { direction: "ltr" } : undefined}>
                <div aria-hidden="true" className="font-heading text-[3rem] sm:text-[4rem] lg:text-[4.5rem] font-extralight text-[#8C8C8C] leading-none tracking-[2px]">{esp.num}</div>
                <div className="text-[1.125rem] uppercase tracking-[2.5px] text-teal-mid my-2">{esp.tag}</div>
                <h2 className="font-heading text-[1.3rem] sm:text-[1.5rem] lg:text-[1.8rem] font-normal tracking-[0.5px] mb-4 leading-[1.25]">{esp.title}</h2>
                <p className="text-[1.125rem] text-[#4A5E6B] leading-[1.8] mb-6">{esp.desc}</p>
                <Link
                  href={`/especialidades/${esp.slug}`}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-[1.125rem] uppercase tracking-[0.5px] bg-teal text-white hover:bg-teal-mid hover:shadow-[0_6px_20px_rgba(0,62,81,0.25)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  Saiba mais
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[1.125rem]">→</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
