"use client";

import Link from "next/link";
import { useReveal } from "@/hooks/use-reveal";

const CARDS = [
  {
    href: "/especialidades/cirurgia-da-mao-e-punho",
    tag: "Diferencial",
    title: "Mão e Punho",
    desc: "Subespecialidade e diferencial. Túnel do carpo, dedo em gatilho, fraturas complexas.",
    icon: "🤚",
    variant: "dark" as const,
    span: true,
  },
  {
    href: "/especialidades/ortopedia-geral",
    tag: "Amplo",
    title: "Ortopedia Geral",
    desc: "Ombro, joelho, quadril, coluna.",
    icon: "🩻",
    variant: "default" as const,
  },
  {
    href: "/contato",
    tag: "Agendamento",
    title: "Agende sua Consulta",
    desc: "Atendimento exclusivamente particular.",
    variant: "teal" as const,
  },
  {
    href: "/blog",
    tag: "Educação",
    title: "Blog Educativo",
    desc: "Conteúdo gratuito sobre ortopedia.",
    variant: "default" as const,
  },
];

const VARIANT_STYLES = {
  default:
    "bg-white border border-black/[0.03] hover:border-transparent [&_.tag]:text-teal-mid [&_.arrow]:border-black/[0.06] [&:hover_.arrow]:bg-teal [&:hover_.arrow]:text-white [&:hover_.arrow]:border-teal",
  dark: "bg-teal text-white border-transparent [&_.tag]:text-teal-pale [&_.arrow]:border-white/[0.08] [&:hover_.arrow]:bg-teal-mid [&:hover_.arrow]:border-teal-mid",
  cream:
    "bg-cream text-foreground border-transparent [&_.tag]:text-teal-mid [&_.arrow]:border-black/[0.06] [&:hover_.arrow]:bg-teal [&:hover_.arrow]:text-white [&:hover_.arrow]:border-teal",
  teal: "bg-teal-mid text-white border-transparent [&_.tag]:text-cream [&_.arrow]:border-white/10 [&:hover_.arrow]:bg-teal [&:hover_.arrow]:border-teal",
};

export function BentoGrid() {
  const ref = useReveal();

  return (
    <section className="py-16 sm:py-24 px-6 lg:px-12 bg-cream-light relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute rounded-full bg-gradient-to-br from-teal/[0.06] to-teal/[0.02] border border-teal/[0.07] w-[220px] h-[220px] top-[5%] right-[3%] hidden lg:block" style={{ animation: "morph-b 14s ease-in-out infinite" }} />
      <div className="absolute rounded-full bg-gradient-to-br from-teal/[0.05] to-teal/[0.02] border border-teal/[0.06] w-[120px] h-[120px] bottom-[10%] left-[3%] hidden lg:block" style={{ animation: "morph-a 11s ease-in-out infinite" }} />
      <div
        ref={ref}
        className="flex flex-col md:flex-row justify-between items-start md:items-end max-w-[1200px] mx-auto mb-12 pb-8 border-b border-cream-dark"
      >
        <h2 className="font-heading text-[1.6rem] sm:text-[1.9rem] lg:text-[2.2rem] font-light tracking-[2px] uppercase leading-[1.3]">
          Cuidado ortopédico
          <em className="font-serif italic font-normal text-teal normal-case tracking-[-0.5px] block text-[1.8rem] sm:text-[2rem] lg:text-[2.4rem]">
            em todas as dimensões
          </em>
        </h2>
        <p className="text-[1.125rem] text-[#7A8E9B] max-w-[300px] md:text-right leading-[1.7] mt-4 md:mt-0">
          Do diagnóstico à recuperação, com expertise comprovada em cada etapa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-w-[1200px] mx-auto mt-12">
        {CARDS.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={`group relative rounded-[20px] p-5 sm:p-8 flex flex-col justify-end overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,62,81,0.08)] ${VARIANT_STYLES[card.variant]}`}
          >
            {card.icon && (
              <div className="absolute inset-0 flex items-center justify-center text-[120px] opacity-[0.04] group-hover:opacity-[0.08] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                {card.icon}
              </div>
            )}
            <span className="arrow absolute top-6 right-6 w-[34px] h-[34px] rounded-full border flex items-center justify-center text-[1.125rem] transition-all duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
              ↗
            </span>
            <div className="tag text-[1.125rem] font-normal uppercase tracking-[2.5px] mb-3">
              {card.tag}
            </div>
            <h3 className="font-heading text-xl font-normal tracking-[0.5px] mb-2 leading-[1.3]">
              {card.title}
            </h3>
            <p className="text-[1.125rem] opacity-80 leading-relaxed">
              {card.desc}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
