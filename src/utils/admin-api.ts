/**
 * Cliente das rotas /api/admin/*. Substitui o acesso direto ao Supabase no
 * navegador: as requisições levam o cookie de sessão (same-origin) e o servidor
 * valida o admin e usa a service role. Nenhuma chave/consulta sai daqui.
 */

async function handle<T>(res: Response): Promise<T> {
  const json = (await res.json().catch(() => ({}))) as { data?: T; error?: string };
  if (!res.ok) throw new Error(json.error || "Erro na requisição");
  return json.data as T;
}

export async function adminList<T>(resource: string): Promise<T[]> {
  const res = await fetch(`/api/admin/${resource}`, { credentials: "same-origin" });
  return (await handle<T[]>(res)) ?? [];
}

export async function adminCreate<T>(resource: string, body: unknown): Promise<T> {
  const res = await fetch(`/api/admin/${resource}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  return handle<T>(res);
}

export async function adminUpdate<T>(resource: string, id: string, body: unknown): Promise<T> {
  const res = await fetch(`/api/admin/${resource}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  return handle<T>(res);
}

export async function adminDelete(resource: string, id: string): Promise<void> {
  const res = await fetch(`/api/admin/${resource}/${id}`, {
    method: "DELETE",
    credentials: "same-origin",
  });
  await handle<unknown>(res);
}

/* ===== Stats do dashboard ===== */
export type AdminStats = {
  appointments: number;
  pendingAppointments: number;
  blogPosts: number;
  leads: number;
  contacts: number;
  depoimentos: number;
  faqs: number;
};

export async function fetchStats(): Promise<AdminStats> {
  const res = await fetch("/api/admin/stats", { credentials: "same-origin" });
  return handle<AdminStats>(res);
}

/* ===== Agenda ===== */
export type AgendaData<TAppt, TSlot, TBH> = {
  appointments: TAppt[];
  slots: TSlot[];
  businessHours: TBH | null;
  googleConnected: boolean;
};

export async function fetchAgenda<TAppt, TSlot, TBH>(
  year: number,
  month: number,
): Promise<AgendaData<TAppt, TSlot, TBH>> {
  const res = await fetch(`/api/admin/agenda?year=${year}&month=${month}`, {
    credentials: "same-origin",
  });
  return handle<AgendaData<TAppt, TSlot, TBH>>(res);
}

export async function agendaAction<T = unknown>(body: Record<string, unknown>): Promise<T> {
  const res = await fetch("/api/admin/agenda", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  return handle<T>(res);
}
