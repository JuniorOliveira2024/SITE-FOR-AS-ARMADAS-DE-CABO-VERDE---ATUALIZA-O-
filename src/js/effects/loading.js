/* Efeito LOADING: o conteúdo da página (alvo) surge com fade quando o carregamento termina. */
(function (w) {
  w.FA_EFFECTS.register('loading', function (els, fx) {
    els.forEach((el) => { el.style.opacity = '0'; el.style.transition = `opacity ${fx.duration_ms}ms ${fx.easing} ${fx.delay_ms || 0}ms`; });
    const show = () => els.forEach((el) => { el.style.opacity = '1'; });
    if (document.readyState === 'complete') requestAnimationFrame(show); else w.addEventListener('load', show);
  });
})(window);
