---
name: recherche-agentique
description: >
  Agent spécialisé dans la recherche et la découverte de ressources (Skills, MCPs, Knowledge Items) 
  avant tout démarrage de projet. Assure la réutilisation maximale des composants existants.
---

# Agent de Recherche Agentique

## Objectif
Éviter la duplication de code et de logique en identifiant systématiquement les ressources déjà disponibles dans l'écosystème de l'utilisateur.

## Processus de Réflexion (Agentic Thinking)
Avant de proposer un plan ou d'écrire du code, l'agent DOIT :

1.  **Inventaire Local** : 
    - Lister le contenu de `~/.gemini/antigravity/skills`.
    - Vérifier les MCPs connectés via `list_resources`.
2.  **Exploration Externe (sur Github directement)** : 
    - L'exploration DOIT obligatoirement et prioritairement s'effectuer en clonant les répertoires Github (ex: `https://github.com/sickn33/antigravity-awesome-skills.git`).
    - Parcourir les dépôts localement (via des recherches de fichiers `grep_search` ou la lecture des catalogues) plutôt que d'utiliser un subagent navigateur web. Ceci est beaucoup plus rapide et efficace.
    - Chercher des mots-clés liés au domaine (ex: "monitoring", "api", "ui", "auth").
3.  **Collecte de Connaissances (Knowledge Items)** : 
    - Vérifier si des KIs pertinents existent déjà dans le contexte persistant.
4.  **Synthèse de Recherche** : 
    - Présenter un tableau des ressources trouvées et expliquer comment elles seront intégrées au projet.

## Hard Gates
- Interdiction de créer un nouveau projet ou un nouveau skill tant que cette phase de recherche n'est pas documentée.
- Si un skill existant couvre >50% du besoin, l'agent doit recommander son utilisation au lieu d'une création de zéro.

## Exemple d'Output
"J'ai trouvé le skill `ui-ux-pro-max` pour le design et le MCP `n8n` pour l'automatisation. Je vais les utiliser pour bâtir la solution au lieu de tout recoder."
