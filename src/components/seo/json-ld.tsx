import { generatePhysician } from "@/lib/schema";
import { SchemaMarkup } from "@/components/seo/schema-markup";

export function JsonLd() {
  return <SchemaMarkup schema={generatePhysician()} />;
}
