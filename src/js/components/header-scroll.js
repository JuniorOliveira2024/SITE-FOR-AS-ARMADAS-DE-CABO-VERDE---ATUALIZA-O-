/* ---------- header inteligente ----------
   Rolar para BAIXO  → o header (barra de navegação) desaparece.
   Rolar para CIMA   → o header volta a aparecer.
   No topo da página fica sempre visível.
   Nunca esconde: com o foco do teclado dentro do header, ou com menu móvel / pesquisa abertos. */
(function(){
  const header = document.querySelector('header.site-header');
  if(!header) return;

  const DELTA = 6;                 // rolagem mínima (px) para contar como mudança de direção
  let lastY = window.scrollY;
  let ticking = false;

  const show = ()=> header.classList.remove('header-hidden');
  const hide = ()=> header.classList.add('header-hidden');

  function overlayOpen(){
    return !!document.querySelector('.mobile-nav.open, .search-overlay.open');
  }

  function update(){
    ticking = false;
    const y = Math.max(window.scrollY, 0);
    const limit = header.offsetHeight;          // só começa a esconder depois de passar o header

    if(overlayOpen() || header.matches(':focus-within') || y <= limit){
      show(); lastY = y; return;
    }
    if(Math.abs(y - lastY) < DELTA) return;      // ignora micro-movimentos

    if(y > lastY) hide(); else show();
    lastY = y;
  }

  window.addEventListener('scroll', ()=>{
    if(!ticking){ ticking = true; requestAnimationFrame(update); }
  }, {passive:true});

  // teclado: se alguém navega com Tab até ao header, ele reaparece
  header.addEventListener('focusin', show);

  update();
})();
