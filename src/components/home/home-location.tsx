import Link from "next/link";
import { ConsultorioMap } from "@/components/layout/consultorio-map";
import { SITE } from "@/lib/constants";

export function HomeLocation() {
  return (
    <section className="py-20 lg:py-28 px-6 bg-teal text-white">
      <div className="max-w-[1100px] mx-auto grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-[1.125rem] uppercase tracking-[3px] text-teal-pale/80 mb-3">
            Consultório
          </p>
          <h2 className="font-heading text-[1.8rem] md:text-[2.2rem] font-light tracking-[1px] uppercase leading-[1.15] mb-4">
            Atendimento em
            <em className="font-serif italic font-normal normal-case text-cream block tracking-[-0.5px]">
              Belo Horizonte
            </em>
          </h2>
          <p className="text-[1.125rem] text-white/70 leading-[1.8] mb-6 max-w-[400px]">
            {SITE.address.full}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/agende-sua-consulta"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-cream text-teal text-[1.125rem] hover:bg-white transition-colors"
            >
              Agendar consulta
            </Link>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/25 text-[1.125rem] text-white/90 hover:bg-white/10 transition-colors"
            >
              Fale conosco
            </Link>
          </div>
        </div>
        <ConsultorioMap className="rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.25)] [&_a]:text-teal-pale" />
      </div>
    </section>
  );
}
