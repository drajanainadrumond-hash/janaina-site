# janainadrumond.com.br

Site da **Dra. Janaína Drumond**, médica ortopedista e traumatologista em Belo Horizonte
(CRM-MG 69719 · RQE 50592), com formação em cirurgia da mão e punho.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**, hospedado na **Vercel**
- **Tailwind CSS 4** — tema em `src/app/globals.css` (sem biblioteca de componentes)
- **Supabase** — admin, blog, formulários e newsletter
- **Resend** — e-mail do formulário de contato
- **react-hook-form** — formulários · **sanitize-html** — HTML dos posts do blog
- **googleapis** — agenda do Google no admin
- **Jest** + **Testing Library** — testes · **ESLint** — lint
- **sonner** (avisos) · **lucide-react** (ícones)

Node **24** (`.nvmrc` e `engines` no `package.json`).

> Nota para agentes: esta versão do Next muda APIs e convenções. Antes de escrever código,
> ler o guia em `node_modules/next/dist/docs/` (ver `AGENTS.md`).

## Desenvolvimento

```bash
cp .env.example .env.local   # e preencher
npm run dev                  # http://127.0.0.1:3000
npm run build && npm run start
npm run lint
npm run test                 # Jest em modo watch
npm run test:ci              # Jest uma vez (é o que o CI roda)
```

Variável obrigatória faltando não trava o servidor: ela é avisada no log quando ele sobe
(`src/instrumentation.ts` → `src/lib/env-check.ts`). A lista está em `.env.example`.

## CI

`.github/workflows/ci.yml`: `npm ci` + lint + testes em todo push e pull request. Os testes
guardam os fatos canônicos (endereço, CRM, RQE, preço, terminologia) e a limpeza do HTML do blog.
Deploy: a Vercel publica a `main` a cada push.

## Estrutura

```
src/
├── app/            # rotas (App Router): home, sobre, especialidades, condicoes, blog,
│                   # faq, contato, depoimentos, ortopedista-em-belo-horizonte, admin, api
├── components/     # por área: home, layout, condicoes, especialidades, faq, forms,
│                   # seo, effects, admin, ui
├── lib/            # conteúdo (condicoes, especialidades, faqs, blog), schema.org, seo,
│                   # constants (fatos canônicos), orbee/utm (rastreio), supabase
├── hooks/          # use-focus-trap, use-reveal
└── instrumentation.ts
```

**Fatos canônicos** (nome, CRM, RQE, endereço, telefone, preço) moram em `src/lib/constants.ts`.

## Identidade visual

Tokens em `src/app/globals.css`:

| Token | Cor | Uso |
|---|---|---|
| `teal` | `#003E51` | azul principal |
| `teal-mid` | `#00565B` | teal |
| `cream` | `#E6E5E2` | off-white |
| `cream-light` | `#F5F4F2` | fundo claro |
| `gray-brand` | `#66686D` | cinza (mais escuro que o `#85878B` do manual, para passar no contraste AA) |
| `dark` | `#0A1F2C` | texto principal |
| `whatsapp` | `#25D366` | botões de WhatsApp |

Fontes locais em `src/fonts/`: Aire Roman Pro (títulos) e Century Gothic (texto).

## Rastreio

- **Central Orbee**: `src/lib/orbee.ts` + `orbee-autocapture` — cliques no WhatsApp, telefone,
  Doctoralia e botões com `data-orbee-cta`, enviados direto à Central (sem GTM, sem cookie de terceiro).
- **GTM / GA4** com Consent Mode (padrão negado até o aceite no banner de cookies).
