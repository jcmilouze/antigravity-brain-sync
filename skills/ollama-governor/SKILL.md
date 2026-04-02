---
name: ollama-governor
description: >
  Orchestrateur dynamique de VRAM pour RTX 4090. Gère le cycle de vie des modèles locaux (chargement/déchargement) pour optimiser les performances et minimiser les coûts cloud.
category: "IA & Agents"
risk: bas
source: antigravity-manifesto-2.0
date_added: "2026-03-23"
---

# 🏛️ Skill: OLLAMA-GOVERNOR (VRAM Dynamic Orchestrator)

## 🆔 ID & Mission
**Nom** : `ollama-governor`
**Mission** : Gérer l'alternance entre les modèles de Codage Lourd (Qwen 3.5 35B) et les modèles de Raisonnement (14B) sur une RTX 4090 pour garantir 0 lag et 100% de précision. 
**Priorité Absolue** : Le Local-First. Utiliser les modèles Ollama au détriment des jetons Gemini payants pour toutes les tâches de code et de raisonnement standard.

---

## 🏗️ PROTOCOLE DE DÉMARRAGE (Bootstrap Antigravity)
À chaque début de session ou de nouveau développement :
1. **Audit Serveur** : Vérifier si `ollama` est en cours d'exécution via le port 11434.
2. **Auto-Lancement** : Si le serveur est éteint, lancer `& "$env:LOCALAPPDATA\Programs\Ollama\ollama.exe" serve`.
3. **Ciblage Antigravity** : S'assurer que les modèles critiques (`deepseek-r1:14b` et `qwen3.5:35b`) sont présents.

---

## 🛠️ MODES D'EXÉCUTION

### 1. 💻 MODE CODAGE (Power Shift)
- **Modèle** : `qwen3.5:35b`
- **Action** : 
  1. Décharger le modèle de raisonnement : `Invoke-RestMethod -Method Post -Uri "http://localhost:11434/api/generate" -Body '{"model": "deepseek-r1:14b", "keep_alive": 0}'`
  2. Charger le MoE : `& "$env:LOCALAPPDATA\Programs\Ollama\ollama.exe" run qwen3.5:35b`
- **Usage** : Génération de composants React, refactorisation massive, CSS complexe.

### 2. 🧠 MODE ANALYSE (Reasoning Shift)
- **Modèle** : `deepseek-r1:14b`
- **Action** :
  1. **API Unload** : `Invoke-RestMethod -Method Post -Uri "http://localhost:11434/api/generate" -Body '{"model": "qwen3.5:35b", "keep_alive": 0}'`
  2. **Load Analyst** : `ollama run deepseek-r1:14b`
- **Usage** : Planification, audit UI/UX, stratégie de marque, logique métier.

### 3. ⚡ ASTUCE PERFORMANCE (Zero-Restart)
Pour basculer instantanément sans redémarrer le serveur Ollama : 
Utiliser systématiquement `keep_alive: 0` via l'API `/api/generate` ou `/api/chat` pour forcer la libération de la VRAM avant de charger le modèle suivant.

---

## 📏 RÈGLES DE GOUVERNANCE
- **Vérification VRAM** : Avant chaque switch, lancer `nvidia-smi`.
- **Zéro Conflit** : Ne JAMAIS charger les deux modèles simultanément s'ils dépassent 20 Go au total.
- **Transparence** : Toujours annoncer le switch à l'utilisateur : *"Gouverneur, je bascule en Mode Codage..."*

---

## 💰 POLITIQUE D'ÉCONOMIE D'ÉNERGIE (Quotas Cloud)
**Règle d'or** : Antigravity n'appelle Gemini que si :
1. La fenêtre de contexte dépasse 32k tokens.
2. Une analyse de vision (image) complexe est requise (si non gérée localement).
3. Le besoin de raisonnement dépasse les capacités de Ministral-14B (rareté extrême).

**Dans tous les autres cas : Use Local.**

---
*Initialisé le : 22 Mars 2026 — Antigravity Execution Governor (v2.1 - Standardized).*
