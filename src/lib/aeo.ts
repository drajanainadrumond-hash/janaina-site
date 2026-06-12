/** Respostas diretas (40–60 palavras) para extração por buscadores e IA — AEO. */
export const CONDICAO_DIRECT_ANSWERS: Record<string, string> = {
  "sindrome-do-tunel-do-carpo":
    "A síndrome do túnel do carpo é a compressão do nervo mediano no punho, causando dormência e formigamento nos dedos (muitas vezes à noite), dor e perda de força na mão. É a neuropatia compressiva mais comum. O diagnóstico é clínico; o tratamento vai de órtese e infiltração à cirurgia de liberação do ligamento, com alta taxa de sucesso.",
  "dedo-em-gatilho":
    "O dedo em gatilho (tenossinovite estenosante) ocorre quando o tendão flexor incha e prende na polia da base do dedo, gerando dor, estalido e travamento ao flexionar. É frequente em mulheres entre 40 e 60 anos e em diabéticos. O tratamento inclui infiltração, fisioterapia e, nos casos persistentes, cirurgia breve sob anestesia local.",
  rizartrose:
    "A rizartrose é a artrose da articulação na base do polegar, que provoca dor ao segurar objetos, girar chaves e abrir garrafas. Predomina em mulheres após os 50 anos. O manejo combina órtese, infiltração, exercícios e, quando necessário, procedimento cirúrgico para aliviar a dor e preservar a função da mão.",
  "dor-no-ombro-tendinite":
    "A dor no ombro costuma envolver tendinite, bursite, lesão do manguito rotador ou capsulite adesiva, com dor que piora ao levantar o braço e, em muitos casos, à noite. O diagnóstico combina exame clínico e imagem. O tratamento inclui fisioterapia, medicação, infiltração e, em lesões estruturais, indicação cirúrgica conforme a gravidade.",
  "dor-no-joelho-menisco":
    "A dor no joelho pode vir de lesão meniscal, condromalácia ou artrose, com estalidos, inchaço e sensação de falta de estabilidade. O ortopedista avalia o mecanismo da lesão, o exame físico e ressonância quando indicada. O plano pode ser conservador (fisioterapia, fortalecimento) ou artroscopia/cirurgia, conforme o tipo e o grau da lesão.",
  "dor-lombar-cronica":
    "A dor lombar crônica pode ter origem muscular, facetária, discal ou compressiva de raiz nervosa (ciatalgia). A avaliação ortopédica define sinais de alerta, indica exames quando necessário e orienta fisioterapia, ergonomia e medidas de alívio. Casos com déficit neurológico ou refratários podem exigir encaminhamento para neurocirurgia ou outras especialidades.",
  "fratura-de-escafoide":
    "A fratura do escafoide é uma lesão do punho com alto risco de não consolidação se subdiagnosticada; o raio-X inicial pode ser normal. A dor localiza-se na tabaqueira anatômica. O tratamento depende da localização e deslocamento: imobilização prolongada ou fixação cirúrgica, visando consolidação precoce para evitar artrose e complicações vasculares do osso.",
  "tendinite-de-quervain":
    "A tendinite de De Quervain inflama os tendões do polegar na face radial do punho, causando dor ao pegar o bebê, torcer panos ou usar o celular. É comum no pós-parto. O tratamento inicial usa órtese, anti-inflamatórios e infiltração; casos resistentes podem necessitar liberação cirúrgica da bainha tendínea para recuperar movimento sem dor.",
  "entorse-de-tornozelo":
    "A entorse de tornozelo é a lesão ligamentar mais comum no esporte, classificada em graus conforme instabilidade e edema. A maioria melhora com proteção, gelo, compressão e reabilitação progressiva. Entorses graves ou instáveis exigem imobilização adequada e, às vezes, reparo ligamentar, para evitar instabilidade crônica e novas torções.",
  "epicondilite-lateral":
    "A epicondilite lateral (cotovelo de tenista) é a causa mais frequente de dor na face externa do cotovelo, ligada a esforço repetitivo e sobrecarga dos extensores do punho. O quadro melhora com repouso relativo, fisioterapia, órtese e infiltração em casos selecionados. A cirurgia fica reservada para dor persistente após meses de tratamento conservador bem conduzido.",
  "cisto-sinovial":
    "O cisto sinovial (ganglion) é um nódulo benigno cheio de líquido sinovial, comum no dorso do punho ou na palma da mão. Muitos são indolores e podem regredir; outros causam desconforto ou limitação. O tratamento varia de observação e infiltração à aspiração ou excisão cirúrgica quando sintomático ou recidivante, sempre após confirmação clínica.",
  "dor-no-quadril":
    "A dor no quadril pode decorrer de bursite trocantérica, artrose, impacto femoroacetabular ou tendinopatias, com dor na virilha ou lateral da coxa. O exame ortopédico e a imagem definem a causa. O tratamento inclui fortalecimento, fisioterapia, medicação e infiltrações; artrose avançada ou deformidades podem indicar procedimentos específicos ou encaminhamento para cirurgia do quadril.",
  fraturas:
    "Fraturas nos membros superiores e inferiores exigem avaliação ortopédica para alinhar o osso, proteger a região e definir tratamento conservador (gesso, imobilizador) ou cirúrgico (fixação com placa, haste ou pinos). O objetivo é consolidação adequada, recuperação da função e prevenção de sequelas como rigidez, desvio ou artrose pós-traumática.",
  "doenca-de-dupuytren":
    "A doença de Dupuytren é uma fibrose da fáscia palmar que forma nódulos e cordas, puxando os dedos para flexão de forma progressiva. Não é tumoral, mas pode limitar a abertura da mão. O tratamento depende do estágio: observação, infiltração enzimática ou aponeurotomia/cirurgia quando a contratura interfere nas atividades diárias.",
  "lesao-do-lca":
    "A lesão do ligamento cruzado anterior (LCA) do joelho costuma ocorrer em torções durante esportes, com estalo, inchaço rápido e sensação de falseio. O diagnóstico usa exame clínico e ressonância magnética. Jovens ativos frequentemente necessitam reconstrução ligamentar; casos selecionados podem seguir reabilitação focada conforme instabilidade e objetivos funcionais.",
  "artrose-do-joelho":
    "A artrose do joelho (gonartrose) é o desgaste da cartilagem articular, com dor ao caminhar, rigidez matinal e inchaço episódico. Não há cura, mas há controle: exercícios, perda de peso, fisioterapia, medicamentos e infiltrações. Em casos avançados refratários, discute-se osteotomia ou prótese, muitas vezes com encaminhamento ao especialista em joelho.",
};

export function getCondicaoDirectAnswer(slug: string, fallbackDesc: string): string {
  return CONDICAO_DIRECT_ANSWERS[slug] ?? fallbackDesc;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function truncateToWordRange(text: string, min = 40, max = 60): string {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= max) return words.join(" ");
  return `${words.slice(0, max).join(" ")}.`;
}

/** Monta resposta direta para posts do blog (excerpt ou primeiro parágrafo). */
export function buildBlogDirectAnswer(excerpt: string, contentHtml: string): string {
  const excerptWords = excerpt.trim().split(/\s+/).filter(Boolean).length;
  if (excerptWords >= 35 && excerptWords <= 65) return excerpt.trim();

  const firstParagraph = contentHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (firstParagraph) {
    const plain = stripHtml(firstParagraph[1]);
    if (plain.split(/\s+/).length >= 25) {
      return truncateToWordRange(plain);
    }
  }

  if (excerptWords > 0) return excerpt.trim();
  return "Conteúdo médico orientado por ortopedista em Belo Horizonte. Consulte um especialista para avaliação individualizada.";
}
