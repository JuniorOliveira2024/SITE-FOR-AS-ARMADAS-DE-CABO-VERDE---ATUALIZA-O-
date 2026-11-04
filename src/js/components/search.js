/* ---------- search overlay ---------- */
const searchOverlay = document.getElementById('search-overlay');
const searchInput = document.getElementById('search-input');

if (searchOverlay && searchInput) {
  const openBtn = document.getElementById('btn-search-open');
  const closeBtn = document.getElementById('btn-search-close');
  if (openBtn) openBtn.addEventListener('click',()=>{
    searchOverlay.classList.add('open');
    setTimeout(()=>searchInput.focus(),50);
  });
  if (closeBtn) closeBtn.addEventListener('click',()=>searchOverlay.classList.remove('open'));
  searchOverlay.addEventListener('click',(e)=>{ if(e.target===searchOverlay) searchOverlay.classList.remove('open'); });

  const form = document.getElementById('search-form');
  if (form) form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const q = searchInput.value.trim();
    if(!q) return;
    searchOverlay.classList.remove('open');
    window.location.href = 'pesquisa.html?q=' + encodeURIComponent(q);
  });
}

document.addEventListener('keydown',(e)=>{
  if(e.key!=='Escape') return;
  if (typeof searchOverlay !== 'undefined' && searchOverlay) searchOverlay.classList.remove('open');
  if (typeof mobileNav !== 'undefined' && mobileNav) mobileNav.classList.remove('open');
  if (typeof closeLightbox === 'function') closeLightbox();
  ['service-modal','course-modal','job-modal','detail-modal','psc-modal'].forEach(id=>{
    const el = document.getElementById(id);
    if (el) el.classList.remove('open');
  });
});
