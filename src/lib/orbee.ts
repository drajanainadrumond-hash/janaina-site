/**
 * Ponte Orbee — envia eventos de conversão (1ª parte) para a Central da Orbee,
 * que monta os Leads, a jornada do cliente e a atribuição (de onde veio a venda).
 *
 * É dado funcional vinculado ao envio voluntário do usuário (mesma base do POST
 * para /api/contato), por isso NÃO depende do consentimento de cookies analíticos
 * nem do GTM — assim nenhum lead é perdido.
 *
 * O token identifica o cliente na Central. Vem de NEXT_PUBLIC_ORBEE_TRACKING_TOKEN
 * (setado na Vercel). Sem token, a função simplesmente não faz nada.
 */
import { getStoredAttribution } from "@/lib/utm";

const ENDPOINT = "https://www.orbeelabs.com.br/api/tracking/event";

// Eventos aceitos pela Central (precisam casar com ALLOWED_EVENTS do webhook).
export type OrbeeEvent =
  | "orbee_lead_submit"
  | "orbee_whatsapp_click"
  | "orbee_phone_click"
  | "orbee_cta_click"
  | "orbee_appointment_booked";

type OrbeeLead = { name?: string; email?: string; phone?: string };

/** ID de sessão estável (sessionStorage) para a Central costurar a jornada. */
function sessionId(): string | undefined {
  try {
    let s = sessionStorage.getItem("orbee_sid");
    if (!s) {
      s = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem("orbee_sid", s);
    }
    return s;
  } catch {
    return undefined;
  }
}

export function sendOrbeeEvent(
  event: OrbeeEvent,
  opts: { lead?: OrbeeLead; payload?: Record<string, unknown> } = {},
): void {
  if (typeof window === "undefined") return;
  const token = process.env.NEXT_PUBLIC_ORBEE_TRACKING_TOKEN;
  if (!token) return;

  const attr = getStoredAttribution();
  const body = {
    token,
    event,
    sessionId: sessionId(),
    occurredAt: new Date().toISOString(),
    attribution: {
      utm_source: attr.utm_source,
      utm_medium: attr.utm_medium,
      utm_campaign: attr.utm_campaign,
      utm_content: attr.utm_content,
      utm_term: attr.utm_term,
      gclid: attr.gclid,
    },
    lead: opts.lead,
    page: {
      url: window.location.href,
      referrer: document.referrer || undefined,
      title: document.title,
    },
    payload: opts.payload,
  };

  // sendBeacon é ideal: não bloqueia, sobrevive à navegação (ex.: abrir o WhatsApp).
  try {
    const blob = new Blob([JSON.stringify(body)], { type: "application/json" });
    if (navigator.sendBeacon(ENDPOINT, blob)) return;
  } catch {
    // cai pro fetch abaixo
  }
  void fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {});
}
