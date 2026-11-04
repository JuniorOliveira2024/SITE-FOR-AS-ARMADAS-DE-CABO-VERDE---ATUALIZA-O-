/* Efeito SLIDE: deslizam a partir de uma direção (up, down, left, right). */
(function (w) {
  w.FA_EFFECTS.register('slide', function (els, fx) {
    const dist = w.FA_EFFECTS.scale(fx.intensity, 12, 90);
    const from = { up: `translateY(${dist}px)`, down: `translateY(${-dist}px)`, left: `translateX(${dist}px)`, right: `translateX(${-dist}px)` }[fx.direction] || `translateY(${dist}px)`;
    els.forEach((el, i) => {
      el.style.opacity = '0'; el.style.transform = from;
      el.style.transition = `opacity ${fx.duration_ms}ms ${fx.easing} ${(fx.delay_ms || 0) + i * 70}ms, transform ${fx.duration_ms}ms ${fx.easing} ${(fx.delay_ms || 0) + i * 70}ms`;
    });
    w.FA_EFFECTS.onEnter(els, (el) => { el.style.opacity = '1'; el.style.transform = 'none'; });
  });
})(window);
