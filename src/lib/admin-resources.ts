/**
 * Registro de recursos CRUD do painel admin. Toda operação de dados do admin
 * passa por aqui no servidor: a whitelist de campos impede que o cliente grave
 * colunas arbitrárias, e a leitura/escrita usa a service role (sem chave anon
 * no navegador). Recursos com lógica própria (agenda) não ficam aqui.
 */

export type ResourceOrder = { column: string; ascending?: boolean };

export type ResourceConfig = {
  table: string;
  orders: ResourceOrder[];
  /** Campos aceitos no insert (POST). Vazio = create desabilitado. */
  insertFields: string[];
  /** Campos aceitos no update (PATCH). Vazio = update desabilitado. */
  updateFields: string[];
  allowDelete: boolean;
  /** Define updated_at = now() no update. */
  setUpdatedAt?: boolean;
};

export const RESOURCES: Record<string, ResourceConfig> = {
  faqs: {
    table: "faqs",
    orders: [{ column: "category" }, { column: "display_order" }],
    insertFields: ["category", "question", "answer", "display_order", "published"],
    updateFields: ["category", "question", "answer", "display_order", "published"],
    allowDelete: true,
  },
  depoimentos: {
    table: "depoimentos",
    orders: [{ column: "created_at", ascending: false }],
    insertFields: ["name", "condition", "text", "stars", "published"],
    updateFields: ["name", "condition", "text", "stars", "published"],
    allowDelete: true,
  },
  contacts: {
    table: "contacts",
    orders: [{ column: "name", ascending: true }],
    insertFields: ["name", "phone", "email", "notes", "tags"],
    updateFields: ["name", "phone", "email", "notes", "tags"],
    allowDelete: true,
    setUpdatedAt: true,
  },
  blog_posts: {
    table: "blog_posts",
    orders: [{ column: "created_at", ascending: false }],
    insertFields: ["title", "slug", "excerpt", "content", "category", "published"],
    updateFields: ["title", "slug", "excerpt", "content", "category", "published"],
    allowDelete: true,
    setUpdatedAt: true,
  },
  // Somente leitura: capturado pelo formulário público, sem edição no painel.
  leads: {
    table: "leads",
    orders: [{ column: "created_at", ascending: false }],
    insertFields: [],
    updateFields: [],
    allowDelete: false,
  },
};

export function getResource(name: string): ResourceConfig | null {
  return Object.prototype.hasOwnProperty.call(RESOURCES, name) ? RESOURCES[name] : null;
}

/** Retorna só os campos permitidos presentes no corpo da requisição. */
export function pickFields(body: Record<string, unknown>, fields: string[]) {
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    if (Object.prototype.hasOwnProperty.call(body, f)) out[f] = body[f];
  }
  return out;
}
