/**
 * 1.4.7 — variável faltando não quebrava nada, só a função que dependia dela, em
 * silêncio (o formulário que não manda e-mail, o cron que devolve 401). Aqui a
 * falta passa a ser dita, uma vez, quando o servidor sobe — e aparece no log da
 * Vercel.
 *
 * AVISA, NÃO TRAVA: daqui não dá para ver o painel de variáveis da Vercel, e um
 * `throw` por uma variável que existe lá com outro nome derrubaria o site. Se um
 * dia for para travar, conferir o painel antes.
 */

/** Sem elas o site perde função no ar (admin, formulário, e-mail, cron, rastreio). */
export const OBRIGATORIAS_EM_PRODUCAO = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "ADMIN_EMAILS",
  "RESEND_API_KEY",
  "EMAIL_TO",
  "EMAIL_FROM",
  "CRON_SECRET",
  "NEXT_PUBLIC_GTM_ID",
  "NEXT_PUBLIC_ORBEE_TRACKING_TOKEN",
] as const;

export function variaveisFaltando(
  env: Record<string, string | undefined>,
  nomes: readonly string[] = OBRIGATORIAS_EM_PRODUCAO,
): string[] {
  return nomes.filter((nome) => !env[nome]?.trim());
}

export function checarVariaveis(env: Record<string, string | undefined> = process.env) {
  const faltando = variaveisFaltando(env);
  if (faltando.length === 0) return faltando;
  const producao = env.VERCEL_ENV === "production" || env.NODE_ENV === "production";
  const aviso = `[env] ${faltando.length} variável(is) ausente(s): ${faltando.join(", ")}. Ver .env.example.`;
  if (producao) console.error(aviso);
  else console.warn(aviso);
  return faltando;
}
