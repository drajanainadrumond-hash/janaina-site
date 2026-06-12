/** Feriados nacionais, estaduais (MG) e municipais (BH) + sazonalidades ortopédicas */

type DateEvent = {
  date: string; // MM-DD
  label: string;
  type: "feriado" | "ponto-facultativo" | "sazonal";
  scope?: "nacional" | "mg" | "bh";
};

// Feriados fixos
const FIXED_EVENTS: DateEvent[] = [
  // Nacionais
  { date: "01-01", label: "Confraternização Universal", type: "feriado", scope: "nacional" },
  { date: "04-21", label: "Tiradentes", type: "feriado", scope: "nacional" },
  { date: "05-01", label: "Dia do Trabalho", type: "feriado", scope: "nacional" },
  { date: "09-07", label: "Independência do Brasil", type: "feriado", scope: "nacional" },
  { date: "10-12", label: "Nossa Sra. Aparecida", type: "feriado", scope: "nacional" },
  { date: "11-02", label: "Finados", type: "feriado", scope: "nacional" },
  { date: "11-15", label: "Proclamação da República", type: "feriado", scope: "nacional" },
  { date: "12-25", label: "Natal", type: "feriado", scope: "nacional" },

  // Minas Gerais
  { date: "04-21", label: "Data Magna de MG", type: "feriado", scope: "mg" },

  // Belo Horizonte
  { date: "08-15", label: "Assunção de Nossa Senhora", type: "feriado", scope: "bh" },
  { date: "12-08", label: "Imaculada Conceição (BH)", type: "feriado", scope: "bh" },

  // Pontos facultativos comuns
  { date: "12-24", label: "Véspera de Natal", type: "ponto-facultativo" },
  { date: "12-31", label: "Véspera de Ano Novo", type: "ponto-facultativo" },

  // Sazonalidades ortopédicas BH
  { date: "01-15", label: "Pico: lesões esportivas (férias)", type: "sazonal" },
  { date: "02-01", label: "Pico: carnaval — fraturas/entorses", type: "sazonal" },
  { date: "03-01", label: "Retorno pós-férias: dores crônicas", type: "sazonal" },
  { date: "05-15", label: "Frio: agravamento artrose/artrite", type: "sazonal" },
  { date: "06-01", label: "Inverno BH: dores articulares", type: "sazonal" },
  { date: "06-15", label: "Pico: quedas idosos (frio/chuva)", type: "sazonal" },
  { date: "07-01", label: "Férias escolares: lesões infantis", type: "sazonal" },
  { date: "07-15", label: "Pico: cirurgias eletivas (férias)", type: "sazonal" },
  { date: "09-01", label: "Retorno escolar: overuse infantil", type: "sazonal" },
  { date: "10-01", label: "Primavera: retorno ativ. físicas", type: "sazonal" },
  { date: "10-15", label: "Pico: tendinites (retorno esporte)", type: "sazonal" },
  { date: "11-01", label: "Pré-verão: demanda estética/postura", type: "sazonal" },
  { date: "12-01", label: "Pico: acidentes de trânsito (festas)", type: "sazonal" },
];

// Calcula Pascoa (algoritmo de Gauss)
function getEasterDate(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatAsMMDD(date: Date): string {
  return `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

// Feriados moveis baseados na Pascoa
function getMovableHolidays(year: number): DateEvent[] {
  const easter = getEasterDate(year);
  return [
    { date: formatAsMMDD(addDays(easter, -48)), label: "Segunda de Carnaval", type: "ponto-facultativo", scope: "nacional" },
    { date: formatAsMMDD(addDays(easter, -47)), label: "Terça de Carnaval", type: "feriado", scope: "nacional" },
    { date: formatAsMMDD(addDays(easter, -46)), label: "Quarta-feira de Cinzas", type: "ponto-facultativo", scope: "nacional" },
    { date: formatAsMMDD(addDays(easter, -2)), label: "Sexta-feira Santa", type: "feriado", scope: "nacional" },
    { date: formatAsMMDD(easter), label: "Páscoa", type: "feriado", scope: "nacional" },
    { date: formatAsMMDD(addDays(easter, 60)), label: "Corpus Christi", type: "feriado", scope: "nacional" },
  ];
}

export type CalendarEvent = DateEvent & { fullDate: string };

export function getEventsForMonth(year: number, month: number): CalendarEvent[] {
  const mm = String(month + 1).padStart(2, "0");
  const movable = getMovableHolidays(year);
  const all = [...FIXED_EVENTS, ...movable];

  return all
    .filter((e) => e.date.startsWith(mm + "-"))
    .map((e) => ({
      ...e,
      fullDate: `${year}-${e.date}`,
    }));
}

export function getEventForDate(year: number, month: number, day: number): CalendarEvent[] {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  const key = `${mm}-${dd}`;
  const movable = getMovableHolidays(year);
  const all = [...FIXED_EVENTS, ...movable];

  return all
    .filter((e) => e.date === key)
    .map((e) => ({
      ...e,
      fullDate: `${year}-${e.date}`,
    }));
}

/** Horarios comerciais padrao para consultorio medico em BH */
export type DaySchedule = {
  active: boolean;
  status: "disponivel" | "indisponivel";
  mode: "presencial" | "video" | "ambos";
  start: string;
  end: string;
  lunch_start: string;
  lunch_end: string;
};

export type DayKey = "dom" | "seg" | "ter" | "qua" | "qui" | "sex" | "sab";

export type BusinessHours = Record<DayKey, DaySchedule>;

export const DEFAULT_BUSINESS_HOURS: BusinessHours = {
  seg: { active: true, status: "disponivel", mode: "ambos", start: "08:00", end: "18:00", lunch_start: "12:00", lunch_end: "13:00" },
  ter: { active: true, status: "disponivel", mode: "ambos", start: "08:00", end: "18:00", lunch_start: "12:00", lunch_end: "13:00" },
  qua: { active: true, status: "disponivel", mode: "ambos", start: "08:00", end: "18:00", lunch_start: "12:00", lunch_end: "13:00" },
  qui: { active: true, status: "disponivel", mode: "ambos", start: "08:00", end: "18:00", lunch_start: "12:00", lunch_end: "13:00" },
  sex: { active: true, status: "disponivel", mode: "ambos", start: "08:00", end: "17:00", lunch_start: "12:00", lunch_end: "13:00" },
  sab: { active: false, status: "indisponivel", mode: "presencial", start: "08:00", end: "12:00", lunch_start: "", lunch_end: "" },
  dom: { active: false, status: "indisponivel", mode: "presencial", start: "", end: "", lunch_start: "", lunch_end: "" },
};

export const DAY_KEYS: DayKey[] = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];
export const DAY_LABELS: Record<DayKey, string> = {
  dom: "Domingo", seg: "Segunda", ter: "Terça", qua: "Quarta",
  qui: "Quinta", sex: "Sexta", sab: "Sábado",
};
