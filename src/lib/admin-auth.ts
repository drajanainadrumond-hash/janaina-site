import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { getSupabaseServiceRole } from "@/lib/supabase";

/**
 * Allowlist de e-mails autorizados no admin (env `ADMIN_EMAILS`, separados por
 * vírgula). SÓ esses e-mails passam — não basta ter sessão. É FAIL-CLOSED: se a
 * env estiver vazia/ausente, NINGUÉM entra (retorna null). Isso evita que um
 * anonymous sign-in ou signup acidental no Supabase vire acesso total ao painel.
 * ⚠️ Produção: `ADMIN_EMAILS` DEVE estar setada na Vercel (e-mail de login da Dra.),
 * senão o admin fica inacessível de propósito.
 */
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

/**
 * Guard de admin para route handlers. Valida a sessão no servidor com getUser()
 * (nunca getSession() em código server-side), confere a allowlist e devolve o
 * cliente service role para as operações de dados — a chave anon nunca sai do
 * navegador. Retorna `null` quando não há sessão, o e-mail não é autorizado, ou
 * faltam variáveis.
 */
export async function requireAdmin(): Promise<{
  userId: string;
  service: SupabaseClient;
} | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // Autorização por e-mail — FAIL-CLOSED. Sem allowlist configurada, ninguém entra.
  if (ADMIN_EMAILS.length === 0) {
    console.error(
      "[admin-auth] ADMIN_EMAILS não configurada — acesso ao admin NEGADO (fail-closed). Configure a env na Vercel."
    );
    return null;
  }
  const email = user.email?.toLowerCase();
  if (!email || !ADMIN_EMAILS.includes(email)) return null;

  const service = getSupabaseServiceRole();
  if (!service) return null;

  return { userId: user.id, service };
}
