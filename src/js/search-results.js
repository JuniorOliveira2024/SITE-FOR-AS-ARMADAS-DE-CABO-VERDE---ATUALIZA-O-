const searchableItems = [
  { title: 'Guarda Nacional', category: 'Organização', url: 'guarda-nacional.html', keywords: 'operações terrestres anfíbias segurança interna regiões militares história missão comando brasão guião polícia militar fuzileiros artilharia' },
  { title: '1ª Região Militar', category: 'Regiões Militares', url: 'guarda-nacional.html#regiao-1', keywords: 'Guarda Nacional Mindelo Santo Antão São Vicente Santa Luzia São Nicolau ilhéus Branco Raso CIMMB' },
  { title: '2ª Região Militar', category: 'Regiões Militares', url: 'guarda-nacional.html#regiao-2', keywords: 'Guarda Nacional Espargos Sal Boa Vista' },
  { title: '3ª Região Militar', category: 'Regiões Militares', url: 'guarda-nacional.html#regiao-3', keywords: 'Guarda Nacional Praia Maio Santiago Fogo Brava Ilhéus Secos' },
  { title: 'Guarda Costeira', category: 'Organização', url: 'guarda-costeira.html', keywords: 'mar interesses económicos nacionais esquadrilha naval aérea COSMAR JRCC busca salvamento vigilância fiscalização 11 outubro Resolução 6/2010' },
  { title: 'Comando da Logística', category: 'Organização', url: 'comando-logistica.html', keywords: 'recursos materiais financeiros administração CEMFA administração financeira material infraestruturas obras comunicações transmissões informática reparação equipamentos Oficina Central OCFA' },
  { title: 'Oficina Central das Forças Armadas', category: 'Comando da Logística', url: 'comando-logistica.html#oficina-central', keywords: 'OCFA manutenção reparação viaturas equipamentos Logística' },
  { title: 'Comando do Pessoal', category: 'Organização', url: 'comando-pessoal.html', keywords: 'pessoal recursos humanos formação instrução saúde ação cívica justiça disciplina' },
  { title: 'CEMFA — Chefe do Estado-Maior das Forças Armadas', category: 'Institucional', url: 'cemfa.html', keywords: 'Contra-Almirante Manuel António Pereira Semedo posse 8 novembro 2025 biografia funções mensagem' },
  { title: 'Galeria dos CEMFA', category: 'Galerias', url: 'galeria-cemfa.html', keywords: 'chefes estado maior fotografia período exercício biografia histórico' },
  { title: 'Comandante Supremo', category: 'Institucional', url: 'comandante-supremo.html', keywords: 'Presidente República Dr. José Maria Pereira Neves 9 novembro 2021 competências constitucionais' },
  { title: 'História — Das FARP às Forças Armadas de Cabo Verde', category: 'História', url: 'historia.html', keywords: 'PAIGC 1950 1964 1967 15 janeiro 1973 1975 independência 5 julho FARP Comando-Geral Milícias década 1980 década 1990' },
  { title: 'Datas Comemorativas', category: 'Datas institucionais', url: 'datas-comemorativas.html', keywords: '15 janeiro Forças Armadas 17 junho Unidade Manuel Monteiro 11 outubro Guarda Costeira 6 fevereiro CIMMB Zeca Santos José Henrique dos Santos' },
  { title: 'Postos e Distintivos', category: 'Heráldica', url: 'postos-distintivos.html', keywords: 'Oficiais Generais Oficiais Superiores Oficiais Subalternos Sargentos Praças distintivos símbolos' },
  { title: 'Centro de Instrução Militar do Morro Branco — CIMMB', category: 'Formação', url: 'cimmb.html', keywords: 'Zeca Santos José Henrique dos Santos formação inicial especial cursos militares primeira região militar' },
  { title: 'Escola Militar', category: 'Formação', url: 'escola-militar.html', keywords: 'doutrinários técnicos científico militar oficiais sargentos praças tirocínios investigação cooperação técnico-militar' },
  { title: 'Programa Soldado Cidadão', category: 'Formação', url: 'programa-soldado-cidadao.html', keywords: '22 outubro 2007 jovens serviço militar emprego reintegração vida civil pintura secretariado canalização carpintaria telecomunicações mecânica construção civil eletricidade cabeleireiro informática administração contabilidade agricultura pecuária hotelaria turismo condução TIC design multimédia eletrónica serralharia motores IEFP parceiros' },
  { title: 'Concursos e Serviço Militar', category: 'Concursos', url: 'index.html#concursos', keywords: 'incorporação recrutamento serviço militar objeção consciência candidatura concurso' },
  { title: 'Notícias e Comunicados', category: 'Notícias', url: 'noticias.html', keywords: 'Guarda Nacional Guarda Costeira CEMFA CIMMB últimas notícias comunicados oficiais jogos militares cerimónias formação' },
  { title: 'Multimédia e Galerias', category: 'Multimédia', url: 'multimedia.html', keywords: 'Guarda Nacional Guarda Costeira fotografias vídeo imagens galeria arquivo histórico' },
  { title: 'Contactos', category: 'Contactos', url: 'contactos.html', keywords: 'telefone email endereço imprensa' },
  { title: 'Inspeção das Forças Armadas', category: 'Estado-Maior', url: 'inspecao-forcas-armadas.html', keywords: 'inspeção missão organização' },
  { title: 'Direção de Informações Militares', category: 'Estado-Maior', url: 'direcao-informacoes-militares.html', keywords: 'informações militares' },
  { title: 'Centro de Planeamento Estratégico Militar', category: 'Estado-Maior', url: 'planeamento-estrategico.html', keywords: 'planeamento estratégico militar' },
  { title: 'Comando da Guarnição', category: 'Estado-Maior', url: 'comando-guarnicao.html', keywords: 'guarnição comando' }
];

function normalizeSearchText(value) {
  return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt');
}

function escapeSearchHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

const searchablePages = [...new Set([
  'index.html', 'historia.html', 'estrutura.html', 'noticias.html', 'noticia.html', 'multimedia.html', 'contactos.html',
  ...searchableItems.map(item => item.url.split('#')[0])
])].filter(url => url !== 'pesquisa.html');

async function searchPageContent(terms) {
  if (!terms.length) return [];
  const pages = await Promise.all(searchablePages.map(async url => {
    try {
      const response = await fetch(url);
      if (!response.ok) return null;
      const html = await response.text();
      const parsed = new DOMParser().parseFromString(html, 'text/html');
      parsed.querySelectorAll('script,style,header,footer,nav,.search-overlay').forEach(element => element.remove());
      const content = normalizeSearchText(parsed.body.textContent.replace(/\s+/g, ' ').trim());
      if (!terms.every(term => content.includes(term))) return null;
      const matchingCandidates = [...parsed.querySelectorAll('article,.news-card,.archive-item,.concurso-row,.doc-card,.timeline-card,.structure-card,.state-org-card,.institutional-block,.placeholder-card,.commemoration-card,.branch-card,.unit-card,.formacao-card,.psc-feature,section[id]')]
        .filter(element => {
          const text = normalizeSearchText(element.textContent.replace(/\s+/g, ' ').trim());
          return terms.every(term => text.includes(term));
        });
      const candidates = matchingCandidates
        .filter(element => !matchingCandidates.some(child => child !== element && element.contains(child)))
        .sort((left, right) => left.textContent.length - right.textContent.length)
        .slice(0, 5);
      if (!candidates.length) return [];
      return candidates.map(element => {
        const title = element.querySelector('h1,h2,h3,h4')?.textContent.trim()
          || parsed.querySelector('main h1, h1')?.textContent.trim()
          || parsed.title || url;
        const articleSlug = element.querySelector('[data-noticia]')?.dataset.noticia;
        const linkedPage = element.matches('a[href]') ? element : element.querySelector('a[href]:not([href=""]):not([href="#"])');
        const linkedHref = linkedPage?.getAttribute('href');
        const elementId = element.id || element.closest('section[id]')?.id;
        let internalHref = null;
        if (linkedHref) {
          const parsedHref = new URL(linkedHref, location.href);
          if (parsedHref.origin === location.origin && /\.html?$/i.test(parsedHref.pathname)) {
            internalHref = `${parsedHref.pathname.replace(/^\//, '')}${parsedHref.search}${parsedHref.hash}`;
          }
        }
        const resultUrl = articleSlug
          ? `noticia.html?id=${encodeURIComponent(articleSlug)}`
          : internalHref || (elementId ? `${url}#${elementId}` : url);
        const snippet = element.textContent.replace(/\s+/g, ' ').trim().slice(0, 260);
        const category = /noticia|news/i.test(url) || element.matches('.news-card,.archive-item') ? 'Notícias'
          : /index\.html/.test(url) ? 'Conteúdo do portal' : 'Página institucional';
        return { title, category, url: resultUrl, keywords: snippet };
      });
    } catch {
      return null;
    }
  }));
  return pages.filter(Boolean);
}

async function renderSearchResults(query) {
  const normalizedQuery = normalizeSearchText(query);
  const terms = normalizedQuery.split(/\s+/).filter(Boolean);
  const results = terms.length ? searchableItems.filter(item => {
    const content = normalizeSearchText(`${item.title} ${item.category} ${item.keywords}`);
    return Boolean(item.url && item.url !== '#') && terms.every(term => content.includes(term));
  }) : [];
  const pageResults = (await searchPageContent(terms)).flat();
  const resultUrls = new Set(results.map(item => item.url));
  pageResults.forEach(item => {
    if (!resultUrls.has(item.url)) {
      results.push(item);
      resultUrls.add(item.url);
    }
  });
  const groupedResults = new Map();
  results.forEach(item => {
    if (!groupedResults.has(item.category)) groupedResults.set(item.category, []);
    groupedResults.get(item.category).push(item);
  });
  const searchPanel = `
    <section class="search-results-section">
      <div class="container">
        <div class="page-intro"><div class="eyebrow">Pesquisa no portal</div><h2>Resultados da pesquisa</h2><p>Pesquisa: <strong>${escapeSearchHtml(query)}</strong></p></div>
        <form class="results-search-form" id="results-search-form"><label class="visually-hidden" for="results-search-input">Nova pesquisa</label><input id="results-search-input" name="q" value="${escapeSearchHtml(query)}" placeholder="Pesquisar no portal" required><button class="btn btn-gold" type="submit">Pesquisar</button></form>
        ${results.length ? `<p class="results-count">${results.length} resultado(s) encontrado(s)</p>${Array.from(groupedResults, ([category, items]) => `<section class="search-category-group"><h3>${escapeSearchHtml(category)}</h3><div class="search-result-list">${items.map(item => `<article class="search-result"><span class="eyebrow">${escapeSearchHtml(category)}</span><h4><a href="${escapeSearchHtml(item.url)}">${escapeSearchHtml(item.title)}</a></h4><p>${escapeSearchHtml(item.keywords)}</p><a class="inline-link" href="${escapeSearchHtml(item.url)}">${/multim[eé]dia|galeria/i.test(category) ? 'Ver galeria' : 'Ver conteúdo →'}</a></article>`).join('')}</div></section>`).join('')}` : `<section class="search-empty"><div class="eyebrow">Pesquisa sem correspondências</div><h2>Nenhum resultado encontrado</h2><p>Não encontramos conteúdos correspondentes à sua pesquisa.</p><div class="content-actions"><a class="btn btn-gold" href="index.html">Voltar à página inicial</a></div></section>`}
        <nav class="search-categories" aria-label="Categorias principais"><a href="estrutura.html">Estrutura</a><a href="historia.html">História</a><a href="noticias.html">Notícias</a><a href="index.html#concursos">Concursos</a><a href="programa-soldado-cidadao.html">Formação</a><a href="multimedia.html">Multimédia</a><a href="contactos.html">Contactos</a></nav>
      </div>
    </section>`;
  const content = document.getElementById('institutional-content');
  content.querySelector('main').innerHTML = `
    <section class="page-hero"><div class="container page-hero-inner"><img class="page-hero-crest" src="assets/images/logo-fa.png" alt="Emblema Oficial das Forças Armadas de Cabo Verde"><div><div class="eyebrow">Área Institucional</div><h1>Resultados da pesquisa</h1><p>Pesquisa em páginas, organizações, história, notícias, formação e conteúdos institucionais.</p></div></div></section>
    ${searchPanel}`;
  document.title = `Pesquisa: ${query || 'Resultados'} — Forças Armadas de Cabo Verde`;
  const form = document.getElementById('results-search-form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const nextQuery = new FormData(form).get('q').trim();
    if (nextQuery) window.location.href = `pesquisa.html?q=${encodeURIComponent(nextQuery)}`;
  });
}

const params = new URLSearchParams(location.search);
const searchQuery = params.get('q') || '';
renderSearchResults(searchQuery);