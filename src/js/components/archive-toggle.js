/* ---------- arquivo de notícias mais antigas ---------- */
const archiveList = document.getElementById('archive-list');
const archiveToggleBtn = document.getElementById('btn-toggle-archive');
if (archiveToggleBtn && archiveList) {
  archiveToggleBtn.addEventListener('click', ()=>{
    const isOpen = archiveList.style.display !== 'none';
    archiveList.style.display = isOpen ? 'none' : 'flex';
    archiveToggleBtn.classList.toggle('open', !isOpen);
    archiveToggleBtn.childNodes[0].textContent = isOpen ? 'Ver notícias mais antigas ' : 'Ocultar notícias mais antigas ';
  });
}

document.querySelectorAll('.doc-card').forEach(a=>{
  a.addEventListener('click',(e)=>{ e.preventDefault(); showToast('A descarregar documento oficial (PDF)…'); });
});
/* delegação: funciona também com cartões criados depois (concursos vindos do painel) */
document.addEventListener('click',(e)=>{
  const btn = e.target.closest && e.target.closest('.job-card .job-apply');
  if(!btn || btn.disabled) return;
  if(typeof openJobModal !== 'function') return;
  const card = btn.closest('.job-card');
  openJobModal(card.dataset.job || card.querySelector('h4').textContent);
});
const galleryBtn = document.getElementById('btn-toast-galeria');
/* "Ver galeria completa" é agora uma ligação direta para multimedia.html */
