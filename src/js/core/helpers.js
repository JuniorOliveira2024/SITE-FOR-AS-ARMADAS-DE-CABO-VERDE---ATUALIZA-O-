/* ---------- helpers partilhados pelas páginas de notícias ---------- */
const FA_FALLBACK_IMAGE = 'https://commons.wikimedia.org/wiki/Special:FilePath/The_flag_of_Cape_Verde_Islands_in_the_city_center.jpg';

function formatDatePt(isoDate){
  return new Date(isoDate).toLocaleDateString('pt-PT', { day:'2-digit', month:'long', year:'numeric' });
}

/* converte uma notícia vinda do backend no formato usado pelo leitor de artigos (NEWS_ARTICLES) */
function faEscText(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }

function buildDynamicArticle(item){
  return {
    title: item.title,
    subtitle: item.subtitle || '',
    author: item.author || '',
    date: formatDatePt(item.published_at),
    tag: item.tag || item.category,
    image: item.image_url || FA_FALLBACK_IMAGE,
    gallery: (Array.isArray(item.gallery) ? item.gallery : []).map(g => (typeof g === 'string' ? { url: g } : g)).filter(g => g && g.url),
    seoTitle: item.seo_title || '',
    seoDescription: item.seo_description || item.excerpt || '',
    // o texto vem do painel: escapado antes de entrar no HTML
    paragraphs: (item.body || item.excerpt || '').split('\n').map(p=>p.trim()).filter(Boolean).map(faEscText)
  };
}
