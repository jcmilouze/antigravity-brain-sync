#!/usr/bin/env node
const https = require('https');
const readline = require('readline');

/**
 * MCP Telegram Server
 * Handles messaging and remote commands for Antigravity infrastructure.
 */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!BOT_TOKEN || !CHAT_ID) {
  process.stderr.write("Error: TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are required.\n");
  process.exit(1);
}

// Global state for polling (if needed)
let lastUpdateId = 0;

/**
 * Utility to send HTTP POST to Telegram API
 */
function callTelegram(method, data) {
  return new Promise((resolve, reject) => {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/${method}`;
    const postData = JSON.stringify(data);

    const req = https.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    }, (res) => {
      let responseBody = '';
      res.on('data', chunk => responseBody += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseBody);
          if (parsed.ok) resolve(parsed.result);
          else reject(new Error(parsed.description || 'Unknown Telegram Error'));
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

/**
 * Tool handlers
 */
const tools = {
  telegram_send_message: async ({ text, chat_id }) => {
    const targetId = chat_id || CHAT_ID;
    return await callTelegram('sendMessage', {
      chat_id: targetId,
      text: text,
      parse_mode: 'HTML'
    });
  },

  telegram_send_alert: async ({ level, message, details, action, service }) => {
    const divider = "\n━━━━━━━━━━━━━━━━━━━\n";
    let text = "";
    
    if (level === 'critical') {
      text = `🔴 <b>[ALERTE CRITIQUE]</b>${divider}🔥 <b>${service || 'SERVICE'}:</b> ${message}\n\n<code>${details || 'Détails non spécifiés'}</code>\n\n🚨 <b>Action:</b> ${action || 'Redémarrage recommandé'}`;
    } else if (level === 'warning') {
      text = `🟡 <b>[WARNING]</b>${divider}📉 <b>${service || 'RESSOURCE'}:</b> ${message}\n\n<code>${details || ''}</code>\n\n💡 <b>Conseil:</b> ${action || 'Surveiller les logs'}`;
    } else {
      text = `🟢 <b>[INFORMATION]</b>${divider}🚀 <b>${service || 'EVENT'}:</b> ${message}\n\n<code>${details || ''}</code>\n\n🔗 ${action || 'Opération réussie'}`;
    }

    text += `${divider}<i>Antigravity v1.4.0 — Superpower DevOps</i>`;
    
    return await callTelegram('sendMessage', {
      chat_id: CHAT_ID,
      text: text,
      parse_mode: 'HTML'
    });
  },

  telegram_get_updates: async () => {
    const updates = await callTelegram('getUpdates', {
      offset: lastUpdateId + 1,
      timeout: 0
    });
    if (updates.length > 0) {
      lastUpdateId = updates[updates.length - 1].update_id;
    }
    return updates;
  },

  telegram_execute_command: async ({ command_line }) => {
    // Example: parse "/restart api"
    const parts = command_line.trim().split(' ');
    const cmd = parts[0];
    const target = parts[1] || '';

    // Simulate execution or trigger external action
    // In a real scenario, this would call shell commands or other MCP tools
    let response = "";
    switch (cmd) {
      case '/status':
        response = "✅ Tous les systèmes sont opérationnels.\n- VPS: OK\n- Coolify: OK\n- n8n: OK";
        break;
      case '/restart':
        response = `🚀 Redémarrage de <b>${target || 'système'}</b> initié...`;
        break;
      case '/deploy':
        response = `🏗️ Déploiement de <b>${target || 'default'}</b> en cours...`;
        break;
      case '/uptime':
        const uptime = process.uptime();
        response = `⏱️ Bot Uptime: ${Math.floor(uptime)}s`;
        break;
      default:
        response = "❌ Commande non reconnue. Utilisez /status, /restart, /deploy.";
    }

    await callTelegram('sendMessage', {
      chat_id: CHAT_ID,
      text: response,
      parse_mode: 'HTML'
    });

    return { result: response };
  }
};

/**
 * MCP Protocol Handling over Stdout/Stdin
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', async (line) => {
  try {
    const request = JSON.parse(line);
    const { method, params, id } = request;

    if (method === 'list_tools') {
      const toolList = [
        {
          name: 'telegram_send_message',
          description: 'Envoie un message texte à un chat_id (par défaut le chat configuré)',
          input_schema: {
            type: 'object',
            properties: {
              text: { type: 'string' },
              chat_id: { type: 'string' }
            },
            required: ['text']
          }
        },
        {
          name: 'telegram_send_alert',
          description: 'Envoie une alerte formattée Premium (critical, warning, info)',
          input_schema: {
            type: 'object',
            properties: {
              level: { type: 'string', enum: ['critical', 'warning', 'info'] },
              message: { type: 'string' },
              service: { type: 'string' },
              details: { type: 'string' },
              action: { type: 'string' }
            },
            required: ['level', 'message']
          }
        },
        {
          name: 'telegram_get_updates',
          description: 'Récupère les dernières mises à jour (messages reçus)',
          input_schema: { type: 'object', properties: {} }
        },
        {
          name: 'telegram_execute_command',
          description: 'Parse et simule/exécute une commande (/status, /restart, /deploy)',
          input_schema: {
            type: 'object',
            properties: {
              command_line: { type: 'string' }
            },
            required: ['command_line']
          }
        }
      ];
      console.log(JSON.stringify({ jsonrpc: "2.0", result: { tools: toolList }, id }));
    } else if (method === 'call_tool') {
      const { name, arguments: args } = params;
      if (tools[name]) {
        try {
          const result = await tools[name](args);
          console.log(JSON.stringify({ jsonrpc: "2.0", result: { content: [{ type: "text", text: JSON.stringify(result) }] }, id }));
        } catch (error) {
          console.log(JSON.stringify({ jsonrpc: "2.0", error: { code: -32000, message: error.message }, id }));
        }
      } else {
        console.log(JSON.stringify({ jsonrpc: "2.0", error: { code: -32601, message: "Tool not found" }, id }));
      }
    } else {
      // Ignored for now
    }
  } catch (err) {
    // Fail silently on non-JSON lines or other errors
  }
});
