/* ================================================================
   Sistema modular de efeitos visuais
   ----------------------------------------------------------------
   Os efeitos são configurados no painel (Efeitos visuais) e chegam
   pela API (/api/site → effects). NADA é aplicado por defeito: sem
   efeitos ativos o site fica exatamente como está.

   Cada tipo vive no seu ficheiro (fade.js, slide.js, zoom.js,
   parallax.js, hover.js, reveal.js, loading.js) e regista-se aqui com
   FA_EFFECTS.register('tipo', (elementos, opcoes) => { ... }).
   Para criar um tipo novo: acrescente js/effects/<tipo>.js, inclua-o
   nas páginas e acrescente o tipo em backend/src/resources/effects.js.

   Opções recebidas por cada efeito:
     { key, type, target, duration_ms, delay_ms, direction, intensity, easing, config }
   ================================================================ */
(function (w) {
  const registry = {};
  const reduced = () => w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** Escala 0..100 → valor numérico num intervalo. */
  const scale = (intensity, min, max) => min + ((Math.max(0, Math.min(100, Number(intensity) || 0))) / 100) * (max - min);

  /** Observa a entrada dos elementos no ecrã (uma vez). */
  function onEnter(elements, callback, threshold = 0.12) {
    if (!('IntersectionObserver' in w)) { elements.forEach(callback); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { callback(e.target); io.unobserve(e.target); } });
    }, { threshold, rootMargin: '0px 0px -5% 0px' });
    elements.forEach((el) => io.observe(el));
  }

  function select(selector) {
    if (!selector) return [];
    try { return Array.from(document.querySelectorAll(selector)); } catch (_) { return []; }   // seletor inválido nunca parte a página
  }

  function register(type, fn) { registry[type] = fn; }

  const applied = new Map();   // chave → assinatura do efeito já aplicado

  /**
   * Aplica a lista de efeitos ativos devolvida pela API. É idempotente: um efeito já aplicado e sem
   * alterações é ignorado. Devolve true se algum efeito aplicado foi alterado ou removido — um efeito
   * não se "desfaz" com segurança, por isso nesse caso convém recarregar a página quando o visitante estiver parado.
   */
  function apply(list) {
    list = Array.isArray(list) ? list : [];
    const sig = (fx) => JSON.stringify([fx.type, fx.target, fx.duration_ms, fx.delay_ms, fx.direction, fx.intensity, fx.easing, fx.config]);
    const next = new Map(list.map((fx) => [fx.key, sig(fx)]));
    let stale = false;
    applied.forEach((s, key) => { if (!next.has(key) || next.get(key) !== s) stale = true; });
    if (reduced()) return stale;
    list.forEach((fx) => {
      if (applied.has(fx.key)) return;
      const run = registry[fx.type];
      const els = select(fx.target);
      if (!run || !els.length) return;
      try { run(els, fx); applied.set(fx.key, sig(fx)); } catch (err) { console.warn('Efeito falhou:', fx.key, err); }
    });
    return stale;
  }

  w.FA_EFFECTS = { register, apply, scale, onEnter, select };
})(window);
