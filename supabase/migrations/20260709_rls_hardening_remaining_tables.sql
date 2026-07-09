-- RLS hardening 3 (2026-07-09) — remove "Authenticated full access" das 6 tabelas
-- restantes. O painel admin migrou pro service_role (server-side, via /api/admin/*);
-- verificado que NENHUM código depende do papel 'authenticated' nessas tabelas
-- (acesso client-side é só via admin-api; leituras públicas usam "Public read
-- published"/"Public read available slots"). As policies 'authenticated' eram
-- superfície de ataque: expunham PII de paciente (contacts, appointments) e
-- permitiam escrita por qualquer sessão anon logada no browser.
--
-- Aplicada em produção via MCP em 2026-07-09 (migration remota
-- 20260709xxxxxx_rls_hardening_remaining_tables). Este arquivo mantém o repo em sincronia.

DROP POLICY IF EXISTS "Authenticated full access contacts" ON "public"."contacts";
DROP POLICY IF EXISTS "Authenticated full access appointments" ON "public"."appointments";
DROP POLICY IF EXISTS "Authenticated full access slots" ON "public"."availability_slots";
DROP POLICY IF EXISTS "Authenticated full access blog" ON "public"."blog_posts";
DROP POLICY IF EXISTS "Authenticated full access depoimentos" ON "public"."depoimentos";
DROP POLICY IF EXISTS "Authenticated full access faqs" ON "public"."faqs";

-- Torna explícito o acesso service_role nas tabelas de PII que ficariam sem policy
-- (o service_role já ignora RLS; isto deixa a intenção clara e consistente com as
-- demais tabelas). Idempotente: dropa antes de criar.
DROP POLICY IF EXISTS "Service role full access" ON "public"."contacts";
CREATE POLICY "Service role full access" ON "public"."contacts"
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role full access" ON "public"."appointments";
CREATE POLICY "Service role full access" ON "public"."appointments"
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role full access" ON "public"."availability_slots";
CREATE POLICY "Service role full access" ON "public"."availability_slots"
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
