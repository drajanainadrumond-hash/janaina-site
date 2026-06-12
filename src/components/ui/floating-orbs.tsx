/**
 * Decorative floating orbs for light backgrounds.
 * Place inside a relative + overflow-hidden container.
 */
export function FloatingOrbs({ variant = "light" }: { variant?: "light" | "dark" }) {
  if (variant === "dark") {
    return (
      <>
        <div className="absolute rounded-full bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.05] w-[160px] h-[160px] top-[8%] right-[5%] hidden lg:block pointer-events-none" style={{ animation: "morph-a 12s ease-in-out infinite" }} />
        <div className="absolute rounded-full bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.04] w-[100px] h-[100px] bottom-[12%] left-[4%] hidden lg:block pointer-events-none" style={{ animation: "morph-b 14s ease-in-out infinite" }} />
      </>
    );
  }

  return (
    <>
      <div className="absolute rounded-full bg-gradient-to-br from-teal/[0.04] to-teal/[0.01] border border-teal/[0.05] w-[180px] h-[180px] top-[6%] right-[4%] hidden lg:block pointer-events-none" style={{ animation: "morph-b 13s ease-in-out infinite" }} />
      <div className="absolute rounded-full bg-gradient-to-br from-teal/[0.03] to-teal/[0.01] border border-teal/[0.04] w-[110px] h-[110px] bottom-[8%] left-[5%] hidden lg:block pointer-events-none" style={{ animation: "morph-a 10s ease-in-out infinite" }} />
    </>
  );
}
