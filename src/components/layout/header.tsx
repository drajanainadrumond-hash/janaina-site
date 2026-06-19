"use client";
/** Header — redes sociais apenas no footer (sem SocialIconLinks aqui). */

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/especialidades", label: "Especialidades" },
  { href: "/condicoes", label: "Condições" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  /** Faixa branca full-width — só fora da home. */
  const useSolidBar = !isHome;
  /** Home no topo: texto branco sobre o hero. Home ao rolar: cores legíveis, sem faixa branca. */
  const useReadableStyle = useSolidBar || (isHome && scrolled);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (searchOpen) setSearchOpen(false);
        if (mobileOpen) setMobileOpen(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen, searchOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/busca?q=${encodeURIComponent(searchQuery.trim())}`);
        setSearchOpen(false);
        setMobileOpen(false);
        setSearchQuery("");
      }
    },
    [searchQuery, router]
  );

  const openSearch = useCallback(() => {
    setSearchOpen(true);
    setTimeout(() => searchRef.current?.focus(), 100);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setSearchQuery("");
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[1000] h-[72px] pl-4 pr-6 lg:pl-6 lg:pr-6 min-[1400px]:pr-12 flex items-center justify-between gap-2 transition-all duration-500",
        useSolidBar
          ? "bg-white/92 backdrop-blur-[20px] border-b border-teal/[0.06]"
          : "bg-transparent"
      )}
    >
      <Link href="/" className="flex items-center gap-2.5 group shrink-0">
        <span className="relative w-9 h-9 lg:w-11 lg:h-11">
          <Image
            src="/mao-teal.png"
            alt="Logo Dra. Janaína Drumond"
            fill
            sizes="(min-width: 1024px) 96px, 80px"
            className={cn("transition-opacity duration-500", useReadableStyle ? "opacity-100" : "opacity-0")}
            priority
          />
          <Image
            src="/mao-white.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 96px, 80px"
            className={cn("transition-opacity duration-500", useReadableStyle ? "opacity-0" : "opacity-100")}
            priority
            aria-hidden="true"
          />
        </span>
        <div className="leading-tight">
          <div
            className={cn(
              "font-heading text-[0.78rem] lg:text-[0.85rem] font-light tracking-[1.2px] uppercase whitespace-nowrap transition-colors duration-500",
              useReadableStyle ? "text-teal" : "text-white"
            )}
          >
            Dra. Janaína Drumond
          </div>
          <div
            className={cn(
              "text-[0.6rem] lg:text-[0.65rem] font-light tracking-[0.8px] lg:tracking-[1.2px] uppercase whitespace-nowrap transition-colors duration-500 mt-0.5",
              useReadableStyle ? "text-gray-brand" : "text-white/70"
            )}
          >
            CRM-MG 69719 · RQE 50592
          </div>
          <div
            className={cn(
              "text-[0.6rem] lg:text-[0.65rem] font-light tracking-[0.8px] lg:tracking-[1.2px] uppercase whitespace-nowrap transition-colors duration-500 hidden sm:block",
              useReadableStyle ? "text-gray-brand/80" : "text-white/55"
            )}
          >
            Ortopedia · Traumatologia
          </div>
        </div>
      </Link>

      <nav aria-label="Navegação principal" className="hidden min-[1140px]:flex items-center">
        <div
          className={cn(
            "flex items-center gap-0.5 min-[1400px]:gap-1 rounded-full p-1 min-[1400px]:p-1.5 transition-all duration-500",
            useReadableStyle
              ? "bg-white/95 backdrop-blur-md border border-cream-dark/40 shadow-[0_8px_28px_rgba(0,62,81,0.1)]"
              : "bg-white/10 backdrop-blur-md border border-white/10"
          )}
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-2.5 min-[1400px]:px-4 py-2 rounded-full text-[0.74rem] min-[1400px]:text-[0.85rem] tracking-[0.3px] min-[1400px]:tracking-[1.5px] uppercase whitespace-nowrap transition-all duration-300",
                  isActive
                    ? useReadableStyle
                      ? "bg-cream-light text-teal shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                      : "bg-white/20 text-white"
                    : useReadableStyle
                      ? "text-[#4A5E6B] hover:text-teal"
                      : "text-white/60 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="hidden min-[1140px]:flex items-center gap-3 shrink-0">
        {searchOpen ? (
          <form onSubmit={handleSearch} className="relative flex items-center">
            <SearchIcon
              className={cn(
                "absolute left-3 w-3.5 h-3.5 pointer-events-none",
                useReadableStyle ? "text-[#7A8E9B]" : "text-white/65"
              )}
            />
            <input
              ref={searchRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar..."
              className={cn(
                "h-9 w-[180px] pl-9 pr-8 rounded-full text-xs tracking-[0.2px] focus:outline-none transition-colors",
                useReadableStyle
                  ? "bg-cream-light/80 border border-cream-dark text-[#4A5E6B] placeholder:text-[#7A8E9B]/50 focus:border-teal/25"
                  : "bg-white/10 border border-white/[0.08] text-white placeholder:text-white/55 focus:bg-white/15"
              )}
            />
            <button
              type="button"
              onClick={closeSearch}
              className={cn(
                "absolute right-2 flex h-5 w-5 items-center justify-center rounded-full text-[10px] transition-colors",
                useReadableStyle
                  ? "text-[#7A8E9B] hover:bg-cream-dark/60 hover:text-teal"
                  : "text-white/60 hover:bg-white/20 hover:text-white"
              )}
              aria-label="Fechar busca"
            >
              ✕
            </button>
          </form>
        ) : (
          <button
            type="button"
            onClick={openSearch}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300",
              useReadableStyle
                ? "border-cream-dark/50 text-[#4A5E6B] hover:border-teal/30 hover:bg-cream-light hover:text-teal"
                : "border-white/15 text-white/85 hover:bg-white/10 hover:text-white"
            )}
            aria-label="Abrir busca"
          >
            <SearchIcon className="h-[17px] w-[17px]" />
          </button>
        )}

        <Link
          href="/contato"
          className={cn(
            "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs tracking-[1.5px] uppercase whitespace-nowrap hover:-translate-y-px transition-all duration-300",
            useReadableStyle
              ? "bg-teal text-white hover:bg-teal-mid hover:shadow-[0_6px_20px_rgba(0,62,81,0.25)]"
              : "bg-white text-teal hover:bg-white/90 hover:shadow-[0_6px_20px_rgba(255,255,255,0.15)]"
          )}
        >
          Agendar Consulta
        </Link>
      </div>

      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className={cn("min-[1140px]:hidden p-2 transition-colors duration-500", useReadableStyle ? "text-teal" : "text-white")}
        aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
      >
        {mobileOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      {mobileOpen && (
        <>
          <button
            type="button"
            className="min-[1140px]:hidden fixed inset-0 top-[72px] z-[999] bg-black/40"
            aria-label="Fechar menu"
            onClick={closeMobile}
          />
          <div className="min-[1140px]:hidden fixed inset-x-0 top-[72px] z-[1000] max-h-[calc(100dvh-72px)] overflow-y-auto bg-white border-t border-cream-dark shadow-lg">
            <nav className="flex flex-col gap-1 p-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm transition-colors",
                    isActive
                      ? "bg-teal-pale text-teal font-medium"
                      : "text-[#4A5E6B] hover:text-teal hover:bg-cream-light"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <form onSubmit={handleSearch} className="relative mt-4 pt-4 border-t border-cream-dark">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A8E9B] pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar no site..."
                className="w-full rounded-xl border border-cream-dark py-3 pl-11 pr-4 text-sm text-[#4A5E6B] placeholder:text-[#7A8E9B]/60 focus:border-teal/30 focus:outline-none"
              />
            </form>
            <Link
              href="/contato"
              onClick={closeMobile}
              className="mt-4 flex items-center justify-center bg-teal text-white py-3 rounded-full text-sm"
            >
              Agendar Consulta
            </Link>
          </nav>
        </div>
        </>
      )}
    </header>
  );
}
