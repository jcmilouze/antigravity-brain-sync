---
name: ollama-governor
description: >
  Orchestrateur dynamique de VRAM pour RTX 4090. Gère le cycle de vie des modèles locaux (chargement/déchargement) pour optimiser les performances et minimiser les coûts cloud.
category: "IA & Agents"
risk: bas
source: antigravity-manifesto-2.0
date_added: "2026-03-23"
date_updated: "2026-04-08"
---

# 🏛️ Skill: OLLAMA-GOVERNOR (VRAM Dynamic Orchestrator)

## 🆔 ID & Mission
**Nom** : `ollama-governor`  
**Mission** : Router chaque tâche vers le bon modèle local pour garantir 0 lag, 100% de précision et 0 token cloud gaspillé.  
**Priorité Absolue** : Local-First. Ollama avant tout pour le code, le raisonnement, et les agents.

---

## 📊 TABLE DE ROUTING (Modèles disponibles RTX 4090)

| Modèle | VRAM | Cas d'usage | Timeout cible |
|--------|------|-------------|---------------|
| `qwen3.5:27b` | 17GB | **CODE PRIMARY** — Composants React, TypeScript, CSS, refacto | < 90s |
| `deepseek-r1:14b` | 9GB | **CODE RAPIDE** — Fonctions courtes (< 50 lignes), corrections, one-liners | < 30s |
| `qwen3.5:35b` | 24GB | **RAISONNEMENT** — Architecture, audit, planification complexe | < 180s |
| `llama3.2-vision` | 8GB | **VISION** — Analyse d'images, mockups, screenshots | < 60s |
| `mistral-nemo` | 7GB | **AGENT LÉGER** — Tâches agentiques courtes, résumés | < 20s |

> ⚠️ Ne jamais charger qwen3.5:35b + qwen3.5:27b simultanément (41GB > VRAM disponible)

---

## 🏗️ PROTOCOLE DE DÉMARRAGE (Bootstrap Antigravity)

À chaque début de session :
1. **Audit Serveur** : `curl -s http://localhost:11434/api/tags`
2. **Auto-Lancement si éteint** : `& "$env:LOCALAPPDATA\Programs\Ollama\ollama.exe" serve`
3. **Modèle par défaut** : charger `qwen3.5:27b` pour toute session de code

---

## 🛠️ WORKFLOW OLLAMA-FIRST (Code Generation)

### Règle d'or des prompts
**1 fichier = 1 appel Ollama. Prompt court et ciblé.**

❌ Mauvais : "Génère toute la landing page Canal+"  
✅ Bon : "Génère UNIQUEMENT Header.tsx — React 18 + Tailwind + [spec courte]"

### Template de prompt optimal

```
Write ONLY valid TypeScript React code, no markdown fences, no explanation.

File: src/components/[NOM].tsx
Stack: React 18, TypeScript, Tailwind CSS v3 (canal-red=#e50914, canal-dark=#0a0a0a)
Requirements:
- [Bullet 1 — max 10 mots]
- [Bullet 2 — max 10 mots]
- [Bullet 3 — max 10 mots]
Export default function [NOM].
```

### Appel curl standard (qwen3.5:27b)

```bash
curl -s --max-time 90 -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d "{\"model\":\"qwen3.5:27b\",\"stream\":false,\"prompt\":\"[PROMPT]\"}" \
  | node -e "const c=[]; process.stdin.on('data',d=>c.push(d)); process.stdin.on('end',()=>{const r=JSON.parse(Buffer.concat(c).toString()); console.log(r.response||'ERROR');})"
```

### Fallback si timeout

```
qwen3.5:27b (90s) → deepseek-r1:14b (30s) → Claude (dernier recours)
```

---

## 🔄 MODES D'EXÉCUTION

### 1. 💻 MODE CODAGE (qwen3.5:27b — PRIMARY)
- **Modèle** : `qwen3.5:27b`
- **Usage** : Composants React/Vue, TypeScript, CSS Tailwind, refacto < 200 lignes
- **Décharger avant** : `curl -s -X POST http://localhost:11434/api/generate -d '{"model":"qwen3.5:35b","keep_alive":0}'`

### 2. ⚡ MODE CORRECTION (deepseek-r1:14b)
- **Modèle** : `deepseek-r1:14b`
- **Usage** : Fix bugs, one-liners, fonctions isolées, tests unitaires
- **Avantage** : Réponse en < 30s, idéal pour itérations rapides

### 3. 🧠 MODE ANALYSE (qwen3.5:35b)
- **Modèle** : `qwen3.5:35b`
- **Usage** : Architecture, planification, audit de code complexe, stratégie
- **Décharger 27b avant** : `curl -s -X POST http://localhost:11434/api/generate -d '{"model":"qwen3.5:27b","keep_alive":0}'`

### 4. ⚡ ASTUCE ZERO-RESTART
Libérer VRAM sans redémarrer Ollama :
```bash
curl -s -X POST http://localhost:11434/api/generate \
  -d '{"model":"[MODEL_A_DECHARGER]","keep_alive":0}'
```

---

## 📏 RÈGLES DE GOUVERNANCE

1. **Vérification VRAM** : `nvidia-smi` avant chaque switch 35b ↔ 27b
2. **Zéro Conflit** : Ne JAMAIS charger 35b + 27b simultanément
3. **Transparence** : Toujours annoncer le modèle utilisé : *"→ qwen3.5:27b — MODE CODAGE"*
4. **Prompt court** : Si le prompt dépasse 300 mots, le découper en sous-tâches
5. **Fallback rapide** : Timeout = switch immédiat vers modèle plus léger

---

## 💰 POLITIQUE D'ÉCONOMIE (Quotas Cloud)

**Appeler Claude/Gemini API seulement si :**
1. Fenêtre de contexte > 32k tokens
2. Analyse vision complexe non gérée localement
3. 3 timeouts consécutifs sur tous les modèles locaux

**Dans tous les autres cas : Use Local. qwen3.5:27b first.**

---

## 📈 MÉTRIQUES CIBLES PAR SESSION

| Métrique | Cible |
|----------|-------|
| Ratio Ollama / Claude | > 70% |
| Timeout rate | < 20% |
| Tokens cloud économisés | > 60% |

---

*Mis à jour : 8 Avril 2026 — v3.0 — qwen3.5:27b comme modèle primaire de code.*
