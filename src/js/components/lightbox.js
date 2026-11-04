/* ---------- lightbox (functional) ---------- */
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbCaption = document.getElementById('lightbox-caption-text');
const lbCredit = document.getElementById('lightbox-credit');
document.querySelectorAll('.media-tile').forEach(tile=>{
  tile.addEventListener('click',()=>{
    lbImg.src = tile.dataset.img;
    lbCaption.textContent = tile.dataset.caption || '';
    lbCredit.textContent = tile.dataset.credit || '';
    lightbox.classList.add('open');
  });
});
function closeLightbox(){ lightbox.classList.remove('open'); }
document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click',(e)=>{ if(e.target===lightbox) closeLightbox(); });
