/* ============================================================
   Leitura de notícia completa — navega para uma página dedicada
   (noticia.html?id=SLUG), com os dados definidos em news-data.js
   ============================================================ */
document.querySelectorAll('[data-noticia]').forEach(a=>{
  a.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.href = 'noticia.html?id=' + encodeURIComponent(a.dataset.noticia);
  });
});
