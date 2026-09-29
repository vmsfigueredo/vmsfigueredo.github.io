# Como publicar um artigo

Publicar é commitar um arquivo Markdown nesta pasta. O deploy do GitHub Pages gera a página, o RSS e o sitemap.

1. Copie `content/templates/post.md` para `content/posts/`.
2. Dê o nome `<slug>.<idioma>.md`. O slug usa letras minúsculas, números e hífens. O idioma é `pt` ou `en`.
   Exemplo: `content/posts/lideranca-tecnica.pt.md` vira `/blog/pt/lideranca-tecnica/`.
3. Preencha o frontmatter:

```yaml
---
title: "Título do artigo"
description: "Uma frase curta. Aparece nos cards, no Google e no RSS."
date: "2026-09-28"
lang: "pt"
tags: ["Arquitetura", "Laravel"]
translationKey: "chave-compartilhada-pt-en"
draft: true
# cover: "/images/blog/capa.webp"
---
```

4. Escreva o texto em Markdown. Títulos `##` e `###` entram no índice lateral. Tabelas, listas, citações e blocos de código funcionam.
5. Para ter a versão em inglês, crie `<outro-slug>.en.md` com o mesmo `translationKey`. O artigo ganha o link "Read in English".
6. Enquanto escreve, deixe `draft: true`. Para publicar, apague a linha ou use `draft: false`.
7. Rode antes de commitar:

```bash
npm run test:content
```

O teste recusa campos desconhecidos, datas inválidas, slugs repetidos e `translationKey` repetido no mesmo idioma.

Regras que valem sempre:

- Rascunhos e artigos com data futura ficam fora do site. Um artigo com data futura aparece no primeiro deploy a partir daquela data.
- O HTML gerado é sanitizado. Scripts e links `javascript:` são removidos.
- Imagens de capa ficam em `static/images/blog/` e são referenciadas como `/images/blog/arquivo.webp`.
- Em `npm run dev`, reinicie o servidor depois de criar ou editar um artigo.
- Para revisar rascunhos no navegador sem publicar, rode `BLOG_DRAFTS=1 npm run dev`. O build do deploy nunca mostra rascunhos.
