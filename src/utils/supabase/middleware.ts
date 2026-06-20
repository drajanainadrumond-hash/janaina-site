import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

const LOGIN_PATH = "/admin/login";

export const updateSession = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Sem env do Supabase (ex.: build sem variáveis), não há como autenticar:
  // segue o fluxo normal para a própria página mostrar a instrução de configuração.
  if (!supabaseUrl || !supabaseKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    },
  );

  // IMPORTANTE (Supabase SSR): chamar getUser() logo após criar o client renova a
  // sessão/refresh token. Não colocar lógica entre o createServerClient e este getUser.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isLoginPath = pathname === LOGIN_PATH;

  // Anônimo tentando acessar qualquer rota /admin (menos o próprio login) → login.
  if (!user && !isLoginPath) {
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    return redirectPreservingCookies(url, supabaseResponse);
  }

  // Já autenticado abrindo a tela de login → vai direto para o painel.
  if (user && isLoginPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return redirectPreservingCookies(url, supabaseResponse);
  }

  return supabaseResponse;
};

/**
 * Cria um redirect copiando os cookies de sessão eventualmente renovados em
 * `supabaseResponse`, para não perder o refresh do token no desvio.
 */
function redirectPreservingCookies(url: URL, supabaseResponse: NextResponse) {
  const redirectResponse = NextResponse.redirect(url);
  supabaseResponse.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie);
  });
  return redirectResponse;
}
