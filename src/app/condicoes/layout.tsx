import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Condições Tratadas — Túnel do Carpo, Dedo em Gatilho e Mais",
  description:
    "Conheça as condições ortopédicas tratadas pela Dra. Janaína Drumond em BH: síndrome do túnel do carpo, dedo em gatilho, rizartrose, fraturas, dor no ombro, joelho e coluna. Diagnóstico e tratamento especializado.",
  path: "/condicoes",
});

export default function CondicoesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
