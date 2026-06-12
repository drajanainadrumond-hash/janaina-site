import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Busca",
  description: "Busca interna no site da Dra. Janaína Drumond.",
  path: "/busca",
  noIndex: true,
});

export default function BuscaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
