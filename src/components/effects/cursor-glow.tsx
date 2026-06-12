"use client";

import { useEffect, useRef } from "react";

/**
 * Radial glow that follows the mouse — creates a soft teal light effect
 * on the page that illuminates content as you move.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("ontouchstart" in window || window.matchMedia("(hover: none)").matches) return;

    const glow = glowRef.current;
    if (!glow) return;

    let mx = 0, my = 0, gx = 0, gy = 0;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY + window.scrollY;
    };

    const animate = () => {
      gx += (mx - gx) * 0.08;
      gy += (my - gy) * 0.08;
      glow.style.background = `radial-gradient(600px circle at ${gx}px ${gy}px, rgba(0,86,91,0.06), transparent 60%)`;
      animId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    animId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed inset-0 pointer-events-none z-[1] transition-none"
      aria-hidden="true"
    />
  );
}
