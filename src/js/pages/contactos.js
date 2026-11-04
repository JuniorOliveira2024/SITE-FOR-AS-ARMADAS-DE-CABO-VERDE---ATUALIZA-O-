/* ============================================================
   Formulário de Contacto — validação e envio.
   Com o backend ligado (FA_API_BASE) a mensagem é gravada em
   /api/contact-messages e fica disponível no painel (Mensagens).
   Sem backend, mostra apenas a confirmação de demonstração.
   ============================================================ */
document.getElementById('contact-form').addEventListener('submit', async function(e){
  e.preventDefault();
  const btn = document.getElementById('contact-submit-btn');
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const subject = document.getElementById('contact-subject').value;
  const message = document.getElementById('contact-message').value.trim();

  if(!name || !email){
    showToast('Preencha o nome e o e-mail.');
    return;
  }

  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'A enviar…';

  if(FA_API.enabled()){
    try{
      await FA_API.post('/contact-messages', { name, email, subject, message });
    } catch(err){
      btn.disabled = false;
      btn.textContent = originalText;
      showToast(FA_API.describe(err));
      return;
    }
  } else {
    await new Promise(resolve => setTimeout(resolve, 900));   // modo demonstração (sem backend)
  }

  btn.textContent = '✓ Mensagem Enviada';
  showToast('Obrigado, ' + name.split(' ')[0] + '! A sua mensagem foi enviada.');
  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = originalText;
    document.getElementById('contact-form').reset();
  }, 2500);
});
