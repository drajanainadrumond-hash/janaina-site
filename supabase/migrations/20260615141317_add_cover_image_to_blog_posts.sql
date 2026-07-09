ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS cover_image text,
  ADD COLUMN IF NOT EXISTS cover_alt text;

COMMENT ON COLUMN public.blog_posts.cover_image IS 'URL pública da imagem de capa do post (bucket blog-images no Supabase Storage)';
COMMENT ON COLUMN public.blog_posts.cover_alt IS 'Texto alternativo (alt) da imagem de capa, para acessibilidade e SEO';
