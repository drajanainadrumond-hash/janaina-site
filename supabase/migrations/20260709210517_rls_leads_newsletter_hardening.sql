-- RLS hardening 2 (2026-07-09) — fecha `leads` e `newsletter_subscribers`.
-- Segue o mesmo padrão da migration 20260620 (que fechou `appointments`).
-- Contexto: o /api/contato passou a usar o service_role e a confirmação de
-- newsletter já usava; ambas as tabelas têm "Service role full access", então
-- toda escrita/leitura legítima passa pela API. As policies abaixo eram
-- superfície de ataque com a chave anon (pública, embutida no JS do browser).

-- 1. INSERT público direto (WITH CHECK true): permitia floodar as tabelas com a
--    chave anon, furando validação, rate-limit e o double opt-in da newsletter
--    (dava para inserir {email, verified:true} direto). Não é mais necessário.
DROP POLICY IF EXISTS "Public insert leads" ON "public"."leads";
DROP POLICY IF EXISTS "Public insert newsletter" ON "public"."newsletter_subscribers";

-- 2. SELECT por 'authenticated': o painel lê essas tabelas só pelo servidor
--    (service_role). O acesso 'authenticated' (i.e. cliente anon logado no
--    browser) expunha PII de pacientes/inscritos e não é usado. Least-privilege.
DROP POLICY IF EXISTS "Authenticated read leads" ON "public"."leads";
DROP POLICY IF EXISTS "Authenticated read newsletter" ON "public"."newsletter_subscribers";

-- Nota de acompanhamento (não aplicado aqui, exige verificação caso a caso):
-- as tabelas de conteúdo (appointments, contacts, blog_posts, depoimentos, faqs,
-- availability_slots) ainda têm "Authenticated full access". Como o painel agora
-- opera via service_role, avaliar rebaixá-las para service_role apenas, mantendo
-- as "Public read published ..." do conteúdo público.
