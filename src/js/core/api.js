/* ================================================================
   Cliente da API (frontend → backend)
   - Timeout, repetição automática (1 vez) e resposta normalizada.
   - Desembrulha o envelope { data, meta } do backend e aceita listas simples.
   - Nunca lança erro para leituras: devolve null quando a API falha, para
     o site manter o conteúdo estático já presente na página.
   ================================================================ */
(function (w) {
  const TIMEOUT_MS = 8000;

  /* Endereço do backend, por ordem de prioridade:
       1. window.FA_API_BASE (definido em config.js, injetado pelo server.js/Docker);
       2. ?api=http://localhost:3001 no endereço da página (fica guardado neste navegador; ?api=off apaga);
       3. em localhost / 127.0.0.1: descoberta automática — procura o backend das Forças Armadas nas portas 3000–3010
          (reconhece-o pela resposta de /api/health; ignora outros programas que usem essas portas). */
  const LOCAL = /^(localhost|127\.0\.0\.1)$/.test(w.location.hostname);
  const SERVICE = 'fa-cabo-verde-backend';

  function explicitBase() {
    if (w.FA_API_BASE) return String(w.FA_API_BASE).trim().replace(/\/+$/, '');
    try {
      const q = new URLSearchParams(w.location.search).get('api');
      if (q === 'off') w.localStorage.removeItem('fa_api_base');
      else if (q && /^https?:\/\//i.test(q)) w.localStorage.setItem('fa_api_base', q.trim().replace(/\/+$/, ''));
    } catch (_) { /* armazenamento indisponível */ }
    try { const saved = w.localStorage.getItem('fa_api_base'); if (saved) return saved; } catch (_) { /* ignora */ }
    return '';
  }
  w.FA_API_BASE = explicitBase();
  if (w.FA_API_BASE && w.console) console.info('[FA] Backend em', w.FA_API_BASE);

  async function probe(base, timeout = 900) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeout);
    try {
      const res = await fetch(base + '/api/health', { signal: ctrl.signal });
      const json = await res.json().catch(() => null);
      return !!(res.ok && json && json.data && json.data.service === SERVICE);
    } catch (_) { return false; } finally { clearTimeout(timer); }
  }

  let discovery = null;
  /** Resolve o endereço do backend (e memoriza-o para esta sessão). Devolve '' se não houver backend. */
  function ready() {
    if (w.FA_API_BASE) return Promise.resolve(w.FA_API_BASE);
    if (!LOCAL) return Promise.resolve('');
    if (!discovery) {
      discovery = (async () => {
        let cached = ''; try { cached = w.sessionStorage.getItem('fa_api_found') || ''; } catch (_) { /* ignora */ }
        if (cached && await probe(cached)) { w.FA_API_BASE = cached; return cached; }
        const ports = Array.from({ length: 11 }, (_, i) => 3000 + i);
        const found = await Promise.all(ports.map(async (p) => ((await probe('http://localhost:' + p)) ? p : 0)));
        const port = found.find(Boolean);
        if (!port) return '';
        const base = 'http://localhost:' + port;
        w.FA_API_BASE = base;
        try { w.sessionStorage.setItem('fa_api_found', base); } catch (_) { /* ignora */ }
        if (w.console) console.info('[FA] Backend encontrado em', base);
        return base;
      })().then((b) => { if (!b) discovery = null; return b; });   // se não houver backend, volta a tentar no próximo pedido
    }
    return discovery;
  }

  let warned = false;
  function warnOnce(err) {
    if (warned || !w.console) return;
    warned = true;
    console.warn('[FA] Não foi possível ler o backend' + (w.FA_API_BASE ? ' em ' + w.FA_API_BASE : ' (não foi encontrado em localhost:3000–3010)') + ' (' + err.message + ').\n' +
      ' • O backend está a correr? (npm start)  • Outra porta? Abra esta página com ?api=http://localhost:PORTA\n' +
      ' • Origem desta página: ' + w.location.origin + ' — em produção tem de estar em ALLOWED_ORIGINS no .env do backend.');
  }

  class ApiError extends Error {
    constructor(status, payload) {
      const e = (payload && payload.error) || {};
      super(e.message || 'Não foi possível comunicar com o servidor.');
      this.status = status; this.code = e.code || null; this.details = e.details || null;
    }
  }

  /** Em localhost o backend é procurado automaticamente no primeiro pedido, por isso considera-se ativo. */
  function enabled() { return !!w.FA_API_BASE || LOCAL; }

  async function request(method, path, { body, timeout = TIMEOUT_MS } = {}) {
    const base = await ready();
    if (!base) throw new ApiError(0, { error: { message: 'Backend não encontrado. Arranque-o (npm start) ou abra esta página com ?api=http://localhost:PORTA.' } });
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeout);
    try {
      const res = await fetch(base + '/api' + path, {
        method, signal: ctrl.signal,
        headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
        body: body !== undefined ? JSON.stringify(body) : undefined
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) throw new ApiError(res.status, json);
      return json;
    } catch (err) {
      if (err instanceof ApiError) throw err;
      throw new ApiError(0, { error: { message: err.name === 'AbortError' ? 'O servidor demorou demasiado a responder.' : 'Sem ligação ao servidor. Verifique a internet e tente novamente.' } });
    } finally { clearTimeout(timer); }
  }

  const unwrap = (json) => (json && !Array.isArray(json) && Object.prototype.hasOwnProperty.call(json, 'data') ? json.data : json);

  /** Leitura segura: repete uma vez em falhas de rede/5xx; devolve null se falhar. */
  async function get(path, opts) {
    if (!enabled()) return null;
    for (let attempt = 0; attempt < 2; attempt++) {
      try { return unwrap(await request('GET', path, opts)); }
      catch (err) {
        if (err.status >= 400 && err.status < 500 && err.status !== 429) return null;   // erro definitivo
        if (attempt === 1) { warnOnce(err); return null; }
        await new Promise((r) => setTimeout(r, 600));
      }
    }
    return null;
  }

  /** Escrita: lança ApiError (com details de validação) para o chamador mostrar a mensagem adequada. */
  async function post(path, body) { return unwrap(await request('POST', path, { body })); }

  let sitePromise = null;
  /** Dados globais do site (configurações, menus, listas, efeitos, tema) — um único pedido por página. */
  function site() {
    if (!enabled()) return Promise.resolve(null);
    if (!sitePromise) sitePromise = get('/site');
    return sitePromise;
  }

  /** Mensagem amigável a partir de um ApiError de validação. */
  function describe(err) {
    if (err && err.details) {
      const first = Object.values(err.details)[0];
      if (first) return String(first);
    }
    return (err && err.message) || 'Ocorreu um erro. Tente novamente.';
  }

  /** true se o conjunto (news, concursos, navigation, ranks, documents, collection:<nome>…) foi alterado no painel.
      Só então a API substitui o conteúdo do site; antes disso o conteúdo do frontend mantém-se. */
  async function edited(key) {
    const s = await site();
    return !!(s && s.edited && s.edited[key]);
  }

  /** Esquece os dados do site guardados em memória (a atualização em tempo real volta a pedi-los). */
  function resetSite() { sitePromise = null; }

  w.FA_API = { enabled, ready, get, post, site, edited, resetSite, describe, ApiError };
})(window);
