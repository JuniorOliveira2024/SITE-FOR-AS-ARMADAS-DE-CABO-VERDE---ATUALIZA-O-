/* ================================================================
   CMS do site — aplica no HTML o conteúdo administrado no painel.
   ----------------------------------------------------------------
   Princípios:
   1. O HTML estático continua a ser a base e o fallback: se a API estiver
      indisponível, a página fica exatamente como está.
   2. Só se altera o DOM quando o conteúdo da API DIFERE do que já está na
      página (assinatura), evitando trabalho desnecessário e perda de ouvintes.
   3. As funções build*Html reproduzem a marcação original (testado em
      backend/tests/cms-builders.test.js), por isso o aspeto não muda.
   ================================================================ */
(function (w) {
  const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const attr = (name, value) => (value ? ` ${name}="${esc(value)}"` : '');
  const nl2br = (s) => esc(s).replace(/\n/g, '<br>');
  const lines = (s) => String(s ?? '').split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
  const paras = (s) => String(s ?? '').split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean);
  const meta = (item) => item.meta || {};

  /* ---------- construtores de marcação (puros) ---------- */
  function buildHeaderHtml(items) {
    return items.map((it) => {
      const m = meta(it);
      const link = `<a href="${esc(it.url)}" class="nav-link"${attr('data-target', m.data_target)}${attr('data-i18n', it.i18n_key)}>${esc(it.label)}</a>`;
      if (!it.children || !it.children.length) return `<li>${link}</li>`;
      const title = m.mega_title ? `<div class="mega-title"${attr('data-i18n', m.mega_title_i18n)}>${esc(m.mega_title)}</div>` : '';
      const kids = it.children.map((c) => `<a href="${esc(c.url)}"${attr('data-filter', meta(c).data_filter)}${attr('data-i18n', c.i18n_key)}>${esc(c.label)}</a>`).join('');
      return `<li class="has-mega">${link}<div class="mega">${title}${kids}</div></li>`;
    }).join('');
  }

  function buildFooterColsHtml(items) {
    return items.map((col) => `<div class="footer-col"><h5${attr('data-i18n', col.i18n_key)}>${esc(col.label)}</h5><ul>${(col.children || []).map((c) => {
      const m = meta(c);
      return `<li><a href="${esc(c.url)}"${attr('data-filter', m.data_filter)}${attr('class', m.class)}${attr('data-i18n', c.i18n_key)}>${esc(c.label)}</a></li>`;
    }).join('')}</ul></div>`).join('');
  }

  function buildLegalHtml(items) {
    return items.map((l) => `<a href="${esc(l.url)}"${l.target === '_blank' ? ' target="_blank" rel="noopener"' : ''}>${esc(l.label)}</a>`).join('');
  }

  const buildHeroActionsHtml = (list) => list.map((a) => `<a href="${esc(a.href)}" class="btn btn-${a.style === 'gold' ? 'gold' : 'outline'}"${attr('data-i18n', a.i18n_key)}>${esc(a.label)}</a>`).join('');

  const buildStructureCommandsHtml = (list) => list.map((c) => `<a href="${esc(c.href)}" class="structure-card reveal in"${attr('id', c.anchor_id)}><span class="num">${esc(c.num)}</span><div class="structure-photo${/assets\/images\/logo/.test(c.image || '') ? ' structure-photo-emblem' : ''}"><img src="${esc(c.image)}" alt="${esc(c.image_alt)}"></div><div class="structure-body"><h3${attr('data-i18n', c.i18n_key)}>${esc(c.title)}</h3><p>${esc(c.text)}</p></div></a>`).join('');

  const buildStructureOrgansHtml = (list) => list.map((o) => `<a class="state-org-card reveal in" href="${esc(o.href)}"><span class="state-org-seal"><img src="assets/images/logo-fa.png" alt=""></span><span class="state-org-copy"><h4>${esc(o.title)}</h4><p>${esc(o.text)}</p><span class="state-org-action">Ver órgão <span aria-hidden="true">→</span></span></span></a>`).join('');

  const ICONS = {
    graduation: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/><path d="M22 10v6"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    'shield-plus': '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z"/><path d="M12 9v6"/><path d="M9 12h6"/>',
    scale: '<path d="M12 3v18"/><path d="M5 21h14"/><path d="M5 7h14"/><path d="m5 7-3 7a3.5 3.5 0 0 0 6 0L5 7z"/><path d="m19 7-3 7a3.5 3.5 0 0 0 6 0l-3-7z"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M20 17v4H6.5A2.5 2.5 0 0 1 4 18.5"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>',
    flag: '<path d="M4 22V4"/><path d="M4 4h13l-2 4 2 4H4"/>'
  };
  const buildPillarsHtml = (list) => list.map((p) => `<span><svg class="psc-pillar-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[p.icon] || ICONS.star}</svg>${esc(p.label)}</span>`).join('');

  /** O carrossel repete as entidades para a rotação contínua ser seamless. */
  const buildPartnersHtml = (list, repeat = 2) => Array.from({ length: repeat }).flatMap(() => list.map((p) => `<span class="psc-partner-badge">${esc(p.name)}</span>`)).join('');

  const SOCIAL_SVG = {
    facebook: '<path d="M13 22v-9h3l1-4h-4V7c0-1 .3-2 2-2h2V1.5C16.5 1.3 15 1 13.5 1 10 1 8 3 8 6.8V9H5v4h3v9z"/>',
    youtube: '<path d="M23 7.5s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C16.8 4 12 4 12 4h0s-4.8 0-7.8.2c-.4 0-1.4.1-2.3 1C1.2 5.9 1 7.5 1 7.5S.8 9.3.8 11.2v1.6c0 1.9.2 3.7.2 3.7s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.2 7.6.2s4.8 0 7.8-.2c.4 0 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.7v-1.6c0-1.9-.2-3.7-.2-3.7zM9.7 15V8.5l6.2 3.3z"/>',
    instagram: '<path d="M12 2c-2.7 0-3.1 0-4.1.1-1 0-1.7.2-2.3.5-.6.2-1.2.6-1.7 1.1-.5.5-.9 1-1.1 1.7-.3.6-.4 1.3-.5 2.3C2.2 8.7 2.2 9 2.2 12s0 3.3.1 4.3c0 1 .2 1.7.5 2.3.2.6.6 1.2 1.1 1.7.5.5 1 .9 1.7 1.1.6.3 1.3.4 2.3.5 1 0 1.4.1 4.1.1s3.1 0 4.1-.1c1 0 1.7-.2 2.3-.5.6-.2 1.2-.6 1.7-1.1.5-.5.9-1 1.1-1.7.3-.6.4-1.3.5-2.3 0-1 .1-1.4.1-4.3s0-3.3-.1-4.3c0-1-.2-1.7-.5-2.3a4.6 4.6 0 0 0-1.1-1.7 4.6 4.6 0 0 0-1.7-1.1c-.6-.3-1.3-.4-2.3-.5-1 0-1.4-.1-4.1-.1zm0 3.7a6.3 6.3 0 1 1 0 12.6 6.3 6.3 0 0 1 0-12.6zm0 2.2a4.1 4.1 0 1 0 0 8.2 4.1 4.1 0 0 0 0-8.2zm6.5-2.4a1.4 1.4 0 1 1-2.9 0 1.4 1.4 0 0 1 2.9 0z"/>'
  };
  const NETWORK_NAME = { facebook: 'Facebook', youtube: 'YouTube', instagram: 'Instagram', x: 'X', linkedin: 'LinkedIn', tiktok: 'TikTok', whatsapp: 'WhatsApp' };
  const buildSocialHtml = (list) => list.map((s) => {
    const label = s.label || NETWORK_NAME[s.network] || s.network;
    const icon = SOCIAL_SVG[s.network]
      ? `<svg viewBox="0 0 24 24" fill="currentColor">${SOCIAL_SVG[s.network]}</svg>`
      : `<span aria-hidden="true" style="font-weight:700;font-size:12px">${esc(String(label).slice(0, 2))}</span>`;   // redes sem ícone dedicado
    return `<a href="${esc(s.url)}" aria-label="${esc(label)}">${icon}</a>`;
  }).join('');

  const DOC_ICON = '<svg class="doc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>';
  const buildDocumentsHtml = (list) => list.map((d) => `<a href="${esc(d.file_url || '#')}" class="doc-card"${attr('id', d.anchor_id)}${d.file_url ? ' target="_blank" rel="noopener"' : ''}>${DOC_ICON}<div><h4>${esc(d.title)}</h4><span class="doc-meta">${esc(d.reference)}</span></div></a>`).join('');

  /* ---------- aplicação no DOM ---------- */
  const isPt = () => { try { const l = localStorage.getItem('fa_lang'); return !l || l === 'PT'; } catch (_) { return true; } };
  const norm = (s) => String(s).replace(/\s+/g, ' ').trim();

  function setI18nText(key, value, html) {
    if (value === undefined || value === null || value === '') return;
    const sel = html ? `[data-i18n-html="${key}"]` : `[data-i18n="${key}"]`;
    const els = document.querySelectorAll(sel);
    if (!els.length) return;
    if (typeof I18N_ORIGINAL !== 'undefined' && I18N_ORIGINAL[key]) I18N_ORIGINAL[key].value = value;   // o i18n volta a PT com o texto novo
    if (!isPt()) return;                                                                                    // noutro idioma mantém a tradução
    els.forEach((el) => { if (html) { if (norm(el.innerHTML) !== norm(value)) el.innerHTML = value; } else if (norm(el.textContent) !== norm(value)) el.textContent = value; });
  }

  const I18N_BINDINGS = [
    ['hero.kicker', 'hero.kicker'], ['hero.h1', 'hero.title', true], ['hero.lede', 'hero.lede'],
    ['sec.noticias.eyebrow', 'sections.noticias_eyebrow'], ['sec.noticias.title', 'sections.noticias_title'], ['sec.noticias.desc', 'sections.noticias_desc'],
    ['sec.estrutura.eyebrow', 'sections.estrutura_eyebrow'], ['sec.estrutura.title', 'sections.estrutura_title'], ['sec.estrutura.desc', 'sections.estrutura_desc'],
    ['sec.multimedia.title', 'sections.multimedia_title'], ['sec.multimedia.desc', 'sections.multimedia_desc'], ['sec.docs.title', 'sections.docs_title'],
    ['sec.cta.title', 'cta.title'], ['footer.copyright', 'footer.copyright']
  ];

  /** data-cms="chave" (texto) · data-cms-html · data-cms-multiline · data-cms-href="chave" [data-cms-prefix] · data-cms-src */
  function applyDataCms(settings) {
    const get = (k) => settings[k];
    document.querySelectorAll('[data-cms]').forEach((el) => { const v = get(el.dataset.cms); if (v !== undefined && v !== '' && el.textContent !== v) el.textContent = v; });
    document.querySelectorAll('[data-cms-html]').forEach((el) => { const v = get(el.dataset.cmsHtml); if (v) el.innerHTML = v; });
    document.querySelectorAll('[data-cms-multiline]').forEach((el) => { const v = get(el.dataset.cmsMultiline); if (v) el.innerHTML = nl2br(v); });
    document.querySelectorAll('[data-cms-href]').forEach((el) => { const v = get(el.dataset.cmsHref); if (v) el.setAttribute('href', (el.dataset.cmsPrefix || '') + v); });
    document.querySelectorAll('[data-cms-src]').forEach((el) => { const v = get(el.dataset.cmsSrc); if (v && el.getAttribute('src') !== v) el.setAttribute('src', v); });
    // texto em parágrafos (separados por linha em branco) e em linhas (uma por linha)
    document.querySelectorAll('[data-cms-paragraphs]').forEach((el) => {
      const v = get(el.dataset.cmsParagraphs); if (!v) return;
      const html = paras(v).map((t, i) => `<p${i === 0 && el.dataset.cmsFirstClass ? ` class="${esc(el.dataset.cmsFirstClass)}"` : ''}>${esc(t)}</p>`).join('');
      if (el.dataset.cmsSig !== html) { el.innerHTML = html; el.dataset.cmsSig = html; }
    });
    document.querySelectorAll('[data-cms-lines]').forEach((el) => {
      const v = get(el.dataset.cmsLines); if (!v) return;
      const html = lines(v).map((t) => `<span>${esc(t)}</span>`).join('');
      if (el.dataset.cmsSig !== html) { el.innerHTML = html; el.dataset.cmsSig = html; }
    });
  }

  function applySettings(settings) {
    if (!settings) return;
    I18N_BINDINGS.forEach(([key, setting, html]) => setI18nText(key, settings[setting], html));
    applyDataCms(settings);
    const desc = document.querySelector('meta[name="description"]');
    if (desc && settings['identity.description'] && document.body.classList.contains('home-page')) desc.setAttribute('content', settings['identity.description']);
  }

  /* ---------- listas: substitui só quando difere ---------- */
  function swap(container, html, signature) {
    if (!container) return false;
    if (container.dataset.cmsSig === signature) return false;
    const current = norm(container.textContent);
    container.innerHTML = html;
    container.dataset.cmsSig = signature;
    return current !== norm(container.textContent);
  }
  const sigOf = (list, fields) => JSON.stringify(list.map((x) => fields.map((f) => x[f])));
  const textOf = (el) => norm(el.textContent);

  function applyList(selector, list, builder, fields) {
    const el = document.querySelector(selector);
    if (!el || !Array.isArray(list) || !list.length) return;
    const html = builder(list);
    const probe = document.createElement('div'); probe.innerHTML = html;
    if (textOf(probe) === textOf(el) && sigOf(list, fields) === (el.dataset.cmsSig || sigOf(list, fields)) && !el.dataset.cmsForce) {
      // conteúdo textual igual ao estático: verifica também links/imagens para detetar alterações só de URL
      const same = Array.from(probe.querySelectorAll('a,img')).map((n) => n.getAttribute('href') || n.getAttribute('src')).join('|') ===
                   Array.from(el.querySelectorAll('a,img')).map((n) => n.getAttribute('href') || n.getAttribute('src')).join('|');
      if (same) return;
    }
    el.innerHTML = html;
    el.dataset.cmsSig = sigOf(list, fields);
  }

  function applyCollections(cols) {
    if (!cols) return;
    applyList('.hero-actions', cols.hero_actions, buildHeroActionsHtml, ['label', 'href', 'style']);
    applyList('.structure-grid', cols.structure_commands, buildStructureCommandsHtml, ['title', 'text', 'href', 'image']);
    applyList('.state-org-grid', cols.structure_organs, buildStructureOrgansHtml, ['title', 'text', 'href']);
    applyList('.psc-pillars', cols.psc_pillars, buildPillarsHtml, ['label', 'icon']);
    applyList('.psc-partners-track', cols.psc_partners, (l) => buildPartnersHtml(l), ['name']);
    applyList('.footer-social', cols.social_links, buildSocialHtml, ['network', 'url']);
    applyList('.timeline-wrap', cols.history_timeline, buildTimelineHtml, ['dot', 'year', 'title', 'text']);
    applyList('.directory-grid', cols.directory_departments, buildDirectoryHtml, ['name', 'email']);
    applyList('.units-grid', cols.structure_units, buildUnitsHtml, ['branch', 'name', 'text', 'icon', 'image']);
    applyList('.chapters-list', cols.history_chapters, buildChaptersHtml, ['number', 'title', 'text']);
    applyList('.chronicle-toc ol', cols.history_chapters, buildChapterTocHtml, ['number', 'title']);
    applyList('#arquivo-historico .org-links-grid', cols.history_archive, buildArchiveLinksHtml, ['label', 'href']);
    applyList('.heroes-grid', cols.heroes, buildHeroesHtml, ['name', 'role', 'text', 'photo']);
    applyList('.founders-grid', cols.founders, buildFoundersHtml, ['name', 'rank', 'photo']);
    applyList('#cimmb .support-grid', cols.formation_cards, buildFormationCardsHtml, ['eyebrow', 'title', 'text', 'bullets', 'href', 'icon']);
    applyList('.support-section:not(.formation-section) .support-grid', cols.support_cards, buildFormationCardsHtml, ['eyebrow', 'title', 'text', 'bullets', 'href', 'icon']);
    applyList('.regions-section .region-list', cols.regions, buildRegionsHtml, ['name', 'text', 'href', 'image']);
    applyList('#institucional .mission-list', cols.mission_list, buildMissionListHtml, ['text']);
    applyList('#institucional .split-list', cols.mission_highlights, (l) => l.map((m) => `<li>${CHEV} <strong>${esc(m.text)}</strong></li>`).join(''), ['text']);
    applyContactSubjects(cols.contact_subjects);
    if (window.FA_MEDIA) window.FA_MEDIA.scan(document);
    applyQuickContacts(cols.quick_contacts);
  }


  /* ---------- História, Contactos e Estrutura ---------- */
  const UNIT_ICONS = {
    'fuzileiros': "<circle cx=\"12\" cy=\"5\" r=\"2.2\"/><path d=\"M12 7.2V21M8 11h8M4.5 14.5C5 18 8 21 12 21s7-3 7.5-6.5M3 13l1.5 1.5L6 13M18 13l1.5 1.5L21 13\"/>",
    'policia-militar': "<path d=\"M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z\"/><path d=\"M9 12l2.2 2.2L15.5 9.8\"/>",
    'esquadrilha-naval': "<path d=\"M2.5 15.5h19l-2.2 4H4.7z\"/><path d=\"M6 15.5V11h12v4.5M10 11V7.5h4V11M12 7.5V4\"/>",
    'esquadrilha-aerea': "<path d=\"M10.5 3.8c.8-.9 2.2-.9 3 0l.5 5.4 7 4.4v2l-7-2.3-.4 4 2 1.6V20l-3.6-1-3.6 1v-1.6l2-1.6-.4-4-7 2.3v-2l7-4.4z\"/>",
    'unidade-de-operacoes-especiais-uoe': "<circle cx=\"12\" cy=\"12\" r=\"6.5\"/><circle cx=\"12\" cy=\"12\" r=\"1.2\"/><path d=\"M12 2.5v5M12 16.5v5M2.5 12h5M16.5 12h5\"/>",
    'estrela': '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>'
  };

  const buildTimelineHtml = (list) => list.map((t) => `<div class="timeline-item reveal"><div class="timeline-dot${t.dot_style === 'now' ? ' is-text is-now' : t.dot_style === 'text' ? ' is-text' : ''}">${esc(t.dot)}</div><div class="timeline-card"><span class="timeline-year">${esc(t.year)}</span><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p></div></div>`).join('');
  const buildQuickContactsHtml = (list) => list.map((c) => `<div class="quick-contact-item"><span class="qc-label">${esc(c.label)}</span><span class="qc-value"${c.size === 'small' ? ' style="font-size:15px;"' : ''}>${esc(c.value)}</span>${c.note ? `<span class="qc-note">${esc(c.note)}</span>` : ''}</div>`).join('');
  const buildDirectoryHtml = (list) => list.map((d) => `<div class="directory-item reveal"><h5>${esc(d.name)}</h5><span>${esc(d.email)}</span></div>`).join('');
  const buildUnitsHtml = (list) => list.map((u) => `<div class="unit-card reveal">${u.image ? `<div class="unit-icon unit-icon--img"><img src="${esc(u.image)}" alt="${esc(u.name)}" loading="lazy"></div>` : `<div class="unit-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${UNIT_ICONS[u.icon] || UNIT_ICONS.estrela}</svg></div>`}<span class="unit-branch unit-branch--${u.branch === 'gc' ? 'gc' : 'gn'}">${u.branch === 'gc' ? 'Comando da Guarda Costeira' : 'Comando da Guarda Nacional'}</span><h3>${esc(u.name)}</h3><p>${esc(u.text)}</p></div>`).join('');

  /* Núcleo Fundador */
  /* Texto simples → HTML: blocos separados por linha em branco; um bloco só com linhas "- ponto" vira lista */
  const richHtml = (t) => paras(t).map((b) => { const ls = lines(b); return ls.every((l) => /^[-•]\s+/.test(l)) ? `<ul class="chapter-list">${ls.map((l) => `<li>${esc(l.replace(/^[-•]\s+/, ''))}</li>`).join('')}</ul>` : `<p>${esc(ls.join(' '))}</p>`; }).join('');
  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'];
  const buildChaptersHtml = (list) => list.map((c, i) => `<article class="chapter reveal" id="cap-${i + 1}"><header class="chapter-head"><span class="chapter-num" aria-hidden="true">${esc(c.number || ROMAN[i] || i + 1)}</span><h3>${esc(c.title)}</h3></header><div class="chapter-text">${richHtml(c.text)}</div></article>`).join('');
  const buildChapterTocHtml = (list) => list.map((c, i) => `<li><a href="#cap-${i + 1}"><b>${esc(c.number || ROMAN[i] || i + 1)}</b><span>${esc(c.title)}</span></a></li>`).join('');
  const buildArchiveLinksHtml = (list) => list.map((l) => `<a href="${esc(l.href)}">${esc(l.label)}</a>`).join('');
  const buildHeroesHtml = (list) => list.map((m) => `<div class="hero-card reveal"><div class="hero-frame">${m.photo ? `<div class="media-slot hero-photo has-image"><img class="media-slot-image" src="${esc(m.photo)}" alt="${esc(m.name)}" loading="lazy"></div>` : `<div class="media-slot hero-photo" data-media-base="assets/images/historia/${esc(slugOf(m.name))}" data-media-alt="${esc(m.name)}"><span class="media-slot-label">Fotografia<br>a inserir</span></div>`}</div><h3>${esc(m.name)}</h3><span class="hero-role">${esc(m.role)}</span><p>${esc(m.text)}</p></div>`).join('');
  const buildFoundersHtml = (list) => list.map((m, i) => `<article class="founder-card reveal"><div class="media-slot founder-photo${m.photo ? ' has-image' : ''}"${m.photo ? '' : ` data-media-base="assets/images/nucleo-fundador/${esc(slugOf(m.name.replace(/\(.*?\)/g, '')))}" data-media-alt="${esc('Fotografia de ' + m.name)}"`}>${m.photo ? `<img class="media-slot-image" src="${esc(m.photo)}" alt="${esc('Fotografia de ' + m.name)}" loading="lazy">` : '<span class="media-slot-label">Fotografia<br>a inserir</span>'}</div><div class="founder-copy"><span class="founder-num">${String(i + 1).padStart(2, '0')}</span>${m.rank ? `<span class="founder-rank">${esc(m.rank)}</span>` : '<span class="founder-rank founder-rank--none">Membro do Núcleo Fundador</span>'}<h3>${esc(m.name)}</h3></div></article>`).join('');

  /* Estrutura — cartões de Formação Militar */
  const FORMATION_ICONS = {
    salute: '<circle cx="11" cy="7.5" r="2.7"/><path d="M13.6 4.6h4.2"/><path d="M14 10.2l3.4-4.6"/><path d="M7 21v-6.2a4 4 0 0 1 4-4h2.2"/><path d="M15 21v-5.4"/><path d="M9 21v-4"/>',
    health: '<path d="M12 3v18M3 12h18"/><path d="M5 7h14v10H5z"/>',
    shield: '<path d="M12 3 4 7v5c0 5 3.5 8 8 9 4.5-1 8-4 8-9V7z"/><path d="M9 12l2 2 4-4"/>',
    oath: '<path d="M4.5 21V3"/><path d="M4.5 4.5h10.5l-2.2 3.6 2.2 3.6H4.5"/><path d="M17.5 21v-5"/><path d="M17.5 16v-4.8a1 1 0 0 1 2 0V16"/><path d="M15.5 16.4v-3a1 1 0 0 1 2 0"/><path d="M17.5 16h2v2.6a2.4 2.4 0 0 1-2.4 2.4h-.6"/>'
  };
  const buildRegionsHtml = (list) => list.map((r, i) => `<a class="region-item" data-rm="${i + 1}" href="${esc(r.href)}"><img class="region-crest" src="${esc(r.image)}" alt="${esc('Brasão: ' + r.name)}" width="64" height="64"><div><h4>${esc(r.name)}</h4><p>${esc(r.text)}</p></div></a>`).join('');
  const buildFormationCardsHtml = (list) => list.map((c) => `<a class="support-card reveal" href="${esc(c.href)}"><span class="support-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${FORMATION_ICONS[c.icon] || FORMATION_ICONS.salute}</svg></span><span class="support-eyebrow">${esc(c.eyebrow)}</span><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p>${lines(c.bullets).length ? `<ul>${lines(c.bullets).map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}<span class="support-link">${esc(c.link_label || 'Saber mais')} <span aria-hidden="true">→</span></span></a>`).join('');

  /* Missão e Visão */
  const buildMissionListHtml = (list) => list.map((m) => `<li>${esc(m.text)}</li>`).join('');
  const CHEV = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* Contactos — assuntos do formulário */
  function applyContactSubjects(list) {
    const sel = document.getElementById('contact-subject');
    if (!sel || !Array.isArray(list) || !list.length) return;
    const html = list.map((x) => `<option>${esc(x.label)}</option>`).join('');
    if (sel.dataset.cmsSig === html) return;
    const keep = sel.value;
    sel.innerHTML = html; sel.dataset.cmsSig = html;
    if (Array.from(sel.options).some((o) => o.value === keep)) sel.value = keep;
  }

  /* Documentação (Legislação por categorias) */
  const slugOf = (n) => String(n).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const DOC_FILE_ICON = '<svg class="doc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>';
  function buildDocsLibraryHtml(docs, categories, activeSlug) {
    const names = Array.from(new Set([...(categories || []), ...docs.map((d) => d.category).filter(Boolean)]));
    if (docs.some((d) => !d.category)) names.push('Outros documentos');
    const group = (n) => docs.filter((d) => (d.category || 'Outros documentos') === n);
    const first = (names.find((n) => slugOf(n) === activeSlug) || names.find((n) => group(n).length) || names[0]);
    const nav = names.map((n, i) => { const sl = slugOf(n); const on = n === first; return `<button type="button" class="docs-cat${on ? ' is-active' : ''}" id="doccat-${sl}" data-cat="${sl}" role="tab" aria-selected="${on}" aria-controls="docpanel-${sl}"><span class="docs-cat-num">${String(i + 1).padStart(2, '0')}</span><span class="docs-cat-name">${esc(n)}</span><span class="docs-cat-count">${group(n).length}</span></button>`; }).join('');
    const panels = names.map((n) => {
      const sl = slugOf(n); const on = n === first; const g = group(n);
      const body = g.length
        ? `<div class="docs-grid docs-grid--cat">${g.map((d) => `<a href="${esc(d.file_url || '#')}" class="doc-card"${attr('id', d.anchor_id)}>${DOC_FILE_ICON}<div><h4>${esc(d.title)}</h4><span class="doc-meta">${esc(d.reference || '')}</span></div><span class="doc-dl" aria-hidden="true">PDF</span></a>`).join('')}</div>`
        : '<div class="docs-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg><p>Os documentos desta categoria serão publicados em breve.</p></div>';
      return `<section class="docs-panel${on ? ' is-active' : ''}" id="docpanel-${sl}" role="tabpanel" aria-labelledby="doccat-${sl}"${on ? '' : ' hidden'}><header class="docs-panel-head"><span class="docs-panel-kicker">Legislação</span><h3>${esc(n)}</h3><span class="docs-panel-count">${g.length} documento${g.length === 1 ? '' : 's'}</span></header>${body}</section>`;
    }).join('');
    return `<aside class="docs-cats" aria-label="Categorias de legislação"><p class="docs-cats-title">Legislação</p><div class="docs-cats-list" role="tablist" aria-orientation="vertical">${nav}</div></aside><div class="docs-panels">${panels}</div>`;
  }

  /** Substitui só as linhas do cartão de contactos (o título e o resto do cartão mantêm-se). */
  function applyQuickContacts(list) {
    const card = document.querySelector('.quick-contacts-card');
    if (!card || !Array.isArray(list) || !list.length) return;
    const html = buildQuickContactsHtml(list);
    if (card.dataset.cmsSig === html) return;
    card.dataset.cmsSig = html;
    card.querySelectorAll('.quick-contact-item').forEach((n) => n.remove());
    const h3 = card.querySelector('h3');
    if (h3) h3.insertAdjacentHTML('afterend', html);
  }

  /* ---------- filtros por categoria (categorias criadas/renomeadas no painel) ---------- */
  function applyCategoryChips(box, names) {
    if (!box || typeof box.appendChild !== 'function' || !Array.isArray(names) || !names.length) return;
    const existing = new Map(Array.from(box.querySelectorAll('.filter-btn')).map((b) => [b.dataset.filter, b]));
    const all = existing.get('Todas');
    const current = (box.querySelector('.filter-btn.active') || {}).dataset;
    const mk = (name) => {
      const b = document.createElement('button');
      b.className = 'filter-btn'; b.dataset.filter = name; b.textContent = name;
      return b;
    };
    const order = names.map((n) => existing.get(n) || mk(n));          // reutiliza os botões existentes (mantém traduções)
    const sig = names.join('|');
    if (box.dataset.cmsSig === sig) return;
    box.dataset.cmsSig = sig;
    while (box.firstChild) box.removeChild(box.firstChild);
    if (all) box.appendChild(all);
    order.forEach((b) => { box.appendChild(b); });
    const keep = current && (current.filter === 'Todas' || names.includes(current.filter)) ? current.filter : 'Todas';
    box.querySelectorAll('.filter-btn').forEach((b) => b.classList.toggle('active', b.dataset.filter === keep));
  }

  /* ---------- configurações do site → elementos (só valores alterados no painel) ---------- */
  function setMeta(selector, create, content) {
    let m = document.querySelector(selector);
    if (!m) { m = document.createElement('meta'); Object.entries(create).forEach(([k, v]) => m.setAttribute(k, v)); document.head.appendChild(m); }
    m.setAttribute('content', content);
  }
  function applySiteBindings(ov, all) {
    if (!ov || !Object.keys(ov).length) return;
    const home = document.body && document.body.classList.contains('home-page');
    const each = (sel, fn) => document.querySelectorAll(sel).forEach(fn);
    const name = ov['identity.site_name'], tag = ov['identity.tagline'], suffix = ov['seo.title_suffix'];

    if (name) each('.site-header .brand .b1', (el) => { el.innerHTML = nl2br(name); });
    if (ov['identity.logo']) each('img.crest', (el) => { el.setAttribute('src', ov['identity.logo']); });
    if (ov['identity.logo_large']) each('.hero-watermark', (el) => { el.setAttribute('src', ov['identity.logo_large']); });
    if (ov['identity.favicon']) {
      let l = document.querySelector('link[rel~="icon"]');
      if (!l) { l = document.createElement('link'); l.setAttribute('rel', 'icon'); document.head.appendChild(l); }
      l.setAttribute('href', ov['identity.favicon']); l.removeAttribute('type');
    }
    if (ov['hero.background']) each('.hero-bg img', (el) => { el.setAttribute('src', ov['hero.background']); });
    if (ov['cta.text']) each('.cta-band p', (el) => { el.textContent = ov['cta.text']; });

    // título do separador
    if (home && (name || tag)) {
      const n = name || (all && all['identity.site_name']) || 'Forças Armadas de Cabo Verde';
      const t = tag || (all && all['identity.tagline']) || '';
      document.title = t ? `${n} — ${t}` : n;
      setMeta('meta[property="og:title"]', { property: 'og:title' }, document.title);
    }
    if (suffix && !home) document.title = document.title.replace(/ [—-] [^—-]*$/, ' — ' + suffix);
    if (ov['identity.description'] && home) {
      setMeta('meta[name="description"]', { name: 'description' }, ov['identity.description']);
      setMeta('meta[property="og:description"]', { property: 'og:description' }, ov['identity.description']);
    }
    if (ov['seo.og_image']) setMeta('meta[property="og:image"]', { property: 'og:image' }, ov['seo.og_image']);
    if (ov['seo.robots']) setMeta('meta[name="robots"]', { name: 'robots' }, ov['seo.robots']);
    if (ov['seo.keywords']) setMeta('meta[name="keywords"]', { name: 'keywords' }, ov['seo.keywords']);

    // fotografia do diretor do Programa Soldado Cidadão
    if (ov['psc.director_photo']) each('.psc-director-avatar', (el) => {
      el.textContent = '';
      const img = document.createElement('img');
      img.setAttribute('src', ov['psc.director_photo']); img.setAttribute('alt', ov['psc.director_name'] || 'Diretor do Programa Soldado Cidadão');
      img.setAttribute('style', 'width:100%;height:100%;object-fit:cover;border-radius:50%;');
      el.appendChild(img);
    });

    // horário de atendimento: uma linha por período — "Segunda a Sexta | 08:00 — 16:00"
    if (ov['contact.hours']) each('.hours-card', (card) => {
      const rows = String(ov['contact.hours']).split('\n').map((l) => l.trim()).filter(Boolean).map((l) => {
        const [label, ...rest] = l.split('|'); const value = rest.join('|').trim();
        const closed = /encerrad|fechad/i.test(value);
        return `<div class="hours-row"><span>${esc(label.trim())}</span><strong${closed ? ' style="color:var(--red-600);"' : ''}>${esc(value)}</strong></div>`;
      }).join('');
      card.querySelectorAll('.hours-row').forEach((r) => r.remove());
      const title = card.querySelector('h3');
      if (title) title.insertAdjacentHTML('afterend', rows);
    });
  }

  /* ---------- concursos (home e página "Todos os concursos") ---------- */
  const CONC_STATUS = { aberto: ['Aberto', 'open', 'status-open'], brevemente: ['Brevemente', 'soon', 'status-open'], em_curso: ['Confirmado', 'closing', 'status-closing'], consulta: ['Consultar', 'info', 'status-open'], encerrado: ['Encerrado', 'closed', 'status-open'] };
  const concStatus = (c) => { const d = CONC_STATUS[c.status] || [c.status, 'info', 'status-open']; return { label: c.status_label || d[0], chip: d[1], row: d[2] }; };

  function buildConcursoRowsHtml(list) {
    return list.map((c) => {
      const st = concStatus(c);
      let cta;
      if (c.slug === 'programa-soldado-cidadao') cta = `<a href="programa-soldado-cidadao.html" class="concurso-cta">${esc(c.cta_label || 'Saber mais')} →</a>`;
      else if (c.action === 'detail') cta = `<a href="#" class="concurso-cta" data-detail="${esc(c.detail_slug)}">${esc(c.cta_label || 'Ver detalhes')} →</a>`;
      else cta = `<a href="${esc(c.cta_url || '#')}" class="concurso-cta">${esc(c.cta_label || 'Ver detalhes')} →</a>`;
      return `<div class="concurso-row"${attr('id', c.anchor_id)}><span class="concurso-date mono">${esc(c.ref || '')}</span><span class="concurso-title">${esc(c.title)}</span><span class="concurso-status ${st.row}">${esc(st.label)}</span>${cta}</div>`;
    }).join('');
  }

  function buildOpenJobsHtml(list) {
    return list.map((c) => {
      const st = concStatus(c);
      const meta = (c.meta || []).map((m) => `<span>${esc(m)}</span>`).join('');
      return `<div class="job-card" data-job="${esc(c.title)}" data-ref="${esc(c.ref || '')}"><span class="job-ref mono">${esc(c.ref || '')}</span><span class="status-chip ${st.chip}">${esc(st.label)}</span><h4>${esc(c.title)}</h4><p>${esc(c.description || '')}</p>${meta ? `<div class="job-meta">${meta}</div>` : ''}<button class="btn btn-outline-dark job-apply"${c.disabled ? ' disabled' : ''}>${esc(c.cta_label || 'Candidatar-se')}</button></div>`;
    }).join('');
  }

  /** Conteúdo das janelas "Ver detalhes" editado no painel (substitui o do detail-modal.js). */
  function registerDetails(list) {
    w.FA_DETAILS = w.FA_DETAILS || {};
    (list || []).forEach((c) => {
      const d = c.detail;
      if (c.detail_slug && d && typeof d === 'object') w.FA_DETAILS[c.detail_slug] = { image: d.image || '', tag: d.tag || '', date: d.date || '', title: d.title || c.title, paragraphs: Array.isArray(d.paragraphs) ? d.paragraphs : [] };
    });
  }

  function applyConcursos(items) {
    if (!Array.isArray(items) || !items.length) return;
    registerDetails(items);
    const home = items.filter((c) => c.show_home !== false);
    const rows = home.filter((c) => c.kind && c.kind !== 'concurso');
    const jobs = home.filter((c) => (!c.kind || c.kind === 'concurso') && c.status !== 'encerrado');
    const listEl = document.querySelector('#concursos .concurso-list');
    const gridEl = document.querySelector('#concursos .open-jobs-grid');
    if (listEl) { const h = buildConcursoRowsHtml(rows); if (listEl.dataset.cmsSig !== h) { listEl.innerHTML = h; listEl.dataset.cmsSig = h; } }
    if (gridEl) { const h = buildOpenJobsHtml(jobs); if (gridEl.dataset.cmsSig !== h) { gridEl.innerHTML = h; gridEl.dataset.cmsSig = h; } }
  }

  function applyDocuments(docs, categories) {
    const box = document.getElementById('noticias-docs-grid');
    if (!box || !Array.isArray(docs)) return;
    const active = (box.querySelector('.docs-cat.is-active') || {}).dataset;
    const html = buildDocsLibraryHtml(docs, categories, active && active.cat);
    if (box.dataset.cmsSig === html) return;
    box.innerHTML = html; box.dataset.cmsSig = html;
  }

  /* ---------- navegação ---------- */
  function routed(url) { return (typeof navigationRoutes !== 'undefined' && navigationRoutes[url]) || url; }

  function applyNavigation(nav) {
    if (!nav) return;
    const ul = document.querySelector('nav.primary > ul');
    if (ul && nav.header && nav.header.length) {
      const wanted = JSON.stringify(nav.header.map((i) => [i.label, routed(i.url), (i.children || []).map((c) => [c.label, routed(c.url)])]));
      const current = JSON.stringify(Array.from(ul.children).map((li) => {
        const a = li.querySelector(':scope > a');
        return [a ? norm(a.textContent) : '', a ? a.getAttribute('href') : '', Array.from(li.querySelectorAll('.mega > a')).map((c) => [norm(c.textContent), c.getAttribute('href')])];
      }));
      if (wanted !== current) {
        ul.innerHTML = buildHeaderHtml(nav.header);
        if (typeof normalizeNavigationRoutes === 'function') normalizeNavigationRoutes(ul);
        ul.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => document.body.classList.remove('nav-open')));
      }
    }
    const cols = Array.from(document.querySelectorAll('footer .footer-col')).filter((c) => c.querySelector('ul li a'));
    if (cols.length && nav.footer && nav.footer.length) {
      const wanted = JSON.stringify(nav.footer.map((c) => [c.label, (c.children || []).map((x) => [x.label, routed(x.url)])]));
      const current = JSON.stringify(cols.filter((c) => !c.querySelector('li.mono')).map((c) => [norm(c.querySelector('h5').textContent), Array.from(c.querySelectorAll('li a')).map((a) => [norm(a.textContent), a.getAttribute('href')])]));
      if (wanted !== current) {
        const editable = cols.filter((c) => !c.querySelector('li.mono'));
        const holder = document.createElement('div'); holder.innerHTML = buildFooterColsHtml(nav.footer);
        const fresh = Array.from(holder.children);
        editable.forEach((c, i) => { if (fresh[i]) c.replaceWith(fresh[i]); else c.remove(); });
        if (typeof normalizeNavigationRoutes === 'function') document.querySelectorAll('footer .footer-col').forEach(normalizeNavigationRoutes);
      }
    }
    const flinks = document.querySelector('footer .flinks');
    if (flinks && nav.legal && nav.legal.length) {
      const wanted = JSON.stringify(nav.legal.map((l) => [l.label, l.url]));
      const current = JSON.stringify(Array.from(flinks.querySelectorAll('a')).map((a) => [norm(a.textContent), a.getAttribute('href')]));
      if (wanted !== current) flinks.innerHTML = buildLegalHtml(nav.legal);
    }
  }

  function reapplyI18n() {
    try {
      if (typeof i18nCaptureOriginals === 'function') i18nCaptureOriginals();
      const saved = localStorage.getItem('fa_lang');
      if (saved && saved !== 'PT' && typeof setLanguage === 'function') setLanguage(saved);
    } catch (_) { /* ignora */ }
  }

  async function init() {
    const site = await FA_API.site();            // null → API indisponível: o site mantém o conteúdo estático
    if (site) {
      applySettings(site.overrides || {});   // só o que foi alterado no painel: o HTML continua a ser a base
      applySiteBindings(site.overrides || {}, site.settings);
      const cats = site.categories || {};
      if ((site.edited || {}).news) { applyCategoryChips(document.querySelector('.filters[aria-label]'), cats.news); applyCategoryChips(document.getElementById('noticias-page-filters'), cats.news); }
      if ((site.edited || {}).multimedia) applyCategoryChips(document.getElementById('mm-page-filters'), cats.multimedia);
      const ed = site.edited || {};
      if (ed.navigation) applyNavigation(site.navigation);            // menus: só depois de alterados no painel
      const cols = {};
      Object.keys(site.collections || {}).forEach((k) => { if (ed['collection:' + k]) cols[k] = site.collections[k]; });
      applyCollections(cols);                                           // listas: só as alteradas no painel
      reapplyI18n();
      if (w.FA_EFFECTS && w.FA_EFFECTS.apply(site.effects) && w.FA_LIVE) w.FA_LIVE.reloadWhenIdle();   // efeito alterado/removido
    }
    if (site && site.edited && (site.edited.documents || site.edited.categories) && document.getElementById('noticias-docs-grid')) {
      const docs = await FA_API.get('/documents?limit=200');
      applyDocuments(docs, (site.categories || {}).documents);
    }
  }

  w.FA_CMS = { buildHeaderHtml, buildFooterColsHtml, buildLegalHtml, buildHeroActionsHtml, buildStructureCommandsHtml, buildStructureOrgansHtml, buildPillarsHtml, buildPartnersHtml, buildSocialHtml, buildDocumentsHtml, buildTimelineHtml, buildQuickContactsHtml, buildDirectoryHtml, buildUnitsHtml, buildFoundersHtml, buildChaptersHtml, buildChapterTocHtml, buildArchiveLinksHtml, buildHeroesHtml, buildFormationCardsHtml, buildRegionsHtml, buildMissionListHtml, buildDocsLibraryHtml, applyContactSubjects, refresh: () => init(), applyCategoryChips, applySiteBindings, buildConcursoRowsHtml, buildOpenJobsHtml, registerDetails, applyConcursos, applySettings, applyCollections, applyNavigation, init };

  if (w.FA_LIVE) w.FA_LIVE.onChange(init);   // alterações no painel → o site atualiza-se sozinho
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})(window);
