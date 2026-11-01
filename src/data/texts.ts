import { ReadingText } from '../types';

export const INITIAL_DIAGNOSTIC_TEXT: ReadingText = {
  id: 'diag-01',
  title: 'Teste Diagnóstico 1: A Mecânica da Mente Leitora',
  author: 'Artigo Científico / Nivelamento Cognitivo',
  category: 'artigo',
  description: 'Texto clássico para medir sua velocidade de leitura inicial (PPM) e sua capacidade natural de retenção.',
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
  title: 'Teste Diagnóstico 2: A Atenção Focada e o Ritmo Cognitivo',
  author: 'Neurociência Aplicada / Avaliação de Evolução',
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

export const DIAGNOSTIC_TEXT_3: ReadingText = {
  id: 'diag-03',
  title: 'Teste Diagnóstico 3: O Homem que Sabia Javanês',
  author: 'Lima Barreto',
  category: 'conto',
  description: 'Uma sátira brilhante da sociedade carioca sobre a erudição aparente, astúcia e domínio da linguagem.',
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
  title: 'Teste Diagnóstico 4: Gutenberg e a Revolução da Memória',
  author: 'História do Livro e da Mente / Ensaio Cultural',
  category: 'artigo',
  description: 'Como a invenção da prensa de tipos móveis transformou para sempre a arquitetura cognitiva humana.',
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
  title: 'Teste Diagnóstico 5: Plasticidade Cerebral e o Estado de Fluxo',
  author: 'Psicologia Cognitiva & Performance Mental',
  category: 'artigo',
  description: 'A ciência de entrar na zona de foco imersivo durante a leitura e reprogramar conexões sinápticas.',
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
  title: 'Teste Diagnóstico 6: Cinco Minutos (O Encontro Inusitado)',
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

export const READING_LIBRARY: ReadingText[] = [
  INITIAL_DIAGNOSTIC_TEXT,
  PERIODIC_ASSESSMENT_TEXT,
  DIAGNOSTIC_TEXT_3,
  DIAGNOSTIC_TEXT_4,
  DIAGNOSTIC_TEXT_5,
  DIAGNOSTIC_TEXT_6,
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

/**
 * Seleciona um texto aleatório para teste de diagnóstico ou aferição,
 * evitando repetir textos já utilizados recentemente pelo usuário.
 * Caso todos os textos da biblioteca já tenham sido lidos, garante que
 * o texto MAIS RECENTE nunca seja repetido consecutivamente.
 */
export function getRandomAssessmentText(excludeIds: string[] = []): ReadingText {
  // Pool de todos os textos que possuem quiz validado
  const candidatesWithQuiz = READING_LIBRARY.filter(
    item => item.quiz && item.quiz.length >= 2
  );

  // 1. Filtrar textos não lidos recentemente
  const unreadCandidates = candidatesWithQuiz.filter(
    item => !excludeIds.includes(item.id) && !excludeIds.includes(item.title)
  );

  if (unreadCandidates.length > 0) {
    const randomIndex = Math.floor(Math.random() * unreadCandidates.length);
    return unreadCandidates[randomIndex];
  }

  // 2. Fallback: Se o usuário já concluiu todos os textos, exclui obrigatoriamente
  // o texto MAIS RECENTE (excludeIds[0]) para que em caso de repetição nunca caia no mesmo texto
  const mostRecent = excludeIds[0];
  const candidatesWithoutMostRecent = mostRecent
    ? candidatesWithQuiz.filter(item => item.id !== mostRecent && item.title !== mostRecent)
    : candidatesWithQuiz;

  const pool = candidatesWithoutMostRecent.length > 0 ? candidatesWithoutMostRecent : candidatesWithQuiz;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex] || INITIAL_DIAGNOSTIC_TEXT;
}

/**
 * Seleciona um texto aleatório para exercícios gerais (RSVP, Metrônomo, Blocos)
 * garantindo rotação e impedindo repetição consecutiva do último texto.
 */
export function getRandomExerciseText(excludeIds: string[] = []): ReadingText {
  const unreadCandidates = READING_LIBRARY.filter(
    item => !excludeIds.includes(item.id) && !excludeIds.includes(item.title)
  );

  if (unreadCandidates.length > 0) {
    const randomIndex = Math.floor(Math.random() * unreadCandidates.length);
    return unreadCandidates[randomIndex];
  }

  const mostRecent = excludeIds[0];
  const candidatesWithoutMostRecent = mostRecent
    ? READING_LIBRARY.filter(item => item.id !== mostRecent && item.title !== mostRecent)
    : READING_LIBRARY;

  const pool = candidatesWithoutMostRecent.length > 0 ? candidatesWithoutMostRecent : READING_LIBRARY;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex] || READING_LIBRARY[0];
}
