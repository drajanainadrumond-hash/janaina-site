import { NextResponse } from "next/server";
import { getAuthUrl } from "@/lib/google-calendar";

export async function GET() {
  const url = getAuthUrl();
  if (!url) {
    return NextResponse.json({ error: "Google Calendar não configurado" }, { status: 500 });
  }
  return NextResponse.redirect(url);
}
