---
name: planification
description: Utiliser lorsqu'une spécification ou des exigences sont prêtes pour une tâche multi-étapes, afin de générer un plan d'implémentation détaillé avant de toucher au code.
---


# Création de Plans d'Implémentation (Planification)

## Aperçu
Rédiger des plans d'implémentation complets en supposant que l'ingénieur n'a aucun contexte sur notre base de code. Documentez tout ce qu'il doit savoir : quels fichiers modifier pour chaque tâche, le code, les tests, la documentation à vérifier, comment tester. Donnez le plan complet sous forme de tâches de taille réduite.
Principes : DRY, YAGNI, TDD, Commits fréquents.

## Granularité des Tâches
Chaque étape est une action simple (2-5 minutes) :
1. **Écrire le test qui échoue**
2. **Lancer le test pour vérifier qu'il échoue**
3. **Implémenter le code minimal pour faire passer le test**
4. **Lancer les tests et vérifier qu'ils passent**
5. **Commit**

## Structure du Document de Plan
Chaque plan DOIT commencer par cet en-tête markdown :

```markdown
# [Nom de la fonctionnalité] Implementation Plan

**Goal:** [Une phrase décrivant ce que cela construit]
**Architecture:** [2-3 sentences about approach]
**Tech Stack:** [Key technologies/libraries]
---
```

## Structure des Tâches
Chaque tâche doit être détaillée comme suit :

### Tâche N: [Nom du Composant]
**Fichiers :**
- Créer: `chemin/exact/vers/fichier.py`
- Modifier: `chemin/exact/vers/existant.py:123-145`
- Tester: `tests/chemin/vers/test.py`

**Étape 1: Écrire le test qui échoue**
(Insérer le code complet du test ici)

**Étape 2: Vérifier l'échec**
Commande: `commande de test`
Attendu: FAIL avec l'erreur spécifique

**Étape 3: Implémenter le code minimal**
(Insérer le code complet ici)

**Étape 4: Vérifier le succès**
Commande: `commande de test`
Attendu: PASS

**Étape 5: Commit**
```bash
git add ...
git commit -m "feat: ..."
```

## Rappels Importants
- **Chemins de fichiers exacts** : Toujours utiliser des chemins complets.
- **Code complet** : Ne jamais dire "ajoutez la validation ici", écrivez le code complet.
- **Commandes exactes** : Fournir les commandes prêtes à l'emploi.
- **TDD strict** : Toujours commencer par le test.
