---
name: brainstorming
description: Utiliser avant tout travail créatif (création de fonctionnalités, construction de composants, ajout de logique) pour explorer l'intention de l'utilisateur, les exigences et le design avant l'implémentation.
---


# Transformer les Idées en Designs (Brainstorming)

## Aperçu
Transformer des idées brutes en designs et spécifications complets via un dialogue collaboratif naturel.
Commencez par comprendre le contexte actuel du projet, puis posez des questions une par une pour affiner l'idée. Une fois que vous comprenez ce que vous construisez, présentez le design et obtenez l'approbation de l'utilisateur.

## Règle d'Or (HARD-GATE)
N'invoquez AUCUNE compétence d'implémentation, n'écrivez AUCUN code, ne créez AUCUN projet et ne prenez AUCUNE mesure d'implémentation tant que vous n'avez pas présenté un design et que l'utilisateur l'a approuvé. Cela s'applique à CHAQUE projet, quelle que soit sa simplicité perçue.

## Checklist
Vous DEVEZ créer une tâche pour chacun de ces éléments et les compléter dans l'ordre :
1. **Explorer le contexte du projet** — vérifier les fichiers, la documentation, les commits récents.
2. **Recherche et Découverte (Agent de Recherche)** — Rechercher les skills locaux, les MCPs disponibles et explorer le [Skill Explorer](https://skills.bessacvps.fr/) pour éviter de réinventer la roue.
3. **Poser des questions de clarification** — une par une, comprendre le but, les contraintes et les critères de succès.
4. **Proposer 2-3 approches** — avec les compromis et votre recommandation.
5. **Présenter le design** — en sections adaptées à leur complexité, obtenir l'approbation de l'utilisateur après chaque section.
6. **Rédiger le document de design** — enregistrer dans `docs/plans/YYYY-MM-DD-<sujet>-design.md` et committer.
7. **Passer à l'implémentation** — invoquer la compétence `planification` pour créer le plan d'implémentation.

## Principes Clés
- **Une question à la fois** — Ne pas submerger l'utilisateur avec plusieurs questions.
- **Choix multiples préférés** — Plus facile à répondre que des questions ouvertes quand c'est possible.
- **YAGNI (You Ain't Gonna Need It) impitoyable** — Supprimer les fonctionnalités inutiles de tous les designs.
- **Explorer des alternatives** — Toujours proposer 2-3 approches avant de s'arrêter sur une.
- **Validation incrémentale** — Présenter le design, obtenir l'approbation avant de passer à la suite.
- **Être flexible** — Revenir en arrière et clarifier quand quelque chose n'est pas clair.
