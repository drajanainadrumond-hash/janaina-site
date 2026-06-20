"use client";

import { useEffect, useState } from "react";
import { adminList } from "@/utils/admin-api";

type Lead = {
  id: string;
  name: string;
  whatsapp: string;
  convenio: string;
  queixa: string;
  created_at: string;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  gclid?: string | null;
};

export function LeadsManager() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[1.1rem] font-medium text-[#003E51]">Leads / Contatos</h2>
        <span className="text-[1.125rem] text-[#5A6B78]">{leads.length} contatos</span>
      </div>

      {loading ? (
        <p className="text-[1.125rem] text-[#5A6B78]">Carregando...</p>
      ) : leads.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-[#E6E5E2]">
          <p className="text-[1.125rem] text-[#5A6B78]">Nenhum contato recebido ainda.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white rounded-xl p-4 border border-[#E6E5E2]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-[1.125rem] font-medium text-[#003E51]">{lead.name}</h3>
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
