"use client";

import Link from "next/link";
import Image from "next/image";
import { SplitTextReveal, TextReveal } from "@/components/effects/text-reveal";

export function Hero() {
  return (
    <section className="relative pt-[72px] pb-10 overflow-hidden bg-teal lg:min-h-screen lg:flex lg:items-center lg:pb-12">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(0,86,91,0.35)_0%,transparent_60%)]" />
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
          animation: "grid-shift 25s linear infinite",
        }}
      />

      {/* Large hand illustration — center/right background */}
      <div className="absolute right-[-5%] top-1/2 -translate-y-[45%] w-[55%] max-w-[750px] aspect-[750/550] hidden lg:block pointer-events-none">
        <Image
          src="/mao-white.png"
          alt=""
          aria-hidden
          fill
          sizes="(min-width: 1024px) 55vw, 0px"
          className="opacity-[0.06] object-contain"
          loading="eager"
          fetchPriority="low"
        />
      </div>

      {/* 3D Floating orbs — bottom-left corner */}
      <div className="absolute left-[-5%] bottom-[-10%] w-[500px] h-[450px] hidden lg:block pointer-events-none" style={{ perspective: "1200px" }}>
        <div className="w-full h-full" style={{ transformStyle: "preserve-3d", animation: "bone-float 14s ease-in-out infinite" }}>
          {[
            { size: 260, top: "5%", left: "10%", anim: "morph-a", dur: "9s" },
            { size: 180, top: "35%", left: "50%", anim: "morph-b", dur: "11s" },
            { size: 120, top: "10%", left: "60%", anim: "morph-a", dur: "7s" },
            { size: 200, top: "50%", left: "20%", anim: "morph-b", dur: "13s" },
            { size: 90, top: "65%", left: "60%", anim: "morph-a", dur: "8s" },
            { size: 140, top: "70%", left: "5%", anim: "morph-b", dur: "10s" },
          ].map((orb, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.04]"
              style={{
                width: orb.size,
                height: orb.size,
                top: orb.top,
                left: orb.left,
                animation: `${orb.anim} ${orb.dur} ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content grid — two columns */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 max-lg:py-6 lg:py-0 lg:pl-6 lg:pr-12 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-8 lg:gap-0">
        {/* Left — text */}
        <div className="max-w-[620px] min-w-0 mx-auto lg:mx-0 w-full flex flex-col items-center lg:items-start max-lg:gap-6">
          {/* Tag */}
          <div className="flex justify-center lg:justify-start w-full lg:mb-10">
            <div className="inline-flex items-center gap-2 max-w-full px-[14px] sm:px-[18px] py-1.5 rounded-full bg-white/5 border border-white/[0.08] text-[0.85rem] sm:text-[1.125rem] tracking-[1px] sm:tracking-[2.5px] uppercase text-teal-pale">
              <span className="w-1.5 h-1.5 bg-teal-light rounded-full animate-pulse shrink-0" />
              <span className="truncate">Ortopedia e Traumatologia · BH</span>
            </div>
          </div>

          <h1 className="font-heading text-[2.2rem] sm:text-[3rem] md:text-[3.8rem] lg:text-[4.5rem] font-light leading-[1.08] text-white tracking-[1px] uppercase lg:mb-6 text-center lg:text-left" style={{ perspective: "600px" }}>
            <SplitTextReveal text="Ortopedia" className="block" immediate />
            <SplitTextReveal text="completa." className="block" immediate />
            <em className="font-serif italic font-normal text-cream normal-case tracking-[-0.5px] block text-[1.8rem] sm:text-[2.4rem] md:text-[3rem] lg:text-[3.8rem]">
              <SplitTextReveal text="Mão e punho." className="" immediate />
            </em>
          </h1>

          <p className="text-[0.95rem] sm:text-[1.125rem] text-white/65 leading-[1.7] sm:leading-[1.9] max-w-[520px] tracking-[0.2px] text-center lg:text-left lg:hidden">
            Diagnóstico preciso do ombro ao punho.{" "}
            <strong className="text-white/75 font-normal">
              Subespecialidade em mão e punho
            </strong>{" "}
            com pós-graduação pela Faculdade Ciências Médicas de MG.
          </p>
          <TextReveal delay={200} className="hidden lg:block lg:mb-10">
            <p className="text-[1.125rem] text-white/65 leading-[1.9] max-w-[520px] tracking-[0.2px]">
              Diagnóstico preciso do ombro ao punho.{" "}
              <strong className="text-white/75 font-normal">
                Subespecialidade em mão e punho
              </strong>{" "}
              com pós-graduação pela Faculdade Ciências Médicas de MG.
            </p>
          </TextReveal>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-3.5 w-full sm:w-auto lg:mb-14">
            <Link
              href="/contato"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-[1.125rem] uppercase tracking-[0.5px] bg-teal-mid text-white shadow-[0_0_30px_rgba(0,86,91,0.3)] hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(0,86,91,0.45)] transition-all duration-400"
            >
              Agendar Consulta
            </Link>
            <Link
              href="/especialidades"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-[1.125rem] uppercase tracking-[0.5px] bg-transparent text-white/60 border border-white/[0.12] hover:border-white/35 hover:text-white transition-all duration-400"
            >
              Conhecer Especialidades →
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-4 sm:gap-8 md:gap-14 max-lg:pt-5 lg:pt-8 border-t border-white/5 w-full justify-center lg:justify-start max-lg:mt-1">
            {[
              { num: "FCMMG", label: "Pós-graduação" },
              { num: "UFOP", label: "Medicina" },
              { num: "2023", label: "Publicação" },
            ].map((stat) => (
              <div key={stat.label} className="min-w-0">
                <span className="font-heading text-[0.95rem] sm:text-lg md:text-2xl font-light text-white tracking-[0.5px] sm:tracking-[1px] uppercase">
                  {stat.num}
                </span>
                <span className="block text-[0.75rem] sm:text-[1.125rem] text-white/60 uppercase tracking-[1px] sm:tracking-[3px] mt-1 sm:mt-1.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — logo name + decorative */}
        <div className="hidden lg:flex flex-col items-center justify-center relative -translate-x-24">
          {/* Pulsing rings */}
          <div className="absolute w-[280px] h-[280px] rounded-full border border-white/[0.04]" style={{ animation: "ring-pulse 4s ease-in-out infinite" }} />
          <div className="absolute w-[340px] h-[340px] rounded-full border border-white/[0.03]" style={{ animation: "ring-pulse 4s ease-in-out infinite 1s" }} />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-white/[0.02]" style={{ animation: "ring-pulse 4s ease-in-out infinite 2s" }} />

          {/* Logo name */}
          <Image
            src="/logo-nome-white.png"
            alt="Dra. Janaína Drumond"
            width={360}
            height={360}
            className="opacity-40 relative z-10"
            loading="eager"
            fetchPriority="low"
          />

        </div>
      </div>
    </section>
  );
}
