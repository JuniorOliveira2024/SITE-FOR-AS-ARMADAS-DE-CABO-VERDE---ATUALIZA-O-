/* ================================================================
   Atualização em tempo real — o que muda no painel aparece no site
   ----------------------------------------------------------------
   O backend mantém uma "versão do conteúdo" que muda a cada alteração
   no painel (/api/version). Esta rotina consulta-a de poucos em poucos
   segundos (e quando o separador volta a ficar visível). Se mudou, os
   módulos registados com FA_LIVE.onChange(fn) voltam a buscar os dados
   e atualizam só a parte afetada — sem recarregar a página, por isso
   nada se perde nos formulários que o visitante esteja a preencher.
   ================================================================ */
(function (w) {
  const INTERVAL_MS = 15000;
  const listeners = [];
  let current = null;
  let timer = null;
  let busy = false;
  let pendingReload = false;

  function onChange(fn) { listeners.push(fn); }

  /** Recarrega a página só quando o visitante está parado (sem escrever, sem janelas abertas). */
  function idle() {
    const a = document.activeElement;
    const typing = a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName);
    const modalOpen = document.querySelector('dialog[open], .modal.open, .modal.show, [aria-modal="true"]');
    return !typing && !modalOpen;
  }
  function reloadWhenIdle() { pendingReload = true; maybeReload(); }
  function maybeReload() { if (pendingReload && idle()) { pendingReload = false; w.location.reload(); } }

  async function check() {
    if (busy || !w.FA_API || !FA_API.enabled() || document.hidden) return;
    busy = true;
    try {
      const data = await FA_API.get('/version');
      const version = data && data.version;
      if (!version) return;
      if (current === null) { current = version; return; }         // primeira leitura: apenas memoriza
      if (version === current) { maybeReload(); return; }
      current = version;
      if (FA_API.resetSite) FA_API.resetSite();
      for (const fn of listeners) { try { await fn(); } catch (err) { console.warn('Falha ao atualizar a partir do painel:', err); } }
      maybeReload();
    } finally { busy = false; }
  }

  function start() {
    if (timer || !w.FA_API || !FA_API.enabled()) return;
    check();
    timer = setInterval(check, INTERVAL_MS);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); });
    w.addEventListener('online', check);
  }

  w.FA_LIVE = { onChange, reloadWhenIdle, check, start };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})(window);
