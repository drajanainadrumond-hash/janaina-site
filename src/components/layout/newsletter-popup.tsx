"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useFocusTrap } from "@/hooks/use-focus-trap";

const STORAGE_KEY = "newsletter-popup";
const CONSENT_KEY = "cookie-consent";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DELAY_MS = 5_000; // abre 5s após o consentimento de cookies

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useFocusTrap(dialogRef, open);

  // Abre uma vez por visitante, 5s DEPOIS que o banner de cookies for resolvido —
  // pra não empilhar dois interruptores (cookie + newsletter) na primeira visita.
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => setOpen(true), DELAY_MS);
    };
    if (localStorage.getItem(CONSENT_KEY)) {
      schedule();
      return () => clearTimeout(timer);
    }
    // Ainda decidindo os cookies: espera resolver (o banner grava a decisão).
    const poll = setInterval(() => {
      if (localStorage.getItem(CONSENT_KEY)) {
        clearInterval(poll);
        schedule();
      }
    }, 1000);
    return () => {
      clearInterval(poll);
      clearTimeout(timer);
    };
  }, []);

  // Trava o scroll do fundo e fecha com Esc enquanto o modal está aberto.
  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      prevFocus?.focus?.();
    };
  }, [open]);

  function close() {
    setOpen(false);
    localStorage.setItem(STORAGE_KEY, "seen");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      toast.error("Digite um e-mail válido.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Não foi possível concluir a inscrição.");
        return;
      }

      toast.success(result.message || "Verifique seu e-mail para confirmar a inscrição.");
      localStorage.setItem(STORAGE_KEY, "subscribed");
      setEmail("");
      setDone(true);
    } catch {
      toast.error("Erro ao se inscrever. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Inscrição na newsletter"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={close}
      />
      <div className="relative w-full max-w-[440px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] p-7 sm:p-8">
        <button
          ref={closeRef}
          onClick={close}
          aria-label="Fechar"
          className="absolute top-4 right-4 text-gray-brand hover:text-foreground transition-colors"
        >
          <X size={20} />
        </button>

        {done ? (
          <p className="text-[1.125rem] text-[#4A5E6B] leading-[1.7] pr-6">
            Quase lá! Enviamos um e-mail de confirmação — clique no link da
            mensagem para concluir sua inscrição.
          </p>
        ) : (
          <>
            <h2 className="font-heading text-[1.6rem] font-light tracking-[1.5px] uppercase text-foreground leading-none mb-3 pr-6">
              Fique por
              <em className="font-serif italic font-normal text-teal normal-case tracking-[-0.5px] block text-[1.9rem]">
                dentro
              </em>
            </h2>
            <p className="text-[1.125rem] text-[#4A5E6B] leading-[1.6] mb-5">
              Receba conteúdos sobre saúde ortopédica e novidades do consultório
              da Dra. Janaína Drumond.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                aria-label="Seu e-mail para a newsletter"
                autoComplete="email"
                className="w-full px-[18px] py-[13px] rounded-full border-[1.5px] border-cream-dark bg-white text-[1.125rem] text-foreground outline-none focus:border-teal transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-[13px] rounded-full bg-teal text-white text-[1.125rem] tracking-[0.3px] hover:bg-teal-mid transition-colors disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Inscrever"}
              </button>
            </form>

            <p className="text-[0.95rem] text-gray-brand mt-3 leading-[1.6]">
              Enviaremos um e-mail de confirmação. Ao se inscrever, você concorda
              com a{" "}
              <Link
                href="/politica-de-privacidade"
                className="text-teal underline underline-offset-2"
              >
                Política de Privacidade
              </Link>
              .
            </p>
          </>
        )}
      </div>
    </div>
  );
}
