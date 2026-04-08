# 📋 REGISTRE DES PROJETS — MIMILOUZE
> Dernière mise à jour globale : **2026-04-01**
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
| Antigravity Skills       | 🚀 UPGRADED  | P3       | **Qwen 3.5 MoE Injection** & Multi-agent Governance  |
| Antigravity VSCode Sync  | 🟢 Stable    | P2       | v1.2.5 ("The Integrity Pulse") installed. ACTIVE     |
| **OLLAMA FORCE**         | 🚀 ACTIVE     | P0       | Qwen 3.5 (35B/27B) + DeepSeek-R1 (14B) hierarchy      |

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

---

## 🟡 L'Odyssée des Murmures (Lois Dyslexia Games v2)

- **Statut** : 🟡 En cours — En attente installation Python
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

- **Statut** : 🟡 En cours — **FORCE OLLAMA ACTIVE (v3.5.0)**
- **Stack** : React · Vite · Tailwind v4 · Framer Motion · Node.js (Express) · Prisma (PostgreSQL) · **Ollama (Qwen3.5:35b)**
- **Localisation** : `C:\Users\mimilouze\.gemini\antigravity\scratch\ios-voice-memos-ai`
- **GitHub** : https://github.com/jcmilouze/ios-voice-memos-ai
- **Dernière session** : 2026-04-01 — **Qwen 3.5 Standard Injection**. Migration système vers Qwen 3.5 (35B-MoE) pour le code et DeepSeek-R1 (14B) pour le raisonnement. Nettoyage de l'orchestrateur VRAM.
- **Artifact Trail** :
  - `server/services/ai.service.js` - Refactor pour support local local de pointe.
  - `skills/*.md` - Mise à jour globale des modèles locaux.
- **Prochaine action** : 
  1. Valider la performance de transcription Groq vs Local.
- **Blockers** : Aucun.
- **Priorité** : P1
- **Deadline** : Pas de deadline
- **Notes** : Experience "App-Native" sur mobile.

---

## 🟡 Cahier de Texte Pronote

- **Statut** : 🟡 En cours — Actif
- **Stack** : React 19 · TypeScript · Vite · Groq (LLaMA 3.3 70b) · Clerk Auth · Supabase · Prisma (PostgreSQL) · Docker · Nginx
- **Localisation** : `C:\Users\mimilouze\.gemini\antigravity\scratch\cahier-de-texte-pronote`
- **Production** : Déployé via Coolify sur `bessacvps.fr`
- **Dernière session** : 2026-03-06 — **Focus & Simplification**. Suppression intégrale du module Stages (PFMP) pour transfert vers le projet CRM Prof. Correction de la stack TypeScript (`esModuleInterop`), régénération Prisma (Correction de tous les types).
- **Artifact Trail** :
  - `backend/server.ts` & `App.tsx` - Suppression des routes et composants PFMP.
  - `prisma/schema.prisma` - Suppression du modèle `PFMP`.
  - `tsconfig.json` - Correction de la compatibilité ESM/identifiants privés.
- **Prochaine action** : 
  1. Améliorer l'esthétique du Dashboard d'inspection.
- **Blockers** : Aucun
- **Priorité** : P1
- **Deadline** : Pas de deadline formelle

---

## 🟡 Site LP Bort-Artense (Structure-BortArtense)

- **Statut** : 🟡 En cours — Actif
- **Stack** : React 19 · Vite 6 · Tailwind CSS v4 · React Router DOM v7 · Lucide React
- **Localisation** : `C:\Users\mimilouze\.gemini\antigravity\scratch\Structure-BortArtense`
- **Production** : Coolify sur `bessacvps.fr` (branche `refonte-ui-ux`)
- **Dernière session** : 2026-03-03/04 — Ajout pages formations, panneau admin "Message du Proviseur", audit Lighthouse.
- **Prochaine action** :
  1. Vérifier que toutes les pages de formations sont complètes.
- **Blockers** : Aucun.
- **Priorité** : P2

---

## 🟢 CRM LP Bort

- **Statut** : 🟡 En cours — Reprise active (Module PFMP)
- **Stack** : FastAPI · SQLAlchemy 2.0 · PostgreSQL 15 · Docker · Vanilla JS · Gemini 1.5 Flash · JWT
- **Localisation** : `C:\Users\mimilouze\.gemini\antigravity\scratch\crm-lp-bort`
- **Production** : https://crmprof.bessacvps.fr
- **Dernière session** : 2026-03-06 — Décision unifiée PFMP.
- **Prochaine action** :
  1. Concevoir le schéma de données unifié pour les PFMP.
- **Blockers** : Aucun
- **Priorité** : P2

---

## 🟢 Simulateur Bac Pro MCV

- **Statut** : 🟢 En veille — Fonctionnel
- **Stack** : HTML · Vanilla JS · CSS
- **Localisation** : `C:\Users\mimilouze\.gemini\antigravity\scratch\Simulateur Bac Pro`
- **Dernière session** : 2026-03-02 — Logique oral rattrapage conforme 2026.
- **Priorité** : P3

---

## 🟡 Antigravity Skills & Environnement

- **Statut** : 🟡 En cours — Infrastructure **OLLAMA FORCE 3.5**
- **Stack** : Markdown · JSON · Antigravity Agent · Ollama (Qwen 3.5 35B/27B)
- **Localisation** : `C:\Users\mimilouze\.gemini\antigravity\skills\`
- **Dernière session** : 2026-04-01 — **Injection Qwen 3.5 MoE**. Mise à jour de 12+ skills pour intégrer la nouvelle hiérarchie LLM locale (Qwen 3.5 / DeepSeek-R1 / Mistral-Nemo). Nettoyage des merge conflicts dans le registre.
- **Prochaine action** : 
  1. Tester le switch VRAM dynamique avec Qwen 3.5.
- **Priorité** : P0

---

## 🟡 Antigravity VSCode Sync (Sync PC/Mac)

- **Statut** : 🟢 Stable — **v1.2.5 ("The Integrity Pulse")**
- **Stack** : TypeScript · VS Code Extension API · Git (Atomic)
- **Localisation** : `C:\Users\mimilouze\.gemini\antigravity\scratch\antigravity-vscode-sync`
- **Dernière session** : 2026-03-22 — v1.2.5 (Atomic Git, Windows Fix).
- **Priorité** : P2

---

## 📅 HISTORIQUE DES SESSIONS RÉCENTES

| Date       | Projet                 | Ce qui a été fait                                                                                                               |
|------------|------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| 2026-04-01 | Antigravity Skills     | **Ollama Force 3.5 Update** : Installation Qwen 3.5 (35B-MoE), suppression Qwen 2.5-Coder (32B), mise à jour stratégique skills. |
| 2026-03-24 | Memovoice              | Refactor Groq Cloud Pur (simplification).                                                                                       |
| 2026-03-23 | Antigravity Sync       | Overhaul v1.2.3 (Atomic Git), Reactive Status Bar, Multi-branch support.                                                         |
| 2026-03-22 | Antigravity LLM Tracker| Monitoring VRAM & Unload. Orchestration via Qwen-32B.                                                                           |
| 2026-03-22 | L'Odyssée des Murmures | Intégration TTS & STT (Session 2). Pont Node.js Piper validé.                                                                  |

---

*Ce registre est maintenu automatiquement par l'agent Project Tracker (Antigravity).*
