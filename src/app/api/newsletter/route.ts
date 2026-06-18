import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServiceRole } from "@/lib/supabase";
import { sendNewsletterConfirmationEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24h

export async function POST(req: NextRequest) {
  // Rate limiting por IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  const { ok } = rateLimit(ip);
  if (!ok) {
    return NextResponse.json(
      { error: "Muitas tentativas. Aguarde um minuto." },
      { status: 429, headers: { "X-RateLimit-Remaining": "0" } }
    );
  }

  const supabase = getSupabaseServiceRole();
  if (!supabase) {
    return NextResponse.json({ error: "Serviço indisponível" }, { status: 503 });
  }

  let email: unknown;
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ error: "Requisição inválida" }, { status: 400 });
  }

  if (typeof email !== "string" || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }
  const normalized = email.trim().toLowerCase();

  // Já inscrito e confirmado? Idempotente — não reenvia nem revela detalhes.
  const { data: existing, error: selErr } = await supabase
    .from("newsletter_subscribers")
    .select("id, verified")
    .eq("email", normalized)
    .maybeSingle();

  if (selErr) {
    console.error("[newsletter] Erro ao consultar inscrito:", selErr);
    return NextResponse.json({ error: "Erro ao processar inscrição" }, { status: 500 });
  }

  if (existing?.verified) {
    return NextResponse.json({
      success: true,
      message: "Este e-mail já está inscrito na newsletter.",
    });
  }

  // Gera/renova token de confirmação (double opt-in). verified permanece false
  // até o clique no link enviado por e-mail.
  const token = globalThis.crypto.randomUUID();
  const { error: upErr } = await supabase.from("newsletter_subscribers").upsert(
    {
      email: normalized,
      verified: false,
      confirm_token: token,
      token_expires_at: new Date(Date.now() + TOKEN_TTL_MS).toISOString(),
      subscribed_at: new Date().toISOString(),
      unsubscribed_at: null,
    },
    { onConflict: "email" }
  );

  if (upErr) {
    console.error("[newsletter] Erro ao gravar inscrição:", upErr);
    return NextResponse.json({ error: "Erro ao processar inscrição" }, { status: 500 });
  }

  const confirmUrl = `${req.nextUrl.origin}/api/newsletter/confirm?token=${token}`;
  try {
    await sendNewsletterConfirmationEmail(normalized, confirmUrl);
  } catch (emailError) {
    console.error("[newsletter] Falha no envio do e-mail de confirmação:", emailError);
    return NextResponse.json(
      { error: "Não foi possível enviar o e-mail de confirmação. Tente novamente." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    success: true,
    message:
      "Enviamos um e-mail de confirmação. Verifique sua caixa de entrada para concluir a inscrição.",
  });
}
