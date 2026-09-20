/**
 * G10 — a limpeza do HTML do blog (nota `C22`).
 *
 * O post que vem do painel é HTML escrito à mão e vai para a tela com
 * `dangerouslySetInnerHTML`. É a porta do XSS armazenado que foi tapada em julho de
 * 2026 com o `sanitize-html`. Esta guarda existe para que a troca de versão da
 * biblioteca — e é isso que o item 1.4.1 faz — não reabra a porta em silêncio.
 *
 * Os posts estáticos não passam por aqui (são conteúdo do desenvolvedor); o que
 * passa é tudo que vem do banco.
 */
import { sanitizePost, type BlogPost } from "@/lib/blog";

function post(content: string): BlogPost {
  return {
    id: "teste",
    slug: "teste",
    title: "Post de teste",
    excerpt: "",
    content,
    category: "Mão e Punho",
    published: true,
    created_at: "2026-09-20",
    updated_at: "2026-09-20",
  };
}

const ATAQUES: [string, string][] = [
  ["script", '<p>Oi</p><script>alert(1)</script>'],
  ["handler inline", '<img src="x" onerror="alert(1)">'],
  ["handler em maiúsculas", '<img src="x" ONERROR="alert(1)">'],
  ["URL javascript:", '<a href="javascript:alert(1)">clique</a>'],
  ["iframe", '<iframe src="https://exemplo.com"></iframe>'],
  ["SVG animado", '<svg><animate onbegin="alert(1)" attributeName="x"></svg>'],
  ["textarea com barra", '<textarea></textarea/><script>alert(1)</script>'],
  ["objeto embutido", '<object data="data:text/html;base64,PHNjcmlwdD4="></object>'],
];

describe("G10 — o HTML do blog é limpo antes de ir para a tela", () => {
  it.each(ATAQUES)("remove %s", (_nome, html) => {
    const limpo = sanitizePost(post(html)).content;

    expect(limpo).not.toMatch(/<script/i);
    expect(limpo).not.toMatch(/on\w+\s*=/i);
    expect(limpo).not.toMatch(/javascript:/i);
    expect(limpo).not.toMatch(/<iframe|<object|<embed|<animate/i);
  });

  it("mantém a formatação editorial que o texto precisa", () => {
    const limpo = sanitizePost(
      post('<h2>Título</h2><p><strong>Negrito</strong> e <a href="/contato">link</a></p><ul><li>item</li></ul>')
    ).content;

    expect(limpo).toContain("<h2>Título</h2>");
    expect(limpo).toContain("<strong>Negrito</strong>");
    expect(limpo).toContain("<li>item</li>");
    expect(limpo).toContain('href="/contato"');
  });

  it("todo link sai com rel seguro", () => {
    const limpo = sanitizePost(
      post('<a href="https://exemplo.com" target="_blank">externo</a>')
    ).content;

    expect(limpo).toContain('rel="noopener noreferrer"');
  });
});
