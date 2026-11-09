/* Programa Soldado Cidadão — "Cursos Abertos" lidos do painel (Formações).
   Enquanto a lista não for alterada no painel, mantém-se a tabela do HTML. */
(function () {
  const list = document.getElementById('psc-page-courses');
  if (!list || !window.FA_API || !FA_API.enabled()) return;
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const chip = { 'Nível I': 'lvl-1', 'Nível II': 'lvl-2', 'Nível III': 'lvl-3', 'Nível IV': 'lvl-4', 'Nível V': 'lvl-5', Transversal: 'lvl-transv' };
  const row = (f) => {
    const acao = f.nivel === 'Transversal' ? '<span class="included-tag">Incluído no percurso</span>' : '<button type="button" class="btn-apply-course">Candidatar-se</button>';
    return `<div class="psc-page-course-row" data-curso="${esc(f.area)}"><span>${esc(f.area)}</span><span>${esc(f.parceiro)}</span><span class="level-chip ${chip[f.nivel] || 'lvl-1'}">${esc(f.nivel)}</span><span>${esc(f.duracao)}</span><span>${acao}</span></div>`;
  };
  const head = '<div class="psc-page-course-row psc-page-course-head"><span>Área de Formação</span><span>Entidade Parceira</span><span>Nível</span><span>Duração</span><span></span></div>';
  async function load() {
    try {
      const site = await FA_API.site();
      if (!site || !site.edited || !site.edited.formacoes) return;
      const items = await FA_API.get('/formacoes');
      if (!Array.isArray(items) || !items.length) return;
      const html = head + items.map(row).join('');
      if (list.dataset.sig !== html) { list.innerHTML = html; list.dataset.sig = html; }
    } catch (_) { /* mantém o conteúdo do HTML */ }
  }
  load();
  window.addEventListener('fa-site-updated', load);
})();
