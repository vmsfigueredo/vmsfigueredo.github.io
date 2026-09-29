---
title: "Multi-tenancy como limite arquitetural no Sigebra"
description: "Como isolamento por tenant, permissões e múltiplos serviços estruturam uma plataforma de gestão escolar com AVA integrado."
date: "2026-09-18"
lang: "pt"
tags: ["Multi-tenancy", "Laravel", "Sigebra"]
translationKey: "sigebra-multi-tenancy"
draft: true
---

O Sigebra é um sistema de gestão escolar multi-tenant com Ambiente Virtual de Aprendizagem integrado. Já foi adotado por seis ou mais escolas e reúne uma API Laravel, uma aplicação web SvelteKit, um worker de background e uma landing page.

## Uma escola é um limite de tenant

O multi-tenancy por domínio isola cada escola em seu próprio tenant. Esse limite importa porque a operação escolar envolve usuários, papéis, conteúdo de cursos, aulas e fluxos dos alunos. A resolução do tenant determina qual escola é responsável pela requisição antes que o trabalho da aplicação continue.

O isolamento também oferece uma regra útil para a arquitetura: dados e operações devem sempre ter um contexto de tenant explícito. Essa regra é mais fácil de revisar do que uma coleção de filtros opcionais de escola adicionados consulta por consulta.

## Autenticação e autorização têm funções diferentes

A autenticação JWT transporta a identidade entre a aplicação web e o worker. Papéis e permissões, implementados com Spatie Permissions, determinam o que essa identidade pode fazer. Separar essas responsabilidades deixa cada decisão de acesso mais clara:

| Responsabilidade | Pergunta |
| --- | --- |
| Tenant | Qual escola é responsável pela operação? |
| Autenticação | Quem fez a requisição? |
| Autorização | O que essa pessoa pode fazer? |

Essas verificações se apoiam, mas nenhuma substitui a outra.

## Um produto, vários serviços

A API, a aplicação web, o worker e a landing rodam como serviços separados e orquestrados com Docker. Esse desenho permite que cada parte tenha uma responsabilidade focada sem deixar de pertencer ao mesmo produto. O OpenAPI documenta o contrato entre os consumidores e o backend Laravel.

O Ambiente Virtual de Aprendizagem segue os mesmos limites. Conteúdos e aulas pertencem ao tenant da escola, e os fluxos dos alunos consomem as mesmas capacidades protegidas da plataforma.

No Sigebra, multi-tenancy não é um filtro adicional aplicado depois do desenho do produto. É um dos primeiros limites usados para pensar sobre cada requisição.
