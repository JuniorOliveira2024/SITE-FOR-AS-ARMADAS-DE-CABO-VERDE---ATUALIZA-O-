/* ================================================================
   ⚠️ LIGAÇÃO AO BACKEND — EDITE A LINHA ABAIXO ⚠️
   ================================================================
   Por omissão, este ficheiro funciona apenas com conteúdo estático
   de demonstração. Para ativar dados reais (Notícias, Concursos,
   Multimédia, Formações PSC, Candidaturas e Efeitos Sazonais),
   troque a linha abaixo pelo URL do backend implantado na Vercel:

     window.FA_API_BASE = 'https://o-seu-backend.vercel.app';

   (sem barra "/" no final do URL). O painel administrativo fica em
   /admin dentro do backend (fa-backend/public/admin) — é aí que se
   gere Notícias, Concursos, Candidaturas, Multimédia, Formações PSC
   e a Aparência do Site.
================================================================ */
window.FA_API_BASE = window.FA_API_BASE || '';

/* ================================================================
   EFEITOS SAZONAIS DO SITE (Natal, aniversário da instituição, etc.)
   Controlados a partir do painel administrativo (aba "Aparência do Site").
   Sem backend ligado, pode testar-se manualmente com ?efeito=neve na URL
   (valores possíveis: neve, aniversario, confetti, coracoes).
================================================================ */
const EFFECT_PRESETS = {
  neve:        { symbols:['❄','❅','❆'], colors:['#ffffff'], count:44, minSize:10, maxSize:22, minDur:8,  maxDur:16, drift:true },
  aniversario: { symbols:['🎉','🎈','✨','🎊'], colors:null, count:36, minSize:16, maxSize:28, minDur:6,  maxDur:12, drift:true },
  confetti:    { symbols:null, colors:['#C6A15B','#0A2540','#A3202B','#DFC48B','#ffffff'], count:60, minSize:8, maxSize:14, minDur:5, maxDur:10, drift:false },
  coracoes:    { symbols:['❤','💛','🤍'], colors:null, count:30, minSize:14, maxSize:24, minDur:7, maxDur:14, drift:true }
};

function applySiteEffect(effectName, bannerMessage){
  document.querySelectorAll('.site-effect-layer, .site-effect-banner').forEach(el => el.remove());
  const preset = EFFECT_PRESETS[effectName];
  if(!preset) return; // 'none' ou valor desconhecido: site fica normal

  const layer = document.createElement('div');
  layer.className = 'site-effect-layer';
  layer.setAttribute('aria-hidden', 'true');

  for(let i=0; i<preset.count; i++){
    const piece = document.createElement('span');
    piece.className = 'site-effect-piece' + (preset.drift ? ' drift' : ' fall');
    const size = preset.minSize + Math.random()*(preset.maxSize-preset.minSize);
    const duration = preset.minDur + Math.random()*(preset.maxDur-preset.minDur);
    piece.style.left = (Math.random()*100) + 'vw';
    piece.style.fontSize = size + 'px';
    piece.style.width = size + 'px';
    piece.style.height = size + 'px';
    piece.style.animationDuration = duration + 's';
    piece.style.animationDelay = (-Math.random()*duration) + 's';
    if(preset.symbols){
      piece.textContent = preset.symbols[Math.floor(Math.random()*preset.symbols.length)];
    } else if(preset.colors){
      piece.style.background = preset.colors[Math.floor(Math.random()*preset.colors.length)];
      piece.style.borderRadius = Math.random() > .5 ? '50%' : '2px';
    }
    layer.appendChild(piece);
  }
  document.body.appendChild(layer);

  if(bannerMessage){
    const banner = document.createElement('div');
    banner.className = 'site-effect-banner';
    banner.textContent = bannerMessage;
    document.body.appendChild(banner);
  }
}

async function loadSiteEffect(){
  // permite pré-visualizar um efeito manualmente via ?efeito=neve, sem precisar do backend
  const urlEffect = new URLSearchParams(window.location.search).get('efeito');
  if(urlEffect){ applySiteEffect(urlEffect, null); return; }

  if(!window.FA_API_BASE) return;
  try{
    const res = await fetch(window.FA_API_BASE + '/api/theme');
    if(res.ok){
      const theme = await res.json();
      applySiteEffect(theme.active_effect, theme.banner_message);
    }
  } catch(err){
    console.warn('Não foi possível carregar a aparência sazonal do site.', err);
  }
}
loadSiteEffect();
