import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/lib/blog";
import { withHome } from "@/lib/breadcrumbs";
import { buildPageMetadata } from "@/lib/seo";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog — Ortopedia e Cirurgia da Mão | Dra. Janaína Drumond",
  description:
    "Artigos sobre ortopedia, cirurgia de mão e punho, prevenção e tratamento em Belo Horizonte. Conteúdo médico baseado em evidências.",
  path: "/blog",
});

function estimateReadTime(content?: string): number {
  if (!content) return 3;
  return Math.max(1, Math.ceil(content.replace(/<[^>]*>/g, "").split(/\s+/).length / 200));
}

export default async function BlogPage() {
  const posts = await getPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="relative overflow-hidden bg-cream-light/30">

      {/* ========= FEATURED — Full screen magazine cover ========= */}
      {featured && (
        <section className="relative lg:min-h-screen lg:overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-teal">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(10,110,117,0.5)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_80%,rgba(0,86,91,0.3)_0%,transparent_60%)]" />
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          {/* Content — coluna no mobile, magazine no desktop */}
          <div className="relative flex flex-col px-6 sm:px-8 lg:p-16 max-w-[1200px] mx-auto pt-[100px] pb-10 lg:min-h-screen lg:justify-end lg:pt-0 lg:pb-0">
            {/* Top bar — fora do link do artigo (evita <a> dentro de <a>) */}
            <div className="relative lg:absolute lg:top-[140px] lg:left-16 lg:right-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 lg:mb-0 z-10">
              <div className="min-w-0">
                <PageBreadcrumbs
                  variant="onDark"
                  className="mb-3"
                  items={withHome({ name: "Blog", href: "/blog" })}
                />
                <h1 className="font-heading text-[1.2rem] sm:text-[1.4rem] text-white/80 tracking-[4px] uppercase">
                  Blog
                </h1>
              </div>
              <span className="text-[1.125rem] text-white/20 tracking-[1px] hidden sm:inline">
                Scroll para mais artigos ↓
              </span>
            </div>

            <Link href={`/blog/${featured.slug}`} className="group block relative w-full lg:h-[calc(100vh-140px)] lg:flex lg:flex-col lg:justify-end">
            {/* Número decorativo — só desktop */}
            <div className="hidden lg:block absolute top-[35%] right-16 font-heading text-[20rem] font-extralight text-white/[0.03] leading-none select-none pointer-events-none">
              01
            </div>

            {/* Foto — fluxo normal no mobile (maior, estática) */}
            <div className="lg:hidden mx-auto w-full max-w-[300px] sm:max-w-[340px] mb-8 shrink-0">
              <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden border-2 border-white/[0.06] shadow-[0_16px_40px_rgba(0,0,0,0.3)]">
                <Image
                  src="/janaina-blog.jpg"
                  alt="Dra. Janaína Drumond"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 300px, 340px"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-teal/90 to-transparent p-4 pt-10">
                  <p className="text-[0.95rem] text-white/70 font-medium leading-tight">Dra. Janaína Drumond</p>
                  <p className="text-[0.85rem] text-white/60 leading-tight mt-0.5">Ortopedista · CRM-MG 69719</p>
                </div>
              </div>
            </div>

            {/* Foto — grande à direita, mais alta (magazine). Altura em vh: cabe sempre. */}
            <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 lg:-right-12">
              <div className="relative w-[560px] h-[62vh] max-h-[600px] rounded-3xl overflow-hidden border-2 border-white/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                <Image
                  src="/janaina-blog.jpg"
                  alt="Dra. Janaína Drumond"
                  fill
                  className="object-cover object-[center_22%]"
                  sizes="560px"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-teal/90 to-transparent p-4 pt-10">
                  <p className="text-[1.125rem] text-white/70 font-medium leading-tight">Dra. Janaína Drumond</p>
                  <p className="text-[1.125rem] text-white/60 leading-tight mt-0.5">Ortopedista · CRM-MG 69719</p>
                </div>
              </div>
            </div>

            {/* Floating orb */}
            <div className="absolute top-[60%] left-[60%] w-[80px] h-[80px] rounded-full bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.04] hidden lg:block" style={{ animation: "morph-a 12s ease-in-out infinite" }} />

            {/* Artigo em destaque */}
            <div className="relative max-w-[420px] lg:mb-16 lg:mt-auto">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 lg:mb-6">
                <span className="bg-white/10 text-white text-[0.85rem] sm:text-[1.125rem] px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full uppercase tracking-[1.5px] sm:tracking-[2px] border border-white/[0.08]">
                  {featured.category}
                </span>
                <span className="text-[0.85rem] sm:text-[1.125rem] text-white/40">{estimateReadTime(featured.content)} min</span>
                <span className="hidden sm:block w-1 h-1 rounded-full bg-white/15" />
                <span className="text-[0.85rem] sm:text-[1.125rem] text-white/40">
                  {new Date(featured.created_at).toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>

              <h2 className="font-heading text-[1.35rem] sm:text-[2.5rem] lg:text-[3.2rem] font-light text-white leading-[1.2] sm:leading-[1.1] tracking-[0.3px] sm:tracking-[0.5px] mb-4 lg:mb-5 group-hover:text-cream transition-colors duration-500">
                {featured.title}
              </h2>

              <p className="text-[0.9rem] sm:text-[1rem] text-white/60 leading-[1.7] sm:leading-[1.85] mb-6 lg:mb-8 max-w-[520px]">
                {featured.excerpt}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
                <span className="inline-flex w-fit items-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-[0.9rem] sm:text-[1.125rem] uppercase tracking-[0.5px] bg-white text-teal font-medium group-hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)] group-hover:-translate-y-0.5 transition-all duration-400">
                  Ler artigo completo
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal/10 flex items-center justify-center text-[0.85rem] sm:text-[1.125rem]">→</span>
                </span>

                <div className="hidden sm:block">
                  <p className="text-[1.125rem] text-white/65">Dra. Janaína</p>
                  <p className="text-[1.125rem] text-white/20">CRM-MG 69719</p>
                </div>
              </div>
            </div>
            </Link>
          </div>
        </section>
      )}

      {/* ========= BENTO GRID — Asymmetric magazine layout ========= */}
      <section className="max-w-[1100px] mx-auto px-6 py-16 lg:py-24">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-[1.125rem] uppercase tracking-[2.5px] text-teal-mid block mb-2">Mais artigos</span>
            <h2 className="font-heading text-[1.5rem] lg:text-[1.8rem] font-light tracking-[0.5px]">
              Conteúdo para sua saúde
            </h2>
          </div>
          <Link href="/condicoes" className="hidden sm:inline-flex items-center gap-2 text-[1.125rem] text-teal-mid/60 tracking-[0.5px] hover:text-teal transition-colors">
            Ver todas as condições →
          </Link>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
          {rest.map((post, i) => {
            const readTime = estimateReadTime(post.content);
            // Alternate between large and small cards
            const isLarge = i === 0 || i === 3;
            const isTall = i === 1;

            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,62,81,0.10)] ${
                  isLarge ? "md:col-span-2 md:row-span-1" : ""
                } ${isTall ? "md:row-span-2" : ""}`}
              >
                {/* Card with gradient background */}
                <div className={`h-full border border-teal/[0.04] rounded-2xl overflow-hidden ${
                  isLarge
                    ? "bg-teal text-white"
                    : "bg-white"
                }`}>
                  {/* Top accent */}
                  {!isLarge && <div className="h-[3px] bg-gradient-to-r from-teal to-teal-mid" />}

                  <div className={`h-full flex flex-col ${isLarge ? "p-5 sm:p-7 lg:p-10" : "p-5"} ${isTall ? "justify-between" : ""}`}>
                    {/* Header */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${isLarge ? "bg-white/30" : "bg-teal-mid/40"}`} />
                          <span className={`text-[1.125rem] uppercase tracking-[1.5px] ${isLarge ? "text-white/70" : "text-teal-mid/60"}`}>
                            {post.category}
                          </span>
                        </div>
                        <span className={`text-[1.125rem] ${isLarge ? "text-white/55" : "text-[#5A6B78]"}`}>
                          {readTime} min
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className={`font-heading font-normal leading-[1.25] mb-3 transition-colors duration-300 ${
                        isLarge
                          ? "text-[1.15rem] sm:text-[1.3rem] lg:text-[1.6rem] text-white group-hover:text-cream"
                          : "text-[1rem] text-teal group-hover:text-teal-mid"
                      }`}>
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className={`text-[1.125rem] leading-relaxed ${
                        isLarge
                          ? "text-white/60 max-w-[480px]"
                          : "text-[#4A5E6B] line-clamp-3"
                      } ${isTall ? "" : "line-clamp-3"}`}>
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className={`flex items-center justify-between mt-auto pt-5 ${isLarge ? "border-t border-white/[0.06]" : "border-t border-cream-light"}`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${isLarge ? "bg-white/10" : "bg-teal"}`}>
                          <span className={`text-[1.125rem] font-medium ${isLarge ? "text-white/60" : "text-white"}`}>JD</span>
                        </div>
                        <span className={`text-[1.125rem] ${isLarge ? "text-white/55" : "text-[#5A6B78]"}`}>
                          {new Date(post.created_at).toLocaleDateString("pt-BR", { day: "numeric", month: "short" })}
                        </span>
                      </div>

                      <span className={`inline-flex items-center gap-1.5 text-[1.125rem] transition-all duration-300 group-hover:gap-2.5 ${
                        isLarge
                          ? "text-white/65 group-hover:text-white"
                          : "text-teal-mid group-hover:text-teal"
                      }`}>
                        Ler
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[1.125rem] transition-all duration-300 ${
                          isLarge
                            ? "border border-white/[0.1] group-hover:bg-white group-hover:text-teal"
                            : "border border-teal/[0.1] group-hover:bg-teal group-hover:text-white group-hover:border-teal"
                        }`}>→</span>
                      </span>
                    </div>
                  </div>

                  {/* Large card decorative */}
                  {isLarge && (
                    <>
                      <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-white/[0.03] -translate-y-1/2 translate-x-1/3" />
                      <div className="absolute bottom-0 left-0 w-[150px] h-[150px] rounded-full bg-white/[0.02] translate-y-1/3 -translate-x-1/4" />
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ========= CTA — Newsletter style ========= */}
      <section className="max-w-[1100px] mx-auto px-6 pb-24">
        <div className="relative rounded-3xl bg-teal overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_80%_50%,rgba(0,86,91,0.5)_0%,transparent_60%)]" />
          <div className="absolute w-[250px] h-[250px] rounded-full bg-white/[0.03] -top-20 -left-10" />

          <div className="relative grid lg:grid-cols-[1.2fr_1fr] gap-8 p-8 lg:p-14 items-center">
            <div>
              <span className="text-[1.125rem] uppercase tracking-[2.5px] text-teal-pale/50 block mb-4">Atendimento</span>
              <h2 className="font-heading text-[1.5rem] lg:text-[2rem] font-light text-white leading-[1.2] tracking-[0.5px] mb-3">
                Cuide da sua saúde com quem entende
              </h2>
              <p className="text-[1.125rem] text-white/60 leading-[1.8] max-w-[400px]">
                Dra. Janaína Drumond — ortopedista em BH com formação em cirurgia da mão e punho.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
              <Link
                href="/contato"
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full text-[1.125rem] uppercase tracking-[0.5px] bg-white text-teal font-medium hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Agendar Consulta
                <span className="w-6 h-6 rounded-full bg-teal/10 flex items-center justify-center text-[1.125rem]">→</span>
              </Link>
              <a
                href="https://wa.me/5531992880728"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-[1.125rem] uppercase tracking-[0.5px] bg-transparent text-white/60 border border-white/[0.1] hover:border-white/25 hover:text-white transition-all duration-300"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
