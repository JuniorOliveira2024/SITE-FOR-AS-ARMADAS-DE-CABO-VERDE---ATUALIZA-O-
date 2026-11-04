/* ============================================================
   Dados da página "Incorporação de Recrutas" (servico-militar.html)

   COMO ATUALIZAR A INCORPORAÇÃO EM CURSO
   Edite apenas o objeto INCORPORACAO_ATUAL abaixo (nome, local, datas).
   A fase em que o recrutamento se encontra é calculada sozinha a partir das
   datas (apresentacao / juramento); se preferir fixá-la à mão, preencha
   "fase" com o número da etapa (1 a 5).  Use null para o cálculo automático.
   ============================================================ */
window.INCORPORACAO_ETAPAS = [
  { n: 1, titulo: 'Recenseamento militar',
    texto: 'Os cidadãos sujeitos ao dever de serviço militar são recenseados e recebem o Cartão de Recenseamento Militar.' },
  { n: 2, titulo: 'Convocatória',
    texto: 'O Comando da Região Militar envia a convocatória individual, com a data, o local e os documentos a apresentar.' },
  { n: 3, titulo: 'Apresentação e seleção',
    texto: 'Apresentação dos convocados no centro de instrução, conferência da documentação e seleção dos recrutas que integram a incorporação.' },
  { n: 4, titulo: 'Formação inicial',
    texto: 'Instrução física, técnica e cívica no CIMMB, com módulos do Programa Soldado Cidadão.' },
  { n: 5, titulo: 'Juramento à Bandeira',
    texto: 'Ratificação do Juramento à Bandeira Nacional, que conclui a formação inicial e integra o recruta nas fileiras.' }
];

window.INCORPORACAO_ATUAL = {
  nome: '2ª Incorporação Militar 2026',
  local: 'Centro de Instrução Militar do Morro Branco (CIMMB), Morro Branco',
  apresentacao: '2026-09-08',   // data de apresentação dos recrutas (AAAA-MM-DD)
  juramento: null,              // data do Juramento à Bandeira, quando for conhecida (AAAA-MM-DD)
  fase: null,                   // null = calcular pelas datas; ou 1 a 5 para fixar a etapa
  nota: 'Informação confirmada pelo Estado-Maior. Os recrutas convocados recebem a convocatória individual do Comando da respetiva Região Militar.'
};

/* Outras incorporações listadas na página (acrescente linhas conforme forem anunciadas) */
window.INCORPORACAO_OUTRAS = [
  { nome: 'Próxima incorporação', estado: 'Data a anunciar',
    texto: 'A abertura da próxima incorporação será divulgada nesta página e nas Notícias.' }
];

/* Requisitos e documentação de referência */
window.INCORPORACAO_REQUISITOS = [
  'Ser cidadão cabo-verdiano.',
  'Ter 18 anos completos (Serviço Militar Obrigatório — Decreto-Legislativo n.º 6/93, de 24 de maio).',
  'Estar recenseado para efeitos militares e constar da lista de convocados do Comando da Região Militar.',
  'Apresentar-se na data, hora e local indicados na convocatória individual.',
  'As mulheres também integram as incorporações: a 2ª Incorporação de 2025 contou com nove recrutas do sexo feminino.'
];

window.INCORPORACAO_DOCUMENTOS = [
  'Bilhete de Identidade (ou Cartão Nacional de Identificação).',
  'Cartão de Recenseamento Militar.',
  'Convocatória individual enviada pelo Comando da Região Militar.',
  'Outros documentos que venham indicados na convocatória (por exemplo, fotografias e comprovativo de habilitações).'
];
