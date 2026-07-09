import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { getSupabaseServiceRole } from "@/lib/supabase";

/**
 * Allowlist de e-mails autorizados no admin (env `ADMIN_EMAILS`, separados por
 * vírgula). Se definida, SÓ esses e-mails passam — não basta ter sessão. Se
 * vazia, mantém o comportamento anterior (qualquer usuário autenticado), mas em
 * produção ela DEVE ser configurada: sem ela, um anonymous sign-in ou signup
 * acidental no Supabase daria acesso total ao painel.
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

  // Autorização explícita por e-mail quando a allowlist está configurada.
  if (ADMIN_EMAILS.length > 0) {
    const email = user.email?.toLowerCase();
    if (!email || !ADMIN_EMAILS.includes(email)) return null;
  }

  const service = getSupabaseServiceRole();
  if (!service) return null;

  return { userId: user.id, service };
}
