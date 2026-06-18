import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Perguntas Frequentes — Consulta, Mão e Punho",
  description:
    "Tire suas dúvidas sobre consulta ortopédica, condições da mão e punho, túnel do carpo, dedo em gatilho e recuperação. Dra. Janaína Drumond — BH.",
  path: "/faq",
});

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
