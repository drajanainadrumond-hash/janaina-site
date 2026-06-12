# janainadrumond.com.br

Site institucional da **Dra. Janaina Drumond** — Ortopedista e Traumatologista em Belo Horizonte com formação em Cirurgia da Mão e Punho.

## Stack Técnica (Livro-Guia 2026)

- **Next.js 16** + **React 19** + **TypeScript**
- **Tailwind CSS 4** + **shadcn/ui**
- **Zustand** (estado global)
- **Jest** + **React Testing Library** (TDD)
- **sonner** (notificações) | **lucide-react** (ícones)
- **react-hook-form** + **zod** (formulários)

## Desenvolvimento

Copie as variáveis de ambiente e ajuste os valores (Supabase, e-mail, etc.):

```bash
cp .env.example .env.local
```

```bash
npm run dev      # Servidor em http://127.0.0.1:3000
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # ESLint
npm run test     # Jest (watch mode para TDD)
npm run test:ci  # Jest em modo CI
```

## Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js)
│   ├── sobre/
│   ├── especialidades/
│   ├── condicoes/
│   ├── blog/
│   ├── contato/
│   ├── agende-sua-consulta/
│   └── ...
├── components/
│   ├── layout/             # Header, Footer
│   └── ui/                 # shadcn/ui
├── lib/                    # Utilitários
├── store/                  # Zustand stores
└── hooks/                  # Custom hooks
```

## Identidade Visual

Paleta conforme Manual de Marca 2026:

- **#003E51** — Azul principal
- **#00565B** — Teal
- **#85878B** — Cinza
- **#E6E5E2** — Off-white
- **#2D3748** — Texto principal

## SEO

- Metadata API (title, description, Open Graph)
- `robots.txt` e `sitemap.xml` dinâmicos
- GTM preparado (descomentar no layout quando ID disponível)

## Referências

- Livro-Guia Dra. Janaina Drumond (Orbee Labs)
- Checklist de Tecnologias Atualizado 2026
- Manual de Marca — Identidade Visual 2026
