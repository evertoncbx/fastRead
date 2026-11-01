import { ReadingText } from '../types';

export const INITIAL_DIAGNOSTIC_TEXT: ReadingText = {
  id: 'diag-01',
  title: 'Teste Diagnóstico: A Mecânica da Mente Leitora',
  author: 'Domínio Público / Adaptado para Nivelamento',
  category: 'artigo',
  description: 'Texto padrão para medir sua velocidade de leitura inicial (PPM) e sua capacidade natural de retenção.',
  wordCount: 312,
  estimatedMinutes: 2,
  text: `A leitura é uma das invenções mais extraordinárias da humanidade, permitindo que mentes separadas por séculos e oceanos se comuniquem com precisão. No entanto, a maioria das pessoas lê exatamente da mesma maneira que aprendeu na infância: decodificando sílaba por sílaba e pronunciando mentalmente cada palavra em uma voz interior. Esse hábito é conhecido pelos neurocientistas como subvocalização.

A subvocalização atua como um limitador biológico severo. Enquanto o aparelho fonador humano consegue articular no máximo entre cento e cinquenta a duzentas e cinquenta palavras por minuto, o córtex visual e os centros de processamento cognitivo do cérebro são capazes de absorver imagens e conceitos a taxas muito superiores, frequentemente ultrapassando mil unidades de informação por segundo. Quando nos forçamos a falar mentalmente o que nossos olhos já enxergaram, criamos um engarrafamento desnecessário no fluxo do pensamento.

Além do freio vocal, a movimentação errática dos olhos prejudica a velocidade. Um leitor destreinado realiza paradas constantes em quase todas as palavras, além de sofrer regressões frequentes, retornando o olhar a linhas anteriores por insegurança ou distração momentânea. Ao expandir o campo de visão periférica e fixar o foco em blocos de termos conexos, o leitor reduz o cansaço dos músculos oculares e libera energia para o que verdadeiramente importa: a compreensão profunda e a retenção do conhecimento.

Dominar técnicas de leitura dinâmica não significa folhear páginas apressadamente sem captar a mensagem, mas sim treinar o cérebro para converter símbolos visuais diretamente em significados, eliminando intermediários sonoros supérfluos. Aumentar a cadência em cinquenta por cento não é um truque de mágica, mas uma adaptação fisiológica simples alcançada por meio da repetição deliberada e da disciplina diária.`,
  quiz: [
    {
      id: 'q1',
      question: 'Qual é o nome dado pelo texto à voz interior que pronuncia mentalmente cada palavra?',
      options: [
        'Vocalização periférica',
        'Subvocalização',
        'Regressão ocular',
        'Decodificação rítmica'
      ],
      correctIndex: 1,
      explanation: 'O texto define explicitamente a subvocalização como o ato de pronunciar mentalmente cada palavra em uma voz interior.'
    },
    {
      id: 'q2',
      question: 'Por que a subvocalização funciona como um limitador biológico para a leitura?',
      options: [
        'Porque causa cansaço na garganta durante o estudo',
        'Porque o aparelho fonador articula no máximo de 150 a 250 palavras por minuto, enquanto o cérebro processa muito mais rápido',
        'Porque impede que os olhos façam movimentos sacádicos',
        'Porque exige a presença de um metrônomo para manter a concentração'
      ],
      correctIndex: 1,
      explanation: 'O texto aponta que o aparelho fonador articula entre 150 e 250 PPM, restringindo a velocidade à cadência da fala humana.'
    },
    {
      id: 'q3',
      question: 'De acordo com o texto, o que causa o cansaço dos músculos oculares em leitores não treinados?',
      options: [
        'A leitura sob luz fluorescente',
        'A falta de piscar os olhos enquanto lê',
        'Paradas em quase todas as palavras e regressões visuais constantes',
        'O uso excessivo de tabelas de Schulte'
      ],
      correctIndex: 2,
      explanation: 'O leitor destreinado faz paradas constantes em cada palavra e sofre regressões frequentes, sobrecarregando a musculatura ocular.'
    },
    {
      id: 'q4',
      question: 'Qual é o verdadeiro significado de dominar a leitura dinâmica segundo o artigo?',
      options: [
        'Folhear livros rapidamente sem se preocupar com detalhes',
        'Pular parágrafos inteiros buscando apenas palavras-chave',
        'Treinar o cérebro para converter símbolos visuais diretamente em significados, eliminando o intermediário sonoro',
        'Memorizar o número de páginas lidas em um único dia'
      ],
      correctIndex: 2,
      explanation: 'Dominar a técnica significa treinar o cérebro para converter símbolos visuais diretamente em conceitos, sem depender da voz mental.'
    }
  ]
};

export const PERIODIC_ASSESSMENT_TEXT: ReadingText = {
  id: 'diag-02',
  title: 'Teste de Aferição (+50%): A Atenção Focada e o Ritmo Cognitivo',
  author: 'Domínio Público / Avaliação de Evolução',
  category: 'artigo',
  description: 'Avalie sua velocidade atual e verifique se você atingiu a meta de aumento de 50% em relação ao teste inicial.',
  wordCount: 326,
  estimatedMinutes: 2,
  text: `A atenção humana funciona como uma lente óptica ajustável. Quando dispersa, capta ruídos indistintos e detalhes triviais sem gravar nada com nitidez na memória duradoura. Quando focalizada em feixe estreito e rítmico, a mente ganha a potência de um raio luminoso capaz de atravessar textos densos com clareza imediata e assimilação duradoura.

Um dos paradoxos mais fascinantes da neurociência da aprendizagem reside no fato de que ler devagar não garante maior compreensão. Pelo contrário: leituras excessivamente lentas criam vazios temporais entre as palavras. Nesses intervalos silenciosos, a imaginação vagueia, os pensamentos fogem para preocupações cotidianas e o fio da meada conceitual se perde com facilidade. O leitor então se vê obrigado a reler o mesmo trecho duas ou três vezes.

Ao acelerar a cadência e acompanhar um ritmo visual contínuo, a mente é desafiada a ocupar toda a sua capacidade de processamento imediato. Não resta espaço para divagações periféricas. A fixação passa a ocorrer por blocos de significado, e a compreensão global salta de qualidade. É exatamente por essa razão que o metrônomo e o leitor de apresentação serial rápida produzem resultados consistentes.

Atingir cinquenta por cento a mais de velocidade representa muito mais do que economia de minutos diante de um livro ou relatório profissional. Significa que você reorganizou a fiação cognitiva de captação visual, aprendeu a confiar na percepção instantânea dos seus olhos e conquistou um domínio superior sobre a sua própria faculdade de concentração. Manter essa conquista exige persistência na jornada diária, praticando a leitura em blocos e exercitando a visão periférica com regularidade.`,
  quiz: [
    {
      id: 'p1',
      question: 'Segundo o autor, qual é o paradoxo da neurociência em relação à leitura lenta?',
      options: [
        'Leitura lenta fortalece a memória fotográfica',
        'Ler devagar não garante maior compreensão; pelo contrário, cria vazios temporais que favorecem a distração e a divagação',
        'Ler devagar queima mais calorias mentais do que ler rápido',
        'A leitura lenta só é eficaz quando acompanhada de música clássica'
      ],
      correctIndex: 1,
      explanation: 'O texto explica que ler devagar gera vazios temporais onde a mente vagueia e perde o fio da meada.'
    },
    {
      id: 'p2',
      question: 'O que acontece quando aceleramos a cadência de leitura para um ritmo contínuo?',
      options: [
        'A mente se cansa em menos de dois minutos',
        'A mente é forçada a usar toda a sua capacidade de processamento imediato, sem espaço para divagações',
        'As palavras perdem todo o significado gramatical',
        'O leitor passa a subvocalizar com mais intensidade'
      ],
      correctIndex: 1,
      explanation: 'A aceleração preenche a capacidade cognitiva de processamento, impedindo divagações e pensamentos intrusivos.'
    },
    {
      id: 'p3',
      question: 'O que o aumento de 50% de velocidade realmente representa na visão do autor?',
      options: [
        'Apenas uma habilidade esportiva sem valor prático',
        'Uma reorganização da captação visual e um domínio superior sobre a própria concentração',
        'A capacidade de dispensar totalmente os livros didáticos',
        'Um método para ler sem olhar diretamente para as páginas'
      ],
      correctIndex: 1,
      explanation: 'O texto aponta que representa reorganização cognitiva de captação visual e maior controle sobre a concentração.'
    }
  ]
};

export const READING_LIBRARY: ReadingText[] = [
  INITIAL_DIAGNOSTIC_TEXT,
  PERIODIC_ASSESSMENT_TEXT,
  {
    id: 'machado-cartomante',
    title: 'A Cartomante (Excerto Clássico)',
    author: 'Machado de Assis',
    category: 'conto',
    description: 'Um dos contos mais célebres da literatura brasileira, repleto de ironia, tensão psicológica e elegância estilística.',
    wordCount: 420,
    estimatedMinutes: 2,
    text: `Hamlet observa a Horácio que há mais coisas no céu e na terra do que sonha a nossa vã filosofia. Era a mesma explicação que dava a bela Rita ao moço Camilo, numa sexta-feira de novembro de 1869, quando este ria dela, por ter ido na véspera consultar uma cartomante. A diferença é que o fazia por outras palavras.

— Ria, ria. Os homens são assim; não acreditam em nada. Pois fui, e ela adivinhou tudo o que eu tinha no coração. Apenas pôs as cartas na mesa, disse-me: "A senhora gosta de uma pessoa..." Confessei que sim, e então ela continuou a botar as cartas, combinou-as, e no fim declarou-me que eu tinha medo de que você me esquecesse, mas que não era verdade...

— Errou! interrompeu Camilo, rindo.

— Não diga isso, Camilo. Se você soubesse como eu tenho andado aflita, por sua causa. Você sabe; já lhe disse. Não ria de mim, não ria...

Camilo pegou-lhe nas mãos e olhou para ela sério e fixo. Jurou que lhe queria muito, que os seus sustos pareciam de criança; em todo o caso, quando tivesse algum receio, a melhor cartomante era ele mesmo. Depois, repreendeu-a; disse-lhe que era imprudente andar por essas casas. Vilela podia saber, e depois...

— Qual saber! tive muita cautela ao entrar na casa.

— Onde é a casa?

— Perto da farmácia, na rua da Guarda Velha; não passava ninguém na ocasião. Descanse; eu não sou tola.

Camilo riu outra vez:

— Tu crês nessas coisas? perguntou-lhe.

Foi então que ela, sem saber que traduzia Hamlet em vulgar, disse-lhe que havia muita coisa misteriosa e verdadeira neste mundo. Se ele soubesse! Ela mesma tinha casos. Em todo o caso, a cartomante adivinhara tudo. O que mais? A prova é que ela estava agora tranquila e satisfeita.

Camilo não podia esquecer as palavras de Rita, nem o olhar límpido com que ela o fitava, ao mesmo tempo que as suas mãos tremiam levemente. Sentia que a paixão entre ambos crescia dia a dia, envolta em uma névoa de perigo que ele próprio tentava disfarçar. Mas o destino, com suas cartas invisíveis, já preparava o desfecho que nenhuma cartomante seria capaz de evitar.`,
    quiz: [
      {
        id: 'mc1',
        question: 'Qual célebre personagem shakespeariano é citado na abertura do conto por Machado de Assis?',
        options: ['Otelo', 'Macbeth', 'Hamlet', 'Rei Lear'],
        correctIndex: 2,
        explanation: 'O conto abre citando a frase de Hamlet a Horácio sobre haver mais coisas entre o céu e a terra.'
      },
      {
        id: 'mc2',
        question: 'O que a cartomante revelou a Rita ao ler as cartas?',
        options: [
          'Que Camilo iria viajar para a Europa',
          'Que ela gostava de uma pessoa e tinha medo de ser esquecida, mas que esse medo não era verdade',
          'Que Vilela já havia descoberto o caso amoroso',
          'Que Rita ganharia uma grande herança de família'
        ],
        correctIndex: 1,
        explanation: 'A cartomante disse que ela gostava de alguém e temia ser esquecida, tranquilizando seus temores.'
      },
      {
        id: 'mc3',
        question: 'Onde se localizava a casa da cartomante consultada por Rita?',
        options: [
          'No Largo do Machado',
          'Perto da farmácia, na rua da Guarda Velha',
          'Na praia de Botafogo',
          'No morro de Santa Teresa'
        ],
        correctIndex: 1,
        explanation: 'Rita diz expressamente: "Perto da farmácia, na rua da Guarda Velha; não passava ninguém na ocasião."'
      }
    ]
  },
  {
    id: 'machado-missa-galo',
    title: 'Missa do Galo (A Noite de Natal)',
    author: 'Machado de Assis',
    category: 'conto',
    description: 'Um diálogo sutil e enigmático entre o jovem Nogueira e a misteriosa Dona Conceição na noite de Natal.',
    wordCount: 395,
    estimatedMinutes: 2,
    text: `Nunca pude entender a conversação que tive com uma senhora, há muitos anos; contava eu dezessete anos, ela trinta. Era noite de Natal. Havendo ajustado com um vizinho irmos à missa do galo, preferi não dormir a sesta da tarde e passar a vigília lendo um romance francês. O silêncio da casa era absoluto; a família dormia, e o relógio da sala de jantar batia pausadamente as horas.

Eram quase onze horas quando ouvi passos macios na sala ao lado. A porta se abriu devagar, e apareceu dona Conceição. Tinha um xale de lã sobre os ombros e caminhava com lentidão, os olhos cheios de uma placidez estranha. Sentei-me mais ereto na cadeira de palhinha e fechei o livro sobre o joelho.

— Ainda não foi para a igreja, Nogueira? perguntou ela em voz baixa.

— Ainda é cedo, dona Conceição. O Meneses disse que passava por aqui às onze e meia.

Ela sentou-se na otomana, em frente a mim, cruzou as mãos e olhou para o teto de vigas escuras. O marido dela, o escrivão Meneses, saíra mais cedo sob o pretexto de negócios no cartório, mas todos sabiam que mantinha outros enlaces pela cidade. Dona Conceição suportava tudo com uma mansidão resignada que desconcertava os que a conheciam de perto.

— Você gosta de ler romances? tornou ela, inclinando um pouco o tronco na minha direção.

— Muito, respondi. É a melhor companhia para quem espera.

Ela sorriu com um movimento quase imperceptível dos lábios. A conversa prosseguiu em sussurros, falando de coisas sem importância: dos vizinhos, do calor do mês de dezembro, da música que se cantaria na igreja da Sé. No entanto, havia em cada frase dela um timbre insólito, uma lentidão nos gestos que me prendia àquela sala como se um feitiço me envolvesse. Quando o relógio soou a meia-noite e Meneses bateu à porta, senti que aquela meia hora havia sido mais longa e densa do que anos inteiros de minha mocidade.`,
    quiz: [
      {
        id: 'mg1',
        question: 'Quantos anos tinha o narrador Nogueira na época dos acontecimentos narrados?',
        options: ['15 anos', '17 anos', '21 anos', '25 anos'],
        correctIndex: 1,
        explanation: 'O narrador informa no início: "contava eu dezessete anos, ela trinta."'
      },
      {
        id: 'mg2',
        question: 'O que Nogueira fazia para passar o tempo enquanto esperava a hora da Missa do Galo?',
        options: [
          'Escrevia cartas para a família no interior',
          'Lia um romance francês na sala',
          'Tocava violão na varanda',
          'Dormia na rede'
        ],
        correctIndex: 1,
        explanation: 'Ele preferiu não dormir e passar a vigília lendo um romance francês.'
      },
      {
        id: 'mg3',
        question: 'Qual era a atitude marcante de Dona Conceição diante das traições conhecidas do marido?',
        options: [
          'Fúria constante e escândalos públicos',
          'Mansidão resignada que desconcertava a todos',
          'Ameaças de separação perante a justiça',
          'Indiferença fingida acompanhada de vingança'
        ],
        correctIndex: 1,
        explanation: 'O texto descreve que ela suportava tudo com uma mansidão resignada que desconcertava os que a conheciam.'
      }
    ]
  },
  {
    id: 'rui-barbosa-oracao',
    title: 'Oração aos Moços (A Justiça e o Trabalho)',
    author: 'Rui Barbosa',
    category: 'discurso',
    description: 'O mais célebre discurso da oratória forense brasileira, pronunciado como patrono dos bacharelandos da Faculdade de Direito de São Paulo.',
    wordCount: 388,
    estimatedMinutes: 2,
    text: `A regra da igualdade não consiste senão em quinhoar desigualmente aos desiguais, na medida em que se desigualam. Nesta desigualdade social, proporcionada à desigualdade natural, é que se acha a verdadeira lei da igualdade. O mais são desvarios da inveja, do orgulho, ou da loucura. Tratar com desigualdade a iguais, ou a desiguais com igualdade, seria desigualdade flagrante, e não igualdade real.

Os apetites humanos conceberam inverter esta norma universal da criação, pretendendo não dar a cada um, na razão do que vale, mas atribuir o mesmo a todos, como se todos se equivalessem. Esta blasfêmia contra a razão e a natureza gerou a teoria da igualdade absoluta, que nivela os talentos, as virtudes e os esforços, coroando a indolência ao lado do sacrifício e o vício ao lado da integridade.

Não vos deixeis seduzir por essas quimeras enganadoras. Não há trabalho sem fadiga, não há glória sem vigília, não há saber sem dedicação severa e obstinada. O saber não é privilégio que se herde, nem mercadoria que se compre nas praças; é conquista pessoal, lavrada no silêncio dos gabinetes e temperada na observação atenta da vida prática.

Meus jovens amigos: diante de vós abre-se a arena da pátria, sedenta de homens probos, lúcidos e corajosos. Não vos vendais ao aplauso fácil das multidões efêmeras, nem vos curveis diante dos poderosos do dia. A justiça não tem partidos, a verdade não tem donos e o dever não comporta transigências. Quem abraça a causa do direito e do bem comum faz do seu próprio nome um escudo inquebrantável contra as tiranias de qualquer estirpe. Sede retos, sede operosos e mantende vossos olhos fitos no horizonte mais alto da nação.`,
    quiz: [
      {
        id: 'rb1',
        question: 'Segundo a célebre definição de Rui Barbosa, em que consiste a verdadeira regra da igualdade?',
        options: [
          'Em dar exatamente as mesmas coisas a todos os indivíduos indistintamente',
          'Em quinhoar desigualmente aos desiguais, na medida em que se desigualam',
          'Em abolir todas as leis jurídicas para permitir a liberdade plena',
          'Em premiar prioritariamente aqueles de melhor berço financeiro'
        ],
        correctIndex: 1,
        explanation: 'Rui Barbosa define que a igualdade real consiste em tratar desigualmente os desiguais, na medida da sua desigualdade.'
      },
      {
        id: 'rb2',
        question: 'Como o autor descreve a conquista do verdadeiro saber humano?',
        options: [
          'Uma herança familiar automática transmitida pelos pais',
          'Uma mercadoria acessível de compra e venda nos mercados',
          'Uma conquista pessoal, forjada no silêncio da dedicação e temperada na observação da vida prática',
          'Um golpe de sorte concedido pelo destino aos escolhidos'
        ],
        correctIndex: 2,
        explanation: 'Ele afirma que o saber é conquista pessoal, lavrada no silêncio e na observação severa da prática.'
      },
      {
        id: 'rb3',
        question: 'Qual conselho moral Rui Barbosa entrega enfaticamente aos novos bacharéis?',
        options: [
          'Buscar o enriquecimento financeiro rápido através de causas corporativas',
          'Não se vender ao aplauso fácil nem se curvar perante os poderosos do dia, mantendo fidelidade à justiça e à verdade',
          'Adotar posições partidárias rígidas para garantir cargos estatais',
          'Evitar a oratória pública para não sofrer perseguições políticas'
        ],
        correctIndex: 1,
        explanation: 'Ele aconselha os jovens a não se renderem ao aplauso efêmero nem se curvarem perante o poder, defendendo retidão inegociável.'
      }
    ]
  },
  {
    id: 'ciencia-espacial-brasil',
    title: 'Avanços da Ciência Espacial e Observação Terrestre no Brasil',
    author: 'Agência Brasil / Domínio Público',
    category: 'noticia',
    description: 'Reportagem pública sobre o programa de monitoramento ambiental por satélites e o desenvolvimento científico nacional.',
    wordCount: 360,
    estimatedMinutes: 2,
    text: `O Brasil consolidou nos últimos anos uma posição de destaque internacional no desenvolvimento e na operação de satélites dedicados à observação remota da Terra. Por meio de parcerias entre o Instituto Nacional de Pesquisas Espaciais e centros acadêmicos de ponta, engenheiros brasileiros colocaram em órbita artefatos tecnológicos de alta complexidade, inteiramente projetados e testados em laboratórios nacionais.

O principal objetivo desses satélites é prover dados em tempo real sobre a cobertura vegetal, bacias hidrográficas e áreas agrícolas em todo o território nacional. A tecnologia de imageamento óptico multiespectral desenvolvida pelos pesquisadores permite detectar variações de biomassa com precisão métrica, mesmo sob condições meteorológicas desafiadoras de nebulosidade frequente sobre a floresta amazônica.

Além da proteção aos biomas nativos, as imagens transmitidas alimentam bancos de dados públicos utilizados por pesquisadores do mundo inteiro. Produtores agrícolas familiares e cooperativas rurais também utilizam essas informações para calcular o índice de umidade do solo, prevendo períodos de seca e otimizando a irrigação com drástica redução no consumo de água potável e defensivos químicos.

O sucesso da missão demonstra a capacidade transformadora do investimento continuado em ciência de base e formação de recursos humanos qualificados. Mais do que apontar câmeras para o planeta, a tecnologia aeroespacial brasileira representa soberania técnica, estímulo à indústria nacional de alta densidade de engenharia e um compromisso ético do país com a preservação climática global.`,
    quiz: [
      {
        id: 'ce1',
        question: 'Qual instituição nacional é citada como protagonista na operação dos satélites brasileiros?',
        options: [
          'Ministério dos Transportes Marítimos',
          'Instituto Nacional de Pesquisas Espaciais (INPE)',
          'Conselho Federal de Medicina',
          'Agência Nacional de Telecomunicações Privadas'
        ],
        correctIndex: 1,
        explanation: 'O texto aponta a parceria direta com o Instituto Nacional de Pesquisas Espaciais (INPE).'
      },
      {
        id: 'ce2',
        question: 'De que maneira os produtores agrícolas e cooperativas aproveitam as imagens de satélite?',
        options: [
          'Para criar comerciais de televisão com belas paisagens',
          'Para calcular a umidade do solo, antecipar secas e economizar água na irrigação',
          'Para vender lotes de terra através da internet',
          'Para monitorar o preço das commodities nas bolsas de Nova York'
        ],
        correctIndex: 1,
        explanation: 'Eles utilizam os dados para medir umidade do solo, planejar a irrigação e economizar recursos hídricos.'
      }
    ]
  },
  {
    id: 'neurociencia-leitura',
    title: 'A Neurobiologia da Leitura e os Movimentos Sacádicos',
    author: 'Artigo Científico em Domínio Público',
    category: 'artigo',
    description: 'Estudo fundamental sobre como o cérebro humano processa grafemas, sintagmas e coordena os saltos dos olhos.',
    wordCount: 375,
    estimatedMinutes: 2,
    text: `A leitura não é uma capacidade biologicamente inata à espécie humana, como é a fala ou a visão binocular. Não nascemos com um "órgão da leitura" pré-programado no DNA. Em vez disso, o cérebro recorre à sua admirável plasticidade cortical para "reciclar" circuitos neurais da região occipitotemporal esquerda — área originalmente evoluída para o reconhecimento de formas visuais, rastros e predadores na natureza.

Quando uma pessoa lê, os olhos não deslizam de forma suave e contínua sobre as linhas de texto, como se fossem uma câmera sobre trilhos. Ao contrário, o aparelho ocular move-se por meio de saltos balísticos rápidos e discretos, denominados movimentos sacádicos. Cada salto sacádico dura aproximadamente vinte a trinta milissegundos, durante os quais a visão se encontra funcionalmente cega. A captação real de fótons e dados ocorre somente durante as pausas, denominadas fixações oculares.

Em leitores habituais sem treinamento técnico, cada fixação dura em média duzentos e cinquenta milissegundos e abarca apenas uma ou duas palavras adjacentes. Além disso, até vinte por cento do tempo de leitura é desperdiçado em regressões involuntárias, onde o olhar volta para trás sem necessidade real.

O treinamento deliberado de leitura dinâmica intervém diretamente nessa fisiologia. Ele expande o raio da visão periférica e parafoveal, permitindo que a fóvea processe de três a quatro palavras por fixação. Concomitantemente, habitua o cérebro a confiar no sinal visual sem depender da transcrição fonética interna. O resultado prático é uma redução exponencial do número total de paradas oculares por página, duplicando a velocidade e poupando a fadiga neural.`,
    quiz: [
      {
        id: 'nl1',
        question: 'O que são movimentos sacádicos segundo o artigo neurocientífico?',
        options: [
          'Movimentos lentos e sonolentos dos olhos durante a meditação',
          'Saltos balísticos rápidos e discretos dos olhos, entre os quais ocorrem as fixações de leitura',
          'Espasmos involuntários que indicam necessidade de óculos de grau',
          'Contrações musculares provocadas pela fala sussurrada'
        ],
        correctIndex: 1,
        explanation: 'Movimentos sacádicos são saltos balísticos rápidos e discretos que os olhos realizam entre uma fixação e outra.'
      },
      {
        id: 'nl2',
        question: 'Durante qual momento ocorre a verdadeira captação das informações escritas pelos olhos?',
        options: [
          'Durante o salto sacádico em alta velocidade',
          'Apenas durante as pausas de fixação ocular',
          'Enquanto a pessoa pisca as pálpebras',
          'Somente quando as palavras são pronunciadas em voz alta'
        ],
        correctIndex: 1,
        explanation: 'A visão fica funcionalmente cega durante os saltos; a captação ocorre exclusivamente nas fixações oculares.'
      },
      {
        id: 'nl3',
        question: 'Qual é o impacto direto do treinamento de leitura dinâmica na fisiologia ocular?',
        options: [
          'Aumenta o número de paradas por linha para captar mais letras',
          'Expande o campo visual periférico/parafoveal e diminui o número de paradas por página',
          'Obriga o olho a ler apenas a primeira letra de cada frase',
          'Impede completamente o movimento das pupilas'
        ],
        correctIndex: 1,
        explanation: 'O treinamento expande o campo parafoveal para 3-4 palavras por fixação e reduz o número de paradas por página.'
      }
    ]
  }
];
