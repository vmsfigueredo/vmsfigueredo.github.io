---
title: "I built an MCP server to reduce Claude Code token usage — using Claude Code"
description: "The story of mcplens: local semantic search over your codebase that cuts Claude Code token usage by 70–85%, with no cloud and no API keys."
date: "2026-04-22"
lang: "en"
tags: ["AI", "Claude Code", "MCP"]
translationKey: "mcplens"
---

If you use Claude Code daily, you’ve probably noticed something: it reads a lot of files. Ask it how authentication works in your project and it’ll open 10, 15, sometimes 20 files before answering. Every single one of those costs tokens.

I got tired of watching my context window fill up with files that had nothing to do with my question. So I built a fix. And I built it using the exact tool I was trying to fix.

This is the story of mcplens — a local MCP server that gives your AI assistant semantic search over your codebase, cutting token usage by 70–85%.

I know there are already several tools trying to solve this. But I wanted to build my own — 100% free and 100% privacy-first. No cloud, no API keys, no data leaving your machine.

## The problem: context retrieval is broken

Claude Code is brilliant at writing code. But finding *which* code to look at? That’s where it struggles.

Today, when you ask “how does the Asaas webhook work?”, Claude Code does something like this:

1. Reads the folder structure
2. Guesses which files are relevant by their path and name
3. Reads all of them — relevant or not
4. Finally answers your question

On a medium project (~1000 files), a single query can consume 10,000–15,000 tokens just loading context. Most of it irrelevant.

The root cause: Claude Code uses **heuristic file retrieval**, not semantic understanding. It reads files that *look* relevant, not files that *are* relevant.

## The solution: RAG for your codebase

RAG (Retrieval-Augmented Generation) is the technique companies use to make chatbots “know” about internal documents. Instead of loading everything, you index the content once and retrieve only what’s relevant at query time.

The idea for mcplens was simple: apply the same pattern to code.

Instead of Claude Code reading files directly, it calls a tool:

```text
search_code("asaas webhook payment confirmation")
→ returns 5 most relevant code chunks
→ ~800 tokens total
```

Same answer. 93% fewer tokens.

## Why MCP?

MCP (Model Context Protocol) is an open standard by Anthropic that lets AI assistants call external tools. Claude Code, Cursor, Windsurf, and Trae all support it natively.

The key insight: MCP servers communicate via **stdio** — the AI assistant spawns the process and talks to it through a pipe. No ports to configure, no servers to start manually. It just works when you open your editor.

This meant I could build a server that:

- Starts automatically when Claude Code opens
- Indexes the codebase in the background
- Shuts down when Claude Code closes
- Persists the index between sessions

Zero friction for the user.

## Architecture decisions

### Embeddings: Ollama over OpenAI

The first decision was where to generate embeddings. The obvious choice is OpenAI’s API — fast, accurate, well-documented. But it has two problems: it costs money, and your code leaves your machine.

I went with [Ollama](https://ollama.ai/) running `nomic-embed-text` locally. Same quality, zero cost, zero data leaving your machine. The model is 270MB, runs on CPU, and generates embeddings fast enough for real-time re-indexing.

For users who prefer cloud embeddings, there’s an OpenAI fallback in the config. But local is the default and the recommendation.

### Vector store: SQLite, not a database server

Every tutorial about RAG points you to ChromaDB, Pinecone, or Qdrant. All of them require running a separate service.

I used SQLite with cosine similarity computed in-process. No separate service, no Docker required for the basic setup, one file on disk. For a codebase with ~5,000 files (~20,000 chunks), the similarity search takes ~50ms in-process. Fast enough.

### Chunking: AST-aware over sliding window

The naive approach to chunking is a sliding window — take 60 lines, overlap 15, repeat. Simple but imprecise: you end up splitting functions in half, losing semantic context at the boundaries.

mcplens uses `tree-sitter` for AST-aware chunking. It understands code structure and chunks by function, class, or method — keeping each chunk semantically complete. With a sliding window fallback for file types tree-sitter doesn't support (YAML, SQL, Markdown).

The difference in search quality is noticeable. A chunk that contains a complete function is much easier to match semantically than half a function.

### Delta indexing: hash-based, not timestamp-based

On startup, mcplens compares a SHA-1 hash of each file against the stored hash. Only changed files get re-indexed. A project with 1,400 files that had 3 changes overnight takes ~2 seconds to “sync” on startup.

Timestamps are unreliable (git operations change them). Hashes are deterministic.

## The dashboard: seeing what your AI sees

One of the most useful things I added was a real-time dashboard.

![mcplens dashboard overview page](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*e12uSyR4m43nZ2QMlNoEjA.png)

The dashboard runs on port 3333 by default, with automatic fallback to avoid conflicts when multiple projects are open simultaneously. `mcplens dashboard` always opens the right URL.

It shows:

- **Active sessions** — how many Claude Code instances are currently running against this project. Useful when you have multiple terminal windows open.
- **Live activity feed** — every file re-index as it happens, with timestamps. You can watch the index update in real time as you save files.
- **Index overview** — total files, chunks, index size on disk, Ollama connection status.
- **Search playground** — test queries manually and see which chunks come back with what similarity scores. This is invaluable for calibrating `minScore` and `topK` for your specific codebase.

## Why privacy and cost matter more than people admit

Let’s be honest: when you use Claude Code, your code is already going to Anthropic’s servers. That’s the deal — you send context, you get intelligence back.

There’s no reason to send it anywhere else on top of that.

Every embedding generated by OpenAI’s API sends your code to yet another company. Every cloud-based RAG tool adds another server that sees your codebase. For developers working on proprietary systems, client projects, or anything under NDA, each additional hop is a real concern — even if most people don’t think about it until it’s too late.

mcplens was designed with a clear principle: **the developer owns everything**. Embeddings are generated locally via Ollama. The index lives on your disk. Nothing leaves your machine. You can block mcplens in your firewall and it still works perfectly, because it never needed the internet in the first place.

The cost argument is just as important. AI coding tools are already expensive. Claude Code, Cursor, API credits — it adds up fast. For developers outside the US, the exchange rate makes it even worse. In Brazil, where I’m based, every dollar of wasted API usage hits harder. Burning 15,000 tokens on irrelevant file reads — when 1,500 would have been enough — isn’t just inefficient. It’s money.

mcplens doesn’t eliminate API costs. But reducing token usage by 70–85% per query has a real impact on your monthly bill.

## Seeing it in action

Here’s a real example — I asked Claude Code to describe the mcplens project using only `search_code`. No file reads allowed. It ran 4 searches in parallel and came back with a complete, accurate description of the entire project — architecture, tools, design philosophy — without opening a single file.

But that was a small project. Let me show you something more impressive.

I ran the same test on a production multi-tenant SaaS — Laravel 12 + SvelteKit 5, ~1,400 files, complex DDD architecture with 8+ domains. The prompt: *“describe this project as much as you can — architecture, route examples. Don’t read any files, only use search_code.”*

**14 queries. 1.5k tokens. Zero file reads.**

Here’s a sample of what it produced:

**Multi-tenant architecture flow** — identified correctly from embeddings alone:

```text
HTTP Request
    → InitializeTenancyByHeaderMiddleware (resolves x-tenant-domain)
    → ResolveTenantMiddleware (injects tenant_domain into request)
    → Tenant route (/api/t/...) → active tenant context
    → Isolated tenant database
```

**Route table** — concrete and verifiable:

```text
/api/t/enrollments          GET/POST        List/create enrollments
/api/t/enrollments/{id}     GET/PUT/DELETE  Enrollment CRUD
/api/t/records              POST/PUT/DELETE Completion records
```

**Code conventions** — the kind of thing that only lives in a CLAUDE.md or scattered across dozens of files:

```text
Services extend BaseService, always return ServiceResult
Zero DB logic inside services (everything via repository)
Svelte 5 runes exclusively (no Options API)
```

The full output covered routes for every domain, frontend structure, WebSocket setup, authentication layers, and development commands — all generated entirely from embeddings.

That’s what 1.5k tokens buys you with mcplens. Without it, describing a project at this level of detail would require reading dozens of files — conservatively 40–60k tokens.

But exploration is just the beginning. Here’s the case that convinced me this is more than a search tool.

I asked Claude Code to plan a full module migration on a different production codebase — map every file involved, identify cross-module dependencies, flag risks, and produce an actionable rollout plan. The instruction was explicit: **no file reads. Only `search_code` and `get_symbol`.**

**45 queries. 5.3k tokens. Zero file reads.**

The plan it produced identified risks that typically only surface mid-migration:

- A fully-qualified class name serialized in MongoDB logs — would break morphs after rename
- Queued jobs with serialized class references — required draining the queue before migrating
- Service provider bindings that needed to move alongside the module
- Public routes that couldn’t get JWT middleware applied
- Restore migrations with hardcoded namespaces that would silently fail

It delivered an 8-PR incremental rollout with an end-to-end verification checklist.

This is the kind of analysis a senior developer takes days to produce by reading file after file. Claude Code did it in 3 minutes using mcplens — and 5.3k tokens.

That’s not a search tool. That’s semantic reasoning over your codebase.

## The benchmark: with vs without

I ran the same task on the same production codebase twice — once with mcplens, once without. Same project, same goal: generate a complete architectural description.

Without mcplens, Claude Code read 80+ files directly through brute-force heuristic retrieval. It took around 5 minutes and consumed between 120,000 and 150,000 input tokens.

With mcplens, 14 semantic searches found exactly what was needed. Time: 2 minutes 48 seconds. Input tokens: ~45,000.

That’s roughly 70% fewer tokens and 45% faster — on the same task, same codebase, same model.

These aren’t estimates. These are real numbers from a real session, reported by Claude Code itself.

## What makes it different

There are other tools solving this problem. Most of them require Python, Rust, or a cloud account to get started. `cocoindex-code` needs pipx and sentence-transformers. `codegraph` requires compiling Rust from source. `claude-context` from Zilliz needs a Zilliz Cloud account and an OpenAI API key before you can index a single file.

mcplens needs Node.js — which you almost certainly already have — and Ollama for local embeddings. That’s it.

```bash
npm install -g @vmsfigueredo/mcplens
mcplens init
```

The goal was never to be the most technically impressive. It was to be the one a web developer could install in 2 minutes without fighting dependencies — and without “selling” their codebase to yet another company or startup.

It also works with any MCP-compatible assistant — Claude Code, Cursor, Windsurf, Codex. Same server, different config file. The `init` command handles registration automatically for whichever clients you use.

## Building it with Claude Code

Here’s the meta part: I built mcplens using Claude Code.

The irony isn’t lost on me. I was trying to reduce token usage in Claude Code, and I used Claude Code to build the solution — burning tokens in the process.

But it also validated the approach. When I ran mcplens against its own codebase and asked “how does indexing work?”, it returned the exact right chunks without reading a single full file. The tool working on itself was the best test I could have run.

The development process was mostly architectural conversations — deciding between embedding providers, chunking strategies, storage options — followed by Claude Code implementing the decisions. I understood every choice. I just didn’t write every line.

That’s where we are with AI-assisted development in 2026. The skill isn’t typing code. It’s knowing what to build and why.

## What’s next

- **Contextual retrieval** — LLM-generated summaries per chunk for better semantic signal
- **Token analytics** — hooks into Claude Code’s lifecycle to measure actual token savings per session

The project is open source at [github.com/vmsfigueredo/mcplens](https://github.com/vmsfigueredo/mcplens).

Ready to try it? If you have Node.js and Ollama installed, you’re two commands away:

```bash
ollama pull nomic-embed-text:latest
npx mcplens init
```

Open your AI assistant in the project and run `/mcp` to confirm it's connected. That's it.

*Built with Claude Code. Which is exactly why it exists.*

---

*Originally published on [Medium](https://medium.com/@vmsfigueredo/i-built-an-mcp-server-to-reduce-claude-code-token-usage-using-claude-code-250ef7654e47) on April 22, 2026.*
