import { NextRequest, NextResponse } from "next/server";
import { CONTACT, CONVENIOS } from "@/lib/constants";
import { sendContactEmail } from "@/lib/email";
import { getSupabaseServiceRole } from "@/lib/supabase";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "referrer",
  "landing_page",
] as const;

/** Extrai e sanitiza os campos de atribuição vindos do cliente. */
function pickAttribution(body: Record<string, unknown>) {
  const out: Record<string, string> = {};
  for (const key of ATTRIBUTION_KEYS) {
    const v = body[key];
    if (typeof v === "string" && v.trim()) out[key] = v.slice(0, 300);
  }
  return out;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIp(request);
    const { ok, remaining } = rateLimit(ip);

    if (!ok) {
      return NextResponse.json(
        { error: "Muitas tentativas. Aguarde um minuto." },
        { status: 429, headers: { "X-RateLimit-Remaining": "0" } }
      );
    }

    const body = await request.json();
    const { name, whatsapp, convenio, queixa } = body;

    // Validação servidor
    if (!name || typeof name !== "string" || name.length < 3 || name.length > 100) {
      return NextResponse.json({ error: "Nome inválido" }, { status: 400 });
    }
    if (!whatsapp || typeof whatsapp !== "string" || whatsapp.length < 14 || whatsapp.length > 20) {
      return NextResponse.json({ error: "WhatsApp inválido" }, { status: 400 });
    }
    if (!convenio || typeof convenio !== "string" || !CONVENIOS.includes(convenio as typeof CONVENIOS[number])) {
      return NextResponse.json({ error: "Convênio inválido" }, { status: 400 });
    }
    if (!queixa || typeof queixa !== "string" || queixa.length < 10 || queixa.length > 1000) {
      return NextResponse.json({ error: "Queixa inválida" }, { status: 400 });
    }

    const leadData = { name, whatsapp, convenio, queixa };

    // 1. Salvar lead no Supabase (com atribuição de campanha, se houver).
    // Usa service_role: toda escrita passa por esta rota (validação + rate-limit),
    // permitindo remover o INSERT público direto na tabela `leads` via RLS.
    const supabase = getSupabaseServiceRole();
    if (supabase) {
      const { error: dbError } = await supabase.from("leads").insert({
        name,
        whatsapp,
        convenio,
        queixa,
        ip,
        ...pickAttribution(body),
        created_at: new Date().toISOString(),
      });
      if (dbError) console.error("[supabase] Erro ao salvar lead:", dbError);
    }

    // 2. Enviar email
    try {
      await sendContactEmail(leadData);
    } catch (emailError) {
      console.error("[email] Falha no envio:", emailError);
      // Não bloqueia o fluxo — lead já foi salvo
    }

    // 3. Gerar link WhatsApp
    const message = [
      `*Nova solicitação de consulta*`,
      ``,
      `*Nome:* ${name}`,
      `*WhatsApp:* ${whatsapp}`,
      `*Convênio:* ${convenio}`,
      `*Queixa:* ${queixa}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent(message)}`;

    return NextResponse.json(
      {
        success: true,
        whatsappUrl,
        message: "Mensagem enviada com sucesso!",
      },
      { headers: { "X-RateLimit-Remaining": String(remaining) } }
    );
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
