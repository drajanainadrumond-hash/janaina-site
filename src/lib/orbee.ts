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

/**
 * Eventos aceitos pela Central (precisam casar com ALLOWED_EVENTS do webhook).
 *
 * Eles NÃO servem à mesma coisa — e confundir isso é o que faz achar que "tem
 * tracking" sem ter atribuição:
 *
 * • COM IDENTIDADE (`orbee_lead_submit`, `orbee_appointment_booked`) — carregam
 *   nome/telefone → viram `Lead` na Central → dá pra casar com a consulta que
 *   acontecer depois → **fecham o caixa** (conversão offline pro Google Ads).
 *
 * • ANÔNIMOS (`orbee_whatsapp_click`, `orbee_phone_click`, `orbee_doctoralia_click`,
 *   `orbee_cta_click`) — não sabem QUEM é a pessoa. Medem interesse e ensinam o
 *   otimizador, mas **nunca fecham o loop sozinhos**.
 */
export type OrbeeEvent =
  | "orbee_lead_submit"
  | "orbee_whatsapp_click"
  | "orbee_phone_click"
  | "orbee_doctoralia_click"
  | "orbee_cta_click"
  | "orbee_appointment_booked";

type OrbeeLead = { name?: string; email?: string; phone?: string };

/**
 * ID de sessão estável (sessionStorage) para a Central costurar a jornada.
 *
 * Exportado porque a "ponte do WhatsApp" (orbee-autocapture) injeta ESTE mesmo id
 * dentro da mensagem `wa.me?text=...(ref: <sid>)`: quando o paciente manda a
 * mensagem, o webhook da Evolution lê o sid, cria o Lead com o telefone e reusa o
 * stitch por sessionId da Central pra ligar o clique (que já carrega o gclid) ao
 * Lead. É o que transforma o clique ANÔNIMO de zap em conversão offline fechável —
 * sem isso o gclid morre num evento sem dono. Tem que ser o MESMO valor do evento.
 */
export function getSessionId(): string | undefined {
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
    sessionId: getSessionId(),
    occurredAt: new Date().toISOString(),
    attribution: {
      utm_source: attr.utm_source,
      utm_medium: attr.utm_medium,
      utm_campaign: attr.utm_campaign,
      utm_content: attr.utm_content,
      utm_term: attr.utm_term,
      gclid: attr.gclid,
      // fbclid: sem ele a Central não fecha o loop offline da Meta (CAPI).
      // Não era capturado nem enviado até 15/jul.
      fbclid: attr.fbclid,
    },
    lead: opts.lead,
    page: {
      url: window.location.href,
      referrer: document.referrer || undefined,
      title: document.title,
    },
    payload: opts.payload,
  };

  // fetch com keepalive: sobrevive à navegação (abrir o WhatsApp) E faz o
  // preflight de CORS corretamente — o webhook da Central trata o OPTIONS.
  // (sendBeacon foi descartado: com application/json cross-origin ele pode
  // falhar o CORS silenciosamente — retorna true mas o request é bloqueado.)
  void fetch(ENDPOINT, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {});
}
