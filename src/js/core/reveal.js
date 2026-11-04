/* ---------- scroll reveal ----------
   Revela os blocos .reveal quando entram no ecrã.
   - threshold:0 + rootMargin: blocos MUITO ALTOS (ex.: grelha de cards em 1 coluna no telemóvel)
     disparam logo que o topo aparece; com threshold fracionário (12%) podiam nunca disparar.
   - sem IntersectionObserver, ou se algo falhar, nada fica escondido (rede de segurança).
   - blocos acrescentados depois do carregamento (listas reconstruídas com o conteúdo do painel) também são revelados. */
(function(){
  document.documentElement.classList.add('reveal-ready');
  const show = el => el.classList.add('in');
  const collect = root => {
    const out = [];
    if(root.nodeType !== 1) return out;
    if(root.classList.contains('reveal')) out.push(root);
    root.querySelectorAll && root.querySelectorAll('.reveal').forEach(e => out.push(e));
    return out;
  };

  if(!('IntersectionObserver' in window)){
    document.querySelectorAll('.reveal').forEach(show);
    if('MutationObserver' in window) new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => collect(n).forEach(show)))).observe(document.body, {childList:true, subtree:true});
    return;
  }

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ show(e.target); io.unobserve(e.target);} });
  },{threshold:0, rootMargin:'0px 0px -6% 0px'});
  const watch = el => { if(!el.classList.contains('in')) io.observe(el); };
  document.querySelectorAll('.reveal').forEach(watch);

  // conteúdo acrescentado mais tarde (ex.: listas atualizadas a partir do backend)
  if('MutationObserver' in window){
    new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => collect(n).forEach(watch))))
      .observe(document.body, {childList:true, subtree:true});
  }

  // rede de segurança: o que já está (ou quase) à vista e continua escondido é revelado
  setTimeout(()=>{
    const limit = window.innerHeight * 1.2;
    document.querySelectorAll('.reveal').forEach(el=>{
      if(!el.classList.contains('in') && el.getBoundingClientRect().top < limit) show(el);
    });
  }, 2500);
})();
