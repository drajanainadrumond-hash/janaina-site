import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { TimelineFeed } from "@/components/condicoes/timeline-feed";
import { withHome } from "@/lib/breadcrumbs";
import { buildPageMetadata } from "@/lib/seo";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";

export const metadata: Metadata = buildPageMetadata({
  title: "Produção Científica — Dra. Janaína Drumond",
  description:
    "Artigo no Archives of Health Investigation (2023), apresentação no 21º Congresso Mineiro de Ortopedia (2018) e participação no PREVENTT. ORCID: 0000-0003-2579-0312.",
  path: "/sobre/publicacoes",
});

const CONTENT = `
<h2>Artigo em Periódico Indexado (2023)</h2>
<div style="background:#f8f7f4;border-radius:16px;padding:24px;border:1px solid #e0dfdb;margin-bottom:8px">
<p><strong>Periódico:</strong> Archives of Health Investigation.</p>
<p><strong>Ano:</strong> 2023.</p>
<p><strong>ORCID:</strong> <code>0000-0003-2579-0312</code>.</p>
</div>
<p><em>Archives of Health Investigation</em> é uma revista científica indexada voltada à pesquisa em saúde. A publicação neste periódico demonstra capacidade de produzir e comunicar conhecimento científico seguindo os padrões metodológicos exigidos pela comunidade acadêmica.</p>

<h2>Congresso Mineiro de Ortopedia e Traumatologia (2018)</h2>
<div style="background:#f8f7f4;border-radius:16px;padding:24px;border:1px solid #e0dfdb;margin-bottom:8px">
<p><strong>Título:</strong> "Taxas de consolidação e infecção em pacientes vítima de fratura exposta de ossos da perna, submetidos à síntese definitiva na urgência."</p>
<p><strong>Evento:</strong> 21º Congresso Mineiro de Ortopedia e Traumatologia.</p>
<p><strong>Tipo:</strong> Apresentação de trabalho científico.</p>
</div>
<p>Este trabalho aborda um tema de <strong>trauma ortopédico de alta complexidade</strong> — o manejo de fraturas expostas de tíbia e fíbula na urgência. A pesquisa analisou taxas de consolidação e infecção em pacientes submetidos à fixação definitiva no atendimento inicial, contribuindo para a discussão sobre timing cirúrgico em fraturas graves.</p>
<p>Apresentar em um congresso estadual de ortopedia durante a residência demonstra envolvimento ativo com pesquisa clínica aplicada — e experiência direta com casos de alta complexidade em trauma.</p>

<h2>Congresso Brasileiro de Extensão Universitária (2014)</h2>
<div style="background:#f8f7f4;border-radius:16px;padding:24px;border:1px solid #e0dfdb;margin-bottom:8px">
<p><strong>Título:</strong> "Programa de Extensão Universitária Vinculado à Pesquisa — Prevenção e Tratamento de Tendinopatias (PREVENTT)."</p>
<p><strong>Evento:</strong> VI Congresso Brasileiro de Extensão Universitária — Belém, PA.</p>
<p><strong>Coautores:</strong> Benevides, Fraga e Oliveira.</p>
<p><strong>Tipo:</strong> Apresentação em congresso nacional.</p>
</div>
<p>Trabalho apresentado durante a graduação na UFOP, resultado de 3 anos de participação no programa <strong>PREVENTT</strong> — dedicado à prevenção e reabilitação de tendinopatias em servidores federais. Esse programa foi o primeiro contato da Dra. Janaína com o sistema musculoesquelético e influenciou diretamente sua escolha pela ortopedia.</p>

<h2>Relevância para o paciente</h2>
<p>Por que isso importa para quem busca uma ortopedista? Porque uma médica que pesquisa, publica e participa de congressos está <strong>comprometida com atualização constante</strong>. Cada decisão clínica é informada não apenas pela experiência, mas também pela melhor evidência científica disponível. Para um campo como a ortopedia — onde novas técnicas cirúrgicas e protocolos de tratamento evoluem constantemente — isso se traduz em um atendimento mais seguro e eficaz.</p>

<h2>Saiba mais</h2>
<ul>
<li><a href="/sobre/formacao">Formação acadêmica completa da Dra. Janaína</a></li>
<li><a href="/especialidades/cirurgia-da-mao-e-punho">Cirurgia da Mão e Punho — área de atuação especializada</a></li>
<li><a href="/condicoes/fraturas">Fraturas — diagnóstico e tratamento</a></li>
</ul>
`;

export default function PublicacoesPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative bg-teal overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(0,86,91,0.35)_0%,transparent_60%)]" />

        <div className="relative pt-[120px] lg:pt-[160px] pb-12 lg:pb-16 px-6">
          <div className="max-w-[700px] mx-auto">
            <PageBreadcrumbs
              variant="onDark"
              className="mb-8"
              items={withHome(
                { name: "Sobre", href: "/sobre" },
                { name: "Produção científica", href: "/sobre/publicacoes" }
              )}
            />

            {/* Category */}
            <span className="inline-block bg-white/10 text-white text-[1.125rem] px-3 py-1 rounded-full uppercase tracking-[1.5px] border border-white/[0.08] mb-5">
              Ciência
            </span>

            {/* Title */}
            <h1 className="font-heading text-[1.8rem] sm:text-[2.2rem] md:text-[2.8rem] font-light text-white leading-[1.15] tracking-[0.5px] mb-5">
              Produção Científica
            </h1>

            {/* Excerpt */}
            <p className="text-[1.125rem] text-white/65 leading-[1.8] max-w-[560px] mb-8">
              Pesquisa aplicada à prática clínica — cada publicação reflete o compromisso com a ortopedia baseada em evidências.
            </p>

            {/* Author + Meta */}
            <div className="flex items-center gap-4 pt-6 border-t border-white/[0.06]">
              <div className="w-11 h-11 rounded-full bg-white/10 border border-white/[0.08] flex items-center justify-center overflow-hidden">
                <Image src="/logo-white.png" alt="" width={28} height={28} className="opacity-60" />
              </div>
              <div>
                <p className="text-[1.125rem] text-white/70 font-medium">Dra. Janaína Drumond</p>
                <div className="flex items-center gap-3 text-[1.125rem] text-white/60">
                  <span>ORCID: 0000-0003-2579-0312</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-[700px] mx-auto px-6 pt-10 pb-24">
        <TimelineFeed content={CONTENT} areaLabel="Produção Científica" />

        {/* CTA */}
        <div className="mt-14 p-8 bg-gradient-to-br from-teal to-teal-mid rounded-2xl text-center relative overflow-hidden">
          <div className="absolute w-[200px] h-[200px] rounded-full bg-white/[0.04] -top-10 -right-10" />
          <p className="text-white/70 text-[1.125rem] mb-2 relative z-10">
            Quer uma avaliação baseada em evidências?
          </p>
          <p className="text-white text-[1.125rem] font-medium mb-5 relative z-10">
            {"Agende sua consulta com a Dra.\u00A0Janaína"}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
            <Link
              href="/contato"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-[1.125rem] uppercase tracking-[0.5px] bg-white text-teal font-medium hover:bg-cream transition-colors"
            >
              Agendar Consulta
            </Link>
            <Link
              href="/sobre/formacao"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-[1.125rem] uppercase tracking-[0.5px] bg-transparent text-white/60 border border-white/[0.12] hover:border-white/30 hover:text-white transition-all"
            >
              Ver Formação
            </Link>
          </div>
        </div>

        {/* Author card */}
        <div className="mt-10 flex items-center gap-4 p-5 rounded-2xl bg-cream-light/60 border border-teal/[0.04]">
          <div className="w-14 h-14 rounded-full bg-teal flex items-center justify-center shrink-0">
            <Image src="/logo-white.png" alt="" width={32} height={32} className="opacity-70" />
          </div>
          <div>
            <p className="text-[1.125rem] font-medium text-teal">Dra. Janaína Drumond</p>
            <p className="text-[1.125rem] text-[#5A6B78] leading-relaxed mt-0.5">
              Ortopedista e Traumatologista em BH. Subespecialidade em Cirurgia da Mão e Punho. CRM-MG 69719 | RQE 50592.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
