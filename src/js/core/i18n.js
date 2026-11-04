/* ---------- i18n: troca de idioma PT / EN / FR ----------
   Traduz os elementos com data-i18n / data-i18n-html e, para os textos
   estáticos que não têm chave, usa um dicionário de frases completas.
   O conteúdo dinâmico (notícias, concursos, perfis) mantém o original
   quando não existe tradução confirmada. */
(function () {
  const KEY_TRANSLATIONS = {
    'topbar.portal': { en: 'Government Portal', fr: 'Portail du Gouvernement' },
    'topbar.defesa': { en: 'Ministry of Defence', fr: 'Ministère de la Défense' },
    'nav.inicio': { en: 'Home', fr: 'Accueil' },
    'nav.institucional': { en: 'Institutional', fr: 'Institutionnel' },
    'nav.historia': { en: 'History', fr: 'Histoire' },
    'nav.estrutura': { en: 'Structure', fr: 'Structure' },
    'nav.noticias': { en: 'News', fr: 'Actualités' },
    'nav.oportunidades': { en: 'Opportunities', fr: 'Opportunités' },
    'nav.multimedia': { en: 'Multimedia', fr: 'Multimédia' },
    'nav.incorporacao': { en: 'Recruit Incorporation', fr: 'Incorporation des Recrues' },
    'mega.multimedia.title': { en: 'Audiovisual Record', fr: 'Registre Audiovisuel' },
    'mega.multimedia.galerias': { en: 'Photo galleries', fr: 'Galeries photo' },
    'mega.multimedia.videos': { en: 'Videos', fr: 'Vidéos' },
    'mega.multimedia.reportagens': { en: 'Reports', fr: 'Reportages' },
    'mega.multimedia.eventos': { en: 'Events', fr: 'Événements' },
    'mega.multimedia.registos': { en: 'Audiovisual records', fr: 'Archives audiovisuelles' },
    'nav.contactos': { en: 'Contact', fr: 'Contact' },
    'mega.institucional.title': { en: 'The Institution', fr: "L'Institution" },
    'mega.institucional.presidente': { en: 'President of the Republic', fr: 'Président de la République' },
    'mega.institucional.ministro': { en: 'Minister of National Defence', fr: 'Ministre de la Défense Nationale' },
    'mega.institucional.cemfa': { en: 'Chief of the Armed Forces General Staff', fr: "Chef d'État-Major des Forces Armées" },
    'mega.institucional.vicecemfa': { en: 'Deputy Chief of the Armed Forces General Staff', fr: "Vice-Chef d'État-Major des Forces Armées" },
    'mega.institucional.item1': { en: 'Mission and Vision', fr: 'Mission et Vision' },
    'mega.institucional.item2': { en: 'Values and Principles', fr: 'Valeurs et Principes' },
    'mega.historia.title': { en: 'Institutional Memory', fr: 'Mémoire Institutionnelle' },
    'mega.historia.item1': { en: 'From FARP to the Armed Forces', fr: 'Des FARP aux Forces Armées' },
    'mega.historia.item4': { en: 'Ranks and Insignia', fr: 'Grades et Insignes' },
    'mega.estrutura.title': { en: 'Bodies and Commands', fr: 'Organes et Commandements' },
    'mega.estrutura.item4': { en: 'Central Workshop (OCFA)', fr: 'Atelier Central (OCFA)' },
    'mega.estrutura.policlinica': { en: 'Armed Forces Polyclinic', fr: 'Polyclinique des Forces Armées' },
    'mega.estrutura.pupilos': { en: 'Armed Forces Pupils', fr: 'Pupilles des Forces Armées' },
    'mega.noticias.title': { en: 'Latest', fr: 'Actualité' },
    'mega.noticias.item1': { en: 'Latest News', fr: 'Dernières Actualités' },
    'mega.noticias.docs': { en: 'Historical Documents', fr: 'Documents Historiques' },
    'mega.noticias.imprensa': { en: 'Press Releases', fr: 'Communiqués de Presse' },
    'mega.noticias.alertas': { en: 'Alerts', fr: 'Alertes' },
    'mega.oportunidades.title': { en: 'Entry, Training and Career', fr: 'Entrée, Formation et Carrière' },
    'mega.concursos.item3': { en: 'Recruit Incorporation', fr: 'Incorporation des Recrues' },
    'mega.concursos.item4': { en: 'Public Competitions', fr: 'Concours Publics' },
    'concursos.servico_militar': { en: 'Military Service', fr: 'Service Militaire' },
    'concursos.objecao': { en: 'Conscientious Objection', fr: 'Objection de Conscience' },
    'formacao.psc.title': { en: 'Citizen Soldier Programme', fr: 'Programme Soldat Citoyen' },
    'formacao.cimmb.title': { en: 'Morro Branco Military Training Centre', fr: "Centre d'Instruction Militaire de Morro Branco" },
    'formacao.escola.title': { en: 'Military School', fr: 'École Militaire' },
    'formacao.cfem.title': { en: 'Centre for Military Training and Studies', fr: "Centre de Formation et d'Études Militaires" },
    'estrutura.card1.title': { en: 'National Guard Command', fr: 'Commandement de la Garde Nationale' },
    'estrutura.card2.title': { en: 'Personnel Command', fr: 'Commandement du Personnel' },
    'estrutura.card3.title': { en: 'Coast Guard Command', fr: 'Commandement de la Garde-Côtière' },
    'estrutura.card4.title': { en: 'Logistics Command', fr: 'Commandement de la Logistique' },
    'hero.kicker': { en: 'General Staff · Praia, Cabo Verde', fr: 'État-Major · Praia, Cap-Vert' },
    'hero.h1': { en: 'Discipline, loyalty<br>and service to the <em>Nation</em>.', fr: 'Discipline, loyauté<br>et service à la <em>Nation</em>.' },
    'hero.lede': { en: "A permanent and non-partisan institution serving the Republic of Cabo Verde, responsible for the country's military defence and safeguarding national sovereignty on land and at sea.", fr: 'Institution permanente et apolitique au service de la République du Cap-Vert, chargée de la défense militaire du pays et de la sauvegarde de la souveraineté nationale, sur terre comme en mer.' },
    'hero.btn1': { en: 'Latest News', fr: 'Dernières Actualités' },
    'hero.btn2': { en: 'Join the Ranks', fr: 'Rejoindre les Rangs' },
    'hero.btn3': { en: 'About the Institution', fr: "Découvrir l'Institution" },
    'filter.todas': { en: 'All', fr: 'Toutes' },
    'filter.cerimonias': { en: 'Ceremonies', fr: 'Cérémonies' },
    'filter.desporto': { en: 'Sport', fr: 'Sport' },
    'filter.formacao': { en: 'Training', fr: 'Formation' },
    'filter.comunicados': { en: 'Statements', fr: 'Communiqués' },
    'sec.noticias.eyebrow': { en: 'News & Statements', fr: 'Actualités & Communiqués' },
    'sec.noticias.title': { en: 'Institutional Updates', fr: 'Actualité Institutionnelle' },
    'sec.noticias.desc': { en: 'Follow the latest actions, ceremonies and official statements from the Armed Forces of Cabo Verde.', fr: 'Suivez les dernières actions, cérémonies et communiqués officiels des Forces Armées du Cap-Vert.' },
    'sec.institucional.eyebrow': { en: 'Institutional', fr: 'Institutionnel' },
    'sec.institucional.title': { en: 'Mission and Vision', fr: 'Mission et Vision' },
    'sec.estrutura.eyebrow': { en: 'Organisation', fr: 'Organisation' },
    'sec.estrutura.title': { en: 'Structure and Commands', fr: 'Structure et Commandements' },
    'sec.estrutura.desc': { en: 'Central and regional bodies that make up the organisation of the Armed Forces, under the direction of the Chief of Staff.', fr: "Organes centraux et régionaux qui composent l'organisation des Forces Armées, sous la direction du Chef d'État-Major." },
    'sec.concursos.eyebrow': { en: 'Opportunities', fr: 'Opportunités' },
    'sec.concursos.title': { en: 'Opportunities', fr: 'Opportunités' },
    'sec.concursos.desc': { en: 'Public competitions, military incorporation, military service and professional training in one place.', fr: 'Concours publics, incorporation militaire, service militaire et formation professionnelle en un seul endroit.' },
    'sec.formacao.eyebrow': { en: 'Military Training', fr: 'Formation Militaire' },
    'sec.formacao.title': { en: 'Preparing Those Who Serve the Nation', fr: 'Préparer Ceux Qui Servent la Nation' },
    'sec.multimedia.eyebrow': { en: 'Multimedia', fr: 'Multimédia' },
    'sec.multimedia.title': { en: 'Institutional Gallery', fr: 'Galerie Institutionnelle' },
    'sec.multimedia.desc': { en: 'Photography and video of ceremonies, operations and training of the Armed Forces of Cabo Verde.', fr: 'Photos et vidéos des cérémonies, opérations et formations des Forces Armées du Cap-Vert.' },
    'sec.docs.eyebrow': { en: 'Legislation & Documents', fr: 'Législation & Documents' },
    'sec.docs.title': { en: 'Official Gazette and Legal Decrees', fr: 'Journal Officiel et Décrets Légaux' },
    'sec.docs.desc': { en: 'Decrees that regulate the organisation, staff structure and operation of the Armed Forces.', fr: "Décrets qui régissent l'organisation, les effectifs et le fonctionnement des Forces Armées." },
    'sec.cta.title': { en: 'Ready to serve Cabo Verde?', fr: 'Prêt à servir le Cap-Vert ?' },
    'footer.col1.title': { en: 'Institutional', fr: 'Institutionnel' },
    'footer.col2.title': { en: 'Services', fr: 'Services' },
    'footer.col3.title': { en: 'Communication', fr: 'Communication' },
    'footer.col4.title': { en: 'Contact', fr: 'Contact' },
    'footer.copyright': { en: '© 2026 Armed Forces of Cabo Verde. All rights reserved.', fr: '© 2026 Forces Armées du Cap-Vert. Tous droits réservés.' },
    'btn.ver_arquivo': { en: 'View full archive', fr: 'Voir les archives' },
    'btn.todos_concursos': { en: 'All opportunities', fr: 'Toutes les opportunités' },
    'btn.ver_galeria': { en: 'View full gallery', fr: 'Voir la galerie complète' },
    'psc.title': { en: 'Citizen Soldier Programme', fr: 'Programme Soldat Citoyen' }
  };

  /* Frases estáticas sem chave. Apenas correspondências exatas são traduzidas. */
  const TEXT = {
    'Início': ['Home', 'Accueil'],
    'Institucional': ['Institutional', 'Institutionnel'],
    'História': ['History', 'Histoire'],
    'Estrutura': ['Structure', 'Structure'],
    'Notícias': ['News', 'Actualités'],
    'Oportunidades': ['Opportunities', 'Opportunités'],
    'Multimédia': ['Multimedia', 'Multimédia'],
    'Contactos': ['Contact', 'Contact'],
    'A Instituição': ['The Institution', "L'Institution"],
    'Presidente da República': ['President of the Republic', 'Président de la République'],
    'Ministro da Defesa Nacional': ['Minister of National Defence', 'Ministre de la Défense Nationale'],
    'Chefe do Estado-Maior das Forças Armadas': ['Chief of the Armed Forces General Staff', "Chef d'État-Major des Forces Armées"],
    'Missão e Visão': ['Mission and Vision', 'Mission et Vision'],
    'Valores e Princípios': ['Values and Principles', 'Valeurs et Principes'],
    'Memória Institucional': ['Institutional Memory', 'Mémoire Institutionnelle'],
    'Das FARP às Forças Armadas': ['From FARP to the Armed Forces', 'Des FARP aux Forces Armées'],
    'Órgãos e Comandos': ['Bodies and Commands', 'Organes et Commandements'],
    'Comando da Guarda Nacional': ['National Guard Command', 'Commandement de la Garde Nationale'],
    'Comando da Guarda Costeira': ['Coast Guard Command', 'Commandement de la Garde-Côtière'],
    'Comando do Pessoal': ['Personnel Command', 'Commandement du Personnel'],
    'Comando da Logística': ['Logistics Command', 'Commandement de la Logistique'],
    'Oficina Central (OCFA)': ['Central Workshop (OCFA)', 'Atelier Central (OCFA)'],
    'Policlínica das Forças Armadas': ['Armed Forces Polyclinic', 'Polyclinique des Forces Armées'],
    'Pupilos das Forças Armadas': ['Armed Forces Pupils', 'Pupilles des Forces Armées'],
    'Atualidade': ['Latest', 'Actualité'],
    'Últimas Notícias': ['Latest News', 'Dernières Actualités'],
    'Documentos Históricos': ['Historical Documents', 'Documents Historiques'],
    'Documentação': ['Documentation', 'Documentation'],
    'Núcleo Fundador': ['Founding Core', 'Noyau Fondateur'],
    'Comunicados de Imprensa': ['Press Releases', 'Communiqués de Presse'],
    'Alertas': ['Alerts', 'Alertes'],
    'Ingresso, Formação e Carreira': ['Entry, Training and Career', 'Entrée, Formation et Carrière'],
    'Concursos': ['Competitions', 'Concours'],
    'Formação': ['Training', 'Formation'],
    'Concursos Públicos': ['Public Competitions', 'Concours Publics'],
    'Incorporação de Recrutas': ['Recruit Incorporation', 'Incorporation des Recrues'],
    'Serviço Militar': ['Military Service', 'Service Militaire'],
    'Objeção de Consciência': ['Conscientious Objection', 'Objection de Conscience'],
    'Programa Soldado Cidadão': ['Citizen Soldier Programme', 'Programme Soldat Citoyen'],
    'Centro de Instrução Militar do Morro Branco': ['Morro Branco Military Training Centre', "Centre d'Instruction Militaire de Morro Branco"],
    'Centro de Instrução Militar do Morro Branco (CIMMB)': ['Morro Branco Military Training Centre (CIMMB)', "Centre d'Instruction Militaire de Morro Branco (CIMMB)"],
    'Escola Militar': ['Military School', 'École Militaire'],
    'Centro de Formação e Estudos Militares': ['Centre for Military Training and Studies', "Centre de Formation et d'Études Militaires"],
    'Atualidade institucional': ['Institutional Updates', 'Actualité Institutionnelle'],
    'Estrutura e comandos': ['Structure and Commands', 'Structure et Commandements'],
    'Comandos principais': ['Main Commands', 'Commandements Principaux'],
    'Órgãos centrais': ['Central Bodies', 'Organes Centraux'],
    'Formação, ingresso e carreira': ['Training, Entry and Career', 'Formation, Entrée et Carrière'],
    'Preparar quem serve a Nação': ['Preparing Those Who Serve the Nation', 'Préparer Ceux Qui Servent la Nation'],
    'Formações disponíveis no Programa Soldado Cidadão': ['Courses available in the Citizen Soldier Programme', 'Formations disponibles dans le Programme Soldat Citoyen'],
    'Galeria institucional': ['Institutional Gallery', 'Galerie Institutionnelle'],
    'Pronto para servir Cabo Verde?': ['Ready to serve Cabo Verde?', 'Prêt à servir le Cap-Vert ?'],
    'Qual é a sua situação militar?': ['What is your military status?', 'Quel est votre statut militaire ?'],
    'Confirme os seus dados': ['Confirm your details', 'Confirmez vos données'],
    'Área de Formação': ['Training Area', 'Domaine de Formation'],
    'Entidade Parceira': ['Partner Entity', 'Entité Partenaire'],
    'Nível': ['Level', 'Niveau'],
    'Duração': ['Duration', 'Durée'],
    'Candidatar-se': ['Apply', 'Postuler'],
    'Incluído no percurso': ['Included in the course', 'Inclus dans le parcours'],
    'Consultar Incorporação': ['Check Incorporation', 'Consulter l’Incorporation'],
    'Ver todas as oportunidades': ['View all opportunities', 'Voir toutes les opportunités'],
    'Saber mais sobre o Programa': ['Learn more about the Programme', 'En savoir plus sur le Programme'],
    'Ver arquivo completo': ['View full archive', 'Voir les archives'],
    'Ver galeria completa': ['View full gallery', 'Voir la galerie complète'],
    'Ler notícia': ['Read news', 'Lire l’actualité'],
    'Ler notícia completa': ['Read full story', 'Lire l’article complet'],
    'Ver perfil completo': ['View full profile', 'Voir le profil complet'],
    'Conhecer a Instituição': ['About the Institution', "Découvrir l'Institution"],
    'Ingressar nas Fileiras': ['Join the Ranks', 'Rejoindre les Rangs'],
    'Notícias': ['News', 'Actualités'],
    'Todas': ['All', 'Toutes'],
    'Cerimónias': ['Ceremonies', 'Cérémonies'],
    'Desporto': ['Sport', 'Sport'],
    'Comunicados': ['Statements', 'Communiqués'],
    'Estrutura Organizacional': ['Organisational Structure', 'Structure Organisationnelle'],
    'Liderança Suprema': ['Supreme Leadership', 'Direction Suprême'],
    'Cadeia de Comando': ['Chain of Command', 'Chaîne de Commandement'],
    'Organograma das Forças Armadas': ['Armed Forces Organisation Chart', 'Organigramme des Forces Armées'],
    'Arquitetura Institucional': ['Institutional Architecture', 'Architecture Institutionnelle'],
    'Presença Territorial': ['Territorial Presence', 'Présence Territoriale'],
    'Unidades e Guarnições': ['Units and Garrisons', 'Unités et Garnisons'],
    'Componentes Especializados': ['Specialised Components', 'Composantes Spécialisées'],
    'Policlínica e Pupilos': ['Polyclinic and Pupils', 'Polyclinique et Pupilles'],
    'Serviços de Apoio': ['Support Services', 'Services de Soutien'],
    'Saúde Militar': ['Military Health', 'Santé Militaire'],
    'Apoio Social e Educativo': ['Social and Educational Support', 'Soutien Social et Éducatif'],
    'Conhecer a Policlínica': ['About the Polyclinic', 'Découvrir la Polyclinique'],
    'Conhecer os Pupilos': ['About the Pupils', 'Découvrir les Pupilles'],
    'Fuzileiros': ['Marines', 'Fusiliers Marins'],
    'Polícia Militar': ['Military Police', 'Police Militaire'],
    'Esquadrilha Naval': ['Naval Squadron', 'Escadrille Navale'],
    'Esquadrilha Aérea': ['Air Squadron', 'Escadrille Aérienne'],
    'Unidade de Operações Especiais (UOE)': ['Special Operations Unit (UOE)', 'Unité des Opérations Spéciales (UOE)'],
    'A Nossa História': ['Our History', 'Notre Histoire'],
    'Marcos Fundamentais': ['Key Milestones', 'Jalons Fondamentaux'],
    'Fale Connosco': ['Contact Us', 'Contactez-nous'],
    '✉ Formulário de Contacto': ['✉ Contact Form', '✉ Formulaire de Contact'],
    '📞 Linhas Diretas': ['📞 Direct Lines', '📞 Lignes Directes'],
    '🕐 Horário de Atendimento': ['🕐 Opening Hours', '🕐 Heures d’Ouverture'],
    'Diretório de Departamentos': ['Department Directory', 'Annuaire des Départements'],
    'Galeria em Apresentação': ['Gallery in Presentation', 'Galerie en Présentation'],
    'Programa de Destaque': ['Featured Programme', 'Programme Phare'],
    'Sobre o Programa': ['About the Programme', 'À propos du Programme'],
    'Formar militares e cidadãos': ['Training soldiers and citizens', 'Former des militaires et des citoyens'],
    'Ver cursos abertos': ['View open courses', 'Voir les cours ouverts'],
    'Voltar a Oportunidades': ['Back to Opportunities', 'Retour aux Opportunités'],
    'Quando foi criado?': ['When was it created?', 'Quand a-t-il été créé ?'],
    'Quem pode participar?': ['Who can take part?', 'Qui peut participer ?'],
    'Objetivos': ['Objectives', 'Objectifs'],
    'Onde são realizados?': ['Where are they held?', 'Où sont-ils organisés ?'],
    'Protocolos em 2024': ['Protocols in 2024', 'Protocoles en 2024'],
    'Oferta Formativa': ['Training Offer', 'Offre de Formation'],
    'Cursos Abertos': ['Open Courses', 'Cours Ouverts'],
    'Direção do Programa': ['Programme Management', 'Direction du Programme'],
    'Quem coordena': ['Who coordinates', 'Qui coordonne'],
    'Os Nossos Alunos': ['Our Students', 'Nos Élèves'],
    'Rede de Formação': ['Training Network', 'Réseau de Formation'],
    'Entidades Parceiras': ['Partner Entities', 'Entités Partenaires'],
    'Conhecer o CIMMB': ['About CIMMB', 'Découvrir le CIMMB'],
    'Documentos oficiais': ['Official documents', 'Documents officiels'],
    'Contactar o Programa': ['Contact the Programme', 'Contacter le Programme'],
    'Preparar para a vida civil': ['Preparing for civilian life', 'Préparer à la vie civile'],
    'Página do Programa': ['Programme Page', 'Page du Programme'],
    'Ensino Militar': ['Military Education', 'Enseignement Militaire'],
    'Formação Militar': ['Military Training', 'Formation Militaire'],
    'Ingresso e Formação': ['Entry and Training', 'Entrée et Formation'],
    'Pesquisar notícias...': ['Search news...', 'Rechercher des actualités...'],
    'Pesquisar concursos...': ['Search competitions...', 'Rechercher des concours...'],
    'Política de Privacidade': ['Privacy Policy', 'Politique de Confidentialité'],
    'Acessibilidade': ['Accessibility', 'Accessibilité'],
    'Mapa do Site': ['Site Map', 'Plan du Site'],
    'Portal do Governo de Cabo Verde': ['Government Portal of Cabo Verde', 'Portail du Gouvernement du Cap-Vert'],
    'Missão e organização': ['Mission and organisation', 'Mission et organisation'],
    'História e organização': ['History and organisation', 'Histoire et organisation'],
    'Composição': ['Composition', 'Composition'],
    'Estrutura do Comando': ['Command Structure', 'Structure du Commandement'],
    'Meios': ['Assets', 'Moyens'],
    'Dia da Guarda Costeira': ['Coast Guard Day', 'Jour de la Garde-Côtière'],
    'Galeria, notícias e contactos': ['Gallery, news and contacts', 'Galerie, actualités et contacts'],
    'Ligações': ['Links', 'Liens'],
    'Competências constitucionais': ['Constitutional powers', 'Compétences constitutionnelles'],
    'Biografia institucional': ['Institutional biography', 'Biographie institutionnelle'],
    'Biografia e percurso': ['Biography and career', 'Biographie et parcours'],
    'Funções': ['Functions', 'Fonctions'],
    'Prioridades de comando': ['Command priorities', 'Priorités de commandement'],
    'Serviços e especialidades': ['Services and specialties', 'Services et spécialités'],
    'Acesso e marcação': ['Access and appointments', 'Accès et rendez-vous'],
    'Localização e contactos': ['Location and contacts', 'Localisation et contacts'],
    'Localização e contacto': ['Location and contact', 'Localisation et contact'],
    'Acolhimento e apoio': ['Reception and support', 'Accueil et soutien'],
    'Inscrição': ['Registration', 'Inscription'],
    'Missão e enquadramento': ['Mission and framework', 'Mission et cadre'],
    'Missão e Serviços': ['Mission and Services', 'Mission et Services'],
    'Apresentação': ['Presentation', 'Présentation']
  };

  const originalKeys = new Map();
  const originalText = new WeakMap();
  const originalPlaceholders = new WeakMap();
  const originalAria = new WeakMap();
  let currentLang = 'PT';

  function capture() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!originalKeys.has('t:' + key)) originalKeys.set('t:' + key, el.textContent);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (!originalKeys.has('h:' + key)) originalKeys.set('h:' + key, el.innerHTML);
    });
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA)$/.test(parent.tagName)) return NodeFilter.FILTER_REJECT;
        if (parent.closest('[data-i18n],[data-i18n-html]')) return NodeFilter.FILTER_REJECT;
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    let node;
    while ((node = walker.nextNode())) originalText.set(node, node.nodeValue);
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
      originalPlaceholders.set(el, el.getAttribute('placeholder'));
    });
    document.querySelectorAll('[aria-label]').forEach(el => {
      const value = el.getAttribute('aria-label');
      if (value && value.length < 90) originalAria.set(el, value);
    });
  }

  function normalize(value) { return String(value || '').replace(/\s+/g, ' ').trim(); }

  function applyKeys(code) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const original = originalKeys.get('t:' + key);
      if (original == null) return;
      if (code === 'PT') { el.textContent = original; return; }
      const entry = KEY_TRANSLATIONS[key];
      el.textContent = entry && entry[code.toLowerCase()] ? entry[code.toLowerCase()] : original;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const original = originalKeys.get('h:' + key);
      if (original == null) return;
      if (code === 'PT') { el.innerHTML = original; return; }
      const entry = KEY_TRANSLATIONS[key];
      el.innerHTML = entry && entry[code.toLowerCase()] ? entry[code.toLowerCase()] : original;
    });
  }

  function applyText(code) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA)$/.test(parent.tagName)) return NodeFilter.FILTER_REJECT;
        if (parent.closest('[data-i18n],[data-i18n-html]')) return NodeFilter.FILTER_REJECT;
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    let node;
    while ((node = walker.nextNode())) {
      const original = originalText.get(node);
      if (original == null) continue;
      if (code === 'PT') { node.nodeValue = original; continue; }
      const leading = original.match(/^\s*/)[0];
      const trailing = original.match(/\s*$/)[0];
      const phrase = normalize(original);
      const entry = TEXT[phrase];
      node.nodeValue = entry ? leading + entry[code === 'EN' ? 0 : 1] + trailing : original;
    }
  }

  function applyAttributes(code) {
    const placeholders = {
      'Pesquisar no site': ['Search the site', 'Rechercher sur le site'],
      'Pesquisar notícias, concursos, documentos…': ['Search news, competitions, documents…', 'Rechercher actualités, concours, documents…'],
      'Pesquisar notícias...': ['Search news...', 'Rechercher des actualités...'],
      'Pesquisar concursos...': ['Search competitions...', 'Rechercher des concours...'],
      'Pesquisar': ['Search', 'Rechercher'],
      'Abrir menu': ['Open menu', 'Ouvrir le menu'],
      'Fechar menu': ['Close menu', 'Fermer le menu'],
      'Fechar pesquisa': ['Close search', 'Fermer la recherche'],
      'Fechar': ['Close', 'Fermer']
    };
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
      const original = originalPlaceholders.get(el);
      if (!original) return;
      if (code === 'PT') { el.setAttribute('placeholder', original); return; }
      const entry = placeholders[original];
      el.setAttribute('placeholder', entry ? entry[code === 'EN' ? 0 : 1] : original);
    });
    document.querySelectorAll('[aria-label]').forEach(el => {
      const original = originalAria.get(el);
      if (!original) return;
      if (code === 'PT') { el.setAttribute('aria-label', original); return; }
      const entry = placeholders[original];
      el.setAttribute('aria-label', entry ? entry[code === 'EN' ? 0 : 1] : original);
    });
  }

  function setLanguage(lang) {
    const code = String(lang || 'PT').toUpperCase();
    currentLang = code;
    document.documentElement.lang = code === 'EN' ? 'en' : code === 'FR' ? 'fr' : 'pt-CV';
    applyKeys(code);
    applyText(code);
    applyAttributes(code);
    document.querySelectorAll('.lang-toggle button').forEach(button => {
      button.classList.toggle('active', button.dataset.lang === code);
      button.setAttribute('aria-pressed', String(button.dataset.lang === code));
    });
    try { localStorage.setItem('fa_lang', code); } catch (e) {}
  }

  capture();
  document.querySelectorAll('.lang-toggle button').forEach(button => {
    button.addEventListener('click', () => setLanguage(button.dataset.lang));
  });
  try {
    const saved = localStorage.getItem('fa_lang');
    if (saved && saved !== 'PT') setLanguage(saved);
  } catch (e) {}
  window.FA_I18N = { setLanguage, get language() { return currentLang; } };
})();
