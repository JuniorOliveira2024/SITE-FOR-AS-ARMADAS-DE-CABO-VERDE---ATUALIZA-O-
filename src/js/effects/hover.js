/* Efeito HOVER: elevação/ampliação suave ao passar o rato (ou focar com o teclado). */
(function (w) {
  w.FA_EFFECTS.register('hover', function (els, fx) {
    const lift = w.FA_EFFECTS.scale(fx.intensity, 2, 14);
    const grow = 1 + w.FA_EFFECTS.scale(fx.intensity, 0.005, 0.06);
    const on = fx.direction === 'in' || fx.direction === 'out'
      ? `scale(${fx.direction === 'out' ? 2 - grow : grow})`
      : `translateY(${fx.direction === 'down' ? lift : -lift}px)`;
    els.forEach((el) => {
      const prev = el.style.transition;
      el.style.transition = (prev ? prev + ', ' : '') + `transform ${fx.duration_ms}ms ${fx.easing}`;
      const enter = () => { el.style.transform = on; };
      const leave = () => { el.style.transform = ''; };
      el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave);
      el.addEventListener('focusin', enter); el.addEventListener('focusout', leave);
    });
  });
})(window);
