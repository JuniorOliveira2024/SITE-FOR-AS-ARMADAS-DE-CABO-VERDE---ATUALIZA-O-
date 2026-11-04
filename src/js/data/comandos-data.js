/* ============================================================
   Conteúdo das páginas de Órgãos e Comandos + Ministro da Defesa.
   É AQUI que se atualizam nomes, postos e datas quando houver mudança de comando.

   Fontes (pesquisa de out/2026): Decreto-Lei n.º 12/2026, de 13 de março (orgânica das Forças Armadas);
   Boletim Oficial (Despachos n.º 9/2026 e 10/2026); fa.gov.cv (tomadas de posse, jan–mai/2026);
   governo.cv (Governo da XI Legislatura, posse em 19 de junho de 2026).

   FOTOGRAFIAS E BRASÕES — basta colocar o ficheiro na pasta indicada, SEM mexer em código:
     assets/images/comandantes/<nome>.jpg|png|webp   → fotografia do comandante
     assets/images/brasoes/<nome>.png|jpg|webp        → brasão (já inseridos: rm1, rm2, rm3)
   assets/images/guarda-nacional.png                → emblema do topo da página da Guarda Nacional (heroCrest)
     assets/images/governo/ministro-defesa.jpg        → fotografia do Ministro
   assets/images/comandantes/vice-cemfa.jpg         → fotografia do Vice-CEMFA
   Nomes esperados: ver assets/images/LEIA-ME-IMAGENS.txt
   Enquanto o ficheiro não existir, aparece um espaço reservado com a legenda.
   ============================================================ */

/* Grupos partilhados pelas abas Escola Militar, CIMMB e Programa Soldado Cidadão */
const FA_FORMACAO_RELACAO = {
  title: 'Como se relacionam: Escola Militar, CIMMB e Programa Soldado Cidadão', layout: 'definitions',
  entries: [
    { label: 'Escola Militar', value: 'Formação e aperfeiçoamento dos quadros militares: oficiais, sargentos e praças, cursos de promoção, tirocínios, doutrina e estudos militares.' },
    { label: 'CIMMB — Morro Branco', value: 'Formação militar inicial e especializada: recrutas, preparação militar básica, especializações, cabos, sargentos, oficiais, fuzileiros e marinheiros.' },
    { label: 'Programa Soldado Cidadão', value: 'Formação profissional e civil do militar (informática, mecânica, eletricidade, construção, agricultura, hotelaria, condução…), com o objetivo de aumentar a empregabilidade e facilitar a reinserção na vida civil.' }
  ]
};
const faRelacao = (text, links) => ({ ...FA_FORMACAO_RELACAO, text: text + ' Estrutura: Forças Armadas → CEMFA → Escola Militar e CIMMB; e, transversalmente, o Programa Soldado Cidadão.', links });
const FA_FORMACAO_LINKS = { title: 'Ingresso, notícias e contactos', links: [{ label: 'Ver concursos e incorporações', href: 'concursos.html', button: true }, { label: 'Notícias', href: 'noticias.html' }, { label: 'Contactos', href: 'contactos.html' }] };

window.FA_COMANDOS = {

  /* ======================= GUARDA NACIONAL ======================= */
  'guarda-nacional': {
    heroCrest: { src: 'assets/images/guarda-nacional.png', alt: 'Brasão da Guarda Nacional — Sempre Vigilante' },
    intro: 'Ramo das Forças Armadas destinado à defesa militar do país, através de operações terrestres e anfíbias, e ao apoio à segurança interna. Está organizado territorialmente em três Regiões Militares.',
    responsible: {
      title: 'Comandante', office: 'Comandante da Guarda Nacional',
      name: 'Júlio César Melicio Pires de Melo Sancha', rank: 'Tenente-Coronel',
      period: 'Nomeado por Despacho n.º 10/2026, de 30 de janeiro de 2026',
      biography: 'Nomeado Comandante da Guarda Nacional, sob proposta do Chefe do Estado-Maior das Forças Armadas, no âmbito da renovação dos ciclos de comando, sucedendo ao Capitão-de-Navio Silvino Monteiro Chantre.',
      photoBase: 'assets/images/comandantes/guarda-nacional'
    },
    groups: [
      { title: 'Missão', text: 'Constituem missões da Guarda Nacional:', items: [
        'Assegurar a defesa militar do país',
        'Executar, no seu âmbito, a declaração do estado de sítio ou de emergência',
        'Prevenir e combater o terrorismo e garantir a segurança dos órgãos de soberania e de outros objetivos estratégicos',
        'Colaborar com as autoridades competentes na segurança de pessoas e bens e no combate ao tráfico de estupefacientes, armas e pessoas e a outras formas de criminalidade organizada',
        'Participar no sistema nacional de proteção civil',
        'Cumprir missões no âmbito dos compromissos internacionais assumidos',
        'Colaborar na proteção do meio ambiente e na melhoria das condições de vida das populações'
      ] },
      { title: 'Composição', text: 'A Guarda Nacional está organizada territorialmente e compreende o corpo de Polícia Militar, o corpo de Artilharia, a Unidade de Operações Especiais e as unidades de apoio. Desde a revisão orgânica de 2026 (Decreto-Lei n.º 12/2026, de 13 de março), o corpo dos Fuzileiros Navais deixou de integrar a Guarda Nacional e passou para a Guarda Costeira.', items: [
        'Corpo de Polícia Militar — poder de polícia no âmbito das Forças Armadas',
        'Corpo de Artilharia — apoio de fogo às forças terrestres e defesa contra aeronaves e navios',
        'Unidade de Operações Especiais (UOE) — intervenção rápida, contraterrorismo e resposta a crises',
        'Unidades de apoio'
      ] },
      { title: 'Estrutura do Comando', items: [
        'Comandante',
        '2.º Comandante (chefe do Centro de Operações)',
        'Centro de Operações da Guarda Nacional',
        'Direção de Logística e Apoio de Serviços',
        'Secretaria do Comando',
        'Conselho de Comandos'
      ] },
      { title: 'Regiões Militares (Comandos Territoriais)', text: 'Os Comandos Territoriais asseguram, nas respetivas áreas de jurisdição, a prontidão das unidades operacionais. Cada Região Militar tem o seu comandante e o seu brasão, apresentados a seguir.' },
      { title: '1ª Região Militar', id: 'regiao-1', layout: 'unit',
        sede: 'Mindelo, ilha de São Vicente',
        jurisdicao: 'Santo Antão, São Vicente, Santa Luzia, São Nicolau e ilhéus Branco e Raso',
        text: 'Tem sob a sua dependência funcional o Centro de Instrução Militar do Morro Branco (CIMMB).',
        crest: { base: 'assets/images/brasoes/rm1', label: 'Brasão da 1ª Região Militar' },
        commander: { name: 'Adilson César Dias Fortes', rank: 'Major', since: 'Tomou posse em março de 2024', base: 'assets/images/comandantes/rm1', label: 'Fotografia do Comandante da 1ª Região Militar' }
      },
      { title: '2ª Região Militar', id: 'regiao-2', layout: 'unit',
        sede: 'Espargos, ilha do Sal',
        jurisdicao: 'Ilha do Sal e ilha da Boa Vista',
        text: 'Entre as suas missões conta-se a proteção de instalações estratégicas, incluindo o Aeroporto Internacional Amílcar Cabral e outras infraestruturas.',
        crest: { base: 'assets/images/brasoes/rm2', label: 'Brasão da 2ª Região Militar' },
        commander: { name: 'Jorge Silva Landim', rank: 'Major', since: 'Tomou posse em 5 de janeiro de 2026', base: 'assets/images/comandantes/rm2', label: 'Fotografia do Comandante da 2ª Região Militar' }
      },
      { title: '3ª Região Militar', id: 'regiao-3', layout: 'unit',
        sede: 'Cidade da Praia, ilha de Santiago',
        jurisdicao: 'Santiago, Maio, Fogo, Brava e ilhéus Secos',
        text: 'É a Região Militar com maior área de jurisdição e maior número de efetivos. Integra, entre outras, companhias de Polícia Militar e unidades de artilharia e defesa aérea.',
        crest: { base: 'assets/images/brasoes/rm3', label: 'Brasão da 3ª Região Militar' },
        commander: { name: 'Roberto Moreno Tavares', rank: 'Major', since: 'Tomou posse em 6 de fevereiro de 2026', base: 'assets/images/comandantes/rm3', label: 'Fotografia do Comandante da 3ª Região Militar' }
      },
      { title: 'Brasão e Guião', text: 'Espaço reservado para os símbolos oficiais da Guarda Nacional e respetiva descrição.' },
      { title: 'Galeria, notícias e contactos', links: [{ label: 'Notícias', href: 'noticias.html' }, { label: 'Multimédia', href: 'multimedia.html' }, { label: 'Contactos', href: 'contactos.html' }] }
    ]
  },

  /* ======================= GUARDA COSTEIRA ======================= */
  'guarda-costeira': {
    intro: 'Ramo das Forças Armadas destinado à defesa e proteção dos interesses económicos do país no mar sob jurisdição nacional, à garantia da autoridade do Estado no mar e ao apoio aéreo e naval às operações terrestres e anfíbias.',
    responsible: {
      title: 'Comandante', office: 'Comandante da Guarda Costeira',
      name: 'Kahbi Yassine Fonseca Pereira Batista', rank: 'Capitão-de-Navio',
      period: 'Tomou posse em 8 de janeiro de 2026',
      biography: 'Tomou posse como Comandante da Guarda Costeira em cerimónia realizada no Palácio do Governo, na Cidade da Praia, com a presença do Chefe do Estado-Maior das Forças Armadas.',
      photoBase: 'assets/images/comandantes/guarda-costeira'
    },
    groups: [
      { title: 'Missão', text: 'Constituem missões da Guarda Costeira:', items: [
        'Assegurar a defesa militar do país e o apoio aéreo e naval às demais missões das Forças Armadas',
        'Patrulhar o espaço aéreo e marítimo sob jurisdição nacional, incluindo a zona económica exclusiva, com perseguição, abordagem e apresamento de embarcações em atividades ilícitas (pesca ilegal, poluição marítima, infrações aduaneiras)',
        'Garantir a salvaguarda da vida humana no mar e coordenar operações de busca e salvamento',
        'Colaborar no combate à imigração clandestina e ao tráfico de estupefacientes, armas e pessoas',
        'Exercer funções de autoridade marítima atribuídas por lei',
        'Participar no sistema nacional de proteção civil e na proteção do meio ambiente'
      ] },
      { title: 'Composição', text: 'A Guarda Costeira compreende o corpo dos Fuzileiros Navais, as forças e meios navais, as forças e meios aéreos e as forças e meios em terra.', items: [
        'Fuzileiros Navais — força especial para operações de segurança, defesa e combate no mar e em terra, incluindo operações anfíbias e missões de paz e ajuda humanitária',
        'Forças e meios navais',
        'Forças e meios aéreos',
        'Forças e meios em terra'
      ] },
      { title: 'Estrutura do Comando', items: [
        'Comandante e 2.º Comandante',
        'Centro de Operações da Guarda Costeira',
        'Direção de Logística e Apoio de Serviços (inclui o Serviço de Saúde)',
        'Secretaria do Comando',
        'Conselho de Comandos'
      ] },
      { title: 'Esquadrilha Naval', id: 'esquadrilha-naval', layout: 'unit',
        sede: 'Mindelo, São Vicente',
        photo: 'assets/images/unidades/esquadrilha-naval.jpg',
        photoAlt: 'Porto Grande e baía do Mindelo, São Vicente',
        photoCaption: 'Porto Grande · Mindelo, São Vicente',
        text: 'Elemento da Guarda Costeira destinado a aprontar e manter forças e meios navais. Assegura a condução das operações navais, a vigilância e fiscalização marítima e, em colaboração com as entidades competentes, as atividades de busca e salvamento.',
        commander: { name: 'Francisco Semedo Moreira', rank: 'Capitão-de-Patrulha', since: 'Tomou posse em 28 de janeiro de 2026', base: 'assets/images/comandantes/esquadrilha-naval', label: 'Fotografia do Comandante da Esquadrilha Naval' }
      },
      { title: 'Esquadrilha Aérea', id: 'esquadrilha-aerea', layout: 'unit',
        sede: 'Sal — Espargos',
        photo: 'assets/images/unidades/esquadrilha-aerea.jpg',
        photoAlt: 'Aeroporto Internacional Amílcar Cabral, ilha do Sal',
        photoCaption: 'Aeroporto Internacional Amílcar Cabral · Sal',
        text: 'Elemento da Guarda Costeira destinado a aprontar e manter forças e meios aéreos. Assegura a vigilância e fiscalização a partir do ar, o patrulhamento, a busca e salvamento, a evacuação médica e o apoio às operações das Forças Armadas.',
        commander: { name: 'Hernane Pina Ribeiro', rank: 'Major', since: 'Tomou posse em 5 de janeiro de 2026', base: 'assets/images/comandantes/esquadrilha-aerea', label: 'Fotografia do Comandante da Esquadrilha Aérea' }
      },
      { title: 'COSMAR — Centro de Operações de Segurança Marítima', id: 'cosmar', layout: 'unit',
        sede: 'Cidade da Praia, Santiago',
        photo: 'assets/images/unidades/cosmar.jpg',
        photoAlt: 'Porto da Praia e frente marítima da Cidade da Praia',
        photoCaption: 'Porto da Praia · coordenação da segurança marítima',
        text: 'O COSMAR centraliza a monitorização e a coordenação operacional da segurança marítima nacional. Reúne informação sobre tráfego, atividades ilícitas e incidentes no mar, apoia a decisão do Comando da Guarda Costeira e articula a resposta das forças e meios navais, aéreos e terrestres com as entidades competentes.' },
      { title: 'JRCC — Centro Conjunto de Coordenação de Salvamento', id: 'jrcc', layout: 'unit',
        sede: 'Cidade da Praia, Santiago',
        photo: 'assets/images/unidades/jrcc.jpg',
        photoAlt: 'Costa da Cidade da Praia, Santiago',
        photoCaption: 'Costa da Praia · área de responsabilidade de busca e salvamento',
        text: 'O JRCC coordena, a nível nacional, as operações de busca e salvamento marítimo e aeronáutico. Recebe e trata os pedidos de socorro, ativa os meios disponíveis e articula a resposta com a Guarda Costeira, a Proteção Civil, as forças de segurança e os parceiros internacionais, no quadro do sistema nacional de salvamento.' },
      { title: 'Meios', text: 'Inventário e especificações dos meios navais e aéreos: publicar após confirmação institucional.' },
      { title: 'Brasão, Guião e Patrono', text: 'Espaços reservados para símbolos oficiais, identificação do patrono e respetiva informação confirmada.' },
      { title: 'Dia da Guarda Costeira', text: '11 de outubro, conforme a Resolução n.º 6/2010.' },
      { title: 'Galeria, notícias e contactos', links: [{ label: 'Notícias', href: 'noticias.html' }, { label: 'Multimédia', href: 'multimedia.html' }, { label: 'Contactos', href: 'contactos.html' }] }
    ]
  },

  /* ======================= COMANDO DO PESSOAL ======================= */
  'comando-pessoal': {
    intro: 'Órgão central de comando responsável pelos recursos humanos das Forças Armadas, de acordo com os planos e diretivas do Chefe do Estado-Maior das Forças Armadas.',
    responsible: {
      title: 'Comandante', office: 'Comandante do Pessoal',
      name: 'Carlos Gomes Dias', rank: 'Tenente-Coronel',
      period: 'Tomou posse em 8 de janeiro de 2026',
      biography: 'Tomou posse como Comandante do Pessoal em cerimónia realizada no Palácio do Governo, na Cidade da Praia, conjuntamente com os Comandantes da Logística e da Guarda Costeira.',
      photoBase: 'assets/images/comandantes/comando-pessoal'
    },
    groups: [
      { title: 'Missão', text: 'Ao Comando do Pessoal incumbe, entre outras atribuições:', items: [
        'Executar a política de gestão de recursos humanos das Forças Armadas',
        'Manter organizadas e atualizadas as fichas biográficas e o sistema de informação de apoio à gestão do pessoal',
        'Programar a instrução militar dos conscritos e contratados, o tirocínio dos candidatos a oficiais dos quadros permanentes e a formação técnica',
        'Promover a ação cívica e patriótica, a educação física e desportiva e as ações culturais',
        'Executar as atribuições definidas na lei do serviço militar obrigatório e do serviço cívico',
        'Programar, acompanhar e controlar a execução de cursos no país e no estrangeiro',
        'Tratar a avaliação do mérito e do desempenho e distribuir os efetivos pelas unidades e órgãos'
      ] },
      { title: 'Direções do Comando do Pessoal', text: 'É constituído por cinco direções, cuja estrutura e missões estão publicadas oficialmente:', layout: 'definitions', entries: [
        { label: 'Direção de Administração do Pessoal', value: 'Gestão dos efetivos e dos recursos humanos' },
        { label: 'Direção de Formação e Instrução', value: 'Formação, instrução, educação física e desporto' },
        { label: 'Direção dos Serviços de Saúde', value: 'Saúde militar, Policlínica Militar e unidades sanitárias' },
        { label: 'Direção dos Serviços de Justiça e Disciplina', value: 'Justiça e disciplina militar' },
        { label: 'Direção dos Serviços de Ação Cívica', value: 'Educação cívica, cultura, moral e bem-estar' }
      ] },
      { title: 'Dependência técnica', text: 'O Comando do Pessoal tem ainda dependência técnica sobre:', items: [
        'Centros e campos de instrução',
        'Escolas e cursos militares',
        'Centro dos Pupilos das Forças Armadas',
        'Estruturas de recrutamento e mobilização'
      ] },
      { title: 'Ingresso nas fileiras', text: 'Consulte os concursos abertos, as incorporações e a legislação do serviço militar.', links: [{ label: 'Ver todos os concursos', href: 'concursos.html', button: true }] },
      { title: 'Notícias, galeria e contactos', links: [{ label: 'Notícias', href: 'noticias.html' }, { label: 'Multimédia', href: 'multimedia.html' }, { label: 'Contactos', href: 'contactos.html' }] }
    ]
  },

  /* ======================= COMANDO DA LOGÍSTICA ======================= */
  'comando-logistica': {
    intro: 'Órgão central de comando responsável pela administração dos recursos materiais e financeiros das Forças Armadas, incluindo infraestruturas, transportes e comunicações, de acordo com os planos e diretivas do CEMFA.',
    responsible: {
      title: 'Comandante', office: 'Comandante da Logística',
      name: 'Carina Abade Lopes Batista', rank: 'Capitão-de-Navio',
      period: 'Tomou posse em 8 de janeiro de 2026',
      biography: 'Tomou posse como Comandante da Logística em cerimónia realizada no Palácio do Governo, na Cidade da Praia, juntamente com os Comandantes da Guarda Costeira e do Pessoal.',
      photoBase: 'assets/images/comandantes/comando-logistica'
    },
    groups: [
      { title: 'Missão', text: 'Administrar os recursos materiais e financeiros das Forças Armadas — orçamento, abastecimento, material, infraestruturas, transportes e comunicações — de acordo com os planos e diretivas do CEMFA.' },
      { title: 'Direções da Logística', layout: 'definitions', entries: [
        { label: 'Direção de Administração Financeira', value: 'Orçamento, contabilidade, auditoria e gestão financeira' },
        { label: 'Direção de Administração do Material', value: 'Abastecimento, material, transportes, fardamento e equipamentos' },
        { label: 'Direção de Infraestruturas e Obras', value: 'Quartéis, obras, património e manutenção' },
        { label: 'Direção de Comunicações', value: 'Telecomunicações, informática e sistemas de comunicação' }
      ] },
      { title: 'Oficina Central das Forças Armadas', id: 'oficina-central', text: 'Integra a estrutura do Comando da Logística e assegura a manutenção e reparação de viaturas e equipamentos das Forças Armadas.', links: [{ label: 'Ver página da Oficina Central', href: 'oficina-central.html' }] },
      { title: 'Notícias, galeria e contactos', links: [{ label: 'Notícias', href: 'noticias.html' }, { label: 'Multimédia', href: 'multimedia.html' }, { label: 'Contactos', href: 'contactos.html' }] }
    ]
  },

  /* ======================= ESCOLA MILITAR ======================= */
  'escola-militar': {
    intro: 'Estabelecimento na dependência direta do Chefe do Estado-Maior das Forças Armadas (CEMFA), com responsabilidade ampla sobre a formação, o aperfeiçoamento e a qualificação dos quadros militares.',
    responsible: {
      title: 'Diretora', office: 'Diretora da Escola Militar',
      name: 'Dilva Baptista', rank: 'Capitão-de-Navio',
      period: 'Função confirmada em visita oficial de fevereiro de 2026',
      biography: 'Exerce as funções de Diretora da Escola Militar, estabelecimento diretamente dependente do Chefe do Estado-Maior das Forças Armadas.',
      photoBase: 'assets/images/comandantes/escola-militar'
    },
    groups: [
      { title: 'Localização e contactos', layout: 'definitions', entries: [
        { label: 'Morada', value: 'Avenida Cidade de Lisboa, Várzea da Companhia — Praia' },
        { label: 'Telefones', value: '+238 333 83 68 · +238 333 83 67 · +238 333 83 56' },
        { label: 'Dependência', value: 'Diretamente do Chefe do Estado-Maior das Forças Armadas (CEMFA)' }
      ] },
      { title: 'Missão', layout: 'columns', text: 'A Escola Militar é responsável pela formação militar e pelos estudos relacionados com a doutrina, as técnicas e as ciências militares. Prepara:', columns: [
        { title: 'Oficiais', items: ['Para funções correspondentes a postos superiores', 'Para funções de comando, chefia e Estado-Maior', 'Através de cursos de promoção e de aperfeiçoamento'] },
        { title: 'Sargentos', items: ['Para funções de maior complexidade dentro das respetivas classes', 'Para ingresso e prestação de serviço nos quadros permanentes'] },
        { title: 'Praças', items: ['Formação militar básica e complementar', 'Preparação para diferentes especialidades'] }
      ] },
      { title: 'Atividades', items: [
        'Cursos, estágios e tirocínios',
        'Estudos militares e investigação',
        'Atualização da doutrina militar',
        'Formação de oficiais, sargentos e praças'
      ] },
      { title: 'Exemplo de formação em 2026', text: 'Decorreu na Escola Militar o Curso de Promoção a Capitão (CPC 2026), entre fevereiro e abril de 2026, com 19 oficiais participantes, ministrado conjuntamente por pessoal de Cabo Verde e de Portugal. A formação incidiu especialmente em comando, chefia, Estado-Maior e desenvolvimento profissional dos oficiais.' },
      faRelacao('A Escola Militar é diferente do CIMMB: este concentra-se na formação inicial dos recrutas e em determinadas especialidades, enquanto a Escola Militar tem uma responsabilidade muito mais ampla sobre a formação, o aperfeiçoamento e a qualificação dos quadros.',
        [{ label: 'Ver CIMMB', href: 'cimmb.html' }, { label: 'Ver Programa Soldado Cidadão', href: 'programa-soldado-cidadao.html' }]),
      FA_FORMACAO_LINKS
    ]
  },

  /* ======================= CIMMB ======================= */
  'cimmb': {
    intro: 'Órgão territorial destinado principalmente à formação inicial e especializada dos militares, tanto do pessoal conscrito como dos militares em regime de contrato, funcionalmente subordinado ao Comando da 1.ª Região Militar.',
    responsible: {
      title: 'Diretor', office: 'Diretor do CIMMB',
      name: 'José Paris Morais', rank: 'Major',
      period: 'Último titular identificado em publicação oficial de novembro de 2024 (a confirmar para 2026)',
      biography: 'Identificado como Capitão em 2022 e como Major em novembro de 2024. Não foi encontrada, nas publicações oficiais de 2026 consultadas, tomada de posse ou substituição que permita confirmar a sua continuidade no cargo; esta informação será atualizada após confirmação oficial.',
      photoBase: 'assets/images/comandantes/cimmb'
    },
    groups: [
      { title: 'Localização e contacto', layout: 'definitions', entries: [
        { label: 'Localidade', value: 'Morro Branco / Lazareto, ilha de São Vicente' },
        { label: 'Telefone', value: '+238 232 52 08 (publicado pelas Forças Armadas)' },
        { label: 'Dependência', value: 'Funcionalmente subordinado ao Comando da 1.ª Região Militar' },
        { label: 'Capacidade', value: 'Aproximadamente 450 militares' },
        { label: 'Incorporações', value: 'Normalmente duas por ano' }
      ] },
      { title: 'Missão', text: 'Órgão territorial destinado principalmente à formação inicial e especializada dos militares, conscritos e em regime de contrato; pode também ministrar formação aos militares dos quadros permanentes. Entre as suas atribuições estão:', items: [
        'Preparação militar básica',
        'Formação especializada das praças',
        'Formação de cabos, de sargentos e de oficiais',
        'Tirocínios',
        'Cursos de especialização, de aperfeiçoamento e de atualização'
      ] },
      { title: 'Cursos indicados oficialmente', text: 'O Centro ministra, entre outros:', items: [
        'Curso de Formação de Oficiais — SEN',
        'Curso de Formação de Sargentos — SEN',
        'Curso de Promoção a Cabo',
        'Tirocínios',
        'Curso de Formação de Fuzileiros',
        'Curso de Formação de Marinheiros'
      ] },
      { title: 'Organização', layout: 'columns', columns: [
        { title: 'Organização interna', text: 'O CIMMB compreende:', items: ['Diretor', 'Conselho Escolar', 'Gabinete de Instrução', 'Grupo de Apoio de Serviços'] },
        { title: 'Organização da instrução', text: 'Militarmente, a instrução está organizada em:', items: ['Batalhão de Instrução', 'Companhias de Instrução', 'Pelotões de Instrução'] }
      ] },
      { title: 'Como é a formação dos recrutas?', text: 'Segundo a informação oficial mais recente, sobre a 1.ª Incorporação de 2026, os recrutas recebem formação em áreas como:', items: [
        'Preparação física e Ordem Unida',
        'Armamento e tiro',
        'Saúde, higiene e primeiros socorros',
        'Educação moral, cívica e militar',
        'Disciplina e valores militares',
        'Camaradagem, lealdade e patriotismo',
        'Respeito pela hierarquia'
      ] },
      { title: 'Incorporações em números', items: [
        '2026: uma incorporação contou com cerca de 293 recrutas, incluindo 6 mulheres',
        '2024: uma incorporação teve 319 recrutas, com um período de formação de 10 semanas, dividido entre Preparação Militar Básica e Especialização'
      ] },
      { title: 'História', wide: true, text: 'O Centro foi criado em 1949, tendo funcionado inicialmente como estrutura militar portuguesa, incluindo a Bateria de Artilharia de Costa n.º 2 e, posteriormente, uma companhia de caçadores. Depois da Independência passou para a estrutura das Forças Armadas cabo-verdianas e, em 1 de dezembro de 1984, recebeu o nome Zeca Santos, em homenagem a José Henrique dos Santos, combatente da liberdade da Pátria. O Dia do CIMMB é comemorado a 6 de fevereiro.' },
      faRelacao('O CIMMB forma militarmente o recruta; o Programa Soldado Cidadão aproveita o período de serviço militar para proporcionar ao jovem qualificação profissional e preparação para a vida civil.',
        [{ label: 'Ver Escola Militar', href: 'escola-militar.html' }, { label: 'Ver Programa Soldado Cidadão', href: 'programa-soldado-cidadao.html' }]),
      FA_FORMACAO_LINKS
    ]
  },

  /* ======================= PROGRAMA SOLDADO CIDADÃO ======================= */
  'programa-soldado-cidadao': {
    intro: 'Programa de formação e capacitação profissional que aproveita o período de serviço militar para dar ao jovem qualificação profissional e preparação para a vida civil. É diferente do CIMMB: este forma militarmente o recruta; o PSC prepara-o para o emprego.',
    responsible: {
      title: 'Gestor do Programa', office: 'Gestor do Programa Soldado Cidadão',
      name: 'Júnior do Rósario', rank: 'Primeiro-Tenente',
      period: 'Último gestor identificado em informação oficial recente',
      biography: 'Realizou palestras aos recrutas da 2.ª incorporação de 2025 para explicar o funcionamento do programa e incentivar a participação nos cursos profissionais. O Gestor do Programa é nomeado por despacho dos membros do Governo responsáveis pelas Forças Armadas.',
      photoBase: 'assets/images/comandantes/gestor-psc'
    },
    groups: [
      { title: 'Quando foi criado?', text: 'O programa foi criado pela Resolução n.º 34/2007, de 22 de outubro, como política de formação profissional destinada a combater o desemprego juvenil e a facilitar a reinserção dos jovens na vida civil. Foi reestruturado pela Resolução n.º 177/X/2025 (Boletim Oficial, I Série, n.º 51, de 23 de junho de 2025).', links: [{ label: 'Resolução n.º 34/2007', href: 'https://boe.incv.cv/Bulletins/Download/351', external: true }, { label: 'Reestruturação de 2025', href: 'https://boe.incv.cv/Bulletins/Download/23618', external: true }] },
      { title: 'Quem pode participar?', text: 'Segundo a informação oficial publicada, podem participar militares:', items: [
        'Em regime de conscrição',
        'Em regime de contrato',
        'Na reformulação mais recente, também militares em outros regimes de prestação de serviço e militares em disponibilidade, dentro do período definido pelo programa',
        'Público principal: jovens em serviço militar, com menos de 30 anos e sem qualificação, que procuram uma qualificação profissional ou melhorar a formação académica'
      ] },
      { title: 'Objetivos', items: [
        'Dar uma profissão ao jovem militar',
        'Aumentar a empregabilidade e facilitar o acesso ao primeiro emprego',
        'Melhorar as qualificações académicas e profissionais',
        'Promover o empreendedorismo',
        'Ensinar ética e cidadania',
        'Facilitar a transição da vida militar para a vida civil'
      ] },
      { title: 'Condução', text: 'Um dos cursos mais procurados é o de formação de condutores. O programa disponibiliza formação para as categorias B, C, D e, com maior aposta, F. As aulas realizam-se, entre outros locais, no Sal, em São Vicente e na Oficina Central das Forças Armadas, na Praia, através de parcerias com escolas de condução.' },
      { title: 'Áreas de formação', wide: true, text: 'A lista oficial inclui diversas áreas. Os cursos podem abranger os níveis profissionais 1 a 5, conforme a formação.', layout: 'training', items: [
        'Pintura', 'Carpintaria', 'Canalização', 'Eletricidade', 'Eletrónica', 'Telecomunicações', 'Informática / TIC', 'Design e multimédia', 'Mecânica', 'Manutenção de motores',
        'Bate-chapa', 'Serralharia', 'Construção civil', 'Agricultura', 'Agropecuária', 'Gestão agropecuária', 'Hidroponia', 'Hotelaria e turismo', 'Secretariado', 'Administração',
        'Contabilidade', 'Cabeleireiro', 'Manicure', 'Pedicure', 'Massagem', 'Condução'
      ] },
      { title: 'Onde são realizados os cursos?', text: 'O PSC utiliza instituições de formação profissional acreditadas, incluindo:', items: ['IEFP', 'CERMI', 'EHTCV', 'Escolas de formação profissional', 'Centros de emprego e formação profissional', 'Academia Labanta', 'Outras instituições acreditadas'] },
      { title: 'Protocolos em 2024', text: 'Em 2024 foram celebrados protocolos para cursos de:', items: [
        'Manutenção de sistemas elétricos e eletrónicos de automóveis',
        'Manutenção de motores',
        'Programação',
        'Montagem de redes',
        'Canalização',
        'Produção de som e vídeo',
        'Acabamentos de construção civil'
      ] },
      faRelacao('O CIMMB forma militarmente o recruta; o Programa Soldado Cidadão procura aproveitar o período de serviço militar para proporcionar ao jovem qualificação profissional e preparação para a vida civil.',
        [{ label: 'Ver CIMMB', href: 'cimmb.html' }, { label: 'Ver Escola Militar', href: 'escola-militar.html' }]),
      FA_FORMACAO_LINKS
    ]
  },

  /* ======================= ESTADO-MAIOR: ÓRGÃOS CENTRAIS ======================= */
  'inspecao-forcas-armadas': {
    intro: 'Órgão do Estado-Maior das Forças Armadas, na dependência direta do CEMFA, com a missão de apoiar o EMFA no controlo e na avaliação, através de inspeções e auditorias.',
    responsible: {
      title: 'Inspetor', office: 'Inspetor das Forças Armadas',
      name: 'Silvino Monteiro Chantre', rank: 'Capitão-de-Navio',
      period: 'Tomou posse em 22 de maio de 2026 — nomeado Vice-CEMFA em agosto de 2026 (titular atual do cargo de Inspetor a confirmar)',
      biography: 'Tomou posse como Inspetor das Forças Armadas no Auditório do Edifício do Estado-Maior, em cerimónia presidida pelo Chefe do Estado-Maior das Forças Armadas. Em agosto de 2026 foi nomeado Vice-Chefe do Estado-Maior das Forças Armadas (Decreto Presidencial n.º 23/2026); o titular atual do cargo de Inspetor será confirmado pelas Forças Armadas.',
      photoBase: 'assets/images/comandantes/inspecao-forcas-armadas'
    },
    groups: [
      { title: 'Missão e competências', items: [
        'Elaborar o plano anual de inspeção',
        'Fiscalizar a administração dos meios humanos, materiais e financeiros das Forças Armadas',
        'Avaliar a eficácia e a eficiência da ação das Forças Armadas',
        'Realizar inspeções e auditorias, inquéritos e sindicâncias',
        'Apreciar a legalidade e a regularidade dos atos praticados',
        'Acompanhar a implementação de ações corretivas'
      ] },
      { title: 'Notícias e contactos', links: [{ label: 'Notícias', href: 'noticias.html' }, { label: 'Contactos', href: 'contactos.html' }] }
    ]
  },

  'direcao-informacoes-militares': {
    intro: 'Estrutura de apoio ao Estado-Maior das Forças Armadas, integrada no Sistema de Informações da República, que se ocupa exclusivamente da produção de informações militares com vista a garantir a segurança militar.',
    responsible: {
      title: 'Diretor', office: 'Diretor de Informações Militares',
      name: 'José Mário Lopes Tavares', rank: 'Capitão-de-Navio',
      period: 'Tomou posse em 6 de fevereiro de 2026',
      biography: 'Tomou posse como Diretor de Informações Militares no Auditório do Edifício do Estado-Maior das Forças Armadas, em cerimónia realizada em simultâneo com a posse do Comandante da Terceira Região Militar.',
      photoBase: 'assets/images/comandantes/direcao-informacoes-militares'
    },
    groups: [
      { title: 'Missão', items: [
        'Produzir informações militares e contrainformação para a avaliação permanente das ameaças à segurança militar',
        'Garantir a segurança militar e o cumprimento das missões constitucionais das Forças Armadas',
        'Assegurar a ligação das Forças Armadas aos serviços do Sistema de Informações da República',
        'Recolher e disseminar informação geoespacial de apoio às operações',
        'Planear a formação e o treino em informações, contrainformação e segurança militar'
      ] },
      { title: 'Estrutura', items: ['Serviço de Análise de Informação e Contrainformação', 'Serviço de Análise de Informações de Inteligência'] }
    ]
  },

  'planeamento-estrategico': {
    intro: 'Órgão do Estado-Maior das Forças Armadas que presta apoio ao EMFA no âmbito do planeamento estratégico-militar.',
    groups: [
      { title: 'Missão', items: [
        'Elaborar estudos, planos e pareceres sobre a organização da Nação para a guerra e a participação das Forças Armadas em compromissos militares internacionais',
        'Definir o ciclo de planeamento estratégico-militar e o planeamento de forças',
        'Analisar o ambiente estratégico nacional, regional e internacional com impacto na defesa e segurança',
        'Elaborar a programação militar e a doutrina militar conjunta',
        'Propor normas e diretivas para a gestão dos recursos humanos, materiais e financeiros'
      ] },
      { title: 'Estrutura', text: 'É dirigido por um Diretor, com posto de Tenente-Coronel ou Capitão-de-Navio, e integra o Grupo Técnico, composto por oficiais designados pelo CEMFA.' }
    ]
  },

  'comando-guarnicao': {
    intro: 'A Guarnição do Estado-Maior das Forças Armadas (GEMFA) é a unidade que presta apoio direto ao funcionamento do Estado-Maior e dos órgãos centrais das Forças Armadas. Não se confunde com o comando de uma Região Militar.',
    responsible: {
      title: 'Comandante', office: 'Comandante da Guarnição do EMFA · Diretor dos Serviços de Apoio Geral (DSAG)',
      name: 'Manuel Mendes Nunes', rank: 'Major',
      period: 'Identificado oficialmente pelas Forças Armadas em abril de 2026',
      biography: 'Exerce também, por inerência, a função de Diretor dos Serviços de Apoio Geral (DSAG): o Diretor dos Serviços de Apoio Geral desempenha, por inerência, a função de Comandante da Guarnição do EMFA.',
      photoBase: 'assets/images/comandantes/comando-guarnicao'
    },
    groups: [
      { title: 'Distinção importante', text: 'Trata-se do Comando da Guarnição do Estado-Maior das Forças Armadas (GEMFA), com sede no Quartel Jaime Mota, no Plateau, Cidade da Praia. Não é o comando de uma Região Militar.' },
      { title: 'Localização e contacto', layout: 'definitions', entries: [
        { label: 'Sede', value: 'Quartel Jaime Mota — Plateau, Cidade da Praia, Santiago' },
        { label: 'Telefone oficial', value: '+238 333 83 47' },
        { label: 'Patrono', value: 'Jaime Nascimento Mota, Combatente da Liberdade da Pátria' },
        { label: 'Dia da Unidade', value: '6 de abril — data de nascimento de Jaime Mota (Dia da Unidade Jaime Mota)' }
      ] },
      { title: 'O que é o Comando da Guarnição?', wide: true, text: 'A Guarnição do Estado-Maior das Forças Armadas é uma unidade integrada na Direção dos Serviços de Apoio Geral do EMFA. É constituída essencialmente por:', layout: 'columns', columns: [
        { title: 'Companhia de Guarnição', text: 'Responsável principalmente pelo pessoal militar necessário para:', items: ['Segurança das instalações', 'Proteção física', 'Serviços de guarnição', 'Apoio às atividades do Estado-Maior'] },
        { title: 'Companhia de Apoio de Serviços', text: 'Destinada ao apoio necessário ao funcionamento dos órgãos do EMFA e demais estruturas centrais.' }
      ] },
      { title: 'Missão do Comando da Guarnição', layout: 'columns', text: 'Presta apoio direto ao funcionamento do Estado-Maior das Forças Armadas, do Gabinete do CEMFA, do Conselho Superior de Disciplina e de outros órgãos centrais das Forças Armadas. As suas responsabilidades incluem principalmente:', columns: [
        { title: 'Segurança', items: ['Segurança física das instalações', 'Proteção dos órgãos centrais', 'Preparação e execução de planos de segurança', 'Manutenção da prontidão da unidade'] },
        { title: 'Apoio logístico', items: ['Apoio ao funcionamento dos serviços', 'Pessoal', 'Material', 'Instalações', 'Serviços gerais'] },
        { title: 'Apoio administrativo', items: ['Correspondência', 'Arquivo', 'Documentação', 'Gestão administrativa', 'Apoio aos serviços do EMFA'] }
      ] },
      { title: 'Direção dos Serviços de Apoio Geral', text: 'A Direção dos Serviços de Apoio Geral é também responsável por:', items: [
        'Orçamento e contabilidade patrimonial',
        'Aquisição de meios e gestão de existências',
        'Arquivo histórico-militar',
        'Património das Forças Armadas'
      ] },
      { title: 'Estrutura dos Serviços de Apoio Geral', items: [
        'Centro de Documentação: Arquivo Geral, Arquivo Histórico-Militar e Biblioteca das Forças Armadas',
        'Gabinete de Heráldica',
        'Guarnição do EMFA'
      ] },
      { title: 'Notícias e contactos', links: [{ label: 'Notícias', href: 'noticias.html' }, { label: 'Contactos', href: 'contactos.html' }] }
    ]
  },

  'oficina-central': {
    intro: 'Integra a estrutura do Comando da Logística e assegura a manutenção e a reparação de viaturas e equipamentos das Forças Armadas.',
    groups: [
      { title: 'Missão', text: 'Manutenção e reparação de viaturas e equipamentos das Forças Armadas, em apoio às unidades e aos comandos.' },
      { title: 'Dependência', text: 'A Oficina Central depende do Comando da Logística.', links: [{ label: 'Comando da Logística', href: 'comando-logistica.html' }] }
    ]
  },

  /* ======================= VICE-CEMFA ======================= */
  'vice-cemfa': {
    noDocuments: true,
    intro: 'Segundo nível da chefia superior das Forças Armadas, imediatamente abaixo do Chefe do Estado-Maior das Forças Armadas (CEMFA).',
    responsible: {
      eyebrow: 'Chefia Superior', title: 'Titular atual',
      photoBase: 'assets/images/comandantes/vice-cemfa', photoLabel: 'Fotografia oficial do Vice-CEMFA',
      fields: [
        ['Nome', 'Silvino Monteiro Chantre'],
        ['Posto', 'Comodoro'],
        ['Cargo', 'Vice-Chefe do Estado-Maior das Forças Armadas — Vice-CEMFA'],
        ['Nomeação', 'Agosto de 2026 — Decreto Presidencial n.º 23/2026 (datado de 6 de agosto; Boletim Oficial n.º 88, I Série, de 10 de agosto de 2026)'],
        ['Nomeado por', 'Presidente da República, José Maria Pereira Neves, sob proposta do Governo']
      ]
    },
    groups: [
      { title: 'Posição na hierarquia', wide: true, text: 'O Vice-CEMFA é o segundo nível da chefia superior das Forças Armadas, imediatamente abaixo do CEMFA. Em termos simplificados, a cadeia de comando é:', layout: 'definitions', entries: [
        { label: '1 · Comandante Supremo', value: 'Presidente da República — José Maria Pereira Neves' },
        { label: '2 · Ministro da Defesa Nacional', value: 'Tutela política — Manuel Augusto Lima Amante da Rosa' },
        { label: '3 · CEMFA', value: 'Chefe do Estado-Maior das Forças Armadas — Contra-Almirante Manuel António Pereira Semedo' },
        { label: '4 · Vice-CEMFA', value: 'Vice-Chefe do Estado-Maior das Forças Armadas — Comodoro Silvino Monteiro Chantre' }
      ] },
      { title: 'Nomeação', text: 'Silvino Monteiro Chantre foi nomeado Vice-CEMFA em agosto de 2026, pelo Decreto Presidencial n.º 23/2026, publicado no Boletim Oficial de 10 de agosto de 2026. A nomeação foi feita pelo Presidente da República, José Maria Pereira Neves, sob proposta do Governo. Passou a ocupar o cargo de número dois da hierarquia superior militar.' },
      { title: 'Experiência anterior', items: [
        'Assessor Militar do Chefe do Estado-Maior das Forças Armadas (desde novembro de 2023)',
        'Comandante da Guarda Nacional (funções de que foi exonerado no início de 2026)',
        'Inspetor das Forças Armadas (nomeado em maio de 2026)',
        'Oficial oriundo da Guarda Costeira, com experiência no comando de unidades navais e no planeamento de defesa'
      ] },
      { title: 'Ver também', links: [{ label: 'CEMFA', href: 'cemfa.html' }, { label: 'Ministro da Defesa Nacional', href: 'ministro-defesa.html' }, { label: 'Estrutura Organizacional', href: 'estrutura.html' }, { label: 'Inspeção das Forças Armadas', href: 'inspecao-forcas-armadas.html' }] }
    ]
  },

  /* ======================= MINISTRO DA DEFESA NACIONAL ======================= */
  'ministro-defesa': {
    noDocuments: true,
    intro: 'O membro do Governo responsável pela área da Defesa Nacional, de quem o Chefe do Estado-Maior das Forças Armadas depende politicamente.',
    responsible: {
      eyebrow: 'Membro do Governo',
      title: 'Ministro da Defesa Nacional',
      photoBase: 'assets/images/governo/ministro-defesa',
      photoLabel: 'Fotografia oficial do Ministro',
      fields: [
        ['Nome', 'Manuel Augusto Lima Amante da Rosa'],
        ['Cargo', 'Ministro dos Negócios Estrangeiros, Comunidades e Defesa Nacional'],
        ['Governo', 'XI Legislatura — Primeiro-Ministro Francisco Avelino Vieira de Carvalho'],
        ['Tomada de posse', '19 de junho de 2026 (Decreto Presidencial n.º 15/2026), perante o Presidente da República, José Maria Neves'],
        ['Perfil', 'Embaixador e diplomata de carreira, com pós-graduação em Defesa e Segurança']
      ]
    },
    groups: [
      { title: 'Apresentação', text: 'Manuel Amante da Rosa é diplomata de carreira e passou à situação de reforma antes de assumir funções governativas. Foi nomeado pelo Primeiro-Ministro Francisco Carvalho para dirigir os Negócios Estrangeiros, as Comunidades e a Defesa Nacional, áreas que passam a estar sob a mesma tutela, no Governo saído das eleições legislativas de 17 de maio de 2026.' },
      { title: 'Carreira', items: [
        'Embaixador de Cabo Verde no Brasil (1999–2002)',
        'Embaixador em Angola, com acreditação não residente em Moçambique, São Tomé e Príncipe, Namíbia, Zâmbia e Zimbabwe (1995–1999)',
        'Embaixador na República Italiana e Representante Permanente junto das organizações internacionais sediadas em Roma',
        'Membro do secretariado permanente do Fórum Macau',
        'Diretor-Geral dos Assuntos Económicos, Políticos e Culturais, Diretor-Geral do Gabinete de Estudos e Assessoria Jurídica e Diretor-Geral do Centro de Estudos Internacionais',
        'Chefe do Protocolo e Chefe do Departamento das Organizações Internacionais do Ministério dos Negócios Estrangeiros'
      ] },
      { title: 'Formação', items: [
        'Frequência da Faculdade de Direito da Universidade Clássica de Lisboa',
        'Diplomado pela Escola Diplomática do Brasil (Instituto Rio Branco)',
        'Pós-graduação em Defesa e Segurança pelo Instituto de Defesa Nacional de Portugal'
      ] },
      { title: 'Competências na área da Defesa', text: 'No quadro da orgânica das Forças Armadas (Decreto-Lei n.º 12/2026, de 13 de março), cabe ao membro do Governo responsável pela Defesa Nacional:', items: [
        'A tutela política das Forças Armadas, de quem o CEMFA depende politicamente e de quem é o principal conselheiro militar',
        'Nomear e exonerar, por despacho e sob proposta do CEMFA, os comandantes dos ramos e de outros órgãos de comando',
        'Determinar, por portaria, as unidades e órgãos a atribuir a cada Comando Territorial (Regiões Militares)'
      ] },
      { title: 'Ministério da Defesa Nacional', text: 'O Ministério da Defesa Nacional integra, entre outros serviços, a Direção Nacional da Defesa e a Direção-Geral do Planeamento, Orçamento e Gestão. O Presidente da República é, por inerência, o Comandante Supremo das Forças Armadas e nomeia o Chefe do Estado-Maior das Forças Armadas, sob proposta do Governo.', links: [{ label: 'Comandante Supremo', href: 'comandante-supremo.html' }, { label: 'Chefia do Estado-Maior (CEMFA)', href: 'cemfa.html' }] },
      { title: 'Antecessora', text: 'A pasta foi anteriormente exercida por Janine Tatiana Santos Lélis, Ministra de Estado e da Defesa Nacional no Governo da IX e X Legislaturas (2021–2026).' },
      { title: 'Fontes oficiais', links: [
        { label: 'Perfil no portal do Governo', href: 'https://www.governo.cv/governo/ministerios/ministro-dos-negocios-estrangeiros-comunidades-e-defesa-nacional/', external: true },
        { label: 'Governo da XI Legislatura', href: 'https://www.governo.cv/novo-governo-toma-posse-no-palacio-da-presidencia/', external: true }
      ] }
    ]
  }
};
