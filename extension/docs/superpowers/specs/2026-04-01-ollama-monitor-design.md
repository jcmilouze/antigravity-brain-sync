# Ollama Monitor — Design Spec
**Date:** 2026-04-01  
**Extension:** `antigravity-vscode-sync`  
**Scope:** Ajouter un monitoring Ollama dans la status bar VS Code

---

## Objectif

Afficher l'état d'Ollama local directement dans la status bar VS Code :
- Serveur online/offline
- Modèles disponibles
- Modèles actuellement chargés en RAM (keep_alive actif) avec VRAM

---

## Architecture

### Nouveau fichier : `src/ollamaMonitor.ts`

Classe `OllamaMonitor` avec responsabilités uniques :
- Fetch périodique des APIs Ollama
- Gestion du `StatusBarItem` VS Code
- Refresh manuel sur click

### Modification : `src/extension.ts`

- Instanciation de `OllamaMonitor` dans `activate()`
- Ajout au `context.subscriptions` pour cleanup automatique

---

## Données fetchées

| Endpoint | Fréquence | Données |
|----------|-----------|---------|
| `GET /api/tags` | 60s | Liste tous les modèles installés (nom, taille) |
| `GET /api/ps` | 60s | Modèles en RAM : nom, VRAM utilisée, expires_at |

Les deux calls se font en parallèle (`Promise.all`).  
Timeout : **2 secondes** — au-delà → état offline.

---

## Status Bar

**Format :**
```
🟢 Ollama  qwen2.5-coder:32b  deepseek-r1:14b  [+1]
```

- `🟢` = online, `🔴` = offline
- Seuls les modèles **en RAM** (`/api/ps`) sont listés inline
- Si plus de 2 modèles en RAM → `[+N]` pour les suivants
- Offline : `🔴 Ollama offline`
- Position : droite de la status bar (`alignment: Right, priority: 100`)

**Tooltip (hover) :**
```
Ollama — 3 modèles disponibles

En RAM :
• qwen2.5-coder:32b — 18.2 GB VRAM
• deepseek-r1:14b — 9.1 GB VRAM

Disponibles (non chargés) :
• nomic-embed-text

Cliquer pour rafraîchir
```

**Click :** refresh immédiat (annule + relance le timer 60s)

---

## Configuration

Dans `package.json` contributes → `configuration` :

```json
"antigravity.ollamaUrl": {
  "type": "string",
  "default": "http://localhost:11434",
  "description": "URL du serveur Ollama local"
}
```

Accessible via `vscode.workspace.getConfiguration('antigravity').get('ollamaUrl')`.

---

## Gestion d'erreurs

| Cas | Comportement |
|-----|-------------|
| Ollama non démarré | `🔴 Ollama offline` — retry à 60s |
| Timeout > 2s | Même que offline |
| `/api/ps` vide (aucun modèle en RAM) | `🟢 Ollama — aucun modèle actif` |
| Erreur réseau ponctuelle | Conserve le dernier état connu |

---

## Cycle de vie

```
activate() 
  → new OllamaMonitor(context)
  → fetch() immédiat au démarrage
  → setInterval(fetch, 60_000)
  → statusBarItem.command = 'antigravity.ollamaRefresh'

deactivate() / context.subscriptions
  → clearInterval
  → statusBarItem.dispose()
```

---

## Fichiers modifiés

| Fichier | Action |
|---------|--------|
| `src/ollamaMonitor.ts` | Nouveau — classe OllamaMonitor |
| `src/extension.ts` | Modification — instanciation OllamaMonitor dans activate() |
| `package.json` | Modification — ajout config `antigravity.ollamaUrl` + commande `antigravity.ollamaRefresh` |

---

## Hors scope

- Providers cloud (Groq, Gemini, Claude) — itération future
- Panel VS Code dédié
- Alertes / notifications push
- Historique d'utilisation
