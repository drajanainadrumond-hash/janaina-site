"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function assinarReducedMotion(avisar: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION);
  mql.addEventListener("change", avisar);
  return () => mql.removeEventListener("change", avisar);
}

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
  const [revealed, setRevealed] = useState(false);
  // Respect prefers-reduced-motion — show immediately without animation
  const reducedMotion = useSyncExternalStore(
    assinarReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  );
  const visible = revealed || reducedMotion;

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setRevealed(true), delay);
          observer.unobserve(el);
        }
      },
      // Sem limiar de área: enquanto fechado, o próprio clip-path zera a área
      // visível do texto, e um threshold de 0.2 nunca era atingido — o texto
      // abaixo da dobra ficava invisível para sempre. A margem de baixo faz
      // ele abrir só depois de entrar um pouco na tela.
      { rootMargin: "0px 0px -15% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, reducedMotion]);

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
