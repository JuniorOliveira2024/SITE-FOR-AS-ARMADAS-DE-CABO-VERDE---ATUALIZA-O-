# Ligação ao backend — o que foi acrescentado e o que foi alterado

Esta versão parte do **fa-frontend-corrigido-v15** e **não remove nenhum ficheiro, página, imagem, estilo ou texto**.
Todas as páginas HTML são idênticas às do v15, exceto por: (1) as etiquetas `<script>` da ligação ao backend e (2) atributos `data-cms="…"`
em alguns textos do rodapé e do Programa Soldado Cidadão (necessários para esses textos poderem ser editados no painel). Nenhum CSS foi alterado.

## Regra de ouro: o site nunca fica pior do que o seu conteúdo
O conteúdo do frontend (HTML e `js/data/*`) continua a ser a base. A API só substitui uma secção **depois de essa secção ser alterada no painel**
(notícias, concursos, formações, multimédia, documentos, menus, postos, cada lista e cada página institucional). Até lá o site mostra exatamente o que já tinha.
Se o backend estiver desligado ou falhar, o site continua a mostrar o conteúdo do frontend.

## Ficheiros acrescentados (novos)
| Ficheiro | Para quê |
|---|---|
| `src/js/core/api.js` | Pedidos ao backend (timeout, repetição, endereço automático em localhost, `?api=`) |
| `src/js/core/live.js` | Atualização em tempo real: o site atualiza-se quando algo muda no painel |
| `src/js/core/cms.js` | Aplica no HTML o que foi alterado no painel (menus, rodapé, listas, textos, concursos, **linha do tempo da História, contactos e unidades da Estrutura**) |
| `src/js/effects/*.js` | Sistema modular de efeitos visuais (nada é aplicado até ser ativado no painel) |
| `src/pagina.html` | Modelo para páginas novas criadas no painel (`pagina.html?p=<slug>`) |
| `Dockerfile`, `.dockerignore` | Execução em contentor |

## Ficheiros do v15 que foram ajustados (só o necessário para falar com a API)
| Ficheiro | O que mudou |
|---|---|
| `src/*.html` (todas) | Acrescentadas as etiquetas `<script>` de `core/config`, `api`, `live`, `effects/*`, `cms`; atributos `data-cms` no rodapé e no diretor do PSC |
| `src/js/core/config.js` | O efeito sazonal passa a ler o tema pelo cliente da API (antes: `fetch` direto) |
| `src/js/components/backend-integration.js` | Home (notícias, arquivo, concursos, formações, galeria) lê pela API e só substitui secções já editadas; todo o texto vindo da API é escapado |
| `src/js/components/news-filter.js` | Os filtros por categoria funcionam também com cartões e categorias criados no painel |
| `src/js/core/helpers.js` | Artigo vindo do painel: texto escapado, subtítulo, autor, galeria e SEO |
| `src/js/components/archive-toggle.js`, `detail-modal.js` | Botões "Candidatar-se", "Ver detalhes" e "Saber mais" passam a funcionar também em cartões criados pelo painel (delegação de eventos); a janela de detalhes pode vir do painel |
| `src/js/components/course-application.js`, `job-application.js` | Candidaturas gravadas no backend; com o backend ligado só confirmam o que ficou registado |
| `src/js/pages/pesquisa.js` | A pesquisa junta aos resultados do site o conteúdo do painel (notícias, páginas novas, concursos, documentos, postos…) através de `/api/search` (Meilisearch ou base de dados) |
| `src/js/pages/concursos.js` | Lista de concursos lida do painel (depois de editada); estados e rótulos personalizados |
| `src/js/pages/contactos.js` | Mensagem gravada em `/api/contact-messages` (sem backend continua a confirmação de demonstração) |
| `src/js/pages/multimedia.js` | Galeria/carrossel lidos do painel (depois de editados); texto escapado; filtros de categorias novas; publicações de vídeo |
| `src/js/pages/noticias.js` | Notícias do painel (depois de editadas); filtros de categorias novas |
| `src/js/pages/noticia.js` | Notícia do painel com subtítulo, autor, galeria e SEO |
| `src/js/pages/institutional.js` | Páginas, postos e distintivos, datas e galeria dos CEMFA podem vir do painel; fotografias dos CEMFA e distintivos aparecem quando carregados. SEO das páginas do painel; páginas novas em `pagina.html?p=<slug>`. Corrigido o erro que mostrava números soltos (1, 2, 3…) por baixo dos postos |
| `server.js` | Passa a injetar `FA_API_BASE` (variável de ambiente) nas páginas; o resto da lógica de servir páginas é a mesma |
| `README.md` | Acrescentada a secção de ligação ao backend |

## Divisas e imagens do próprio site
As divisas (`assets/images/divisas/*.png`) e as fotografias em `assets/images/` continuam a ser ficheiros do frontend; o painel guarda o caminho de cada uma e permite substituí-las enviando outra imagem (que passa a ter prioridade).

## Imagens e ficheiros enviados no painel (distintivos, notícias, documentos…)
Os endereços são guardados como `/uploads/…` e a API devolve-os completos, com o endereço do próprio backend, pelo que funcionam em qualquer porta.
Em localhost o site **encontra sozinho** o backend (portas 3000–3010; reconhece-o por `/api/health`). Outra porta: `?api=http://localhost:PORTA`.

## Ficheiros que NÃO foram tocados
Todos os CSS, `src/assets/**`, `src/data/**`, `src/js/data/**` (incluindo `comandos-data.js`, `concursos-data.js`, `news-data.js`), `src/js/core/helpers.js`, `i18n.js`,
`reveal.js`, `toast.js`, `src/js/components/mobile-nav.js`, `header-scroll.js`, `media-slots.js`, `lightbox.js`, `search.js` e restantes, `package.json`.


## Conteúdo novo ligado ao backend (MySQL)
Tudo o que foi acrescentado ao site pode agora ser editado no painel (**Páginas do site**), sem programação:

| Parte do site | No painel | Como o site lê |
|---|---|---|
| Mensagem do CEMFA (início e página do CEMFA) | Mensagem do CEMFA | `data-cms="cemfa_message.*"`, `data-cms-paragraphs`, `data-cms-lines` |
| Missão e Visão (3 parágrafos + missões + frases) | Missão e Visão | `data-cms="mission.p1..p3"` + listas `mission_list`, `mission_highlights` |
| Núcleo Fundador (27 membros + fotos) | História e Núcleo Fundador | lista `founders` → `.founders-grid` |
| Crónica (9 capítulos), Arquivo Histórico, Honrar Quem Serviu | História e Núcleo Fundador | listas `history_chapters`, `history_archive`, `heroes` |
| Componentes Especializados (emblemas), Formação Militar, Serviços de Apoio, Regiões | Estrutura | listas `structure_units`, `formation_cards`, `support_cards`, `regions` |
| Linhas diretas e assuntos do formulário | Contactos | listas `quick_contacts`, `contact_subjects` |
| Documentação por categorias (Legislação) | Documentação e legislação / Categorias | `documents` + categorias do tipo `documents` → `#noticias-docs-grid` |
| Menus (Serviço Militar, Multimédia sem submenu) | Menus do site | `navigation` |

Texto simples nas listas: parágrafos separados por linha em branco; linhas começadas por "- " formam uma lista.
