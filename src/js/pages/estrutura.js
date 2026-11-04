/* Página Estrutura: liga a legenda e a lista de regiões ao mapa ilustrativo (realce da Região Militar). */
(function(){
  const section = document.querySelector('.regions-section'); if(!section) return;
  const set = n => { section.classList.toggle('has-active', !!n); section.querySelectorAll('[data-rm]').forEach(e => e.classList.toggle('is-active', e.dataset.rm === n)); };
  section.querySelectorAll('.region-item[data-rm], .map-legend [data-rm], .rm-group[data-rm]').forEach(el => {
    el.addEventListener('mouseenter', () => set(el.dataset.rm));
    el.addEventListener('mouseleave', () => set(null));
    el.addEventListener('focusin',  () => set(el.dataset.rm));
    el.addEventListener('focusout', () => set(null));
  });
})();
