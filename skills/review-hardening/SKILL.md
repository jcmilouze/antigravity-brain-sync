---
name: review-hardening
description: Revue qualité systématique avant livraison : sécurité, dette technique, régression, lisibilité, edge cases. Bloque les livrables imparfaits.
keywords: ["review", "qualité", "sécurité", "dette", "régression", "audit", "hardening"]
priority: critical
depends_on: ["execute-plan", "debug-root-cause"]
---

# 🎯 Objectif
**Garantir un code de qualité production** avant toute livraison ou merge.

Checklist obligatoire 8 points :
🔒 SÉCURITÉ → vulnérabilités, injections
📏 DETTE TECH → duplication, complexité
🧪 RÉGRESSION → tests existants toujours OK
📖 LISIBILITÉ → conventions, commentaires
🌐 EDGE CASES → cas limites testés
🚀 PERFORMANCE → bottlenecks évités
🔄 MAINTENANCE → évolutivité préservée
📋 DOCUMENTATION → README/API docs à jour

# 📋 Quand utiliser cette Skill
OBLIGATOIRE :
├── après execute-plan (> 2 étapes)
├── modification sécurité/auth/DB
├── refactor impactant plusieurs fichiers

# 🔍 Revue systématique (8 checkpoints)
1. **SÉCURITÉ** : SQLi, XSS, Secrets, Auth.
2. **DETTE TECHNIQUE** : Duplication, complexité (> 10), Magic numbers.
3. **TESTS** : Couverture (> 80%), edge cases.
4. **LISIBILITÉ** : Noms explicites, commentaires utiles.
5. **EDGE CASES** : Null, undefined, timeouts.
6. **PERFORMANCE** : N+1 queries, boucles O(n²).
7. **MAINTENANCE** : Backward compatibility, gestion erreurs.
8. **DOCUMENTATION** : README/API docs à jour.

# 📤 Format de sortie obligatoire
🔍 REVIEW HARDENING : [Tâche]
📊 Résumé global (READY | WARNINGS | BLOCKER)
✅ CHECKLIST 8 POINTS (Tableau Statut/Détails/Action)
🛑 BLOCKERS (Si applicable)
⚠️ WARNINGS (Améliorations)
🚀 Recommandation finale (APPROVED | FIX | BLOCKED)

# 🚫 Contraintes absolues
❌ NE JAMAIS approuver avec BLOCKERS non résolus.
❌ NE JAMAIS ignorer des vulnérabilités de sécurité.
✅ Signaler Magic numbers > 3 et Fonctions > 50 lignes.

# 🎛️ Modèles recommandés
- REVIEW STANDARD → mistral-nemo
- SECURITY CRITIQUE → deepseek-r1:14b
- CODE COMPLEXE → qwen2.5-coder:32b
- UI VISUELLE → llama3.2-vision
- RAPIDE → llama3.1:8b

# 📊 Métriques seuils bloquants
- Vulnérabilités OWASP Top 10
- Tests < 80% couverture nouveaux changements
- Secrets hardcodés
- Droits DB excessifs
