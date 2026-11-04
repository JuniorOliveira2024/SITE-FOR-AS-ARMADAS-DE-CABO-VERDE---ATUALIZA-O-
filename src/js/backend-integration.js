/* ---------- backend integration: notícias e concursos dinâmicos ---------- */
function newsCardHTML(item, featured){
  const dateStr = new Date(item.published_at).toLocaleDateString('pt-PT', { day:'2-digit', month:'long', year:'numeric' });
  return `
    <article class="news-card reveal in${featured ? ' featured':''}" data-category="${item.category}">
      <div class="news-thumb">
        <img src="${item.image_url || 'https://commons.wikimedia.org/wiki/Special:FilePath/The_flag_of_Cape_Verde_Islands_in_the_city_center.jpg'}" alt="${item.title}">
        ${item.tag ? `<span class="tag">${item.tag}</span>` : ''}
      </div>
      <div class="news-body">
        <span class="news-date">${dateStr}</span>
        <h3 class="news-title">${item.title}</h3>
        <a href="#" class="news-link" data-noticia="dyn-${item.id}">Ler mais <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
      </div>
    </article>`;
}

/* regista notícias vindas do backend no leitor de artigos (NEWS_ARTICLES), com o prefixo "dyn-" */
function registerDynamicArticle(item){
  const dateStr = new Date(item.published_at).toLocaleDateString('pt-PT', { day:'2-digit', month:'long', year:'numeric' });
  NEWS_ARTICLES['dyn-' + item.id] = {
    title: item.title, date: dateStr, tag: item.tag || item.category,
    image: item.image_url || 'https://commons.wikimedia.org/wiki/Special:FilePath/The_flag_of_Cape_Verde_Islands_in_the_city_center.jpg',
    paragraphs: (item.body || item.excerpt || '').split('\n').map(p=>p.trim()).filter(Boolean)
  };
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
  const dateStr = new Date(item.published_at).toLocaleDateString('pt-PT', { day:'2-digit', month:'long', year:'numeric' });
  return `
    <div class="archive-row" data-noticia="dyn-${item.id}">
      <span class="archive-date mono">${dateStr}</span>
      <span class="archive-title">${item.title}</span>
      <span class="archive-cat">${item.category}</span>
      <a href="#" class="archive-link" data-noticia="dyn-${item.id}">Ler mais →</a>
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
  const statusMap = { aberto:['status-open','Aberto'], em_curso:['status-closing','Em curso'], encerrado:['status-open','Encerrado'] };
  const [cls,label] = statusMap[item.status] || ['status-open', item.status];
  const dateStr = item.deadline ? new Date(item.deadline).toLocaleDateString('pt-PT') : (item.law_reference || '—');
  return `
    <div class="concurso-row">
      <span class="concurso-date mono">${dateStr}</span>
      <span class="concurso-title">${item.title}</span>
      <span class="concurso-status ${cls}">${label}</span>
      <a href="${item.cta_url || '#concursos'}" class="concurso-cta">${item.cta_label || 'Ver detalhes'} →</a>
    </div>`;
}

function renderDynamicConcursos(items){
  const list = document.querySelector('#concursos .concurso-list');
  if(!list || !items.length) return;
  list.innerHTML = items.map(concursoRowHTML).join('');
}

function mediaTileHTML(item){
  const caption = item.title + (item.category ? ' · ' + item.category : '');
  const credit = item.credit || '';
  return `
    <button class="media-tile" data-caption="${caption.replace(/"/g,'&quot;')}" data-credit="${credit.replace(/"/g,'&quot;')}" data-img="${item.image_url}">
      <img src="${item.image_url}" alt="${item.title.replace(/"/g,'&quot;')}">
      <div class="overlay"><span>${item.caption ? item.caption : caption}</span></div>
    </button>`;
}

function renderDynamicMultimedia(items){
  const grid = document.getElementById('media-grid');
  if(!grid || !items.length) return;
  grid.innerHTML = items.map(mediaTileHTML).join('');
  // volta a ligar o lightbox a estes novos botões (a mesma lógica usada no conteúdo estático)
  grid.querySelectorAll('.media-tile').forEach(tile=>{
    tile.addEventListener('click',()=>{
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
  const parceiroHTML = parceiro;
  const isTransversal = f.nivel === 'Transversal';
  const acao = isTransversal
    ? `<span class="included-tag">Incluído no percurso</span>`
    : `<button class="btn-apply-course">Candidatar-se</button>`;
  return `
    <div class="courses-row" data-curso="${f.area.replace(/"/g,'&quot;')}">
      <span data-label="Área">${f.area}</span>
      <span data-label="Parceiro">${parceiroHTML}</span>
      <span data-label="Nível"><span class="level-chip ${nivelToChipClass(f.nivel)}">${f.nivel}</span></span>
      <span data-label="Duração">${f.duracao || '—'}</span>
      <span data-label="Ação">${acao}</span>
    </div>`;
}

function formacaoPscRowHTML(f){
  return `<div class="psc-page-course-row"><span>${f.area}</span><span class="level-chip ${nivelToChipClass(f.nivel)}">${f.nivel}</span></div>`;
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
    // volta a ligar os botões "Candidatar-se" recém-criados ao modal de candidatura
    table.querySelectorAll('.btn-apply-course').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const curso = btn.closest('.courses-row').dataset.curso;
        openCourseModal(curso);
      });
    });
  }
  const pscList = document.getElementById('psc-page-courses');
  if(pscList && items.length){
    pscList.innerHTML = items.map(formacaoPscRowHTML).join('');
  }
}

async function tryLoadDynamicContent(){
  if(!window.FA_API_BASE) return; // backend não configurado: mantém conteúdo estático de demonstração
  try{
    const [newsRes, archiveRes, concursosRes, multimediaRes, formacoesRes] = await Promise.all([
      fetch(window.FA_API_BASE + '/api/news?limit=5').catch(()=>null),
      fetch(window.FA_API_BASE + '/api/news?limit=20&offset=5').catch(()=>null),
      fetch(window.FA_API_BASE + '/api/concursos').catch(()=>null),
      fetch(window.FA_API_BASE + '/api/multimedia?flat=true&limit=60').catch(()=>null),
      fetch(window.FA_API_BASE + '/api/formacoes').catch(()=>null)
    ]);
    if(newsRes && newsRes.ok){
      const news = await newsRes.json();
      if(Array.isArray(news) && news.length) renderDynamicNews(news);
    }
    if(archiveRes && archiveRes.ok){
      const older = await archiveRes.json();
      if(Array.isArray(older) && older.length) renderDynamicArchive(older);
    }
    if(concursosRes && concursosRes.ok){
      const concursos = await concursosRes.json();
      if(Array.isArray(concursos) && concursos.length) renderDynamicConcursos(concursos);
    }
    if(formacoesRes && formacoesRes.ok){
      const formacoes = await formacoesRes.json();
      if(Array.isArray(formacoes) && formacoes.length) renderDynamicFormacoes(formacoes);
    }
    if(multimediaRes && multimediaRes.ok){
      const media = await multimediaRes.json();
      if(Array.isArray(media) && media.length) renderDynamicMultimedia(media);
    }
  } catch(err){
    console.warn('Backend indisponível — a manter conteúdo estático de demonstração.', err);
  }
}
tryLoadDynamicContent();
