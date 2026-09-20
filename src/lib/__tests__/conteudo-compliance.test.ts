/**
 * G3 — terminologia vedada no conteúdo publicado (nota `C22`, roadmap 1.4.3).
 *
 * É a guarda que mais paga: uma varredura que derruba a publicação se alguém
 * escrever "especialista em cirurgia da mão" vale mais que cinquenta testes de tela.
 * Duas famílias de proibição, por motivos diferentes:
 *
 *  1. FATO — o RQE 50592 é de **Ortopedia e Traumatologia**. Mão e punho são
 *     formação (pós-graduação), não título registrado. Chamar-SE "cirurgiã da mão"
 *     ou "especialista em cirurgia da mão" anuncia um título que ela não tem.
 *     Também não se cita o hospital do vínculo antigo nem "fellowship".
 *  2. AUTOPROMOÇÃO — a Res. CFM 2.336/2023 veda superlativo, exclusividade e
 *     promessa de resultado: "melhor ortopedista de BH", "resultado garantido".
 *
 * O que a guarda NÃO faz: proibir as palavras soltas. "Melhora dos sintomas", "cada
 * caso é único" e "a cirurgia da mão dura 30 minutos" são texto clínico correto e
 * aparecem dezenas de vezes. O padrão mira a construção que vira anúncio.
 *
 * E o título só é proibido **quando atribuído a ela** (o nome dela, ou 1ª pessoa, na
 * mesma vizinhança). Explicar ao paciente o que é um cirurgião de mão é informação;
 * dizer que ela é, é o que a norma veda. As menções genéricas que já existem estão
 * travadas mais abaixo, uma a uma: nenhuma nova entra sem alguém decidir.
 *
 * Limite conhecido: sem acento, "cirurgiã" e "cirurgia" viram a mesma palavra. Para
 * não acusar "a cirurgia da mão", o til é exigido nessa regra — as outras toleram a
 * falta de acento.
 */
import {
  coletarConteudoPublicado,
  ocorrencias,
  type Trecho,
} from "@test/helpers/conteudo-publicado";

// O banco fica fora: a guarda protege o conteúdo do repositório, que é o que o
// deploy publica. Sem isto, o teste dependeria de rede e de credencial.
jest.mock("@/lib/supabase", () => ({
  getSupabaseAdmin: () => null,
  getSupabaseServiceRole: () => null,
}));

type Regra = { nome: string; padrao: RegExp; porque: string };

/** Ela, no texto: o nome, o tratamento ou a 1ª pessoa. */
const REFERENCIA_A_ELA =
  /dra\.|janaína|janaina|\bsou\b|\bminha\b|\bmeu\b|\bcomigo\b|\batendo\b|agende com/iu;

const TITULO_QUE_ELA_NAO_TEM: Regra[] = [
  {
    nome: "especialista em cirurgia da mão",
    padrao: /especialista\s+em\s+(cirurgia\s+d[ao]\s+)?m[ãa]os?\b/iu,
    porque: "o RQE 50592 é de Ortopedia; mão e punho são formação, não título",
  },
  {
    nome: "cirurgiã da mão",
    padrao: /cirurgi(ã|ão)\s+d[aeo]s?\s+m[ãa]o/iu,
    porque: "idem — anuncia especialidade registrada que ela não tem",
  },
];

/** Estes não dependem de contexto: não podem aparecer em lugar nenhum. */
const NUNCA: Regra[] = [
  {
    nome: "subespecialidade / subespecialista",
    padrao: /subespecialis(ta|mo)|subespecialidade/iu,
    porque: "termo que o CFM não reconhece para este registro",
  },
  {
    nome: "fellowship",
    padrao: /fellowship/iu,
    porque: "não houve fellowship; a formação é pós-graduação lato sensu",
  },
  {
    nome: "Pardini",
    padrao: /pardini/iu,
    porque: "vínculo antigo — não se anuncia hospital de terceiro",
  },
];

const AUTOPROMOCAO: Regra[] = [
  {
    nome: "superlativo sobre a profissional",
    padrao:
      /melhor(es)?\s+(ortopedista|m[ée]dic[ao]|profissional|cirurgi|especialista|cl[íi]nica|consult[óo]rio)/iu,
    porque: "Res. CFM 2.336/2023 — vedada a autopromoção comparativa",
  },
  {
    nome: "superlativo geográfico",
    padrao: /\b[oa]\s+melhor\s+(de|da|do|em)\s+(bh|belo\s+horizonte|minas)/iu,
    porque: "idem",
  },
  {
    nome: "exclusividade",
    // Sem `\b`: em JavaScript não há fronteira de palavra antes do "Ú" acentuado,
    // e "Único médico" escapava da guarda.
    padrao:
      /(?<!\p{L})[úu]nic[ao]\s+(ortopedista|m[ée]dic[ao]|especialista|profissional|cirurgi[ãa])/iu,
    porque: "vedado anunciar-se como o único que faz algo",
  },
  {
    nome: "promessa de resultado",
    padrao:
      /(resultado|cura|sucesso|al[íi]vio|recupera[çc][ãa]o)\s+garantid|garantia\s+de\s+(resultado|cura|al[íi]vio)|100\s*%\s*(de\s+)?(sucesso|cura|efic)/iu,
    porque: "vedada promessa de resultado em publicidade médica",
  },
  {
    nome: "sem dor garantida",
    padrao: /sem\s+dor\s+garantid|nunca\s+mais\s+sentir[áa]\s+dor/iu,
    porque: "idem",
  },
];

/**
 * As menções GENÉRICAS ao título que já estão no ar, achadas por esta guarda em
 * 20/09/2026. São didáticas ("qual a diferença entre ortopedista e cirurgião de
 * mão?"), não autoatribuição — por isso não derrubam a suíte. Ficam travadas aqui
 * para que nenhuma nova entre despercebida, e estão na fila para a Diana decidir se
 * o texto do post muda.
 */
const MENCOES_GENERICAS_CONHECIDAS = [
  "blog.ts[0].content",
  "blog.ts[0].content",
  "blog.ts[0].faqs[0].answer",
  "blog.ts[0].faqs[0].question",
  "blog.ts[0].faqs[1].question",
];

/** Onde o padrão bate COM o nome dela por perto — o que a norma veda. */
function atribuidoAEla(trechos: Trecho[], padrao: RegExp): string[] {
  const regra = new RegExp(padrao.source, padrao.flags.replace("g", ""));
  const achados: string[] = [];

  for (const trecho of trechos) {
    for (const achado of trecho.texto.matchAll(new RegExp(regra.source, regra.flags + "g"))) {
      const pos = achado.index ?? 0;
      const vizinhanca = trecho.texto.slice(Math.max(0, pos - 150), pos + 150);
      if (REFERENCIA_A_ELA.test(vizinhanca)) {
        achados.push(`${trecho.origem}: …${vizinhanca.replace(/\s+/g, " ")}…`);
      }
    }
  }

  return achados;
}

function semAchados(achados: string[], porque: string) {
  expect(`${porque} · achados:\n${achados.join("\n")}`).toBe(`${porque} · achados:\n`);
}

describe("G3 — terminologia vedada no conteúdo publicado", () => {
  let conteudo: Trecho[];

  beforeAll(async () => {
    conteudo = await coletarConteudoPublicado();
  });

  it("o coletor realmente leu o conteúdo do site", () => {
    // Sem isto, todas as guardas abaixo passariam com a lista vazia.
    expect(conteudo.length).toBeGreaterThan(300);
    expect(conteudo.some((t) => /t[úu]nel do carpo/i.test(t.texto))).toBe(true);
  });

  it.each(TITULO_QUE_ELA_NAO_TEM)(
    "não atribui a ela título que ela não tem: $nome",
    ({ padrao, porque }) => {
      semAchados(atribuidoAEla(conteudo, padrao), porque);
    }
  );

  it.each(NUNCA)("não publica em lugar nenhum: $nome", ({ padrao, porque }) => {
    semAchados(ocorrencias(conteudo, padrao), porque);
  });

  it.each(AUTOPROMOCAO)("não faz autopromoção vedada: $nome", ({ padrao, porque }) => {
    semAchados(ocorrencias(conteudo, padrao), porque);
  });

  it("nenhuma menção genérica NOVA ao título de cirurgião de mão", () => {
    const encontradas = TITULO_QUE_ELA_NAO_TEM.flatMap(({ padrao }) =>
      ocorrencias(conteudo, padrao)
    )
      .map((linha) => linha.split(":")[0])
      .sort();

    expect(encontradas).toEqual(MENCOES_GENERICAS_CONHECIDAS);
  });

  it("diz com todas as letras que o atendimento é particular", () => {
    // D16: só particular. É o 1º motivo de perda no CRM — tem de estar escrito.
    expect(conteudo.some((t) => /exclusivamente particular/i.test(t.texto))).toBe(true);
  });
});

describe("a guarda G3 pega o que promete (inclusive sem acento)", () => {
  const atribuidas = [
    "Dra. Janaína, cirurgiã da mão em Belo Horizonte",
    "Sou especialista em cirurgia da mao e punho",
    "Atendo como especialista em maos",
  ];

  const armadilhas = [
    "A melhor ortopedista de Belo Horizonte",
    "o melhor de BH em ortopedia",
    "Único médico da região com essa técnica",
    "Unica medica da regiao com essa tecnica",
    "Cirurgia com resultado garantido",
    "100% de sucesso nos casos operados",
    "Fellowship em cirurgia da mão",
    "Atendimento no Hospital Pardini",
    "Subespecialidade em mão e punho",
  ];

  const inocentes = [
    "A cirurgia da mão dura em média 30 minutos.",
    "Melhora dos sintomas nas primeiras semanas.",
    "Cada caso clínico é único e requer avaliação presencial.",
    "Pós-graduação lato sensu em Cirurgia da Mão (FCMMG).",
    "Quanto mais cedo o diagnóstico, melhores os resultados.",
    "80-90% dos casos melhoram com tratamento conservador.",
    "Qual a diferença entre ortopedista e cirurgião de mão?",
  ];

  const semContexto = [...NUNCA, ...AUTOPROMOCAO];

  it.each(atribuidas)("derruba quando é atribuído a ela: %s", (frase) => {
    const trecho = [{ origem: "armadilha", texto: frase }];
    const pegou = TITULO_QUE_ELA_NAO_TEM.some(
      (r) => atribuidoAEla(trecho, r.padrao).length > 0
    );
    expect(pegou).toBe(true);
  });

  it.each(armadilhas)("derruba: %s", (frase) => {
    const trecho = [{ origem: "armadilha", texto: frase }];
    expect(semContexto.some((r) => ocorrencias(trecho, r.padrao).length > 0)).toBe(true);
  });

  it.each(inocentes)("deixa passar o texto clínico correto: %s", (frase) => {
    const trecho = [{ origem: "inocente", texto: frase }];
    const pegou = [
      ...semContexto.filter((r) => ocorrencias(trecho, r.padrao).length > 0),
      ...TITULO_QUE_ELA_NAO_TEM.filter((r) => atribuidoAEla(trecho, r.padrao).length > 0),
    ];
    expect(pegou.map((r) => r.nome)).toEqual([]);
  });
});
