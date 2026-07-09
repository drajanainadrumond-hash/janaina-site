-- Newsletter: double opt-in (LGPD — consentimento confirmado por e-mail).
-- Idempotente: seguro rodar mais de uma vez no banco de produção existente.

ALTER TABLE newsletter_subscribers
  ADD COLUMN IF NOT EXISTS confirm_token TEXT,
  ADD COLUMN IF NOT EXISTS token_expires_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_newsletter_confirm_token
  ON newsletter_subscribers(confirm_token);
