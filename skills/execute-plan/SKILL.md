---
name: execute-plan
description: Exécute STRICTEMENT un plan validé, étape par étape, sans dériver du périmètre. Vérifie après chaque étape avant de passer à la suivante.
keywords: ["exécute", "implémente", "étape", "plan", "strict", "vérification", "diff"]
priority: high
depends_on: ["write-plan"]
allowed-tools:
  - Bash(curl -s http://localhost:11434/api/generate *)
  - Bash(curl -s http://localhost:11434/api/tags *)
---

# Execute-Plan

**Mission : exécuter fidèlement un plan validé, étape par étape, sans élargir le périmètre.**

Règles d'or :
- **1 étape = 1 réponse**
- **Vérifier avant de passer à la suivante**
- **Déléguer le code à Ollama local**
- **Ne jamais dériver du plan**

## Processus par étape

1. **CONFIRMER** → Afficher l'étape courante et son critère de succès
2. **DÉLÉGUER** → Appeler Ollama avec le modèle assigné à l'étape
3. **EXÉCUTER** → Appliquer le code généré (review rapide sécurité)
4. **VÉRIFIER** → Tester selon le critère de succès de l'étape
5. **RAPPORTER** → Résultat + statut
6. **DEMANDER** → Validation utilisateur avant étape suivante

## Checkpoint taxonomy (GSD)

Chaque checkpoint appartient à l'une de ces 3 catégories :

| Type | Fréquence | Usage |
|------|-----------|-------|
| `human-verify` | 90% | Claude a fini, l'humain confirme que ça marche (UI, flows, comportement réel) |
| `decision` | 9% | L'humain choisit une direction (stack, archi, design) |
| `human-action` | 1% | Aucune alternative CLI/API (email link, SMS 2FA, OAuth browser) |

**Règle d'or** : si Claude peut l'exécuter via CLI/API, Claude l'exécute — jamais demander à l'humain d'exécuter des commandes.

## Dégradation contextuelle (GSD)

Surveiller l'utilisation du contexte et adapter :

| Tier | Utilisation | Comportement |
|------|------------|--------------|
| PEAK | 0–30% | Opérations complètes |
| GOOD | 30–50% | Préférer résumés, déléguer agressivement |
| DEGRADING | 50–70% | Frontmatter uniquement, avertir l'utilisateur |
| POOR | 70%+ | Mode checkpoint d'urgence — `/reset-context` recommandé |

## Détection d'overlap avant exécution parallèle

Avant de lancer 2 étapes en parallèle, vérifier que leurs fichiers modifiés ne se chevauchent pas. Si overlap → exécution séquentielle.

## Commande Ollama

```bash
curl -s http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{"model": "qwen3.5:35b", "prompt": "<prompt>", "stream": false, "options": {"temperature": 0.15, "num_predict": 8192}}' \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('response','ERROR: '+str(d)))"
```

## Format de sortie par étape

```
📍 ÉTAPE [X]/[TOTAL] : [Titre]
[LOCAL] qwen3.5:35b — <description courte>

📂 Fichiers modifiés
[diff ou chemins]

🧪 Vérification
☑️ [critère 1]
☑️ [critère 2]

📊 Statut : ✅ OK | ⚠️ ATTENTION | ❌ ÉCHEC
Lignes : +X -Y

🚀 Prochaine étape : Étape [X+1] — [titre]
💬 Envoie "OK" pour continuer ou "fix" pour corriger
```

## Commandes utilisateur

- `OK` / `OK étape X` → passe à l'étape suivante
- `fix` / `fix étape X` → corrige l'étape courante
- `plan changé` → arrête et relance `/write-plan`

## Contraintes absolues

- Ne jamais coder une autre étape en avance
- Ne jamais élargir le périmètre du plan
- Ne jamais passer à la suivante sans validation
- Limiter aux fichiers listés dans le plan
- Si blockers sécu détectés → stopper et signaler

## Tâche reçue

$ARGUMENTS
