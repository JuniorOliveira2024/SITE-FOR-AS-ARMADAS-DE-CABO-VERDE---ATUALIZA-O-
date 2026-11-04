# Frontend — Forças Armadas de Cabo Verde

Site institucional completo, organizado em ficheiros separados (HTML, CSS e JavaScript modulares), pronto para abrir diretamente no navegador ou publicar em qualquer servidor estático.

## Como abrir

Execute `npm start` e abra `http://localhost:8080` (as páginas ficam na raiz de `src/`, por isso também abrem com Live Server ou duplo clique). Todo o conteúdo (notícias, concursos, formações) já vem incluído como HTML estático de demonstração.

Para publicar num servidor real (Vercel, Netlify, Apache, Nginx, etc.), basta copiar a pasta `src/` inteira para a raiz do servidor.

## Estrutura de pastas

As páginas HTML ficam na raiz de `src/` (ao lado de `css/`, `js/` e `assets/`), por isso funcionam com `npm start`, Live Server, duplo clique no ficheiro ou qualquer servidor estático.

```text
fa-frontend/
├── server.js                   Servidor estático local
├── package.json
└── src/
    ├── *.html                  Páginas públicas do portal (index, historia, estrutura, noticias, noticia, contactos, multimedia, pesquisa, guarda-*, comando-*, ...)
    ├── css/
    │   ├── base/               base.css (variáveis, reset, tipografia única), layout.css, responsive.css
    │   ├── components/         header, footer, modals, cta e page-common (blocos comuns às páginas internas)
    │   ├── sections/           Secções da home: hero, news, institucional, estrutura, concursos, formacao, multimedia, documentos
    │   └── pages/              Estilos específicos de cada página (historia, estrutura, contactos, multimedia, noticias, noticia, institutional)
    ├── js/
    │   ├── core/               config, helpers (datas/notícias dinâmicas), toast, reveal, i18n
    │   ├── components/         Funcionalidades reutilizáveis (mobile-nav, search, lightbox, news-filter, candidaturas, backend-integration, ...)
    │   ├── data/               news-data.js (conteúdo completo das notícias)
    │   └── pages/              Lógica de cada página (contactos, institutional, multimedia, noticia, noticias, pesquisa)
    ├── data/                   Dados de exemplo em JSON (referência/documentação)
    └── assets/images/          Logótipos e imagens locais
```

### Regras de organização

- `src/*.html`: páginas públicas, na raiz de `src/` para os caminhos `css/`, `js/` e `assets/` resolverem em qualquer servidor.
- `src/concursos.html`: página "Todos os Concursos" (botão "Todos os concursos" da home, botão dourado "Concursos Abertos" e menus). Os dados ficam em `src/js/data/concursos-data.js` (acrescente um objeto à lista para publicar um novo concurso); com o backend ligado, junta também os concursos do painel administrativo. Aceita `?status=abertos|brevemente|ingresso|legislacao` e `?q=texto`.
- `src/css/`: `base/base.css` centraliza variáveis, reset e a tipografia global: **Inter** (`--font-site`) no texto corrido e **Barlow** (`--font-display`) nos títulos, números e logotipo; o título da home ("Disciplina, lealdade e serviço à Nação.") mantém a Oswald original. Para trocar a fonte de destaque do site inteiro, altere `--font-display` em `base.css` e o `<link>` do Google Fonts nas páginas.
- `src/js/`: código separado por responsabilidade (core, components, data, pages).
- `src/data/`: JSON de referência e conteúdo de demonstração.
- `src/assets/images/`: imagens locais e logotipos oficiais.

> **Nota sobre `src/data/*.json`:** estes ficheiros documentam os dados de exemplo usados no site (o mesmo conteúdo que já está escrito diretamente no `index.html`). Não são carregados via `fetch()` no `file://`, porque os navegadores bloqueiam esse tipo de leitura por segurança quando não há servidor. Servem como referência clara do "molde" de dados e podem ser usados para semear o backend ou uma futura migração para CMS.

## Ligar ao backend real (opcional)

Por omissão, o site funciona 100% com o conteúdo estático incluído. Para que **Notícias**, **Concursos** e as **candidaturas de formação** passem a usar a base de dados real do backend (ver pasta `fa-backend`), edite `src/js/core/config.js`:

```js
window.FA_API_BASE = 'https://o-seu-backend.vercel.app';
```

### A partir daí

- Notícias e Concursos passam a ser carregados da API (`backend-integration.js`), mantendo o conteúdo estático como reserva caso a API esteja indisponível.
- As candidaturas às formações do Programa Soldado Cidadão (`course-application.js`) passam a ser guardadas de verdade na base de dados, visíveis no painel administrativo do backend.

## Funcionalidades incluídas

- Navegação com mega-menu, destaque automático da secção atual (scrollspy), menu mobile e pesquisa interna
- Seletor de idioma real (PT / EN / FR) para todo o "chrome" do site
- Filtros de notícias por categoria, grelha limitada a 5 notícias em destaque + aba "Notícias Mais Antigas" com o arquivo
- **Página de notícia dedicada** (`noticia.html?id=...`) — clicar em "Ler mais" abre uma página própria com imagem, data e texto completo, não apenas um resumo
- Candidatura às formações do Programa Soldado Cidadão, e agora também **candidatura aos Concursos Públicos**, com campo "É militar no ativo?" para concursos internos abertos tanto a civis como a militares em serviço
- **Página completa do Programa Soldado Cidadão** ("Saber mais") com cursos abertos, direção do programa, carrossel de fotos dos alunos e faixa de entidades parceiras em movimento contínuo
- **Detalhes de concursos e legislação** ("Ver detalhes") apresentados num leitor dedicado, com informação completa sobre o assunto
- Galeria multimédia com lightbox, e gerível a partir do backend (ver `fa-backend`), incluindo agora também as formações do PSC
- **Efeitos sazonais do site** (neve de Natal, aniversário da instituição, confettis, corações) — controlados a partir do painel administrativo, em `js/config.js` / módulo de efeitos. Pode pré-visualizar qualquer efeito localmente com `?efeito=neve`, `?efeito=aniversario`, `?efeito=confetti` ou `?efeito=coracoes` na URL
- Site 100% responsivo, testado e sem overflow horizontal em ecrãs desde 320px (telemóveis pequenos) até 1920px (ecrãs grandes)
- Consulta de situação militar (simulação informativa, com aviso claro no ecrã)
- Totalmente responsivo (desktop, tablet, mobile)

## Compatibilidade

Testado visualmente em Chrome, Safari e Firefox recentes. Usa `IntersectionObserver`, `fetch` e CSS Grid — todos suportados em qualquer navegador atualizado nos últimos anos.

### Fontes e efeitos (resumo)
- Texto corrido: Inter · Títulos: Barlow (`--font-display`) · Título da home: Oswald · Secção de concursos: Montserrat (`--font-concursos`, em `css/sections/concursos.css`).
- Cards de Estrutura (`css/sections/estrutura.css`): efeito ao passar o mouse / focar com o teclado (sobe, sombra, zoom na foto, linha dourada, "Ver mais →"). Só em dispositivos com mouse; respeita `prefers-reduced-motion`.

### Órgãos e Comandos, Regiões Militares e Ministro da Defesa
- O conteúdo das páginas de comandos (Guarda Nacional, Guarda Costeira, Comando do Pessoal, Comando da Logística, Escola Militar, CIMMB, Inspeção, DIM, CPEM, Guarnição, Oficina Central) e da página **`ministro-defesa.html`** está em **`src/js/data/comandos-data.js`**. É lá que se atualizam nomes, postos e datas quando houver mudança de comando ou de Governo.
- **Fotografias dos comandantes e brasões das 1ª, 2ª e 3ª Regiões Militares**: copie o ficheiro para `assets/images/comandantes/` ou `assets/images/brasoes/` com o nome indicado em `assets/images/LEIA-ME-IMAGENS.txt` (ex.: `rm1.jpg`, `rm1.png`). Não é preciso editar código; sem ficheiro, aparece um espaço reservado.
- Fontes da pesquisa: Decreto-Lei n.º 12/2026 (orgânica das FA), Boletim Oficial (Despachos n.º 9 e 10/2026), fa.gov.cv e governo.cv. Confirme sempre os nomes com o Estado-Maior antes de publicar.
- Nome da instituição no header: fonte Cinzel (`--font-brand` em `css/base/base.css`).

### Estrutura, História, Multimédia e novas abas (out/2026)
- **Estrutura** (`estrutura.html`): cadeia de comando (PR → Ministro da Defesa Nacional → CEMFA → Vice-CEMFA), logotipos dos ramos, Serviço de Saúde dentro do Comando do Pessoal, brasões das Regiões Militares e **mapa ilustrativo em SVG** (formas simplificadas, `js/pages/estrutura.js` liga a legenda ao mapa), e 5 componentes especializados com ícones SVG.
- **Logotipo da Guarda Costeira**: `assets/images/brasoes/guarda-costeira.png` (aparece em Estrutura e em História). Brasão da República e logotipo do Ministério da Defesa Nacional: `assets/images/governo/`.
- **História**: fotografias em `assets/images/historia/amilcar-cabral.jpg`, `farp-1975.jpg` e (opcional) `combatente-desconhecido.jpg`; sem ficheiro aparece um espaço reservado (o Combatente Desconhecido tem um emblema memorial por defeito).
- **Multimédia**: carrossel "Galeria em Apresentação" (autoplay com pausa, setas, miniaturas, teclado, gestos de arrastar e ecrã inteiro) alimentado pelos mesmos itens da galeria.
- **Vice-CEMFA** (`vice-cemfa.html`) e **Comando da Guarnição** (`comando-guarnicao.html`): dados em `js/data/comandos-data.js`.

### História — fotografias e crónica
- Fotografias das molduras "Honrar Quem Serviu": `assets/images/historia/amilcar-cabral.jpg`, `farp-1975.jpg` e `combatente-desconhecido.jpg` (já inseridas).
- Crónica "História das Forças Armadas de Cabo Verde" (9 capítulos, com índice lateral que realça o capítulo em leitura): `historia.html`, secção `#cronica`, estilos em `css/pages/historia.css`, índice em `js/pages/historia.js`. O texto é o fornecido, sem alterações.

### Postos e Distintivos — divisas
- As 28 divisas estão em `assets/images/divisas/` e ligadas aos postos em `js/data/divisas-data.js` (chave `shared` = postos comuns à Guarda Nacional e à Guarda Costeira; `Guarda Nacional` / `Guarda Costeira` = postos próprios, incluindo Sargento-Mor e Cabo-Mor).
- Para trocar uma divisa, substitua o ficheiro com o mesmo nome. Postos sem divisa fornecida (Oficiais-Generais e Superiores da GN, Contra-Almirante e Comodoro da GC, Soldado) mantêm o espaço reservado.


## Ligação ao backend (painel administrativo)

O site funciona sozinho com o conteúdo que está nas páginas. Ligado ao backend (`fa-backend`), tudo o que se adiciona, altera, oculta ou elimina no painel
aparece aqui — notícias, concursos, formações, multimédia, documentos, menus, rodapé, contactos, textos, páginas institucionais, postos e distintivos,
datas, galeria dos CEMFA, parceiros, redes sociais e efeitos — **em poucos segundos e sem recarregar a página**.

> Lista completa do que foi acrescentado/ajustado nesta ligação: [`LIGACAO-BACKEND.md`](LIGACAO-BACKEND.md). Nada do conteúdo do site foi removido: **o site só usa a API numa secção depois de ela ser alterada no painel**.

**Endereço do backend** (`core/api.js` resolve-o sozinho, por esta ordem):
1. `window.FA_API_BASE` — definido em `src/js/core/config.js`, ou injetado pelo `server.js`/Docker com a variável `FA_API_BASE`;
2. `?api=http://localhost:3001` no endereço da página (fica guardado no navegador; `?api=off` apaga) — útil se o backend usar outra porta;
3. em `localhost` / `127.0.0.1`: o site **procura sozinho** o backend nas portas 3000–3010 (reconhece-o por `/api/health`; ignora outros programas na mesma porta).

Em produção defina `FA_API_BASE` (ex.: `https://api.o-seu-dominio.cv`) e coloque o endereço do site em `ALLOWED_ORIGINS` no `.env` do backend.
A consola do navegador (F12) mostra `[FA] Backend em …` e, se não conseguir falar com ele, a causa provável.

Como funciona:
- `core/api.js` faz os pedidos (timeout de 8 s, uma repetição automática). Se a API falhar, **o conteúdo estático mantém-se**: a página nunca fica vazia.
- `core/live.js` consulta `/api/version` de ~15 em ~15 s e quando o separador volta a ficar visível; se mudou, os módulos voltam a pedir só os dados afetados
  (sem tocar em formulários abertos). Mudar/remover um efeito já aplicado recarrega a página apenas quando o visitante está parado.
- `core/cms.js` aplica menus, rodapé, contactos, textos, indicadores, comandos, órgãos, parceiros, pilares, redes sociais, documentos e concursos.
  **Cada secção só é substituída depois de alterada no painel** (o conteúdo do frontend continua a ser a base).
- `pages/institutional.js` usa as páginas, postos/distintivos, datas e galeria dos CEMFA do painel (`js/data/comandos-data.js` serve de reserva).
- `pages/concursos.js` e a secção de concursos da home usam os concursos do painel (tipo, estado, referência, linhas de informação, botão, detalhes).
- Formulários de candidatura e de contactos gravam no backend; com o backend ligado só confirmam o que ficou realmente registado.
- Todo o texto vindo da API é escapado antes de entrar no HTML.

**Páginas novas:** crie-as no painel (Páginas) e ligue-as nos Menus com o endereço `pagina.html?p=<slug>`.

**Efeitos visuais** (`src/js/effects/`): nada é aplicado por defeito. Ative/configure no painel (tipo, alvo CSS, duração, atraso, direção, intensidade).
Tipos: fade, slide, zoom, parallax, hover, reveal, loading. Para um tipo novo crie `effects/<tipo>.js` e registe-o com
`FA_EFFECTS.register('<tipo>', (elementos, opcoes) => …)`. Respeita `prefers-reduced-motion`.

**Docker:** `Dockerfile` incluído. Com o `docker-compose.yml` do `fa-backend`, `docker compose --profile frontend up -d --build` serve o site em
<http://localhost:8080> já ligado ao backend.

**Sempre que alterar as páginas ou os dados deste frontend** (novas páginas, concursos, comandos…), no `fa-backend` execute `npm run db:sync`:
traz o conteúdo novo para a base de dados sem substituir o que já editou no painel.

**Pesquisa:** `pesquisa.html` pesquisa o conteúdo do próprio site e, com o backend ligado, também o conteúdo do painel (Meilisearch ou base de dados).
**Listas editáveis no painel:** além das já indicadas, os marcos da História, as linhas diretas e o diretório da página Contactos e as unidades da página Estrutura.

## MASTER PAGE — navbar e footer partilhados (`src/master.html`)

A barra de navegação (topbar + menu + menu móvel + pesquisa) e o rodapé existem **apenas** em `src/master.html`.
Todas as páginas limitam-se a ter `<div id="master-navbar"></div>` e `<div id="master-footer"></div>` e a carregar
`js/core/master-data.js` + `js/core/master.js`, que preenchem esses dois espaços antes dos restantes scripts.

- Para alterar o menu ou o rodapé de **todas** as páginas: edite `src/master.html` e execute `node build-master.js`
  (o `npm start` já o executa automaticamente) — isto regenera `src/js/core/master-data.js`.
- Uma página nova só precisa dos dois `<div>` acima e das duas linhas de `<script>` (ver `servico-militar.html`).

### Incorporação de Recrutas (`servico-militar.html`)
Dados em `src/js/data/incorporacao-data.js`: edite `INCORPORACAO_ATUAL` (nome, local, data de apresentação, juramento).
A fase em curso e a linha de etapas são calculadas a partir das datas (ou fixadas em `fase`, de 1 a 5).
