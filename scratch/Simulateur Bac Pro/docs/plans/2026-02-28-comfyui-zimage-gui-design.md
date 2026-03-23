# Design : Interface Graphique ComfyUI Z-Image Turbo

## Contexte
L'utilisateur souhaite une interface web moderne (HTML/CSS/JS) pour utiliser graphiquement la compétence `comfyui-zimage-turbo` qu'il vient de créer. L'objectif est de transformer l'interview textuelle en une expérience visuelle premium.

## Objectifs UI/UX (via skill ui-ux-pro-max)
1.  **Style** : Glassmorphism / Cyber-Aesthetic (Secteur : Créativité IA / High-Tech).
2.  **Palette de couleurs** : Anthracite profond (#0f172a), Accents Néon Cyan (#22d3ee) et Ambre (#fbbf24) pour les alertes de champs manquants.
3.  **Typographie** : Inter ou Outfit (moderne, lisible, premium).
4.  **Interaction** :
    *   Saisie par étapes (Stepper visuel).
    *   Feedback immédiat sur la complétion.
    *   Micro-animations sur les transitions d'étapes.
    *   Boutons de copie "One-click".

## Checklist Brainstorming
- [x] Explorer le contexte (Projet existant + nouvelle compétence)
- [x] Définir l'esthétique (Cyber-Glassmorphism)
- [x] Poser des questions de clarification (Validé : Approche 2, Non-Bloquant)
- [x] Proposer 2-3 approches (Dashboard Dynamique sélectionné)
- [x] Présenter le design final (Maquette générée)
- [ ] Planifier l'implémentation

## Design Final : Dashboard Dynamique Cyber-Glass
1.  **Layout** : Structure à deux colonnes (Champs à gauche / Résultats à droite).
2.  **Logique "Non-Bloquante"** :
    *   Chaque champ rempli met à jour le prompt instantanément.
    *   Les champs vides sont simplement ignorés dans la concaténation finale (le résultat reste valide).
    *   Indicateurs ambre discrets pour les champs conseillés mais vides.
3.  **Fonctionnalités Premium** :
    *   Effet de verre poli (backdrop-filter: blur).
    *   Bordures lumineuses (glow) sur les champs actifs.
    *   Bouton "Copy Both" (combiné) + Copie individuelle.
    *   Reset global pour tout effacer en un clic.
