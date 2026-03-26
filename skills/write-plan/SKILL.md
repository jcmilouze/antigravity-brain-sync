---
name: write-plan
description: Transforme une spécification claire en plan d'exécution atomique, séquencé, testable avec fichiers, tests, modèles et dépendances.
keywords: ["plan", "étapes", "exécution", "tâches", "dépendances", "séquence", "roadmap"]
priority: high
depends_on: ["brainstorm-spec", "model-routing-policy"]
---

# 🎯 Objectif
**Produire un plan d'exécution précis et séquencé** à partir d'une spécification claire.

Chaque étape DOIT être :
- **atomique** (1 responsabilité)
- **testable** (critère de succès mesurable)
- **localisée** (fichiers impactés)
- **modélisée** (modèle Ollama recommandé)

# 📋 Quand utiliser cette Skill
OBLIGATOIRE après :
├── brainstorm-spec validée
├── demande multi-fichiers/étapes
├── complexité moyenne ou haute
├── risques critiques identifiés

FACULTATIF pour :
├── LOCAL-SAFE simples (1 fichier)

# 🔍 Processus de décomposition (5 étapes)
1. **ANALYSE** → Comprendre la spec + contraintes
2. **DÉCOUPAGE** → Tâches atomiques par priorité
3. **LOCALISATION** → Fichiers, agents, MCPs concernés
4. **MODÉLISATION** → Modèle Ollama optimal par étape
5. **SÉQUENÇAGE** → Ordre logique + dépendances

# 📤 Format de sortie obligatoire
🎯 Objectif rappel
[1 phrase de la spec]

📊 Métriques plan
Nombre d'étapes : [X]
Complexité totale : [basse | moyenne | haute]
Modèles utilisés : [résumé]

🚀 Plan d'exécution
| # | Étape | Fichiers | Tests/Validation | Risques | Modèle | Dépendances |
|---|---|---|---|---|---|---|
| 1 | [desc] | [fichiers] | [critère] | [risque] | ollama/[modèle] | - |
| 2 | ... | ... | ... | ... | ... | ... |

🔄 Dépendances critiques
- Étape X bloque Y
- Migration DB avant code

⚠️ Points de validation utilisateur
- [Étapes nécessitant validation]

# 🚫 Contraintes strictes
❌ Ne pas coder (laisser à execute-plan)
❌ Ne pas dépasser 8 étapes maximum
❌ Ne pas mélanger responsabilités
❌ Ne pas ignorer les dépendances
✅ Chaque étape doit avoir un critère de succès
✅ Maximum 5 fichiers par étape
✅ Modèle Ollama explicite pour chaque étape

# 💡 Exemples concrets (Endpoint /stats)
## 🚀 Plan d'exécution
| # | Étape | Fichiers | Tests/Validation | Risques | Modèle | Dépendances |
|---|-------|----------|------------------|---------|--------|-------------|
| 1 | Service stats | services/stats.js | 3 unit tests | perf | qwen2.5-coder:32b | - |
| 2 | Route API | routes/stats.js | 2 integration tests | auth | llama3.1:8b | 1 |

# 🎛️ Signaux de déclenchement
Activer quand :
├── spec brainstorm-spec disponible
├── "implémente", "ajoute", "crée", "fixe"
├── > 1 fichier impacté

# 🤝 Intégration écosystème
Agents : @product-manager, @brainstorming, Frontend
MCPs : Postgres-velotrack, n8n-mcp, Clerk

# 🚀 Prochaines étapes automatiques
1. execute-plan → exécution disciplinée
2. review-hardening → vérification qualité
3. ship-proof → livraison
