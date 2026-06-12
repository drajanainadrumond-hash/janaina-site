"use client";

import { useState, useEffect } from "react";
function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m5 12 7-7 7 7" /><path d="M12 19V5" />
    </svg>
  );
}

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setVisible(window.scrollY > 400);
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao topo"
      className="scroll-to-top-btn fixed bottom-7 left-7 z-[999] w-11 h-11 bg-teal/80 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-teal transition-all duration-300 max-lg:left-4"
    >
      <ArrowUpIcon className="h-5 w-5" />
    </button>
  );
}
