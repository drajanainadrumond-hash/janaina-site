import { getCondicaoFaqs, isPriorityCondicao } from "@/lib/condicoes-faqs";
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

/** JSON-LD para páginas de condição (BlogPosting + FAQPage nas prioritárias). BreadcrumbList fica em PageBreadcrumbs. */
export function buildCondicaoJsonLd({ slug, title, directAnswer }: BuildCondicaoSchemasInput): object[] {
  const schemas: object[] = [medicalConditionNode(slug, title, directAnswer)];

  if (isPriorityCondicao(slug)) {
    const faqs = getCondicaoFaqs(slug)!;
    const howTo = getCondicaoHowTo(slug);
    const prioritySchemas: object[] = [
      generateBlogPosting({
        headline: title,
        description: directAnswer,
        path: `/condicoes/${slug}`,
      }),
      ...schemas,
      generateFAQPage(faqs),
    ];

    if (howTo) {
      prioritySchemas.push(
        generateHowTo({
          name: howTo.name,
          description: howTo.description,
          path: howTo.path,
          steps: howTo.steps,
          totalTime: howTo.totalTime,
        })
      );
    }

    return prioritySchemas;
  }

  return schemas;
}
