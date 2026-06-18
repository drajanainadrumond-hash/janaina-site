import { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Agende sua Consulta — Ortopedista em Belo Horizonte",
  description:
    "Agende sua consulta com a Dra. Janaína Drumond, ortopedista em Belo Horizonte. Atendimento exclusivamente particular.",
  path: "/contato",
});

export default function AgendePage() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-[100px] lg:pt-[140px] pb-12 px-6 text-center">
        <h1 className="font-heading text-[2rem] md:text-[3rem] font-light tracking-[2px] md:tracking-[3px] uppercase mb-2">
          Agende sua
          <em className="font-serif italic font-normal text-teal normal-case tracking-[-0.5px] block text-[2rem] md:text-[2.8rem]">
            consulta
          </em>
        </h1>
        <p className="text-[1.125rem] text-[#4A5E6B] max-w-[480px] mx-auto mt-4 leading-[1.8]">
          Preencha o formulário abaixo ou escolha o canal de sua preferência.
          Responderemos em até 24h.
        </p>
      </section>

      {/* Form + Info */}
      <section className="max-w-[900px] mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          {/* Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-lg font-normal tracking-[0.5px] mb-3">
                Consultório
              </h2>
              <p className="text-[1.125rem] text-[#4A5E6B] leading-[1.8]">
                Belo Horizonte, MG
                <br />
                Atendimento exclusivamente particular.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-normal tracking-[0.5px] mb-3">
                Canais de atendimento
              </h2>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://wa.me/5531992880728"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[1.125rem] text-[#4A5E6B] hover:text-teal transition-colors"
                  >
                    <span className="w-8 h-8 rounded-lg bg-teal-pale flex items-center justify-center text-teal text-sm">
                      💬
                    </span>
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+5531992880728"
                    className="flex items-center gap-3 text-[1.125rem] text-[#4A5E6B] hover:text-teal transition-colors"
                  >
                    <span className="w-8 h-8 rounded-lg bg-teal-pale flex items-center justify-center text-teal text-sm">
                      📞
                    </span>
                    Telefone
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contato@janainadrumond.com.br"
                    className="flex items-center gap-3 text-[1.125rem] text-[#4A5E6B] hover:text-teal transition-colors"
                  >
                    <span className="w-8 h-8 rounded-lg bg-teal-pale flex items-center justify-center text-teal text-sm">
                      ✉️
                    </span>
                    E-mail
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-teal-ghost p-6">
              <h3 className="font-heading text-sm font-normal tracking-[0.5px] mb-2 text-teal">
                Primeira consulta?
              </h3>
              <p className="text-[1.125rem] text-[#4A5E6B] leading-[1.7]">
                Traga exames anteriores (raio-X, ressonância, etc.) e uma lista
                dos medicamentos que usa. Isso agiliza o diagnóstico.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-cream-light rounded-3xl p-8 lg:p-10">
            <h2 className="font-heading text-[1.4rem] font-normal tracking-[0.5px] mb-2">
              Envie uma mensagem
            </h2>
            <p className="text-[1.125rem] text-[#4A5E6B] mb-8">
              Responderemos em até 24h.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
