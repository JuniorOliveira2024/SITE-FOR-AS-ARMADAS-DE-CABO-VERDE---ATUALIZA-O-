/* ---------- consulta de situação militar (simulação) ---------- */
const serviceModal = document.getElementById('service-modal');
const serviceForm = document.getElementById('service-form');
const declareForm = document.getElementById('service-declare-form');
const stepForm = document.getElementById('service-step-form');
const stepDeclare = document.getElementById('service-step-declare');
const stepResult = document.getElementById('service-step-result');

let pendingBirthYear = null;
let pendingSex = null;
let pendingAge = null;

function showStep(step){
  stepForm.style.display = step==='form' ? 'block' : 'none';
  stepDeclare.style.display = step==='declare' ? 'block' : 'none';
  stepResult.style.display = step==='result' ? 'block' : 'none';
}

function openServiceModal(){
  serviceModal.classList.add('open');
  showStep('form');
  serviceForm.reset();
  setTimeout(()=>document.getElementById('birth-year').focus(), 50);
}
function closeServiceModal(){ serviceModal.classList.remove('open'); }

document.getElementById('btn-open-service-check').addEventListener('click', openServiceModal);
document.getElementById('service-modal-close').addEventListener('click', closeServiceModal);
document.getElementById('service-modal-backdrop').addEventListener('click', closeServiceModal);
document.getElementById('service-back-btn').addEventListener('click', openServiceModal);

const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
function formatDate(d){ return String(d.getDate()).padStart(2,'0')+' de '+MESES[d.getMonth()]+' de '+d.getFullYear(); }

const LOCAIS = [
  'CIMMB — Comando da 1ª Região Militar, Mindelo (São Vicente)',
  'Comando da 2ª Região Militar, Sal',
  'Comando da 3ª Região Militar, Praia (Santiago)'
];

/* Datas reais de incorporação, conforme confirmado pela instituição.
   Adicionar aqui novas fases à medida que forem publicadas oficialmente. */
const INCORPORACOES_REAIS = [
  { label:'2ª Incorporação 2026', date: new Date(2026, 8, 8) } // 08 de setembro de 2026
];

function proximaIncorporacaoReal(fromDate){
  const futuras = INCORPORACOES_REAIS
    .filter(i => i.date >= fromDate)
    .sort((a,b) => a.date - b.date);
  return futuras.length ? futuras[0] : null;
}

function renderResult({name, age, statusClass, statusLabel, situationHtml, date, place, note}){
  document.getElementById('result-name').textContent = name || '—';
  document.getElementById('result-age').textContent = age + ' anos';
  document.getElementById('result-status-title').textContent = statusLabel;
  document.getElementById('result-situation').innerHTML = situationHtml;
  document.getElementById('result-date').textContent = date;
  document.getElementById('result-place').textContent = place;
  document.getElementById('result-note').textContent = note;
  showStep('result');
}

/* Passo 1: ano de nascimento + sexo */
serviceForm.addEventListener('submit', function(e){
  e.preventDefault();
  const birthYear = parseInt(document.getElementById('birth-year').value, 10);
  const sex = document.getElementById('birth-sex').value;
  const currentYear = new Date().getFullYear();

  if(!birthYear || birthYear < 1930 || birthYear > currentYear){
    showToast('Introduza um ano de nascimento válido.');
    return;
  }
  const age = currentYear - birthYear;
  pendingBirthYear = birthYear; pendingSex = sex; pendingAge = age;

  if(sex === 'F'){
    renderResult({
      name:'—', age, statusClass:'exempt', statusLabel:'Serviço Militar Voluntário',
      situationHtml:'<span class="status-pill exempt">Regime Voluntário</span><br>Não sujeita a incorporação obrigatória',
      date:'—', place:'Candidatura via Concursos Públicos',
      note:'Nos termos da lei em vigor, o Serviço Militar Obrigatório aplica-se aos cidadãos do sexo masculino. As mulheres podem candidatar-se ao ingresso nas Forças Armadas em regime voluntário, através dos concursos de recrutamento publicados nesta página.'
    });
    return;
  }
  if(age < 18){
    const turns18 = birthYear + 18;
    renderResult({
      name:'—', age, statusClass:'future', statusLabel:'Ainda não sujeito a recenseamento',
      situationHtml:'<span class="status-pill future">Situação futura</span><br>Recenseamento a partir dos 18 anos',
      date:'A partir de '+turns18, place:'Câmara Municipal da área de residência',
      note:'Deverá proceder ao recenseamento militar no ano em que completar 18 anos ('+turns18+'), junto da Câmara Municipal da sua área de residência.'
    });
    return;
  }

  /* Homem, 18+: precisa de declarar se já se apresentou */
  document.getElementById('declare-lede').textContent = 'Nasceu em '+birthYear+' e tem atualmente '+age+' anos — está no escalão etário sujeito ao Serviço Militar Obrigatório (18–30 anos). Confirme os dados abaixo.';
  showStep('declare');
  setTimeout(()=>document.getElementById('full-name').focus(), 50);
});

/* Passo 2: nome completo + já se apresentou? */
declareForm.addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('full-name').value.trim().replace(/\s+/g,' ');
  const presented = declareForm.querySelector('input[name="presented"]:checked');
  const nameError = document.getElementById('name-error');

  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;
  if(!name){ showToast('Introduza o seu nome completo.'); document.getElementById('full-name').focus(); return; }
  if(!nameRegex.test(name)){
    nameError.style.display = 'block';
    document.getElementById('full-name').focus();
    return;
  }
  nameError.style.display = 'none';
  if(!presented){ showToast('Indique se já se apresentou ao Serviço Militar.'); return; }

  const age = pendingAge;
  const today = new Date();

  if(presented.value === 'sim'){
    renderResult({
      name, age, statusClass:'regular', statusLabel:'Situação Regular',
      situationHtml:'<span class="status-pill regular">Regular</span><br>Apresentação ao Serviço Militar confirmada',
      date:'Já efetuada', place:'Situação regularizada',
      note: name+', a sua situação militar encontra-se regularizada com base na apresentação já efetuada. Mantenha os seus documentos militares atualizados junto do Comando da sua Região Militar.'
    });
  } else {
    if(age === 18 || age === 19){
      const proxima = proximaIncorporacaoReal(today);
      const dateLabel = proxima ? (formatDate(proxima.date) + ' — ' + proxima.label) : 'A definir pelo Comando (data ainda não publicada)';
      const local = proxima ? LOCAIS[proxima.date.getFullYear() % LOCAIS.length] : 'A confirmar junto do Comando da sua Região Militar';
      renderResult({
        name, age, statusClass:'due', statusLabel:'Regular — Apresentação Pendente',
        situationHtml:'<span class="status-pill due">Apresentação pendente</span><br>Dentro do prazo regular (18–19 anos), ainda não apresentado',
        date: dateLabel, place: local,
        note: name+', encontra-se ainda dentro do prazo regular para apresentação ao Serviço Militar Obrigatório. Deve apresentar-se na próxima data de incorporação indicada, junto ao comando da sua Região Militar, para regularizar a sua situação antes de completar 20 anos.'
      });
    } else {
      renderResult({
        name, age, statusClass:'irregular', statusLabel:'Situação Irregular — Compelido',
        situationHtml:'<span class="status-pill irregular">Irregular / Compelido</span><br>Não apresentado até aos 18 nem 19 anos',
        date:'Apresentação imediata obrigatória', place:'Comando da sua Região Militar (urgente)',
        note: name+', por não se ter apresentado ao Serviço Militar Obrigatório até aos 18 nem 19 anos, a sua situação é considerada irregular, ficando sujeito a incorporação compelida (forçada), nos termos da lei do Serviço Militar. Deve regularizar a sua situação com urgência junto ao Comando da sua Região Militar.'
      });
    }
  }
});
