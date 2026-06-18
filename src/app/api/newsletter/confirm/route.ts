import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServiceRole } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const redirectTo = (status: string) =>
    NextResponse.redirect(`${origin}/newsletter/confirmacao?status=${status}`);

  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return redirectTo("invalido");
  }

  const supabase = getSupabaseServiceRole();
  if (!supabase) {
    return redirectTo("erro");
  }

  const { data: row, error } = await supabase
    .from("newsletter_subscribers")
    .select("id, verified, token_expires_at")
    .eq("confirm_token", token)
    .maybeSingle();

  if (error) {
    console.error("[newsletter/confirm] Erro ao consultar token:", error);
    return redirectTo("erro");
  }
  if (!row) {
    return redirectTo("invalido");
  }
  // Já confirmado anteriormente — idempotente.
  if (row.verified) {
    return redirectTo("sucesso");
  }
  if (row.token_expires_at && new Date(row.token_expires_at).getTime() < Date.now()) {
    return redirectTo("expirado");
  }

  const { error: updErr } = await supabase
    .from("newsletter_subscribers")
    .update({
      verified: true,
      confirmed_at: new Date().toISOString(),
      confirm_token: null,
      token_expires_at: null,
    })
    .eq("id", row.id);

  if (updErr) {
    console.error("[newsletter/confirm] Erro ao confirmar inscrição:", updErr);
    return redirectTo("erro");
  }

  return redirectTo("sucesso");
}
