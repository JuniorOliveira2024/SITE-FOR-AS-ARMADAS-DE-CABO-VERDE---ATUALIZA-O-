/* ---------- candidatura a formação (Programa Soldado Cidadão) ---------- */
const courseModal = document.getElementById('course-modal');
const courseForm = document.getElementById('course-form');
const courseStepForm = document.getElementById('course-step-form');
const courseStepResult = document.getElementById('course-step-result');

function openCourseModal(cursoNome){
  document.getElementById('course-name').value = cursoNome;
  document.getElementById('course-modal-lede').textContent = 'Preencha os seus dados para se candidatar à formação de "'+cursoNome+'".';
  courseForm.reset();
  document.getElementById('course-name').value = cursoNome;
  document.getElementById('course-name-error').style.display = 'none';
  courseStepForm.style.display = 'block';
  courseStepResult.style.display = 'none';
  courseModal.classList.add('open');
  setTimeout(()=>document.getElementById('course-full-name').focus(), 50);
}
function closeCourseModal(){ courseModal.classList.remove('open'); }

document.querySelectorAll('.btn-apply-course').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const curso = btn.closest('.courses-row').dataset.curso;
    openCourseModal(curso);
  });
});
document.getElementById('course-modal-close').addEventListener('click', closeCourseModal);
document.getElementById('course-modal-backdrop').addEventListener('click', closeCourseModal);
document.getElementById('course-close-btn').addEventListener('click', closeCourseModal);
document.getElementById('course-back-btn').addEventListener('click', ()=>{
  courseStepForm.style.display='block'; courseStepResult.style.display='none';
});

courseForm.addEventListener('submit', async function(e){
  e.preventDefault();
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;
  const name = document.getElementById('course-full-name').value.trim().replace(/\s+/g,' ');
  const contact = document.getElementById('course-contact').value.trim();
  const email = document.getElementById('course-email').value.trim();
  const curso = document.getElementById('course-name').value;
  const nameError = document.getElementById('course-name-error');
  const submitBtn = courseForm.querySelector('button[type="submit"]');

  if(!nameRegex.test(name)){
    nameError.style.display = 'block';
    document.getElementById('course-full-name').focus();
    return;
  }
  nameError.style.display = 'none';
  if(!contact){ showToast('Introduza um contacto válido.'); return; }

  submitBtn.disabled = true;
  submitBtn.textContent = 'A enviar…';

  if(window.FA_API_BASE){
    try{
      await fetch(window.FA_API_BASE + '/api/candidaturas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo:'formacao', referencia:curso, nome_completo:name, contacto:contact, email:email || null })
      });
    } catch(err){
      console.warn('Backend indisponível — candidatura confirmada apenas localmente.', err);
    }
  }

  submitBtn.disabled = false;
  submitBtn.textContent = 'Enviar Candidatura';

  document.getElementById('course-result-note').textContent =
    name+', a sua candidatura à formação "'+curso+'" foi registada com sucesso. Entraremos em contacto através de '+contact+' com mais informações sobre o local, data de início e documentos necessários.';
  courseStepForm.style.display='none';
  courseStepResult.style.display='block';
});
