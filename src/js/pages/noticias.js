/* ============================================================
   Página de Notícias — arquivo, documentos históricos,
   comunicados de imprensa e alertas num único centro de abas.
   ============================================================ */
(function(){
  const grid = document.getElementById('noticias-full-grid');
  const searchInput = document.getElementById('noticias-page-search');
  const filterBox = document.getElementById('noticias-page-filters');
  const comunicadosGrid = document.getElementById('comunicados-grid');
  let currentFilter = 'Todas';
  let currentSearch = '';

  const CATEGORY_BY_TAG = {
    'Tomada de Posse':'Cerimónias',
    'Reconhecimento':'Cerimónias',
    'Desporto Militar':'Desporto',
    'Formação':'Formação',
    'Ação Cívica':'Comunicados',
    'Operações':'Comunicados'
  };

  function esc(value){
    return String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }

  function articlesArray(){
    return Object.keys(NEWS_ARTICLES).map(id => {
      const art = Object.assign({ id }, NEWS_ARTICLES[id]);
      art.category = art.category || CATEGORY_BY_TAG[art.tag] || 'Todas';
      return art;
    });
  }

  /* Só o título da notícia, sem subtítulos nem resumos. */
  function cardHTML(art){
    return `
      <article class="news-card reveal in">
        <div class="news-thumb">
          <img src="${esc(art.image)}" alt="${esc(art.title)}">
        </div>
        <div class="news-body">
          <span class="news-date">${esc(art.date)}</span>
          <h3 class="news-title">${esc(art.title)}</h3>
          <a href="noticia.html?id=${encodeURIComponent(art.id)}" class="news-link">Ler notícia <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
        </div>
      </article>`;
  }

  function render(){
    if(!grid) return;
    let items = articlesArray();
    if(currentFilter !== 'Todas') items = items.filter(a => a.category === currentFilter || a.tag === currentFilter);
    if(currentSearch){
      const q = currentSearch.toLowerCase();
      items = items.filter(a => a.title.toLowerCase().includes(q) || (a.paragraphs||[]).join(' ').toLowerCase().includes(q));
    }
    grid.innerHTML = items.length
      ? items.map(cardHTML).join('')
      : '<div class="noticias-empty">Nenhuma notícia encontrada para este filtro/pesquisa.</div>';
  }

  function renderComunicados(){
    if(!comunicadosGrid) return;
    const items = articlesArray().filter(a => a.category === 'Comunicados' || a.tag === 'Ação Cívica' || a.tag === 'Operações');
    comunicadosGrid.innerHTML = items.map(cardHTML).join('');
  }

  if(filterBox) filterBox.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if(!btn) return;
    filterBox.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });

  if(searchInput) searchInput.addEventListener('input', () => {
    currentSearch = searchInput.value.trim();
    render();
  });

  /* ---------- abas ---------- */
  const tabs = Array.from(document.querySelectorAll('.news-tab'));
  const panels = Array.from(document.querySelectorAll('.news-panel'));
  function activateTab(name, updateHash){
    const tab = tabs.find(t => t.dataset.tab === name) || tabs[0];
    if(!tab) return;
    const target = tab.dataset.tab;
    tabs.forEach(t => { const on = t === tab; t.classList.toggle('active', on); t.setAttribute('aria-selected', on ? 'true' : 'false'); });
    panels.forEach(p => p.classList.toggle('active', p.dataset.panel === target));
    if(updateHash) history.replaceState(null, '', '#' + target);
  }
  tabs.forEach(tab => tab.addEventListener('click', () => activateTab(tab.dataset.tab, true)));
  const initial = (location.hash || '').replace('#','');
  if(['ultimas','documentos','comunicados','alertas'].includes(initial)) activateTab(initial, false);

  /* documentação: categorias (legislação) e abertura dos ficheiros PDF — por delegação, para funcionar também depois de o painel alterar a lista */
  const docsLib = document.getElementById('noticias-docs-grid');
  const docToast = () => { if (typeof showToast === 'function') showToast('Documento ainda não disponível para descarga.'); };
  if (docsLib) {
    docsLib.addEventListener('click', (e) => {
      const btn = e.target.closest('.docs-cat');
      if (btn) {
        docsLib.querySelectorAll('.docs-cat').forEach(b => { const on = b === btn; b.classList.toggle('is-active', on); b.setAttribute('aria-selected', on ? 'true' : 'false'); });
        docsLib.querySelectorAll('.docs-panel').forEach(p => { const on = p.id === 'docpanel-' + btn.dataset.cat; p.classList.toggle('is-active', on); p.hidden = !on; });
        return;
      }
      const a = e.target.closest('.doc-card');
      if (!a) return;
      e.preventDefault();
      const url = a.getAttribute('href');
      if (!url || url === '#') return docToast();
      fetch(url, { method: 'HEAD' }).then(r => { if (r.ok) window.open(url, '_blank', 'noopener'); else docToast(); }).catch(docToast);
    });
  }

  render();
  renderComunicados();

  function loadRemote(){
    return FA_API.edited('news').then(ed => ed ? FA_API.get('/news?limit=50') : null).then(items => {
      if(!Array.isArray(items) || !items.length) return;
      items.forEach(item => { NEWS_ARTICLES['dyn-' + item.id] = buildDynamicArticle(item); });
      render();
      renderComunicados();
    });
  }
  loadRemote();
  if(window.FA_LIVE) window.FA_LIVE.onChange(loadRemote);
})();
