# Design Doc : Indicateur de Pression de Réussite (Sensibilisation Matières Générales)

Date : 2026-02-28
Sujet : Sensibilisation à l'importance des matières générales dans le Bac Pro MCV.

## 1. Objectif
Transformer le simulateur pour qu'il ne soit plus seulement un outil de calcul, mais un outil pédagogique. Il doit démontrer que l'abandon des matières générales (Maths, Français, Histoire-Géo) surcharge dangereusement les épreuves professionnelles.

## 2. Analyse de la Problématique
Dans le système actuel, les coefficients pro sont élevés (ex: E2 coef 4). Les élèves pensent souvent que leurs impasses en matières générales (coef 1 ou 2.5) sont sans conséquence. En réalité, une note de 05/20 en Français demande un effort massif en Vente pour compenser, éliminant tout "droit à l'erreur".

## 3. Architecture du Design

### A. Calcul de l'Indice de Pression
L'indice sera calculé comme suit :
1.  **Dette Générale** : Somme des points manquants pour atteindre 10 dans chaque matière générale.
2.  **Capacité Pro** : Marge de manoeuvre restante dans les matières pro (Potentiel de points entre la note actuelle et 20).
3.  **Indice de Pression (%)** : (Dette Générale / Capacité de Rattrapage Totale) * 100.

### B. Interface Utilisateur (UI)
*   **Emplacement** : Nouvelle carte "Indice de Risque & Pression" sous la moyenne générale.
*   **Composant Jauge** : Barre de progression animée avec gradients CSS (Bleu -> Rouge).
*   **Feedback Textuel** : Phrases dynamiques variant selon le score :
    *   *Sauf* (<30%) : "Équilibre parfait. Tu as de la marge sur tes épreuves pro."
    *   *Vigilance* (30-60%) : "Tes impasses en général commencent à peser. Le pôle pro est sous tension."
    *   *Critique* (>60%) : "⚠️ Alerte : Droit à l'erreur zéro. Tes notes générales t'obligent à une performance exceptionnelle en pro."

## 4. Flux de Données
1.  L'utilisateur saisit une note.
2.  Le `useEffect` déclenche le recalcul des résultats.
3.  La nouvelle fonction `calculatePressure()` est appelée.
4.  L'état `pressureData` est mis à jour et injecté dans le composant `PressureGauge`.

## 5. Prochaine Étape
Passage à la compétence **planification** pour l'implémentation technique dans `BacProMCVSimulator.jsx`.
