"use client";

import { useEffect, useState } from "react";
import { adminList, adminCreate, adminUpdate, adminDelete } from "@/utils/admin-api";

type Contact = {
  id: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  tags: string[];
  created_at: string;
};

export function ContactsManager() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Contact | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [search, setSearch] = useState("");

  async function fetchContacts() {
    setLoading(true);
    try {
      setContacts(await adminList<Contact>("contacts"));
    } catch {
      setContacts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchContacts(); }, []);

  function handleNew() {
    setIsNew(true);
    setEditing({
      id: "", name: "", phone: "", email: "", notes: "", tags: [],
      created_at: new Date().toISOString(),
    });
  }

  async function handleSave(c: Contact) {
    const payload = { name: c.name, phone: c.phone, email: c.email, notes: c.notes, tags: c.tags };
    try {
      if (isNew) await adminCreate("contacts", payload);
      else await adminUpdate("contacts", c.id, payload);
    } catch (e) { alert("Erro: " + (e as Error).message); return; }
    setEditing(null);
    setIsNew(false);
    fetchContacts();
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir este contato?")) return;
    try { await adminDelete("contacts", id); } catch (e) { alert("Erro: " + (e as Error).message); return; }
    fetchContacts();
  }

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    (c.email && c.email.toLowerCase().includes(search.toLowerCase()))
  );

  if (editing) {
    return (
      <ContactEditor
        contact={editing}
        isNew={isNew}
        onSave={handleSave}
        onCancel={() => { setEditing(null); setIsNew(false); }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[1.1rem] font-medium text-[#003E51]">Contatos</h2>
        <button onClick={handleNew} className="px-4 py-2 rounded-xl bg-[#003E51] text-white text-[1.125rem] uppercase font-medium hover:bg-[#00565B] transition-colors">
          + Novo Contato
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar por nome, telefone ou email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-[#E6E5E2] text-[1.125rem] text-[#003E51] focus:outline-none focus:border-[#00565B] mb-4"
      />

      {loading ? (
        <p className="text-[1.125rem] text-[#5A6B78]">Carregando...</p>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-[#E6E5E2]">
          <p className="text-[1.125rem] text-[#5A6B78]">{search ? "Nenhum resultado." : "Nenhum contato ainda."}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((c) => (
            <div key={c.id} className="bg-white rounded-xl p-4 border border-[#E6E5E2] flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-[1.125rem] font-medium text-[#003E51]">{c.name}</h3>
                <div className="flex flex-wrap items-center gap-3 mt-1 text-[1.125rem] text-[#5A6B78]">
                  <a href={`https://wa.me/55${c.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">{c.phone}</a>
                  {c.email && <span>{c.email}</span>}
                  {c.tags.length > 0 && c.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full bg-[#003E51]/[0.06] text-[#003E51] uppercase text-[1.125rem]">{t}</span>
                  ))}
                </div>
                {c.notes && <p className="mt-1 text-[1.125rem] text-[#5A6B78] truncate">{c.notes}</p>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => { setEditing(c); setIsNew(false); }} className="px-3 py-1.5 rounded-lg text-[1.125rem] uppercase bg-[#f5f5f0] text-[#003E51] hover:bg-[#E6E5E2] transition-colors">Editar</button>
                <button onClick={() => handleDelete(c.id)} className="px-3 py-1.5 rounded-lg text-[1.125rem] uppercase text-destructive hover:bg-red-50 transition-colors">Excluir</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-[1.125rem] text-[#5A6B78] mt-4">{filtered.length} contato{filtered.length !== 1 ? "s" : ""}</p>
    </div>
  );
}

function ContactEditor({ contact, isNew, onSave, onCancel }: { contact: Contact; isNew: boolean; onSave: (c: Contact) => void; onCancel: () => void }) {
  const [form, setForm] = useState(contact);
  const [tagInput, setTagInput] = useState("");

  function update<K extends keyof Contact>(key: K, value: Contact[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addTag() {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      update("tags", [...form.tags, tag]);
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    update("tags", form.tags.filter((t) => t !== tag));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[1.1rem] font-medium text-[#003E51]">{isNew ? "Novo Contato" : "Editar Contato"}</h2>
        <button onClick={onCancel} className="text-[1.125rem] text-[#5A6B78] hover:text-[#003E51]">Voltar</button>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-[#E6E5E2] space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[1.125rem] uppercase tracking-[1px] text-[#5A6B78] mb-1.5">Nome</label>
            <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-[#E6E5E2] text-[1.125rem] text-[#003E51] focus:outline-none focus:border-[#00565B]" />
          </div>
          <div>
            <label className="block text-[1.125rem] uppercase tracking-[1px] text-[#5A6B78] mb-1.5">Telefone</label>
            <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-[#E6E5E2] text-[1.125rem] text-[#003E51] focus:outline-none focus:border-[#00565B]" placeholder="(31) 99999-9999" />
          </div>
        </div>

        <div>
          <label className="block text-[1.125rem] uppercase tracking-[1px] text-[#5A6B78] mb-1.5">Email</label>
          <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-[#E6E5E2] text-[1.125rem] text-[#003E51] focus:outline-none focus:border-[#00565B]" />
        </div>

        <div>
          <label className="block text-[1.125rem] uppercase tracking-[1px] text-[#5A6B78] mb-1.5">Notas</label>
          <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-[#E6E5E2] text-[1.125rem] text-[#003E51] focus:outline-none focus:border-[#00565B] resize-none" />
        </div>

        <div>
          <label className="block text-[1.125rem] uppercase tracking-[1px] text-[#5A6B78] mb-1.5">Tags</label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {form.tags.map((t) => (
              <span key={t} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#003E51]/[0.06] text-[#003E51] uppercase text-[1.125rem]">
                {t}
                <button onClick={() => removeTag(t)} className="text-[#003E51]/40 hover:text-destructive ml-0.5">&times;</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="Ex: paciente, indicação" className="flex-1 px-4 py-2 rounded-xl border border-[#E6E5E2] text-[1.125rem] text-[#003E51] focus:outline-none focus:border-[#00565B]" />
            <button type="button" onClick={addTag} className="px-4 py-2 rounded-xl bg-[#f5f5f0] text-[1.125rem] uppercase text-[#003E51] hover:bg-[#E6E5E2] transition-colors">Adicionar</button>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button onClick={() => onSave(form)} className="px-6 py-2.5 rounded-xl bg-[#003E51] text-white text-[1.125rem] uppercase font-medium hover:bg-[#00565B] transition-colors">Salvar</button>
          <button onClick={onCancel} className="px-6 py-2.5 rounded-xl text-[1.125rem] text-[#5A6B78] hover:text-[#003E51] transition-colors">Cancelar</button>
        </div>
      </div>
    </div>
  );
}
