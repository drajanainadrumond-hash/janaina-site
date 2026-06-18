import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

type LeadData = {
  name: string;
  whatsapp: string;
  convenio: string;
  queixa: string;
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendContactEmail(data: LeadData) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY não configurada — email não enviado");
    return null;
  }

  const emailTo = process.env.EMAIL_TO || "drajanainadrumond@gmail.com";
  const emailFrom =
    process.env.EMAIL_FROM || "Site Dra. Janaína <contato@janainadrumond.com.br>";

  const safeName = escapeHtml(data.name);
  const safeWhatsapp = escapeHtml(data.whatsapp);
  const safeConvenio = escapeHtml(data.convenio);
  const safeQueixa = escapeHtml(data.queixa);

  const { error } = await resend.emails.send({
    from: emailFrom,
    to: emailTo,
    subject: `Nova solicitação de consulta — ${safeName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 500px;">
        <h2 style="color: #003E51; margin-bottom: 24px;">Nova solicitação de consulta</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #7A8E9B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Nome</td>
            <td style="padding: 8px 0; font-weight: 500;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #7A8E9B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">WhatsApp</td>
            <td style="padding: 8px 0;">${safeWhatsapp}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #7A8E9B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Convênio</td>
            <td style="padding: 8px 0;">${safeConvenio}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #7A8E9B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Queixa</td>
            <td style="padding: 8px 0;">${safeQueixa}</td>
          </tr>
        </table>
        <hr style="border: none; border-top: 1px solid #E6E5E2; margin: 24px 0;" />
        <p style="font-size: 12px; color: #85878B;">Enviado pelo site janainadrumond.com.br</p>
      </div>
    `,
  });

  if (error) {
    console.error("[email] Erro ao enviar:", error);
    throw error;
  }

  return true;
}

/**
 * Email de confirmação de inscrição na newsletter (double opt-in).
 * Enviado ao próprio inscrito; só após clicar no link a inscrição é confirmada.
 */
export async function sendNewsletterConfirmationEmail(
  email: string,
  confirmUrl: string
) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY não configurada — email não enviado");
    return null;
  }

  const emailFrom =
    process.env.EMAIL_FROM || "Site Dra. Janaína <contato@janainadrumond.com.br>";

  const safeUrl = escapeHtml(confirmUrl);

  const { error } = await resend.emails.send({
    from: emailFrom,
    to: email,
    subject: "Confirme sua inscrição na newsletter",
    html: `
      <div style="font-family: sans-serif; max-width: 500px; color: #003E51;">
        <h2 style="color: #003E51; margin-bottom: 16px;">Confirme sua inscrição</h2>
        <p style="font-size: 15px; line-height: 1.7; color: #4A5E6B;">
          Recebemos um pedido de inscrição na newsletter da Dra. Janaína Drumond
          com este endereço de e-mail. Para concluir, confirme clicando no botão
          abaixo:
        </p>
        <p style="margin: 28px 0;">
          <a href="${safeUrl}" style="display: inline-block; background: #00565B; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 999px; font-size: 15px;">
            Confirmar inscrição
          </a>
        </p>
        <p style="font-size: 13px; line-height: 1.7; color: #7A8E9B;">
          Se o botão não funcionar, copie e cole este endereço no navegador:<br />
          <span style="word-break: break-all;">${safeUrl}</span>
        </p>
        <p style="font-size: 13px; line-height: 1.7; color: #7A8E9B;">
          Este link expira em 24 horas. Se você não solicitou esta inscrição,
          basta ignorar este e-mail — nenhum dado será mantido.
        </p>
        <hr style="border: none; border-top: 1px solid #E6E5E2; margin: 24px 0;" />
        <p style="font-size: 12px; color: #85878B;">Enviado pelo site janainadrumond.com.br</p>
      </div>
    `,
  });

  if (error) {
    console.error("[email] Erro ao enviar confirmação de newsletter:", error);
    throw error;
  }

  return true;
}
