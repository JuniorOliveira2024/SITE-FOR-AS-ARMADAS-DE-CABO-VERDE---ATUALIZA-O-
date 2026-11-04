/* Efeito REVEAL: revelação ao rolar (fade + pequeno deslocamento), em cascata. */
(function (w) {
  w.FA_EFFECTS.register('reveal', function (els, fx) {
    const dist = w.FA_EFFECTS.scale(fx.intensity, 8, 48);
    const axis = (fx.direction === 'left' || fx.direction === 'right') ? 'X' : 'Y';
    const sign = (fx.direction === 'down' || fx.direction === 'right') ? -1 : 1;
    els.forEach((el, i) => {
      el.style.opacity = '0'; el.style.transform = `translate${axis}(${sign * dist}px)`;
      el.style.transition = `opacity ${fx.duration_ms}ms ${fx.easing} ${(fx.delay_ms || 0) + (i % 6) * 80}ms, transform ${fx.duration_ms}ms ${fx.easing} ${(fx.delay_ms || 0) + (i % 6) * 80}ms`;
    });
    w.FA_EFFECTS.onEnter(els, (el) => { el.style.opacity = '1'; el.style.transform = 'none'; });
  });
})(window);
