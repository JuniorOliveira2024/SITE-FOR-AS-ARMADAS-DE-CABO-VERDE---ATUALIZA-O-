/* ---------- estrutura partilhada das páginas institucionais ---------- */
(function () {
  const pageTitle = document.body.dataset.pageTitle || 'Página Institucional';
  const pageSections = (document.body.dataset.pageSections || 'Apresentação|Informações institucionais|Contactos')
    .split('|')
    .map(section => section.trim())
    .filter(Boolean);

  const escapeHtml = value => String(value).replace(/[&<>'"]/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[character]));
  let currentTitle = pageTitle;
  let safeTitle = escapeHtml(pageTitle);
  const fileKey = location.pathname.split('/').pop().replace(/\.html?$/i, '');
  // pagina.html?p=<slug> mostra páginas criadas no painel (não têm ficheiro HTML próprio)
  const genericPage = fileKey === 'pagina';
  const pageKey = genericPage ? (new URLSearchParams(location.search).get('p') || '') : fileKey;
  const contentPages = {
    'guarda-nacional': {
      intro: 'A Guarda Nacional constitui a principal componente das Forças Armadas destinada à defesa militar do país através de operações terrestres e anfíbias e ao apoio à segurança interna dentro das suas missões específicas. A sua organização territorial compreende três Regiões Militares.',
      groups: [
        { title: 'História', text: 'Área reservada para a resenha histórica oficial da Guarda Nacional.' },
        { title: 'Missão e organização', text: 'Defesa militar do país através de operações terrestres e anfíbias e apoio à segurança interna dentro das missões específicas atribuídas.', items: ['Comando da Guarda Nacional', '1ª Região Militar', '2ª Região Militar', '3ª Região Militar', 'Unidade de Operações Especiais', 'Polícia Militar', 'Fuzileiros Navais', 'Artilharia', 'Unidades de Apoio'], links: [{ label: '1ª Região Militar', href: '#regiao-1', button: true }, { label: '2ª Região Militar', href: '#regiao-2', button: true }, { label: '3ª Região Militar', href: '#regiao-3', button: true }] },
        { title: 'Comando', text: 'Nome, posto, fotografia, biografia e período de exercício do Comandante: área reservada para publicação oficial.' },
        { title: '1ª Região Militar', text: 'Sede no Mindelo. Jurisdição sobre Santo Antão, São Vicente, Santa Luzia e São Nicolau, incluindo os ilhéus Branco e Raso. Dependência funcional do CIMMB.', links: [{ label: 'Página do CIMMB', href: 'cimmb.html' }] },
        { title: '2ª Região Militar', text: 'Sede em Espargos. Jurisdição sobre Sal e Boa Vista.' },
        { title: '3ª Região Militar', text: 'Sede na Praia. Jurisdição sobre Maio, Santiago, Fogo e Brava e os Ilhéus Secos.' },
        { title: 'Brasão e Guião', text: 'Espaços reservados para os símbolos oficiais e respetiva descrição.' },
        { title: 'Galeria, notícias e contactos', text: 'Conteúdos multimédia, notícias e contactos oficiais da Guarda Nacional serão adicionados nesta área.', links: [{ label: 'Notícias', href: 'noticias.html' }, { label: 'Multimédia', href: 'multimedia.html' }, { label: 'Contactos', href: 'contactos.html' }] }
      ]
    },
    'guarda-costeira': {
      intro: 'A Guarda Costeira tem como missão a defesa e proteção dos interesses económicos nacionais no mar sob jurisdição nacional e presta apoio aéreo e naval às operações terrestres e anfíbias.',
      groups: [
        { title: 'Missão', text: 'Defesa e proteção dos interesses económicos nacionais no mar sob jurisdição nacional; apoio aéreo e naval às operações terrestres e anfíbias.' },
        { title: 'História e organização', text: 'História, comando e organização detalhada: áreas reservadas para informação e documentação institucional.' },
        { title: 'Esquadrilhas', items: ['Esquadrilha Naval', 'Esquadrilha Aérea'] },
        { title: 'Coordenação e salvamento', items: ['COSMAR', 'JRCC', 'Busca e Salvamento', 'Vigilância e fiscalização'] },
        { title: 'Meios', text: 'Inventário e especificações dos meios navais e aéreos: publicar após confirmação institucional.' },
        { title: 'Brasão, Guião e Patrono', text: 'Espaços reservados para símbolos oficiais, identificação do patrono e respetiva informação confirmada.' },
        { title: 'Dia da Guarda Costeira', text: '11 de outubro, conforme a Resolução n.º 6/2010.' },
        { title: 'Galeria, notícias e contactos', links: [{ label: 'Notícias', href: 'noticias.html' }, { label: 'Multimédia', href: 'multimedia.html' }, { label: 'Contactos', href: 'contactos.html' }] }
      ]
    },
    'comando-logistica': {
      intro: 'O Comando da Logística é um órgão central de comando responsável pelas atividades relacionadas com a administração dos recursos materiais e financeiros das Forças Armadas, de acordo com os planos e diretivas do CEMFA.',
      groups: [
        { title: 'Missão', text: 'Administrar os recursos materiais e financeiros das Forças Armadas, de acordo com os planos e diretivas do CEMFA.' },
        { title: 'Comandante', text: 'Nome, posto, fotografia, biografia e período de exercício: campos reservados para informação oficial.' },
        { title: 'Direções', items: ['Direção de Administração Financeira', 'Direção de Administração do Material', 'Direção de Infraestruturas e Obras', 'Direção de Comunicações'] },
        { title: 'Unidades e serviços', items: ['Centro de Transmissões', 'Centro de Informática', 'Centro de Reparação de Equipamentos'] },
        { title: 'Oficina Central das Forças Armadas', text: 'A Oficina Central integra a estrutura do Comando da Logística e não constitui uma organização principal independente. Informação operacional e institucional a completar com fonte oficial.', links: [{ label: 'Ver nesta página', href: '#oficina-central' }] },
        { title: 'Notícias, galeria e contactos', links: [{ label: 'Notícias', href: 'noticias.html' }, { label: 'Multimédia', href: 'multimedia.html' }, { label: 'Contactos', href: 'contactos.html' }] }
      ]
    },
    'comando-pessoal': {
      intro: 'O Comando do Pessoal assegura as atividades das Forças Armadas relacionadas com o pessoal, de acordo com os planos e diretivas do CEMFA.',
      groups: [
        { title: 'Missão', text: 'Assegurar as atividades relacionadas com o pessoal das Forças Armadas, segundo os planos e diretivas do CEMFA.' },
        { title: 'Comandante', text: 'Nome, posto, fotografia, biografia e período de exercício: campos reservados para informação oficial.' },
        { title: 'Direções', items: ['Direção de Administração do Pessoal', 'Direção de Formação e Instrução', 'Direção dos Serviços de Saúde', 'Direção do Serviço de Ação Cívica', 'Direção dos Serviços de Justiça e Disciplina'] },
        { title: 'Áreas de atuação', items: ['Formação', 'Recursos Humanos', 'Saúde', 'Ação Cívica', 'Justiça e Disciplina'] },
        { title: 'Notícias, galeria e contactos', links: [{ label: 'Notícias', href: 'noticias.html' }, { label: 'Multimédia', href: 'multimedia.html' }, { label: 'Contactos', href: 'contactos.html' }] }
      ]
    },
    'policlinica-forcas-armadas': {
      intro: 'A Policlínica das Forças Armadas é a unidade de saúde militar vocacionada para a prestação de cuidados de saúde primários e especializados aos militares, aos reformados e às suas famílias, em articulação com a Direção dos Serviços de Saúde do Comando do Pessoal.',
      groups: [
        { title: 'Missão e enquadramento', text: 'Garantir a assistência médico-sanitária e a prontidão sanitária das Forças Armadas, assegurando cuidados de proximidade, apoio às unidades e às operações e a articulação com o Serviço Nacional de Saúde. A Policlínica integra a Direção dos Serviços de Saúde, no âmbito do Comando do Pessoal.' },
        { title: 'Serviços e especialidades', items: ['Medicina geral e familiar', 'Enfermagem e tratamento ambulatório', 'Análises clínicas e imagiologia', 'Farmácia e aprovisionamento de medicamentos', 'Fisioterapia e reabilitação', 'Saúde oral e medicina dentária', 'Medicina no trabalho e exames de aptidão', 'Apoio sanitário às operações e às unidades'] },
        { title: 'Acesso e marcação', text: 'O acesso é reservado aos beneficiários do sistema de saúde militar, nos termos do regulamento em vigor. As consultas e exames são marcados junto da Policlínica ou por encaminhamento da unidade de saúde da respetiva Região Militar. Situações urgentes devem ser encaminhadas para o serviço de urgência mais próximo.' },
        { title: 'Localização e contactos', layout: 'definitions', entries: [{ label: 'Localização', value: 'Cidade da Praia, Santiago — instalações das Forças Armadas' }, { label: 'Horário', value: 'Dias úteis, das 08h00 às 17h00' }, { label: 'Contacto institucional', value: 'geral@fa.gov.cv · +238 XXX XX XX' }, { label: 'Dependência', value: 'Direção dos Serviços de Saúde · Comando do Pessoal' }], links: [{ label: 'Falar com a instituição', href: 'contactos.html' }] }
      ]
    },
    'pupilos-forcas-armadas': {
      intro: 'Os Pupilos das Forças Armadas são uma estrutura de apoio social e educativo dedicada aos filhos dos militares, promovendo o acolhimento, o acompanhamento pedagógico e o desenvolvimento integral das crianças e jovens.',
      groups: [
        { title: 'Missão e enquadramento', text: 'Apoiar as famílias militares através de respostas de acolhimento, educação e acompanhamento social, contribuindo para o bem-estar das crianças e jovens e para a conciliação entre a vida profissional e familiar. A estrutura integra a área de ação social do Comando do Pessoal.' },
        { title: 'Acolhimento e apoio', items: ['Acolhimento e apoio à primeira infância', 'Apoio ao estudo e acompanhamento escolar', 'Atividades extracurriculares, desporto e cultura', 'Acompanhamento psicossocial e apoio às famílias', 'Programas de férias e ocupação de tempos livres'] },
        { title: 'Inscrição', text: 'Podem candidatar-se os filhos de militares no ativo e no quadro de reserva ou reforma, de acordo com as vagas e os critérios definidos no regulamento interno. A inscrição é feita junto dos serviços dos Pupilos, com apresentação do documento de identificação da criança, comprovativo de filiação e documento militar do progenitor.' },
        { title: 'Localização e contactos', layout: 'definitions', entries: [{ label: 'Localização', value: 'Cidade da Praia, Santiago — instalações das Forças Armadas' }, { label: 'Horário de atendimento', value: 'Dias úteis, das 08h00 às 16h00' }, { label: 'Contacto institucional', value: 'geral@fa.gov.cv · +238 XXX XX XX' }, { label: 'Dependência', value: 'Comando do Pessoal — área de ação social' }], links: [{ label: 'Falar com a instituição', href: 'contactos.html' }] }
      ]
    },
    cemfa: {
      intro: 'Chefe do Estado-Maior das Forças Armadas (CEMFA). O cargo é exercido pelo Contra-Almirante Manuel António Pereira Semedo, empossado em 8 de novembro de 2025.',
      profile: { name: 'Contra-Almirante Manuel António Pereira Semedo', role: 'Chefe do Estado-Maior das Forças Armadas — CEMFA', date: 'Tomada de posse: 8 de novembro de 2025', photo: 'assets/images/lideranca/cemfa-oficial.jpg', photoAlt: 'Fotografia oficial do Contra-Almirante Manuel António Pereira Semedo' },
      groups: [
        { title: 'Biografia e percurso', paragraphs: [
          'O Contra-Almirante Manuel António Pereira Semedo nasceu em Picos, Concelho de São Salvador do Mundo, ilha de Santiago, a 10 de outubro de 1977. Tem 28 anos de serviço e foi promovido ao atual posto em 31 de outubro de 2025.',
          'Exerce funções como Chefe do Estado-Maior das Forças Armadas desde 08 de novembro de 2025.',
          'Encontra-se habilitado com o Curso de Formação de Oficiais Fuzileiros, realizado na Escola de Fuzileiros, em Portugal; o Curso Avançado de Operações Especiais, ministrado pela Academia de Operações Especiais da República Popular da China; o Curso de Promoção a Oficial Superior, na Escola Superior de Guerra, em Angola; o Army Command and Staff Course, no Army Command College of Nanjing, na República Popular da China; o Curso de Desminagem para Oficiais do Estado-Maior, no Centre de Perfectionnement aux Actions post-conflictuelles de Déminage et de Dépollution (CPADD), em Benim; o Curso de Gestão de Catástrofe, na Unidade Militar de Emergência (UME), em Espanha; e o Curso de Estado-Maior Conjunto, este último com grau de pós-graduação em Ciências Militares – Segurança e Defesa, pelo Instituto Universitário Militar (IUM), em Portugal.',
          'Possui ainda, entre outros, o Curso de Liderança Nível 1, o Curso de Armas de Destruição Maciça, o Curso de Técnicas do Estado-Maior, o Curso de Estudos Africanos e o Advanced Boarding Officer Course.',
          'No âmbito académico, é licenciado em Sociologia do Trabalho e das Organizações pela Universidade Jean Piaget de Cabo Verde e pós-graduado em Administração e Gestão Pública pela Universidade de Cabo Verde.',
          'Ao longo da sua carreira, prestou serviço em vários Comandos e Unidades das Forças Armadas, desempenhando funções operacionais, de Estado-Maior e de docência, distinguindo-se pela liderança, disciplina e elevado sentido de responsabilidade.',
          'Na componente operacional, destaca-se o desempenho das seguintes funções: na Companhia de Fuzileiros Navais, como Comandante de Pelotão e, posteriormente, como Comandante da Companhia; no Comando da Guarnição, como Comandante da Companhia de Guarnição e Serviços; no Comando da 3ª Região Militar como Comandante da Companhia de Fiscalização Costeira e Adjunto do Comandante da Região Militar para a Área Operacional; e no Comando da 1ª Região Militar, como Adjunto do Comandante da Região Militar para a Área Operacional.',
          'Ainda, no âmbito operacional, importa salientar a sua participação em diversos fóruns e conferências militares, tanto a nível nacional como internacional, bem como em exercícios militares conjuntos e combinados, nomeadamente os Exercícios da Série Felino, o Steadfast Jaguar 2006, entre outros.',
          'Na componente de Estado-Maior, desempenhou funções no Comando da Guarda Nacional, onde exerceu os cargos de Diretor de Planeamento, Operações e Informações, e de Chefe do Gabinete de Apoio ao Comandante.',
          'Na área da docência, destacou-se como Diretor da Escola Militar, tendo igualmente desempenhado funções de instrutor em diversas incorporações e ações de formações, bem como de Comandante de Companhia de Instrução em diversas incorporações.',
          'No Estado-Maior das Forças Armadas, exerceu o cargo de Assessor Militar do Chefe do Estado-Maior das Forças Armadas e, posteriormente, desempenhou as funções de Comandante da Logística.',
          'Pelo seu desempenho exemplar e dedicação ao serviço, foi distinguido com louvores e condecorações atribuídos por superiores hierárquicos, reconhecendo o mérito do seu contributo para o desenvolvimento, eficácia e prestígio das Forças Armadas de Cabo Verde.',
          'O Contra-Almirante Manuel António Pereira Semedo é solteiro e pai de uma filha, mantendo uma forte ligação aos valores familiares, que considera essenciais para o equilíbrio entre a vida pessoal e a exigente carreira militar que desempenha.'
        ] },
        { title: 'Funções', text: 'Como CEMFA, dirige o Estado-Maior das Forças Armadas, assegura o planeamento, a coordenação e a execução da política de defesa e o emprego operacional das forças militares. É o principal conselheiro militar do membro do Governo responsável pela Defesa Nacional e responde perante o Presidente da República e o Governo.' },
        { title: 'Prioridades de comando', items: ['Reforço das capacidades operacionais e tecnológicas', 'Valorização dos recursos humanos e da meritocracia', 'Formação contínua e preparação permanente', 'Aprofundamento das parcerias nacionais e internacionais', 'Afirmação de Cabo Verde como ator credível na segurança do Atlântico'] },
        { title: 'Ligações', links: [{ label: 'Notícias', href: 'noticias.html' }, { label: 'Galeria dos CEMFA', href: 'galeria-cemfa.html' }, { label: 'Estrutura das Forças Armadas', href: 'estrutura.html' }, { label: 'Contactos', href: 'contactos.html' }] }
      ]
    },
    'comandante-supremo': {
      intro: 'O Presidente da República, Dr. José Maria Pereira Neves, exerce as funções de Comandante Supremo das Forças Armadas desde 9 de novembro de 2021.',
      profile: { name: 'Dr. José Maria Pereira Neves', role: 'Presidente da República e Comandante Supremo das Forças Armadas', date: 'Início do mandato: 9 de novembro de 2021', photo: 'assets/images/lideranca/presidente-republica.jpg', photoAlt: 'Fotografia oficial do Presidente da República, José Maria Neves' },
      groups: [
        { title: 'Competências constitucionais', text: 'Como Chefe de Estado e Comandante Supremo das Forças Armadas, compete ao Presidente da República garantir a defesa da Constituição, da independência nacional e da integridade territorial. Exerce a mais alta autoridade na hierarquia militar e nomeia o Chefe do Estado-Maior das Forças Armadas, sob proposta do Governo.', items: ['Defesa da Constituição e da soberania nacional', 'Comando supremo das Forças Armadas', 'Nomeação do CEMFA, sob proposta do Governo', 'Atribuição de condecorações e honras militares'] },
        { title: 'Biografia institucional', text: 'José Maria Pereira Neves nasceu em Santa Catarina, Santiago, a 28 de março de 1960. Foi Primeiro-Ministro de Cabo Verde entre 2001 e 2016 e assumiu a Presidência da República em 9 de novembro de 2021. Tem uma longa carreira de serviço público, autárquico e governativo, com intervenção nas áreas da administração pública, desenvolvimento e cooperação internacional.' },
        { title: 'Ligações institucionais', links: [{ label: 'Presidência da República', href: 'https://www.presidencia.cv', external: true }, { label: 'Notícias', href: 'noticias.html' }, { label: 'Estrutura das Forças Armadas', href: 'estrutura.html' }] }
      ]
    },
    cimmb: {
      intro: 'Centro de Instrução Militar do Morro Branco — Zeca Santos. O CIMMB ministra formação inicial e especial e diversos cursos militares; está funcionalmente ligado ao Comando da Primeira Região Militar.',
      groups: [
        { title: 'História e patrono', text: 'O centro é também identificado como Zeca Santos, patrono José Henrique dos Santos. Resenha histórica e documentação biográfica: completar com fonte institucional.' },
        { title: 'Missão e formação', text: 'Ministrar formação inicial e especial e cursos militares.' },
        { title: 'Organização e dependência', text: 'Dependência funcional do Comando da Primeira Região Militar. Organograma e estrutura interna: área reservada para publicação oficial.' },
        { title: 'Cursos, galeria e contactos', text: 'Relação atualizada de cursos, notícias, galeria e contactos oficiais será adicionada nesta área.', links: [{ label: 'Guarda Nacional', href: 'guarda-nacional.html' }, { label: 'Notícias', href: 'noticias.html' }, { label: 'Multimédia', href: 'multimedia.html' }, { label: 'Contactos', href: 'contactos.html' }] }
      ]
    },
    'escola-militar': {
      intro: 'A Escola Militar está na direta dependência do CEMFA e tem atribuições relacionadas com a formação militar e estudos nos campos doutrinário, técnico e científico-militar.',
      groups: [
        { title: 'Missão e estudos', text: 'Formação militar e desenvolvimento de estudos doutrinários, técnicos e científico-militares.' },
        { title: 'Formação', items: ['Formação de oficiais', 'Formação de sargentos', 'Formação de praças', 'Tirocínios'] },
        { title: 'Investigação e cooperação', items: ['Investigação', 'Cooperação técnico-militar'] },
        { title: 'Cursos, notícias e contactos', text: 'Oferta formativa, notícias, galeria e contactos: completar com informação oficial atualizada.', links: [{ label: 'Programa Soldado Cidadão', href: 'programa-soldado-cidadao.html' }, { label: 'Notícias', href: 'noticias.html' }, { label: 'Contactos', href: 'contactos.html' }] }
      ]
    },
    'programa-soldado-cidadao': {
      intro: 'Criado em 22 de outubro de 2007, o Programa Soldado Cidadão visa a formação e capacitação profissional dos jovens em prestação do serviço militar, facilitando a reintegração na vida civil e o acesso ao emprego.',
      groups: [
        { title: 'Sobre o Programa', text: 'História, objetivos, missão e público-alvo: capacitação profissional de jovens durante a prestação do serviço militar e apoio à reintegração na vida civil.' },
        { title: 'Áreas de formação', layout: 'training', items: ['Pintura', 'Secretariado', 'Canalização', 'Carpintaria', 'Telecomunicações', 'Mecânica', 'Construção Civil', 'Eletricidade', 'Cabeleireiro', 'Informática', 'Administração', 'Contabilidade', 'Agricultura', 'Pecuária', 'Hotelaria e Turismo', 'Condução', 'TIC', 'Design e Multimédia', 'Eletrónica', 'Serralharia', 'Manutenção de motores'] },
        { title: 'Parceiros Institucionais', layout: 'partners', items: ['Estruturas ligadas à Juventude', 'Estruturas ligadas ao Emprego', 'Estruturas de Desenvolvimento de Recursos Humanos', 'IEFP', 'Instituições de formação profissional'], text: 'Espaços reservados para identificação confirmada e logótipos dos parceiros institucionais.' },
        { title: 'Diretor/Gestor do Programa', layout: 'profile', fields: [{ label: 'Nome', value: 'A preencher após confirmação oficial' }, { label: 'Cargo', value: 'Diretor/Gestor do Programa' }, { label: 'Biografia', value: 'A preencher' }, { label: 'Contactos', value: 'A preencher' }, { label: 'Mensagem', value: 'A preencher' }, { label: 'Percurso profissional', value: 'A preencher' }], text: 'Dados pessoais e profissionais a publicar após confirmação institucional.' },
        { title: 'Notícias e contactos', links: [{ label: 'Notícias', href: 'noticias.html' }, { label: 'Contactos', href: 'contactos.html' }] }
      ]
    },
    historia: {
      intro: 'Narrativa cronológica da evolução das estruturas de defesa nacional, das FARP às atuais Forças Armadas de Cabo Verde. A resenha detalhada e o arquivo de imagens devem ser complementados com documentação institucional oficial.',
      groups: [{ title: 'Linha temporal', layout: 'timeline', entries: [
        { date: 'Década de 1950', title: 'Contexto da luta de libertação', text: 'Contexto político que conduziu à formação do PAIGC e à luta de libertação.' },
        { date: '1964', title: 'Criação das FARP', text: 'Criação das Forças Armadas Revolucionárias do Povo no contexto da luta de libertação.' },
        { date: '15 de janeiro de 1967', title: 'Núcleo Fundador', text: 'Juramento do Núcleo Fundador das Forças Armadas de Cabo Verde perante Amílcar Cabral.' },
        { date: '1973–1975', title: 'Preparação para a independência', text: 'Intensificação da luta, transferência de estruturas e preparação para a independência.' },
        { date: '5 de julho de 1975', title: 'Independência Nacional', text: 'Independência Nacional e organização das estruturas militares nacionais.' },
        { date: '1975', title: 'Comando-Geral das FARP e Milícias', text: 'Criação do Comando-Geral das FARP e Milícias e estruturação territorial em Regiões Militares.' },
        { date: 'Período pós-independência', title: 'Evolução institucional', text: 'Transformação progressiva das estruturas e adoção da designação Forças Armadas de Cabo Verde.' },
        { date: 'Década de 1980', title: 'Consolidação institucional', text: 'Consolidação de legislação estruturante e da organização institucional.' },
        { date: 'Década de 1990', title: 'Reorganização', text: 'Reorganização das Forças Armadas, criação da Guarda Costeira e desenvolvimento da Guarda Nacional.' },
        { date: 'Período contemporâneo', title: 'Modernização', text: 'Modernização, formação, cooperação técnico-militar, novas missões e evolução da estrutura.' }
      ] }, { title: 'Arquivo Histórico das Forças Armadas', text: 'Fotografias históricas devem ser adicionadas com a respetiva referência e autorização institucional.' }]
    },
    'inspecao-forcas-armadas': { intro: 'Página institucional da Inspeção das Forças Armadas.', groups: [{ title: 'Apresentação', text: 'Apresentação institucional a completar com conteúdo oficial.' }, { title: 'Missão e competências', text: 'Missão e competências da Inspeção: informação oficial a adicionar.' }, { title: 'Estrutura', text: 'Estrutura orgânica e atribuições das unidades internas: conteúdo oficial a adicionar.' }, { title: 'Notícias, documentos, galeria e contactos', text: 'Conteúdos oficiais e contactos serão publicados após validação.', links: [{ label: 'Notícias', href: 'noticias.html' }, { label: 'Documentos oficiais', href: 'index.html#historia' }, { label: 'Galeria', href: 'multimedia.html' }, { label: 'Contactos', href: 'contactos.html' }] }] },
    'direcao-informacoes-militares': { intro: 'Página institucional da Direção de Informações Militares.', groups: [{ title: 'Apresentação', text: 'Apresentação institucional a completar com conteúdo oficial.' }, { title: 'Missão e competências', text: 'Missão e competências da Direção: informação oficial a adicionar.' }, { title: 'Estrutura', text: 'Estrutura orgânica e atribuições das unidades internas: conteúdo oficial a adicionar.' }, { title: 'Notícias, documentos, galeria e contactos', text: 'Conteúdos oficiais e contactos serão publicados após validação.', links: [{ label: 'Notícias', href: 'noticias.html' }, { label: 'Documentos oficiais', href: 'index.html#historia' }, { label: 'Galeria', href: 'multimedia.html' }, { label: 'Contactos', href: 'contactos.html' }] }] },
    'planeamento-estrategico': { intro: 'Página institucional do Centro de Planeamento Estratégico Militar.', groups: [{ title: 'Apresentação', text: 'Apresentação institucional a completar com conteúdo oficial.' }, { title: 'Missão e competências', text: 'Missão e competências do Centro: informação oficial a adicionar.' }, { title: 'Estrutura', text: 'Estrutura orgânica e atribuições das unidades internas: conteúdo oficial a adicionar.' }, { title: 'Notícias, documentos, galeria e contactos', text: 'Conteúdos oficiais e contactos serão publicados após validação.', links: [{ label: 'Notícias', href: 'noticias.html' }, { label: 'Documentos oficiais', href: 'index.html#historia' }, { label: 'Galeria', href: 'multimedia.html' }, { label: 'Contactos', href: 'contactos.html' }] }] },
    'comando-guarnicao': { intro: 'Página institucional do Comando da Guarnição.', groups: [{ title: 'Apresentação', text: 'Apresentação institucional a completar com conteúdo oficial.' }, { title: 'Missão e competências', text: 'Missão e competências do Comando: informação oficial a adicionar.' }, { title: 'Estrutura', text: 'Estrutura orgânica e atribuições das unidades internas: conteúdo oficial a adicionar.' }, { title: 'Notícias, documentos, galeria e contactos', text: 'Conteúdos oficiais e contactos serão publicados após validação.', links: [{ label: 'Notícias', href: 'noticias.html' }, { label: 'Documentos oficiais', href: 'index.html#historia' }, { label: 'Galeria', href: 'multimedia.html' }, { label: 'Contactos', href: 'contactos.html' }] }] },
    'oficina-central': {
      intro: 'A Oficina Central das Forças Armadas integra a estrutura do Comando da Logística.',
      groups: [{ title: 'Missão e competências', text: 'Informação oficial sobre as competências, serviços, estrutura, notícias, documentos, galeria e contactos será adicionada nesta área.', links: [{ label: 'Comando da Logística', href: 'comando-logistica.html', button: true }] }]
    },
    'politica-privacidade': { intro: 'Política de Privacidade das Forças Armadas de Cabo Verde.', groups: [{ title: 'Informação de privacidade', text: 'O conteúdo oficial sobre tratamento de dados, finalidades, conservação e direitos dos titulares será publicado após validação institucional.' }] },
    acessibilidade: { intro: 'Informação de acessibilidade do portal das Forças Armadas de Cabo Verde.', groups: [{ title: 'Acessibilidade', text: 'Declaração de acessibilidade, nível de conformidade e contactos para comunicação de barreiras serão publicados após auditoria institucional.' }] }
  };
  const richData = (window.FA_COMANDOS || {})[pageKey];   // js/data/comandos-data.js
  let pageContent = richData
    ? { ...(contentPages[pageKey] || {}), intro: richData.intro || contentPages[pageKey]?.intro, groups: richData.groups || contentPages[pageKey]?.groups }
    : contentPages[pageKey];
  const responsibleProfiles = {
    'guarda-nacional': { title: 'Comandante', office: 'Comandante da Guarda Nacional' },
    'guarda-costeira': { title: 'Comandante', office: 'Comandante da Guarda Costeira' },
    'comando-logistica': { title: 'Comandante', office: 'Comandante do Comando da Logística' },
    'comando-pessoal': { title: 'Comandante', office: 'Comandante do Comando do Pessoal' },
    cimmb: { title: 'Comandante', office: 'Comandante do CIMMB' },
    'escola-militar': { title: 'Diretor', office: 'Diretor da Escola Militar' },
    'inspecao-forcas-armadas': { title: 'Inspector', office: 'Inspector das Forças Armadas' },
    'direcao-informacoes-militares': { title: 'Diretor', office: 'Diretor da Direção de Informações Militares' },
    'planeamento-estrategico': { title: 'Diretor', office: 'Diretor do Centro de Planeamento Estratégico Militar' },
    'comando-guarnicao': { title: 'Comandante', office: 'Comandante da Guarnição' },
    'oficina-central': { title: 'Diretor', office: 'Diretor da Oficina Central das Forças Armadas' }
  };
  let responsible = richData?.responsible ? { ...(responsibleProfiles[pageKey] || {}), ...richData.responsible } : responsibleProfiles[pageKey];
  let pageGroups = [];
  let noDocuments = Boolean(richData?.noDocuments);
  function buildGroups() {
    pageGroups = pageContent?.groups ? [...pageContent.groups] : [];
    if (responsible && !noDocuments && !pageGroups.some(group => /documentos/i.test(group.title))) {
      pageGroups.push({ title: 'Documentos oficiais', text: 'Consulte os documentos institucionais publicados no portal. Esta ligação abre a secção documental existente.', links: [{ label: 'Abrir documentos oficiais', href: 'index.html#historia', button: true }] });
    }
  }

  function renderLinks(links = []) {
    return links.map(link => `<a class="${link.button ? 'btn btn-outline-dark' : 'inline-link'}" href="${escapeHtml(link.href)}"${link.external ? ' target="_blank" rel="noopener"' : ''}>${escapeHtml(link.label)}</a>`).join('');
  }

  /* ---------- espaços de imagem (fotografia do comandante, brasão) ----------
     O ficheiro é procurado automaticamente em <base>.jpg / .png / .webp. Se não existir, fica o espaço reservado. */
  const MEDIA_EXTENSIONS = ['jpg', 'png', 'webp'];
  function mediaSlot({ base, label, alt, variant = 'photo' }) {
    return `<div class="media-slot media-slot-${variant}" data-media-base="${escapeHtml(base || '')}" data-media-alt="${escapeHtml(alt || label || '')}"><span class="media-slot-label">${escapeHtml(label || 'Imagem a inserir')}</span></div>`;
  }
  function hydrateMediaSlots(root = document) {
    root.querySelectorAll('.media-slot[data-media-base]').forEach(slot => {
      const base = slot.dataset.mediaBase;
      if (!base) return;
      const candidates = /\.(jpe?g|png|webp|svg)$/i.test(base) ? [base] : MEDIA_EXTENSIONS.map(ext => `${base}.${ext}`);
      (function tryNext(index) {
        if (index >= candidates.length) return;
        const img = new Image();
        img.onload = () => { img.alt = slot.dataset.mediaAlt || ''; img.className = 'media-slot-image'; img.decoding = 'async'; slot.classList.add('has-image'); slot.replaceChildren(img); };
        img.onerror = () => tryNext(index + 1);
        img.src = candidates[index];
      })(0);
    });
  }

  function renderUnit(group) {
    const facts = [['Sede', group.sede], ['Jurisdição', group.jurisdicao]].filter(([, value]) => value);
    const commander = group.commander;
    const photo = group.photo ? `<figure class="unit-photo"><img src="${escapeHtml(group.photo)}" alt="${escapeHtml(group.photoAlt || group.title)}" loading="lazy" decoding="async">${group.photoCaption ? `<figcaption>${escapeHtml(group.photoCaption)}</figcaption>` : ''}</figure>` : '';
    return `<div class="unit-card${group.crest ? ' has-crest' : ''}${group.photo ? ' has-photo' : ''}">
      ${photo}
      ${group.crest ? `<div class="unit-crest">${mediaSlot({ base: group.crest.base, label: group.crest.label, alt: group.crest.label, variant: 'crest' })}</div>` : ''}
      <div class="unit-main">
        ${group.text ? `<p>${escapeHtml(group.text)}</p>` : ''}
        ${facts.length ? `<dl class="profile-fields unit-facts">${facts.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('')}</dl>` : ''}
      </div>
      ${commander ? `<div class="unit-commander">
        ${mediaSlot({ base: commander.base, label: commander.label || 'Fotografia do Comandante', alt: `Fotografia de ${commander.rank || ''} ${commander.name || ''}`.trim(), variant: 'photo' })}
        <div class="unit-commander-info"><span class="unit-commander-role">${escapeHtml(commander.role || 'Comandante')}</span><strong>${escapeHtml([commander.rank, commander.name].filter(Boolean).join(' '))}</strong>${commander.since ? `<span>${escapeHtml(commander.since)}</span>` : ''}</div>
      </div>` : ''}
    </div>`;
  }

  function renderGroup(group) {
    const groupItems = group.items || [];
    const groupId = pageKey === 'guarda-nacional' && group.title.startsWith('1ª') ? 'regiao-1'
      : pageKey === 'guarda-nacional' && group.title.startsWith('2ª') ? 'regiao-2'
      : pageKey === 'guarda-nacional' && group.title.startsWith('3ª') ? 'regiao-3'
      : pageKey === 'comando-logistica' && group.title === 'Oficina Central das Forças Armadas' ? 'oficina-central'
      : '';
    let content = group.text && group.layout !== 'unit' ? `<p>${escapeHtml(group.text)}</p>` : '';
    if (Array.isArray(group.paragraphs) && group.paragraphs.length) {
      content += group.paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('');
    }
    if (group.layout === 'unit') {
      content += renderUnit(group);
    } else if (group.layout === 'columns') {
      content += `<div class="columns-grid">${(group.columns || []).map(col => `<div class="column-block"><h3>${escapeHtml(col.title)}</h3>${col.text ? `<p>${escapeHtml(col.text)}</p>` : ''}${(col.items || []).length ? `<ul>${col.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}</div>`).join('')}</div>`;
    } else if (group.layout === 'definitions') {
      content += `<dl class="definition-list">${(group.entries || []).map(entry => `<div><dt>${escapeHtml(entry.label)}</dt><dd>${escapeHtml(entry.value)}</dd></div>`).join('')}</dl>`;
    } else if (group.layout === 'timeline') {
      content += `<div class="timeline-list">${(group.entries || []).map(entry => `<article class="timeline-entry"><strong>${escapeHtml(entry.date)}</strong><h3>${escapeHtml(entry.title)}</h3><p>${escapeHtml(entry.text)}</p></article>`).join('')}</div>`;
    } else if (group.layout === 'commemorations') {
      content += `<div class="commemoration-grid">${(group.entries || []).map(entry => `<article class="commemoration-card"><div class="commemoration-photo">Fotografia e galeria a inserir</div><div class="commemoration-copy"><strong>${escapeHtml(entry.date)}</strong><h3>${escapeHtml(entry.title)}</h3><span>${escapeHtml(entry.unit)}</span><p>${escapeHtml(entry.text)}</p><p>${escapeHtml(entry.history)}</p></div></article>`).join('')}</div>`;
    } else if (group.layout === 'profile') {
      content += `<div class="profile-card"><div class="profile-photo">Fotografia<br>a inserir</div><dl class="profile-fields">${(group.fields || groupItems.map(label => ({ label, value: 'A preencher após confirmação oficial' }))).map(field => `<div><dt>${escapeHtml(field.label)}</dt><dd>${escapeHtml(field.value)}</dd></div>`).join('')}</dl></div>`;
    } else if (group.layout) {
      const layoutClass = group.layout === 'partners' ? 'partner-grid' : group.layout === 'training' ? 'training-grid' : group.layout === 'ranks' ? 'rank-grid' : 'partner-grid';
      content += `<div class="${layoutClass}">${groupItems.map(item => `<div class="${group.layout === 'partners' || group.layout === 'profile' ? 'partner-slot' : group.layout === 'ranks' ? 'rank-slot' : 'training-slot'}">${escapeHtml(item)}</div>`).join('')}</div>`;
    } else if (groupItems.length) {
      content += `<ul>${groupItems.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
    }
    content += group.links && group.links.length ? `<div class="block-links">${renderLinks(group.links)}</div>` : '';
    const blockId = group.id || groupId;
    const blockClass = group.wide || group.layout === 'unit' || group.layout === 'definitions' || group.layout === 'columns' ? ' institutional-block-wide' : '';
    return `<article class="institutional-block${blockClass}"${blockId ? ` id="${blockId}"` : ''}><h2>${escapeHtml(group.title)}</h2>${content}</article>`;
  }

  function renderResponsibleCard(profile) {
    const fields = profile.fields || [
      ['Nome', profile.name],
      ['Posto', profile.rank],
      ['Cargo', profile.office],
      ['Período de exercício', profile.period],
      ['Biografia', profile.biography]
    ];
    const photoBase = profile.photo || profile.photoBase || `assets/images/comandantes/${pageKey}`;
    const photo = mediaSlot({ base: photoBase, label: profile.photoLabel || 'Fotografia oficial a inserir', alt: `Fotografia de ${profile.name || profile.office || profile.title}`, variant: 'photo' });
    return `<section class="responsible-section" aria-labelledby="responsible-title"><div class="eyebrow">${escapeHtml(profile.eyebrow || 'Responsável')}</div><h2 id="responsible-title">${escapeHtml(profile.title)}</h2><article class="responsible-card"><div class="responsible-photo">${photo}</div><dl class="profile-fields">${fields.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value || 'A preencher com informação oficial')}</dd></div>`).join('')}</dl></article></section>`;
  }

  let cemfaTimeline = [
    { id: 'cemfa-01', ordinal: '1.º CEMFA', name: 'Agnelo Medina Dantas Pereira', rank: 'Primeiro-Comandante', period: 'Junho de 1983 – Fevereiro de 1988' },
    { id: 'cemfa-02', ordinal: '2.º CEMFA', name: 'António Marino Dias', rank: 'Brigadeiro', period: 'Fevereiro de 1988 – Julho de 1991' },
    { id: 'cemfa-03', ordinal: '3.º CEMFA', name: 'Ederlindo Francisco Gomes Ribeiro', rank: 'Brigadeiro', period: 'Julho de 1991 – Fevereiro de 1995' },
    { id: 'cemfa-04', ordinal: '4.º CEMFA', name: 'Amílcar Salazar Moreira Monteiro Baptista Ribeiro', rank: 'Brigadeiro', period: 'Fevereiro de 1995 – Outubro de 1998' },
    { id: 'cemfa-05', ordinal: '5.º CEMFA', name: 'Jorge Alberto da Conceição Bettencourt Pinto', rank: 'Brigadeiro', period: 'Outubro de 1998 – Maio de 2001' },
    { id: 'cemfa-06', ordinal: '6.º CEMFA', name: 'Antero Matos', rank: 'Brigadeiro', period: 'Maio de 2001 – Março de 2009' },
    { id: 'cemfa-07', ordinal: '7.º CEMFA', name: 'Fernando Carvalho Pereira', rank: 'Brigadeiro', period: 'Março de 2009 – Dezembro de 2011' },
    { id: 'cemfa-08', ordinal: '8.º CEMFA', name: 'Alberto Carlos Barbosa Fernandes', rank: 'Major-General', period: 'Dezembro de 2011 – Junho de 2016' },
    { id: 'cemfa-09', ordinal: '9.º CEMFA', name: 'Anildo Emanuel da Graça Morais', rank: 'Major-General', period: 'Junho de 2016 – Junho de 2022' },
    { id: 'cemfa-10', ordinal: '10.º CEMFA', name: 'António Duarte Monteiro', rank: 'Contra-Almirante', period: 'Julho de 2022 – Outubro de 2025' }
  ];

  let commemorativeDates = [
    { id: 'forcas-armadas', day: '15', month: 'JANEIRO', iso: '01-15', name: 'Dia das Forças Armadas', unit: 'Forças Armadas de Cabo Verde', description: 'Data comemorativa principal das Forças Armadas.', filters: ['forcas-armadas'] },
    { id: 'cimmb', day: '6', month: 'FEVEREIRO', iso: '02-06', name: 'Dia do CIMMB / Zeca Santos', unit: 'CIMMB — Centro de Instrução Militar do Morro Branco', description: 'Data relacionada com o patrono do Centro.', filters: ['centros-instrucao'] },
    { id: 'manuel-monteiro', day: '17', month: 'JUNHO', iso: '06-17', name: 'Dia da Unidade Manuel Monteiro', unit: 'Unidade Manuel Monteiro', description: 'Data comemorativa da unidade.', filters: ['unidades'] },
    { id: 'guarda-costeira', day: '11', month: 'OUTUBRO', iso: '10-11', name: 'Dia da Guarda Costeira', unit: 'Guarda Costeira', description: 'Data comemorativa da Guarda Costeira, conforme a Resolução n.º 6/2010.', filters: ['guarda-costeira'] }
  ];

  const insigniaMap = new Map();   // `${componente}|${posto}` → { url, alt } (vem da API)
  let rankComponents = [
    {
      name: 'Guarda Nacional',
      classes: [
        { name: 'Oficiais-Generais', posts: ['Major-General', 'Brigadeiro-General'] },
        { name: 'Oficiais Superiores', posts: ['Coronel', 'Tenente-Coronel', 'Major'] },
        { name: 'Oficiais Subalternos', posts: ['Capitão', 'Primeiro-Tenente', 'Tenente', 'Subtenente', 'Aspirante a Oficial'] }
      ]
    },
    {
      name: 'Guarda Costeira',
      classes: [
        { name: 'Oficiais-Generais', posts: ['Contra-Almirante', 'Comodoro'] },
        { name: 'Oficiais Superiores', posts: ['Capitão-do-Mar', 'Capitão-de-Navio', 'Capitão-de-Patrulha'] },
        { name: 'Oficiais Subalternos', posts: ['Capitão-Tenente', 'Primeiro-Tenente', 'Tenente', 'Guarda-Marinha', 'Aspirante a Oficial'] }
      ]
    }
  ];
  let sharedRankClasses = [
    { name: 'Sargentos', note: 'Postos comuns à Guarda Nacional e à Guarda Costeira.', posts: ['Sargento-Chefe', 'Sargento-Principal', 'Primeiro-Sargento', 'Segundo-Sargento', 'Sargento', 'Furriel'], distinctPost: 'Sargento-Mor' },
    { name: 'Praças', note: 'Postos comuns à Guarda Nacional e à Guarda Costeira.', posts: ['Cabo-Principal', 'Cabo-Secção', 'Cabo-Adjunto', 'Primeiro-Cabo', 'Segundo-Cabo', 'Soldado'], distinctPost: 'Cabo-Mor' }
  ];

  function renderCemfaGallery() {
    return `<div class="cemfa-memory-page"><section class="cemfa-gallery-grid" aria-label="Galeria histórica dos CEMFA">${cemfaTimeline.map(record => `<article class="cemfa-gallery-card"><div class="cemfa-gallery-photo"${record.photo ? '' : ' role="img"'} ${record.photo ? '' : `aria-label="Fotografia oficial de ${escapeHtml(record.name)} a adicionar"`}>${record.photo ? `<img src="${escapeHtml(record.photo)}" alt="Fotografia oficial de ${escapeHtml(record.name)}" style="width:100%;height:100%;object-fit:cover">` : '<span>[ ADICIONAR FOTOGRAFIA ]</span>'}</div><div class="cemfa-gallery-copy"><span class="cemfa-gallery-ordinal">${escapeHtml(record.ordinal)}</span><h2>${escapeHtml(record.name)}</h2><em>${escapeHtml(record.rank)}</em><p>${escapeHtml(record.period)}</p><a class="btn btn-outline-dark" href="perfil-cemfa.html?id=${encodeURIComponent(record.id)}">Ver Biografia</a></div></article>`).join('')}</section></div>`;
  }

  function renderRankCatalog() {
    const renderPost = (post, component = '', showLabel = true) => {
      const sets = window.FA_DIVISAS || {};
      const fromApi = insigniaMap.get(`${component || ''}|${post}`);   // imagem do painel (se existir)
      const image = (fromApi && fromApi.url) || (component && sets[component] && sets[component][post]) || (sets.shared && sets.shared[post]) || '';
      const owner = component ? ` — ${component}` : '';
      const slot = image
        ? `<figure class="rank-insignia-slot has-image"><img src="${escapeHtml(image)}" alt="${escapeHtml((fromApi && fromApi.alt) || `Divisa de ${post}${owner}`)}" loading="lazy" decoding="async"></figure>`
        : `<div class="rank-insignia-slot" role="img" aria-label="Área para adicionar o distintivo oficial de ${escapeHtml(post)}${component ? ` da ${escapeHtml(component)}` : ''}"><span>[ ADICIONAR IMAGEM DO DISTINTIVO ]</span></div>`;
      return `<article class="rank-post-card"><h3>${escapeHtml(post)}</h3>${slot}${component && showLabel ? `<p>${escapeHtml(component)}</p>` : ''}</article>`;
    };
    const renderDistinctPost = post => `<div class="rank-distinct"><h3 class="rank-distinct-title">${escapeHtml(post)}<small>Distintivo diferente em cada componente</small></h3><div class="rank-post-grid">${rankComponents.map(component => renderPost(post, component.name)).join('')}</div></div>`;
    const componentLogo = component => {
      const image = component.name === 'Guarda Nacional' ? 'guarda-nacional.png' : 'guarda-costeira.png';
      return `<div class="rank-component-brand"><img src="assets/images/${image}" alt="Logotipo oficial da ${escapeHtml(component.name)}" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span hidden>Logotipo oficial a inserir</span></div>`;
    };
    const sharedBrands = `<div class="shared-force-brands">${rankComponents.map(component => `<span class="shared-force-brand"><img src="assets/images/${component.name === 'Guarda Nacional' ? 'guarda-nacional.png' : 'guarda-costeira.png'}" alt="" onerror="this.hidden=true"><span>${escapeHtml(component.name)}</span></span>`).join('')}</div>`;
    return `<div class="rank-catalog-page"><div class="rank-component-columns">${rankComponents.map((component, componentIndex) => `<section class="rank-component" aria-labelledby="rank-component-${componentIndex}">${componentLogo(component)}<h2 class="rank-component-title" id="rank-component-${componentIndex}">${escapeHtml(component.name)}</h2><p class="rank-component-subtitle">Postos dos Oficiais</p>${component.classes.map((rankClass, classIndex) => `<section class="rank-category" aria-labelledby="rank-${componentIndex}-${classIndex}"><div class="rank-category-heading"><h3 id="rank-${componentIndex}-${classIndex}">${escapeHtml(rankClass.name)}</h3></div><div class="rank-post-grid">${rankClass.posts.map(post => renderPost(post, component.name, false)).join('')}</div></section>`).join('')}</section>`).join('')}</div><div class="rank-shared-classes">${sharedBrands}${sharedRankClasses.map((rankClass, classIndex) => `<section class="rank-category rank-category-shared" aria-labelledby="rank-shared-${classIndex}"><div class="rank-category-heading"><h2 id="rank-shared-${classIndex}">${escapeHtml(rankClass.name)}</h2><p>${escapeHtml(rankClass.note)}</p></div>${rankClass.distinctPost ? renderDistinctPost(rankClass.distinctPost) : ''}<div class="rank-post-grid">${rankClass.posts.map(post => renderPost(post)).join('')}</div></section>`).join('')}</div></div>`;
  }

  function renderCemfaProfile() {
    const profileId = new URLSearchParams(location.search).get('id');
    const record = cemfaTimeline.find(item => item.id === profileId);
    if (!record) return '<section class="cemfa-profile-page"><h2>Perfil não encontrado</h2><a class="btn btn-outline-dark" href="galeria-cemfa.html">Voltar à Galeria dos CEMFA</a></section>';
    document.title = `${record.ordinal} — ${record.name} — Forças Armadas de Cabo Verde`;
    return `<article class="cemfa-profile-page"><a class="cemfa-profile-back" href="galeria-cemfa.html">← Galeria dos CEMFA</a><div class="cemfa-profile-card"><div class="cemfa-gallery-photo"${record.photo ? '' : ' role="img"'} ${record.photo ? '' : `aria-label="Fotografia oficial de ${escapeHtml(record.name)} a adicionar"`}>${record.photo ? `<img src="${escapeHtml(record.photo)}" alt="Fotografia oficial de ${escapeHtml(record.name)}" style="width:100%;height:100%;object-fit:cover">` : '<span>[ ADICIONAR FOTOGRAFIA ]</span>'}</div><div><span class="cemfa-gallery-ordinal">${escapeHtml(record.ordinal)}</span><h2>${escapeHtml(record.name)}</h2><p class="cemfa-profile-rank">${escapeHtml(record.rank)}</p><p class="cemfa-profile-period">${escapeHtml(record.period)}</p></div></div></article>`;
  }

  function renderCommemorativeCalendar() {
    const filters = [
      ['all', 'Todas'], ['forcas-armadas', 'Forças Armadas'], ['guarda-nacional', 'Guarda Nacional'],
      ['guarda-costeira', 'Guarda Costeira'], ['comandos', 'Comandos'], ['unidades', 'Unidades'],
      ['centros-instrucao', 'Centros de Instrução']
    ];
    return `<div class="commemorative-calendar"><div class="memory-page-intro"><div class="eyebrow">Calendário institucional</div><p>Datas apresentadas com base nas informações disponíveis. Outras comemorações serão acrescentadas somente após confirmação em fonte institucional.</p></div>
      <div class="date-filter-bar" role="group" aria-label="Filtrar datas comemorativas">${filters.map(([value, label], index) => `<button class="date-filter${index === 0 ? ' active' : ''}" type="button" data-date-filter="${value}" aria-pressed="${index === 0 ? 'true' : 'false'}">${escapeHtml(label)}</button>`).join('')}</div>
      <div class="date-empty-state" hidden>Nenhuma data confirmada nesta categoria.</div>
      <div class="date-table-wrap"><table class="date-table"><thead><tr><th>Data</th><th>Comemoração</th><th>Instituição / Unidade</th><th>Descrição</th><th></th></tr></thead><tbody>${commemorativeDates.map(event => `<tr data-event-row="${event.id}" data-date-filters="${event.filters.join(' ')}"><td><time datetime="--${event.iso}">${event.day} de ${event.month.toLocaleLowerCase('pt-CV')}</time></td><td>${escapeHtml(event.name)}</td><td>${escapeHtml(event.unit)}</td><td>${escapeHtml(event.description)}</td><td><button class="date-detail-button" type="button" data-open-date="${event.id}">Ver história da data</button></td></tr>`).join('')}</tbody></table></div>
      <section class="date-card-grid" aria-label="Cartões cronológicos">${commemorativeDates.map(event => `<article class="date-card" data-event-card="${event.id}" data-date-filters="${event.filters.join(' ')}"><div class="date-card-calendar"><strong>${event.day}</strong><span>${event.month}</span></div><div class="date-card-body"><h2>${escapeHtml(event.name)}</h2><p>${escapeHtml(event.unit)}</p><button class="date-detail-button" type="button" data-open-date="${event.id}">Ver história da data</button></div></article>`).join('')}</section>
      <dialog class="date-history-dialog" id="date-history-dialog"><button class="date-dialog-close" type="button" data-close-date aria-label="Fechar">×</button><div class="eyebrow">Memória Institucional</div><div id="date-dialog-content"></div></dialog>
    </div>`;
  }

  function renderMemorySpecialPage() {
    if (pageKey === 'galeria-cemfa') return renderCemfaGallery();
    if (pageKey === 'postos-distintivos') return renderRankCatalog();
    if (pageKey === 'datas-comemorativas') return renderCommemorativeCalendar();
    if (pageKey === 'perfil-cemfa') return renderCemfaProfile();
    return null;
  }

  function setupCommemorativeCalendar() {
    const calendar = document.querySelector('.commemorative-calendar');
    if (!calendar) return;
    const empty = calendar.querySelector('.date-empty-state');
    calendar.querySelectorAll('[data-date-filter]').forEach(button => {
      button.addEventListener('click', () => {
        const selected = button.dataset.dateFilter;
        calendar.querySelectorAll('[data-date-filter]').forEach(filter => {
          const active = filter === button;
          filter.classList.toggle('active', active);
          filter.setAttribute('aria-pressed', String(active));
        });
        let visible = 0;
        calendar.querySelectorAll('[data-date-filters]').forEach(item => {
          const matches = selected === 'all' || item.dataset.dateFilters.split(' ').includes(selected);
          item.hidden = !matches;
          if (matches && item.hasAttribute('data-event-row')) visible += 1;
        });
        empty.hidden = visible > 0;
      });
    });

    const dialog = calendar.querySelector('#date-history-dialog');
    const dialogContent = calendar.querySelector('#date-dialog-content');
    calendar.querySelectorAll('[data-open-date]').forEach(button => {
      button.addEventListener('click', () => {
        const event = commemorativeDates.find(item => item.id === button.dataset.openDate);
        if (!event) return;
        dialogContent.innerHTML = `<div class="date-dialog-date">${escapeHtml(event.day)} · ${escapeHtml(event.month)}</div><h2>${escapeHtml(event.name)}</h2><dl class="memory-fields"><div><dt>Instituição / Unidade</dt><dd>${escapeHtml(event.unit)}</dd></div><div class="memory-field-wide"><dt>Significado</dt><dd>${escapeHtml(event.description)}</dd></div><div class="memory-field-wide"><dt>Origem e história</dt><dd>${event.id === 'guarda-costeira' ? 'Data comemorativa conforme a Resolução n.º 6/2010.' : '[Informação a adicionar após confirmação documental]'}</dd></div></dl><div class="date-dialog-media">[ Fotografias e documentos oficiais a adicionar ]</div><a class="inline-link" href="index.html#historia">Documentos institucionais</a>`;
        dialog.showModal();
      });
    });
    calendar.querySelector('[data-close-date]')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close();
    });
  }

  document.title = `${pageTitle} — Forças Armadas de Cabo Verde`;

  /* Navbar e rodapé vêm da MASTER PAGE (master.html → js/core/master.js). */

  const CEMFA_MESSAGE = {"paragraphs": ["É com humildade, honra e um profundo sentido de missão que o saudamos e lhe damos as boas-vindas ao portal oficial das Forças Armadas de Cabo Verde.", "Num mundo cada vez mais interligado, a comunicação institucional assume um papel determinante. Por isso, este portal foi concebido como uma ferramenta estratégica para reforçar e projetar a imagem das Forças Armadas, promovendo um diálogo transparente e uma interação permanente com todos os cidadãos, parceiros e demais públicos de interesse.", "Nesta plataforma moderna e interativa, disponibilizamos informações relevantes sobre a história da instituição, desde a sua criação até aos desenvolvimentos mais recentes, bem como sobre a missão, os princípios e os valores que orientam diariamente a nossa atuação. Aqui poderá igualmente encontrar conteúdos dedicados ao Serviço Militar Obrigatório, enquanto dever cívico e patriótico, e acompanhar a divulgação das diversas atividades desenvolvidas sob a égide da instituição castrense.", "As Forças Armadas de Cabo Verde constituem um dos pilares fundamentais da soberania nacional e são amplamente reconhecidas como símbolo de estabilidade, paz e coesão. Cumprimos o sagrado dever de defender a Pátria, salvaguardando a liberdade, a democracia, a segurança e a solidariedade, servindo a Nação com lealdade, disciplina, sacrifício e total dedicação.", "Ao explorar este portal, encontrará o reflexo do nosso empenho permanente em servir Cabo Verde, honrando o legado de coragem, honra e resiliência deixado por todos aqueles que contribuíram para a construção da instituição que hoje orgulhosamente representamos.", "Em nome das Forças Armadas, que tenho a honra de dirigir, desejo-lhe uma excelente navegação e que encontre aqui a informação que procura."], "vivas": ["Viva as Forças Armadas de Cabo Verde!", "Viva Cabo Verde!"]};
  function renderCemfaMessage() {
    if (pageKey !== 'cemfa') return '';
    const [lead, ...rest] = CEMFA_MESSAGE.paragraphs;
    const paras = rest.map(t => `<p>${escapeHtml(t)}</p>`).join('');
    const vivas = CEMFA_MESSAGE.vivas.map(t => `<span>${escapeHtml(t)}</span>`).join('');
    return `<section class="cemfa-msg reveal" id="mensagem" aria-labelledby="cemfa-msg-title"><header class="cemfa-msg-head"><div class="eyebrow">Mensagem do CEMFA</div><h2 id="cemfa-msg-title" data-cms="cemfa_message.title">Mensagem de Sua Excelência o Chefe do Estado-Maior das Forças Armadas</h2><div class="cemfa-msg-orn" aria-hidden="true"><span></span><i>✦</i><span></span></div></header><div class="cemfa-msg-body"><p class="cemfa-msg-salute" data-cms="cemfa_message.salute">Prezado Internauta,</p><p class="cemfa-msg-lead" data-cms="cemfa_message.lead">${escapeHtml(lead)}</p><div class="cemfa-msg-rest" data-cms-paragraphs="cemfa_message.body">${paras}</div><p class="cemfa-msg-vivas" data-cms-lines="cemfa_message.vivas">${vivas}</p><p class="cemfa-msg-sign"><strong data-cms="cemfa_message.signature_name">Contra-Almirante Manuel António Pereira Semedo</strong><span data-cms="cemfa_message.signature_role">Chefe do Estado-Maior das Forças Armadas</span></p></div></section>`;
  }

  function renderContent() {
    buildGroups();
    safeTitle = escapeHtml(currentTitle);
    document.getElementById('institutional-content').innerHTML = `
      <main>
        <section class="page-hero">
          <div class="container page-hero-inner">
            <img class="page-hero-crest" src="${escapeHtml(richData?.heroCrest?.src || 'assets/images/logo-fa.png')}" alt="${escapeHtml(richData?.heroCrest?.alt || 'Emblema Oficial das Forças Armadas de Cabo Verde')}">
            <div><div class="eyebrow">Área Institucional</div><h1>${safeTitle}</h1><p>${escapeHtml(pageContent?.intro || 'Página institucional preparada para receber conteúdo oficial.')}</p></div>
          </div>
        </section>
        <section class="placeholder-section">
          <div class="container">
            ${pageContent?.profile ? `<div class="profile-summary"><div class="profile-photo">${pageContent.profile.photo ? `<img src="${escapeHtml(pageContent.profile.photo)}" alt="${escapeHtml(pageContent.profile.photoAlt || pageContent.profile.name)}">` : 'Fotografia oficial a inserir'}</div><div><div class="eyebrow">${escapeHtml(pageContent.profile.role)}</div><h2>${escapeHtml(pageContent.profile.name)}</h2><p>${escapeHtml(pageContent.profile.date)}</p></div></div>` : ''}
            ${responsible ? renderResponsibleCard(responsible) : ''}
            ${renderCemfaMessage()}
            <div class="page-intro"><div class="eyebrow">${pageContent ? 'Informação institucional' : 'Conteúdo em preparação'}</div><h2>${pageContent ? 'Estrutura e informação' : 'Estrutura de informação institucional'}</h2><p>${pageContent ? 'A informação pessoal, histórica e visual sem confirmação permanece reservada para atualização oficial.' : 'As áreas abaixo estão reservadas para inserção posterior de informação oficial.'}</p></div>
            ${renderMemorySpecialPage() || (pageContent ? `<div class="institutional-blocks">${pageGroups.map(renderGroup).join('')}</div>` : `<div class="placeholder-grid">${pageSections.map(section => `<article class="placeholder-card"><h2>${escapeHtml(section)}</h2><div class="content-slot">Área reservada para conteúdo institucional.</div></article>`).join('')}</div>`)}
          </div>
        </section>
      </main>`;

    if (pageKey === 'datas-comemorativas') setupCommemorativeCalendar();

    hydrateMediaSlots();
  }
  renderContent();
  if (window.FA_CMS && window.FA_CMS.refresh) window.FA_CMS.refresh();   // aplica já os textos editados no painel (mensagem do CEMFA…)

  

  /* ---------- conteúdo administrado no painel (API) ----------
     O conteúdo estático acima é apresentado de imediato e serve de reserva.
     Quando a API responde, os dados são substituídos e a área de conteúdo é redesenhada. */
  const COMPONENTS = ['Guarda Nacional', 'Guarda Costeira'];

  function applyRanks(classes) {
    insigniaMap.clear();
    const comps = COMPONENTS.map(name => ({ name, classes: [] }));
    const shared = [];
    classes.forEach(cls => {
      const common = cls.ranks.filter(r => !r.component);
      cls.ranks.forEach(r => { if (r.insignia_url) insigniaMap.set(`${r.component || ''}|${r.name}`, { url: r.insignia_url, alt: r.insignia_alt }); });
      if (!common.length) {
        comps.forEach(c => c.classes.push({ name: cls.name, posts: cls.ranks.filter(r => r.component === c.name).map(r => r.name) }));
      } else {
        const distinct = cls.ranks.filter(r => r.component && r.component === COMPONENTS[0]).map(r => r.name)
          .find(n => cls.ranks.some(r => r.component === COMPONENTS[1] && r.name === n));
        shared.push({ name: cls.name, note: cls.note || '', posts: common.map(r => r.name), distinctPost: distinct || null });
      }
    });
    rankComponents = comps;
    sharedRankClasses = shared;
  }

  async function loadRemote() {
    if (!window.FA_API || !FA_API.enabled()) return;
    let changed = false;
    if (pageKey === 'postos-distintivos') {
      const classes = (await FA_API.edited('ranks')) ? await FA_API.get('/ranks') : null;
      if (Array.isArray(classes) && classes.length) { applyRanks(classes); changed = true; }
    } else if (pageKey === 'datas-comemorativas') {
      const items = (await FA_API.edited('collection:commemorative_dates')) ? await FA_API.get('/collections/commemorative_dates') : null;
      if (Array.isArray(items) && items.length) {
        commemorativeDates = items.map(i => ({ id: i.id_key, day: i.day, month: i.month, iso: i.iso, name: i.name, unit: i.unit || '', description: i.description || '', filters: String(i.filters || '').split(',').map(f => f.trim()).filter(Boolean) }));
        changed = true;
      }
    } else if (pageKey === 'galeria-cemfa' || pageKey === 'perfil-cemfa') {
      const items = (await FA_API.edited('collection:cemfa_timeline')) ? await FA_API.get('/collections/cemfa_timeline') : null;
      if (Array.isArray(items) && items.length) {
        cemfaTimeline = items.map(i => ({ id: i.id_key, ordinal: i.ordinal, name: i.name, rank: i.rank || '', period: i.period || '', photo: i.photo || '' }));
        changed = true;
      }
    } else {
      const page = await FA_API.get('/pages/' + encodeURIComponent(pageKey));
      if (genericPage && !(page && page.title)) {
        pageContent = { intro: 'Página não encontrada ou ainda não publicada.', groups: [] };
        changed = true;
      }
      if (page && page.title && (page.edited || genericPage)) {   // só páginas alteradas no painel (ou criadas nele); as outras mantêm o conteúdo do frontend
        const groups = (page.blocks || []).map(b => ({ ...(b.content || {}), title: b.title || '' }));
        const meta = page.meta || {};
        pageContent = { ...(pageContent || {}), intro: page.summary || pageContent?.intro, groups: groups.length ? groups : pageContent?.groups, profile: meta.profile || pageContent?.profile };
        if (meta.responsible) responsible = meta.responsible;
        noDocuments = Boolean(meta.no_documents);
        currentTitle = page.title;
        document.title = page.seo_title || `${page.title} — Forças Armadas de Cabo Verde`;
        if (page.seo_description) { let m = document.querySelector('meta[name="description"]'); if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'description'); document.head.appendChild(m); } m.setAttribute('content', page.seo_description); }
        changed = true;
      }
    }
    if (changed) { renderContent(); if (window.FA_CMS && window.FA_CMS.refresh) window.FA_CMS.refresh(); }
  }
  loadRemote();
  if (window.FA_LIVE) window.FA_LIVE.onChange(loadRemote);   // alterações no painel → atualiza a página
})();
