import { NextRequest, NextResponse } from "next/server";
import { getAuthUrl } from "@/lib/google-calendar";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest) {
  // Exige admin autenticado para iniciar o fluxo OAuth.
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // state anti-CSRF: aleatório, guardado em cookie httpOnly e comparado no callback.
  const state = crypto.randomUUID();
  const url = getAuthUrl(state);
  if (!url) {
    return NextResponse.json({ error: "Google Calendar não configurado" }, { status: 500 });
  }

  const res = NextResponse.redirect(url);
  res.cookies.set("gcal_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600, // 10 min
  });
  return res;
}
