"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Text that reveals character by character as it enters the viewport.
 * Uses clip-path animation for a cinematic curtain effect.
 */
export function TextReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion — show immediately without animation
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${className} transition-all duration-[0.35s] ease-[cubic-bezier(0.16,1,0.3,1)]`}
      style={{
        clipPath: visible
          ? "inset(0 0 0 0)"
          : "inset(0 0 100% 0)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * Split text — each character animates individually on scroll.
 */
export function SplitTextReveal({
  text,
  className = "",
  immediate = false,
}: {
  text: string;
  className?: string;
  /** Renderiza o texto já visível no SSR (sem esperar JS). Use em conteúdo acima da dobra (ex.: h1 do hero) para não atrasar o LCP. */
  immediate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(immediate);

  useEffect(() => {
    // Acima da dobra: já visível, sem observer (LCP rápido).
    if (immediate) return;
    // Respect prefers-reduced-motion — show immediately without animation
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  // Acima da dobra: texto contínuo (não fragmentado em spans por caractere),
  // pra ser um bloco grande renderizado no SSR e servir de LCP rápido.
  if (immediate) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {/* Split on spaces so each word is a wrappable unit; animate each char within the word. */}
        {text.split(/(\s+)/).map((word, wordIdx, words) => {
          // Whitespace renders as plain text between word spans so the line can break there.
          if (/^\s+$/.test(word)) return <span key={`s${wordIdx}`}> </span>;
          // Offset char delay by the cumulative char count of prior words so animation order is preserved.
          const priorChars = words.slice(0, wordIdx).reduce((sum, w) => sum + w.length, 0);
          return (
            <span key={`w${wordIdx}`} className="inline-block whitespace-nowrap">
              {word.split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block transition-all duration-[0.25s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0) rotateX(0)" : "translateY(40px) rotateX(-40deg)",
                    transitionDelay: visible ? `${(priorChars + i) * 12}ms` : "0ms",
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          );
        })}
      </span>
    </span>
  );
}
