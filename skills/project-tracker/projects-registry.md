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
| Antigravity VSCode Sync  | 🟡 En cours  | P2       | Initialisation du projet d'extension de synchro      |
| **OLLAMA FORCE**         | 🚀 ACTIVE     | P0       | Système de délégation locale (Ready v1.2.0)          |

---

## ✅ Antigravity Roast (Premium Coffee Landing)

- **Statut** : ✅ Terminé — Prêt pour Déploiement
- **Stack** : Vite · React · TypeScript · Tailwind v4 · Framer Motion · Docker · Nginx
- **Localisation** : `C:\Users\mimilouze\.gemini\antigravity\scratch\premium-coffee-landing`
- **GitHub** : https://github.com/jcmilouze/premium-coffee-landing
- **Dernière session** : 2026-03-22 — **Livraison Premium & Orchestration Hybride**. Création complète d'une landing page ultra-luxe. Implémentation d'un système d'XP, d'une carte d'origine interactive (OriginMap), et d'effets 3D parallax. Utilisation intensive de **Qwen2.5-Coder:32B** en local (RTX 4090) supervisé par Gemini. Préparation Docker/Nginx pour Coolify.
- **Artifact Trail** :
  - `src/App.tsx` - Core logic & UI (XP system, Product listing).
  - `src/components/OriginMap.tsx` - Carte interactive dorée.
  - `Dockerfile` & `nginx.conf` - Conteneurisation de production.
  - `README.md` & `DEPLOYMENT.md` - Documentation complète.
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
- **Artifact Trail** :
  - `src/App.tsx` - Logique de filtrage complexe et dashboard stats.
  - `src/components/ExoticCard.tsx` - UI tactique avec feedback Favori/Obtenu.
  - `src/data/exotics.ts` - Ajout items Resolve (Ageless, Rugged Gauntlets).
  - `public/shd-logo.png` - Logo de marque SHD généré.
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
- **Artifact Trail** :
  - `src/hooks/useSpeech.ts` & `src/hooks/useRecognition.ts` - Hooks de voix.
  - `src/components/EchoGrotte.tsx` - Mini-jeu de reconnaissance vocale.
  - `scripts/setup-piper.js` & `bin/tts/server-tts.js` - Backend TTS natif d'urgence.
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
- **Statut** : 🟡 En cours — **FORCE OLLAMA ACTIVE (v3.2.0)**
- **Stack** : React · Vite · Tailwind v4 · Framer Motion · Node.js (Express) · Prisma (PostgreSQL) · **Ollama (DeepSeek-R1:14b)** · Groq (Whisper)
- **Localisation** : `C:\Users\mimilouze\.gemini\antigravity\scratch\ios-voice-memos-ai`
- **GitHub** : https://github.com/jcmilouze/ios-voice-memos-ai
- **Dernière session** : 2026-03-24 — **Pure-Groq Architecture Realignment**. Adoption définitive d'un moteur **100% Groq Cloud** (STT + LLM) pour la stabilité et la simplicité de production. Suppression de toute la logique complexe de fallback hybride OLLAMA/Local.
- **Artifact Trail** :
  - `server/services/ai.service.js` - Refactor en Groq Client Pur.
  - `server/.env` - Nettoyage des variables local-only.
  - `src/components/layout/StatusBar.jsx` - UI Status Force Groq.
- **Prochaine action** : 
  1. Suivre le build Coolify (Binding 0.0.0.0 actif).
  2. Valider la performance de transcription Groq en temps réel.
- **Blockers** : Aucun. Système simplifié et optimisé pour le Cloud.
- **Priorité** : P1
- **Deadline** : Pas de deadline
- **Notes** : L'app est désormais ultra-rapide et facile à maintenir (Single Provider).

---

## 🟡 Cahier de Texte Pronote

- **Statut** : 🟡 En cours — Actif
- **Stack** : React 19 · TypeScript · Vite · Groq (LLaMA 3.3 70b) · Clerk Auth · Supabase · Prisma (PostgreSQL) · Docker · Nginx
- **Localisation** : `C:\Users\mimilouze\.gemini\antigravity\scratch\cahier-de-texte-pronote`
- **Production** : Déployé via Coolify sur `bessacvps.fr`
- **Dernière session** : 2026-03-06 — **Focus & Simplification**. Suppression intégrale du module Stages (PFMP) pour transfert vers le projet CRM Prof. Correction de la stack TypeScript (`esModuleInterop`), régénération Prisma (Correction de tous les types) et validation du cycle **Coach IA** (mémos de préparation).
- **Artifact Trail** :
  - `backend/server.ts` & `App.tsx` - Suppression des routes et composants PFMP.
  - `prisma/schema.prisma` - Suppression du modèle `PFMP`.
  - `tsconfig.json` - Correction de la compatibilité ESM/identifiants privés.
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

## 🟢 Canal Top 14

- **Statut** : 🟢 En veille — État inconnu
- **Stack** : HTML statique · CSS · JS
- **Localisation** : `C:\Users\mimilouze\.gemini\antigravity\scratch\canal-top14`
- **Dernière session** : Inconnue — Pas de session documentée
- **Prochaine action** : Explorer `index.html` pour comprendre l'état et l'objectif du projet
- **Blockers** : Contexte inconnu — à reclarifier
- **Priorité** : P4 (Backlog)
- **Deadline** : Inconnue
- **Notes** : Projet HTML statique minimal. Objectif à reclarifier avec l'utilisateur.

---

## 🟡 Antigravity Skills & Environnement

- **Statut** : 🟡 En cours — Infrastructure en évolution permanente
- **Stack** : Markdown · JSON · Antigravity Agent
- **Localisation** : `C:\Users\mimilouze\.gemini\antigravity\skills\`
- **Dernière session** : 2026-03-04 — Finalisation Gemini 2.5 Flash pour PDF avec OCR et ajustement du prompt pour plus de concision. Ajout de boutons d'actions rapides ("Mise en situation", "Bilan de compétences", etc.) pour pré-remplir la zone "Notes brutes".
- **Prochaine action** : 
  1. Attendre le build Coolify
  2. Vérifier que les actions rapides font bien gagner du temps lors de la saisie.
- **Blockers** : Synchronisation MacBook ≠ Windows non encore finalisée
- **Priorité** : P3
- **Deadline** : Pas de deadline
- **Notes** :
  - Skills custom disponibles : frontend-lead, backend-architect, automation-chief, data-engineer, devsecops, tech-lead, brainstorming, planification, etc.
  - MCPs actifs : StitchMCP, GitHub, n8n-mcp, postgres-velotrack

---

## 🟡 Antigravity VSCode Sync (Sync PC/Mac)

- **Statut** : 🟡 En cours — Phase 1 : Initialisation
- **Stack** : TypeScript · VS Code Extension API
- **Localisation** : `C:\Users\mimilouze\.gemini\antigravity\scratch\antigravity-vscode-sync`
- **Dernière session** : 2026-03-22 — Création du projet. Objectif : synchroniser les skills, projets et listes LLM Ollama
### Achievements (Current Session)
- **Antigravity Sync v1.2.2**: **Connection Resilience Edition**.
- **Antigravity Sync v1.2.5**: **Commit Integrity Fix**.
    - **Windows Compatibility**: Fixed commit message quoting (removed problematic commas and localized strings).
    - **Hybrid Auth**: Automatic fallback to HTTPS (VS Code native auth) if SSH is denied.
    - **Visual Lock**: Status bar shows `$(lock)` for auth repair.

### STATUS: READY v1.2.5 ("The Integrity Pulse")
- **Next Steps**: Install v1.2.4 or v1.2.5 and activate HTTPS mode if SSH fails.
- **Tech Stack**: TypeScript, VS Code API, Git (Atomic + Escaped).
- **Prochaine action** : 
  1. Installer le `.vsix` v1.2.5.
  2. Lancer un push. Si une erreur d'authentification s'affiche, cliquer sur "Passer en HTTPS".
- **Blockers** : Aucun
- **Priorité** : P2
- **Deadline** : Pas de deadline
- **Notes** : Objectif de fluidifier l'expérience développeur (DX) multi-support (PC/Mac) en gardant le même "cerveau" Antigravity.

## 🟢 Antigravity LLM Tracker (Extension VSCode)

- **Statut** : 🟢 Stable — **v1.2.1 "Real-time VRAM"**
- **Stack** : VS Code API · TypeScript · Esbuild · Ollama (RTX 4090 Optimised)
- **Localisation** : `C:\Users\mimilouze\.\.gemini\antigravity\scratch\llm-usage-tracker`
- **Dernière session** : 2026-03-23 — **Session "VRAM Commander & Quick Actions"**. Implémentation du QuickPick dynamiques dans la barre d'état (Unload individuel). Ajout de la jauge de capacité VRAM (24GB) dans le Dashboard et affichage direct de la VRAM utilisée dans la StatusBar à côté du modèle. Nettoyage complet du repository Git. Version **v1.2.1** buildée.
- **Prochaine action** : Faire glisser `llm-usage-tracker-1.2.1.vsix` dans VS Code pour installer la mise à jour.
- **Blockers** : Aucun.
- **Priorité** : P1
- **Deadline** : Pas de deadline

---

## 💡 PROJETS EN IDÉE / FUTUR

| Projet          | Description                                | Priorité |
|-----------------|--------------------------------------------|----------|
| Antigravity VSCode Sync | Extension pour la synchro Gist complète    | P2       |
| Netdata Advisor | Tableau de bord monitoring VPS intelligent | P4       |
| Skill Creator   | Meta-skill de création de skills           | P4       |

---

## 📅 HISTORIQUE DES SESSIONS RÉCENTES

| Date       | Projet                 | Ce qui a été fait                                                                                                               |
|------------|------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| 2026-03-22 | Antigravity LLM Tracker| Session "Ollama-First" : Fix Git root overflow, Dashboard Premium Dark, Monitoring VRAM & Unload. Orchestration via Qwen-32B.     |
| 2026-03-22 | L'Odyssée des Murmures | Intégration TTS & STT (Session 2). Pont Node.js Piper validé. Bascule SOTA planifiée (Attente instal Python).                   |
| 2026-03-22 | L'Odyssée des Murmures | Initialisation, Tailwind v4, Lexend font, Mini-jeu "La Forge du Tempo" réécrit avec qwen2.5-coder:32b.                          |
| 2026-03-22 | Division Exotics       | Réactivation, Favoris, Tri, Project Resolve, Push GitHub MCP.                                                                   |
| 2026-03-22 | Antigravity Roast      | Landing Page Premium, XP System, OriginMap, Push GitHub, Docker prep.                                                           |
| 2026-03-09 | Memovoice              | Refonte Todo (Projets, Tags, Kanban, Calendrier), Prisma Migration auto                                                         |
| 2026-03-06 | Cahier Texte Pronote   | Suppression module PFMP, fix TypeScript/Prisma, validation cycle Coach IA                                                       |
| 2026-03-05 | Cahier Texte Pronote   | Périmètre enseignant (userScope), Coach IA, Dashboard filtré et module PFMP                                                     |
| 2026-03-05 | Cahier Texte Pronote   | Ajout mémo enseignant + import/export base de données                                                                           |
| 2026-03-04 | Cahier Texte Pronote   | Fusion prompt pédagogique (objectifs + compétences référentiel)                                                                 |
| 2026-03-04 | Antigravity Skills     | Mise à jour metadata, création skill project-tracker                                                                            |
| 2026-03-03 | Site LP Bort-Artense   | Pages formations, panneau admin, audit Lighthouse                                                                               |
| 2026-03-03 | Cahier Texte Pronote   | Dockerfile déploiement Coolify                                                                                                  |
| 2026-03-02 | CRM LP Bort            | Planification cleanup + M2                                                                                                      |
| 2026-03-02 | Simulateur Bac Pro     | Mise à jour hero, logique oral rattrapage                                                                                       |

---

*Ce registre est maintenu automatiquement par l'agent Project Tracker. Ne pas modifier manuellement sans validation.*
