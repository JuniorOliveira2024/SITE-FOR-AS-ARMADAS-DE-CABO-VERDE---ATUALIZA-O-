/* ---------- backend integration: notícias e concursos dinâmicos ---------- */
function faEsc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }

function newsCardHTML(item, featured){
  const dateStr = formatDatePt(item.published_at);
  return `
    <article class="news-card reveal in${featured ? ' featured':''}" data-category="${faEsc(item.category)}">
      <div class="news-thumb">
        <img src="${faEsc(item.image_url || FA_FALLBACK_IMAGE)}" alt="${faEsc(item.title)}">
        ${item.tag ? `<span class="tag">${faEsc(item.tag)}</span>` : ''}
      </div>
      <div class="news-body">
        <span class="news-date">${faEsc(dateStr)}</span>
        <h3 class="news-title">${faEsc(item.title)}</h3>
        <p class="news-excerpt">${faEsc(item.excerpt || '')}</p>
        <a href="#" class="news-link" data-noticia="dyn-${faEsc(item.id)}">Ler mais <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
      </div>
    </article>`;
}

/* regista notícias vindas do backend no leitor de artigos (NEWS_ARTICLES), com o prefixo "dyn-" */
function registerDynamicArticle(item){
  NEWS_ARTICLES['dyn-' + item.id] = buildDynamicArticle(item);
}

function renderDynamicNews(items){
  const grid = document.querySelector('#noticias .news-grid');
  if(!grid || !items.length) return;
  const top5 = items.slice(0, 5); // nunca mostrar mais de 5 notícias na grelha principal
  top5.forEach(registerDynamicArticle);
  grid.innerHTML = top5.map((item,i) => newsCardHTML(item, i===0)).join('');
  grid.querySelectorAll('.news-link[data-noticia]').forEach(a=>{
    a.addEventListener('click',(e)=>{ e.preventDefault(); window.location.href = 'noticia.html?id=' + encodeURIComponent(a.dataset.noticia); });
  });
}

function archiveRowHTML(item){
  const dateStr = formatDatePt(item.published_at);
  return `
    <div class="archive-row" data-noticia="dyn-${faEsc(item.id)}">
      <span class="archive-date mono">${faEsc(dateStr)}</span>
      <span class="archive-title">${faEsc(item.title)}</span>
      <span class="archive-cat">${faEsc(item.category)}</span>
      <a href="#" class="archive-link" data-noticia="dyn-${faEsc(item.id)}">Ler mais →</a>
    </div>`;
}

function renderDynamicArchive(items){
  const list = document.getElementById('archive-list');
  if(!list || !items.length) return;
  items.forEach(registerDynamicArticle);
  list.innerHTML = items.map(archiveRowHTML).join('');
  list.querySelectorAll('[data-noticia]').forEach(a=>{
    a.addEventListener('click',(e)=>{ e.preventDefault(); window.location.href = 'noticia.html?id=' + encodeURIComponent(a.dataset.noticia); });
  });
}

function concursoRowHTML(item){
  return FA_CMS.buildConcursoRowsHtml([item]);
}

function renderDynamicConcursos(items){
  if(!items.length) return;
  FA_CMS.applyConcursos(items);   // linhas da lista + cartões "Concursos Públicos Abertos" (ver core/cms.js)
}

function mediaTileHTML(item){
  const capText = (window.FA_RICH ? FA_RICH.text(item.caption || '') : (item.caption || ''));
  const caption = item.title + (item.category ? ' · ' + item.category : '');
  const credit = item.credit || '';
  return `
    <button class="media-tile" data-caption="${faEsc(caption)}" data-credit="${faEsc(credit)}" data-img="${faEsc(item.image_url)}"${item.type === 'video' && item.video_url ? ' data-video="' + faEsc(item.video_url) + '"' : ''}>
      <img src="${faEsc(item.image_url)}" alt="${faEsc(item.alt || item.title)}">
      <div class="overlay"><span>${faEsc(capText ? capText : caption)}</span></div>
    </button>`;
}

function renderDynamicMultimedia(items){
  const grid = document.getElementById('media-grid');
  if(!grid || !items.length) return;
  grid.innerHTML = items.map(mediaTileHTML).join('');
  // volta a ligar o lightbox a estes novos botões (a mesma lógica usada no conteúdo estático)
  grid.querySelectorAll('.media-tile').forEach(tile=>{
    tile.addEventListener('click',()=>{
      if(tile.dataset.video){ window.open(tile.dataset.video, '_blank', 'noopener'); return; }   // publicação de vídeo
      lbImg.src = tile.dataset.img;
      lbCaption.textContent = tile.dataset.caption || '';
      lbCredit.textContent = tile.dataset.credit || '';
      lightbox.classList.add('open');
    });
  });
}

/* mapeia "Nível I".."Nível V" e "Transversal" para a classe CSS do selo colorido */
function nivelToChipClass(nivel){
  const map = { 'Nível I':'lvl-1', 'Nível II':'lvl-2', 'Nível III':'lvl-3', 'Nível IV':'lvl-4', 'Nível V':'lvl-5', 'Transversal':'lvl-transv' };
  return map[nivel] || 'lvl-1';
}

function formacaoRowHTML(f){
  const parceiro = f.parceiro || '—';
  const isTransversal = f.nivel === 'Transversal';
  const acao = isTransversal
    ? `<span class="included-tag">Incluído no percurso</span>`
    : `<a class="btn-apply-course" href="programa-soldado-cidadao.html#cursos">Candidatar-se</a>`;
  return `
    <div class="courses-row" data-curso="${faEsc(f.area)}">
      <span data-label="Área">${faEsc(f.area)}</span>
      <span data-label="Parceiro">${faEsc(parceiro)}</span>
      <span data-label="Nível"><span class="level-chip ${nivelToChipClass(f.nivel)}">${faEsc(f.nivel)}</span></span>
      <span data-label="Duração">${faEsc(f.duracao || '—')}</span>
      <span data-label="Ação">${acao}</span>
    </div>`;
}

function formacaoPscRowHTML(f){
  const isTransversal = f.nivel === 'Transversal';
  const acao = isTransversal
    ? `<span class="included-tag">Incluído no percurso</span>`
    : `<button type="button" class="btn-apply-course">Candidatar-se</button>`;
  return `<div class="psc-page-course-row" data-curso="${faEsc(f.area)}"><span>${faEsc(f.area)}</span><span>${faEsc(f.parceiro || '')}</span><span class="level-chip ${nivelToChipClass(f.nivel)}">${faEsc(f.nivel)}</span><span>${faEsc(f.duracao || '')}</span><span>${acao}</span></div>`;
}

function renderDynamicFormacoes(items){
  const headRow = `
      <div class="courses-row courses-head-row">
        <span>Área de Formação</span>
        <span>Entidade Parceira</span>
        <span>Nível</span>
        <span>Duração</span>
        <span></span>
      </div>`;
  const table = document.getElementById('courses-table');
  if(table && items.length){
    table.innerHTML = headRow + items.map(formacaoRowHTML).join('');
  }
  const pscList = document.getElementById('psc-page-courses');
  if(pscList && items.length){
    pscList.innerHTML = '<div class="psc-page-course-row psc-page-course-head"><span>Área de Formação</span><span>Entidade Parceira</span><span>Nível</span><span>Duração</span><span></span></div>' + items.map(formacaoPscRowHTML).join('');
  }
}

async function tryLoadDynamicContent(){
  if(!FA_API.enabled()) return; // backend não configurado: mantém conteúdo estático de demonstração
  // cada pedido falha em separado: se um falhar, as outras secções continuam a atualizar-se
  // a API só substitui uma secção depois de ela ter sido alterada no painel: até lá, mantém-se o conteúdo do site
  const site = await FA_API.site();
  const ed = (site && site.edited) || {};
  const [news, older, concursos, media, formacoes] = await Promise.all([
    ed.news ? FA_API.get('/news?limit=5') : null,
    ed.news ? FA_API.get('/news?limit=20&offset=5') : null,
    ed.concursos ? FA_API.get('/concursos?limit=200') : null,
    ed.multimedia ? FA_API.get('/multimedia?flat=true&limit=60') : null,
    ed.formacoes ? FA_API.get('/formacoes') : null
  ]);
  if(Array.isArray(news) && news.length) renderDynamicNews(news);
  if(Array.isArray(older) && older.length) renderDynamicArchive(older);
  if(Array.isArray(concursos) && concursos.length) renderDynamicConcursos(concursos);
  if(Array.isArray(formacoes) && formacoes.length) renderDynamicFormacoes(formacoes);
  if(Array.isArray(media) && media.length) renderDynamicMultimedia(media);
}
tryLoadDynamicContent();
if(window.FA_LIVE) window.FA_LIVE.onChange(tryLoadDynamicContent);   // alterações no painel → atualiza a home
