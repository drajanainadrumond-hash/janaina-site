import { getSupabaseAdmin } from "./supabase";

export type Depoimento = {
  id: string;
  name: string;
  condition: string;
  text: string;
  stars: number;
  published: boolean;
  created_at: string;
};

const STATIC_DEPOIMENTOS: Depoimento[] = [
  {
    id: "1",
    name: "Maria S.",
    condition: "Túnel do Carpo",
    text: "A Dra. Janaína foi muito atenciosa desde a primeira consulta. Explicou tudo com calma e clareza. A cirurgia foi rápida e a recuperação melhor do que eu esperava.",
    stars: 5,
    published: true,
    created_at: "2026-03-01",
  },
  {
    id: "2",
    name: "Carlos R.",
    condition: "Dedo em Gatilho",
    text: "Procurei a Dra. Janaína depois de meses com o dedo travando. A cirurgia durou poucos minutos e no dia seguinte já estava usando a mão normalmente. Excelente profissional.",
    stars: 5,
    published: true,
    created_at: "2026-02-15",
  },
  {
    id: "3",
    name: "Ana Paula M.",
    condition: "Dor no Ombro",
    text: "Muito cuidadosa no diagnóstico. Pediu os exames certos, explicou cada detalhe e montou um plano de tratamento que funcionou. Recomendo de olhos fechados.",
    stars: 5,
    published: true,
    created_at: "2026-02-01",
  },
  {
    id: "4",
    name: "Roberto L.",
    condition: "Fratura de Punho",
    text: "Fraturei o punho praticando esporte e fui encaminhado para a Dra. Janaína. O tratamento foi impecável e a reabilitação muito bem orientada. Voltei a treinar sem dor.",
    stars: 5,
    published: true,
    created_at: "2026-01-20",
  },
  {
    id: "5",
    name: "Fernanda C.",
    condition: "Rizartrose",
    text: "Tinha muita dor no polegar ao fazer atividades simples. A Dra. Janaína explicou que era rizartrose e propôs um tratamento que aliviou muito. Profissional sensível e competente.",
    stars: 5,
    published: true,
    created_at: "2026-01-10",
  },
  {
    id: "6",
    name: "Lucas T.",
    condition: "Tendinite de Quervain",
    text: "Minha esposa desenvolveu dor no punho após o nascimento do nosso filho. A Dra. Janaína identificou rapidamente e o tratamento foi eficaz. Muito grato pela atenção.",
    stars: 5,
    published: true,
    created_at: "2026-01-05",
  },
];

export async function getDepoimentos(): Promise<Depoimento[]> {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { data, error } = await supabase
      .from("depoimentos")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) return data;
  }

  return STATIC_DEPOIMENTOS;
}
