"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { withHome } from "@/lib/breadcrumbs";
import { useReveal } from "@/hooks/use-reveal";

const TIMELINE = [
  { year: "UFOP", title: "Graduação em Medicina", sub: "Universidade Federal de Ouro Preto (2010–2016)", href: "/sobre/formacao" },
  { year: "Socor", title: "Residência Ortopedia e Traumatologia", sub: "Hospital Socor, BH (credenciado SBOT)", href: "/sobre/formacao" },
  { year: "FCMMG", title: "Pós-Graduação em Mão e Punho", sub: "Faculdade Ciências Médicas de Minas Gerais (2021–2023) · 5.780 horas", href: "/sobre/formacao" },
  { year: "ITC BH", title: "Retalhos para os Membros Superiores", sub: "Instituto de Treinamento em Cadáveres de BH (2022) · 11 horas", href: "/sobre/formacao" },
  { year: "2023", title: "Publicação Científica", sub: "Archives of Health Investigation · ORCID: 0000-0003-2579-0312", href: "/sobre/publicacoes" },
  { year: "Hoje", title: "Consultório em Belo Horizonte", sub: "Av. do Contorno, 5326 — Savassi, BH/MG", href: "/contato" },
];

export default function SobrePage() {
  const ref = useReveal();
  const photoColumnRef = useRef<HTMLDivElement>(null);
  const photoWrapperRef = useRef<HTMLDivElement>(null);

  // Smooth scroll-follow effect (lerp-based) — only on lg+
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return;

    const column = photoColumnRef.current;
    const wrapper = photoWrapperRef.current;
    if (!column || !wrapper) return;

    const HEADER_OFFSET = 112; // ~7rem, leaves room for the fixed header
    const BOTTOM_PADDING = 48;

    let raf = 0;
    let target = 0;
    let current = 0;

    const updateTarget = () => {
      const rect = column.getBoundingClientRect();
      const scrollPast = HEADER_OFFSET - rect.top;
      const maxTranslate = Math.max(
        0,
        column.offsetHeight - wrapper.offsetHeight - BOTTOM_PADDING
      );
      target = Math.max(0, Math.min(scrollPast, maxTranslate));
    };

    const tick = () => {
      const diff = target - current;
      if (Math.abs(diff) > 0.1) {
        current += diff * 0.08; // lerp factor — lower = smoother/slower
        wrapper.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    updateTarget();
    current = target;
    wrapper.style.transform = `translate3d(0, ${current}px, 0)`;
    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
    };
  }, []);

  return (
    <section ref={ref} className="grid lg:grid-cols-2 lg:min-h-screen">
      {/* Left */}
      <div className="relative bg-teal px-6 lg:px-16 pt-[100px] lg:pt-[140px] pb-16 flex flex-col justify-center overflow-hidden">
        <div className="absolute w-[350px] h-[350px] bg-[radial-gradient(circle,rgba(0,86,91,0.15)_0%,transparent_70%)] top-[8%] -right-20 rounded-full" />

        <PageBreadcrumbs
          variant="onDark"
          className="mb-6"
          items={withHome({ name: "Sobre", href: "/sobre" })}
        />

        <div className="reveal text-[1.125rem] uppercase tracking-[1.5px] sm:tracking-[3px] text-teal-pale mb-8">
          Conheça a Dra. Janaína
        </div>

        <h1 className="reveal font-heading text-[1.5rem] sm:text-[2.2rem] lg:text-[2.5rem] font-light text-white leading-[1.2] tracking-[0.5px] sm:tracking-[1px] uppercase mb-6">
          Ortopedista com
          <br />
          <em className="font-serif italic font-normal text-cream normal-case tracking-[-0.5px]">formação em</em>
          <br />
          <em className="font-serif italic font-normal text-cream normal-case tracking-[-0.5px]">mão e punho</em>
          <br />em BH.
        </h1>

        <blockquote className="reveal font-serif text-[0.95rem] sm:text-[1.125rem] text-white/65 leading-[1.7] sm:leading-[1.9] italic pl-5 sm:pl-6 border-l-2 border-teal-pale mb-8">
          &ldquo;Sou ortopedista e traumatologista em Belo Horizonte. Atendo de dores no joelho e ombro até cirurgias complexas da mão e do punho.&rdquo;
        </blockquote>

        {/* Timeline zigzag */}
        <div className="relative mt-4">
          {/* Linha vertical: na esquerda em mobile, centralizada em desktop */}
          <div className="absolute left-[11px] lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-px bg-teal-pale/20" />

          <div className="flex flex-col gap-4">
            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0;
              const isLast = i === TIMELINE.length - 1;

              return (
                <div key={item.year} className="relative">
                  {/* Dot: alinhado à linha (esquerda em mobile, centro em desktop) */}
                  <div className="absolute left-[11px] -translate-x-1/2 lg:left-1/2 top-1/2 -translate-y-1/2 z-10">
                    <div className={`w-[10px] h-[10px] rounded-full border-2 ${isLast ? "border-teal-pale bg-teal-pale shadow-[0_0_8px_rgba(224,237,238,0.4)]" : "border-teal-pale/50 bg-teal-mid"}`} />
                  </div>

                  {/* Card: full-width com padding esquerdo em mobile; zigzag apenas em desktop */}
                  <div className={isLeft ? "pl-8 lg:pl-0 lg:mr-[55%]" : "pl-8 lg:pl-0 lg:ml-[55%]"}>
                    <Link
                      href={item.href}
                      className="reveal flex items-start gap-3 sm:gap-4 px-3 sm:px-[18px] py-3 sm:py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] hover:border-teal-pale/25 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <span className="font-heading text-[0.75rem] sm:text-lg font-light text-teal-pale min-w-[44px] sm:min-w-[55px] tracking-[0.5px] sm:tracking-[1px] uppercase shrink-0">{item.year}</span>
                      <div className="flex-1 min-w-0">
                        <strong className="block text-white text-[0.95rem] sm:text-[1.125rem] font-normal leading-snug">{item.title}</strong>
                        <span className="text-[0.85rem] sm:text-[1.125rem] text-white/60 block leading-snug mt-0.5">{item.sub}</span>
                      </div>
                      <span className="text-[1.125rem] text-teal-pale/50 self-center shrink-0 hidden sm:inline">→</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="reveal mt-8">
          <Link href="/contato" className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-[1.125rem] uppercase tracking-[0.5px] bg-teal-mid text-white shadow-[0_0_30px_rgba(0,86,91,0.3)] hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(0,86,91,0.45)] transition-all text-center">
            {"Agendar com a Dra.\u00A0Janaína"}
          </Link>
        </div>
      </div>

      {/* Right */}
      <div ref={photoColumnRef} className="bg-cream-light relative min-h-[40vh] lg:min-h-0">
        {/* Floating orbs */}
        <div className="absolute rounded-full bg-gradient-to-br from-teal/[0.04] to-teal/[0.01] border border-teal/[0.05] w-[160px] h-[160px] top-[5%] left-[5%] hidden lg:block pointer-events-none" style={{ animation: "morph-b 11s ease-in-out infinite" }} />
        <div className="absolute rounded-full bg-gradient-to-br from-teal/[0.03] to-teal/[0.01] border border-teal/[0.04] w-[90px] h-[90px] bottom-[8%] right-[8%] hidden lg:block pointer-events-none" style={{ animation: "morph-a 9s ease-in-out infinite" }} />

        <div className="flex justify-center items-start py-12 lg:pt-28 px-4 sm:px-0">
          <div ref={photoWrapperRef} className="will-change-transform w-full max-w-[380px] sm:max-w-[540px] lg:max-w-none lg:w-auto">
            <div
              className="w-full lg:w-[720px] aspect-[3/2] bg-gradient-to-br from-teal-pale to-cream rounded-3xl shadow-[0_30px_60px_rgba(0,62,81,0.1)] overflow-hidden relative"
              style={{ animation: "float 6s ease-in-out infinite" }}
            >
              <Image src="/janaina-mg7080.jpg" alt="Dra. Janaína Drumond — Ortopedista em BH" fill className="object-cover" sizes="(max-width: 640px) 380px, (max-width: 1024px) 540px, 720px" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
