"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { FloatingOrbs } from "@/components/ui/floating-orbs";
import { DisclaimerBanner } from "@/components/layout/disclaimer-banner";
import { cn } from "@/lib/utils";
import type { FaqCategoryGroup } from "@/lib/faqs";

function FaqAccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-cream-dark">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={open}
      >
        <span className="font-heading text-[1.125rem] font-normal tracking-[0.3px] pr-4 group-hover:text-teal transition-colors">
          {question}
        </span>
        <ChevronDownIcon
          className={cn(
            "h-5 w-5 shrink-0 text-gray-brand transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300",
          open ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="text-[1.125rem] text-[#4A5E6B] leading-[1.8] pr-10">{answer}</p>
        </div>
      </div>
    </div>
  );
}

type Props = {
  categories: FaqCategoryGroup[];
};

export function FaqPageContent({ categories }: Props) {
  return (
    <div className="relative overflow-hidden">
      <FloatingOrbs />

      <section className="max-w-[700px] mx-auto px-6 pb-24">
        {categories.map((category) => (
          <div key={category.title} className="mb-10">
            <h2 className="font-heading text-[1.1rem] font-normal tracking-[0.5px] text-teal uppercase mb-4 mt-8">
              {category.title}
            </h2>
            {category.items.map((item) => (
              <FaqAccordionItem key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        ))}

        <DisclaimerBanner />
      </section>
    </div>
  );
}
