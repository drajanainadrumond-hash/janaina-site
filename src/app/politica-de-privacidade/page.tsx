import { Metadata } from "next";
import { SITE, CONTACT } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Política de Privacidade",
  description: `Política de privacidade do site ${SITE.url}`,
  path: "/politica-de-privacidade",
});

export default function PoliticaPage() {
  return (
    <div className="pt-[100px] lg:pt-[140px] pb-24 px-6">
      <article className="max-w-[700px] mx-auto prose-custom">
        <h1 className="font-heading text-[2rem] font-light tracking-[2px] uppercase mb-8">
          Política de
          <em className="font-serif italic font-normal text-teal normal-case tracking-[-0.5px] block text-[2.2rem]">
            Privacidade
          </em>
        </h1>

        <p className="text-[1.125rem] text-gray-brand mb-8">
          Última atualização: Março de 2026
        </p>

        <Section title="1. Identificação do controlador">
          O controlador dos dados pessoais coletados por este site é a{" "}
          <strong>Dra. Janaína Drumond Rocha Fraga</strong>, médica inscrita no
          CRM-MG sob o n.º 69719, RQE 50592, com consultório em Belo Horizonte,
          MG. Para questões relacionadas a dados pessoais, entre em contato pelo
          e-mail{" "}
          <a href={`mailto:${CONTACT.email}`} className="text-teal underline underline-offset-2">
            {CONTACT.email}
          </a>.
        </Section>

        <Section title="2. Encarregado de proteção de dados (DPO)">
          O encarregado pelo tratamento de dados pessoais pode ser contatado pelo
          e-mail{" "}
          <a href={`mailto:${CONTACT.email}`} className="text-teal underline underline-offset-2">
            {CONTACT.email}
          </a>{" "}
          com o assunto &ldquo;LGPD&rdquo;. Esse canal é exclusivo para exercício
          dos direitos do titular de dados e demais solicitações previstas na Lei
          13.709/2018 (LGPD).
        </Section>

        <Section title="3. Dados pessoais coletados">
          Coletamos as seguintes informações quando você preenche o formulário de
          contato do site:
          <br /><br />
          <strong>Dados pessoais:</strong> nome completo, número de WhatsApp e
          convênio.
          <br />
          <strong>Dados pessoais sensíveis (saúde):</strong> descrição da queixa
          médica informada no campo &ldquo;Sua queixa&rdquo;.
          <br />
          <strong>Dados técnicos:</strong> endereço IP (para fins de segurança e
          prevenção de abuso).
          <br /><br />
          <strong>Cookies e rastreamento:</strong> utilizamos o Google Tag Manager
          (GTM) para fins analíticos. Esses scripts <strong>só são carregados após
          seu consentimento expresso</strong>, via o banner de cookies exibido em
          sua primeira visita. Cookies essenciais (necessários ao funcionamento do
          site) não requerem consentimento.
        </Section>

        <Section title="4. Finalidade e base legal do tratamento">
          <strong>Agendamento de consultas:</strong> seus dados pessoais e de saúde
          são utilizados exclusivamente para viabilizar o contato e agendamento de
          consulta com a Dra. Janaína. Base legal: consentimento específico e
          destacado do titular (Art. 11, I da LGPD), obtido por meio do checkbox no
          formulário de contato.
          <br /><br />
          <strong>Segurança e prevenção de abuso:</strong> o endereço IP é coletado
          para limitar requisições abusivas (rate limiting). Base legal: legítimo
          interesse do controlador (Art. 7, IX da LGPD).
          <br /><br />
          <strong>Análise de uso do site:</strong> dados de navegação coletados pelo
          Google Analytics (via GTM), apenas após consentimento. Base legal:
          consentimento (Art. 7, I da LGPD).
          <br /><br />
          <strong>Envio de e-mail de notificação:</strong> os dados do formulário
          são enviados por e-mail à Dra. Janaína para que ela possa retornar o
          contato. Base legal: consentimento (Art. 7, I e Art. 11, I da LGPD).
        </Section>

        <Section title="5. Compartilhamento de dados com terceiros">
          Seus dados pessoais podem ser compartilhados com os seguintes operadores
          / subprocessadores, exclusivamente para as finalidades descritas:
          <br /><br />
          <strong>Supabase Inc. (EUA):</strong> armazenamento dos dados do
          formulário em banco de dados em nuvem. A Supabase implementa medidas de
          segurança incluindo criptografia em trânsito e em repouso.
          <br />
          <strong>Resend Inc. (EUA):</strong> envio de e-mail de notificação à
          Dra. Janaína quando um formulário é preenchido.
          <br />
          <strong>Google LLC (EUA):</strong> análise de uso do site via Google Tag
          Manager / Google Analytics, apenas após consentimento do usuário.
          <br />
          <strong>WhatsApp / Meta Platforms (EUA):</strong> ao enviar o formulário,
          você é redirecionado ao WhatsApp para iniciar a conversa. A partir desse
          ponto, aplicam-se os termos e política de privacidade da Meta Platforms.
          <br /><br />
          <strong>Não vendemos, alugamos ou cedemos seus dados pessoais a
          terceiros</strong> para fins de marketing ou publicidade.
        </Section>

        <Section title="6. Transferência internacional de dados">
          Alguns dos operadores mencionados na seção 5 estão localizados nos
          Estados Unidos da América. A transferência internacional de dados ocorre
          com base no Art. 33 da LGPD e adotamos salvaguardas como o uso de
          provedores que aderem a padrões de proteção de dados reconhecidos
          internacionalmente (como SOC 2 Type II e cláusulas contratuais padrão).
        </Section>

        <Section title="7. Tempo de retenção dos dados">
          Os dados pessoais coletados via formulário de contato são armazenados
          pelo prazo de <strong>12 (doze) meses</strong> a partir da data de
          envio. Após esse período, os dados são eliminados ou anonimizados,
          exceto quando a retenção for necessária para cumprimento de obrigação
          legal ou regulatória.
        </Section>

        <Section title="8. Seus direitos como titular de dados">
          Nos termos do Art. 18 da LGPD, você tem os seguintes direitos:
          <br /><br />
          <strong>I.</strong> Confirmação da existência de tratamento;
          <br />
          <strong>II.</strong> Acesso aos seus dados pessoais;
          <br />
          <strong>III.</strong> Correção de dados incompletos, inexatos ou
          desatualizados;
          <br />
          <strong>IV.</strong> Anonimização, bloqueio ou eliminação de dados
          desnecessários, excessivos ou tratados em desconformidade;
          <br />
          <strong>V.</strong> Portabilidade dos dados a outro fornecedor de
          serviço;
          <br />
          <strong>VI.</strong> Eliminação dos dados tratados com base no
          consentimento;
          <br />
          <strong>VII.</strong> Informação sobre o compartilhamento de dados com
          terceiros;
          <br />
          <strong>VIII.</strong> Informação sobre a possibilidade de não fornecer o
          consentimento e sobre as consequências da negativa;
          <br />
          <strong>IX.</strong> Revogação do consentimento a qualquer momento.
          <br /><br />
          Para exercer qualquer desses direitos, envie um e-mail para{" "}
          <a href={`mailto:${CONTACT.email}`} className="text-teal underline underline-offset-2">
            {CONTACT.email}
          </a>{" "}
          com o assunto &ldquo;LGPD — Exercício de Direitos&rdquo;. Responderemos
          em até 15 (quinze) dias úteis.
        </Section>

        <Section title="9. Segurança dos dados">
          Adotamos medidas técnicas e organizacionais adequadas para proteger seus
          dados pessoais, incluindo: transmissão via HTTPS (TLS), armazenamento em
          banco de dados com criptografia, controle de acesso restrito e rate
          limiting para prevenção de abuso. No entanto, nenhum sistema é 100%
          seguro e não podemos garantir a segurança absoluta dos dados.
        </Section>

        <Section title="10. Cookies">
          <strong>Cookies essenciais:</strong> utilizados para o funcionamento
          básico do site (preferência de consentimento de cookies). Não requerem
          consentimento.
          <br /><br />
          <strong>Cookies analíticos (Google Analytics via GTM):</strong> coletam
          dados de navegação de forma agregada para entender como os visitantes
          utilizam o site. <strong>Só são ativados após consentimento expresso</strong>{" "}
          no banner de cookies. Você pode alterar sua preferência a qualquer
          momento limpando os dados do site no navegador.
        </Section>

        <Section title="11. Alterações nesta política">
          Esta política poderá ser atualizada periodicamente. A data da última
          atualização será sempre indicada no topo desta página. Recomendamos que
          você consulte esta página regularmente.
        </Section>

        <Section title="12. Legislação aplicável e foro">
          Esta política é regida pelas leis da República Federativa do Brasil, em
          especial a Lei 13.709/2018 (LGPD). Fica eleito o foro da Comarca de
          Belo Horizonte, MG, para dirimir quaisquer questões relacionadas a esta
          política.
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
