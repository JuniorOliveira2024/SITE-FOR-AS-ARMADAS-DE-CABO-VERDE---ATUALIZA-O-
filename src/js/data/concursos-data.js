/* ============================================================
   Lista completa de concursos da plataforma (página concursos.html).
   Para acrescentar um concurso, adicione um objeto a CONCURSOS_LISTA.
   kind:   'concurso' (candidatura) | 'ingresso' (incorporação) | 'legislacao' | 'programa'
   status: 'aberto' | 'brevemente' | 'em-curso' | 'consulta'
   action: 'apply'  → abre o formulário de candidatura
           'detail' → abre o modal de detalhes (slug de DETAIL_PAGES em detail-modal.js)
           'link'   → navega para href
   ============================================================ */
const CONCURSOS_STATUS = {
  'aberto':     { label: 'Aberto',      chip: 'open'    },
  'brevemente': { label: 'Brevemente',  chip: 'soon'    },
  'em-curso':   { label: 'Confirmado',  chip: 'closing' },
  'consulta':   { label: 'Consultar',   chip: 'info'    }
};

const CONCURSOS_LISTA = [
  {
    id: 'fa-2026-014', kind: 'concurso', status: 'aberto', ref: 'Ref. FA-2026/014',
    title: 'Concurso para Sargentos — Administração Militar',
    description: 'Admissão de candidatos para o Curso de Formação de Sargentos, especialidade de Administração Militar, na Escola Militar. Aberto a civis e a militares no ativo que reúnam os requisitos de admissão.',
    meta: ['📅 Prazo: 30/09/2026', '📍 Praia, Santiago'],
    action: 'apply', actionLabel: 'Candidatar-se'
  },
  {
    id: 'fa-2026-021', kind: 'concurso', status: 'aberto', ref: 'Ref. FA-2026/021',
    title: 'Concurso para Praças — Guarda Costeira (Marinharia)',
    description: 'Recrutamento de praças para a componente naval da Guarda Costeira, com formação inicial em operações marítimas.',
    meta: ['📅 Prazo: 15/10/2026', '📍 Mindelo, São Vicente'],
    action: 'apply', actionLabel: 'Candidatar-se'
  },
  {
    id: 'fa-2026-027', kind: 'concurso', status: 'brevemente', ref: 'Ref. FA-2026/027',
    title: 'Técnicos de Saúde Militar — Serviço de Saúde',
    description: 'Concurso para técnicos de enfermagem e apoio clínico, para reforço da Policlínica Militar e enfermarias regionais.',
    meta: ['📅 Abertura prevista: Nov/2026', '📍 Diversas Regiões'],
    action: 'apply', actionLabel: 'A abrir em breve', disabled: true
  },
  {
    id: 'incorporacao-2026', kind: 'ingresso', status: 'em-curso', ref: '08/09/2026',
    title: '2ª Incorporação Militar 2026 — Centro de Instrução Militar do Morro Branco (CIMMB)',
    description: 'Apresentação dos recrutas convocados para a 2ª Incorporação de 2026, no Centro de Instrução Militar do Morro Branco.',
    meta: ['📅 Apresentação: 08/09/2026', '📍 CIMMB, Morro Branco'],
    action: 'detail', detail: 'incorporacao-2026', actionLabel: 'Ver detalhes'
  },
  {
    id: 'lei-servico-militar', kind: 'legislacao', status: 'consulta', ref: 'Lei nº 6/93',
    title: 'Lei do Serviço Militar — Decreto-Legislativo nº 6/93, de 24 de maio',
    description: 'Diploma legal que regula o Serviço Militar Obrigatório em Cabo Verde.',
    meta: ['⚖ Diploma legal em vigor'],
    action: 'detail', detail: 'lei-servico-militar', actionLabel: 'Ver detalhes'
  },
  {
    id: 'lei-objecao', kind: 'legislacao', status: 'consulta', ref: 'Lei nº 7/93',
    title: 'Objeção de Consciência — Decreto-Legislativo nº 7/93',
    description: 'Regime legal aplicável à objeção de consciência ao Serviço Militar.',
    meta: ['⚖ Diploma legal em vigor'],
    action: 'detail', detail: 'lei-objecao', actionLabel: 'Ver detalhes'
  },
  {
    id: 'programa-soldado-cidadao', kind: 'programa', status: 'consulta', ref: 'PSC',
    title: 'Programa Soldado Cidadão — Formação técnico-profissional para recrutas',
    description: 'Programa de formação cívica e técnico-profissional integrado no percurso de incorporação.',
    meta: ['🎓 Formação para recrutas'],
    action: 'link', href: 'programa-soldado-cidadao.html', actionLabel: 'Saber mais'
  }
];

/* filtros da página: cada um decide que itens mostra */
const CONCURSOS_FILTROS = [
  { key: 'todos',      label: 'Todos',                  test: () => true },
  { key: 'abertos',    label: 'Abertos',                test: c => c.status === 'aberto' },
  { key: 'brevemente', label: 'Brevemente',             test: c => c.status === 'brevemente' },
  { key: 'ingresso',   label: 'Incorporação',           test: c => c.kind === 'ingresso' },
  { key: 'legislacao', label: 'Legislação e programas', test: c => c.kind === 'legislacao' || c.kind === 'programa' }
];
