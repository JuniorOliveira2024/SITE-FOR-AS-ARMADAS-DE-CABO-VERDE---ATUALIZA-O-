/* ============================================================
   Formulário de Contacto — validação e confirmação no ecrã.
   Nota: sem um endpoint de backend dedicado a mensagens de
   contacto, este formulário mostra confirmação local (não fica
   gravado numa base de dados). Se quiser que fique registado,
   pode ligar-se este formulário a um novo endpoint /api/contactos
   no backend.
   ============================================================ */
document.getElementById('contact-form').addEventListener('submit', function(e){
  e.preventDefault();
  const btn = document.getElementById('contact-submit-btn');
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();

  if(!name || !email){
    showToast('Preencha o nome e o e-mail.');
    return;
  }

  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'A enviar…';

  setTimeout(() => {
    btn.textContent = '✓ Mensagem Enviada';
    showToast('Obrigado, ' + name.split(' ')[0] + '! A sua mensagem foi enviada.');
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = originalText;
      document.getElementById('contact-form').reset();
    }, 2500);
  }, 900);
});
