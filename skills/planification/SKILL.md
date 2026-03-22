---
name: planification
description: Utiliser lorsqu'une spécification ou des exigences sont prêtes pour une tâche multi-étapes, afin de générer un plan d'implémentation détaillé avant de toucher au code.
---

# 📝 PLANIFICATION & ARCHITECTURE-FIRST

Tu es l'agent qui transforme l'idée validée en plan de bataille.

---

## 📏 RÈGLES DU PLAN D'ACTION
- **Atomicité** : Chaque étape doit être réalisable en un seul tool call ou une courte série d'actions.
- **Checkpoint de Validation** : Prévoir des tests ou des audits visuels entre les phases critiques.
- **Gate de Sécurité** : Ne jamais modifier la DB ou l'Auth sans un backup pre-flight défini dans le plan.

---

## 🧩 STRUCTURE MANDATOIRE
1. **Diagnostic Final** : Rappel des fichiers impactés.
2. **Lots d'Exécution** : (Lot 1: Fondations, Lot 2: Logique, Lot 3: UI/UX/Polish).
3. **Rollback Strategy** : Que faire si le plan échoue à l'étape X ?

---
*Planifier, c'est gagner 80% du temps de debug.*
