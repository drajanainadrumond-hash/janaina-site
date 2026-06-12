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
      <article className="max-w-[700px] mx-auto">
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

        <AeoContentIntro directAnswer={directAnswer} pageTitle={cond.title} />

        <hr className="my-8 border-cream-dark" />

        <TimelineFeed content={cond.content} areaLabel={cond.areaLabel} />

        {condicaoHowTo ? <CondicaoHowToSection howTo={condicaoHowTo} /> : null}

        {condicaoFaqs ? (
          <CondicaoFaqSection faqs={condicaoFaqs} conditionTitle={cond.title} />
        ) : null}

        {/* CTA contextual */}
        <div className="mt-12 p-8 bg-teal rounded-2xl text-center">
          <p className="text-white/80 text-[1.125rem] mb-4">
            Tem dúvidas sobre sua condição? Agende uma consulta para avaliação individualizada.
          </p>
          <Link
            href="/contato"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-[1.125rem] uppercase tracking-[0.5px] bg-white text-teal font-medium hover:bg-cream transition-colors"
          >
            Agendar Consulta
          </Link>
        </div>

        <DisclaimerBanner />
      </article>
    </div>
  );
}
