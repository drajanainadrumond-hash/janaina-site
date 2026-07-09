import { NextRequest, NextResponse } from "next/server";
import { getOAuth2Client } from "@/lib/google-calendar";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  // Exige admin AUTORIZADO (allowlist) — mesma sessão que iniciou o fluxo.
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Valida o state anti-CSRF contra o cookie httpOnly setado na rota /auth.
  const state = req.nextUrl.searchParams.get("state");
  const expected = req.cookies.get("gcal_oauth_state")?.value;
  if (!state || !expected || state !== expected) {
    return NextResponse.json({ error: "Estado de autorização inválido (CSRF)" }, { status: 400 });
  }

  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "Código de autorização ausente" }, { status: 400 });
  }

  const client = getOAuth2Client();
  if (!client) {
    return NextResponse.json({ error: "Google Calendar não configurado" }, { status: 500 });
  }

  const { tokens } = await client.getToken(code);

  const supabase = admin.service;

  await supabase.from("settings").upsert({
    key: "google_calendar_tokens",
    value: tokens,
    updated_at: new Date().toISOString(),
  });

  // Redireciona de volta ao admin e limpa o cookie de state.
  const res = NextResponse.redirect(new URL("/admin", req.url));
  res.cookies.set("gcal_oauth_state", "", { path: "/", maxAge: 0 });
  return res;
}
