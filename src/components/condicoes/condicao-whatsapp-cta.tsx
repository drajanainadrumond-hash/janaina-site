import { CONTACT } from "@/lib/constants";

/**
 * CTA de WhatsApp da página de condição.
 *
 * POR QUE ELE EXISTE: até aqui as 16 páginas de condição terminavam num único
 * link para `/contato` — um formulário que exige a queixa do paciente. Quem chega
 * pelo anúncio com dor no punho não preenche formulário: manda mensagem. O destino
 * do clique pago passa a ser a conversa, e o formulário fica como caminho alternativo.
 *
 * POR QUE NÃO PRECISA DE JS AQUI: a `OrbeeAutoCapture` escuta o documento inteiro no
 * capture phase, reconhece qualquer href de `wa.me` e dispara `orbee_whatsapp_click`
 * sozinha — e, se o visitante veio de anúncio, injeta o `sessionId` no texto da
 * mensagem antes de navegar. Este componente só precisa ser um `<a>` honesto.
 *
 * O `data-orbee-source` é o que transforma o clique em informação: ele vira
 * `whatsapp_source` no evento, então dá pra ler no relatório QUAL condição e QUAL
 * posição da página geraram a conversa — que é o dado que hoje falta pra decidir
 * onde investir. Formato: `condicao:<slug>:<posicao>`.
 *
 * ⚠️ Texto sob CFM 2.336/2023: nada de "melhor/único/garantido", nenhuma promessa de
 * resultado, nenhum preço. "Atendimento exclusivamente particular" é fato e é a mesma
 * frase já usada em /contato e na home — serve pra filtrar o cluster de convênio
 * ANTES do clique, que é onde ele custa caro.
 */

type Posicao = "topo" | "final";

type Props = {
  /** Título da condição — entra na mensagem pré-preenchida. */
  condicao: string;
  /** Slug da condição — identifica a origem do clique no relatório. */
  slug: string;
  /** Onde o botão está na página: separa quem clica antes e depois de ler. */
  posicao: Posicao;
  /**
   * Fundo em que o botão é renderizado. `light` desenha o cartão inteiro;
   * `teal` devolve só o botão BRANCO, pra encaixar num bloco escuro já existente;
   * `solo` devolve só o botão VERDE, pra fundo claro sem cartão em volta.
   * (⚠️ usar `teal` sobre fundo claro deixa o botão branco no branco — foi o que
   * aconteceu na primeira versão da landing em 09/09.)
   */
  tone?: "light" | "teal" | "solo";
};

/** Mensagem pré-preenchida — a ponte anexa " (ref:<sid>)" quando a origem é paga. */
export function buildCondicaoWhatsAppUrl(condicao: string): string {
  const texto = `Olá! Vi a página sobre ${condicao} no site e gostaria de agendar uma consulta.`;
  return `https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent(texto)}`;
}

export function CondicaoWhatsAppCta({ condicao, slug, posicao, tone = "light" }: Props) {
  const estiloBotao =
    tone === "teal"
      ? "bg-white text-teal hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)]"
      : "bg-whatsapp text-white hover:shadow-[0_8px_30px_rgba(37,211,102,0.35)]";

  const botao = (
    <a
      href={buildCondicaoWhatsAppUrl(condicao)}
      target="_blank"
      rel="noopener noreferrer"
      data-orbee-source={`condicao:${slug}:${posicao}`}
      aria-label={`Falar no WhatsApp sobre ${condicao}`}
      className={`inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-[1.125rem] uppercase tracking-[0.5px] font-medium transition-all duration-300 hover:-translate-y-0.5 ${estiloBotao}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[1.15em] h-[1.15em] fill-current shrink-0">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.593-.838-6.32-2.234l-.436-.36-3.2 1.073 1.073-3.2-.36-.436A9.956 9.956 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
      </svg>
      Falar no WhatsApp
    </a>
  );

  if (tone === "teal" || tone === "solo") return botao;

  return (
    <aside className="my-10 rounded-2xl border border-cream-dark bg-cream-light p-6 text-center">
      <p className="text-[1.125rem] text-dark/75 mb-1">
        Com dúvida sobre {condicao.toLowerCase()}? Fale com o consultório e agende sua avaliação.
      </p>
      <p className="text-[1rem] text-gray-brand mb-5">Atendimento exclusivamente particular.</p>
      {botao}
    </aside>
  );
}
