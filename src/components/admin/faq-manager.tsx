"use client";

import { useEffect, useState } from "react";
import { adminList, adminCreate, adminUpdate, adminDelete } from "@/utils/admin-api";
import { Plus, ChevronLeft, Trash2, GripVertical, Save } from "lucide-react";

import type { PublicFaq as Faq } from "@/lib/faqs";

export function FaqManager() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Faq | null>(null);
  const [isNew, setIsNew] = useState(false);

  async function fetchFaqs() {
    setLoading(true);
    try {
      setFaqs(await adminList<Faq>("faqs"));
    } catch {
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchFaqs(); }, []);

  function handleNew() {
    setIsNew(true);
    setEditing({
      id: "", category: "Consulta e Agendamento", question: "", answer: "",
      display_order: faqs.length, published: true,
    });
  }

  async function handleSave(faq: Faq) {
    const payload = {
      category: faq.category, question: faq.question, answer: faq.answer,
      display_order: faq.display_order, published: faq.published,
    };
    try {
      if (isNew) await adminCreate("faqs", payload);
      else await adminUpdate("faqs", faq.id, payload);
    } catch (e) { alert("Erro: " + (e as Error).message); return; }
    setEditing(null); setIsNew(false); fetchFaqs();
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir esta pergunta?")) return;
    try { await adminDelete("faqs", id); } catch (e) { alert("Erro: " + (e as Error).message); return; }
    fetchFaqs();
  }

  async function togglePublished(id: string, published: boolean) {
    try { await adminUpdate("faqs", id, { published: !published }); } catch (e) { alert("Erro: " + (e as Error).message); return; }
    fetchFaqs();
  }

  const categories = [...new Set(faqs.map((f) => f.category))];

  if (editing) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => { setEditing(null); setIsNew(false); }} className="w-8 h-8 rounded-lg bg-white border border-[#E6E5E2] flex items-center justify-center hover:bg-[#f5f5f0] transition-colors">
            <ChevronLeft className="w-4 h-4 text-[#003E51]" />
          </button>
          <h2 className="text-[1.1rem] font-medium text-[#003E51]">{isNew ? "Nova Pergunta" : "Editar Pergunta"}</h2>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E6E5E2] space-y-4 max-w-[600px]">
          <div>
            <label className="block text-[1.125rem] uppercase tracking-[1px] text-[#5A6B78] mb-1.5">Categoria</label>
            <input type="text" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-[#E6E5E2] text-[1.125rem] text-[#003E51] focus:outline-none focus:border-[#00565B]" list="faq-categories" />
            <datalist id="faq-categories">
              {categories.map((c) => <option key={c} value={c} />)}
            </datalist>
          </div>
          <div>
            <label className="block text-[1.125rem] uppercase tracking-[1px] text-[#5A6B78] mb-1.5">Pergunta</label>
            <input type="text" value={editing.question} onChange={(e) => setEditing({ ...editing, question: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-[#E6E5E2] text-[1.125rem] text-[#003E51] focus:outline-none focus:border-[#00565B]" />
          </div>
          <div>
            <label className="block text-[1.125rem] uppercase tracking-[1px] text-[#5A6B78] mb-1.5">Resposta</label>
            <textarea value={editing.answer} onChange={(e) => setEditing({ ...editing, answer: e.target.value })} rows={5} className="w-full px-4 py-2.5 rounded-xl border border-[#E6E5E2] text-[1.125rem] text-[#003E51] focus:outline-none focus:border-[#00565B] resize-y" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} className="w-4 h-4 rounded accent-[#003E51]" />
            <span className="text-[1.125rem] text-[#003E51]">Publicada</span>
          </label>
          <div className="flex items-center gap-3 pt-2">
            <button onClick={() => handleSave(editing)} className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#003E51] text-white text-[1.125rem] uppercase font-medium hover:bg-[#00565B] transition-colors"><Save className="w-3.5 h-3.5" /> Salvar</button>
            <button onClick={() => { setEditing(null); setIsNew(false); }} className="px-5 py-2.5 rounded-xl text-[1.125rem] text-[#5A6B78] hover:text-[#003E51] transition-colors">Cancelar</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[1.1rem] font-medium text-[#003E51]">FAQ — Perguntas Frequentes</h2>
        <button onClick={handleNew} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#003E51] text-white text-[1.125rem] uppercase font-medium hover:bg-[#00565B] transition-colors">
          <Plus className="w-3.5 h-3.5" /> Nova Pergunta
        </button>
      </div>

      {loading ? (
        <p className="text-[1.125rem] text-[#5A6B78]">Carregando...</p>
      ) : faqs.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-[#E6E5E2]">
          <p className="text-[1.125rem] text-[#5A6B78] mb-2">Nenhuma pergunta cadastrada no banco.</p>
          <p className="text-[1.125rem] text-[#5A6B78]/60">O site usará as perguntas estáticas como fallback.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {categories.map((cat) => (
            <div key={cat}>
              <h3 className="text-[1.125rem] font-medium text-[#003E51] mb-2 flex items-center gap-2">
                <GripVertical className="w-3 h-3 text-[#5A6B78]" />
                {cat} <span className="text-[1.125rem] text-[#5A6B78] font-normal">({faqs.filter((f) => f.category === cat).length})</span>
              </h3>
              <div className="space-y-1.5">
                {faqs.filter((f) => f.category === cat).map((faq) => (
                  <div key={faq.id} className="bg-white rounded-xl p-3 border border-[#E6E5E2] flex items-center justify-between gap-3 group">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${faq.published ? "bg-emerald-400" : "bg-amber-400"}`} />
                        <p className="text-[1.125rem] text-[#003E51] font-medium truncate">{faq.question}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => togglePublished(faq.id, faq.published)} className={`px-2 py-1 rounded-lg text-[1.125rem] ${faq.published ? "text-amber-600 hover:bg-amber-50" : "text-emerald-600 hover:bg-emerald-50"} transition-colors`}>
                        {faq.published ? "Despublicar" : "Publicar"}
                      </button>
                      <button onClick={() => { setEditing(faq); setIsNew(false); }} className="px-2 py-1 rounded-lg text-[1.125rem] uppercase text-[#003E51] hover:bg-[#f5f5f0] transition-colors">Editar</button>
                      <button onClick={() => handleDelete(faq.id)} className="w-6 h-6 rounded-md hover:bg-red-50 flex items-center justify-center transition-colors"><Trash2 className="w-3 h-3 text-[#5A6B78] hover:text-destructive" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
