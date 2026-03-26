---
name: agent-orchestration
description: Cerveau Central d'Antigravity. Ce protocole définit comment l'Agent choisit ses LLMs et ses Skills avant chaque action stratégique.
---

# 🛰️ ANTIGRAVITY ORCHESTRATION — PROTOCOLE GLOBAL

Ce protocole définit l'intelligence de routage pour maximiser l'usage de la RTX 4090 et économiser les tokens Gemini.

## 🕹️ Commande : `/orchestrate`

### 1️⃣ Phase d'Audit Sémantique (LLM Selection Matrix)

| Type de Tâche | Modèle Local (Ollama) | Modèle Cloud (Fallback) |
| :--- | :--- | :--- |
| **Planification / RAISONNEMENT** | `deepseek-r1:14b` | Gemini 2.0 Flash (si context > 32k) |
| **CODAGE Lourd / Refactoring** | `qwen2.5-coder:32b` | Gemini 2.0 Pro (si local OOM) |
| **UI Analysis / VISION** | `llama3.2-vision:latest` | Gemini 2.0 Flash |
| **Copywriting / Polish FR** | `mistral-nemo:latest` | - |
| **Micro-tâches / JSON** | `llama3.1:8b` | - |

### 2️⃣ Phase de Délégation (Skills Mapping)
Mapper la demande aux experts internes en utilisant la puissance locale :
- **Front & Design** ➔ `@frontend-lead` + `qwen2.5-coder:32b`
- **Back & SQL** ➔ `@backend-architect` + `qwen2.5-coder:32b`
- **Infra & Security** ➔ `@devsecops` + `deepseek-r1:14b`
- **QA & Testing** ➔ `@qa-engineer` + `qwen2.5-coder:32b`

### 3️⃣ Reality Check & Safety Gate (The Token Saver)
1. **Ollama Check** : Vérifier que le serveur Ollama est actif.
2. **Context Audit** : Si la tâche fait moins de 30k tokens, **INTERDICTION** d'utiliser Gemini pour autre chose que l'orchestration.
3. **VRAM Guard** : Appeler `@ollama-governor` pour décharger les modèles inactifs avant de charger le monstre de 32B.

---
*Gouverneur d'Exécution Antigravity — Constitution v2.0 (RTX 4090 Optimized).*
