"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CONVENIOS } from "@/lib/constants";
import { getStoredAttribution } from "@/lib/utm";

type ContactFormData = {
  name: string;
  whatsapp: string;
  convenio: string;
  queixa: string;
  consent: boolean;
};

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`;
}

const inputClass =
  "w-full px-[18px] py-[13px] rounded-xl border-[1.5px] border-cream-dark bg-white text-sm text-foreground outline-none focus:border-teal transition-[border-color] duration-300";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  async function onSubmit(data: ContactFormData) {
    try {
      const attribution = getStoredAttribution();

      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ...attribution }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Erro ao enviar mensagem.");
        return;
      }

      // Conversão para GA4/Google Ads (só dispara se o GTM já estiver carregado,
      // i.e. após consentimento de cookies). Inclui a origem da campanha.
      if (typeof window !== "undefined" && "dataLayer" in window) {
        (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer.push({
          event: "generate_lead",
          ...attribution,
        });
      }

      // Conversão para o Meta Pixel (só dispara se o Pixel já estiver carregado,
      // i.e. após consentimento de cookies).
      const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
      if (typeof fbq === "function") {
        fbq("track", "Lead");
      }

      toast.success("Mensagem enviada! Redirecionando para o WhatsApp...");
      reset();

      // Abre WhatsApp em nova aba após breve delay
      setTimeout(() => {
        window.open(result.whatsappUrl, "_blank");
      }, 1000);
    } catch {
      toast.error("Erro ao enviar mensagem. Tente novamente.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-[1.125rem] text-[#4A5E6B] uppercase tracking-[1.5px] mb-1.5">
          Nome completo
        </label>
        <input
          id="name"
          type="text"
          placeholder="Seu nome"
          className={inputClass}
          {...register("name", { required: "Nome é obrigatório", minLength: { value: 3, message: "Mínimo 3 caracteres" } })}
        />
        {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="whatsapp" className="block text-[1.125rem] text-[#4A5E6B] uppercase tracking-[1.5px] mb-1.5">
          WhatsApp
        </label>
        <input
          id="whatsapp"
          type="tel"
          placeholder="(31) 9 0000-0000"
          className={inputClass}
          {...register("whatsapp", {
            required: "WhatsApp é obrigatório",
            minLength: { value: 14, message: "Número incompleto" },
            onChange: (e) => setValue("whatsapp", formatPhone(e.target.value)),
          })}
        />
        {errors.whatsapp && <p className="text-xs text-destructive mt-1">{errors.whatsapp.message}</p>}
      </div>

      <div>
        <label htmlFor="convenio" className="block text-[1.125rem] text-[#4A5E6B] uppercase tracking-[1.5px] mb-1.5">
          Convênio
        </label>
        <select
          id="convenio"
          className={inputClass}
          defaultValue=""
          {...register("convenio", { required: "Selecione o convênio" })}
        >
          <option value="" disabled>Selecione</option>
          {CONVENIOS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.convenio && <p className="text-xs text-destructive mt-1">{errors.convenio.message}</p>}
      </div>

      <div>
        <label htmlFor="queixa" className="block text-[1.125rem] text-[#4A5E6B] uppercase tracking-[1.5px] mb-1.5">
          Sua queixa
        </label>
        <textarea
          id="queixa"
          placeholder="O que está sentindo..."
          className={`${inputClass} resize-y min-h-[90px]`}
          {...register("queixa", {
            required: "Descreva sua queixa",
            minLength: { value: 10, message: "Mínimo 10 caracteres" },
          })}
        />
        {errors.queixa && <p className="text-xs text-destructive mt-1">{errors.queixa.message}</p>}
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-cream-dark text-teal accent-teal shrink-0"
            {...register("consent", { required: "Você precisa concordar com a Política de Privacidade" })}
          />
          <span className="text-[1.125rem] text-[#4A5E6B] leading-[1.6]">
            Li e concordo com a{" "}
            <a href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer" className="text-teal underline underline-offset-2">
              Política de Privacidade
            </a>
            . Autorizo o tratamento dos meus dados pessoais, incluindo dados de saúde, para fins de agendamento de consulta.
          </span>
        </label>
        {errors.consent && <p className="text-xs text-destructive mt-1">{errors.consent.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-full text-[1.125rem] tracking-[0.5px] bg-teal text-white shadow-[0_4px_14px_rgba(0,62,81,0.25)] hover:bg-teal-mid hover:-translate-y-px transition-all duration-300 disabled:opacity-50"
      >
        {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
      </button>
    </form>
  );
}
