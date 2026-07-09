import { NextRequest, NextResponse } from "next/server";
import { getFreeBusy } from "@/lib/google-calendar";
import { getSupabaseServiceRole } from "@/lib/supabase";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function GET(req: NextRequest) {
  const ip = getClientIp(req);
  if (!rateLimit(ip).ok) {
    return NextResponse.json({ error: "Muitas tentativas. Aguarde um minuto.", slots: [] }, { status: 429 });
  }

  const supabase = getSupabaseServiceRole();
  if (!supabase) {
    return NextResponse.json(
      { error: "Banco de dados não configurado", slots: [] },
      { status: 503 }
    );
  }

  const date = req.nextUrl.searchParams.get("date");
  if (!date) {
    return NextResponse.json({ error: "Data obrigatoria" }, { status: 400 });
  }

  // 1. Buscar slots manuais do Supabase
  const { data: slots } = await supabase
    .from("availability_slots")
    .select("*")
    .eq("date", date)
    .eq("is_available", true)
    .order("start_time", { ascending: true });

  // 2. Buscar agendamentos existentes
  const { data: appointments } = await supabase
    .from("appointments")
    .select("start_time, end_time")
    .eq("date", date)
    .neq("status", "cancelled");

  const bookedTimes = new Set(
    (appointments || []).map((a) => a.start_time)
  );

  // 3. Tentar buscar horarios ocupados do Google Calendar
  let googleBusy: { start?: string | null; end?: string | null }[] = [];
  const { data: settings } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "google_calendar_tokens")
    .single();

  if (settings?.value?.access_token) {
    try {
      const timeMin = `${date}T00:00:00-03:00`;
      const timeMax = `${date}T23:59:59-03:00`;
      googleBusy = await getFreeBusy(settings.value, timeMin, timeMax);
    } catch {
      // Google Calendar indisponivel — usa apenas slots manuais
    }
  }

  // 4. Filtrar slots disponíveis
  const available = (slots || []).filter((slot) => {
    // Já agendado no Supabase?
    if (bookedTimes.has(slot.start_time)) return false;

    // Ocupado no Google Calendar?
    if (googleBusy.length > 0) {
      const slotStart = new Date(`${date}T${slot.start_time}-03:00`).getTime();
      const slotEnd = new Date(`${date}T${slot.end_time}-03:00`).getTime();
      for (const busy of googleBusy) {
        if (!busy.start || !busy.end) continue;
        const busyStart = new Date(busy.start).getTime();
        const busyEnd = new Date(busy.end).getTime();
        if (slotStart < busyEnd && slotEnd > busyStart) return false;
      }
    }

    return true;
  });

  return NextResponse.json({
    slots: available,
    googleConnected: !!settings?.value?.access_token,
  });
}
