/**
 * O texto que o site publica, reunido num lugar só — para as guardas do C22 (G1–G5).
 *
 * POR QUE ELE EXISTE: uma varredura por `grep` nos arquivos não serve de guarda. O
 * repositório está cheio de menções legítimas ao que é proibido — comentários que
 * dizem *nunca escrever "especialista em cirurgia da mão"*, o `llms.txt` que instrui
 * a IA a evitar o termo, "índice único" numa rota de API. Um grep acusa todos eles.
 *
 * Aqui a varredura é sobre o CONTEÚDO, não sobre o arquivo: importamos os módulos e
 * percorremos os valores exportados. Comentário de código não entra; texto que vai
 * para a tela do paciente entra. Cada trecho carrega a origem, para a falha dizer
 * onde está o problema.
 *
 * O banco fica de fora de propósito: as guardas protegem o que está no repositório.
 * Por isso os testes travam o Supabase (`getSupabaseAdmin → null`) e leem o conteúdo
 * estático, que é o que o deploy publica.
 */
import { CONDICAO_DIRECT_ANSWERS } from "@/lib/aeo";
import { AUTHOR_BYLINE, AUTHOR_SHORT } from "@/lib/author";
import { getPosts } from "@/lib/blog";
import { getCondicaoFaqs } from "@/lib/condicoes-faqs";
import { CONDICOES } from "@/lib/condicoes";
import { ESPECIALIDADES } from "@/lib/especialidades";
import { getPublishedFaqs } from "@/lib/faqs";
import { HOME_FAQS } from "@/lib/home-faqs";

export type Trecho = {
  /** Onde o texto mora, para a mensagem de falha ser acionável. */
  origem: string;
  texto: string;
};

/**
 * Chaves que guardam identificador, e não frase: varrer slug e URL só gera ruído
 * (`cirurgia-da-mao-e-punho` é o endereço de uma página real).
 */
const CHAVES_TECNICAS = new Set([
  "slug",
  "href",
  "url",
  "src",
  "id",
  "icon",
  "image",
  "ogImage",
  "created_at",
  "updated_at",
  "area",
]);

function coletar(valor: unknown, origem: string, saida: Trecho[]): void {
  if (typeof valor === "string") {
    if (valor.trim()) saida.push({ origem, texto: valor });
    return;
  }

  if (Array.isArray(valor)) {
    valor.forEach((item, i) => coletar(item, `${origem}[${i}]`, saida));
    return;
  }

  if (valor && typeof valor === "object") {
    for (const [chave, item] of Object.entries(valor)) {
      if (CHAVES_TECNICAS.has(chave)) continue;
      coletar(item, `${origem}.${chave}`, saida);
    }
  }
}

/** Todo o texto publicado a partir do repositório, com a origem de cada trecho. */
export async function coletarConteudoPublicado(): Promise<Trecho[]> {
  const trechos: Trecho[] = [];

  coletar(CONDICOES, "condicoes.ts", trechos);
  coletar(ESPECIALIDADES, "especialidades.ts", trechos);
  coletar(HOME_FAQS, "home-faqs.ts", trechos);
  coletar(CONDICAO_DIRECT_ANSWERS, "aeo.ts", trechos);
  coletar({ AUTHOR_BYLINE, AUTHOR_SHORT }, "author.ts", trechos);
  coletar(await getPublishedFaqs(), "faqs.ts", trechos);
  coletar(await getPosts(), "blog.ts", trechos);

  for (const condicao of CONDICOES) {
    const faqs = getCondicaoFaqs(condicao.slug);
    if (faqs) coletar(faqs, `condicoes-faqs.ts (${condicao.slug})`, trechos);
  }

  return trechos;
}

/** Minúsculas e sem acento — para que um "medica" sem acento não escape da guarda. */
export function semAcento(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

/** Os trechos em que o padrão bate, já formatados para a mensagem de falha. */
export function ocorrencias(trechos: Trecho[], padrao: RegExp): string[] {
  // Sem a flag `g`: com ela, `test` guarda posição entre chamadas e pula trechos.
  const regra = new RegExp(padrao.source, padrao.flags.replace("g", ""));

  return trechos
    .filter((t) => regra.test(t.texto))
    .map((t) => {
      const achado = t.texto.match(regra);
      const pos = achado?.index ?? 0;
      const redor = t.texto.slice(Math.max(0, pos - 60), pos + 90).replace(/\s+/g, " ");
      return `${t.origem}: …${redor}…`;
    });
}
