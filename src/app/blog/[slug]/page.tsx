import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/lib/blog";
import { buildBlogDirectAnswer } from "@/lib/aeo";
import { AUTHOR_BYLINE } from "@/lib/author";
import { withHome } from "@/lib/breadcrumbs";
import { buildPageMetadata } from "@/lib/seo";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { AeoContentIntro } from "@/components/seo/aeo-content-intro";
import { TimelineFeed } from "@/components/condicoes/timeline-feed";
import { DisclaimerBanner } from "@/components/layout/disclaimer-banner";
import { generateBlogPosting, generateFAQPage } from "@/lib/schema";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post não encontrado" };

  const description = buildBlogDirectAnswer(post.excerpt, post.content ?? "");

  return buildPageMetadata({
    title: post.title,
    description,
    path: `/blog/${slug}`,
    ogImage: post.ogImage || "/janaina-blog.jpg",
  });
}

function estimateReadTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const readTime = post.content ? estimateReadTime(post.content) : 3;
  const directAnswer = buildBlogDirectAnswer(post.excerpt, post.content ?? "");
  const publishDate = new Date(post.created_at).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const articleSchema = generateBlogPosting({
    headline: post.title,
    description: directAnswer,
    path: `/blog/${post.slug}`,
    datePublished: post.created_at,
    dateModified: post.updated_at,
  });

  const faqSchema = post.faqs ? generateFAQPage(post.faqs) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero */}
      <div className="relative bg-teal overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(0,86,91,0.35)_0%,transparent_60%)]" />

        <div className="relative pt-[120px] lg:pt-[160px] pb-12 lg:pb-16 px-6">
          <div className="max-w-[1100px] mx-auto grid lg:grid-cols-[1fr_400px] gap-12 items-center">
            <div>
              <PageBreadcrumbs
                variant="onDark"
                className="mb-8"
                items={withHome(
                  { name: "Blog", href: "/blog" },
                  { name: post.title, href: `/blog/${post.slug}` }
                )}
              />

              {/* Category */}
              <span className="inline-block bg-white/10 text-white text-[1.125rem] px-3 py-1 rounded-full uppercase tracking-[1.5px] border border-white/[0.08] mb-5">
                {post.category}
              </span>

              {/* Title */}
              <h1 className="font-heading text-[1.8rem] sm:text-[2.2rem] md:text-[2.8rem] font-light text-white leading-[1.15] tracking-[0.5px] mb-5">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-[1.125rem] text-white/65 leading-[1.8] max-w-[560px] mb-8">
                {post.excerpt}
              </p>

              {/* Author + Meta */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/[0.06]">
                <div className="w-11 h-11 rounded-full bg-white/10 border border-white/[0.08] flex items-center justify-center overflow-hidden">
                  <Image src="/logo-white.png" alt="" width={28} height={28} className="opacity-60" />
                </div>
                <div>
                  <p className="text-[1.125rem] text-white/70 font-medium">Dra. Janaína Drumond</p>
                  <div className="flex items-center gap-3 text-[1.125rem] text-white/60">
                    <span>{publishDate}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{readTime} min de leitura</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {post.ogImage && (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass p-4 group">
                <Image
                  src={post.ogImage}
                  alt={post.title}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-[700px] mx-auto px-6 pt-10 pb-24">
        <AeoContentIntro directAnswer={directAnswer} pageTitle={post.title} />

        {post.content ? (
          <TimelineFeed content={post.content} areaLabel={post.category} />
        ) : (
          <div className="bg-cream-light rounded-2xl p-8 text-center">
            <p className="text-[1.125rem] text-[#4A5E6B] mb-4">
              Artigo completo em breve.
            </p>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm bg-teal text-white hover:bg-teal-mid transition-colors uppercase"
            >
              Agendar Consulta
            </Link>
          </div>
        )}

        {/* CTA */}
        <div className="mt-14 p-8 bg-gradient-to-br from-teal to-teal-mid rounded-2xl text-center relative overflow-hidden">
          {/* Decorative orb */}
          <div className="absolute w-[200px] h-[200px] rounded-full bg-white/[0.04] -top-10 -right-10" />

          <p className="text-white/70 text-[1.125rem] mb-2 relative z-10">
            Tem duvidas sobre este assunto?
          </p>
          <p className="text-white text-[1.125rem] font-medium mb-5 relative z-10">
            Agende uma consulta com a Dra. Janaína
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
            <Link
              href="/contato"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-[1.125rem] uppercase tracking-[0.5px] bg-white text-teal font-medium hover:bg-cream transition-colors"
            >
              Agendar Consulta
            </Link>
            <Link
              href="/condicoes"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-[1.125rem] uppercase tracking-[0.5px] bg-transparent text-white/60 border border-white/[0.12] hover:border-white/30 hover:text-white transition-all"
            >
              Ver Condições
            </Link>
          </div>
        </div>

        <DisclaimerBanner />

        {/* Author card */}
        <div className="mt-10 flex items-center gap-4 p-5 rounded-2xl bg-cream-light/60 border border-teal/[0.04]">
          <div className="w-14 h-14 rounded-full bg-teal flex items-center justify-center shrink-0">
            <Image src="/logo-white.png" alt="" width={32} height={32} className="opacity-70" />
          </div>
          <div>
            <p className="text-[1.125rem] font-medium text-teal">Dra. Janaína Drumond</p>
            <p className="text-[1.125rem] text-[#5A6B78] leading-relaxed mt-0.5">
              {AUTHOR_BYLINE}
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
