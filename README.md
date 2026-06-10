# vitorfigueredo.dev

Personal portfolio — terminal/dev aesthetic. Built with **SvelteKit** (static export) + **Tailwind CSS v4**. Bilingual **EN / PT-BR**.

## Stack

- SvelteKit + `adapter-static` (fully prerendered, no server)
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Svelte 5 runes
- i18n via a small store + translation map (`src/lib/i18n`)

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # outputs to ./build
npm run preview  # serve the production build locally
```

## Content

- UI strings + CV text: `src/lib/i18n/translations.js`
- Structured CV data (experience, skills, education): `src/lib/data.js`
- Contact / resume links: `contact` object in `src/lib/data.js`
- Resume source (editable): `resume/resume.en.md`, `resume/resume.pt.md`
- Resume PDFs served from `static/` — regenerate after editing the MD:

```bash
npm run resume   # md-to-pdf → overwrites the two static/ PDFs
```

- Social share image source: `resume/og.svg` → regenerate `static/og.png` with:

```bash
npx sharp-cli --input resume/og.svg --output static/og.png resize 1200 630
```

> **Custom domain:** `static/CNAME` holds `vitorfigueredo.dev`. Point an `A`/`CNAME`
> DNS record at GitHub Pages and enable HTTPS in repo settings.

## Deploy — GitHub Pages

This is configured for a **user/org site** (`<user>.github.io`, served at root `/`).

1. Push to the `main` branch of your `<user>.github.io` repo.
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and deploys automatically.

> **Project site instead?** (repo like `portfolio`, served at `/portfolio/`)
> Set `kit.paths.base = '/portfolio'` in `svelte.config.js` and make resume hrefs in
> `src/lib/data.js` base-aware.
