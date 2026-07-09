-- Marca leads como lidos/não-lidos no painel admin (09/07/2026).
-- Aplicada em produção via MCP; este arquivo mantém o repo em sincronia.
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS read boolean NOT NULL DEFAULT false;

COMMENT ON COLUMN public.leads.read IS 'Lido no painel admin (true) ou não lido (false, padrão). Leads novos entram como não lidos.';
