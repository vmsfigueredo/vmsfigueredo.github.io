# Redesign corporativo + blog Markdown — plano de implementação

> Execução: nativa (implementador único, revisão final da branch). Passos com `- [ ]`.

**Goal:** Trocar o tema terminal pelo visual corporativo aprovado no mockup, com foto, seção de viagens e blog em Markdown.
**Architecture:** SvelteKit estático (adapter-static). Motor do blog server-only reaproveitado do stash, prerender de `/blog` e `/blog/[lang]/[slug]`. UI com Tailwind v4 e tokens CSS por tema.
**Tech Stack:** SvelteKit 2, Svelte 5, Tailwind 4, Vite 5 (versões do lockfile de main), marked, sanitize-html, yaml, node:test.
**Spec:** docs/superpowers/specs/2026-09-28-portfolio-redesign-blog-design.md

## Global Constraints
- Não subir majors de SvelteKit, Vite ou Svelte. `npm ci` a partir do lockfile de main antes de instalar dependências novas.
- `/troco` e `/quanto` intocados. Manter `--font-mono` no `@theme`.
- Nenhuma métrica inventada. Frase da Join: "Lidero o time técnico de uma das maiores plataformas de fiscalização pública da América Latina."
- PT e EN completos. Commits só dos arquivos do redesign; alterações pendentes do Troco ficam fora.

## Review Focus
- Data do post em fuso UTC-3 não pode voltar um dia ("2026-09-18" mostra 18).
- Busca ignora acento e caixa ("lideranca" acha "Liderança").
- Trocar idioma com tag selecionada que não existe no outro idioma volta para "Todos", sem lista vazia.
- Trocar idioma num artigo sem tradução leva para `/blog/`, nunca 404.
- Primeira visita: caminho `/blog/pt/*` vence preferência salva, que vence idioma do navegador; `<html lang>` certo no HTML estático.

## Tasks
- [x] 1. Toolchain e motor do blog: `npm ci`, `marked`/`sanitize-html`/`yaml`/`@types/node` em devDependencies, restaurar `src/lib/server/blog*.js` + testes, `scripts/append-blog-sitemap.js`, `content/posts/*`, `content/templates/post.md`. Teste novo: artigo sem títulos tem TOC vazio; conteúdo real parseia e cada post acha a própria tradução. Scripts `test:content` e `postbuild`.
- [x] 2. Helpers puros com testes: `src/lib/blog/format.js` (`formatPostDate`, `normalizeSearch`, `filterPosts`, `availableTags`, `latestPosts`, `translationTarget`), `src/lib/i18n/lang.js` (`htmlLang`, `resolveInitialLocale`), `src/lib/travel.js` (`project`, `arcPath`, `travelStats`). Stores de tema e idioma passam a iniciar no `onMount` do layout (sem mismatch de hidratação). `src/hooks.server.js` troca `%lang%` do `app.html`.
- [x] 3. Assets: recortes da foto (`vitor.jpg`, `vitor.webp` 1000×1250, `vitor-avatar.webp` 240×240), favicon azul, `world-dots.svg` via `scripts/build-world-map.js`.
- [x] 4. Tokens, shell e landing: `app.css`, `translations.js`, `data.js`, `ui.js`, componentes `Icon`, `ThemeToggle`, `LangToggle`, `Nav`, `Footer`, `Seo`, `SectionHeading`, `Hero`, `Services`, `Projects`, `Experience`, `Travel`, `Contact`, `+error.svelte`. Apagar `TerminalWindow` e `About`.
- [x] 5. Blog: `Writing` na home, `PostCard`, `/blog`, `/blog/[lang]/[slug]`, `Toc`, estilos `.article-body`, `feed.xml`.
- [x] 6. SEO e docs: `og.png` novo, JSON-LD, README e `content/README.md`, remover `static/_mockup/`.
- [x] 7. Verificação: `test:content`, `check`, `build` (arquivos esperados, sitemap com blog, `lang` sem placeholder), browser desktop/mobile, claro/escuro, PT/EN, busca, filtro, artigo, `/troco` antes e depois.
