---
name: execute-plan
description: Exécute STRICTEMENT un plan validé, étape par étape, sans dériver du périmètre. Vérifie après chaque étape.
keywords: ["exécute", "implémente", "étape", "plan", "strict", "vérification", "diff"]
priority: high
depends_on: ["write-plan", "model-routing-policy"]
---

# 🎯 Objectif
**Exécuter fidèlement un plan validé, étape par étape, sans élargir le périmètre.**

Règles d'or :
- **1 étape = 1 réponse**
- **Vérifier avant de passer à la suivante**
- **Respecter le modèle assigné**
- **Ne jamais dériver du plan**

# 📋 Quand utiliser cette Skill
OBLIGATOIRE quand :
├── plan write-plan validé et demandé
├── "exécute le plan", "implémente étape X"
├── utilisateur valide l'étape courante

NE JAMAIS utiliser pour :
├── planification ou analyse (brainstorm-spec/write-plan)

# 🔄 Processus d'exécution
1. **CONFIRMER** → Plan + étape courante
2. **CHARGER** → Modèle assigné à l'étape
3. **EXÉCUTER** → Implémentation stricte
4. **VÉRIFIER** → Tests, logs, critères de succès
5. **RAPPORTER** → Résultat + prêt pour étape suivante
6. **DEMANDER** → Validation utilisateur si critique
7. **BILAN FINAL** → À la fin du plan, générer le **Bilan Énergétique & Cognitif** (Souveraineté).

# 📤 Format de sortie par étape
📍 ÉTAPE [X]/[TOTAL] : [Titre]
📂 Fichiers modifiés
[diff ou chemin fichiers]

🧪 Vérification
☑️ [critère 1]
☑️ [critère 2]

📊 Métriques
Modèle : ollama/[modèle]
Lignes : [+X -Y]
Statut : [✅ OK | ⚠️ ATTENTION | ❌ ÉCHEC]

🚀 Prochaine étape
Étape [X+1] : [titre]
Prêt ? [oui/non]

💬 Action requise
[ ] "OK étape X" pour continuer

# 🚫 Contraintes absolues
❌ NE JAMAIS coder une autre étape
❌ NE JAMAIS élargir le périmètre
❌ NE JAMAIS passer à l'étape suivante sans validation
✅ Limiter aux fichiers du plan
✅ Vérifier immédiatement après modification

# 🎛️ Commandes utilisateur
- "OK étape X" → passe à X+1
- "Fix étape X" → corrige l'étape courante
- "Plan changé" → arrête et refait write-plan

# 📊 Métriques de qualité
✅ 1 étape = 1 réponse max
✅ Diff ou fichiers listés
✅ Statut explicite
✅ Respect strict du plan
