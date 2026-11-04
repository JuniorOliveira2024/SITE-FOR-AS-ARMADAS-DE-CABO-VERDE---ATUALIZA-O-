/* ============================================================
   Página de notícia individual — lê o parâmetro ?id= da URL,
   tenta o backend (se configurado) e usa os dados estáticos
   de news-data.js como resultado/fallback.
   ============================================================ */
(async function(){
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const loadingEl = document.getElementById('noticia-loading');
  const bodyEl = document.getElementById('noticia-body');

  function renderArticle(art){
    document.getElementById('page-title').textContent = art.title + ' — Forças Armadas de Cabo Verde';
    document.getElementById('noticia-image').src = art.image;
    document.getElementById('noticia-image').alt = art.title;
    document.getElementById('noticia-tag').textContent = art.tag || '';
    document.getElementById('noticia-date').textContent = art.date;
    document.getElementById('noticia-title').textContent = art.title;
    document.getElementById('noticia-paragraphs').innerHTML = art.paragraphs.map(p => '<p>' + p + '</p>').join('');
    loadingEl.style.display = 'none';
    bodyEl.style.display = 'block';
  }

  function showError(){
    loadingEl.innerHTML = 'Notícia não encontrada. <a href="index.html#noticias">Voltar às notícias</a>.';
    loadingEl.classList.add('noticia-error');
  }

  if (!id) { showError(); return; }

  if (id.startsWith('dyn-') && window.FA_API_BASE) {
    const realId = id.slice(4);
    try {
      const res = await fetch(window.FA_API_BASE + '/api/news/' + encodeURIComponent(realId));
      if (res.ok) {
        const item = await res.json();
        const dateStr = new Date(item.published_at).toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' });
        renderArticle({
          title: item.title,
          date: dateStr,
          tag: item.tag || item.category,
          image: item.image_url || 'https://commons.wikimedia.org/wiki/Special:FilePath/The_flag_of_Cape_Verde_Islands_in_the_city_center.jpg',
          paragraphs: (item.body || item.excerpt || '').split('\n').map(p => p.trim()).filter(Boolean)
        });
        return;
      }
    } catch (err) {
      console.warn('Backend indisponível ao carregar notícia dinâmica.', err);
    }
    showError();
    return;
  }

  const art = typeof NEWS_ARTICLES !== 'undefined' ? NEWS_ARTICLES[id] : null;
  if (art) {
    renderArticle(art);
  } else {
    showError();
  }
})();
