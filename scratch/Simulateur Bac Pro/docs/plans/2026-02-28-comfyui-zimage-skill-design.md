# Design: Skill ComfyUI Z-Image Turbo

## Contexte
L'utilisateur souhaite une compétence intégrée à Antigravity pour générer des prompts optimisés pour ComfyUI, spécifiquement pour le modèle "Z-Image Turbo". Une application web a déjà été conçue par le passé, mais l'objectif est maintenant d'avoir une compétence réutilisable par l'IA.

## Objectifs
1.  Générer des prompts positifs et négatifs structurés.
2.  Optimiser les prompts pour le modèle Z-Image Turbo.
3.  Permettre une interaction fluide pour affiner le résultat.

## Checklist Brainstorming
- [x] Explorer le contexte du projet (Fait via l'historique et le code de l'application web existante)
- [x] Poser des questions de clarification (Validé : Approche 1)
- [x] Proposer 2-3 approches (Approche "Interview" sélectionnée)
- [x] Présenter le design (Approuvé par l'utilisateur)
- [x] Rédiger le document de design final (Ce document)
- [x] Passer à l'implémentation (Prêt pour la planification)

## Design Final de la Compétence `comfyui-zimage-turbo`

### 1. Objectif
Fournir un assistant interactif pour générer des prompts optimisés pour ComfyUI avec le modèle Z-Image Turbo, en suivant une approche par "interview" séquentielle.

### 2. Architecture de l'Interview
La compétence posera les questions dans cet ordre :
1. **Sujet** : Que voulez-vous générer ? (ex: "Un explorateur cyberpunk")
2. **Cadrage & Ratio** : Type de plan (close-up, wide shot) et format (16:9, 1:1, etc.)
3. **Scène & Atmosphère** : Lieu, météo, moment de la journée.
4. **Style & Éclairage** : Hyperréaliste, cinématique, studio lighting, etc.
5. **Détails & Actions** : Vêtements, actions spécifiques, objets.

### 3. Logique de Construction du Prompt
- **Format Positif** : `POSITIVE: [Style], [Cadrage], [Sujet], [Scène/Météo/Temps], [Éclairage/Ambiance], [Action], [Tech Notes PT]`
- **Format Négatif** : `NEGATIVE: low quality, low resolution, blurry, artifacts, etc.` (avec ajustements selon le sujet).
- **Injection automatique** : Ajout de termes techniques comme `realistic textures, sharp focus, cinematic` pour maximiser la qualité Turbo.

### 4. Commandes Internes
- `/reset` : Réinitialise l'interview.
- `/draft` : Affiche le prompt actuel sans terminer l'interview.

## Questions de clarification
1. **Mode d'interaction :** Souhaites-tu que la compétence m'oblige à te poser des questions une par une (comme ton application web) pour remplir chaque champ (cadrage, météo, éclairage, etc.), ou préfères-tu que je génère directement le prompt optimisé en devinant les meilleurs réglages à partir de ta description ?

## Approches envisagées
1.  **Approche "Interview" (Séquentielle) :** La compétence guide l'utilisateur à travers une série de questions pour ne rien oublier (Sujet -> Cadrage -> Style -> Lumière).
2.  **Approche "Expert Instantané" (Inférence) :** L'utilisateur donne une idée simple ("Un chat dans l'espace") et la compétence génère immédiatement le prompt complet avec tous les détails techniques optimisés pour Z-Image Turbo.
3.  **Approche "Variante" (Multi-choix) :** La compétence génère 3 versions du prompt pour la même idée (ex: une version Cinématique, une version Artistique, une version Photo-journalisme).
