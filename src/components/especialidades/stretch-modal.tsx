"use client";

import { useEffect } from "react";
import Image from "next/image";
import type { ExerciseData } from "@/lib/especialidades";

type Props = {
  exercise: ExerciseData;
  sectionTitle: string;
  onClose: () => void;
};

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  );
}

export function StretchModal({ exercise, sectionTitle, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-teal/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease]" />

      <div
        className="relative bg-white rounded-3xl shadow-[0_30px_80px_rgba(0,62,81,0.2)] max-w-[500px] w-full max-h-[90vh] overflow-y-auto animate-[slideUp_0.3s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream-light flex items-center justify-center text-teal/50 hover:text-teal hover:bg-cream transition-colors z-10"
          aria-label="Fechar"
        >
          <XIcon className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="pt-8 px-8 pb-2 text-center">
          <span className="text-[1.125rem] uppercase tracking-[2px] text-teal-mid/70 block mb-2">
            Exercício preventivo · {sectionTitle}
          </span>
          <h3 className="font-heading text-xl font-normal tracking-[0.5px] text-teal">
            {exercise.name}
          </h3>
        </div>

        {/* Animated illustration or video */}
        <div className="px-6 py-4 flex justify-center">
          {exercise.video ? (
            <div className="w-[280px] rounded-2xl overflow-hidden bg-gradient-to-b from-teal-ghost/40 to-cream-light/30">
              <video
                src={exercise.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          ) : (
            <div className="relative w-[240px] h-[200px] bg-gradient-to-b from-teal-ghost/40 to-cream-light/30 rounded-2xl overflow-hidden">
              <style>{`
                @keyframes frame-toggle {
                  0%, 45% { opacity: 1; }
                  50%, 95% { opacity: 0; }
                  100% { opacity: 1; }
                }
              `}</style>
              <div className="absolute inset-0 animate-[frame-toggle_2s_ease-in-out_infinite]">
                <Image src={exercise.frame0} alt={`${exercise.name} — posição inicial`} fill className="object-contain p-4" sizes="240px" />
              </div>
              <div className="absolute inset-0 animate-[frame-toggle_2s_ease-in-out_infinite_1s]">
                <Image src={exercise.frame1} alt={`${exercise.name} — posição final`} fill className="object-contain p-4" sizes="240px" />
              </div>
            </div>
          )}
        </div>

        {/* Step by step */}
        {exercise.steps && exercise.steps.length > 0 && (
          <div className="px-8 pt-2 pb-2">
            <p className="text-[1.125rem] uppercase tracking-[1.5px] text-teal-mid/60 mb-3 font-medium">Como fazer</p>
            <ol className="space-y-3">
              {exercise.steps.map((step: string, j: number) => (
                <li key={j} className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-teal/[0.08] text-teal text-[1.125rem] font-medium flex items-center justify-center mt-0.5">
                    {j + 1}
                  </span>
                  <span className="text-[1.125rem] text-[#4A5E6B] leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Duration & Frequency */}
        {(exercise.duration || exercise.frequency) && (
          <div className="px-8 pt-4 pb-2 grid grid-cols-2 gap-3">
            {exercise.duration && (
              <div className="bg-teal-ghost rounded-xl px-4 py-3 uppercase">
                <p className="text-[1.125rem] uppercase tracking-[1px] text-teal/50 mb-1">Duração</p>
                <p className="text-[1.125rem] text-teal font-medium leading-snug">{exercise.duration}</p>
              </div>
            )}
            {exercise.frequency && (
              <div className="bg-teal-ghost rounded-xl px-4 py-3 uppercase">
                <p className="text-[1.125rem] uppercase tracking-[1px] text-teal/50 mb-1">Frequência</p>
                <p className="text-[1.125rem] text-teal font-medium leading-snug">{exercise.frequency}</p>
              </div>
            )}
          </div>
        )}

        {/* Caution */}
        {exercise.caution && (
          <div className="px-8 pt-3 pb-2">
            <div className="bg-amber-50 border border-amber-200/60 rounded-xl px-4 py-3 flex items-start gap-2.5 uppercase">
              <span className="text-base mt-0.5">⚠️</span>
              <p className="text-[1.125rem] text-amber-800/80 leading-relaxed">{exercise.caution}</p>
            </div>
          </div>
        )}

        {/* Disclaimer + Attribution */}
        <div className="px-8 pt-4 pb-6 text-center space-y-1">
          <p className="text-[1.125rem] text-[#7A8E9B]">
            Exercícios preventivos. Não substituem avaliação médica.
          </p>
          <p className="text-[1.125rem] text-[#7A8E9B]">
            Imagens: <a href="https://github.com/yuhonas/free-exercise-db" target="_blank" rel="noopener noreferrer" className="underline hover:text-teal transition-colors">Free Exercise DB</a> (domínio público)
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </div>
  );
}
