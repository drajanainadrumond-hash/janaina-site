import Image from "next/image";
import { CondicaoWhatsAppCta } from "@/components/condicoes/condicao-whatsapp-cta";
import { PROVA_SOCIAL, SITE, SOCIAL } from "@/lib/constants";

/**
 * "Quem vai te atender" — o rosto da Dra. nas páginas que recebem clique pago.
 *
 * POR QUE EXISTE: até 09/09/2026 as páginas de destino dos anúncios eram texto puro, do topo ao
 * rodapé — nenhuma foto dela. Quem chega com dor decide em segundos se manda mensagem, e o que o
 * Doctoralia agrega das 42 avaliações é sobre ELA ("atenção na consulta", "explicações
 * detalhadas", "pontual"). O ativo de confiança é o rosto, e ele não estava onde o dinheiro cai.
 *
 * POR QUE COLUNA LATERAL FIXA (`sticky`) e não um cartão no meio do texto: a página de condição é
 * longa, e a decisão de falar pode acontecer em qualquer ponto da leitura. Fixa, a foto e o botão
 * acompanham a rolagem — o rosto e o CTA estão sempre no campo de visão, não só onde o leitor
 * passou. (A primeira versão de 09/09 era um cartão pequeno e estático: a foto ficava minúscula
 * e sumia depois do primeiro scroll.)
 *
 * NO CELULAR NÃO EXISTE LATERAL — e 94% do gasto da conta é celular. Lá o mesmo componente vira
 * um cartão de largura inteira com a foto em destaque, logo depois da introdução.
 *
 * DE QUEBRA, RESOLVE CONFORMIDADE: nome + CRM + a palavra **médica** + RQE em toda página paga
 * (Art. 4º, I e II da CFM 2.336/2023). Sem foto de paciente, sem antes-e-depois, sem promessa.
 */

type Props = {
  /** Assunto da conversa pré-preenchida no WhatsApp. */
  condicao: string;
  /** Identifica a origem do clique no relatório: `condicao:<slug>:lateral`. */
  slug: string;
  className?: string;
  /**
   * `lateral` (padrão) — cartão grande, foto em destaque, fixo na rolagem. Para as páginas de
   * destino de anúncio, onde o rosto precisa competir com o texto pela atenção.
   *
   * `discreto` — foto redonda pequena, sem cartão e sem botão. Para páginas em que a decisão já
   * foi tomada e o rosto só precisa dar segurança, sem disputar com o que está na tela — o caso
   * de `/contato`, onde o formulário é o protagonista (pedido da Diana, 09/09).
   */
  variante?: "lateral" | "discreto";
};

export function QuemAtende({ condicao, slug, className = "", variante = "lateral" }: Props) {
  if (variante === "discreto") {
    return (
      <div className={`flex items-center gap-4 sm:gap-5 ${className}`}>
        <div className="relative w-[92px] h-[92px] sm:w-[104px] sm:h-[104px] shrink-0 rounded-full overflow-hidden bg-gradient-to-br from-teal-pale to-cream ring-1 ring-teal/10">
          <Image
            src="/janaina-hero.jpg"
            alt={`${SITE.name}, médica ortopedista em ${SITE.city}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 92px, 104px"
          />
        </div>
        <div className="min-w-0">
          <p className="font-heading text-[1.05rem] tracking-[0.5px] text-teal leading-tight">
            {SITE.name}
          </p>
          <p className="text-[0.95rem] text-[#4A5E6B] mt-0.5 text-balance">
            Médica ortopedista e traumatologista
          </p>
          <p className="text-[0.85rem] text-[#5A6B78] mt-0.5 tracking-[0.3px]">
            {SITE.crm} · {SITE.rqe}
          </p>
        </div>
      </div>
    );
  }

  return (
    <aside className={`lg:sticky lg:top-[120px] ${className}`}>
      <div className="rounded-3xl border border-teal/[0.08] bg-white overflow-hidden shadow-[0_16px_48px_rgba(0,62,81,0.10)]">
        {/* A foto ocupa o topo do cartão inteiro — no celular também. */}
        <div className="relative w-full aspect-[4/5] bg-gradient-to-br from-teal-pale to-cream">
          <Image
            src="/janaina-hero.jpg"
            alt={`${SITE.name}, médica ortopedista em ${SITE.city}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 340px"
          />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#003E51] via-[#003E51]/75 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <p className="text-[0.75rem] uppercase tracking-[2px] text-white/85 mb-1">
              Quem vai te atender
            </p>
            <p className="font-heading text-[1.25rem] tracking-[0.5px] text-white leading-tight">
              {SITE.name}
            </p>
          </div>
        </div>

        <div className="p-5 text-center">
          <p className="text-[1rem] text-[#4A5E6B] leading-snug">
            Médica ortopedista e traumatologista, com formação específica em cirurgia da mão e
            punho.
          </p>
          <p className="text-[0.9rem] text-[#5A6B78] mt-2 tracking-[0.3px]">
            {SITE.crm} · {SITE.rqe}
          </p>

          <a
            href={SOCIAL.doctoralia}
            target="_blank"
            rel="noopener noreferrer"
            data-orbee-cta="prova-social:doctoralia-quem-atende"
            className="mt-4 flex items-center justify-center gap-2 text-[0.9rem] text-[#5A6B78] hover:text-teal transition-colors"
          >
            <span className="text-teal-mid" aria-hidden>
              ★★★★★
            </span>
            <span>
              {PROVA_SOCIAL.avaliacoes} avaliações no {PROVA_SOCIAL.fonte}
            </span>
          </a>

          <div className="mt-5 flex justify-center">
            <CondicaoWhatsAppCta
              condicao={condicao}
              slug={`${slug}:lateral`}
              posicao="topo"
              tone="solo"
            />
          </div>
          <p className="mt-3 text-[0.85rem] text-[#5A6B78]">
            Atendimento exclusivamente particular
          </p>
        </div>
      </div>
    </aside>
  );
}
