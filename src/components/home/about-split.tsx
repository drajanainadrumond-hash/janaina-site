"use client";

import Link from "next/link";
import Image from "next/image";
import { useReveal } from "@/hooks/use-reveal";
import { TextReveal } from "@/components/effects/text-reveal";

const TIMELINE = [
  { year: "UFOP", title: "Medicina", sub: "Universidade Federal de Ouro Preto (2010–2016)", href: "/sobre/formacao" },
  { year: "Socor", title: "Residência em Ortopedia e Traumatologia", sub: "Hospital Socor — Belo Horizonte (SBOT)", href: "/especialidades/ortopedia-geral" },
  { year: "FCMMG", title: "Pós-Graduação em Mão e Punho", sub: "Faculdade Ciências Médicas de MG (2021–2023) · 5.780h", href: "/especialidades/cirurgia-da-mao-e-punho" },
  { year: "ITC BH", title: "Retalhos para os Membros Superiores", sub: "Instituto de Treinamento em Cadáveres de BH (2022) · 11h", href: "/sobre/formacao" },
  { year: "2023", title: "Publicação Científica", sub: "Archives of Health Investigation", href: "/sobre/publicacoes" },
  { year: "Hoje", title: "Consultório em Belo Horizonte", sub: "Av. do Contorno, 5326 — Savassi, BH/MG", href: "/contato" },
];

export function AboutSplit() {
  const ref = useReveal();

  return (
    <section ref={ref} className="grid lg:grid-cols-2 lg:min-h-screen">
      {/* Left — Dark */}
      <div className="relative bg-teal px-6 lg:px-16 py-16 lg:py-24 flex flex-col justify-center overflow-hidden">
        <div className="absolute w-[350px] h-[350px] bg-[radial-gradient(circle,rgba(0,86,91,0.15)_0%,transparent_70%)] top-[8%] -right-20 rounded-full" />

        {/* Floating orbs */}
        <div className="absolute rounded-full bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/[0.06] w-[180px] h-[180px] bottom-[5%] left-[3%] hidden lg:block" style={{ animation: "morph-a 10s ease-in-out infinite" }} />
        <div className="absolute rounded-full bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.05] w-[100px] h-[100px] top-[15%] right-[8%] hidden lg:block" style={{ animation: "morph-b 12s ease-in-out infinite" }} />

        <div className="text-[1.125rem] font-normal uppercase tracking-[3px] text-teal-pale mb-8">
          Sobre a Dra. Janaína
        </div>

        <h2 className="font-heading text-[1.8rem] sm:text-[2.2rem] lg:text-[2.5rem] font-light text-white leading-[1.2] tracking-[1px] uppercase mb-6">
          <TextReveal>
            Ortopedia com{" "}
            <em className="font-serif italic font-normal text-cream normal-case tracking-[-0.5px]">
              precisão.
            </em>
          </TextReveal>
          <TextReveal delay={200}>
            Cuidado com{" "}
            <em className="font-serif italic font-normal text-cream normal-case tracking-[-0.5px]">
              alma.
            </em>
          </TextReveal>
        </h2>

        <TextReveal delay={400}>
        <blockquote className="font-serif text-[1.125rem] text-white/65 leading-[1.9] italic pl-6 border-l-2 border-teal-pale mb-8">
          &ldquo;Cada consulta começa pela escuta da história completa. Porque
          antes de tratar a dor, preciso entender a pessoa.&rdquo;
        </blockquote>
        </TextReveal>

        {/* Vertical Timeline */}
        <div className="relative mt-8 pl-8">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-teal-pale/40 via-teal-pale/20 to-transparent" />
          <div className="flex flex-col gap-1">
            {TIMELINE.map((item, i) => (
              <Link
                key={item.year}
                href={item.href}
                className="relative pl-5 py-2.5 sm:py-3.5 rounded-xl hover:bg-white/[0.04] transition-all duration-300 block"
              >
                <div className="absolute -left-8 top-4 flex items-center justify-center">
                  <div className={`w-[9px] h-[9px] rounded-full border-2 ${i === TIMELINE.length - 1 ? "border-teal-pale bg-teal-pale" : "border-teal-pale/60 bg-teal"}`} />
                </div>
                <span className="font-heading text-[14px] sm:text-[18px] font-light text-teal-pale/70 tracking-[3px] uppercase mb-1 sm:mb-1.5 block">
                  {item.year}
                </span>
                <strong className="block text-white text-[0.95rem] sm:text-[1.1rem] font-normal leading-snug">
                  {item.title}
                </strong>
                <span className="text-[0.85rem] sm:text-[1.125rem] text-white/60 leading-relaxed">
                  {item.sub}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Photo + floating cards */}
      <div className="bg-cream-light flex items-center justify-center relative min-h-[40vh] lg:min-h-0 py-16 lg:py-12 px-4 sm:px-6 lg:px-0">
        {/* Photo */}
        <div className="w-full max-w-[320px] sm:max-w-[480px] lg:w-[540px] lg:max-w-none h-[440px] sm:h-[620px] lg:h-[700px] bg-gradient-to-br from-teal-pale to-cream rounded-3xl shadow-[0_30px_60px_rgba(0,62,81,0.1)] overflow-hidden relative">
          <Image src="/janaina-hero.jpg" alt="Dra. Janaína Drumond — Ortopedista em BH" fill className="object-cover object-top" sizes="(max-width: 640px) 320px, (max-width: 1024px) 480px, 540px" priority />
        </div>

        {/* Floating cards — positioned relative to the outer container */}
        <div
          className="absolute top-[10%] left-[4%] sm:left-[8%] lg:left-[5%] z-20 hidden sm:block bg-[#003E51] rounded-xl lg:rounded-2xl px-4 py-2.5 lg:px-10 lg:py-4 shadow-[0_12px_32px_rgba(0,62,81,0.25)] min-w-[120px] lg:min-w-[200px]"
          style={{ animation: "float 6s ease-in-out infinite 0s" }}
        >
          <div className="text-[0.65rem] lg:text-[1.125rem] text-white/65 uppercase tracking-[1.5px] lg:tracking-[3px] mb-0.5 lg:mb-1">Especialidade</div>
          <div className="font-heading text-[0.95rem] lg:text-2xl font-normal text-white tracking-[0.5px] leading-tight">Ortopedia</div>
          <div className="text-[0.7rem] lg:text-[1.125rem] text-white/70 mt-0.5">RQE 50592</div>
        </div>

        <div
          className="absolute top-[40%] right-[4%] sm:right-[8%] lg:right-[5%] z-20 hidden sm:block bg-[#003E51] rounded-xl lg:rounded-2xl px-4 py-2.5 lg:px-10 lg:py-4 shadow-[0_12px_32px_rgba(0,62,81,0.25)] min-w-[110px] lg:min-w-[180px]"
          style={{ animation: "float 6s ease-in-out infinite 4s" }}
        >
          <div className="text-[0.65rem] lg:text-[1.125rem] text-white/65 uppercase tracking-[1.5px] lg:tracking-[3px] mb-0.5 lg:mb-1">CRM-MG</div>
          <div className="font-heading text-[0.95rem] lg:text-2xl font-normal text-white tracking-[0.5px] leading-tight">69719</div>
          <div className="text-[0.7rem] lg:text-[1.125rem] text-white/70 mt-0.5">Médica</div>
        </div>

      </div>
    </section>
  );
}
