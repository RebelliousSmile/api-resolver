---
name: codebase-structure
description: Project structure documentation
argument-hint: N/A
scope: all
---

# Codebase Structure

```mermaid
---
title: api-resolver — Structure cible
---
flowchart TD
    Root["api-resolver/"]
    Src["src/"]
    Server["src/server.js"]
    Routes["src/routes/"]
    Resolve["routes/resolve.js"]
    Resolvers["src/resolvers/"]
    Index["resolvers/index.js"]
    OgImage["resolvers/og-image.js"]
    LargestImg["resolvers/largest-img.js"]
    DataSrc["resolvers/data-src.js"]
    NextData["resolvers/next-data.js"]
    PlaywrightR["resolvers/playwright.js"]
    Lib["src/lib/"]
    FetchHtml["lib/fetch-html.js"]
    ValidateUrl["lib/validate-url.js"]
    EnvExample[".env.example"]
    PkgJson["package.json"]
    AiddDocs["aidd_docs/"]
    DotClaude[".claude/"]

    Root --> Src
    Root --> EnvExample
    Root --> PkgJson
    Root --> AiddDocs
    Root --> DotClaude

    Src --> Server
    Src --> Routes
    Src --> Resolvers
    Src --> Lib

    Routes --> Resolve
    Resolvers --> Index
    Resolvers --> OgImage
    Resolvers --> LargestImg
    Resolvers --> DataSrc
    Resolvers --> NextData
    Resolvers --> PlaywrightR
    Lib --> FetchHtml
    Lib --> ValidateUrl
```

## Fichiers clés

- `src/server.js` — bootstrap Fastify, enregistrement plugins et routes
- `src/routes/resolve.js` — handler `POST /resolve`, validation schéma Ajv
- `src/resolvers/index.js` — orchestrateur de la cascade (s'arrête au premier succès)
- `src/resolvers/og-image.js` — étape 1 : balise `og:image`
- `src/resolvers/largest-img.js` — étape 2 : plus grande `<img>` dans le DOM
- `src/resolvers/data-src.js` — étape 3 : attribut `data-src`
- `src/resolvers/next-data.js` — étape 4 : blob `__NEXT_DATA__`
- `src/resolvers/playwright.js` — étape 5 (fallback) : rendu Playwright
- `src/lib/fetch-html.js` — fetch avec timeout global 8s via `undici`
- `src/lib/validate-url.js` — validation http/https + protection SSRF via `is-private-ip`

## Répertoires AIDD

- `.claude/agents/` — 5 agents IA spécialisés (alexia, claire, iris, kent, martin)
- `.claude/commands/` — 37 commandes slash organisées par phase SDLC (00–10)
- `.claude/rules/` — règles de code par catégorie (00–09)
- `aidd_docs/memory/` — memory bank du projet
- `aidd_docs/tasks/` — plans d'implémentation
