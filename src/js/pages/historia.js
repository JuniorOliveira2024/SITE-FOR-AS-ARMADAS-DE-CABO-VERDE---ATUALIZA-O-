/* Página História: realça no índice o capítulo da crónica que está a ser lido. */
(function(){
  const links = [...document.querySelectorAll('.chronicle-toc a')];
  if(!links.length || !('IntersectionObserver' in window)) return;
  const byId = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(!e.isIntersecting) return;
      links.forEach(l => l.classList.remove('is-active'));
      const a = byId.get(e.target.id); if(!a) return;
      a.classList.add('is-active');
      const box = a.closest('ol'); if(box && box.scrollWidth > box.clientWidth) box.scrollTo({left: a.offsetLeft - 16, behavior: 'smooth'});
    });
  }, { rootMargin: '-25% 0px -65% 0px' });
  document.querySelectorAll('.chapter').forEach(c => io.observe(c));
})();
