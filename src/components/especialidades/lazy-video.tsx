"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Vídeo decorativo que só baixa e toca quando entra (ou está perto de entrar)
 * no viewport. Evita o download dos MP4 (~10 MB) no carregamento inicial:
 * `preload="none"` + a `<source>` só é montada quando visível.
 */
export function LazyVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    el.load();
    el.play().catch(() => {
      // autoplay pode ser bloqueado; o vídeo é só ilustrativo, ignora.
    });
  }, [inView]);

  return (
    <video ref={ref} loop muted playsInline preload="none" className={className}>
      {inView && <source src={src} type="video/mp4" />}
    </video>
  );
}
