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

/**
 * Só devolve depoimento que exista de verdade no banco, publicado pela Dra.
 *
 * Não há lista estática de reserva, e isso é deliberado: até 09/09/2026 esta função caía
 * num array de 6 depoimentos **fabricados** (nome, condição e nota inventados) sempre que o
 * Supabase estivesse ausente ou vazio — ou seja, o site publicava texto de paciente que nunca
 * existiu. Vetado pelo Art. 11, VI e XVI da Resolução CFM 2.336/2023 e pela regra do projeto,
 * mais estrita, que não reproduz depoimento de paciente no site. Ver roadmap 1.1.1.
 *
 * Vazio é a resposta correta quando não há nada publicado — quem consome trata esse caso.
 */
export async function getDepoimentos(): Promise<Depoimento[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("depoimentos")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data;
}
