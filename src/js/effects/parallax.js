/* Efeito PARALLAX: o elemento desloca-se a uma velocidade diferente da rolagem. */
(function (w) {
  w.FA_EFFECTS.register('parallax', function (els, fx) {
    const speed = w.FA_EFFECTS.scale(fx.intensity, 0.04, 0.35) * (fx.direction === 'up' ? -1 : 1);
    let ticking = false;
    function update() {
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > w.innerHeight + 200) return;
        const offset = (rect.top + rect.height / 2 - w.innerHeight / 2) * speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
        el.style.willChange = 'transform';
      });
      ticking = false;
    }
    w.addEventListener('scroll', () => { if (!ticking) { ticking = true; w.requestAnimationFrame(update); } }, { passive: true });
    update();
  });
})(window);
