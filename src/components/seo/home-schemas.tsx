import { generateFAQPage, generateMedicalBusiness, type FaqItem } from "@/lib/schema";
import { SchemaMarkup } from "@/components/seo/schema-markup";

type Props = {
  homeFaqs: FaqItem[];
};

export function HomeSchemas({ homeFaqs }: Props) {
  return (
    <>
      <SchemaMarkup schema={generateMedicalBusiness()} />
      {homeFaqs.length > 0 ? (
        <SchemaMarkup schema={generateFAQPage(homeFaqs)} />
      ) : null}
    </>
  );
}
