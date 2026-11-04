/* Carrega automaticamente imagens opcionais (logotipos, fotografias).
   <div class="media-slot" data-media-base="assets/images/brasoes/guarda-costeira"> … conteúdo de reserva … </div>
   Procura <base>.png / .jpg / .webp; se existir, substitui o conteúdo de reserva pela imagem.
   window.FA_MEDIA.scan(raiz) volta a procurar dentro de uma zona (usado depois de o painel alterar listas). */
(function(){
  const EXT = ['png','jpg','webp'];
  function scan(root){
    (root || document).querySelectorAll('[data-media-base]').forEach(slot => {
      if(slot.dataset.mediaScanned) return; slot.dataset.mediaScanned = '1';
      const base = slot.dataset.mediaBase; if(!base) return;
      const list = /\.(png|jpe?g|webp|svg)$/i.test(base) ? [base] : EXT.map(e => base + '.' + e);
      (function next(i){
        if(i >= list.length) return;
        const img = new Image();
        img.onload = () => { img.alt = slot.dataset.mediaAlt || ''; img.className = 'media-slot-image'; img.decoding = 'async'; slot.classList.add('has-image'); slot.replaceChildren(img); };
        img.onerror = () => next(i+1);
        img.src = list[i];
      })(0);
    });
  }
  window.FA_MEDIA = { scan };
  scan(document);
})();
