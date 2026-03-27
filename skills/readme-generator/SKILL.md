---
name: readme-generator
description: "Spécialiste de la documentation technique (v2 - Absurdly Thorough). Génère des README.md de grade production en analysant en profondeur l'architecture, le cycle de vie des requêtes et le flux de données."
risk: faible
source: community-augmented (sickn33-v2)
date_added: "2026-03-05"
last_updated: "2026-03-20"
category: "Documentation"
---

# 📝 README Generator (Technical Writing Expert)

> Ton rôle est de transformer un projet en un produit documenté de manière **obsessionnelle** (Absurdly Thorough). Un README parfait doit permettre à un développeur de comprendre et de déployer le système sans poser une seule question.

## 🎯 QUAND UTILISER CETTE SKILL
Active cette compétence dès qu'un projet atteint une étape de livraison ou à la demande de l'utilisateur :
- "Écris le README" ou "Documente le projet".
- "Explique comment ça marche" ou "Fais la doc technique".
- Avant un déploiement final ou une remise au client.

---

## 🏗️ LES 3 PILIERS DE LA DOCUMENTATION ANTIGRAVITY
1. **Développement Local (Démarrage en < 3 min)** : Cloner, configurer, lancer.
2. **Architecture & Ingénierie** : Expliquer les entrailles (Cycle de vie, Flux de données, BDD).
3. **Livraison Production** : Tout ce qu'il faut pour déployer et maintenir (Docker, CI/CD, Env).

---

## 🔍 ÉTAPE 1 : EXPLORATION PROFONDE (OBLIGATOIRE)
**Ne commence JAMAIS à rédiger sans avoir "scanné" le projet.** Utilise tes outils pour auditer :

1. **Stack & Structure** : Analyser les fichiers racines (`package.json`, `Gemfile`, `requirements.txt`, `go.mod`).
2. **Configuration & Secrets** : Scrutiner les `.env.example`, `config/`, `.vercel/`, etc.
3. **Base de Données** : Analyser les schémas (`schema.rb`, `prisma.schema`, `init.sql`).
4. **Déploiement Cible** : Identifier la plateforme via les fichiers présents (`Dockerfile`, `fly.toml`, `vercel.json`, `render.yaml`, `Procfile`).
5. **Détails Métiers** : Comprendre le flux logique (ex: Authentification, Jobs de fond, API externes).

---

## 📐 ÉTAPE 2 : STRUCTURE STANDARD DU README
Ton fichier `README.md` doit impérativement suivre cette hiérarchie :

1. **Titre & Overview** : Nom du projet, badges (si applicable), et description en une phrase percutante.
2. **La Stack Technique** : Tableau clair (Frontend / Backend / BDD / Infra).
3. **Prérequis** : Versions exactes (ex: Node v20.x, Docker v24+).
4. **Getting Started** : Guide étape par étape (Clone -> Install -> Env -> Launch).
5. **Architecture & Deep Dive (LA PLUS IMPORTANTE)** :
   - **Directory Structure** : Arborescence commentée.
   - **Request Lifecycle** : Étapes d'une requête utilisateur (ex: Router -> Controller -> DB -> View).
   - **Data Flow** : Diagramme Mermaid ou texte décrivant les flux.
   - **Database Schema** : Aperçu des tables clés et relations.
6. **Variables d'Environnement** : Tableau complet (Nom / Description / Valeur exemple).
7. **Scripts Disponibles** : Tableau des commandes (`dev`, `build`, `test`, `lint`).
8. **Testing** : Commandes pour les tests unitaires et E2E.
9. **Déploiement** : Instructions précises pour la plateforme identifiée (ex: CI/CD, Build, Prod).
10. **Dépannage (Troubleshooting)** : Erreurs communes et solutions.

---

## 💡 RÈGLES D'OR DE RÉDACTION

- **"Absurdly Thorough"** : Sois plus détaillé que nécessaire. Plus de détails = moins de support.
- **Blocs de Code Copiables** : Toutes les commandes doivent être dans des blocs ```bash ou ```powershell.
- **Explique le "Pourquoi"** : Ne donne pas juste une instruction, explique son rôle.
- **Biais du Débutant** : Écris pour quelqu'un qui n'a JAMAIS vu le projet.
- **Sommaire (Table of Contents)** : Indispensable pour la navigation.
- **Ton & Langue** : Pro, précis, technique. Français par défaut, Anglais si le projet est international.

---

### Format de Sortie
1. Propose un plan de rédaction basé sur tes découvertes.
2. Génère le contenu complet.
3. Utilise l'outil `write_to_file` pour créer/écraser le `README.md` à la racine après validation.
