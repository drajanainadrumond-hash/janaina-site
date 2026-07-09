"use client";

import { useEffect, useMemo, useState } from "react";
import { adminList, adminUpdate, adminDelete } from "@/utils/admin-api";

type Lead = {
  id: string;
  name: string;
  whatsapp: string;
  convenio: string;
  queixa: string;
  created_at: string;
  read: boolean;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  gclid?: string | null;
};

type Filter = "all" | "unread" | "read";

export function LeadsManager() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [busy, setBusy] = useState<string | null>(null);

  async function fetchLeads() {
    setLoading(true);
    try {
      setLeads(await adminList<Lead>("leads"));
    } catch {
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeads();
  }, []);

  async function toggleRead(lead: Lead) {
    const next = !lead.read;
    setBusy(lead.id);
    // atualização otimista
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, read: next } : l)));
    try {
      await adminUpdate("leads", lead.id, { read: next });
    } catch (e) {
      // reverte se falhar
      setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, read: !next } : l)));
      alert("Erro ao atualizar: " + (e as Error).message);
    } finally {
      setBusy(null);
    }
  }

  async function handleDelete(lead: Lead) {
    if (!confirm(`Apagar a mensagem de ${lead.name}? Esta ação não pode ser desfeita.`)) return;
    setBusy(lead.id);
    try {
      await adminDelete("leads", lead.id);
      setLeads((prev) => prev.filter((l) => l.id !== lead.id));
    } catch (e) {
      alert("Erro ao apagar: " + (e as Error).message);
    } finally {
      setBusy(null);
    }
  }

  const unreadCount = useMemo(() => leads.filter((l) => !l.read).length, [leads]);
  const readCount = leads.length - unreadCount;

  const filtered = useMemo(() => {
    if (filter === "unread") return leads.filter((l) => !l.read);
    if (filter === "read") return leads.filter((l) => l.read);
    return leads;
  }, [leads, filter]);

  const tabs: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "Todas", count: leads.length },
    { key: "unread", label: "Não lidas", count: unreadCount },
    { key: "read", label: "Lidas", count: readCount },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        <h2 className="text-[1.1rem] font-medium text-[#003E51] flex items-center">
          Leads / Contatos
          {unreadCount > 0 && (
            <span className="ml-2 inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-[#00565B] text-white text-[0.8rem] font-medium">
              {unreadCount}
            </span>
          )}
        </h2>
        <span className="text-[1.125rem] text-[#5A6B78]">{leads.length} no total</span>
      </div>

      {/* Filtro lida / não lida */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={`px-3.5 py-1.5 rounded-full text-[1.125rem] transition-colors ${
              filter === t.key
                ? "bg-[#003E51] text-white"
                : "bg-[#f5f5f0] text-[#5A6B78] hover:bg-[#E6E5E2]"
            }`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-[1.125rem] text-[#5A6B78]">Carregando...</p>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-[#E6E5E2]">
          <p className="text-[1.125rem] text-[#5A6B78]">
            {filter === "unread"
              ? "Nenhuma mensagem não lida."
              : filter === "read"
                ? "Nenhuma mensagem lida."
                : "Nenhum contato recebido ainda."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((lead) => (
            <div
              key={lead.id}
              className={`rounded-xl p-4 border transition-colors ${
                lead.read
                  ? "bg-white border-[#E6E5E2]"
                  : "bg-[#00565B]/[0.04] border-[#00565B]/30"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-[1.125rem] font-medium text-[#003E51] flex items-center gap-2">
                    {!lead.read && (
                      <span
                        className="w-2 h-2 rounded-full bg-[#00565B] shrink-0"
                        aria-label="Não lida"
                        title="Não lida"
                      />
                    )}
                    {lead.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-[1.125rem] text-[#5A6B78]">
                    <a
                      href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      {lead.whatsapp}
                    </a>
                    <span>{lead.convenio}</span>
                    <span>
                      {new Date(lead.created_at).toLocaleDateString("pt-BR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleRead(lead)}
                    disabled={busy === lead.id}
                    className="px-3 py-1.5 rounded-lg text-[1.125rem] uppercase bg-[#f5f5f0] text-[#003E51] hover:bg-[#E6E5E2] transition-colors disabled:opacity-50"
                  >
                    {lead.read ? "Marcar não lida" : "Marcar lida"}
                  </button>
                  <button
                    onClick={() => handleDelete(lead)}
                    disabled={busy === lead.id}
                    className="px-3 py-1.5 rounded-lg text-[1.125rem] uppercase text-destructive hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    Apagar
                  </button>
                </div>
              </div>
              {lead.queixa && (
                <p className="mt-2 text-[1.125rem] uppercase text-[#4A5E6B] bg-[#f5f5f0] rounded-lg px-3 py-2">
                  {lead.queixa}
                </p>
              )}
              {(lead.utm_source || lead.utm_campaign || lead.gclid) && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {lead.utm_source && (
                    <span className="text-[0.95rem] text-[#00565B] bg-[#00565B]/10 rounded-full px-2.5 py-1">
                      {lead.utm_source}
                      {lead.utm_medium ? ` · ${lead.utm_medium}` : ""}
                    </span>
                  )}
                  {lead.utm_campaign && (
                    <span className="text-[0.95rem] text-[#00565B] bg-[#00565B]/10 rounded-full px-2.5 py-1">
                      {lead.utm_campaign}
                    </span>
                  )}
                  {lead.gclid && (
                    <span className="text-[0.95rem] text-white bg-[#00565B] rounded-full px-2.5 py-1">
                      Google Ads
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
