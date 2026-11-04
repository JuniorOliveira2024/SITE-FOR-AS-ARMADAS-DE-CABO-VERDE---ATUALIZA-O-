/* ============================================================
   Página "Todos os concursos": mostra TODOS os concursos da plataforma
   (concursos-data.js) com filtro por estado e pesquisa por texto.
   Se o backend estiver configurado (FA_API_BASE), junta também os
   concursos cadastrados no painel administrativo.
   ============================================================ */
(function(){
  const grid     = document.getElementById('concursos-grid');
  const filtersEl= document.getElementById('concursos-filters');
  const searchEl = document.getElementById('concursos-search');
  const countEl  = document.getElementById('concursos-count');
  if(!grid || !filtersEl) return;

  let items  = CONCURSOS_LISTA.slice();
  let filter = 'todos';
  let query  = '';

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const norm = s => String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');

  function actionHTML(c){
    const label = esc(c.actionLabel || 'Ver detalhes');
    if(c.action === 'apply')
      return `<button type="button" class="btn btn-outline-dark job-apply" data-apply="${esc(c.title)}"${c.disabled ? ' disabled' : ''}>${label}</button>`;
    if(c.action === 'detail')
      return `<button type="button" class="btn btn-outline-dark job-apply" data-detail="${esc(c.detail)}">${label}</button>`;
    return `<a class="btn btn-outline-dark job-apply" href="${esc(c.href || 'index.html#concursos')}">${label}</a>`;
  }

  function cardHTML(c){
    const base = CONCURSOS_STATUS[c.status] || { label: c.status, chip: 'info' };
    const st = c.statusLabel ? { ...base, label: c.statusLabel } : base;
    const meta = (c.meta || []).map(m => `<span>${esc(m)}</span>`).join('');
    return `
      <article class="job-card" data-status="${esc(c.status)}">
        <span class="job-ref mono">${esc(c.ref)}</span>
        <span class="status-chip ${st.chip}">${esc(st.label)}</span>
        <h3 class="job-card-title">${esc(c.title)}</h3>
        <p>${esc(c.description)}</p>
        ${meta ? `<div class="job-meta">${meta}</div>` : ''}
        ${actionHTML(c)}
      </article>`;
  }

  function renderFilters(){
    filtersEl.innerHTML = CONCURSOS_FILTROS.map(f => {
      const n = items.filter(f.test).length;
      return `<button type="button" class="filter-btn${f.key === filter ? ' active' : ''}" data-filter="${f.key}" aria-pressed="${f.key === filter}">${esc(f.label)} <span class="filter-count">${n}</span></button>`;
    }).join('');
  }

  function render(){
    const def = CONCURSOS_FILTROS.find(f => f.key === filter) || CONCURSOS_FILTROS[0];
    const q = norm(query);
    const list = items.filter(def.test).filter(c => !q || norm([c.title, c.description, c.ref, (c.meta||[]).join(' ')].join(' ')).includes(q));
    renderFilters();
    grid.innerHTML = list.length
      ? list.map(cardHTML).join('')
      : `<div class="concursos-empty">Nenhum concurso encontrado${q ? ' para “' + esc(query) + '”' : ' neste filtro'}. <button type="button" class="concursos-reset" data-reset>Ver todos os concursos</button></div>`;
    countEl.textContent = list.length === 1 ? '1 concurso encontrado' : list.length + ' concursos encontrados';
  }

  /* clicks: filtros, candidatura, detalhes (delegação — funciona com cards criados dinamicamente) */
  filtersEl.addEventListener('click', e => {
    const b = e.target.closest('[data-filter]'); if(!b) return;
    filter = b.dataset.filter; render();
  });
  grid.addEventListener('click', e => {
    if(e.target.closest('[data-reset]')){ filter = 'todos'; query = ''; searchEl.value = ''; render(); return; }
    const apply = e.target.closest('[data-apply]');
    if(apply && !apply.disabled){ openJobModal(apply.dataset.apply); return; }
    const det = e.target.closest('[data-detail]');
    if(det){ e.preventDefault(); openDetail(det.dataset.detail); }
  });
  searchEl.addEventListener('input', () => { query = searchEl.value.trim(); render(); });

  /* ?status=abertos | brevemente | ingresso | legislacao  e  ?q=texto */
  const params = new URLSearchParams(location.search);
  const wanted = params.get('status');
  if(wanted && CONCURSOS_FILTROS.some(f => f.key === wanted)) filter = wanted;
  if(params.get('q')){ query = params.get('q'); searchEl.value = query; }
  render();

  /* concursos do backend (painel administrativo): quando existem, SUBSTITUEM a lista estática —
     o painel passa a ser a origem do conteúdo (adicionar, editar, ocultar e eliminar). */
  const STATIC_ITEMS = items.slice();
  function fromApi(r){
    return {
      id: r.slug || r.id, kind: r.kind || 'concurso', status: r.status === 'em_curso' ? 'em-curso' : r.status,
      statusLabel: r.status_label || '',
      ref: r.ref || (r.deadline ? new Date(r.deadline).toLocaleDateString('pt-PT') : (r.law_reference || 'Concurso')),
      title: r.title, description: r.description || '',
      meta: Array.isArray(r.meta) ? r.meta : (r.deadline ? ['📅 Prazo: ' + new Date(r.deadline).toLocaleDateString('pt-PT')] : []),
      action: r.action || 'link', actionLabel: r.cta_label || (r.action === 'apply' ? 'Candidatar-se' : 'Ver detalhes'),
      href: r.cta_url || '', detail: r.detail_slug || '', disabled: !!r.disabled
    };
  }
  function loadRemote(){
    return FA_API.edited('concursos').then(ed => ed ? FA_API.get('/concursos?limit=200') : null).then(rows => {
      if(!Array.isArray(rows) || !rows.length) return;
      if(window.FA_CMS) FA_CMS.registerDetails(rows);
      items = rows.map(fromApi);
      render();
    });
  }
  loadRemote();
  if(window.FA_LIVE) window.FA_LIVE.onChange(loadRemote);   // alterações no painel → atualiza a lista
})();
