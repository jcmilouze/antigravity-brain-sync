---
name: model-routing-policy
description: Sélectionne le meilleur modèle Ollama selon la nature de la tâche de développement. Priorité aux modèles locaux pour économiser les tokens payants.
keywords: ["modèle", "ollama", "routing", "local", "tokens", "qwen", "deepseek", "mistral", "llama"]
priority: high
---

# 🎯 Objectif
Choisir le **modèle Ollama optimal** pour chaque tâche de développement en fonction de :
- complexité technique
- type de raisonnement requis  
- présence d'éléments visuels
- contraintes de performance
- objectif d'économie de tokens

**NE JAMAIS choisir un modèle payant par défaut.**

# 📋 Modèles disponibles et leurs forces

| Modèle | Taille | Forces principales | Idéal pour |
|--------|--------|-------------------|------------|
| `gemma4:31b` | 31B (Dense) | **Native Reasoning (Next-Gen), logic Frontier** | Analyse stratégique, planification, audit |
| `gemma4:26b` | 26B (MoE) | **Agentic Workflows (Native Tooling), rapid** | Orchestration MCP, brainstorming, automatisation |
| `qwen3.5:35b-q3_K_M` | 35B (MoE) | **SWE 37-69%, FIM expert, optimized for coding** | Génération de composants, refactor, debug code |
| `mistral-nemo:latest` | 12B | **Ultra-fluid redaction, multilingual 140+** | Copywriting, documentation, chat éducatif |
| `llama3.2-vision:latest` | Vision | **Multimodal Native (Text/Image/Video)** | Debug UI, analyse screenshots, vision assistée |

# 🔄 Classification des tâches

## 🟢 LOCAL-SAFE (modèle rapide)
**llama3.1:8b** (priorité vitesse)
├── petits edits, renommages
├── CSS/UI simple, boilerplate
├── tests unitaires standards
├── formatage, documentation
├── CRUD basique sans logique complexe
├── commits, petits refactors

## 🟡 LOCAL-FIRST (modèle spécialisé)
gemma4:31b → qwen3.5:35b → gemma4:26b
├── planification & stratégie projet
├── logique métier complexe
├── orchestration multi-agents (MCP)
├── audit de sécurité & architecture
├── génération de code (via Qwen)

## 🔵 PREMIUM-ONLY (si local échoue)
deepseek-r1:14b → qwen2.5-coder:32b → modèle payant
├── debug non reproductible
├── sécurité/auth critique
├── migrations sensibles
├── performance critique
├── revue finale PR importante

## 👁️ VISION (spécifique)
llama3.2-vision:latest
├── analyse screenshots
├── debug UI visuel
├── review captures d'écran
├── diagrammes, charts
├── analyse wireframes

# ⚙️ Règles de sélection
PRIORITÉ 1 : VITESSE (llama3.1:8b)
├── tâche simple ET rapide
├── contexte court (< 8k tokens)
├── pas de raisonnement complexe

PRIORITÉ 2 : QUALITÉ CODE (qwen3.5:35b-q3_K_M)
├── génération/refactor complexe
├── architecture, design patterns
├── code critique (prod)

PRIORITÉ 3 : RAISONNEMENT (gemma4:31b)
├── planification complexe
├── math/logique pure
├── analyse stratégique

PRIORITÉ 4 : PRÉCISION (mistral-nemo)
├── instructions très précises
├── workflows multi-étapes
├── génération structurée

PRIORITÉ 5 : VISUEL (llama3.2-vision)
├── images, screenshots, UI

# 📤 Format de sortie obligatoire
🎯 Tâche classée
Type : [LOCAL-SAFE | LOCAL-FIRST | PREMIUM-ONLY | VISION]
Complexité : [basse | moyenne | haute]
Contexte estimé : [petit | moyen | long]

🤖 Modèle sélectionné
preferred_model : ollama/[modèle:tag]
reason : [1-2 phrases expliquant le choix]
speed_estimate : [rapide | normal | lent]
quality_expectation : [standard | haute | critique]

🔄 Escalade (si applicable)
fallback_model : [modèle suivant]
conditions : [quand passer au suivant]

# 🚫 Contraintes strictes
❌ Ne pas choisir modèle payant par défaut
❌ Ne pas ignorer la hiérarchie de performance
❌ Ne pas surestimer les capacités d'un petit modèle
❌ Ne pas sous-estimer les risques d'un gros modèle
✅ Toujours justifier le choix brièvement
✅ Préciser les conditions d'escalade
✅ Respecter les forces spécialisées de chaque modèle

# 💡 Exemples concrets

## Exemple 1 : LOCAL-SAFE
Tâche : "Ajoute un bouton 'Exporter CSV' dans le dashboard"
→ llama3.1:8b
Raison : UI simple + logique CRUD standard

## Exemple 2 : LOCAL-FIRST
Tâche : "Optimise la query users qui fait timeout"
→ qwen2.5-coder:32b
Raison : analyse perf + refactor complexe
Fallback : deepseek-r1:14b si raisonnement SQL complexe

## Exemple 3 : VISION  
Tâche : "Debug cette capture d'écran du bug de layout"
→ llama3.2-vision:latest
Raison : analyse visuelle UI

## Exemple 4 : PREMIUM-ONLY
Tâche : "Implémente OAuth2 avec refresh tokens"
→ deepseek-r1:14b → qwen2.5-coder:32b → gemini-pro
Raison : sécurité critique + logique complexe

# 🎛️ Commandes de sélection rapide
@model-fast → gemma4:26b
@model-code → qwen3.5:35b-q3_K_M
@model-reason → gemma4:31b
@model-precise → mistral-nemo:latest
@model-vision → llama3.2-vision:latest
