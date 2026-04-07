---
name: project-brief
description: Project vision and domain documentation
argument-hint: N/A
scope: all
---

# PROJECT_BRIEF.md

## Executive Summary

- **Project Name**: api-resolver
- **Vision**: Extraire l'image représentative d'une URL web via une cascade de stratégies
- **Mission**: API HTTP qui, à partir d'une URL, retourne l'image la plus pertinente (og:image, plus grande image, data-src, __NEXT_DATA__, Playwright en fallback)

### Full Description

Service Node.js exposant un endpoint `POST /resolve` qui accepte une URL, fetch le HTML, et applique une cascade de résolveurs pour extraire l'image représentative. Playwright est une option de dernier recours (désactivable).

## Context

### Core Domain

Résolution d'image représentative pour une URL web donnée.

### Ubiquitous Language

| Term | Definition | Synonymes |
| ---- | ---------- | --------- |
| Resolver | Stratégie d'extraction d'image sur le HTML fetché | Strategy, step |
| Cascade | Séquence ordonnée de resolvers, s'arrête au premier succès | Pipeline, chain |
| og:image | Balise Open Graph standard pour l'image de prévisualisation | OG image |
| `__NEXT_DATA__` | Blob JSON injecté par Next.js dans le HTML | Next data |

## Features & Use-cases

- `POST /resolve` — reçoit une URL, retourne l'URL de l'image extraite
- Cascade de 5 résolveurs dans l'ordre : og:image → largest-img → data-src → next-data → Playwright
- Validation SSRF sur l'URL entrante (bloque les IPs privées)
- Timeout global 8s sur le fetch HTML
- CORS configurable

## Hors scope

- Pas de proxy d'image (retourne l'URL, pas l'image)
- Pas de cache (à ajouter en prod si besoin)
- Pas d'auth (reverse proxy à mettre en place si exposé publiquement)

<!--
IMPORTANT: THOSE ARE RULES FOR AI, DO NOT USE THOSE INTO FILLED TEMPLATE.

- THIS FILE ANSWERS: WHAT problem does it solve?
- INCLUDE ONLY: Business purpose, user goals, features, requirements
- DO NOT INCLUDE: Technical details, how it's built, visual design
-->
