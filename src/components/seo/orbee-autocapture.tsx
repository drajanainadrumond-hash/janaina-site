"use client";

import { useEffect } from "react";
import { sendOrbeeEvent, getSessionId, type OrbeeEvent } from "@/lib/orbee";
import { getStoredAttribution } from "@/lib/utm";

/**
 * Ponte do WhatsApp (fecha o loop offline do zap).
 *
 * O clique de zap sempre foi ANÔNIMO: leva o gclid num TrackingEvent sem dono, e a
 * mensagem que chega na Evolution vira Deal sem gclid → o OCI nunca casava (o único
 * caminho que fechava era o formulário, que quase ninguém usa). Aqui, quando o
 * visitante veio de um clique pago (tem gclid/fbclid), injetamos o `sessionId` DENTRO
 * do texto do wa.me — `...(ref: <sid>)`. Esse sid viaja na mensagem que o paciente
 * envia; o webhook da Evolution lê o sid, cria o Lead com o telefone e reusa o stitch
 * por sessionId da Central pra ligar o clique (com gclid) ao Lead. Quando a secretária
 * marca o Deal como ganho, o gclid está lá e a conversão de R$500 volta pro Google Ads.
 *
 * Só marca quem veio de anúncio (gclid/fbclid) — visitante orgânico mantém a mensagem
 * limpa e não vira Lead. A marca é curta e opaca (o sid, ~14 car.), não o gclid cru.
 */
function tagWhatsAppLink(el: HTMLElement): void {
  if (el.tagName !== "A") return;
  const raw = el.getAttribute("href");
  if (!raw) return;

  // Só faz sentido marcar clique de ORIGEM paga — sem gclid/fbclid não há conversão
  // offline pra fechar, então não sujamos a mensagem do visitante orgânico.
  const attr = getStoredAttribution();
  if (!attr.gclid && !attr.fbclid) return;

  const sid = getSessionId();
  if (!sid) return;

  try {
    const url = new URL(raw, window.location.origin);
    const text = url.searchParams.get("text") ?? "";
    if (text.includes("(ref:")) return; // já marcado (re-clique) — não duplica
    url.searchParams.set("text", `${text} (ref: ${sid})`.trim());
    el.setAttribute("href", url.toString());
  } catch {
    // href não-parseável — segue sem marca (não quebra a navegação)
  }
}

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
        // Ponte: injeta o sid no texto ANTES da navegação (capture phase, sem
        // preventDefault → o browser navega com o href já reescrito).
        tagWhatsAppLink(el);
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
