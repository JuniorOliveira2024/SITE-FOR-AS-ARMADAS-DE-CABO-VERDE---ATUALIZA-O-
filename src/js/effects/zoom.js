/* Efeito ZOOM: "in" aproxima ao entrar no ecrã; "out" afasta. */
(function (w) {
  w.FA_EFFECTS.register('zoom', function (els, fx) {
    const amount = w.FA_EFFECTS.scale(fx.intensity, 0.03, 0.25);
    const from = fx.direction === 'out' ? 1 + amount : 1 - amount;
    els.forEach((el, i) => {
      el.style.opacity = '0'; el.style.transform = `scale(${from})`;
      el.style.transition = `opacity ${fx.duration_ms}ms ${fx.easing} ${(fx.delay_ms || 0) + i * 60}ms, transform ${fx.duration_ms}ms ${fx.easing} ${(fx.delay_ms || 0) + i * 60}ms`;
    });
    w.FA_EFFECTS.onEnter(els, (el) => { el.style.opacity = '1'; el.style.transform = 'scale(1)'; });
  });
})(window);
