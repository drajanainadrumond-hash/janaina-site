import { getSupabaseAdmin } from "./supabase";
import { FaqItem } from "./schema";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  ogImage?: string;
  faqs?: FaqItem[];
};

// Fallback: posts estáticos quando Supabase não está configurado
const STATIC_POSTS: BlogPost[] = [
  {
    id: "0",
    slug: "condicoes-mao-punho-guia-completo",
    title: "Condições da Mão e Punho: Guia Completo",
    excerpt: "Conheça as principais condições da mão e punho: túnel do carpo, dedo em gatilho, rizartrose, fraturas e mais.",
    ogImage: "/imagens/condicoes-mao-punho-capa.jpeg",
    faqs: [
      {
        question: "Qual a diferença entre ortopedista e cirurgião de mão?",
        answer: "O cirurgião de mão é um ortopedista especializado que realizou dois anos adicionais de treinamento focado exclusivamente em microanatomia, nervos e tendões da mão e punho."
      },
      {
        question: "Preciso de encaminhamento para consultar com especialista em mão?",
        answer: "Não. Você pode agendar uma consulta diretamente se apresentar sintomas como formigamento, dor crônica ou travamento nos dedos."
      },
      {
        question: "Artrose na mão tem cura sem cirurgia?",
        answer: "A artrose é um processo degenerativo, mas o controle da dor e a melhora da função podem ser alcançados sem cirurgia através de viscossuplementação, fisioterapia e órteses."
      },
      {
        question: "O cisto sinovial pode virar câncer?",
        answer: "Não. O cisto sinovial é uma condição benigna preenchida por fluido articular e não possui relação com neoplasias malignas."
      },
      {
        question: "O atendimento é particular ou por convênio?",
        answer: "O atendimento é exclusivamente particular. Entre em contato com a nossa equipe pelo WhatsApp para saber valores e formas de pagamento."
      }
    ],
    content: `
<p>As nossas mãos são ferramentas extraordinárias de interação com o mundo. Elas nos permitem desde a precisão de um cirurgião ou músico até a força necessária para carregar objetos pesados. No entanto, essa complexidade anatômica — composta por 27 ossos, dezenas de articulações, tendões, nervos e ligamentos — também as torna vulneráveis a uma série de condições que podem impactar severamente a nossa qualidade de vida.</p>

<p>Como ortopedista e traumatologista em Belo Horizonte, com dedicação às condições da mão e punho, vejo diariamente pacientes que sofrem com dores, formigamentos e limitações funcionais. Muitas vezes, a demora em procurar ajuda ocorre por falta de informação sobre as patologias mais comuns.</p>

<p>Este guia completo foi elaborado para ser um hub central de informações sobre as principais <strong>condições da mão e punho</strong>, ajudando você a identificar sintomas precoces e entender as opções modernas de tratamento.</p>

<h2>Anatomia da Mão — Por Que Ela é Tão Vulnerável?</h2>

<p>A mão humana é uma das estruturas mais complexas do corpo. Para que possamos realizar o movimento de oposição do polegar (o que nos diferencia de muitos outros mamíferos), é necessária uma harmonia perfeita entre os ossos do carpo (punho), metacarpos (palma) e falanges (dedos).</p>

<p>A vulnerabilidade da mão reside no fato de que muitas estruturas passam por canais estreitos (túneis). Qualquer inflamação mínima em um tendão ou o surgimento de um pequeno cisto pode comprimir um nervo ou travar uma articulação. Além disso, a mão está em constante uso, o que predispõe a lesões por esforço repetitivo (LER) e processos degenerativos como a artrose.</p>

<h2>Síndrome do Túnel do Carpo</h2>

<p>Esta é, sem dúvida, a neuropatia compressiva mais frequente no consultório. Ela ocorre quando o <strong>nervo mediano</strong>, que passa por um canal estreito no punho chamado túnel do carpo, sofre compressão.</p>

<p><strong>Principais Sintomas:</strong>
<ul>
  <li>Formigamento e dormência no polegar, indicador e dedo médio.</li>
  <li>Dores que pioram à noite ou ao segurar objetos por muito tempo (como o volante do carro ou celular).</li>
  <li>Perda de força na mão e tendência a deixar objetos caírem.</li>
</ul>
</p>

<p>O tratamento inicial costuma envolver o uso de órteses noturnas e fisioterapia. Em casos avançados ou onde não há resposta ao tratamento conservador, a cirurgia de liberação do túnel do carpo apresenta taxas de sucesso superiores a 90%.</p>

<h2>Dedo em Gatilho</h2>

<p>Tecnicamente chamado de tenossinovite estenosante, o <strong>dedo em gatilho</strong> acontece quando o tendão flexor incha e encontra dificuldade para deslizar através da polia (uma espécie de túnel na base do dedo).</p>

<p>O resultado é um dedo que "trava" em posição dobrada e, ao esticar, produz um estalido doloroso, semelhante ao gatilho de uma arma. É muito comum em pacientes diabéticos ou pessoas que realizam atividades manuais intensas.</p>

<h2>Rizartrose (Artrose do Polegar)</h2>

<p>A rizartrose é a degeneração da cartilagem na base do polegar (articulação trapézio-metacarpiana). Por ser a articulação responsável pela "pinça", sua inflamação é extremamente incapacitante.</p>

<p><strong>Sinais de Alerta:</strong>
<ul>
  <li>Dor na base do polegar ao abrir potes, girar chaves ou escrever.</li>
  <li>Perda de força para segurar objetos pequenos.</li>
  <li>Deformidade visível na base do polegar em estágios avançados.</li>
</ul>
</p>

<h2>Fraturas de Mão e Punho</h2>

<p>As fraturas são emergências ortopédicas comuns. A fratura do rádio distal (no punho) e a fratura do escafóide são as mais frequentes após quedas com a mão estendida.</p>

<p>É fundamental o diagnóstico preciso através de radiografias ou tomografias, pois uma fratura não consolidada corretamente (pseudartrose) no punho pode levar à artrose precoce e perda permanente de movimento.</p>

<h2>Cisto Sinovial</h2>

<p>O cisto sinovial é uma "bolsa" preenchida por líquido articular que aparece geralmente no dorso do punho ou na palma, próximo à base dos dedos. Embora assuste visualmente, o cisto <strong>não é cancerígeno</strong>.</p>

<p>O tratamento é indicado se houver dor ou desconforto estético acentuado. Muitos cistos desaparecem sozinhos, mas em casos persistentes, a aspiração ou a remoção cirúrgica (muitas vezes por vídeo/artroscopia) pode ser necessária.</p>

<h2>Doença de De Quervain</h2>

<p>Trata-se de uma inflamação dos tendões que movimentam o polegar, especificamente no lado do punho. É muito associada ao uso excessivo de smartphones (pelo movimento repetitivo do polegar) e também é frequente em mães de recém-nascidos, devido à posição de carregar o bebê.</p>

<p>O teste de Finkelstein (dobrar o polegar na palma e inclinar o punho) costuma ser positivo e muito doloroso em quem tem essa condição.</p>

<h2>Contratura de Dupuytren</h2>

<p>Esta condição afeta a fáscia palmar (tecido abaixo da pele da palma da mão), causando seu espessamento e encurtamento. Com o tempo, formam-se nódulos e cordas que puxam os dedos (geralmente o anelar e o mínimo) para dentro da palma, impedindo que a mão seja aberta completamente.</p>

<p>É uma condição de origem genética e, embora não tenha "cura" definitiva, procedimentos modernos como a fasciotomia percutânea ou cirurgia aberta podem restaurar a extensão dos dedos.</p>

<h2>Quando Procurar um Especialista?</h2>

<p>Não ignore sinais persistentes. Você deve procurar um especialista em mão se apresentar:
<ul>
  <li>Dormência que dura mais de uma semana ou que acorda você à noite.</li>
  <li>Travamento de qualquer um dos dedos.</li>
  <li>Dor no punho após trauma, mesmo que consiga movimentar.</li>
  <li>Perda de sensibilidade ou força súbita.</li>
</ul>
</p>

<div style="border:1px solid #E6E5E2;border-radius:12px;overflow:hidden;margin:1.5rem 0;">
  <div style="background:#003E51;color:#ffffff;padding:0.7rem 1rem;font-weight:700;letter-spacing:0.5px;">Diferença Profissional</div>
  <div style="padding:0.85rem 1rem;border-bottom:1px solid #F0EFED;">
    <div style="color:#85878B;text-transform:uppercase;letter-spacing:0.3px;font-size:0.95rem;margin-bottom:0.25rem;">Ortopedista Geral</div>
    <div style="color:#1A2E3B;font-weight:500;">Trata o sistema locomotor como um todo.</div>
  </div>
  <div style="padding:0.85rem 1rem;">
    <div style="color:#85878B;text-transform:uppercase;letter-spacing:0.3px;font-size:0.95rem;margin-bottom:0.25rem;">Especialista em Mão</div>
    <div style="color:#1A2E3B;font-weight:500;">Focado na microanatomia e cirurgia reconstrutiva.</div>
  </div>
</div>

<h3>FAQ sobre Condições da Mão</h3>

<p><strong>Diferença entre ortopedista e cirurgião de mão:</strong> O cirurgião de mão é um ortopedista (ou cirurgião plástico) que realizou dois anos adicionais de especialização exclusiva em mão, punho e microcirurgia nervosa.</p>

<p><strong>Precisa de encaminhamento?</strong> Não necessariamente. Você pode agendar uma consulta diretamente se tiver sintomas específicos nas mãos.</p>

<p><strong>Artrose tem cura sem cirurgia?</strong> A artrose é degenerativa, portanto não tem "cura" que reverta a cartilagem, mas o <strong>controle da dor</strong> sem cirurgia é possível em muitos casos através de viscossuplementação, fisioterapia e órteses.</p>

<p><strong>Cisto vira câncer?</strong> Absolutamente não. O cisto sinovial é benigno e composto por fluido lubrificante da própria articulação.</p>

<p><strong>Atendimento:</strong> O atendimento é exclusivamente particular. Entre em contato para saber valores e formas de pagamento.</p>

<p><strong>CTA:</strong> Se você sente algum desses sintomas ou deseja uma avaliação preventiva, <a href="/contato">agende sua avaliação com a Dra. Janaina Drumond</a>. Cuidar das suas mãos é garantir sua independência e produtividade.</p>

<p><em>Dra. Janaína Drumond — Ortopedista e Traumatologista | CRM-MG 69719 | RQE 50592</em></p>
`,
    category: "Mão",
    published: true,
    created_at: "2026-06-15",
    updated_at: "2026-06-15",
  },
  {
    id: "1",
    slug: "sindrome-tunel-do-carpo",
    title: "Síndrome do Túnel do Carpo: Sintomas, Causas e Tratamento Completo",
    excerpt: "Dormência nos dedos à noite? Formigamento ao dirigir? Entenda quando a cirurgia é indicada.",
    content: `
<p>Se você está acordando com a mão dormente, sentindo formigamento nos dedos ao dirigir ou percebendo que objetos escapam da sua mão com mais frequência, pode estar diante da <strong>síndrome do túnel do carpo</strong> — a neuropatia compressiva mais comum do corpo humano.</p>

<p>Como ortopedista com formação em cirurgia da mão e punho, atendo diariamente pacientes com essa queixa no meu consultório em Belo Horizonte. Neste artigo, explico tudo o que você precisa saber.</p>

<h2>O que é a síndrome do túnel do carpo?</h2>

<p>O túnel do carpo é um canal estreito no punho, formado pelos ossos do carpo e por um ligamento resistente chamado <strong>retináculo dos flexores</strong>. Por dentro desse túnel passam nove tendões flexores e o <strong>nervo mediano</strong> — responsável pela sensibilidade do polegar, indicador, médio e metade do anelar.</p>

<p>Quando a pressão dentro desse canal aumenta, o nervo mediano é comprimido. Isso gera os sintomas típicos: dormência, formigamento, dor e perda de força na mão.</p>

<h2>Quem é mais afetado?</h2>

<p>A síndrome do túnel do carpo afeta entre <strong>51 a 125 pessoas a cada 100.000</strong> e é significativamente mais comum em mulheres na faixa dos 40 a 60 anos. No Brasil, dados do Ministério da Previdência Social revelam que, em 2023, mais de <strong>24 mil trabalhadores</strong> foram afastados por essa condição — um aumento de 33% em relação ao ano anterior.</p>

<h2>Quais são os sintomas?</h2>

<p>Os sintomas costumam começar de forma gradual e tendem a piorar à noite. Os mais comuns são:</p>

<ul>
<li><strong>Dormência e formigamento</strong> — principalmente no polegar, indicador, médio e metade do anelar. Se o dedo mínimo estiver afetado, provavelmente o problema é outro (compressão do nervo ulnar).</li>
<li><strong>Dor no punho</strong> que pode irradiar para o antebraço e até para o ombro.</li>
<li><strong>Sensação de "choque"</strong> nos dedos, especialmente ao segurar o volante, celular ou livro.</li>
<li><strong>Fraqueza na mão</strong> — objetos caem com mais facilidade, dificuldade para abotoar roupas ou abrir tampas.</li>
<li><strong>Mão "adormecida" ao acordar</strong> — muitos pacientes relatam que precisam "sacudir" a mão para aliviar. Isso acontece porque, durante o sono, dobramos inconscientemente os punhos, aumentando a pressão dentro do túnel.</li>
</ul>

<h2>Causas e fatores de risco</h2>

<p>Na maioria dos casos a causa é <strong>idiopática</strong> (sem uma causa única identificável), mas vários fatores aumentam o risco:</p>

<ul>
<li><strong>Atividades repetitivas</strong> — uso prolongado de computador, digitação, trabalho manual, linha de produção.</li>
<li><strong>Condições de saúde</strong> — diabetes, hipotireoidismo, artrite reumatoide e insuficiência renal.</li>
<li><strong>Alterações hormonais</strong> — gravidez (pela retenção de líquidos), menopausa.</li>
<li><strong>Anatomia</strong> — pessoas com o túnel do carpo naturalmente mais estreito.</li>
<li><strong>Fraturas prévias</strong> no punho que alteraram a anatomia do canal.</li>
</ul>

<h2>Como é feito o diagnóstico?</h2>

<p>O diagnóstico é <strong>essencialmente clínico</strong>. No consultório, realizo testes específicos:</p>

<ul>
<li><strong>Teste de Phalen:</strong> você mantém os punhos flexionados por 60 segundos. Se surgir formigamento, o teste é positivo.</li>
<li><strong>Sinal de Tinel:</strong> percuto levemente sobre o túnel do carpo. A sensação de "choque" nos dedos indica irritação do nervo mediano.</li>
<li><strong>Teste de compressão direta:</strong> pressiono suavemente sobre o nervo por 30 segundos para reproduzir os sintomas.</li>
</ul>

<p>Quando necessário, solicito a <strong>eletroneuromiografia (ENMG)</strong> — um exame que mede a velocidade de condução do nervo e confirma o grau de comprometimento. A ultrassonografia também pode ajudar a visualizar o espessamento do nervo.</p>

<h2>Tratamento conservador</h2>

<p>Nos casos leves a moderados, o tratamento inicial é não cirúrgico:</p>

<ul>
<li><strong>Órtese noturna (tala):</strong> mantém o punho em posição neutra durante o sono, aliviando a pressão sobre o nervo. É uma das medidas mais eficazes na fase inicial.</li>
<li><strong>Anti-inflamatórios:</strong> podem ajudar no alívio temporário da dor e do inchaço.</li>
<li><strong>Infiltração com corticoide:</strong> injeção diretamente no túnel do carpo para reduzir a inflamação. Pode trazer alívio por semanas a meses, mas o efeito pode ser temporário.</li>
<li><strong>Fisioterapia:</strong> exercícios de deslizamento do nervo e tendões, fortalecimento e ergonomia.</li>
<li><strong>Ajustes ergonômicos:</strong> posição correta do teclado, pausas durante o trabalho, uso de apoio para o punho.</li>
</ul>

<h2>Quando a cirurgia é necessária?</h2>

<p>Indico cirurgia quando:</p>

<ul>
<li>O tratamento conservador não trouxe melhora após 3 a 6 meses.</li>
<li>Há perda de sensibilidade persistente ou atrofia muscular na base do polegar.</li>
<li>A eletroneuromiografia mostra comprometimento moderado a grave do nervo.</li>
<li>Os sintomas são intensos desde o início.</li>
</ul>

<p>A cirurgia consiste na <strong>liberação do ligamento transverso do carpo</strong>, abrindo espaço para o nervo. Pode ser feita por técnica aberta (pequena incisão na palma) ou endoscópica. A taxa de sucesso é superior a <strong>90%</strong>, com alívio significativo dos sintomas. A taxa de recidiva é de apenas cerca de <strong>2%</strong>.</p>

<p>A recuperação varia: muitos pacientes relatam melhora dos sintomas noturnos já nas primeiras semanas. A recuperação completa da força da mão pode levar de 3 a 6 meses, sendo que o tempo médio para recuperação total relatado em estudos é de <strong>5,5 meses</strong>.</p>

<h2>Quando procurar um ortopedista?</h2>

<p>Procure avaliação se você apresenta:</p>

<ul>
<li>Formigamento nos dedos que acorda você à noite.</li>
<li>Dormência que não melhora ao longo do dia.</li>
<li>Perda de força na mão ou objetos caindo.</li>
<li>Dificuldade para realizar atividades simples como abotoar uma camisa.</li>
</ul>

<p><strong>Quanto mais cedo o diagnóstico, melhores são os resultados do tratamento.</strong> Em casos avançados com atrofia muscular, a recuperação pode ser incompleta mesmo após a cirurgia.</p>

<h2>Saiba mais</h2>
<ul>
<li><a href="/blog/condicoes-mao-punho-guia-completo">Guia Completo: Principais Condições da Mão e Punho</a></li>
<li><a href="/condicoes/sindrome-do-tunel-do-carpo">Saiba mais sobre a síndrome do túnel do carpo e suas opções de tratamento</a></li>
<li><a href="/blog/formigamento-dedos-noite">Formigamento nos dedos à noite: pode ser túnel do carpo?</a></li>
<li><a href="/especialidades/cirurgia-da-mao-e-punho">Conheça a atuação da Dra. Janaína em cirurgia da mão</a></li>
</ul>

<p><em>Dra. Janaína Drumond — Ortopedista e Traumatologista | CRM-MG 69719 | RQE 50592</em></p>
`,
    category: "Mão",
    published: true,
    created_at: "2026-03-01",
    updated_at: "2026-03-01",
  },
  {
    id: "2",
    slug: "dor-ombro-5-causas",
    title: "Dor no Ombro que Não Passa: 5 Causas",
    excerpt: "Se dura mais de 2 semanas, entenda as causas e quando procurar ortopedista.",
    content: `
<p>A dor no ombro é uma das queixas mais comuns nos consultórios de ortopedia. Estudos apontam que <strong>até 26% da população</strong> apresenta dor no ombro em algum momento, e a prevalência ao longo da vida pode chegar a <strong>70%</strong>. Mas quando essa dor persiste por mais de duas semanas, é hora de investigar.</p>

<p>Neste artigo, apresento as 5 causas mais frequentes de dor no ombro que não melhora — e quando você deve procurar avaliação ortopédica.</p>

<h2>1. Tendinite do Manguito Rotador</h2>

<p>O <strong>manguito rotador</strong> é um conjunto de quatro tendões (supraespinal, infraespinal, subescapular e redondo menor) que envolvem a cabeça do úmero como uma "capa". Eles são responsáveis por estabilizar e movimentar o ombro.</p>

<p>A <strong>tendinite</strong> ocorre quando esses tendões inflamam, geralmente por uso excessivo, movimentos repetitivos acima da cabeça ou processo degenerativo natural. É a causa mais comum de dor no ombro em adultos acima de 40 anos.</p>

<p><strong>Sintomas típicos:</strong></p>
<ul>
<li>Dor na lateral do ombro que pode irradiar para o braço.</li>
<li>Piora ao levantar o braço acima da cabeça.</li>
<li>Dor noturna, especialmente ao deitar sobre o lado afetado.</li>
<li>Dificuldade para pentear o cabelo ou colocar o cinto de segurança.</li>
</ul>

<h2>2. Bursite Subacromial</h2>

<p>A <strong>bursa</strong> é uma pequena bolsa de líquido que serve como amortecedor entre os tendões e o osso. Quando inflamada, aumenta de volume e gera dor intensa.</p>

<p>A bursite raramente ocorre isoladamente — na maioria das vezes está associada à tendinite do manguito rotador ou à síndrome do impacto. É uma consequência do atrito excessivo entre as estruturas do ombro.</p>

<p><strong>Sintomas típicos:</strong></p>
<ul>
<li>Dor intensa e aguda, podendo ser incapacitante.</li>
<li>Piora significativa ao movimentar o braço para o lado (abdução).</li>
<li>Inchaço e sensação de "queimação" no ombro.</li>
</ul>

<h2>3. Síndrome do Impacto</h2>

<p>Quando o espaço entre o acrômio (osso da escápula) e o manguito rotador diminui, os tendões e a bursa ficam comprimidos a cada vez que você levanta o braço. Isso é a <strong>síndrome do impacto</strong>.</p>

<p>Fatores como anatomia óssea desfavorável (acrômio em gancho), esporões e fraqueza muscular contribuem para essa condição. Se não tratada, pode levar à ruptura do manguito rotador.</p>

<p><strong>Sintomas típicos:</strong></p>
<ul>
<li>Dor ao elevar o braço entre 60° e 120° — o chamado "arco doloroso".</li>
<li>Dor ao alcançar objetos em prateleiras altas.</li>
<li>Estalos ou crepitação ao movimentar o ombro.</li>
</ul>

<h2>4. Capsulite Adesiva (Ombro Congelado)</h2>

<p>A <strong>capsulite adesiva</strong> é uma condição em que a cápsula articular do ombro inflama e engrossa, tornando-se rígida. O resultado é dor intensa e perda progressiva da amplitude de movimento.</p>

<p>É mais comum em mulheres entre 40 e 60 anos, e tem forte associação com <strong>diabetes</strong> (até 20% dos diabéticos podem desenvolver), hipotireoidismo e imobilização prolongada do ombro.</p>

<p>A doença evolui classicamente em três fases:</p>
<ul>
<li><strong>Fase inflamatória (2-9 meses):</strong> dor intensa, especialmente à noite, com início da rigidez.</li>
<li><strong>Fase de rigidez (4-12 meses):</strong> a dor diminui, mas o ombro "congela" — movimentos básicos ficam limitados.</li>
<li><strong>Fase de resolução (12-42 meses):</strong> recuperação gradual da mobilidade.</li>
</ul>

<h2>5. Lesão Labral (SLAP)</h2>

<p>O <strong>labrum</strong> é um anel de cartilagem que reveste a borda da cavidade do ombro (glenoide), aumentando a estabilidade articular. Uma lesão <strong>SLAP</strong> (Superior Labrum Anterior to Posterior) afeta a porção superior do labrum, onde se insere o tendão do bíceps.</p>

<p>É comum em atletas que realizam movimentos de arremesso (vôlei, handebol, natação) e também pode ocorrer após quedas com a mão estendida.</p>

<p><strong>Sintomas típicos:</strong></p>
<ul>
<li>Dor profunda no ombro, difícil de localizar.</li>
<li>Estalos ou sensação de "prender" em certos movimentos.</li>
<li>Dor ao carregar peso com o braço estendido.</li>
<li>Sensação de instabilidade no ombro.</li>
</ul>

<h2>Como é feito o diagnóstico?</h2>

<p>A avaliação começa com um <strong>exame físico detalhado</strong> — testes específicos de cada estrutura permitem direcionar a suspeita diagnóstica. Os exames de imagem mais utilizados são:</p>

<ul>
<li><strong>Ultrassonografia:</strong> excelente para avaliar tendões do manguito rotador e bursa. É dinâmico e acessível.</li>
<li><strong>Ressonância magnética:</strong> padrão-ouro para avaliação completa de todas as estruturas — tendões, labrum, cartilagem e osso.</li>
<li><strong>Radiografia:</strong> útil para avaliar calcificações, artrose e alterações ósseas.</li>
</ul>

<h2>Tratamento</h2>

<p>O tratamento inicial na maioria dos casos é <strong>conservador</strong>:</p>

<ul>
<li><strong>Repouso relativo</strong> — evitar atividades que pioram a dor, sem imobilizar completamente.</li>
<li><strong>Anti-inflamatórios e analgésicos</strong> — para controle da dor aguda.</li>
<li><strong>Fisioterapia</strong> — fortalecimento do manguito rotador e estabilizadores da escápula, alongamento da cápsula posterior. É o pilar do tratamento.</li>
<li><strong>Infiltração</strong> — com corticoide ou ácido hialurônico em casos selecionados.</li>
</ul>

<p>A cirurgia é reservada para casos que não respondem ao tratamento conservador adequado (geralmente 3 a 6 meses), rupturas completas do manguito rotador ou lesões labrais em atletas.</p>

<h2>Quando procurar um ortopedista?</h2>

<p>Procure avaliação se:</p>

<ul>
<li>A dor no ombro persiste por mais de <strong>2 semanas</strong>.</li>
<li>Há dor noturna que atrapalha o sono.</li>
<li>Você não consegue levantar o braço normalmente.</li>
<li>Houve trauma (queda, acidente) seguido de dor e limitação.</li>
<li>Percebe perda de força para atividades do dia a dia.</li>
</ul>

<p><strong>A maioria das condições do ombro responde bem ao tratamento quando diagnosticadas precocemente.</strong> Adiar a avaliação pode levar a um quadro crônico mais difícil de tratar.</p>

<h2>Saiba mais</h2>
<ul>
<li><a href="/condicoes/dor-no-ombro-tendinite">Dor no ombro: diagnóstico e tratamento completo</a></li>
<li><a href="/especialidades/ortopedia-geral">Ortopedia geral — todas as condições do ombro</a></li>
</ul>

<p><em>Dra. Janaína Drumond — Ortopedista e Traumatologista | CRM-MG 69719 | RQE 50592</em></p>
`,
    category: "Ombro",
    published: true,
    created_at: "2026-02-15",
    updated_at: "2026-02-15",
  },
  {
    id: "3",
    slug: "dedo-em-gatilho-tratamento",
    title: "Dedo em Gatilho: O que É e Tratamento",
    excerpt: "Seu dedo trava? Cirurgia dura apenas 20 minutos.",
    content: `
<p>Você já sentiu o dedo "travar" ao dobrar e precisou forçar para esticar? Ou percebeu um estalido doloroso na palma da mão ao movimentar os dedos? Esse é o <strong>dedo em gatilho</strong> — tecnicamente chamado de <strong>tenossinovite estenosante</strong>, uma das condições mais frequentes que trato no meu dia a dia como ortopedista especializada em mão.</p>

<h2>O que é o dedo em gatilho?</h2>

<p>Para entender essa condição, imagine que os tendões flexores dos seus dedos passam por dentro de "túneis" chamados <strong>polias</strong>, como uma linha passando por argolas de uma vara de pescar. A <strong>polia A1</strong>, localizada na base do dedo (na palma da mão), é a mais comumente acometida.</p>

<p>Quando há inflamação, o tendão incha e a polia engrossa. O tendão passa a ter dificuldade para deslizar livremente — ele "prende" ao passar pela polia, como uma corda com um nó passando por um anel apertado. Isso gera o estalido característico e, nos casos mais avançados, o travamento completo do dedo.</p>

<h2>Quem é mais afetado?</h2>

<p>A prevalência do dedo em gatilho é de <strong>1 a 2% na população geral</strong>, mas sobe para <strong>5 a 20% em pessoas com diabetes</strong> — tornando o diabetes o principal fator de risco. Cerca de <strong>25% dos pacientes</strong> que chegam ao consultório com dedo em gatilho são diabéticos.</p>

<p>Outros fatores de risco incluem:</p>
<ul>
<li><strong>Sexo feminino</strong> — mulheres são mais afetadas (proporção de até 6:1).</li>
<li><strong>Idade entre 40 e 60 anos.</strong></li>
<li><strong>Artrite reumatoide</strong> e outras doenças inflamatórias.</li>
<li><strong>Atividades com preensão repetitiva</strong> — uso de ferramentas, jardinagem, crochê.</li>
<li>Os dedos mais acometidos são o <strong>anelar e o polegar</strong>.</li>
</ul>

<h2>Sintomas e graus da doença</h2>

<p>O quadro evolui progressivamente e é classificado em <strong>4 graus</strong>:</p>

<ul>
<li><strong>Grau I:</strong> Dor e sensibilidade na palma da mão, na base do dedo, mas sem travamento.</li>
<li><strong>Grau II:</strong> Estalido perceptível ao movimentar o dedo. O dedo "prende" mas consegue se soltar sozinho.</li>
<li><strong>Grau III:</strong> Travamento real — o dedo prende e o paciente precisa usar a outra mão para destravá-lo (grau IIIa = ainda destravar ativamente; grau IIIb = precisa destravar passivamente).</li>
<li><strong>Grau IV:</strong> Dedo travado em posição fixa (fletida), sem conseguir estender.</li>
</ul>

<h2>Como é feito o diagnóstico?</h2>

<p>O diagnóstico é <strong>clínico</strong> — feito pela história e pelo exame físico. Na maioria dos casos, <strong>não são necessários exames de imagem</strong>. Ao examinar, consigo palpar um nódulo na palma da mão e reproduzir o estalido ou travamento com a movimentação do dedo.</p>

<h2>Tratamento conservador</h2>

<p>Nos graus iniciais (I e II), o tratamento conservador pode ser suficiente:</p>

<ul>
<li><strong>Anti-inflamatórios</strong> — para alívio da dor e redução da inflamação.</li>
<li><strong>Imobilização com tala</strong> — repouso funcional do dedo para reduzir o atrito.</li>
<li><strong>Infiltração com corticoide</strong> — uma injeção diretamente na bainha do tendão. A taxa de sucesso varia de <strong>67% a 90%</strong> após a primeira aplicação. Em pacientes diabéticos, a resposta tende a ser menor.</li>
</ul>

<h2>Tratamento cirúrgico</h2>

<p>A cirurgia é indicada quando há travamento persistente (graus III e IV) ou quando o tratamento conservador falha. Consiste na <strong>liberação da polia A1</strong> — literalmente "abrir" a polia para que o tendão volte a deslizar livremente.</p>

<p>Pontos importantes sobre a cirurgia:</p>

<ul>
<li><strong>Duração:</strong> aproximadamente 20 minutos.</li>
<li><strong>Anestesia:</strong> local — você fica acordado, sem necessidade de anestesia geral.</li>
<li><strong>Ambiente:</strong> pode ser realizada em ambulatório (day clinic).</li>
<li><strong>Técnicas:</strong> aberta (incisão de ~1,5 cm na palma) ou percutânea (com agulha, sem incisão visível).</li>
<li><strong>Taxa de sucesso:</strong> em torno de <strong>95 a 99%</strong>, com índice de complicações muito baixo (cerca de 2%).</li>
<li><strong>Recuperação:</strong> a movimentação dos dedos é liberada no mesmo dia. A maioria dos pacientes retorna às atividades leves em 1 a 2 semanas.</li>
</ul>

<h2>Dedo em gatilho e diabetes: atenção especial</h2>

<p>Se você é diabético e percebeu um dedo travando, é especialmente importante buscar avaliação. Pacientes com diabetes tendem a ter <strong>mais dedos acometidos</strong>, resposta menor à infiltração e risco discretamente maior de recidiva após cirurgia. O controle glicêmico adequado ajuda nos resultados do tratamento.</p>

<h2>Quando procurar um ortopedista?</h2>

<p>Procure avaliação se:</p>

<ul>
<li>Seu dedo está estalando ao dobrar ou esticar.</li>
<li>Há travamento — mesmo que consiga destravar sozinho.</li>
<li>Sente dor ou nódulo na palma da mão.</li>
<li>O dedo ficou preso em posição dobrada e não consegue esticar.</li>
</ul>

<p><strong>O dedo em gatilho tem tratamento eficaz e rápido.</strong> Nos casos cirúrgicos, o procedimento é simples, com anestesia local, e o alívio costuma ser percebido rapidamente. Resultados individuais podem variar.</p>

<h2>Saiba mais</h2>
<ul>
<li><a href="/blog/condicoes-mao-punho-guia-completo">Guia Completo: Principais Condições da Mão e Punho</a></li>
<li><a href="/condicoes/dedo-em-gatilho">Dedo em gatilho: diagnóstico e tratamento completo</a></li>
<li><a href="/condicoes/sindrome-do-tunel-do-carpo">Síndrome do túnel do carpo — outra condição comum da mão</a></li>
<li><a href="/especialidades/cirurgia-da-mao-e-punho">Conheça a atuação da Dra. Janaína em cirurgia da mão</a></li>
</ul>

<p><em>Dra. Janaína Drumond — Ortopedista e Traumatologista | CRM-MG 69719 | RQE 50592</em></p>
`,
    category: "Mão",
    published: true,
    created_at: "2026-02-01",
    updated_at: "2026-02-01",
  },
  {
    id: "4",
    slug: "dor-joelho-correr",
    title: "Dor no Joelho ao Correr: Causas",
    excerpt: "Queixa #1 de corredores. Quando é sério e quando é ajuste.",
    content: `
<p>Se você começou a correr e sentiu dor no joelho — ou se já corre há anos e a dor apareceu de repente — saiba que <strong>não está sozinho</strong>. Estudos mostram que cerca de <strong>40% dos corredores</strong> desenvolvem alguma lesão ao longo da prática, e o joelho é a região mais afetada.</p>

<p>Mas nem toda dor no joelho ao correr é motivo de alarme. Neste artigo, explico as causas mais comuns e, principalmente, como diferenciar o que é <strong>adaptação ao treino</strong> do que realmente precisa de atenção médica.</p>

<h2>1. Síndrome da Dor Femoropatelar (Runner's Knee)</h2>

<p>É a causa <strong>número 1</strong> de dor no joelho em corredores, com prevalência de <strong>19 a 30% nas mulheres</strong> e <strong>13 a 25% nos homens</strong> que correm. Mulheres têm o dobro de risco comparado aos homens.</p>

<p>A dor ocorre na <strong>região anterior do joelho</strong>, ao redor ou atrás da patela (rótula). O problema não é estrutural na maioria dos casos, mas sim um desequilíbrio de forças que altera o "trilho" por onde a patela desliza.</p>

<p><strong>Sintomas:</strong></p>
<ul>
<li>Dor na frente do joelho ao subir/descer escadas.</li>
<li>Dor ao agachar ou ficar sentado por muito tempo ("sinal do cinema").</li>
<li>Crepitação (estalos) ao dobrar o joelho.</li>
<li>Dor que piora com o aumento da quilometragem.</li>
</ul>

<p><strong>Causas principais:</strong> fraqueza dos músculos do quadril e glúteos, desequilíbrio do quadríceps, pronação excessiva do pé e aumento súbito do volume de treino.</p>

<h2>2. Síndrome da Banda Iliotibial</h2>

<p>A banda iliotibial (BIT) é uma faixa espessa de tecido que vai do quadril até a lateral do joelho. Quando essa banda atrita repetidamente contra o côndilo femoral lateral durante a corrida, gera inflamação e dor.</p>

<p><strong>Sintomas:</strong></p>
<ul>
<li>Dor na <strong>parte lateral (externa) do joelho</strong>.</li>
<li>Começa durante a corrida, piora progressivamente e pode impedir de continuar.</li>
<li>Piora em descidas e em superfícies inclinadas.</li>
<li>Pode haver sensação de "estalo" na lateral do joelho.</li>
</ul>

<p><strong>Causas:</strong> aumento brusco de distância ou intensidade, corrida em superfícies inclinadas, fraqueza dos abdutores do quadril e tênis desgastado.</p>

<h2>3. Tendinite Patelar (Joelho do Saltador)</h2>

<p>Inflamação do <strong>tendão patelar</strong>, que conecta a patela à tíbia. Embora seja mais comum em esportes com salto, também acomete corredores — especialmente os que treinam em subidas ou fazem treinos intervalados.</p>

<p><strong>Sintomas:</strong></p>
<ul>
<li>Dor logo <strong>abaixo da patela</strong>, bem no ponto do tendão.</li>
<li>Piora ao correr, saltar ou subir escadas.</li>
<li>Dor ao toque direto sobre o tendão.</li>
</ul>

<h2>4. Lesão Meniscal</h2>

<p>Os <strong>meniscos</strong> são duas "almofadas" de cartilagem dentro do joelho que absorvem impacto e estabilizam a articulação. Lesões podem ocorrer por trauma agudo (torção) ou por degeneração progressiva em corredores mais experientes (acima de 40 anos).</p>

<p><strong>Sintomas de alerta:</strong></p>
<ul>
<li>Dor no <strong>interior ou exterior do joelho</strong>, mais localizada.</li>
<li>Inchaço que surge horas após a corrida.</li>
<li>Sensação de <strong>travamento</strong> — como se algo impedisse o joelho de esticar completamente.</li>
<li>Estalos ao girar o corpo com o pé apoiado no chão.</li>
</ul>

<h2>5. Condromalácia Patelar</h2>

<p>É o <strong>amolecimento e desgaste da cartilagem</strong> na parte de trás da patela. Está intimamente ligada à síndrome femoropatelar e pode ser considerada uma evolução do quadro quando não tratado.</p>

<p><strong>Sintomas:</strong></p>
<ul>
<li>Dor anterior no joelho, semelhante à síndrome femoropatelar.</li>
<li>Sensação de "areia" ao dobrar o joelho.</li>
<li>Piora progressiva com a atividade.</li>
</ul>

<h2>Quando é só "ajuste" ao treino?</h2>

<p>Nem toda dor significa lesão. Dores leves e transitórias podem ser normais, especialmente quando:</p>

<ul>
<li>Você <strong>começou a correr recentemente</strong> ou aumentou o treino.</li>
<li>A dor é leve, aparece <strong>apenas durante a corrida</strong> e desaparece em repouso.</li>
<li>Não há inchaço, travamento ou instabilidade.</li>
<li>Melhora com descanso de 2-3 dias.</li>
</ul>

<h2>Quando é sério — sinais de alerta</h2>

<p>Procure um ortopedista se:</p>

<ul>
<li>A dor <strong>persiste por mais de 1 semana</strong> mesmo com repouso.</li>
<li>Há <strong>inchaço</strong> no joelho após a corrida.</li>
<li>Sensação de <strong>travamento ou falseio</strong> (joelho "falha").</li>
<li>Dor que impede atividades do dia a dia (subir escada, agachar).</li>
<li>Dor noturna.</li>
<li>Houve um episódio agudo — torção, estalo alto seguido de inchaço rápido.</li>
</ul>

<h2>Prevenção: o que funciona</h2>

<ul>
<li><strong>Fortalecimento muscular:</strong> glúteos, quadríceps e core são fundamentais. A fraqueza dessas musculaturas é o fator mais modificável.</li>
<li><strong>Progressão gradual:</strong> a regra dos 10% — não aumente mais de 10% da quilometragem por semana.</li>
<li><strong>Calçado adequado:</strong> troque o tênis a cada 500-800 km e considere avaliação de pisada.</li>
<li><strong>Variar superfície:</strong> alternar asfalto, terra e esteira reduz o estresse repetitivo.</li>
<li><strong>Alongamento e mobilidade:</strong> especialmente da banda iliotibial, isquiotibiais e panturrilha.</li>
</ul>

<p><strong>A corrida não destrói o joelho</strong> — pelo contrário, estudos mostram que corredores têm menor incidência de artrose comparados a sedentários. O segredo é respeitar os limites do corpo e fortalecer a musculatura de suporte.</p>

<h2>Saiba mais</h2>
<ul>
<li><a href="/condicoes/dor-no-joelho-menisco">Dor no joelho: menisco, condromalácia e artrose</a></li>
<li><a href="/condicoes/entorse-de-tornozelo">Entorse de tornozelo — outra lesão comum em esportes</a></li>
</ul>

<p><em>Dra. Janaína Drumond — Ortopedista e Traumatologista | CRM-MG 69719 | RQE 50592</em></p>
`,
    category: "Joelho",
    published: true,
    created_at: "2026-01-20",
    updated_at: "2026-01-20",
  },
  {
    id: "5",
    slug: "formigamento-dedos-noite",
    title: "Formigamento nos Dedos à Noite",
    excerpt: "Pode ser túnel do carpo. Saiba diferenciar e quando agir.",
    content: `
<p>Você acorda no meio da noite com a mão dormente? Precisa sacudir os dedos para "voltar a sentir"? Esse formigamento noturno é um dos sintomas que mais levam pacientes ao meu consultório — e na grande maioria dos casos, a causa tem nome: <strong>síndrome do túnel do carpo</strong>.</p>

<p>Mas nem todo formigamento nos dedos à noite é túnel do carpo. Neste artigo, explico como identificar a causa e quando procurar avaliação.</p>

<h2>Por que o formigamento piora à noite?</h2>

<p>Existem razões fisiológicas claras para isso:</p>

<ul>
<li><strong>Posição do punho durante o sono:</strong> naturalmente tendemos a dobrar os punhos quando dormimos. Essa flexão aumenta a pressão dentro do túnel do carpo e comprime o nervo mediano.</li>
<li><strong>Retenção de líquidos:</strong> ao deitar, a redistribuição dos fluidos corporais pode aumentar o edema ao redor do nervo.</li>
<li><strong>Ausência de movimento:</strong> durante o dia, os movimentos das mãos ajudam a "bombear" fluidos e manter a circulação. À noite, com a imobilidade, a pressão se acumula.</li>
</ul>

<h2>Causa #1: Síndrome do Túnel do Carpo</h2>

<p>Responsável pela <strong>maioria dos casos</strong> de formigamento noturno nas mãos. O nervo mediano é comprimido no punho, gerando dormência nos dedos que ele inerva.</p>

<p><strong>Dedos afetados:</strong> polegar, indicador, médio e metade do anelar (do lado do polegar).</p>

<p><strong>Pista importante:</strong> se o <strong>dedo mínimo NÃO está formigando</strong>, isso aponta fortemente para o túnel do carpo, pois o mínimo é inervado por outro nervo (o ulnar).</p>

<p><strong>Sintomas associados:</strong></p>
<ul>
<li>Necessidade de "sacudir" a mão para aliviar (sinal do flick).</li>
<li>Formigamento ao segurar o celular, volante ou livro.</li>
<li>Perda de força — objetos caem da mão.</li>
<li>Em casos avançados, atrofia muscular na base do polegar.</li>
</ul>

<h2>Causa #2: Compressão do Nervo Ulnar</h2>

<p>O <strong>nervo ulnar</strong> pode ser comprimido em dois locais: no cotovelo (síndrome do túnel cubital — mais comum) ou no punho (canal de Guyon).</p>

<p><strong>Dedos afetados:</strong> dedo mínimo e metade do anelar (do lado do mínimo) — exatamente o oposto do túnel do carpo.</p>

<p><strong>Sintomas:</strong></p>
<ul>
<li>Formigamento no 4° e 5° dedos.</li>
<li>Piora ao manter o cotovelo dobrado (falar ao telefone, dormir com o braço fletido).</li>
<li>Fraqueza para abrir e fechar a mão, dificuldade para segurar objetos entre os dedos.</li>
</ul>

<h2>Causa #3: Neuropatia Periférica</h2>

<p>Condição em que os nervos periféricos estão danificados, geralmente em <strong>padrão simétrico</strong> (ambas as mãos e/ou pés).</p>

<p><strong>Principal causa:</strong> diabetes mellitus — a neuropatia diabética afeta até 50% dos diabéticos ao longo da vida.</p>

<p><strong>Diferença:</strong> o formigamento tende a ser difuso, acometendo <strong>todos os dedos igualmente</strong> em ambas as mãos, frequentemente acompanhado de sintomas nos pés ("bota e luva").</p>

<h2>Causa #4: Alterações na Coluna Cervical</h2>

<p>Hérnias de disco ou estenose cervical podem comprimir as raízes nervosas que formam os nervos do braço e da mão.</p>

<p><strong>Diferenças:</strong></p>
<ul>
<li>Formigamento acompanhado de <strong>dor no pescoço</strong> que irradia para o braço.</li>
<li>Piora ao movimentar o pescoço.</li>
<li>Pode afetar o braço inteiro, não apenas a mão.</li>
<li>O padrão dos dedos afetados depende de qual raiz está comprimida (C6: polegar e indicador; C7: dedo médio; C8: anelar e mínimo).</li>
</ul>

<h2>Causa #5: Deficiência de Vitamina B12</h2>

<p>A vitamina B12 é essencial para a saúde dos nervos. Sua deficiência pode causar neuropatia com formigamento nas extremidades.</p>

<p><strong>Grupos de risco:</strong> vegetarianos/veganos, idosos, pacientes que usam metformina ou inibidores de bomba de prótons por tempo prolongado.</p>

<p><strong>Diferença:</strong> o formigamento é bilateral, simétrico, acompanhado frequentemente de <strong>fadiga, alterações de memória e fraqueza</strong>.</p>

<h2>Como diferenciar? Um guia rápido</h2>

<div class="compare-grid">

<div class="compare-card">
<div class="compare-header">Túnel do Carpo</div>
<div class="compare-body">
<div class="compare-row"><span class="compare-label">Dedos afetados</span><span>Polegar, indicador, médio e ½ anelar</span></div>
<div class="compare-row"><span class="compare-label">Piora com</span><span>Flexão do punho</span></div>
<div class="compare-row"><span class="compare-label">Dor no pescoço</span><span>Não</span></div>
<div class="compare-row"><span class="compare-label">Bilateral?</span><span>Frequente</span></div>
</div>
</div>

<div class="compare-card">
<div class="compare-header">Nervo Ulnar</div>
<div class="compare-body">
<div class="compare-row"><span class="compare-label">Dedos afetados</span><span>Mínimo e ½ anelar</span></div>
<div class="compare-row"><span class="compare-label">Piora com</span><span>Flexão do cotovelo</span></div>
<div class="compare-row"><span class="compare-label">Dor no pescoço</span><span>Não</span></div>
<div class="compare-row"><span class="compare-label">Bilateral?</span><span>Geralmente um lado</span></div>
</div>
</div>

<div class="compare-card">
<div class="compare-header">Neuropatia</div>
<div class="compare-body">
<div class="compare-row"><span class="compare-label">Dedos afetados</span><span>Todos, simétrico</span></div>
<div class="compare-row"><span class="compare-label">Piora com</span><span>Noite e repouso</span></div>
<div class="compare-row"><span class="compare-label">Dor no pescoço</span><span>Não</span></div>
<div class="compare-row"><span class="compare-label">Bilateral?</span><span>Sempre bilateral</span></div>
</div>
</div>

<div class="compare-card">
<div class="compare-header">Cervical</div>
<div class="compare-body">
<div class="compare-row"><span class="compare-label">Dedos afetados</span><span>Variável conforme raiz nervosa</span></div>
<div class="compare-row"><span class="compare-label">Piora com</span><span>Movimento do pescoço</span></div>
<div class="compare-row"><span class="compare-label">Dor no pescoço</span><span>Sim</span></div>
<div class="compare-row"><span class="compare-label">Bilateral?</span><span>Geralmente um lado</span></div>
</div>
</div>

</div>

<h2>Que exames são necessários?</h2>

<ul>
<li><strong>Eletroneuromiografia (ENMG):</strong> exame-chave para confirmar e classificar a compressão nervosa. Mede a velocidade de condução do nervo e identifica exatamente onde está o problema.</li>
<li><strong>Exames de sangue:</strong> glicemia, hemoglobina glicada (para diabetes), dosagem de B12.</li>
<li><strong>Ressonância da coluna cervical:</strong> quando há suspeita de hérnia ou compressão radicular.</li>
<li><strong>Ultrassom do punho:</strong> pode mostrar espessamento do nervo mediano.</li>
</ul>

<h2>Quando procurar um ortopedista?</h2>

<p>Procure avaliação se:</p>

<ul>
<li>O formigamento acontece <strong>mais de 3 vezes por semana</strong>.</li>
<li>Está piorando progressivamente.</li>
<li>Há <strong>perda de força</strong> na mão.</li>
<li>Você percebe <strong>atrofia</strong> (diminuição do volume muscular) na mão.</li>
<li>O formigamento persiste durante o dia.</li>
<li>Começou após trauma ou queda.</li>
</ul>

<p><strong>O formigamento noturno nos dedos é o corpo pedindo atenção.</strong> Na maioria das vezes, o diagnóstico é simples, o tratamento é eficaz e, quando abordado precocemente, os resultados são excelentes.</p>

<h2>Saiba mais</h2>
<ul>
<li><a href="/blog/condicoes-mao-punho-guia-completo">Guia Completo: Principais Condições da Mão e Punho</a></li>
<li><a href="/condicoes/sindrome-do-tunel-do-carpo">Saiba mais sobre a síndrome do túnel do carpo e suas opções de tratamento</a></li>
<li><a href="/blog/sindrome-tunel-do-carpo">Túnel do carpo: sintomas, causas e tratamento completo</a></li>
<li><a href="/especialidades/cirurgia-da-mao-e-punho">Conheça a atuação da Dra. Janaína em cirurgia da mão</a></li>
</ul>

<p><em>Dra. Janaína Drumond — Ortopedista e Traumatologista | CRM-MG 69719 | RQE 50592</em></p>
`,
    category: "Mão",
    published: true,
    created_at: "2026-01-10",
    updated_at: "2026-01-10",
  },
];

export async function getPosts(): Promise<BlogPost[]> {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) return data;
    } catch {
      // Supabase indisponivel — fallback para posts estaticos
    }
  }

  return STATIC_POSTS;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (!error && data) return data;
    } catch {
      // Supabase indisponivel — fallback para posts estaticos
    }
  }

  return STATIC_POSTS.find((p) => p.slug === slug) || null;
}
