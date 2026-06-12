import { NextRequest, NextResponse } from "next/server";
import { getOAuth2Client } from "@/lib/google-calendar";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "Código de autorização ausente" }, { status: 400 });
  }

  const client = getOAuth2Client();
  if (!client) {
    return NextResponse.json({ error: "Google Calendar não configurado" }, { status: 500 });
  }

  const { tokens } = await client.getToken(code);

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Banco de dados não configurado" }, { status: 503 });
  }

  await supabase.from("settings").upsert({
    key: "google_calendar_tokens",
    value: tokens,
    updated_at: new Date().toISOString(),
  });

  // Redirecionar de volta ao admin
  return NextResponse.redirect(new URL("/admin", req.url));
}
