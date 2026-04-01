// background.js - V2.1.0
let ollamaStatus = {
  online: false,
  working: false,
  activeModel: '',
  vramUsed: 0,
  vramTotal: 24576,
  models: [],
  allModels: [],
  usageStats: {} // { modelName: seconds }
};

const POLL_INTERVAL_S = 3;

async function checkOllama() {
  try {
    // 0. Load usage stats from storage
    const storage = await chrome.storage.local.get(['usageStats']);
    ollamaStatus.usageStats = storage.usageStats || {};

    // 1. Check Running Models (Active VRAM)
    const psRes = await fetch('http://localhost:11434/api/ps');
    if (psRes.ok) {
      const psData = await psRes.json();
      ollamaStatus.models = psData.models || [];
      ollamaStatus.working = ollamaStatus.models.length > 0;
      ollamaStatus.activeModel = ollamaStatus.working ? ollamaStatus.models[0].name : '';
      ollamaStatus.vramUsed = ollamaStatus.models.reduce((acc, m) => acc + (m.size_vram || 0), 0) / (1024 * 1024);
      ollamaStatus.online = true;

      // 1.1 Track usage time
      if (ollamaStatus.working) {
        ollamaStatus.models.forEach(m => {
          const name = m.name;
          ollamaStatus.usageStats[name] = (ollamaStatus.usageStats[name] || 0) + POLL_INTERVAL_S;
        });
        // Save stats immediately
        chrome.storage.local.set({ usageStats: ollamaStatus.usageStats });
      }
    }

    // 2. Check All Installed Models
    const tagsRes = await fetch('http://localhost:11434/api/tags');
    if (tagsRes.ok) {
      const tagsData = await tagsRes.json();
      ollamaStatus.allModels = tagsData.models || [];
    }

    if (!psRes.ok && !tagsRes.ok) throw new Error();

  } catch (err) {
    ollamaStatus.online = false;
    ollamaStatus.working = false;
    ollamaStatus.models = [];
    ollamaStatus.activeModel = '';
    ollamaStatus.vramUsed = 0;
  }

  // Save full status for popup reactivity
  chrome.storage.local.set({ ollamaStatus });

  // Broadcast
  try {
    const tabs = await chrome.tabs.query({});
    tabs.forEach(tab => {
      chrome.tabs.sendMessage(tab.id, { type: 'OLLAMA_UPDATE', status: ollamaStatus }).catch(() => {});
    });
  } catch (e) {}
}

async function unloadModel(name) {
  try {
    await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      body: JSON.stringify({ model: name, keep_alive: 0 })
    });
    setTimeout(checkOllama, 500);
  } catch (e) {}
}

setInterval(checkOllama, POLL_INTERVAL_S * 1000);
checkOllama();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_OLLAMA_STATUS') {
    sendResponse(ollamaStatus);
  }
  if (message.type === 'UNLOAD_MODEL') {
    unloadModel(message.model);
    sendResponse({ success: true });
  }
  if (message.type === 'RESET_STATS') {
    ollamaStatus.usageStats = {};
    chrome.storage.local.set({ usageStats: {}, ollamaStatus });
    sendResponse({ success: true });
  }
  return true;
});
