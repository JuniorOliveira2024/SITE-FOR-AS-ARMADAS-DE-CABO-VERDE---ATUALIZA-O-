/* ---------- arquivo de notícias mais antigas ---------- */
const archiveList = document.getElementById('archive-list');
const archiveToggleBtn = document.getElementById('btn-toggle-archive');
archiveToggleBtn.addEventListener('click', ()=>{
  const isOpen = archiveList.style.display !== 'none';
  archiveList.style.display = isOpen ? 'none' : 'flex';
  archiveToggleBtn.classList.toggle('open', !isOpen);
  archiveToggleBtn.childNodes[0].textContent = isOpen ? 'Ver notícias mais antigas ' : 'Ocultar notícias mais antigas ';
});

document.querySelectorAll('.doc-card').forEach(a=>{
  a.addEventListener('click',(e)=>{ e.preventDefault(); showToast('A descarregar documento oficial (PDF)…'); });
});
document.getElementById('btn-toast-concursos').addEventListener('click',()=>showToast('A carregar lista completa de concursos…'));
document.querySelectorAll('.job-apply').forEach(btn=>{
  btn.addEventListener('click',()=>{
    if(btn.disabled) return;
    const card = btn.closest('.job-card');
    openJobModal(card.dataset.job || card.querySelector('h4').textContent);
  });
});
document.getElementById('btn-toast-galeria').addEventListener('click',()=>showToast('A abrir galeria multimédia completa…'));
/* O Programa Soldado Cidadão já não abre em janela modal: "Saber mais" navega
   para programa-soldado-cidadao.html, onde vive todo o conteúdo do programa. */
