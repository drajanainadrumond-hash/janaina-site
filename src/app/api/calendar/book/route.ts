import { NextRequest, NextResponse } from "next/server";
import { createEvent } from "@/lib/google-calendar";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Banco de dados não configurado" },
      { status: 503 }
    );
  }

  const body = await req.json();
  const { slot_id, patient_name, patient_phone, patient_email, date, start_time, end_time, notes } = body;

  if (!patient_name || !patient_phone || !date || !start_time || !end_time) {
    return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
  }

  // 1. Verificar se slot ainda está livre
  const { data: existing } = await supabase
    .from("appointments")
    .select("id")
    .eq("date", date)
    .eq("start_time", start_time)
    .neq("status", "cancelled")
    .single();

  if (existing) {
    return NextResponse.json({ error: "Horário já ocupado" }, { status: 409 });
  }

  // 2. Criar agendamento
  let googleEventId = null;

  // 3. Tentar criar evento no Google Calendar
  const { data: settings } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "google_calendar_tokens")
    .single();

  if (settings?.value?.access_token) {
    try {
      const event = await createEvent(settings.value, {
        summary: `Consulta — ${patient_name}`,
        description: `Paciente: ${patient_name}\nTelefone: ${patient_phone}\n${patient_email ? `Email: ${patient_email}\n` : ""}${notes ? `Obs: ${notes}` : ""}`,
        startDateTime: `${date}T${start_time}:00-03:00`,
        endDateTime: `${date}T${end_time}:00-03:00`,
      });
      googleEventId = event?.id || null;
    } catch {
      // Google Calendar falhou — agendamento continua só no Supabase
    }
  }

  // 4. Salvar no Supabase
  const { data: appointment, error } = await supabase
    .from("appointments")
    .insert({
      slot_id: slot_id || null,
      patient_name,
      patient_phone,
      patient_email: patient_email || null,
      date,
      start_time,
      end_time,
      notes: notes || null,
      status: "pending",
      google_event_id: googleEventId,
      source: "website",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 5. Marcar slot como indisponível
  if (slot_id) {
    await supabase
      .from("availability_slots")
      .update({ is_available: false })
      .eq("id", slot_id);
  }

  return NextResponse.json({ appointment, googleEventCreated: !!googleEventId });
}
