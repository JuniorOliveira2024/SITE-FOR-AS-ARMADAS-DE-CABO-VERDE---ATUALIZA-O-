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

  function tileHTML(item, i){
    const wide = i % 5 === 0;
    return `
      <button class="media-tile${wide ? ' wide':''}" data-img="${item.image}" data-caption="${(item.caption||'').replace(/"/g,'&quot;')}" data-credit="${(item.credit||'').replace(/"/g,'&quot;')}">
        <img src="${item.image}" alt="${(item.caption||'').replace(/"/g,'&quot;')}">
        <div class="overlay"><span>${item.caption || ''}</span></div>
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
        document.getElementById('mm-lightbox-img').src = tile.dataset.img;
        document.getElementById('mm-lightbox-caption').textContent = (tile.dataset.caption || '') + (tile.dataset.credit ? ' — ' + tile.dataset.credit : '');
        document.getElementById('mm-lightbox').classList.add('open');
      });
    });
  }

  filterBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      filterBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      render();
    });
  });

  document.getElementById('mm-lightbox-close').addEventListener('click', ()=> document.getElementById('mm-lightbox').classList.remove('open'));
  document.getElementById('mm-lightbox-backdrop').addEventListener('click', ()=> document.getElementById('mm-lightbox').classList.remove('open'));
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') document.getElementById('mm-lightbox').classList.remove('open'); });

  render();

  if(window.FA_API_BASE){
    fetch(window.FA_API_BASE + '/api/multimedia?flat=true&limit=60')
      .then(r => r.ok ? r.json() : [])
      .then(items => {
        if(!Array.isArray(items) || !items.length) return;
        allItems = items.map(it => ({ image: it.image_url, caption: it.caption || it.title, category: it.category, credit: it.credit }));
        render();
      })
      .catch(()=>{});
  }
})();
