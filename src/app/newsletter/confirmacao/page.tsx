import { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Confirmação de inscrição",
  description: "Confirmação de inscrição na newsletter da Dra. Janaína Drumond.",
  path: "/newsletter/confirmacao",
  noIndex: true,
});

type Status = "sucesso" | "expirado" | "invalido" | "erro";

const MESSAGES: Record<Status, { title: string; body: string }> = {
  sucesso: {
    title: "Inscrição confirmada",
    body: "Pronto! Seu e-mail foi confirmado e você passa a receber as novidades e conteúdos da Dra. Janaína Drumond. Obrigado por se inscrever.",
  },
  expirado: {
    title: "Link expirado",
    body: "Este link de confirmação expirou. Por segurança, ele vale por 24 horas. Faça a inscrição novamente para receber um novo e-mail de confirmação.",
  },
  invalido: {
    title: "Link inválido",
    body: "Não conseguimos validar este link de confirmação. Ele pode já ter sido usado ou estar incompleto. Tente se inscrever novamente.",
  },
  erro: {
    title: "Algo deu errado",
    body: "Ocorreu um erro ao confirmar sua inscrição. Por favor, tente novamente em alguns instantes.",
  },
};

export default async function NewsletterConfirmacaoPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const key: Status =
    status === "sucesso" || status === "expirado" || status === "erro"
      ? status
      : "invalido";
  const { title, body } = MESSAGES[key];

  return (
    <div className="pt-[100px] lg:pt-[140px] pb-24 px-6">
      <article className="max-w-[700px] mx-auto prose-custom text-center">
        <h1 className="font-heading text-[2rem] font-light tracking-[2px] uppercase mb-8">
          Newsletter
          <em className="font-serif italic font-normal text-teal normal-case tracking-[-0.5px] block text-[2.2rem]">
            {title}
          </em>
        </h1>

        <p className="text-[1.125rem] text-[#4A5E6B] leading-[1.8] mb-10">
          {body}
        </p>

        <Link
          href="/"
          className="inline-block py-2.5 px-8 rounded-full text-[1.125rem] tracking-[0.3px] bg-teal text-white hover:bg-teal-mid transition-colors"
        >
          Voltar ao início
        </Link>
      </article>
    </div>
  );
}
