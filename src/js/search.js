/* ---------- search overlay ---------- */
const searchOverlay = document.getElementById('search-overlay');
const searchInput = document.getElementById('search-input');
document.getElementById('btn-search-open').addEventListener('click',()=>{
  searchOverlay.classList.add('open');
  setTimeout(()=>searchInput.focus(),50);
});
document.getElementById('btn-search-close').addEventListener('click',()=>searchOverlay.classList.remove('open'));
searchOverlay.addEventListener('click',(e)=>{ if(e.target===searchOverlay) searchOverlay.classList.remove('open'); });
document.getElementById('search-form').addEventListener('submit',(e)=>{
  e.preventDefault();
  const q = searchInput.value.trim().toLowerCase();
  searchOverlay.classList.remove('open');
  if(!q) return;
  const map = [
    {k:['guarda nacional'], id:'guarda-nacional'},
    {k:['guarda costeira'], id:'guarda-costeira'},
    {k:['cimmb','morro branco','recruta'], id:'cimmb'},
    {k:['jogos militares','desporto'], id:'noticias', filter:'Desporto'},
    {k:['serviço militar','servico militar'], id:'servico-militar'},
    {k:['objeção','objecao'], id:'objecao'},
    {k:['ocfa','oficina'], id:'ocfa'},
    {k:['comando do pessoal','pessoal'], id:'comando-pessoal'},
    {k:['concurso'], id:'concursos'},
    {k:['multimédia','multimedia','galeria'], id:'multimedia'},
    {k:['contacto'], id:'contacto'}
  ];
  const hit = map.find(m=>m.k.some(kw=>q.includes(kw)));
  if(hit){
    if(hit.filter) applyFilter(hit.filter);
    const target = document.getElementById(hit.id);
    if(target) target.scrollIntoView({behavior:'smooth'});
    showToast('Resultados para "'+searchInput.value+'"');
  } else {
    showToast('Sem resultados diretos para "'+searchInput.value+'" — consulte Notícias ou Documentos');
    document.getElementById('noticias').scrollIntoView({behavior:'smooth'});
  }
  searchInput.value='';
});
document.addEventListener('keydown',(e)=>{
  if(e.key==='Escape'){ searchOverlay.classList.remove('open'); mobileNav.classList.remove('open'); closeLightbox(); document.getElementById('service-modal').classList.remove('open'); document.getElementById('course-modal').classList.remove('open'); document.getElementById('job-modal').classList.remove('open'); document.getElementById('detail-modal').classList.remove('open'); const pscM=document.getElementById('psc-modal'); if(pscM) pscM.classList.remove('open'); }
});
