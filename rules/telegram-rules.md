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

## 📝 FORMAT DES ALERTES (PREMIUM)
Les alertes doivent suivre ce formatage HTML pour une lisibilité maximale :

### **🔴 CRITIQUE**
```html
🔴 <b>[ALERTE CRITIQUE]</b>
━━━━━━━━━━━━━━━━━━━
🔥 <b>[SERVICE]: Message d'erreur</b>
<code>COURT EXTRAIT DU LOG</code>
🚨 <b>Action:</b> Suggestion d'action
━━━━━━━━━━━━━━━━━━━
<i>Antigravity v1.4.0 — Superpower DevOps</i>
```

### **🟡 WARNING**
```html
🟡 <b>[WARNING]</b>
━━━━━━━━━━━━━━━━━━━
📉 <b>[RESSOURCE]: Seuil atteint</b>
<code>Détails techniques</code>
💡 <b>Conseil:</b> Suggestion d'optimisation
━━━━━━━━━━━━━━━━━━━
<i>Antigravity v1.4.0 — Superpower DevOps</i>
```

### **🟢 INFO**
```html
🟢 <b>[INFORMATION]</b>
━━━━━━━━━━━━━━━━━━━
🚀 <b>[EVENT]: Succès</b>
<code>Statut/Détails</code>
🔗 <a href='...'>Lien utile</a>
━━━━━━━━━━━━━━━━━━━
<i>Antigravity v1.4.0 — Superpower DevOps</i>
```
