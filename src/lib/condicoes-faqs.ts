import type { FaqItem } from "@/lib/schema";

/** Condições piloto — Livro-Guia (schema BlogPosting + FAQPage). */
export const PRIORITY_CONDICAO_SLUGS = [
  "sindrome-do-tunel-do-carpo",
  "dedo-em-gatilho",
  "rizartrose",
] as const;

export type PriorityCondicaoSlug = (typeof PRIORITY_CONDICAO_SLUGS)[number];

const CONDICAO_FAQS: Record<string, FaqItem[]> = {
  "sindrome-do-tunel-do-carpo": [
    {
      question: "O que é a síndrome do túnel do carpo?",
      answer:
        "É a compressão do nervo mediano no punho, dentro do túnel do carpo. Causa dormência e formigamento nos dedos (muitas vezes à noite), dor no punho e perda de força na mão. É a neuropatia compressiva mais comum do corpo humano.",
    },
    {
      question: "Formigamento na mão de noite é normal?",
      answer:
        "Não. Formigamento noturno recorrente — especialmente no polegar, indicador e médio — é o sintoma mais clássico do túnel do carpo. Se ocorre mais de três vezes por semana ou está piorando, procure avaliação ortopédica.",
    },
    {
      question: "A síndrome do túnel do carpo tem cura?",
      answer:
        "Na maioria dos casos, o tratamento adequado permite resolução ou melhora significativa. Casos leves respondem a órtese noturna e fisioterapia; casos moderados a graves costumam se beneficiar da cirurgia de liberação do ligamento, com taxa de sucesso superior a 90% na literatura. Resultados variam conforme o estágio.",
    },
    {
      question: "Quanto tempo dura a cirurgia de túnel do carpo?",
      answer:
        "Em geral de 15 a 30 minutos, com anestesia local ou regional. O paciente recebe alta no mesmo dia. A recuperação funcional completa pode levar algumas semanas, conforme a gravidade pré-operatória.",
    },
    {
      question: "A cirurgia de túnel do carpo é perigosa?",
      answer:
        "É um procedimento seguro e bem estabelecido, com baixa taxa de complicações graves. Os riscos e benefícios são discutidos na consulta; a indicação cirúrgica segue critérios clínicos e, quando necessário, exames complementares.",
    },
  ],
  "dedo-em-gatilho": [
    {
      question: "O que é dedo em gatilho?",
      answer:
        "É a tenossinovite estenosante: o tendão flexor incha e prende na polia A1, na base do dedo. Causa dor na palma, estalido ao movimentar e travamento ao flexionar. É mais comum em mulheres entre 40 e 60 anos e em diabéticos.",
    },
    {
      question: "Meu dedo trava ao dobrar. É grave?",
      answer:
        "Não é uma emergência, mas tende a piorar sem tratamento. Nos graus iniciais, infiltração e fisioterapia costumam ajudar; com travamento persistente, a cirurgia de liberação da polia é rápida e tem alta taxa de sucesso na literatura.",
    },
    {
      question: "Dedo em gatilho pode melhorar sem cirurgia?",
      answer:
        "Sim, especialmente nos graus I e II: repouso relativo, órtese, anti-inflamatórios, infiltração com corticoide e fisioterapia. Quando o dedo permanece travado ou não responde ao conservador, a cirurgia ambulatorial sob anestesia local é indicada.",
    },
    {
      question: "Quanto tempo dura a cirurgia de dedo em gatilho?",
      answer:
        "Cerca de 15 a 20 minutos, em ambiente cirúrgico, com anestesia local. A alta é no mesmo dia; o retorno a atividades leves costuma ocorrer em poucos dias, conforme orientação individual.",
    },
    {
      question: "Quanto tempo leva a recuperação?",
      answer:
        "Atividades leves em poucos dias; movimentos mais exigentes podem levar 2 a 4 semanas. A fisioterapia pode acelerar a recuperação da amplitude e evitar rigidez, conforme cada caso.",
    },
  ],
  rizartrose: [
    {
      question: "O que é rizartrose?",
      answer:
        "É a artrose da articulação trapézio-metacarpiana, na base do polegar. Provoca dor ao pegar objetos, girar chaves e abrir garrafas. Predomina em mulheres após os 50 anos e tende a progredir lentamente.",
    },
    {
      question: "Como saber se tenho rizartrose?",
      answer:
        "A suspeita surge com dor na base do polegar que piora ao pinçar e torcer. O diagnóstico combina exame clínico (testes de grind e stress) e radiografia. Outras causas de dor no polegar devem ser descartadas na consulta.",
    },
    {
      question: "Rizartrose tem cura?",
      answer:
        "Não há cura da artrose, mas há controle eficaz da dor e da função: órtese de polegar, infiltrações, exercícios e, em casos selecionados, procedimentos cirúrgicos para aliviar sintomas e preservar o uso da mão.",
    },
    {
      question: "Quando a cirurgia de rizartrose é indicada?",
      answer:
        "Quando dor e limitação persistem após tratamento conservador adequado (órtese, medicação, infiltração e reabilitação). A escolha da técnica depende da idade, atividade e grau radiográfico — avaliados individualmente.",
    },
    {
      question: "Posso tratar rizartrose sem cirurgia?",
      answer:
        "Sim, na maioria dos estágios iniciais e moderados: órtese, analgésicos, infiltração, modificação de atividades e fortalecimento. A cirurgia fica reservada para dor incapacitante refratária ao tratamento conservador.",
    },
  ],
  "dor-no-ombro-tendinite": [
    { question: "Por que a dor no ombro piora à noite?", answer: "A dor noturna é típica das tendinites do manguito rotador, da bursite e da capsulite. Ao deitar sobre o lado afetado, aumenta a pressão sobre os tendões e a bursa inflamados. É um dos sinais que mais incomodam e costuma motivar a busca por avaliação. Persistindo por mais de duas semanas, procure um ortopedista." },
    { question: "O que é tendinite no manguito rotador?", answer: "É a inflamação dos tendões que envolvem e estabilizam o ombro, sendo a causa mais comum de dor em adultos acima de 40 anos. Costuma gerar dor lateral que irradia para o braço e piora ao levantar o braço acima da cabeça. Surge por uso excessivo, movimentos repetitivos ou degeneração natural." },
    { question: "Tendinite no ombro precisa de cirurgia?", answer: "Na maioria dos casos, não. A grande parte responde a tratamento conservador, com fisioterapia para fortalecer o manguito, controle da dor e, quando indicado, infiltração. A cirurgia costuma ser reservada a casos refratários após meses de tratamento ou a rupturas completas. A indicação depende sempre da avaliação individual." },
    { question: "Quanto tempo demora para curar uma tendinite no ombro?", answer: "Varia conforme a causa e a gravidade. Quadros leves podem melhorar em algumas semanas com fisioterapia; casos mais persistentes levam alguns meses. A capsulite (ombro congelado) tem evolução mais longa, em fases que podem durar de meses a mais de um ano. O acompanhamento ajuda a definir o tempo em cada caso." },
  ],
  "dor-no-joelho-menisco": [
    { question: "Estalo no joelho é grave?", answer: "Nem sempre. Estalos isolados, sem dor ou inchaço, costumam ser benignos. Já estalos acompanhados de dor, travamento ou sensação de falseio podem indicar lesão de menisco, condromalácia ou outras alterações. Se houver inchaço recorrente ou o joelho 'falhar', vale procurar avaliação ortopédica para investigar a causa." },
    { question: "O que é travamento do joelho?", answer: "É a sensação de que algo impede o joelho de esticar completamente, como se ele 'prendesse'. É um sinal de alerta importante, frequentemente associado a lesão de menisco, em que um fragmento pode bloquear o movimento. Quando o travamento é persistente, a avaliação ortopédica é recomendada para definir a conduta." },
    { question: "Lesão de menisco precisa de cirurgia?", answer: "Nem sempre. A maioria das lesões, especialmente as degenerativas, melhora com tratamento conservador: fortalecimento muscular, fisioterapia e controle da dor. A cirurgia por artroscopia costuma ser indicada quando há bloqueio mecânico ou falha do tratamento conservador. A decisão depende do tipo de lesão e da avaliação individual." },
    { question: "Dor na frente do joelho ao subir escada é o quê?", answer: "Esse padrão sugere condromalácia patelar, o amolecimento da cartilagem atrás da rótula, comum em mulheres jovens e em quem pratica atividade física. A dor costuma piorar ao subir e descer escadas, agachar ou ficar muito tempo sentado. O fortalecimento muscular orientado é, na maioria dos casos, o tratamento mais eficaz." },
  ],
  "dor-lombar-cronica": [
    { question: "Quando a dor lombar é considerada crônica?", answer: "Quando persiste por mais de 12 semanas. A maioria dos casos é de origem mecânica (muscular), relacionada a sobrecarga, postura ou sedentarismo. Em geral, a dor crônica merece investigação para identificar a causa e direcionar o tratamento. Sinais de alerta, como perda de força ou alteração no controle da bexiga, exigem avaliação urgente." },
    { question: "Toda dor nas costas que desce para a perna é hérnia de disco?", answer: "Não necessariamente. A dor que irradia para a perna (ciatalgia) é comum na hérnia de disco, mas também pode vir de estenose do canal ou outras causas. A boa notícia é que a maioria das hérnias melhora com tratamento conservador. O diagnóstico depende do exame clínico e, quando indicado, de exames de imagem." },
    { question: "Dor lombar tem cura sem cirurgia?", answer: "Na maioria dos casos, sim. Boa parte das hérnias de disco e da lombalgia mecânica melhora com fisioterapia, fortalecimento do core, atividade física orientada e medicação. A cirurgia costuma ser reservada a falhas do tratamento conservador ou déficits neurológicos. A conduta varia conforme a avaliação de cada paciente." },
    { question: "Quais sinais de dor lombar exigem atenção urgente?", answer: "Procure avaliação rápida se houver dor após trauma significativo, perda de força nas pernas, alteração no controle da bexiga ou intestino, dormência na região genital, febre, perda de peso inexplicada ou dor que piora à noite sem alívio com repouso. Esses sinais de alerta podem indicar condições que exigem cuidado imediato." },
  ],
  "fratura-de-escafoide": [
    { question: "Torci o punho mas o raio-X deu normal. Pode ser fratura?", answer: "Sim. A fratura de escafoide pode não aparecer no raio-X inicial em até um quarto dos casos, mesmo estando presente. Por isso, havendo dor no lado do polegar do punho após queda, costuma-se imobilizar e repetir exames em alguns dias ou solicitar tomografia ou ressonância. Não subestime a dor persistente após uma 'torção'." },
    { question: "Por que a fratura de escafoide é tão preocupante?", answer: "Porque o escafoide tem irrigação sanguínea precária, o que aumenta o risco de não consolidação (pseudoartrose) e de necrose do osso, sobretudo nas fraturas mais próximas da base. O diagnóstico tardio pode levar a artrose do punho. Por isso o reconhecimento precoce é tão importante para o resultado do tratamento." },
    { question: "Fratura de escafoide precisa de cirurgia?", answer: "Depende do tipo. Fraturas sem desvio costumam ser tratadas com imobilização que inclui o polegar, por algumas semanas, com controle radiográfico. Fraturas com desvio, instáveis ou que não consolidam geralmente exigem cirurgia, com fixação por parafuso. A indicação varia conforme a localização e a avaliação individual." },
    { question: "Quanto tempo leva para uma fratura de escafoide consolidar?", answer: "Varia conforme a localização. Fraturas do polo distal tendem a consolidar mais rápido, em torno de seis a oito semanas; as proximais podem levar doze semanas ou mais. O acompanhamento com exames de imagem é o que confirma a consolidação. Cada caso evolui de forma individual." },
  ],
  "tendinite-de-quervain": [
    { question: "O que é a 'tendinite das mães'?", answer: "É a tendinite de Quervain, inflamação dos tendões que afastam e levantam o polegar, no lado do punho. É muito comum no pós-parto pela posição repetitiva de pegar o bebê e por alterações hormonais. Causa dor ao segurar o bebê, torcer panos ou abrir tampas. Pode afetar qualquer pessoa que sobrecarregue esses tendões." },
    { question: "Por que dói no punho do lado do polegar quando pego meu bebê?", answer: "Esse é o sintoma típico da tendinite de Quervain. A mão aberta com o polegar afastado para sustentar a cabeça do bebê sobrecarrega justamente os tendões inflamados. Estima-se que muitas mães apresentem esses sintomas no pós-parto. Persistindo por mais de uma a duas semanas, vale procurar avaliação." },
    { question: "Como é feito o diagnóstico da tendinite de Quervain?", answer: "O diagnóstico é clínico. O teste mais usado é o de Finkelstein: fecha-se o punho com o polegar por dentro e inclina-se a mão em direção ao dedo mínimo; dor acentuada no lado do polegar é forte indício. Exames de imagem em geral não são necessários, mas a ultrassonografia pode auxiliar em casos de dúvida." },
    { question: "Tendinite de Quervain melhora sem cirurgia?", answer: "Na maioria dos casos, sim. Imobilização com órtese que inclui punho e polegar, anti-inflamatórios, gelo e, quando indicada, infiltração com corticoide costumam trazer bom alívio. A cirurgia, simples e sob anestesia local, é reservada para casos que não respondem ao tratamento conservador após alguns meses. A indicação é individual." },
  ],
  "entorse-de-tornozelo": [
    { question: "Quanto tempo leva para sarar uma entorse de tornozelo?", answer: "Depende do grau. Entorses leves costumam se recuperar em uma a três semanas; as moderadas, em quatro a seis semanas; e as graves, com ruptura completa de ligamentos, podem levar de oito a doze semanas. A reabilitação adequada é importante para acelerar o retorno e reduzir o risco de novas entorses." },
    { question: "Como saber se torci ou quebrei o tornozelo?", answer: "Só o exame e, muitas vezes, o raio-X permitem diferenciar com segurança, pois os sintomas se sobrepõem. Inchaço importante, deformidade, dor intensa sobre o osso e incapacidade de apoiar o pé aumentam a suspeita de fratura. Diante de entorse com esses sinais, procure avaliação para descartar fratura associada." },
    { question: "Posso pisar no pé depois de uma entorse?", answer: "Varia conforme a gravidade. Em entorses leves, o apoio costuma ser tolerado com algum desconforto; nas mais graves, apoiar o pé pode ser muito difícil ou impossível. Nos primeiros dias, recomenda-se proteção, repouso relativo, gelo, compressão e elevação. Se não conseguir apoiar o peso, procure avaliação." },
    { question: "Por que é importante fazer fisioterapia depois de uma entorse?", answer: "Porque uma parcela significativa das entorses evolui com instabilidade crônica quando não reabilitada. Após a lesão, a propriocepção (percepção da posição da articulação) fica prejudicada, aumentando o risco de novas torções. A fisioterapia, com fortalecimento e treino de equilíbrio, é essencial para uma recuperação completa e para prevenir recidivas." },
  ],
  "epicondilite-lateral": [
    { question: "Preciso jogar tênis para ter 'cotovelo de tenista'?", answer: "Não. Apesar do apelido, a maioria das pessoas com epicondilite lateral não pratica tênis. A condição está muito mais ligada a atividades repetitivas do antebraço no trabalho e no dia a dia, como uso intenso de computador, ferramentas ou cozinha. É a causa mais frequente de dor na parte externa do cotovelo." },
    { question: "O que causa a dor na parte de fora do cotovelo?", answer: "Geralmente são microlesões e degeneração dos tendões extensores que se originam no cotovelo, por uso excessivo. Mais do que inflamação, costuma ser uma tendinose (degeneração crônica). A dor piora ao apertar a mão, girar maçanetas ou segurar objetos, e pode irradiar para o antebraço, com fraqueza de preensão." },
    { question: "Epicondilite lateral tem cura?", answer: "Na maioria dos casos há boa resposta ao tratamento conservador, com melhora significativa dos sintomas. Repouso relativo, gelo, cinta específica, fisioterapia com fortalecimento e, quando indicado, infiltração costumam resolver a maior parte dos quadros. A cirurgia é raramente necessária. Os resultados variam conforme cada caso." },
    { question: "Quanto tempo demora para melhorar o cotovelo de tenista?", answer: "Costuma ser uma recuperação gradual, de semanas a meses, pois envolve degeneração tendínea. A fisioterapia com fortalecimento excêntrico é o pilar do tratamento e exige constância. Em casos persistentes, pode-se considerar infiltração. A cirurgia só é cogitada após muitos meses sem melhora. O tempo varia conforme a avaliação individual." },
  ],
  "cisto-sinovial": [
    { question: "Caroço no punho é perigoso?", answer: "Na maioria das vezes, não. O cisto sinovial (ganglion) é o tumor benigno mais comum da mão e do punho, formado por uma bolsa de líquido. Muitos são indolores e apenas estéticos. Ainda assim, todo nódulo merece avaliação para confirmar a natureza benigna e descartar outras causas. Procure um ortopedista se tiver dúvida." },
    { question: "O que é um cisto sinovial?", answer: "É uma bolsa preenchida por líquido sinovial, o mesmo que lubrifica as articulações, que forma um nódulo visível sob a pele, mais comum no dorso do punho. A causa nem sempre é identificada e pode estar ligada a fragilidade da cápsula articular ou a microtraumas. Pode variar de tamanho ao longo do tempo." },
    { question: "Cisto no punho precisa de cirurgia?", answer: "Nem sempre. Cistos assintomáticos podem apenas ser observados, e muitos desaparecem sozinhos. A aspiração com agulha é uma opção, mas tem recidiva frequente. A cirurgia costuma ser indicada quando o cisto é sintomático, recidivante ou muito incômodo. A conduta depende dos sintomas e da avaliação individual." },
    { question: "Posso estourar o cisto do punho em casa?", answer: "Não. Tentar estourar o cisto batendo com livros, a famosa 'bíblia', não é recomendado: pode lesar estruturas ao redor e o cisto tende a voltar. O ideal é procurar avaliação para confirmar o diagnóstico, geralmente clínico, e discutir as opções adequadas para o seu caso." },
  ],
  "dor-no-quadril": [
    { question: "Dor na lateral do quadril ao deitar é o quê?", answer: "Esse padrão sugere bursite trocantérica ou tendinopatia dos glúteos, causas comuns de dor lateral no quadril. A dor costuma piorar ao deitar sobre o lado afetado, subir escadas ou levantar de cadeiras baixas, e pode irradiar para a coxa. O tratamento em geral é conservador, com fisioterapia e fortalecimento dos glúteos." },
    { question: "Dor na virilha pode ser do quadril?", answer: "Sim. A dor na virilha é típica de problemas articulares do quadril, como artrose ou impacto femoroacetabular. Costuma piorar ao caminhar, agachar ou girar o quadril e pode dificultar calçar meias. A localização da dor é uma pista importante, e o diagnóstico se apoia em exame clínico e exames de imagem." },
    { question: "Quais as causas mais comuns de dor no quadril?", answer: "Entre as mais frequentes estão a bursite trocantérica e a tendinopatia glútea (dor lateral), a artrose do quadril (dor na virilha, mais comum após os 50 anos) e o impacto femoroacetabular (dor na virilha em adultos jovens e ativos). A localização precisa da dor ajuda a direcionar a investigação." },
    { question: "Artrose do quadril sempre precisa de prótese?", answer: "Não. Muitos casos são controlados com tratamento conservador, como fisioterapia, controle de peso, medicação e, quando indicado, infiltração. A prótese costuma ser reservada a casos avançados, com dor incapacitante apesar do tratamento conservador. Quando necessária, o encaminhamento é feito a um colega especialista em quadril. A indicação é individual." },
  ],
  "fraturas": [
    { question: "Como saber se quebrei o osso ou foi só uma pancada?", answer: "Só a avaliação e, na maioria das vezes, o raio-X confirmam. Dor intensa após trauma, incapacidade de movimentar ou apoiar o membro, deformidade visível, inchaço importante e hematoma aumentam a suspeita de fratura. Diante desses sinais, procure avaliação. Osso visível através da pele é emergência: vá ao pronto-socorro imediatamente." },
    { question: "Toda fratura precisa de cirurgia?", answer: "Não. Fraturas estáveis, sem desvio significativo e fora da articulação costumam ser tratadas de forma conservadora, com imobilização e controle radiográfico. A cirurgia, com placas, parafusos ou outros métodos, é indicada em fraturas instáveis, desviadas, articulares ou expostas. A escolha depende do tipo de fratura e da avaliação individual." },
    { question: "Quanto tempo leva para uma fratura consolidar?", answer: "Varia bastante conforme o osso, o tipo de fratura, a idade e a saúde do paciente. Em geral, fala-se em algumas semanas a alguns meses até a consolidação. O acompanhamento com exames de imagem é o que confirma a cicatrização óssea. A fisioterapia após a imobilização ajuda a recuperar movimento e força." },
    { question: "O que é fratura exposta?", answer: "É quando o osso rompe a pele, ficando em contato com o meio externo. É uma emergência ortopédica pelo alto risco de infecção e exige atendimento imediato no pronto-socorro. Diferente da fratura fechada, em que a pele permanece íntegra, a exposta costuma necessitar de limpeza cirúrgica e tratamento específico o quanto antes." },
  ],
  "doenca-de-dupuytren": [
    { question: "Por que meu dedo está dobrando e não estica mais?", answer: "Pode ser doença de Dupuytren, em que a fáscia palmar (tecido sob a pele da palma) engrossa e forma nódulos e cordas que puxam os dedos para dentro. Os mais acometidos são o anelar e o mínimo. A progressão é lenta, ao longo de meses a anos, e dificulta esticar o dedo completamente." },
    { question: "O caroço na palma da mão da doença de Dupuytren é grave?", answer: "Em geral não é grave nem doloroso, mas é o sinal inicial da doença e tende a progredir lentamente. Nessa fase, com apenas o nódulo e sem contratura, o acompanhamento periódico costuma ser suficiente. Se o dedo começar a dobrar e não esticar, vale reavaliar a conduta com o ortopedista." },
    { question: "Qual o tratamento da doença de Dupuytren?", answer: "Nos estágios iniciais, apenas com nódulo, a observação costuma bastar. Quando a contratura impede esticar o dedo de forma significativa, o tratamento é geralmente cirúrgico, com remoção do tecido doente ou técnicas minimamente invasivas em casos selecionados. A reabilitação após o procedimento é importante. A indicação depende da avaliação individual." },
    { question: "A doença de Dupuytren pode voltar depois da cirurgia?", answer: "Sim, a doença de Dupuytren pode recidivar mesmo após tratamento adequado, por isso o acompanhamento em longo prazo é importante. A reabilitação, com fisioterapia e uso de órtese conforme orientação, ajuda a manter o resultado. A frequência e a forma de recidiva variam de pessoa para pessoa." },
  ],
  "lesao-do-lca": [
    { question: "Ouvi um estalo no joelho e ele inchou rápido. Pode ser LCA?", answer: "Pode. O estalo audível no momento do trauma, seguido de inchaço rápido em poucas horas, é um padrão típico da ruptura do ligamento cruzado anterior. Costuma ocorrer em torção do joelho com o pé fixo. A dor pode até melhorar em dias, dando falsa impressão de recuperação. Procure avaliação." },
    { question: "Como é confirmada a lesão do LCA?", answer: "O diagnóstico começa pelo exame físico, com testes como o de Lachman, gaveta anterior e pivot shift. A ressonância magnética confirma a lesão com alta precisão e avalia estruturas associadas, como menisco e cartilagem. A combinação de história, exame e imagem orienta a melhor conduta para cada paciente." },
    { question: "Lesão do LCA sempre precisa de cirurgia?", answer: "Não. O tratamento conservador, com fisioterapia intensiva, pode ser opção para pacientes de baixa demanda física, mais idosos ou sem instabilidade. A reconstrução cirúrgica costuma ser indicada para pessoas jovens, ativas e que desejam voltar a esportes de torção. A decisão depende do perfil e da avaliação individual." },
    { question: "Quanto tempo até voltar a praticar esporte após a cirurgia do LCA?", answer: "A reabilitação costuma levar de seis a nove meses até o retorno ao esporte, variando conforme a evolução de cada paciente. O LCA não cicatriza sozinho, por isso a cirurgia reconstrói o ligamento com enxerto, por artroscopia. O acompanhamento fisioterápico é fundamental para um retorno seguro e para reduzir o risco de nova lesão." },
  ],
  "artrose-do-joelho": [
    { question: "O que é artrose do joelho?", answer: "É o desgaste progressivo da cartilagem do joelho, o revestimento que permite o deslizamento entre os ossos. É muito prevalente, aumentando bastante após os 50 anos. Costuma causar dor que piora com a atividade, rigidez matinal de curta duração, crepitação e inchaço recorrente. A evolução e os sintomas variam de pessoa para pessoa." },
    { question: "Artrose no joelho tem cura?", answer: "A artrose não tem cura, mas tem bom controle. Com tratamento adequado, costuma ser possível reduzir a dor, preservar a função e manter a qualidade de vida por muitos anos. Controle de peso, fortalecimento muscular e fisioterapia são pilares importantes. A resposta ao tratamento varia conforme o grau e cada caso." },
    { question: "Quem tem artrose no joelho pode fazer exercício?", answer: "Sim, e costuma ser recomendado. O fortalecimento do quadríceps e dos glúteos reduz a carga sobre a articulação e melhora a estabilidade, sendo parte central do tratamento. Atividades de baixo impacto, como hidroterapia e pilates, costumam ser bem toleradas. O ideal é fazer exercícios orientados, ajustados ao seu grau de artrose." },
    { question: "Artrose no joelho sempre termina em prótese?", answer: "Não. A maioria dos casos, dos graus iniciais aos moderados, é controlada com tratamento conservador: controle de peso, fortalecimento, fisioterapia, medicação e, quando indicado, infiltração. A prótese costuma ser reservada a casos avançados com dor incapacitante apesar do tratamento. Quando necessária, o encaminhamento é feito a um especialista em joelho." },
  ],
};

export function getCondicaoFaqs(slug: string): FaqItem[] | undefined {
  return CONDICAO_FAQS[slug];
}

export function isPriorityCondicao(slug: string): slug is PriorityCondicaoSlug {
  return PRIORITY_CONDICAO_SLUGS.includes(slug as PriorityCondicaoSlug);
}
