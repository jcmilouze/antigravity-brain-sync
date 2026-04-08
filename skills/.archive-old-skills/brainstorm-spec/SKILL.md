---
name: brainstorm-spec
description: Clarifie l'objectif réel, détecte les contraintes cachées, définit les critères d'acceptation et identifie les risques avant toute implémentation.
keywords: ["brainstorm", "spec", "analyse", "risques", "critères", "hypothèses", "clarification"]
priority: high
---

# 🎯 Objectif
**Transformer une demande floue en spécification claire et exécutable** avant toute implémentation.

Produire :
- l'objectif reformulé
- les hypothèses à valider
- les critères d'acceptation précis
- les risques identifiés
- la classification de tâche pour model-routing

# 📋 Quand utiliser cette Skill
OBLIGATOIRE pour :
├── nouvelle feature / endpoint
├── refactor ou changement multi-fichiers
├── modification BDD / données
├── correction de bug non reproductible
├── changement d'architecture
├── intégration externe (API, auth, etc.)

FACULTATIF pour :
├── petits edits locaux (1 fichier, < 50 lignes)
├── CSS/UI purement visuelle
├── documentation / commentaires

# 🔍 Processus d'analyse (8 étapes)
1. **REFORMULER** → Objectif en 1 phrase claire
2. **CONTEXTE** → Fichiers, dépendances, agents/MCPs concernés
3. **HYPOTHÈSES** → Ce qui doit être vrai pour réussir
4. **CRITÈRES** → Conditions d'acceptation mesurables
5. **RISQUES** → Ce qui peut casser ou dégrader
6. **DÉCISION** → Proposer systématiquement l'option préférée (Tech Lead Choice) avec justification.
7. **CLASSIFICATION** → Type de tâche + modèle recommandé
8. **PROCHAINES ÉTAPES** → Skills suivantes suggérées

# 📤 Format de sortie obligatoire
🎯 Objectif reformulé
[1 phrase précise]

📂 Contexte projet
Fichiers concernés : [...]
Agents/MCPs : [...]
Contraintes existantes : [...]

❓ Hypothèses à valider
- [hypothèse 1]
- [hypothèse 2]

✅ Critères d'acceptation
MAJEUR (sans ça = échec) :
- [critère 1]
- [critère 2]

SECONDAIRE :
- [critère 3]
- [critère 4]

⚠️ Risques identifiés
CRITIQUE :
- [risque 1 → impact → mitigation]

MOYEN :
- [risque 2 → impact → mitigation]

FAIBLE :
- [risque 3]

📊 Classification (pour model-routing-policy)
Type : [LOCAL-SAFE | LOCAL-FIRST | PREMIUM-ONLY | VISION]
Complexité : [basse | moyenne | haute]
Modèle recommandé : ollama/[modèle]

🚀 Prochaines étapes suggérées
[Skill suivante]

# 🚫 Contraintes strictes
❌ Ne pas proposer de code
❌ Ne pas choisir de modèle (laisser à model-routing-policy)
❌ Ne pas élargir le périmètre
❌ Ne pas ignorer les risques
✅ Toujours classer la tâche explicitement
✅ Toujours proposer des critères mesurables
✅ Toujours orienter vers la meilleure solution technique (Décision Lead).
✅ Toujours signaler les zones floues

# 💡 Exemples concrets

## Exemple 1 : Nouvelle feature
Demande : "Ajoute un endpoint /stats"
🎯 Objectif reformulé : Ajouter un endpoint GET /stats qui retourne les métriques essentielles du dashboard.
📊 Classification : Type: LOCAL-FIRST, Complexité: moyenne, Modèle: ollama/qwen2.5-coder:32b

## Exemple 2 : Bug
Demande : "Le bouton save ne marche plus"
🎯 Objectif reformulé : Restaurer le fonctionnement du bouton "Save" qui ne persiste plus les modifications.
⚠️ Risques identifiés : CRITIQUE Perte de données existantes, Dégradation autres formulaires.

# 🎛️ Signaux de déclenchement
Utiliser cette Skill quand la demande contient :
├── "ajoute", "implémente", "crée"
├── "fix", "corrige", "répare"
├── "refactor", "optimise", "améliore"
├── "migre", "change", "modifie" (multi-fichiers)
├── manque de détails techniques
├── impact potentiel sur données/prod

# 🤝 Intégration agents existants
@product-manager → validation métier
@brainstorming → exploration options
@planification → décomposition tâches
Postgres-velotrack → analyse données existantes
n8n-mcp → workflows associés
Clerk → auth impactée

# 📈 Checklist qualité
☑️ Objectif reformulé en 1 phrase
☑️ Fichiers et dépendances listés
☑️ 2-5 hypothèses explicites
☑️ Critères mesurables (pas "ça marche")
☑️ Au moins 1 risque critique identifié
☑️ Classification cohérente
☑️ Prochaines étapes logiques
