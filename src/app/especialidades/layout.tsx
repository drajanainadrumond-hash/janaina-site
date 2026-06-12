import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Especialidades — Ortopedia Geral e Cirurgia da Mão em BH",
  description:
    "Ortopedia geral e cirurgia da mão e punho. Dra. Janaína Drumond — ortopedista em Belo Horizonte, pós-graduação em Cirurgia da Mão e Punho pela FCMMG.",
  path: "/especialidades",
});

export default function EspecialidadesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
