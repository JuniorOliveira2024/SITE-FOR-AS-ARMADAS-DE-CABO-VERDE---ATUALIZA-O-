/* ---------- carrossel de imagens dos alunos (PSC) ---------- */
(function(){
  const track = document.getElementById('psc-carousel-track');
  const dotsWrap = document.getElementById('psc-carousel-dots');
  const prevBtn = document.getElementById('psc-carousel-prev');
  const nextBtn = document.getElementById('psc-carousel-next');
  const carouselEl = document.getElementById('psc-carousel');
  if(!track || !dotsWrap || !prevBtn || !nextBtn || !carouselEl) return;
  const slides = track.querySelectorAll('.psc-slide');
  let current = 0;

  slides.forEach((_, i)=>{
    const dot = document.createElement('button');
    if(i===0) dot.classList.add('active');
    dot.addEventListener('click', ()=> goToSlide(i));
    dotsWrap.appendChild(dot);
  });

  function goToSlide(i){
    current = (i + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (current*100) + '%)';
    dotsWrap.querySelectorAll('button').forEach((d,idx)=> d.classList.toggle('active', idx===current));
  }
  prevBtn.addEventListener('click', ()=> goToSlide(current-1));
  nextBtn.addEventListener('click', ()=> goToSlide(current+1));

  let autoTimer = setInterval(()=> goToSlide(current+1), 5000);
  carouselEl.addEventListener('mouseenter', ()=> clearInterval(autoTimer));
  carouselEl.addEventListener('mouseleave', ()=> { autoTimer = setInterval(()=> goToSlide(current+1), 5000); });
})();
