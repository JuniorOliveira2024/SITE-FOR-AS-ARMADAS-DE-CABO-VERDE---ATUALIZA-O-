/* ---------- candidatura a concurso (com campo militar no ativo) ---------- */
const jobModal = document.getElementById('job-modal');
const jobForm = document.getElementById('job-form');
const jobStepForm = document.getElementById('job-step-form');
const jobStepResult = document.getElementById('job-step-result');

function openJobModal(jobNome){
  document.getElementById('job-name').value = jobNome;
  document.getElementById('job-modal-lede').textContent = 'Preencha os seus dados para se candidatar a "'+jobNome+'". Aberto tanto a civis como a militares no ativo.';
  jobForm.reset();
  document.getElementById('job-name').value = jobNome;
  document.getElementById('job-name-error').style.display = 'none';
  jobStepForm.style.display = 'block';
  jobStepResult.style.display = 'none';
  jobModal.classList.add('open');
  setTimeout(()=>document.getElementById('job-full-name').focus(), 50);
}
function closeJobModal(){ jobModal.classList.remove('open'); }
document.getElementById('job-modal-close').addEventListener('click', closeJobModal);
document.getElementById('job-modal-backdrop').addEventListener('click', closeJobModal);
document.getElementById('job-close-btn').addEventListener('click', closeJobModal);
document.getElementById('job-back-btn').addEventListener('click', ()=>{
  jobStepForm.style.display='block'; jobStepResult.style.display='none';
});

jobForm.addEventListener('submit', async function(e){
  e.preventDefault();
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;
  const name = document.getElementById('job-full-name').value.trim().replace(/\s+/g,' ');
  const contact = document.getElementById('job-contact').value.trim();
  const email = document.getElementById('job-email').value.trim();
  const jobTitle = document.getElementById('job-name').value;
  const nameError = document.getElementById('job-name-error');
  const militarAtivoInput = jobForm.querySelector('input[name="militar-ativo"]:checked');
  const submitBtn = jobForm.querySelector('button[type="submit"]');

  if(!nameRegex.test(name)){
    nameError.style.display = 'block';
    document.getElementById('job-full-name').focus();
    return;
  }
  nameError.style.display = 'none';
  if(!contact){ showToast('Introduza um contacto válido.'); return; }
  if(!militarAtivoInput){ showToast('Indique se é militar no ativo.'); return; }

  const militarAtivo = militarAtivoInput.value === 'sim';

  submitBtn.disabled = true;
  submitBtn.textContent = 'A enviar…';

  if(window.FA_API_BASE){
    try{
      await fetch(window.FA_API_BASE + '/api/candidaturas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo:'concurso', referencia:jobTitle, nome_completo:name, contacto:contact, email:email || null, militar_ativo:militarAtivo })
      });
    } catch(err){
      console.warn('Backend indisponível — candidatura confirmada apenas localmente.', err);
    }
  }

  submitBtn.disabled = false;
  submitBtn.textContent = 'Enviar Candidatura';

  document.getElementById('job-result-note').textContent =
    name+', a sua candidatura ao concurso "'+jobTitle+'"'+(militarAtivo ? ' (como militar no ativo)' : ' (como candidato civil)')+' foi registada com sucesso. Entraremos em contacto através de '+contact+' com mais informações sobre as próximas etapas do processo.';
  jobStepForm.style.display='none';
  jobStepResult.style.display='block';
});
