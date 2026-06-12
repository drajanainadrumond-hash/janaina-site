export type Condicao = {
  slug: string;
  area: "mao" | "ombro" | "joelho" | "coluna" | "cotovelo" | "tornozelo" | "quadril" | "geral";
  areaLabel: string;
  title: string;
  desc: string;
  content: string;
};

export const CONDICOES: Condicao[] = [
  {
    slug: "sindrome-do-tunel-do-carpo",
    area: "mao",
    areaLabel: "Mão e Punho",
    title: "Síndrome do Túnel do Carpo",
    desc: "Dormência noturna, formigamento nos dedos, perda de força.",
    content: `
<p>A síndrome do túnel do carpo é a <strong>neuropatia compressiva mais comum</strong> do corpo humano. Ocorre quando o nervo mediano é comprimido ao passar pelo túnel do carpo — um canal estreito no punho formado pelos ossos do carpo e pelo ligamento transverso.</p>

<p>Esse nervo é responsável pela sensibilidade do polegar, indicador, médio e metade do anelar, além de controlar músculos da base do polegar. Quando comprimido, gera os sintomas característicos que afetam diretamente a qualidade de vida.</p>

<h2>Quem é mais afetado?</h2>

<p>A síndrome acomete entre <strong>51 a 125 pessoas a cada 100 mil</strong>, sendo significativamente mais frequente em <strong>mulheres entre 40 e 60 anos</strong> (proporção de até 3:1). No Brasil, mais de 24 mil trabalhadores foram afastados por essa condição em 2023 — aumento de 33% em relação ao ano anterior.</p>

<h2>Sintomas</h2>

<ul>
<li><strong>Dormência e formigamento noturno</strong> — o sintoma mais clássico. Muitos pacientes acordam precisando "sacudir" as mãos.</li>
<li><strong>Formigamento ao segurar objetos</strong> — celular, volante, livro.</li>
<li><strong>Perda de força</strong> — objetos caem da mão, dificuldade para abotoar roupas.</li>
<li><strong>Dor no punho</strong> que pode irradiar para o antebraço.</li>
<li>Em casos avançados: <strong>atrofia muscular</strong> na base do polegar.</li>
</ul>

<p><strong>Pista importante:</strong> se o dedo mínimo NÃO está formigando, isso aponta fortemente para o túnel do carpo (ele é inervado por outro nervo).</p>

<h2>Causas e fatores de risco</h2>

<ul>
<li>Atividades repetitivas com o punho (digitação, trabalho manual).</li>
<li>Diabetes, hipotireoidismo, artrite reumatoide.</li>
<li>Gravidez (retenção de líquidos) e menopausa.</li>
<li>Fraturas prévias no punho.</li>
<li>Obesidade (risco 2x maior com IMC > 30).</li>
</ul>

<h2>Diagnóstico</h2>

<p>O diagnóstico é essencialmente <strong>clínico</strong>. No consultório, realizo testes como:</p>

<ul>
<li><strong>Teste de Phalen:</strong> flexão dos punhos por 60 segundos — formigamento indica compressão (sensibilidade: 68-73%).</li>
<li><strong>Sinal de Tinel:</strong> percussão sobre o túnel — sensação de choque nos dedos.</li>
<li><strong>Teste de Durkan:</strong> pressão direta sobre o nervo por 30 segundos (sensibilidade: até 87%).</li>
</ul>

<p>A <strong>eletroneuromiografia (ENMG)</strong> confirma o diagnóstico e classifica a gravidade. A ultrassonografia do punho também pode auxiliar.</p>

<h2>Tratamento conservador</h2>

<ul>
<li><strong>Órtese noturna:</strong> mantém o punho em posição neutra durante o sono. Melhora em 37-80% dos pacientes.</li>
<li><strong>Infiltração com corticoide:</strong> eficácia de 70-90% a curto prazo.</li>
<li><strong>Fisioterapia:</strong> exercícios de deslizamento neural e tendíneo.</li>
<li><strong>Ajustes ergonômicos:</strong> postura no trabalho, pausas frequentes.</li>
</ul>

<h2>Tratamento cirúrgico</h2>

<p>Indicado quando o tratamento conservador falha após 3-6 meses, há atrofia muscular ou comprometimento grave na ENMG.</p>

<p>A cirurgia consiste na <strong>liberação do ligamento transverso do carpo</strong>, abrindo espaço para o nervo. Pode ser feita por técnica aberta ou endoscópica:</p>

<ul>
<li><strong>Duração:</strong> 15 a 30 minutos.</li>
<li><strong>Anestesia:</strong> local ou regional.</li>
<li><strong>Taxa de sucesso:</strong> superior a <strong>90%</strong>.</li>
<li><strong>Recidiva:</strong> apenas 2-5%.</li>
<li><strong>Recuperação completa:</strong> em média 5,5 meses.</li>
</ul>

<p><strong>Quanto mais cedo o diagnóstico, melhores os resultados.</strong> Em casos avançados com atrofia muscular, a recuperação pode ser incompleta mesmo após cirurgia.</p>

<p><em>Dra. Janaína Drumond — Ortopedista e Traumatologista | Cirurgia da Mão e Punho | CRM-MG 69719 | RQE 50592</em></p>
`,
  },
  {
    slug: "dedo-em-gatilho",
    area: "mao",
    areaLabel: "Mão e Punho",
    title: "Dedo em Gatilho",
    desc: "Dedo trava ao flexionar. Cirurgia dura 20 min com anestesia local.",
    content: `
<p>Seu dedo "trava" ao dobrar e você precisa forçar para esticar? Ou percebe um estalido doloroso na palma da mão? Esse é o <strong>dedo em gatilho</strong> — tecnicamente chamado de <strong>tenossinovite estenosante</strong>.</p>

<h2>O que acontece?</h2>

<p>Os tendões flexores dos dedos passam por "túneis" chamados <strong>polias</strong>. A <strong>polia A1</strong>, na base do dedo, é a mais acometida. Quando há inflamação, o tendão incha e a polia engrossa — o tendão "prende" ao tentar deslizar, como uma corda com nó passando por um anel apertado.</p>

<h2>Quem é mais afetado?</h2>

<ul>
<li>Prevalência de <strong>1-2% na população geral</strong>, mas <strong>5-20% em diabéticos</strong>.</li>
<li>Cerca de <strong>25%</strong> dos pacientes com dedo em gatilho são diabéticos.</li>
<li>Mais comum em <strong>mulheres</strong> (proporção até 6:1), entre 40 e 60 anos.</li>
<li>Dedos mais acometidos: <strong>anelar e polegar</strong>.</li>
<li>Fatores de risco: diabetes, artrite reumatoide, atividades com preensão repetitiva (ferramentas, crochê).</li>
</ul>

<h2>Graus da doença</h2>

<ul>
<li><strong>Grau I:</strong> dor na palma, sem travamento.</li>
<li><strong>Grau II:</strong> estalido ao movimentar, mas o dedo se solta sozinho.</li>
<li><strong>Grau III:</strong> travamento real — precisa usar a outra mão para destravar.</li>
<li><strong>Grau IV:</strong> dedo travado em posição fletida, sem conseguir esticar.</li>
</ul>

<h2>Diagnóstico</h2>

<p>É <strong>clínico</strong> — feito pela história e exame físico. Na maioria dos casos, <strong>não são necessários exames de imagem</strong>. Ao examinar, palpo um nódulo na palma e reproduzo o estalido ou travamento.</p>

<h2>Tratamento conservador</h2>

<ul>
<li><strong>Anti-inflamatórios</strong> e repouso funcional com tala.</li>
<li><strong>Infiltração com corticoide:</strong> taxa de sucesso de <strong>67-90%</strong> após a primeira aplicação. Em diabéticos, a resposta tende a ser menor.</li>
</ul>

<h2>Tratamento cirúrgico</h2>

<p>Indicado nos graus III e IV ou quando o tratamento conservador falha:</p>

<ul>
<li><strong>Procedimento:</strong> liberação da polia A1.</li>
<li><strong>Duração:</strong> aproximadamente <strong>20 minutos</strong>.</li>
<li><strong>Anestesia:</strong> local — sem necessidade de anestesia geral.</li>
<li><strong>Técnicas:</strong> aberta (~1,5 cm de incisão) ou percutânea (com agulha).</li>
<li><strong>Taxa de sucesso:</strong> <strong>95-99%</strong>, com complicações em apenas 2%.</li>
<li><strong>Recuperação:</strong> movimentação dos dedos no mesmo dia. Retorno a atividades leves em 1-2 semanas.</li>
</ul>

<p><strong>O dedo em gatilho tem tratamento eficaz e rápido.</strong> Nos casos cirúrgicos, o alívio costuma ser percebido rapidamente. Cada caso é individual.</p>

<p><em>Dra. Janaína Drumond — Ortopedista e Traumatologista | Cirurgia da Mão e Punho | CRM-MG 69719 | RQE 50592</em></p>
`,
  },
  {
    slug: "rizartrose",
    area: "mao",
    areaLabel: "Mão e Punho",
    title: "Rizartrose",
    desc: "Artrose na base do polegar. Dor ao abrir garrafas, girar chaves.",
    content: `
<p>Você sente dor na base do polegar ao abrir uma garrafa, girar uma chave ou segurar uma panela? Pode ser <strong>rizartrose</strong> — a artrose que atinge a articulação entre o osso trapézio e a base do primeiro metacarpiano, na raiz do polegar.</p>

<p>Essa articulação é uma das mais usadas da mão. Ela permite os movimentos de pinça e preensão que realizamos centenas de vezes por dia — por isso, quando desgasta, o impacto na vida diária é enorme.</p>

<h2>Quem é mais afetado?</h2>

<p>A rizartrose afeta aproximadamente <strong>10-20% das mulheres</strong> a partir dos 40 anos, com aumento significativo no período <strong>pós-menopausa</strong> (as alterações hormonais influenciam a saúde da cartilagem articular). Mulheres são afetadas numa proporção de até 10:1 em relação aos homens.</p>

<h2>Sintomas</h2>

<ul>
<li><strong>Dor na base do polegar</strong> — piora com atividades de pinça e preensão.</li>
<li><strong>Dificuldade para:</strong> abrir garrafas, girar chaves, escrever, segurar panelas, abotoar roupas.</li>
<li><strong>Perda de força</strong> na pinça entre polegar e indicador.</li>
<li><strong>Rigidez</strong> e sensação de "rangido" (crepitação) ao movimentar.</li>
<li>Em fases avançadas: <strong>deformidade visível</strong> na base do polegar, com proeminência óssea.</li>
</ul>

<h2>Classificação (Eaton e Littler)</h2>

<ul>
<li><strong>Estágio I:</strong> articulação normal no raio-X, mas com dor e inflamação.</li>
<li><strong>Estágio II:</strong> estreitamento leve do espaço articular, pequenos osteófitos.</li>
<li><strong>Estágio III:</strong> desgaste significativo com osteófitos maiores e subluxação.</li>
<li><strong>Estágio IV:</strong> artrose pantrapezial — compromete também articulações vizinhas.</li>
</ul>

<h2>Diagnóstico</h2>

<p>A história clínica e o exame físico geralmente são suficientes. O <strong>teste de moagem (grind test)</strong> — pressão e rotação axial do polegar — reproduz a dor quando positivo. A <strong>radiografia</strong> confirma o estágio e orienta o tratamento.</p>

<h2>Tratamento conservador</h2>

<p>Nos estágios iniciais (I e II):</p>

<ul>
<li><strong>Órtese de imobilização do polegar:</strong> reduz a sobrecarga articular e alivia a dor.</li>
<li><strong>Anti-inflamatórios:</strong> alívio da dor aguda.</li>
<li><strong>Fisioterapia:</strong> fortalecimento da musculatura estabilizadora do polegar.</li>
<li><strong>Infiltração com corticoide:</strong> pode trazer alívio por semanas a meses.</li>
<li><strong>Adaptações funcionais:</strong> engrossadores de cabo para talheres, chaves, canetas.</li>
</ul>

<h2>Tratamento cirúrgico</h2>

<p>Indicado quando a dor persiste apesar do tratamento conservador e limita atividades diárias. A principal técnica é a <strong>trapeziectomia</strong> — remoção do osso trapézio, frequentemente associada à interposição tendínea para estabilizar o espaço:</p>

<ul>
<li><strong>Resultados:</strong> remissão da dor em até <strong>90%</strong> dos pacientes.</li>
<li><strong>85% dos pacientes</strong> classificam o resultado como bom ou excelente.</li>
<li>Melhora da mobilidade e da força de pinça.</li>
<li>Recuperação: 6 a 12 semanas com imobilização inicial e reabilitação progressiva.</li>
</ul>

<p><strong>A rizartrose não precisa significar perda de função.</strong> Com diagnóstico precoce e tratamento adequado, é possível manter a qualidade de vida e a capacidade de usar as mãos no dia a dia.</p>

<p><em>Dra. Janaína Drumond — Ortopedista e Traumatologista | Cirurgia da Mão e Punho | CRM-MG 69719 | RQE 50592</em></p>
`,
  },
  {
    slug: "dor-no-ombro-tendinite",
    area: "ombro",
    areaLabel: "Ombro",
    title: "Dor no Ombro / Tendinite",
    desc: "Manguito rotador, bursite, capsulite. Dor que piora à noite.",
    content: `
<p>A dor no ombro é uma das queixas mais frequentes nos consultórios de ortopedia, afetando <strong>até 26% da população</strong> em algum momento da vida. As causas mais comuns envolvem o <strong>manguito rotador</strong> — um conjunto de quatro tendões que envolvem e estabilizam o ombro.</p>

<h2>Principais causas</h2>

<h3>Tendinite do Manguito Rotador</h3>
<p>A causa mais comum de dor no ombro em adultos acima de 40 anos. Os tendões (supraespinal, infraespinal, subescapular e redondo menor) inflamam por uso excessivo, movimentos repetitivos ou degeneração natural.</p>
<ul>
<li>Dor lateral no ombro, irradiando para o braço.</li>
<li>Piora ao levantar o braço acima da cabeça.</li>
<li>Dor noturna ao deitar sobre o lado afetado.</li>
</ul>

<h3>Bursite Subacromial</h3>
<p>A bursa é uma bolsa que amortece os tendões. Quando inflamada, gera dor intensa. Raramente ocorre isoladamente — geralmente acompanha a tendinite do manguito.</p>

<h3>Síndrome do Impacto</h3>
<p>Os tendões e a bursa ficam comprimidos entre o acrômio e a cabeça do úmero a cada elevação do braço. O "arco doloroso" — dor entre 60° e 120° de elevação — é o sinal clássico.</p>

<h3>Capsulite Adesiva (Ombro Congelado)</h3>
<p>A cápsula articular inflama, engrossa e se torna rígida. Mais comum em mulheres, diabéticos (até 20%) e após imobilização. Evolui em três fases:</p>
<ul>
<li><strong>Inflamatória (2-9 meses):</strong> dor intensa, especialmente noturna.</li>
<li><strong>Rigidez (4-12 meses):</strong> dor diminui, mas o ombro "congela".</li>
<li><strong>Resolução (12-42 meses):</strong> recuperação gradual da mobilidade.</li>
</ul>

<h3>Lesão Labral (SLAP)</h3>
<p>Lesão da cartilagem que reveste a borda da cavidade do ombro. Comum em atletas de arremesso e após quedas. Causa dor profunda, estalos e sensação de instabilidade.</p>

<h2>Diagnóstico</h2>

<p>Começa com <strong>exame físico detalhado</strong> — testes específicos permitem direcionar a suspeita. Os exames complementares incluem:</p>
<ul>
<li><strong>Ultrassonografia:</strong> excelente para manguito rotador e bursa.</li>
<li><strong>Ressonância magnética:</strong> padrão-ouro para avaliação completa.</li>
<li><strong>Radiografia:</strong> avalia calcificações, artrose e alterações ósseas.</li>
</ul>

<h2>Tratamento</h2>

<p>A maioria dos casos responde ao <strong>tratamento conservador</strong>:</p>
<ul>
<li><strong>Fisioterapia:</strong> fortalecimento do manguito e estabilizadores da escápula — é o pilar do tratamento.</li>
<li><strong>Anti-inflamatórios:</strong> controle da dor aguda.</li>
<li><strong>Infiltração:</strong> com corticoide ou ácido hialurônico em casos selecionados.</li>
</ul>

<p>Cirurgia é reservada para casos refratários (3-6 meses sem melhora), rupturas completas do manguito ou lesões labrais em atletas.</p>

<h2>Quando procurar ortopedista?</h2>

<ul>
<li>Dor persistente por mais de <strong>2 semanas</strong>.</li>
<li>Dor noturna que atrapalha o sono.</li>
<li>Incapacidade de levantar o braço.</li>
<li>Perda de força ou limitação nas atividades diárias.</li>
<li>Após trauma (queda, acidente).</li>
</ul>

<p><em>Dra. Janaína Drumond — Ortopedista e Traumatologista | CRM-MG 69719 | RQE 50592</em></p>
`,
  },
  {
    slug: "dor-no-joelho-menisco",
    area: "joelho",
    areaLabel: "Joelho",
    title: "Dor no Joelho / Menisco",
    desc: "Lesão meniscal, condromalácia, artrose. Estalidos e instabilidade.",
    content: `
<p>O joelho é a maior articulação do corpo e uma das mais exigidas — sustenta nosso peso, absorve impacto e permite movimentos complexos. Não é surpresa que a dor no joelho seja uma das queixas ortopédicas mais comuns, afetando pessoas de todas as idades.</p>

<h2>Lesão Meniscal</h2>

<p>Os <strong>meniscos</strong> são duas "almofadas" de cartilagem em formato de meia-lua dentro do joelho. Absorvem impacto, estabilizam a articulação e distribuem o peso. A lesão pode ocorrer por:</p>

<ul>
<li><strong>Trauma agudo:</strong> torção do joelho com o pé apoiado — comum em esportes.</li>
<li><strong>Degeneração:</strong> desgaste progressivo, mais frequente após os 40 anos.</li>
</ul>

<p><strong>Sintomas:</strong></p>
<ul>
<li>Dor na linha articular (medial ou lateral).</li>
<li>Inchaço que surge horas após a atividade.</li>
<li><strong>Travamento</strong> — sensação de que algo impede o joelho de esticar (sinal de alerta importante).</li>
<li>Estalos ao girar o corpo com o pé apoiado.</li>
</ul>

<h2>Condromalácia Patelar</h2>

<p>Amolecimento e desgaste da cartilagem na parte de trás da <strong>patela (rótula)</strong>. Classificada em 4 graus (I a IV). É muito comum em mulheres jovens e em praticantes de atividade física.</p>

<p><strong>Sintomas:</strong></p>
<ul>
<li>Dor na frente do joelho.</li>
<li>Piora ao subir/descer escadas, agachar ou ficar sentado por muito tempo ("sinal do cinema").</li>
<li>Sensação de "areia" ao movimentar o joelho.</li>
<li>Crepitação (estalos).</li>
</ul>

<h2>Artrose do Joelho (Gonartrose)</h2>

<p>Desgaste progressivo da cartilagem articular, mais comum após os 50 anos. É a forma mais frequente de artrite e afeta milhões de brasileiros.</p>

<p><strong>Sintomas:</strong></p>
<ul>
<li>Dor que piora com atividade e melhora com repouso.</li>
<li>Rigidez matinal (dura menos de 30 minutos).</li>
<li>Inchaço recorrente.</li>
<li>Deformidade progressiva (joelho varo ou valgo).</li>
<li>Diminuição progressiva da mobilidade.</li>
</ul>

<h2>Diagnóstico</h2>

<ul>
<li><strong>Exame físico:</strong> testes específicos para cada estrutura (McMurray e Apley para menisco, compressão patelar para condromalácia).</li>
<li><strong>Radiografia:</strong> avalia espaço articular, osteófitos e alinhamento.</li>
<li><strong>Ressonância magnética:</strong> padrão-ouro para partes moles — meniscos, cartilagem, ligamentos.</li>
<li><strong>Ultrassonografia:</strong> útil para derrame articular e tendinopatias.</li>
</ul>

<h2>Tratamento</h2>

<p><strong>A grande maioria dos casos (>90%) responde ao tratamento conservador:</strong></p>

<ul>
<li><strong>Fortalecimento muscular:</strong> quadríceps, glúteos e core — é o tratamento mais eficaz para condromalácia e artrose leve a moderada.</li>
<li><strong>Fisioterapia:</strong> alongamento, propriocepção, correção biomecânica.</li>
<li><strong>Controle de peso:</strong> cada kg a menos reduz 4 kg de carga no joelho.</li>
<li><strong>Medicamentos:</strong> anti-inflamatórios, analgésicos, condroprotetores.</li>
<li><strong>Infiltração:</strong> ácido hialurônico (viscossuplementação) ou corticoide.</li>
</ul>

<p><strong>Cirurgia:</strong> artroscopia para lesões meniscais com bloqueio mecânico; prótese de joelho para artrose avançada refratária ao tratamento conservador.</p>

<h2>Quando procurar ortopedista?</h2>

<ul>
<li>Dor que persiste por mais de 2 semanas.</li>
<li>Inchaço recorrente.</li>
<li>Travamento ou sensação de falseio ("joelho falha").</li>
<li>Dificuldade para subir escadas ou agachar.</li>
<li>Após trauma agudo com inchaço rápido.</li>
</ul>

<p><em>Dra. Janaína Drumond — Ortopedista e Traumatologista | CRM-MG 69719 | RQE 50592</em></p>
`,
  },
  {
    slug: "dor-lombar-cronica",
    area: "coluna",
    areaLabel: "Coluna",
    title: "Dor Lombar Crônica",
    desc: "Lombalgia, hérnia de disco, ciatalgia. Avaliação e encaminhamento.",
    content: `
<p>A lombalgia — dor na região lombar — é a <strong>primeira causa de afastamento do trabalho no Brasil</strong> e a terceira causa de aposentadoria por invalidez. Estima-se que <strong>80% da população</strong> terá pelo menos um episódio de dor lombar ao longo da vida.</p>

<p>Quando a dor persiste por mais de 12 semanas, chamamos de <strong>lombalgia crônica</strong>. É fundamental investigar a causa para direcionar o tratamento correto.</p>

<h2>Principais causas</h2>

<h3>Lombalgia Mecânica (Muscular)</h3>
<p>Responsável por <strong>90% dos casos</strong>. Causada por sobrecarga, má postura, sedentarismo ou esforço inadequado. A dor é localizada na região lombar, sem irradiação significativa para as pernas.</p>

<h3>Hérnia de Disco Lombar</h3>
<p>O disco intervertebral (amortecedor entre as vértebras) se desloca e comprime uma raiz nervosa. Acomete <strong>2-3% da população</strong>. A protrusão discal é responsável por 90% dos casos de lombociatalgia.</p>

<p><strong>Sintomas:</strong></p>
<ul>
<li>Dor lombar que <strong>irradia para a perna</strong> (ciatalgia) — pode descer até o pé.</li>
<li>Formigamento ou dormência no trajeto do nervo ciático.</li>
<li>Piora ao sentar, tossir ou esforçar.</li>
<li>Em casos graves: perda de força na perna ou alteração no controle da bexiga (emergência).</li>
</ul>

<h3>Estenose do Canal Lombar</h3>
<p>Estreitamento do canal por onde passam os nervos, geralmente por artrose. Mais comum após os 60 anos. Causa dor nas pernas ao caminhar que alivia ao sentar (claudicação neurogênica).</p>

<h3>Espondilolistese</h3>
<p>Escorregamento de uma vértebra sobre a outra. Pode ser congênita, por fratura de estresse ou degenerativa. Causa dor lombar e, quando há compressão nervosa, ciatalgia.</p>

<h2>Sinais de alerta (Red Flags)</h2>

<p>Procure avaliação urgente se houver:</p>

<ul>
<li>Dor lombar <strong>após trauma</strong> significativo.</li>
<li>Perda de força nas pernas.</li>
<li>Alteração no controle da bexiga ou intestino.</li>
<li>Dormência na região genital ("anestesia em sela").</li>
<li>Febre associada à dor lombar.</li>
<li>Perda de peso inexplicada.</li>
<li>Dor que piora à noite e não melhora com repouso.</li>
</ul>

<h2>Diagnóstico</h2>

<ul>
<li><strong>Exame físico:</strong> avaliação neurológica, testes de tensão neural (Lasègue).</li>
<li><strong>Radiografia:</strong> avalia alinhamento, artrose, espondilolistese.</li>
<li><strong>Ressonância magnética:</strong> padrão-ouro para avaliação de discos, nervos e partes moles.</li>
<li><strong>Eletroneuromiografia:</strong> quando há dúvida sobre qual nervo está comprometido.</li>
</ul>

<h2>Tratamento</h2>

<p>A boa notícia: <strong>80-90% dos casos</strong> de hérnia de disco melhoram com tratamento conservador.</p>

<ul>
<li><strong>Fisioterapia:</strong> fortalecimento do core (estabilização lombar), exercícios de McKenzie, alongamentos — pilar do tratamento.</li>
<li><strong>Atividade física orientada:</strong> pilates, hidroginástica, caminhada.</li>
<li><strong>Medicamentos:</strong> anti-inflamatórios, relaxantes musculares, analgésicos.</li>
<li><strong>Infiltrações:</strong> bloqueios peridurais ou foraminais em casos selecionados.</li>
<li><strong>Ergonomia:</strong> postura no trabalho, adequação do mobiliário.</li>
</ul>

<p><strong>Cirurgia</strong> é reservada para: falha do tratamento conservador após 6-12 semanas, déficit neurológico progressivo ou síndrome da cauda equina (emergência).</p>

<p><strong>Nota:</strong> como ortopedista generalista, realizo a avaliação completa da dor lombar. Quando identifico necessidade de tratamento cirúrgico da coluna, encaminho para um colega especialista em cirurgia da coluna, garantindo que você tenha a melhor condução possível.</p>

<p><em>Dra. Janaína Drumond — Ortopedista e Traumatologista | CRM-MG 69719 | RQE 50592</em></p>
`,
  },
  {
    slug: "fratura-de-escafoide",
    area: "mao",
    areaLabel: "Mão e Punho",
    title: "Fratura de Escafoide",
    desc: "Alto risco de não-consolidação. Raio-X pode ser falso-negativo.",
    content: `
<p>A fratura do escafoide é a <strong>fratura mais comum dos ossos do carpo</strong> (os pequenos ossos do punho). Ocorre tipicamente após queda com a mão estendida — muito frequente em jovens praticantes de esportes como skate, bicicleta e futebol.</p>

<p>O grande problema dessa fratura é que ela é <strong>frequentemente subestimada</strong> — confundida com "torção de punho" — e seu diagnóstico tardio pode levar a complicações graves.</p>

<h2>Por que o escafoide é especial?</h2>

<p>O escafoide tem uma particularidade anatômica crítica: sua <strong>irrigação sanguínea é precária</strong>. O sangue entra pelo polo distal (ponta) e flui de forma retrógrada para o polo proximal (base). Isso significa que fraturas na parte proximal têm alto risco de interromper o fluxo sanguíneo, levando à <strong>necrose avascular</strong> — morte do osso por falta de irrigação.</p>

<ul>
<li>O risco de necrose avascular é de <strong>13-40%</strong> nas fraturas proximais.</li>
<li>Em fraturas do 1/5 proximal, pode chegar a <strong>100%</strong>.</li>
</ul>

<h2>O problema do raio-X falso-negativo</h2>

<p>Em <strong>até 25% dos casos</strong>, a radiografia inicial NÃO mostra a fratura, mesmo ela estando presente. A linha de fratura pode ser tão sutil que só se torna visível 2-3 semanas depois, quando ocorre reabsorção óssea no foco.</p>

<p>Por isso, quando há suspeita clínica (dor na tabaqueira anatômica após queda), <strong>mesmo com raio-X normal</strong>, imobilizo o punho e solicito novos exames em 10-14 dias ou solicito tomografia/ressonância para confirmação precoce.</p>

<h2>Sintomas</h2>

<ul>
<li>Dor no lado do polegar do punho (tabaqueira anatômica).</li>
<li>Inchaço discreto.</li>
<li>Dor ao apertar ou girar objetos.</li>
<li>Perda de força de preensão.</li>
<li>Dor à pressão sobre o tubérculo do escafoide.</li>
</ul>

<h2>Diagnóstico</h2>

<ul>
<li><strong>Radiografia (4 incidências):</strong> pode ser falso-negativa inicialmente.</li>
<li><strong>Tomografia computadorizada:</strong> melhor para visualizar traço de fratura e desvio.</li>
<li><strong>Ressonância magnética:</strong> padrão-ouro para diagnóstico precoce e avaliação da vascularização (viabilidade óssea).</li>
</ul>

<h2>Tratamento</h2>

<h3>Fraturas sem desvio</h3>
<ul>
<li><strong>Imobilização com gesso ou órtese</strong> incluindo o polegar por 8-12 semanas.</li>
<li>Controle radiográfico seriado para confirmar consolidação.</li>
<li>Fraturas do polo distal consolidam mais rápido (6-8 semanas). Fraturas proximais podem levar 12 semanas ou mais.</li>
</ul>

<h3>Fraturas com desvio ou instáveis</h3>
<ul>
<li><strong>Cirurgia:</strong> fixação com parafuso de compressão (Herbert). Permite consolidação mais rápida e retorno funcional mais precoce.</li>
</ul>

<h3>Pseudoartrose (não consolidação)</h3>
<p>A complicação mais temida. Ocorre quando a fratura não consolida, formando uma "falsa articulação". <strong>O tratamento é cirúrgico obrigatório</strong>, mesmo em pacientes assintomáticos — pois evolui inevitavelmente para artrose do punho. O procedimento envolve enxerto ósseo e fixação com parafuso. Nos casos com necrose avascular, pode ser necessário enxerto ósseo vascularizado (microcirurgia).</p>

<h2>Quando procurar ortopedista?</h2>

<ul>
<li>Dor no punho após queda, especialmente no lado do polegar.</li>
<li>Dor que persiste por mais de 2-3 dias após "torção".</li>
<li>Dor ao apertar objetos ou girar o punho.</li>
</ul>

<p><strong>Não subestime a dor no punho após queda.</strong> O diagnóstico precoce da fratura de escafoide é fundamental para evitar complicações graves como pseudoartrose e artrose.</p>

<p><em>Dra. Janaína Drumond — Ortopedista e Traumatologista | Cirurgia da Mão e Punho | CRM-MG 69719 | RQE 50592</em></p>
`,
  },
  {
    slug: "tendinite-de-quervain",
    area: "mao",
    areaLabel: "Mão e Punho",
    title: "Tendinite de Quervain",
    desc: "Dor no punho associada à maternidade. Acomete até 50% das mães no pós-parto.",
    content: `
<p>Sentir dor no lado do polegar do punho ao pegar o bebê no colo, torcer uma fralda ou abrir uma tampa? Essa é a <strong>tendinite de Quervain</strong> — uma inflamação dos tendões que controlam o movimento de afastar e levantar o polegar.</p>

<p>É popularmente conhecida como a <strong>"tendinite das mães"</strong>, mas pode afetar qualquer pessoa que sobrecarregue esses tendões.</p>

<h2>O que acontece?</h2>

<p>Os tendões do <strong>abdutor longo do polegar</strong> e do <strong>extensor curto do polegar</strong> passam por um túnel fibroso (primeiro compartimento extensor) no lado radial do punho. Quando há inflamação e espessamento, esses tendões "prendem" dentro do túnel — gerando dor intensa a cada movimento do polegar.</p>

<h2>Por que é tão comum no pós-parto?</h2>

<ul>
<li><strong>Desequilíbrios hormonais</strong> do puerpério que favorecem retenção de líquidos e inflamação tendínea.</li>
<li><strong>Posição repetitiva de pegar o bebê:</strong> a mão aberta com o polegar abduzido para sustentar a cabeça — exatamente o movimento que sobrecarrega esses tendões.</li>
<li><strong>Amamentação:</strong> posição da mão ao segurar o bebê por longos períodos.</li>
<li>Estima-se que <strong>até 50% das mães</strong> no pós-parto apresentem sintomas.</li>
</ul>

<h2>Outros fatores de risco</h2>

<ul>
<li>Mulheres entre 30 e 50 anos.</li>
<li>Atividades com movimentos repetitivos do polegar e punho.</li>
<li>Artrite reumatoide.</li>
<li>Diabetes.</li>
<li>Trabalhos manuais: costura, cozinha, uso intenso de celular.</li>
</ul>

<h2>Sintomas</h2>

<ul>
<li><strong>Dor no lado radial do punho</strong> (lado do polegar) — é o sintoma principal.</li>
<li>Piora ao movimentar o polegar, pegar objetos, torcer panos.</li>
<li>Inchaço próximo à base do polegar.</li>
<li>Sensação de "estalo" ao movimentar o polegar.</li>
<li>Dificuldade para segurar objetos com firmeza.</li>
<li>Dor que pode irradiar para o antebraço.</li>
</ul>

<h2>Diagnóstico</h2>

<p>O diagnóstico é <strong>clínico</strong>. O teste mais utilizado é o <strong>teste de Finkelstein</strong>: o paciente fecha o punho com o polegar por dentro e inclina o punho em direção ao dedo mínimo (desvio ulnar). Dor acentuada no lado do polegar é um forte indicativo da tendinite de Quervain.</p>

<p>Exames de imagem geralmente não são necessários, mas a ultrassonografia pode confirmar o espessamento dos tendões e da bainha.</p>

<h2>Tratamento conservador</h2>

<ul>
<li><strong>Imobilização:</strong> órtese que inclui o punho e o polegar para impedir a movimentação que agrava a inflamação.</li>
<li><strong>Anti-inflamatórios:</strong> alívio da dor e do edema.</li>
<li><strong>Gelo local:</strong> 15-20 minutos, 3-4 vezes ao dia.</li>
<li><strong>Infiltração com corticoide:</strong> injeção diretamente no primeiro compartimento extensor. <strong>Taxa de sucesso de 70-80%</strong> na primeira aplicação. É o tratamento conservador mais eficaz.</li>
<li><strong>Modificação de atividades:</strong> ajustar a forma de pegar o bebê, usar as duas mãos, apoiar mais no antebraço.</li>
</ul>

<h2>Tratamento cirúrgico</h2>

<p>Indicado quando o tratamento conservador falha após 3-6 meses:</p>

<ul>
<li><strong>Procedimento:</strong> liberação cirúrgica do primeiro compartimento extensor.</li>
<li><strong>Duração:</strong> 15-20 minutos.</li>
<li><strong>Anestesia:</strong> local.</li>
<li><strong>Recuperação:</strong> movimentação precoce do polegar; retorno a atividades normais em 4-6 semanas.</li>
<li><strong>Taxa de sucesso:</strong> superior a 90%.</li>
</ul>

<h2>Quando procurar ortopedista?</h2>

<ul>
<li>Dor no lado do polegar do punho que persiste por mais de 1-2 semanas.</li>
<li>Dificuldade para pegar objetos ou o bebê.</li>
<li>Inchaço ou estalidos no punho.</li>
<li>Dor que não melhora com repouso e gelo.</li>
</ul>

<p><strong>A tendinite de Quervain é tratável e tem ótimos resultados.</strong> Se você é mãe e está com dor no punho, não precisa "aguentar" — busque avaliação para buscar alívio dos sintomas e cuidar melhor do seu bebê.</p>

<p><em>Dra. Janaína Drumond — Ortopedista e Traumatologista | Cirurgia da Mão e Punho | CRM-MG 69719 | RQE 50592</em></p>
`,
  },
  {
    slug: "entorse-de-tornozelo",
    area: "tornozelo",
    areaLabel: "Tornozelo",
    title: "Entorse de Tornozelo",
    desc: "Lesão ligamentar mais comum em esportes. Classificação em 3 graus e reabilitação.",
    content: `
<p>A entorse de tornozelo é uma das lesões musculoesqueléticas mais comuns — estima-se que <strong>25 mil pessoas torçam o tornozelo todos os dias</strong> no mundo. Em esportes como futebol, tênis e vôlei, a prevalência pode ultrapassar 40%.</p>

<p>A lesão ocorre quando os ligamentos que estabilizam o tornozelo são estirados além do limite, geralmente por uma "virada" do pé para dentro (inversão).</p>

<h2>Classificação em 3 graus</h2>

<ul>
<li><strong>Grau I (leve):</strong> estiramento dos ligamentos sem ruptura. Dor leve, pouco inchaço, consegue caminhar. Recuperação em 1-3 semanas.</li>
<li><strong>Grau II (moderado):</strong> ruptura parcial de um ou mais ligamentos. Inchaço moderado, hematoma, dificuldade para apoiar o pé. Recuperação em 4-6 semanas.</li>
<li><strong>Grau III (grave):</strong> ruptura completa de ligamentos. Inchaço importante, instabilidade articular, incapacidade de apoiar o pé. Recuperação em 8-12 semanas.</li>
</ul>

<h2>Diagnóstico</h2>

<ul>
<li><strong>Exame físico:</strong> avaliação da estabilidade ligamentar, localização da dor, grau de inchaço.</li>
<li><strong>Radiografia:</strong> para descartar fraturas associadas (especialmente maléolos).</li>
<li><strong>Ressonância magnética:</strong> em casos de dúvida diagnóstica ou suspeita de lesão associada (cartilagem, tendões).</li>
</ul>

<h2>Tratamento</h2>

<p><strong>Graus I e II:</strong></p>
<ul>
<li><strong>Protocolo PRICE:</strong> proteção, repouso relativo, gelo (15-20 min a cada 2-3h), compressão e elevação.</li>
<li><strong>Imobilização funcional:</strong> tornozeleira ou bota imobilizadora — permite mobilização precoce protegida.</li>
<li><strong>Anti-inflamatórios:</strong> alívio da dor e do edema.</li>
<li><strong>Fisioterapia:</strong> fortalecimento dos fibulares, propriocepção e equilíbrio — essencial para prevenir recidivas.</li>
</ul>

<p><strong>Grau III:</strong></p>
<ul>
<li>Imobilização mais rígida por 2-3 semanas, seguida de reabilitação intensiva.</li>
<li><strong>Cirurgia:</strong> reservada para instabilidade crônica que não responde ao tratamento conservador ou atletas com demanda alta.</li>
</ul>

<h2>Por que a reabilitação é tão importante?</h2>

<p>Até <strong>40% das entorses</strong> evoluem com instabilidade crônica quando não reabilitadas adequadamente. A propriocepção (capacidade do corpo de perceber a posição da articulação) fica prejudicada após a lesão — sem treiná-la, o risco de nova entorse é muito alto.</p>

<p><em>Dra. Janaína Drumond — Ortopedista e Traumatologista | CRM-MG 69719 | RQE 50592</em></p>
`,
  },
  {
    slug: "epicondilite-lateral",
    area: "cotovelo",
    areaLabel: "Cotovelo",
    title: "Epicondilite Lateral (Cotovelo de Tenista)",
    desc: "Causa mais frequente de dor no cotovelo. Relacionada a esforço repetitivo.",
    content: `
<p>A epicondilite lateral — popularmente conhecida como <strong>"cotovelo de tenista"</strong> — é a causa mais frequente de dor no cotovelo. Curiosamente, apenas 10% dos pacientes com esse diagnóstico praticam tênis; a condição está muito mais associada a <strong>atividades repetitivas do antebraço</strong> no dia a dia e no trabalho.</p>

<h2>O que acontece?</h2>

<p>Os tendões extensores do punho e dos dedos se originam no epicôndilo lateral do cotovelo (proeminência óssea na parte externa). O uso excessivo gera <strong>microlesões e degeneração</strong> nesses tendões — na verdade, mais do que inflamação, trata-se de uma tendinose (degeneração crônica).</p>

<h2>Quem é mais afetado?</h2>

<ul>
<li>Idade entre <strong>35 e 55 anos</strong>.</li>
<li>Profissionais que fazem movimentos repetitivos: digitadores, cozinheiros, mecânicos, pintores, dentistas.</li>
<li>Praticantes de CrossFit (cerca de 12% das lesões), tênis (até 50% dos praticantes terão o diagnóstico) e musculação.</li>
<li>Uso intenso de computador/mouse.</li>
</ul>

<h2>Sintomas</h2>

<ul>
<li><strong>Dor na parte externa do cotovelo</strong> — piora gradualmente ao longo de semanas.</li>
<li>Dor ao apertar a mão, girar maçanetas, segurar objetos ou servir café.</li>
<li>Fraqueza na preensão.</li>
<li>Dor que pode irradiar para o antebraço.</li>
<li>Piora com atividades de extensão do punho contra resistência.</li>
</ul>

<h2>Diagnóstico</h2>

<p>O diagnóstico é <strong>clínico</strong>. Testes provocativos no consultório (extensão resistida do punho, preensão com cotovelo estendido) reproduzem a dor. Ultrassonografia e ressonância podem ser solicitadas para avaliar o grau de degeneração tendínea.</p>

<h2>Tratamento</h2>

<p>O tratamento conservador é eficaz em <strong>89-95% dos casos</strong>:</p>

<ul>
<li><strong>Repouso relativo:</strong> modificação das atividades que provocam dor.</li>
<li><strong>Gelo:</strong> 15-20 minutos após atividades, 3-4x/dia.</li>
<li><strong>Cinta de epicondilite (brace):</strong> alivia a tensão sobre os tendões.</li>
<li><strong>Fisioterapia:</strong> alongamento e fortalecimento excêntrico dos extensores — pilar do tratamento.</li>
<li><strong>Anti-inflamatórios:</strong> alívio na fase aguda.</li>
<li><strong>Infiltração:</strong> corticoide ou PRP (plasma rico em plaquetas) em casos persistentes.</li>
</ul>

<p><strong>Cirurgia</strong> é raramente necessária — indicada apenas após 6-12 meses de tratamento conservador sem melhora. Consiste na liberação ou debridamento do tendão degenerado.</p>

<p><em>Dra. Janaína Drumond — Ortopedista e Traumatologista | CRM-MG 69719 | RQE 50592</em></p>
`,
  },
  {
    slug: "cisto-sinovial",
    area: "mao",
    areaLabel: "Mão e Punho",
    title: "Cisto Sinovial (Ganglion)",
    desc: "Nódulo benigno no punho ou mão. Pode ser apenas observado ou tratado cirurgicamente.",
    content: `
<p>O cisto sinovial (ou ganglion) é o <strong>tumor benigno mais comum da mão e do punho</strong>. Trata-se de uma bolsa preenchida por líquido sinovial (o mesmo que lubrifica as articulações), que forma um nódulo visível sob a pele.</p>

<h2>Onde aparece?</h2>

<ul>
<li><strong>Dorso do punho:</strong> 60-70% dos casos — é o local mais frequente.</li>
<li><strong>Face palmar do punho:</strong> cerca de 20% dos casos.</li>
<li><strong>Base dos dedos:</strong> cistos de bainha tendínea (nódulos pequenos e firmes na palma).</li>
<li><strong>Articulação interfalângica distal:</strong> cistos mucosos, associados à artrose dos dedos.</li>
</ul>

<h2>Causas</h2>

<p>A causa exata nem sempre é identificada. Pode estar relacionada a:</p>
<ul>
<li>Fragilidade da cápsula articular ou bainha tendínea.</li>
<li>Traumas ou microtraumas repetitivos.</li>
<li>Artrose das pequenas articulações (nos cistos mucosos).</li>
<li>Muitas vezes aparece sem causa aparente.</li>
</ul>

<h2>Sintomas</h2>

<ul>
<li><strong>Nódulo visível e palpável</strong> — pode variar de tamanho ao longo do tempo.</li>
<li>Muitos cistos são <strong>assintomáticos</strong> — o incômodo é apenas estético.</li>
<li>Quando sintomáticos: dor, desconforto, sensação de pressão, limitação de movimento.</li>
<li>Cistos palmares próximos à artéria radial requerem atenção especial.</li>
</ul>

<h2>Diagnóstico</h2>

<p>O diagnóstico é <strong>clínico</strong> na maioria das vezes. A <strong>transiluminação</strong> (colocar uma luz atrás do nódulo) mostra que o conteúdo é líquido. Ultrassonografia confirma a natureza cística e diferencia de tumores sólidos.</p>

<h2>Tratamento</h2>

<h3>Observação</h3>
<p>Se o cisto é <strong>assintomático</strong>, a conduta pode ser simplesmente observar. Até 50% dos cistos desaparecem espontaneamente.</p>

<h3>Aspiração</h3>
<p>Punção com agulha para drenar o líquido, podendo ser associada à infiltração com corticoide. É curativa em <strong>20-30% dos casos</strong>, mas a recidiva é frequente pois a "cápsula" do cisto permanece.</p>

<h3>Cirurgia</h3>
<p>Indicada quando o cisto é <strong>sintomático, recidivante ou inestético</strong>:</p>
<ul>
<li>Excisão completa do cisto junto com sua base (pedículo).</li>
<li>Pode ser feita com anestesia local ou regional.</li>
<li>Taxa de recidiva menor que <strong>10%</strong> quando feita corretamente.</li>
<li>Recuperação: 2-4 semanas para atividades normais.</li>
</ul>

<p><strong>Importante:</strong> nunca tente "estourar" o cisto em casa com livros ou batendo (a famosa "bíblia") — isso pode causar lesão nas estruturas ao redor e o cisto voltará.</p>

<p><em>Dra. Janaína Drumond — Ortopedista e Traumatologista | Cirurgia da Mão e Punho | CRM-MG 69719 | RQE 50592</em></p>
`,
  },
  {
    slug: "dor-no-quadril",
    area: "quadril",
    areaLabel: "Quadril",
    title: "Dor no Quadril",
    desc: "Bursite trocantérica, artrose, impacto femoroacetabular. Avaliação e tratamento.",
    content: `
<p>A dor no quadril é uma queixa frequente que pode ter origens muito diversas — desde uma simples inflamação até o desgaste articular avançado. A localização precisa da dor (lateral, anterior, posterior) é a principal pista para o diagnóstico.</p>

<h2>Principais causas</h2>

<h3>Bursite Trocantérica</h3>
<p>Inflamação da bursa localizada sobre o trocânter maior do fêmur (proeminência óssea lateral do quadril). É uma das causas mais comuns de dor lateral no quadril.</p>
<ul>
<li><strong>Sintomas:</strong> dor na lateral do quadril que piora ao deitar sobre o lado afetado, subir escadas, levantar de cadeiras baixas ou sair do carro.</li>
<li><strong>Pode irradiar</strong> para a coxa e nádega, simulando ciatalgia.</li>
<li><strong>Tratamento:</strong> fisioterapia (fortalecimento de glúteos), gelo, anti-inflamatórios, infiltração com corticoide em casos persistentes.</li>
</ul>

<h3>Artrose do Quadril (Coxartrose)</h3>
<p>Desgaste da cartilagem articular do quadril — mais frequente após os 50 anos, mas pode afetar adultos jovens quando há displasia ou necrose avascular.</p>
<ul>
<li><strong>Sintomas:</strong> dor na virilha que piora ao caminhar, rigidez matinal, dificuldade para calçar meias ou cortar as unhas dos pés.</li>
<li><strong>Tratamento conservador:</strong> fisioterapia, controle de peso, medicamentos, infiltração com ácido hialurônico.</li>
<li><strong>Cirurgia:</strong> prótese total do quadril em casos avançados refratários — encaminho para colega especialista em quadril quando necessário.</li>
</ul>

<h3>Impacto Femoroacetabular</h3>
<p>Alteração anatômica que causa atrito anormal entre o fêmur e o acetábulo (encaixe do quadril). Causa frequente de dor no quadril em <strong>adultos jovens e ativos</strong>.</p>
<ul>
<li><strong>Tipos:</strong> Cam (excesso ósseo no fêmur), Pincer (excesso no acetábulo) ou misto.</li>
<li><strong>Sintomas:</strong> dor na virilha ao agachar, girar o quadril ou ficar sentado por muito tempo. "Clicking" ou sensação de travamento.</li>
<li><strong>Diagnóstico:</strong> radiografia + ressonância magnética com protocolo específico.</li>
<li><strong>Tratamento:</strong> fisioterapia e modificação de atividades; artroscopia em casos refratários.</li>
</ul>

<h3>Tendinopatia Glútea</h3>
<p>Degeneração dos tendões do glúteo médio e mínimo na inserção no trocânter. Frequentemente confundida com bursite trocantérica. O tratamento é semelhante, com ênfase no fortalecimento excêntrico dos glúteos.</p>

<h2>Diagnóstico</h2>

<ul>
<li><strong>Exame físico:</strong> amplitude de movimento, testes de impacto, avaliação da marcha.</li>
<li><strong>Radiografia:</strong> avalia artrose, displasia e alterações ósseas.</li>
<li><strong>Ressonância magnética:</strong> avalia cartilagem, labrum, tendões e partes moles.</li>
</ul>

<h2>Quando procurar ortopedista?</h2>

<ul>
<li>Dor no quadril que limita a caminhada.</li>
<li>Dor na virilha ao agachar ou girar o corpo.</li>
<li>Dor lateral que não melhora com repouso.</li>
<li>Rigidez matinal no quadril.</li>
<li>Claudicação (mancar).</li>
</ul>

<p><em>Dra. Janaína Drumond — Ortopedista e Traumatologista | CRM-MG 69719 | RQE 50592</em></p>
`,
  },
  {
    slug: "fraturas",
    area: "geral",
    areaLabel: "Ortopedia Geral",
    title: "Fraturas",
    desc: "Avaliação, tratamento conservador e cirúrgico de fraturas em membros superiores e inferiores.",
    content: `
<p>A fratura é a perda da continuidade óssea — popularmente conhecida como "osso quebrado". É uma das condições mais comuns atendidas na ortopedia e traumatologia, desde fraturas simples do punho até fraturas complexas que necessitam de tratamento cirúrgico.</p>

<h2>Tipos de fratura</h2>

<ul>
<li><strong>Fratura simples (fechada):</strong> o osso quebra mas não perfura a pele.</li>
<li><strong>Fratura exposta (aberta):</strong> o osso rompe a pele — é uma emergência ortopédica pelo risco de infecção.</li>
<li><strong>Fratura por estresse:</strong> microfratura causada por impacto repetitivo (comum em corredores).</li>
<li><strong>Fratura patológica:</strong> ocorre em osso enfraquecido por doença (osteoporose, tumores).</li>
</ul>

<h2>Fraturas mais comuns que trato</h2>

<h3>Membros Superiores</h3>
<ul>
<li><strong>Fratura do rádio distal (Colles):</strong> a mais comum do membro superior. Queda com mão estendida. Tratamento com gesso ou fixação com placa e parafusos.</li>
<li><strong>Fratura de escafoide:</strong> risco de não consolidação e necrose avascular. Diagnóstico precoce é essencial.</li>
<li><strong>Fraturas de metacarpos e falanges:</strong> frequentes em traumas esportivos e acidentes domésticos.</li>
<li><strong>Fratura do úmero proximal:</strong> comum em idosos com osteoporose após queda.</li>
</ul>

<h3>Membros Inferiores</h3>
<ul>
<li><strong>Fratura de tornozelo:</strong> frequente em entorses graves e quedas.</li>
<li><strong>Fratura de platô tibial:</strong> acomete a superfície articular do joelho.</li>
<li><strong>Fratura por estresse da tíbia:</strong> comum em corredores que aumentam volume de treino.</li>
</ul>

<h2>Diagnóstico</h2>

<ul>
<li><strong>Radiografia:</strong> exame inicial para identificar o traço de fratura, desvio e alinhamento.</li>
<li><strong>Tomografia:</strong> para fraturas articulares e planejamento cirúrgico.</li>
<li><strong>Ressonância:</strong> fraturas ocultas (como a de escafoide) e fraturas por estresse.</li>
</ul>

<h2>Tratamento</h2>

<h3>Conservador</h3>
<p>Indicado para fraturas estáveis, sem desvio significativo e fora da articulação:</p>
<ul>
<li>Imobilização com gesso, tala ou órtese.</li>
<li>Controle radiográfico seriado para acompanhar a consolidação.</li>
<li>Fisioterapia após a retirada da imobilização.</li>
</ul>

<h3>Cirúrgico</h3>
<p>Indicado para fraturas instáveis, desviadas, articulares ou expostas:</p>
<ul>
<li><strong>Fixação interna:</strong> placas, parafusos, fios de Kirschner.</li>
<li><strong>Fixação externa:</strong> em fraturas expostas graves ou quando o inchaço impede a cirurgia imediata.</li>
<li><strong>Hastes intramedulares:</strong> para fraturas de ossos longos (tíbia, fêmur).</li>
</ul>

<h2>Quando procurar ortopedista?</h2>

<ul>
<li>Dor intensa após trauma com incapacidade de movimentar o membro.</li>
<li>Deformidade visível.</li>
<li>Inchaço importante e hematoma.</li>
<li>Impossibilidade de apoiar o peso.</li>
<li>Osso visível através da pele (fratura exposta — vá ao pronto-socorro imediatamente).</li>
</ul>

<p><em>Dra. Janaína Drumond — Ortopedista e Traumatologista | Cirurgia da Mão e Punho | CRM-MG 69719 | RQE 50592</em></p>
`,
  },
  {
    slug: "doenca-de-dupuytren",
    area: "mao",
    areaLabel: "Mão e Punho",
    title: "Doença de Dupuytren",
    desc: "Contratura progressiva dos dedos da mão. Os dedos dobram e não esticam mais.",
    content: `
<p>A doença de Dupuytren é uma condição em que a <strong>fáscia palmar</strong> (tecido fibroso sob a pele da palma da mão) engrossa progressivamente, formando nódulos e cordas que puxam os dedos para dentro — impedindo que se estiquem completamente.</p>

<p>Com o tempo, o dedo fica permanentemente dobrado, dificultando atividades simples como colocar a mão no bolso, cumprimentar alguém ou calçar luvas.</p>

<h2>Quem é mais afetado?</h2>

<ul>
<li>Mais comum em <strong>homens</strong> (3x mais que mulheres).</li>
<li>Faixa etária: <strong>50 a 70 anos</strong>.</li>
<li>Prevalência maior em descendentes de <strong>norte-europeus</strong> (escandinavos, britânicos).</li>
<li>Fatores associados: diabetes, tabagismo, consumo de álcool, epilepsia.</li>
<li>Bilateral em <strong>45% dos casos</strong>.</li>
<li>Dedos mais acometidos: <strong>anelar e mínimo</strong>.</li>
</ul>

<h2>Sintomas e progressão</h2>

<ul>
<li><strong>Fase inicial:</strong> nódulo firme na palma da mão, geralmente indolor.</li>
<li><strong>Fase intermediária:</strong> cordas fibrosas se formam da palma até os dedos, começando a limitar a extensão.</li>
<li><strong>Fase avançada:</strong> contratura fixa — o dedo fica dobrado e não abre mais, mesmo com força.</li>
</ul>

<p>A progressão é lenta (meses a anos) mas é inexorável sem tratamento.</p>

<h2>Diagnóstico</h2>

<p>O diagnóstico é <strong>clínico</strong>. O "teste da mesa" (table top test) é simples: se o paciente não consegue apoiar a mão espalmada sobre uma mesa, há contratura significativa. Exames de imagem geralmente não são necessários.</p>

<h2>Tratamento</h2>

<h3>Observação</h3>
<p>Nos estágios iniciais (apenas nódulo, sem contratura), acompanhamento periódico pode ser suficiente.</p>

<h3>Tratamento cirúrgico</h3>
<p>Indicado quando a contratura impede a extensão do dedo em <strong>30° ou mais</strong> (na articulação metacarpofalângica) ou qualquer grau na interfalângica proximal:</p>
<ul>
<li><strong>Fasciectomia parcial:</strong> técnica mais utilizada — remoção do tecido doente preservando as estruturas normais.</li>
<li><strong>Fasciotomia percutânea com agulha:</strong> minimamente invasiva — secção das cordas com agulha, sem incisão grande. Indicada em casos selecionados.</li>
<li>Recuperação: imobilização por 1-2 semanas, seguida de fisioterapia intensiva e uso de órtese noturna por meses.</li>
</ul>

<p><strong>A doença de Dupuytren pode recidivar</strong> — o acompanhamento em longo prazo é importante.</p>

<p><em>Dra. Janaína Drumond — Ortopedista e Traumatologista | Cirurgia da Mão e Punho | CRM-MG 69719 | RQE 50592</em></p>
`,
  },
  {
    slug: "lesao-do-lca",
    area: "joelho",
    areaLabel: "Joelho",
    title: "Lesão do LCA (Ligamento Cruzado Anterior)",
    desc: "Estalo no joelho, inchaço rápido e instabilidade. Comum em esportes de torção.",
    content: `
<p>A ruptura do <strong>ligamento cruzado anterior (LCA)</strong> é uma das lesões mais comuns e temidas no joelho, especialmente em praticantes de esportes que envolvem mudança brusca de direção, rotação e salto — como futebol, basquete, vôlei e ski.</p>

<h2>O que é o LCA?</h2>

<p>O LCA é um ligamento dentro do joelho que conecta o fêmur à tíbia, controlando a movimentação para frente e a rotação do joelho. É fundamental para a <strong>estabilidade articular</strong>.</p>

<h2>Como acontece a lesão?</h2>

<ul>
<li><strong>Mecanismo clássico:</strong> torção do joelho com o pé fixo no chão — mudança de direção, aterrissagem de salto, pivô.</li>
<li>Pode ocorrer sem contato direto — a própria força muscular e a inércia são suficientes.</li>
<li>Mulheres têm <strong>2 a 8x mais risco</strong> que homens (fatores anatômicos e hormonais).</li>
</ul>

<h2>Sintomas</h2>

<ul>
<li><strong>Estalo audível</strong> no momento do trauma — relatado pela maioria dos pacientes.</li>
<li><strong>Inchaço rápido</strong> (poucas horas) — por sangramento dentro da articulação (hemartrose).</li>
<li><strong>Dor intensa</strong> que pode melhorar em dias, dando falsa impressão de melhora.</li>
<li><strong>Sensação de instabilidade</strong> — "o joelho falha", "sai do lugar" ao girar ou mudar de direção.</li>
<li>Dificuldade para apoiar o peso e caminhar nas primeiras horas.</li>
</ul>

<h2>Diagnóstico</h2>

<ul>
<li><strong>Exame físico:</strong> testes de Lachman (o mais sensível), gaveta anterior e pivot shift.</li>
<li><strong>Ressonância magnética:</strong> confirma o diagnóstico com precisão superior a 95% e avalia lesões associadas (menisco, cartilagem, outros ligamentos).</li>
</ul>

<h2>Tratamento</h2>

<h3>Conservador</h3>
<p>Pode ser opção para pacientes de baixa demanda física, mais idosos ou sem instabilidade funcional:</p>
<ul>
<li>Fisioterapia intensiva para fortalecimento muscular (quadríceps, isquiotibiais, glúteos).</li>
<li>Uso de joelheira funcional.</li>
<li>Modificação de atividades (evitar esportes de torção).</li>
</ul>

<h3>Cirúrgico (Reconstrução do LCA)</h3>
<p>Indicado para pacientes jovens, ativos e que desejam retornar ao esporte:</p>
<ul>
<li>O LCA não cicatriza sozinho — a cirurgia consiste na <strong>reconstrução com enxerto de tendão</strong> (patelar, isquiotibiais ou quadricipital).</li>
<li>Realizada por <strong>artroscopia</strong> (minimamente invasiva).</li>
<li>Tempo ideal: <strong>3 a 6 semanas</strong> após a lesão (depois que o inchaço diminuiu e a mobilidade voltou).</li>
<li>Reabilitação pós-operatória: <strong>6 a 9 meses</strong> até retorno ao esporte.</li>
<li>Taxa de sucesso: <strong>85-95%</strong> de bons resultados funcionais.</li>
</ul>

<p><strong>Nota:</strong> como ortopedista generalista, faço a avaliação inicial completa, diagnóstico e encaminhamento para colega especialista em joelho quando a reconstrução cirúrgica é indicada.</p>

<p><em>Dra. Janaína Drumond — Ortopedista e Traumatologista | CRM-MG 69719 | RQE 50592</em></p>
`,
  },
  {
    slug: "artrose-do-joelho",
    area: "joelho",
    areaLabel: "Joelho",
    title: "Artrose do Joelho (Gonartrose)",
    desc: "Desgaste da cartilagem do joelho. Dor ao caminhar, rigidez matinal e inchaço.",
    content: `
<p>A artrose do joelho (gonartrose) é o <strong>desgaste progressivo da cartilagem articular</strong> — o "revestimento" liso que permite o deslizamento entre os ossos. É uma das condições ortopédicas mais prevalentes, afetando <strong>10-15% da população adulta</strong>, com aumento significativo após os 50 anos. No Brasil, estima-se que atinja até 20% dos idosos.</p>

<h2>Fatores de risco</h2>

<ul>
<li><strong>Idade:</strong> principal fator — a cartilagem se degrada naturalmente com o tempo.</li>
<li><strong>Obesidade:</strong> cada kg a mais representa 4 kg de carga extra no joelho.</li>
<li><strong>Sexo feminino:</strong> mais prevalente em mulheres, especialmente após a menopausa.</li>
<li><strong>Lesões prévias:</strong> fraturas articulares, lesão de menisco ou LCA aceleram o desgaste.</li>
<li><strong>Genética:</strong> história familiar de artrose.</li>
<li><strong>Alinhamento:</strong> joelhos varos ("pernas arqueadas") ou valgos ("joelho em X").</li>
</ul>

<h2>Sintomas</h2>

<ul>
<li><strong>Dor mecânica:</strong> piora com atividade (caminhar, subir escada) e melhora com repouso.</li>
<li><strong>Rigidez matinal:</strong> dura menos de 30 minutos (diferente da artrite reumatoide, que dura mais).</li>
<li><strong>Crepitação:</strong> sensação de "areia" ou estalos ao movimentar o joelho.</li>
<li><strong>Inchaço:</strong> derrame articular recorrente após atividade.</li>
<li><strong>Deformidade progressiva:</strong> joelho varo ou valgo acentuando com o tempo.</li>
<li><strong>Perda de mobilidade:</strong> dificuldade para dobrar ou esticar completamente o joelho.</li>
</ul>

<h2>Classificação (Kellgren-Lawrence)</h2>

<ul>
<li><strong>Grau I:</strong> estreitamento mínimo do espaço articular. Dor ocasional.</li>
<li><strong>Grau II:</strong> osteófitos (bicos de papagaio) iniciais. Dor com atividade.</li>
<li><strong>Grau III:</strong> estreitamento moderado, múltiplos osteófitos. Dor frequente.</li>
<li><strong>Grau IV:</strong> espaço articular quase ausente, osso em contato com osso. Dor constante.</li>
</ul>

<h2>Diagnóstico</h2>

<ul>
<li><strong>Exame físico:</strong> avaliação da dor, crepitação, mobilidade e alinhamento.</li>
<li><strong>Radiografia em carga:</strong> o exame mais importante — mostra o estreitamento articular, osteófitos e deformidades.</li>
<li><strong>Ressonância magnética:</strong> avalia meniscos, cartilagem e partes moles (quando há dúvida diagnóstica).</li>
</ul>

<h2>Tratamento</h2>

<h3>Conservador (graus I a III)</h3>
<ul>
<li><strong>Controle de peso:</strong> a medida mais impactante — perder 5 kg reduz 20 kg de carga no joelho.</li>
<li><strong>Fortalecimento muscular:</strong> quadríceps e glúteos — reduz a carga articular e melhora a estabilidade.</li>
<li><strong>Fisioterapia:</strong> exercícios supervisionados, hidroterapia, pilates.</li>
<li><strong>Medicamentos:</strong> analgésicos, anti-inflamatórios, condroprotetores (glucosamina/condroitina).</li>
<li><strong>Infiltração com ácido hialurônico:</strong> viscossuplementação — "lubrifica" a articulação. Melhores resultados nos graus leves a moderados.</li>
<li><strong>Infiltração com corticoide:</strong> alívio rápido da dor em crises agudas, mas uso limitado a poucas aplicações por ano.</li>
</ul>

<h3>Cirúrgico (grau IV refratário)</h3>
<ul>
<li><strong>Osteotomia:</strong> realinhamento do membro em pacientes jovens com deformidade e artrose unicompartimental.</li>
<li><strong>Prótese de joelho:</strong> substituição da articulação — indicada quando a dor é incapacitante apesar do tratamento conservador máximo. Durabilidade de 15-20 anos.</li>
</ul>

<p>Quando identifico necessidade de prótese, encaminho para colega especialista em cirurgia do joelho.</p>

<h2>Quando procurar ortopedista?</h2>

<ul>
<li>Dor no joelho que limita atividades diárias.</li>
<li>Rigidez matinal persistente.</li>
<li>Inchaço recorrente.</li>
<li>Deformidade visível do joelho.</li>
<li>Dificuldade crescente para caminhar.</li>
</ul>

<p><strong>A artrose do joelho não tem cura, mas tem controle.</strong> Com tratamento adequado, é possível reduzir a dor, preservar a função e manter a qualidade de vida por muitos anos.</p>

<p><em>Dra. Janaína Drumond — Ortopedista e Traumatologista | CRM-MG 69719 | RQE 50592</em></p>
`,
  },
];

export function getCondicaoBySlug(slug: string): Condicao | undefined {
  return CONDICOES.find((c) => c.slug === slug);
}
