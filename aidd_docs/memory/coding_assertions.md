---
name: coding-assertions
description: Code quality verification checklist
argument-hint: N/A
scope: all
---

# Coding Guidelines

> Those rules must be minimal because they MUST be checked after EVERY CODE GENERATION.

## Requirements to complete a feature

**A feature is really completed if ALL of the above are satisfied: if not, iterate to fix all until all are green.**

## Commands to run

### Before commit

```markdown
| Order | Command        | Description          |
| ----- | -------------- | -------------------- |
| 1     | pnpm typecheck | TypeScript type check |
| 2     | pnpm lint      | ESLint linting       |
| 3     | pnpm test      | Unit tests           |
```

### Before push

```markdown
| Order | Command        | Description          |
| ----- | -------------- | -------------------- |
| 1     | pnpm build     | Production build     |
| 2     | pnpm test:e2e  | End-to-end tests     |
```

> Note: Les commandes ci-dessus sont des conventions par défaut. À ajuster selon le stack applicatif réel lors du démarrage du développement.
