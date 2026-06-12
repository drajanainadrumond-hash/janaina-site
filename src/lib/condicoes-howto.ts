import type { HowToInput } from "@/lib/schema";

export type CondicaoHowTo = HowToInput & {
  /** Rótulo curto para a UI (ex.: "Diagnóstico", "Cirurgia"). */
  label: string;
};

/** Condições com schema HowTo — piloto item 4 do checklist AEO. */
export const HOWTO_CONDICAO_SLUGS = ["sindrome-do-tunel-do-carpo", "dedo-em-gatilho"] as const;

export type HowToCondicaoSlug = (typeof HOWTO_CONDICAO_SLUGS)[number];

const CONDICAO_HOWTOS: Record<HowToCondicaoSlug, CondicaoHowTo> = {
  "sindrome-do-tunel-do-carpo": {
    label: "Diagnóstico",
    name: "Como é feito o diagnóstico da síndrome do túnel do carpo",
    description:
      "Passo a passo da avaliação ortopédica para confirmar compressão do nervo mediano no punho e definir o tratamento adequado.",
    path: "/condicoes/sindrome-do-tunel-do-carpo",
    totalTime: "PT45M",
    steps: [
      {
        name: "Consulta e história clínica",
        text: "O ortopedista investiga dormência noturna, formigamento nos dedos, perda de força, atividades de risco e doenças associadas (diabetes, tireoide, gravidez).",
      },
      {
        name: "Exame físico com testes provocativos",
        text: "São realizados o teste de Phalen (flexão dos punhos por 60 segundos), o sinal de Tinel (percussão sobre o túnel) e o teste de compressão direta (Durkan) para reproduzir os sintomas.",
      },
      {
        name: "Exames complementares, se indicados",
        text: "A eletroneuromiografia (ENMG) confirma e classifica a gravidade da compressão do nervo mediano. A ultrassonografia do punho pode auxiliar na avaliação.",
      },
      {
        name: "Definição do plano terapêutico",
        text: "Com base no estágio clínico, define-se tratamento conservador (órtese, infiltração, fisioterapia) ou indicação cirúrgica de liberação do ligamento transverso do carpo.",
      },
    ],
  },
  "dedo-em-gatilho": {
    label: "Cirurgia",
    name: "Como funciona a cirurgia de dedo em gatilho",
    description:
      "Visão geral do procedimento ambulatorial de liberação da polia A1, indicado quando o dedo trava de forma persistente ou não responde ao tratamento conservador.",
    path: "/condicoes/dedo-em-gatilho",
    totalTime: "PT20M",
    steps: [
      {
        name: "Indicação e avaliação pré-operatória",
        text: "Após confirmação clínica do dedo em gatilho (graus III/IV ou falha do conservador), o ortopedista explica riscos, benefícios e cuidados pós-operatórios.",
      },
      {
        name: "Anestesia local",
        text: "O procedimento é feito com anestesia local na região da palma, sem necessidade de anestesia geral na maioria dos casos.",
      },
      {
        name: "Liberação da polia A1",
        text: "Por incisão pequena (técnica aberta) ou via percutânea, o cirurgião libera a polia A1 para o tendão flexor deslizar sem travar.",
      },
      {
        name: "Alta e mobilização precoce",
        text: "O paciente recebe alta no mesmo dia e é orientado a movimentar os dedos precocemente para evitar rigidez.",
      },
      {
        name: "Recuperação funcional",
        text: "Retorno gradual às atividades leves em 1 a 2 semanas, com fisioterapia quando indicada. Cada recuperação é acompanhada individualmente.",
      },
    ],
  },
};

export function getCondicaoHowTo(slug: string): CondicaoHowTo | undefined {
  return CONDICAO_HOWTOS[slug as HowToCondicaoSlug];
}

export function hasCondicaoHowTo(slug: string): slug is HowToCondicaoSlug {
  return HOWTO_CONDICAO_SLUGS.includes(slug as HowToCondicaoSlug);
}

/** Duração legível a partir de ISO 8601 (PT20M → "cerca de 20 minutos"). */
export function formatHowToDuration(iso?: string): string | null {
  if (!iso) return null;
  const match = iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?$/);
  if (!match) return null;
  const hours = match[1] ? Number(match[1]) : 0;
  const minutes = match[2] ? Number(match[2]) : 0;
  if (hours && minutes) return `cerca de ${hours} h e ${minutes} min`;
  if (hours) return `cerca de ${hours} h`;
  if (minutes) return `cerca de ${minutes} minutos`;
  return null;
}
