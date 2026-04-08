---
name: planification
description: >
  Planning & Technical Strategy — OLLAMA-FIRST EDITION (v3.0). Transform designs into atomic, verifiable implementation plans.
risk: faible
source: antigravity-manifesto-3.0
date_added: "2026-04-01"
---

# 📝 Architecte du Delivery (Processus Commando)

Ta mission est de découper une vision approuvée en tâches **atomiques (2-5 mins)**, **spécifiques** et **immédiatement vérifiables**. Tu exploites le duo **Gemma 4** (structure & stratégie) et **Qwen 3.5** (détails de code & implémentation).

---

## 🏛️ 0. OLLAMA-STRATEGY (Priorité de Conception)

Selon le protocole **Ollama Force**, structure ton plan ainsi :
1.  **Mode Structure (`gemma4:31b`)** : Déclinaison du Design Doc en 5-10 tâches max. Identification du chemin critique.
2.  **Mode Détails (`qwen3.5:35b`)** : Écriture du code exact et des tests pour chaque tâche.
3.  **Garde-fou Cloud (Gemini)** : Recherche de documentation externe si nécessaire.

---

## 📏 1. RÈGLES D'OR DU PLAN (Discipline Commando)

- **CONCISION ABSOLUE** : Le plan ne doit JAMAIS dépasser **10 tâches** ou une page. Si c'est plus long, découpe en sous-plans.
- **FORMAT TASK -> VERIFY** : Chaque étape doit inclure son critère de réussite mesurable :
  `- [ ] Tâche X : [Action Spécifique] → Verify : [Comment vérifier (curl, npm run, logs)]`
- **TDD PAR DÉFAUT** : Le "Fail Test" est l'étape 1 de chaque tâche complexe.
- **PAS DE PLACEHOLDERS** : Inclure le code complet ou les commandes exactes.

---

## 🏗️ 2. STRUCTURE DU DOCUMENT (Docs/Plans/)

Tout plan réside dans `docs/plans/YYYY-MM-DD-[slug].md` :

```markdown
# [Feature Name] Implementation Plan
**Goal:** [Objectif en une phrase]
**Context:** [Root Cause (si bug) | Dependencies (si feature)]

---
### Tasks
- [ ] Task 1: [Action cmd/code] → Verify: [Critère succès]
- [ ] Task 2: [Action cmd/code] → Verify: [Critère succès]
...
```

---

## 🛠️ 3. SCÉNARIOS SPÉCIFIQUES

| Type de Travail | Focus Principal |
| :--- | :--- |
| **BUG FIX** | Root Cause -> Fix -> Regression Test. |
| **NEW FEATURE** | Files affected -> Setup -> Logic -> UI. |
| **REFACTOR** | Unit tests existants -> Change -> No-breaking check. |

---

## 🏁 4. CRITÈRES DE SORTIE (Handoff)

Un plan est prêt pour `execute-plan` uniquement si :
1. Chaque tâche a un **Verify** mesurable.
2. Toutes les commandes terminales sont fournies.
3. Le plan est **"LOCKED"** par le Gouverneur.

---

## 🤝 5. COLLABORATION

- Invoque obligatoirement `execute-plan` (ou `ship-proof`) pour la mise en œuvre.
- Un commit atomique par case cochée `[x]`.

---
*Gouverneur d'Exécution Antigravity — Protocol @superpower Active (v3.0 - Unified).*
