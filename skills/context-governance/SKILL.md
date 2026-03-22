---
name: context-governance
description: Règles strictes de gestion du contexte, de la mémoire et des limites d'exécution pour tous les agents. À consulter systématiquement pour éviter le context decay.
---

# 🧠 CONTEXT GOVERNANCE & EXECUTION LIMITS

Ce document définit les règles absolues de gestion du contexte pour garantir une exécution rapide, pertinente et sans "hallucination" due à la surcharge cognitive.

En tant qu'agent interagissant avec cette codebase, tu **DOIS** respecter ces 4 piliers fondamentaux lors de chaque itération technique :

## 1️⃣ RÈGLE DES 10 FICHIERS (Surgical Strike)
- **Ne JAMAIS lire plus de 10 fichiers complets par session de travail.**
- Si une tâche nécessite d'ouvrir et de charger en mémoire plus de 10 fichiers, la tâche est trop large ou mal ciblée.
- **Action :** Utiliser des recherches chirurgicales (`grep_search`), lire uniquement les lignes nécessaires (start/end lines), ou demander un redécoupage de la tâche (Mode 1 ou Mode 2).

## 2️⃣ RÈGLE DES 2 HEURES (Anti-Context Decay)
- **Toujours commencer une nouvelle conversation après 2h de travail sur le même thread.**
- Le contexte accumulé (essais, erreurs, fausses pistes) dégrade considérablement la qualité du raisonnement de l'agent.
- **Action :** Commiter le code propre, résumer l'état d'avancement pour le prochain thread (via le `project-tracker` ou un artefact), et lancer une nouvelle session fraîche.

## 3️⃣ EXCLUSION STRICTE (Signal vs Noise)
- **Ne JAMAIS indexer, lire, ou lancer des recherches larges dans :**
  - `node_modules/`
  - `dist/`
  - `build/`
  - `.next/` ou `.cache/`
- **Action :** S'assurer que les outils de recherche système (ex: `find_by_name`, `grep_search`) excluent explicitement ces dossiers. Ignorer ces répertoires garantit des temps de réponse instantanés.

## 4️⃣ LIMITE COGNITIVE (100K Tokens)
- **Context Limit = 100K tokens maximum par réflexion.**
- Charger aveuglément des dizaines de milliers de lignes de code provoque le syndrome du "Lost in the Middle".
- **Action :** Privilégier une approche d'architecte : diagnostiquer avec du pseudo-code, demander des confirmations au Tech Lead, et n'inspecter que la surface de code strictement nécessaire au changement.

---
*⚠️ Ces règles sont le socle de la Gouvernance d'Exécution. Elles priment sur la volonté de "tout comprendre" d'un coup.*
