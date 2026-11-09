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
    document.getElementById('noticia-paragraphs').innerHTML = art.bodyHtml || art.paragraphs.map(p => '<p>' + p + '</p>').join('');
    // campos opcionais vindos do painel (não existem nas notícias do frontend)
    const esc = faEscText;
    const titleEl = document.getElementById('noticia-title');
    const old1 = document.getElementById('noticia-subtitle'); if (old1) old1.remove();
    if (art.subtitle) titleEl.insertAdjacentHTML('afterend', '<p id="noticia-subtitle" style="font-size:1.15em;color:var(--gray-500,#5a6b7d);margin:8px 0 0;">' + esc(art.subtitle) + '</p>');
    if (art.author) document.getElementById('noticia-date').textContent = art.date + ' · ' + art.author;
    const old2 = document.getElementById('noticia-gallery'); if (old2) old2.remove();
    if (art.gallery && art.gallery.length) {
      document.getElementById('noticia-paragraphs').insertAdjacentHTML('afterend', '<div id="noticia-gallery" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-top:28px;">' +
        art.gallery.map(g => '<img src="' + esc(g.url) + '" alt="' + esc(g.alt || art.title) + '" loading="lazy" style="width:100%;height:150px;object-fit:cover;border-radius:6px;">').join('') + '</div>');
    }
    if (art.seoTitle) document.getElementById('page-title').textContent = art.seoTitle;
    if (art.seoDescription) { let m = document.querySelector('meta[name="description"]'); if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'description'); document.head.appendChild(m); } m.setAttribute('content', art.seoDescription); }
    loadingEl.style.display = 'none';
    bodyEl.style.display = 'block';
  }

  function showError(){
    loadingEl.innerHTML = 'Notícia não encontrada. <a href="index.html#noticias">Voltar às notícias</a>.';
    loadingEl.classList.add('noticia-error');
  }

  if (!id) { showError(); return; }

  if (id.startsWith('dyn-') && FA_API.enabled()) {
    const item = await FA_API.get('/news/' + encodeURIComponent(id.slice(4)));
    if (item && item.title) { renderArticle(buildDynamicArticle(item)); return; }
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
