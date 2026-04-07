---
name: architecture
description: Module architecture and structure
argument-hint: N/A
scope: all
---

# Architecture

## Language/Framework

- **Runtime** : Node.js 18+
- **Framework HTTP** : Fastify (validation JSON intégrée via Ajv, ~2x plus rapide qu'Express)
- **Gestionnaire de paquets** : `pnpm`

```mermaid
---
title: Stack technique
---
flowchart LR
    Fastify["fastify"] --> Undici["undici (fetch HTML)"]
    Fastify --> Cheerio["cheerio (parse HTML)"]
    Fastify --> Playwright["playwright-core (fallback)"]
    Fastify --> Cors["@fastify/cors"]
    Fastify --> Dotenv["dotenv (config env)"]
    Undici --> ValidateUrl["validate-url (SSRF)"]
    ValidateUrl --> IsPrivateIp["is-private-ip"]
```

## Packages applicatifs

| Rôle | Package |
| ---- | ------- |
| Framework HTTP | `fastify` |
| Fetch HTML | `undici` (inclus Node 18+) |
| Parse HTML | `cheerio` |
| Playwright fallback | `playwright-core` (optionnel, désactivable) |
| Validation SSRF | natif + `is-private-ip` |
| CORS | `@fastify/cors` |
| Config env | `dotenv` |

## Services communication

### POST /resolve — flux principal

```mermaid
---
title: Flux POST /resolve
---
flowchart LR
    Client["Client"] -- POST /resolve --> Route["routes/resolve.js"]
    Route --> ValidateUrl["lib/validate-url.js"]
    ValidateUrl --> FetchHtml["lib/fetch-html.js (timeout 8s)"]
    FetchHtml --> Cascade["resolvers/index.js"]
    Cascade --> OgImage["og-image.js"]
    Cascade --> LargestImg["largest-img.js"]
    Cascade --> DataSrc["data-src.js"]
    Cascade --> NextData["next-data.js"]
    Cascade --> PlaywrightResolver["playwright.js (fallback)"]
    Cascade --> Route
    Route -- image URL --> Client
```

### Naming Conventions

- **Files** : kebab-case (`fetch-html.js`, `validate-url.js`)
- **Functions** : camelCase
- **Variables** : camelCase
- **Constants** : UPPER_CASE
