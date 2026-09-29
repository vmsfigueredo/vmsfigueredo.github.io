---
title: "Projetando a PROVATEC a partir dos domínios"
description: "Como contextos delimitados mantêm inscrições, formulários, pagamentos e administração compreensíveis em uma plataforma Laravel."
date: "2026-09-18"
lang: "pt"
tags: ["Arquitetura", "Laravel", "PROVATEC"]
translationKey: "provatec-domain-architecture"
---

A PROVATEC é uma plataforma de inscrição para uma grande prova anual de certificação médica. O trabalho envolve cadastro de candidatos, formulários configuráveis, pagamentos online e um back office administrativo. Tratar tudo como uma aplicação sem divisões faria cada mudança depender de partes do sistema que não têm relação entre si.

## Limites que acompanham o trabalho

O backend Laravel está organizado em quatro contextos delimitados:

| Contexto | Responsabilidade |
| --- | --- |
| Candidato | Cadastro de médicos e dados da inscrição |
| FormBuilder | Perguntas configuráveis e fluxos de inscrição |
| Pagamento | Fluxos de pagamento online |
| Admin | Operações do back office |

Cada contexto possui seus próprios services, repositories e rotas carregadas automaticamente. O limite dá um lugar claro para cada mudança e aproxima a organização do framework da linguagem do produto.

## Um construtor no lugar de telas fixas

Os requisitos de inscrição podem mudar. O construtor dinâmico permite representar fluxos customizados sem exigir alteração de código para cada variação de formulário. Essa é uma decisão de arquitetura e de produto: a configuração permanece no contexto FormBuilder em vez de espalhar campos condicionais pelas telas do candidato.

## Responsabilidades distintas de armazenamento

A plataforma usa PostgreSQL, MongoDB e Redis. No projeto, o MongoDB mantém a trilha de auditoria, enquanto Laravel sustenta a API principal e os fluxos de mídia. A combinação existe por responsabilidade, não por novidade: dados transacionais, histórico de auditoria e dados operacionais temporários têm necessidades diferentes.

## Evoluir o frontend sem reescrever o domínio

Construí o primeiro frontend em Next.js e depois o migrei para SvelteKit. Separar os limites de domínio ajuda a manter migrações de frontend concentradas na camada de entrega sem alterar os conceitos centrais do negócio.

O resultado é um sistema cuja estrutura explica o negócio que atende. Um novo trabalho começa pelo domínio responsável por ele, e não por uma pasta técnica genérica.
