ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS faq jsonb;

COMMENT ON COLUMN public.blog_posts.faq IS 'Lista de perguntas frequentes [{question, answer}] para renderizacao e schema FAQPage';
