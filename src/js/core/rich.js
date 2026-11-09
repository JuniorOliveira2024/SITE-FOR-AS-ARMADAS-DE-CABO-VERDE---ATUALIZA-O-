/* Texto formatado vindo do painel (negrito, cores, fontes, listas…).
   Texto simples continua a ser tratado como texto; HTML passa por uma lista branca antes de entrar na página. */
(function (w) {
  const TAGS = new Set(['p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'strike', 'sub', 'sup', 'span', 'div', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'blockquote', 'a']);
  const COLOR = /^(#[0-9a-f]{3,8}|rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*(0|1|0?\.\d+)\s*)?\)|[a-z]{3,20})$/i;
  const STYLE_OK = {
    color: COLOR, 'background-color': COLOR, 'font-family': /^[A-Za-z0-9 ,'"_-]{1,120}$/, 'font-size': /^\d{1,3}(\.\d{1,2})?(px|pt|em|rem|%)$/i,
    'font-weight': /^(normal|bold|bolder|lighter|[1-9]00)$/i, 'font-style': /^(normal|italic|oblique)$/i,
    'text-decoration': /^(none|underline|line-through|underline line-through|line-through underline)$/i,
    'text-decoration-line': /^(none|underline|line-through|underline line-through|line-through underline)$/i,
    'text-align': /^(left|right|center|justify)$/i, 'line-height': /^(\d(\.\d{1,2})?|\d{2,3}(px|%))$/i
  };
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const isHtml = (s) => /<\/?(p|br|strong|b|em|i|u|s|strike|sub|sup|span|div|h[2-4]|ul|ol|li|blockquote|a)\b[^>]*>/i.test(String(s == null ? '' : s));

  function clean(node, out) {
    for (const n of Array.from(node.childNodes)) {
      if (n.nodeType === 3) { out.appendChild(document.createTextNode(n.nodeValue)); continue; }
      if (n.nodeType !== 1) continue;
      const tag = n.tagName.toLowerCase();
      if (!TAGS.has(tag)) { if (!/^(script|style|iframe|object|embed|template|noscript)$/.test(tag)) clean(n, out); continue; }
      const el = document.createElement(tag);
      if (tag === 'a') {
        const href = n.getAttribute('href') || '';
        if (!/^(https?:|mailto:|tel:|#|\/(?!\/)|[^:]*$)/i.test(href)) { clean(n, out); continue; }
        el.setAttribute('href', href); el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener noreferrer');
      }
      const st = [];
      for (let i = 0; i < n.style.length; i++) { const p = n.style[i]; const v = n.style.getPropertyValue(p).trim(); if (STYLE_OK[p] && STYLE_OK[p].test(v)) st.push(p + ':' + v); }
      if (st.length) el.setAttribute('style', st.join(';'));
      if (tag !== 'br') clean(n, el);
      out.appendChild(el);
    }
    return out;
  }
  function sanitize(html) {
    const doc = new DOMParser().parseFromString('<body>' + String(html || '') + '</body>', 'text/html');
    const box = document.createElement('div'); clean(doc.body, box); return box.innerHTML;
  }
  /** Seguro para innerHTML: HTML formatado (limpo) ou texto simples escapado (com \n → <br>). */
  function html(v) { return isHtml(v) ? sanitize(v) : esc(v).replace(/\n/g, '<br>'); }
  /** Só texto (sem etiquetas): para sítios onde o texto não pode ter formatação. */
  function text(v) {
    if (!isHtml(v)) return String(v == null ? '' : v);
    const box = document.createElement('div'); box.innerHTML = sanitize(v);
    box.querySelectorAll('br').forEach((b) => b.replaceWith('\n'));
    box.querySelectorAll('p,div,li,h2,h3,h4,blockquote').forEach((b) => b.append('\n'));
    return box.textContent.replace(/\n{3,}/g, '\n\n').trim();
  }
  /** Coloca o valor num elemento: formatado → innerHTML seguro; simples → textContent. */
  function set(el, v) { if (isHtml(v)) { const h = sanitize(v); if (el.dataset.faRich !== h) { el.innerHTML = h; el.dataset.faRich = h; } } else if (el.textContent !== v) { el.textContent = v; delete el.dataset.faRich; } }
  w.FA_RICH = { isHtml, sanitize, html, text, set, esc };
})(window);
