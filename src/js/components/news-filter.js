/* ---------- news filter (functional) ---------- */
function applyFilter(cat){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.toggle('active', b.dataset.filter===cat));
  document.querySelectorAll('.news-card').forEach(card=>{   // consulta no momento: inclui cartões/categorias criados no painel
    const show = cat==='Todas' || card.dataset.category===cat;
    card.classList.toggle('hide', !show);
  });
}
/* delegação: funciona também com botões de categorias criadas depois no painel */
document.addEventListener('click',(e)=>{
  const btn = e.target.closest && e.target.closest('.filters .filter-btn');
  if(btn) applyFilter(btn.dataset.filter);
});
/* mega-menu / footer links that set a news filter then scroll */
document.querySelectorAll('[data-filter]').forEach(link=>{
  if(link.classList.contains('filter-btn')) return;
  link.addEventListener('click',(e)=>{
    const cat = link.dataset.filter;
    if(cat){ applyFilter(cat); }
  });
});
