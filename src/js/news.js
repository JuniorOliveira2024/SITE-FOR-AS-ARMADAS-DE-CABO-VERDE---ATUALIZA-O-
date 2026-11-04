/* ---------- news filter (functional) ---------- */
const newsCards = document.querySelectorAll('.news-card');
function applyFilter(cat){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.toggle('active', b.dataset.filter===cat));
  newsCards.forEach(card=>{
    const show = cat==='Todas' || card.dataset.category===cat;
    card.classList.toggle('hide', !show);
  });
}
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>applyFilter(btn.dataset.filter));
});
/* mega-menu / footer links that set a news filter then scroll */
document.querySelectorAll('[data-filter]').forEach(link=>{
  if(link.classList.contains('filter-btn')) return;
  link.addEventListener('click',(e)=>{
    const cat = link.dataset.filter;
    if(cat){ applyFilter(cat); }
  });
});
