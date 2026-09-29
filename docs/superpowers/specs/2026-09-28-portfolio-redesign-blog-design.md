# Redesign do portfólio + blog em Markdown

Data: 2026-09-28. Mockup aprovado em `static/_mockup/` (descartável, apagar ao final).

## Objetivo

Site de apresentação pessoal, profissional e convidativo. Recrutador, cliente ou gestor sem base técnica entende em segundos quem é o Vitor e o que ele faz. Sai o tema terminal (monospace, prompts `$`, janela de terminal, grid de fundo, paleta GitHub dark). Entra o visual "corporativo limpo" do mockup, a foto do Vitor e um blog publicado por arquivos Markdown.

## Escopo

**Dentro:** landing `/`, blog `/blog`, artigo `/blog/[lang]/[slug]`, `/feed.xml`, sitemap, nav, footer, meta/SEO, favicon e imagem OG novos, i18n PT/EN, tema claro/escuro, foto otimizada.

**Fora:** `/troco/*` e `/quanto/*` ficam intocados (CSS próprio, não usam os tokens compartilhados). Sem CRUD, sem editor, sem backend, sem formulário de contato com servidor, sem analytics.

## Direção visual

- Fonte Inter (Google Fonts, pesos 400 a 800), fallback `system-ui`. Monospace só dentro de `<code>`.
- Padrão claro. Toggle system/light/dark mantido com o store existente em `src/lib/theme`.
- Tokens claro: `bg #ffffff`, `bg-alt #f8fafc`, `border #e2e8f0`, `fg #0f172a`, `muted #475569`, `muted-2 #64748b`, `accent #2563eb`, `accent-hover #1d4ed8`, `accent-soft #eff6ff`, `accent-ring #bfdbfe`.
- Tokens escuro: `bg #0b1220`, `bg-alt #111a2e`, `border #1e293b`, `fg #e2e8f0`, `muted #94a3b8`, `muted-2 #7c8aa0` (contraste AA sobre o fundo), `accent #60a5fa`, `accent-hover #93c5fd`, `accent-soft rgba(96,165,250,.12)`, `accent-ring rgba(96,165,250,.35)`. A faixa de contato, escura no claro, usa `bg-alt` com borda no escuro.
- Tokens auxiliares: `surface` (fundo de card), `border-strong` (hover e pontos do mapa), `on-accent` (texto sobre azul), `band`, `band-fg`, `band-muted` (faixa de contato).
- Raio 16px em cards, 24px na foto e na faixa de contato. Sombras suaves. Cards sobem 2px no hover.
- Animação `reveal` (fade-up ao entrar na tela) mantida, discreta, respeitando `prefers-reduced-motion`.
- Removidos: `TerminalWindow.svelte`, caret piscante, typewriter, grid de fundo, scrollbar custom.

## Landing `/`

1. **Nav sticky**: marca (ponto azul + "Vitor Figueredo"), links Sobre / Projetos / Experiência / Blog / Contato, toggle PT/EN, toggle tema, botão "Baixar currículo" (PDF do idioma ativo). Mobile: hambúrguer com menu vertical.
2. **Hero**: eyebrow "Tech Lead · Desenvolvedor Full Stack Sênior", H1 "Olá, eu sou o Vitor. Construo sistemas que empresas confiam." (última frase em azul), parágrafo lead, CTAs "Ver projetos" (primário) e "Fale comigo", linha de confiança com 3 números (10+ anos, 2× promovido a Tech Lead, PT · EN). À direita, foto 4:5 com card flutuante "Atualmente · Tech Lead na Join Tecnologia".
3. **Como eu ajudo**: 3 cards com ícone SVG inline: Liderança técnica, Sistemas completos, Arquitetura e integrações. Texto sem jargão.
4. **Projetos**: 3 cards (Sigebra, PROVATEC, NavFin): papel, nome, número de impacto (6+ escolas, 2 versões, 5 serviços), resumo em linguagem simples, tags de stack, "Ver detalhes" abre um `<details>` nativo com os highlights técnicos atuais.
5. **Experiência + Formação** lado a lado: timeline (ponto azul no cargo atual, badge "atual"), lista de formação e idiomas (inglês com link do certificado).
6. **Fora do código**: hobby de viajar. Título "Qualidade entregue remotamente, de onde eu estiver." Texto curto, três números (países, continentes, "100% remoto desde 2022") e mapa-múndi pontilhado com arcos saindo de Brasília até cada país visitado.
7. **Blog**: 3 artigos mais recentes do idioma ativo + botão "Ver todos os artigos". Seção some se o idioma não tem posts.
8. **Contato**: faixa escura com título "Vamos conversar?", texto curto, 3 linhas de ação (e-mail, WhatsApp, LinkedIn). Botão copiar mantido no e-mail e telefone.
9. **Footer**: © ano · nome, "Brasília, Brasil · Disponível remoto", link RSS.

## Copy

- Primeira pessoa, frases curtas, sem jargão fora das tags e dos detalhes expansíveis.
- Frase da Join (hero e timeline): "Lidero o time técnico de uma das maiores plataformas de fiscalização pública da América Latina."
- Nenhuma métrica inventada. Só as três acima, já presentes no repositório.
- PT e EN completos. Strings de interface em `src/lib/i18n/translations.js`. Dados de CV continuam em `src/lib/data.js`, ganhando por projeto um `summaryPlain` (resumo leigo) e um `stat`, e por experiência um `blurb` de uma frase para a timeline. Bullets técnicos atuais ficam nos detalhes expansíveis.

## Mapa de viagens

- Dados em `src/lib/travel.js`: base (Brasília) e lista de países visitados com código, continente, nome PT/EN e coordenada de uma cidade. Editar a lista é o único passo para adicionar um país.
- Lista inicial: Brasil (base) e França. O Vitor completa a lista depois.
- Fundo: `static/world-dots.svg`, mapa equirretangular em pontos (grade de 2°, latitudes 84 a -58), gerado uma vez por `scripts/build-world-map.js` a partir do Natural Earth (`world-atlas`, `topojson-client`, `d3-geo` instalados sem salvar no `package.json`). Aplicado como `mask-image`, então a cor segue o tema.
- Sobreposição SVG inline no mesmo sistema de coordenadas: arcos quadráticos de Brasília até cada país, marcador com halo em cada país, marcador pulsante na base, `<title>` com o nome do país. Arcos se desenham ao entrar na tela; sem animação com `prefers-reduced-motion`.
- Legenda com chips: base e países. O SVG tem `role="img"` e `aria-label` listando os países.

## Blog `/blog`

Cabeçalho (kicker "Blog", H1 "Notas de quem constrói e lidera.", lead), busca client-side (título, descrição, tags), filtros por tag (botões `aria-pressed`), linha com contagem e link "N in English" / "N em português", grid de cards (tag principal, data, tempo de leitura, título, descrição, tags). Estado vazio para busca sem resultado.

A página é prerenderizada com os posts dos dois idiomas; o cliente mostra os do locale ativo.

## Artigo `/blog/[lang]/[slug]`

Link "← Todos os artigos", tags, H1, descrição, byline (avatar com a foto, nome, data por extenso, tempo de leitura), link "Read in English →" / "Ler em português →" quando existe tradução. Layout em duas colunas: índice lateral sticky (h2 e h3, item ativo destacado via IntersectionObserver) e prosa (parágrafos, listas, tabelas com scroll horizontal, citação com borda azul, código inline e bloco escuro, imagens responsivas). No fim: card do autor e CTA "Copiar link" + "Fale comigo". Mobile: índice vira lista acima do texto.

Se o slug não existe no idioma: 404.

## Motor do blog

- Fonte: `content/posts/<slug>.<lang>.md`. Publicar = commitar o arquivo; o build do GitHub Pages faz o resto.
- Frontmatter YAML: `title`, `description`, `date` (YYYY-MM-DD), `lang` (`pt` | `en`), `tags[]`, `translationKey`, opcionais `draft` e `cover`.
- Reaproveitar do stash `stash@{0}` ("uncommitted redesign + blog + troco changes"): `src/lib/server/blog.js`, `blog-parser.js`, `blog-output.js`, os dois `*.test.js`, `scripts/append-blog-sitemap.js`, `src/routes/feed.xml/+server.js`, `content/posts/*` (6 posts) e `content/templates/post.md`. Adaptar só o que o build atual exigir.
- Dependências novas: `marked`, `sanitize-html`, `yaml`. Não subir majors de SvelteKit, Vite ou Svelte.
- Regras: slug = nome do arquivo sem `.<lang>.md`; `draft: true` ou data futura ficam fora; HTML sanitizado; tempo de leitura = palavras / 200; posts ordenados por data desc.
- Prerender: `entries()` em `/blog/[lang]/[slug]` gera todas as rotas a partir dos posts. Landing carrega os 3 últimos por idioma em `+page.server.js`.
- `postbuild` roda `scripts/append-blog-sitemap.js` para incluir `/blog` e cada artigo no `build/sitemap.xml`.
- Script `test:content` com `node --test`.

## SEO e meta

- Title e description por página e idioma. Canonical por página. Posts com tradução recebem `<link rel="alternate" hreflang>`.
- JSON-LD `Person` mantido na landing; `BlogPosting` no artigo.
- `static/og.png` regenerada com o visual novo (nome, cargo, foto) em 1200×630, capturada do browser a partir de um HTML descartável.
- `static/favicon.svg` novo: "V" branco em quadrado azul arredondado.
- `robots.txt` e `sitemap.xml` estáticos mantidos; sitemap ganha as URLs do blog no build.

## Foto

Origem: `scratchpad/photo/vitor-original.jpg` (1125×2000). Gerar com `sips` + `cwebp`:

- `static/vitor.jpg` e `static/vitor.webp`: recorte 4:5 centrado no rosto, 1000×1250, para o hero.
- `static/vitor-avatar.webp`: quadrado 240×240 no rosto, para byline e card do autor.
- OG usa o mesmo recorte do hero.

Nenhum arquivo original com 2000px vai para o repositório.

## Estrutura de arquivos

- `src/app.css`: novos tokens e base; remover estilos do terminal. Manter o token `--font-mono` no `@theme`, porque `troco.css` o consome.
- `src/lib/components/`: `Nav`, `Hero`, `Services`, `Projects`, `Experience`, `Travel`, `Writing`, `Contact`, `Footer`, `PostCard`, `Toc`, `ThemeToggle`, `LangToggle`, `Seo`, `SectionHeading`, `Icon`. Apagar `TerminalWindow.svelte` e `About.svelte`.
- `src/lib/travel.js`, `static/world-dots.svg`, `scripts/build-world-map.js`.
- `src/routes/+error.svelte`: página de erro no visual novo (404 de artigo inexistente).
- `src/hooks.server.js`: `lang` do `<html>` por rota (`pt-BR` em `/blog/pt/*`, `en` no resto).
- `src/lib/server/`: motor do blog (do stash).
- `src/routes/blog/`: `+layout.js`, `+page.server.js`, `+page.svelte`, `[lang]/[slug]/+page.server.js`, `[lang]/[slug]/+page.svelte`.
- `src/routes/feed.xml/+server.js`.
- `content/posts/`, `content/templates/post.md`, `content/README.md` (como publicar).
- `static/_mockup/` apagado ao final.

## Acessibilidade e movimento

Contraste AA nos dois temas. Foco visível em links e botões. `<details>` nativo para os detalhes técnicos. Busca com `<label>`. Toggles com `aria-label` e `aria-pressed`. Hambúrguer com `aria-expanded`. `prefers-reduced-motion` desliga o `reveal`.

## Verificação

- `npm run test:content` passa.
- `npm run check` sem erros.
- `npm run build` gera `build/index.html`, `build/blog/index.html`, `build/blog/pt/<slug>/index.html`, `build/blog/en/<slug>/index.html`, `build/feed.xml`, `build/sitemap.xml` com URLs do blog.
- Browser: desktop 1280 e mobile 375, claro e escuro, PT e EN, navegação por âncoras, busca, filtro, artigo, índice lateral, link de tradução, download do currículo.
- `/troco` antes e depois: conteúdo da página idêntico em screenshot. Elementos globais do documento (favicon, `theme-color`, scrollbar) podem mudar, porque vinham do tema terminal.

## Fora de escopo, explícito

Editor ou CRUD de posts, comentários, newsletter, analytics, formulário de contato com backend, página de projeto individual.
