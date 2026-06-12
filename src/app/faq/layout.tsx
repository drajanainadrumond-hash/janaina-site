import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Perguntas Frequentes — Consulta, Cirurgia de Mão, Convênios",
  description:
    "Tire suas dúvidas sobre consulta ortopédica, cirurgia de mão e punho, túnel do carpo, dedo em gatilho, recuperação e convênios aceitos. Dra. Janaína Drumond — BH.",
  path: "/faq",
});

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
