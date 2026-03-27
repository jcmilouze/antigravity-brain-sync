# 🛠️ Antigravity Capabilities : MCP Stack Configuration (v1.4.0)

Ce document répertorie les outils et intégrations activement supportés par le système **Antigravity** via le **Model Context Protocol (MCP)**. Ces capacités permettent aux agents d'interagir avec des services externes pour l'automatisation, la gestion de projet, l'authentification et le design.

---

## 🏗️ Architecture des Services (Opérationnel : 27 Mars 2026)

| Service | Rôle Principal | Type d'accès | Endpoint / Target |
| :--- | :--- | :--- | :--- |
| **GitHub** | Gestion code & PR | API (PAT) | API GitHub standard |
| **n8n-mcp** | Automatisation & Workflows | Supergateway (Webhook) | `n8n.bessacvps.fr` |
| **StitchMCP** | Design & UI Prototyping | Google Cloud API | `stitch.googleapis.com` |
| **Clerk** | Auth & User Management | Clerk SDK Proxy | `mcp.clerk.com` |
| **PostgreSQL** | Base de données locale | Tunnel / Direct | `localhost:5433` (Skipped) |

---

## ⚡ Détails Techniques par Service

### 1. 🐙 GitHub (`github`)
- **Scopes** : `repo`, `workflow`, `user`.
- **Statut Audit** : **OPÉRATIONNEL** (Recherche & Inspection validées).
- **Usage** : Utilisé par `@git-pr-workflow` pour l'indexation de dépôts et l'automatisation des commits.

### 2. 🌀 n8n Automation (`n8n-mcp`)
- **Auth** : Bearer Token JWT (Long-lived).
- **Statut Audit** : **OPÉRATIONNEL** (Accès à 4 workflows).
- **Workflows Clés** :
    - `VeloTrack AI Generator` : Générateur de routes (Groq API).
    - `Sync Skills GitHub` : Automatisation de la bibliothèque de compétences.

### 3. 🎨 Stitch UI (`StitchMCP`)
- **Auth** : X-Goog-Api-Key.
- **Statut Audit** : **OPÉRATIONNEL** (8 projets indexés).
- **Usage** : Utilisé pour générer des prototypes UI premium et gérer les design systems synchronisés.

### 4. 👤 Clerk SDK (`clerk`)
- **Capacités** : Snippets React/Next.js, hooks `useAuth`, `useUser`.
- **Statut Audit** : **OPÉRATIONNEL**.
- **Usage** : Accélération du développement d'applications SaaS et gestion de l'auth.

---

## 🛡️ Sécurité & Gouvernance
Les tokens et clés d'API sont stockés dans `mcp_config.json`. Ce fichier **ne doit jamais être poussé sur un dépôt public**. En cas de migration PC vers Mac, assurez-vous de recréer ces variables dans l'environnement local ou de les injecter via le `mcp_config.json` de destination.

> [!IMPORTANT]
> Ne jamais exposer de tokens entiers dans les logs. Tous les diagnostics Antigravity utilisent des mécanismes de masquage.

---
*,Gouverneur d'Exécution Antigravity — Update Tech Stack v1.4.0 (A.I. Verified).*
