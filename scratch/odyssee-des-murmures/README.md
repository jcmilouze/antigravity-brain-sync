# 🦊 L'Odyssée des Murmures

> **Une aventure magique et multisensorielle pour dompter la dyslexie.**

L'Odyssée des Murmures est une application pédagogique conçue spécifiquement pour un enfant de 7 ans atteint de dyslexie. Le projet adopte une approche "Local-First" et "AI-Driven", utilisant des modèles de langage locaux (Ollama) pour garantir la vie privée et une disponibilité totale sans coût de tokens.

---

## 🏛️ Vision & Pédagogie

L'objectif est de transformer l'apprentissage de la lecture et de la phonologie en une quête épique. 
- **Conscience Phonologique** : Travail sur le rythme et la découpe syllabique via "La Forge du Tempo".
- **Zéro Stress** : Aucune punition, pas de chronomètre agressif, uniquement du renforcement positif.
- **Accessibilité (Dys-Friendly)** : 
  - Utilisation de la police **Lexend** (conçue scientifiquement pour la lecture).
  - Palette de couleurs pastels pour réduire la fatigue visuelle (Scotopic Sensitivity).
  - Espacement généreux et interface épurée.

---

## 🛠️ Stack Technique

| Composant | Technologie |
|-----------|-------------|
| **Framework** | React 19 + TypeScript |
| **Build Tool**| Vite |
| **Styling**   | Tailwind CSS v4 (Oxide Engine) |
| **Animations**| Framer Motion |
| **Icons**     | Lucide React |
| **IA Locale** | Ollama (qwen2.5-coder:32b, deepseek-r1:14b) |

---

## 🚀 Démarrage Rapide

### Prérequis
- **Node.js** (v20 ou supérieur)
- **Ollama** (installé et démarré localement)

### Installation
1. Clonez ou ouvrez le dossier du projet.
2. Installez les dépendances :
   ```powershell
   npm install
   ```
3. Téléchargez les modèles Ollama nécessaires :
   ```powershell
   ollama pull qwen2.5-coder:32b
   ollama pull deepseek-r1:14b
   ```

### Lancement
```powershell
npm run dev
```
L'application sera disponible sur [http://localhost:5173](http://localhost:5173).

---

## 🗺️ Architecture du Projet

```text
odyssee-des-murmures/
├── src/
│   ├── components/       # Composants réutilisables et mini-jeux
│   │   └── ForgeDuTempo/ # Mini-jeu de rythme phonologique
│   ├── assets/           # Images et ressources statiques
│   ├── index.css         # Design tokens v4 (Fonts, Colors)
│   └── App.tsx           # Village central et orchestrateur de navigation
├── public/               # Assets publics (images du héros, sons)
└── vite.config.ts        # Configuration avec Tailwind v4
```

---

## 🎮 Les Mondes

1.  **🥁 La Forge du Tempo** : Apprendre à découper les mots en syllabes en frappant sur un tambour magique. Utilise Framer Motion pour un feedback visuel immédiat.
2.  **🗣️ L'Écho de la Grotte** *(En développement)* : Reconnaissance vocale locale pour valider la prononciation des mots magiques.
3.  **🎨 L'Invocateur d'Images** *(En développement)* : Récompense l'effort par la génération d'images magiques via ComfyUI (local).

---

## 🧠 Orchestration Antigravity

Le projet est piloté par l'agent **Antigravity** suivant une gouvernance technique stricte :
- **Stratégie** : `@tech-lead` (L'intention pédagogique).
- **Exécution** : `@qwen2.5-coder:32b` (La précision du code).
- **Raisonnement** : `@deepseek-r1` (L'architecture et les conseils Dys).

---

## 📅 Journal de Bord

- **2026-03-22** : Initialisation du projet, mise en place de Tailwind v4, et création du premier mini-jeu fonctionnel "La Forge du Tempo". Intégration de la police Lexend.

---

*Développé avec 💜 par Antigravity — Orchestration 100% Locale.*
