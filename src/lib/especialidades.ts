export type ExerciseData = {
  frame0: string;
  frame1: string;
  name: string;
  tip: string;
  steps?: string[];
  duration?: string;
  frequency?: string;
  caution?: string;
  video?: string;
};

export type Section = {
  icon: string;
  title: string;
  items: string[];
  note?: string;
  exercise?: ExerciseData;
};

export type Especialidade = {
  num: string;
  slug: string;
  tag: string;
  title: string;
  desc: string;
  icon: string;
  tags: string[];
  gradient: string;
  content: string;
  sections?: Section[];
  intro?: string;
  outro?: string;
};

export const ESPECIALIDADES: Especialidade[] = [
  {
    num: "01",
    slug: "ortopedia-geral",
    tag: "Base ampla",
    title: "Ortopedia Geral",
    desc: "Avaliação completa de membros superiores e inferiores. Dores articulares, lesões, fraturas, tendinites, bursites.",
    icon: "🩻",
    tags: ["Dor no Ombro", "Dor no Joelho", "Coluna", "Quadril", "Fraturas"],
    gradient: "from-teal-pale to-cream",
    intro: "A ortopedia geral é a base da minha atuação. Como ortopedista e traumatologista, realizo a avaliação completa do sistema musculoesquelético — ossos, articulações, músculos, tendões e ligamentos de todo o corpo. Você não precisa saber exatamente o que tem antes de vir ao consultório. Minha função é investigar, diagnosticar e direcionar o melhor tratamento.",
    sections: [
      {
        icon: "🦴",
        title: "Ombro",
        items: [
          "Tendinite e lesão do manguito rotador — a causa mais comum de dor no ombro em adultos acima de 40 anos.",
          "Bursite subacromial — inflamação da bursa, geralmente associada à tendinite.",
          "Capsulite adesiva (ombro congelado) — rigidez progressiva, mais comum em diabéticos e mulheres entre 40 e 60 anos.",
          "Síndrome do impacto — compressão dos tendões entre os ossos do ombro.",
        ],
        exercise: {
          frame0: "/exercises/shoulder_0.jpg",
          frame1: "/exercises/shoulder_1.jpg",
          name: "Along. ombro/braço",
          tip: "Puxar dedos para trás, 20s",
          steps: ["Estenda o braço à frente na altura do ombro.", "Com a outra mão, puxe os dedos para trás suavemente.", "Mantenha o cotovelo reto e sinta o alongamento no antebraço e ombro.", "Segure 20 segundos e troque de lado."],
          duration: "20 segundos cada lado, 3 repetições",
          frequency: "2-3x ao dia",
          caution: "Não force além do confortável. Pare se sentir dor aguda ou formigamento.",
        },
      },
      {
        icon: "🦵",
        title: "Joelho",
        items: [
          "Lesão meniscal — pode ser traumática (esportes) ou degenerativa (acima dos 40 anos). Travamento e estalos são sinais de alerta.",
          "Condromalácia patelar — amolecimento da cartilagem da rótula. Muito comum em mulheres jovens.",
          "Artrose (gonartrose) — desgaste da cartilagem articular, mais frequente após os 50 anos.",
          "Lesões ligamentares — LCA, LCP, ligamentos colaterais.",
        ],
        exercise: {
          frame0: "/exercises/quad_0.jpg",
          frame1: "/exercises/quad_1.jpg",
          name: "Along. quadríceps",
          tip: "Deitado, 20s cada lado",
          steps: ["Deite de barriga para cima com as pernas estendidas.", "Dobre um joelho e traga o calcanhar em direção ao glúteo.", "Segure o tornozelo ou pé com a mão do mesmo lado.", "Puxe suavemente mantendo o joelho apontando para o chão.", "Segure 20 segundos e troque de lado."],
          duration: "20 segundos cada lado, 3 repetições",
          frequency: "2x ao dia",
          caution: "Mantenha a lombar apoiada no chão. Não force se sentir dor no joelho.",
        },
      },
      {
        icon: "🧍",
        title: "Coluna",
        items: [
          "Lombalgia — primeira causa de afastamento do trabalho no Brasil. 80% da população terá ao menos um episódio.",
          "Hérnia de disco — quando o disco comprime um nervo, pode causar ciatalgia (dor irradiada para a perna).",
          "Cervicalgia — dor no pescoço, frequentemente associada a má postura e uso de computador/celular.",
        ],
        exercise: {
          frame0: "/exercises/spine_0.jpg",
          frame1: "/exercises/spine_1.jpg",
          name: "Cat stretch",
          tip: "Respire fundo, 15s",
          steps: ["Fique em quatro apoios (mãos e joelhos no chão).", "Inspire e deixe a barriga descer, olhando para cima (cow).", "Expire e arredonde a coluna para cima, queixo no peito (cat).", "Alterne suavemente entre as duas posições."],
          duration: "10 repetições lentas e controladas",
          frequency: "2-3x ao dia — ideal ao acordar e antes de dormir",
          caution: "Movimentos devem ser fluidos e sem dor. Evite se tiver hérnia de disco aguda.",
        },
      },
      {
        icon: "🏃",
        title: "Quadril",
        items: [
          "Artrose do quadril (coxartrose) — dor na virilha que piora ao caminhar.",
          "Bursite trocantérica — dor lateral do quadril, especialmente ao deitar sobre o lado.",
          "Impacto femoroacetabular — causa frequente de dor no quadril em jovens ativos.",
        ],
        exercise: {
          frame0: "/exercises/hip_0.jpg",
          frame1: "/exercises/hip_1.jpg",
          name: "Lunge do flexor",
          tip: "Desça devagar, 20s",
          steps: ["Em pé, dê um passo largo à frente.", "Desça o quadril flexionando o joelho da frente a 90°.", "A perna de trás se estende, alongando o flexor do quadril.", "Mantenha o tronco ereto e mãos na cintura.", "Segure 20 segundos e troque de lado."],
          duration: "20 segundos cada lado, 3 repetições",
          frequency: "2x ao dia — especialmente após ficar muito sentado",
          caution: "O joelho da frente não deve ultrapassar a ponta do pé. Desça devagar.",
        },
      },
      {
        icon: "🩹",
        title: "Fraturas e Traumatismos",
        items: [
          "Avaliação e tratamento de fraturas em geral — membros superiores e inferiores.",
          "Entorses — tornozelo, joelho, punho.",
          "Luxações — ombro, cotovelo, dedos.",
          "Orientação sobre imobilização, reabilitação e retorno às atividades.",
        ],
        exercise: {
          frame0: "/exercises/full_0.jpg",
          frame1: "/exercises/full_1.jpg",
          name: "Along. corpo inteiro",
          tip: "Braços acima, 10s",
          steps: ["Sente-se em uma cadeira com os pés apoiados no chão.", "Inspire e eleve os braços acima da cabeça.", "Estique-se ao máximo, alongando toda a coluna.", "Expire e abaixe os braços lentamente.", "Repita com respiração profunda e controlada."],
          duration: "5 repetições com respiração profunda",
          frequency: "A cada 1-2h de trabalho sentado",
          caution: "Não prenda a respiração. Movimentos suaves e progressivos.",
        },
      },
    ],
    outro: "Acredito em um atendimento que combina precisão diagnóstica com explicação clara. Antes de qualquer tratamento, você vai entender exatamente o que está acontecendo. Uso exame físico detalhado, solicito apenas os exames realmente necessários e priorizo o tratamento conservador sempre que possível — cirurgia é o último recurso, não o primeiro.",
    content: `
<p>A ortopedia geral é a base da minha atuação. Como ortopedista e traumatologista, realizo a <strong>avaliação completa do sistema musculoesquelético</strong> — ossos, articulações, músculos, tendões e ligamentos de todo o corpo.</p>

<p>Isso significa que você não precisa saber exatamente o que tem antes de vir ao consultório. Minha função é investigar, diagnosticar e direcionar o melhor tratamento — seja ele conservador ou cirúrgico.</p>

<h2>O que trato em Ortopedia Geral?</h2>

<h3>Ombro</h3>
<ul>
<li><strong>Tendinite e lesão do manguito rotador</strong> — a causa mais comum de dor no ombro em adultos acima de 40 anos. Afeta até 26% da população em algum momento.</li>
<li><strong>Bursite subacromial</strong> — inflamação da bursa, geralmente associada à tendinite.</li>
<li><strong>Capsulite adesiva (ombro congelado)</strong> — rigidez progressiva, mais comum em diabéticos e mulheres entre 40 e 60 anos.</li>
<li><strong>Síndrome do impacto</strong> — compressão dos tendões entre os ossos do ombro.</li>
</ul>

<h3>Joelho</h3>
<ul>
<li><strong>Lesão meniscal</strong> — pode ser traumática (esportes) ou degenerativa (acima dos 40 anos). Travamento e estalos são sinais de alerta.</li>
<li><strong>Condromalácia patelar</strong> — amolecimento da cartilagem da rótula. Muito comum em mulheres jovens e praticantes de atividade física.</li>
<li><strong>Artrose (gonartrose)</strong> — desgaste da cartilagem articular, mais frequente após os 50 anos.</li>
<li><strong>Lesões ligamentares</strong> — LCA, LCP, ligamentos colaterais.</li>
</ul>

<h3>Coluna</h3>
<ul>
<li><strong>Lombalgia</strong> — primeira causa de afastamento do trabalho no Brasil. 80% da população terá ao menos um episódio na vida.</li>
<li><strong>Hérnia de disco</strong> — quando o disco comprime um nervo, pode causar ciatalgia (dor irradiada para a perna).</li>
<li><strong>Cervicalgia</strong> — dor no pescoço, frequentemente associada a má postura e uso de computador/celular.</li>
</ul>

<h3>Quadril</h3>
<ul>
<li><strong>Artrose do quadril (coxartrose)</strong> — dor na virilha que piora ao caminhar.</li>
<li><strong>Bursite trocantérica</strong> — dor lateral do quadril, especialmente ao deitar sobre o lado.</li>
<li><strong>Impacto femoroacetabular</strong> — causa frequente de dor no quadril em jovens ativos.</li>
</ul>

<h3>Fraturas e Traumatismos</h3>
<ul>
<li>Avaliação e tratamento de <strong>fraturas em geral</strong> — membros superiores e inferiores.</li>
<li><strong>Entorses</strong> — tornozelo, joelho, punho.</li>
<li><strong>Luxações</strong> — ombro, cotovelo, dedos.</li>
<li>Orientação sobre imobilização, reabilitação e retorno às atividades.</li>
</ul>

<h2>Minha abordagem</h2>

<p>Acredito em um atendimento que combina <strong>precisão diagnóstica</strong> com <strong>explicação clara</strong>. Antes de qualquer tratamento, você vai entender exatamente o que está acontecendo. Uso exame físico detalhado, solicito apenas os exames realmente necessários e priorizo o <strong>tratamento conservador</strong> sempre que possível — cirurgia é o último recurso, não o primeiro.</p>

<p>Quando identifico necessidade de tratamento especializado em áreas como cirurgia da coluna ou próteses, encaminho para colegas de confiança, garantindo a melhor condução do seu caso.</p>

<p><em>Dra. Janaína Drumond — Ortopedista e Traumatologista | CRM-MG 69719 | RQE 50592</em></p>
`,
  },
  {
    num: "02",
    slug: "cirurgia-da-mao-e-punho",
    tag: "Diferencial",
    title: "Mão e Punho",
    desc: "Subespecialidade e diferencial clínico. Domínio de todas as condições da extremidade distal.",
    icon: "🤚",
    tags: ["Túnel do Carpo", "Dedo em Gatilho", "Rizartrose", "Fratura Punho", "Cisto Sinovial", "De Quervain"],
    gradient: "from-cream to-teal-pale",
    intro: "A cirurgia da mão e punho é minha subespecialidade e meu diferencial. Tenho formação específica nessa área, com pós-graduação pela Faculdade Ciências Médicas de Minas Gerais. As mãos são ferramentas essenciais para viver, trabalhar e criar.",
    sections: [
      {
        icon: "🖐️",
        title: "Síndrome do Túnel do Carpo",
        items: [
          "Neuropatia compressiva mais comum do corpo — dormência noturna, formigamento nos dedos e perda de força.",
          "Afeta principalmente mulheres entre 40-60 anos.",
          "Cirurgia de liberação com taxa de sucesso superior a 90% — anestesia local.",
        ],
        exercise: {
          frame0: "/exercises/mao_tunel_0.jpg",
          frame1: "/exercises/mao_tunel_1.jpg",
          name: "Círculos de punho",
          tip: "10 rotações cada lado",
          steps: ["Estenda o braço à frente com o cotovelo reto.", "Feche a mão suavemente sem apertar.", "Gire o punho fazendo círculos lentos no sentido horário.", "Complete 10 rotações e inverta para anti-horário.", "Repita com a outra mão."],
          duration: "10 rotações em cada sentido, cada mão",
          frequency: "3x ao dia — manhã, almoço e fim do expediente",
          caution: "Pare se sentir dor aguda ou estalo. Movimentos lentos e controlados.",
        },
      },
      {
        icon: "☝️",
        title: "Dedo em Gatilho",
        items: [
          "Dedo 'trava' ao flexionar — inflamação da polia A1.",
          "Prevalência de 1-2% geral, mas 5-20% em diabéticos.",
          "Cirurgia de 20 minutos com anestesia local — taxa de sucesso de 95-99%.",
        ],
        exercise: {
          frame0: "/exercises/mao_gatilho_0.jpg",
          frame1: "/exercises/mao_gatilho_1.jpg",
          name: "Flexão de dedos",
          tip: "Abrir e fechar, 15 reps",
          steps: ["Estenda a mão com os dedos abertos e retos.", "Feche os dedos lentamente até formar um punho.", "Segure o punho fechado por 2 segundos.", "Abra os dedos lentamente esticando ao máximo.", "Repita o movimento de abrir e fechar."],
          duration: "15 repetições com cada mão",
          frequency: "3x ao dia — a cada 2h de trabalho manual",
          caution: "Se algum dedo travar, não force. Solte e recomece suavemente.",
        },
      },
      {
        icon: "👍",
        title: "Rizartrose",
        items: [
          "Artrose na base do polegar — dor ao abrir garrafas, girar chaves e segurar panelas.",
          "Afeta 10-20% das mulheres após os 40 anos.",
          "Trapeziectomia com remissão da dor em até 90% dos pacientes.",
        ],
        exercise: {
          frame0: "/exercises/mao_rizar_0.jpg",
          frame1: "/exercises/mao_rizar_1.jpg",
          name: "Apertar e soltar",
          tip: "Fortalecer preensão, 10x",
          steps: ["Segure uma bolinha de borracha na palma da mão.", "Aperte a bolinha com todos os dedos, incluindo o polegar.", "Mantenha a pressão por 3-5 segundos.", "Solte lentamente, abrindo bem os dedos.", "Repita com a outra mão."],
          duration: "10 apertos com cada mão, 3 séries",
          frequency: "2x ao dia",
          caution: "Use bolinha macia no início. Evite se tiver dor aguda na base do polegar.",
          video: "/exercises/videos/apertar-e-soltar.mp4",
        },
      },
      {
        icon: "✋",
        title: "Tendinite de Quervain",
        items: [
          "Inflamação dos tendões do polegar — a 'tendinite das mães'.",
          "Até 50% das mulheres no pós-parto são afetadas.",
          "Infiltração com sucesso de 70-80% na literatura; cirurgia rápida e bem estabelecida quando necessária.",
        ],
        exercise: {
          frame0: "/exercises/mao_quervain_0.jpg",
          frame1: "/exercises/mao_quervain_1.jpg",
          name: "Along. do polegar",
          tip: "Alongar polegar, 20s",
          steps: ["Estenda a mão afetada com a palma para baixo.", "Com a outra mão, segure o polegar suavemente.", "Puxe o polegar para baixo em direção ao punho.", "Sinta o alongamento na base do polegar e lado do punho.", "Segure 20 segundos e solte devagar."],
          duration: "20 segundos, 3 repetições em cada mão",
          frequency: "3x ao dia — após uso repetitivo do polegar (celular, mouse)",
          caution: "Alongamento suave, sem dor. Se sentir formigamento, solte imediatamente.",
        },
      },
      {
        icon: "🦴",
        title: "Fraturas do Punho e Mão",
        items: [
          "Fratura do rádio distal (Colles) — a fratura mais comum do membro superior.",
          "Fratura de escafoide — raio-X falso-negativo em até 25% dos casos.",
          "Fraturas de metacarpos e falanges — tratamento conservador ou cirúrgico.",
        ],
        exercise: {
          frame0: "/exercises/mao_fratura_0.jpg",
          frame1: "/exercises/mao_fratura_1.jpg",
          name: "Rotação de punho",
          tip: "Com barra, 10 cada lado",
          steps: ["Segure uma barra leve ou bastão com as duas mãos.", "Mantenha os cotovelos junto ao corpo, flexionados a 90°.", "Gire os punhos lentamente para a direita.", "Retorne ao centro e gire para a esquerda.", "Mantenha o movimento fluido e controlado."],
          duration: "10 rotações para cada lado, 3 séries",
          frequency: "2x ao dia — fundamental na reabilitação pós-fratura",
          caution: "Amplitude deve aumentar progressivamente. Nunca force além do confortável.",
        },
      },
      {
        icon: "💧",
        title: "Cisto Sinovial (Ganglion)",
        items: [
          "Nódulo benigno preenchido por líquido sinovial, mais comum no dorso do punho.",
          "Na maioria dos casos é assintomático e pode ser observado.",
          "Aspiração ou excisão cirúrgica quando causa dor ou limitação.",
        ],
        exercise: {
          frame0: "/exercises/mao_cisto_0.jpg",
          frame1: "/exercises/mao_cisto_1.jpg",
          name: "Along. antebraço",
          tip: "Puxar dedos, 20s",
          steps: ["Estenda o braço à frente com o cotovelo reto, palma para baixo.", "Com a outra mão, puxe os dedos para trás (em direção ao corpo).", "Sinta o alongamento na parte interna do antebraço.", "Segure por 20 segundos.", "Inverta: palma para cima e puxe os dedos para baixo. Segure 20s."],
          duration: "20 segundos cada posição, 3 repetições",
          frequency: "3x ao dia — essencial para quem usa computador/celular",
          caution: "Deve ser confortável, não doloroso. Respire normalmente.",
        },
      },
    ],
    outro: "A mão é uma estrutura de extrema complexidade — 27 ossos, dezenas de tendões, múltiplos nervos e vasos em um espaço pequeno. Uma cirurgia bem feita exige conhecimento anatômico profundo, técnica refinada e instrumentos específicos. A formação especializada garante a precisão que suas mãos merecem.",
    content: `
<p>A cirurgia da mão e punho é minha <strong>subespecialidade e meu diferencial</strong>. Tenho formação específica nessa área, com pós-graduação pela <strong>Faculdade Ciências Médicas de Minas Gerais</strong>.</p>

<p>As mãos são ferramentas essenciais para <strong>viver, trabalhar e criar</strong>. Quando uma condição na mão limita sua função, o impacto na qualidade de vida é imenso — desde a incapacidade de abotoar uma camisa até a impossibilidade de exercer sua profissão.</p>

<h2>Condições que trato</h2>

<h3>Síndrome do Túnel do Carpo</h3>
<p>A neuropatia compressiva mais comum do corpo. Causa dormência noturna, formigamento nos dedos e perda de força. Afeta principalmente mulheres entre 40-60 anos. A cirurgia de liberação tem taxa de sucesso superior a <strong>90%</strong> e pode ser realizada com anestesia local.</p>

<h3>Dedo em Gatilho</h3>
<p>O dedo "trava" ao flexionar — causado por inflamação da polia A1. Prevalência de 1-2% na população geral, mas 5-20% em diabéticos. A cirurgia dura apenas <strong>20 minutos</strong> com anestesia local e tem taxa de sucesso de <strong>95-99%</strong>.</p>

<h3>Rizartrose</h3>
<p>Artrose na base do polegar que causa dor ao abrir garrafas, girar chaves e segurar panelas. Afeta 10-20% das mulheres após os 40 anos. Nos estágios avançados, a trapeziectomia oferece remissão da dor em até <strong>90% dos pacientes</strong>.</p>

<h3>Tendinite de Quervain</h3>
<p>Inflamação dos tendões do polegar — a "tendinite das mães". Até 50% das mulheres no pós-parto são afetadas. Infiltração com corticoide tem sucesso de 70-80% segundo a literatura; a cirurgia, quando necessária, é rápida e bem estabelecida. Resultados individuais podem variar.</p>

<h3>Fraturas do Punho e Mão</h3>
<ul>
<li><strong>Fratura do rádio distal (Colles)</strong> — a fratura mais comum do membro superior. Tratamento com gesso ou fixação cirúrgica com placa.</li>
<li><strong>Fratura de escafoide</strong> — o raio-X pode ser falso-negativo em até 25% dos casos. Risco de necrose avascular de 13-40% nas fraturas proximais.</li>
<li><strong>Fraturas de metacarpos e falanges</strong> — tratamento conservador ou cirúrgico conforme estabilidade.</li>
</ul>

<h3>Cisto Sinovial (Ganglion)</h3>
<p>Nódulo benigno preenchido por líquido sinovial, mais comum no dorso do punho. Na maioria dos casos é assintomático e pode ser apenas observado. Quando causa dor ou limitação, a aspiração ou excisão cirúrgica resolve o quadro.</p>

<h3>Lesões Tendíneas e Nervosas</h3>
<ul>
<li>Reparação de tendões flexores e extensores.</li>
<li>Microcirurgia de nervos periféricos.</li>
<li>Reimplantes digitais em casos selecionados.</li>
</ul>

<h2>Procedimentos que realizo</h2>

<p>A maioria das cirurgias da mão pode ser realizada com <strong>anestesia local ou regional</strong>, em ambiente ambulatorial (day clinic), com retorno para casa no mesmo dia:</p>

<ul>
<li>Liberação do túnel do carpo (aberta ou endoscópica).</li>
<li>Liberação de dedo em gatilho.</li>
<li>Trapeziectomia para rizartrose.</li>
<li>Liberação da tendinite de Quervain.</li>
<li>Excisão de cisto sinovial.</li>
<li>Fixação de fraturas com parafusos, fios ou placas.</li>
<li>Reparação de tendões e nervos.</li>
</ul>

<h2>Por que a especialização importa?</h2>

<p>A mão é uma estrutura de <strong>extrema complexidade</strong> — em um espaço pequeno convivem 27 ossos, dezenas de tendões, múltiplos nervos e vasos. Uma cirurgia bem feita na mão exige conhecimento anatômico profundo, técnica refinada e instrumentos específicos. A formação especializada garante que cada procedimento seja realizado com a precisão que suas mãos merecem.</p>

<p><em>Dra. Janaína Drumond — Ortopedista e Traumatologista | Cirurgia da Mão e Punho | CRM-MG 69719 | RQE 50592</em></p>
`,
  },
];

export function getEspecialidadeBySlug(slug: string): Especialidade | undefined {
  return ESPECIALIDADES.find((e) => e.slug === slug);
}
