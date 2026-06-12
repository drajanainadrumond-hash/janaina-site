import { getSupabaseAdmin } from "@/lib/supabase";
import type { FaqItem } from "@/lib/schema";
import { HOME_FAQS, HOME_FAQ_QUESTIONS } from "@/lib/home-faqs";

export type PublicFaq = {
  id: string;
  category: string;
  question: string;
  answer: string;
  display_order: number;
  published: boolean;
};

export type FaqCategoryGroup = {
  title: string;
  items: { question: string; answer: string }[];
};

/** Fallback quando Supabase está vazio ou indisponível — espelha o conteúdo editorial original. */
const STATIC_FAQ_CATEGORIES: FaqCategoryGroup[] = [
  {
    title: "Consulta e Agendamento",
    items: [
      {
        question: "Quais condições a Dra. Janaína trata?",
        answer:
          "Atendo todas as condições ortopédicas gerais (ombro, joelho, quadril, coluna) com subespecialidade em cirurgia da mão e punho — incluindo síndrome do túnel do carpo, dedo em gatilho, rizartrose, fraturas de punho e escafóide, cisto sinovial e tendinite de De Quervain.",
      },
      {
        question: "Como funciona a primeira consulta?",
        answer:
          "Na primeira consulta faço uma avaliação completa: escuto sua história, examino a região afetada e analiso exames que você já tenha. Se necessário, solicito exames complementares. Ao final, explico o diagnóstico e as opções de tratamento de forma clara.",
      },
      {
        question: "Preciso de encaminhamento para consultar?",
        answer:
          "Não. Você pode agendar diretamente comigo, sem necessidade de encaminhamento, tanto para consultas particulares quanto por convênio.",
      },
      {
        question: "Quais exames devo levar na consulta?",
        answer:
          "Traga todos os exames que já tenha: raio-X, ressonância magnética, ultrassom, exames de sangue recentes e lista de medicamentos em uso. Isso agiliza o diagnóstico e evita exames desnecessários.",
      },
      {
        question: "Qual o endereço do consultório?",
        answer:
          "O consultório fica em Belo Horizonte, MG. Entre em contato pelo WhatsApp ou telefone para obter o endereço completo e informações sobre estacionamento.",
      },
      {
        question: "Quanto tempo dura uma consulta?",
        answer:
          "A primeira consulta costuma durar entre 30 e 45 minutos, pois faço uma avaliação completa. Retornos são mais rápidos, entre 15 e 20 minutos, dependendo da complexidade do caso.",
      },
    ],
  },
  {
    title: "Condições da Mão e Punho",
    items: [
      {
        question: "O que é o túnel do carpo?",
        answer:
          "A síndrome do túnel do carpo é a compressão do nervo mediano no punho. Causa dormência nos dedos (principalmente à noite), formigamento, perda de força e dor. É muito comum e pode ser tratada de forma conservadora ou cirúrgica, dependendo da gravidade.",
      },
      {
        question: "Síndrome do túnel do carpo tem cura?",
        answer:
          "Na maioria dos casos, o tratamento adequado permite resolução ou melhora significativa dos sintomas. Nos casos leves, o uso de órtese noturna e fisioterapia podem trazer alívio. Nos casos moderados a graves, a cirurgia de liberação do túnel do carpo tem taxa de sucesso superior a 90% segundo a literatura médica. Resultados individuais podem variar.",
      },
      {
        question: "O que é dedo em gatilho?",
        answer:
          "É uma condição em que o dedo trava ao dobrar, causada pela inflamação da polia A1 na base do dedo. É mais comum em mulheres, diabéticos e pessoas que fazem atividades repetitivas com as mãos.",
      },
      {
        question: "Meu dedo trava ao dobrar. É grave?",
        answer:
          "O dedo em gatilho não é grave, mas tende a piorar sem tratamento. Nos estágios iniciais, infiltração com corticoide tem bons resultados na literatura (67-90% dos casos). Quando há travamento persistente, a cirurgia é um procedimento rápido e bem estabelecido, com alta taxa de sucesso. Cada caso é avaliado individualmente.",
      },
      {
        question: "O que é rizartrose?",
        answer:
          "Rizartrose é a artrose na base do polegar. Causa dor ao abrir garrafas, girar chaves e segurar objetos. Afeta principalmente mulheres após os 40 anos. O tratamento vai de órtese e fisioterapia até cirurgia nos casos avançados.",
      },
      {
        question: "Formigamento na mão de noite é normal?",
        answer:
          "Não. Formigamento noturno recorrente — especialmente no polegar, indicador e médio — é o sintoma mais clássico da síndrome do túnel do carpo. Se acontece mais de 3 vezes por semana ou está piorando, procure avaliação.",
      },
    ],
  },
  {
    title: "Cirurgias e Procedimentos",
    items: [
      {
        question: "A Dra. Janaína realiza cirurgias?",
        answer:
          "Sim. Tenho formação em cirurgia da mão e punho, com pós-graduação pela Faculdade Ciências Médicas de Minas Gerais (FCMMG). Realizo desde procedimentos ambulatoriais simples, como liberação de dedo em gatilho (20 min com anestesia local), até cirurgias mais complexas como descompressão do túnel do carpo e fraturas.",
      },
      {
        question: "A cirurgia de túnel do carpo é perigosa?",
        answer:
          "Não. É um procedimento seguro, bem estabelecido e com alta taxa de sucesso (acima de 90%). Pode ser feita com anestesia local ou regional, dura de 15 a 30 minutos e o paciente vai para casa no mesmo dia.",
      },
      {
        question: "Posso tratar sem cirurgia?",
        answer:
          "Sempre que possível, priorizo o tratamento conservador: fisioterapia, órteses, anti-inflamatórios e infiltrações. A cirurgia é indicada quando o tratamento conservador não trouxe melhora adequada ou quando há comprometimento grave.",
      },
      {
        question: "A cirurgia de mão pelo plano de saúde é possível?",
        answer:
          "Sim. A maioria dos procedimentos de cirurgia da mão é coberta pelos planos de saúde, incluindo túnel do carpo, dedo em gatilho e fraturas. Consulte seu convênio para confirmar a cobertura.",
      },
    ],
  },
  {
    title: "Recuperação",
    items: [
      {
        question: "Quanto tempo dura a recuperação de uma cirurgia de mão?",
        answer:
          "Depende do procedimento. Cirurgias simples como dedo em gatilho permitem retorno às atividades leves em poucos dias. Cirurgias mais complexas como túnel do carpo podem levar 2-4 semanas para recuperação funcional. Cada caso é avaliado individualmente.",
      },
      {
        question: "Quanto tempo fico de gesso no punho?",
        answer:
          "Depende do tipo de fratura. Fraturas simples do rádio distal levam 4-6 semanas de imobilização. Fraturas de escafoide podem exigir 8-12 semanas. Quando a fixação é cirúrgica, o tempo de gesso é geralmente menor.",
      },
      {
        question: "Posso dirigir após uma cirurgia de mão?",
        answer:
          "Geralmente o retorno à direção leva de 2 a 4 semanas após cirurgias simples (dedo em gatilho, túnel do carpo). Fraturas e procedimentos mais complexos podem exigir mais tempo. Oriento individualmente cada paciente.",
      },
      {
        question: "Preciso de fisioterapia após a cirurgia?",
        answer:
          "Na maioria das cirurgias da mão, a reabilitação é parte fundamental do resultado. Dependendo do procedimento, a fisioterapia pode começar dias após a cirurgia para evitar rigidez e recuperar a função o mais rápido possível.",
      },
    ],
  },
  {
    title: "Convênios e Valores",
    items: [
      {
        question: "Quais convênios a Dra. Janaína atende?",
        answer:
          "Atendo consultas particulares e por convênios. Entre em contato pelo WhatsApp para verificar se seu plano de saúde é aceito e obter informações sobre disponibilidade de agenda.",
      },
      {
        question: "Quanto custa uma consulta particular?",
        answer:
          "O valor da consulta particular é informado no momento do agendamento. Entre em contato pelo WhatsApp para obter informações atualizadas sobre valores e formas de pagamento.",
      },
      {
        question: "Atende urgências e emergências?",
        answer:
          "Meu consultório é voltado para atendimento eletivo (consultas agendadas). Em caso de emergência ortopédica (fratura exposta, luxação, lesão grave), procure o pronto-socorro mais próximo. Após o atendimento inicial, posso acompanhar seu caso no consultório.",
      },
    ],
  },
];

function buildStaticFaqs(): PublicFaq[] {
  let order = 0;
  return STATIC_FAQ_CATEGORIES.flatMap((category) =>
    category.items.map((item) => ({
      id: `static-${order}`,
      category: category.title,
      question: item.question,
      answer: item.answer,
      display_order: order++,
      published: true,
    }))
  );
}

const STATIC_FAQS = buildStaticFaqs();

/** FAQs publicados — Supabase (admin) ou fallback estático. */
export async function getPublishedFaqs(): Promise<PublicFaq[]> {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("faqs")
        .select("id, category, question, answer, display_order, published")
        .eq("published", true)
        .order("category")
        .order("display_order");

      if (!error && data && data.length > 0) return data;
    } catch {
      // Supabase indisponível — fallback
    }
  }

  return STATIC_FAQS;
}

export function groupFaqsByCategory(faqs: PublicFaq[]): FaqCategoryGroup[] {
  const groups = new Map<string, FaqCategoryGroup>();
  const order: string[] = [];

  for (const faq of faqs) {
    if (!groups.has(faq.category)) {
      groups.set(faq.category, { title: faq.category, items: [] });
      order.push(faq.category);
    }
    groups.get(faq.category)!.items.push({
      question: faq.question,
      answer: faq.answer,
    });
  }

  return order.map((title) => groups.get(title)!);
}

export function toFaqSchemaItems(faqs: PublicFaq[]): FaqItem[] {
  return faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));
}

/** Curadoria da home — mesmas perguntas, respostas vindas do admin quando existirem. */
export async function getHomeFaqs(): Promise<FaqItem[]> {
  const published = await getPublishedFaqs();

  return HOME_FAQ_QUESTIONS.map((question) => {
    const fromSource = published.find((f) => f.question === question);
    if (fromSource) {
      return { question: fromSource.question, answer: fromSource.answer };
    }
    return HOME_FAQS.find((f) => f.question === question)!;
  });
}
