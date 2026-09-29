---
title: "Criei um servidor MCP para reduzir o uso de tokens do Claude Code — usando o próprio Claude Code"
description: "A história do mcplens: busca semântica local sobre o codebase que corta de 70% a 85% dos tokens gastos pelo Claude Code, sem nuvem e sem API keys."
date: "2026-04-22"
lang: "pt"
tags: ["IA", "Claude Code", "MCP"]
translationKey: "mcplens"
---

Se você usa o Claude Code no dia a dia, provavelmente já notou: ele lê muitos arquivos. Pergunta como funciona a autenticação do seu projeto e ele abre 10, 15, às vezes 20 arquivos antes de responder. Cada um deles custa tokens.

Cansei de ver minha janela de contexto lotando com arquivos que não tinham nada a ver com a pergunta. Então criei uma solução. E criei usando exatamente a ferramenta que estava tentando consertar.

Essa é a história do mcplens — um servidor MCP local que dá ao seu assistente de IA busca semântica sobre o seu codebase, reduzindo o uso de tokens em 70–85%.

Sei que já existem várias ferramentas tentando resolver isso. Mas quis desenvolver a minha — 100% gratuita e 100% privacy-first. Sem nuvem, sem API keys, sem nenhum dado saindo da sua máquina.

## O problema: context retrieval é ingênuo

O Claude Code é brilhante para escrever código. Mas encontrar *qual* código olhar? Aí ele tropeça.

Hoje, quando você pergunta “como funciona o webhook do Asaas?”, o Claude Code faz algo assim:

1. Lê a estrutura de pastas
2. Adivinha quais arquivos são relevantes pelo caminho e nome
3. Lê todos eles — relevantes ou não
4. Finalmente responde sua pergunta

Num projeto médio (~1000 arquivos), uma única query pode consumir 10.000–15.000 tokens só carregando contexto. A maior parte irrelevante.

A causa raiz: o Claude Code usa **recuperação heurística de arquivos**, não compreensão semântica. Ele lê arquivos que *parecem* relevantes, não os que *são* relevantes.

## A solução: RAG para o seu codebase

RAG (Retrieval-Augmented Generation) é a técnica que empresas usam para fazer chatbots “conhecerem” documentos internos. Em vez de carregar tudo, você indexa o conteúdo uma vez e recupera apenas o que é relevante no momento da consulta.

A ideia do mcplens foi simples: aplicar o mesmo padrão ao código.

Em vez do Claude Code ler arquivos diretamente, ele chama uma ferramenta:

```text
search_code("asaas webhook confirmação de pagamento")
→ retorna os 5 chunks mais relevantes
→ ~800 tokens no total
```

Mesma resposta. 93% menos tokens.

## Por que MCP?

MCP (Model Context Protocol) é um padrão aberto da Anthropic que permite que assistentes de IA chamem ferramentas externas. Claude Code, Cursor, Windsurf e Trae suportam nativamente.

O insight principal: servidores MCP se comunicam via **stdio** — o assistente spawna o processo e conversa por pipe. Nenhuma porta pra configurar, nenhum servidor pra iniciar manualmente. Simplesmente funciona quando você abre o editor.

Isso me permitiu construir um servidor que:

- Inicia automaticamente quando o Claude Code abre
- Indexa o codebase em background
- Encerra quando o Claude Code fecha
- Mantém o índice entre sessões

Zero fricção para o usuário.

## Decisões de arquitetura

### Embeddings: Ollama ao invés de OpenAI

A primeira decisão foi onde gerar os embeddings. A escolha óbvia é a API da OpenAI — rápida, precisa, bem documentada. Mas tem dois problemas: custa dinheiro e seu código sai da sua máquina.

Escolhi o [Ollama](https://ollama.ai/) rodando `nomic-embed-text` localmente. Mesma qualidade, custo zero, nenhum dado saindo da sua máquina. O modelo tem 270MB, roda na CPU e gera embeddings rápido o suficiente para re-indexação em tempo real.

Para usuários que preferem embeddings na nuvem, há um fallback pra OpenAI na configuração. Mas local é o padrão e a recomendação.

### Vector store: SQLite, não um servidor de banco

Todo tutorial sobre RAG te aponta para ChromaDB, Pinecone ou Qdrant. Todos exigem um serviço separado rodando.

Usei SQLite com similaridade de cosseno calculada em processo. Nenhum serviço separado, sem Docker necessário no setup básico, um arquivo em disco. Para um codebase com ~5.000 arquivos (~20.000 chunks), a busca de similaridade leva ~50ms em processo. Rápido o suficiente.

### Chunking: AST-aware ao invés de sliding window

A abordagem ingênua de chunking é janela deslizante — pega 60 linhas, overlap de 15, repete. Simples mas impreciso: você acaba cortando funções no meio, perdendo contexto semântico nas bordas.

O mcplens usa `tree-sitter` para chunking baseado em AST. Ele entende a estrutura do código e divide por função, classe ou método — mantendo cada chunk semanticamente completo. Com fallback para janela deslizante em tipos de arquivo que o tree-sitter não suporta (YAML, SQL, Markdown).

A diferença na qualidade da busca é perceptível. Um chunk que contém uma função completa é muito mais fácil de casar semanticamente do que metade de uma função.

### Delta indexing: baseado em hash, não em timestamp

Na inicialização, o mcplens compara um hash SHA-1 de cada arquivo com o hash armazenado. Apenas arquivos alterados são re-indexados. Um projeto com 1.400 arquivos que teve 3 alterações durante a noite leva ~2 segundos para sincronizar na inicialização.

Timestamps são não-confiáveis (operações git os alteram). Hashes são determinísticos.

## O dashboard: vendo o que o seu assistente vê

Uma das coisas mais úteis que adicionei foi um dashboard em tempo real.

![Página Overview do dashboard do mcplens](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*jwyz6i_MUEKdMy4b.png)

O dashboard roda na porta 3333 por padrão, com fallback automático para evitar conflitos quando múltiplos projetos estão abertos simultaneamente. `mcplens dashboard` sempre abre a URL certa.

O dashboard mostra:

- **Sessões ativas** — quantas instâncias do Claude Code estão rodando neste projeto no momento
- **Feed de atividade em tempo real** — cada re-indexação de arquivo conforme acontece, com timestamps
- **Visão geral do índice** — total de arquivos, chunks, tamanho em disco, status do Ollama
- **Playground de busca** — teste queries manualmente e veja os scores de similaridade

## Por que privacidade e custo importam mais do que as pessoas admitem

Vamos ser honestos: quando você usa o Claude Code, seu código já vai para os servidores da Anthropic. Esse é o acordo — você manda contexto, recebe inteligência de volta.

Não tem motivo para mandar para mais lugar nenhum além disso.

Cada embedding gerado pela API da OpenAI manda seu código para mais uma empresa. Cada ferramenta RAG baseada em nuvem adiciona mais um servidor que vê seu codebase. Para desenvolvedores trabalhando em sistemas proprietários, projetos de clientes ou qualquer coisa sob NDA, cada salto adicional é uma preocupação real — mesmo que a maioria não pense nisso até ser tarde demais.

O mcplens foi desenvolvido com um princípio claro: **o desenvolvedor é dono de tudo**. Embeddings são gerados localmente via Ollama. O índice fica no seu disco. Nada sai da sua máquina. Você pode bloquear o mcplens no firewall e ele ainda funciona perfeitamente, porque nunca precisou de internet em primeiro lugar.

O argumento de custo é igualmente importante. Ferramentas de IA para código já são caras. Claude Code, Cursor, créditos de API — vai acumulando. Para desenvolvedores fora dos EUA, a taxa de câmbio piora ainda mais. No Brasil, onde moro, cada dólar desperdiçado em uso de API pesa mais. Queimar 15.000 tokens em leituras de arquivos irrelevantes — quando 1.500 seriam suficientes — não é apenas ineficiente. É dinheiro.

O mcplens não elimina custos de API. Mas reduzir o uso de tokens em 70–85% por query tem um impacto real na sua conta mensal.

## Vendo na prática

Aqui está um exemplo real — pedi pro Claude Code descrever o próprio projeto mcplens usando apenas `search_code`. Sem leitura de arquivos. Ele rodou 4 buscas em paralelo e retornou uma descrição completa e precisa do projeto inteiro — arquitetura, ferramentas, filosofia de design — sem abrir um único arquivo.

Mas esse era um projeto pequeno. Deixa eu mostrar algo mais impressionante.

Rodei o mesmo teste num SaaS de produção multi-tenant — Laravel 12 + SvelteKit 5, ~1.400 arquivos, arquitetura DDD complexa com 8+ domínios. O prompt: *“descreva esse projeto o máximo que puder — arquitetura, exemplos de rotas. Não leia nenhum arquivo, apenas use o search_code.”*

**14 queries. 1.5k tokens. Zero leituras de arquivo.**

Aqui está uma amostra do que foi gerado:

**Fluxo de arquitetura multi-tenant** — identificado corretamente só pelos embeddings:

```text
Requisição HTTP
    → InitializeTenancyByHeaderMiddleware (resolve x-tenant-domain)
    → ResolveTenantMiddleware (injeta tenant_domain no request)
    → Rota tenant (/api/t/...) → contexto do tenant ativo
    → Banco de dados do tenant isolado
```

**Tabela de rotas** — concreta e verificável:

```text
/api/t/enrollments          GET/POST        Listar/criar matrículas
/api/t/enrollments/{id}     GET/PUT/DELETE  CRUD matrícula
/api/t/records              POST/PUT/DELETE Registros de conclusão
```

**Convenções de código** — o tipo de coisa que só existe no CLAUDE.md ou espalhada por dezenas de arquivos:

```text
Services estendem BaseService, sempre retornam ServiceResult
Zero lógica de DB dentro de services (tudo via repository)
Svelte 5 runes exclusivamente (sem Options API)
```

O output completo cobriu rotas de todos os domínios, estrutura do frontend, configuração de WebSocket, camadas de autenticação e comandos de desenvolvimento — tudo gerado inteiramente a partir dos embeddings.

É isso que 1.5k tokens compram com o mcplens. Sem ele, descrever um projeto nesse nível de detalhe exigiria ler dezenas de arquivos — conservadoramente 40–60k tokens.

Mas exploração é só o começo. Aqui está o caso que me convenceu de que isso é mais do que uma ferramenta de busca.

Pedi pro Claude Code planejar uma migração completa de módulo num codebase diferente de produção — mapear todos os arquivos envolvidos, identificar dependências cross-module, sinalizar riscos e produzir um plano de rollout acionável. A instrução foi explícita: **sem leitura de arquivos. Apenas `search_code` e `get_symbol`.**

**45 queries. 5.3k tokens. Zero leituras de arquivo.**

O plano identificou riscos que normalmente só aparecem no meio de uma migração:

- Um fully-qualified class name serializado em logs — quebraria os morphs após o rename
- Jobs enfileirados com referências de classe serializadas — exigiu drenar a fila antes de migrar
- Bindings de service provider que precisavam mover junto com o módulo
- Rotas públicas que não podiam receber middleware JWT
- Migrations de restore com namespaces hardcoded que falhariam silenciosamente

Entregou um rollout em 8 PRs incrementais com checklist de verificação end-to-end.

Esse é o tipo de análise que um desenvolvedor sênior leva dias pra produzir lendo arquivo por arquivo. O Claude Code fez em 3 minutos usando o mcplens — e 5.3k tokens.

Isso não é uma ferramenta de busca. É raciocínio semântico sobre o seu codebase.

## O benchmark: com vs sem

Rodei a mesma tarefa no mesmo codebase de produção duas vezes — uma com mcplens, outra sem. Mesmo projeto, mesmo objetivo: gerar uma descrição arquitetural completa.

Sem o mcplens, o Claude Code leu 80+ arquivos diretamente através de recuperação heurística bruta. Levou cerca de 5 minutos e consumiu entre 120.000 e 150.000 tokens de input.

Com o mcplens, 14 buscas semânticas encontraram exatamente o que era necessário. Tempo: 2 minutos e 48 segundos. Tokens de input: ~45.000.

Isso é aproximadamente 70% menos tokens e 45% mais rápido — na mesma tarefa, mesmo codebase, mesmo modelo.

Esses não são estimativas. São números reais de uma sessão real, reportados pelo próprio Claude Code.

## O que diferencia

Existem outras ferramentas resolvendo esse problema. A maioria exige Python, Rust ou uma conta na nuvem pra começar. O `cocoindex-code` precisa de pipx e sentence-transformers. O `codegraph` exige compilar Rust do zero. O `claude-context` da Zilliz precisa de uma conta no Zilliz Cloud e uma API key da OpenAI antes de indexar um único arquivo.

O mcplens precisa de Node.js — que você quase certamente já tem — e do Ollama para embeddings locais. Só isso.

```bash
npm install -g @vmsfigueredo/mcplens
mcplens init
```

O objetivo nunca foi ser o mais tecnicamente impressionante. Foi ser aquele que um desenvolvedor web consegue instalar em 2 minutos sem brigar com dependências — e sem “vender” seu codebase para mais uma empresa ou startup.

Também funciona com qualquer assistente compatível com MCP — Claude Code, Cursor, Windsurf, Codex. Mesmo servidor, arquivo de configuração diferente. O comando `init` cuida do registro automaticamente para os clientes que você usa.

## Construindo com o Claude Code

Aqui está a parte meta: construí o mcplens usando o Claude Code.

A ironia não me passa despercebida. Estava tentando reduzir o uso de tokens no Claude Code, e usei o Claude Code para construir a solução — queimando tokens no processo.

Mas também validou a abordagem. Quando rodei o mcplens contra seu próprio codebase e perguntei “como funciona a indexação?”, ele retornou exatamente os chunks certos sem ler um único arquivo completo. A ferramenta funcionando em si mesma foi o melhor teste que poderia ter feito.

O processo de desenvolvimento foi basicamente conversas arquiteturais — decidindo entre provedores de embedding, estratégias de chunking, opções de armazenamento — seguidas do Claude Code implementando as decisões. Entendi cada escolha. Só não escrevi cada linha.

É onde estamos com o desenvolvimento assistido por IA em 2026. A habilidade não é digitar código. É saber o que construir e por quê.

## O que vem a seguir

- **Recuperação contextual** — resumos gerados por LLM por chunk para melhor sinal semântico
- **Analytics de tokens** — hooks no ciclo de vida do Claude Code para medir economia real de tokens por sessão

O projeto é open source em [github.com/vmsfigueredo/mcplens](https://github.com/vmsfigueredo/mcplens).

Pronto para testar? Se você tem Node.js e Ollama instalados, são dois comandos:

```bash
ollama pull nomic-embed-text:latest
npx mcplens init
```

Abra seu assistente de IA no projeto e rode `/mcp` para confirmar que está conectado. Só isso.

*Construído com Claude Code. Que é exatamente o motivo pelo qual ele existe.*

---

*Publicado originalmente no [Medium](https://medium.com/@vmsfigueredo/criei-um-servidor-mcp-para-reduzir-o-uso-de-tokens-do-claude-code-usando-o-pr%C3%B3prio-claude-code-a914040f59ba) em 22 de abril de 2026.*
