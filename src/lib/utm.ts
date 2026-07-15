/**
 * Captura de atribuição de campanha (UTMs + gclid + fbclid) para registrar a
 * origem dos leads. É dado funcional de 1ª parte, vinculado ao lead que o usuário
 * envia voluntariamente — independe do consentimento de cookies analíticos
 * (os trackers GTM/Pixel continuam gated pelo "Aceitar").
 *
 * ┌─ POR QUE COOKIE DE 90 DIAS (e não sessionStorage) ─────────────────────────┐
 * │ Até 15/jul/2026 isto vivia em `sessionStorage` e morria quando o paciente  │
 * │ fechava a aba. Mas a jornada real é: clica no anúncio hoje → conversa no   │
 * │ WhatsApp → marca a consulta SEMANAS depois. Quando a consulta acontecia, o │
 * │ gclid já tinha evaporado — então a Central nunca conseguia devolver a      │
 * │ conversão pro Google Ads, e o Google seguia otimizando pra quem preenche   │
 * │ formulário em vez de quem vira paciente.                                   │
 * │ 90 dias não é número mágico: é exatamente o prazo que o Google aceita      │
 * │ receber uma conversão offline associada a um gclid.                        │
 * │ Já estava previsto no doc/PLANO-TRACKING.md (20/jun): "trocar              │
 * │ sessionStorage → cookie é o que viabiliza conversão offline".              │
 * └───────────────────────────────────────────────────────────────────────────┘
 *
 * Os nomes dos cookies (`orbee_*`) seguem o PADRÃO da Central (snippet "Orbee
 * Attribution") de propósito: se um dia o site adotar o snippet gerado pela
 * Central, ou a Auto-Captura oficial, tudo continua funcionando sem migração.
 * Por isso também expomos `window.Orbee.getAttribution()`.
 */

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

/** Chaves de atribuição que vêm da URL (utm_* + os click ids). */
const ATTR_KEYS = [...UTM_KEYS, "gclid", "fbclid"] as const;

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  /** fbclid: sem ele não há atribuição de Meta (não era capturado até 15/jul). */
  fbclid?: string;
  referrer?: string;
  landing_page?: string;
};

const DAYS = 90;
const PREFIX = "orbee_";

function setCookie(name: string, value: string) {
  const exp = new Date(Date.now() + DAYS * 864e5).toUTCString();
  document.cookie = `${PREFIX}${name}=${encodeURIComponent(value)};expires=${exp};path=/;SameSite=Lax`;
}

function getCookie(name: string): string | undefined {
  const m = document.cookie.match(new RegExp(`(^|;)\\s*${PREFIX}${name}\\s*=\\s*([^;]+)`));
  return m ? decodeURIComponent(m[2]) : undefined;
}

/**
 * Captura atribuição da URL e persiste por 90 dias.
 *
 * LAST-TOUCH por chave (igual ao snippet oficial da Central e ao modelo de
 * atribuição do próprio Google, que é last-click): se o paciente clicar num
 * anúncio novo, o gclid novo substitui o antigo — é aquele clique que deve
 * levar o crédito da consulta. Navegação interna não mexe em nada, porque só
 * grava o que vier na URL.
 */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    let touched = false;

    for (const key of ATTR_KEYS) {
      const v = params.get(key);
      if (v) {
        setCookie(key, v.slice(0, 200));
        touched = true;
      }
    }

    // referrer/landing_page acompanham a ENTRADA que trouxe o sinal (é o que o
    // /api/contato grava no Supabase). Sem sinal de campanha, não polui.
    if (touched) {
      if (document.referrer) setCookie("referrer", document.referrer.slice(0, 300));
      setCookie("landing_page", (window.location.pathname + window.location.search).slice(0, 300));
    }
  } catch {
    // cookies indisponíveis (modo privado etc.) — ignora silenciosamente
  }
}

/** Retorna a atribuição persistida (ou objeto vazio). Dura 90 dias. */
export function getStoredAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const out: Attribution = {};
    for (const key of ATTR_KEYS) {
      const v = getCookie(key);
      if (v) out[key] = v;
    }
    const ref = getCookie("referrer");
    if (ref) out.referrer = ref;
    const lp = getCookie("landing_page");
    if (lp) out.landing_page = lp;
    return out;
  } catch {
    return {};
  }
}

/**
 * Expõe `window.Orbee.getAttribution()` — o contrato do padrão Orbee. Deixa a
 * Auto-Captura oficial da Central funcionar neste site sem adaptação.
 */
export function exposeOrbeeGlobal() {
  if (typeof window === "undefined") return;
  const w = window as unknown as { Orbee?: { getAttribution?: () => Attribution } };
  w.Orbee = w.Orbee || {};
  w.Orbee.getAttribution = getStoredAttribution;
}
