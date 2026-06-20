"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import type { Section, ExerciseData } from "@/lib/especialidades";
import { StretchModal } from "./stretch-modal";

function ChevronIcon({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

const FLOAT_DELAYS = ["0s", "1.5s", "3s", "0.8s", "2.2s", "1s", "2.5s", "0.5s"];

function AnimatedFrames({ exercise, size = "small" }: { exercise: ExerciseData; size?: "small" | "large" }) {
  const dim = size === "small" ? "w-[60px] h-[60px]" : "w-[240px] h-[200px]";

  if (exercise.video) {
    return (
      <div className={`relative ${dim} overflow-hidden rounded-lg`}>
        <video
          src={exercise.video}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`relative ${dim} overflow-hidden rounded-lg`}>
      <style>{`
        @keyframes frame-toggle {
          0%, 45% { opacity: 1; }
          50%, 95% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
      <div className="absolute inset-0 animate-[frame-toggle_2s_ease-in-out_infinite]">
        <Image src={exercise.frame0} alt={`${exercise.name} — posição inicial`} fill className="object-contain" sizes={size === "small" ? "60px" : "240px"} />
      </div>
      <div className="absolute inset-0 animate-[frame-toggle_2s_ease-in-out_infinite_1s]">
        <Image src={exercise.frame1} alt={`${exercise.name} — posição final`} fill className="object-contain" sizes={size === "small" ? "60px" : "240px"} />
      </div>
    </div>
  );
}

function FloatingExerciseCard({ exercise, index, onOpen }: { exercise: ExerciseData; index: number; onOpen: (i: number) => void }) {
  return (
    <div
      className="flex items-start justify-center pt-1"
      style={{ animation: `float 6s ease-in-out infinite ${FLOAT_DELAYS[index % FLOAT_DELAYS.length]}` }}
    >
      <button
        onClick={() => onOpen(index)}
        className="bg-white/80 backdrop-blur-[12px] border border-teal/[0.08] rounded-2xl px-3 py-2.5 shadow-[0_8px_24px_rgba(0,62,81,0.05)] text-center w-[150px] hover:bg-white hover:shadow-[0_12px_32px_rgba(0,62,81,0.10)] hover:border-teal/[0.15] hover:scale-105 transition-all duration-300 cursor-pointer"
      >
        <div className="flex justify-center">
          <AnimatedFrames exercise={exercise} />
        </div>
        <p className="text-[1.125rem] font-medium text-teal mt-1.5 leading-tight">{exercise.name}</p>
        <p className="text-[1.125rem] text-teal-mid/60 mt-0.5">Ver exercício ▶</p>
      </button>
    </div>
  );
}

export function InteractiveSections({ sections }: { sections: Section[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);
  const openModal = useCallback((i: number) => setModalIndex(i), []);
  const closeModal = useCallback(() => setModalIndex(null), []);

  return (
    <div className="relative">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal/20 via-teal/10 to-transparent hidden lg:block" />

      <div className="flex flex-col gap-6">
        {sections.map((section, i) => {
          const isLeft = i % 2 === 0;
          const isOpen = openIndex === i;
          const isLast = i === sections.length - 1;
          const hasExercise = !!section.exercise;

          const card = (
            <div
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              onClick={() => toggle(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(i);
                }
              }}
              className={`group w-full text-left rounded-xl border px-4 py-3.5 transition-all duration-300 cursor-pointer ${
                isOpen
                  ? "bg-white border-teal/[0.12] shadow-[0_8px_24px_rgba(0,62,81,0.06)]"
                  : "bg-cream-light/60 border-teal/[0.06] hover:bg-white hover:border-teal/[0.10] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,62,81,0.04)]"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xl shrink-0">{section.icon}</span>
                  <div className="min-w-0">
                    <h3 className="font-heading text-[1.125rem] font-normal tracking-[0.3px] text-teal truncate">{section.title}</h3>
                    <span className="text-[1.125rem] text-[#5A6B78]">{section.items.length} condições</span>
                  </div>
                </div>
                <ChevronIcon open={isOpen} className="h-4 w-4 text-teal/30 shrink-0" />
              </div>
              <div className={`grid transition-all duration-400 ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-2">
                    {section.items.map((item, j) => {
                      const [bold, ...rest] = item.split(" — ");
                      const desc = rest.join(" — ");
                      return (
                        <div key={j} className="flex items-start gap-2.5 p-3 rounded-lg bg-cream-light/80 border border-teal/[0.04]">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-mid shrink-0" />
                          <div className="min-w-0">
                            <strong className="text-[1.125rem] text-teal font-medium block leading-snug">{bold}</strong>
                            {desc && <span className="text-[1.125rem] text-[#4A5E6B] leading-relaxed block mt-0.5">{desc}</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {hasExercise && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(i);
                      }}
                      className="lg:hidden mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-teal-ghost border border-teal/[0.08] text-teal text-[1.125rem] font-medium hover:bg-teal-pale transition-colors"
                    >
                      Ver exercício preventivo ▶
                    </button>
                  )}
                </div>
              </div>
            </div>
          );

          return (
            <div key={section.title}>
              <div className="lg:hidden">{card}</div>
              <div className={`hidden lg:grid items-start gap-3 ${hasExercise ? "lg:grid-cols-[165px_1fr_20px_1fr_165px]" : "lg:grid-cols-[1fr_20px_1fr]"}`}>
                {hasExercise && <div>{isLeft ? <FloatingExerciseCard exercise={section.exercise!} index={i} onOpen={openModal} /> : <div />}</div>}
                <div>{isLeft ? card : <div />}</div>
                <div className="flex justify-center pt-4">
                  <div className={`w-[10px] h-[10px] rounded-full border-2 transition-colors duration-300 ${isOpen ? "border-teal bg-teal shadow-[0_0_8px_rgba(0,62,81,0.3)]" : isLast ? "border-teal-mid bg-teal-mid" : "border-teal/30 bg-cream-light"}`} />
                </div>
                <div>{!isLeft ? card : <div />}</div>
                {hasExercise && <div>{!isLeft ? <FloatingExerciseCard exercise={section.exercise!} index={i} onOpen={openModal} /> : <div />}</div>}
              </div>
            </div>
          );
        })}
      </div>

      {modalIndex !== null && sections[modalIndex]?.exercise && (
        <StretchModal exercise={sections[modalIndex].exercise!} sectionTitle={sections[modalIndex].title} onClose={closeModal} />
      )}
    </div>
  );
}
