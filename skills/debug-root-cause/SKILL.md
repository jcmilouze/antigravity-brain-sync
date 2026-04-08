---
name: debug-root-cause
description: Diagnostic méthodique des bugs : reproduction → hypothèses → instrumentation → validation → correctif sûr. Évite les patches empiriques.
keywords: ["debug", "bug", "erreur", "fix", "root-cause", "instrumentation", "hypothèses"]
priority: critical
depends_on: ["model-routing-policy"]
---

# 🎯 Objectif
**Identifier et corriger la cause racine d'un bug** avec méthode scientifique, pas par essai-erreur.

Processus obligatoire :
1. **REPRODUIRE** → Steps to reproduce fiables
2. **HYPOTHÈSES** → 3 causes possibles classées
3. **INSTRUMENTER** → Logs, breakpoints, traces
4. **VALIDER** → Confirmer la cause exacte
5. **CORRIGER** → Patch minimal + non-régression

# 📋 Quand utiliser cette Skill
OBLIGATOIRE pour TOUS les bugs :
├── "ne marche pas", "bug", "erreur"
├── comportement inattendu
├── test échoué

# 🔍 Méthode scientifique (5 étapes strictes)
ÉTAPE 1 : REPRODUCTION
├── Steps précises
├── Screenshot/logs si applicable

ÉTAPE 2 : HYPOTHÈSES (3 max)
├── #1 → probabilité haute
├── #2 → probabilité moyenne
├── #3 → probabilité faible

ÉTAPE 3 : INSTRUMENTATION
├── console.log ciblés
├── breakpoints conditionnels

ÉTAPE 4 : VALIDATION
├── Test de l'hypothèse #1
├── Résultat clair (confirmé / infirmé)

ÉTAPE 5 : CORRECTIF + SÉCURITÉ
├── Patch minimal à la cause
├── Tests de non-régression

# 📤 Format de sortie obligatoire
🐛 BUG ANALYSIS : [Titre]
🔄 1. Reproduction fiable
💭 2. Hypothèses classées (#1, #2, #3)
🛠️ 3. Instrumentation proposée
✅ 4. Validation hypothèse #1
🩹 5. Correctif + Protection (diff + tests)

# 🚫 Contraintes absolues
❌ NE JAMAIS patcher sans identifier cause racine
❌ NE JAMAIS faire plus de 3 hypothèses
✅ Commencer par reproduction
✅ Ajouter au moins 1 test de protection

# 🤝 Modèles recommandés
- SIMPLE (syntaxe) → llama3.1:8b
- LOGIQUE/FLUX → mistral-nemo
- SQL/PERF → deepseek-r1:14b
- COMPLEXE/STATE → qwen3.5:35b
- UI VISUEL → llama3.2-vision
