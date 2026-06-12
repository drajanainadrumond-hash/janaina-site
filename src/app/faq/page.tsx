import { FaqPageContent } from "@/components/faq/faq-page-content";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { SchemaFaq } from "@/components/seo/schema-faq";
import { withHome } from "@/lib/breadcrumbs";
import { getPublishedFaqs, groupFaqsByCategory, toFaqSchemaItems } from "@/lib/faqs";

export default async function FaqPage() {
  const faqs = await getPublishedFaqs();
  const categories = groupFaqsByCategory(faqs);
  const schemaItems = toFaqSchemaItems(faqs);

  return (
    <>
      <SchemaFaq items={schemaItems} />

      <section className="pt-[100px] lg:pt-[140px] pb-12 px-6">
        <div className="max-w-[700px] mx-auto mb-8">
          <PageBreadcrumbs items={withHome({ name: "Perguntas frequentes", href: "/faq" })} />
        </div>
        <div className="text-center">
          <h1 className="font-heading text-[2rem] md:text-[3rem] font-light tracking-[2px] md:tracking-[3px] uppercase mb-2">
            Perguntas
            <em className="font-serif italic font-normal text-teal normal-case tracking-[-0.5px] block text-[2rem] md:text-[2.8rem]">
              frequentes
            </em>
          </h1>
          <p className="text-[1.125rem] text-[#4A5E6B] max-w-[480px] mx-auto mt-4 leading-[1.8]">
            Tire suas dúvidas sobre consultas, procedimentos e tratamentos.
          </p>
        </div>
      </section>

      <FaqPageContent categories={categories} />
    </>
  );
}
