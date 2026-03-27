**Plan d’Action – Déploiement "Premium" de l’Écosystème Antigravity**
*Pour JC – Centralisation & Automatisation Totale*
*Version : 2026-03-22 | Statut : Draft Technique*

---

### **📌 Contexte & Objectifs**
L’objectif est de transformer le dépôt `antigravity-brain-sync` en un **environnement auto-suffisant**, où un simple `git clone` + `./setup.sh` suffirait à :
1. **Centraliser** tous les artefacts (extensions, compétences, serveurs, scripts).
2. **Automatiser** l’installation des dépendances critiques (PostgreSQL, Ollama, MCP).
3. **Standardiser** la configuration via des scripts idempotents (IDE, bases de données, orchestration).
4. **Documenter** les prérequis et les étapes de déploiement pour les nouveaux contributeurs.

---
## **🗺️ Proposition de Structure de Répertoires**
*(Optimisée pour modularité et scalabilité)*

```bash
antigravity-brain-sync/
├── 📦 extensions/               # Extensions IDE/outils (VS Code, JetBrains, etc.)
│   ├── vscode/                 # VSIX, snippets, configurations
│   │   ├── antigravity-vscode.vsix
│   │   ├── setup_vscode.sh     # Script d'installation automatique du VSIX
│   │   └── README.md            # Prérequis (VS Code ≥ 1.80, Node.js)
│   └── jetbrains/               # Plugins IntelliJ/PyCharm (si applicable)
│
├── 🧠 skills/                   # Compétences Antigravity (inchangé)
│   ├── tech_lead/
│   ├── planning/
│   └── ...
│
├── 🔧 tools/                    # Outils utilitaires et scripts d'orchestration
│   ├── postgres_connector/     # MCP Server PostgreSQL personnalisé
│   │   ├── Dockerfile           # Pour containerisation (optionnel)
│   │   ├── init_db.sh           # Script de migration/initialisation
│   │   └── config/              # Fichiers de config par défaut
│   ├── pronote_assistant/      # App Streamlit
│   │   ├── requirements.txt     # Dépendances Python
│   │   ├── streamlit_run.sh     # Script de lancement
│   │   └── data/                # Modèles/Données statiques
│   └── ollama-force.js         # Script d'orchestration locale
│       └── README.md            # Exemple d'usage (ex: `node ollama-force.js --mode sync`)
│
├── 🌐 mcp-servers/              # Serveurs MCP (centralisés)
│   ├── postgres/               # Configuration MCP PostgreSQL
│   │   ├── mcp_config.json      # Template de config (à personnaliser)
│   │   ├── docker-compose.yml   # Pour déploiement local
│   │   └── velotrack/           # Configuration spécifique Velotrack
│   │       └── config.json      # Overrides pour Velotrack
│   └── redis/                   # Si utilisé (ex: cache MCP)
│
├── 🔄 scripts/                  # Scripts système (à archiver progressivement)
│   ├── setup.sh                 # Script principal (voir §3)
│   ├── cleanup.sh               # Nettoyage des artefacts temporaires
│   └── utils/                   # Fonctions réutilisables (ex: logs, checks)
│
├── 📝 docs/                     # Documentation technique
│   ├── DEPLOYMENT.md            # Guide étape par étape
│   ├── ARCHITECTURE.md          # Schéma global de l'écosystème
│   └── TROUBLESHOOTING.md       # Dépannage (ex: erreurs PostgreSQL)
│
├── 📦 .github/                   # Workflows CI/CD (optionnel)
│   └── workflows/
│       └── deploy.yml           # Ex: Déploiement automatique du VSIX
│
├── 🔧 config/                   # Fichiers de configuration globaux
│   ├── env.example              # Variables d'environnement (template)
│   └── ide/                     # Profiles IDE (VS Code, etc.)
│
└── README.md                    # Synthèse des prérequis et commandes
```

---
## **🚀 Scripts Clés à Implémenter**
### **1. `setup.sh` – Script Principal (Idempotent)**
*(Exécuté après `git clone` pour tout configurer automatiquement)*

```bash
#!/bin/bash
set -e  # Arrête le script en cas d'erreur

# --- PRÉREQUIS ---
echo "🔍 Vérification des prérequis..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker requis mais introuvable. Installer via : https://docs.docker.com/get-docker/"
    exit 1
fi
if ! command -v node &> /dev/null; then
    echo "❌ Node.js requis pour ollama-force.js. Installer LTS depuis https://nodejs.org/"
    exit 1
fi

# --- INSTALLATION DES DÉPENDANCES ---
echo "🛠️ Installation des dépendances..."

# PostgreSQL (via Docker)
echo "🐳 Démarrage du serveur PostgreSQL MCP..."
docker-compose -f mcp-servers/postgres/docker-compose.yml up -d

# Ollama (si nécessaire)
if [ -f tools/ollama-force.js ]; then
    echo "🔧 Installation des dépendances Node.js..."
    npm install -g yarn  # Si ollama-force.js utilise Yarn
    yarn install --cwd tools/ollama-force.js
fi

# Streamlit (Pronote Assistant)
echo "📊 Installation des dépendances Python..."
pip install -r tools/pronote_assistant/requirements.txt

# --- CONFIGURATION MCP ---
echo "🔧 Configuration MCP..."
cp config/env.example config/.env  # Template pour variables
# Appliquer les overrides Velotrack si nécessaire
sed -i "s/POSTGRES_HOST=.*/POSTGRES_HOST=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mcp-postgres)/g" mcp-servers/postgres/config.json

# --- INSTALLATION VSIX VS Code ---
echo "💻 Installation de l'extension VS Code..."
./extensions/vscode/setup_vscode.sh

# --- VÉRIFICATIONS FINALES ---
echo "✅ Vérification des services..."
docker ps | grep mcp-postgres || { echo "❌ PostgreSQL non démarré."; exit 1; }
streamlit run tools/pronote_assistant/main.py --server.port=8501 &  # Exemple de test
echo "🎉 Déploiement terminé !"
echo "📌 Prochaines étapes :"
echo "  - Lancer MCP : cd mcp-servers/postgres && ./start.sh"
echo "  - Ouvrir Pronote Assistant : http://localhost:8501"
```

---

### **2. `setup_vscode.sh` – Installation Automatique du VSIX**
*(À placer dans `extensions/vscode/`)*

```bash
#!/bin/bash
set -e

# Vérifier que VS Code est installé
if ! command -v code &> /dev/null; then
    echo "❌ VS Code non installé. Télécharger depuis https://code.visualstudio.com/"
    exit 1
fi

# Chemin vers le VSIX
VSIX_PATH="$(pwd)/antigravity-vscode.vsix"

# Désinstaller l'ancienne version si présente
code --install-extension antigravity.antigravity 2>/dev/null || true
code --uninstall-extension antigravity.antigravity

# Installer la nouvelle version
echo "🔧 Installation de l'extension VS Code..."
code --install-extension "$VSIX_PATH"

# Vérifier l'installation
if code --list-extensions | grep -q "antigravity.antigravity"; then
    echo "✅ Extension installée avec succès !"
else
    echo "❌ Échec de l'installation. Vérifier les logs VS Code."
    exit 1
fi
```

---

### **3. `docker-compose.yml` – Exemple pour PostgreSQL MCP**
*(À placer dans `mcp-servers/postgres/`)*

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-mcp}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-mcp123}
      POSTGRES_DB: ${POSTGRES_DB:-mcp}
    ports:
      - "5432:5432"
    volumes:
      - ./data:/var/lib/postgresql/data
      - ./config/mcp_config.json:/etc/mcp_config.json
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U mcp"]
      interval: 5s
      timeout: 5s
      retries: 5
```

---

## **🔧 Automatisations Supplémentaires**
### **1. Configuration IDE via `settings.json`**
*(À intégrer dans `extensions/vscode/` pour une configuration automatique)*

```json
// .vscode/settings.json
{
  "extensions.ignoreRecommendations": false,
  "workbench.colorTheme": "Default Dark+",
  "antigravity.enabled": true,
  "antigravity.mcpServer": "localhost:5432",
  "python.linting.enabled": true,
  "[python]": {
    "editor.defaultFormatter": "ms-python.black"
  }
}
```

**Script d’application** :
```bash
# Dans setup_vscode.sh, ajouter :
echo "🎨 Configuration de VS Code..."
cp .vscode/settings.json ~/.vscode/settings.json
```

---

### **2. CI/CD pour le VSIX (Optionnel)**
*(Fichier `.github/workflows/deploy.yml`)*

```yaml
name: Déploiement VSIX
on:
  push:
    tags:
      - 'v*'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install -g vsce
      - run: vsce package
      - run: vsce publish
        env:
          VSCE_PAT: ${{ secrets.VSCE_PAT }}
```

---

## **📋 Checklist de Déploiement**
| Étape | Action | Responsable | Statut |
|--------|--------|-------------|--------|
| 1 | **Refactorisation des répertoires** | JC | ✅ |
| 2 | **Création des scripts `setup.sh` et `setup_vscode.sh`** | JC | ✅ |
| 3 | **Containerisation de PostgreSQL** | JC | ✅ |
| 4 | **Automatisation de l’installation du VSIX** | JC | ✅ |
| 5 | **Tests locaux** | JC + Équipe | ⏳ |
| 6 | **Documentation complète** | JC | ⏳ |
| 7 | **Intégration CI/CD** | JC (optionnel) | ⏳ |

---

## **⚠️ Risques & Mitigations**
| Risque | Mitigation |
|--------|------------|
| **Dépendance à Docker** | Proposer une alternative avec `postgres` natif (via `brew`/`apt`). |
| **Conflits de configuration MCP** | Utiliser des templates avec des variables d’environnement. |
| **VSIX non compatible** | Ajouter une vérification de version dans `setup_vscode.sh`. |
| **Scripts non idempotents** | Tester avec `trap 'echo "Erreur à la ligne $LINENO"' ERR`. |

---
## **🎯 Prochaines Étapes**
1. **Valider la structure** avec l’équipe pour feedback.
2. **Implémenter les scripts** et les tester en local.
3. **Documenter les prérequis** (ex: versions de Python, Node.js).
4. **Automatiser les tests** (ex: linting, vérification des dépendances).
5. **Déployer en production** via un tag Git (`v1.0.0-ready`).

---
**💡 Suggestion Bonus** :
- Ajouter un **mode "dev"** dans `setup.sh` pour cloner les dépendances en mode développement (ex: `DEBUG=true ./setup.sh`).
- Intégrer un **système de logs** pour tracer les étapes (ex: `echo "[INFO] Étape X terminée" >> deploy.log`).

---
**Feedback attendu** :
- La structure proposée correspond-elle à vos attentes ?
- Faut-il ajouter d’autres outils (ex: Redis, Kafka) dans `mcp-servers/` ?
- Préférez-vous une approche **Docker-first** ou **native** pour les dépendances ?

*— JC, Tech Lead Antigravity* 🚀

