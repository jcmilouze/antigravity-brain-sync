---
name: review-hardening
description: Revue qualité systématique avant livraison — sécurité, dette technique, régression, lisibilité, edge cases. Bloque les livrables imparfaits.
keywords: ["review", "qualité", "sécurité", "dette", "régression", "audit", "hardening"]
priority: critical
depends_on: ["execute-plan"]
---

# Review-Hardening

**Mission : garantir un code de qualité production** avant toute livraison ou merge. Bloque si des seuils critiques ne sont pas atteints.

## Quand l'utiliser

OBLIGATOIRE après `/execute-plan` (> 2 étapes), modification sécurité/auth/DB, refactor multi-fichiers.

## Vérification 4 niveaux (GSD)

Avant tout checkpoint, valider ces 4 niveaux pour chaque artefact livré :

| Niveau | Question | Méthode |
|--------|----------|---------|
| **Exists** | Le fichier/fonction est-il présent ? | `ls`, `grep` |
| **Substantive** | Est-ce une vraie implémentation (pas un stub) ? | Chercher : `TODO`, `FIXME`, `placeholder`, `[]`, `{}`, `null`, `// ...` |
| **Wired** | Est-il connecté au système (importé, appelé, routé) ? | Tracer les imports, les handlers, les routes |
| **Functional** | Fonctionne-t-il réellement quand on l'invoque ? | Test manuel / CI / vérification humaine |

Niveaux 1-3 = vérifiables automatiquement. Niveau 4 = checkpoint humain.

## 8 Checkpoints obligatoires

1. **SÉCURITÉ** : SQLi, XSS, secrets hardcodés, CORS unrestricted, auth
2. **DETTE TECHNIQUE** : duplication, complexité cyclomatique > 10, magic numbers
3. **TESTS** : couverture > 80% nouveaux changements, edge cases
4. **LISIBILITÉ** : noms explicites, commentaires utiles (pas de bruit)
5. **EDGE CASES** : null/undefined, timeouts, erreurs réseau
6. **PERFORMANCE** : N+1 queries, boucles O(n²), bundle size
7. **MAINTENANCE** : backward compat, gestion d'erreurs, évolutivité
8. **DOCUMENTATION** : README et API docs à jour si changement d'interface

## Format de sortie obligatoire

```
🔍 REVIEW HARDENING : [Tâche/Feature]

📊 Verdict global : APPROVED ✅ | WARNINGS ⚠️ | BLOCKED 🛑

| # | Checkpoint | Statut | Détail | Action requise |
|---|-----------|--------|--------|----------------|
| 1 | Sécurité | ✅/⚠️/🛑 | [...] | [...] |
| 2 | Dette tech | ... | ... | ... |
| ... | ... | ... | ... | ... |

🛑 BLOCKERS (à corriger avant de continuer)
- [blocker 1 → correctif requis]

⚠️ WARNINGS (améliorations recommandées)
- [warning 1]

🚀 Recommandation : APPROVED → /ship-proof | FIX → corriger d'abord | BLOCKED → stop
```

## Seuils bloquants (BLOCKED automatique)

- Vulnérabilités OWASP Top 10 présentes
- Secrets hardcodés dans le code
- SQL non paramétrisé
- Tests < 80% sur les nouvelles modifications
- Fonctions > 50 lignes sans justification
- CORS unrestricted en prod

## Modèles recommandés

- Review standard → `gemma4:31b` (raisonnement critique)
- Sécurité critique → déléguer à un audit manuel
- Code complexe → `qwen3.5:35b`

## Tâche reçue

$ARGUMENTS
