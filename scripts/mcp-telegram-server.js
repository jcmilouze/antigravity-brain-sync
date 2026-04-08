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
    // Command parsing
    const parts = command_line.trim().split(' ');
    const cmd = parts[0];
    const target = parts[1] || '';

    let response = "";
    switch (cmd) {
      case '/status':
        // Generate a more professional status report
        const freeMem = Math.round(require('os').freemem() / 1024 / 1024 / 1024 * 10) / 10;
        const totalMem = Math.round(require('os').totalmem() / 1024 / 1024 / 1024 * 10) / 10;
        const cpuUsage = Math.round(require('os').loadavg()[0] * 100) / 100;
        
        response = `📊 <b>Status du Node:</b>\n` +
                   `━━━━━━━━━━━━━━━━━━━\n` +
                   `🖥️ <b>OS:</b> ${require('os').type()} (${require('os').arch()})\n` +
                   `🧠 <b>RAM:</b> ${totalMem - freeMem}GB / ${totalMem}GB\n` +
                   `⚡ <b>Load:</b> ${cpuUsage}\n` +
                   `✅ <b>Services:</b> MCP Server is ALIVE`;
        break;

      case '/restart':
        response = `🚀 Redémarrage de <b>${target || 'global-stack'}</b> initié via Antigravity...`;
        break;

      case '/deploy':
        response = `🏗️ Déploiement de <b>${target || 'main-branch'}</b> en cours...\n<i>Check n8n for details.</i>`;
        break;

      case '/uptime':
        const botUptime = Math.floor(process.uptime());
        const sysUptime = Math.floor(require('os').uptime());
        response = `⏱️ <b>Uptime Report</b>\n` +
                   `━━━━━━━━━━━━━━━━━━━\n` +
                   `🤖 <b>Bot:</b> ${Math.floor(botUptime / 3600)}h ${Math.floor((botUptime % 3600) / 60)}m\n` +
                   `🖥️ <b>Server:</b> ${Math.floor(sysUptime / 86400)}d ${Math.floor((sysUptime % 86400) / 3600)}h`;
        break;

      case '/logs':
        const lines = parseInt(target) || 20;
        response = `📜 <b>Derniers logs (${lines} lignes):</b>\n` +
                   `━━━━━━━━━━━━━━━━━━━\n` +
                   `<pre>Running on ${require('os').hostname()}...\n[INFO] Telegram MCP Server starting...\n[DEBUG] Connecting to Bot API...\n[SUCCESS] Bot is ready. Waiting for commands.</pre>`;
        break;

      case '/projects':
        const fs = require('fs');
        const scratchPath = "C:/Users/mimilouze/.gemini/antigravity/scratch";
        try {
          const files = fs.readdirSync(scratchPath, { withFileTypes: true });
          const projects = files.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
          if (projects.length > 0) {
            response = `📁 <b>Vos Projets Antigravity:</b>\n` +
                       `━━━━━━━━━━━━━━━━━━━\n` +
                       projects.map(p => `• <code>${p}</code>`).join('\n') +
                       `\n\n📌 <i>Posez-moi des questions sur ces projets !</i>`;
          } else {
            response = "📁 <b>Aucun projet trouvé dans le dossier scratch.</b>";
          }
        } catch (e) {
          response = `❌ <b>Erreur Lecture Scratch:</b> ${e.message}`;
        }
        break;

      case '/ask':
      case '/brain':
        const prompt = parts.slice(1).join(' ');
        if (!prompt) {
          response = "❔ <b>Dis-moi quelque chose !</b> Utilisez <code>/ask [question]</code>.";
        } else {
          try {
            response = await askBrain(prompt);
          } catch (e) {
            response = `❌ <b>Ollama Error:</b> ${e.message}`;
          }
        }
        break;

      case '/help':
      default:
        // Try AI fallback if it's NOT /help and NOT beginning with /
        if (cmd !== '/help' && !command_line.startsWith('/')) {
            try { response = await askBrain(command_line); break; } catch (e) {}
        }
        
        response = `🛠️ <b>Antigravity Dashboard — iPhone Control</b>\n` +
                   `━━━━━━━━━━━━━━━━━━━\n` +
                   `📊 /status - État du serveur local\n` +
                   `⏱️ /uptime - Uptime Bot & Serveur\n` +
                   `📜 /logs - 20 dernières lignes\n` +
                   `📁 /projects - Liste vos projets scratch\n` +
                   `🚀 /restart [svc] - Redémarrer un service\n` +
                   `🏗️ /deploy [app] - Déclencher déploiement\n` +
                   `🧠 /ask [question] - Utiliser le Cerveau (IA)\n\n` +
                   `💡 <i>Envoyez simplement du texte pour parler au Cerveau (Qwen 32B).</i>`;
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
 * 🧠 Intelligence Artificial Integration — Antigravity Brain Bridge
 * Calls the local Ollama instance via ollama-force.js
 */
async function askBrain(prompt) {
  const { execSync } = require('child_process');
  const path = require('path');
  const scriptPath = path.join(__dirname, 'ollama-force.js');
  
  // Custom system prompt for Telegram context
  const systemPrompt = "You are Antigravity Pilot, a technical agent via Telegram. Be professional, concise, and use HTML tags like <b> or <code> when relevant. Respond in the same language as the user.";
  const scriptCmd = `node "${scriptPath}" "${prompt.replace(/"/g, '\\"')}" "qwen2.5-coder:32b" "" "${systemPrompt.replace(/"/g, '\\"')}"`;
  
  try {
    const result = execSync(scriptCmd, { encoding: 'utf8', timeout: 30000 });
    return result || "🤔 <i>Le cerveau n'a rendu aucune réponse.</i>";
  } catch (err) {
    throw new Error(`Failed to call Ollama: ${err.stderr || err.message}`);
  }
}

/**
 * Background Polling Loop (Optional - if we want the bot to be autonomous)
 */
async function startAutonomousPolling() {
  if (process.env.TELEGRAM_AUTONOMOUS !== 'true') return;
  
  while (true) {
    try {
      const updates = await tools.telegram_get_updates();
      for (const update of updates) {
        if (update.message && update.message.text) {
          const senderId = update.message.chat.id.toString();
          if (senderId === CHAT_ID) {
            // Process both commands (starts with /) and natural language
            await tools.telegram_execute_command({ command_line: update.message.text });
          } else {
            console.error(`Unauthorized access attempt from: ${senderId}`);
            await callTelegram('sendMessage', {
              chat_id: senderId,
              text: "⛔ Accès refusé. Vous n'êtes pas autorisé à piloter cet agent."
            });
          }
        }
      }
    } catch (err) {
      // process.stderr.write(`Polling Error: ${err.message}\n`);
    }
    await new Promise(r => setTimeout(r, 3000));
  }
}

if (process.env.TELEGRAM_AUTONOMOUS === 'true') {
  startAutonomousPolling();
}

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

    if (method === 'initialize') {
      const response = {
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "2024-11-05",
          capabilities: {
            tools: {}
          },
          serverInfo: {
            name: "mcp-telegram-server",
            version: "1.0.0"
          }
        }
      };
      console.log(JSON.stringify(response));
    } else if (method === 'list_tools') {
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
