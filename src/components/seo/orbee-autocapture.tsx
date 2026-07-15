"use client";

import { useEffect } from "react";
import { sendOrbeeEvent, type OrbeeEvent } from "@/lib/orbee";

/**
 * Auto-Captura Orbee — detecta sozinha os cliques de saída do site.
 *
 * Espelha a Auto-Captura oficial da Central (`ORBEE_AUTOCAPTURE_SNIPPET`), mas
 * chamando `sendOrbeeEvent` direto, que é a arquitetura deste site (ele não usa
 * a ponte via dataLayer).
 *
 * POR QUE DELEGAÇÃO (um listener no documento) e não wirar componente a componente:
 * os pontos de saída estão espalhados por 6+ arquivos (botão flutuante, header,
 * /contato, /condicoes, /blog, /depoimentos). Editar cada um seria invasivo, fácil
 * de esquecer um, e quebraria de novo a cada componente novo. Com delegação no
 * capture phase, pega inclusive elemento inserido depois — e ponto de saída novo
 * já nasce rastreado, sem ninguém lembrar de nada.
 *
 * ⚠️ Estes eventos são ANÔNIMOS de propósito: um clique no WhatsApp não sabe QUEM
 * clicou. Servem pra medir interesse e ensinar o otimizador do Google/Meta — não
 * fecham o loop de conversão offline (só `orbee_lead_submit`/`appointment_booked`
 * fecham, porque carregam identidade). Ver o comentário em `lib/orbee.ts`.
 */
export function OrbeeAutoCapture() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as Element | null;
      const el = target?.closest?.("a,button,[data-orbee-cta]") as HTMLElement | null;
      if (!el) return;

      const href = (el.getAttribute("href") || "").toLowerCase();
      const origem = el.getAttribute("data-orbee-source") || window.location.pathname;

      let evento: OrbeeEvent | null = null;
      let payload: Record<string, unknown> = {};

      if (href.includes("wa.me") || href.includes("api.whatsapp.com") || href.includes("whatsapp.com/send")) {
        evento = "orbee_whatsapp_click";
        payload = { whatsapp_source: origem };
      } else if (href.startsWith("tel:")) {
        evento = "orbee_phone_click";
        payload = { phone_source: origem };
      } else if (href.includes("doctoralia")) {
        evento = "orbee_doctoralia_click";
        payload = { doctoralia_source: origem };
      } else if (el.hasAttribute("data-orbee-cta")) {
        evento = "orbee_cta_click";
        payload = {
          cta_label: el.getAttribute("data-orbee-cta") || (el.textContent || "").trim().slice(0, 60),
          cta_location: window.location.pathname,
        };
      }

      if (evento) sendOrbeeEvent(evento, { payload });
    }

    // capture:true → roda antes de qualquer stopPropagation de componente.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
