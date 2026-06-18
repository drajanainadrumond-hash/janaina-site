/**
 * Captura de atribuição de campanha (UTMs + gclid) para registrar a origem dos
 * leads. É dado funcional de 1ª parte, vinculado ao lead que o usuário envia
 * voluntariamente — independe do consentimento de cookies analíticos.
 */

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  referrer?: string;
  landing_page?: string;
};

const STORAGE_KEY = "lead-attribution";

/**
 * Captura UTMs/gclid da URL no primeiro acesso da sessão (first-touch) e guarda
 * em sessionStorage. Não sobrescreve se já houver captura na sessão, preservando
 * a origem de entrada mesmo após navegação interna.
 */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const data: Attribution = {};

    for (const key of UTM_KEYS) {
      const v = params.get(key);
      if (v) data[key] = v.slice(0, 200);
    }
    const gclid = params.get("gclid");
    if (gclid) data.gclid = gclid.slice(0, 200);

    // Só registra se houver algum sinal de origem, para não poluir com sessões
    // orgânicas sem campanha.
    if (Object.keys(data).length === 0) return;

    if (document.referrer) data.referrer = document.referrer.slice(0, 300);
    data.landing_page = (window.location.pathname + window.location.search).slice(0, 300);

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // sessionStorage indisponível (modo privado etc.) — ignora silenciosamente
  }
}

/** Retorna a atribuição capturada nesta sessão (ou objeto vazio). */
export function getStoredAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}
