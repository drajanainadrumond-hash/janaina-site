import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { getSupabaseServiceRole } from "@/lib/supabase";

/**
 * Guard de admin para route handlers. Valida a sessão no servidor com getUser()
 * (nunca getSession() em código server-side) e devolve o cliente service role
 * para as operações de dados — a chave anon nunca sai do navegador.
 *
 * Como o self-signup está desligado no Supabase, qualquer usuário autenticado é
 * a administradora. Retorna `null` quando não há sessão ou faltam variáveis.
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

  const service = getSupabaseServiceRole();
  if (!service) return null;

  return { userId: user.id, service };
}
