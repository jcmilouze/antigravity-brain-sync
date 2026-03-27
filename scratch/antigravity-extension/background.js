// background.js
let ollamaStatus = {
  online: false,
  working: false,
  models: []
};

async function checkOllama() {
  try {
    const response = await fetch('http://localhost:11434/api/ps');
    if (response.ok) {
      const data = await response.json();
      ollamaStatus.online = true;
      ollamaStatus.models = data.models || [];
      ollamaStatus.working = data.models && data.models.length > 0;
      // Get the primary model name if working
      ollamaStatus.activeModel = ollamaStatus.working ? data.models[0].name.split(':')[0] : '';
    } else {
      ollamaStatus.online = false;
      ollamaStatus.working = false;
    }
  } catch (err) {
    ollamaStatus.online = false;
    ollamaStatus.working = false;
  }

  // Broadcast the update to all active tabs
  const tabs = await chrome.tabs.query({});
  tabs.forEach(tab => {
    chrome.tabs.sendMessage(tab.id, { type: 'OLLAMA_UPDATE', status: ollamaStatus }).catch(() => {});
  });
}

// Poll every 2 seconds
setInterval(checkOllama, 2000);
checkOllama();

// Respond to status requests
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_OLLAMA_STATUS') {
    sendResponse(ollamaStatus);
  }
});
