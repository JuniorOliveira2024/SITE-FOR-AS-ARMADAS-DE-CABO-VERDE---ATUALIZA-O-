/* ============================================================
   Página "Incorporação de Recrutas": desenha o estado da incorporação em curso
   e a linha de etapas a partir de js/data/incorporacao-data.js.
   ============================================================ */
(function () {
  const ETAPAS = window.INCORPORACAO_ETAPAS || [];
  const ATUAL = window.INCORPORACAO_ATUAL;
  if (!ATUAL || !ETAPAS.length) return;

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const parse = iso => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ''); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; };
  const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const fmt = d => d ? d.getDate() + ' de ' + MESES[d.getMonth()] + ' de ' + d.getFullYear() : 'A anunciar';

  const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
  const apres = parse(ATUAL.apresentacao);
  const jura = parse(ATUAL.juramento);

  /* etapa atual: fixa (1-5) ou calculada pelas datas */
  let fase = Number(ATUAL.fase) || 0;
  if (!fase) {
    if (jura && hoje >= jura) fase = 6;              // concluída
    else if (apres && hoje >= apres) fase = 4;       // formação inicial
    else if (apres) fase = 2;                        // convocatória enviada
    else fase = 1;
  }
  const concluida = fase > ETAPAS.length;
  const etapa = ETAPAS[Math.min(fase, ETAPAS.length) - 1];

  /* ---- cartão "em curso" ---- */
  const box = document.getElementById('inc-atual');
  if (box) {
    const estado = concluida ? 'Concluída' : (fase >= 3 ? 'A decorrer' : 'Convocatória em curso');
    const cls = concluida ? 'done' : 'live';
    box.innerHTML = `
      <div class="inc-live-head">
        <span class="inc-chip ${cls}"><i aria-hidden="true"></i>${esc(estado)}</span>
        <span class="inc-live-kicker">Incorporação em curso</span>
      </div>
      <h2 class="inc-live-title">${esc(ATUAL.nome)}</h2>
      <dl class="inc-facts">
        <div><dt>Local</dt><dd>${esc(ATUAL.local)}</dd></div>
        <div><dt>Apresentação dos recrutas</dt><dd>${esc(fmt(apres))}</dd></div>
        <div><dt>Fase atual</dt><dd>${concluida ? 'Concluída' : esc(etapa.n + '. ' + etapa.titulo)}</dd></div>
        <div><dt>Juramento à Bandeira</dt><dd>${esc(fmt(jura))}</dd></div>
      </dl>
      ${ATUAL.nota ? `<p class="inc-live-note">${esc(ATUAL.nota)}</p>` : ''}`;
  }

  /* ---- linha de etapas ---- */
  const tl = document.getElementById('inc-etapas');
  if (tl) {
    tl.innerHTML = ETAPAS.map(e => {
      const st = fase > e.n ? 'done' : (fase === e.n ? 'current' : 'todo');
      const tag = st === 'done' ? 'Concluída' : (st === 'current' ? 'Fase atual' : 'Por realizar');
      return `<li class="inc-step ${st}"${st === 'current' ? ' aria-current="step"' : ''}>
        <span class="inc-step-n" aria-hidden="true">${e.n}</span>
        <div class="inc-step-body"><span class="inc-step-tag">${tag}</span><h3>${esc(e.titulo)}</h3><p>${esc(e.texto)}</p></div>
      </li>`;
    }).join('');
  }

  /* ---- requisitos, documentos e outras incorporações ---- */
  const li = arr => (arr || []).map(t => `<li>${esc(t)}</li>`).join('');
  const rq = document.getElementById('inc-requisitos'); if (rq) rq.innerHTML = li(window.INCORPORACAO_REQUISITOS);
  const dc = document.getElementById('inc-documentos'); if (dc) dc.innerHTML = li(window.INCORPORACAO_DOCUMENTOS);
  const ou = document.getElementById('inc-outras');
  if (ou) ou.innerHTML = (window.INCORPORACAO_OUTRAS || []).map(o =>
    `<article class="inc-other"><span class="inc-chip soon"><i aria-hidden="true"></i>${esc(o.estado)}</span><h3>${esc(o.nome)}</h3><p>${esc(o.texto)}</p></article>`).join('');
})();
