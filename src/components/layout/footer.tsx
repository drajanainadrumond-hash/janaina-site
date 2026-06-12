import Link from "next/link";
import { SocialIconLinks } from "@/components/layout/social-icon-links";

const ESPECIALIDADES = [
  { href: "/especialidades/ortopedia-geral", label: "Ortopedia Geral" },
  { href: "/especialidades/cirurgia-da-mao-e-punho", label: "Mão e Punho" },
];

const CONDICOES = [
  { href: "/condicoes/sindrome-do-tunel-do-carpo", label: "Túnel do Carpo" },
  { href: "/condicoes/dedo-em-gatilho", label: "Dedo em Gatilho" },
  { href: "/condicoes/rizartrose", label: "Rizartrose" },
  { href: "/condicoes/dor-no-ombro-tendinite", label: "Dor no Ombro" },
  { href: "/condicoes/dor-no-joelho-menisco", label: "Dor no Joelho" },
];

const INSTITUCIONAL = [
  { href: "/sobre", label: "Sobre" },
  { href: "/depoimentos", label: "Depoimentos" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contato", label: "Agendar" },
  { href: "/politica-de-privacidade", label: "Privacidade" },
  { href: "/termos-de-uso", label: "Termos de Uso" },
];

export function Footer() {
  return (
    <footer className="bg-dark text-white/65 relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute rounded-full bg-gradient-to-br from-white/[0.05] to-white/[0.015] border border-white/[0.04] w-[200px] h-[200px] top-[5%] right-[10%] hidden lg:block" style={{ animation: "morph-a 13s ease-in-out infinite" }} />
      <div className="absolute rounded-full bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.04] w-[130px] h-[130px] bottom-[15%] left-[3%] hidden lg:block" style={{ animation: "morph-b 15s ease-in-out infinite" }} />
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 pt-20 pb-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr]">
          {/* Col 1 — Brand */}
          <div className="space-y-3">
            <h3 className="font-heading text-lg font-light tracking-[2px] uppercase text-white">
              Janaína Drumond
            </h3>
            <p className="font-serif italic text-sm text-teal-pale">
              &ldquo;Ortopedia com precisão. Cuidado com alma.&rdquo;
            </p>
            <p className="text-[1.125rem] leading-[1.7]">
              Ortopedista e traumatologista em Belo Horizonte. Subespecialidade em Cirurgia da Mão e Punho. CRM-MG 69719 | RQE 50592.
            </p>
            <SocialIconLinks className="pt-3" />
          </div>

          {/* Col 2 — Especialidades */}
          <div>
            <h4 className="text-[1.125rem] font-normal tracking-[2px] uppercase text-white mb-6">
              Especialidades
            </h4>
            <ul className="flex flex-col gap-2.5">
              {ESPECIALIDADES.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[1.125rem] text-white/60 hover:text-white transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Condições */}
          <div>
            <h4 className="text-[1.125rem] font-normal tracking-[2px] uppercase text-white mb-6">
              Condições
            </h4>
            <ul className="flex flex-col gap-2.5">
              {CONDICOES.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[1.125rem] text-white/60 hover:text-white transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Institucional */}
          <div>
            <h4 className="text-[1.125rem] font-normal tracking-[2px] uppercase text-white mb-6">
              Institucional
            </h4>
            <ul className="flex flex-col gap-2.5">
              {INSTITUCIONAL.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[1.125rem] text-white/60 hover:text-white transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Compliance */}
        <div className="mt-16 mx-auto max-w-[1200px] bg-white/[0.02] rounded-[10px] px-5 py-3.5 text-center text-[1.125rem] leading-relaxed">
          Dra. Janaína Drumond Rocha Fraga · Médica · CRM-MG 69719 · RQE
          50592 (Ortopedia e Traumatologia) · Belo Horizonte, MG
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-4 text-[1.125rem]">
          <span>&copy; {new Date().getFullYear()} Dra. Janaína Drumond</span>
          <div className="flex items-center gap-4">
            <a href="/admin" className="text-white/50 hover:text-white/85 transition-colors">Admin</a>
            <span>
              Desenvolvido por{" "}
              <strong className="text-white">Orbee Labs</strong>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
