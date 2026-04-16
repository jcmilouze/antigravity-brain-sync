---
name: write-plan
description: Transforme une spécification claire en plan d'exécution atomique, séquencé, testable avec fichiers, tests, modèles et dépendances.
keywords: ["plan", "étapes", "exécution", "tâches", "dépendances", "séquence", "roadmap"]
priority: high
depends_on: ["brainstorm-spec"]
---

# Write-Plan

**Mission : produire un plan d'exécution précis et séquencé** à partir d'une spécification claire. Ne pas coder — seulement planifier.

Chaque étape DOIT être :
- **atomique** (1 responsabilité)
- **testable** (critère de succès mesurable)
- **localisée** (fichiers impactés, max 5/étape)
- **modélisée** (modèle Ollama assigné)

## Quand l'utiliser

OBLIGATOIRE après `/brainstorm-spec` validée, ou pour toute tâche multi-fichiers / complexité moyenne+.

## Processus (5 étapes)

1. **ANALYSE** → Comprendre la spec + contraintes
2. **DÉCOUPAGE** → Tâches atomiques par priorité, max 8 étapes
3. **LOCALISATION** → Fichiers impactés par étape
4. **MODÉLISATION** → Modèle Ollama optimal par étape
5. **SÉQUENÇAGE** → Ordre logique + dépendances

## Format de sortie obligatoire

```
🎯 Objectif rappel
[1 phrase de la spec]

📊 Métriques plan
Étapes : [X] | Complexité : [basse | moyenne | haute]

🚀 Plan d'exécution
| # | Étape | Fichiers | Critère de succès | Modèle | Dépend de |
|---|-------|----------|-------------------|--------|-----------|
| 1 | [desc] | [fichiers] | [critère mesurable] | qwen3.5:35b | - |
| 2 | ... | ... | ... | gemma4:31b | 1 |

🔄 Dépendances critiques
- Étape X bloque Y : [raison]

⚠️ Points de validation utilisateur
- [étapes nécessitant confirmation avant exécution]

🚀 Prochaine étape : /execute-plan
```

## Contraintes strictes

- Ne pas coder — laisser à `/execute-plan`
- Max 8 étapes — si plus, découper en sous-plans
- Max 5 fichiers par étape
- Modèle Ollama explicite pour chaque étape
- Chaque étape a un critère de succès mesurable

## Scope protection (GSD)

**Langage interdit dans les plans :**
- "v1", "pour l'instant", "hardcodé temporairement", "version simplifiée", "placeholder", "à compléter"

Si les prérequis exigent une feature dynamique, la livrer complète **ou** proposer un découpage de phase — jamais réduire le scope silencieusement.

## Spécificité obligatoire (GSD)

Chaque tâche doit être suffisamment précise pour qu'une autre IA puisse l'exécuter sans poser de question.

| ❌ Trop vague | ✅ Correct |
|--------------|-----------|
| "Ajouter l'auth" | "JWT avec refresh rotation via jose, httpOnly cookies, expiry 15min/7j" |
| "Créer l'API" | "POST /api/projects : validation name (3–50 chars), retourne 201 + objet project" |
| "Styler le dashboard" | "Tailwind grid 3 cols/lg 1/mobile, shadow-md, hover:bg-slate-100 sur les boutons"

## Modèles Ollama (local-first obligatoire)

- Planification/architecture/vision → `gemma4:31b`
- Code/refactor/tests/SQL/endpoints → `qwen3.5:35b`

## Ressources UI (intégrer dans les étapes UI)

- **21st.dev** : source primaire de composants React/Tailwind — fetcher les URLs pertinentes avant de coder
  - Composants : `https://21st.dev/community/components?category=<heros|features|pricing|...>`
- **Stitch** : `https://stitch.withgoogle.com` — prototyper la direction visuelle AVANT implémentation
- Workflow : Stitch (direction visuelle) → 21st.dev (composants prod) → qwen3.5:35b (intégration)

## Coolify / Déploiement

Quand le plan implique un déploiement :
- Variables `VITE_*` = injectées au BUILD TIME → étape "redéploiement" obligatoire après changement env
- Communication inter-services : utiliser les **alias réseau Coolify** (jamais `localhost`)
- Volumes persistants : obligatoires pour données qui doivent survivre aux restarts

## Tâche reçue

$ARGUMENTS
