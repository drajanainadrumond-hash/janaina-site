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
