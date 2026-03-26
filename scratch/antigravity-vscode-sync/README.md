# 🌀 Antigravity Brain Sync (v1.3.1) — Hardened Edition

Synchronisez votre mémoire agentique, ruleset et skills entre vos machines (PC / Mac) via un canal Git privé et sécurisé.

---

## 🔒 Certification de Sécurité (v1.3.1)
Cette version intègre un **renforcement drastique (Hardening)** de l'infrastructure de synchronisation :
- **Migration `exec` ➔ `execFile`** : Les commandes Git sont désormais isolées et protégées contre les injections de commandes.
- **Défense Native** : Protection de l'intégrité de votre Brain lors des phases de Pull/Push.
- **Logique Robuste** : Gestion d'erreurs avancée pour la synchronisation SSH/HTTPS.

## 🍏 Protocole de Migration Mac
Si vous effectuez votre première installation sur macOS, veuillez suivre impérativement le manuel détaillé :
👉 [**DOCS_MAC_INSTALL.md (Manuel de Bord)**](./DOCS_MAC_INSTALL.md)

---

## 🚀 Fonctionnalités
- 📥 **Neural Fusion (Pull)** : Récupération de votre conscience collective (Rules/Knowledge/Skills).
- 📤 **Synaptic Archive (Push)** : Archivage automatique de vos souvenirs locaux et nouveaux skills.
- 🌀 **Cognitive Bar** : Indicateur dynamique dans la barre de statut :
  - `$(pass) Brain Synced` : Synchro parfaite.
  - `$(cloud-download)` : Retard de conscience détecté.
  - `$(cloud-upload)` : Nouveaux souvenirs non archivés.
- ⚙️ **Configurable** : Liaison Plug & Play à votre dépôt privé via SSH ou HTTPS.

## 🛠️ Installation & Build
1. **Build** : `npm run package` pour générer le `.vsix`.
2. **Setup** : Installez le `.vsix` sur VS Code Mac/PC.
3. **Connect** : Configurez votre URL de Repo via la barre de statut.

---
*,Gouverneur d'Exécution Antigravity — 27 Mars 2026.*
