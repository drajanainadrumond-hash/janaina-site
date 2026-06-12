"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  User,
  Phone,
  Check,
  X,
  CheckCircle2,
  Link2,
  Trash2,
  Building2,
  Video,
  Layers,
  Flag,
  Activity,
  CloudRain,
  Sun,
  Thermometer,
  ToggleLeft,
  ToggleRight,
  Zap,
  Coffee,
  Save,
  Settings,
} from "lucide-react";
import {
  getEventForDate,
  getEventsForMonth,
  DEFAULT_BUSINESS_HOURS,
  DAY_KEYS,
  DAY_LABELS,
  type CalendarEvent,
  type BusinessHours,
  type DayKey,
} from "@/lib/calendario-bh";

/* ====== Types ====== */
type Slot = {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
  recurrence: string;
  notes: string;
};

type Appointment = {
  id: string;
  slot_id: string | null;
  patient_name: string;
  patient_phone: string;
  patient_email: string;
  date: string;
  start_time: string;
  end_time: string;
  notes: string;
  status: string;
  source: string;
  google_event_id: string | null;
  created_at: string;
};

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDayOfMonth(y: number, m: number) { return new Date(y, m, 1).getDay(); }
function formatDateLong(d: string) { return new Date(d + "T12:00:00").toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" }); }

const STATUS = {
  pending: { label: "Pendente", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-400", bar: "bg-amber-400" },
  confirmed: { label: "Confirmado", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-400", bar: "bg-emerald-400" },
  cancelled: { label: "Cancelado", bg: "bg-red-50", text: "text-red-400", dot: "bg-red-300", bar: "bg-red-300" },
  completed: { label: "Realizado", bg: "bg-[#003E51]/5", text: "text-[#003E51]", dot: "bg-[#003E51]", bar: "bg-[#003E51]" },
} as Record<string, { label: string; bg: string; text: string; dot: string; bar: string }>;

// Generate time slots for a day
function generateTimeSlots(start: string, end: string, lunchStart: string, lunchEnd: string, interval = 30) {
  const slots: { time: string; endTime: string; isLunch: boolean }[] = [];
  let [h, m] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);
  const [lsH, lsM] = lunchStart ? lunchStart.split(":").map(Number) : [-1, -1];
  const [leH, leM] = lunchEnd ? lunchEnd.split(":").map(Number) : [-1, -1];

  while (h * 60 + m < endH * 60 + endM) {
    const t = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    const nm = m + interval;
    const nh = h + Math.floor(nm / 60);
    const nmin = nm % 60;
    const et = `${String(nh).padStart(2, "0")}:${String(nmin).padStart(2, "0")}`;
    const mins = h * 60 + m;
    const isLunch = lsH >= 0 && mins >= lsH * 60 + lsM && mins < leH * 60 + leM;
    slots.push({ time: t, endTime: et, isLunch });
    h = nh;
    m = nmin;
  }
  return slots;
}

const ANIM = `
@keyframes agenda-slide-in { from { opacity:0; transform:translateX(12px); } to { opacity:1; transform:translateX(0); } }
@keyframes agenda-fade { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
@keyframes agenda-pop { 0% { transform:scale(0.95); opacity:0; } 60% { transform:scale(1.02); } 100% { transform:scale(1); opacity:1; } }
@keyframes agenda-pulse { 0%,100% { box-shadow:0 0 0 0 rgba(0,62,81,0.1); } 50% { box-shadow:0 0 0 6px rgba(0,62,81,0); } }
.agenda-slide-in { animation: agenda-slide-in 0.35s ease both; }
.agenda-fade { animation: agenda-fade 0.3s ease both; }
.agenda-pop { animation: agenda-pop 0.3s ease both; }
.slot-enter { animation: agenda-fade 0.25s ease both; }
.slot-enter:nth-child(odd) { animation-delay: 0.02s; }
.slot-enter:nth-child(even) { animation-delay: 0.04s; }
`;

/* ====== Main Component ====== */
export function AgendaManager() {
  const supabase = createClient();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [googleConnected, setGoogleConnected] = useState(false);
  const [businessHours, setBusinessHours] = useState<BusinessHours>(DEFAULT_BUSINESS_HOURS);
  const [monthEvents, setMonthEvents] = useState<CalendarEvent[]>([]);
  const [saving, setSaving] = useState(false);

  // Calendar
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState(now.toISOString().split("T")[0]);

  // Inline business hours editing
  const [editingBH, setEditingBH] = useState(false);
  const [bhDraft, setBhDraft] = useState<BusinessHours>(businessHours);

  // Quick appointment form
  const [quickForm, setQuickForm] = useState<{ open: boolean; time: string; endTime: string }>({ open: false, time: "", endTime: "" });
  const [apptForm, setApptForm] = useState({ patient_name: "", patient_phone: "", patient_email: "", notes: "", mode: "presencial" });
  const [booking, setBooking] = useState(false);

  const fetchData = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const startOfMonth = `${year}-${String(month + 1).padStart(2, "0")}-01`;
    const endOfMonth = `${year}-${String(month + 1).padStart(2, "0")}-${getDaysInMonth(year, month)}`;

    const [appts, slotData, settings, bhData] = await Promise.all([
      supabase.from("appointments").select("*").gte("date", startOfMonth).lte("date", endOfMonth).order("start_time"),
      supabase.from("availability_slots").select("*").gte("date", startOfMonth).lte("date", endOfMonth).order("start_time"),
      supabase.from("settings").select("value").eq("key", "google_calendar_tokens").single(),
      supabase.from("settings").select("value").eq("key", "business_hours").single(),
    ]);

    setAppointments(appts.data || []);
    setSlots(slotData.data || []);
    setGoogleConnected(!!settings.data?.value?.access_token);
    setMonthEvents(getEventsForMonth(year, month));
    if (bhData.data?.value) setBusinessHours(bhData.data.value as BusinessHours);
    setLoading(false);
  }, [year, month, supabase]);

  useEffect(() => { fetchData(); }, [fetchData]);

  if (!supabase) {
    return (
      <p className="text-[1.125rem] text-[#7A8E9B]">Supabase não configurado.</p>
    );
  }

  const sb = supabase;

  function prevMonth() { if (month === 0) { setMonth(11); setYear(year - 1); } else setMonth(month - 1); }
  function nextMonth() { if (month === 11) { setMonth(0); setYear(year + 1); } else setMonth(month + 1); }
  function goToday() { const t = new Date(); setYear(t.getFullYear()); setMonth(t.getMonth()); setSelectedDate(t.toISOString().split("T")[0]); }
  function selectDay(day: number) { setSelectedDate(`${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`); setQuickForm({ open: false, time: "", endTime: "" }); }

  // Toggle slot availability
  async function toggleSlot(time: string, endTime: string) {
    const existing = slots.find((s) => s.date === selectedDate && s.start_time.slice(0, 5) === time);
    if (existing) {
      await sb.from("availability_slots").delete().eq("id", existing.id);
    } else {
      await sb.from("availability_slots").insert({ date: selectedDate, start_time: time, end_time: endTime, is_available: true });
    }
    fetchData();
  }

  // Quick book
  async function quickBook() {
    if (!apptForm.patient_name || !apptForm.patient_phone) return;
    setBooking(true);

    try {
      // Insert directly via Supabase for instant feedback
      const slotMatch = slots.find((s) => s.date === selectedDate && s.start_time.slice(0, 5) === quickForm.time);

      const { error } = await sb.from("appointments").insert({
        slot_id: slotMatch?.id || null,
        patient_name: apptForm.patient_name,
        patient_phone: apptForm.patient_phone,
        patient_email: apptForm.patient_email || null,
        date: selectedDate,
        start_time: quickForm.time,
        end_time: quickForm.endTime,
        notes: apptForm.notes || null,
        status: "pending",
        source: "admin",
      });

      if (error) {
        alert("Erro ao agendar: " + error.message);
        setBooking(false);
        return;
      }

      // Mark slot as unavailable
      if (slotMatch) {
        await sb.from("availability_slots").update({ is_available: false }).eq("id", slotMatch.id);
      }

      // Try to sync with Google Calendar (non-blocking)
      fetch("/api/calendar/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_name: apptForm.patient_name,
          patient_phone: apptForm.patient_phone,
          date: selectedDate,
          start_time: quickForm.time,
          end_time: quickForm.endTime,
        }),
      }).catch(() => {});

      setQuickForm({ open: false, time: "", endTime: "" });
      setApptForm({ patient_name: "", patient_phone: "", patient_email: "", notes: "", mode: "presencial" });
      await fetchData();
    } finally {
      setBooking(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    await sb.from("appointments").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    fetchData();
  }

  async function deleteAppt(id: string) {
    if (!confirm("Excluir agendamento?")) return;
    await sb.from("appointments").delete().eq("id", id);
    fetchData();
  }

  // Bulk generate slots for selected day
  async function generateDaySlots() {
    const d = new Date(selectedDate + "T12:00:00");
    const dayKey = DAY_KEYS[d.getDay()];
    const bh = businessHours[dayKey];
    if (!bh.active) return;

    const timeSlots = generateTimeSlots(bh.start, bh.end, bh.lunch_start, bh.lunch_end);
    const existing = slots.filter((s) => s.date === selectedDate).map((s) => s.start_time.slice(0, 5));
    const newSlots = timeSlots.filter((t) => !t.isLunch && !existing.includes(t.time)).map((t) => ({
      date: selectedDate, start_time: t.time, end_time: t.endTime, is_available: true,
    }));

    if (newSlots.length > 0) {
      await sb.from("availability_slots").insert(newSlots);
      fetchData();
    }
  }

  // Save business hours
  async function saveBH(bh: BusinessHours) {
    setSaving(true);
    await sb.from("settings").upsert({ key: "business_hours", value: bh as unknown as Record<string, unknown>, updated_at: new Date().toISOString() });
    setBusinessHours(bh);
    setSaving(false);
  }

  // Calendar data
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const todayStr = now.toISOString().split("T")[0];

  function dayInfo(day: number) {
    const d = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const a = appointments.filter((x) => x.date === d && x.status !== "cancelled");
    const s = slots.filter((x) => x.date === d && x.is_available);
    const p = a.filter((x) => x.status === "pending").length;
    const ev = getEventForDate(year, month, day);
    const dayOfWeek = new Date(year, month, day).getDay();
    const isOff = !businessHours[DAY_KEYS[dayOfWeek]].active;
    return { date: d, appts: a.length, slots: s.length, pending: p, events: ev, isOff, holiday: ev.find((e) => e.type === "feriado"), seasonal: ev.find((e) => e.type === "sazonal") };
  }

  // Selected day data
  const selDayOfWeek = new Date(selectedDate + "T12:00:00").getDay();
  const selBH = businessHours[DAY_KEYS[selDayOfWeek]];
  const dayAppts = appointments.filter((a) => a.date === selectedDate).sort((a, b) => a.start_time.localeCompare(b.start_time));
  const daySlots = slots.filter((s) => s.date === selectedDate);
  const dayEvents = getEventForDate(year, month, parseInt(selectedDate.split("-")[2]));
  const timeSlots = selBH.active ? generateTimeSlots(selBH.start, selBH.end, selBH.lunch_start, selBH.lunch_end) : [];

  return (
    <div>
      <style>{ANIM}</style>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[1.1rem] font-medium text-[#003E51]">Agenda</h2>
        <div className="flex items-center gap-2">
          <button onClick={goToday} className="px-3 py-1.5 rounded-lg text-[1.125rem] uppercase text-[#003E51] bg-white border border-[#E6E5E2] hover:bg-[#f5f5f0] transition-colors font-medium">Hoje</button>
          {googleConnected ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[1.125rem] uppercase text-emerald-600 bg-emerald-50 border border-emerald-200/50">
              <Link2 className="w-3 h-3" /> Google sincronizado
            </div>
          ) : (
            <a href="/api/calendar/auth" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[1.125rem] uppercase text-[#7A8E9B] border border-[#E6E5E2] hover:text-[#00565B] transition-colors">
              <Link2 className="w-3 h-3" /> Conectar Google
            </a>
          )}
        </div>
      </div>

      {/* Main layout: Calendar + Day Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">

        {/* ===== CALENDAR ===== */}
        <div className="bg-white rounded-2xl border border-[#E6E5E2] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E6E5E2]/60">
            <button onClick={prevMonth} className="w-8 h-8 rounded-lg hover:bg-[#f5f5f0] flex items-center justify-center transition-colors">
              <ChevronLeft className="w-4 h-4 text-[#003E51]" />
            </button>
            <h3 className="text-[1.125rem] font-medium text-[#003E51]">{MONTHS[month]} {year}</h3>
            <button onClick={nextMonth} className="w-8 h-8 rounded-lg hover:bg-[#f5f5f0] flex items-center justify-center transition-colors">
              <ChevronRight className="w-4 h-4 text-[#003E51]" />
            </button>
          </div>

          <div className="grid grid-cols-7 border-b border-[#E6E5E2]/60">
            {WEEKDAYS.map((d, i) => (
              <div key={d} className={`py-2 text-center text-[1.125rem] uppercase tracking-[1px] font-medium ${!businessHours[DAY_KEYS[i]].active ? "text-[#7A8E9B]/25" : "text-[#7A8E9B]"}`}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} className="min-h-[130px] border-b border-r border-[#E6E5E2]/20 bg-[#fafaf8]" />)}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const d = dayInfo(day);
              const isToday = d.date === todayStr;
              const isSel = d.date === selectedDate;
              const ci = firstDay + i;
              const lastCol = (ci + 1) % 7 === 0;

              return (
                <button key={day} onClick={() => selectDay(day)} className={`min-h-[130px] p-2.5 text-left border-b border-[#E6E5E2]/20 transition-all relative group ${!lastCol ? "border-r" : ""} ${isSel ? "bg-[#003E51]/[0.04] ring-2 ring-inset ring-[#003E51]/15" : "hover:bg-[#003E51]/[0.015]"} ${d.isOff && !d.holiday ? "bg-[#fafaf8]/80" : ""} ${d.holiday ? "bg-red-50/30" : ""}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full text-[1.125rem] font-medium transition-all ${isToday ? "bg-[#003E51] text-white" : d.holiday ? "text-red-400" : d.isOff ? "text-[#7A8E9B]/30" : "text-[#003E51]"} ${isSel && !isToday ? "ring-2 ring-[#003E51]/20" : ""}`}>{day}</span>
                    {d.pending > 0 && <div className="w-6 h-6 rounded-full bg-amber-400 text-white text-[1.125rem] font-bold flex items-center justify-center animate-pulse">{d.pending}</div>}
                  </div>

                  {d.holiday && <div className="text-[1.125rem] text-red-400 mt-1 leading-tight flex items-start gap-1"><Flag className="w-3.5 h-3.5 shrink-0 mt-0.5" /><span className="break-words">{d.holiday.label}</span></div>}
                  {d.seasonal && !d.holiday && <div className="text-[1.125rem] text-violet-400 mt-1 leading-tight flex items-start gap-1"><Activity className="w-3.5 h-3.5 shrink-0 mt-0.5" /><span className="break-words">{d.seasonal.label}</span></div>}

                  <div className="mt-1.5 space-y-1">
                    {d.appts > 0 && (
                      <div className="flex items-start gap-1.5 bg-[#003E51]/[0.06] rounded px-1.5 py-0.5">
                        <User className="w-3.5 h-3.5 text-[#003E51]/60 shrink-0 mt-0.5" />
                        <span className="text-[1.125rem] text-[#003E51] font-medium leading-tight">{d.appts} consulta{d.appts > 1 ? "s" : ""}</span>
                      </div>
                    )}
                    {d.slots > 0 && d.appts === 0 && (
                      <div className="flex items-start gap-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-2" />
                        <span className="text-[1.125rem] text-emerald-500/60 leading-tight">{d.slots} vaga{d.slots > 1 ? "s" : ""}</span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}

            {Array.from({ length: (7 - ((firstDay + daysInMonth) % 7)) % 7 }).map((_, i) => <div key={`f-${i}`} className="min-h-[130px] border-b border-r border-[#E6E5E2]/20 bg-[#fafaf8]" />)}
          </div>

          {/* Season bar */}
          <div className="px-4 py-2.5 flex items-center gap-2 border-t border-[#E6E5E2]/40 bg-[#fafaf8]/50">
            {month >= 4 && month <= 8 ? <CloudRain className="w-3.5 h-3.5 text-[#7A8E9B]" /> : month >= 9 || month <= 1 ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Thermometer className="w-3.5 h-3.5 text-[#7A8E9B]" />}
            <span className="text-[1.125rem] text-[#7A8E9B]">{month >= 4 && month <= 8 ? "Estação seca — dores articulares" : month >= 9 || month <= 1 ? "Estação chuvosa — quedas/acidentes" : "Transição — retorno às atividades"}</span>
          </div>
        </div>

        {/* ===== DAY PANEL ===== */}
        <div className="agenda-slide-in space-y-3" key={selectedDate}>
          {/* Day header */}
          <div className="bg-white rounded-2xl border border-[#E6E5E2] p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[1.125rem] font-medium text-[#003E51] capitalize">{formatDateLong(selectedDate)}</h3>
              {selectedDate === todayStr && <span className="text-[1.125rem] uppercase font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Hoje</span>}
            </div>

            {/* Day events */}
            {dayEvents.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {dayEvents.map((ev, i) => (
                  <span key={i} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[1.125rem] font-medium ${ev.type === "feriado" ? "bg-red-50 text-red-500" : ev.type === "sazonal" ? "bg-violet-50 text-violet-500" : "bg-amber-50 text-amber-600"}`}>
                    {ev.type === "feriado" ? <Flag className="w-2.5 h-2.5" /> : <Activity className="w-2.5 h-2.5" />}
                    {ev.label}
                  </span>
                ))}
              </div>
            )}

            {/* Business hours info + inline edit */}
            {!editingBH ? (
              <div className="flex items-center justify-between">
                {selBH.active ? (
                  <div className="flex items-center gap-3 text-[1.125rem] text-[#7A8E9B]">
                    <div className="flex items-center gap-1"><Clock className="w-3 h-3" />{selBH.start} — {selBH.end}</div>
                    {selBH.lunch_start && <div className="flex items-center gap-1"><Coffee className="w-3 h-3" />{selBH.lunch_start}-{selBH.lunch_end}</div>}
                    <div className="flex items-center gap-1">
                      {selBH.mode === "presencial" || selBH.mode === "ambos" ? <Building2 className="w-3 h-3" /> : null}
                      {selBH.mode === "video" || selBH.mode === "ambos" ? <Video className="w-3 h-3" /> : null}
                    </div>
                  </div>
                ) : (
                  <p className="text-[1.125rem] text-[#7A8E9B]/50">Sem expediente configurado</p>
                )}
                <button onClick={() => { setBhDraft(JSON.parse(JSON.stringify(businessHours))); setEditingBH(true); }} className="w-7 h-7 rounded-lg hover:bg-[#f5f5f0] flex items-center justify-center transition-colors">
                  <Settings className="w-3.5 h-3.5 text-[#7A8E9B]" />
                </button>
              </div>
            ) : (
              /* Inline BH editor */
              <div className="agenda-pop mt-2 p-3 bg-[#fafaf8] rounded-xl border border-[#E6E5E2] space-y-3">
                {(() => {
                  const dayKey = DAY_KEYS[selDayOfWeek];
                  const d = bhDraft[dayKey];
                  return (
                    <>
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={d.active} onChange={(e) => setBhDraft({ ...bhDraft, [dayKey]: { ...d, active: e.target.checked, status: e.target.checked ? "disponivel" : "indisponivel" } })} className="w-3.5 h-3.5 rounded accent-[#003E51]" />
                          <span className="text-[1.125rem] font-medium text-[#003E51]">{d.active ? "Expediente ativo" : "Sem expediente"}</span>
                        </label>
                      </div>

                      {d.active && (
                        <>
                          {/* Times */}
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-[#7A8E9B] shrink-0" />
                            <input type="time" value={d.start} onChange={(e) => setBhDraft({ ...bhDraft, [dayKey]: { ...d, start: e.target.value } })} className="px-2 py-1 rounded-lg border border-[#E6E5E2] text-[1.125rem] text-[#003E51] w-[80px] bg-white focus:outline-none focus:border-[#00565B]" />
                            <span className="text-[1.125rem] text-[#7A8E9B]">até</span>
                            <input type="time" value={d.end} onChange={(e) => setBhDraft({ ...bhDraft, [dayKey]: { ...d, end: e.target.value } })} className="px-2 py-1 rounded-lg border border-[#E6E5E2] text-[1.125rem] text-[#003E51] w-[80px] bg-white focus:outline-none focus:border-[#00565B]" />
                          </div>
                          <div className="flex items-center gap-2">
                            <Coffee className="w-3 h-3 text-[#7A8E9B] shrink-0" />
                            <input type="time" value={d.lunch_start} onChange={(e) => setBhDraft({ ...bhDraft, [dayKey]: { ...d, lunch_start: e.target.value } })} className="px-2 py-1 rounded-lg border border-[#E6E5E2] text-[1.125rem] text-[#003E51] w-[80px] bg-white focus:outline-none focus:border-[#00565B]" />
                            <span className="text-[1.125rem] text-[#7A8E9B]">—</span>
                            <input type="time" value={d.lunch_end} onChange={(e) => setBhDraft({ ...bhDraft, [dayKey]: { ...d, lunch_end: e.target.value } })} className="px-2 py-1 rounded-lg border border-[#E6E5E2] text-[1.125rem] text-[#003E51] w-[80px] bg-white focus:outline-none focus:border-[#00565B]" />
                          </div>

                          {/* Mode */}
                          <div className="flex items-center gap-1.5">
                            {([
                              { v: "presencial", label: "Presencial", Icon: Building2 },
                              { v: "video", label: "Vídeo", Icon: Video },
                              { v: "ambos", label: "Ambos", Icon: Layers },
                            ] as const).map((opt) => (
                              <button key={opt.v} onClick={() => setBhDraft({ ...bhDraft, [dayKey]: { ...d, mode: opt.v } })} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[1.125rem] font-medium border transition-all ${d.mode === opt.v ? "bg-[#003E51] text-white border-[#003E51]" : "border-[#E6E5E2] text-[#7A8E9B] bg-white hover:bg-[#f5f5f0]"}`}>
                                <opt.Icon className="w-3 h-3" />{opt.label}
                              </button>
                            ))}
                          </div>
                        </>
                      )}

                      {/* Save / Cancel */}
                      <div className="flex items-center gap-2 pt-1">
                        <button onClick={async () => { await saveBH(bhDraft); setEditingBH(false); fetchData(); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#003E51] text-white text-[1.125rem] uppercase font-medium hover:bg-[#00565B] transition-colors">
                          <Save className="w-3 h-3" /> Salvar
                        </button>
                        <button onClick={() => setEditingBH(false)} className="px-3 py-1.5 rounded-lg text-[1.125rem] text-[#7A8E9B] hover:text-[#003E51] transition-colors">
                          Cancelar
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Appointments for the day */}
          {dayAppts.length > 0 && (
            <div className="space-y-2">
              {dayAppts.map((a) => {
                const st = STATUS[a.status] || STATUS.pending;
                return (
                  <div key={a.id} className="agenda-fade bg-white rounded-xl border border-[#E6E5E2] overflow-hidden group">
                    <div className={`h-[2px] ${st.bar}`} />
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[1.125rem] font-medium text-[#003E51]">{a.start_time.slice(0, 5)}-{a.end_time.slice(0, 5)}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[1.125rem] font-medium ${st.bg} ${st.text}`}>{st.label}</span>
                          {a.google_event_id && <Link2 className="w-2.5 h-2.5 text-emerald-400" />}
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {a.status === "pending" && <button onClick={() => updateStatus(a.id, "confirmed")} className="w-6 h-6 rounded-md bg-emerald-50 flex items-center justify-center hover:bg-emerald-100 transition-colors"><Check className="w-3 h-3 text-emerald-600" /></button>}
                          {a.status === "pending" && <button onClick={() => updateStatus(a.id, "cancelled")} className="w-6 h-6 rounded-md bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors"><X className="w-3 h-3 text-red-400" /></button>}
                          {a.status === "confirmed" && <button onClick={() => updateStatus(a.id, "completed")} className="w-6 h-6 rounded-md bg-[#003E51]/5 flex items-center justify-center hover:bg-[#003E51]/10 transition-colors"><CheckCircle2 className="w-3 h-3 text-[#003E51]" /></button>}
                          <button onClick={() => deleteAppt(a.id)} className="w-6 h-6 rounded-md hover:bg-red-50 flex items-center justify-center transition-colors"><Trash2 className="w-3 h-3 text-[#7A8E9B]" /></button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[1.125rem]">
                        <User className="w-3 h-3 text-[#7A8E9B]" /><span className="text-[#003E51] font-medium">{a.patient_name}</span>
                        <a href={`https://wa.me/55${a.patient_phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-0.5 text-emerald-600 hover:underline"><Phone className="w-2.5 h-2.5" />{a.patient_phone}</a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Time slots grid */}
          {selBH.active && (
            <div className="bg-white rounded-2xl border border-[#E6E5E2] p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[1.125rem] uppercase tracking-[1px] text-[#7A8E9B] font-medium">Horários</p>
                <button onClick={generateDaySlots} className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[1.125rem] uppercase text-[#003E51] bg-[#003E51]/[0.04] hover:bg-[#003E51]/[0.08] transition-colors font-medium">
                  <Zap className="w-3 h-3" /> Liberar todos
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((ts) => {
                  const isAvailable = daySlots.some((s) => s.start_time.slice(0, 5) === ts.time && s.is_available);
                  const hasAppt = dayAppts.some((a) => a.start_time.slice(0, 5) === ts.time && a.status !== "cancelled");
                  const isQuickOpen = quickForm.open && quickForm.time === ts.time;

                  if (ts.isLunch) {
                    return (
                      <div key={ts.time} className="slot-enter rounded-lg px-2 py-2 bg-[#fafaf8] border border-dashed border-[#E6E5E2]/60 flex items-center justify-center gap-1 uppercase">
                        <Coffee className="w-3 h-3 text-[#7A8E9B]/30" />
                        <span className="text-[1.125rem] text-[#7A8E9B]/30">{ts.time}</span>
                      </div>
                    );
                  }

                  return (
                    <div key={ts.time} className="slot-enter relative">
                      <button
                        onClick={() => {
                          if (hasAppt) return;
                          if (isAvailable) {
                            setQuickForm({ open: !isQuickOpen, time: ts.time, endTime: ts.endTime });
                          } else {
                            toggleSlot(ts.time, ts.endTime);
                          }
                        }}
                        className={`w-full rounded-lg px-2.5 py-2.5 text-left transition-all relative overflow-hidden ${
                          hasAppt
                            ? "bg-[#003E51] border border-[#003E51] cursor-default"
                            : isAvailable
                            ? isQuickOpen
                              ? "bg-emerald-100 border-2 border-emerald-400 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]"
                              : "bg-emerald-50 border border-emerald-200/60 hover:border-emerald-300 hover:shadow-[0_2px_8px_rgba(16,185,129,0.1)] cursor-pointer"
                            : "bg-white border border-[#E6E5E2] hover:border-[#003E51]/20 hover:bg-[#003E51]/[0.02] cursor-pointer"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-[1.125rem] font-semibold ${hasAppt ? "text-white" : isAvailable ? "text-emerald-700" : "text-[#7A8E9B]"}`}>{ts.time}</span>
                          {hasAppt ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-white/60" />
                          ) : isAvailable ? (
                            <div className="w-4 h-4 rounded-full bg-emerald-400/20 flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 text-emerald-600" />
                            </div>
                          ) : (
                            <Plus className="w-3 h-3 text-[#7A8E9B]/30" />
                          )}
                        </div>
                        {hasAppt && (() => {
                          const appt = dayAppts.find((a) => a.start_time.slice(0, 5) === ts.time && a.status !== "cancelled");
                          return (
                            <div className="mt-1">
                              <span className="text-[1.125rem] text-white/90 font-medium block truncate">{appt?.patient_name}</span>
                              <div className="flex items-center gap-1 mt-0.5">
                                <span className="inline-block px-1.5 py-0.5 rounded text-[1.125rem] font-medium bg-white/10 text-white/70">Indisponível</span>
                                <span className={`inline-block px-1.5 py-0.5 rounded text-[1.125rem] font-medium ${
                                  appt?.status === "confirmed" ? "bg-emerald-500/30 text-emerald-100" :
                                  appt?.status === "pending" ? "bg-amber-500/30 text-amber-100" :
                                  appt?.status === "completed" ? "bg-white/20 text-white/70" :
                                  "bg-red-500/30 text-red-200"
                                }`}>{STATUS[appt?.status || "pending"]?.label}</span>
                              </div>
                            </div>
                          );
                        })()}
                        {isAvailable && !hasAppt && (
                          <span className="text-[1.125rem] text-emerald-500/70 flex items-center gap-0.5 mt-0.5">
                            {selBH.mode === "presencial" || selBH.mode === "ambos" ? <Building2 className="w-2 h-2" /> : null}
                            {selBH.mode === "video" || selBH.mode === "ambos" ? <Video className="w-2 h-2" /> : null}
                            <span>Disponível</span>
                          </span>
                        )}
                        {!isAvailable && !hasAppt && (
                          <span className="text-[1.125rem] text-[#7A8E9B]/25 mt-0.5 block">Clique para liberar</span>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick book inline form */}
          {quickForm.open && (
            <div className="agenda-pop bg-white rounded-2xl border-2 border-[#003E51]/10 p-4 shadow-[0_8px_30px_rgba(0,62,81,0.08)]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#003E51] flex items-center justify-center"><Plus className="w-3.5 h-3.5 text-white" /></div>
                  <div>
                    <p className="text-[1.125rem] font-medium text-[#003E51]">Agendar {quickForm.time} — {quickForm.endTime}</p>
                    <p className="text-[1.125rem] text-[#7A8E9B] capitalize">{formatDateLong(selectedDate)}</p>
                  </div>
                </div>
                <button onClick={() => setQuickForm({ open: false, time: "", endTime: "" })} className="w-6 h-6 rounded-md hover:bg-[#f5f5f0] flex items-center justify-center"><X className="w-3.5 h-3.5 text-[#7A8E9B]" /></button>
              </div>

              <div className="space-y-2.5">
                <input type="text" placeholder="Nome do paciente" value={apptForm.patient_name} onChange={(e) => setApptForm({ ...apptForm, patient_name: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-[#E6E5E2] text-[1.125rem] text-[#003E51] focus:outline-none focus:border-[#00565B] placeholder:text-[#7A8E9B]/40" autoFocus />
                <div className="grid grid-cols-2 gap-2">
                  <input type="tel" placeholder="Telefone" value={apptForm.patient_phone} onChange={(e) => setApptForm({ ...apptForm, patient_phone: e.target.value })} className="px-3 py-2 rounded-xl border border-[#E6E5E2] text-[1.125rem] text-[#003E51] focus:outline-none focus:border-[#00565B] placeholder:text-[#7A8E9B]/40" />
                  <input type="email" placeholder="Email (opcional)" value={apptForm.patient_email} onChange={(e) => setApptForm({ ...apptForm, patient_email: e.target.value })} className="px-3 py-2 rounded-xl border border-[#E6E5E2] text-[1.125rem] text-[#003E51] focus:outline-none focus:border-[#00565B] placeholder:text-[#7A8E9B]/40" />
                </div>

                {/* Mode selector */}
                <div className="flex items-center gap-1.5">
                  {[
                    { v: "presencial", label: "Presencial", Icon: Building2 },
                    { v: "video", label: "Vídeo", Icon: Video },
                    { v: "ambos", label: "Ambos", Icon: Layers },
                  ].map((opt) => (
                    <button key={opt.v} onClick={() => setApptForm({ ...apptForm, mode: opt.v })} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[1.125rem] font-medium border transition-all ${apptForm.mode === opt.v ? "bg-[#003E51] text-white border-[#003E51]" : "border-[#E6E5E2] text-[#7A8E9B] hover:bg-[#f5f5f0]"}`}>
                      <opt.Icon className="w-3 h-3" />{opt.label}
                    </button>
                  ))}
                </div>

                <button onClick={quickBook} disabled={!apptForm.patient_name || !apptForm.patient_phone || booking} className="w-full py-2.5 rounded-xl bg-[#003E51] text-white text-[1.125rem] font-medium hover:bg-[#00565B] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {booking ? (
                    <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Agendando...</>
                  ) : (
                    <><Check className="w-3.5 h-3.5" /> Confirmar Agendamento</>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Month events sidebar */}
          {monthEvents.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#E6E5E2] p-3">
              <p className="text-[1.125rem] uppercase tracking-[1px] text-[#7A8E9B] font-medium mb-2">{MONTHS[month]}</p>
              <div className="space-y-1.5 max-h-[150px] overflow-y-auto">
                {monthEvents.slice(0, 8).map((ev, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    {ev.type === "feriado" ? <Flag className="w-2.5 h-2.5 text-red-400 shrink-0" /> : <Activity className="w-2.5 h-2.5 text-violet-400 shrink-0" />}
                    <span className="text-[1.125rem] text-[#7A8E9B] truncate">{ev.fullDate.split("-")[2]}/{ev.fullDate.split("-")[1]} — {ev.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
