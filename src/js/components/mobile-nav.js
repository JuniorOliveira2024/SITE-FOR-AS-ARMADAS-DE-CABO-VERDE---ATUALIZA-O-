/* ---------- navegação entre páginas ---------- */
const navigationRoutes = {
  '#institucional': 'index.html#institucional',
  '#historia': 'historia.html',
  '#estrutura': 'estrutura.html',
  '#noticias': 'noticias.html',
  '#concursos': 'index.html#concursos',
  '#formacao': 'index.html#formacao',
  '#multimedia': 'multimedia.html',
  '#contacto': 'contactos.html',
  '#comando-pessoal': 'comando-pessoal.html',
  '#comando-logistica': 'comando-logistica.html',
  '#guarda-nacional': 'guarda-nacional.html',
  '#guarda-costeira': 'guarda-costeira.html',
  '#ocfa': 'comando-logistica.html#oficina-central',
  '#servico-militar': 'index.html#servico-militar',
  '#objecao': 'index.html#objecao',
  '#incorporacao': 'servico-militar.html',
  '#cimmb': 'cimmb.html',
  '#psc': 'index.html#psc',
  '#escola-militar': 'escola-militar.html',
  '#cfem': 'index.html#cfem',
  '#doc-servico-militar': 'index.html#doc-servico-militar',
  '#doc-objecao': 'index.html#doc-objecao',
  'index.html#noticias': 'noticias.html',
  '#galeria-cemfa': 'galeria-cemfa.html',
  '#datas-comemorativas': 'datas-comemorativas.html',
  '#postos-distintivos': 'postos-distintivos.html',
  '#programa-soldado-cidadao': 'programa-soldado-cidadao.html'
};

navigationRoutes['#psc'] = 'programa-soldado-cidadao.html';
navigationRoutes['index.html#psc'] = 'programa-soldado-cidadao.html';

function normalizeNavigationRoutes(root) {
  const links = root.matches && root.matches('a[href]')
    ? [root]
    : root.querySelectorAll('a[href]');

  links.forEach(link => {
    const route = navigationRoutes[link.getAttribute('href')];
    if (route) link.setAttribute('href', route);
  });
}

normalizeNavigationRoutes(document);

document.querySelectorAll('.has-mega').forEach(item => {
  const historyLink = item.querySelector(':scope > a[data-i18n="nav.historia"]');
  if (historyLink) item.querySelectorAll('a').forEach(link => link.setAttribute('href', 'historia.html'));
});

document.querySelectorAll('details').forEach(item => {
  const historySummary = item.querySelector(':scope > summary[data-i18n="nav.historia"]');
  if (historySummary) item.querySelectorAll('a').forEach(link => link.setAttribute('href', 'historia.html'));
});

document.querySelectorAll('footer a[href="noticias.html"]').forEach(link => {
  if (link.textContent.trim() === 'História') link.setAttribute('href', 'historia.html');
});

document.querySelectorAll('[data-i18n="mega.institucional.item3"], [data-i18n="mega.institucional.item3b"]').forEach(link => {
  link.setAttribute('href', 'cemfa.html');
});

document.querySelectorAll('[data-i18n="mega.institucional.item4"]').forEach(link => {
  link.setAttribute('href', 'comandante-supremo.html');
});

document.querySelectorAll('[data-i18n="estrutura.card1.title"]').forEach(link => {
  link.setAttribute('href', 'guarda-nacional.html');
});

document.querySelectorAll('[data-i18n="estrutura.card2.title"]').forEach(link => {
  link.setAttribute('href', 'comando-pessoal.html');
});

document.querySelectorAll('[data-i18n="estrutura.card3.title"]').forEach(link => {
  link.setAttribute('href', 'guarda-costeira.html');
});

document.querySelectorAll('[data-i18n="mega.estrutura.item4"], [data-i18n="mega.estrutura.item4b"]').forEach(link => {
  link.setAttribute('href', 'comando-logistica.html#oficina-central');
  link.removeAttribute('data-i18n');
  link.textContent = 'Oficina Central · Comando da Logística';
});

document.querySelectorAll('[data-i18n="formacao.cimmb.title"], [data-i18n="formacao.cimmb.short"]').forEach(link => {
  link.setAttribute('href', 'cimmb.html');
});

document.querySelectorAll('[data-i18n="formacao.escola.title"]').forEach(link => {
  link.setAttribute('href', 'escola-militar.html');
});

document.querySelectorAll('.primary > ul > li > a[data-i18n="nav.institucional"]').forEach(link => link.setAttribute('href', 'index.html#institucional'));
document.querySelectorAll('.primary > ul > li > a[data-i18n="nav.historia"]').forEach(link => link.setAttribute('href', 'historia.html'));
document.querySelectorAll('.primary > ul > li > a[data-i18n="nav.estrutura"]').forEach(link => link.setAttribute('href', 'estrutura.html'));
document.querySelectorAll('.primary > ul > li > a[data-i18n="nav.noticias"]').forEach(link => link.setAttribute('href', 'noticias.html'));
document.querySelectorAll('.primary > ul > li > a[data-i18n="nav.concursos"]').forEach(link => link.setAttribute('href', 'index.html#concursos'));
document.querySelectorAll('.primary > ul > li > a[data-i18n="nav.formacao"]').forEach(link => link.setAttribute('href', 'index.html#formacao'));
document.querySelectorAll('.primary a[data-i18n="mega.institucional.item3"], .mobile-nav a[data-i18n="mega.institucional.item3b"]').forEach(link => {
  link.setAttribute('href', 'cemfa.html');
  link.removeAttribute('data-i18n');
  link.textContent = 'Chefe do Estado-Maior das Forças Armadas (CEMFA)';
});

function addStructureNavigationLinks(root) {
  const structureMenu = Array.from(root.querySelectorAll('.has-mega')).find(item =>
    item.querySelector(':scope > a[data-i18n="nav.estrutura"]')
  );
  const mega = structureMenu && structureMenu.querySelector('.mega');
  if (mega && !mega.querySelector('[href="comando-logistica.html"]')) {
    mega.insertAdjacentHTML('beforeend',
      '<a href="comando-logistica.html" data-institutional-link="comando-logistica">Comando da Logística</a>' +
      '<a href="cimmb.html" data-institutional-link="cimmb">Centro de Instrução Militar do Morro Branco</a>' +
      '<a href="escola-militar.html" data-institutional-link="escola-militar">Escola Militar</a>'
    );
  }

  const structureMobileMenu = Array.from(root.querySelectorAll('details')).find(item =>
    item.querySelector(':scope > summary[data-i18n="nav.estrutura"]')
  );
  const subLinks = structureMobileMenu && structureMobileMenu.querySelector('.sub-links');
  if (subLinks && !subLinks.querySelector('[href="comando-logistica.html"]')) {
    subLinks.insertAdjacentHTML('beforeend',
      '<a href="comando-logistica.html" data-institutional-link="comando-logistica">Comando da Logística</a>' +
      '<a href="cimmb.html" data-institutional-link="cimmb">Centro de Instrução Militar do Morro Branco</a>' +
      '<a href="escola-militar.html" data-institutional-link="escola-militar">Escola Militar</a>'
    );
  }
  appendNavigationLink(mega, 'inspecao-forcas-armadas.html', 'Inspeção das Forças Armadas', 'inspecao-forcas-armadas');
  appendNavigationLink(mega, 'direcao-informacoes-militares.html', 'Direção de Informações Militares', 'direcao-informacoes-militares');
  appendNavigationLink(mega, 'planeamento-estrategico.html', 'Centro de Planeamento Estratégico Militar', 'planeamento-estrategico');
  appendNavigationLink(mega, 'comando-guarnicao.html', 'Comando da Guarnição', 'comando-guarnicao');
  appendNavigationLink(subLinks, 'inspecao-forcas-armadas.html', 'Inspeção das Forças Armadas', 'inspecao-forcas-armadas');
  appendNavigationLink(subLinks, 'direcao-informacoes-militares.html', 'Direção de Informações Militares', 'direcao-informacoes-militares');
  appendNavigationLink(subLinks, 'planeamento-estrategico.html', 'Centro de Planeamento Estratégico Militar', 'planeamento-estrategico');
  appendNavigationLink(subLinks, 'comando-guarnicao.html', 'Comando da Guarnição', 'comando-guarnicao');

  root.querySelectorAll('.mega a[href="oficina-central.html"], .sub-links a[href="oficina-central.html"]').forEach(link => link.remove());

  const order = new Map([
    ['guarda-nacional.html', 1], ['guarda-costeira.html', 2], ['comando-logistica.html', 3],
    ['comando-pessoal.html', 4], ['inspecao-forcas-armadas.html', 5], ['direcao-informacoes-militares.html', 6],
    ['escola-militar.html', 7], ['planeamento-estrategico.html', 8], ['comando-guarnicao.html', 9],
    ['cimmb.html', 10], ['oficina-central.html', 99]
  ]);
  [mega, subLinks].filter(Boolean).forEach(menu => {
    Array.from(menu.querySelectorAll('a[href]'))
      .sort((left, right) => (order.get(left.getAttribute('href')) || 50) - (order.get(right.getAttribute('href')) || 50))
      .forEach(link => menu.appendChild(link));
  });
}

addStructureNavigationLinks(document);

function appendNavigationLink(container, href, label, marker) {
  if (!container || container.querySelector(`[data-institutional-route="${marker}"], a[href="${href}"]`)) return;
  const link = document.createElement('a');
  link.href = href;
  link.textContent = label;
  link.dataset.institutionalRoute = marker;
  container.appendChild(link);
}

function addSupplementaryNavigation(root) {
  const historyMenu = Array.from(root.querySelectorAll('.has-mega')).find(item => item.querySelector(':scope > a[data-i18n="nav.historia"]'));
  const historyMega = historyMenu && historyMenu.querySelector('.mega');
  historyMega?.querySelectorAll('[data-i18n="mega.historia.item2"], a[data-institutional-route="galeria-cemfa"]').forEach(link => link.remove());
  appendNavigationLink(historyMega, 'galeria-cemfa.html', 'Galeria dos CEMFA', 'memory-galeria-cemfa');
  appendNavigationLink(historyMega, 'postos-distintivos.html', 'Postos e Distintivos', 'memory-postos-distintivos');
  appendNavigationLink(historyMega, 'datas-comemorativas.html', 'Datas Comemorativas', 'memory-datas-comemorativas');

  let historyMobile = Array.from(root.querySelectorAll('details')).find(item => item.querySelector(':scope > summary[data-i18n="nav.historia"]'));
  const mobileNav = root.querySelector('#mobile-nav');
  if (!historyMobile && mobileNav) {
    historyMobile = document.createElement('details');
    historyMobile.dataset.memoryNavigation = 'true';
    historyMobile.innerHTML = '<summary>Memória Institucional</summary><div class="sub-links"></div>';
    const historyLink = mobileNav.querySelector('a.top-link[data-i18n="nav.historia"]');
    if (historyLink) historyLink.after(historyMobile);
    else mobileNav.appendChild(historyMobile);
  }
  const historySubLinks = historyMobile && historyMobile.querySelector('.sub-links');
  appendNavigationLink(historySubLinks, 'historia.html', 'História das FARP às Forças Armadas', 'memory-historia');
  historySubLinks?.querySelectorAll('[data-i18n="mega.historia.item2"], a[data-institutional-route="galeria-cemfa"]').forEach(link => link.remove());
  appendNavigationLink(historySubLinks, 'galeria-cemfa.html', 'Galeria dos CEMFA', 'memory-galeria-cemfa');
  appendNavigationLink(historySubLinks, 'postos-distintivos.html', 'Postos e Distintivos', 'memory-postos-distintivos');
  appendNavigationLink(historySubLinks, 'datas-comemorativas.html', 'Datas Comemorativas', 'memory-datas-comemorativas');
  appendNavigationLink(root.querySelector('#mobile-nav'), 'galeria-cemfa.html', 'Galeria dos CEMFA', 'galeria-cemfa-mobile');
  appendNavigationLink(root.querySelector('#mobile-nav'), 'datas-comemorativas.html', 'Datas Comemorativas', 'datas-comemorativas-mobile');
  appendNavigationLink(root.querySelector('#mobile-nav'), 'postos-distintivos.html', 'Postos e Distintivos', 'postos-distintivos-mobile');

  const institutionalMenu = Array.from(root.querySelectorAll('.has-mega')).find(item => item.querySelector(':scope > a[data-i18n="nav.institucional"]'));
  appendNavigationLink(institutionalMenu && institutionalMenu.querySelector('.mega'), 'comandante-supremo.html', 'Comandante Supremo', 'comandante-supremo');
  appendNavigationLink(institutionalMenu && institutionalMenu.querySelector('.mega'), 'cemfa.html', 'CEMFA', 'cemfa');
  appendNavigationLink(institutionalMenu && institutionalMenu.querySelector('.mega'), 'vice-cemfa.html', 'Vice-CEMFA', 'vice-cemfa');
  appendNavigationLink(institutionalMenu && institutionalMenu.querySelector('.mega'), 'ministro-defesa.html', 'Ministro da Defesa', 'ministro-defesa');
  const institutionalMobile = Array.from(root.querySelectorAll('details')).find(item => item.querySelector(':scope > summary[data-i18n="nav.institucional"]'));
  appendNavigationLink(institutionalMobile && institutionalMobile.querySelector('.sub-links'), 'comandante-supremo.html', 'Comandante Supremo', 'comandante-supremo');
  appendNavigationLink(institutionalMobile && institutionalMobile.querySelector('.sub-links'), 'cemfa.html', 'CEMFA', 'cemfa');
  appendNavigationLink(institutionalMobile && institutionalMobile.querySelector('.sub-links'), 'vice-cemfa.html', 'Vice-CEMFA', 'vice-cemfa');
  appendNavigationLink(institutionalMobile && institutionalMobile.querySelector('.sub-links'), 'ministro-defesa.html', 'Ministro da Defesa', 'ministro-defesa');

  const formationMenu = Array.from(root.querySelectorAll('.has-mega')).find(item => item.querySelector(':scope > a[data-i18n="nav.formacao"]'));
  appendNavigationLink(formationMenu && formationMenu.querySelector('.mega'), 'programa-soldado-cidadao.html', 'Programa Soldado Cidadão', 'programa-soldado-cidadao');
  const formationMobile = Array.from(root.querySelectorAll('details')).find(item => item.querySelector(':scope > summary[data-i18n="nav.formacao"]'));
  appendNavigationLink(formationMobile && formationMobile.querySelector('.sub-links'), 'programa-soldado-cidadao.html', 'Programa Soldado Cidadão', 'programa-soldado-cidadao');

  appendNavigationLink(root.querySelector('footer .footer-col ul'), 'ministro-defesa.html', 'Ministro da Defesa', 'ministro-defesa-footer');
  appendNavigationLink(root.querySelector('footer .footer-col ul'), 'vice-cemfa.html', 'Vice-CEMFA', 'vice-cemfa-footer');
  appendNavigationLink(root.querySelector('footer .footer-col ul'), 'datas-comemorativas.html', 'Datas Comemorativas', 'datas-comemorativas-footer');
  appendNavigationLink(root.querySelector('footer .footer-col ul'), 'postos-distintivos.html', 'Postos e Distintivos', 'postos-distintivos-footer');

  const mobileMenu = root.querySelector('#mobile-nav');
  if (mobileMenu) {
    const extraRoutes = [
      ['galeria-cemfa.html', 'Galeria dos CEMFA'], ['datas-comemorativas.html', 'Datas Comemorativas'],
      ['postos-distintivos.html', 'Postos e Distintivos'], ['programa-soldado-cidadao.html', 'Programa Soldado Cidadão'],
      ['inspecao-forcas-armadas.html', 'Inspeção das Forças Armadas'],
      ['direcao-informacoes-militares.html', 'Direção de Informações Militares'],
      ['planeamento-estrategico.html', 'Centro de Planeamento Estratégico Militar'],
      ['comando-guarnicao.html', 'Comando da Guarnição']
    ];
    const missingRoutes = extraRoutes.filter(([href]) => !mobileMenu.querySelector(`a[href="${href}"]`));
    if (missingRoutes.length && !mobileMenu.querySelector('[data-institutional-more]')) {
      const details = document.createElement('details');
      details.dataset.institutionalMore = 'true';
      details.innerHTML = '<summary>Mais áreas institucionais</summary><div class="sub-links"></div>';
      mobileMenu.appendChild(details);
      const subLinks = details.querySelector('.sub-links');
      missingRoutes.forEach(([href, label]) => appendNavigationLink(subLinks, href, label, `extra-${href}`));
    }
  }
}

addSupplementaryNavigation(document);

document.querySelectorAll('#link-defesa').forEach(link => {   // barra superior "Ministério da Defesa" → página do Ministro
  link.href = 'ministro-defesa.html';
  link.removeAttribute('target');
  link.removeAttribute('rel');
});
document.querySelectorAll('.footer-social a[href="#"]').forEach(link => link.remove());
document.querySelectorAll('a[href="#"]').forEach(link => {
  const label = link.textContent.trim();
  if (label === 'Política de Privacidade') link.href = 'politica-privacidade.html';
  if (label === 'Acessibilidade') link.href = 'acessibilidade.html';
});

new MutationObserver(records => {
  records.forEach(record => {
    record.addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) normalizeNavigationRoutes(node);
    });
  });
}).observe(document.body, { childList: true, subtree: true });

document.querySelectorAll('.brand').forEach(brand => {
  brand.setAttribute('href', 'index.html');
  brand.setAttribute('aria-label', 'Início');
});

/* ---------- mobile nav ---------- */
const mobileNav = document.getElementById('mobile-nav');
const burgerOpen = document.getElementById('btn-burger-open');
const burgerClose = document.getElementById('btn-burger-close');

if (mobileNav && burgerOpen && burgerClose) {
  // acessibilidade: estado expandido do botão (também reflete fecho por Esc / links)
  burgerOpen.setAttribute('aria-controls','mobile-nav');
  burgerOpen.setAttribute('aria-expanded','false');
  new MutationObserver(()=>{
    const isOpen = mobileNav.classList.contains('open');
    burgerOpen.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) burgerClose.focus({preventScroll:true});
  }).observe(mobileNav,{attributes:true,attributeFilter:['class']});

  burgerOpen.addEventListener('click',()=>mobileNav.classList.add('open'));
  burgerClose.addEventListener('click',()=>{ mobileNav.classList.remove('open'); burgerOpen.focus({preventScroll:true}); });
  mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileNav.classList.remove('open')));
}

/* ---------- concursos: ligações para a página com TODOS os concursos (concursos.html) ---------- */
document.querySelectorAll('a[data-i18n="nav.cta_concursos"]').forEach(a => a.setAttribute('href','concursos.html?status=abertos')); // botão dourado "Concursos Abertos"
document.querySelectorAll('a[data-i18n="mega.concursos.item4"]').forEach(a => a.setAttribute('href','concursos.html'));              // menu: "Concursos Públicos"
document.querySelectorAll('.mobile-nav details').forEach(d => {                                                                       // menu móvel: "Todos os Concursos"
  const s = d.querySelector('summary[data-i18n="nav.concursos"]'); const box = d.querySelector('.sub-links');
  if (s && box && !box.querySelector('a[href^="concursos.html"]')) {
    const a = document.createElement('a'); a.href = 'concursos.html'; a.textContent = 'Todos os Concursos'; box.insertBefore(a, box.firstChild);
    a.addEventListener('click',()=>document.getElementById('mobile-nav')?.classList.remove('open'));
  }
});

const searchForm = document.getElementById('search-form');
if (searchForm) {
  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    event.stopImmediatePropagation();
    const query = document.getElementById('search-input').value.trim();
    if (query) window.location.href = `pesquisa.html?q=${encodeURIComponent(query)}`;
  }, true);
}
