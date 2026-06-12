"use client";

import { useRef, useState } from "react";

/**
 * 3D parallax tilt card — tilts toward cursor on hover, Apple-style.
 * Wrap any content with this component.
 */
export function TiltCard({
  children,
  className = "",
  intensity = 10,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setStyle({
      transform: `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.02,1.02,1.02)`,
      boxShadow: `${-x * 20}px ${y * 20}px 40px rgba(0,62,81,0.08)`,
      transition: "transform 0.1s ease, box-shadow 0.1s ease",
    });
  };

  const handleLeave = () => {
    setStyle({
      transform: "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)",
      boxShadow: "0 4px 20px rgba(0,62,81,0.04)",
      transition: "transform 0.4s ease, box-shadow 0.4s ease",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{ ...style, willChange: "transform" }}
    >
      {children}
    </div>
  );
}
