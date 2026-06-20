"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Depoimento = {
  id: string;
  name: string;
  condition: string;
  text: string;
  stars: number;
  published: boolean;
  created_at: string;
};

export function DepoimentosManager() {
  const supabase = createClient();
  const [items, setItems] = useState<Depoimento[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Depoimento | null>(null);
  const [isNew, setIsNew] = useState(false);

  async function fetchItems() {
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase
      .from("depoimentos")
      .select("*")
      .order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchItems();
  }, [supabase]);

  if (!supabase) {
    return (
      <p className="text-[1.125rem] text-[#5A6B78]">Supabase não configurado.</p>
    );
  }

  const sb = supabase;

  function handleNew() {
    setIsNew(true);
    setEditing({
      id: "",
      name: "",
      condition: "",
      text: "",
      stars: 5,
      published: false,
      created_at: new Date().toISOString(),
    });
  }

  async function handleSave(item: Depoimento) {
    if (isNew) {
      const { error } = await sb.from("depoimentos").insert({
        name: item.name,
        condition: item.condition,
        text: item.text,
        stars: item.stars,
        published: item.published,
      });
      if (error) {
        alert("Erro: " + error.message);
        return;
      }
    } else {
      const { error } = await sb
        .from("depoimentos")
        .update({
          name: item.name,
          condition: item.condition,
          text: item.text,
          stars: item.stars,
          published: item.published,
        })
        .eq("id", item.id);
      if (error) {
        alert("Erro: " + error.message);
        return;
      }
    }
    setEditing(null);
    setIsNew(false);
    fetchItems();
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir este depoimento?")) return;
    await sb.from("depoimentos").delete().eq("id", id);
    fetchItems();
  }

  if (editing) {
    return (
      <DepoimentoEditor
        item={editing}
        isNew={isNew}
        onSave={handleSave}
        onCancel={() => {
          setEditing(null);
          setIsNew(false);
        }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[1.1rem] font-medium text-[#003E51]">Depoimentos</h2>
        <button
          onClick={handleNew}
          className="px-4 py-2 rounded-xl bg-[#003E51] text-white text-[1.125rem] uppercase font-medium hover:bg-[#00565B] transition-colors"
        >
          + Novo Depoimento
        </button>
      </div>

      {loading ? (
        <p className="text-[1.125rem] text-[#5A6B78]">Carregando...</p>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-[#E6E5E2]">
          <p className="text-[1.125rem] text-[#5A6B78]">Nenhum depoimento ainda.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-4 border border-[#E6E5E2] flex items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.published ? "bg-green-400" : "bg-amber-400"
                    }`}
                  />
                  <h3 className="text-[1.125rem] font-medium text-[#003E51]">{item.name}</h3>
                  <span className="text-[1.125rem] text-[#5A6B78]">— {item.condition}</span>
                </div>
                <p className="text-[1.125rem] text-[#4A5E6B] line-clamp-2">{item.text}</p>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <span key={i} className="text-amber-400 text-[1.125rem]">&#9733;</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setEditing(item);
                    setIsNew(false);
                  }}
                  className="px-3 py-1.5 rounded-lg text-[1.125rem] uppercase bg-[#f5f5f0] text-[#003E51] hover:bg-[#E6E5E2] transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1.5 rounded-lg text-[1.125rem] uppercase text-destructive hover:bg-red-50 transition-colors"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DepoimentoEditor({
  item,
  isNew,
  onSave,
  onCancel,
}: {
  item: Depoimento;
  isNew: boolean;
  onSave: (item: Depoimento) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(item);

  function update<K extends keyof Depoimento>(key: K, value: Depoimento[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[1.1rem] font-medium text-[#003E51]">
          {isNew ? "Novo Depoimento" : "Editar Depoimento"}
        </h2>
        <button onClick={onCancel} className="text-[1.125rem] text-[#5A6B78] hover:text-[#003E51]">
          Voltar
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-[#E6E5E2] space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[1.125rem] uppercase tracking-[1px] text-[#5A6B78] mb-1.5">
              Nome do Paciente
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E6E5E2] text-[1.125rem] text-[#003E51] focus:outline-none focus:border-[#00565B]"
            />
          </div>
          <div>
            <label className="block text-[1.125rem] uppercase tracking-[1px] text-[#5A6B78] mb-1.5">
              Condição Tratada
            </label>
            <input
              type="text"
              value={form.condition}
              onChange={(e) => update("condition", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E6E5E2] text-[1.125rem] text-[#003E51] focus:outline-none focus:border-[#00565B]"
              placeholder="Ex: Túnel do Carpo"
            />
          </div>
        </div>

        <div>
          <label className="block text-[1.125rem] uppercase tracking-[1px] text-[#5A6B78] mb-1.5">
            Depoimento
          </label>
          <textarea
            value={form.text}
            onChange={(e) => update("text", e.target.value)}
            rows={4}
            className="w-full px-4 py-2.5 rounded-xl border border-[#E6E5E2] text-[1.125rem] text-[#003E51] focus:outline-none focus:border-[#00565B] resize-none"
          />
        </div>

        <div>
          <label className="block text-[1.125rem] uppercase tracking-[1px] text-[#5A6B78] mb-1.5">
            Estrelas
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => update("stars", n)}
                className={`text-[1.2rem] ${n <= form.stars ? "text-amber-400" : "text-gray-300"}`}
              >
                &#9733;
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => update("published", e.target.checked)}
            className="w-4 h-4 rounded accent-[#003E51]"
          />
          <span className="text-[1.125rem] text-[#003E51]">Publicado</span>
        </label>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => onSave(form)}
            className="px-6 py-2.5 rounded-xl bg-[#003E51] text-white text-[1.125rem] uppercase font-medium hover:bg-[#00565B] transition-colors"
          >
            Salvar
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-2.5 rounded-xl text-[1.125rem] text-[#5A6B78] hover:text-[#003E51] transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
