"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Lead = {
  id: string;
  name: string;
  whatsapp: string;
  convenio: string;
  queixa: string;
  created_at: string;
};

export function LeadsManager() {
  const supabase = createClient();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchLeads() {
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLeads(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchLeads();
  }, [supabase]);

  if (!supabase) {
    return (
      <p className="text-[1.125rem] text-[#7A8E9B]">Supabase não configurado.</p>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[1.1rem] font-medium text-[#003E51]">Leads / Contatos</h2>
        <span className="text-[1.125rem] text-[#7A8E9B]">{leads.length} contatos</span>
      </div>

      {loading ? (
        <p className="text-[1.125rem] text-[#7A8E9B]">Carregando...</p>
      ) : leads.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-[#E6E5E2]">
          <p className="text-[1.125rem] text-[#7A8E9B]">Nenhum contato recebido ainda.</p>
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
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-[1.125rem] text-[#7A8E9B]">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
