import { ReadingText } from '../types';

export const INITIAL_DIAGNOSTIC_TEXT: ReadingText = {
  id: 'diag-01',
  title: 'A Mecânica da Mente Leitora',
  author: 'Artigo Científico / Nivelamento Cognitivo',
  category: 'artigo',
  description: 'Texto para medir sua velocidade de leitura inicial (PPM) e sua capacidade natural de retenção.',
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
  title: 'A Atenção Focada e o Ritmo Cognitivo',
  author: 'Neurociência Aplicada / Avaliação de Evolução',
  category: 'artigo',
  description: 'Avalie sua velocidade atual e verifique seu avanço em relação ao teste inicial.',
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

export const DIAGNOSTIC_TEXT_3: ReadingText = {
  id: 'diag-03',
  title: 'O Homem que Sabia Javanês',
  author: 'Lima Barreto',
  category: 'conto',
  description: 'Uma sátira brilhante da sociedade carioca sobre erudição aparente, astúcia e domínio da linguagem.',
  wordCount: 345,
  estimatedMinutes: 2,
  text: `Castelo olhou para mim com um ar triunfante e confidenciou-me o seu segredo. O homem vivia na mais completa penúria até que deparou com um anúncio de jornal: precisava-se de alguém que soubesse a língua javanesa para traduzir manuscritos antigos e dar aulas a um nobre barão aposentado. Nenhum habitante da cidade, como era de se esperar, dominava tão exótico dialeto das ilhas do oriente.

Sem pestanejar, Castelo dirigiu-se à Biblioteca Nacional. Consultou dicionários filológicos, decorou o alfabeto básico, o nome de uma dezena de reis lendários e aprendeu meia dúzia de saudações e adjetivos cerimoniais. Com essa parca bagagem e uma solenidade inabalável no semblante, apresentou-se no solar do barão.

O ancião, quase cego e sedento de glória literária, ficou maravilhado com a pronúncia gutural do jovem mestre. A cada lição, Castelo inventava regras gramaticais na hora, declamava versos estapafúrdios e recebia generosas quantias em ouro. Em poucos meses, o falso sábio era aclamado pela imprensa, convidado para conferências internacionais e finalmente nomeado cônsul da república.

A narrativa de Lima Barreto expõe com humor ferino a fragilidade das aparências e o fascínio das elites pelo rebuscado sem substância. Na leitura dinâmica, o desafio é análogo: precisamos penetrar a carcaça formal das frases com rapidez cirúrgica, extraindo a essência do pensamento antes que os ornamentos verbais nos desviem da verdade.`,
  quiz: [
    {
      id: 'd3-1',
      question: 'O que motivou Castelo a inventar que sabia javanês?',
      options: [
        'Uma aposta feita com amigos de faculdade',
        'Um anúncio de jornal que procurava um tradutor de manuscritos para um barão',
        'Um concurso público para a diplomacia em Paris',
        'O desejo de fugir da polícia do Rio de Janeiro'
      ],
      correctIndex: 1,
      explanation: 'Ele viu um anúncio de jornal buscando alguém que dominasse o idioma javanês para atender a um velho barão.'
    },
    {
      id: 'd3-2',
      question: 'Como Castelo se preparou antes de se apresentar ao barão?',
      options: [
        'Viajou para a Ásia e passou anos estudando em Java',
        'Contratou um marinheiro estrangeiro no porto',
        'Foi à Biblioteca Nacional, decorou o alfabeto, nomes de reis e poucas saudações',
        'Comprou uma coleção completa de enciclopédias inglesas'
      ],
      correctIndex: 2,
      explanation: 'Ele consultou a Biblioteca Nacional, decorou algumas saudações, o alfabeto e nomes de reis na véspera da entrevista.'
    },
    {
      id: 'd3-3',
      question: 'Qual é a crítica central feita por Lima Barreto por meio desse conto?',
      options: [
        'A dificuldade de aprender línguas orientais',
        'A falta de livros didáticos nas escolas públicas',
        'A fragilidade das aparências e a facilidade com que a sociedade se impressiona com erudição superficial',
        'A necessidade de fechar a Biblioteca Nacional'
      ],
      correctIndex: 2,
      explanation: 'Lima Barreto ironiza as aparências sociais e o apreço por títulos vazios sem conhecimento real.'
    }
  ]
};

export const DIAGNOSTIC_TEXT_4: ReadingText = {
  id: 'diag-04',
  title: 'Gutenberg e a Revolução da Memória',
  author: 'História do Livro e da Mente / Ensaio Cultural',
  category: 'artigo',
  description: 'Como a invenção da prensa de tipos móveis transformou a arquitetura cognitiva humana.',
  wordCount: 338,
  estimatedMinutes: 2,
  text: `Antes de Johannes Gutenberg aperfeiçoar os tipos móveis metálicos em meados do século quinze na Alemanha, cada volume literário era uma obra artesanal caríssima. Monges copistas passavam anos debruçados sobre velinos e pergaminhos, iluminando capitulares à luz de velas. Uma biblioteca com trinta códices representava fortuna comparável a propriedades rurais inteiras.

A prensa mecânica produziu um abalo sísmico na cognição ocidental. Ao baratear a produção e permitir tiragens idênticas em larga escala, libertou a memória individual do fardo da pura retenção oral. Até então, quem quisesse conservar uma epopeia ou tratado de botânica precisava memorizá-lo verso por verso. Com o livro impresso e portátil, a mente humana pôde terceirizar o depósito de dados e redirecionar sua energia criativa para a análise crítica, a comparação de hipóteses e a síntese inovadora.

Contudo, essa abundância trouxe novos desafios perceptivos. Pela primeira vez na história, o ser humano deparou-se com mais textos do que seria capaz de ler durante a existência inteira. Essa sobrecarga informacional exigiu o desenvolvimento de novas habilidades visuais: índices remissivos, leitura diagonal e métodos para escanear parágrafos à procura de ideias centrais.

Hoje, em meio à torrente digital de telas e hipertextos, o treinamento de leitura dinâmica atualiza essa mesma demanda ancestral. Acelerar o olhar sem perder a profundidade é a chave contemporânea para não nos afogarmos no oceano de palavras que Gutenberg começou a jorrar.`,
  quiz: [
    {
      id: 'd4-1',
      question: 'Como eram reproduzidos os livros antes da invenção da prensa de tipos móveis por Gutenberg?',
      options: [
        'Por meio de máquinas a vapor primitivas',
        'Eram impressos com blocos de madeira japoneses em oficinas estatais',
        'Copiados à mão individualmente por monges copistas em pergaminhos ao longo de anos',
        'Ditados em praça pública e gravados em tábuas de argila'
      ],
      correctIndex: 2,
      explanation: 'Os textos eram copiados manualmente um a um por monges copistas em velino e pergaminho.'
    },
    {
      id: 'd4-2',
      question: 'Segundo o ensaio, qual foi o maior benefício cognitivo proporcionado pelo livro impresso?',
      options: [
        'Aumentou a necessidade de memorização palavra por palavra',
        'Liberou a mente humana do fardo da retenção mnemônica, permitindo focar na análise crítica e comparação',
        'Eliminou totalmente os erros de tradução em todas as obras',
        'Fez com que as bibliotecas deixassem de existir'
      ],
      correctIndex: 1,
      explanation: 'O livro impresso permitiu terceirizar a memória bruta e redirecionar a cognição para o pensamento crítico.'
    },
    {
      id: 'd4-3',
      question: 'Qual novo desafio surgiu com a imensa abundância de livros gerada pela imprensa?',
      options: [
        'A perda da visão de todos os leitores europeus',
        'A escassez total de papel celulose no século dezesseis',
        'A sobrecarga de informações, exigindo novas habilidades para escanear e selecionar o essencial',
        'O cancelamento das feiras internacionais de livros'
      ],
      correctIndex: 2,
      explanation: 'Com mais textos disponíveis do que uma vida permite ler, surgiram a leitura seletiva, índices e escaneamento visual.'
    }
  ]
};

export const DIAGNOSTIC_TEXT_5: ReadingText = {
  id: 'diag-05',
  title: 'Plasticidade Cerebral e o Estado de Fluxo',
  author: 'Psicologia Cognitiva & Performance Mental',
  category: 'artigo',
  description: 'A ciência de entrar na zona de foco imersivo durante a leitura e reprogramar conexões neurais.',
  wordCount: 330,
  estimatedMinutes: 2,
  text: `O conceito de neuroplasticidade revolucionou nossa compreensão sobre o cérebro adulto. Durante décadas, acreditou-se que após a juventude os circuitos neurais tornavam-se imutáveis e rígidos. Hoje sabemos que toda prática intencional de alta intensidade remodela as trilhas dendríticas, construindo novas pontes sinápticas e acelerando a mielinização dos axônios envolvidos na tarefa.

Na leitura, essa maleabilidade orgânica manifesta-se com particular intensidade quando o indivíduo atinge o chamado "estado de fluxo" ou flow. Esse estado psicológico ótimo, amplamente mapeado pelo pesquisador Mihaly Csikszentmihalyi, ocorre quando o nível de desafio de uma atividade equilibra-se perfeitamente com a habilidade do praticante.

Quando lemos abaixo da nossa capacidade real de processamento, a baixa demanda cognitiva induz o cérebro à monotonia e ao devaneio. Os neurônios da rede de modo padrão (Default Mode Network) ativam-se, puxando a mente para preocupações periféricas, listas de tarefas ou memórias desconexas. Ao contrário, quando aumentamos a velocidade em cinquenta por cento com exercícios rítmicos, o córtex pré-frontal precisa mobilizar todos os seus recursos de foco executivo.

Essa mobilização maciça silencia os ruídos internos. A consciência funde-se com as palavras, o tempo cronológico parece desacelerar e a retenção conceitual sobe exponencialmente. Ler com técnica não é pressa desajeitada, mas sim um mergulho intencional na zona de máxima eficiência cerebral.`,
  quiz: [
    {
      id: 'd5-1',
      question: 'O que a descoberta da neuroplasticidade comprovou sobre o cérebro humano adulto?',
      options: [
        'Que o cérebro deixa de aprender totalmente após os vinte anos',
        'Que práticas intencionais e intensas são capazes de remodelar circuitos sinápticos e acelerar conexões em qualquer idade',
        'Que a leitura rápida causa perda de neurônios no lobo frontal',
        'Que as habilidades intelectuais dependem exclusivamente da genética'
      ],
      correctIndex: 1,
      explanation: 'A neuroplasticidade provou que o cérebro adulto se remodela continuamente por meio de práticas intencionais.'
    },
    {
      id: 'd5-2',
      question: 'Por que ler muito devagar frequentemente causa desatenção e devaneio mental?',
      options: [
        'Porque a luz da sala cansa o nervo óptico',
        'Porque a baixa exigência cognitiva ativa a rede de modo padrão, levando a mente a pensamentos paralelos',
        'Porque o corpo fica desidratado após três minutos',
        'Porque as palavras perdem o sentido gramatical'
      ],
      correctIndex: 1,
      explanation: 'A subutilização da capacidade cognitiva aciona o Default Mode Network, provocando divagações cotidianas.'
    },
    {
      id: 'd5-3',
      question: 'Qual é o efeito do aumento de velocidade na atividade do córtex pré-frontal?',
      options: [
        'Desativa a memória de longo prazo',
        'Obriga a mobilização plena dos recursos de foco executivo, silenciando ruídos internos e aprofundando o fluxo',
        'Provoca sono imediato no leitor',
        'Reduz a taxa de oxigênio no sangue'
      ],
      correctIndex: 1,
      explanation: 'O desafio cognitivo calibrado exige foco total do córtex pré-frontal, eliminando distrações e ruídos internos.'
    }
  ]
};

export const DIAGNOSTIC_TEXT_6: ReadingText = {
  id: 'diag-06',
  title: 'Cinco Minutos (O Encontro Inusitado)',
  author: 'José de Alencar',
  category: 'conto',
  description: 'Um clássico do romantismo brasileiro onde um atraso no ônibus da corte desencadeia uma trama cheia de charme e mistério.',
  wordCount: 352,
  estimatedMinutes: 2,
  text: `Tinham dado cinco horas no relógio da Carioca quando cheguei ao largo do Paço para tomar o ônibus que me devia conduzir a Andaraí. Eu me atrasara exatamente cinco minutos; o carro partira no instante mesmo em que eu dobrava a esquina da rua do Ouvidor. Fiquei desolado, porque o próximo veículo só sairia dali a uma hora inteira, e a noite caía rápida sobre a baía do Rio de Janeiro.

Olhei em torno e avistei outro veículo que manobrava devagar, preparando-se para a partida rumo a Botafogo. Sem pensar muito e movido pelo impulso de não ficar parado na poeira do largo, dei dois passos e saltei para dentro da carruagem.

O interior estava quase às escuras; apenas uma fresta de luz entrava pelas cortinas de pano listrado. No fundo, sentada a um canto, repousava uma figura envolta num denso manto escuro. Um véu transparente ocultava-lhe o rosto, mas não conseguia disfarçar o contorno delicado das feições e o brilho tímido de dois olhos castanhos que pareceram fitar-me com espanto contido.

Sentei-me em frente à desconhecida. Um perfume sutil de alfazema pairava no ar úmido da tarde. O carro rodou sobre os paralelepípedos e, durante vinte minutos de silêncio denso e eloqüente, percebi que aqueles cinco minutos de atraso fortuito haviam mudado o curso da minha juventude.

A prosa elegante de Alencar desliza com música e cadência. Ao treinar a absorção em blocos rítmicos, o leitor moderno aprende a saborear cada detalhe sensorial do clássico sem tropeçar nas paradas vacilantes da voz falada.`,
  quiz: [
    {
      id: 'd6-1',
      question: 'Por que o protagonista da história perdeu o primeiro ônibus para o Andaraí?',
      options: [
        'Porque esqueceu o bilhete em casa',
        'Porque atrasou-se exatamente cinco minutos e o carro acabara de partir',
        'Porque foi assaltado na rua do Ouvidor',
        'Porque preferiu tomar café no largo do Paço'
      ],
      correctIndex: 1,
      explanation: 'Ele se atrasou cinco minutos e viu o carro partir no momento em que dobrava a esquina.'
    },
    {
      id: 'd6-2',
      question: 'Que atitude impulsiva o narrador tomou para não esperar uma hora inteira?',
      options: [
        'Voltou a pé até a praia de Botafogo',
        'Alugou um cavalo veloz no cais',
        'Embarcou em outro carro que manobrava em direção a Botafogo',
        'Decidiu pernoitar em um hotel próximo'
      ],
      correctIndex: 2,
      explanation: 'Para não ficar parado esperando, ele subiu no primeiro veículo que saía em direção a Botafogo.'
    },
    {
      id: 'd6-3',
      question: 'Quem o protagonista encontrou no interior da carruagem?',
      options: [
        'Um antigo professor de retórica da corte',
        'Um oficial da marinha imperial',
        'Uma jovem desconhecida envolta em um manto e véu, que o fitou com espanto contido',
        'Um barão abastado que falava javanês'
      ],
      correctIndex: 2,
      explanation: 'Ele encontrou uma jovem desconhecida protegida por um véu e manto escuro, perfumada de alfazema.'
    }
  ]
};

export const DIAGNOSTIC_TEXTS: ReadingText[] = [
  INITIAL_DIAGNOSTIC_TEXT,
  PERIODIC_ASSESSMENT_TEXT,
  DIAGNOSTIC_TEXT_3,
  DIAGNOSTIC_TEXT_4,
  DIAGNOSTIC_TEXT_5,
  DIAGNOSTIC_TEXT_6
];

const RAW_READING_LIBRARY: ReadingText[] = [
  INITIAL_DIAGNOSTIC_TEXT,
  PERIODIC_ASSESSMENT_TEXT,
  DIAGNOSTIC_TEXT_3,
  DIAGNOSTIC_TEXT_4,
  DIAGNOSTIC_TEXT_5,
  DIAGNOSTIC_TEXT_6,
  {
    id: 'machado-cartomante',
    title: 'A Cartomante',
    author: 'Machado de Assis',
    category: 'conto',
    description: 'Um dos contos mais célebres da literatura brasileira, repleto de ironia, tensão psicológica e elegância.',
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
    title: 'Missa do Galo',
    author: 'Machado de Assis',
    category: 'conto',
    description: 'Um diálogo sutil e enigmático entre o jovem Nogueira e Conceição na noite de Natal.',
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
    title: 'Oração aos Moços',
    author: 'Rui Barbosa',
    category: 'discurso',
    description: 'O mais célebre discurso da oratória forense brasileira aos bacharelandos da Faculdade de Direito de SP.',
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
    title: 'Ciência Espacial e Satélites no Brasil',
    author: 'Agência Brasil',
    category: 'noticia',
    description: 'Reportagem pública sobre o programa de monitoramento ambiental por satélites e engenharia aeroespacial.',
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
    title: 'A Neurobiologia da Leitura e Movimentos Sacádicos',
    author: 'Pesquisa & Inovação',
    category: 'artigo',
    description: 'Estudo fundamental sobre como o cérebro humano processa grafemas e coordena os saltos dos olhos.',
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
  },
  {
    id: 'ia-biodiversidade-amazonia',
    title: 'Inteligência Artificial e a Bioacústica da Amazônia',
    author: 'Agência Brasil / Ciência e Tecnologia',
    category: 'noticia',
    description: 'Como redes neurais identificam cantos de espécies raras e monitoram a saúde da maior floresta tropical do mundo.',
    wordCount: 340,
    estimatedMinutes: 2,
    text: `Pesquisadores brasileiros desenvolveram uma plataforma inédita que combina inteligência artificial e sensores de bioacústica para monitorar a biodiversidade em áreas remotas da Floresta Amazônica. Dispositivos autônomos, alimentados por pequenos painéis solares e fixados nas copas das árvores mais altas, gravam ininterruptamente os sons da mata, registrando o coro de aves, primatas, anfíbios e insetos.

O desafio monumental sempre foi a triagem desse oceano sonoro. Um único sensor gera milhares de horas de áudio por mês, volume humanamente impossível de ser decupado por ouvidos biológicos. É aqui que entram os algoritmos de aprendizado profundo: treinados com um acervo digital de cantos e chamados de milhares de espécies nativas, os modelos matemáticos analisam os espectrogramas sonoros em frações de segundo.

O sistema é capaz de identificar a presença de espécies ameaçadas de extinção com precisão superior a noventa e cinco por cento. Além disso, a inteligência artificial detecta em tempo real ruídos anômalos que indicam atividades ilícitas, como motores de motosserras, caminhões pesados em picadas clandestinas ou disparos de armas de caçadores.

Ao enviar alertas georreferenciados imediatos para as autoridades ambientais via satélite, a ferramenta transforma o modo como a conservação florestal opera no Brasil. A integração entre ecologia de campo e computação de ponta demonstra que a tecnologia pode ser uma das maiores aliadas na salvaguarda do patrimônio biológico do planeta.`,
    quiz: [
      {
        id: 'ia-bio-1',
        question: 'Qual é o principal desafio resolvido pela inteligência artificial no monitoramento da Amazônia?',
        options: [
          'A recarga diária das baterias dos sensores',
          'A triagem e identificação de milhares de horas de gravações de áudio impossíveis de analisar manualmente',
          'A fabricação de cabos resistentes à chuva torrencial',
          'A expulsão física de animais perigosos'
        ],
        correctIndex: 1,
        explanation: 'A IA resolve o gargalo de analisar rapidamente milhares de horas de áudios gravados na floresta.'
      },
      {
        id: 'ia-bio-2',
        question: 'Além de identificar espécies raras, qual outra função de proteção a plataforma executa?',
        options: [
          'Detecta em tempo real ruídos de motosserras e caminhões clandestinos, emitindo alertas imediatos',
          'Espanta predadores naturais das aves',
          'Calcula a temperatura da água dos rios',
          'Transmite música clássica para acalmar a fauna'
        ],
        correctIndex: 0,
        explanation: 'A ferramenta detecta sons mecânicos e dispara alertas via satélite para conter ilícitos ambientais.'
      }
    ]
  },
  {
    id: 'mandela-educacao',
    title: 'A Educação como Força de Transformação',
    author: 'Nelson Mandela (Tradução Pública)',
    category: 'discurso',
    description: 'Reflexão histórica sobre o poder libertador do conhecimento e a superação de preconceitos.',
    wordCount: 310,
    estimatedMinutes: 2,
    text: `A educação é a arma mais poderosa que você pode usar para mudar o mundo. Quando dizemos isso, não nos referimos apenas ao acúmulo passivo de diplomas ou à memorização de fatos históricos desprovidos de aplicação humana. Educação é a chave mestra que abre a porta de ferro da ignorância, do preconceito e da servidão involuntária.

Ninguém nasce odiando outra pessoa pela cor de sua pele, por sua origem ou por sua religião. Para odiar, as pessoas precisam aprender; e se elas podem aprender a odiar, podem também ser ensinadas a amar, pois o amor chega mais naturalmente ao coração humano do que o seu oposto. O ambiente escolar e a convivência comunitária devem ser os viveiros onde a semente da empatia floresce.

Um povo instruído, que lê com discernimento e questiona com firmeza, não se dobra diante do despotismo nem se deixa iludir pelas promessas vazias dos demagogos. A capacidade de ler criticamente confere ao indivíduo a posse de seu próprio destino. É por meio do estudo constante e da busca incansável pela verdade que uma nação ferida pelo passado constrói alicerces inabaláveis de justiça, equidade e paz duradoura para as futuras gerações.`,
    quiz: [
      {
        id: 'man-1',
        question: 'Segundo o discurso de Nelson Mandela, como o ódio surge no comportamento humano?',
        options: [
          'É um instinto genético inevitável',
          'As pessoas aprendem a odiar, e por isso podem também ser ensinadas a amar',
          'Nasce com todas as crianças no berço',
          'É fruto exclusivo do clima de cada região'
        ],
        correctIndex: 1,
        explanation: 'Mandela afirma categoricamente que o ódio é aprendido, o que significa que o amor também pode ser ensinado.'
      },
      {
        id: 'man-2',
        question: 'Qual é o papel atribuído à leitura crítica e ao discernimento no texto?',
        options: [
          'Garantir notas perfeitas em exames de admissão',
          'Permitir que o indivíduo assuma a posse de seu destino e não se curve a demagogos',
          'Acelerar a memorização de códigos jurídicos antigos',
          'Substituir a necessidade de governantes'
        ],
        correctIndex: 1,
        explanation: 'O texto aponta que um povo que lê criticamente não se curva a promessas vazias e governa o próprio destino.'
      }
    ]
  },
  {
    id: 'machado-alienista',
    title: 'O Alienista e os Limites da Razão',
    author: 'Machado de Assis',
    category: 'conto',
    description: 'O Dr. Simão Bacamarte funda a Casa Verde em Itaguaí e inicia uma busca obsessiva pela cura da alma humana.',
    wordCount: 360,
    estimatedMinutes: 2,
    text: `O Dr. Simão Bacamarte, filho da nobreza da terra e o maior médico do Brasil, de Portugal e das Espanhas, declarou ao senado da câmara que a loucura, objeto até então de simples curiosidade ou superstição vulgar, era um vasto continente que demandava estudo sistemático. Pediu autorização para fundar um asilo em Itaguaí, batizado de Casa Verde, onde recolheria todos os doentes mentais da vila e cercanias.

A vila inteira aplaudiu o gesto piedoso. No entanto, em poucos meses, a definição de loucura do eminente cientista começou a expandir-se com prodigiosa elasticidade. O homem que falava em demasia, o que guardava silêncio impenetrável, a senhora que gastava em fitas de seda mais do que a renda permitia e o magistrado que se mostrava excessivamente benevolente foram sucessivamente recolhidos aos pavilhões do asilo.

Em breve, mais de quatro quintos da população encontrava-se confinada sob a alegação de desequilíbrio moral ou anomalia psíquica. A perplexidade tomou conta dos lares. Diante do descalabro, Simão Bacamarte reuniu os vereadores para anunciar sua mais recente e fulgurante descoberta teórica: se a quase totalidade dos homens apresentava extravagâncias e desvios de temperamento, a anomalia residia, na verdade, naqueles poucos que demonstravam perfeito equilíbrio e retidão inabalável.

Mandou soltar todos os internos anteriores e recolheu à Casa Verde os cidadãos mais virtuosos e sensatos da comarca. Com refinada ironia, Machado de Assis demonstra o perigo das convicções absolutistas e da ciência desprovida de humanidade e modéstia.`,
    quiz: [
      {
        id: 'ali-1',
        question: 'Qual era o nome do asilo fundado por Simão Bacamarte na vila de Itaguaí?',
        options: ['Hospital Imperial', 'Casa Verde', 'Sanatório da Boa Esperança', 'Solar dos Filósofos'],
        correctIndex: 1,
        explanation: 'O asilo fundado pelo médico Simão Bacamarte recebeu o célebre nome de Casa Verde.'
      },
      {
        id: 'ali-2',
        question: 'Que reviravolta teórica Simão Bacamarte aplicou após confinar a maioria dos moradores?',
        options: [
          'Concluiu que a medicina não servia para nada e fugiu para Lisboa',
          'Decidiu soltar todos os extravagantes e prender apenas os indivíduos perfeitamente equilibrados e virtuosos',
          'Pediu para ser nomeado imperador da comarca',
          'Transformou o asilo em uma escola de música clássica'
        ],
        correctIndex: 1,
        explanation: 'Ele inverteu sua tese: julgou que a verdadeira anomalia pertencia à minoria que agia com perfeita virtude.'
      }
    ]
  },
  {
    id: 'brasil-energia-limpa',
    title: 'A Liderança da Energia Limpa no Brasil',
    author: 'Agência Brasil / Noticiário Econômico',
    category: 'noticia',
    description: 'Como a expansão de parques solares e eólicos posicionou o país na vanguarda da transição ecológica global.',
    wordCount: 335,
    estimatedMinutes: 2,
    text: `O setor elétrico brasileiro atingiu um marco histórico ao registrar que mais de noventa por cento de toda a eletricidade gerada no país proveio de fontes limpas e renováveis ao longo do último ano. Esse desempenho coloca a nação em um patamar de liderança invejável no cenário internacional, onde a média global de matrizes renováveis ainda engatinha abaixo dos trinta e oito por cento.

O motor primordial desse salto vertiginoso foi o crescimento acelerado dos parques eólicos e solares concentrados na região Nordeste. Os ventos constantes e alísios do litoral potiguar e cearense, aliados à irradiação solar privilegiada do semiárido, criaram um corredor energético de classe mundial. Pequenos produtores rurais que antes enfrentavam secas severas agora arrendam parcelas de terra para a instalação de aerogeradores, gerando renda estável e desenvolvimento para as comunidades sertanejas.

Paralelamente, o país avança nos estudos para a implantação de plantas industriais de hidrogênio verde nos portos marítimos do Ceará e de Pernambuco. Essa molécula limpa, obtida por meio da eletrólise da água utilizando energia eólica excedente, desponta como o combustível do futuro para a descarbonização da indústria pesada europeia e asiática.

Com abundância de recursos naturais e capacitação técnica avançada, o Brasil demonstra que sustentabilidade ambiental e pujança econômica não são antagônicas, mas pilares complementares de um modelo de prosperidade sustentável.`,
    quiz: [
      {
        id: 'en-1',
        question: 'Qual percentual aproximado de eletricidade gerada por fontes renováveis o Brasil atingiu?',
        options: ['Cerca de 38%', 'Mais de 90%', 'Apenas 50%', 'Menos de 20%'],
        correctIndex: 1,
        explanation: 'O texto destaca que mais de noventa por cento da eletricidade veio de fontes renováveis e limpas.'
      },
      {
        id: 'en-2',
        question: 'O que viabilizou o surgimento do corredor de energia eólica no Nordeste brasileiro?',
        options: [
          'Ventos constantes e alísios de altíssima qualidade no litoral e no sertão',
          'Subsídios massivos de bancos internacionais da Europa',
          'A escassez total de outras fontes hídricas',
          'O uso obrigatório de geradores a diesel'
        ],
        correctIndex: 0,
        explanation: 'O texto aponta os ventos constantes e alísios como motor fundamental da competitividade eólica na região.'
      }
    ]
  },
  {
    id: 'nabuco-emancipacao',
    title: 'A Abolição e o Resgate da Consciência Nacional',
    author: 'Joaquim Nabuco',
    category: 'discurso',
    description: 'Pronunciamento histórico em defesa do trabalho livre e da reconstrução moral da sociedade brasileira.',
    wordCount: 350,
    estimatedMinutes: 2,
    text: `A causa da abolição da escravatura não é uma contenda passageira de facções políticas nem uma reivindicação meramente financeira de senhores de engenho. É uma questão de honra, de dignidade e de existência para a nação brasileira perante o tribunal da civilização humana. Nenhuma sociedade pode prosperar moralmente quando erguida sobre os escombros da liberdade confiscada de seus semelhantes.

O cativeiro não avilta apenas o homem que sofre sob o chicote; ele corrompe, com veneno ainda mais letal, a alma do próprio senhor que empunha o açoite. Degrada o trabalho manual, fazendo com que o suor da fronte seja visto como castigo ignominioso em vez de virtude civilizatória. Gera o desprezo pela indústria, esteriliza as iniciativas criativas e habitua os cidadãos à indolência e ao parasitismo social.

Não basta apenas assinar um papel redigido com solenidade nos palácios imperiais declarando extinto o estatuto legal da escravidão. Precisamos emancipar a alma do povo, integrando o trabalhador à posse da terra, à instrução das letras e ao pleno exercício da cidadania ativa. Enquanto houver um único irmão deserdado dos direitos mais elementares da vida civil, a nossa independência será uma promessa inconclusa e a nossa pátria um edifício edificado sobre areia movediça.`,
    quiz: [
      {
        id: 'nab-1',
        question: 'Segundo Joaquim Nabuco, qual é o efeito corruptor da escravidão sobre quem domina?',
        options: [
          'Enriquece a moral dos proprietários',
          'Corrompe a alma do senhor e degrada o valor do trabalho manual',
          'Não tem qualquer efeito sobre os costumes sociais',
          'Aumenta o respeito às leis da república'
        ],
        correctIndex: 1,
        explanation: 'Nabuco argumenta que o cativeiro desmoraliza o trabalho e envenena o próprio senhor que oprime.'
      },
      {
        id: 'nab-2',
        question: 'O que Nabuco considerava essencial além da simples assinatura legal da abolição?',
        options: [
          'A exportação de produtos agrícolas aos portos vizinhos',
          'A emancipação moral com instrução das letras, terra e pleno exercício da cidadania',
          'A manutenção de impostos especiais para os libertos',
          'O fechamento do parlamento imperial'
        ],
        correctIndex: 1,
        explanation: 'Ele defendia integrar o liberto com instrução, posse da terra e plena cidadania participativa.'
      }
    ]
  },
  {
    id: 'neurociencia-sono-memoria',
    title: 'O Sono REM e a Consolidação da Memória',
    author: 'Neurociência e Cognição Contemporânea',
    category: 'artigo',
    description: 'Como o repouso profundo atua como um editor biológico que organiza o aprendizado obtido durante o dia.',
    wordCount: 360,
    estimatedMinutes: 2,
    text: `Muitas pessoas encaram as horas dedicadas ao sono como um intervalo passivo e improdutivo, uma exigência incômoda do corpo que rouba tempo das tarefas diárias. No entanto, pesquisas recentes em ressonância magnética funcional revelaram que, enquanto os músculos repousam, o cérebro noturno entra em uma frenética e sofisticada oficina de restauração cognitiva.

Durante o estágio de sono de ondas lentas e no sono REM (Rapid Eye Movement), os circuitos do hipocampo e do córtex cerebral sincronizam suas oscilações elétricas. O hipocampo, que atuou como uma memória temporária de rascunho absorvendo todas as leituras, conversas e experiências do dia, começa a descarregar essas informações para os bancos de armazenamento duradouro do neocórtex.

Esse processo de consolidação sináptica não é uma cópia indiscriminada de dados brutos. O cérebro opera como um editor de textos altamente criterioso: ele apaga detalhes secundários irrelevantes, fortalece as conexões neurais associadas a conceitos essenciais e busca ativamente correlações entre memórias antigas e novos conhecimentos recém-adquiridos. É por essa razão que um problema insolúvel à noite frequentemente amanhece resolvido com clareza cristalina.

Privar-se de noites restauradoras de sono prejudica diretamente a velocidade de processamento visual e a acuidade de leitura no dia seguinte. Aprender com rapidez e reter com precisão depende não só do esforço focado no treino, mas da sabedoria biológica de permitir que o sono cumpra seu papel de fixador supremo do saber.`,
    quiz: [
      {
        id: 'sono-1',
        question: 'Qual é o papel do hipocampo durante a consolidação noturna da memória?',
        options: [
          'Paralisar os batimentos cardíacos para economizar energia',
          'Atuar como memória de rascunho temporária e transferir informações essenciais ao neocórtex',
          'Impedir que qualquer sonho ocorra',
          'Apagar todas as memórias da infância'
        ],
        correctIndex: 1,
        explanation: 'O hipocampo atua como depósito provisório e descarrega os dados cruciais para o neocórtex à noite.'
      },
      {
        id: 'sono-2',
        question: 'De que maneira o cérebro noturno seleciona o que deve ser lembrado?',
        options: [
          'Copia indiscriminadamente todas as imagens sem critério',
          'Atua como um editor criterioso que apaga o irrelevante e fortalece conceitos fundamentais',
          'Guarda apenas informações associadas a números pares',
          'Elimina todo o conteúdo lido antes das vinte horas'
        ],
        correctIndex: 1,
        explanation: 'O cérebro poda ruídos supérfluos e preserva os núcleos conceituais significativos.'
      }
    ]
  },
  {
    id: 'aluisio-cortico',
    title: 'O Despertar Matinal no Cortiço',
    author: 'Aluísio Azevedo',
    category: 'conto',
    description: 'A impressionante sinfonia humana e o ritmo sonoro que acorda o cortiço de São Romão nas primeiras horas da aurora.',
    wordCount: 375,
    estimatedMinutes: 2,
    text: `Eram cinco horas da manhã e o cortiço acordava, abrindo, não os olhos, mas a sua infinidade de portas e janelas alinhadas. Um rumor surdo e indistinto começava a brotar das entranhas daquela colmeia humana: passos apressados de chinelas de pau batendo no chão de saibro, tosses roucas, portas de carvalho rangendo sobre gonzos enferrujados e o cantar sonoro dos primeiros galos da vizinhança.

Dali a pouco, em torno das bicas d'água da grande praça central, começava o formigar dos moradores. As lavadeiras disputavam cada torneira com bacias de flandres na cabeça e trouxas de roupa sob o braço; homens de camisa entreaberta lavavam os olhos sonolentos no jorro fresco, enquanto a fumaça azulada dos fogareiros de carvão começava a subir pelas frinchas das telhas, trazendo o cheiro revigorante do café recém-coado.

A vida borbulhava ali com uma intensidade telúrica e vibrante. Cada compartimento daquela estalagem coletiva parecia uma célula viva que se expandia ao primeiro toque dos raios solares. Os risos soltos das moças misturavam-se aos berros das crianças e às canções lusas entoadas pelos carpinteiros que afilavam suas ferramentas na bancada.

A prosa naturalista de Aluísio Azevedo constrói uma coreografia visual rica em estímulos sensoriais. Para o leitor treinado, trechos como esse representam um exercício magnífico de ampliação foveal: absorve-se a atmosfera exuberante do parágrafo em blocos harmônicos de significado, apreciando a cadência lírica da literatura nacional com prazer e agilidade.`,
    quiz: [
      {
        id: 'cort-1',
        question: 'Com qual elemento da natureza Aluísio Azevedo compara a coletividade do cortiço acordando?',
        options: ['Com uma manada bravia', 'Com uma colmeia humana fervilhante', 'Com um oceano agitado', 'Com uma floresta silenciosa'],
        correctIndex: 1,
        explanation: 'O autor utiliza expressamente a metáfora da "colmeia humana" para retratar o despertar dos moradores.'
      },
      {
        id: 'cort-2',
        question: 'Qual ponto de encontro central é descrito como palco principal das disputas matinais?',
        options: [
          'A sacada do solar da baronesa',
          'As bicas d água na grande praça central',
          'A capela do bairro',
          'A taverna do porto'
        ],
        correctIndex: 1,
        explanation: 'Os moradores e lavadeiras se aglomeravam em torno das bicas d água coletivas na praça.'
      }
    ]
  },
  {
    id: 'arqueologia-cidades-amazonia',
    title: 'Cidades Perdidas Reveladas na Amazônia',
    author: 'Agência Brasil / Arqueologia e Ciência',
    category: 'noticia',
    description: 'Varreduras aéreas com tecnologia LIDAR revelam densas civilizações pré-colombianas sob a copa das árvores.',
    wordCount: 350,
    estimatedMinutes: 2,
    text: `Pesquisadores e arqueólogos internacionais, trabalhando em cooperação com instituições brasileiras, realizaram uma das descobertas mais extraordinárias das últimas décadas no vale do Upano e na bacia amazônica. Utilizando sensores aéreos de tecnologia LIDAR — pulsos de luz laser disparados de aviões capazes de penetrar a espessa copa vegetal —, a equipe mapeou uma rede urbana monumental habitada há mais de dois mil anos.

A imagem computadorizada do solo revelou mais de seis mil plataformas retangulares de terraplanagem, sobre as quais assentavam-se residências familiares, centros cerimoniais e entrepostos comerciais. O que mais impressionou os arqueólogos foi o sistema viário integrado: estradas retilíneas, elevadas acima do nível das inundações e com até dez metros de largura, conectavam povoados dispersos por dezenas de quilômetros.

Essa revelação desmonta em definitivo o antigo mito eurocêntrico de que a Amazônia pré-colombiana era um vazio demográfico intocado, habitado exclusivamente por grupos nômades diminutos. Pelo contrário: sociedades complexas, com engenharia hidráulica refinada, terra preta fértil gerada por manejo consciente e sistemas agrícolas agroflorestais sustentáveis floresceram na região séculos antes da chegada dos navegadores ibéricos.

O achado reescreve a história das civilizações americanas e demonstra como o conhecimento técnico moderno permite enxergar através dos séculos, valorizando a sofisticação cultural ancestral e reforçando a urgência da salvaguarda contemporânea da floresta.`,
    quiz: [
      {
        id: 'arq-1',
        question: 'Qual tecnologia aérea permitiu aos arqueólogos enxergar as estruturas através da floresta?',
        options: [
          'Raios X de satélites militares',
          'Sensores LIDAR com pulsos de luz laser capazes de penetrar a copa vegetal',
          'Câmeras térmicas de drones civis',
          'Fotografias antigas tiradas por exploradores'
        ],
        correctIndex: 1,
        explanation: 'A tecnologia LIDAR dispara feixes de luz laser que atravessam as folhas e reconstroem o relevo do solo.'
      },
      {
        id: 'arq-2',
        question: 'Qual mito histórico antigo foi definitivamente refutado por essas descobertas?',
        options: [
          'O mito de que a Amazônia possuía rios caudalosos',
          'O mito de que a região era um deserto verde vazio e habitado apenas por pequenos grupos nômades',
          'O mito de que existiam animais ferozes na mata',
          'O mito de que chovia frequentemente no Equador'
        ],
        correctIndex: 1,
        explanation: 'A descoberta provou a existência de sociedades urbanas densas, organizadas e com sofisticada engenharia.'
      }
    ]
  },
  {
    id: 'santos-dumont-aviacao',
    title: 'O Voo do 14-Bis e a União dos Povos',
    author: 'Alberto Santos-Dumont',
    category: 'discurso',
    description: 'Memórias sobre a conquista do voo mecânico mais pesado que o ar e o ideal pacífico da aviação mundial.',
    wordCount: 340,
    estimatedMinutes: 2,
    text: `Naquela tarde luminosa de outubro de 1906, no campo de Bagatelle em Paris, diante de uma multidão de engenheiros céticos e espectadores curiosos, o 14-Bis correu sobre o gramado verdejante, ergueu suas asas de seda do chão por esforço próprio de seu motor e sustentou-se no ar livre por quase sessenta metros de trajeto desimpedido. O homem havia finalmente conquistado o espaço aéreo com um aparelho mais pesado que o ar.

A emoção que me invadiu naquele instante singular não foi de soberba pessoal nem de glória mundana passageira. Olhando do alto daquela gôndola frágil de bambu e alumínio para a terra que ficava para trás, enxerguei o planeta sem as fronteiras artificiais desenhadas pelas guerras e pela vaidade dos impérios.

Sempre concebi a máquina voadora como o mais sublime instrumento de fraternidade universal. Sonhei que as aeronaves aproximariam nações irmãs separadas por cordilheiras e oceanos intransponíveis, transportando remédios aos necessitados, acelerando a correspondência das mentes criativas e tornando as guerras impossíveis pela pura constatação de nossa vulnerabilidade compartilhada.

A ciência só cumpre seu sacerdócio quando se coloca a serviço do alívio e da elevação moral do gênero humano. Pilotar o pensamento com ousadia e retidão é um dever sagrado: devemos levantar voo acima dos preconceitos acanhados do presente para enxergar o horizonte largo da fraternidade que nos aguarda.`,
    quiz: [
      {
        id: 'sd-1',
        question: 'Onde ocorreu o histórico voo pioneiro do 14-Bis em 1906?',
        options: ['No Campo de Marte, em São Paulo', 'No campo de Bagatelle, em Paris', 'Nas praias de Lisboa', 'Em Kitty Hawk, na Carolina do Norte'],
        correctIndex: 1,
        explanation: 'O voo público oficial do 14-Bis perante a comissão do Aeroclube da França ocorreu em Bagatelle, Paris.'
      },
      {
        id: 'sd-2',
        question: 'Qual era o ideal ético fundamental que Santos-Dumont atribuía à invenção da aviação?',
        options: [
          'Fabricar armas de destruição em massa para defender impérios',
          'Servir como instrumento de fraternidade universal, unindo povos e tornando guerras obsoletas',
          'Monopolizar o comércio de ouro e pedras preciosas',
          'Competir em apostas financeiras nas capitais europeias'
        ],
        correctIndex: 1,
        explanation: 'Santos-Dumont concebeu a aviação como instrumento humanitário e pacífico de fraternidade universal.'
      }
    ]
  },
  {
    id: 'barreto-policarpo-quaresma',
    title: 'O Patriotismo Singular de Policarpo Quaresma',
    author: 'Lima Barreto',
    category: 'conto',
    description: 'A devoção quase quixotesca do Major Quaresma pelos livros de história e pelas raízes culturais autênticas do Brasil.',
    wordCount: 360,
    estimatedMinutes: 2,
    text: `Desde moço, o Major Policarpo Quaresma dedicou a totalidade de sua existência ao amor incondicional pela pátria. Em seu gabinete silencioso no subúrbio carioca, forrado de estantes de jacarandá do chão até o teto, repousavam milhares de compêndios raros de história colonial, tratados de botânica tupi, partituras de modinhas sertanejas e estudos sobre o folclore das províncias mais recônditas.

Quaresma não se contentava com o patriotismo de discursos vazios em banquetes oficiais. Queria aplicar a ciência nacional à prática diária. Aprendeu a tocar violão quando o instrumento era considerado vulgar pelos salões aristocráticos; redigiu requerimentos oficiais ao Congresso em idioma tupi-guarani, pleiteando que a língua indígena fosse elevada a idioma pátrio em substituição ao português colonizador.

Os vizinhos e colegas de repartição pública riam-se de suas manias, apelidando-o com malícia de visionário desequilibrado. No entanto, havia na figura magra e solene do major uma pureza de propósitos e uma ingenuidade comovente que desarmavam os corações mais empedernidos. Ele acreditava sinceramente nas virtudes da terra e na riqueza inesgotável da alma brasileira.

Lima Barreto entrelaça o riso à melancolia para expor o fosso trágico entre os sonhos generosos de um idealista e a mediocridade hipócrita das elites burocráticas. A leitura dessa obra exige velocidade de apreensão e sensibilidade emocional: ao destrinchar as frases com ritmo ágil, o leitor contempla a radiografia mais comovente de nossas contradições nacionais.`,
    quiz: [
      {
        id: 'pq-1',
        question: 'Qual medida linguística radical o Major Quaresma propôs ao Congresso Nacional?',
        options: [
          'Adotar o francês como língua oficial dos ministérios',
          'Elevar o idioma tupi-guarani a idioma pátrio do Brasil',
          'Abolir a gramática e o uso de pontuação',
          'Proibir a leitura de romances europeus'
        ],
        correctIndex: 1,
        explanation: 'Quaresma protocolou requerimento para que o tupi fosse consagrado como a verdadeira língua oficial da pátria.'
      },
      {
        id: 'pq-2',
        question: 'Como a sociedade e os colegas de repartição encaravam a dedicação fervorosa do Major?',
        options: [
          'Com aplausos unânimes e honrarias de estado',
          'Consideravam-no um visionário desequilibrado e zombavam de suas iniciativas',
          'Copiaram seus hábitos e também aprenderam tupi',
          'Elegeram-no presidente do parlamento'
        ],
        correctIndex: 1,
        explanation: 'A vizinhança e os burocratas viam Quaresma com incompreensão e zombaria maliciosa.'
      }
    ]
  },
  {
    id: 'artigo-atencao-hiperestimulo',
    title: 'A Recuperação do Foco na Era do Hiperestímulo',
    author: 'Psicologia e Neurociência da Atenção',
    category: 'artigo',
    description: 'Como a leitura de textos contínuos reconstrói os circuitos da atenção profunda fragilizados pelas telas digitais.',
    wordCount: 360,
    estimatedMinutes: 2,
    text: `Vivemos imersos no que os sociólogos e neurocientistas denominam de "economia da atenção". Aplicativos de redes sociais, notificações incessantes e vídeos curtos de poucos segundos são matematicamente desenhados por algoritmos preditivos para capturar os circuitos de dopamina do cérebro, recompensando a novidade constante e fragmentando a capacidade de foco sustentado.

O resultado dessa tempestade sensorial é uma mente cronicamente inquieta. Muitas pessoas que antes devoravam romances inteiros em um fim de semana hoje confessam incapacidade de atravessar três parágrafos consecutivos sem sentir a pulsão compulsiva de checar o telefone celular. Essa alternância frenética de estímulos induz a um estado de atenção superficial e difusa, onde nenhuma ideia tem tempo de maturar na memória de longo prazo.

A prática deliberada de leitura dinâmica funciona como uma verdadeira academia de reabilitação neural. Ao treinar os olhos para avançar em cadência firme e rítmica sobre blocos conceituais inteiros, desativamos o mecanismo de distração e reconquistamos o comando voluntário sobre o foco executivo.

Não se trata apenas de ler mais páginas em menos minutos. Trata-se de reaver a autonomia do pensamento crítico, a paciência para o raciocínio complexo e a serenidade mental que a enxurrada de notificações rouba diariamente de nós. O leitor focado é o senhor de seu tempo em um mundo que tenta expropriar a sua consciência a cada clique.`,
    quiz: [
      {
        id: 'at-1',
        question: 'Segundo o artigo, de que maneira as notificações e vídeos curtos afetam a cognição?',
        options: [
          'Aumentam a capacidade de memorização duradoura',
          'Exploram circuitos de dopamina, provocando dispersão crônica e atenção superficial',
          'Melhoram a acuidade da visão noturna',
          'Eliminam completamente o estresse do dia a dia'
        ],
        correctIndex: 1,
        explanation: 'O hiperestímulo ativa compulsivamente a dopamina, fragmentando o foco sustentado e a reflexão profunda.'
      },
      {
        id: 'at-2',
        question: 'Qual é o maior benefício da leitura com treino técnico segundo o autor?',
        options: [
          'Apenas folhear apostilas para passar em testes simples',
          'Reconquistar a autonomia do foco executivo e a capacidade para o raciocínio complexo',
          'Aprender a ler no escuro sem cansar os olhos',
          'Dispensar o uso de computadores e tecnologia'
        ],
        correctIndex: 1,
        explanation: 'A prática recupera o domínio do foco e a paciência reflexiva diante de um ambiente hiperfragmentado.'
      }
    ]
  },
  {
    id: 'james-webb-cosmos',
    title: 'O Telescópio James Webb e as Primeiras Galáxias',
    author: 'Astrofísica Contemporânea / Divulgação Científica',
    category: 'noticia',
    description: 'Imagens infravermelhas do espaço profundo revelam estruturas estelares que desafiam os modelos da criação cósmica.',
    wordCount: 355,
    estimatedMinutes: 2,
    text: `Posicionado a um milhão e meio de quilômetros da Terra no ponto de Lagrange L2, onde a gravidade do Sol e do nosso planeta se equilibra, o Telescópio Espacial James Webb abriu uma janela sem precedentes para os confins do universo primordial. Seus espelhos hexagonais banhados a ouro captam a tênue radiação infravermelha emitida por astros há mais de treze bilhões de anos.

Como a velocidade da luz é finita, olhar para o espaço profundo significa viajar no tempo arqueológico do cosmos. Para espanto dos astrofísicos do mundo inteiro, as primeiras imagens processadas revelaram galáxias imensas, brilhantes e ricamente estruturadas formadas apenas trezentos milhões de anos após o Big Bang — período no qual as teorias cosmológicas vigentes previam encontrar apenas nuvens informes de gás e estrelas primitivas diminutas.

Essas observações estão obrigando os teóricos a recalibrar os modelos matemáticos sobre a velocidade de agregação da matéria escura e o nascimento dos primeiros buracos negros supermassivos. A ciência não recua diante do imprevisto; pelo contrário, celebra quando os dados empíricos desafiam velhos dogmas acadêmicos.

O telescópio James Webb simboliza o ápice da engenharia humana cooperativa. Ele nos recorda que somos poeira de estrelas contemplando a imensidão do cosmos e buscando, por meio do esforço da inteligência e da curiosidade científica, desvendar a nossa própria origem cósmica.`,
    quiz: [
      {
        id: 'jw-1',
        question: 'Onde está localizado o Telescópio Espacial James Webb no espaço?',
        options: [
          'Em órbita baixa ao redor da Lua',
          'No ponto gravitacional de Lagrange L2, a 1,5 milhão de quilômetros da Terra',
          'Na superfície do planeta Marte',
          'Na Estação Espacial Internacional'
        ],
        correctIndex: 1,
        explanation: 'O telescópio orbita no Ponto de Lagrange L2, garantindo estabilidade térmica e gravitacional.'
      },
      {
        id: 'jw-2',
        question: 'Que grande surpresa científica as imagens do James Webb revelaram aos astrofísicos?',
        options: [
          'Que o universo tem apenas dez mil anos de idade',
          'Galáxias imensas e complexas já plenamente formadas pouco tempo após o Big Bang',
          'A ausência total de estrelas no universo primordial',
          'Que a luz viaja em velocidade infinita'
        ],
        correctIndex: 1,
        explanation: 'O Webb encontrou galáxias massivas muito mais cedo na história cósmica do que os modelos previam.'
      }
    ]
  },
  {
    id: 'machado-bras-cubas',
    title: 'O Delírio de Brás Cubas e a Ilusão do Tempo',
    author: 'Machado de Assis',
    category: 'conto',
    description: 'À beira da morte, o narrador machadiano viaja montado em um hipopótamo voador e contempla a marcha dos séculos.',
    wordCount: 360,
    estimatedMinutes: 2,
    text: `De súbito, a febre tomou conta de minhas têmporas e a cama do quarto desvaneceu-se no ar. Vi-me montado sobre o dorso largo de um hipopótamo colossal que batia asas membranosas rumo ao cimo das nuvens. Subimos até onde o ar não tem peso nem as estações têm nome. Ali deparei com uma figura de mulher gigantesca, sentada sobre um rochedo de gelo perpétuo: era a Natureza, ou a Pandemia universal, com olhos de esmeralda fria e semblante impassível.

Ela tomou-me pela mão e fez desfilar diante de meus olhos atônitos a cavalgada ininterrupta de todos os séculos da humanidade. Vi passarem os impérios da Pérsia, as legiões de Roma, as fogueiras da inquisição e as revoluções ensanguentadas. Homens que se massacravam por palmos de terra, que erguiam palácios sobre ossadas alheias e que celebravam vitórias efêmeras antes de tombarem no pó do esquecimento.

— Olha bem, disse-me a voz de bronze da deusa. Todos esses cortejos de glórias e tormentos não passam de um minuto na minha eternidade. Os homens nascem, devoram-se uns aos outros, inventam ilusões de grandeza e somem como bolhas na correnteza das águas. Onde está o sentido do teu mísero grão de areia?

O delírio de Brás Cubas é o ápice da prosa filosófica em língua portuguesa. O humor amargo e a lucidez cortante de Machado de Assis convidam o leitor a despir-se da arrogância e a enxergar a brevidade da vida com elegância, sabedoria e tolerância perante as fraquezas da condição humana.`,
    quiz: [
      {
        id: 'bc-1',
        question: 'Qual criatura insólita conduz Brás Cubas em seu delírio rumo às alturas celestes?',
        options: ['Uma águia dourada imperial', 'Um hipopótamo voador com asas membranosas', 'Um dragão de fogo', 'Um cavalo alado de mármore'],
        correctIndex: 1,
        explanation: 'Brás Cubas narra que viajou montado no dorso de um hipopótamo que alçou voo nas nuvens.'
      },
      {
        id: 'bc-2',
        question: 'Qual é a mensagem central transmitida pela personificação da Natureza diante dos séculos?',
        options: [
          'Que a humanidade já atingiu a perfeição absoluta',
          'A efemeridade das ambições humanas e a ilusão das glórias terrenas perante a vastidão do tempo',
          'Que os impérios durarão para sempre sem jamais cair',
          'A necessidade de acumular riquezas a qualquer custo'
        ],
        correctIndex: 1,
        explanation: 'A visão expõe a transitoriedade das ambições humanas, que somem rapidamente diante da eternidade.'
      }
    ]
  },
  {
    id: 'inconfidencia-liberdade',
    title: 'A Proclamação da Liberdade em Minas Gerais',
    author: 'Documento Histórico / Tiradentes',
    category: 'discurso',
    description: 'Os ideais republicanos da Inconfidência Mineira de 1789 e a recusa do jugo colonial absolutista.',
    wordCount: 345,
    estimatedMinutes: 2,
    text: `Na vila rica de Ouro Preto, em reuniões clandestinas realizadas à luz trêmula de velas no solar dos poetas e magistrados, homens esclarecidos ousaram pronunciar a palavra que a coroa portuguesa considerava o mais nefando dos crimes: liberdade. Diante da ameaça iminente da derrama — a cobrança compulsória e violenta de cem arrobas de ouro atrasado sobre os lares mineiros —, a revolta tornou-se um imperativo moral.

Joaquim José da Silva Xavier, o Tiradentes, não era senhor de lavras opulentas nem ocupava cargos de mando na corte. Alferes do regimento de cavalaria e prático na arte dentária, percorria as vilas e sertões com o fogo do ideal republicano na voz. Bradava que as riquezas minerais arrancadas do solo brasileiro serviam apenas para adornar os palácios de Lisboa, enquanto as famílias da colônia viviam em penúria e desamparo.

A divisa que os conspiradores estamparam em sua bandeira — "Libertas Quae Sera Tamen", liberdade ainda que tardia — ecoou além do século dezoito. Embora a traição de comparsas venais tenha frustrado o levante armado antes do primeiro disparo, a firmeza com que Tiradentes assumiu perante os algozes a responsabilidade integral pelo sonho revolucionário converteu o cadafalso em altar cívico.

A liberdade não é dádiva outorgada pela generosidade dos poderosos; é conquista forjada na coragem de sonhar antes do tempo e no compromisso inegociável com a justiça e a dignidade do próprio povo.`,
    quiz: [
      {
        id: 'tir-1',
        question: 'Qual cobrança tributária arbitrária da coroa portuguesa desencadeou a conspiração em Minas?',
        options: ['O dízimo do açúcar', 'A derrama sobre o ouro atrasado', 'O imposto sobre o café', 'A taxa sobre o sal importado'],
        correctIndex: 1,
        explanation: 'A cobrança coercitiva da derrama (ouro em atraso) foi o estopim da conspiração dos inconfidentes.'
      },
      {
        id: 'tir-2',
        question: 'Qual era o lema inscrito em latim na bandeira idealizada pelos inconfidentes mineiros?',
        options: ['Ordem e Progresso', 'Libertas Quae Sera Tamen (Liberdade ainda que tardia)', 'Veni, Vidi, Vici', 'Pro Pátria Semper'],
        correctIndex: 1,
        explanation: 'Os inconfidentes escolheram a frase de Virgílio "Libertas Quae Sera Tamen", que inspirou a bandeira de Minas.'
      }
    ]
  },
  {
    id: 'metacognicao-aprendizagem',
    title: 'A Arte da Metacognição e Aprender a Aprender',
    author: 'Ciências da Educação e Aprendizagem Acelerada',
    category: 'artigo',
    description: 'Como monitorar os próprios processos de pensamento transforma leitores passivos em mentes estratégicas e velozes.',
    wordCount: 350,
    estimatedMinutes: 2,
    text: `A diferença fundamental entre um leitor comum e um praticante de alta performance cognitiva não reside no número de horas debruçado sobre os livros, mas na qualidade de sua metacognição. O termo metacognição designa a extraordinária capacidade humana de "pensar sobre o próprio pensamento", isto é, monitorar, avaliar e regular estrategicamente os próprios processos mentais durante a execução de uma tarefa.

O estudante passivo lê como quem navega sem bússola: seus olhos deslizam pelas palavras de forma automática, e somente após virar cinco páginas percebe que nada assimilou. Ao contrário, o leitor dotado de consciência metacognitiva estabelece um objetivo claro antes mesmo de iniciar o texto. Ele pergunta a si mesmo: qual é a tese central deste autor? Quais são as evidências que sustentam este argumento?

Durante o percurso, ele calibra dinamicamente sua velocidade. Trechos puramente ilustrativos ou redundantes são escaneados em alta cadência visual; passagens com conceitos inéditos e densos recebem fixações mais focadas. Quando surge uma incongruência lógica, ele não recorre a regressões desordenadas, mas formula uma hipótese instantânea que é checada nos parágrafos seguintes.

Desenvolver a metacognição é o passo definitivo para a autonomia intelectual. Ao assumir o leme de sua própria percepção, o praticante elimina o desperdício de energia mental, retém o cerne do saber e transforma a leitura em uma ferramenta veloz e prazerosa de expansão pessoal.`,
    quiz: [
      {
        id: 'meta-1',
        question: 'O que significa o conceito de metacognição segundo a ciência da aprendizagem?',
        options: [
          'A capacidade de ler sem piscar os olhos',
          'A habilidade de monitorar, avaliar e regular estrategicamente o próprio pensamento durante uma tarefa',
          'O ato de memorizar dicionários inteiros de cabeça',
          'Um exercício de relaxamento muscular matinal'
        ],
        correctIndex: 1,
        explanation: 'Metacognição é pensar sobre o próprio pensar: monitorar e regular os próprios processos mentais.'
      },
      {
        id: 'meta-2',
        question: 'Qual é o comportamento típico de um leitor com consciência metacognitiva ativa?',
        options: [
          'Lê de forma sonolenta virando páginas sem saber o que leu',
          'Estabelece objetivos claros, calibra a velocidade conforme a densidade e avalia o que assimila',
          'Lê apenas a última frase de cada livro',
          'Nunca questiona os argumentos apresentados pelo autor'
        ],
        correctIndex: 1,
        explanation: 'Ele regula estrategicamente o ritmo e a absorção conceitual conforme o objetivo da leitura.'
      }
    ]
  },
  {
    id: 'baterias-sodio-sustentabilidade',
    title: 'Baterias de Íons de Sódio e a Transição Energética',
    author: 'Notícias de Inovação & Energia Sustentável',
    category: 'noticia',
    description: 'A nova fronteira do armazenamento renovável que dispensa lítio e cobalto, utilizando sal marinho abundante.',
    wordCount: 355,
    estimatedMinutes: 2,
    text: `A busca acelerada por alternativas ao lítio nas tecnologias de armazenamento energético alcançou um marco histórico com o avanço industrial das baterias de íons de sódio. Ao contrário dos sistemas convencionais que dependem de minerais de extração complexa, cara e geograficamente concentrada, o sódio pode ser obtido em abundância quase ilimitada a partir do sal marinho comum e de depósitos de carbonato distribuídos por todos os continentes.

Pesquisadores de laboratórios de ciência dos materiais conseguiram superar os desafios iniciais relacionados à menor densidade energética do sódio, desenvolvendo estruturas catódicas nanoporosas capazes de acomodar os íons maiores sem degradar a integridade estrutural das células durante ciclos acelerados de carga. Os protótipos mais modernos demonstram retenção de mais de oitenta por cento da capacidade original mesmo após três mil ciclos completos de recarga rápida.

Outra vantagem crucial do sistema de sódio reside na sua segurança térmica e resiliência a temperaturas extremas. Enquanto as baterias de lítio perdem rendimento severo no frio intenso e apresentam risco de superaquecimento em climas quentes, as novas células operam com estabilidade notável entre vinte graus negativos e sessenta graus positivos. Além disso, podem ser transportadas completamente descarregadas com voltagem zero, eliminando riscos de incêndio nas cadeias logísticas terrestres e marítimas.

A implantação dessas baterias em larga escala destina-se principalmente à estabilização de redes elétricas conectadas a usinas eólicas e solares, armazenando excedentes diurnos para liberação durante os picos noturnos de consumo urbano. A revolução do sódio comprova que a inteligência na seleção de elementos abundantes é o caminho definitivo para descarbonizar o planeta com justiça econômica e sustentabilidade genuína.`,
    quiz: [
      {
        id: 'sod-1',
        question: 'Qual é a principal matéria-prima abundante utilizada nas novas baterias em substituição ao lítio?',
        options: [
          'Mercúrio enriquecido',
          'O sódio, facilmente obtido do sal marinho comum e de carbonatos',
          'O chumbo automotivo pesado',
          'O carvão mineral antracito'
        ],
        correctIndex: 1,
        explanation: 'O texto destaca o sódio como alternativa abundante obtida do sal marinho e de carbonatos distribuídos pelo planeta.'
      },
      {
        id: 'sod-2',
        question: 'Qual é o destino prioritário das baterias de íons de sódio de grande porte?',
        options: [
          'Alimentar satélites espaciais militares',
          'Estabilizar redes elétricas conectadas a usinas eólicas e solares',
          'Substituir os fios de cobre residenciais',
          'Servir exclusivamente como pilhas de brinquedos infantis'
        ],
        correctIndex: 1,
        explanation: 'O artigo esclarece que a principal aplicação é estabilizar redes de energia limpa (solar e eólica).'
      }
    ]
  },
  {
    id: 'abismos-marinhos-bioluminescencia',
    title: 'Exploração nos Abismos Oceânicos e Seres Bioluminescentes',
    author: 'Oceanografia Contemporânea',
    category: 'noticia',
    description: 'Expedições em fossas submarinas revelam adaptações biológicas fascinantes a pressões esmagadoras e escuridão eterna.',
    wordCount: 360,
    estimatedMinutes: 2,
    text: `Abaixo de seis mil metros da superfície marinha abre-se a zona hadal, um dos ecossistemas mais extremos e menos conhecidos de todo o globo terrestre. Em fossas profundas como a das Marianas, a pressão hidrostática ultrapassa mil atmosferas, equivalente ao peso de um bloco maciço de concreto sobre a unha de um dedo. Nessa profundeza gélida, onde os raios solares nunca penetraram, a vida não apenas sobrevive, mas floresce com engenhocas biológicas que desafiam as leis clássicas da fisiologia animal.

Com o aprimoramento de veículos submersíveis não tripulados dotados de cascos de liga de titânio e câmeras ópticas de altíssima sensibilidade em quatro milésimos de segundo, cientistas registraram ecossistemas complexos associados a fontes hidrotermais. Em vez de depender da fotossíntese para produzir energia, bactérias quimiossintéticas oxidam compostos sulfurosos exalados das fendas da crosta, servindo de alicerce para cadeias alimentares que nutrem anêmonas transparentes e crustáceos gigantescos.

O fenômeno da bioluminescência atinge nos abismos o ápice da sofisticação evolutiva. Mais de noventa por cento dos organismos abissais são capazes de emitir clarões de luz fria através de reações enzimáticas entre a luciferina e o oxigênio celular. Alguns peixes utilizam apêndices luminosos na fronte como iscas hipnóticas para atrair presas desavisadas; outros emitem lampejos azuis e verdes para desorientar predadores ou comunicar rotas seguras aos semelhantes na treva impenetrável.

O estudo das moléculas que conferem estabilidade às membranas celulares dos seres hadais está abrindo novas fronteiras na medicina e na farmacologia. Enzimas capazes de operar sob estresse extremo de pressão oferecem pistas valiosas para a sintetização de fármacos mais estáveis e duradouros, demonstrando que os segredos mais profundos dos oceanos guardam chaves indispensáveis para o futuro da saúde na terra firme.`,
    quiz: [
      {
        id: 'abiss-1',
        question: 'O que substitui a fotossíntese como fonte primária de energia nos abismos oceânicos?',
        options: [
          'A energia solar refletida pela lua',
          'A quimiossíntese realizada por bactérias a partir de compostos sulfurosos das fendas submarinas',
          'A queima de algas secas submarinas',
          'O calor expelido pelas hélices dos submarinos'
        ],
        correctIndex: 1,
        explanation: 'Bactérias quimiossintéticas produzem energia oxidando compostos de enxofre em vez de luz solar.'
      },
      {
        id: 'abiss-2',
        question: 'Qual é o papel da luciferina mencionada no texto sobre organismos abissais?',
        options: [
          'Formar a carapaça de titânio dos crustáceos',
          'Participar da reação enzimática que gera bioluminescência (emissão de luz fria)',
          'Tornar a água do mar potável',
          'Aquecer a temperatura corporal dos peixes'
        ],
        correctIndex: 1,
        explanation: 'A luciferina reage com o oxigênio para produzir clarões luminosos de bioluminescência nos abismos.'
      }
    ]
  },
  {
    id: 'biologia-sintetica-enzimas',
    title: 'Enzimas Projetadas por IA e a Reciclagem de Plásticos',
    author: 'Biotecnologia & Meio Ambiente',
    category: 'noticia',
    description: 'Biólogos computacionais utilizam modelos neurais para sintetizar enzimas capazes de despolimerizar garrafas plásticas em minutos.',
    wordCount: 350,
    estimatedMinutes: 2,
    text: `A poluição causada por plásticos descartáveis representa um dos problemas ambientais mais persistentes da civilização industrial. As ligações químicas que estruturam o polietileno tereftalato, conhecido popularmente como PET, foram desenhadas para resistir à decomposição natural por séculos. Contudo, a convergência entre biologia sintética e algoritmos de aprendizado profundo de inteligência artificial inaugurou uma solução biológica revolucionária para essa crise global.

Pesquisadores alimentaram redes neurais avançadas com bilhões de combinações de sequências de aminoácidos e coordenadas tridimensionais de enzimas bacterianas naturais. Em poucos dias de processamento em supercomputadores, o modelo gerou modelos moleculares sob medida, criando uma variante artificial de hidrolase capaz de se ligar com afinidade milimétrica às moléculas plásticas em temperaturas operacionais moderadas.

Em ensaios de laboratório, a enzima reprogramada conseguiu despolimerizar garrafas plásticas descartadas e resíduos têxteis de poliéster em seus monômeros fundamentais em menos de vinte e quatro horas, atingindo noventa e sete por cento de conversão. Esses monômeros purificados podem ser imediatamente reintroduzidos na linha de produção para fabricar novos plásticos virgens de alta transparência, fechando de maneira perfeita o ciclo da economia circular.

Ao contrário da reciclagem mecânica tradicional, que degrada progressivamente a resistência do polímero a cada derretimento, a biorreciclagem enzimática restaura a pureza original do material infinitas vezes. Essa conquista representa a prova incontestável de que a tecnologia computacional de ponta, quando guiada pela sustentabilidade, é capaz de regenerar equilíbrios ecológicos e consertar cicatrizes materiais deixadas pelo consumo descuidado.`,
    quiz: [
      {
        id: 'enz-1',
        question: 'Qual vantagem a biorreciclagem enzimática oferece em comparação à reciclagem mecânica convencional?',
        options: [
          'Exige mais energia fóssil e produtos tóxicos',
          'Despolimeriza o plástico em monômeros puros sem degradar a qualidade do material, permitindo reciclagem infinita',
          'Transforma plástico exclusivamente em areia de construção',
          'Só funciona em temperaturas acima de mil graus Celsius'
        ],
        correctIndex: 1,
        explanation: 'O processo enzimático quebra o plástico em seus blocos puros sem perda de resistência química.'
      },
      {
        id: 'enz-2',
        question: 'Qual ferramenta computacional foi utilizada para projetar as novas enzimas sintéticas?',
        options: [
          'Planilhas simples de contabilidade escolar',
          'Algoritmos de aprendizado profundo e redes neurais de modelagem molecular',
          'Calculadoras manuais de mesa',
          'Sistemas de GPS por satélite'
        ],
        correctIndex: 1,
        explanation: 'Modelos de inteligência artificial de aprendizado profundo desenharam a conformação tridimensional das enzimas.'
      }
    ]
  },
  {
    id: 'jk-construcao-brasilia',
    title: 'A Interiorização e a Construção da Nova Capital',
    author: 'Juscelino Kubitschek / Discurso Histórico',
    category: 'discurso',
    description: 'O pronunciamento que lançou as bases da marcha para o interior e a fundação de Brasília em pleno Planalto Central.',
    wordCount: 365,
    estimatedMinutes: 2,
    text: `Povo brasileiro: ao assumir os destinos da nossa república, firmei o solene compromisso de não permitir que o país continuasse indefinidamente atrelado a um litoral estreito, de costas voltadas para a imensidão fecunda do seu próprio sertão. Desde os albores da independência, mentes clarividentes como José Bonifácio já vislumbravam no coração do Planalto Central o centro gravitacional necessário para articular a soberania e a unidade indivisível do Brasil.

Construir Brasília no prazo de mil dias não é mera obra de arquitetura e concreto armado, tampouco vaidade efêmera de um governo. É a redenção geopolítica de uma pátria continental que precisa ocupar o seu próprio solo, romper o isolamento de milhões de compatriotas e levar estradas, escolas, indústrias e esperança às terras que dormiam em silêncio à espera do trabalho criador.

Olho para o cerrado bravio onde poeira vermelha e máquinas operárias inauguram uma era de coragem e audácia. Ali se ergue a síntese viva da engenharia nacional, projetada pelo gênio de Lucio Costa e Niemeyer, mas erguida pelo suor generoso de milhares de candangos vindos de todos os recantos, do Nordeste vigoroso ao Sul perseverante. Naquela terra de pioneiros, não há filhos ilegítimos nem cidadãos de segunda classe: todos somos operários de uma mesma aspiração de grandeza.

Cinqüenta anos de progresso em cinco de governo não é lema propagandístico; é a medida exata da nossa urgência histórica. O Brasil tem pressa de ser grande, pressa de assegurar dignidade ao seu povo e pressa de mostrar ao mundo que a democracia é o mais potente instrumento de transformação social que a humanidade já concebeu. Que a nova capital seja o farol perpétuo da nossa liberdade e da nossa determinação inquebrantável de vencer o subdesenvolvimento.`,
    quiz: [
      {
        id: 'jk-1',
        question: 'Qual era o objetivo geopolítico central da transferência da capital para o interior do Brasil segundo JK?',
        options: [
          'Fugir de conflitos marítimos com nações vizinhas',
          'Integrar o território nacional, ocupando o sertão e rompendo a dependência exclusiva do litoral',
          'Construir a maior praia artificial da América do Sul',
          'Fechar o congresso nacional longe dos jornais'
        ],
        correctIndex: 1,
        explanation: 'JK enfatiza a interiorização como redenção geopolítica para integrar o país de costas para o litoral.'
      },
      {
        id: 'jk-2',
        question: 'Como eram chamados os milhares de trabalhadores pioneiros que ergueram Brasília no cerrado?',
        options: ['Bandeirantes', 'Candangos', 'Tropeiros', 'Inconfidentes'],
        correctIndex: 1,
        explanation: 'O discurso celebra expressamente os "candangos" que vieram de todos os estados construir a nova capital.'
      }
    ]
  },
  {
    id: 'sobral-pinto-direitos-humanos',
    title: 'A Defesa Inegociável da Dignidade Humana',
    author: 'Heráclito Sobral Pinto / Memória Jurídica',
    category: 'discurso',
    description: 'A histórica postura ética do lendário advogado brasileiro que defendeu perseguidos políticos invocando a lei e a moral.',
    wordCount: 355,
    estimatedMinutes: 2,
    text: `A advocacia não é profissão de covardes, tampouco balcão de conveniências onde se comercializam princípios ao sabor dos ventos da tirania política. Quem veste a toga tem o sagrado dever de colocar-se ao lado do desvalido, do proscrito e daquele a quem todos negam abrigo perante a prepotência dos governantes de turno. O verdadeiro sentido da ordem jurídica não se mede pela submissão dócil da sociedade aos caprichos do poder, mas pela firmeza inegociável com que as garantias do indivíduo são preservadas até perante o pior dos desafetos.

Quando fui chamado a assumir a defesa penal de presos políticos cujas ideologias colidiam frontalmente com as minhas convicções católicas e democráticas, não hesitei um só minuto. A minha fé religiosa e a minha consciência cívica ensinaram-me que o ser humano não perde a sua dignidade ontológica pelo fato de professar ideias divergentes ou cometer transgressões civis. O direito de defesa é patrimônio indisponível da espécie humana, anterior e superior a qualquer constituinte ou ditador provisório.

Diante de tribunais de exceção que pretendiam cercear a voz dos custodiados, invoquei com veemência a Declaração dos Direitos do Homem e as garantias processuais basilares. A força do direito reside na sua universalidade imparcial: se admitirmos que um único homem possa ser despojado do devido processo legal por conveniência estatal, estaremos admitindo que qualquer um de nós amanhã seja esmagado pela mesma máquina implacável.

Jovens que abraçam a causa da justiça: não temais a impopularidade do momento nem as vaias dos que confundem vingança com direito. A história não absolve os omissos. Permanecei de pé, mantende as mãos limpas e a palavra altiva em favor dos fracos, pois somente onde a lei é escudo para todos a sociedade é verdadeiramente livre.`,
    quiz: [
      {
        id: 'sob-1',
        question: 'Qual é o princípio ético fundamental sustentado por Sobral Pinto sobre o direito de defesa?',
        options: [
          'Deve ser concedido apenas aos aliados do governo vigente',
          'É patrimônio indisponível e universal da espécie humana, devido a qualquer réu independente de ideologia',
          'Deve ser cobrado em quantias milionárias de honorários',
          'Depende da aprovação unânime da imprensa popular'
        ],
        correctIndex: 1,
        explanation: 'Sobral Pinto sustentava que a dignidade e a defesa são garantias universais devidas a todos os seres humanos.'
      },
      {
        id: 'sob-2',
        question: 'Segundo o autor, qual é o perigo de admitir o desrespeito ao devido processo legal para um único indivíduo?',
        options: [
          'Aumentar o preço do papel forense',
          'Abrir precedente para que qualquer cidadão no futuro seja vítima da mesma máquina arbitrária',
          'Provocar o cancelamento de concursos públicos',
          'Diminuir o número de faculdades no país'
        ],
        correctIndex: 1,
        explanation: 'Ele alerta que quebrar a garantia jurídica para um réu ameaça a liberdade e integridade de todos os cidadãos.'
      }
    ]
  },
  {
    id: 'darcy-ribeiro-utopia-brasil',
    title: 'A Vocação Criadora do Povo Brasileiro',
    author: 'Darcy Ribeiro / Ensaio Magistral',
    category: 'discurso',
    description: 'A fundação da identidade nacional pela fusão de matrizes culturais e o compromisso inadiável com a escola pública.',
    wordCount: 360,
    estimatedMinutes: 2,
    text: `O Brasil é o palco da experiência humana mais extraordinária dos tempos modernos: o nascimento de uma nova civilização nos trópicos. Não somos meros herdeiros de um fragmento europeu transladado para a América do Sul, nem somos uma nação indígena congelada no passado, tampouco somos um enclave africano isolado. Somos a síntese viva e turbulenta da mistura dessas matrizes grandiosas, forjadas na dor e na resistência secular, criando um povo novo, dono de uma sensibilidade ímpar e de uma alegria criadora que nada conseguiu quebrar.

Essa identidade mestiça, longe de ser defeito biológico ou fraqueza moral como pretendiam os velhos preconceitos pseudocientíficos do século dezenove, é a nossa maior virtude cósmica. Nascemos sob o signo da tolerância, do abraço espontâneo e da inventividade popular. Somos os filhos da generosidade da terra e da coragem dos nossos antepassados que souberam tecer vida e poesia mesmo sob as piores agruras coloniais.

No entanto, essa magnífica promessa civilizatória continuará mutilada enquanto o Brasil virar as costas para a infância e permitir que o abismo da desigualdade educacional condene milhões de meninos e meninas à escuridão do analfabetismo funcional. Se os governantes não construírem escolas de tempo integral, laicas e equipadas para acolher os filhos do povo trabalhador com comida sadia, livros abundantes e formação cultural sólida, eles terão que construir cadeias de concreto amanhã.

A crise da educação no Brasil não é uma fatalidade acidental; é um projeto político deliberado das elites retrógradas para preservar privilégios arcaicos. Mas eu acredito na força indomável do nosso povo. Temos tudo para construir aqui a Roma dos trópicos: uma sociedade justa, alegre, letrada e solidária. Fracassei em quase todas as minhas lutas institucionais, mas prefiro mil vezes ser derrotado ao lado dos que sonham alto do que vencer no banquete medíocre dos conformados.`,
    quiz: [
      {
        id: 'drc-1',
        question: 'Como Darcy Ribeiro define a essência identitária do povo brasileiro?',
        options: [
          'Uma colônia estrangeira dependente de modelos nórdicos',
          'Uma nova civilização nos trópicos, síntese viva e criadora da fusão de matrizes indígenas, africanas e europeias',
          'Um povo sem cultura própria ou memória afetiva',
          'Uma sociedade dividida sem nenhuma esperança de integração'
        ],
        correctIndex: 1,
        explanation: 'Darcy Ribeiro concebe o Brasil como um "povo novo", síntese fecunda e inédita das três grandes matrizes.'
      },
      {
        id: 'drc-2',
        question: 'Segundo o autor, qual é a única medida capaz de impedir a expansão das prisões e da violência no futuro?',
        options: [
          'Comprar mais viaturas policiais blindadas',
          'Construir escolas públicas integrais de qualidade com alimentação, cultura e livros abundantes',
          'Importar professores de outros países',
          'Proibir a leitura de romances literários'
        ],
        correctIndex: 1,
        explanation: 'Ele adverte que se não construirmos escolas integrais de excelência para o povo, teremos que erguer prisões.'
      }
    ]
  },
  {
    id: 'clarice-descoberta-mundo',
    title: 'A Descoberta do Mundo e a Percepção Sensível',
    author: 'Clarice Lispector',
    category: 'conto',
    description: 'A sutileza sensorial de Clarice sobre os detalhes cotidianos que despertam o olhar atento e a epifania do instante.',
    wordCount: 360,
    estimatedMinutes: 2,
    text: `Viver não é apenas respirar de maneira automática enquanto os compromissos nos arrastam pelas calçadas cinzentas da cidade. De repente, em meio à poeira da tarde, uma fruta que se parte sobre o mármore da feira, o bater de asas de um pássaro solitário no parapeito da janela ou o olhar silencioso de uma criança que descobre a sua própria sombra no chão são suficientes para rasgar a névoa do hábito. É a epifania: o instante no qual o mundo deixa de ser um ruído de fundo e explode diante de nós com uma nitidez luminosa quase insuportável.

Lembro-me de quando vi pela primeira vez o mar aberto em Recife. Eu era uma menina franzina com as mãos mergulhadas nos bolsos do vestido de chita. A imensidão verde-escura movia-se com a lentidão dos animais lendários, quebrando espumas alvas sobre os arrecifes de pedra. Naquele segundo eterno, compreendi que as palavras impressas nos livros escolares eram cascas frágeis tentando capturar um mistério que nos transborda por todos os lados.

Para ler a existência com profundidade verdadeira, precisamos aprender a desaprender as certezas apressadas. O leitor desatento corre sobre as frases querendo apenas saber o final da anedota, como quem engole um manjar fino sem sentir o tempero e a doçura na língua. Mas aquele que sabe contemplar detém-se na respiração secreta de cada vírgula, na escolha deliberada de cada adjetivo e no espaço silencioso que dorme entre uma palavra e outra.

A verdadeira leitura é um ato de coragem e amor desarmado. É aceitar que um autor desconhecido nos revele recantos da nossa própria alma que nós mesmos temíamos examinar à luz do meio-dia. Não leia para acumular títulos de falsa erudição; leia para alargar as fronteiras do seu peito e permitir que o assombro da beleza viva continue a cantar dentro de você.`,
    quiz: [
      {
        id: 'cl-1',
        question: 'O que representa o conceito clariceano de "epifania" abordado no texto?',
        options: [
          'Uma festa comemorativa de réveillon à beira-mar',
          'O instante súbito de revelação sensorial no qual o mundo comum revela sua nitidez e mistério profundo',
          'Um cansaço físico causado por excesso de caminhada',
          'Uma fórmula química usada na conservação de frutas'
        ],
        correctIndex: 1,
        explanation: 'A epifania em Clarice é o momento de iluminação e choque sensível que rasga o automatismo cotidiano.'
      },
      {
        id: 'cl-2',
        question: 'Segundo Clarice Lispector, qual é o erro do leitor apressado e desatento?',
        options: [
          'Comprar livros usados em sebos de rua',
          'Correr sobre as frases querendo apenas o desfecho da anedota, sem saborear o ritmo e a respiração das palavras',
          'Ler usando óculos de grau desajustados',
          'Anotar passagens a lápis nas margens das folhas'
        ],
        correctIndex: 1,
        explanation: 'O leitor voraz e superficial apenas engole o final sem degustar a sonoridade e sutileza poética do texto.'
      }
    ]
  },
  {
    id: 'guimaraes-terceira-margem',
    title: 'A Terceira Margem do Rio',
    author: 'João Guimarães Rosa',
    category: 'conto',
    description: 'A célebre parábola sobre o pai que encomendou uma canoa para viver no meio das águas, sem nunca aportar.',
    wordCount: 375,
    estimatedMinutes: 2,
    text: `Nosso pai era homem cumpridor, ordeiro, positivo, e sido assim desde mocinho e menino, pelo que testemunharam as diversas pessoas de senso. De repente, sem descontentamento da família nem desavença com os vizinhos, mandou fabricar uma canoa especial de vinhático, madeira forte que não apodrece na água nem racha ao sol quente. A canoa era feita sob medida, estreita e leve, com espaço exato para abrigar um só remador e uma manta de lã batida.

No dia em que a embarcação ficou pronta no barranco do rio grande, nosso pai não disse adeus a ninguém. Beijou nossa mãe na fronte com uma solenidade muda, colocou o chapéu de palha, empurrou a canoa na correnteza mansa e remou para o meio das águas. Não foi para a margem de lá, onde pastavam os cavalos do compadre, nem retornou para a margem de cá, onde ficava a nossa casa de pau-a-pique. Permaneceu ali, boiando na linha invisível do centro, entre as duas margens, onde a correnteza é mais funda e os ventos cantam sozinhos.

Os anos passaram com lentidão de nuvem. Minha mãe vestiu luto no silêncio da cozinha; minha irmã casou-se e mudou-se para a vila; meu irmão partiu para tentar fortuna no garimpo. Só eu fiquei ali na margem, deixando na fenda da pedra um pedaço de rapadura, uma cuia de farinha e peixe assado na brasa. Ele vinha à noite, recolhia a comida na sombra sem pronunciar sílaba alguma e tornava a deslizar no dorso líquido do rio.

A canoa de nosso pai é o símbolo eterno da vocação humana de buscar o inapreensível. Ele não pertencia mais às regras estreitas da terra firme, mas também não se afogava na profundeza do leito. Ele habitava a terceira margem: aquela que não se pisa com pés de carne, mas que se enxerga com a coragem da meditação profunda e da fidelidade ao próprio destino solitário.`,
    quiz: [
      {
        id: 'gr-1',
        question: 'Que atitude inusitada o pai toma após encomendar a canoa de vinhático?',
        options: [
          'Vende a fazenda da família e muda-se para o Rio de Janeiro',
          'Entra na canoa e passa a viver flutuando no meio do rio, sem jamais aportar em nenhuma das duas margens',
          'Participa de regatas esportivas profissionais',
          'Usa a canoa para contrabandear diamantes na fronteira'
        ],
        correctIndex: 1,
        explanation: 'Ele escolhe habitar o meio do rio em isolamento meditativo perene, recusando as margens convencionais.'
      },
      {
        id: 'gr-2',
        question: 'O que representa filosoficamente a "terceira margem" na narrativa de Guimarães Rosa?',
        options: [
          'Uma ilha de areia comum no meio de uma represa hidrelétrica',
          'Um espaço metafórico além das margens físicas, representando a busca espiritual e a transcendência humana',
          'A margem esquerda de um afluente pantaneiro',
          'Um ponto turístico comercial aberto a visitantes'
        ],
        correctIndex: 1,
        explanation: 'A terceira margem é uma metáfora da existência transcendente, do silêncio e da fidelidade interior.'
      }
    ]
  },
  {
    id: 'kahneman-dois-sistemas',
    title: 'Rápido e Devagar: Os Dois Modos da Mente na Leitura',
    author: 'Daniel Kahneman / Psicologia Cognitiva',
    category: 'artigo',
    description: 'Como o Sistema 1 intuitivo e o Sistema 2 reflexivo interagem no reconhecimento visual e na interpretação veloz de textos.',
    wordCount: 360,
    estimatedMinutes: 2,
    text: `As investigações pioneiras de Daniel Kahneman e Amos Tversky sobre a arquitetura do pensamento humano revelaram que nossa mente opera através da interação contínua entre dois modos cognitivos distintos: o Sistema Um e o Sistema Dois. Compreender o funcionamento dessa dualidade é a chave mestra para transformar o treinamento de leitura dinâmica em uma competência sólida, veloz e duradoura.

O Sistema Um é rápido, automático, intuitivo e consome quase nenhuma energia metabólica. É ele quem reconhece instantaneamente o rosto de um amigo na multidão, calcula mentalmente que dois mais dois são quatro ou desvia de um obstáculo na calçada sem precisar de deliberação consciente. Já o Sistema Dois é lento, analítico, reflexivo e altamente custoso em termos de esforço atencional. É ativado quando precisamos preencher um formulário tributário complexo, estacionar um veículo em vaga estreita ou analisar um silogismo filosófico intrincado.

Na leitura convencional infantilizada, o leitor sobrecarrega desnecessariamente o Sistema Dois com tarefas que deveriam ser puramente automáticas: pronunciar sílaba por sílaba e verificar manualmente o contorno de cada letra. O resultado é a fadiga precoce e a lentidão exasperante. O treinamento avançado ensina o cérebro a delegar a decodificação visual e o reconhecimento de vocábulos ao Sistema Um, que processa grupos inteiros de termos em frações imperceptíveis de segundo.

Ao desonerar o Sistema Dois da mecânica visual bruta, liberamos sua potência analítica máxima para o que realmente importa: a compreensão crítica, a avaliação das premissas lógicas do autor e a síntese criativa do conhecimento. Ler rápido com alto nível de retenção não é mágica nem ilusão superficial; é a cooperação harmônica e perfeitamente calibrada entre o automatismo veloz dos olhos e a lucidez do julgamento reflexivo.`,
    quiz: [
      {
        id: 'kah-1',
        question: 'Segundo Daniel Kahneman, quais são as características do Sistema 1 de pensamento?',
        options: [
          'Lento, cansativo e dependente de cálculos matemáticos escritos',
          'Rápido, automático, intuitivo e com baixo consumo de esforço consciente',
          'Exclusivamente voltado para o aprendizado de línguas estrangeiras mortas',
          'Um sistema presente apenas em crianças pequenas'
        ],
        correctIndex: 1,
        explanation: 'O Sistema 1 opera de forma automática e veloz, reconhecendo padrões sem esforço deliberado.'
      },
      {
        id: 'kah-2',
        question: 'Como o treinamento de leitura dinâmica otimiza a cooperação entre os dois sistemas mentais?',
        options: [
          'Desliga totalmente o Sistema 2 para evitar o raciocínio crítico',
          'Delega a decodificação visual e padrões de palavras ao Sistema 1 ágil, poupando o Sistema 2 para análise e síntese',
          'Obriga o leitor a ler apenas livros ilustrados',
          'Impede que os olhos se movimentem da esquerda para a direita'
        ],
        correctIndex: 1,
        explanation: 'A automação visual pelo Sistema 1 poupa energia para que o Sistema 2 se concentre na absorção conceitual profunda.'
      }
    ]
  },
  {
    id: 'ebbinghaus-curva-esquecimento',
    title: 'A Curva do Esquecimento e o Treino Espaçado',
    author: 'Hermann Ebbinghaus / Ciência da Memória',
    category: 'artigo',
    description: 'Como a repetição intervalada combate o declínio natural da retenção e fixa habilidades motoras oculares por toda a vida.',
    wordCount: 355,
    estimatedMinutes: 2,
    text: `Em finais do século dezenove, o psicólogo alemão Hermann Ebbinghaus realizou experimentos rigorosos sobre a durabilidade da memória humana, traçando pela primeira vez a matemática do esquecimento natural. Seus dados revelaram uma verdade implacável: sem reforço intencional, nossa mente descarta mais de cinqüenta por cento das informações recém-adquiridas nas primeiras vinte e quatro horas após o contato inicial, estabilizando-se em um resíduo modesto de vinte por cento ao fim de um mês.

Esse mecanismo de descarte não é defeito da máquina biológica, mas uma estratégia evolutiva de sobrevivência. O cérebro precisa desobstruir suas sinapses de detalhes efêmeros para não colapsar sob o peso de dados secundários. No entanto, quando desejamos dominar uma habilidade psicomotora refinada — como a expansão do campo visual na tabela de Schulte ou a aceleração rítmica do metrônomo —, a única maneira de sinalizar ao hipocampo que aquele aprendizado é vital reside na repetição espaçada.

Cada vez que revisitamos uma tarefa no momento exato em que a curva do esquecimento começa a declinar, o cérebro reconstrói a trilha neural com diâmetro sináptico mais largo e mielinização mais densa. A curva de retenção torna-se progressivamente mais plana e suave. Treinar quinze minutos diários ao longo de duas semanas consecutivas consolida uma velocidade de leitura infinitamente superior a uma maratona extenuante de seis horas no fim de semana.

É exatamente por isso que a jornada diária do Leitox estrutura pequenos desafios regulares a cada vinte e quatro horas. Manter a sequência ininterrupta não é apenas um jogo para conquistar chamas e medalhas virtuais; é uma aplicação prática e cientificamente validada da neurociência da memória para garantir que o seu ganho de cinqüenta por cento em velocidade seja uma conquista definitiva para a sua vida inteira.`,
    quiz: [
      {
        id: 'ebb-1',
        question: 'O que demonstrou a célebre curva do esquecimento descoberta por Hermann Ebbinghaus?',
        options: [
          'Que a memória humana é permanente e nunca descarta dados',
          'Que sem reforço intencional perdemos mais da metade das informações novas nas primeiras 24 horas',
          'Que o esquecimento só ocorre durante a velhice',
          'Que a memória visual funciona melhor sem piscar os olhos'
        ],
        correctIndex: 1,
        explanation: 'Ebbinghaus provou que a taxa de esquecimento é acentuada no primeiro dia se não houver revisão espaçada.'
      },
      {
        id: 'ebb-2',
        question: 'Por que o treino diário de 15 minutos é muito mais eficaz do que estudar horas acumuladas em um só dia?',
        options: [
          'Porque queima mais calorias corporais',
          'Porque a repetição espaçada no momento do declínio sináptico consolida trilhas neurais duradouras',
          'Porque economiza a luz elétrica da residência',
          'Porque evita o uso de celulares e telas digitais'
        ],
        correctIndex: 1,
        explanation: 'A reativação diária intervalada aplaina a curva do esquecimento, tornando o aprendizado permanente.'
      }
    ]
  }
,
  {
    id: 'jwst-cosmologia',
    title: "O Telescópio James Webb e o Alvorecer Cósmico",
    author: "Astrofísica Contemporânea",
    category: 'noticia',
    description: "Imagens infravermelhas revelam as primeiras galáxias formadas poucas centenas de milhões de anos após o Big Bang.",
    wordCount: 170,
    estimatedMinutes: 1,
    difficultyLevel: 4,
    difficultyScore: 90.1,
    text: "A operação contínua do Telescópio Espacial James Webb abriu uma janela sem precedentes para os primeiros instantes do cosmos. Posicionado no ponto de Lagrange L2, a um milhão e meio de quilômetros da Terra, o observatório utiliza espelhos de berílio banhados a ouro e sensores criogênicos capazes de detectar fótons infravermelhos emitidos há mais de treze bilhões de anos.\n\nEsses registros mostram que as galáxias primordiais cresceram muito mais depressa e organizaram-se com maior densidade estelar do que previam os modelos astronômicos convencionais. Buracos negros supermassivos já se encontravam ativos quando o universo tinha apenas quinhentos milhões de anos, desafiando as teorias clássicas sobre a taxa de acréscimo de matéria.\n\nAlém do estudo das profundezas temporais, o telescópio analisa as atmosferas de exoplanetas em zonas habitáveis, identificando assinaturas de vapor de água, metano e dióxido de carbono. A leitura dessas descobertas exige rapidez de raciocínio para correlacionar distâncias astronômicas e conceitos de relatividade. A percepção visual focada permite apreender esse vasto panorama de dados sem a lentidão da hesitação interior.",
    quiz: [
          {
                "id": "jwst-1",
                "question": "Onde está situado o Telescópio Espacial James Webb?",
                "options": [
                      "Na órbita baixa da Terra ao lado da Estação Espacial Internacional",
                      "No ponto de Lagrange L2, a 1,5 milhão de quilômetros da Terra",
                      "Na superfície da Lua para escapar da atmosfera",
                      "Em órbita geoestacionária sobre o oceano Pacífico"
                ],
                "correctIndex": 1,
                "explanation": "O telescópio opera no ponto de Lagrange L2 para manter estabilidade gravitacional e térmica."
          },
          {
                "id": "jwst-2",
                "question": "O que surpreendeu os astrônomos nas galáxias primordiais observadas pelo telescópio?",
                "options": [
                      "Elas eram todas menores que asteroides comuns",
                      "Eram constituídas inteiramente de matéria escura pura",
                      "Cresceram muito mais depressa e já abrigavam buracos negros supermassivos no início do universo",
                      "Não emitiam qualquer tipo de radiação eletromagnética"
                ],
                "correctIndex": 2,
                "explanation": "Os dados mostraram que galáxias densas e buracos negros se formaram muito mais cedo do que previam os modelos."
          }
    ]
  },
  {
    id: 'transicao-solar-flutuante',
    title: "Usinas Solares Flutuantes nos Reservatórios Brasileiros",
    author: "Engenharia & Sustentabilidade",
    category: 'noticia',
    description: "A instalação de painéis fotovoltaicos sobre represas hidrelétricas otimiza a geração de eletricidade e reduz a evaporação das águas.",
    wordCount: 160,
    estimatedMinutes: 1,
    difficultyLevel: 4,
    difficultyScore: 89.7,
    text: "A transição energética nacional encontrou uma simbiose técnica promissora na instalação de usinas solares flutuantes sobre os lagos das grandes hidrelétricas. Ao ocupar espelhos d'água de reservatórios já interligados à rede de transmissão, o país reduz a necessidade de desapropriação de terras férteis e aproveita as linhas de alta tensão existentes.\n\nOs módulos solares sobre a água beneficiam-se de um arrefecimento natural contínuo, que diminui o aquecimento dos circuitos e eleva a eficiência das células fotovoltaicas em até dez por cento na comparação com instalações terrestres. Por sua vez, a cobertura parcial da superfície atenua a incidência direta do sol, contendo a evaporação hídrica em períodos de estiagem prolongada.\n\nEssa complementaridade hídrico-solar permite preservar os níveis dos reservatórios para os horários de pico noturno, transformando as represas em acumuladores virtuais de energia limpa. Para o leitor focado, a assimilação de dados sobre capacidade instalada e rendimento elétrico torna-se fluida e intuitiva quando praticada por meio da fixação em blocos conceituais.",
    quiz: [
          {
                "id": "tsf-1",
                "question": "Qual é a principal vantagem térmica dos painéis solares instalados sobre a água?",
                "options": [
                      "O calor da água derrete a poeira sobre as placas",
                      "O arrefecimento natural da lâmina d’água reduz o aquecimento dos circuitos e eleva o rendimento",
                      "A água atua como espelho amplificador que queima as impurezas",
                      "Elimina a necessidade de fios e cabos de conexão"
                ],
                "correctIndex": 1,
                "explanation": "O resfriamento natural melhora a eficiência dos semicondutores em comparação com o solo árido."
          },
          {
                "id": "tsf-2",
                "question": "Como a usina flutuante beneficia o reservatório da hidrelétrica durante a estiagem?",
                "options": [
                      "Bombardeia nuvens artificiais com prata iodada",
                      "Sombra a água reduzindo a evaporação e retendo volume para o horário de pico",
                      "Substitui totalmente as turbinas de água por motores eólicos",
                      "Congela a superfície do lago impedindo o escoamento"
                ],
                "correctIndex": 1,
                "explanation": "A sombra dos painéis reduz a evaporação e permite guardar água para o horário de pico da noite."
          }
    ]
  },
  {
    id: 'chips-neuromorficos',
    title: "A Revolução dos Circuitos Neuromórficos na Computação",
    author: "Tecnologia da Informação",
    category: 'noticia',
    description: "Processadores inspirados na arquitetura biológica dos neurônios reduzem o consumo de energia em tarefas de inteligência artificial.",
    wordCount: 156,
    estimatedMinutes: 1,
    difficultyLevel: 5,
    difficultyScore: 95.4,
    text: "A computação convencional baseada na arquitetura de von Neumann atinge seus limites físicos ao lidar com modelos colossais de aprendizado profundo. A separação entre o processador central e a memória de trabalho gera o chamado gargalo de transferência, exigindo gigantescas quantidades de energia elétrica para movimentar dados continuamente.\n\nPara romper esse impasse, pesquisadores desenvolveram os processadores neuromórficos, cujos circuitos de silício imitam a organização em rede dos neurônios e das sinapses cerebrais. Nesses dispositivos, memória e processamento fundem-se no mesmo ponto físico, e a comunicação se dá por meio de pulsos elétricos esparsos, acionados somente quando há mudança de estado.\n\nEssa abordagem biometrizada consome uma fração mínima da energia habitual, viabilizando o uso de inteligência artificial avançada em celulares, sensores agrícolas e equipamentos médicos remotos sem sobreaquecimento. Ler com velocidade sobre paradigmas tecnológicos complexos fortalece a agilidade mental e estimula o leitor a capturar o núcleo lógico do argumento sem se perder em termos técnicos periféricos.",
    quiz: [
          {
                "id": "cn-1",
                "question": "O que caracteriza o gargalo da arquitetura de computação convencional de von Neumann?",
                "options": [
                      "A impossibilidade de fabricar semicondutores em silício",
                      "A separação física entre o processador e a memória, que exige alto consumo para transportar dados",
                      "A falta de eletricidade nas capitais mundiais",
                      "O excesso de pulsos biológicos nos circuitos"
                ],
                "correctIndex": 1,
                "explanation": "O transporte contínuo de dados entre CPU e RAM consome energia e limita a velocidade."
          },
          {
                "id": "cn-2",
                "question": "Como os processadores neuromórficos resolvem esse gargalo?",
                "options": [
                      "Unem memória e processamento em circuitos inspirados em neurônios e sinapses",
                      "Aumentam a voltagem para dez mil volts por chip",
                      "Eliminam os sensores de temperatura das máquinas",
                      "Operam exclusivamente com cartões perfurados"
                ],
                "correctIndex": 0,
                "explanation": "Eles integram processamento e armazenamento no mesmo ponto, operando por disparos de pulsos como o cérebro."
          }
    ]
  },
  {
    id: 'aquifero-guarani',
    title: "A Salvaguarda das Águas Profundas do Aquífero Guarani",
    author: "Geociências & Meio Ambiente",
    category: 'noticia',
    description: "Um dos maiores mananciais subterrâneos de água doce do planeta exige vigilância rigorosa contra a contaminação por agrotóxicos e esgoto.",
    wordCount: 167,
    estimatedMinutes: 1,
    difficultyLevel: 4,
    difficultyScore: 87.9,
    text: "Estendendo-se por mais de um milhão de quilômetros quadrados sob os solos do Brasil, Argentina, Paraguai e Uruguai, o Aquífero Guarani representa uma das maiores reservas de água doce transfronteiriças da Terra. Seus estratos sedimentares de arenito, acumulados durante milhões de anos na Bacia do Paraná, guardam cerca de trinta mil quilômetros cúbicos de água límpida e potável.\n\nNas áreas de afloramento — faixas em que a formação rochosa atinge a superfície e recebe a infiltração direta das chuvas —, a vulnerabilidade a pesticidas e efluentes urbanos é elevada. Se um contaminante químico alcançar as camadas de recarga, o processo natural de filtragem pode levar séculos para purificar o aquífero, comprometendo o abastecimento futuro de dezenas de milhões de cidadãos.\n\nA gestão integrada entre os quatro países inclui monitoramento piezométrico por satélite e regras rígidas de perfuração de poços profundos. A leitura dinâmica de textos científicos sobre hidrologia exercita a captação rápida de relações causais, preparando o cérebro para sintetizar diagnósticos ecológicos com absoluta clareza de julgamento.",
    quiz: [
          {
                "id": "ag-1",
                "question": "Quais países compartilham as reservas do Aquífero Guarani?",
                "options": [
                      "Brasil, Colômbia, Peru e Venezuela",
                      "Brasil, Argentina, Paraguai e Uruguai",
                      "Chile, Bolívia, Equador e Guiana",
                      "México, Panamá, Costa Rica e Brasil"
                ],
                "correctIndex": 1,
                "explanation": "O Aquífero Guarani estende-se pelos quatro países do Cone Sul da América do Sul."
          },
          {
                "id": "ag-2",
                "question": "Por que as áreas de afloramento do aquífero demandam proteção especial?",
                "options": [
                      "Porque são áreas de montanhas íngremes inacessíveis",
                      "Porque recebem a recarga direta das chuvas e contaminantes podem atingir a reserva subterrânea",
                      "Porque a água ali ferve espontaneamente devido ao vulcanismo",
                      "Porque a pesca industrial esgota as espécies marinhas"
                ],
                "correctIndex": 1,
                "explanation": "A água da chuva infiltra-se ali diretamente, tornando o lençol vulnerável à contaminação química."
          }
    ]
  },
  {
    id: 'nanomedicina-regenerativa',
    title: "Avanços da Nanomedicina e Terapias Gênicas no SUS",
    author: "Inovação em Saúde Pública",
    category: 'noticia',
    description: "Nanocarreadores lipídicos e edição gênica são incorporados em centros de excelência no Brasil para o combate a enfermidades raras.",
    wordCount: 145,
    estimatedMinutes: 1,
    difficultyLevel: 5,
    difficultyScore: 104.8,
    text: "A incorporação de terapias de precisão no sistema público de saúde brasileiro marca uma transição crucial no combate a distúrbios genéticos e neoplasias complexas. Utilizando nanopartículas lipídicas que funcionam como veículos microscópicos direcionados, os tratamentos entregam moléculas de RNA diretamente no interior das células doentes, poupando os tecidos sadios adjacentes.\n\nEssa tecnologia, aprimorada durante o desenvolvimento de vacinas de última geração, agora é adaptada para silenciar proteínas defeituosas em pacientes com doenças neuromusculares degenerativas. Em vez de intervenções cirúrgicas agressivas ou quimioterápicos genéricos, a medicina personalizada atua no nível molecular, corrigindo os comandos do código biológico com precisão microscópica.\n\nOs ensaios clínicos conduzidos em universidades públicas demonstram que a intervenção precoce restaura a mobilidade e estende a qualidade de vida dos enfermos. Praticar a leitura veloz sobre descobertas biomédicas habitua a mente a decodificar vocabulário denso com leveza, transformando dados clínicos em compreensão humana instantânea.",
    quiz: [
          {
                "id": "nano-1",
                "question": "Qual é o papel das nanopartículas lipídicas nas novas terapias de saúde?",
                "options": [
                      "Atuam como analgésicos de alta potência no cérebro",
                      "Funcionam como veículos microscópicos que entregam moléculas terapêuticas direto nas células doentes",
                      "Substituem a transfusão de sangue em cirurgias de grande porte",
                      "Destroem todas as bactérias do trato digestivo indiscriminadamente"
                ],
                "correctIndex": 1,
                "explanation": "Elas encapsulam e entregam o material genético diretamente ao alvo celular com alta seletividade."
          }
    ]
  },
  {
    id: 'criptografia-pos-quantica',
    title: "Criptografia Pós-Quântica e a Segurança Financeira",
    author: "Segurança Cibernética Bancária",
    category: 'noticia',
    description: "Instituições financeiras preparam sistemas de proteção matemática impenetráveis a ataques de computadores quânticos.",
    wordCount: 150,
    estimatedMinutes: 1,
    difficultyLevel: 5,
    difficultyScore: 98.3,
    text: "O avanço iminente dos processadores quânticos impõe um desafio existencial aos protocolos de segurança que protegem o sistema bancário mundial. Algoritmos clássicos de chave pública, como o RSA e a criptografia por curvas elípticas, fundamentam-se na dificuldade de fatorar números inteiros gigantescos — uma tarefa que computadores quânticos rodando o algoritmo de Shor poderão solucionar em questão de segundos.\n\nDiante dessa perspectiva, especialistas em segurança da informação migram para a criptografia pós-quântica. Essa nova geração de escudos digitais apoia-se em problemas matemáticos complexos baseados em reticulados multidimensionais e sistemas multivariados, imunes tanto a supercomputadores tradicionais quanto aos novos processadores atômicos.\n\nA blindagem antecipada de transações instantâneas como o Pix e de contratos inteligentes garante que as reservas financeiras e a privacidade dos correntistas permaneçam invioláveis. No treino de leitura ágil, o contato com relatórios de segurança da informação exercita o foco sob pressão, permitindo absorver normas técnicas com clareza cristalina.",
    quiz: [
          {
                "id": "cpq-1",
                "question": "Por que a criptografia clássica corre risco com a chegada de computadores quânticos?",
                "options": [
                      "Porque os cabos de fibra óptica derretem com o calor dos fótons",
                      "Porque algoritmos quânticos como o de Shor conseguem fatorar números gigantescos em segundos",
                      "Porque os computadores quânticos adivinham todas as senhas alfabéticas por intuição",
                      "Porque os bancos deixarão de usar a internet"
                ],
                "correctIndex": 1,
                "explanation": "O poder de cálculo quântico quebra com facilidade os métodos matemáticos de fatoração atuais."
          }
    ]
  },
  {
    id: 'satelites-centro-oeste',
    title: "Sensoriamento Remoto e Inteligência Ecológica no Campo",
    author: "Agrotecnologia & Meio Ambiente",
    category: 'noticia',
    description: "Constelações de satélites ópticos e radares de abertura sintética guiam o manejo sustentável das lavouras no Centro-Oeste.",
    wordCount: 148,
    estimatedMinutes: 1,
    difficultyLevel: 5,
    difficultyScore: 95.2,
    text: "A agricultura de precisão nas lavouras do Centro-Oeste brasileiro ingressou em uma fase de alta maturidade com a integração diária de dados de sensoriamento remoto orbital. Sensores multiespectrais capturam o índice de vegetação por diferença normalizada, medindo o teor de clorofila nas folhas e antecipando estresses hídricos antes que se manifestem a olho nu.\n\nCom esses mapas térmicos e índices espectrais, as pulverizações de defensivos e a irrigação são direcionadas unicamente às zonas com necessidade comprovada, reduzindo o desperdício de insumos em mais de quarenta por cento e blindando nascentes e matas ciliares. Radares de abertura sintética atravessam nuvens e tempestades tropicais, assegurando vigilância contínua contra queimadas e desmatamentos ilegais.\n\nO cultivo sustentável combina produtividade recorde com a preservação da biodiversidade nativa do Cerrado. Absorver diagnósticos agroambientais com ritmo veloz treina o olho a identificar correlações numéricas em frações de segundo, expandindo a capacidade de síntese do leitor.",
    quiz: [
          {
                "id": "sat-1",
                "question": "O que o índice de vegetação por diferença normalizada (NDVI) permite identificar na lavoura?",
                "options": [
                      "A profundidade das raízes sob o asfalto",
                      "O teor de clorofila e a saúde foliar antes que o estresse hídrico fique visível a olho nu",
                      "O valor da saca de soja no mercado financeiro de Chicago",
                      "A presença de minérios metálicos no subsolo"
                ],
                "correctIndex": 1,
                "explanation": "O índice espectral reflete a atividade fotossintética e detecta desequilíbrios antes da perda de produtividade."
          }
    ]
  },
  {
    id: 'ferrovias-sustentaveis',
    title: "O Renascimento da Malha Ferroviária Brasileira",
    author: "Infraestrutura & Logística",
    category: 'noticia',
    description: "Novos corredores ferroviários eletrificados interligam os centros produtores aos portos marítimos com menor pegada de carbono.",
    wordCount: 148,
    estimatedMinutes: 1,
    difficultyLevel: 5,
    difficultyScore: 97.6,
    text: "A reestruturação da logística de transportes no Brasil ganha impulso decisivo com o avanço de novos ramais ferroviários estratégicos. Durante décadas, a matriz de cargas nacional dependeu desproporcionalmente do modal rodoviário, gerando fretes onerosos, queima massiva de diesel fóssil e sobrecarga nas rodovias interestaduais.\n\nUma única composição ferroviária moderna de cem vagões retira até trezentos caminhões pesados das estradas, economizando milhões de litros de combustível e reduzindo a emissão de gases estufa em mais de sessenta por cento por tonelada transportada. O escoamento ágil de grãos, minérios e manufaturados até os portos marítimos de Santos, Itaqui e Paranaguá reforça a competitividade dos produtos nacionais no comércio exterior.\n\nA expansão de corredores bioceânicos conectando o interior aos terminais do Pacífico projeta uma integração continental inédita. Para o leitor dedicado, acompanhar análises de infraestrutura logística com cadência rítmica aprimora a velocidade de processamento sem sacrificar a retenção das variáveis econômicas.",
    quiz: [
          {
                "id": "ferr-1",
                "question": "Quantos caminhões pesados uma única composição ferroviária de 100 vagões consegue retirar das rodovias?",
                "options": [
                      "Cerca de dez a quinze veículos",
                      "Até trezentos caminhões pesados",
                      "Apenas dois caminhões pequenos",
                      "Mais de dez mil carretas"
                ],
                "correctIndex": 1,
                "explanation": "A alta capacidade de carga do trem substitui centenas de veículos individuais nas estradas."
          }
    ]
  },
  {
    id: 'jose-bonifacio-instrucao',
    title: "Manifesto Pela Instrução Primária e Virtude Cívica",
    author: "José Bonifácio de Andrada e Silva",
    category: 'discurso',
    description: "O Patriarca da Independência conclama a nação recém-emancipada a educar o povo e fundar a liberdade no saber.",
    wordCount: 185,
    estimatedMinutes: 1,
    difficultyLevel: 3,
    difficultyScore: 78.6,
    text: "De nada valerá quebrarmos os grilhões da tirania colonial estrangeira se permitirmos que os nossos cidadãos permaneçam acorrentados à treva da ignorância e do analfabetismo. Uma pátria não se torna verdadeiramente livre nem soberana apenas pela assinatura de tratados solenes ou pelo trovejar dos canhões da guerra, mas sim pela virtude moral, pela instrução de seus filhos e pela sabedoria das leis que a regem.\n\nA ignorância é a mãe de todos os despotismos e o veneno mais corrosivo para a harmonia social. Onde a juventude não recebe escolas públicas, sementes de virtude e amor à verdade, o arbítrio encontra terreno fértil para semear a corrupção e subjugar as almas. Fomentai a leitura, criai escolas em cada vila e comarca deste vasto império, ensinai a mocidade a pensar com rigor e a amar a justiça antes de qualquer honraria passageira.\n\nSó assim o Brasil erguerá uma civilização generosa e inabalável sob os céus tropicais. A força das palavras de José Bonifácio reverbera com vigor cívico: quem lê com velocidade e discernimento penetra a alma da história e torna-se imune às ilusões dos bajuladores do poder.",
    quiz: [
          {
                "id": "jb-1",
                "question": "Segundo José Bonifácio, qual é o verdadeiro pilar para uma pátria soberana e livre?",
                "options": [
                      "A posse de minas de ouro e pedras preciosas",
                      "A instrução de seus filhos, a virtude moral e a sabedoria das leis",
                      "A assinatura de tratados comerciais exclusivos com a Europa",
                      "A manutenção do analfabetismo no campo"
                ],
                "correctIndex": 1,
                "explanation": "Bonifácio defendia que sem educação e virtude moral nenhuma liberdade política resiste."
          }
    ]
  },
  {
    id: 'mlk-sonho-dignidade',
    title: "A Promessa Inalienável da Dignidade Humana",
    author: "Martin Luther King Jr.",
    category: 'discurso',
    description: "A célebre proclamação em Washington conclamando à igualdade racial, à não-violência e à fraternidade universal.",
    wordCount: 179,
    estimatedMinutes: 1,
    difficultyLevel: 3,
    difficultyScore: 75.2,
    text: "Eu tenho um sonho de que um dia esta nação se levantará e viverá o verdadeiro significado de seu credo: consideramos estas verdades evidentes por si mesmas, de que todos os homens são criados iguais. Eu tenho um sonho de que um dia, nas colinas vermelhas da Geórgia, os filhos dos antigos escravos e os filhos dos antigos senhores de escravos poderão sentar-se juntos à mesa da fraternidade.\n\nNão nos saciaremos enquanto a justiça não jorrar como água limpa e a equidade como um rio torrencial perene. Não permitamos que o nosso protesto criador degenere em violência física; precisamos erguer-nos, majestosos e serenos, combatendo a força bruta com a nobreza indomável da alma e da consciência moral.\n\nQuando permitirmos que o sino da liberdade ressoe em cada aldeia e em cada povoado, apressaremos o dia em que todos os filhos de Deus, negros e brancos, judeus e gentios, protestantes e católicos, poderão dar as mãos e cantar com alegria o hino da libertação. A leitura cadenciada deste discurso histórico inflama a mente com a grandeza da oratória cívica universal.",
    quiz: [
          {
                "id": "mlk-1",
                "question": "Qual é o princípio ético fundamental enfatizado pelo líder sobre os métodos de protesto?",
                "options": [
                      "O recurso ao uso de armas e confronto violento",
                      "A não-violência e a elevação moral combatendo o ódio com a força da alma",
                      "A rendição pacífica diante da discriminação sem protestos",
                      "A separação física de comunidades em territórios isolados"
                ],
                "correctIndex": 1,
                "explanation": "Ele defendeu com firmeza a resistência não-violenta e a nobreza moral da consciência."
          }
    ]
  },
  {
    id: 'gettysburg-lincoln',
    title: "O Governo do Povo, Pelo Povo e Para o Povo",
    author: "Abraham Lincoln",
    category: 'discurso',
    description: "O memorável pronunciamento em Gettysburg sobre o sacrifício cívico e a sobrevivência da democracia.",
    wordCount: 184,
    estimatedMinutes: 1,
    difficultyLevel: 3,
    difficultyScore: 73.8,
    text: "Há quatro vintenas e sete anos, os nossos antepassados deram à luz neste continente uma nova nação, concebida sob o signo da liberdade e consagrada à proposição de que todos os seres humanos nascem iguais perante a lei e perante o Criador.\n\nAgora estamos engajados em uma grande prova histórica para testar se essa nação, ou qualquer nação assim concebida e consagrada, pode perdurar sobre a terra. Nós nos reunimos em um grande campo de batalha para dedicar uma parcela desse solo como morada derradeira daqueles que aqui entregaram suas vidas para que a pátria pudesse sobreviver. É justo e apropriado que o façamos.\n\nMas, em sentido mais profundo, não nos cabe consagrar nem santificar este solo sagrado; os homens bravos que aqui lutaram já o consagraram muito acima do nosso frágil poder de acrescentar ou subtrair algo. Cabe a nós, os vivos, assumir a tarefa inacabada e resolver solenemente que esses mortos não pereceram em vão; que esta nação renascerá sob a bênção da liberdade; e que o governo do povo, pelo povo e para o povo jamais perecerá da face da terra.",
    quiz: [
          {
                "id": "lin-1",
                "question": "Qual é a célebre definição de democracia perpetuada no encerramento de Gettysburg?",
                "options": [
                      "O império da lei acima dos parlamentos eleitos",
                      "O governo do povo, pelo povo e para o povo",
                      "A soberania militar sobre as cidades derrotadas",
                      "A tributação compulsória sobre o comércio exterior"
                ],
                "correctIndex": 1,
                "explanation": "A frase consagrou para a posteridade a essência do regime democrático representativo."
          }
    ]
  },
  {
    id: 'mandela-reconciliacao',
    title: "A Vitória da Liberdade sobre as Amarras do Preconceito",
    author: "Nelson Mandela",
    category: 'discurso',
    description: "Pronunciamento de posse que inaugurou a democracia multirracial na África do Sul com base no perdão e na unidade.",
    wordCount: 163,
    estimatedMinutes: 1,
    difficultyLevel: 3,
    difficultyScore: 79.5,
    text: "O momento para a cura das feridas profundas finalmente chegou. O abismo temporal que nos separou durante gerações começa a ser transposto pela coragem e pela generosidade de todos os nossos compatriotas. O tempo para a construção de uma nação unida e sem ódios está diante de nós.\n\nConquistamos a nossa emancipação política após décadas de sofrimento silencioso. Assumimos o compromisso sagrado de libertar todo o nosso povo do cativeiro contínuo da pobreza, das privações, do sofrimento, da discriminação de gênero e de qualquer outra forma de opressão institucional. Nunca, nunca mais haverá de acontecer que esta terra bela e generosa experimente a humilhação de um ser humano pisoteado por outro.\n\nQue a liberdade impere soberana sobre os nossos vales, montanhas e cidades. O sol jamais se porá sobre uma conquista humana tão gloriosa. Ler com velocidade a oratória de estadistas mundiais habitua os olhos a captar o ritmo solene dos períodos compostos, enriquecendo o repertório vocabular com termos de nobreza e dignidade.",
    quiz: [
          {
                "id": "man-posse-1",
                "question": "Qual foi o compromisso central assumido por Mandela em seu discurso de posse?",
                "options": [
                      "Punir severamente os adversários derrotados sem direito de defesa",
                      "Libertar o povo da pobreza e garantir que nunca mais uma pessoa seja oprimida por outra",
                      "Fechar os portos do país ao comércio exterior",
                      "Restringir o voto aos cidadãos que comprovassem posse de terras"
                ],
                "correctIndex": 1,
                "explanation": "Ele propôs a cura das feridas sociais, o perdão e a erradicação de qualquer discriminação."
          }
    ]
  },
  {
    id: 'santos-dumont-asas',
    title: "As Asas da Fraternidade Humana",
    author: "Alberto Santos Dumont",
    category: 'discurso',
    description: "O pioneiro da aviação discorre sobre a missão nobre de unir os povos e aproximar as nações pelo ar.",
    wordCount: 174,
    estimatedMinutes: 1,
    difficultyLevel: 4,
    difficultyScore: 84.5,
    text: "Quando projetei e construí o primeiro aeroplano capaz de erguer-se do solo com os seus próprios meios mecânicos no campo de Bagatelle, sonhei que a conquista do ar traria a redenção pacífica da civilização. Imaginei as asas mecânicas como pontes invisíveis estendidas sobre oceanos e cordilheiras, encurtando distâncias geográficas e eliminando as barreiras de preconceito e desconfiança que mantêm os povos isolados.\n\nO céu não foi criado para ser campo de batalha sangrento nem esconderijo para armas de destruição em massa; o céu é o espaço supremo da luz e da elevação espiritual do gênero humano. Inventar é obedecer a um imperativo moral de progresso solidário, colocando a técnica e a ciência a serviço da fraternidade e do amparo aos desvalidos da sorte.\n\nSe as minhas máquinas servirem para aproximar mentes e corações separados pela geografia, darei por justificado cada sacrifício e cada perigo enfrentado nas alturas. A fluidez da prosa de Santos Dumont desliza com pureza e altivez, convidando o leitor a sincronizar o olhar com o horizonte limpo das grandes ideias humanitárias.",
    quiz: [
          {
                "id": "sd-1",
                "question": "Qual era o objetivo idealista de Santos Dumont ao inventar o avião?",
                "options": [
                      "Tornar-se o homem mais rico do continente europeu",
                      "Aproximar os povos, encurtar distâncias geográficas e promover a fraternidade mundial",
                      "Criar armas de bombardeio aéreo para as grandes guerras",
                      "Proibir os transportes marítimos e ferroviários"
                ],
                "correctIndex": 1,
                "explanation": "Santos Dumont idealizou a aviação como instrumento de paz e integração fraterna entre as nações."
          }
    ]
  },
  {
    id: 'oswaldo-cruz-saneamento',
    title: "A Vitória da Ciência Contra a Febre Amarela",
    author: "Oswaldo Cruz",
    category: 'discurso',
    description: "O médico e sanitarista relata a cruzada contra as epidemias tropicais que transformou o Rio de Janeiro no início do século XX.",
    wordCount: 160,
    estimatedMinutes: 1,
    difficultyLevel: 4,
    difficultyScore: 88.6,
    text: "Diante da descrença zombeteira dos ignorantes e dos ataques virulentos de uma imprensa míope, a ciência experimental não hesitou nem recuou um só milímetro de seu dever cívico. Declaramos guerra sem tréguas ao mosquito transmissor da febre amarela nos mangues, valas e cortiços da capital da república.\n\nSabíamos que a higiene pública não se faz com discursos fáceis ou promessas evasivas nos salões dourados da burocracia, mas com disciplina sanitária estrita, isolamento rigoroso dos focos infecciosos e aplicação corajosa das descobertas bacteriológicas mais recentes. O porto do Rio de Janeiro, antes tachado de túmulo de marinheiros estrangeiros, renasceu purificado e seguro para os viajantes do mundo inteiro.\n\nA vitória sobre as pestes comprovou de maneira irrefutável que a inteligência brasileira, amparada no método científico rigoroso e na probidade de propósitos, é capaz de vencer os maiores flagelos que afligem a humanidade. A leitura veloz de narrativas históricas sobre a saúde pública exercita a determinação e a firmeza lógica de raciocínio.",
    quiz: [
          {
                "id": "oc-1",
                "question": "Qual foi o método vitorioso empregado por Oswaldo Cruz para erradicar a febre amarela?",
                "options": [
                      "Evacuar toda a população da cidade para o interior de Minas Gerais",
                      "Combate focado ao mosquito vetor, higiene rigorosa e aplicação do método bacteriológico",
                      "Proibir a entrada de navios no porto para sempre",
                      "Confiar apenas em remédios caseiros sem base experimental"
                ],
                "correctIndex": 1,
                "explanation": "Oswaldo Cruz saneou o Rio de Janeiro com rigor microbiológico e erradicação dos mosquitos."
          }
    ]
  },
  {
    id: 'darcy-ribeiro-utopia',
    title: "A Construção Cultural da Identidade Brasileira",
    author: "Darcy Ribeiro",
    category: 'discurso',
    description: "O antropólogo e educador analisa a formação singular do povo brasileiro e a urgência de uma educação libertadora.",
    wordCount: 183,
    estimatedMinutes: 1,
    difficultyLevel: 4,
    difficultyScore: 85.1,
    text: "O Brasil é uma obra em andamento, uma nova Roma lavada a calor tropical e mestiçagem criadora. Surgimos da confluência impetuosa de três matrizes humanas vigorosas: o indígena telúrico que conhecia os mistérios das florestas, o africano trazido nos porões da ignomínia que infundiu ritmo e resistência ao nosso sangue, e o colonizador ibérico que nos legou o idioma e a audácia das travessias ultramarinas.\n\nDessa caldeação fecunda não brotou um povo subalterno ou mutilado, mas uma etnia nova, exuberante e fraterna, cuja vocação histórica reside na invenção da mais generosa civilização solidária dos trópicos. Mas essa promessa continuará sufocada se não erguermos uma rede de escolas públicas integrais que acolham cada menino e menina das favelas e do sertão com dignidade, alimentação, livros e ciência viva.\n\nA crise da educação no Brasil não é uma crise acidental; é um projeto deliberado das elites retrógradas para perpetuar privilégios. Destruir esse projeto pelo estudo incansável e pela leitura apaixonada é o compromisso inegociável de nossa geração. Praticar a velocidade na leitura de Darcy Ribeiro desperta a chama do orgulho cívico e da clareza crítica.",
    quiz: [
          {
                "id": "dr-1",
                "question": "Segundo Darcy Ribeiro, qual é a origem singular do povo brasileiro?",
                "options": [
                      "Uma imitação idêntica das sociedades europeias do norte",
                      "A confluência criadora das matrizes indígena, africana e ibérica gerando uma etnia nova",
                      "O isolamento absoluto de populações sem qualquer intercâmbio cultural",
                      "A cópia das estruturas burocráticas asiáticas"
                ],
                "correctIndex": 1,
                "explanation": "Ele defendia que o Brasil é um povo novo nascido da mestiçagem e com vocação civilizatória própria."
          }
    ]
  },
  {
    id: 'euclides-da-cunha-sertanejo',
    title: "A Força Indômita do Homem Sertanejo",
    author: "Euclides da Cunha",
    category: 'discurso',
    description: "O célebre perfil sociológico e telúrico do habitante das caatingas imortalizado na obra Os Sertões.",
    wordCount: 190,
    estimatedMinutes: 1,
    difficultyLevel: 3,
    difficultyScore: 77.2,
    text: "O sertanejo é, antes de tudo, um forte. Não tem o raquitismo enfadonho dos mestiços neurastênicos do litoral urbano. A sua aparência, entretanto, no primeiro lance de vista, trai essa pujança. É desgracioso, desengonçado, torto. Hércules-Quasímodo, reflete no aspecto a fealdade típica dos fracos. O andar sem firmeza, o busto curvado, a cabeça inclinada para a frente parecem revelar um desânimo congênito e irremediável.\n\nBasta, porém, que surja o menor perigo, que um novilho bravo estanque na vereda pedregosa ou que a perseguição à rês o obrigue a cavalgar pelas brenhas espinhosas da caatinga, para que aquele homem desanimado se transfigure instantaneamente. Ergue-se firme sobre os estribos, apruma o torso, ganha músculos de ferro e precipita-se vertiginoso por entre os galhos de cactos e juremas como um centauro invencível.\n\nÉ a criatura perfeitamente adaptada à rudeza de sua terra árida, capaz de resistir às secas inclementes e ao sol calcinante sem vergar a espinha diante da adversidade. A prosa de Euclides da Cunha exige leitura enérgica e atenta: a riqueza dos adjetivos e o ritmo denso dos períodos testam a elasticidade da mente e consolidam a maestria da visão periférica.",
    quiz: [
          {
                "id": "euc-1",
                "question": "Qual é o contraste psicológico e físico que Euclides da Cunha descreve no sertanejo?",
                "options": [
                      "Ele é sempre fraco e adoece diante do trabalho no campo",
                      "Parece desgracioso e curvado em repouso, mas se transfigura em força hercúlea diante do perigo",
                      "É um cavaleiro que só atua em cidades grandes e asfaltadas",
                      "Detesta os cavalos e prefere viajar em carruagens lentas"
                ],
                "correctIndex": 1,
                "explanation": "O autor imortalizou a transfiguração do sertanejo que revela força descomunal quando desafiado."
          }
    ]
  },
  {
    id: 'machado-o-espelho',
    title: "O Espelho: A Alma Exterior e a Alma Interior",
    author: "Machado de Assis",
    category: 'conto',
    description: "Jacobina formula uma teoria filosófica sobre as duas almas humanas e o drama de um alferes isolado numa fazenda.",
    wordCount: 213,
    estimatedMinutes: 1,
    difficultyLevel: 3,
    difficultyScore: 75.3,
    text: "Quatro ou cinco cavalheiros debatiam na varanda questões de alta transcendência sem que chegássemos a qualquer acordo pacífico. O assunto versava sobre a natureza da alma humana. Enquanto uns defendiam a unidade substancial do espírito, Jacobina mantinha-se em silêncio obsequioso, fumando o seu charuto num canto da sala.\n\nInterpelado pelos convivas, tomou a palavra com gravidade: \"Cada criatura humana não possui uma só alma, meus senhores; traz consigo duas almas: uma interior, que olha de dentro para fora, e outra exterior, que olha de fora para dentro. A alma exterior pode ser um anel de brilhantes, uma comenda, um cargo público ou mesmo a admiração dos vizinhos. Se vós perdeis a alma exterior, a alma de dentro definha e desfalece na solidão.\"\n\nContou então o episódio de sua mocidade, quando foi nomeado alferes da Guarda Nacional e viajou para o sítio ermo de uma tia no interior. Enquanto todos o bajulavam, ele sentia-se completo. Porém, quando os parentes viajaram e os escravos fugiram, deixando-o semanas em completo isolamento, Jacobina descobriu que diante do grande espelho da sala a sua imagem quase se dissolvia na penumbra, recuperando a nitidez apenas quando vestia a farda dourada de alferes. A fina ironia machadiana exige rapidez e perspicácia para colher o riso sutil sob a máscara solene.",
    quiz: [
          {
                "id": "esp-1",
                "question": "Qual é a teoria inovadora que Jacobina expõe aos cavalheiros na varanda?",
                "options": [
                      "Que a alma humana reencarna imediatamente em animais domésticos",
                      "Que cada indivíduo tem duas almas: uma interior e outra exterior sustentada pelo olhar alheio",
                      "Que os espelhos roubam a inteligência de quem os consulta",
                      "Que os alferes não possuem sentimentos morais"
                ],
                "correctIndex": 1,
                "explanation": "Ele argumenta que a alma exterior é formada por títulos, roupas e pelo reconhecimento dos outros."
          }
    ]
  },
  {
    id: 'machado-teoria-medalhao',
    title: "Teoria do Medalhão: A Arte de Vencer no Mundo",
    author: "Machado de Assis",
    category: 'conto',
    description: "Um pai experiente aconselha o filho ao completar vinte e um anos sobre como triunfar socialmente sem ter ideias próprias.",
    wordCount: 189,
    estimatedMinutes: 1,
    difficultyLevel: 3,
    difficultyScore: 79.8,
    text: "Ao darem as onze horas da noite e recolhidos os convidados da ceia, o conselheiro Januário chamou o filho ao gabinete para transmitir-lhe o testamento de sua prudência mundana. O rapaz completava vinte e um anos e precisava escolher uma rota segura para o sucesso nas rodas da corte imperial.\n\n\"Não tens vocação para a filosofia profunda nem para o labor extenuante das ciências obscuras\", sentenciou o pai com serenidade cínica. \"O teu destino, meu caro Janica, é ser um medalhão. O medalhão não inventa ideias originais, porque as ideias próprias provocam controvérsias e atraem a antipatia dos poderosos. O medalhão nutre-se das opiniões comuns, repete frases feitas com gravidade pontifical e dorme sossegado sabendo que a mediocridade é o passaporte mais seguro para as altas dignidades públicas.\"\n\nJanuário instruiu o jovem a nunca tomar partido em questões ardentes, a utilizar adjetivos vagos e sonoros e a manter no rosto um ar solene e inescrutável. A radiografia irônica de Machado desnuda os atalhos da impostura com elegância cirúrgica. Ao exercitar a leitura rápida neste diálogo brilhante, o leitor assimila a sátira moral com deleite intelectual e economia de tempo.",
    quiz: [
          {
                "id": "med-1",
                "question": "Qual conselho central o pai dá ao filho para que ele se torne um \"medalhão\" bem-sucedido?",
                "options": [
                      "Estudar dia e noite até descobrir uma cura médica inédita",
                      "Evitar ideias próprias originais e repetir opiniões consagradas com ar de solenidade",
                      "Doar toda a fortuna herdada aos necessitados da cidade",
                      "Escrever artigos combativos atacando os ministros de Estado"
                ],
                "correctIndex": 1,
                "explanation": "Januário prega a mediocridade calculada e o uso de lugares-comuns para subir na hierarquia social."
          }
    ]
  },
  {
    id: 'machado-noite-almirante',
    title: "Noite de Almirante: O Retorno das Longas Viagens",
    author: "Machado de Assis",
    category: 'conto',
    description: "O marinheiro Deolindo volta de três meses no mar sonhando com a noite triunfal nos braços da amada Genoveva.",
    wordCount: 194,
    estimatedMinutes: 1,
    difficultyLevel: 3,
    difficultyScore: 81.3,
    text: "Deolindo zarpou a bordo da corveta imperial para uma comissão de treinamento de três meses nas águas do sul. Ao despedir-se de Genoveva no cais, os dois trocaram juras ardentes de fidelidade eterna, prometendo que aquela separação forçada seria coroada por uma \"noite de almirante\" — metáfora dengosa que significava o auge do triunfo e da felicidade amorosa no reencontro.\n\nDurante as vigílias solitárias sob o céu estrelado do oceano, o marinheiro sustentou o coração com a lembrança dos beijos e dos carinhos da jovem. Suportou temporais violentos, a disciplina severa da tripulação e o balanço monótono das ondas pensando unicamente no dia em que desembarcaria no Rio com os bolsos cheios do soldo economizado.\n\nAo chegar à casa modesta da praia da Gamboa, bateu à porta com o peito a palpitar de esperança. Para seu assombro gélido, encontrou Genoveva calma e risonha nos braços de outro homem, um marceneiro da vizinhança. Quando Deolindo cobrou-lhe as promessas solenes, a moça encolheu os ombros com naturalidade desarmante: as juras haviam expirado porque o coração mudara de rumo. Machado narra a desilusão humana com maestria insuperável, exigindo um leitor ágil para acompanhar os meandros do desencanto.",
    quiz: [
          {
                "id": "nalm-1",
                "question": "O que representava a expressão \"noite de almirante\" para o marinheiro Deolindo?",
                "options": [
                      "A promoção ao posto mais alto da Marinha de Guerra",
                      "O reencontro triunfal e apaixonado com Genoveva após os meses de ausência no mar",
                      "Um baile formal no palácio do imperador",
                      "Uma tempestade com ondas de dez metros de altura"
                ],
                "correctIndex": 1,
                "explanation": "A expressão era o código íntimo dos amantes para celebrar o reencontro amoroso."
          }
    ]
  },
  {
    id: 'lima-barreto-nova-california',
    title: "A Nova Califórnia: A Febre do Ouro em Tubiacanga",
    author: "Lima Barreto",
    category: 'conto',
    description: "Um alquimista misterioso descobre um método sinistro de extrair ouro dos ossos humanos, transformando uma vila pacata.",
    wordCount: 175,
    estimatedMinutes: 1,
    difficultyLevel: 4,
    difficultyScore: 88.6,
    text: "A pacata cidadezinha fluminense de Tubiacanga dormitava em sua rotina poeirenta de comadres na janela, boticas sem clientes e funcionários públicos sonolentos até a chegada do misterioso Raimundo Flamel. O forasteiro comprou uma chácara isolada nos arredores e instalou ali fornos, cadinhos e alambiques de alquimia que fumegavam pelas madrugadas afora.\n\nPouco tempo depois, Flamel espalhou pela cidade a notícia estarrecedora: descobrira a fórmula de transmutar ossos humanos sepultados em ouro puro de dezoito quilates. Bastava desenterrar os despojos do cemitério municipal e submetê-los ao tratamento químico em seus fornos secretos para enriquecer da noite para o dia.\n\nEm questão de semanas, a honra, os escrúpulos religiosos e o respeito aos mortos foram sepultados pela ganância desmedida. Notáveis da vila, juízes e comerciantes passaram a invadir o cemitério às escondidas armados de picaretas, violando sepulturas para roubar fêmures e crânios dos próprios parentes. Lima Barreto utiliza a alegoria grotesca para castigar a hipocrisia burguesa e o apetite voraz pelo lucro fácil. Ler esta sátira com ritmo dinâmico estimula a imaginação e aprofunda o senso crítico.",
    quiz: [
          {
                "id": "ncal-1",
                "question": "Qual processo alquímico sinistro Raimundo Flamel afirmava ter descoberto em Tubiacanga?",
                "options": [
                      "Transformar a água do rio Paraíba em vinho francês",
                      "Extrair ouro puro de ossos humanos enterrados no cemitério",
                      "Fabricar diamantes a partir de pedras de calçamento",
                      "Reviver os cadáveres para trabalharem na lavoura"
                ],
                "correctIndex": 1,
                "explanation": "A promessa de extrair ouro de despojos humanos desmascara a cupidez e o egoísmo da cidade."
          }
    ]
  },
  {
    id: 'olavo-bilac-idioma',
    title: "A Pátria e a Língua Viva",
    author: "Olavo Bilac",
    category: 'conto',
    description: "Uma reflexão emocionante sobre o idioma português como o alicerce sagrado da nacionalidade brasileira.",
    wordCount: 167,
    estimatedMinutes: 1,
    difficultyLevel: 3,
    difficultyScore: 80.7,
    text: "A língua de um povo não é apenas um instrumento arbitrário de comunicação mercantil; é a própria carne viva de sua alma coletiva, o receptáculo em que se guardam as dores antigas, as esperanças imortais e o ritmo secreto de seus pensamentos mais caros. Na língua portuguesa herdada dos navegadores lusiadas e afeiçoada pela doçura dos trópicos, o Brasil encontrou a sua unidade indissolúvel.\n\nEnquanto vastos impérios vizinhos fragmentaram-se em dezenas de repúblicas rivais, o Brasil manteve a sua vastidão continental unida pelo milagre de uma só fala. Do extremo norte banhado pelo rio Amazonas aos campos meridionais do Chuí, o mesmo verbo ecoa nos lares, transmitindo de geração em geração o sentido de pertencer a uma pátria fraterna e soberana.\n\nAmar a língua materna é zelar pela clareza de suas construções, cultivando a nobreza do vocabulário e a agilidade da leitura. Quando treinamos nossos olhos para deslizar sobre as frases com presteza e segurança, homenageamos o tesouro imaterial mais belo que os nossos antepassados nos legaram.",
    quiz: [
          {
                "id": "ob-1",
                "question": "Qual papel histórico fundamental Bilac atribui à língua portuguesa no Brasil?",
                "options": [
                      "Serviu unicamente para a redação de relatórios tributários coloniais",
                      "Garantir a unidade indissolúvel da pátria em um território de dimensão continental",
                      "Separar os cidadãos das cidades dos trabalhadores rurais",
                      "Impedir que os brasileiros aprendessem idiomas estrangeiros"
                ],
                "correctIndex": 1,
                "explanation": "Bilac ressalta que o idioma comum evitou a fragmentação territorial e forjou a identidade nacional."
          }
    ]
  },
  {
    id: 'aluisio-azevedo-cortico',
    title: "O Cortiço: O Despertar da Manhã Fluminense",
    author: "Aluísio Azevedo",
    category: 'conto',
    description: "A energia frenética e a movimentação coletiva na estalagem de João Romão no coração do Rio oitocentista.",
    wordCount: 177,
    estimatedMinutes: 1,
    difficultyLevel: 3,
    difficultyScore: 80,
    text: "Eram cinco horas da manhã e o cortiço acordava, abrindo, não os olhos, mas a sua infinidade de portas e janelas alinhadas. Um rumor surdo e indistinto principiava a subir da terra úmida: um borborinho de vozes ásperas, tinir de canecas de folha-de-flandres, passos apressados de chinelas sobre o lajedo molhado e o chiar sonoro da água batendo nos tanques de pedra.\n\nAs lavadeiras, de saias arregaçadas e braços nus salpicados de espuma de sabão de caldeira, disputavam com azedume as melhores biqueiras da lavanderia coletiva. Da fresta das estalagens exalava um cheiro forte de café queimado, misturado à fumaça das lenhas verdes que começavam a crepitar nos fogareiros de barro. João Romão, do balcão de sua venda suja, fiscalizava cada movimento dos inquilinos com olhos de gavião faminto.\n\nA estética naturalista de Aluísio Azevedo trata a multidão como um organismo biológico vivo, pulsante de impulsos primitivos e calor humano. Captar a riqueza tumultuada dessa descrição através de blocos visuais de leitura rápida permite reviver a atmosfera histórica do Rio antigo com nitidez cinematográfica e frescor renovado.",
    quiz: [
          {
                "id": "crt-1",
                "question": "Como Aluísio Azevedo descreve o amanhecer no cortiço?",
                "options": [
                      "Como um cemitério em silêncio absoluto e imutável",
                      "Como um organismo coletivo vivo despertando em borborinho de vozes, passos e lavadeiras",
                      "Como um desfile militar ordenado pelo governo",
                      "Como uma reunião pacata de monges enclausurados"
                ],
                "correctIndex": 1,
                "explanation": "O autor humaniza a habitação coletiva como um ser vivo fervilhante de energia."
          }
    ]
  },
  {
    id: 'raul-pompeia-ateneu',
    title: "O Ateneu: O Primeiro Dia no Internato",
    author: "Raul Pompeia",
    category: 'conto',
    description: "A advertência austera do pai na entrada do colégio interno e o choque moral do jovem Sérgio com a disciplina fria.",
    wordCount: 172,
    estimatedMinutes: 1,
    difficultyLevel: 3,
    difficultyScore: 80.6,
    text: "\"Vais encontrar o mundo, disse-me meu pai à porta do Ateneu; coragem para a luta.\" Bastaram aquelas palavras graves para que um tremor de apreensão percorresse a minha inocência de onze anos. A carruagem partira rodando pesada pela poeira da rua, deixando-me sozinho diante do portal de ferro encimado pelo busto severo de Minerva.\n\nO Ateneu não era um simples educandário de letras clássicas e aritmética; era um microcosmo feroz da sociedade humana, governado pela autoridade teatral do diretor Aristarco Argolo de Ramos. Ali, sob a máscara da caridade pedagógica e da disciplina aristocrática, digladiavam-se as ambições mesquinhas, as invejas secretas e as alianças de conveniência entre os filhos das famílias abastadas do Império.\n\nDescobri cedo que a sobrevivência moral naquele colégio exigia olhos atentos, coração blindado e rapidez de reflexos para esquivar-me das ciladas da bajulação e do terror burocrático. A prosa expressionista e densa de Raul Pompeia desafia o leitor com metáforas luminosas. Treinar a leitura ágil nesta obra exercita a firmeza cognitiva para não sucumbir diante da opulência estilística.",
    quiz: [
          {
                "id": "atn-1",
                "question": "Qual conselho severo o pai de Sérgio pronunciou ao deixá-lo no portão do colégio?",
                "options": [
                      "Vais descansar das brigas de família em casa",
                      "Vais encontrar o mundo; coragem para a luta",
                      "Nunca leias livros de poesia ou romance",
                      "Foge imediatamente na primeira oportunidade"
                ],
                "correctIndex": 1,
                "explanation": "A frase icônica da literatura brasileira sintetiza a entrada do menino no microcosmo cruel da vida adulta."
          }
    ]
  },
  {
    id: 'castro-alves-o-livro',
    title: "O Livro, a Luz e a Liberdade dos Povos",
    author: "Castro Alves",
    category: 'conto',
    description: "O poeta dos escravos celebra a leitura e a difusão da imprensa como as armas supremas contra a opressão.",
    wordCount: 180,
    estimatedMinutes: 1,
    difficultyLevel: 3,
    difficultyScore: 73.5,
    text: "Oh! Bendito o que semeia livros, livros à mão cheia, e faz o povo pensar! O livro caindo no coração humano é a semente pura que germina em colheitas douradas de liberdade, dignidade e justiça social. Não são as fortalezas de pedra nem os exércitos eriçados de baionetas que garantem a honra de uma nação livre, mas sim as estantes bem nutridas de suas bibliotecas públicas e a mente lúcida de seus cidadãos.\n\nA imprensa é a locomotiva sublime do pensamento, arremessando fagulhas de luz sobre a obscuridade dos preconceitos seculares. Onde o livro penetra com a sua pregação silenciosa, o chicote do feitor estala em falso, o déspota vacila em seu trono de arbítrio e o homem oprimido ergue a fronte para contemplar a amplidão infinita dos céus.\n\nLede, juventude da América! Fazei de cada página conquistada um passo destemido na escalada da civilização universal. A poesia caudalosa de Castro Alves vibra com ardor cívico inigualável. Ler os seus versos em prosa com rapidez e fôlego ritmado é sintonizar o espírito com o ideal mais elevado de emancipação humana.",
    quiz: [
          {
                "id": "ca-1",
                "question": "Qual é a metáfora central utilizada por Castro Alves para descrever o impacto dos livros?",
                "options": [
                      "Um fardo pesado que cansa os olhos dos camponeses",
                      "Uma semente pura que faz o povo pensar e floresce em liberdade e dignidade",
                      "Um passatempo inútil para fidalgos ociosos",
                      "Uma arma de ferro para guerrear com nações vizinhas"
                ],
                "correctIndex": 1,
                "explanation": "O poeta consagrou o verso \"Bendito o que semeia livros e faz o povo pensar\"."
          }
    ]
  },
  {
    id: 'sono-rem-criatividade',
    title: "A Arquitetura do Sono REM e a Síntese Criativa",
    author: "Neurociência Cognitiva",
    category: 'artigo',
    description: "Durante a fase de movimentos oculares rápidos, o cérebro conecta memórias remotas e consolida aprendizagens complexas.",
    wordCount: 176,
    estimatedMinutes: 1,
    difficultyLevel: 4,
    difficultyScore: 89.5,
    text: "O repouso noturno é frequentemente mal interpretado como uma simples pausa passiva do metabolismo corporal. No entanto, os registros de polissonografia revelam que o cérebro durante a fase REM (Rapid Eye Movement) encontra-se em estado de efervescência elétrica comparável ou até superior à vigília ativa, consumindo glicose e oxigênio com intensidade incomum.\n\nÉ nessa etapa do sono que os circuitos neurais desfazem as amarras da lógica linear diurna e experimentam combinações conceituais ousadas. O hipocampo projeta as informações recém-armazenadas ao longo do dia para o neocórtex, onde os dados são cruzados com memórias de longo prazo estabelecidas há anos. Soluções para problemas científicos intrincados e metáforas literárias surpreendentes costumam brotar dessa síntese noturna.\n\nAlém da criatividade, o sono REM realiza a poda sináptica de detalhes irrelevantes, limpando as redes para as novas demandas perceptivas do dia seguinte. Quem treina leitura dinâmica descobre que noites de sono reparador aceleram a automatização dos reflexos oculares e blindam a capacidade de foco contra a fadiga. A leitura rápida sobre cronobiologia exercita a mente a correlacionar fisiologia e produtividade intelectual.",
    quiz: [
          {
                "id": "sono-1",
                "question": "O que ocorre com a atividade elétrica cerebral durante a fase de sono REM?",
                "options": [
                      "Cessa totalmente entrando em coma induzido",
                      "Mantém-se em alta intensidade similar ou superior à vigília, conectando memórias e cruzando dados",
                      "Fica restrita exclusivamente ao cerebelo sem tocar o córtex",
                      "Diminui a oxigenação até parar os movimentos dos olhos"
                ],
                "correctIndex": 1,
                "explanation": "O sono REM é uma fase ativa onde o cérebro consolida aprendizados e sintetiza soluções criativas."
          }
    ]
  },
  {
    id: 'filosofia-estoica',
    title: "O Autodomínio e a Sabedoria Estoica Diante do Imprevisto",
    author: "Filosofia Aplicada",
    category: 'artigo',
    description: "A distinção entre o que depende de nós e o que escapa ao nosso controle segundo Epicteto, Sêneca e Marco Aurélio.",
    wordCount: 209,
    estimatedMinutes: 1,
    difficultyLevel: 3,
    difficultyScore: 81.2,
    text: "No pórtico de Atenas e nos palácios da Roma imperial, os filósofos estoicos ergueram uma das escolas éticas mais resilientes da história ocidental. O pilar fundamental dessa doutrina, sintetizado magistralmente no Manual de Epicteto, repousa na dicotomia do controle: existem coisas que dependem estritamente de nós — como os nossos juízos de valor, as nossas intenções e os nossos impulsos morais — e coisas que escapam ao nosso arbítrio, como a opinião alheia, a saúde biológica e os acidentes da fortuna.\n\nO homem prudente não dissipa a sua energia afligindo-se com o que não pode determinar; antes, concentra a sua vontade inabalável em governar a sua própria mente com equanimidade, coragem e decência. As crises exteriores, os reveses profissionais e as perdas materiais não possuem em si o poder de ferir a alma; é a interpretação perturbada que fazemos dos fatos que nos rouba a paz interior.\n\nNa prática da leitura veloz, o estoicismo revela-se um poderoso aliado psicológico. Ao deparar com textos desafiadores ou momentos de distração súbita, o leitor treinado não se desespera nem culpa o ambiente: respira com serenidade, calibra o foco e retoma o ritmo com firmeza serena. Ler sobre a virtude estoica com velocidade e clareza exercita a temperança interior e a maturidade emocional.",
    quiz: [
          {
                "id": "est-1",
                "question": "Qual é o fundamento ético da \"dicotomia do controle\" defendida pelos estoicos?",
                "options": [
                      "Controlar a natureza e o clima através da força militar",
                      "Distinguir o que depende de nós (nossos juízos e atos) daquilo que independe de nossa vontade (fatos externos)",
                      "Acumular riquezas para comprar a tranquilidade dos vizinhos",
                      "Eliminar todas as emoções humanas por meio do isolamento em cavernas"
                ],
                "correctIndex": 1,
                "explanation": "A sabedoria estoica consiste em focar a energia exclusivamente no que podemos governar."
          }
    ]
  },
  {
    id: 'fisica-luz-visao',
    title: "A Física da Luz: Dos Fótons à Interpretação Retiniana",
    author: "Biofísica da Percepção",
    category: 'artigo',
    description: "A jornada quântica da radiação eletromagnética desde as emissões solares até a conversão em impulsos neurais na fóvea.",
    wordCount: 175,
    estimatedMinutes: 1,
    difficultyLevel: 4,
    difficultyScore: 89.2,
    text: "A visão humana é o fruto admirável de um encontro entre a física das partículas eletromagnéticas e a biologia celular dos receptores retinianos. Os fótons emitidos por uma lâmpada ou refletidos pela página impressa de um livro viajam à velocidade de trezentos mil quilômetros por segundo até penetrarem a córnea transparente, atravessarem a pupila e serem focalizados com precisão pelo cristalino sobre o fundo do globo ocular.\n\nAli, na fóvea central — uma depressão minúscula densamente povoada por milhões de cones de alta resolução —, a energia luminosa é absorvida por moléculas de rodopsina e fotopsina. Em trilionésimos de segundo, essa reação fotoquímica altera a polarização elétrica das membranas celulares, gerando potenciais de ação que sobem pelo nervo óptico até o córtex visual occipital.\n\nO cérebro então decodifica linhas, contrastes e frequências de cor, transformando luz inerte em palavras plenas de significado e emoção. Compreender a biofísica da leitura amplia a consciência do leitor sobre os seus próprios limites fisiológicos, estimulando a prática de exercícios sacádicos e a expansão do campo periférico com rigor científico.",
    quiz: [
          {
                "id": "fis-1",
                "question": "Onde se concentra a maior densidade de cones para visão de alta resolução na retina humana?",
                "options": [
                      "No nervo óptico cego",
                      "Na fóvea central",
                      "Na superfície externa da córnea",
                      "No humor vítreo"
                ],
                "correctIndex": 1,
                "explanation": "A fóvea é a região retiniana especializada na nitidez máxima e detalhamento cromático."
          }
    ]
  },
  {
    id: 'cerebro-musical',
    title: "O Cérebro Rítmico: Como a Cadência Potencializa a Atenção",
    author: "Neuroacústica Aplicada",
    category: 'artigo',
    description: "A sincronização de oscilações cerebrais por batidas periódicas silencia a dispersão e afina o processamento executivo.",
    wordCount: 172,
    estimatedMinutes: 1,
    difficultyLevel: 4,
    difficultyScore: 90.3,
    text: "O cérebro humano é um órgão intrinsecamente rítmico. As suas centenas de bilhões de neurônios comunicam-se emitindo oscilações eletroencefalográficas coordenadas que variam das lentas ondas delta do sono profundo às rápidas ondas gama da vigília altamente focada. Quando somos expostos a um estímulo auditivo ou visual periódico — como o clique suave de um metrônomo calibrado —, ocorre o fenômeno da sincronização neuronal ou entrainment.\n\nOs disparos dos neurônios do córtex auditivo acoplam-se ao andamento temporal do metrônomo, transmitindo essa cadência unificada às redes frontoparietais responsáveis pela atenção seletiva. O cérebro deixa de gastar energia decidindo a cada microssegundo quando deve mover o olhar para a próxima palavra; o andamento regular dita a cadência com precisão matemática, silenciando as hesitações e os microdevaneios que atrasam o leitor comum.\n\nEsse compasso regular transforma a leitura em uma coreografia harmoniosa entre os olhos e o pensamento conceitual. Ler no ritmo do metrônomo não é uma imposição mecânica fria, mas uma partitura neurológica que liberta a mente para alcançar velocidades superiores com total serenidade interior.",
    quiz: [
          {
                "id": "mus-1",
                "question": "Qual é o efeito do fenômeno neuroacústico de \"entrainment\" no cérebro durante a leitura com metrônomo?",
                "options": [
                      "Induz o leitor a dormir após trinta segundos de treino",
                      "Sincroniza os disparos dos neurônios com a cadência rítmica, reduzindo hesitações e estabilizando a atenção",
                      "Provoca zumbidos permanentes no ouvido médio",
                      "Bloqueia totalmente a retenção de palavras com mais de seis letras"
                ],
                "correctIndex": 1,
                "explanation": "O entrainment alinha as oscilações neurais ao ritmo externo, aumentando a estabilidade do foco."
          }
    ]
  }
];

/**
 * Verifica se um texto coincide com algum item da lista de exclusão.
 * Trata IDs, títulos puros e títulos com prefixo de modalidade
 * (ex: "Metrônomo: O Homem que Sabia Javanês", "RSVP Turbo: O Homem que Sabia Javanês").
 */
export const READING_LIBRARY: ReadingText[] = RAW_READING_LIBRARY.map(t => {
  if (t.difficultyLevel && t.difficultyScore) return t;
  const diff = calculateTextDifficulty(t.text);
  return {
    ...t,
    difficultyLevel: t.difficultyLevel || diff.level,
    difficultyScore: t.difficultyScore || diff.score
  };
});

export function isTextExcluded(item: ReadingText, excludeIds: string[] = []): boolean {
  if (!excludeIds || excludeIds.length === 0) return false;
  const cleanTitle = item.title.trim().toLowerCase();
  const cleanId = item.id.trim().toLowerCase();

  return excludeIds.some(raw => {
    if (!raw) return false;
    const cleanRaw = raw.replace(/^(Metrônomo|RSVP Turbo|RSVP|Blocos|Teste):\s*/i, '').trim().toLowerCase();
    return (
      cleanRaw === cleanId ||
      cleanRaw === cleanTitle ||
      cleanRaw.includes(cleanTitle) ||
      cleanTitle.includes(cleanRaw)
    );
  });
}

/**
 * Seleciona um texto para teste de diagnóstico ou aferição (+50%),
 * calibrado automaticamente pelo motor de recomendação.
 */
export function getRandomAssessmentText(excludeIds: string[] = []): ReadingText {
  return getRecommendedTextForUser(null, excludeIds, 'assessment', READING_LIBRARY, true);
}

/**
 * Seleciona um texto aleatório para exercícios gerais (RSVP, Metrônomo, Blocos),
 * calibrado pelo motor de recomendação inteligente.
 */
export function getRandomExerciseText(excludeIds: string[] = []): ReadingText {
  return getRecommendedTextForUser(null, excludeIds, 'exercise', READING_LIBRARY, false);
}

/**
 * Calcula métricas objetivas de complexidade e dificuldade léxica para um texto em PT-BR.
 */
export function calculateTextDifficulty(text: string): {
  level: number;
  score: number;
  avgWordLength: number;
  complexRatio: number;
} {
  const words = text.match(/[a-záàâãéêíóôõúçA-ZÁÀÂÃÉÊÍÓÔÕÚÇ]+/g) || [];
  if (words.length === 0) {
    return { level: 1, score: 0, avgWordLength: 0, complexRatio: 0 };
  }

  const totalWords = words.length;
  const totalChars = words.reduce((acc, w) => acc + w.length, 0);
  const avgWordLength = totalChars / totalWords;

  const complexWords = words.filter(w => w.length >= 8);
  const complexRatio = complexWords.length / totalWords;

  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const totalSentences = Math.max(1, sentences.length);
  const avgSentenceLength = totalWords / totalSentences;

  const uniqueWords = new Set(words.map(w => w.toLowerCase()));
  const lexicalDiversity = uniqueWords.size / totalWords;

  const rawScore = (avgWordLength * 8) + (complexRatio * 60) + (avgSentenceLength * 0.4) + (lexicalDiversity * 20);
  const score = Math.round(rawScore * 10) / 10;

  let level = 1;
  if (score >= 95) level = 5;       // Desafiador / Mestre (> 440 PPM)
  else if (score >= 82) level = 4;  // Avançado (340 - 440 PPM)
  else if (score >= 70) level = 3;  // Intermediário (250 - 340 PPM)
  else if (score >= 58) level = 2;  // Básico (180 - 250 PPM)
  else level = 1;                   // Iniciante (< 180 PPM)

  return {
    level,
    score,
    avgWordLength: Math.round(avgWordLength * 10) / 10,
    complexRatio: Math.round(complexRatio * 100) / 100
  };
}

/**
 * Motor de Seleção e Recomendação Automática de Textos.
 * Analisa o perfil do usuário (PPM atual, taxa de compreensão e histórico de leituras)
 * e seleciona o texto ideal com nível de dificuldade compatível, sem exigir qualquer
 * escolha manual por parte do usuário.
 */
export function getRecommendedTextForUser(
  user: any | null,
  exclusions: string[] = [],
  exerciseType?: string,
  pool: ReadingText[] = READING_LIBRARY,
  requiresQuiz: boolean = false
): ReadingText {
  // 1. Determina o nível de desafio ideal (1 a 5) com base no desempenho
  let targetLevel = 2; // Padrão equilibrado
  if (user) {
    const currentWpm = user.currentWpm > 0 ? user.currentWpm : user.baselineWpm;
    if (currentWpm > 0) {
      if (currentWpm < 180) targetLevel = 1;
      else if (currentWpm < 250) targetLevel = 2;
      else if (currentWpm < 340) targetLevel = 3;
      else if (currentWpm < 440) targetLevel = 4;
      else targetLevel = 5;
    }

    // Ajuste por taxa de retenção/compreensão
    if (user.testsCompleted >= 2 && user.averageComprehension >= 85) {
      targetLevel = Math.min(5, targetLevel + 1);
    } else if (user.testsCompleted >= 1 && user.averageComprehension < 60) {
      targetLevel = Math.max(1, targetLevel - 1);
    }
  }

  // 2. Normaliza lista de exclusões (limpa prefixos de modalidade)
  const cleanExclusions = new Set(
    exclusions.map(ex =>
      (ex || '').toLowerCase().replace(/^(metrônomo|rsvp turbo|rsvp|blocos|teste):\s*/i, '').trim()
    ).filter(x => x.length > 0)
  );

  // 3. Filtra candidatos da biblioteca
  let candidates = pool.filter(text => {
    if (requiresQuiz && (!text.quiz || text.quiz.length === 0)) return false;
    const lowerId = text.id.toLowerCase().trim();
    const lowerTitle = text.title.toLowerCase().trim();
    if (cleanExclusions.has(lowerId) || cleanExclusions.has(lowerTitle)) return false;
    return true;
  });

  // Se todos os textos foram lidos recentemente, reabre a biblioteca evitando estritamente o mais recente
  if (candidates.length === 0) {
    const mostRecent = exclusions.length > 0
      ? exclusions[0].toLowerCase().replace(/^(metrônomo|rsvp turbo|rsvp|blocos|teste):\s*/i, '').trim()
      : '';
    candidates = pool.filter(text => {
      if (requiresQuiz && (!text.quiz || text.quiz.length === 0)) return false;
      const lowerId = text.id.toLowerCase().trim();
      const lowerTitle = text.title.toLowerCase().trim();
      return lowerId !== mostRecent && lowerTitle !== mostRecent;
    });
  }

  if (candidates.length === 0) {
    candidates = pool.filter(text => !requiresQuiz || (text.quiz && text.quiz.length > 0));
  }

  if (candidates.length === 0) {
    return pool[0];
  }

  // 4. Seleciona o texto mais próximo do nível alvo do usuário
  const exactMatches = candidates.filter(t => (t.difficultyLevel || 2) === targetLevel);
  if (exactMatches.length > 0) {
    const randomIndex = Math.floor(Math.random() * exactMatches.length);
    return exactMatches[randomIndex];
  }

  const adjacentMatches = candidates.filter(t => Math.abs((t.difficultyLevel || 2) - targetLevel) === 1);
  if (adjacentMatches.length > 0) {
    const randomIndex = Math.floor(Math.random() * adjacentMatches.length);
    return adjacentMatches[randomIndex];
  }

  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
}
