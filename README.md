# api-resolver

Microservice Node.js/Fastify qui extrait l'image représentative d'une page web via une cascade de stratégies.

## API

### `POST /resolve`

**Body**
```json
{ "source_page": "https://example.com/article" }
```

**Réponses**

| Status | Body |
|--------|------|
| `200` | `{ "url": "https://cdn.example.com/image.jpg" }` |
| `400` | `{ "error": "source_page is required" \| "invalid_url" \| "forbidden_url" }` |
| `404` | `{ "error": "not_found" }` |

## Cascade de résolution

Les stratégies sont appliquées dans l'ordre — la première qui réussit arrête la cascade.

1. **og:image** — balise `<meta property="og:image">` (+ `twitter:image`)
2. **largest-img** — plus grande `<img width height>` selon `width × height`
3. **data-src** — premier `<img data-src>`
4. **\_\_NEXT\_\_DATA\_\_** — blob JSON injecté par Next.js (recherche récursive)
5. **Playwright** — rendu headless (fallback lourd, désactivable)

## Installation

```bash
pnpm install
cp .env.example .env
```

## Démarrage

```bash
# développement (rechargement auto)
pnpm dev

# production
pnpm start
```

## Configuration

| Variable | Défaut | Description |
|----------|--------|-------------|
| `PORT` | `3000` | Port d'écoute |
| `HOST` | `0.0.0.0` | Adresse d'écoute |
| `ALLOWED_ORIGINS` | `http://localhost:5173` | Origines CORS autorisées (CSV) |
| `ENABLE_PLAYWRIGHT` | `false` | Active le fallback Playwright |
| `NODE_ENV` | `development` | Environnement |

**Exemple multi-origines :**
```
ALLOWED_ORIGINS=https://myapp.com,https://staging.myapp.com
```

## Sécurité

- Validation `http`/`https` uniquement
- Protection SSRF : `localhost`, `10.x`, `192.168.x`, `172.16-31.x`, link-local bloqués
- Résolution DNS des noms d'hôte avant autorisation
- Timeout global de 8s sur le fetch HTML

## Hors scope

- Pas de proxy d'image (retourne l'URL, pas le contenu)
- Pas de cache (ajouter Redis/LRU en prod si besoin)
- Pas d'authentification (mettre un reverse proxy si exposé publiquement)
