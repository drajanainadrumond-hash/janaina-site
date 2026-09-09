/**
 * MUTAÇÃO no Supabase — FAQ (09/09/2026, aprovado pela Diana).
 *
 * O FAQ do site é servido do BANCO, não do código: `getPublishedFaqs()` só cai no array
 * estático quando o Supabase não responde. Editar `src/lib/faqs.ts` muda apenas o fallback.
 * Por isso estas três correções precisam ir na tabela `faqs`.
 *
 *  1. "subespecialidade" → "formação específica"  (C52 regra 3 — o RQE dela é de Ortopedia)
 *  2. e 3. publicar o preço da consulta: R$ 500 (Art. 9º, VI a VIII permite)
 *
 * Uso: npx tsx --env-file=.env.local scripts/faq-corrigir-09set.ts [--dry]
 */
import { getSupabaseServiceRole } from "../src/lib/supabase";

const DRY = process.argv.includes("--dry");

const CORRECOES = [
  {
    question: "Quais condições a Dra. Janaína trata?",
    answer:
      "Atendo todas as condições ortopédicas gerais (ombro, joelho, quadril, coluna) e tenho formação específica em cirurgia da mão e punho — incluindo síndrome do túnel do carpo, dedo em gatilho, rizartrose, fraturas de punho e escafóide, cisto sinovial e tendinite de De Quervain.",
    motivo: 'C52 regra 3 — "subespecialidade" não existe na taxonomia do conselho',
  },
  {
    question: "O atendimento é particular ou por convênio?",
    answer:
      "O atendimento é exclusivamente particular — não há atendimento por convênio. A consulta custa R$ 500, e o pagamento pode ser feito por PIX, dinheiro, transferência bancária ou cartão de crédito.",
    motivo: "publicar o preço (Art. 9º, VI a VIII permite) — decisão da Diana em 09/09",
  },
  {
    question: "Quanto custa uma consulta particular?",
    answer:
      "A consulta particular custa R$ 500. O pagamento pode ser feito por PIX, dinheiro, transferência bancária ou cartão de crédito. Fale pelo WhatsApp para agendar.",
    motivo: "idem — é o PAA nº 1 das SERPs e nenhum dos 14 concorrentes responde",
  },
];

async function main() {
  const db = getSupabaseServiceRole();
  if (!db) throw new Error("sem SUPABASE_SERVICE_ROLE_KEY — não dá para escrever");

  for (const c of CORRECOES) {
    const { data: atual, error } = await db
      .from("faqs")
      .select("id, question, answer")
      .eq("question", c.question)
      .limit(1);
    if (error) throw new Error(`select: ${error.message}`);
    if (!atual?.length) {
      console.log(`⚠️  não achei no banco: "${c.question}"`);
      continue;
    }
    const row = atual[0];
    console.log(`\n### ${c.question}`);
    console.log(`  motivo: ${c.motivo}`);
    console.log(`  ANTES:  ${row.answer.slice(0, 160)}`);
    console.log(`  DEPOIS: ${c.answer.slice(0, 160)}`);
    if (DRY) continue;
    const { error: upErr } = await db.from("faqs").update({ answer: c.answer }).eq("id", row.id);
    if (upErr) throw new Error(`update ${row.id}: ${upErr.message}`);
    console.log("  ✅ gravado");
  }
  if (DRY) console.log("\nDRY — nada gravado.");
  process.exit(0);
}
main().catch((e) => {
  console.error("ERRO:", e.message);
  process.exit(1);
});
