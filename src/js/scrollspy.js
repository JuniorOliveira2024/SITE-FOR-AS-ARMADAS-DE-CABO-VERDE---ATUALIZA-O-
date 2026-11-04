/* ---------- active nav link on scroll (scrollspy) ---------- */
const navLinks = document.querySelectorAll('.nav-link');
const spySections = Array.from(navLinks).map(l=>document.getElementById(l.dataset.target)).filter(Boolean);
const spyObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const id = entry.target.id;
      navLinks.forEach(l=>l.classList.toggle('active', l.dataset.target===id));
    }
  });
},{rootMargin:'-45% 0px -50% 0px'});
spySections.forEach(s=>spyObserver.observe(s));
