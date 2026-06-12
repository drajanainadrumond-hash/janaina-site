"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";
import type { FaqItem } from "@/lib/schema";
import { cn } from "@/lib/utils";

function FaqAccordionItem({ question, answer }: FaqItem) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-teal/[0.08]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-heading text-[1.05rem] text-teal tracking-[0.3px]">{question}</span>
        <ChevronDownIcon
          className={cn("w-5 h-5 text-teal-mid shrink-0 transition-transform", open && "rotate-180")}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          open ? "max-h-[500px] pb-5" : "max-h-0"
        )}
      >
        <p className="text-[1.125rem] text-[#4A5E6B] leading-[1.8] pr-6">{answer}</p>
      </div>
    </div>
  );
}

type Props = {
  faqs: FaqItem[];
  conditionTitle: string;
};

/** FAQ visível alinhado ao schema FAQPage (condições prioritárias). */
export function CondicaoFaqSection({ faqs, conditionTitle }: Props) {
  return (
    <section className="mt-14 pt-10 border-t border-cream-dark" aria-labelledby="condicao-faq-heading">
      <h2
        id="condicao-faq-heading"
        className="font-heading text-[1.5rem] md:text-[1.75rem] font-light tracking-[0.5px] text-teal mb-2"
      >
        Perguntas sobre {conditionTitle}
      </h2>
      <p className="text-[1.125rem] text-[#4A5E6B] mb-6 leading-relaxed">
        Respostas objetivas para as dúvidas mais comuns. Cada caso exige avaliação individual.
      </p>

      <div>
        {faqs.map((item) => (
          <FaqAccordionItem key={item.question} question={item.question} answer={item.answer} />
        ))}
      </div>

      <p className="mt-6">
        <Link href="/faq" className="text-[1.125rem] text-teal-mid hover:text-teal transition-colors">
          Ver FAQ completo →
        </Link>
      </p>
    </section>
  );
}
