import type { FaqItem } from "@/lib/schema";

/** Ordem das perguntas na home (respostas vêm de `getHomeFaqs()` / admin). */
export const HOME_FAQ_QUESTIONS = [
  "Quanto tempo dura a cirurgia de túnel do carpo?",
  "A Dra. Janaína atende por convênio?",
  "O que é dedo em gatilho?",
  "Preciso de encaminhamento para agendar?",
  "A teleconsulta está disponível?",
] as const;

/** Fallback da home quando a pergunta ainda não está no Supabase. */
export const HOME_FAQS: FaqItem[] = [
  {
    question: "Quanto tempo dura a cirurgia de túnel do carpo?",
    answer:
      "A cirurgia endoscópica dura em média 20 a 30 minutos, com anestesia local e alta no mesmo dia.",
  },
  {
    question: "A Dra. Janaína atende por convênio?",
    answer:
      "Não. O atendimento é exclusivamente particular. Entre em contato pelo WhatsApp para saber valores e formas de pagamento.",
  },
  {
    question: "O que é dedo em gatilho?",
    answer:
      "É quando o tendão flexor fica preso na polia do dedo, causando travamento e estalo doloroso.",
  },
  {
    question: "Preciso de encaminhamento para agendar?",
    answer:
      "Não. Você pode agendar diretamente pelo site, WhatsApp ou Doctoralia.",
  },
  {
    question: "A teleconsulta está disponível?",
    answer:
      "Sim, ofereço teleconsulta para avaliação inicial e retornos pós-operatórios.",
  },
];
