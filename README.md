# vitorfigueredo.dev

Site pessoal e blog do Vitor Figueredo. SvelteKit com export estático, Tailwind CSS v4, bilíngue PT-BR e EN, tema claro e escuro.

## Rodar

```bash
npm install
npm run dev
```

```bash
npm run test:content   # testes do blog, datas, idioma e mapa
npm run check          # svelte-check
npm run build          # gera ./build e acrescenta o blog ao sitemap
npm run preview        # serve o build localmente
```

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Textos da interface (PT e EN) | `src/lib/i18n/translations.js` |
| Experiência, projetos, formação, contatos | `src/lib/data.js` |
| Países do mapa de viagens | `src/lib/travel.js` |
| Cores, fonte e estilos do artigo | `src/app.css` |
| Artigos do blog | `content/posts/*.md` (veja `content/README.md`) |
| Currículos em PDF | `resume/*.md`, depois `npm run resume` |
| Imagem de compartilhamento | `scripts/og/og.html` gera `static/og.png` |
| Mapa pontilhado | `scripts/build-world-map.js` gera `static/world-dots.svg` |

`/troco` e `/quanto` são páginas de produto independentes, com estilos próprios.

## Deploy

Push na `main` dispara `.github/workflows/deploy.yml`, que roda `npm ci` e `npm run build` e publica `build/` no GitHub Pages. O domínio fica em `static/CNAME`.
