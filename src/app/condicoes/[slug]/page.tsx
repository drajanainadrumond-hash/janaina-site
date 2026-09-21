import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CONDICOES, getCondicaoBySlug } from "@/lib/condicoes";
import { getCondicaoDirectAnswer } from "@/lib/aeo";
import { getCondicaoFaqs } from "@/lib/condicoes-faqs";
import { getCondicaoHowTo } from "@/lib/condicoes-howto";
import { withHome } from "@/lib/breadcrumbs";
import { buildCondicaoJsonLd } from "@/lib/condicoes-schema";
import { buildPageMetadata } from "@/lib/seo";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { AeoContentIntro } from "@/components/seo/aeo-content-intro";
import { CondicaoFaqSection } from "@/components/condicoes/condicao-faq-section";
import { CondicaoHowToSection } from "@/components/condicoes/condicao-howto-section";
import { TimelineFeed } from "@/components/condicoes/timeline-feed";
import { CondicaoWhatsAppCta } from "@/components/condicoes/condicao-whatsapp-cta";
import { CondicoesRelacionadas } from "@/components/condicoes/condicoes-relacionadas";
import { QuemAtende } from "@/components/layout/quem-atende";
import { DisclaimerBanner } from "@/components/layout/disclaimer-banner";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return CONDICOES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cond = getCondicaoBySlug(slug);
  if (!cond) return { title: "Condição não encontrada" };

  return buildPageMetadata({
    title: cond.title,
    description: getCondicaoDirectAnswer(cond.slug, cond.desc),
    path: `/condicoes/${slug}`,
    ogImage: `/condicoes/${slug}/opengraph-image`,
  });
}

export default async function CondicaoPage({ params }: Props) {
  const { slug } = await params;
  const cond = getCondicaoBySlug(slug);

  if (!cond) notFound();

  const directAnswer = getCondicaoDirectAnswer(cond.slug, cond.desc);
  const condicaoFaqs = getCondicaoFaqs(cond.slug);
  const condicaoHowTo = getCondicaoHowTo(cond.slug);
  const schemas = buildCondicaoJsonLd({
    slug: cond.slug,
    title: cond.title,
    directAnswer,
  });

  return (
    <div className="pt-[100px] lg:pt-[140px] pb-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <div className="max-w-[1140px] mx-auto grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
      <article className="max-w-[700px] w-full mx-auto lg:mx-0">
        <PageBreadcrumbs
          className="mb-8"
          items={withHome(
            { name: "Condições", href: "/condicoes" },
            { name: cond.title, href: `/condicoes/${cond.slug}` }
          )}
        />

        <span className="inline-block bg-teal text-white text-[1.125rem] px-3 py-1 rounded-full uppercase tracking-[1.5px] mb-4">
          {cond.areaLabel}
        </span>

        <h1 className="font-heading text-[2rem] md:text-[2.5rem] font-light tracking-[1px] leading-[1.2] mb-6">
          {cond.title}
        </h1>

        {/* No CELULAR a foto entra aqui — depois do caminho, da tag e do título, que é como a
            pessoa se localiza na página. No desktop ela é a coluna lateral fixa (abaixo), e este
            bloco some. Renderizar nos dois lugares e alternar por breakpoint é o que permite uma
            ordem no mobile e outra no desktop sem duplicar a página. (pedido da Diana, 09/09) */}
        <QuemAtende
          condicao={cond.title}
          slug={cond.slug}
          className="lg:hidden mb-8"
        />

        <AeoContentIntro directAnswer={directAnswer} pageTitle={cond.title} />

        {/* Sem botão de WhatsApp aqui: o cartão "Quem vai te atender" já leva um — fixo na
            lateral no desktop e logo acima deste trecho no celular. (pedido da Diana, 21/09) */}

        <hr className="my-8 border-cream-dark" />

        <TimelineFeed content={cond.content} areaLabel={cond.areaLabel} />

        {condicaoHowTo ? <CondicaoHowToSection howTo={condicaoHowTo} /> : null}

        {condicaoFaqs ? (
          <CondicaoFaqSection faqs={condicaoFaqs} conditionTitle={cond.title} />
        ) : null}

        <CondicoesRelacionadas slug={cond.slug} />

        {/* CTA contextual — o WhatsApp é o caminho principal; o formulário, a alternativa. */}
        <div className="mt-12 p-8 bg-teal rounded-2xl text-center">
          <p className="text-white/80 text-[1.125rem] mb-1">
            Tem dúvidas sobre sua condição? Agende uma consulta para avaliação individualizada.
          </p>
          <p className="text-white/60 text-[1rem] mb-5">
            Atendimento exclusivamente particular.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <CondicaoWhatsAppCta
              condicao={cond.title}
              slug={cond.slug}
              posicao="final"
              tone="teal"
            />
            <Link
              href="/contato"
              data-orbee-cta={`agendar-formulario:${cond.slug}`}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-[1.125rem] uppercase tracking-[0.5px] bg-transparent text-white/60 border border-white/[0.1] font-medium hover:border-white/25 hover:text-white transition-all duration-300"
            >
              Agendar Consulta
            </Link>
          </div>
        </div>

        <DisclaimerBanner />
      </article>

      {/* Lateral fixa: o rosto e o botão acompanham a rolagem. No celular vira cartão
          de largura inteira, logo abaixo do conteúdo — e a `order` sobe ele pro topo. */}
      <QuemAtende
        condicao={cond.title}
        slug={cond.slug}
        className="hidden lg:block"
      />
      </div>
    </div>
  );
}
