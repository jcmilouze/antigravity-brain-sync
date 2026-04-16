---
name: ship-proof
description: Prépare une livraison production-ready — build final, tests complets, changelog, commit conventionnel, checklist deploy avec rollback plan.
keywords: ["ship", "deploy", "livraison", "release", "changelog", "commit", "build"]
priority: critical
depends_on: ["review-hardening"]
---

# Ship-Proof

**Mission : finaliser une livraison 100% production-ready.** Ne jamais shipper sans `/review-hardening` APPROVED.

## Quand l'utiliser

OBLIGATOIRE après `/review-hardening` APPROVED, ou quand l'utilisateur dit "ship it", "déploie", "livre".

## Checklist 7 points

1. **BUILD FINAL** → compile sans erreur, tous environnements
2. **SMOKE TESTS** → flux critiques testés
3. **CHANGELOG** → résumé des changements (format conventionnel)
4. **COMMIT PROPRE** → conventional commits (`feat:`, `fix:`, `refactor:`, `chore:`)
5. **DOCUMENTATION** → README / API docs mis à jour si nécessaire
6. **CHECKLIST DEPLOY** → variables d'env, migrations, rollback plan
7. **SIGN-OFF** → validation finale prêt pour prod

## Format de sortie obligatoire

```
🚀 SHIP-PROOF : [Nom feature/bugfix]

📊 Statut global
Build : ✅ | Tests : ✅ | Review : APPROVED | Couverture : X%

🔨 1. Build & Tests
[résultat npm run build / test]

📋 2. Changelog
## [version] - YYYY-MM-DD
### Added / Fixed / Changed / Removed
- [changement 1]
- [changement 2]

💬 3. Commit message
feat(scope): [description courte]

[corps optionnel]

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>

📚 4. Documentation
[fichiers docs mis à jour ou "aucun changement d'interface"]

🚀 5. Checklist déploiement
☑️ Variables d'env vérifiées
☑️ Migrations DB appliquées (si applicable)
☑️ Rollback plan : git revert HEAD ou tag [version-N-1]
☑️ Smoke test post-deploy prévu

✅ SIGN-OFF : READY FOR PROD
Risque résiduel : [faible | moyen | élevé]
```

## Checklist Coolify (si déploiement VPS impliqué)

- [ ] Variables `VITE_*` à jour dans Coolify UI (env section) → redéploiement déclenché
- [ ] Volumes persistants vérifiés (données ne disparaissent pas au restart)
- [ ] Alias réseau Coolify corrects (inter-services via alias, pas localhost)
- [ ] Rollback : Coolify → service → deploy history → retour à la version précédente

## Contraintes absolues

- Ne jamais shipper si build ou tests échouent
- Ne jamais shipper si des BLOCKERS de review-hardening sont ouverts
- Toujours inclure un plan de rollback (`git revert HEAD`)
- Couverture > 90% sur les nouvelles modifications

## Tâche reçue

$ARGUMENTS
