---
name: telegram
description: Intégration complète avec Telegram Bot API pour le monitoring VPS, alertes critiques (n8n, Coolify) et commandes à distance (/restart, /status, /deploy).
risk: critical
source: local
date_added: '2026-03-27'
author: Antigravity
tags:
- messaging
- telegram
- monitoring
- vps
- devops
- n8n
- coolify
tools:
- mcp-telegram
- n8n
- coolify
- vps-manager
---

# Skill Telegram - Antigravity DevOps & Monitoring

## Overview

Ce skill permet d'intégrer Telegram comme canal de communication et de contrôle pour l'infrastructure Antigravity (VPS, Coolify, n8n). Il expose des outils permettant d'envoyer des alertes formattées et de recevoir des commandes d'administration.

## When to Use This Skill

- Pour envoyer des notifications critiques (VPS down, erreur de déploiement, échec de sync Git).
- Pour demander le statut d'un service (/status).
- Pour redémarrer un service ou un conteneur (/restart).
- Pour déclencher un déploiement (/deploy).
- Pour toute interaction nécessitant un canal mobile et instantané.

## Do Not Use This Skill When

- Pour des transferts de données volumineux ou sensibles (privilégiez SSH/SFTP).
- Pour des logs très longs (préférez un lien vers une interface de log ou un fichier attaché).
- Si l'action peut être automatisée sans intervention humaine.

## Configuration requise

Les variables d'environnement suivantes doivent être définies dans `mcp_config.json` ou l'environnement système :
```env
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
TELEGRAM_CHAT_ID=ton_chat_id_personnel
```

---

## Decision Tree

```
L'événement nécessite-t-il une notification ?
├── OUI → Quel est le niveau d'urgence ?
│   ├── CRITIQUE (VPS Down, Error 500) → telegram_send_alert (🔴)
│   ├── WARNING (Certificat expire bientôt, Disk > 80%) → telegram_send_alert (🟡)
│   └── INFO (Stats hebdo, Déploiement réussi) → telegram_send_alert (🟢)
└── NON → Est-ce une commande reçue ?
    ├── /status → telegram_execute_command(status)
    ├── /restart [service] → telegram_execute_command(restart)
    ├── /deploy [app] → telegram_execute_command(deploy)
    └── Autre message → telegram_send_message("Commande non reconnue")
```

---

## Stack Technique & Boilerplates

### 1. Envoi d'Alerte via MCP (Node.js)

```javascript
// Utilisation via MCP Tool
await callTool("telegram", "telegram_send_alert", {
  level: "critical",
  message: "🚨 [VPS-01] Coolify est inaccessible ! Tentative de redémarrage automatique..."
});
```

### 2. Monitoring & Alertes via n8n

Dans n8n, utilisez le nœud **Telegram** ou un nœud **HTTP Request** callant l'API bot :
- **Method:** POST
- **URL:** `https://api.telegram.org/bot{{$env.TELEGRAM_BOT_TOKEN}}/sendMessage`
- **Body:** `{ "chat_id": "{{$env.TELEGRAM_CHAT_ID}}", "text": "...", "parse_mode": "HTML" }`

### 3. Commandes à distance via MCP

Le serveur MCP (`mcp-telegram-server.js`) gère le polling ou le webhook pour intercepter les commandes :

```javascript
// /restart my-api
const command = msg.text.split(' ')[0]; // /restart
const target = msg.text.split(' ')[1];  // my-api

if (command === '/restart' && target) {
  // Logique de redémarrage via Coolify API ou SSH
}
```

---

## Commandes Supportées (Menu Telegram)

| Commande | Description |
|----------|-------------|
| `/status` | Affiche l'état de santé du VPS et des services Coolify |
| `/restart [svc]` | Redémarre un service spécifique |
| `/deploy [app]` | Déclenche le déploiement d'une application Git-push |
| `/uptime` | Affiche l'uptime du serveur |
| `/logs [app]` | Envoie les 50 dernières lignes de logs d'une app |

---

## Best Practices

- **Sécurité:** Le bot ne doit répondre QU'AU `TELEGRAM_CHAT_ID` configuré.
- **Vitesse:** Utilisez `telegram_send_alert` pour les échecs de sync Git ou erreurs de build immédiates.
- **Format:** Utilisez le HTML (`<b>`, `<code>`) pour rendre les alertes livibles sur mobile.
- **Réduction du bruit:** Ne pas envoyer d'alertes pour des événements triviaux.

## Related Skills

- `devops-troubleshooter` - Pour analyser la cause racine avant d'envoyer l'alerte.
- `automation-chief` - Pour orchestrer les alertes via n8n.
- `tech-lead` - Pour valider les décisions de déploiement à distance.
