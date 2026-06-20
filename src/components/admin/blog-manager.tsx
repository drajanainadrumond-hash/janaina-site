"use client";

import { useEffect, useState } from "react";
import { adminList, adminCreate, adminUpdate, adminDelete } from "@/utils/admin-api";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  published: boolean;
  created_at: string;
};

const CATEGORIES = [
  "Mão e Punho",
  "Ombro",
  "Joelho",
  "Coluna",
  "Quadril",
  "Ortopedia Geral",
  "Saúde e Prevenção",
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function BlogManager() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Post | null>(null);
  const [isNew, setIsNew] = useState(false);

  async function fetchPosts() {
    setLoading(true);
    try {
      setPosts(await adminList<Post>("blog_posts"));
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  function handleNew() {
    setIsNew(true);
    setEditing({
      id: "",
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: CATEGORIES[0],
      published: false,
      created_at: new Date().toISOString(),
    });
  }

  async function handleSave(post: Post) {
    const payload = {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      published: post.published,
    };
    try {
      if (isNew) await adminCreate("blog_posts", payload);
      else await adminUpdate("blog_posts", post.id, payload);
    } catch (e) {
      alert("Erro ao salvar: " + (e as Error).message);
      return;
    }
    setEditing(null);
    setIsNew(false);
    fetchPosts();
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este post?")) return;
    try {
      await adminDelete("blog_posts", id);
    } catch (e) {
      alert("Erro ao excluir: " + (e as Error).message);
      return;
    }
    fetchPosts();
  }

  if (editing) {
    return (
      <PostEditor
        post={editing}
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
        <h2 className="text-[1.1rem] font-medium text-[#003E51]">Posts do Blog</h2>
        <button
          onClick={handleNew}
          className="px-4 py-2 rounded-xl bg-[#003E51] text-white text-[1.125rem] uppercase font-medium hover:bg-[#00565B] transition-colors"
        >
          + Novo Post
        </button>
      </div>

      {loading ? (
        <p className="text-[1.125rem] text-[#5A6B78]">Carregando...</p>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-[#E6E5E2]">
          <p className="text-[1.125rem] text-[#5A6B78]">Nenhum post ainda.</p>
          <button onClick={handleNew} className="mt-3 text-[1.125rem] text-[#00565B] underline">
            Criar primeiro post
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl p-4 border border-[#E6E5E2] flex items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      post.published ? "bg-green-400" : "bg-amber-400"
                    }`}
                  />
                  <h3 className="text-[1.125rem] font-medium text-[#003E51] truncate">
                    {post.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-[1.125rem] text-[#5A6B78]">
                  <span>{post.category}</span>
                  <span>
                    {new Date(post.created_at).toLocaleDateString("pt-BR")}
                  </span>
                  <span>{post.published ? "Publicado" : "Rascunho"}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setEditing(post);
                    setIsNew(false);
                  }}
                  className="px-3 py-1.5 rounded-lg text-[1.125rem] uppercase bg-[#f5f5f0] text-[#003E51] hover:bg-[#E6E5E2] transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
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

function PostEditor({
  post,
  isNew,
  onSave,
  onCancel,
}: {
  post: Post;
  isNew: boolean;
  onSave: (post: Post) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(post);

  function update<K extends keyof Post>(key: K, value: Post[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && isNew) {
        next.slug = slugify(value as string);
      }
      return next;
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[1.1rem] font-medium text-[#003E51]">
          {isNew ? "Novo Post" : "Editar Post"}
        </h2>
        <button onClick={onCancel} className="text-[1.125rem] text-[#5A6B78] hover:text-[#003E51]">
          Voltar
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-[#E6E5E2] space-y-5">
        <div>
          <label className="block text-[1.125rem] uppercase tracking-[1px] text-[#5A6B78] mb-1.5">
            Título
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-[#E6E5E2] text-[1.125rem] text-[#003E51] focus:outline-none focus:border-[#00565B]"
          />
        </div>

        <div>
          <label className="block text-[1.125rem] uppercase tracking-[1px] text-[#5A6B78] mb-1.5">
            Slug (URL)
          </label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-[#E6E5E2] text-[1.125rem] text-[#5A6B78] focus:outline-none focus:border-[#00565B]"
          />
        </div>

        <div>
          <label className="block text-[1.125rem] uppercase tracking-[1px] text-[#5A6B78] mb-1.5">
            Categoria
          </label>
          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-[#E6E5E2] text-[1.125rem] text-[#003E51] focus:outline-none focus:border-[#00565B] bg-white"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[1.125rem] uppercase tracking-[1px] text-[#5A6B78] mb-1.5">
            Resumo
          </label>
          <textarea
            value={form.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
            rows={2}
            className="w-full px-4 py-2.5 rounded-xl border border-[#E6E5E2] text-[1.125rem] text-[#003E51] focus:outline-none focus:border-[#00565B] resize-none"
          />
        </div>

        <div>
          <label className="block text-[1.125rem] uppercase tracking-[1px] text-[#5A6B78] mb-1.5">
            Conteúdo (HTML)
          </label>
          <textarea
            value={form.content}
            onChange={(e) => update("content", e.target.value)}
            rows={16}
            className="w-full px-4 py-2.5 rounded-xl border border-[#E6E5E2] text-[1.125rem] text-[#003E51] focus:outline-none focus:border-[#00565B] resize-y font-mono"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => update("published", e.target.checked)}
              className="w-4 h-4 rounded accent-[#003E51]"
            />
            <span className="text-[1.125rem] text-[#003E51]">Publicado</span>
          </label>
        </div>

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
