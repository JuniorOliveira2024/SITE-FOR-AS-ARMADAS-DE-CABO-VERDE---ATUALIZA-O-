/* ============================================================
   Página de Arquivo de Notícias — renderiza todos os artigos de
   news-data.js (e, se o backend estiver ligado, tenta também
   trazer notícias reais da base de dados) com filtro e pesquisa.
   ============================================================ */
(function(){
  const grid = document.getElementById('noticias-full-grid');
  const searchInput = document.getElementById('noticias-page-search');
  const filterBtns = document.querySelectorAll('#noticias-page-filters .filter-btn');
  let currentFilter = 'Todas';
  let currentSearch = '';

  function articlesArray(){
    return Object.keys(NEWS_ARTICLES).map(id => Object.assign({ id }, NEWS_ARTICLES[id]));
  }

  function cardHTML(art){
    return `
      <article class="news-card reveal in">
        <div class="news-thumb">
          <img src="${art.image}" alt="${art.title}">
          ${art.tag ? `<span class="tag">${art.tag}</span>` : ''}
        </div>
        <div class="news-body">
          <span class="news-date">${art.date}</span>
          <h3 class="news-title">${art.title}</h3>
          <p class="news-excerpt">${(art.paragraphs && art.paragraphs[0]) || ''}</p>
          <a href="noticia.html?id=${encodeURIComponent(art.id)}" class="news-link">Ler mais <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
        </div>
      </article>`;
  }

  function render(){
    let items = articlesArray();
    if(currentFilter !== 'Todas'){
      items = items.filter(a => a.tag === currentFilter || (a.category === currentFilter));
    }
    if(currentSearch){
      const q = currentSearch.toLowerCase();
      items = items.filter(a => a.title.toLowerCase().includes(q) || (a.paragraphs||[]).join(' ').toLowerCase().includes(q));
    }
    if(items.length === 0){
      grid.innerHTML = '<div class="noticias-empty">Nenhuma notícia encontrada para este filtro/pesquisa.</div>';
      return;
    }
    grid.innerHTML = items.map(cardHTML).join('');
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      render();
    });
  });

  searchInput.addEventListener('input', () => {
    currentSearch = searchInput.value.trim();
    render();
  });

  render();

  if(window.FA_API_BASE){
    fetch(window.FA_API_BASE + '/api/news?limit=50')
      .then(r => r.ok ? r.json() : [])
      .then(items => {
        if(!Array.isArray(items) || !items.length) return;
        items.forEach(item => {
          const dateStr = new Date(item.published_at).toLocaleDateString('pt-PT', { day:'2-digit', month:'long', year:'numeric' });
          NEWS_ARTICLES['dyn-' + item.id] = {
            title: item.title, date: dateStr, tag: item.tag || item.category,
            image: item.image_url || 'https://commons.wikimedia.org/wiki/Special:FilePath/The_flag_of_Cape_Verde_Islands_in_the_city_center.jpg',
            paragraphs: (item.body || item.excerpt || '').split('\n').map(p=>p.trim()).filter(Boolean)
          };
        });
        render();
      })
      .catch(()=>{});
  }
})();
