import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null | undefined;

/**
 * Cliente Supabase no browser. Retorna `null` se env não estiver definida
 * (ex.: build na Vercel antes de configurar variáveis), evitando erro em tempo de build/SSR.
 * Instância única por carregamento do módulo (evita re-renders infinitos em useEffect).
 */
export function createClient(): SupabaseClient | null {
  if (cachedClient !== undefined) {
    return cachedClient;
  }
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
  if (!supabaseUrl || !supabaseKey) {
    cachedClient = null;
    return null;
  }
  cachedClient = createBrowserClient(supabaseUrl, supabaseKey);
  return cachedClient;
}
