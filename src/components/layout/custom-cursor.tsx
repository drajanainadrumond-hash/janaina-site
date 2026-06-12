"use client";

import { useEffect, useRef } from "react";

const TRAIL_COUNT = 8;

function getLuminance(r: number, g: number, b: number) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function getBackgroundColor(el: HTMLElement): { r: number; g: number; b: number } | null {
  let current: HTMLElement | null = el;
  while (current) {
    const bg = getComputedStyle(current).backgroundColor;
    const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      const [, r, g, b] = match.map(Number);
      // Skip transparent (0,0,0 with alpha 0)
      const alpha = bg.includes("rgba") ? parseFloat(bg.split(",")[3]) : 1;
      if (alpha > 0.1 && !(r === 0 && g === 0 && b === 0 && alpha < 0.5)) {
        return { r, g, b };
      }
    }
    current = current.parentElement;
  }
  return { r: 255, g: 255, b: 255 }; // fallback white
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const trailPositions = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 }))
  );
  const isDark = useRef(true); // true = cursor white, false = cursor teal

  useEffect(() => {
    if ("ontouchstart" in window) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const trails = trailRefs.current;
    if (!dot || !ring) return;

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    function setCursorColor(dark: boolean) {
      if (isDark.current === dark) return;
      isDark.current = dark;

      const color = dark ? "255,255,255" : "26,46,59";
      if (dot) dot.style.background = `rgb(${color})`;
      if (ring) ring.style.borderColor = dark ? "rgba(255,255,255,0.35)" : "rgba(26,46,59,0.4)";
      trails.forEach((t, i) => {
        if (t) t.style.background = `rgba(${color},${0.3 - i * 0.035})`;
      });
    }

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx - 5}px`;
      dot.style.top = `${my - 5}px`;

      // Check background luminance
      // If over header, temporarily hide it to sample the element behind
      const header = document.querySelector("header") as HTMLElement | null;
      const elUnder = document.elementFromPoint(mx, my) as HTMLElement | null;
      const isOverHeader = elUnder && !!elUnder.closest("header");

      let sampleEl = elUnder;
      if (isOverHeader && header) {
        header.style.pointerEvents = "none";
        sampleEl = document.elementFromPoint(mx, my) as HTMLElement | null;
        header.style.pointerEvents = "";
      }

      if (sampleEl) {
        const bg = getBackgroundColor(sampleEl);
        if (bg) {
          const lum = getLuminance(bg.r, bg.g, bg.b);
          setCursorColor(lum < 140);
        }
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role=button], .bento-card, .cond-card, .blog-item, input, select, textarea")) {
        ring.classList.add("scale-150");
        ring.style.opacity = "0.7";
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role=button], .bento-card, .cond-card, .blog-item, input, select, textarea")) {
        ring.classList.remove("scale-150");
        ring.style.opacity = "0.4";
      }
    };

    let animId: number;
    const animate = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = `${rx - 18}px`;
      ring.style.top = `${ry - 18}px`;

      for (let i = 0; i < TRAIL_COUNT; i++) {
        const prev = i === 0 ? { x: mx, y: my } : trailPositions.current[i - 1];
        const speed = 0.25 - i * 0.02;
        trailPositions.current[i].x += (prev.x - trailPositions.current[i].x) * speed;
        trailPositions.current[i].y += (prev.y - trailPositions.current[i].y) * speed;

        if (trails[i]) {
          trails[i].style.left = `${trailPositions.current[i].x - 3}px`;
          trails[i].style.top = `${trailPositions.current[i].y - 3}px`;
        }
      }

      animId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    animId = requestAnimationFrame(animate);

    dot.style.opacity = "1";
    ring.style.opacity = "1";

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) trailRefs.current[i] = el; }}
          className="fixed pointer-events-none z-[9999] rounded-full"
          style={{
            width: 6 - i * 0.5,
            height: 6 - i * 0.5,
            background: `rgba(255,255,255,${0.3 - i * 0.035})`,
          }}
        />
      ))}
      <div
        ref={dotRef}
        className="fixed w-2.5 h-2.5 bg-white rounded-full pointer-events-none z-[10000] opacity-0"
        style={{ transition: "background 0.3s ease" }}
      />
      <div
        ref={ringRef}
        className="fixed w-9 h-9 rounded-full pointer-events-none z-[10000] opacity-0 transition-all duration-300"
        style={{
          border: "1.5px solid rgba(255,255,255,0.35)",
          transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
          opacity: 0.4,
        }}
      />
    </>
  );
}
