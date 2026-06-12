import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/home/hero";
import { HomeDepoimentos } from "@/components/home/home-depoimentos";
import { HomeFaq } from "@/components/home/home-faq";
import { HomeLocation } from "@/components/home/home-location";
import { Marquee } from "@/components/home/marquee";
import { HomeSchemas } from "@/components/seo/home-schemas";
import { getHomeFaqs } from "@/lib/faqs";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Dra. Janaína Drumond — Ortopedista em BH | Cirurgia de Mão e Punho",
  description:
    "Ortopedista e Traumatologista em Belo Horizonte com formação em Cirurgia da Mão e Punho. Diagnóstico preciso, atendimento humanizado. CRM-MG 69719 | RQE 50592. Agende sua consulta.",
  path: "/",
});

const BentoGrid = dynamic(
  () => import("@/components/home/bento-grid").then((m) => m.BentoGrid),
  { loading: () => <div className="py-24 bg-cream-light" /> }
);

const AboutSplit = dynamic(
  () => import("@/components/home/about-split").then((m) => m.AboutSplit),
  { loading: () => <div className="min-h-screen" /> }
);

export default async function Home() {
  const homeFaqs = await getHomeFaqs();

  return (
    <>
      <HomeSchemas homeFaqs={homeFaqs} />
      <Hero />
      <Marquee />
      <BentoGrid />
      <AboutSplit />
      <HomeDepoimentos />
      <HomeFaq faqs={homeFaqs} />
      <HomeLocation />
    </>
  );
}
