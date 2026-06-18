import { CONTACT, SITE, SOCIAL } from "@/lib/constants";
import { absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";

/** Savassi — Av. do Contorno (aproximado para schema LocalBusiness). */
const GEO = {
  latitude: -19.932,
  longitude: -43.938,
};

export type FaqItem = { question: string; answer: string };

export type BreadcrumbItem = {
  name: string;
  href: string;
};

export function generateBreadcrumbList(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function generateMedicalBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "Physician"],
    name: SITE.fullName,
    description:
      "Ortopedista e traumatologista em Belo Horizonte com atuação em condições da mão e punho. Diagnóstico preciso, atendimento humanizado. CRM-MG 69719 | RQE 50592.",
    url: SITE.url,
    telephone: CONTACT.phone,
    medicalSpecialty: "Orthopedic",
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.zip,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    availableService: [
      { "@type": "MedicalTherapy", name: "Tratamento da Síndrome do Túnel do Carpo" },
      { "@type": "MedicalTherapy", name: "Tratamento de Dedo em Gatilho" },
      { "@type": "MedicalTherapy", name: "Tratamento de Rizartrose" },
      { "@type": "MedicalTherapy", name: "Tratamento de Fraturas da Mão e Punho" },
      { "@type": "MedicalTherapy", name: "Avaliação Ortopédica de Mão e Punho" },
    ],
    priceRange: "$$",
    sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.doctoralia, SOCIAL.linkedin, SOCIAL.youtube].filter(
      (url) => url !== "#"
    ),
  };
}

export function generatePhysician() {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: SITE.fullName,
    description: `Ortopedista e Traumatologista em ${SITE.city} com pós-graduação em Mão e Punho.`,
    url: SITE.url,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    telephone: CONTACT.phone,
    medicalSpecialty: "Orthopedic",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.zip,
      addressCountry: "BR",
    },
    sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.doctoralia, SOCIAL.linkedin, SOCIAL.youtube].filter(
      (url) => url !== "#"
    ),
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "CRM",
        identifier: "69719",
        recognizedBy: { "@type": "Organization", name: "CRM-MG" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "RQE",
        identifier: "50592",
        recognizedBy: { "@type": "Organization", name: "CFM" },
      },
    ],
  };
}

export function generateFAQPage(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export type BlogPostingInput = {
  headline: string;
  description: string;
  /** Caminho da rota, ex.: `/condicoes/sindrome-do-tunel-do-carpo`. */
  path: string;
  datePublished?: string;
  dateModified?: string;
};

/** Artigo médico educativo — condições prioritárias e blog (AEO). */
export function generateBlogPosting({
  headline,
  description,
  path,
  datePublished = "2026-02-01",
  dateModified = "2026-05-28",
}: BlogPostingInput) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    url,
    inLanguage: "pt-BR",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Physician",
      name: SITE.fullName,
      url: absoluteUrl("/sobre"),
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(DEFAULT_OG_IMAGE),
      },
    },
    datePublished,
    dateModified,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    medicalAudience: { "@type": "PatientAudience" },
    about: {
      "@type": "MedicalCondition",
      name: headline,
    },
  };
}

export type HowToStep = {
  name: string;
  text: string;
};

export type HowToInput = {
  name: string;
  description: string;
  path: string;
  steps: HowToStep[];
  /** Duração total ISO 8601, ex.: PT20M, PT30M. */
  totalTime?: string;
};

/** Passo a passo educativo — AEO (condições piloto). */
export function generateHowTo({ name, description, path, steps, totalTime }: HowToInput) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    url,
    inLanguage: "pt-BR",
    totalTime,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
    author: {
      "@type": "Physician",
      name: SITE.fullName,
      url: absoluteUrl("/sobre"),
    },
  };
}
