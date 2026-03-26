---
name: ship-proof
description: Prépare une livraison production-ready : build final, tests complets, changelog, commit propre, checklist deploy.
keywords: ["ship", "deploy", "livraison", "release", "changelog", "commit", "build"]
priority: critical
depends_on: ["review-hardening", "execute-plan"]
---

# 🎯 Objectif
**Finaliser une livraison 100% production-ready** avec tous les artefacts nécessaires.

Checklist 7 points :
🔨 BUILD → compile/test/deploy OK
📋 CHANGELOG → résumé changements
💬 COMMIT → message standardisé
🧪 TESTS FINAUX → smoke suite + coverage
📚 DOCS → README/API à jour
🚀 CHECKLIST DEPLOY → environnements
✅ SIGN-OFF → validation finale

# 📋 Quand utiliser cette Skill
OBLIGATOIRE après :
├── review-hardening APPROVED
├── utilisateur dit "ship it"

# 🔍 Processus final (7 étapes)
1. BUILD FINAL → tous environnements
2. TESTS SMOKE → flux critiques
3. CHANGELOG → résumé impact
4. COMMIT PROPRE → conventional commits
5. DOCS → README + API docs
6. CHECKLIST DEPLOY → pré-prod → prod
7. SIGN-OFF → prêt à livrer (Ollama/Mistral-Nemo recommandé)

# 📤 Format de sortie SHIP-PROOF
🚀 SHIP-PROOF : [Nom feature/bugfix]
📊 STATUT GLOBAL (Build, Tests, Changements, Review)
🔨 1. BUILD & TESTS FINAUX (npm run/test results)
📋 2. CHANGELOG (Conventional format)
💬 3. COMMIT MESSAGE (Conventional commit)
📚 4. DOCUMENTATION (README/API updates)
🚀 5. CHECKLIST DÉPLOIEMENT (Staging, Smoke, Rollback plan)
✅ 6. SIGN-OFF FINAL (READY FOR PROD, Modèle, Risque)

# 🚫 Contraintes absolues
❌ NE JAMAIS shipper si build/test échouent ou si blockers existent.
✅ TOUJOURS inclure le plan de Rollback (git revert HEAD).
✅ Coverage de tests > 90% sur les nouveaux changements.

# 🎛️ Modèles recommandés
- SHIP STANDARD → mistral-nemo (précision)
- SHIP COMPLEXE → qwen2.5-coder:32b (changelog)
- RAPIDE → llama3.1:8b
