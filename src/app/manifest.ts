import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.fullName,
    short_name: SITE.name,
    description:
      "Ortopedista e traumatologista em Belo Horizonte. Cirurgia da mão e punho. CRM-MG 69719 | RQE 50592.",
    start_url: "/",
    display: "standalone",
    background_color: "#003E51",
    theme_color: "#003E51",
    lang: "pt-BR",
    orientation: "portrait",
    icons: [
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
