/* ---------- MASTER PAGE: navbar + footer partilhados ----------
   Preenche <div id="master-navbar"> e <div id="master-footer"> com o conteúdo
   de master.html (via master-data.js). Corre de forma síncrona e antes dos
   restantes scripts da página, por isso o menu, a pesquisa, o idioma e o
   scrollspy encontram sempre os elementos que esperam. */
(function () {
  const M = window.FA_MASTER;
  if (!M) { console.warn('[master] master-data.js não carregado — execute: node build-master.js'); return; }

  const nav = document.getElementById('master-navbar');
  const foot = document.getElementById('master-footer');
  if (nav) nav.outerHTML = M.navbar;
  if (foot) foot.outerHTML = M.footer;

  /* Destaca no menu a página em que o visitante está */
  const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const group = {
    'index.html': 'index.html', 'historia.html': 'historia.html', 'estrutura.html': 'estrutura.html',
    'noticias.html': 'noticias.html', 'noticia.html': 'noticias.html',
    'concursos.html': 'concursos.html', 'programa-soldado-cidadao.html': 'concursos.html', 'escola-militar.html': 'concursos.html',
    'servico-militar.html': 'concursos.html',
    'multimedia.html': 'multimedia.html', 'contactos.html': 'contactos.html',
    'cimmb.html': 'estrutura.html', 'guarda-nacional.html': 'estrutura.html', 'guarda-costeira.html': 'estrutura.html',
    'comando-pessoal.html': 'estrutura.html', 'comando-logistica.html': 'estrutura.html', 'oficina-central.html': 'estrutura.html',
    'policlinica-forcas-armadas.html': 'estrutura.html', 'pupilos-forcas-armadas.html': 'estrutura.html', 'comando-guarnicao.html': 'estrutura.html',
    'comandante-supremo.html': 'index.html', 'ministro-defesa.html': 'index.html', 'cemfa.html': 'index.html', 'vice-cemfa.html': 'index.html'
  }[file];
  if (group && file !== 'index.html') {
    document.querySelectorAll('nav.primary > ul > li > a.nav-link').forEach(a => {
      if ((a.getAttribute('href') || '').split('#')[0].toLowerCase() === group) a.classList.add('active');
    });
  }
})();
