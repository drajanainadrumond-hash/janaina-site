import type { FaqItem } from "@/lib/schema";

/** Condições piloto — Livro-Guia (schema BlogPosting + FAQPage). */
export const PRIORITY_CONDICAO_SLUGS = [
  "sindrome-do-tunel-do-carpo",
  "dedo-em-gatilho",
  "rizartrose",
] as const;

export type PriorityCondicaoSlug = (typeof PRIORITY_CONDICAO_SLUGS)[number];

const CONDICAO_FAQS: Record<PriorityCondicaoSlug, FaqItem[]> = {
  "sindrome-do-tunel-do-carpo": [
    {
      question: "O que é a síndrome do túnel do carpo?",
      answer:
        "É a compressão do nervo mediano no punho, dentro do túnel do carpo. Causa dormência e formigamento nos dedos (muitas vezes à noite), dor no punho e perda de força na mão. É a neuropatia compressiva mais comum do corpo humano.",
    },
    {
      question: "Formigamento na mão de noite é normal?",
      answer:
        "Não. Formigamento noturno recorrente — especialmente no polegar, indicador e médio — é o sintoma mais clássico do túnel do carpo. Se ocorre mais de três vezes por semana ou está piorando, procure avaliação ortopédica.",
    },
    {
      question: "A síndrome do túnel do carpo tem cura?",
      answer:
        "Na maioria dos casos, o tratamento adequado permite resolução ou melhora significativa. Casos leves respondem a órtese noturna e fisioterapia; casos moderados a graves costumam se beneficiar da cirurgia de liberação do ligamento, com taxa de sucesso superior a 90% na literatura. Resultados variam conforme o estágio.",
    },
    {
      question: "Quanto tempo dura a cirurgia de túnel do carpo?",
      answer:
        "Em geral de 15 a 30 minutos, com anestesia local ou regional. O paciente recebe alta no mesmo dia. A recuperação funcional completa pode levar algumas semanas, conforme a gravidade pré-operatória.",
    },
    {
      question: "A cirurgia de túnel do carpo é perigosa?",
      answer:
        "É um procedimento seguro e bem estabelecido, com baixa taxa de complicações graves. Os riscos e benefícios são discutidos na consulta; a indicação cirúrgica segue critérios clínicos e, quando necessário, exames complementares.",
    },
  ],
  "dedo-em-gatilho": [
    {
      question: "O que é dedo em gatilho?",
      answer:
        "É a tenossinovite estenosante: o tendão flexor incha e prende na polia A1, na base do dedo. Causa dor na palma, estalido ao movimentar e travamento ao flexionar. É mais comum em mulheres entre 40 e 60 anos e em diabéticos.",
    },
    {
      question: "Meu dedo trava ao dobrar. É grave?",
      answer:
        "Não é uma emergência, mas tende a piorar sem tratamento. Nos graus iniciais, infiltração e fisioterapia costumam ajudar; com travamento persistente, a cirurgia de liberação da polia é rápida e tem alta taxa de sucesso na literatura.",
    },
    {
      question: "Dedo em gatilho pode melhorar sem cirurgia?",
      answer:
        "Sim, especialmente nos graus I e II: repouso relativo, órtese, anti-inflamatórios, infiltração com corticoide e fisioterapia. Quando o dedo permanece travado ou não responde ao conservador, a cirurgia ambulatorial sob anestesia local é indicada.",
    },
    {
      question: "Quanto tempo dura a cirurgia de dedo em gatilho?",
      answer:
        "Cerca de 15 a 20 minutos, em ambiente cirúrgico, com anestesia local. A alta é no mesmo dia; o retorno a atividades leves costuma ocorrer em poucos dias, conforme orientação individual.",
    },
    {
      question: "Quanto tempo leva a recuperação?",
      answer:
        "Atividades leves em poucos dias; movimentos mais exigentes podem levar 2 a 4 semanas. A fisioterapia pode acelerar a recuperação da amplitude e evitar rigidez, conforme cada caso.",
    },
  ],
  rizartrose: [
    {
      question: "O que é rizartrose?",
      answer:
        "É a artrose da articulação trapézio-metacarpiana, na base do polegar. Provoca dor ao pegar objetos, girar chaves e abrir garrafas. Predomina em mulheres após os 50 anos e tende a progredir lentamente.",
    },
    {
      question: "Como saber se tenho rizartrose?",
      answer:
        "A suspeita surge com dor na base do polegar que piora ao pinçar e torcer. O diagnóstico combina exame clínico (testes de grind e stress) e radiografia. Outras causas de dor no polegar devem ser descartadas na consulta.",
    },
    {
      question: "Rizartrose tem cura?",
      answer:
        "Não há cura da artrose, mas há controle eficaz da dor e da função: órtese de polegar, infiltrações, exercícios e, em casos selecionados, procedimentos cirúrgicos para aliviar sintomas e preservar o uso da mão.",
    },
    {
      question: "Quando a cirurgia de rizartrose é indicada?",
      answer:
        "Quando dor e limitação persistem após tratamento conservador adequado (órtese, medicação, infiltração e reabilitação). A escolha da técnica depende da idade, atividade e grau radiográfico — avaliados individualmente.",
    },
    {
      question: "Posso tratar rizartrose sem cirurgia?",
      answer:
        "Sim, na maioria dos estágios iniciais e moderados: órtese, analgésicos, infiltração, modificação de atividades e fortalecimento. A cirurgia fica reservada para dor incapacitante refratária ao tratamento conservador.",
    },
  ],
};

export function getCondicaoFaqs(slug: string): FaqItem[] | undefined {
  return CONDICAO_FAQS[slug as PriorityCondicaoSlug];
}

export function isPriorityCondicao(slug: string): slug is PriorityCondicaoSlug {
  return PRIORITY_CONDICAO_SLUGS.includes(slug as PriorityCondicaoSlug);
}
