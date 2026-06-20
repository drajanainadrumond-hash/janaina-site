"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";
import type { FaqItem } from "@/lib/schema";
import { cn } from "@/lib/utils";

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-teal/[0.08]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-heading text-[1.05rem] text-teal tracking-[0.3px]">
          {question}
        </span>
        <ChevronDownIcon
          className={cn("w-5 h-5 text-teal-mid shrink-0 transition-transform", open && "rotate-180")}
        />
      </button>
      <div
        inert={!open}
        className={cn(
          "grid transition-all duration-300",
          open ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="text-[1.125rem] text-[#4A5E6B] leading-[1.8] pr-6">{answer}</p>
        </div>
      </div>
    </div>
  );
}

type Props = {
  faqs: FaqItem[];
};

export function HomeFaq({ faqs }: Props) {
  return (
    <section className="py-20 lg:py-28 px-6 bg-white">
      <div className="max-w-[700px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[1.125rem] uppercase tracking-[3px] text-teal-mid mb-3">
            Dúvidas frequentes
          </p>
          <h2 className="font-heading text-[1.8rem] md:text-[2.2rem] font-light tracking-[1px] uppercase text-teal">
            Perguntas rápidas
          </h2>
        </div>

        <div>
          {faqs.map((item) => (
            <FaqItem key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>

        <p className="mt-8 text-center">
          <Link
            href="/faq"
            className="text-[1.125rem] text-teal-mid hover:text-teal transition-colors"
          >
            Ver todas as perguntas →
          </Link>
        </p>
      </div>
    </section>
  );
}
