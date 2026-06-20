import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { TimelineFeed } from "@/components/condicoes/timeline-feed";
import { withHome } from "@/lib/breadcrumbs";
import { buildPageMetadata } from "@/lib/seo";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";

export const metadata: Metadata = buildPageMetadata({
  title: "Formação Acadêmica — Dra. Janaína Drumond",
  description:
    "Graduação em Medicina pela UFOP, residência no Hospital Socor (BH), pós-graduação em Cirurgia da Mão e Punho pela FCMMG. Monitoria em Anatomia, programa PREVENTT e Liga Acadêmica.",
  path: "/sobre/formacao",
});

const CONTENT = `
<h2>Medicina — UFOP (2010-2016)</h2>
<p>A Dra. Janaína graduou-se em <strong>Medicina pela Universidade Federal de Ouro Preto (UFOP)</strong>. Antes de ingressar em Medicina, cursou 3 períodos de Farmácia na mesma universidade — uma transição que reflete clareza vocacional e contato precoce com as ciências da saúde.</p>
<p>Durante a graduação, manteve uma trajetória acadêmica ativa que já apontava para a ortopedia:</p>
<h3>Programa PREVENTT (2012-2015)</h3>
<p>Três anos no programa de <strong>Prevenção e Tratamento de Tendinopatias</strong> da UFOP, voltado à reabilitação preventiva do aparelho locomotor de servidores federais. <strong>Bolsista MEC em 2013.</strong></p>
<p>Esse envolvimento precoce com o sistema musculoesquelético — exatamente o campo da ortopedia — moldou sua escolha pela especialidade. O programa era coordenado pelo Prof. Dr. Gustavo Pereira Benevides, vinculado à Pró-Reitoria de Extensão da UFOP e ao SIASS/Inconfidentes.</p>
<h3>Monitorias Acadêmicas</h3>
<ul>
<li><strong>Anatomia Humana Básica:</strong> Base fundamental para qualquer cirurgião — o domínio anatômico que sustenta cada procedimento que realiza hoje. A mão humana tem 27 ossos, dezenas de tendões e múltiplos nervos em um espaço mínimo — conhecimento anatômico relevante para a prática cirúrgica.</li>
<li><strong>Psicopatologia e Semiologia dos Transtornos Mentais:</strong> Formação que contribui para um atendimento humanizado — sensibilidade genuína para os aspectos emocionais do paciente ortopédico, que frequentemente enfrenta medo de cirurgia, ansiedade sobre recuperação e impacto na vida profissional.</li>
</ul>
<h3>Liga Acadêmica</h3>
<p>Membro da diretoria da <strong>Liga Acadêmica de Medicina Legal (LAMEL)</strong> da UFOP — demonstrando liderança e engajamento acadêmico desde a graduação.</p>

<h2>Residência — Hospital Socor, BH</h2>
<p>A residência médica em <strong>Ortopedia e Traumatologia</strong> foi realizada no <strong>Hospital Socor</strong>, em Belo Horizonte — instituição credenciada pela <strong>SBOT (Sociedade Brasileira de Ortopedia e Traumatologia)</strong>. É onde se consolida a formação clínica e cirúrgica, com alto volume de atendimentos em pronto-socorro, ambulatório e centro cirúrgico.</p>
<p>O RQE 50592 em Ortopedia e Traumatologia, obtido ao concluir a residência, é o registro que habilita legalmente o exercício da especialidade.</p>

<h2>Pós-Graduação em Mão e Punho — FCMMG (2021-2023)</h2>
<p>A formação especializada em <strong>Cirurgia da Mão e Punho</strong> foi realizada na <strong>Faculdade Ciências Médicas de Minas Gerais (FCMMG)</strong>, totalizando <strong>5.780 horas</strong> de dedicação entre 2021 e 2023.</p>
<p>Essa combinação — ortopedia ampla + mão especializada — permite atender de forma abrangente pacientes com diversas condições ortopédicas, do ombro ao punho.</p>

<h2>Treinamento em Cadáveres — ITC BH (2022)</h2>
<p>Em agosto de 2022, a Dra. Janaína participou do curso <strong>"Retalhos para os Membros Superiores"</strong>, realizado no <strong>ITC BH (Instituto de Treinamento em Cadáveres de Belo Horizonte)</strong>, com carga horária de <strong>11 horas</strong>.</p>
<p>O treinamento em peças anatômicas é uma etapa avançada da formação cirúrgica — permite aperfeiçoar técnicas de retalhos e reconstrução de membros superiores com realismo que simuladores não oferecem. É o tipo de capacitação que diferencia cirurgiões com domínio anatômico aprofundado.</p>

<h2>Saiba mais</h2>
<ul>
<li><a href="/especialidades/ortopedia-geral">Ortopedia Geral — todas as condições que trato</a></li>
<li><a href="/especialidades/cirurgia-da-mao-e-punho">Cirurgia da Mão e Punho — área de atuação</a></li>
<li><a href="/sobre/publicacoes">Produção científica da Dra. Janaína</a></li>
</ul>
`;

export default function FormacaoPage() {
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
                { name: "Formação acadêmica", href: "/sobre/formacao" }
              )}
            />

            {/* Category */}
            <span className="inline-block bg-white/10 text-white text-[1.125rem] px-3 py-1 rounded-full uppercase tracking-[1.5px] border border-white/[0.08] mb-5">
              Trajetória
            </span>

            {/* Title */}
            <h1 className="font-heading text-[1.8rem] sm:text-[2.2rem] md:text-[2.8rem] font-light text-white leading-[1.15] tracking-[0.5px] mb-5">
              Formação Acadêmica
            </h1>

            {/* Excerpt */}
            <p className="text-[0.95rem] sm:text-[1.125rem] text-white/65 leading-[1.7] sm:leading-[1.8] max-w-[560px] mb-8">
              Da graduação na UFOP à pós-graduação em Cirurgia da Mão e Punho pela FCMMG — cada etapa construiu a base para um atendimento preciso e humanizado.
            </p>

            {/* Author + Meta */}
            <div className="flex items-center gap-4 pt-6 border-t border-white/[0.06]">
              <div className="w-11 h-11 rounded-full bg-white/10 border border-white/[0.08] flex items-center justify-center overflow-hidden">
                <Image src="/logo-white.png" alt="" width={28} height={28} className="opacity-60" />
              </div>
              <div>
                <p className="text-[1.125rem] text-white/70 font-medium">Dra. Janaína Drumond</p>
                <div className="flex items-center gap-3 text-[1.125rem] text-white/60">
                  <span>CRM-MG 69719</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>RQE 50592</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-[700px] mx-auto px-6 pt-10 pb-24">
        <TimelineFeed content={CONTENT} areaLabel="Trajetória" />

        {/* CTA */}
        <div className="mt-14 p-8 bg-gradient-to-br from-teal to-teal-mid rounded-2xl text-center relative overflow-hidden">
          <div className="absolute w-[200px] h-[200px] rounded-full bg-white/[0.04] -top-10 -right-10" />
          <p className="text-white/70 text-[1.125rem] mb-2 relative z-10">
            Quer conhecer melhor meu trabalho?
          </p>
          <p className="text-white text-[1.125rem] font-medium mb-5 relative z-10">
            {"Agende uma consulta com a Dra.\u00A0Janaína"}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
            <Link
              href="/contato"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-[1.125rem] uppercase tracking-[0.5px] bg-white text-teal font-medium hover:bg-cream transition-colors"
            >
              Agendar Consulta
            </Link>
            <Link
              href="/sobre/publicacoes"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-[1.125rem] uppercase tracking-[0.5px] bg-transparent text-white/60 border border-white/[0.12] hover:border-white/30 hover:text-white transition-all"
            >
              Ver Publicações
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
