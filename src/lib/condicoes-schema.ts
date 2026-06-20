import { getCondicaoFaqs } from "@/lib/condicoes-faqs";
import { getCondicaoHowTo } from "@/lib/condicoes-howto";
import { SITE } from "@/lib/constants";
import { generateBlogPosting, generateFAQPage, generateHowTo } from "@/lib/schema";

type BuildCondicaoSchemasInput = {
  slug: string;
  title: string;
  directAnswer: string;
};

function medicalConditionNode(slug: string, title: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: title,
    description,
    medicalSpecialty: "Orthopedic",
    url: `${SITE.url}/condicoes/${slug}`,
  };
}

/** JSON-LD para páginas de condição: MedicalCondition + (BlogPosting + FAQPage)
 * para qualquer condição com FAQ + HowTo quando houver. BreadcrumbList fica em PageBreadcrumbs. */
export function buildCondicaoJsonLd({ slug, title, directAnswer }: BuildCondicaoSchemasInput): object[] {
  const faqs = getCondicaoFaqs(slug);
  const howTo = getCondicaoHowTo(slug);

  // Sem FAQ: só o nó de MedicalCondition.
  if (!faqs || faqs.length === 0) {
    return [medicalConditionNode(slug, title, directAnswer)];
  }

  const schemas: object[] = [
    generateBlogPosting({
      headline: title,
      description: directAnswer,
      path: `/condicoes/${slug}`,
    }),
    medicalConditionNode(slug, title, directAnswer),
    generateFAQPage(faqs),
  ];

  if (howTo) {
    schemas.push(
      generateHowTo({
        name: howTo.name,
        description: howTo.description,
        path: howTo.path,
        steps: howTo.steps,
        totalTime: howTo.totalTime,
      })
    );
  }

  return schemas;
}
