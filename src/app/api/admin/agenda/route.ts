import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { pickFields } from "@/lib/admin-resources";

const APPOINTMENT_FIELDS = [
  "slot_id",
  "patient_name",
  "patient_phone",
  "patient_email",
  "date",
  "start_time",
  "end_time",
  "notes",
  "status",
  "source",
];

const SLOT_FIELDS = ["date", "start_time", "end_time", "is_available"];

function monthRange(year: number, month: number) {
  const mm = String(month + 1).padStart(2, "0");
  const lastDay = new Date(year, month + 1, 0).getDate();
  return { start: `${year}-${mm}-01`, end: `${year}-${mm}-${String(lastDay).padStart(2, "0")}` };
}

/** Dados da agenda para um mês. Os tokens do Google NUNCA são devolvidos —
 *  só o booleano de conexão, calculado no servidor. */
export async function GET(req: NextRequest) {
  const auth = await requireAdmin();
  if (!auth) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const sp = req.nextUrl.searchParams;
  const year = Number(sp.get("year"));
  const month = Number(sp.get("month")); // 0-11
  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 0 || month > 11) {
    return NextResponse.json({ error: "year/month inválidos" }, { status: 400 });
  }

  const { start, end } = monthRange(year, month);
  const sb = auth.service;

  const [appts, slotData, tokens, bh] = await Promise.all([
    sb.from("appointments").select("*").gte("date", start).lte("date", end).order("start_time"),
    sb.from("availability_slots").select("*").gte("date", start).lte("date", end).order("start_time"),
    sb.from("settings").select("value").eq("key", "google_calendar_tokens").maybeSingle(),
    sb.from("settings").select("value").eq("key", "business_hours").maybeSingle(),
  ]);

  const firstError = appts.error || slotData.error || tokens.error || bh.error;
  if (firstError) return NextResponse.json({ error: firstError.message }, { status: 500 });

  const tokenValue = tokens.data?.value as { access_token?: string } | null | undefined;

  return NextResponse.json({
    data: {
      appointments: appts.data ?? [],
      slots: slotData.data ?? [],
      businessHours: (bh.data?.value as Record<string, unknown> | null) ?? null,
      googleConnected: !!tokenValue?.access_token,
    },
  });
}

/** Mutações da agenda, despachadas por `action`. */
export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (!auth) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const sb = auth.service;
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const action = body.action as string;

  switch (action) {
    case "createSlots": {
      const rows = (Array.isArray(body.slots) ? body.slots : [])
        .map((s) => pickFields(s as Record<string, unknown>, SLOT_FIELDS))
        .filter((s) => s.date && s.start_time);
      if (rows.length === 0) return NextResponse.json({ error: "Nenhum horário válido" }, { status: 400 });
      const { error } = await sb.from("availability_slots").insert(rows);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ ok: true });
    }
    case "deleteSlot": {
      const id = body.id as string;
      if (!id) return NextResponse.json({ error: "id obrigatório" }, { status: 400 });
      const { error } = await sb.from("availability_slots").delete().eq("id", id);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ ok: true });
    }
    case "setSlotAvailability": {
      const id = body.id as string;
      if (!id) return NextResponse.json({ error: "id obrigatório" }, { status: 400 });
      const { error } = await sb
        .from("availability_slots")
        .update({ is_available: !!body.is_available })
        .eq("id", id);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ ok: true });
    }
    case "createAppointment": {
      const payload = pickFields(body, APPOINTMENT_FIELDS);
      if (!payload.patient_name || !payload.date || !payload.start_time) {
        return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
      }
      const { data, error } = await sb.from("appointments").insert(payload).select().single();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ data });
    }
    case "updateAppointmentStatus": {
      const id = body.id as string;
      const status = body.status as string;
      if (!id || !status) return NextResponse.json({ error: "id/status obrigatórios" }, { status: 400 });
      const { error } = await sb
        .from("appointments")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ ok: true });
    }
    case "deleteAppointment": {
      const id = body.id as string;
      if (!id) return NextResponse.json({ error: "id obrigatório" }, { status: 400 });
      const { error } = await sb.from("appointments").delete().eq("id", id);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ ok: true });
    }
    case "saveBusinessHours": {
      const value = body.value as Record<string, unknown>;
      if (!value || typeof value !== "object") {
        return NextResponse.json({ error: "value inválido" }, { status: 400 });
      }
      const { error } = await sb
        .from("settings")
        .upsert({ key: "business_hours", value, updated_at: new Date().toISOString() });
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ ok: true });
    }
    default:
      return NextResponse.json({ error: "Ação desconhecida" }, { status: 400 });
  }
}
