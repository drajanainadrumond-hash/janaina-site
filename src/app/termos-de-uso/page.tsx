import { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Termos de Uso",
  description: `Termos de uso do site ${SITE.url}`,
  path: "/termos-de-uso",
});

export default function TermosPage() {
  return (
    <div className="pt-[100px] lg:pt-[140px] pb-24 px-6">
      <article className="max-w-[700px] mx-auto prose-custom">
        <h1 className="font-heading text-[2rem] font-light tracking-[2px] uppercase mb-8">
          Termos de
          <em className="font-serif italic font-normal text-teal normal-case tracking-[-0.5px] block text-[2.2rem]">
            Uso
          </em>
        </h1>

        <p className="text-[1.125rem] text-gray-brand mb-8">
          Última atualização: Março de 2026
        </p>

        <Section title="1. Aceitação dos termos">
          Ao acessar e utilizar este site, você concorda com estes termos de
          uso. Se não concordar, por favor não utilize o site.
        </Section>

        <Section title="2. Finalidade do site">
          Este site tem caráter exclusivamente informativo e educacional sobre
          ortopedia e traumatologia. O conteúdo não substitui consulta médica
          presencial, diagnóstico ou tratamento profissional.
        </Section>

        <Section title="3. Informações médicas">
          As informações disponíveis neste site são de natureza geral e não
          devem ser interpretadas como aconselhamento médico individualizado.
          Cada caso clínico é único e requer avaliação presencial por
          profissional habilitado.
        </Section>

        <Section title="4. Propriedade intelectual">
          Todo o conteúdo deste site — textos, imagens, logotipos, layout e
          design — é protegido por direitos autorais e pertence à{" "}
          {SITE.fullName}. É proibida a reprodução sem autorização prévia.
        </Section>

        <Section title="5. Agendamento e atendimento">
          O agendamento realizado através do site é uma solicitação de
          contato. A confirmação da consulta depende de disponibilidade de
          horário e será feita pela equipe de atendimento.
        </Section>

        <Section title="6. Responsabilidade profissional">
          {SITE.fullName} é médica regularmente inscrita no CRM-MG sob o
          número 69719, com registro de especialidade RQE 50592 em Ortopedia e
          Traumatologia.
        </Section>

        <Section title="7. Alterações nos termos">
          Estes termos podem ser atualizados periodicamente. A data da última
          atualização será sempre indicada no topo desta página.
        </Section>

        <Section title="8. Contato">
          Para dúvidas sobre estes termos, entre em contato pelo nosso
          formulário de contato ou WhatsApp.
        </Section>
      </article>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <h2 className="font-heading text-[1.1rem] font-normal tracking-[0.5px] mb-3">
        {title}
      </h2>
      <p className="text-[1.125rem] text-[#4A5E6B] leading-[1.8]">{children}</p>
    </div>
  );
}
