/* ---------- detalhes de concursos e legislação ---------- */
const DETAIL_PAGES = {
  'incorporacao-2026': {
    title: '2ª Incorporação Militar 2026 — Centro de Instrução Militar do Morro Branco (CIMMB)',
    date: 'Apresentação: 08 de setembro de 2026', tag: 'Confirmado',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kanonen_vor_Kaserne_Quartel_Jaime_Mota_Plato_Praia,_Santiago.JPG',
    paragraphs: [
      'A 2ª Incorporação Militar de 2026 tem apresentação confirmada para o dia 08 de setembro de 2026, no Centro de Instrução Militar do Morro Branco (CIMMB).',
      'Os recrutas convocados devem apresentar-se com o Bilhete de Identidade, o Cartão de Recenseamento Militar e demais documentos indicados na convocatória individual enviada pelo Comando da respetiva Região Militar.',
      'A formação inicial inclui instrução física, técnica e cívica, com módulos do Programa Soldado Cidadão, culminando na Ratificação do Juramento à Bandeira Nacional.'
    ]
  },
  'lei-servico-militar': {
    title: 'Lei do Serviço Militar — Decreto-Legislativo nº 6/93, de 24 de maio',
    date: 'Diploma legal em vigor', tag: 'Legislação',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pal%C3%A1cio_do_governo_(11223820464).jpg',
    paragraphs: [
      'O Decreto-Legislativo nº 6/93, de 24 de maio, estabelece o regime do Serviço Militar Obrigatório em Cabo Verde, aplicável aos cidadãos cabo-verdianos do sexo masculino a partir dos 18 anos de idade.',
      'O diploma define os direitos e deveres dos cidadãos sujeitos ao recenseamento e à incorporação, bem como as competências dos Comandos das Regiões Militares nesse processo.',
      'Para consultar o texto integral do diploma, contacte o Comando da sua Região Militar ou a Câmara Municipal da sua área de residência.'
    ]
  },
  'lei-objecao': {
    title: 'Objeção de Consciência — Decreto-Legislativo nº 7/93',
    date: 'Diploma legal em vigor', tag: 'Legislação',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/The_flag_of_Cape_Verde_Islands_in_the_city_center.jpg',
    paragraphs: [
      'O Decreto-Legislativo nº 7/93 regula o regime de objeção de consciência ao Serviço Militar Obrigatório, reconhecendo o direito de cidadãos que, por convicções religiosas, morais, humanistas ou filosóficas, se recusem a prestar serviço militar armado.',
      'Os objetores de consciência reconhecidos ficam sujeitos a um serviço cívico alternativo, de duração e natureza equivalentes ao serviço militar, nos termos definidos pela lei.',
      'O processo de reconhecimento do estatuto de objetor de consciência deve ser requerido junto às entidades competentes, dentro dos prazos legalmente estabelecidos.'
    ]
  }
};

const detailModal = document.getElementById('detail-modal');
function openDetail(slug){
  const d = (window.FA_DETAILS && window.FA_DETAILS[slug]) || DETAIL_PAGES[slug];   // o painel pode substituir o conteúdo
  if(!d){ showToast('Informação não encontrada.'); return; }
  document.getElementById('detail-image').src = d.image;
  document.getElementById('detail-image').alt = d.title;
  document.getElementById('detail-tag').textContent = d.tag;
  document.getElementById('detail-date').textContent = d.date;
  document.getElementById('detail-title').textContent = d.title;
  document.getElementById('detail-content').innerHTML = d.bodyHtml || d.paragraphs.map(p=>'<p>'+p+'</p>').join('');
  detailModal.classList.add('open');
  detailModal.scrollTop = 0;
}
function closeDetailModal(){ detailModal.classList.remove('open'); }
document.getElementById('detail-modal-close').addEventListener('click', closeDetailModal);
document.getElementById('detail-modal-backdrop').addEventListener('click', closeDetailModal);
/* delegação: funciona também com linhas/cartões criados depois (conteúdo vindo do painel) */
document.addEventListener('click',(e)=>{
  const a = e.target.closest && e.target.closest('[data-detail]');
  if(!a || e.defaultPrevented) return;
  e.preventDefault(); openDetail(a.dataset.detail);
});
