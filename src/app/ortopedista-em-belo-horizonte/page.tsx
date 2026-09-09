import type { Metadata } from "next";
import Link from "next/link";
import { CondicaoWhatsAppCta } from "@/components/condicoes/condicao-whatsapp-cta";
import { DisclaimerBanner } from "@/components/layout/disclaimer-banner";
import { SchemaMarkup } from "@/components/seo/schema-markup";
import { FloatingOrbs } from "@/components/ui/floating-orbs";
import { QuemAtende } from "@/components/layout/quem-atende";
import { PROVA_SOCIAL, SITE, SOCIAL } from "@/lib/constants";
import { generateBreadcrumbList, generateFAQPage, generatePhysician } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";

/**
 * Página de destino do grupo "02 - Ortopedista BH", que carrega 72% do gasto do Ads.
 *
 * POR QUE ELA EXISTE — o diagnóstico de 09/09/2026 mediu isto:
 * todo grupo de anúncio que aponta para uma página específica tem Índice de Qualidade 6–7 e
 * clique de R$ 0,88; o grupo 02, que apontava para a HOME, tem QS 2–5 com experiência de página
 * "abaixo da média" e clique de R$ 2,98. O descasamento não estava nas palavras-chave — estava
 * no destino: quem busca "ortopedista bh" caía numa home que fala de mão e punho.
 * Ver `livro-guia-v4/pesquisa/F2-05-diagnostico-queda-09set2026.md` §2.2.
 *
 * POR QUE O TEXTO É ESTE — ela é procurada como ORTOPEDISTA GERAL; o nicho de mão e punho
 * qualifica mas não atrai (D40). A ordem aqui é deliberada: primeiro ortopedia geral, que é a
 * busca; a mão e o punho entram como diferencial, não como porta de entrada. A frase-base é da
 * própria Dra., da bio do Doctoralia.
 *
 * COMPLIANCE (CFM 2.336/2023):
 *  · Art. 4º, I  — nome + CRM + a palavra **médica** aparecem no topo, juntos.
 *  · Art. 4º, II — RQE 50592 é de Ortopedia. Por isso "com formação em cirurgia da mão e punho",
 *                  nunca "especialista em cirurgia da mão" (C52, regra 1).
 *  · Art. 9º     — o preço da consulta pode ser publicado; R$ 500 é o valor de tabela (D41).
 *  · Art. 11     — sem superlativo, sem promessa de resultado, sem depoimento de paciente.
 */

const TITULO = "Ortopedista em Belo Horizonte — Dra. Janaína Drumond | CRM-MG 69719";
const DESCRICAO =
  "Dra. Janaína Drumond, médica ortopedista e traumatologista em Belo Horizonte. Consultório na Savassi. Atendimento exclusivamente particular. CRM-MG 69719 · RQE 50592. Agende pelo WhatsApp.";

export const metadata: Metadata = buildPageMetadata({
  title: TITULO,
  description: DESCRICAO,
  path: "/ortopedista-em-belo-horizonte",
});

/** As perguntas são as que aparecem no "As pessoas também perguntam" das SERPs capturadas. */
const FAQS = [
  {
    question: "Quanto custa uma consulta com ortopedista em Belo Horizonte?",
    answer:
      "A consulta com a Dra. Janaína Drumond custa R$ 500. O pagamento pode ser feito por PIX, dinheiro, transferência bancária ou cartão de crédito. O atendimento é exclusivamente particular.",
  },
  {
    question: "A Dra. Janaína atende por convênio?",
    answer:
      "Não. O atendimento é exclusivamente particular, sem convênio.",
  },
  {
    question: "Onde fica o consultório?",
    answer:
      "Na Avenida do Contorno, 5326, Savassi, Belo Horizonte/MG, CEP 30110-039.",
  },
  {
    question: "Quais problemas uma ortopedista trata?",
    answer:
      "Dores e lesões nos ossos, articulações, músculos e tendões — ombro, joelho, quadril, coluna, mão e punho. A Dra. Janaína atende ortopedia geral e tem formação específica em cirurgia da mão e punho.",
  },
  {
    question: "Preciso de encaminhamento para consultar?",
    answer:
      "Não. Você pode agendar diretamente pelo WhatsApp ou pelo Doctoralia, sem encaminhamento.",
  },
  {
    question: "Quanto tempo dura a primeira consulta?",
    answer:
      "Entre 30 e 45 minutos. A avaliação inclui a história do seu caso, exame físico e análise dos exames que você já tenha.",
  },
];

const ATENDE = [
  { area: "Ombro", exemplos: "dor, tendinite, bursite, lesão do manguito" },
  { area: "Joelho", exemplos: "dor, lesão de menisco e ligamento, artrose" },
  { area: "Quadril", exemplos: "dor, bursite, artrose" },
  { area: "Coluna", exemplos: "dor lombar e cervical" },
  { area: "Mão e punho", exemplos: "túnel do carpo, dedo em gatilho, rizartrose, fraturas, cistos, tendinites" },
  { area: "Fraturas em geral", exemplos: "avaliação, imobilização e acompanhamento" },
];

export default function OrtopedistaEmBeloHorizontePage() {
  return (
    <div className="relative overflow-x-clip bg-cream-light/40">
      <SchemaMarkup schema={generatePhysician()} />
      <SchemaMarkup schema={generateFAQPage(FAQS)} />
      <SchemaMarkup
        schema={generateBreadcrumbList([
          { name: "Início", href: "/" },
          { name: "Ortopedista em Belo Horizonte", href: "/ortopedista-em-belo-horizonte" },
        ])}
      />
      <FloatingOrbs />

      {/* Topo — a linha do Art. 4º, I vem antes de qualquer argumento de venda */}
      <section className="pt-[100px] lg:pt-[140px] pb-10 px-6 text-center">
        <h1 className="font-heading text-[2rem] md:text-[3rem] font-light tracking-[2px] md:tracking-[3px] uppercase leading-[1.1]">
          Ortopedista em
          <em className="font-serif italic font-normal text-teal normal-case tracking-[-0.5px] block text-[2rem] md:text-[2.8rem]">
            Belo Horizonte
          </em>
        </h1>

        <p className="mt-6 text-[1.125rem] text-[#4A5E6B] max-w-[620px] mx-auto leading-[1.85]">
          <strong className="text-teal">Dra. Janaína Drumond, médica</strong> ortopedista e
          traumatologista, com formação específica em cirurgia da mão e punho. Consultório na
          Savassi.
        </p>
        <p className="mt-3 text-[1rem] text-[#5A6B78] tracking-[0.5px]">
          {SITE.crm} · {SITE.rqe}
        </p>

        <div className="mt-8 flex justify-center">
          <CondicaoWhatsAppCta
            condicao="ortopedia em Belo Horizonte"
            slug="ortopedista-bh"
            posicao="topo"
            tone="solo"
          />
        </div>
        <p className="mt-4 text-[1rem] text-[#5A6B78]">
          Atendimento exclusivamente particular
        </p>
      </section>

      <div className="max-w-[1140px] mx-auto px-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
      <div className="min-w-0">

      {/* O que ela atende — ortopedia geral primeiro, o nicho como diferencial */}
      <section className="py-12">
        <h2 className="font-heading text-[1.5rem] md:text-[1.9rem] font-light tracking-[1px] uppercase text-teal text-center">
          O que ela atende
        </h2>
        <p className="mt-4 text-center text-[1.125rem] text-[#4A5E6B] max-w-[640px] mx-auto leading-[1.8]">
          Ortopedia geral — dores e lesões em diversas partes do corpo — com cuidado especial para
          os problemas da mão e do punho.
        </p>

        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {ATENDE.map((item) => (
            <li
              key={item.area}
              className="rounded-2xl bg-white border border-teal/[0.08] p-5 shadow-[0_8px_32px_rgba(0,62,81,0.05)]"
            >
              <p className="font-heading text-[1.05rem] tracking-[0.5px] text-teal">{item.area}</p>
              <p className="mt-1 text-[1rem] text-[#5A6B78] leading-[1.7]">{item.exemplos}</p>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-[1rem] text-[#5A6B78]">
          Quer ver as condições em detalhe?{" "}
          <Link href="/condicoes" className="text-teal-mid hover:text-teal underline underline-offset-2">
            Condições tratadas
          </Link>{" "}
          ·{" "}
          <Link
            href="/especialidades/cirurgia-da-mao-e-punho"
            className="text-teal-mid hover:text-teal underline underline-offset-2"
          >
            Cirurgia da mão e punho
          </Link>
        </p>
      </section>

      {/* Formação — fatos conferíveis, sem título que o RQE não cobre */}
      <section className="rounded-3xl bg-cream-light p-8 my-10">
        <div className="text-center">
          <h2 className="font-heading text-[1.5rem] md:text-[1.9rem] font-light tracking-[1px] uppercase text-teal">
            Formação
          </h2>
          <ul className="mt-8 space-y-3 text-[1.05rem] text-[#4A5E6B] leading-[1.8]">
            <li>Medicina pela Universidade Federal de Ouro Preto (UFOP)</li>
            <li>Residência em Ortopedia e Traumatologia no Hospital Socor, credenciado pela SBOT</li>
            <li>Pós-graduação em Cirurgia da Mão e Punho</li>
            <li>Registro: {SITE.crm} · {SITE.rqe} (Ortopedia e Traumatologia)</li>
          </ul>
          <Link
            href="/sobre/formacao"
            className="mt-8 inline-block text-[1.05rem] text-teal-mid hover:text-teal underline underline-offset-2"
          >
            Ver a formação completa →
          </Link>
        </div>
      </section>

      {/* Prova social — agregado, nunca palavra de paciente (C36, item 6) */}
      <section className="py-12">
        <div className="text-center">
          <div className="flex justify-center gap-1" role="img" aria-label={`${PROVA_SOCIAL.estrelas} de 5 estrelas`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-[1.5rem] text-teal-mid" aria-hidden>
                ★
              </span>
            ))}
          </div>
          <p className="mt-3 text-[1.25rem] text-teal">
            <strong className="font-heading tracking-[0.5px]">
              {PROVA_SOCIAL.avaliacoes} avaliações
            </strong>{" "}
            de pacientes no {PROVA_SOCIAL.fonte}
          </p>
          <p className="mt-4 text-[1rem] text-[#5A6B78] leading-[1.7]">
            O que os pacientes mais mencionam:{" "}
            {PROVA_SOCIAL.maisMencionado.join(" · ").toLowerCase()}. Agregado pelo{" "}
            {PROVA_SOCIAL.fonte} a partir de consultas verificadas.
          </p>
          <a
            href={SOCIAL.doctoralia}
            target="_blank"
            rel="noopener noreferrer"
            data-orbee-cta="prova-social:doctoralia-lp-ortopedista"
            className="mt-6 inline-flex items-center justify-center px-7 py-3 rounded-full border border-teal/20 text-teal text-[1.05rem] hover:bg-teal hover:text-white transition-colors"
          >
            Confira as avaliações no {PROVA_SOCIAL.fonte} →
          </a>
        </div>
      </section>

      {/* Consultório */}
      <section className="rounded-3xl bg-cream-light p-8 my-10">
        <div className="text-center">
          <h2 className="font-heading text-[1.5rem] md:text-[1.9rem] font-light tracking-[1px] uppercase text-teal">
            Consultório
          </h2>
          <p className="mt-6 text-[1.125rem] text-[#4A5E6B] leading-[1.85]">
            {SITE.address.full}
          </p>
          <p className="mt-2 text-[1rem] text-[#5A6B78]">
            Atendimento presencial, com hora marcada.
          </p>
        </div>
      </section>

      {/* Perguntas — as mesmas do "As pessoas também perguntam" */}
      <section className="py-12">
        <h2 className="font-heading text-[1.5rem] md:text-[1.9rem] font-light tracking-[1px] uppercase text-teal text-center">
          Perguntas frequentes
        </h2>
        <dl className="mt-10 space-y-6">
          {FAQS.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl bg-white border border-teal/[0.08] p-6 shadow-[0_8px_32px_rgba(0,62,81,0.05)]"
            >
              <dt className="font-heading text-[1.05rem] tracking-[0.5px] text-teal">
                {faq.question}
              </dt>
              <dd className="mt-2 text-[1.05rem] text-[#4A5E6B] leading-[1.8]">{faq.answer}</dd>
            </div>
          ))}
        </dl>

        <DisclaimerBanner />
      </section>

      </div>

      {/* Lateral fixa: o rosto e o botão acompanham a rolagem. No celular vira cartão
          de largura inteira e sobe pro topo da coluna. */}
      <QuemAtende
        condicao="ortopedia em Belo Horizonte"
        slug="ortopedista-bh"
        className=""
      />
      </div>

      {/* Fechamento */}
      <section className="pb-24 px-6 text-center">
        <p className="text-[1.125rem] text-[#4A5E6B] mb-6">
          Com dor ou lesão? Fale com o consultório e agende sua avaliação.
        </p>
        <div className="flex justify-center">
          <CondicaoWhatsAppCta
            condicao="ortopedia em Belo Horizonte"
            slug="ortopedista-bh"
            posicao="final"
            tone="solo"
          />
        </div>
      </section>
    </div>
  );
}
