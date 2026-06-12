import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Sobre a Dra. Janaína Drumond — Ortopedista Mulher em BH",
  description:
    "Conheça a trajetória da Dra. Janaína Drumond. Graduação UFOP, residência Hospital Socor, pós-graduação em Cirurgia da Mão e Punho pela FCMMG. CRM-MG 69719 | RQE 50592. Ortopedista mulher em Belo Horizonte.",
  path: "/sobre",
});

export default function SobreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
