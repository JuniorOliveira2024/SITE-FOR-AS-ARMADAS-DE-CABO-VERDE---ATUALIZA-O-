/* Efeito FADE: os elementos surgem gradualmente ao entrar no ecrã. */
(function (w) {
  w.FA_EFFECTS.register('fade', function (els, fx) {
    els.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transition = `opacity ${fx.duration_ms}ms ${fx.easing} ${(fx.delay_ms || 0) + i * 60}ms`;
    });
    w.FA_EFFECTS.onEnter(els, (el) => { el.style.opacity = '1'; });
  });
})(window);
