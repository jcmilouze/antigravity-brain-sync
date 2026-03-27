# 📢 RÈGLES DE COMMUNICATION TELEGRAM

## 🛡️ CANAL OFFICIEL MCP
Telegram est désormais le canal de communication officiel pour les alertes en temps réel et les commandes à distance de l'infrastructure Antigravity.

## 🚨 RÈGLE D'ALERTE CRITIQUE
Toute détection d'un événement critique DOIT déclencher un appel à `telegram_send_alert` :
- **VPS Down:** Si le serveur ne répond plus aux pings ou si les services critiques sont tombés.
- **Coolify Error:** Échec critique d'un déploiement ou corruption de la configuration.
- **Git Sync Failure:** Échec de la synchronisation bidirectionnelle du cloud sync.
- **Security Breach:** Détection d'accès non autorisés ou d'activités suspectes.

## 🤖 ATTRIBUTION AUX AGENTS
- **Agents Monitoring:** Responsables de la détection et de l'envoi des alertes via `telegram_send_alert`.
- **Agents DevOps:** Responsables de l'exécution des commandes reçues (/restart, /deploy) via `telegram_execute_command`.

## 📝 FORMAT DES ALERTES
- Utilisez systématiquement les émojis correspondants : 🔴 (Critique), 🟡 (Warning), 🟢 (Info).
- Incluez toujours le nom du service ou de la ressource concernée entre crochets : `[VPS-01]`, `[Coolify]`.
- En cas d'erreur, joindre un extrait court du log via `<code>`.
