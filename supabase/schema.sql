-- =============================================
-- Schema do Supabase para o site Dra. Janaína Drumond
-- Execute este SQL no Supabase Dashboard > SQL Editor
-- =============================================

-- 1. Tabela de Leads (formulário de contato)
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  convenio TEXT NOT NULL,
  queixa TEXT NOT NULL,
  ip TEXT,
  -- Atribuição de campanha (origem do lead)
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  gclid TEXT,
  referrer TEXT,
  landing_page TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON leads
  FOR ALL USING (auth.role() = 'service_role');

-- Publishable key pode inserir (formulario publico)
CREATE POLICY "Public insert leads" ON leads
  FOR INSERT WITH CHECK (true);

-- 2. Tabela de Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT DEFAULT '',
  category TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published posts" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Service role full access" ON blog_posts
  FOR ALL USING (auth.role() = 'service_role');

-- 3. Tabela de Depoimentos
CREATE TABLE IF NOT EXISTS depoimentos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  condition TEXT NOT NULL,
  text TEXT NOT NULL,
  stars INTEGER DEFAULT 5 CHECK (stars >= 1 AND stars <= 5),
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE depoimentos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published depoimentos" ON depoimentos
  FOR SELECT USING (published = true);

CREATE POLICY "Service role full access" ON depoimentos
  FOR ALL USING (auth.role() = 'service_role');

-- 4. Tabela de Newsletter
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  verified BOOLEAN DEFAULT false,        -- true só após double opt-in confirmado
  confirm_token TEXT,                    -- token do link de confirmação (limpo após confirmar)
  token_expires_at TIMESTAMPTZ,          -- validade do token (24h)
  confirmed_at TIMESTAMPTZ,              -- momento da confirmação do double opt-in
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON newsletter_subscribers
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Public insert newsletter" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- 5. Tabela de FAQs (gerenciavel)
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published faqs" ON faqs
  FOR SELECT USING (published = true);

CREATE POLICY "Service role full access" ON faqs
  FOR ALL USING (auth.role() = 'service_role');

-- Índices
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_depoimentos_published ON depoimentos(published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_confirm_token ON newsletter_subscribers(confirm_token);
CREATE INDEX IF NOT EXISTS idx_faqs_published ON faqs(published, display_order ASC);
