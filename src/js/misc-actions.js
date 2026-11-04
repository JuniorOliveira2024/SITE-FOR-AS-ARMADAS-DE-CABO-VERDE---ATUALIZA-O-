document.querySelectorAll('.doc-card').forEach(a=>{
  a.addEventListener('click',(e)=>{ e.preventDefault(); showToast('A descarregar documento oficial (PDF)…'); });
});
document.getElementById('btn-toast-archive').addEventListener('click',()=>showToast('A carregar arquivo noticioso completo…'));
document.getElementById('btn-toast-concursos').addEventListener('click',()=>showToast('A carregar lista completa de concursos…'));
document.querySelectorAll('.job-apply').forEach(btn=>{
  btn.addEventListener('click',()=>{
    if(btn.disabled) return;
    const card = btn.closest('.job-card');
    openJobModal(card.dataset.job || card.querySelector('h4').textContent);
  });
});
document.getElementById('btn-toast-galeria').addEventListener('click',()=>showToast('A abrir galeria multimédia completa…'));
document.getElementById('psc-saber-mais').addEventListener('click',()=>showToast('A abrir informações completas do Programa Soldado Cidadão…'));
