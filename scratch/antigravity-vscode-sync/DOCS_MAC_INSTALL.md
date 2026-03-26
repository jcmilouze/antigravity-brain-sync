# 🌀 Antigravity Brain Sync : Protocole MAC (v1.3.1)

Ce document décrit la marche à suivre pour synchroniser l'infrastructure **Antigravity** (Rules, Skills, Knowledge, Scratch) entre ton PC et ton Mac via GitHub.

---

## 1. 💻 Préparation de l'Oxygène (Mac)
Avant d'installer l'extension, assure-toi que ton environnement macOS est prêt pour les flux de données.

1. **Vérifier Git** : 
   Ouvre le terminal et tape `git --version`. Si rien ne s'affiche, installe Git via [git-scm.com](https://git-scm.com/).
2. **Créer la structure d'accueil** :
   Exécute cette commande pour créer le dossier racine obligatoire :
   ```bash
   mkdir -p ~/.gemini/antigravity
   ```

---

## 2. 🔌 Installation de l'Extension Sync
Tu dois installer l'extension **Antigravity Cloud Sync** (v1.3.1) sur le VS Code de ton Mac.

1. **Transfert du .vsix** : Transfère le fichier `antigravity-vscode-sync-1.3.1.vsix` depuis ton PC vers ton Mac (via AirDrop, USB ou GitHub).
2. **Installation** :
   - Ouvre VS Code sur Mac.
   - Va dans l'onglet **Extensions** (Cmd+Shift+X).
   - Clique sur les **"..."** en haut à droite.
   - Choisis **"Install from VSIX..."** et sélectionne le fichier.

---

## 3. 🌀 Synchronisation Initiale (Fusion Neuronale)
C'est ici que ton Mac "apprend" tout ce que ton PC connaît déjà.

1. **Ouvrir ton repository GitHub** : Assure-toi que ton repo privé (ex: `https://github.com/mimilouze/antigravity-brain`) est à jour sur ton PC.
2. **Configuration sur Mac** :
   - Dans VS Code (Mac), clique sur la barre de statut (en bas à droite) sur l'icône **$(sync) Antigravity**.
   - Choisis **"⚙️ Configuration Cloud"**.
   - Entre l'URL de ton repo (SSH recommandé : `git@github.com:user/repo.git`).
3. **Premier Pull** :
   - Clique à nouveau sur l'icône de la barre de statut.
   - Choisis **"📥 Récupérer la conscience (Pull)"**.
   - Tes dossiers `rules/`, `skills/`, `knowledge/` et `scratch/` vont apparaître sur ton Mac.

---

## 📅 4. Utilisation au Quotidien
- **Automatique** : L'extension surveille les changements dans `.gemini/antigravity`. Si tu modifies un fichier `rule` ou `scratch`, l'indicateur passera au jaune (Dirty).
- **Manuel** : Clique sur **Archiver (Push)** pour envoyer tes découvertes du Mac vers le PC.

---

### ⚠️ Sécurité (Hardening v1.3.1)
L'extension installe une protection native contre les injections de commandes. Tes données sont synchronisées par **`execFile`**, garantissant l'intégrité de ton infrastructure de calcul.

**Statut du Protocole : 🟢 OPÉRATIONNEL**
*,Gouverneur d'Exécution Antigravity — 27 Mars 2026.*
