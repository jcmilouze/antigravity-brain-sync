# 📋 REGISTRE DES PROJETS — MIMILOUZE
> Dernière mise à jour globale : **2026-03-22**
> Mainteneur : Agent Project Tracker (Antigravity)

---

> [!NOTE]
> Ce fichier est la **source de vérité unique** de tous les projets en cours.
> Il est mis à jour automatiquement par l'agent à chaque fin de session de développement.

---

## 📊 DASHBOARD RAPIDE

| Projet                   | Statut       | Priorité | Prochaine action                                     |
|--------------------------|--------------|----------|------------------------------------------------------|
| Antigravity Roast        | ✅ Terminé   | P1       | Déploiement final Coolify (optionnel)                |
| L'Odyssée des Murmures   | 🟡 En cours  | P1       | Attente installation Python (SOTA TTS/STT)           |
| Memovoice (iOS Voice)    | 🟡 En cours  | P1       | AI Sub-task decomposition & Voice triggers           |
| Cahier de Texte Pronote  | 🟡 En cours  | P1       | Dashboard inspection & Notifications mémos           |
| Site LP Bort-Artense     | 🟡 En cours  | P2       | Ajouter pages formations manquantes + admin          |
| CRM LP Bort              | 🟡 En cours  | P2       | Intégration module PFMP (unifié)                     |
| Division Exotics         | 🟡 En cours  | P2       | Export CSV / Import SHD Backup                       |
| Simulateur Bac Pro       | 🟢 En veille | P3       | Vérifier le simulateur oral de rattrapage            |
| Antigravity Skills       | 🟡 En cours  | P3       | Enrichir skills existantes + sync MacBook            |
| Antigravity LLM Tracker  | 🟡 En cours  | P1       | Intégration Protocole **Ollama Force** (Génération locale) |
| **Antigravity VSCode Sync** | 🟢 Stable    | P2       | v1.2.3 (Atomic Git) installed. Sync awareness ACTIVE  |
| **OLLAMA FORCE**         | 🚀 ACTIVE     | P0       | Système de délégation locale (Ready v1.2.0)          |

---

## ✅ Antigravity Roast (Premium Coffee Landing)

- **Statut** : ✅ Terminé — Prêt pour Déploiement
- **Stack** : Vite · React · TypeScript · Tailwind v4 · Framer Motion · Docker · Nginx
- **Localisation** : `C:\Users\mimilouze\.gemini\antigravity\scratch\premium-coffee-landing`
- **GitHub** : https://github.com/jcmilouze/premium-coffee-landing
- **Dernière session** : 2026-03-22 — **Livraison Premium & Orchestration Hybride**. Création complète d'une landing page ultra-luxe. Implémentation d'un système d'XP, d'une carte d'origine interactive (OriginMap), et d'effets 3D parallax. Utilisation intensive de **Qwen2.5-Coder:32B** en local (RTX 4090) supervisé par Gemini. Préparation Docker/Nginx pour Coolify.
- **Prochaine action** : 
  1. Suivre le guide `DEPLOYMENT.md` sur Coolify.
- **Blockers** : Aucun. Projet livré et pushé.
- **Priorité** : P1 (Livré)
- **Deadline** : Livré le 2026-03-22
- **Notes** : Premier projet d'envergure utilisant le mode "Hybrid Local-First" avec Qwen-32B.

---

## 🟡 Division Exotics Manager (SHD Tracker)

- **Statut** : 🟡 En cours — Phase 2 : Advanced Features
- **Stack** : React 19 · Vite 8 · Tailwind 3 · Framer Motion · Lucide React · GitHub MCP
- **Localisation** : `C:\Users\mimilouze\.gemini\antigravity\scratch\div2-exotics`
- **GitHub** : [https://github.com/jcmilouze/division-exotics-manager-mcp](https://github.com/jcmilouze/division-exotics-manager-mcp)
- **Dernière session** : 2026-03-22 — **Réactivation & Overhaul Tactique**. Reprise exhaustive du projet Division 2. Implémentation du système de **Favoris**, du **Tri Dynamique** (Nom, Type, Statut) et de la **Suppression d'items personnalisés**. Mise à jour des données **Project Resolve** et intégration d'une identité visuelle SHD générée par IA. Création et push du repo GitHub privé.
- **Prochaine action** : 
  1. Implémenter l'export/import CSV pour le backup d'agent.
  2. Ajouter le mode "Wishlist" (Farm Strategy).
- **Blockers** : Aucun.
- **Priorité** : P2
- **Deadline** : Pas de deadline
- **Notes** : Application "Division 2" ultra-stylisée (Dark/Orange). Design glassmorphism.

## 🟡 L'Odyssée des Murmures (Lois Dyslexia Games v2)

- **Statut** : 🟡 En cours — En attente installation Python (Artillerie Lourde)
- **Stack** : React 19 · Vite · Tailwind v4 · Framer Motion · Lucide React · Local SOTA AI (KokoroTTS / Faster-Whisper)
- **Localisation** : `C:\Users\mimilouze\.gemini\antigravity\scratch\odyssee-des-murmures`
- **Dernière session** : 2026-03-22 — **Intégration TTS & STT (Session 2)**. Création du module 'L'Écho de la Grotte' (Web Speech API). Tentative de déploiement Docker TTS échouée (Virtualisation bloquée). Création et validation d'un pont Node.js local avec Piper (Plan B) fonctionnel. Décision prise de basculer sur un vrai backend Python local (KokoroTTS + Faster-Whisper) pour atteindre la qualité SOTA.
- **Prochaine action** : 
  1. Attendre l'installation de Python 3.11/3.12 par l'utilisateur via le Microsoft Store.
  2. Créer l'environnement virtuel Python (`venv`) et installer FastApi + Kokoro-ONNX + Faster-Whisper.
  3. Rebrancher le front React sur la nouvelle API locale SOTA.
- **Blockers** : Attente installation Python (User action required).
- **Priorité** : P1
- **Deadline** : Pas de deadline
- **Notes** : Abandon de Docker au profit d'une exécution Python native pour utiliser la RTX 4090.

---

## 🟡 Memovoice (iOS Voice Memos AI)

- **Statut** : 🟡 En cours — Refonte Todo Système
- **Stack** : React · Vite · Tailwind v4 · Framer Motion · Node.js (Express) · Prisma (PostgreSQL) · Docker · Groq
- **Localisation** : `C:\Users\mimilouze\.gemini\antigravity\scratch\ios-voice-memos-ai`
- **GitHub** : https://github.com/jcmilouze/ios-voice-memos-ai
- **Dernière session** : 2026-03-13 — **Optimisation Assistant & Mobilité**. Automatisation complète du flux de courses (extraction + auto-archivage). Implémentation de la saisie personnalisée dans l'onglet Assistant avec dictée vocale native. Verrouillage de l'interface en mode Portrait (PWA + CSS Guard) pour une expérience type application mobile. Migration SQLite local finalisée et fonctionnelle.
- **Prochaine action** : 
  1. Continuer d'enrichir les actions "Sparkles" (suggestions IA plus fines).
  2. Préparer le support des notifications de rappels.
- **Blockers** : Aucun. Projet stabilisé et repoussé sur GitHub.
- **Priorité** : P1
- **Deadline** : Pas de deadline
- **Notes** : Experience "App-Native" sur mobile. Serveurs opérationnels : Backend (:3001) et Frontend (:5173). Push GitHub effectué.

---

## 🟡 Cahier de Texte Pronote

- **Statut** : 🟡 En cours — Actif
- **Stack** : React 19 · TypeScript · Vite · Groq (LLaMA 3.3 70b) · Clerk Auth · Supabase · Prisma (PostgreSQL) · Docker · Nginx
- **Localisation** : `C:\Users\mimilouze\.gemini\antigravity\scratch\cahier-de-texte-pronote`
- **Production** : Déployé via Coolify sur `bessacvps.fr`
- **Dernière session** : 2026-03-06 — **Focus & Simplification**. Suppression intégrale du module Stages (PFMP) pour transfert vers le projet CRM Prof. Correction de la stack TypeScript (`esModuleInterop`), régénération Prisma (Correction de tous les types) et validation du cycle **Coach IA** (mémos de préparation).
- **Prochaine action** : 
  1. Améliorer l'esthétique du Dashboard d'inspection.
  2. Intégrer des notifications ou alertes visuelles quand un mémo de séance précédente est détecté.
- **Blockers** : Aucun
- **Priorité** : P1
- **Deadline** : Pas de deadline formelle
- **Notes** : Le projet se concentre désormais exclusivement sur la saisie intelligente et l'aide à la préparation pédagogique.

---

## 🟡 Site LP Bort-Artense (Structure-BortArtense)

- **Statut** : 🟡 En cours — Actif
- **Stack** : React 19 · Vite 6 · Tailwind CSS v4 · React Router DOM v7 · Lucide React
- **Localisation** : `C:\Users\mimilouze\.gemini\antigravity\scratch\Structure-BortArtense`
- **Production** : Coolify sur `bessacvps.fr` (branche `refonte-ui-ux`)
- **Dernière session** : 2026-03-03/04 — Ajout pages formations (CAP Charpente, Bac Pro TCB, CAP Maroquinerie), panneau admin "Message du Proviseur", audit Lighthouse
- **Prochaine action** :
  1. Vérifier que toutes les pages de formations sont complètes et bien liées dans la navigation
  2. Compléter le panneau admin avec d'autres champs configurables si besoin
  3. Optimiser les performances Lighthouse (scores audit disponibles dans le projet)
- **Blockers** : Aucun bloquant technique identifié
- **Priorité** : P2
- **Deadline** : Pas de deadline formelle — site institutionnel de l'établissement
- **Notes** :
  - Design "Glassmorphism & Premium" inspiré de ibsac.fr
  - Système 4 Piliers : Commerce/Vente, Charpente/Bois, Cuir/Maroquinerie, Tertiaire
  - `constants.tsx` = seul fichier à modifier pour le contenu
  - Deux rapports Lighthouse disponibles dans le dossier root

---

## 🟢 CRM LP Bort

- **Statut** : 🟡 En cours — Reprise active (Module PFMP)
- **Stack** : FastAPI · SQLAlchemy 2.0 · PostgreSQL 15 · Docker · Vanilla JS · Gemini 1.5 Flash · JWT
- **Localisation** : `C:\Users\mimilouze\.gemini\antigravity\scratch\crm-lp-bort`
- **Production** : https://crmprof.bessacvps.fr (Coolify)
- **Dernière session** : 2026-03-06 — Décision stratégique d'unifier la gestion des stages (PFMP) au sein du CRM plutôt que dans le Cahier de Texte.
- **Prochaine action** :
  1. Exécuter la phase cleanup documentée.
  2. Concevoir le schéma de données unifié pour les PFMP (élèves, tuteurs, visites).
- **Blockers** : Aucun
- **Priorité** : P2
- **Deadline** : M2 (PFMP) attendu ASAP
- **Roadmap** :
  - ✅ M1 : MVP Core + Comportement (64 élèves, JWT, Gemini)
  - 🔄 M2 : PFMP Géolocalisation → cible 2026-02-28 (EN RETARD)
  - ⏳ M3 : Cahier Texte IA → cible 2026-03-31
  - ⏳ M4 : PWA Mobile → 2026-04-30
- **Notes** :
  - GitHub : https://github.com/jcmilouze/crm-lp-bort
  - Docs dans `/docs/` : ROADMAP.md, ARCHITECTURE.md, API.md, MVP.md
  - App multi-modules : Core, Comportement, PFMP (en attente), Cahier Texte (futur)

---

## 🟢 Simulateur Bac Pro MCV

- **Statut** : 🟢 En veille — Fonctionnel, en amélioration continue
- **Stack** : HTML · Vanilla JS · CSS — Application statique
- **Localisation** : `C:\Users\mimilouze\.gemini\antigravity\scratch\Simulateur Bac Pro`
- **Dernière session** : 2026-03-02 — Mise à jour textes hero section, suppression matières optionnelles inexistantes, implémentation logique oral de rattrapage (scores rattrapage conformes référentiel 2026)
- **Prochaine action** :
  1. Valider le comportement du simulateur d'oral de rattrapage avec de vrais cas tests
  2. Proposer éventuellement une version déployée sur Coolify
- **Blockers** : Aucun
- **Priorité** : P3
- **Deadline** : Référentiel 2026 — déjà conforme
- **Notes** : Outil pédagogique pour simulation de notes Bac Pro MCV conforme aux référentiels officiels 2026

---

## 🟡 Antigravity Sync (PC/Mac)

- **Statut** : 🟢 Stable — **v1.2.3 "Atomic Pulse"**
- **Stack** : TypeScript · VS Code Extension API · Git (Atomic)
- **Localisation** : `C:\Users\mimilouze\.gemini\antigravity\scratch\antigravity-vscode-sync`
- **Dernière session** : 2026-03-23 — **Session "Resilience & Atomic Git"**. Résolution des erreurs de branche (master/main) et des bugs de shell Windows. Implémentation du système atomique (add, commit, push séparés) pour plus de stabilité.
### Achievements (Current Session)
- **Antigravity Sync v1.2.3**: **Atomic Git Edition**.
    - **Dynamic Branch Detection**: Detects `master` or `main` automatically.
    - **Visual States**: Green/Orange/Red Reactive Status Bar.
    - **Atomic Steps**: Separated add/commit/push for Windows Shell reliability.
- **GitHub MCP Support**: Brain synced to GitHub via MCP API to bypass local SSH issues.

### STATUS: READY v1.2.3 ("The Atomic Pulse")
- **Next Steps**: Keep using the status bar for awareness and use MCP for pushes if local SSH fails.
- **Tech Stack**: TypeScript, VS Code API, Git (Atomic).

---

## 📅 HISTORIQUE DES SESSIONS RÉCENTES

| Date       | Projet                 | Ce qui a été fait                                                                                                               |
|------------|------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| 2026-03-23 | Antigravity Sync       | Overhaul v1.2.3 (Atomic Git), Reactive Status Bar, Multi-branch support, MCP Sync.                                               |
| 2026-03-22 | Antigravity LLM Tracker| Session "Ollama-First" : Fix Git root overflow, Dashboard Premium Dark, Monitoring VRAM & Unload. Orchestration via Qwen-32B.     |
| 2026-03-22 | L'Odyssée des Murmures | Intégration TTS & STT (Session 2). Pont Node.js Piper validé. Bascule SOTA planifiée (Attente instal Python).                   |

---

*Ce registre est maintenu par l'agent Project Tracker (Antigravity).*
