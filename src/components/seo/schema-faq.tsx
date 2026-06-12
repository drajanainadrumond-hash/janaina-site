import { generateFAQPage, type FaqItem } from "@/lib/schema";
import { SchemaMarkup } from "@/components/seo/schema-markup";

type Props = {
  items: FaqItem[];
};

export function SchemaFaq({ items }: Props) {
  if (items.length === 0) return null;
  return <SchemaMarkup schema={generateFAQPage(items)} />;
}
