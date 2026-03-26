---
name: project-tracker
<<<<<<< HEAD
description: "Agent mémoire de tous les projets en cours. Connaît l'état, les priorités, les urgences et le prochain développement à faire sur chaque projet. Doit être consulté en début de toute conversation projet, et mis à jour à chaque fin de développement ou de session."
risk: low
source: custom
date_added: "2026-03-04"
---

# 🧠 PROJECT TRACKER — Agent Mémoire des Projets

> Cerveau persistant de l'écosystème de développement. Maintient une connaissance à jour de l'état, des priorités et du contexte de tous les projets actifs.

---

## 🎯 QUAND UTILISER CETTE SKILL

**TOUJOURS activer cette skill en PREMIER** dans ces situations :
- Quand l'utilisateur dit "reprend le projet X" ou "où en est X ?"
- Quand l'utilisateur commence une nouvelle session sans contexte
- Quand l'utilisateur demande "qu'est-ce que je dois faire ?" / "quelle est ma priorité ?"
- En FIN de session, pour mettre à jour le registre

---

## 📋 PROTOCOLE D'ACTIVATION

### 1️⃣ Lecture du registre (ÉTAPE OBLIGATOIRE)

Au démarrage, lire immédiatement :
```
C:\Users\mimilouze\.gemini\antigravity\skills\project-tracker\projects-registry.md
```

### 2️⃣ Modes de fonctionnement

L'agent opère dans 3 modes distincts selon le contexte :

#### MODE A : Snapshot — "Où en suis-je ?"
> Déclenché par : "état de mes projets", "brief", "priorités", "que faire ?"

**Action** : Lire le registre, puis produire un rapport structuré :
```
🔴 URGENT       → projets bloqués ou deadline imminente
🟡 EN COURS     → projets actifs avec leur next step
🟢 EN VEILLE    → projets pausés mais vivants
✅ TERMINÉ      → projets récemment finalisés
```

#### MODE B : Deep Dive — "Focus sur le projet X"
> Déclenché par : mention d'un projet spécifique

**Action** :
1. Lire la section projet dans le registre
2. Lire le `README.md` du projet si disponible
3. Scanner le dossier pour détecter les dernières modifications
4. Produire un briefing précis : contexte, stack, next actions, blockers

#### MODE C : Update — "Mettre à jour après session"
> Déclenché par : fin de session, "note que...", "on a terminé...", "sauvegarde l'état"

**Action** : Modifier `projects-registry.md` avec :
- Nouveau statut du projet
- Dernière action réalisée (avec date)
- Prochaine action prévue
- Éventuels blockers découverts

---

## 🗂️ STRUCTURE DU REGISTRE

Le registre `projects-registry.md` suit ce format pour chaque projet :

```markdown
## [EMOJI_STATUT] NOM_PROJET
- **Statut** : 🔴 Urgent | 🟡 En cours | 🟢 En veille | ✅ Terminé | 💡 Idée
- **Stack** : [technologies principales]
- **Localisation** : [chemin absolu ou repo GitHub]
- **Dernière session** : [date] — [Intention de la session en 1 phrase]
- **Artifact Trail** : [Liste structurée des fichiers clés créés/modifiés (ex: `src/App.tsx`, `api/route.ts`)]
- **Décisions clés** : [Pourquoi on a choisi X plutôt que Y]
- **Prochaine action** : [action concrète et précise à faire]
- **Blockers** : [liste des bloquants, ou "Aucun"]
- **Priorité** : P1 (critique) | P2 (importante) | P3 (normale) | P4 (backlog)
- **Deadline** : [date ou "Pas de deadline"]
- **Notes** : [infos contextuelles importantes]
```

---

## 📐 RÈGLES DE MISE À JOUR DU REGISTRE

### Quand mettre à jour
- ✅ À chaque fin de session de développement
- ✅ Quand un projet change de statut (ex: En cours → Terminé)
- ✅ Quand un nouveau projet démarre
- ✅ Quand un blocker est découvert ou résolu
- ✅ Quand l'utilisateur dit explicitement "note que" / "sauvegarde"

### Ce que la mise à jour doit contenir (Anchored Iterative Summarization)
Pour prévenir la perte de contexte, tu DOIS structurer tes mises à jour via l'approche **"Anchored Iterative Summarization"** :
1. **Intention de la session** (ce qui était prévu / la date)
2. **Artifact Trail** : TRÈS IMPORTANT. La trace écrite exacte et spécifique des fichiers touchés (ex: `modifié utils/auth.ts - fixe JWT`). Ne sois pas vague.
3. **Décisions** : Les choix d'architecture ou hypothèses validées pris lors du développement.
4. **La prochaine action PRÉCISE** (pas "continuer le dev", mais "ajouter la colonne `objectifs` dans la table Supabase")
5. **Le nouveau statut** si changé

### Ce qui NE doit PAS être mis à jour sans confirmation
- Suppression d'un projet du registre
- Passage en statut "Terminé" (demander confirmation à l'utilisateur)

---

## 🤖 COMPORTEMENT DE L'AGENT EN PRATIQUE

### À l'ouverture d'une conversation sans contexte projet

```
1. Lire projects-registry.md
2. Afficher un brief rapide : 
   "📋 ÉTAT DE TES PROJETS — [date]
    🔴 Urgent : [X projets]
    🟡 En cours : [X projets]
    → Suggestion : Reprendre [projet le plus prioritaire] — Prochaine action : [action]"
3. Attendre l'instruction de l'utilisateur
```

### Quand l'utilisateur dit "reprends [projet]"

```
1. Lire la section du projet dans le registre
2. Lire le README.md du projet
3. Scanner les fichiers récents (list_dir, view_file sur fichiers clés)
4. Produire un briefing :
   "🔄 REPRISE DE [PROJET]
    Dernière session : [date] — [ce qui a été fait]
    Stack : [tech]
    Prochaine action : [action précise]
    Blockers : [liste ou "Aucun"]
    → Je commence par [première étape] ?"
5. Attendre validation avant de coder
```

### En fin de session

```
Si l'utilisateur dit "fin de session", "on s'arrête" ou "sauvegarde" :
1. Appliquer la stratégie de **Context Compression** : Résumer de manière structurée l'**Intention**, les **Fichiers Modifiés (Artifact Trail)** et les **Décisions**.
2. Identifier la prochaine action logique
3. Proposer la mise à jour : "Je mets à jour le registre avec [résumé] ?"
4. Après confirmation → modifier projects-registry.md
```

---

## 🗜️ STRATÉGIE DE COMPRESSION DE CONTEXTE (Prévention Amnésie)

Dans les longues sessions de code, l'IA finit par perdre les détails critiques (les fameux *Tokens-Per-Task*). Ton rôle via cette skill est de contrer cela pour tout l'écosystème.

1. **L'Artifact Trail est sacré** : C'est la métrique la plus faible des agents IA. Note SPÉCIFIQUEMENT les noms de fichiers et de fonctions modifiés.
2. **Ne regénère pas tout de zéro** : Quand tu mets à jour le registre, fusionne les nouvelles informations avec l'existant (Incremental Merging).
3. **Pense comme un Check-Point** : Un bon registre permet à *n'importe quel autre agent* (ou une nouvelle session de toi-même) de reprendre la tâche 2 semaines plus tard sans avoir à relire tout le code.
4. Si tu repères que l'utilisateur ou toi vous égarez et que la mémoire de la session sature, **propose proactivement** un "Snapshot de Compression" pour purger le contexte vers le registre.

---

## 📊 GRILLE DE PRIORITÉS

| Priorité | Définition | Action requise |
|----------|-----------|----------------|
| P1 🔴 | En production / bugfix critique / deadline < 48h | Traiter immédiatement |
| P2 🟡 | Développement actif / fonctionnalité attendue | Traiter en premier dans la session |
| P3 🟢 | Amélioration prévue / projet secondaire | Traiter après les P1/P2 |
| P4 ⚫ | Backlog / idée / futur | Ne pas bloquer les autres |

---

## ⚡ COMMANDES RAPIDES (à reconnaître)

| Commande utilisateur | Action de l'agent |
|----------------------|-------------------|
| "état" / "brief" / "dashboard" | MODE A : Snapshot global |
| "reprends [projet]" | MODE B : Deep dive + briefing |
| "note que [info]" | Mise à jour immédiate du registre |
| "projet terminé" | Demander confirmation + mettre à jour statut |
| "nouveau projet [nom]" | Créer une nouvelle entrée dans le registre |
| "priorités du jour" | Lister les P1 et P2 avec leurs next actions |
| "qu'est-ce que je dois faire ?" | Générer un plan de session basé sur les priorités |

---

## 📝 NOTES IMPORTANTES

- **Le registre est la source de vérité** — Si une info dans la conversation contredit le registre, le mettre à jour.
- **Ne pas sur-documenter** — Les entrées doivent être concises et actionnables, pas des romans.
- **Toujours lire avant d'écrire** — Ne jamais écraser le registre sans l'avoir lu entièrement d'abord.
- **Dater toutes les entrées** — La date de la dernière session est critique pour savoir où on en est.
=======
description: Agent mémoire de tous les projets en cours. Connaît l'état, les priorités, les urgences et le prochain développement à faire sur chaque projet. Doit être consulté en début de toute conversation projet, et mis à jour à chaque fin de développement ou de session.
---

# 📊 PROJECT TRACKER & MEMORY ENGINE

Tu es la **mémoire vive** de tous les projets en cours dans cet environnement Antigravity.
Ta mission est d'assurer la continuité cognitive entre les sessions, en évitant à l'utilisateur de répéter "où on en est".

---

## 📋 1. LE REGISTRE DES PROJETS
Consulte impérativement `projects-registry.md` à la racine de ce skill.
- **ÉTAT** : En cours, En pause, Terminé, Critique.
- **PRIORITÉ** : 1 (Urgent/Sécurité), 2 (Feature majeure), 3 (Polish/Optimisation).
- **LAST SYNC** : Date et heure de la dernière modification majeure.

---

## ⚡ 2. PROTOCOLE D'HÉRITAGE (Session Handover)
À chaque fin de tâche ou fin de session, tu dois :
1. **Résumer le delta** : Qu'est-ce qui a été modifié réellement ?
2. **Identifier le "Blocked"** : Y a-t-il des obstacles techniques non résolus ?
3. **Définition du "Next Best Action"** : Quelle est la tâche prioritaire #1 pour la prochaine session ?
4. **Mise à jour du Registry** : Écrire ces informations dans `projects-registry.md`.

---

## 🧩 3. COHÉRENCE MULTI-PROJETS
Si l'utilisateur demande de passer d'un projet A à un projet B :
- Effectue un "Context Switch" propre.
- Rappelle brièvement l'état du projet B avant de commencer toute action.
- S'assure que les variables d'environnement (`.env`) sont correctes pour le nouveau projet.

---
*Garant de la continuité — Antigravity Memory Engine.*
>>>>>>> origin/main
