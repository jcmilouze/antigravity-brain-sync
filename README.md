# 🌌 Antigravity Brain Sync

Ce dépôt contient la synchronisation du "Search & Knowledge" de l'instance Antigravity (PC/Mac).

## 🍏 Setup & Migration Mac (Copy-Paste)

Pour installer ton environnement Antigravity sur un nouveau Mac :

### 1. Initialiser le Cerveau (The Brain)
```bash
mkdir -p ~/.gemini/antigravity && cd ~/.gemini/antigravity && git clone https://github.com/jcmilouze/antigravity-brain-sync.git .
```

### 2. Compiler l'Extension Sync
```bash
cd extension && npm install && npm run package
```

### 3. Installer dans VS Code
1. Ouvre VS Code sur Mac.
2. `Cmd + Shift + X` (Extensions) > `...` (Menu) > **Install from VSIX...**.
3. Sélectionne : `~/.gemini/antigravity/extension/antigravity-vscode-sync-1.0.0.vsix`.

### 4. Première Synchronisation
Clique sur `🌀 Antigravity Sync` (Barre de statut) > `📥 Pull from Cloud`.

---

## Contenu du Cerveau
- **.agents** : Workflows et instructions d'agents.
- **skills** : Compétences personnalisées (SKILL.md).
- **knowledge** : Base de connaissances distillée (Knowledge Items).
- **brain** : Historique et journaux de conversations.
- **extension** : Code source de l'outil de synchronisation.

## Architecture
La conscience collective est synchronisée via une passerelle Git privée. Toute modification poussée depuis le PC est immédiatement récupérable par le Mac via l'extension VS Code.

---
*Mis à jour le : 22 Mars 2026 — Gouverneur d'Exécution Antigravity.*
