/* ============================================================
   Página de Galeria Multimédia — mostra conteúdo estático de
   demonstração e, se o backend estiver ligado, substitui/acrescenta
   pelas publicações reais guardadas em /api/multimedia.
   ============================================================ */
(function(){
  const STATIC_ITEMS = [
    { image:'https://commons.wikimedia.org/wiki/Special:FilePath/Kanonen_vor_Kaserne_Quartel_Jaime_Mota_Plato_Praia,_Santiago.JPG', caption:'Instalações militares · Plateau, Praia', category:'Formação', credit:'Wikimedia Commons' },
    { image:'https://commons.wikimedia.org/wiki/Special:FilePath/Pal%C3%A1cio_do_governo_(11223820464).jpg', caption:'Tomada de posse do CEMFA · Palácio da Presidência', category:'Cerimónias', credit:'Wikimedia Commons' },
    { image:'https://commons.wikimedia.org/wiki/Special:FilePath/Cape_Verde_Coast_Guard_patrol_vessel_Guardi%C3%A3o_(P511)_moored_in_Mindelo_on_9_August_2019_190809-N-UN744-0063.jpg', caption:'Navio-patrulha Guardião (P511) · Mindelo', category:'Guarda Costeira', credit:'US Navy / Wikimedia Commons' },
    { image:'https://commons.wikimedia.org/wiki/Special:FilePath/Rua_Pedonal,_Praia,_Cabo_Verde_01.jpg', caption:'Ação Cívica · Dia da Defesa Nacional', category:'Ação Cívica', credit:'Wikimedia Commons' },
    { image:'https://commons.wikimedia.org/wiki/Special:FilePath/The_flag_of_Cape_Verde_Islands_in_the_city_center.jpg', caption:'Juramento à Bandeira Nacional', category:'Cerimónias', credit:'Wikimedia Commons' },
    { image:'https://commons.wikimedia.org/wiki/Special:FilePath/Praia-Vue_a%C3%A9rienne_du_port.jpg', caption:'Vista aérea do Porto da Praia', category:'Ação Cívica', credit:'Wikimedia Commons' },
  ];

  const grid = document.getElementById('mm-full-grid');
  const filterBtns = document.querySelectorAll('#mm-page-filters .filter-btn');
  let allItems = STATIC_ITEMS.slice();
  let currentFilter = 'Todas';

  const escTile = s => String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  function tileHTML(item, i){
    const wide = i % 5 === 0;
    return `
      <button class="media-tile${wide ? ' wide':''}" data-img="${escTile(item.image)}" data-caption="${escTile(item.caption)}" data-credit="${escTile(item.credit)}"${item.video ? ' data-video="' + escTile(item.video) + '"' : ''}>
        <img src="${escTile(item.image)}" alt="${escTile(item.caption)}">
        <div class="overlay"><span>${escTile(item.caption)}</span></div>
      </button>`;
  }

  function render(){
    let items = allItems;
    if(currentFilter !== 'Todas'){
      items = items.filter(i => i.category === currentFilter);
    }
    if(!items.length){
      grid.innerHTML = '<div class="mm-empty">Sem publicações nesta categoria.</div>';
      return;
    }
    grid.innerHTML = items.map(tileHTML).join('');
    grid.querySelectorAll('.media-tile').forEach(tile=>{
      tile.addEventListener('click', ()=>{
        if(tile.dataset.video){ window.open(tile.dataset.video, '_blank', 'noopener'); return; }   // publicação de vídeo
        document.getElementById('mm-lightbox-img').src = tile.dataset.img;
        document.getElementById('mm-lightbox-caption').textContent = (tile.dataset.caption || '') + (tile.dataset.credit ? ' — ' + tile.dataset.credit : '');
        document.getElementById('mm-lightbox').classList.add('open');
      });
    });
  }

  /* delegação: funciona também com botões de categorias criadas depois no painel */
  document.getElementById('mm-page-filters').addEventListener('click', e=>{
    const btn = e.target.closest('.filter-btn');
    if(!btn) return;
    document.querySelectorAll('#mm-page-filters .filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });

  document.getElementById('mm-lightbox-close').addEventListener('click', ()=> document.getElementById('mm-lightbox').classList.remove('open'));
  document.getElementById('mm-lightbox-backdrop').addEventListener('click', ()=> document.getElementById('mm-lightbox').classList.remove('open'));
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') document.getElementById('mm-lightbox').classList.remove('open'); });

  /* ---------- carrossel de apresentação ---------- */
  const stage = document.getElementById('mm-stage');
  const thumbs = document.getElementById('mm-thumbs');
  const counter = document.getElementById('mm-counter');
  const toggleBtn = document.getElementById('mm-toggle');
  const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DELAY = 6500;
  let slides = [], index = 0, timer = null, paused = reduceMotion, hoverPause = false;

  function openLightbox(item){
    document.getElementById('mm-lightbox-img').src = item.image;
    document.getElementById('mm-lightbox-caption').textContent = (item.caption || '') + (item.credit ? ' — ' + item.credit : '');
    document.getElementById('mm-lightbox').classList.add('open');
  }
  function parts(item){
    const bits = String(item.caption || '').split(' · ');
    return { title: bits[0] || 'Multimédia', place: bits.slice(1).join(' · ') };
  }
  function show(n, userAction){
    if(!slides.length) return;
    index = (n + slides.length) % slides.length;
    stage.querySelectorAll('.mm-slide').forEach((el,i)=>{ const on = i === index; el.classList.toggle('is-active', on); el.setAttribute('aria-hidden', String(!on)); el.querySelectorAll('button').forEach(b=>b.tabIndex = on ? 0 : -1); });
    thumbs.querySelectorAll('.mm-thumb').forEach((el,i)=>{ el.classList.toggle('is-active', i === index); el.setAttribute('aria-selected', String(i === index)); });
    counter.textContent = String(index+1).padStart(2,'0') + ' / ' + String(slides.length).padStart(2,'0');
    const active = thumbs.querySelector('.mm-thumb.is-active'); if(active && userAction) active.scrollIntoView({block:'nearest', inline:'center', behavior: reduceMotion ? 'auto' : 'smooth'});
    restart();
  }
  function tick(){ if(!paused && !hoverPause && !document.hidden) show(index + 1); }
  function restart(){ clearInterval(timer); stage.style.setProperty('--mm-delay', DELAY + 'ms'); stage.classList.remove('is-running'); void stage.offsetWidth; if(!paused && slides.length > 1){ stage.classList.add('is-running'); timer = setInterval(tick, DELAY); } }
  function setPaused(v){ paused = v; toggleBtn.setAttribute('aria-pressed', String(v)); toggleBtn.setAttribute('aria-label', v ? 'Retomar apresentação' : 'Pausar apresentação'); toggleBtn.classList.toggle('is-paused', v); stage.classList.toggle('is-paused', v); restart(); }

  function buildCarousel(){
    if(!stage) return;
    slides = allItems.slice(0, 12);
    if(!slides.length){ stage.closest('.mm-showcase').hidden = true; return; }
    stage.closest('.mm-showcase').hidden = false;
    stage.innerHTML = slides.map((it,i)=>{ const p = parts(it); return `
      <figure class="mm-slide" role="group" aria-roledescription="slide" aria-label="${i+1} de ${slides.length}">
        <img src="${esc(it.image)}" alt="${esc(it.caption)}" ${i===0?'':'loading="lazy"'} onerror="this.parentNode.classList.add('img-failed');this.remove()">
        <figcaption class="mm-caption">
          ${it.category ? `<span class="mm-chip">${esc(it.category)}</span>` : ''}
          <h3>${esc(p.title)}</h3>
          ${p.place ? `<p class="mm-place"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>${esc(p.place)}</p>` : ''}
          <div class="mm-caption-foot">
            <button type="button" class="mm-open" data-open="${i}">Ver em ecrã inteiro</button>
            ${it.credit ? `<span class="mm-credit">Fonte: ${esc(it.credit)}</span>` : ''}
          </div>
        </figcaption>
      </figure>`; }).join('') + '<div class="mm-progress" aria-hidden="true"><i></i></div>';
    thumbs.innerHTML = slides.map((it,i)=>`<button type="button" class="mm-thumb" role="tab" aria-label="${esc(parts(it).title)}" data-go="${i}"><img src="${esc(it.image)}" alt="" loading="lazy" onerror="this.remove()"></button>`).join('');
    index = 0; show(0);
  }

  if(stage){
    document.getElementById('mm-prev').addEventListener('click', ()=>show(index-1, true));
    document.getElementById('mm-next').addEventListener('click', ()=>show(index+1, true));
    toggleBtn.addEventListener('click', ()=>setPaused(!paused));
    thumbs.addEventListener('click', e=>{ const b = e.target.closest('[data-go]'); if(b) show(Number(b.dataset.go), true); });
    stage.addEventListener('click', e=>{ const b = e.target.closest('[data-open]'); if(b) openLightbox(slides[Number(b.dataset.open)]); });
    stage.addEventListener('keydown', e=>{ if(e.key === 'ArrowLeft'){ e.preventDefault(); show(index-1, true); } if(e.key === 'ArrowRight'){ e.preventDefault(); show(index+1, true); } });
    const wrap = stage.closest('.mm-showcase');
    wrap.addEventListener('mouseenter', ()=>{ hoverPause = true; });
    wrap.addEventListener('mouseleave', ()=>{ hoverPause = false; });
    wrap.addEventListener('focusin',   ()=>{ hoverPause = true; });
    wrap.addEventListener('focusout',  ()=>{ hoverPause = false; });
    let sx = null;                                   // gesto de arrastar (telemóvel)
    stage.addEventListener('touchstart', e=>{ sx = e.touches[0].clientX; }, {passive:true});
    stage.addEventListener('touchend', e=>{ if(sx == null) return; const dx = e.changedTouches[0].clientX - sx; if(Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1), true); sx = null; }, {passive:true});
    setPaused(reduceMotion);
  }

  render();
  buildCarousel();

  function loadRemote(){
    return FA_API.edited('multimedia').then(ed => ed ? FA_API.get('/multimedia?flat=true&limit=60') : null).then(items => {
      if(!Array.isArray(items) || !items.length) return;
      allItems = items.map(it => ({ image: it.image_url, caption: (window.FA_RICH ? FA_RICH.text(it.caption || '') : (it.caption || '')) || it.title, category: it.category, credit: it.credit, video: it.type === 'video' ? it.video_url : '' }));
      render();
      buildCarousel();
    });
  }
  loadRemote();
  if(window.FA_LIVE) window.FA_LIVE.onChange(loadRemote);   // alterações no painel → atualiza a galeria
})();

/* cartão "Eventos": abre a galeria já filtrada em "Cerimónias" */
document.querySelectorAll('[data-mm-filter]').forEach(card => {
  card.addEventListener('click', () => {
    const btn = document.querySelector('#mm-page-filters .filter-btn[data-filter="' + card.dataset.mmFilter + '"]');
    if (btn) btn.click();
  });
});
