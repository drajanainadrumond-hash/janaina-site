-- RLS hardening (2026-06-20) — defesa em profundidade após mover o painel admin
-- para o servidor (todo acesso a estas tabelas passa pelo service role).

-- settings: contém os tokens OAuth do Google (key 'google_calendar_tokens').
-- Antes, qualquer sessão 'authenticated' (inclusive via cliente anon no browser)
-- podia lê-los. Como o painel agora lê settings só pelo servidor (service role),
-- removemos o acesso de 'authenticated' e deixamos apenas o service role.
DROP POLICY IF EXISTS "Authenticated full access settings" ON "public"."settings";

CREATE POLICY "Service role full access settings" ON "public"."settings"
  FOR ALL
  USING (("auth"."role"() = 'service_role'::"text"))
  WITH CHECK (("auth"."role"() = 'service_role'::"text"));

-- appointments: o INSERT público (WITH CHECK true) permitia que qualquer anônimo
-- gravasse agendamentos direto na tabela, furando a validação e o rate-limit da
-- API. O agendamento público passa pelo /api/calendar/book (service role), então
-- o insert anônimo direto não é mais necessário.
DROP POLICY IF EXISTS "Public insert appointments" ON "public"."appointments";
