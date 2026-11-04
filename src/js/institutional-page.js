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
  const safeTitle = escapeHtml(pageTitle);
  const pageKey = location.pathname.split('/').pop().replace(/\.html?$/i, '');
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
    cemfa: {
      intro: 'Chefe do Estado-Maior das Forças Armadas (CEMFA). O cargo é exercido pelo Contra-Almirante Manuel António Pereira Semedo, empossado em 8 de novembro de 2025.',
      profile: { name: 'Contra-Almirante Manuel António Pereira Semedo', role: 'Chefe do Estado-Maior das Forças Armadas — CEMFA', date: 'Tomada de posse: 8 de novembro de 2025' },
      groups: [
        { title: 'Biografia e percurso', text: 'Biografia detalhada, percurso profissional e militar: campos reservados para publicação oficial confirmada.' },
        { title: 'Funções', text: 'Informação institucional sobre competências, funções e prioridades: completar com publicações oficiais das Forças Armadas.' },
        { title: 'Mensagem e atividades', text: 'Mensagem, atividades, notícias e galeria oficial serão adicionadas nesta área.', links: [{ label: 'Notícias', href: 'noticias.html' }, { label: 'Galeria dos CEMFA', href: 'galeria-cemfa.html' }, { label: 'Contactos', href: 'contactos.html' }] }
      ]
    },
    'comandante-supremo': {
      intro: 'O Presidente da República, Dr. José Maria Pereira Neves, exerce as funções de Comandante Supremo das Forças Armadas desde 9 de novembro de 2021.',
      profile: { name: 'Dr. José Maria Pereira Neves', role: 'Presidente da República e Comandante Supremo das Forças Armadas', date: 'Início do mandato: 9 de novembro de 2021' },
      groups: [
        { title: 'Competências constitucionais', text: 'Descrição das competências relacionadas com as Forças Armadas a completar com referência direta à Constituição e legislação aplicável.' },
        { title: 'Biografia e mensagens', text: 'Biografia institucional, mensagens e percurso: área preparada para conteúdo oficial.' },
        { title: 'Galeria, notícias e informações', links: [{ label: 'Notícias', href: 'noticias.html' }, { label: 'Multimédia', href: 'multimedia.html' }, { label: 'Contactos', href: 'contactos.html' }] }
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
    'inspecao-forcas-armadas': { intro: 'Página institucional da Inspeção das Forças Armadas.', groups: [{ title: 'Apresentação', text: 'Apresentação institucional a completar com conteúdo oficial.' }, { title: 'Missão e competências', text: 'Missão e competências da Inspeção: informação oficial a adicionar.' }, { title: 'Estrutura', text: 'Estrutura orgânica e atribuições das unidades internas: conteúdo oficial a adicionar.' }, { title: 'Notícias, documentos, galeria e contactos', text: 'Conteúdos oficiais e contactos serão publicados após validação.', links: [{ label: 'Notícias', href: 'noticias.html' }, { label: 'Documentos oficiais', href: 'noticias.html#documentos' }, { label: 'Galeria', href: 'multimedia.html' }, { label: 'Contactos', href: 'contactos.html' }] }] },
    'direcao-informacoes-militares': { intro: 'Página institucional da Direção de Informações Militares.', groups: [{ title: 'Apresentação', text: 'Apresentação institucional a completar com conteúdo oficial.' }, { title: 'Missão e competências', text: 'Missão e competências da Direção: informação oficial a adicionar.' }, { title: 'Estrutura', text: 'Estrutura orgânica e atribuições das unidades internas: conteúdo oficial a adicionar.' }, { title: 'Notícias, documentos, galeria e contactos', text: 'Conteúdos oficiais e contactos serão publicados após validação.', links: [{ label: 'Notícias', href: 'noticias.html' }, { label: 'Documentos oficiais', href: 'noticias.html#documentos' }, { label: 'Galeria', href: 'multimedia.html' }, { label: 'Contactos', href: 'contactos.html' }] }] },
    'planeamento-estrategico': { intro: 'Página institucional do Centro de Planeamento Estratégico Militar.', groups: [{ title: 'Apresentação', text: 'Apresentação institucional a completar com conteúdo oficial.' }, { title: 'Missão e competências', text: 'Missão e competências do Centro: informação oficial a adicionar.' }, { title: 'Estrutura', text: 'Estrutura orgânica e atribuições das unidades internas: conteúdo oficial a adicionar.' }, { title: 'Notícias, documentos, galeria e contactos', text: 'Conteúdos oficiais e contactos serão publicados após validação.', links: [{ label: 'Notícias', href: 'noticias.html' }, { label: 'Documentos oficiais', href: 'noticias.html#documentos' }, { label: 'Galeria', href: 'multimedia.html' }, { label: 'Contactos', href: 'contactos.html' }] }] },
    'comando-guarnicao': { intro: 'Página institucional do Comando da Guarnição.', groups: [{ title: 'Apresentação', text: 'Apresentação institucional a completar com conteúdo oficial.' }, { title: 'Missão e competências', text: 'Missão e competências do Comando: informação oficial a adicionar.' }, { title: 'Estrutura', text: 'Estrutura orgânica e atribuições das unidades internas: conteúdo oficial a adicionar.' }, { title: 'Notícias, documentos, galeria e contactos', text: 'Conteúdos oficiais e contactos serão publicados após validação.', links: [{ label: 'Notícias', href: 'noticias.html' }, { label: 'Documentos oficiais', href: 'noticias.html#documentos' }, { label: 'Galeria', href: 'multimedia.html' }, { label: 'Contactos', href: 'contactos.html' }] }] },
    'oficina-central': {
      intro: 'A Oficina Central das Forças Armadas integra a estrutura do Comando da Logística.',
      groups: [{ title: 'Missão e competências', text: 'Informação oficial sobre as competências, serviços, estrutura, notícias, documentos, galeria e contactos será adicionada nesta área.', links: [{ label: 'Comando da Logística', href: 'comando-logistica.html', button: true }] }]
    },
    'politica-privacidade': { intro: 'Política de Privacidade das Forças Armadas de Cabo Verde.', groups: [{ title: 'Informação de privacidade', text: 'O conteúdo oficial sobre tratamento de dados, finalidades, conservação e direitos dos titulares será publicado após validação institucional.' }] },
    acessibilidade: { intro: 'Informação de acessibilidade do portal das Forças Armadas de Cabo Verde.', groups: [{ title: 'Acessibilidade', text: 'Declaração de acessibilidade, nível de conformidade e contactos para comunicação de barreiras serão publicados após auditoria institucional.' }] }
  };
  const pageContent = contentPages[pageKey];
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
  const responsible = responsibleProfiles[pageKey];
  const pageGroups = pageContent?.groups ? [...pageContent.groups] : [];
  if (responsible && !pageGroups.some(group => /documentos/i.test(group.title))) {
    pageGroups.push({ title: 'Documentos oficiais', text: 'Consulte os documentos institucionais publicados no portal. Esta ligação abre a secção documental existente.', links: [{ label: 'Abrir documentos oficiais', href: 'noticias.html#documentos', button: true }] });
  }

  function renderLinks(links = []) {
    return links.map(link => `<a class="${link.button ? 'btn btn-outline-dark' : 'inline-link'}" href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`).join('');
  }

  function renderGroup(group) {
    const groupItems = group.items || [];
    const groupId = pageKey === 'guarda-nacional' && group.title.startsWith('1ª') ? 'regiao-1'
      : pageKey === 'guarda-nacional' && group.title.startsWith('2ª') ? 'regiao-2'
      : pageKey === 'guarda-nacional' && group.title.startsWith('3ª') ? 'regiao-3'
      : pageKey === 'comando-logistica' && group.title === 'Oficina Central das Forças Armadas' ? 'oficina-central'
      : '';
    let content = group.text ? `<p>${escapeHtml(group.text)}</p>` : '';
    if (group.layout === 'timeline') {
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
    content += renderLinks(group.links);
    return `<article class="institutional-block"${groupId ? ` id="${groupId}"` : ''}><h2>${escapeHtml(group.title)}</h2>${content}</article>`;
  }

  function renderResponsibleCard(profile) {
    const fields = [
      ['Nome', profile.name],
      ['Posto', profile.rank],
      ['Cargo', profile.office],
      ['Período de exercício', profile.period],
      ['Biografia', profile.biography]
    ];
    const photo = profile.photo
      ? `<img class="responsible-photo-image" src="${escapeHtml(profile.photo)}" alt="Fotografia de ${escapeHtml(profile.name || profile.office)}">`
      : '<span class="responsible-photo-placeholder">Área para adicionar fotografia oficial</span>';
    return `<section class="responsible-section" aria-labelledby="responsible-title"><div class="eyebrow">Responsável</div><h2 id="responsible-title">${escapeHtml(profile.title)}</h2><article class="responsible-card"><div class="responsible-photo">${photo}</div><dl class="profile-fields">${fields.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value || 'A preencher com informação oficial')}</dd></div>`).join('')}</dl></article></section>`;
  }

  const cemfaTimeline = [
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

  const commemorativeDates = [
    { id: 'forcas-armadas', day: '15', month: 'JANEIRO', iso: '01-15', name: 'Dia das Forças Armadas', unit: 'Forças Armadas de Cabo Verde', description: 'Data comemorativa principal das Forças Armadas.', filters: ['forcas-armadas'] },
    { id: 'cimmb', day: '6', month: 'FEVEREIRO', iso: '02-06', name: 'Dia do CIMMB / Zeca Santos', unit: 'CIMMB — Centro de Instrução Militar do Morro Branco', description: 'Data relacionada com o patrono do Centro.', filters: ['centros-instrucao'] },
    { id: 'manuel-monteiro', day: '17', month: 'JUNHO', iso: '06-17', name: 'Dia da Unidade Manuel Monteiro', unit: 'Unidade Manuel Monteiro', description: 'Data comemorativa da unidade.', filters: ['unidades'] },
    { id: 'guarda-costeira', day: '11', month: 'OUTUBRO', iso: '10-11', name: 'Dia da Guarda Costeira', unit: 'Guarda Costeira', description: 'Data comemorativa da Guarda Costeira, conforme a Resolução n.º 6/2010.', filters: ['guarda-costeira'] }
  ];

  const rankComponents = [
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
  const sharedRankClasses = [
    { name: 'Sargentos', note: 'Postos comuns à Guarda Nacional e à Guarda Costeira.', posts: ['Sargento-Mor', 'Sargento-Chefe', 'Sargento-Principal', 'Primeiro-Sargento', 'Segundo-Sargento', 'Sargento', 'Furriel'] },
    { name: 'Praças', note: 'Postos comuns à Guarda Nacional e à Guarda Costeira.', posts: ['Cabo-Mor', 'Cabo-Principal', 'Cabo-Secção', 'Primeiro-Cabo', 'Segundo-Cabo', 'Soldado'] }
  ];

  function renderCemfaGallery() {
    return `<div class="cemfa-memory-page"><section class="cemfa-gallery-grid" aria-label="Galeria histórica dos CEMFA">${cemfaTimeline.map(record => `<article class="cemfa-gallery-card"><div class="cemfa-gallery-photo" role="img" aria-label="Fotografia oficial de ${escapeHtml(record.name)} a adicionar"><span>[ ADICIONAR FOTOGRAFIA ]</span></div><div class="cemfa-gallery-copy"><span class="cemfa-gallery-ordinal">${escapeHtml(record.ordinal)}</span><h2>${escapeHtml(record.name)}</h2><em>${escapeHtml(record.rank)}</em><p>${escapeHtml(record.period)}</p><a class="btn btn-outline-dark" href="perfil-cemfa.html?id=${encodeURIComponent(record.id)}">Ver Biografia</a></div></article>`).join('')}</section></div>`;
  }

  function renderRankCatalog() {
    const renderPost = post => `<article class="rank-post-card"><h3>${escapeHtml(post)}</h3><div class="rank-insignia-slot" role="img" aria-label="Área para adicionar o distintivo oficial de ${escapeHtml(post)}"><span>[ ADICIONAR IMAGEM DO DISTINTIVO ]</span></div></article>`;
    const componentLogo = component => {
      const image = component.name === 'Guarda Nacional' ? 'guarda-nacional.png' : 'guarda-costeira.png';
      return `<div class="rank-component-brand"><img src="assets/images/${image}" alt="Logotipo oficial da ${escapeHtml(component.name)}" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span hidden>Logotipo oficial a inserir</span></div>`;
    };
    const sharedBrands = `<div class="shared-force-brands">${rankComponents.map(component => `<span class="shared-force-brand"><img src="assets/images/${component.name === 'Guarda Nacional' ? 'guarda-nacional.png' : 'guarda-costeira.png'}" alt="" onerror="this.hidden=true"><span>${escapeHtml(component.name)}</span></span>`).join('')}</div>`;
    return `<div class="rank-catalog-page"><div class="rank-component-columns">${rankComponents.map((component, componentIndex) => `<section class="rank-component" aria-labelledby="rank-component-${componentIndex}">${componentLogo(component)}<h2 class="rank-component-title" id="rank-component-${componentIndex}">${escapeHtml(component.name)}</h2><p class="rank-component-subtitle">Postos dos Oficiais</p>${component.classes.map((rankClass, classIndex) => `<section class="rank-category" aria-labelledby="rank-${componentIndex}-${classIndex}"><div class="rank-category-heading"><h3 id="rank-${componentIndex}-${classIndex}">${escapeHtml(rankClass.name)}</h3></div><div class="rank-post-grid">${rankClass.posts.map(renderPost).join('')}</div></section>`).join('')}</section>`).join('')}</div><div class="rank-shared-classes">${sharedBrands}${sharedRankClasses.map((rankClass, classIndex) => `<section class="rank-category rank-category-shared" aria-labelledby="rank-shared-${classIndex}"><div class="rank-category-heading"><h2 id="rank-shared-${classIndex}">${escapeHtml(rankClass.name)}</h2><p>${escapeHtml(rankClass.note)}</p></div><div class="rank-post-grid">${rankClass.posts.map(renderPost).join('')}</div></section>`).join('')}</div></div>`;
  }

  function renderCemfaProfile() {
    const profileId = new URLSearchParams(location.search).get('id');
    const record = cemfaTimeline.find(item => item.id === profileId);
    if (!record) return '<section class="cemfa-profile-page"><h2>Perfil não encontrado</h2><a class="btn btn-outline-dark" href="galeria-cemfa.html">Voltar à Galeria dos CEMFA</a></section>';
    document.title = `${record.ordinal} — ${record.name} — Forças Armadas de Cabo Verde`;
    return `<article class="cemfa-profile-page"><a class="cemfa-profile-back" href="galeria-cemfa.html">← Galeria dos CEMFA</a><div class="cemfa-profile-card"><div class="cemfa-gallery-photo" role="img" aria-label="Fotografia oficial de ${escapeHtml(record.name)} a adicionar"><span>[ ADICIONAR FOTOGRAFIA ]</span></div><div><span class="cemfa-gallery-ordinal">${escapeHtml(record.ordinal)}</span><h2>${escapeHtml(record.name)}</h2><p class="cemfa-profile-rank">${escapeHtml(record.rank)}</p><p class="cemfa-profile-period">${escapeHtml(record.period)}</p></div></div></article>`;
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
        dialogContent.innerHTML = `<div class="date-dialog-date">${escapeHtml(event.day)} · ${escapeHtml(event.month)}</div><h2>${escapeHtml(event.name)}</h2><dl class="memory-fields"><div><dt>Instituição / Unidade</dt><dd>${escapeHtml(event.unit)}</dd></div><div class="memory-field-wide"><dt>Significado</dt><dd>${escapeHtml(event.description)}</dd></div><div class="memory-field-wide"><dt>Origem e história</dt><dd>${event.id === 'guarda-costeira' ? 'Data comemorativa conforme a Resolução n.º 6/2010.' : '[Informação a adicionar após confirmação documental]'}</dd></div></dl><div class="date-dialog-media">[ Fotografias e documentos oficiais a adicionar ]</div><a class="inline-link" href="noticias.html#documentos">Documentos institucionais</a>`;
        dialog.showModal();
      });
    });
    calendar.querySelector('[data-close-date]')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close();
    });
  }

  document.title = `${pageTitle} — Forças Armadas de Cabo Verde`;

  document.getElementById('institutional-header').innerHTML = `
    <div class="topbar">
      <div class="container">
        <div class="topbar-right" style="margin-left:auto;">
          <a href="https://www.governo.cv" target="_blank" rel="noopener" data-i18n="topbar.portal">Portal do Governo</a>
          <a href="#" id="link-defesa" data-i18n="topbar.defesa">Ministério da Defesa</a>
          <a href="contactos.html">Contactos</a>
          <div class="lang-toggle" role="group" aria-label="Selecionar idioma">
            <button class="active" data-lang="PT">PT</button><span aria-hidden="true">/</span><button data-lang="EN">EN</button><span aria-hidden="true">/</span><button data-lang="FR">FR</button>
          </div>
        </div>
      </div>
    </div>
    <header class="site-header">
      <div class="nav-row">
        <a href="index.html" class="brand" aria-label="Início">
          <img class="crest" src="assets/images/logo-fa.png" alt="Emblema Oficial das Forças Armadas de Cabo Verde">
          <span class="brand-text"><span class="b1">Forças Armadas<br>de Cabo Verde</span></span>
        </a>
        <nav class="primary" aria-label="Navegação principal">
          <ul>
            <li class="has-mega"><a href="index.html#institucional" class="nav-link" data-i18n="nav.institucional">Institucional</a>
              <div class="mega"><div class="mega-title" data-i18n="mega.institucional.title">A Instituição</div>
                <a href="index.html#institucional" data-i18n="mega.institucional.item1">Missão e Visão</a>
                <a href="index.html#institucional" data-i18n="mega.institucional.item2">Valores e Princípios</a>
                <a href="cemfa.html" data-i18n="mega.institucional.item3">Chefia do Estado-Maior (CEMFA)</a>
                <a href="comandante-supremo.html" data-i18n="mega.institucional.item4">Comandante Supremo</a>
              </div>
            </li>
            <li class="has-mega"><a href="historia.html" class="nav-link" data-i18n="nav.historia">História</a>
              <div class="mega"><div class="mega-title" data-i18n="mega.historia.title">Memória Institucional</div>
                <a href="historia.html" data-i18n="mega.historia.item1">Das FARP às Forças Armadas</a>
              </div>
            </li>
            <li class="has-mega"><a href="estrutura.html" class="nav-link" data-i18n="nav.estrutura">Estrutura</a>
              <div class="mega"><div class="mega-title" data-i18n="mega.estrutura.title">Órgãos e Comandos</div>
                <a href="guarda-nacional.html">Guarda Nacional</a><a href="comando-pessoal.html">Comando do Pessoal</a>
                <a href="guarda-costeira.html">Guarda Costeira</a><a href="comando-logistica.html">Comando da Logística</a>
                <a href="oficina-central.html">Oficina Central</a><a href="cimmb.html">Centro de Instrução Militar do Morro Branco</a>
                <a href="escola-militar.html">Escola Militar</a>
              </div>
            </li>
            <li class="has-mega"><a href="noticias.html" class="nav-link" data-i18n="nav.noticias">Notícias</a>
              <div class="mega"><div class="mega-title" data-i18n="mega.noticias.title">Atualidade</div>
                <a href="noticias.html">Últimas Notícias</a><a href="noticias.html" data-filter="Comunicados" data-i18n="mega.noticias.item2">Comunicados Oficiais</a>
                <a href="noticias.html" data-filter="Desporto" data-i18n="mega.noticias.item3">Jogos Militares Nacionais</a><a href="noticias.html" data-filter="Todas" data-i18n="mega.noticias.item4">Arquivo Noticioso</a>
              </div>
            </li>
            <li class="has-mega"><a href="index.html#concursos" class="nav-link" data-i18n="nav.concursos">Concursos</a>
              <div class="mega"><div class="mega-title" data-i18n="mega.concursos.title">Ingresso</div>
                <a href="index.html#servico-militar" data-i18n="concursos.servico_militar">Serviço Militar</a><a href="index.html#objecao" data-i18n="concursos.objecao">Objeção de Consciência</a>
                <a href="index.html#incorporacao" data-i18n="mega.concursos.item3">Incorporação de Recrutas</a><a href="index.html#concursos" data-i18n="mega.concursos.item4">Concursos Públicos</a>
              </div>
            </li>
            <li class="has-mega"><a href="index.html#formacao" class="nav-link" data-i18n="nav.formacao">Formação</a>
              <div class="mega"><div class="mega-title" data-i18n="mega.formacao.title">Ensino Militar</div>
                <a href="cimmb.html" data-i18n="formacao.cimmb.title">Centro de Instrução Militar do Morro Branco</a><a href="index.html#psc" data-i18n="formacao.psc.title">Programa Soldado Cidadão</a>
                <a href="escola-militar.html" data-i18n="formacao.escola.title">Escola Militar</a><a href="index.html#cfem" data-i18n="formacao.cfem.title">Centro de Formação e Estudos Militares</a>
              </div>
            </li>
            <li><a href="multimedia.html" class="nav-link" data-i18n="nav.multimedia">Multimédia</a></li>
            <li><a href="contactos.html" class="nav-link" data-i18n="nav.contactos">Contactos</a></li>
          </ul>
        </nav>
        <div class="nav-cta">
          <div class="nav-divider" aria-hidden="true"></div>
          <button class="btn btn-search" id="btn-search-open" aria-haspopup="dialog" aria-label="Pesquisar no site"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg></button>
          <a href="index.html#concursos" class="btn btn-gold" data-i18n="nav.cta_concursos">Concursos Abertos</a><button class="burger" id="btn-burger-open" aria-label="Abrir menu">☰</button>
        </div>
      </div>
    </header>
    <nav class="mobile-nav" id="mobile-nav" aria-label="Navegação móvel">
      <button class="close-mobile" id="btn-burger-close" aria-label="Fechar menu">✕</button>
      <a href="index.html" class="top-link">Início</a>
      <details><summary data-i18n="nav.institucional">Institucional</summary><div class="sub-links"><a href="index.html#institucional">Missão e Visão</a><a href="cemfa.html">CEMFA — Chefe do Estado-Maior</a><a href="comandante-supremo.html">Comandante Supremo</a></div></details>
      <a href="historia.html" class="top-link" data-i18n="nav.historia">História</a>
      <details><summary data-i18n="nav.estrutura">Estrutura</summary><div class="sub-links"><a href="guarda-nacional.html">Guarda Nacional</a><a href="comando-pessoal.html">Comando do Pessoal</a><a href="guarda-costeira.html">Guarda Costeira</a><a href="comando-logistica.html">Comando da Logística</a><a href="oficina-central.html">Oficina Central</a><a href="cimmb.html">Centro de Instrução Militar do Morro Branco</a><a href="escola-militar.html">Escola Militar</a></div></details>
      <a href="noticias.html" class="top-link" data-i18n="nav.noticias">Notícias</a>
      <a href="index.html#concursos" class="top-link" data-i18n="nav.concursos">Concursos</a>
      <details><summary data-i18n="nav.formacao">Formação</summary><div class="sub-links"><a href="cimmb.html">Centro de Instrução Militar do Morro Branco</a><a href="index.html#psc">Programa Soldado Cidadão</a><a href="escola-militar.html">Escola Militar</a><a href="index.html#cfem">Centro de Formação e Estudos Militares</a></div></details>
      <a href="multimedia.html" class="top-link" data-i18n="nav.multimedia">Multimédia</a>
      <a href="contactos.html" class="top-link" data-i18n="nav.contactos">Contactos</a>
    </nav>
    <div class="search-overlay" id="search-overlay" role="dialog" aria-modal="true" aria-label="Pesquisar"><button class="search-close" id="btn-search-close" aria-label="Fechar pesquisa">✕</button><div class="search-box"><form id="search-form"><input type="text" id="search-input" placeholder="Pesquisar no site" autocomplete="off"><button type="submit" class="submit" aria-label="Pesquisar">⌕</button></form></div></div>`;

  document.getElementById('institutional-content').innerHTML = `
    <main>
      <section class="page-hero">
        <div class="container page-hero-inner">
          <img class="page-hero-crest" src="assets/images/logo-fa.png" alt="Emblema Oficial das Forças Armadas de Cabo Verde">
          <div><div class="eyebrow">Área Institucional</div><h1>${safeTitle}</h1><p>${escapeHtml(pageContent?.intro || 'Página institucional preparada para receber conteúdo oficial.')}</p></div>
        </div>
      </section>
      <section class="placeholder-section">
        <div class="container">
          ${pageContent?.profile ? `<div class="profile-summary"><div class="profile-photo">Fotografia oficial a inserir</div><div><div class="eyebrow">${escapeHtml(pageContent.profile.role)}</div><h2>${escapeHtml(pageContent.profile.name)}</h2><p>${escapeHtml(pageContent.profile.date)}</p></div></div>` : ''}
          ${responsible ? renderResponsibleCard(responsible) : ''}
          <div class="page-intro"><div class="eyebrow">${pageContent ? 'Informação institucional' : 'Conteúdo em preparação'}</div><h2>${pageContent ? 'Estrutura e informação' : 'Estrutura de informação institucional'}</h2><p>${pageContent ? 'A informação pessoal, histórica e visual sem confirmação permanece reservada para atualização oficial.' : 'As áreas abaixo estão reservadas para inserção posterior de informação oficial.'}</p></div>
          ${renderMemorySpecialPage() || (pageContent ? `<div class="institutional-blocks">${pageGroups.map(renderGroup).join('')}</div>` : `<div class="placeholder-grid">${pageSections.map(section => `<article class="placeholder-card"><h2>${escapeHtml(section)}</h2><div class="content-slot">Área reservada para conteúdo institucional.</div></article>`).join('')}</div>`)}
        </div>
      </section>
    </main>`;

  if (pageKey === 'datas-comemorativas') setupCommemorativeCalendar();

  document.getElementById('institutional-footer').innerHTML = `
    <footer id="contacto"><div class="container"><div class="footer-top"><div class="footer-brand"><img class="crest" src="assets/images/logo-fa.png" alt="Emblema Oficial das Forças Armadas de Cabo Verde"><p>Forças Armadas de Cabo Verde — instituição permanente ao serviço da República.</p></div><div class="footer-col"><h5>Institucional</h5><ul><li><a href="index.html#institucional">A Instituição</a></li><li><a href="historia.html">História</a></li><li><a href="estrutura.html">Estrutura</a></li></ul></div><div class="footer-col"><h5>Estruturas</h5><ul><li><a href="guarda-nacional.html">Guarda Nacional</a></li><li><a href="comando-pessoal.html">Comando do Pessoal</a></li><li><a href="cimmb.html">CIMMB</a></li></ul></div><div class="footer-col"><h5>Comunicação</h5><ul><li><a href="noticias.html">Notícias</a></li><li><a href="multimedia.html">Multimédia</a></li><li><a href="contactos.html">Contactos</a></li></ul></div><div class="footer-col"><h5>Contacto</h5><ul><li class="mono" style="font-size:13px;">Cidade da Praia<br>Cabo Verde</li><li><a href="mailto:geral@fa.gov.cv" class="mono" style="font-size:13px;">geral@fa.gov.cv</a></li></ul></div></div><div class="footer-bottom"><span>© 2026 Forças Armadas de Cabo Verde. Todos os direitos reservados.</span><div class="flinks"><a href="index.html">Início</a><a href="contactos.html">Contactos</a></div></div></div></footer>`;

  const searchOverlay = document.getElementById('search-overlay');
  document.getElementById('btn-search-open').addEventListener('click', () => searchOverlay.classList.add('open'));
  document.getElementById('btn-search-close').addEventListener('click', () => searchOverlay.classList.remove('open'));
  document.getElementById('search-form').addEventListener('submit', event => {
    event.preventDefault();
    const query = document.getElementById('search-input').value.trim().toLowerCase();
    const route = query.includes('concurso') ? 'index.html#concursos'
      : query.includes('cimmb') || query.includes('morro branco') ? 'cimmb.html'
      : query.includes('escola') ? 'escola-militar.html'
      : query.includes('not') ? 'noticias.html'
      : 'index.html';
    window.location.href = route;
  });
})();
