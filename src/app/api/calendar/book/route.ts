import { NextRequest, NextResponse } from "next/server";
import { createEvent } from "@/lib/google-calendar";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  // Rota ADMIN-ONLY. O único chamador legítimo é o painel (agenda-manager), para
  // sincronizar o evento no Google Calendar. Antes era pública com service_role e
  // sem validar `slot_id`, o que permitia a QUALQUER anônimo: (1) marcar slots
  // arbitrários como indisponíveis (sabotar a agenda) e (2) floodar `appointments`
  // + criar eventos falsos no Google Calendar da médica. Agendamento público real
  // é pelo WhatsApp; se um dia houver booking público, criar rota própria com
  // validação de slot (existe + disponível + bate com date/start_time).
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  const supabase = admin.service;

  const body = await req.json();
  const { slot_id, patient_name, patient_phone, patient_email, date, start_time, end_time, notes } = body;

  if (!patient_name || !patient_phone || !date || !start_time || !end_time) {
    return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
  }

  // Validação de formato (evita dados arbitrários)
  if (typeof patient_name !== "string" || patient_name.length > 120 ||
      typeof patient_phone !== "string" || patient_phone.length > 30 ||
      !/^\d{4}-\d{2}-\d{2}$/.test(String(date)) ||
      !/^\d{2}:\d{2}$/.test(String(start_time)) || !/^\d{2}:\d{2}$/.test(String(end_time))) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }
  if (patient_email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(patient_email))) {
    return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
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
    // 23505 = violação de índice único (horário já reservado por requisição concorrente)
    if (error.code === "23505") {
      return NextResponse.json({ error: "Horário já ocupado" }, { status: 409 });
    }
    console.error("[calendar/book] erro ao salvar agendamento:", error);
    return NextResponse.json({ error: "Erro ao salvar agendamento" }, { status: 500 });
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
