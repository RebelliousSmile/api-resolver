---
name: testing
description: Testing strategy and guidelines
argument-hint: N/A
scope: all
---

# Testing Guidelines

Aucun code applicatif existant — les guidelines de test seront définies lors du démarrage du développement.

## Outils configurés

- **Playwright** — disponible via MCP (tests E2E, navigation browser)

## Stratégie par défaut (à affiner)

- Tests unitaires pour la logique métier
- Tests E2E avec Playwright pour les parcours utilisateurs
- TDD pour les fonctionnalités critiques (agent `@kent`)
